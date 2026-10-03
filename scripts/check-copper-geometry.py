"""Independent measurements of generated copper, not routing configuration.

Shapely measures the native JSON's actual pad outlines, track widths and drills.
Same-net component/test pads are never exempted from ordinary drill clearance.
Connected via annuli and their own-net entering tracks are electrical contacts.
This check complements native DRC; it does not replace it or fabrication CAM.
"""
import hashlib
import json
import math
import sys
from pathlib import Path

from shapely import affinity
from shapely.geometry import LineString, Point, Polygon, box

input_path = Path(sys.argv[1] if len(sys.argv) > 1 else "dist/index/circuit.json")
data = json.loads(input_path.read_text())
revision = json.loads(Path("package.json").read_text())["version"]
output_path = Path(f"evidence/rev-{revision}/COPPER-GEOMETRY.json")
parent = {}


def root(node):
    parent.setdefault(node, node)
    if parent[node] != node:
        parent[node] = root(parent[node])
    return parent[node]


for trace in (entry for entry in data if entry["type"] == "source_trace"):
    members = trace["connected_source_port_ids"] + trace["connected_source_net_ids"]
    for member in members[1:]:
        parent[root(member)] = root(members[0])

sources = {e["source_component_id"]: e["name"] for e in data if e["type"] == "source_component"}
components = {e["pcb_component_id"]: sources[e["source_component_id"]] for e in data if e["type"] == "pcb_component"}
ports = {e["pcb_port_id"]: root(e["source_port_id"]) for e in data if e["type"] == "pcb_port"}
source_traces = {e["source_trace_id"]: e for e in data if e["type"] == "source_trace"}
net_names = {root(e["source_net_id"]): e["name"] for e in data if e["type"] == "source_net"}


def pad_outline(pad):
    x, y, width, height = (pad[key] for key in ("x", "y", "width", "height"))
    if pad["shape"] == "rect":
        geometry = box(x - width / 2, y - height / 2, x + width / 2, y + height / 2)
    elif pad["shape"] in ("pill", "rotated_pill"):
        radius = pad["radius"]
        half_x, half_y = max(0, width / 2 - radius), max(0, height / 2 - radius)
        geometry = box(x - half_x, y - half_y, x + half_x, y + half_y).buffer(radius, quad_segs=64)
    elif pad["shape"] == "circle":
        geometry = Point(x, y).buffer(pad["radius"], quad_segs=64)
    else:
        raise ValueError(f"Unreviewed pad shape: {pad['shape']}")
    return affinity.rotate(geometry, pad.get("ccw_rotation", 0), origin=(x, y))


pads = [(p, pad_outline(p), ports.get(p.get("pcb_port_id"))) for p in data if p["type"] == "pcb_smtpad"]
assert not any(e["type"] == "pcb_plated_hole" for e in data), "Extend and verify plated slot geometry before checking a design containing it"
violations = []
measurements = {"via_drill_to_pad_mm": None, "track_to_pad_mm": None, "track_to_track_mm": None, "via_to_track_mm": None, "via_to_via_mm": None}
measurement_counts = dict.fromkeys(measurements, 0)


def record_clearance(kind, item):
    measurement_counts[kind] += 1
    if measurements[kind] is None or item["actual_mm"] < measurements[kind]["actual_mm"]:
        measurements[kind] = item
    if item["actual_mm"] < item["required_mm"] - 0.00002:
        violations.append({"check": kind, **item})


tracks = []
lengths = {}
for trace in (e for e in data if e["type"] == "pcb_trace"):
    source = source_traces[trace["source_trace_id"]]
    net = root(source["connected_source_port_ids"][0])
    name = source.get("name", trace["pcb_trace_id"])
    route = trace["route"]
    lengths[name] = sum(math.hypot(a["x"] - b["x"], a["y"] - b["y"]) for a, b in zip(route, route[1:]))
    current_layer = route[0].get("layer", "top")
    for index, (a, b) in enumerate(zip(route, route[1:])):
        if a["route_type"] == "via":
            current_layer = a["to_layer"]
        elif a["route_type"] == "wire":
            current_layer = a["layer"]
        else:
            raise ValueError(f"Unreviewed route primitive {a['route_type']}")
        width = a.get("width", b.get("width", source.get("min_trace_thickness")))
        assert width is not None and width > 0
        if a["x"] == b["x"] and a["y"] == b["y"]:
            continue
        line = LineString([(a["x"], a["y"]), (b["x"], b["y"])])
        geometry = line.buffer(width / 2, quad_segs=32)
        segment = {"name": name, "index": index, "layer": current_layer, "net": net, "width_mm": width}
        tracks.append((segment, geometry))
        for pad, outline, pad_net in pads:
            if pad["layer"] != current_layer or pad_net == net:
                continue
            record_clearance("track_to_pad_mm", {"track": name, "segment": index, "pad": pad["pcb_smtpad_id"], "reference": components[pad["pcb_component_id"]], "actual_mm": geometry.distance(outline), "required_mm": 0.10})
        if width < 0.15 - 0.00002:
            violations.append({"check": "track_width", **segment, "required_mm": 0.15})

