"""Create conservative via-only routing obstacles from the actual SMT geometry.

All ordinary drills must clear every component pad by 0.35 mm. With 0.60/0.30
vias and 0.15 mm obstacle clearance this requires a 0.50 mm center-to-pad gap,
including same-net pads. The purchased pads themselves remain unchanged.
"""
import hashlib
import json
import sys
from pathlib import Path

from shapely import affinity
from shapely.geometry import Point, box

folder = Path(sys.argv[1])
native_path = folder / "circuit.json"
native = json.loads(native_path.read_text())
guards = []
for pad in (e for e in native if e["type"] == "pcb_smtpad"):
    x, y, width, height = (pad[key] for key in ("x", "y", "width", "height"))
    if pad["shape"] == "rect":
        outline = box(x - width / 2, y - height / 2, x + width / 2, y + height / 2)
    elif pad["shape"] in ("pill", "rotated_pill"):
        radius = pad["radius"]
        half_x, half_y = max(0, width / 2 - radius), max(0, height / 2 - radius)
        outline = box(x - half_x, y - half_y, x + half_x, y + half_y).buffer(radius, quad_segs=16)
    elif pad["shape"] == "circle":
        outline = Point(x, y).buffer(pad["radius"], quad_segs=16)
    else:
        raise ValueError(f"Unreviewed pad shape {pad['shape']}")
    outline = affinity.rotate(outline, pad.get("ccw_rotation", 0), origin=(x, y))
    # Cover the chord error of the 64-sided circle approximation.
    outline = outline.buffer(0.052, quad_segs=16)
    guards.append({"pad": pad["pcb_smtpad_id"], "outline": list(outline.exterior.coords)[:-1]})
report = {"native_json_sha256": hashlib.sha256(native_path.read_bytes()).hexdigest(), "via_guard_pad_count": len(guards), "guards": guards, "scope": "Routing planning obstacles only; actual generated drills still require the independent 0.35 mm clearance check."}
(folder / "routing-pad-guards.json").write_text(json.dumps(report, indent=2) + "\n")
print(f"Prepared {len(guards)} via-only pad guards")
