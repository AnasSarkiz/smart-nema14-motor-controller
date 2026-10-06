"""Audit the official KiCad export before exporting through KiCad's DSN API.

Purchased footprints are never edited. Only anonymous native mounting holes
receive export reference names, and project routing rules are selected.
Run with the installed KiCad Python runtime; all files stay in this board.
"""
import hashlib
import json
import math
import sys
from pathlib import Path

import pcbnew
import wx

application = wx.AppConsole() if sys.platform == "linux" else wx.App(False)

folder = Path(sys.argv[1] if len(sys.argv) > 1 else "evidence/rev-0.0.17-alpha.0/manual-usb")
native_path = folder / "circuit.json"
native = json.loads(native_path.read_text())
assert (folder / "board.kicad_pcb").is_file(), "Official KiCad export is absent"
board = pcbnew.LoadBoard(str((folder / "board.kicad_pcb").resolve()))
sources = {e["source_component_id"]: e["name"] for e in native if e["type"] == "source_component"}
sources.update({e["source_manually_placed_via_id"]: e["source_manually_placed_via_id"] for e in native if e["type"] == "source_manually_placed_via"})
components = {e["pcb_component_id"]: sources[e["source_component_id"]] for e in native if e["type"] == "pcb_component"}
ports = {e["pcb_port_id"]: e for e in native if e["type"] == "pcb_port"}
source_ports = {e["source_port_id"]: e for e in native if e["type"] == "source_port"}
parent = {}


def root(node):
    parent.setdefault(node, node)
    if parent[node] != node:
        parent[node] = root(parent[node])
    return parent[node]


for trace in (e for e in native if e["type"] == "source_trace"):
    members = trace["connected_source_port_ids"] + trace["connected_source_net_ids"]
    for member in members[1:]:
        parent[root(member)] = root(members[0])

footprints = {f.GetReference(): f for f in board.GetFootprints() if f.GetReference()}
issues = []
measurements = []
native_to_exported_net = {}
exported_to_native_net = {}
for pad in (e for e in native if e["type"] == "pcb_smtpad"):
    reference = components[pad["pcb_component_id"]]
    candidates = list(footprints[reference].Pads())
    if pad.get("pcb_port_id"):
        source_port = source_ports[ports[pad["pcb_port_id"]]["source_port_id"]]
        candidates = [p for p in candidates if p.GetNumber() == str(source_port["pin_number"])]
    closest = min(candidates, key=lambda p: math.hypot(
        pcbnew.ToMM(p.GetPosition().x) - 100 - pad["x"],
        100 - pcbnew.ToMM(p.GetPosition().y) - pad["y"],
    ))
    position_error_mm = math.hypot(
        pcbnew.ToMM(closest.GetPosition().x) - 100 - pad["x"],
        100 - pcbnew.ToMM(closest.GetPosition().y) - pad["y"],
    )
    width_error_mm = abs(pcbnew.ToMM(closest.GetSize().x) - pad["width"])
    height_error_mm = abs(pcbnew.ToMM(closest.GetSize().y) - pad["height"])
    expected_layer = pcbnew.F_Cu if pad["layer"] == "top" else pcbnew.B_Cu
    measurement = {
        "ref": reference,
        "native_pad_id": pad["pcb_smtpad_id"],
        "position_error_mm": position_error_mm,
        "width_error_mm": width_error_mm,
        "height_error_mm": height_error_mm,
        "layer_matches": closest.GetLayerSet().Contains(expected_layer),
    }
    expected_angle = pad.get("ccw_rotation", 0) % 180
    measurement["rotation_error_degrees"] = abs((closest.GetOrientationDegrees() - expected_angle + 90) % 180 - 90)
    expected_shape = pcbnew.PAD_SHAPE_RECT if pad["shape"] == "rect" else pcbnew.PAD_SHAPE_ROUNDRECT
    measurement["shape_matches"] = closest.GetShape() == expected_shape
    if pad["shape"] in ("pill", "rotated_pill"):
        measurement["corner_radius_error_mm"] = abs(pcbnew.ToMM(closest.GetRoundRectCornerRadius()) - pad["radius"])
    if pad.get("pcb_port_id"):
        native_net = root(ports[pad["pcb_port_id"]]["source_port_id"])
        exported_net = closest.GetNetCode()
        measurement["native_net"] = native_net
        measurement["exported_net"] = closest.GetNetname()
        if exported_net:
            native_to_exported_net.setdefault(native_net, set()).add(exported_net)
            exported_to_native_net.setdefault(exported_net, set()).add(native_net)
        else:
            measurement["disconnected_matches"] = not any(native_net == root(e["source_port_id"]) for e in native if e["type"] == "source_port" and e["source_port_id"] != ports[pad["pcb_port_id"]]["source_port_id"])
    measurements.append(measurement)
    if max(position_error_mm, width_error_mm, height_error_mm, measurement.get("corner_radius_error_mm", 0)) > 0.000002 or not measurement["layer_matches"] or not measurement["shape_matches"] or measurement["rotation_error_degrees"] > 0.000002 or measurement.get("disconnected_matches") is False:
        issues.append(measurement)

