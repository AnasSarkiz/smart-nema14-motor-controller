"""Apply reviewed edits to canonical board routing data, never components."""
import hashlib
import json
from pathlib import Path

raw_path = Path("evidence/rev-0.0.17-alpha.0/manual-usb-060/complete-saved-paths.json")
edits = json.loads(Path("src/routing/manual-edits.json").read_text())
assert hashlib.sha256(raw_path.read_bytes()).hexdigest() == edits["input_sha256"], "Re-review manual edits after regenerating the route input"
routes = json.loads(raw_path.read_text())
counts = []
for edit in edits["points"]:
    count = 0
    for path in routes["paths"]:
        for point in path["route"]:
            if point["x"] == edit["from"]["x"] and point["y"] == edit["from"]["y"]:
                point.update(edit["to"])
                count += 1
    assert count == edit["expected_points"], "Manual routing edit matched a different topology"
    counts.append(count)
for edit in edits.get("segments", []):
    count = 0
    for path in routes["paths"]:
        points = path["route"]
        for index in range(len(points) - 2, -1, -1):
            first, second = points[index:index + 2]
            if all(first[key] == edit["from"][key] for key in ("x", "y")) and all(second[key] == edit["to"][key] for key in ("x", "y")):
                assert first["route_type"] == second["route_type"] == "wire"
                assert first["layer"] == second["layer"]
                points[index + 1:index + 1] = [{**first, **bend} for bend in edit["bends"]]
                count += 1
    assert count == edit["expected_segments"], "Manual routing bend matched a different topology"
    counts.append(count)
for addition in edits.get("additions", []):
    assert addition["net"] not in routes["net_names"]
    assert not any(connection in routes["connections"] for connection in addition["connections"])
    routes["net_names"].append(addition["net"])
    routes["connections"].extend(addition["connections"])
    routes["paths"].append(addition["path"])
routes["manual_edit_basis"] = edits
Path("src/routing/saved-paths.json").write_text(json.dumps(routes, indent=2) + "\n")
print(f"Applied {len(counts)} reviewed point edits to {sum(counts)} repeated path contacts; physical checks remain required")