for i, (first, geometry) in enumerate(tracks):
    for second, other in tracks[i + 1:]:
        if first["layer"] == second["layer"] and first["net"] != second["net"]:
            record_clearance("track_to_track_mm", {"first": first["name"], "first_segment": first["index"], "second": second["name"], "second_segment": second["index"], "layer": first["layer"], "actual_mm": geometry.distance(other), "required_mm": 0.15})

vias = [e for e in data if e["type"] == "pcb_via"]
for via in vias:
    position = Point(via["x"], via["y"])
    source = source_traces[next(e["source_trace_id"] for e in data if e["type"] == "pcb_trace" and e["pcb_trace_id"] == via["pcb_trace_id"])]
    net = root(source["connected_source_port_ids"][0])
    assert set(via["layers"]) == {"top", "inner1", "inner2", "bottom"}, "Unreviewed blind/buried via"
    if via["hole_diameter"] < 0.3 - 0.00002 or via["outer_diameter"] < 0.6 - 0.00002 or (via["outer_diameter"] - via["hole_diameter"]) / 2 < 0.15 - 0.00002:
        violations.append({"check": "via_dimensions", "via": via})
    for pad, outline, pad_net in pads:
        record_clearance("via_drill_to_pad_mm", {"via": via["pcb_via_id"], "reference": components[pad["pcb_component_id"]], "pad": pad["pcb_smtpad_id"], "same_net": pad_net == net, "actual_mm": position.distance(outline) - via["hole_diameter"] / 2, "required_mm": 0.35})
        if pad_net != net and position.distance(outline) - via["outer_diameter"] / 2 < 0.15 - 0.00002:
            violations.append({"check": "via_annulus_to_other_net_pad", "via": via["pcb_via_id"], "pad": pad["pcb_smtpad_id"], "reference": components[pad["pcb_component_id"]]})
    for segment, geometry in tracks:
        if segment["net"] != net:
            record_clearance("via_to_track_mm", {"via": via["pcb_via_id"], "track": segment["name"], "segment": segment["index"], "layer": segment["layer"], "actual_mm": position.distance(geometry) - via["outer_diameter"] / 2, "required_mm": 0.15})

for i, first in enumerate(vias):
    for second in vias[i + 1:]:
        distance = math.hypot(first["x"] - second["x"], first["y"] - second["y"])
        record_clearance("via_to_via_mm", {"first": first["pcb_via_id"], "second": second["pcb_via_id"], "actual_mm": distance - (first["outer_diameter"] + second["outer_diameter"]) / 2, "required_mm": 0.15})

board = next(e for e in data if e["type"] == "pcb_board")
boundary = box(board["center"]["x"] - board["width"] / 2 + 0.3, board["center"]["y"] - board["height"] / 2 + 0.3, board["center"]["x"] + board["width"] / 2 - 0.3, board["center"]["y"] + board["height"] / 2 - 0.3)
for segment, geometry in tracks:
    if not boundary.covers(geometry):
        violations.append({"check": "track_board_edge", **segment})
    for hole in (e for e in data if e["type"] == "pcb_hole"):
        assert hole["hole_shape"] == "circle"
        clearance = Point(hole["x"], hole["y"]).distance(geometry) - hole["hole_diameter"] / 2
        if clearance < 0.35 - 0.00002:
            violations.append({"check": "track_npth", **segment, "hole": hole["pcb_hole_id"], "clearance_mm": clearance})
    for keepout in (e for e in data if e["type"] == "pcb_keepout"):
        assert keepout["shape"] == "circle"
        if segment["layer"] in keepout["layers"] and Point(keepout["center"]["x"], keepout["center"]["y"]).distance(geometry) < keepout["radius"] - 0.00002:
            violations.append({"check": "track_keepout", **segment, "keepout": keepout["pcb_keepout_id"]})

usb_lengths = {}
for polarity in ("DP", "DM"):
    names = [f"USB_{polarity}_CONNECTOR_ESD", f"USB_{polarity}_ESD_MCU"]
    if all(name in lengths for name in names):
        usb_lengths[polarity] = sum(lengths[name] for name in names)
skew = abs(usb_lengths["DP"] - usb_lengths["DM"]) if len(usb_lengths) == 2 else None
if skew is not None and skew > 0.5:
    violations.append({"check": "usb_length_skew", "actual_mm": skew, "required_max_mm": 0.5})
report = {
    "revision": revision,
    "input": str(input_path),
    "input_sha256": hashlib.sha256(input_path.read_bytes()).hexdigest(),
    "scope": "Actual tracks, drills and component/test pads. Pour geometry, silkscreen, paste, impedance CAM and full connectivity remain separate checks.",
    "track_count": len(lengths),
    "segment_count": len(tracks),
    "via_count": len(vias),
    "usb_path_lengths_mm": usb_lengths,
    "usb_length_skew_mm": skew,
    "minimum_clearances": measurements,
    "measurement_counts": measurement_counts,
    "violations": violations,
    "passed": not violations,
}
output_path.write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
sys.exit(0 if not violations else 1)