net_issues = {"split_native_nets": {net: sorted(codes) for net, codes in native_to_exported_net.items() if len(codes) != 1}, "merged_native_nets": {str(code): sorted(nets) for code, nets in exported_to_native_net.items() if len(nets) != 1}}

# Check the already-designed native USB copper against the official exporter,
# not just against its later routing-file copy.
source_traces = {e["source_trace_id"]: e for e in native if e["type"] == "source_trace"}
pcb_traces = {e["pcb_trace_id"]: e for e in native if e["type"] == "pcb_trace"}
tracks = list(board.GetTracks())
copper_issues = []
matched_tracks = set()
zero_length_contacts = 0
redundant_exported_vias = []
layer_ids = {"top": pcbnew.F_Cu, "inner1": pcbnew.In1_Cu,
             "inner2": pcbnew.In2_Cu, "bottom": pcbnew.B_Cu}


def trace_net_code(trace):
    members = source_traces[trace["source_trace_id"]]["connected_source_port_ids"]
    return next(iter(native_to_exported_net[root(members[0])]))


def native_position_error(point, position):
    return math.hypot(pcbnew.ToMM(position.x) - 100 - point["x"],
                      100 - pcbnew.ToMM(position.y) - point["y"])


for trace in pcb_traces.values():
    for start, end in zip(trace["route"], trace["route"][1:]):
        # KiCad coordinates use integer nanometres. Native coincident port
        # contacts can differ by floating-point roundoff below that grid.
        if all(round(start[axis]*1_000_000) == round(end[axis]*1_000_000) for axis in ('x','y')):
            # Native saved paths include coincident wire/via contact markers.
            # They contain no line copper; actual via barrels are checked below.
            zero_length_contacts += 1
            continue
        start_layer = start["layer"] if start["route_type"] == "wire" else start["to_layer"]
        end_layer = end["layer"] if end["route_type"] == "wire" else end["from_layer"]
        if start_layer != end_layer:
            continue
        width = start["width"] if start["route_type"] == "wire" else end["width"]
        candidates = [(index, track) for index, track in enumerate(tracks)
                      if track.GetClass() == "PCB_TRACK" and track.GetLayer() == layer_ids[start_layer]
                      and track.GetNetCode() == trace_net_code(trace) and index not in matched_tracks]
        matches = [(index, track) for index, track in candidates
                   if min(max(native_position_error(start, track.GetStart()), native_position_error(end, track.GetEnd())),
                          max(native_position_error(start, track.GetEnd()), native_position_error(end, track.GetStart()))) < 0.000002
                   and abs(pcbnew.ToMM(track.GetWidth()) - width) < 0.000002]
        if not matches:
            copper_issues.append({"trace": trace["pcb_trace_id"], "start": start, "end": end, "matching_segments": len(matches)})
        else:
            matched_tracks.add(matches[0][0])
for via in (e for e in native if e["type"] == "pcb_via"):
    matches = [(index, track) for index, track in enumerate(tracks)
               if track.GetClass() == "PCB_VIA"
               and track.GetNetCode() == (next(iter(native_to_exported_net[root(via["source_net_id"])])) if via.get("source_net_id") else trace_net_code(via if via.get("source_trace_id") else pcb_traces[via["pcb_trace_id"]]))
               and native_position_error(via, track.GetPosition()) < 0.000002
               and abs(pcbnew.ToMM(track.GetWidth(pcbnew.F_Cu)) - via["outer_diameter"]) < 0.000002
               and abs(pcbnew.ToMM(track.GetDrillValue()) - via["hole_diameter"]) < 0.000002
               and track.TopLayer() == pcbnew.F_Cu and track.BottomLayer() == pcbnew.B_Cu]
    if not matches:
        copper_issues.append({"via": via["pcb_via_id"], "matching_vias": 0})
    else:
        # The official exporter repeats shared route vias. Count every exact
        # coincident copy; reject any unmatched net, dimension or layer span.
        matched_tracks.update(index for index, _ in matches)
        if len(matches) > 1:
            redundant_exported_vias.append({"native_via": via["pcb_via_id"], "exact_coincident_copies": len(matches), "geometry_changed": False})
