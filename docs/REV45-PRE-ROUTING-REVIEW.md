# Revision 45 pre-routing review — 2026-10-07

This review permits bounded native routing of the RP2040/STUSB4500 prototype.
It does not approve fabrication, assembly, USB certification or physical operation.
Historical STM32 copper must not be replayed. The exact 14HM11-0404S motor,
35 × 35 mm four-layer board, four connectors and front carrier are retained.

## Schematic and manufacturer review

The PCB-disabled native draft passes independent physical-pin, named-net,
supplier-identity, polarity, reset and programmer assertions. Native netlist,
pin-specification and source checks have zero errors; source lookup has zero
warnings in the successful latest-toolchain run. Some imported parts lack
electrical pin metadata; their physical pins were checked independently.

- RP2040: genuine C2040 manufacturer PDF, power/pin tables and USB requirements.
  USB series resistors are now genuine C25100 27 ohm parts. The 12 MHz crystal
  uses the selected manufacturer's 10 pF load requirement, 15 pF loads and
  1 kohm drive resistor; actual stray capacitance/startup remains a bench check.
- Boot flash: genuine GD25Q16EEIGR/C2986331 replaces the invalid-model Winbond
  selection. Physical pins, 2.7–3.6 V supply and floating exposed pad were
  checked against GigaDevice Rev1.2. Firmware must use a generic 03h boot2 and
  a 2 MB flash setting. A separate TLV803EA30 supervisor holds RUN/system reset
  after supply qualification; its 130 ms minimum delay exceeds flash tVSL.
- MCP2515: genuine C96140 Microchip DS20001801H. Physical SPI/CAN/reset/clock,
  supply and unused RTS pins were checked. Use SPI at most 10 MHz at 3.3 V.
  The selected ABM8-16MHz-B2-T uses 18 pF load; two 15 pF capacitors per leg
  give 15 pF equivalent plus PCB stray. Full manufacturer ABM8 family drawings
  are retained; the truncated exact-part download is not represented as valid.
- STUSB4500: DS12499 Rev8, genuine autonomous USB-PD sink. CC/dead-battery,
  I2C/address, regulator bypass, VBUS monitoring and back-to-back PMOS pins
  match the reference circuit. Factory profiles are 5 V/1.5 A, 15 V/1.5 A and
  20 V/1 A. Firmware must inspect actual RDO, VBUS and faults before enabling
  the motor, buzzer or higher current limit. Factory 20 V/1 A alone does not
  justify the nominal 1 A limiter's worst-case current.
- Input protection: STL8P4LLF6 common-source PMOS pair and gate divider were
  screened against VDS/VGS limits. ESDA25P35 has 22 V stand-off and maximum
  clamps of 31 V at 10 A / 41 V at 35 A, not a guaranteed clamp below 28 V.
  The exact TVS, 470 ohm VDD filter and 1 kohm sense resistor follow ST's
  reference architecture. System surge/ESD and discharge timing remain bench
  qualifications; no USB certification is claimed.
- TPS26600: MODE, RTN and exposed pad stay on isolated EFUSE_RTN, separate
  from GND. Current-limit, OVP and controlled-slew screens are preserved in
  POWER-CORNER-SCREEN.json. The startup allocation remains 150 mA on 3.3 V,
  with motor/CAN/buzzer inactive until a qualified PD contract.
- AP63203: fixed 3.3 V / nominal 1.1 MHz; genuine recommended 3.9 uH, input,
  bootstrap and output components. Normal logic allocation is 0.5 A including
  the buzzer. At 20 V, low inductance and frequency corners give approximately
  0.93 A CCM peak for that allocation, below the selected inductor ratings.
  Effective capacitance, thermal, switching-loop and loaded ripple remain
  routed-layout/prototype checks, not assertions of the regulator's full rating.
- TMC2209: physical motor/sense/UART/charge-pump and unused-pin states reviewed
  against Rev1.09. The selected 1 ohm shunts conservatively limit nominal full
  scale to about 0.225 A RMS / 0.318 A peak, below the motor's 0.4 A rating.
  This is an open-loop first prototype, with no claimed full rated torque.
- Buzzer: C94598 magnetic sounder, 4 kHz / 50% PWM, default off. Its 12 ±3 ohm
  coil requires a flyback clamp with adequate repetitive-current margin.
  Genuine B5819WS/C22624 replaces 1N4148WS with identical supplier lands and
  polarity. The 0.385 A worst-case static coil-current screen is below its
  1.5 A repetitive peak rating. Average diode loss is screened below 58 mW
  at 50% duty using 0.6 V; physical temperature/acoustic performance is pending.
- TMP112, TMUX1511 and both TLV803E supervisor pin tables were checked.
  The standard five-pin JST programmer has 38 independent wiring assertions;
  VOUT is isolated and the target must be powered separately. This verifies
  the connection plan, not completed physical programming.

## Parts, models and placement

There are 149 purchased references, 148 fitted by default, and 53 unique parts.
Every current identity has a fresh positive JLCPCB official product/detail-API
snapshot at06:47 UTC: all53 support SMT assembly in Economic/Standard service.
The original52 snapshots, flyback snapshot and failed POST refreshes are retained.
The exact internal supplier ID is derived from each official SKU page and the
detail response must return the same SKU; no substitute part is accepted.
Customer/order-specific assembly allocation remains unverified. C222138 has
70 units, two needed per board.52 SKUs are fitted;38 are extended. The5-board
fitted component baseline is$27.2706 per board, with USD independently verified
from all53 exact product offers. This excludes PCB/assembly/loading fees,
supplier losses/minimum allocations, shipping/tax, carrier and motor. Final
assembly quotation remains mandatory before claiming a cheap delivered board.

