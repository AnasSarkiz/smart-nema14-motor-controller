"""Verify the exact unchanged selected STEP reference; not assembly qualification."""
import hashlib
import json
import os
from pathlib import Path

os.environ["XDG_CACHE_HOME"] = str(Path(".mechanical-cache").resolve())
import cadquery as cq

path = Path("references/motor/14hm11-0404s/14HM11-0404S.STEP")
checksum = hashlib.sha256(path.read_bytes()).hexdigest()
assert checksum == "959f43e95b7840beae5ffbd56e997e23c5004a1b09e16b7caa40400296e46281"
shape = cq.importers.importStep(str(path)).val()
assert shape.isValid()
assert len(shape.Solids()) == 1
bounds = shape.BoundingBox()
assert abs(bounds.zmin + 24) < 1e-5
assert abs(bounds.zmax - 28.2) < 1e-5
circuit = json.loads(Path("dist/assembly/circuit.json").read_text())
motor_source = next(item for item in circuit if item["type"] == "source_component" and item["name"] == "OfficialStepperOnline14hm11Motor")
cad = next(item for item in circuit if item["type"] == "cad_component" and item["source_component_id"] == motor_source["source_component_id"])
assert cad["model_origin_position"] == {"x": 0, "y": 0, "z": 28.2}
assert cad["position"] == {"x": 0, "y": 0, "z": 65}
assert cad["rotation"] == {"x": 0, "y": 0, "z": 0}
report = {
    "motor": "STEPPERONLINE 14HM11-0404S",
    "source_sha256": checksum,
    "valid_brep": shape.isValid(),
    "solid_count": len(shape.Solids()),
    "reference_datum_checks": "passed",
    "source_z_bounds_mm": [bounds.zmin, bounds.zmax],
    "native_world_z_bounds_mm": [bounds.zmin - 28.2 + 65, bounds.zmax - 28.2 + 65],
    "assembly_fit": "blocked: no qualified rear attachment",
    "encoder_decision": "pending",
    "drawing_and_step_revision_compatibility": "physical hardware confirmation pending",
    "fabrication_ready": False,
}
Path(f"evidence/rev-{json.loads(Path("package.json").read_text())["version"]}/STEP-REFERENCE-VERIFICATION.json").write_text(json.dumps(report, indent=2) + "\n")
print("Exact manufacturer STEP: checksum, valid solid and selected datums verified. Assembly fit remains blocked.")