if len(matched_tracks) != len(tracks):
    copper_issues.append({"unmatched_exported_copper_objects": len(tracks) - len(matched_tracks)})

report = {
    "native_json_sha256": hashlib.sha256(native_path.read_bytes()).hexdigest(),
    "kicad_version": pcbnew.Version(),
    "electronic_footprints": len(footprints),
    "smt_pads_checked": len(measurements),
    "geometry_issues": issues,
    "net_partition_issues": net_issues,
    "measurements": measurements,
    "manual_copper_objects_checked": len(matched_tracks),
    "manual_copper_issues": copper_issues,
    "zero_length_native_contact_markers": zero_length_contacts,
    "redundant_exported_vias": redundant_exported_vias,
    "exporter_warning": "Shared native vias have exact coincident copies in the official KiCad export; routing diagnostic only, final manufacturing export requires cleanup/review." if redundant_exported_vias else None,
    "status": "failed" if issues or any(net_issues.values()) or copper_issues else "pad geometry, connectivity partitions and manual copper match",
    "scope": "Session preservation and final copper validation remain required; this is not fabrication approval.",
}
(folder / "KICAD-INTERCHANGE-AUDIT.json").write_text(json.dumps(report, indent=2) + "\n")
assert not issues, f"Official KiCad export has {len(issues)} pad geometry discrepancies"
assert not any(net_issues.values()), "Official KiCad export changed the native net partitions"
assert not copper_issues, "Official KiCad export changed the fixed native copper"

# Routing-file identities only: Freerouting 2.4.1 renumbers KiCad's ::n image
# variants when identical pad variants deduplicate. Instance names avoid that
# collision. No purchased pad, pin, net, outline, position or angle is changed.
for reference, footprint in footprints.items():
    footprint.SetFPID(pcbnew.LIB_ID("tscircuit-routing", reference))

anonymous = [f for f in board.GetFootprints() if not f.GetReference()]
mounting_holes = [f for f in anonymous if len(list(f.Pads())) == 1]
native_via_features = [f for f in anonymous if not list(f.Pads())]
assert len(native_via_features) == sum(e["type"] == "source_manually_placed_via" for e in native), "Unexpected anonymous footprint"
for index, footprint in enumerate(native_via_features):
    footprint.SetReference(f"NATIVE_VIA_FEATURE_{index + 1}")
    footprint.SetFPID(pcbnew.LIB_ID("tscircuit-routing", footprint.GetReference()))
assert len(mounting_holes) == 4
for index, footprint in enumerate(mounting_holes):
    pads = list(footprint.Pads())
    assert len(pads) == 1 and pads[0].GetAttribute() == pcbnew.PAD_ATTRIB_NPTH
    assert abs(pcbnew.ToMM(pads[0].GetDrillSize().x) - 2.5) < 0.000002
    footprint.SetReference(f"MOUNT_{index + 1}")

settings = board.GetDesignSettings()
default_class = settings.m_NetSettings.GetDefaultNetclass()
default_class.SetClearance(pcbnew.FromMM(0.15))
default_class.SetTrackWidth(pcbnew.FromMM(0.15))
default_class.SetViaDiameter(pcbnew.FromMM(0.6))
default_class.SetViaDrill(pcbnew.FromMM(0.3))
settings.m_MinClearance = pcbnew.FromMM(0.1)
dsn_path = folder / "kicad-native.dsn"
assert pcbnew.ExportSpecctraDSN(board, str(dsn_path.resolve())), "Official KiCad DSN export failed"
pcbnew.SaveBoard(str((folder / "routing-interchange.kicad_pcb").resolve()), board)
print(f"{len(footprints)} unchanged electronic footprints / {len(measurements)} matching SMT pads; exported {dsn_path}")
