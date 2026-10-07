# Routing checkpoint — 0.0.48-alpha.0, 2026-10-07

**PROTOTYPE FABRICATION READY: NO. Routing continues.**

Native source replay now connects 64/108 physical networks including all 118
GND endpoints. It contains 97 tracks, 79 ordinary 0.30 mm drill / 0.45 mm pad
through vias and eight native ground pours. Exactly 227 open-port errors remain;
there are zero other native errors or strict copper/drill/edge/keepout violations.
All 64 checked networks have one physical copper component. Fresh native canonical build and independent checks pass. All three canonical
Circuit JSON mirrors have SHA-256 `27223cf4894c1cbc9d50b5ddde6ab8624af220a0b3e3533779db90755855ef7a`. Publication byte verification
is recorded separately after upload; native build exits1 for these227 opens.

CAN SPI chip select and interrupt join both their MCU/driver pads and actual
pull-up pads. R_CAN_CS moves from bottom (2.25,-1.5), source rotation90, to
bottom (1.5,-0.2), rotation0, releasing the actual SPI escape corridor. The
nearby C31 stays at its original bottom (9.25,-1.25), rotation180. Source paths
repair MISO, SPI clock and crystal XOUT around these actual footprints. Earlier
failed placement/ground-isolation candidates are preserved.

The official native Pipeline9 public SDK fully solves seven programmer/ADC
connections in 307.49 seconds with a 6 mm maximum mesh node dimension, aspect
ratio30 and minimum node area0.01. Mesh construction/merging consumes about
219 seconds. Peak sampled routing RSS is7210.75 MiB. Its unchanged input and
complete output are preserved in routing/programmer090 and programmer102.
An initial native replay finds33 independent copper violations. Manual source
repairs move ordinary vias clear of real pads/annuli and adjust clock/reset
corridors; the final programmer121 replay passes every original spacing limit.
LED_FAULT_A is an additional manually saved three-layer source route. The
POWER_GOOD bottom trunk is shortened through the verified pad-free U7 interior.
No generated Circuit JSON, supplier footprint, dependency, DRC limit or type
check is edited. A solved router output alone is never a board qualification.

The new saved networks are CAN_SPI_CS, CAN_INT_N, SWDIO_CONN, SWCLK_CONN,
NRST_CONN, SWDIO_GUARDED, SWCLK_GUARDED, NRST_GUARDED,
VBUS_ADC_PRE_GUARD and LED_FAULT_A. One bounded Pipeline9 batch now addresses
three remaining motor windings and five motor-driver controls. Its unfinished
outputs remain separate from this checked revision.

Actual current CadQuery imports/reexports all12 IC models and146 fitted
component records (53 unique genuine STEP files). The actual mounted assembly
passes nominal146-mesh component/carrier clearance. No placeholder CAD or
supplier model edit is used. These reports cover the R_CAN_CS placement change;
subsequent copper-only changes require exact CAD-record equality. Supplier
stock/pricing snapshots remain those from2026-10-07 12:01UTC; no reservation or
assembler allocation is implied. The five-board fitted-part baseline remains
USD27.261 per board before PCB, assembly/loading/extended fees, losses/minima,
shipping/tax, carrier and motor.

All remaining44 networks, loaded widths/pad necks/thermal review, actual USB
via delay/coupling/reference/impedance, fresh CAM/BOM/CPL, assembly allocation
and delivered quote remain open. The disclosed imported D_VBUS schematic
rotation and three native component-orientation suggestions remain explicit.
The unchanged nine schematic sheets were viewed in revision46. Programmer
pin wiring, standard USB-C symbol groups and planar USB path limits pass fresh canonical checks. All four actual current layer PNGs were viewed;
TypeScript, native shorts, unchanged strict geometry and filled connectivity
pass. The full official style analyzer retains one imported D_VBUS finding. No physical programming, negotiation, motor test
or fabrication order is claimed. The exact14HM11-0404S, four connectors,
35x35 mm four-layer outline and front carrier are preserved.

Evidence: evidence/rev-0.0.48-alpha.0/; final qualified source replay
routing/programmer121/. Publication includes exact fresh Circuit JSON and all
unchanged original referenced CAD assets. Its completed receipt is recorded
only after anonymous package and immutable GitHub SHA-256 checks.
