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
output_path = Path(sys.argv[2] if len(sys.argv) > 2 else f"evidence/rev-{revision}/COPPER-GEOMETRY.json")
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
# Native manually placed vias are PCB features, not purchased components.
sources.update({e["source_manually_placed_via_id"]: e["source_manually_placed_via_id"] for e in data if e["type"] == "source_manually_placed_via"})
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
thermal_manifest_path = Path(sys.argv[3]) if len(sys.argv) > 3 else None
thermal_contacts = []
filled_manifest_path = Path(sys.argv[4]) if len(sys.argv) > 4 else None
filled_features = json.loads(filled_manifest_path.read_text())["features"] if filled_manifest_path else []
filled_contacts = []
filled_matches = []
assert len({f["name"] for f in filled_features}) == len(filled_features)
assert len({(f["x"], f["y"]) for f in filled_features}) == len(filled_features)
for feature in filled_features:
    assert feature["process"] == "IPC-4761 Type VII epoxy filled and copper capped, ENIG"
    assert feature["construction"] in {"filled_capped_pad_contact", "filled_capped_close_escape", "filled_capped_ordinary_escape"}
    assert feature["hole_diameter_mm"] in {.15, .2} and feature["outer_diameter_mm"] == .38
    assert feature["minimum_foreign_drill_to_pad_mm"] == (.35 if feature["construction"] == "filled_capped_ordinary_escape" else .25)

thermal_vias = json.loads(thermal_manifest_path.read_text())["vias"] if thermal_manifest_path else []
pcb_ports = {e["pcb_port_id"]:e for e in data if e["type"] == "pcb_port"}
source_ports = {e["source_port_id"]:e for e in data if e["type"] == "source_port"}
assert not any(e["type"] == "pcb_plated_hole" for e in data), "Extend and verify plated slot geometry before checking a design containing it"
violations = []
measurements = {"via_drill_to_pad_mm": None, "track_to_pad_mm": None, "track_to_track_mm": None, "via_to_track_mm": None, "via_to_via_mm": None, "via_hole_to_via_hole_mm": None}
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
    if via.get("source_net_id") is not None:
        net = root(via["source_net_id"])
    elif via.get("source_trace_id") is not None:
        net = root(source_traces[via["source_trace_id"]]["connected_source_port_ids"][0])
    else:
        source = source_traces[next(e["source_trace_id"] for e in data if e["type"] == "pcb_trace" and e["pcb_trace_id"] == via["pcb_trace_id"])]
        net = root(source["connected_source_port_ids"][0])
    assert set(via["layers"]) == {"top", "inner1", "inner2", "bottom"}, "Unreviewed blind/buried via"
    filled = next((f for f in filled_features if math.hypot(f["x"]-via["x"], f["y"]-via["y"]) < .00001), None)
    if filled:
        assert net_names[net] == filled["net"], "Filled feature has wrong electrical net"
        assert abs(via["hole_diameter"]-filled["hole_diameter_mm"]) < .00001 and abs(via["outer_diameter"]-filled["outer_diameter_mm"]) < .00001, "Filled feature drill or copper differs from manifest"
        assert (via["outer_diameter"]-via["hole_diameter"])/2 >= .075, "Filled feature annulus below preferred manufacturer minimum"
        filled_matches.append(filled["name"])
    # Current user target: 0.30/0.45 mm. JLCPCB's preferred diameter
    # difference is 0.15 mm, i.e. a 0.075 mm radial annular ring.
    # This changes the explicit size policy; every spacing/ownership check
    # below remains intact. Named small filled features retain exact manifests.
    elif via["hole_diameter"] < .3-.00002 or via["outer_diameter"] < .45-.00002 or (via["outer_diameter"]-via["hole_diameter"])/2 < .075-.00002:
        violations.append({"check": "via_dimensions", "via": via})
    for pad, outline, pad_net in pads:
        thermal = next((entry for entry in thermal_vias
            if math.hypot(entry['x']-via['x'],entry['y']-via['y'])<.00001
            and entry['reference']==components[pad['pcb_component_id']]
            and entry['pin_number']==source_ports[pcb_ports[pad['pcb_port_id']]['source_port_id']].get('pin_number')), None) if pad.get('pcb_port_id') else None
        pad_owner = {"reference": components[pad["pcb_component_id"]], "pin_number": source_ports[pcb_ports[pad["pcb_port_id"]]["source_port_id"]].get("pin_number")} if pad.get("pcb_port_id") else None
        filled_owner = filled and pad_owner in [filled["owner"], *filled.get("additional_owners", [])]
        if filled_owner:
            assert pad_net == net, "Filled feature owner pad has wrong net"
            if filled["construction"] == "filled_capped_pad_contact":
                assert position.buffer(via["outer_diameter"]/2, quad_segs=64).intersects(outline), "Filled feature does not contact named owner"
                filled_contacts.append({"name": filled["name"], "via": via["pcb_via_id"], **pad_owner, "layer": pad["layer"], "net": filled["net"], "construction": filled["construction"]})
            else:
                record_clearance("via_drill_to_pad_mm", {"via": via["pcb_via_id"], **pad_owner, "pad": pad["pcb_smtpad_id"], "same_net": True, "actual_mm": position.distance(outline)-via["hole_diameter"]/2, "required_mm": filled["minimum_foreign_drill_to_pad_mm"]})
        elif thermal:
            assert pad_net == net and net_names[net] == thermal['net'], 'Thermal via has the wrong electrical net'
            assert abs(via['hole_diameter']-thermal['hole_diameter_mm'])<.00001 and abs(via['outer_diameter']-thermal['outer_diameter_mm'])<.00001, 'Thermal drill or annulus differs from reviewed construction'
            assert outline.covers(position.buffer(via['outer_diameter']/2,quad_segs=64)), 'Thermal via is not fully inside its exposed pad'
            thermal_contacts.append({'name':thermal['name'],'via':via['pcb_via_id'],'reference':thermal['reference'],'pin_number':thermal['pin_number'],'net':thermal['net'],'actual_drill_to_owner_pad_mm':position.distance(outline)-via['hole_diameter']/2,'reason':thermal['reason']})
        else:
            record_clearance("via_drill_to_pad_mm", {"via": via["pcb_via_id"], "reference": components[pad["pcb_component_id"]], "pad": pad["pcb_smtpad_id"], "same_net": pad_net == net, "actual_mm": position.distance(outline) - via["hole_diameter"] / 2, "required_mm": filled["minimum_foreign_drill_to_pad_mm"] if filled else 0.35})
        if pad_net != net and position.distance(outline) - via["outer_diameter"] / 2 < 0.15 - 0.00002:
            violations.append({"check": "via_annulus_to_other_net_pad", "via": via["pcb_via_id"], "pad": pad["pcb_smtpad_id"], "reference": components[pad["pcb_component_id"]]})
    for segment, geometry in tracks:
        if segment["net"] != net:
            record_clearance("via_to_track_mm", {"via": via["pcb_via_id"], "track": segment["name"], "segment": segment["index"], "layer": segment["layer"], "actual_mm": position.distance(geometry) - via["outer_diameter"] / 2, "required_mm": 0.15})

