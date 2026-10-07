"""Check the external STEP's physical datums against the generated supplier lands."""
import hashlib
import json
import os
import struct
from pathlib import Path
import sys

os.environ["XDG_CACHE_HOME"] = str(Path(".mechanical-cache").resolve())
import cadquery as cq
import numpy as np
from OCP.BRepAdaptor import BRepAdaptor_Surface
from OCP.GeomAbs import GeomAbs_Cylinder, GeomAbs_Plane

revision = json.loads(Path("package.json").read_text())["version"]
model_path = Path("references/usb4110-external-model/usb4110-gf-a.stp")
model_bytes = model_path.read_bytes()
assert hashlib.sha256(model_bytes).hexdigest() == "fb802f14dd0a87ca59b246036d7a6365de3ea32b20a7896a02ade42b9f35d799"
assert b"PRODUCT('usb4110-gf-a'" in model_bytes
assert b"LENGTH_UNIT()SI_UNIT(.MILLI.,.METRE.)" in model_bytes
imported_definition = Path("imports/USB4110_GF_A/USB4110_GF_A.tsx").read_bytes()
assert hashlib.sha256(imported_definition).hexdigest() == "4e4d79a0a7b9406e39c5dbd6a6484f6ccd56e3ef3906ccf3e7357b94ae86cf05"


