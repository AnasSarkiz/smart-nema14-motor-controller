# Routing checkpoint — 0.0.47-alpha.0, 2026-10-07

**PROTOTYPE FABRICATION READY: NO. Routing continues.**

Fresh native canonical Circuit JSON connects 54/108 physical networks, including
all 118 ground ports. It contains 85 tracks, 56 ordinary 0.30 mm drill / 0.45 mm
pad through vias spanning all four layers, nine native GND pours and 249 explicit
open-port errors. There are zero other native errors, zero native shorts and
zero strict copper/drill/edge/keepout violations. Each of the 54 selected nets
has exactly one independently measured physical copper component. All three
canonical JSON mirrors match SHA-256 `305f6abf833547bb1738e89fe3ea6429447a46542aa8d93aad74cc74ea3911da`.
The native builder correctly exits one for remaining missing connections.

Native Pipeline9 supplies CAN TX/RX candidates through its public
getNewTracesBeforePowerExpansion API. The original preliminary output and failed
replays remain preserved. Board-owned source paths repair sub-micron rounded
endpoints, move an illegal C20 via, clear an existing via, move a Q_ILIM escape
0.05 mm and reroute the crowded CAN pins. The existing reset top trunk moves to
y=-0.75 mm for both CAN and eFuse-via clearance. All spacing limits remain intact.
Native Pipeline9 continues its own full repair when a diagnostic candidate is
captured; a preliminary file never counts as solved or qualified. Current board
source adopts only the later checked can075 replay.

MOTOR_A1 is manually drawn entirely on TOP, with no extra via. Its initial 3 mm
escape is 0.30 mm wide for the unchanged sense-trace clearance; the remaining
outer path is 0.40 mm. Loaded current, pad necks, tolerance and thermal review
remain unfinished. The other three winding nets are not routed yet.

Input-only capture through the native core routing-start event avoids an entire
unsuitable default-mesh solve before an SDK mesh job. It preserves exact input
fields and coordinates, records the actual baseline and exits two because
routing is incomplete. This is a diagnostic tool change, not a substitute
router or a successful-board-build claim. SDK mesh choices do not alter any
board DRC limit. Candidates still need fresh native source replay, unchanged
strict geometry and all selected physical filled-net checks before adoption.

The 147 purchased references / 146 fitted / 54 exact supplier identities remain
unchanged from revision46. Actual revision46 CadQuery and nominal mounted-fit
results carry forward through exact equality of all 146 canonical CAD records;
no model or placement changed. Fresh official stock/pricing/SMT checks from
2026-10-07 12:01 UTC remain the last supplier snapshots, not assembler allocation.
The five-board fitted-parts baseline is USD27.261 per board before PCB,
assembly/loading/extended fees, losses/minima, shipping/tax, carrier and motor.
All 12 IC models are genuine; no placeholder or vendor import patch is used.

Fresh TypeScript/formatting, native shorts, independent canonical geometry and
filled connectivity pass. Programmer wiring passes 38 physical pin/net assertions;
VOUT is isolated. Standard USB-C represents all 16 purchased pin/pad groups.
Planar USB limits remain unchanged and pass: main trunk skew0.19510 mm,
MCU stubs0.09995 mm and both plug paths0.40879 mm. Branched USB DifferentialPair
properties still emit two explicit metadata warnings; the native Bus constrains
actual trunks while independent measurements constrain both full plug paths.
Via delay, coupling, real impedance/reference continuity remain separate gates.
All four actual layer images were viewed after these changes. The unchanged nine
schematic sheets were viewed in revision46. The full official style analyzer
still finds one unmodified D_VBUS rotation issue. Three native placement
orientation suggestions from revision46 remain explicit; no clean final
placement screen is claimed. Neither style disclosure nor future physical tests
excuses stopping independent PCB work.

All remaining 54 nets, power widths/returns/thermal, USB qualification, fresh
Gerber/drill/BOM/CPL/CAM, assembler allocation and delivered quote remain open.
The exact 14HM11-0404S, four connectors, 35 x 35 mm four-layer outline and carrier
are retained. No order, hardware test or fabrication approval is claimed.

Evidence: evidence/rev-0.0.47-alpha.0/; qualified source replay routing/can075/.
Publication requires matching fresh Circuit JSON and original CAD hashes;
its verification receipt will be recorded after public byte checks.