The updated released toolchain installs with a frozen Bun lockfile and passes
TypeScript and formatting. All 12 ICs and all 148 fitted parts pass genuine
STEP import, solid validity and export/reimport in CadQuery 2.8.0. Supplier
definitions and original model bytes are preserved. The verified programmer
STEP is localized through a board-owned URL override, preserving its original
origin/rotation.

Latest native placement has zero findings. The actual mounted GLB has 148
nonempty fitted meshes and passes nominal component/carrier/fastener envelope
checks. All four connector meshes were viewed and their outward mouths checked.
Constrained mating-envelope and machining/load screens pass; the limiting
screened cable/carrier margin is about 0.164 mm. Exact mating-plug CAD and
physical fit are not available. Use the recorded cable envelopes and straight
outward wire exits; do not claim unrestricted cable compatibility.

The nine A4 sheets were rendered and viewed. Purpose text covers every fitted
and optional reference. The remaining imported D_VBUS custom-symbol rotation
finding is retained; latest native schematic-placement prints the finding
despite exit0. It is not an electrical or PCB placement defect, and the user's
instruction explicitly permits independent PCB progress. No vendor symbol,
footprint, renderer, rule or generated circuit JSON was patched to hide it.

## Routing gate and outstanding work

### Internal USB placement correction

The first native paired job stalled in length matching. The two 27 ohm
terminations were 5–7 mm from the RP2040 pads, with the VREG reservoir across
the direct escape corridor. R_USB_DP/R_USB_DM move to (9.5, 6.4)/(10.6, 6.4)
on top, rotation270, so their MCU-side pin2 faces the RP2040 USB pads.
C_VCORE uses the former C2 site at (13.5, 4.75), top rotation270.
C2 moves into the vacated resistor site at (15.0, 4.0), top rotation90.
The tighter initial trial failed five native placement findings and is retained
in USB-PLACEMENT-PACKET-CHECK.log. The revised spacing must pass the same checks.
These four internal movements require renewed native placement, real model
clearance and copper qualification. The component identities and definitions,
motor, board boundary, four external connectors and carrier are unchanged.
No previous mechanical result is asserted for these moved components.

The placement-only board has 108 required nets, 509 explicit open-port errors,
and zero traces/vias/pours. This is the starting point, not a connectivity pass.
Stage2 static schematic/BOM review and Stage3 initial placement/model review
permit one bounded Pipeline9 job at a time. Stage4 copper qualification and
Stage5 complete schematic/copper review remain in progress. Stage6 fabrication
and Stage7 physical testing have not passed. Preserve every failure and measure
actual copper, return paths, widths, drills, clearances and connectivity.

Requested ordinary vias are 0.30 mm drill / 0.45 mm pad, through all four layers,
with no via-in-pad. No uniform-size manufacturing or current-capacity claim
follows from configuration. Prefer outer-layer power routing; qualify any
necessary internal portions explicitly. No order or fabrication-readiness claim
is authorized by this pre-routing gate.

### Qualified partial USB and local routing — 08:49 UTC

The checked packet has41 physically joined nets,61 traces,28 uniform ordinary
0.30/0.45mm four-layer through vias and0 pours.407 native open-port errors
remain, with zero other native errors and zero strict copper violations.
The SPI MOSI/MISO/clock, driver sense/reference and local regulator/sense trees
pass with all previously saved copper. Failed CAN oscillator/CS/interrupt and
flash IO0 candidates are preserved and excluded.

The explicit board-owned USB tree passes native DRC, strict clearance and
actual island checks for both polarities. Both plug orientations measure
0.40879mm planar skew, ESD-to-resistor trunks0.19510mm and MCUstubs0.09995mm.
The supported native Bus enforces0.25mm on the two actual trunks; the independent
physical traversal retains0.25mm trunk/stub and0.5mm BOTH plug-path limits.
The unchanged DifferentialPair metadata retains gap/coupling/90ohm targets.
The released DifferentialPair's aggregate bus cannot meaningfully compare
short branches with long trunks of this reversible multi-terminal connector.
This source-level constraint scoping corrects that21.82mm false metric; no
library, rule, generated JSON or supplier definition is patched.

The long pair stays on one common inner2 layer. Ground reference, coupling,
barrel delay and actual fabrication impedance are still required. No USB or
manufacturing success is inferred from planar matching. Ordinary vias remain
unfilled; no blind/buried or undeclared small features are introduced.
Six internal crystal/ESD/guard-resistor movements pass native placement and
fresh actual148-mesh mounted nominal fit; all failed attempts are preserved.
The original imported parts/models, exact motor, connectors/outline/carrier
remain unchanged. A prior eFuse slew track is manually corrected around the
relocated capacitor and requalified with every adopted net.

## Qualified ground and control continuation

routing/ground038-core-clearance qualifies 43 saved signal nets plus GND:
63 traces, 36 ordinary 0.30/0.45 mm through vias and 7 native filled BRep pours.
All 44 networks have exactly one actual copper island after drill removal.
Native checks report 283 open ports and zero other errors; strict copper and
filled-pour clearance checks report zero violations. The main USB trunk, MCU
stub and both reversible plug path length bounds still pass. Six outside-pad
GND stitches join outer returns to the inner1 reference. No filled/capped,
blind/buried or exposed-pad drills are introduced. Shorter board-owned QSPI
clock and buzzer routing opens return paths; the PD supply-capacitor trace is
shortened and the 2.7 V bypass trace clears the buzzer path. All four layer
images have been viewed. USB coupling, barrel delay, exact stackup/reference,
thermal/current limits and fabrication outputs are still unqualified.
