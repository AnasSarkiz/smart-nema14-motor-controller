"""Conservative nominal fit check against every actual exported component mesh.

Component AABBs must clear the exact carrier BRep; this can reject safe shapes
but cannot approve a collision hidden between sampled component vertices.
Supplier CAD registration, mating plugs, tolerances and strength remain separate.
"""
import hashlib
import json
import os
import struct
import sys
from pathlib import Path

os.environ["XDG_CACHE_HOME"] = str(Path(".mechanical-cache").resolve())
import cadquery as cq
import numpy as np

revision = json.loads(Path("package.json").read_text())["version"]
evidence_path = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(f"evidence/rev-{revision}/FRONT-CARRIER-AUDIT.json")
input_directory = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("dist/mounted-assembly")
circuit = json.loads((input_directory / "circuit.json").read_text())
glb_bytes = (input_directory / "3d.glb").read_bytes()
json_length = struct.unpack_from("<I", glb_bytes, 12)[0]
glb = json.loads(glb_bytes[20:20 + json_length])
binary_offset = 20 + json_length + 8
sources = {entry["source_component_id"]: entry["name"] for entry in circuit if entry["type"] == "source_component"}
components = [entry for entry in circuit if entry["type"] == "pcb_component"]
assert len(components) == 149
dnp = [entry for entry in components if entry.get("do_not_place")]
assert [sources[entry["source_component_id"]] for entry in dnp] == ["R50"]
fitted_components = [entry for entry in components if not entry.get("do_not_place")]
assert len(fitted_components) == 148
mount_centers = [(x, y) for x in (-15.25, 15.25) for y in (-15.25, 15.25)]
holes = [entry for entry in circuit if entry["type"] == "pcb_hole" and not entry.get("pcb_component_id")]
assert len(holes) == 4
assert sorted((hole["x"], hole["y"]) for hole in holes) == mount_centers
assert all(abs(hole["hole_diameter"] - 2.5) < 1e-8 for hole in holes)
assert not any(entry["type"] in ("pcb_trace", "pcb_via") for entry in circuit)
assert not any("error" in entry["type"] for entry in circuit)

def node_vertices(node):
    assert "mesh" in node and not any(key in node for key in ("matrix", "rotation", "scale")), node["name"]
    vertices = []
    for primitive in glb["meshes"][node["mesh"]]["primitives"]:
        accessor = glb["accessors"][primitive["attributes"]["POSITION"]]
        assert accessor["componentType"] == 5126 and accessor["type"] == "VEC3"
        view = glb["bufferViews"][accessor["bufferView"]]
        offset = binary_offset + view.get("byteOffset", 0) + accessor.get("byteOffset", 0)
        positions = np.ndarray((accessor["count"], 3), dtype="<f4", buffer=glb_bytes, offset=offset, strides=(view.get("byteStride", 12), 4)).astype(float)
        positions += np.array(node.get("translation", [0, 0, 0]))
        vertices.append(np.column_stack((-positions[:, 0], positions[:, 2], positions[:, 1])))
    return np.concatenate(vertices)

def bounds_array(shape):
    bounds = shape.BoundingBox()
    return np.array([[bounds.xmin, bounds.ymin, bounds.zmin], [bounds.xmax, bounds.ymax, bounds.zmax]])

carrier = cq.importers.importStep("mechanical/assets/front-flange-carrier.step").val()
assert carrier.isValid() and len(carrier.Solids()) == 1
carrier_node = next(node for node in glb["nodes"] if node.get("name") == "ProposedFrontFlangeCarrier")
vertices = node_vertices(carrier_node)
assert np.max(np.abs(np.array([vertices.min(axis=0), vertices.max(axis=0)]) - bounds_array(carrier))) < 0.001
motor_path = Path("references/motor/14hm11-0404s/14HM11-0404S.STEP")
assert hashlib.sha256(motor_path.read_bytes()).hexdigest() == "959f43e95b7840beae5ffbd56e997e23c5004a1b09e16b7caa40400296e46281"
motor = cq.importers.importStep(str(motor_path)).val().translate((0, 0, -38.2))
motor_node = next(node for node in glb["nodes"] if node.get("name") == "OfficialStepperOnline14hm11Motor")
vertices = node_vertices(motor_node)
assert np.max(np.abs(np.array([vertices.min(axis=0), vertices.max(axis=0)]) - bounds_array(motor))) < 0.001
motor_overlap_mm3 = carrier.intersect(motor).Volume()
assert motor_overlap_mm3 < 1e-6, "Carrier intrudes into the unchanged official motor solid"
assert carrier.distance(motor) < 0.001, "Front flange must contact the motor datum"