for i, first in enumerate(vias):
    for second in vias[i + 1:]:
        distance = math.hypot(first["x"] - second["x"], first["y"] - second["y"])
        record_clearance("via_hole_to_via_hole_mm", {"first": first["pcb_via_id"], "second": second["pcb_via_id"], "actual_mm": distance-(first["hole_diameter"]+second["hole_diameter"])/2, "required_mm": .35})
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

# Ordinary vias must also clear the actual board boundary, NPTH drills and
# mechanical copper keepouts. These checks include same-net drill cases above.
for via in vias:
    position = Point(via["x"], via["y"])
    annulus = position.buffer(via["outer_diameter"] / 2, quad_segs=64)
    if not boundary.covers(annulus):
        violations.append({"check": "via_board_edge", "via": via["pcb_via_id"]})
    for hole in (e for e in data if e["type"] == "pcb_hole"):
        assert hole["hole_shape"] == "circle"
        spacing = position.distance(Point(hole["x"], hole["y"])) - (hole["hole_diameter"] + via["outer_diameter"]) / 2
        if spacing < .35 - .00002:
            violations.append({"check": "via_npth", "via": via["pcb_via_id"], "hole": hole["pcb_hole_id"], "actual_mm": spacing, "required_mm": .35})
    for keepout in (e for e in data if e["type"] == "pcb_keepout"):
        assert keepout["shape"] == "circle"
        if any(layer in keepout["layers"] for layer in via["layers"]) and position.distance(Point(keepout["center"]["x"], keepout["center"]["y"])) - via["outer_diameter"] / 2 < keepout["radius"] - .00002:
            violations.append({"check": "via_keepout", "via": via["pcb_via_id"], "keepout": keepout["pcb_keepout_id"]})

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
    "scope": "Actual tracks, drills, component/test pads, board edges, NPTH and mechanical keepouts. USB path length is independently measured by measure-usb-paths.py; absent legacy trace-name lengths below are not a USB pass. Pour geometry, silkscreen, paste, impedance CAM and full connectivity remain separate checks.",
    "track_count": len(lengths),
    "segment_count": len(tracks),
    "via_count": len(vias),
    "thermal_manifest_sha256": hashlib.sha256(thermal_manifest_path.read_bytes()).hexdigest() if thermal_manifest_path else None,
    "reviewed_thermal_drill_contacts": thermal_contacts,
    "filled_manifest_sha256": hashlib.sha256(filled_manifest_path.read_bytes()).hexdigest() if filled_manifest_path else None,
    "reviewed_filled_contacts": filled_contacts,
    "filled_features_matched": filled_matches,
    "usb_path_lengths_mm": usb_lengths,
    "usb_length_skew_mm": skew,
    "minimum_clearances": measurements,
    "measurement_counts": measurement_counts,
    "violations": violations,
    "passed": not violations,
}
assert len(thermal_contacts) == len(thermal_vias), 'Every declared thermal via must match exactly one emitted via and its exposed pad'
assert sorted(filled_matches) == sorted(f["name"] for f in filled_features), "Each named filled feature must match exactly one native emitted via"
expected_owners = sum(1+len(f.get("additional_owners", [])) for f in filled_features if f["construction"] == "filled_capped_pad_contact")
assert len(filled_contacts) == expected_owners, "Every intentionally contacted pad must be explicitly declared and checked"
output_path.write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
sys.exit(0 if not violations else 1)
