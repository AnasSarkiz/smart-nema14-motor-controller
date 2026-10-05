"""Measure USB geometry and adjacent filled ground. No route generation."""
import hashlib
import json
import math
import sys
from pathlib import Path

from shapely.geometry import LineString, Point, Polygon
from shapely.ops import unary_union

input_path, output_path = map(Path, sys.argv[1:3])
circuit = json.loads(input_path.read_text())
parent = {}
def root(key):
    parent.setdefault(key, key)
    if parent[key] != key:
        parent[key] = root(parent[key])
    return parent[key]
for trace in (e for e in circuit if e["type"] == "source_trace"):
    members = trace["connected_source_port_ids"] + trace["connected_source_net_ids"]
    for member in members[1:]:
        parent[root(member)] = root(members[0])
nets = {e["name"]: root(e["source_net_id"]) for e in circuit if e["type"] == "source_net"}
traces = {e["source_trace_id"]: e for e in circuit if e["type"] == "source_trace"}
ground = {}
for layer in ("inner1", "inner2"):
    shapes = []
    for pour in (e for e in circuit if e["type"] == "pcb_copper_pour" and e["layer"] == layer and root(e["source_net_id"]) == nets["GND"]):
        brep = pour["brep_shape"]
        shapes.append(Polygon([(p["x"], p["y"]) for p in brep["outer_ring"]["vertices"]],
                              [[(p["x"], p["y"]) for p in r["vertices"]] for r in brep["inner_rings"]]))
    ground[layer] = unary_union(shapes)
usb_vias = []
for via in (e for e in circuit if e["type"] == "pcb_via"):
    if via.get("source_net_id"):
        net = root(via["source_net_id"])
    else:
        trace_id = via.get("source_trace_id") or next(e["source_trace_id"] for e in circuit if e["type"] == "pcb_trace" and e["pcb_trace_id"] == via["pcb_trace_id"])
        net = root(traces[trace_id]["connected_source_port_ids"][0])
    if net in (nets["USB_DP"], nets["USB_DM"]):
        usb_vias.append(Point(via["x"], via["y"]).buffer(via["outer_diameter"]/2 + .155 + .02, quad_segs=64))
# The native signal-via antipad is an intentional transition. Only these exact
# USB-via locations are excluded; other-net voids remain real missing reference.
transition_regions = unary_union(usb_vias)
segments = []
for trace in (e for e in circuit if e["type"] == "pcb_trace"):
    net = root(traces[trace["source_trace_id"]]["connected_source_port_ids"][0])
    if net not in (nets["USB_DP"], nets["USB_DM"]):
        continue
    polarity = "DP" if net == nets["USB_DP"] else "DM"
    for index, (first, second) in enumerate(zip(trace["route"], trace["route"][1:])):
        if (first["x"], first["y"]) == (second["x"], second["y"]):
            continue
        layer = first["layer"] if first["route_type"] == "wire" else first["to_layer"]
        assert layer in ("top", "bottom"), "USB changed to an unreviewed routing layer"
        width = first.get("width", second.get("width"))
        line = LineString([(first["x"], first["y"]), (second["x"], second["y"])])
        projection = line.buffer(width/2, quad_segs=64).difference(transition_regions)
        adjacent = "inner1" if layer == "top" else "inner2"
        missing = projection.difference(ground[adjacent])
        segments.append({"trace": trace["pcb_trace_id"], "segment": index, "polarity": polarity,
                         "layer": layer, "reference_layer": adjacent, "width_mm": width,
                         "length_mm": line.length, "missing_core_reference_mm2": missing.area, "missing_reference_bounds_mm": list(missing.bounds) if not missing.is_empty else [],
                         "start": [first["x"], first["y"]], "end": [second["x"], second["y"]]})
verticals = {}
for polarity in ("DP", "DM"):
    candidates = [s for s in segments if s["polarity"] == polarity and s["layer"] == "top" and abs(s["start"][0]-s["end"][0]) < .00001]
    verticals[polarity] = max(candidates, key=lambda s:s["length_mm"])
first, second = verticals["DP"], verticals["DM"]
gap = abs(first["start"][0]-second["start"][0]) - (first["width_mm"]+second["width_mm"])/2
overlap = min(max(first["start"][1], first["end"][1]), max(second["start"][1], second["end"][1])) - max(min(first["start"][1], first["end"][1]), min(second["start"][1], second["end"][1]))
assert overlap > 10, "Dominant USB pair no longer has the reviewed shared trunk"
# IPC microstrip screening approximation. The manufacturer must use its field
# solver and impedance coupon for the stated production stackup.
height_mm, thickness_mm, dielectric = .0994, .035, 4.05
single = 87/math.sqrt(dielectric+1.41)*math.log(5.98*height_mm/(.8*first["width_mm"]+thickness_mm))
differential = 2*single*(1-.48*math.exp(-.96*gap/height_mm))
missing = [s for s in segments if s["missing_core_reference_mm2"] > .000002]
report = {"input": str(input_path), "input_sha256": hashlib.sha256(input_path.read_bytes()).hexdigest(),
          "segments": segments, "missing_core_reference_segments": missing,
          "adjacent_ground_covers_signal_core": not missing,
          "common_top_pair_overlap_mm": overlap, "main_pair_width_mm": first["width_mm"],
          "main_pair_gap_mm": gap, "approximate_main_pair_impedance_ohm": differential,
          "stackup": {"name":"JLC04161H-3313", "outer_copper_mm": thickness_mm, "outer_to_inner_dielectric_mm": height_mm, "screening_dielectric_constant":dielectric},
          "scope":"Actual native segments and filled GND BRep. Exact USB-via antipads are disclosed transition exclusions. The approximation is not a field-solver result, a manufacturing coupon or a signal-integrity measurement; short connector/ESD escapes require visual review."}
output_path.write_text(json.dumps(report, indent=2)+"\n")
print(json.dumps({k:report[k] for k in ["adjacent_ground_covers_signal_core","main_pair_width_mm","main_pair_gap_mm","approximate_main_pair_impedance_ohm"]}))
print("Missing core-reference segments:",len(missing))
sys.exit(0 if not missing else 1)
