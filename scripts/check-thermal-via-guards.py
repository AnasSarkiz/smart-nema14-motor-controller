"""Negative regression checks for the narrowly scoped thermal-drill review.

These temporary invalid fixtures are tests only, never fabrication sources.
"""
import copy
import hashlib
import json
import subprocess
import sys
import tempfile
from pathlib import Path

checked_circuit_path = Path(sys.argv[1])
thermal_manifest_path = Path(sys.argv[2])
report_path = Path(sys.argv[3])
filled_manifest_path = Path(sys.argv[4])
checked_circuit = json.loads(checked_circuit_path.read_text())
thermal_manifest = json.loads(thermal_manifest_path.read_text())
circuit_sha256 = hashlib.sha256(checked_circuit_path.read_bytes()).hexdigest()
results = []

with tempfile.TemporaryDirectory(prefix="thermal-guard-", dir=report_path.parent) as temporary:
    fixture_directory = Path(temporary)
    for mutation in ["wrong_net", "wrong_drill", "unlisted_same_net_contact"]:
        manifest = copy.deepcopy(thermal_manifest)
        circuit = copy.deepcopy(checked_circuit)
        if mutation == "wrong_net":
            manifest["vias"][0]["net"] = "GND"
        elif mutation == "wrong_drill":
            manifest["vias"][0]["hole_diameter_mm"] = 0.31
        else:
            feature = next(via for via in thermal_manifest["vias"] if via["net"] == "GND")
            thermal_ground_via = next(entry for entry in circuit
                if entry["type"] == "pcb_via"
                and abs(entry["x"]-feature["x"]) < 0.00001
                and abs(entry["y"]-feature["y"]) < 0.00001)
            ordinary_via = copy.deepcopy(thermal_ground_via)
            ordinary_via.update({"pcb_via_id": "negative_same_net_via",
                "x": feature["x"] + .2, "y": feature["y"]})
            circuit.append(ordinary_via)
        input_path = fixture_directory / f"{mutation}.circuit.json"
        manifest_path = fixture_directory / f"{mutation}.manifest.json"
        output_path = fixture_directory / f"{mutation}.report.json"
        input_path.write_text(json.dumps(circuit))
        manifest_path.write_text(json.dumps(manifest))
        result = subprocess.run([sys.executable, "scripts/check-copper-geometry.py",
            str(input_path), str(output_path), str(manifest_path), str(filled_manifest_path)],
            capture_output=True, text=True, timeout=180)
        assert result.returncode != 0, f"Invalid {mutation} fixture passed"
        if mutation == "wrong_net":
            assert "Thermal via has the wrong electrical net" in result.stderr
        elif mutation == "wrong_drill":
            assert "Thermal drill or annulus differs" in result.stderr
        else:
            report = json.loads(output_path.read_text())
            assert any(violation.get("via") == "negative_same_net_via"
                and violation["check"] == "via_drill_to_pad_mm"
                and violation["same_net"] for violation in report["violations"])
        results.append({"invalid_fixture": mutation, "rejected": True})
report_path.write_text(json.dumps({"checked_circuit": str(checked_circuit_path), "circuit_sha256": circuit_sha256,
    "thermal_manifest": str(thermal_manifest_path), "results": results,
    "passed": True}, indent=2) + "\n")
print(json.dumps(results))