input_directory = Path(sys.argv[1] if len(sys.argv) > 1 else "dist/mounted-assembly")
circuit_bytes = (input_directory / "circuit.json").read_bytes()
circuit = json.loads(circuit_bytes)
results = []
for reference in ["J_USB", "J_DATA"]:
    source = next(e for e in circuit if e["type"] == "source_component" and e["name"] == reference)
    assert source["supplier_part_numbers"]["jlcpcb"] == ["C5143397"]
    pcb = next(e for e in circuit if e["type"] == "pcb_component" and e["source_component_id"] == source["source_component_id"])
    cad = next(e for e in circuit if e["type"] == "cad_component" and e["source_component_id"] == source["source_component_id"])
    assert cad["model_step_url"] == "./" + str(model_path)
    assert not cad.get("show_as_bounding_box", False)
    assert cad["model_origin_position"] == {"x": 0, "y": 0, "z": -4.89}
    assert cad["rotation"] == ({"x": 90, "y": 0, "z": 0} if pcb["layer"] == "top" else {"x": -90, "y": 180, "z": 0})
    assert cad["model_unit_to_mm_scale_factor"] == 1
    # Explicit board-frame X registration already rotates the STEP normal.
    # The renderer must not apply a second authored-normal rotation.
    assert cad["model_board_normal_direction"] == "z+"
    assert pcb["rotation"] == 0 and pcb["layer"] in ["top", "bottom"]
    assert abs(cad["position"]["x"] - pcb["center"]["x"]) < 1e-6
    assert abs(cad["position"]["y"] - pcb["center"]["y"]) < 1e-6
    board = next(e for e in circuit if e["type"] == "pcb_board")
    board_surface_z_mm = board["thickness"] / 2 * (1 if pcb["layer"] == "top" else -1)
    assert abs(cad["position"]["z"] - board_surface_z_mm) < 1e-6

    shape = cq.importers.importStep(str(model_path)).val()
    assert shape.isValid() and len(shape.Solids()) == 1
    bounds = shape.BoundingBox()
    vertices = [vertex.toTuple() for vertex in shape.Vertices()]
    front_vertices = [point for point in vertices if abs(point[2]) < 1e-5]
    body_vertices = [point for point in vertices if point[1] > 0.5]
    mouth_width_mm = max(point[0] for point in front_vertices) - min(point[0] for point in front_vertices)
    body_length_mm = max(point[2] for point in body_vertices) - min(point[2] for point in body_vertices)
    assert abs(mouth_width_mm - 8.94) < 0.1
    assert abs(body_length_mm - 7.35) < 0.3
    assert abs(bounds.xlen - 11.30) < 0.3
    assert abs(bounds.zlen - 7.70) < 0.3
    assert abs(bounds.ymax - 3.26) < 0.1
    assert abs(-bounds.ymin - 0.63) < 0.1

    origin = cad["model_origin_position"]
    position = cad["position"]

    def to_board_shape(source_shape):
        shifted = source_shape.translate((-origin["x"], -origin["y"], -origin["z"]))
        # STEP_INVERTED swaps Y/Z; Scene3D transformMesh uses a left-handed X
        # rotation. Together these give this circuit-frame rotation. GLB mirrors X.
        shifted = shifted.rotate((0, 0, 0), (1, 0, 0), cad["rotation"]["x"])
        if pcb["layer"] == "bottom":
            shifted = shifted.rotate((0, 0, 0), (0, 0, 1), 180)
        return shifted.translate((position["x"], position["y"], position["z"]))

    holes = [e for e in circuit if e["type"] == "pcb_hole" and e.get("pcb_component_id") == pcb["pcb_component_id"]]
    pads = [e for e in circuit if e["type"] == "pcb_smtpad" and e["pcb_component_id"] == pcb["pcb_component_id"]]
    assert len(holes) == 2 and len(pads) == 16
    peg_results = {}
    landing_results = []
    landing_vertices = []
    for face in shape.Faces():
        surface = BRepAdaptor_Surface(face.wrapped)
        face_bounds = face.BoundingBox()
        if surface.GetType() == GeomAbs_Cylinder and face_bounds.ymin < -0.15:
            cylinder = surface.Cylinder()
            assert abs(cylinder.Radius() * 2 - 0.50) < 0.05
            transformed_surface = BRepAdaptor_Surface(to_board_shape(face).wrapped)
            transformed_cylinder = transformed_surface.Cylinder()
            peg = transformed_cylinder.Location()
            hole = min(holes, key=lambda e: (e["x"] - peg.X()) ** 2 + (e["y"] - peg.Y()) ** 2)
            centre_error_mm = ((hole["x"] - peg.X()) ** 2 + (hole["y"] - peg.Y()) ** 2) ** 0.5
            radial_clearance_mm = hole["hole_diameter"] / 2 - cylinder.Radius() - centre_error_mm
            assert centre_error_mm < 0.0002 and radial_clearance_mm > 0.07
            axis = transformed_cylinder.Axis().Direction()
            assert abs(axis.Z()) > 0.999999
            peg_results[hole["pcb_hole_id"]] = {"centre_error_mm": centre_error_mm, "nominal_radial_clearance_mm": radial_clearance_mm}
        if surface.GetType() == GeomAbs_Plane and abs(face_bounds.ymax - face_bounds.ymin) < 1e-6 and -0.001 <= face_bounds.ymin <= 0.05:
            if face_bounds.zmax < -7 or face_bounds.xmin >= 4.6 or face_bounds.xmax <= -4.6:
                landing = to_board_shape(face).BoundingBox()
                matching_pads = [pad for pad in pads if pad["x"] - pad["width"] / 2 <= landing.xmin + 1e-5 and pad["x"] + pad["width"] / 2 >= landing.xmax - 1e-5 and pad["y"] - pad["height"] / 2 <= landing.ymin + 1e-5 and pad["y"] + pad["height"] / 2 >= landing.ymax - 1e-5]
                assert len(matching_pads) == 1, "Physical landing is outside the imported copper land"
                coplanarity_mm = (landing.zmin - board_surface_z_mm) if pcb["layer"] == "top" else (board_surface_z_mm - landing.zmax)
                assert -1e-5 <= coplanarity_mm <= 0.1
                landing_results.append({"pad": matching_pads[0]["port_hints"], "coplanarity_mm": coplanarity_mm})
                landing_vertices.extend(vertex.toTuple() for vertex in to_board_shape(face).Vertices())
    assert len(peg_results) == 2
    assert len(landing_results) == 20, "Sixteen physical contacts and four shell feet must land on their supplier pads"
    world_bounds = to_board_shape(shape).BoundingBox()
    # Check the actual renderer output, not only an independently interpreted JSON transform.
    glb_bytes = (input_directory / "3d.glb").read_bytes()
    assert glb_bytes[:4] == b"glTF" and struct.unpack_from("<I", glb_bytes, 4)[0] == 2
    json_length = struct.unpack_from("<I", glb_bytes, 12)[0]
    glb = json.loads(glb_bytes[20:20 + json_length])
    binary_offset = 20 + json_length + 8
    node = next(node for node in glb["nodes"] if node.get("name") == reference)
    assert set(node) == {"name", "mesh", "translation"}
    rendered_vertices = []
    for primitive in glb["meshes"][node["mesh"]]["primitives"]:
        accessor = glb["accessors"][primitive["attributes"]["POSITION"]]
        assert accessor["componentType"] == 5126 and accessor["type"] == "VEC3"
        view = glb["bufferViews"][accessor["bufferView"]]
        offset = binary_offset + view.get("byteOffset", 0) + accessor.get("byteOffset", 0)
        stride = view.get("byteStride", 12)
        positions = np.ndarray((accessor["count"], 3), dtype="<f4", buffer=glb_bytes, offset=offset, strides=(stride, 4)).astype(float)
        positions += np.array(node["translation"])
        rendered_vertices.append(np.column_stack((-positions[:, 0], positions[:, 2], positions[:, 1])))
    rendered_vertices = np.concatenate(rendered_vertices)
    expected_bounds = np.array([[world_bounds.xmin, world_bounds.ymin, world_bounds.zmin], [world_bounds.xmax, world_bounds.ymax, world_bounds.zmax]])
    rendered_bounds = np.array([rendered_vertices.min(axis=0), rendered_vertices.max(axis=0)])
    assert np.max(np.abs(expected_bounds - rendered_bounds)) < 0.001
    landing_vertex_error_mm = max(float(np.sqrt(np.min(np.sum((rendered_vertices - np.array(vertex)) ** 2, axis=1)))) for vertex in landing_vertices)
    assert landing_vertex_error_mm < 0.0001, "Exported GLB contact geometry does not match registered STEP"

    results.append({"reference": reference, "layer": pcb["layer"], "pegs": peg_results, "physical_landings": landing_results, "rendered_bounds_mm": rendered_bounds.tolist(), "rendered_contact_vertex_max_error_mm": landing_vertex_error_mm, "passed": True})

report = {"revision": revision, "circuit_sha256": hashlib.sha256(circuit_bytes).hexdigest(), "rendered_glb_sha256": hashlib.sha256(glb_bytes).hexdigest(), "unchanged_import_sha256": hashlib.sha256(imported_definition).hexdigest(), "model_sha256": hashlib.sha256(model_bytes).hexdigest(), "drawing": "GCT USB4110 B4, 2024-05-22", "results": results, "passed": all(row["passed"] for row in results), "scope": "Both original supplier footprints versus genuine exact-part STEP, locating pegs, all forty contact landings and actual native GLB vertices; no physical assembly or plug fit claim"}
Path(sys.argv[2] if len(sys.argv) > 2 else f"evidence/rev-{revision}/TWO-PORT-USB-MODEL-AUDIT.json").write_text(json.dumps(report, indent=2)+"\n")
print("Both USB-C models: four locating pegs and all forty physical landings match original supplier pads and actual GLB vertices.")
