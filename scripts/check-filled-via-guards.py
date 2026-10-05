"""Negative fixtures for explicit Type-VII features; never fabrication input."""
import copy
import json
import subprocess
import sys
import tempfile
from pathlib import Path

circuit_path = Path(sys.argv[1])
thermal_path = Path(sys.argv[2])
filled_path = Path(sys.argv[3])
report_path = Path(sys.argv[4])
circuit = json.loads(circuit_path.read_text())
manifest = json.loads(filled_path.read_text())
results = []
with tempfile.TemporaryDirectory(prefix="filled-guard-fixtures-", dir=report_path.parent) as directory:
    folder = Path(directory)
    for mutation in ["wrong_net", "wrong_drill", "wrong_owner", "unlisted_small_via", "ordinary_same_net_contact"]:
        fixture = copy.deepcopy(circuit)
        declarations = copy.deepcopy(manifest)
        expected_assertion = None
        if mutation == "wrong_net":
            declarations["features"][0]["net"] = "VM"
            expected_assertion = "Filled feature has wrong electrical net"
        elif mutation == "wrong_drill":
            declarations["features"][0]["hole_diameter_mm"] = .15
            expected_assertion = "Filled feature drill or copper differs"
        elif mutation == "wrong_owner":
            declarations["features"][0]["owner"]["pin_number"] = 1
            expected_assertion = "Filled feature owner pad has wrong net"
        else:
            original = next(e for e in circuit if e["type"] == "pcb_via" and e.get("source_net_id") and abs(e["x"]+4.8)<.00001)
            invalid = copy.deepcopy(original)
            invalid.update({"pcb_via_id": "negative_unlisted_via", "x": -4.929884, "y": 4.75})
            if mutation == "ordinary_same_net_contact":
                invalid.update({"hole_diameter": .3, "outer_diameter": .6})
            fixture.append(invalid)
        fixture_path = folder / "invalid.circuit.json"
        declarations_path = folder / "invalid.manifest.json"
        measurements_path = folder / "invalid.report.json"
        fixture_path.write_text(json.dumps(fixture))
        declarations_path.write_text(json.dumps(declarations))
        result = subprocess.run([sys.executable, "scripts/check-copper-geometry.py", str(fixture_path), str(measurements_path), str(thermal_path), str(declarations_path)], capture_output=True, text=True, timeout=180)
        assert result.returncode != 0, f"Invalid {mutation} fixture passed"
        if expected_assertion:
            assert expected_assertion in result.stderr, result.stderr
        else:
            violations = json.loads(measurements_path.read_text())["violations"]
            if mutation == "unlisted_small_via":
                assert any(e["check"] == "via_dimensions" and e["via"]["pcb_via_id"] == "negative_unlisted_via" for e in violations)
            else:
                assert any(e["check"] == "via_drill_to_pad_mm" and e.get("via") == "negative_unlisted_via" and e["same_net"] and e["required_mm"] == .35 for e in violations)
        results.append({"invalid_fixture": mutation, "rejected": True})
report_path.write_text(json.dumps({"circuit": str(circuit_path), "filled_manifest": str(filled_path), "results": results, "passed": True}, indent=2)+"\n")
print(json.dumps(results))
