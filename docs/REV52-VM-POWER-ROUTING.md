# Revision 0.0.52: protected VBUS and motor supply copper

The two-port RP2040/STUSB4500/MCP2515 architecture and all original purchased
imports/models/component placement remain unchanged. Native power019 passes
contacts, unchanged strict drill/pad/track/edge clearance, actual filled-copper
clearance and the original thermal-owner guard. It physically completes56/120
nets, with265 open ports,112 tracks,79 ordinary0.30/0.45mm full through vias,
five unchanged manifested TypeVII thermal vias and eight native filled regions.
Every prior54 complete net survives. GND is one physical network. The original
qualified trial and measured reports are under
`evidence/rev-0.0.51-alpha.0/routing/power019-replay/` and `POWER019-*.json`.

The eleven protected-VBUS and fifteen VM terminals are joined. Main power
trunks retain0.8mm; protected-rail short escapes include0.525/0.4/0.28mm and
low-current resistor branches0.30mm. VM short driver/eFuse terminal escapes
are0.28mm; capacitor/bulk branches remain0.7/0.8mm. One native inner2 VM
plane connects full through-via escapes while retaining the inner1 GND
reference. Outer power branches are used where possible. Loaded copper/via
current, return-path and thermal qualification remain mandatory; physical
connectivity alone does not establish those limits.

Five original saved paths change: two shared RAW-via approaches move the via
south; the high-impedance PD-gate branch moves to the board perimeter; the
MOTOR_A2 winding moves0.15mm over a short section without narrowing its0.4mm
width; one common FET-source diagonal moves0.4mm west. Original ordered native
subtrees are retained so endpoint consumption remains valid.82/87 original
paths are exact. Ten protected-rail paths and fifteen explicit native VM
fanouts are added. Shared VM via sites are exactly coalesced and retain the
unchanged hole-spacing checks. A measured ordinary GND stitch restores the
input bulk capacitor's ground island. No generated JSON or supplier edit.

The failed SDK/manual candidates remain explicitly unqualified. A native
bounded Pipeline9 two-net power solve produced the original candidate. All
repairs use supported source paths and native plane/via primitives and are
replayed against the full board. All four actual layer renders were viewed.
Accepted phase0 routes and phase2 VM fanouts are now frozen before phase3
selected-net routing; the capture supervisor accepts an explicit phase index.

Continue3.3V/core supply and PD/eFuse controls, then the USB pair/return path
and all remaining interfaces until zero required opens. Final schematic,
loaded power/USB/thermal, stock allocation/PCBA quote and matching complete
Gerber/drill/BOM/CPL/fabZIP checks remain. TypeVII filling/capping is unchanged,
selective process/cost confirmation is pending. No physical PD/NVM/temperature
or flashing claim. No fabrication order.

**PROTOTYPE FABRICATION READY: NO. Untested WIP prototype; work continues.**
