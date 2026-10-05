"""Create conservative via-only routing obstacles from the actual SMT geometry.

All ordinary drills must clear every component pad by 0.35 mm. With 0.60/0.30
vias and 0.15 mm obstacle clearance this requires a 0.50 mm center-to-pad gap,
including same-net pads. The purchased pads themselves remain unchanged.
"""
import hashlib
import json
import math
import sys
from pathlib import Path

from shapely import affinity
from shapely.geometry import Point, Polygon, box
from shapely.ops import unary_union

folder = Path(sys.argv[1])
native_path = folder / "circuit.json"
native = json.loads(native_path.read_text())
guards = []
# Only physically emitted, declared Type-VII and exposed-pad features receive
# planning apertures. An ordinary .6 mm via plus .15 mm clearance cannot fit
# in a .38 mm feature's .684 mm aperture. Final drill ownership and spacing
# remain mandatory independent checks.
filled_path = Path('src/routing/filled-signal-vias-trial.json')
thermal_path = Path('src/routing/thermal-vias-trial.json')
features = json.loads(filled_path.read_text())['features'] + json.loads(thermal_path.read_text())['vias']
reviewed_apertures = []
for feature in features:
 matches = [v for v in native if v['type'] == 'pcb_via' and abs(v['x']-feature['x']) < .00001 and abs(v['y']-feature['y']) < .00001]
 assert len(matches) == 1, 'Declared fixed drill missing or duplicated'
 via = matches[0]
 assert abs(via['outer_diameter']-feature['outer_diameter_mm']) < .00001 and abs(via['hole_diameter']-feature['hole_diameter_mm']) < .00001
 # Freerouting represents circular vias with a circumscribed IntOctagon.
 # Match that public geometric representation for the fixed-feature aperture;
 # a circular hole gave false contacts after octagonal obstacle decomposition.
 # This is planning geometry only. Actual circular drills and copper retain
 # their stricter independent ownership, hole and foreign-pad checks.
 radius_mm = via['outer_diameter']/2+.152
 bevel_mm = radius_mm*(math.sqrt(2)-1)
 aperture = Polygon([(via['x']+dx,via['y']+dy) for dx,dy in
     [(radius_mm,bevel_mm),(bevel_mm,radius_mm),(-bevel_mm,radius_mm),
      (-radius_mm,bevel_mm),(-radius_mm,-bevel_mm),(-bevel_mm,-radius_mm),
      (bevel_mm,-radius_mm),(radius_mm,-bevel_mm)]])
 reviewed_apertures.append(aperture)
allowed_fixed_features = unary_union(reviewed_apertures)

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
    outline = outline.difference(allowed_fixed_features)
    polygons = list(outline.geoms) if outline.geom_type == 'MultiPolygon' else [outline]
    for polygon in polygons:
        if polygon.is_empty:
            continue
        # Specctra area scopes support window polygons. Preserve the native
        # aperture topology instead of triangulating it: the router's octagonal
        # envelopes of skinny triangles intruded into valid fixed-via apertures.
        guards.append({"pad": pad["pcb_smtpad_id"],
                       "outline": list(polygon.exterior.coords)[:-1],
                       "windows": [list(ring.coords)[:-1] for ring in polygon.interiors]})
report = {"native_json_sha256": hashlib.sha256(native_path.read_bytes()).hexdigest(), "via_guard_pad_count": 423, "guard_polygon_count": len(guards), "fixed_process_feature_apertures": len(reviewed_apertures), "filled_manifest_sha256": hashlib.sha256(filled_path.read_bytes()).hexdigest(), "thermal_manifest_sha256": hashlib.sha256(thermal_path.read_bytes()).hexdigest(), "guards": guards, "scope": "Routing planning obstacles only; actual generated drills still require the independent 0.35 mm clearance check."}
(folder / "routing-pad-guards.json").write_text(json.dumps(report, indent=2) + "\n")
print(f"Prepared {len(guards)} via-only pad guards")
