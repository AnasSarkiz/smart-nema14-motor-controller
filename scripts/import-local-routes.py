"""Import a local official routing session and audit immutable design objects.

Run with KiCad's framework Python runtime. No supplier footprint is changed.
This checks preservation, not final connectivity, clearances or fabrication.
"""
import hashlib
import json
import sys
from collections import Counter
from pathlib import Path

import pcbnew
import wx

application = wx.AppConsole() if sys.platform == "linux" else wx.App(False)
folder = Path(sys.argv[1])
session_path = folder / "local-routed.ses"
board = pcbnew.LoadBoard(str((folder / "local-routing.kicad_pcb").resolve()))


def vector(point):
    return [point.x, point.y]


def footprint_signature(footprint):
    pads = []
    for pad in footprint.Pads():
        pads.append({
            "number": pad.GetNumber(), "position": vector(pad.GetPosition()),
            "size": vector(pad.GetSize()), "drill": vector(pad.GetDrillSize()),
            "attribute": pad.GetAttribute(), "shape": pad.GetShape(),
            "angle": pad.GetOrientationDegrees(), "net": pad.GetNetname(),
            "layers": list(pad.GetLayerSet().Seq()),
            "corner_radius": pad.GetRoundRectCornerRadius(),
        })
    return {"position": vector(footprint.GetPosition()),
            "angle": footprint.GetOrientationDegrees(),
            "layer": footprint.GetLayer(), "pads": pads}


def copper_signature(track):
    if track.GetClass() == "PCB_VIA":
        return ("via", track.GetNetname(), *vector(track.GetPosition()),
                track.GetWidth(pcbnew.F_Cu), track.GetDrillValue(),
                track.TopLayer(), track.BottomLayer())
    endpoints = sorted([vector(track.GetStart()), vector(track.GetEnd())])
    return ("wire", track.GetNetname(), track.GetLayer(), track.GetWidth(),
            *endpoints[0], *endpoints[1])


before_footprints = {f.GetReference(): footprint_signature(f) for f in board.GetFootprints()}
before_copper = Counter(copper_signature(t) for t in board.GetTracks())
ripup_scope_path = folder / "routing-ripup-scope.json"
ripup_nets = set(json.loads(ripup_scope_path.read_text())["nets"]) if ripup_scope_path.exists() else set()
assert not ripup_nets.intersection({"USB_DP", "USB_DM", "VM", "VBUS_CONN", "VBUS_PROTECTED", "EFUSE_RTN", "GND"})
fixed_copper = Counter(copper_signature(t) for t in board.GetTracks() if t.IsLocked() or t.GetNetname() not in ripup_nets)
assert pcbnew.ImportSpecctraSES(board, str(session_path.resolve())), "Official KiCad session import failed"
after_footprints = {f.GetReference(): footprint_signature(f) for f in board.GetFootprints()}
after_copper = Counter(copper_signature(t) for t in board.GetTracks())
selection_path = folder / "selected-nets.json"
selected_nets = set(json.loads(selection_path.read_text())) if selection_path.exists() else set()
unexpected_unselected_additions = [signature for signature in (after_copper - before_copper).elements()
                                  if selected_nets and signature[1] not in selected_nets]
changed_footprints = [ref for ref in before_footprints if before_footprints[ref] != after_footprints.get(ref)]
missing_copper = list((fixed_copper - after_copper).elements())
changed_selected_copper = list((before_copper - after_copper).elements())
report = {
    "session_sha256": hashlib.sha256(session_path.read_bytes()).hexdigest(),
    "native_json_sha256": hashlib.sha256((folder / "circuit.json").read_bytes()).hexdigest(),
    "kicad_version": pcbnew.Version(), "footprints_checked": len(before_footprints),
    "changed_footprints": changed_footprints,
    "preserved_manual_copper_objects": sum(fixed_copper.values()),
    "rerouting_nets": sorted(ripup_nets),
    "removed_selected_copper_objects": len(changed_selected_copper),
    "missing_manual_copper": missing_copper,
    "unexpected_unselected_additions": unexpected_unselected_additions,
    "final_copper_objects": sum(after_copper.values()),
    "status": "failed" if changed_footprints or missing_copper or unexpected_unselected_additions else "preservation passed",
    "scope": "Final connectivity and native copper checks remain required.",
}
(folder / "SESSION-IMPORT-AUDIT.json").write_text(json.dumps(report, indent=2) + "\n")
assert not changed_footprints, f"Session changed footprint geometry or connectivity: {changed_footprints}"
assert not missing_copper, "Session changed fixed native copper outside the selected rerouting group"
assert not unexpected_unselected_additions, "Session added copper outside the selected routing group"
pcbnew.SaveBoard(str((folder / "local-routed.kicad_pcb").resolve()), board)
layer_names = {pcbnew.F_Cu: "top", pcbnew.In1_Cu: "inner1",
               pcbnew.In2_Cu: "inner2", pcbnew.B_Cu: "bottom"}
routes = []
for track in board.GetTracks():
    width = track.GetWidth(pcbnew.F_Cu) if track.GetClass() == "PCB_VIA" else track.GetWidth()
    route = {"net": track.GetNetname(), "width": pcbnew.ToMM(width)}
    if track.GetClass() == "PCB_VIA":
        route.update({"type": "via", "x": pcbnew.ToMM(track.GetPosition().x) - 100,
                      "y": 100 - pcbnew.ToMM(track.GetPosition().y),
                      "hole_diameter": pcbnew.ToMM(track.GetDrillValue()),
                      "from_layer": layer_names[track.TopLayer()],
                      "to_layer": layer_names[track.BottomLayer()]})
    else:
        route.update({"type": "wire", "layer": layer_names[track.GetLayer()],
                      "start": {"x": pcbnew.ToMM(track.GetStart().x) - 100,
                                "y": 100 - pcbnew.ToMM(track.GetStart().y)},
                      "end": {"x": pcbnew.ToMM(track.GetEnd().x) - 100,
                              "y": 100 - pcbnew.ToMM(track.GetEnd().y)}})
    routes.append(route)
(folder / "local-copper.json").write_text(json.dumps(routes, indent=2) + "\n")
print(json.dumps(report, indent=2))
