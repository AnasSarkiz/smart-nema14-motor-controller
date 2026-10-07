# Revision 0.0.50: two USB-C ports and a 15 V motor contract

The active design uses RP2040, STUSB4500 and MCP2515. `J_USB` is the
bottom-side motor POWER port; `J_DATA` is the top-side COMPUTER DATA port.
Both are unchanged official JLCPCB USB4110-GF-A imports. The board remains
35 × 35 mm with four copper layers and the original motor/front carrier.
Historical one-port and STM32 requirements do not govern this revision.

The power-port CC pins connect only to STUSB4500. Its USB data and SBU pins
are explicitly unused. The computer port joins both physical D+ pins and
both D− pins, has a separate 5.1 kΩ ground termination on each CC pin, and
uses the verified official USB ESD part. Computer VBUS only supplies its
presence-sense divider; it does not supply the controller or motor. The
controller is self-powered from the POWER port, initially at 5 V.
Computer-only operation therefore leaves the controller unpowered.

STUSB4500 factory configuration can prefer 20 V. Program two active sink
PDOs (5 V / 1.5 A and preferred 15 V / 1.5 A), deactivate the 20 V PDO,
retain `PWR_OK_CFG=10b`, and retain 5 V logic bootstrap. Follow
[the programming/readback procedure](STUSB4500-15V-PROGRAMMING.md).
The readback validator has synthetic positive and negative coverage;
physical programming, negotiation and cold-start tests remain pending.

The hardware inhibit checks all three conditions: MCU request, the 15 V
PDO indication, and the live sink path. POWER_OK2 alone can remain asserted
after unplugging and is insufficient. An official BAT54WS-TP isolates the
high-voltage PD gate node from low-voltage logic. SN74LVC3G17 Schmitt buffers
clean the slow status inputs, SN74LVC1G27 qualifies all three flags, and
SN74LVC1G98 combines that result with a dedicated TLV803EA30 supervisor.
ENN and its pull-up remain on the driver's own 3.3 V VCC_IO rail. The removed
low-threshold MOSFET enable stages are historical. Manufacturer startup,
threshold and leakage bounds are recorded in the interlock evidence;
actual ramps, detach/replug, temperature and powered/unpowered tests remain.

The last accepted replay is
[power038](../evidence/rev-0.0.50-alpha.0/routing/power038/QUALIFICATION-SUMMARY.json):
53 of 120 required nets physically complete, 298 open-port errors, 81 tracks,
62 ordinary 0.30 mm drill / 0.45 mm pad through vias, six filled GND regions,
zero other native errors and zero independent clearance violations. GND and
all twelve raw PD VBUS terminals are each one physical network. This is a
measured partial layout, not a fabrication approval. Every original native
and independent clearance check remains unchanged.

Pipeline9 power027 solved the raw PD VBUS candidate in about 160 seconds.
Its initial replay failed drill and copper checks; that output remains clearly
unqualified. Power038 repairs the measured violations with supported source
paths and passes a fresh native replay plus strict and physical checks for
all 53 completed nets. Its accepted 11 paths are saved alongside the preserved
70 paths in `src/routing/rev50-saved-paths.json`. The wider 0.8 mm power trunks
have explicit smaller terminal escapes; loaded-current qualification remains.
No generated Circuit JSON or supplier footprint/model was edited.

Continue in this order: raw/protected VBUS, common PD-FET source and VM power;
3.3 V logic power; PD/eFuse controls; USB D+/D− and their return path; remaining
motor, UART, SWD, CAN, STEP/DIR/ENABLE, limits, I²C and fault connections.
Keep wider loaded power trunks on outer layers where feasible. Any internal
power segment must preserve the USB reference corridor and pass loaded
current, thermal and four-layer checks. Use one bounded native Pipeline9 job
at a time, save its qualified paths, and repair actual clearance defects with
supported board-owned manual paths. Do not repeat unchanged timeouts.

Actual CadQuery solids, mounted assembly registration, USB pin/peg alignment,
carrier/fastener clearances and bounded mating envelopes pass for the current
165 fitted component models. These checks do not establish arbitrary cable
fit; the recorded two-USB cable envelope limits still apply. The schematic
has 11 native A4 sheets and purpose notes for all 166 electronic references.

Publish the completed implementation step as an explicitly incomplete WIP with
the accepted power038 copper. The publication receipt must verify fresh matching
GitHub/tscircuit source, Circuit JSON and original CAD bytes. A local version does
not prove publication. Revision 48 JSON/CAM cannot manufacture the two-port design. Finish all required physical connections,
unchanged DRC, schematic review, live exact-part assembly availability,
loaded power/USB/thermal checks and fresh matching Gerber/drill/BOM/CPL/fab ZIP.
No fabrication order or tested-hardware claim is authorized.

**PROTOTYPE FABRICATION READY: NO. Work continues.**

The official MCC BAT54WS-TP C668868 import replaces the earlier Diodes import
whose missing polarized aliases produced a missing native schematic symbol.
The replacement has the same original land geometry and exact OBJ/STEP bytes;
no supplier definition was patched. J_SWD moves to bottom (14.3, −7.1), rotation
90°, because the top-side placement intersected the new DATA-port mating envelope.
Its actual imported model, manufacturer orientation and right-facing cable
envelope pass the fresh assembly/carrier checks.

The fresh canonical CLI build retains 298 opens and exits 1. Netlist inspection
of the explicit unrouted preview reports zero errors/warnings and has identical
source pin/net partitions to the canonical copper build. Direct routed-source
netlist inspection exposes a released core PCB-disabled routing-update error;
its failed logs are retained. Supported prebuilt-JSON CLI checks report zero
pin/source errors, 35 pin-attribute warnings, 23 source warnings (including
external datasheet lookups and the branched reversible USB receptacle pair),
one imported TVS schematic rotation finding and six placement orientation
suggestions. Placement exits 1 for those suggestions; its native diagnostic
error count is zero. All four copper layers and the updated interlock sheet
were viewed. Loaded routing and final qualification remain incomplete.