fasteners = cq.importers.importStep("mechanical/assets/carrier-fastener-envelopes.step").val()
results = []
missing_meshes = []
for component in fitted_components:
    name = sources[component["source_component_id"]]
    node = next((node for node in glb["nodes"] if node.get("name") == name), None)
    if node is None or "mesh" not in node:
        missing_meshes.append({"reference": name, "reason": "Fitted mesh is absent from the native GLB"})
        continue
    vertices = node_vertices(node)
    if vertices.size == 0:
        missing_meshes.append({"reference": name, "reason": "Native GLB contains an empty fitted mesh"})
        continue
    bounds = np.array([vertices.min(axis=0), vertices.max(axis=0)])
    lengths = bounds[1] - bounds[0]
    assert np.all(lengths > 0), name
    envelope = cq.Workplane("XY").box(float(lengths[0]), float(lengths[1]), float(lengths[2]), centered=(False, False, False)).val().translate(tuple(bounds[0]))
    carrier_clearance_mm = carrier.distance(envelope)
    screw_clearance_mm = fasteners.distance(envelope)
    results.append({"reference": name, "rendered_bounds_mm": bounds.tolist(), "carrier_clearance_mm": carrier_clearance_mm, "fastener_clearance_mm": screw_clearance_mm})

pair_results = []
for index, left in enumerate(results):
    for right in results[index + 1:]:
        left_bounds = np.array(left["rendered_bounds_mm"])
        right_bounds = np.array(right["rendered_bounds_mm"])
        gaps = np.maximum(np.maximum(left_bounds[0] - right_bounds[1], right_bounds[0] - left_bounds[1]), 0)
        clearance_mm = float(np.linalg.norm(gaps))
        pair_results.append({"left": left["reference"], "right": right["reference"], "clearance_mm": clearance_mm})
pair_failures = [row for row in pair_results if row["clearance_mm"] < 0.1]
failures = [row for row in results if min(row["carrier_clearance_mm"], row["fastener_clearance_mm"]) < 0.15]
report = {"revision": revision, "result": "failed" if failures or pair_failures else "passed nominal envelope clearance", "scope": "Exact motor and carrier BRep; conservative AABBs of all 148 default-fitted exported component meshes versus carrier and proposed fastener envelopes. R50 is deliberately DNP and has no fitted mesh.", "motor_carrier_intersection_mm3": motor_overlap_mm3, "minimum_component_clearance_mm": min(min(row["carrier_clearance_mm"], row["fastener_clearance_mm"]) for row in results), "component_results": results, "failures": failures, "physical_and_tolerance_qualification": "pending", "mating_plug_harness_qualification": "pending", "fabrication_ready": False, "rendered_glb_sha256": hashlib.sha256(glb_bytes).hexdigest()}
report["component_pair_envelope_clearance_mm"] = min(row["clearance_mm"] for row in pair_results)
report["component_pair_envelope_failures"] = pair_failures
report["expected_fitted_mesh_count"] = len(fitted_components)
report["measured_fitted_mesh_count"] = len(results)
report["missing_fitted_meshes"] = missing_meshes
report["all_fitted_meshes_measured"] = len(results) == len(fitted_components)
if missing_meshes:
    report["result"] = "blocked: fitted meshes missing; other measured envelopes do not qualify the complete board"
evidence_path.write_text(json.dumps(report, indent=2) + "\n")
assert not missing_meshes, missing_meshes
assert not failures, failures
assert not pair_failures, pair_failures
print(f"Nominal carrier check passed for {len(results)} actual component mesh envelopes; mating plugs and production tolerances remain unqualified.")
