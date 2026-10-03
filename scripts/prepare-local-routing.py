"""Prepare the audited KiCad interchange for the local official router.

The native full L2 fill is deferred until final routed copper is available.
The five native USB reference regions and all mounting keepouts stay reserved.
No imported component or existing manual route is changed.
"""
import json
import sys
from pathlib import Path

import pcbnew
import wx

application = wx.App(False)

folder = Path(sys.argv[1])
native = json.loads((folder / "circuit.json").read_text())
guards = json.loads((folder / "routing-pad-guards.json").read_text())
board = pcbnew.LoadBoard(str((folder / "routing-interchange.kicad_pcb").resolve()))
for zone in list(board.Zones()):
    if not zone.GetIsRuleArea():
        board.Delete(zone)

# UsbReference is rendered before the final full-layer fill in index.circuit.
# Keep the five actual generated regions, including the contact-region notch
# around a manual signal via; do not replace them with bounding rectangles.
reference_pour_ids = {f"pcb_copper_pour_{index}" for index in range(5)}
reference_regions = [e for e in native if e["type"] == "pcb_copper_pour" and e["pcb_copper_pour_id"] in reference_pour_ids]
assert len(reference_regions) == 5
ground_net_code = next(pad.GetNetCode() for footprint in board.GetFootprints() for pad in footprint.Pads() if pad.GetNetname() == "GND")
for region in reference_regions:
    assert region["layer"] == "inner1" and not region["brep_shape"]["inner_rings"]
    zone = pcbnew.ZONE(board)
    zone.SetLayer(pcbnew.In1_Cu)
    zone.SetNetCode(ground_net_code)
    zone.SetLocalClearance(pcbnew.FromMM(0.15))
    zone.Outline().NewOutline()
    for point in region["brep_shape"]["outer_ring"]["vertices"]:
        zone.Outline().Append(pcbnew.FromMM(100 + point["x"]), pcbnew.FromMM(100 - point["y"]))
    board.Add(zone)

for track in board.GetTracks():
    track.SetLocked(True)

assert pcbnew.ExportSpecctraDSN(board, str((folder / "local-components.dsn").resolve()))

for guard in guards["guards"]:
    zone = pcbnew.ZONE(board)
    zone.SetIsRuleArea(True)
    zone.SetLayerSet(pcbnew.LSET.AllCuMask(4))
    zone.SetDoNotAllowVias(True)
    zone.SetDoNotAllowTracks(False)
    zone.SetDoNotAllowPads(False)
    zone.SetDoNotAllowZoneFills(False)
    zone.Outline().NewOutline()
    for x, y in guard["outline"]:
        zone.Outline().Append(pcbnew.FromMM(100 + x), pcbnew.FromMM(100 - y))
    board.Add(zone)

assert pcbnew.ExportSpecctraDSN(board, str((folder / "local-routing.dsn").resolve()))
dsn_path = folder / "local-routing.dsn"
dsn = dsn_path.read_text()
# KiCad's DSN exporter hard-codes SMT spacing to one quarter of net clearance.
# Encode this board's actual pad/pad and track/pad requirements instead. This
# changes routing rules only; all exported component and copper text is retained.
exported_smt_rule = "(clearance 37.5 (type smd_smd))"
assert dsn.count(exported_smt_rule) == 1
dsn = dsn.replace(exported_smt_rule, "(clearance 150 (type smd_smd))\n      (clearance 100 (type smd_wire))")
dsn_path.write_text(dsn)
pcbnew.SaveBoard(str((folder / "local-routing.kicad_pcb").resolve()), board)
print(f"Reserved {len(reference_regions)} USB reference regions and {len(guards['guards'])} via-only guards; retained {len(board.GetTracks())} fixed manual copper objects")
