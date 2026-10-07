# Revision 0.0.51-alpha.0 — checked FET-source copper and direct thermal vias

**PROTOTYPE FABRICATION READY: NO. Routing continues; no physical hardware test.**

Power059 qualifies54/120 physical nets with291 open ports,87 tracks,66 ordinary
0.30mm drill/0.45mm pad full through vias,five manifested TypeVII filled/capped
thermal vias under the original TMC2209 EP,and six filled GND regions. All prior
53 complete nets survive; GND and the seven FET-source terminals each form one
physical network. Native replay exits1 solely for291 required opens; zero other
native errors,strict copper/drill violations or filled-copper clearance failures.
All four rendered copper layers were viewed. Evidence and source provenance:
`evidence/rev-0.0.50-alpha.0/routing/power059-replay/QUALIFICATION-SUMMARY.json`.

The failed full-board/source/gate candidates remain explicitly unqualified.
Native Pipeline9's local bounds change preserves every original obstacle and
rule; its full solve completed in202seconds before full-board manual repair.
Only three saved gate paths were replaced;78 prior paths remain exact. Six source
paths complete PD_FET_SOURCE. Supported source paths alone changed; no supplier
or generated Circuit JSON edits. The five exact U2.29 owner contacts pass the
re-enabled official via-in-pad guard; ordinary contacts remain disallowed.
Loaded power/USB/thermal,fresh complete CAM,assembly quote and live stock
allocation remain pending. Filling/capping cost is unquoted.

The synthetic STUSB readback regression now verifies a genuine invalid20V/1.5A
PDO2 word0x00064096 before asserting rejection. All seven synthetic cases pass;
this is reproducible validator evidence,not physical NVM readback.

Fresh canonical CLI build has SHA-256
`eaa2bec0cc85443567b72e08e0f7644c6c43eb26d7217d15c96c767364306450`;
all three mirrors match. Copper/net geometry exactly matches qualified power059;
only generated IDs/endpoint annotations differ. Native build exits1 solely for
291 opens. Fresh unchanged strict copper and all120 physical-network checks
confirm54 complete and zero clearance failures. The official shorts check passes.
Unrouted source netlist has0 errors/0 warnings and its172 purchased-pin partitions
exactly equal canonical copper. Correctly unrouted draft checks,166 purpose notes,
both standard USB symbols,38 programmer checks and16 interlock truth/static-corner
checks pass. Formatting,TypeScript and frozen lockfile verification pass.

Pin/source checks report0 errors with35/23 attribute/source warnings. Schematic
analysis retains the original D_VBUS rotation finding; placement exits1 for six
orientation suggestions with0 native diagnostic errors. These are explicitly WIP
and will be reviewed before final qualification. Current165 fitted CAD transforms
and all original asset bytes exactly match the qualified two-port actual assembly.

The initial publication packet omitted three historical import modules needed by
the unchanged pin audit. Their original modules/assets are now included; the
exact build and pin audit passed that dependency stage. The early draft test was
invoked against routed geometry and correctly rejected it; a fresh --disable-pcb
draft passes. Original failure/repair records remain explicit.

Matching public GitHub/tscircuit publication completed at2026-10-07T21:37:26.097Z.
Implementation commit`6919a5874da51a3c359b4b700aea453fdeaf3026` and public release
`1b8346be-2413-4489-8ab5-606ceadd5161` contain revision0.0.51-alpha.0. All742 package
files and all742 immutable GitHub files passed anonymous exact-byte SHA-256
verification, including the three canonical Circuit JSON mirrors and every
referenced original CAD dependency. The release reports ready_to_build:true;
hosted build success is not claimed. Receipt:
`evidence/rev-0.0.51-alpha.0/PUBLICATION.json`. Routing continues from the accepted
54/120-net baseline; later power candidates remain unqualified until checked.
Prior public revision50 receipts below remain valid.
See [the current routing record](docs/REV51-POWER-THERMAL-ROUTING.md).

---

# Revision 0.0.50-alpha.0 — two-port WIP implementation

**PROTOTYPE FABRICATION READY: NO. No hardware testing or fabrication order.**

Public WIP verification completed at 2026-10-07T19:34:23.454Z. GitHub implementation
commit `d7089622defe6dc29d253f82c185fa972aab5e5a` and public tscircuit release
`d40636fb-e07c-4c37-928c-be6136b5537f` contain matching revision0.0.50-alpha.0. All715
package files and all715 immutable GitHub files passed anonymous SHA-256
verification, including the three canonical Circuit JSON mirrors and115 original
local CAD assets. No referenced CAD asset is omitted. The official release
reports ready_to_build:true; hosted build/3D-render success is not claimed.
See `evidence/rev-0.0.50-alpha.0/PUBLICATION.json`. Routing continues.

RP2040, STUSB4500 and MCP2515 remain selected. Separate official USB-C POWER
and DATA connectors, 15 V NVM programming/readback procedure, isolated computer
VBUS sensing and hardware motor interlock are implemented. Active requirements
and qualification scope are in [REV50-TWO-PORT-ROUTING.md](docs/REV50-TWO-PORT-ROUTING.md).

The fresh native CLI canonical JSON has SHA-256
`88d464e298e7194c9e02f2b7e8bfce4fc0bb1954a5d70f8daff16cd335f70df6`.
All three canonical mirrors match. Its checked power038 baseline has 53/120
physical networks complete, 298 open ports, 81 tracks, 62 ordinary 0.30/0.45 mm
through vias and six filled GND regions. All twelve raw PD VBUS terminals and
GND each form one physical network. Every required network was physically
inspected; the remaining 67 remain failures. Strict copper and filled-copper
clearances pass unchanged, as does the official all-layer shorts check.
Native canonical build exits 1 solely for the 298 opens.

Stage 1 requirements and Stage 2 exact imported identities/manufacturer pin
review are recorded; customer stock allocation/PCBA quote remain pending.
Stage 3 static assembly/model/carrier/cable checks pass for 165 fitted models,
with bounded cable-envelope assumptions. Official schematic analysis leaves
one unchanged imported TVS orientation finding. CLI placement retains six
orientation suggestions and exits 1; it reports zero native placement errors.
Stage 4 routing is in progress. Stage 5 loaded power/USB/thermal and complete
fresh CAM remain incomplete. Stage 6 NVM/hardware/programming tests are pending.

The coherent lockfile pins Bun1.3.9, tscircuit0.0.2757, CLI0.1.2257, core0.0.2107,
router0.0.962, props0.0.695, checks0.0.242, circuit-json0.0.520, svg0.0.445 and
easyeda0.0.374. Formatting and TypeScript checks pass. Critical imported pins,
the unrouted draft's explicit two-port pin/net isolation checks, both standard
USB-C schematic symbols, 166 purpose notes, motor-interlock static corners and
38 standard-JST-programmer wiring checks pass. Physical flashing is untested.

Mandatory CLI inspection uses the exact native canonical Circuit JSON where
supported. Netlist inspection uses the explicit unrouted source preview: zero
errors/warnings, with every electrical source partition identical to canonical.
Direct routed-source netlist logs preserve the released PCB-disabled routing
update error; it was not suppressed or claimed successful. Pin specification
has zero errors/35 warnings; source has zero errors/23 warnings, including
external datasheet lookups and the branched reversible USB pair. Actual USB
pair geometry/return-path qualification remains required. The build also
discloses an optional autorouting-cache serialization warning for Q_BUZZ;
qualified source paths and actual emitted copper remain independently verified.

Evidence is in `evidence/rev-0.0.50-alpha.0/CANONICAL-*`, `CLI50-*`,
`BAT54WS-TP-QUALIFICATION.json`, the actual assembly audits and routing/power038.
Failed routing candidates are retained as unqualified; none is accepted copper.
The diode replacement fixes missing polarized schematic aliases using an
unchanged official import with identical original pad/model geometry. J_SWD's
bottom-side repair removes the verified DATA-port mating-envelope collision.
All four fresh copper renders and the updated interlock sheet were viewed.

This completed implementation step is authorized for public WIP publication
with this accepted copper baseline. Only an anonymous exact-byte receipt proves
publication; local version numbers or ready_to_build do not prove a hosted
build, hardware result or fabrication approval. Continue protected VBUS/common
FET source/VM, logic power, PD controls, USB and all remaining nets immediately
after this publication.

---

## Historical revision 48 record

# Routing checkpoint — 0.0.48-alpha.0, 2026-10-07

Public verification completed at 2026-10-07T14:29:42.731Z. GitHub main implementation commit
`91ab2a97bbe3bc41eac98e19b2dfe1f5c7032ac5` and public tscircuit release
`8ab4eea9-cdce-4c8c-b9cc-162bb01a0d2f` contain matching revision0.0.48-alpha.0. All309
package files and all309 immutable GitHub files pass anonymous exact SHA-256
verification, including fresh Circuit JSON and103 original local CAD assets.
The official release reports ready_to_build:true; no hosted build success,
hardware result or fabrication readiness is claimed. See
`evidence/rev-0.0.48-alpha.0/PUBLICATION.json`.

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


---

# Historical revision47 checkpoint

# Routing checkpoint — 0.0.47-alpha.0, 2026-10-07

## Exact revision47 publication verified

Source commit `b6388c51a8178cef35be6af1802654cabb2a59b3` and public tscircuit release
`ee327023-5e57-4b0f-96d5-8f2973ce475c` contain matching revision0.0.47-alpha.0. All308
package files and308 immutable GitHub files pass anonymous SHA-256 comparison
at 2026-10-07T13:02:58.263Z. Original103 local model assets are included.
Hosted ready_to_build is true; no hosted build success, physical test or
fabrication readiness is claimed. See evidence/rev-0.0.47-alpha.0/PUBLICATION.json.
Routing continues.

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

---

# Historical revision46 validation

# Routing checkpoint — 0.0.46-alpha.0, 2026-10-07

## Exact revision46 publication verified

Source commit `393b14c4a1c0c6b70d34685a2c3b1434a0c6a384` and public tscircuit release
`cca81fcc-882a-4672-ae60-8a49423edeb8` contain matching revision0.0.46-alpha.0. All307
package files and307 immutable GitHub files pass anonymous SHA-256 comparison
at 2026-10-07T12:18:35.702Z. Exact canonical Circuit JSON SHA is
`a1a9ae548215b2d24a78fc272cb197901b69e8856eeae92b4685934bca4f546e`.
Original103 local model assets are included. Hosted ready_to_build is true;
no hosted build success, physical test or fabrication readiness is claimed.
See evidence/rev-0.0.46-alpha.0/PUBLICATION.json. Routing continues.


**PROTOTYPE FABRICATION READY: NO. Routing continues.**

The exact RP2040/STUSB4500 canonical source has 51 of 108 physically connected
networks, including GND: 82 saved tracks, 52 ordinary through vias, nine native
pours and 255 explicit native unconnected-port errors. Every via measures
0.30 mm drill / 0.45 mm pad and spans all four layers. No blind/buried or
filled/capped exception is instantiated. All three generated Circuit JSON
mirrors have SHA-256
`a1a9ae548215b2d24a78fc272cb197901b69e8856eeae92b4685934bca4f546e`.
The native build correctly exits nonzero for the 255 missing connections.
There are zero other native errors and zero strict copper/drill/edge/keepout
violations. All 51 selected networks independently have one physical copper
component; ground includes all 118 actual ground endpoints and eight ordinary
stitching vias. EFUSE_RTN remains electrically separate.

Pipeline9 supplies bounded selected-net candidates, then board-owned native
saved paths retain qualified routes. Manual corrections complete SWDIO,
SWCLK, QSPI_IO0, POWER_GOOD, NRST and both CAN crystal nets. R53 moves beside
R21 to remove a real blocked SWCLK escape; its shared reset via moves 0.16 mm
south for same-net drill-to-pad clearance. The CAN crystal moves locally; two
genuine official C1570 30 pF C0G/5%/50 V capacitors replace four parallel 15 pF
loads. Original imports and historical evidence are retained unmodified.
Both CAN oscillator nets are top-only with zero vias and aggregate lengths
4.9542 / 8.8585 mm, below the unchanged native 10 mm/zero-via constraints.
Nominal 18 pF crystal loading assumes approximately 3 pF PCB stray; oscillator
startup/loading still needs hardware qualification.

There are 147 purchased references, 146 default fitted, 54 exact supplier
identities and 53 fitted SKUs. Only R50 is DNP. Fresh official POST stock/pricing
and exact-SKU page/read-only GET-detail checks pass all 54 identities. The search
snapshot is 2026-10-07 12:01 UTC; no reservation or assembler allocation is claimed.
The five-board exact fitted-parts baseline is USD 136.305 total / 27.261 per
board, excluding PCB, assembly/loading/extended fees, losses/minima, shipping,
tax, carrier and motor. Fourteen fitted SKUs are basic and 39 extended. Removing
two capacitors adds an extended SKU, so delivered savings require a real quote.

Fresh TypeScript, formatting and PCB-disabled manufacturer-pin/load assertions
pass. Native CLI netlist, pin_specification, source, schematic-placement and
shorts exit zero. The placement check exits one with three retained orientation
suggestions: C_IO3, C_CAN_XOUT and D_USB. These are geometric/topology heuristics,
not copper collision findings; strict actual copper passes. Do not claim a
clean placement screen until these are resolved or individually justified.
The full official schematic analyzer retains exactly one imported D_VBUS
rotation finding; purchased definitions are untouched. The user explicitly
allows independent PCB work to continue. All nine current A4 sheets and all
four actual copper layer images were viewed; 147 purpose notes pass the helper.

Actual CadQuery 2.8.0 imports, valid solids and export/reimport pass all 12 ICs
and all 146 fitted genuine STEP models. The mounted assembly exports all 146
meshes. Nominal carrier/fastener clearance is at least 0.91227 mm and minimum
component-pair envelope clearance is 0.6 mm. Manufacturing tolerances, mating
harnesses and physical fit remain separate gates. The exact 14HM11-0404S motor,
35 x 35 mm four-layer outline, four outward connectors and carrier are retained.

The standard JST programmer passes all 38 physical pin/net assertions. Its VOUT
is isolated and target requires its own supply; physical flashing is untested.
The standard USB-C symbol represents all 16 purchased pin/pad groups. Actual
planar USB skew is 0.19510 mm for the main trunk, 0.09995 mm for MCU stubs and
0.40879 mm for both reversible plug paths, below unchanged 0.25/0.25/0.5 mm
limits. Unequal via counts, barrel delay, coupling, actual impedance and reference
continuity remain unqualified. Complete loaded power widths, thermal review,
all remaining 57 nets, fresh matching Gerber/drill/BOM/CPL/CAM and assembler
quote/allocation are unfinished. Historical STM32 fabrication exports do not
manufacture this design. No order, hardware test or fabrication approval is claimed.

Evidence: `evidence/rev-0.0.46-alpha.0/`; qualified native trial `routing/controls065/`.
Failed candidates are preserved and not adopted. Revision publication is pending
until exact anonymous package and immutable GitHub byte checks are recorded.

---

# Historical revision45 validation

# RP2040 / USB-PD continuation — 0.0.45-alpha.0, 2026-10-07

**PROTOTYPE FABRICATION READY: NO.** Bounded Pipeline9 routing is now active.
Read docs/REV45-PRE-ROUTING-REVIEW.md for the manufacturer review and exact gate
limits. Prior revision44 blocked flash/model/toolchain results are historical.
The original imports/models/copper/evidence remain preserved.

The genuine GD25Q16EEIGR flash, 27 ohm USB resistors, reset supervisor and
higher-current same-land B5819WS flyback diode address the identified faults.
Latest released tscircuit2750 / CLI2254 / core2105 / capacity962 / props694 /
checks242 / runframe2923 / modelprinter14 / easyeda373 are installed and the
new lockfile passes frozen installation, TypeScript and formatting. The official
npm mirror resolved the failing default-registry requests; TLS and integrity
verification remain enabled. No substitute router or dependency patch is used.

149 purchased references / 148 fitted / 53 unique parts are recorded. The
2026-10-07 06:47 UTC exact official product-page/detail-API check succeeds for
all53 identities: positive stock, SMT assembly, Economic and Standard service.
The previously failed POST refreshes remain preserved. The minimum stock is
70 C222138 power MOSFETs, two per board. Customer assembly allocation/quote and
supplier losses/minimum quantities remain unconfirmed. All53 exact product
offers explicitly identify USD. The fitted component baseline for5 boards is
$136.353 total / $27.2706 per board, before PCB, assembly/extended/loading fees,
losses/minimum allocations, shipping/tax, carrier and motor. There are52 fitted
SKUs and38 extended types; these can dominate small-batch assembly costs.

The current PCB-disabled physical-pin draft, native netlist/source/placement,
38 programmer assertions, standard USB16groups and149 component purposes pass.
All12 ICs /148 fitted STEP models pass actual CadQuery solid/export/reimport
checks. Current STEP URLs and byte hashes are independently bridged to those
actual results after a contextual note edit. Actual148-mesh mounted, constrained
carrier/tolerance and connector access checks pass within documented bounds.
Nine A4 schematic sheets were viewed. The official TVS custom-symbol rotation
finding remains explicit; it does not stop independent PCB routing under the
user's instruction. Stage5 schematic qualification remains incomplete.

The latest USB physical scope correction preserves all length limits. Native
DifferentialPair expands the reversible four-terminal receptacle into multiple
source traces, so its aggregate bus compared short branches with long trunks
(21.82mm false metric). The supported native Bus now binds exactly the two
ESD-to-resistor trunk traces at the unchanged0.25mm maximum. Independent actual
copper traversal additionally enforces that0.25mm trunk limit,0.25mm MCUstub
limit and0.5mm for BOTH reversible plug paths. Current results are0.19510mm,
0.09995mm and0.40879mm respectively. No checker or generated JSON was patched.
The common inner2 long pair has no remaining native DRC/strict clearance
violation; via-barrel delay, coupling, reference continuity and actual impedance
remain explicit gates. This is connected USB copper, not USB certification.

Six further internal changes (rotated genuine ESD; CAN crystal, its two top
loads, second input load and R15) make room for ordinary connector escape vias.
The initial three placements failed native courtyards and are preserved in
usb017/018/019 evidence. Final usb020 has zero placement findings, and the fresh
mounted148 meshes pass actual nominal envelope checks with minimum pair0.6mm
and carrier/fastener0.9123mm clearance. EFUSE_DVDT was manually rerouted around
the relocated genuine capacitor; all41 copper islands were then rechecked.

Routing started from108 required nets /509 explicit open-port errors, with
no historical STM32 routes replayed. The fresh partial canonical build now has
44 physically joined nets (43 saved signals plus GND),63 traces,36 ordinary
0.30/0.45 four-layer through vias and7 pours. Native reports283 remaining open-port errors and no
other errors; strict copper/drill/edge/keepout checks report0 violations.
Every selected net has exactly one physical island. Native Pipeline9 supplied the local trees and board-owned manual USB paths
complete the difficult pair; one XOUT escape was explicitly moved0.08/0.067 mm in board-owned
saved-path source to clear its own pad, then revalidated with all other copper.
No importer, router, generated Circuit JSON or checker was patched. All four
actual layer images were viewed. Buzzer return measures0.35 mm; buck switch
measures0.6 mm with a0.5500116 mm pad neck. Complete width/current qualification
remains pending. Failed USB and clock/control candidates were not adopted.
The initial native paired trial rejected multi-terminal USB connector nets;
that failure and every rejected candidate remain preserved. The explicit
manual tree and correctly scoped native trunk bus now pass as described above.
Three interface trees and two short MCU USB stubs were subsequently saved.
Four internal USB/bypass movements pass renewed native placement and actual
148-mesh nominal envelope checks. QSPI_IO3 was manually drawn around a moved
termination, then jointly requalified. MCU stub planar skew is0.09995mm.
The solved finer-mesh long USB candidate is rejected: different inner layers,
self-short, native skew error and branch pad-clearance defect. It is not
canonical. Native netlist/pin/source/placement and shorts checks pass;
schematic-placement exit0 still prints the one TVS style finding. The full
style analyzer correctly fails that finding. The physical-pin helper requires
PCB-disabled JSON; its mistaken PCB-JSON invocation is retained and corrected
without weakening the check.
Further selected jobs and complete current-width/USB/return/thermal/CAM review
remain necessary. Stage2/3 initial reviews permit routing; Stage4/5 in progress,
Stage6/7 not passed. No order is authorized by these intermediate results.

Evidence: evidence/rev-0.0.45-alpha.0/. All three partial canonical mirrors are
freshly regenerated. Exact publication/model bytes still require public checks; no
revision45 publication success is claimed yet.

# Historical records below

# RP2040 and dedicated USB-PD redesign — 0.0.44-alpha.0, 2026-10-06

## CadQuery and connection audit — 2026-10-07

The user requires actual CadQuery-compatible chip models and no missing PCB
connections. The current board does **not** meet either complete requirement.
`mechanical/check-cadquery-components.py` now checks every default-fitted
component: actual STEP import, valid positive-volume solids, unchanged source
bytes, STEP export/reimport and preserved solid count, volume and bounds.
It returns exit1 for any missing or invalid fitted model; no bounding-box or
OBJ-display success substitutes for STEP compatibility. Remote inputs require
an explicit exact-URL/download-status/checksum manifest.

CadQuery2.8.0 tested52 unique STEP dependencies across146 fitted components.
**10/11 ICs and145/146 fitted component models pass. U_FLASH fails.** Its
official `W25Q16JVUXIQ / C2843335` STEP file is15 bytes containing only
`Model not found`. A fresh supported official import reproduces those exact
bytes. Original imported pin/pad/symbol definitions and model files remain
untouched. The earlier filename-based dependency coverage is not a valid
CadQuery or genuine-STEP claim for this asset. Obtain the exact-part STEP or
resolve the official upstream source/importer defect before claiming all chips
are CadQuery friendly. A generic replacement model is not adopted.

Both official C136657 programmer model downloads now return200. The STEP
passes CadQuery import/export/reimport as14 solids. A fresh native mounted
build contains4674 J_SWD vertices; all146 fitted meshes pass nominal carrier,
fastener and component-pair envelope checks. This resolves the previously empty
programmer mesh for this run; remote availability, supplier registration,
mating plugs, manufacturing tolerances and hardware fit remain separate.
The native mounted3D image was actually viewed. Historical failed mesh and
inventory reports are retained unchanged.

The correct PCB-disabled physical-pin draft and critical-import assertions
pass. All108 declared source-net partitions are separate, with no unintended
named-net bridges; EFUSE_RTN remains separate from GND. These source graph
checks do not establish copper connectivity or fully qualified hardware.
Explicit native PCB checks still report **504 unconnected ports,0/108 completed
routed nets,0 traces/0 vias/0 pours**. Placement/native short screens report0;
routed DRC, widths, power, USB, thermal and fabrication checks are incomplete.
Routing remains gated by manufacturer/BOM and actual model qualification.

The official converter identifies the flash STEP origin as
`https://modules.easyeda.com/qAxj6KHrDKw4blvCG8QJPs7Y/2b35e1c3dcc44b77887d4f445b51370a`.
Its request returns403; this exact host is absent from the active policy.
Confirmed Cloud draft16 adds only `modules.easyeda.com` to the preserved31
custom hosts, leaving install/start instructions, credentials and presets intact.
Review/save the draft in environment settings, then publish the environment
and verify actual origin/manufacturer access. A saved draft does not activate
the current VM or prove the missing flash model exists at its origin.

Evidence and a checksummed genuine programmer STEP are retained under
`evidence/rev-0.0.44-alpha.0/cad-connectivity-2026-10-07/`. To reproduce the
CadQuery qualification after initializing the documented Cloud tool paths:

```sh
.mechanical-venv/bin/python mechanical/check-cadquery-components.py \
  dist/index/circuit.json /tmp/nema-cadquery-review.json \
  evidence/rev-0.0.44-alpha.0/cad-connectivity-2026-10-07/REMOTE-STEP-MANIFEST.json
```

Expected current result is exit1 naming U_FLASH. No check is disabled or weakened.
All454 board runtime files and all three canonical JSON mirrors remain exact
to source2765e4c and SHA256`b72ed0cd13e08f93fcbbcd0f7d49c503667c058619a8498f8bdd809a6794a087`.
The public44 release is independently read back with `ready_to_build:false`;
complete publication verification and CadQuery qualification remain blocked.
**PROTOTYPE FABRICATION READY: NO.**

## Original redesign record

**UNROUTED PROTOTYPE. PROTOTYPE FABRICATION READY: NO.**
The latest user request replaces STM32/TCPP01 with RP2040/STUSB4500 and adds
functional buzzer circuitry. Read docs/RP2040-USB-PD-REDESIGN.md for every
review request, part identities, firmware interface and actual limitations.
Prior revision43 connectivity/power/USB/Gerber evidence is historical; none
establishes readiness of this changed architecture.

Stage1 requirements: recorded; exact motor/outline/connectors/carrier retained.
Stage2 schematic/BOM: in progress, blocked on manufacturer access and full
fresh supplier qualification. Native pin assertions, 147 purposes, standard
USB16groups and38programmer wiring assertions pass. The full official style
analyzer leaves the unchanged imported TVS rotation finding, with exit1 retained.
Stage3 placement: in progress. Native unrouted build has147 PCB components,
146 fitted CAD entries, zero placement errors. New bypass/crystal components
were moved toward actual host pins after detecting overly distant initial
placements. Four native placement orientation findings were corrected in board-owned source; the repeated native placement check reports no findings. Full mounted3D fit remains blocked:145/146 fitted meshes are measured without envelope collisions, but J_SWD has an empty mesh after a remote HTTP503. The strengthened mechanical guard retains exit1 and names the missing connector.
Stage4 routing: not started; Stage5 copper review and Stage6 fabrication: pending.
Stage7 firmware/physical tests: pending. Stage8 prototype publication: recorded
only after exact matching public file verification.

Explicit connection checking is invoked separately on placement JSON:
**504 unconnected-port errors,108 required nets,0 completed routed nets,
0 traces/0 vias/0 pours**. Native placement error count0 and short count0 are
not connectivity or routed-DRC approval. The requested0.30/0.45 ordinary through
via policy is configured; no generated via compliance claim is made. Outer
power/current/thermal/USB/shorts/spacing/return/annular-ring and fresh CAM review
remain mandatory after routing. EFUSE_RTN stays isolated from GND.

Independent physical-pin assertions cover the new RP2040/PD/flash/CAN/buzzer,
protected programming and preserved peripherals. Imported labels match the
checked assertions; full RP/MCP/Winbond manufacturer documents remain blocked.
ST DS12499 Rev8 and DocID025617 Rev2 were read for PD and PMOS wiring. Firmware
must read actual PD RDO/voltage/current before enabling the motor/high-current
mode. Factory20V/1A does not automatically justify a1A nominal limiter because
its tolerance exceeds1A. Discharge, startup, TVS/clamp coordination, PMOS
transient/gate/current/thermal and oscillator qualification remain open.

Latest registry versions observed: tscircuit2748, CLI2253, core2099, props693,
checks242, capacity962, runframe2918, circuit-json518, circuit-to-svg444 and
unchanged easyeda371. A real Bun installation fails resolving the publisher's
modelprinter dependency at pkg.pr.new with403. No lockfile changes are adopted;
original frozen pins are restored and verified. No substitute router/package,
credential copy or rule weakening is used. The exact dependency host and
manufacturer hosts are saved in the reviewed Cloud draft, which requires
publication before activation. Allowed-host traffic intermittently fails503
with an upstream Cloudflare tunnel Invalid argument; scoped Git read succeeds.
A fresh53-part official supplier search has13 exact responses and40 HTTP503
failures. Thus all-parts availability/assembler allocation is unconfirmed.

Fresh evidence is in evidence/rev-0.0.44-alpha.0/. Native source JSON, CAD
coverage, minimum runtime and completed applicable checks are recorded there.
Previous README/context manifest, all old imported assets, saved routes,
mechanical official references and evidence are retained. No historical
fabrication ZIP is a valid order package for revision44.

Actual cgroup RAM is32GiB and free disk27.05GiB at the recorded measurement. TypeScript, formatting, critical import-label, native runtime and final root Cloud smoke checks pass. Matching public publication will be recorded after verification. No fabrication order is authorized.

Canonical native JSON SHA256: `b72ed0cd13e08f93fcbbcd0f7d49c503667c058619a8498f8bdd809a6794a087`. All three mirrors match. Native build/placement have zero errors; full style retains one finding. Current native warning counts: `{'source_refdes_convention_warning': 7, 'source_no_power_pin_defined_warning': 15, 'source_no_ground_pin_defined_warning': 9, 'source_component_pins_underspecified_warning': 8, 'source_part_not_found_warning': 137}`. Supplier-fetch HTTP503 warnings are not stock evidence.

Final root Cloud smoke passed: frozen Bun/CLI, TypeScript, critical import labels,
Shapely2.1.2/CadQuery2.8.0, exact context inventory and all four historical
routing archives. Native placement JSON intentionally lacks automatic open
errors because routing is disabled; the separately invoked native connection
check still reports504 opens. This setup result does not approve fabrication.

The exact-source Linux readiness workflow
[37541394417](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37541394417)
completed successfully for source commit
`2765e4ced770530cf44fc4286386389cfb392bbd`. All Linux setup job steps pass;
the checked API receipt is `evidence/rev-0.0.44-alpha.0/LINUX-READINESS.json`.
This verifies setup and smoke checks, not routed copper or physical hardware.

Publication source is `2765e4ced770530cf44fc4286386389cfb392bbd`, pushed to
GitHub main. All 45 upload archives for public tscircuit revision
`AnasSarkiz/smart-nema14-motor-controller--01a0fd9b@0.0.44-alpha.0`, release
`ee4cc135-f49c-4dc5-b9b3-4527b5f3f4a9`, were accepted. The packet contains
454 files and 145 unchanged local model files, including all 100 local assets
used by current CAD. Anonymous downloads verify 404/454 exact file hashes,
including all three canonical JSON mirrors. Fifty downloads remain HTTP503;
serial verification recovered 14 initial failures before reproducing the
Cloud tunnel transport error `Invalid argument` at `cloudflare_https_tunnel`.
Immutable GitHub anonymous checks verify 10/119 changed files; the other 109
requests return the same HTTP503. Git proxy push and exact-source CI succeed.
Full public checksum verification and hosted build success are **not claimed**.
The registry initially created the release with build readiness enabled;
an authenticated disable request succeeds and anonymous POST readback confirms
`ready_to_build: false`. Keep it disabled until all public hashes are verified.
See `evidence/rev-0.0.44-alpha.0/PUBLICATION-PENDING.json` and retained logs.

Cloud draft revision15 contains the exact install/start instructions and31
scoped custom hosts. Current runtime spec6 still has17 custom hosts;
pkg.pr.new and added manufacturer hosts are absent from its effective policy.
Review/save the draft in environment settings, then publish the environment
to activate it. This does not establish that the separate intermittent
HTTP503 tunnel failure is repaired; actual affected requests must be verified.
Current resource readback is32GiB cgroup RAM and27.03GiB available disk.
Receipt-only updates preserve every one of the454 published runtime bytes.
Routing, full component/3D qualification, power/USB/CAM and physical testing
remain incomplete. **PROTOTYPE FABRICATION READY: NO.**

---

# Historical validation records

# Via, power and buzzer continuation — 0.0.43-alpha.0, 2026-10-06

All158 previous0.30/0.60 mm vias now use the requested0.30/0.45 mm pads,
including five exactly owned thermal contacts. Coordinates, drills and through
spans are retained. The remaining66 small filled/capped vias are unchanged:
63x0.20/0.38 and three0.15/0.38 mm. Uniform sizing is incomplete. The ordinary
annular-ring policy follows the latest user request and JLCPCB's published
preferred0.15 mm pad-to-hole diameter difference. Every physical spacing and
exact owner check remains intact. See [review](docs/VIA-POWER-BUZZER.md).

Fresh native minimum-runtime Circuit JSON SHA256:
`60c9034339361ad2a118704176cb7efb6b113fa0742c0f383256fdcf1f5bb039`.
All three mirrors match. The preservation guard proves all411 purchased-pin
partitions, component/pin attributes, imported pads, CAD, courtyards, keepouts,
holes, silkscreen and every nonzero wire segment unchanged versus0.0.42. A
negative check correctly rejects the unresized older board. All12 schematic
element types are exact, so the prior full schematic visual review applies.
Native source metadata matches217 recognized runtime files, MD5
`15b9703676cc7465e55d45e649811d58`. The final prose-only runtime update is rebuilt
natively and proven identical to the first43 build except source metadata.
No generated JSON is edited. All four freshly rendered copper layers were viewed.

Fresh native build, TypeScript/format, five native CLI source checks, shorts,
manufacturer-pin checks on PCB-disabled output, strict copper/filled-pour,
width/tolerance, power fanouts/corners, USB screens,38 programmer assertions,
notes, standard USB and catalogue checks pass. All82 physical nets join with
327 traces/224 through vias/82 pours; zero unconnected/dangling/native/strict
copper errors or shorts. Thirty route-tree width warnings and23 supplier pin
metadata warnings remain disclosed. The full unfiltered official style analyzer
still reports one imported D_VBUS orientation issue; its exit1 is retained.

Fresh pinned native Gerbers match all four canonical copper layers by strict
CAM vector comparison, with224 unique plated drills, six NPTH and108-reference
BOM/CPL. J_USB and three LED supplier rotations remain unverified. This is a
review export, not an approved manufacturing package. CAD dependency coverage
includes all108 CAD entries and80 unchanged local models in the407-file runtime
packet. No rejected candidate becomes the current board or runtime input.

VM/input/protected VBUS and buck-switch wires use outer layers. Part of3.3 V
and all four motor nets still use inner wires;20 inner power pours remain. A
bottom3.3 V trial fails four native errors and seven actual spacing violations.
A corrected outer-only Pipeline9 job reaches topology merging, then hits its
8 GiB process guard at240.1 seconds, sampled8432.7 MiB. Neither is adopted;
this does not prove that outer routing is impossible.

The reference's TMP102 role is already provided by U9 TMP112 at address0x48,
with R2/R3 pull-ups, bypass and alert connection. No duplicate sensor is added.
Fresh unmodified MLT-5020/C94598 imports are reviewed in placement-only fixtures.
The top site overlaps C19 and a thermal via; the first bottom site fails four
pad clearances. The shifted bottom(-3.75,13.75) mm trial passes native checking
and independent spacing. Its actual bottom rendering is viewed. All buzzer
pads remain noConnect and the fixture is not adopted. A functional addition
still needs official drive verification, driver/flyback/pull-down/bypass/PWM,
power-budget, carrier/acoustic and complete routed-circuit qualification.

The official buzzer PDF download host
`jlc-prod-smt.oss-eu-central-1.aliyuncs.com` is proxy CONNECT403 and absent from
the effective allowed-host configuration. Its other official URL returns HTML,
not a datasheet. The pending supported remedy is to add this exact host and save
environment settings, then verify real access. No proxy bypass or guessed drive
specification is used. Displayed JLCPCB stock is distinct from assembly allocation.
U1 still has no qualified stocked same-footprint replacement. Original imports,
model assets, firmware limits and physical-test requirements remain unchanged.

Initial command diagnostics are retained: a missing Bun PATH, a source-only CLI
command given Circuit JSON, and CAM Python lacking the already installed optional
parser. Correct native source arguments, inherited PATH and existing cam-venv
resolve these without any dependency or check reduction. Evidence is in
`evidence/rev-0.0.43-alpha.0/`. Final Cloud smoke, context, exact-source Linux CI
and matching public file verification are recorded after completion below.
Exact root Cloud smoke passed: pinned Bun/CLI, TypeScript, critical official
imports, Shapely/CadQuery, exact context and all four routing archives. Actual
cgroup RAM limit32 GiB; overlay free disk27.79 GiB at resource measurement.

Stage4/5/6 remain incomplete: uniform small vias, outer power, imported schematic
symbol, MCU sourcing, supplier silkscreen/orientations, stackup/fill/mask/paste/
assembly, loaded rail/pour-neck/via sharing and complete thermal/USB/ESD review.
Firmware, physical programming, motor/load and hardware tests are pending.
**PROTOTYPE FABRICATION READY: NO.** No fabrication order is authorized.

Publication source commit:
[`ae9e9af8e4b81559dea220addb75db2ce40dab2b`](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/ae9e9af8e4b81559dea220addb75db2ce40dab2b).
The matching public tscircuit release is
`AnasSarkiz/smart-nema14-motor-controller--01a0fd9b@0.0.43-alpha.0`,
release `f06431f7-691f-4e86-8920-3873c17e9fd6`. All407 exact anonymous file downloads
match, including80 local models and all three fresh JSON mirrors, alongside
177 immutable changed GitHub files. `ready_to_build` is true; hosted preview
success is not claimed. Every upload archive response completes successfully.
The exact-source Linux readiness workflow
[37533518456](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37533518456) passes every job and step,
including the fresh pinned installation and complete smoke checks. See
PUBLICATION.json and LINUX-READINESS.json. Publication/CI success does not
approve fabrication or establish hardware readiness.

A later isolated top-layer3.3 V source trial also fails: ten native errors,
including buck switch-pad and TMC enable accidental contacts. The source delta,
native output and process report are retained in `outer-v3v3-top-run/`; it is
not adopted or uploaded as the current board. The receipt-only follow-up adds
this rejected diagnostic and verification/context metadata. Its407 runtime
files must remain byte-exact against the matching published release.

---

# Schematic style corrections — 0.0.42-alpha.0, 2026-10-06

The full current official schematic analyzer reproduces eleven issues on the
canonical 0.0.41 JSON and one on 0.0.42. Ten findings are corrected through
native board-owned schematic layout: USB-C width, U8 inner labels, six capacitor
banks, MCU reset path and programming ground path. An additional automatic
input-protection ground detour found during iteration gets a local native label.
All sixteen official USB pin groups and all109 component purpose notes remain.
No purchased definition, pin mapping, footprint, dependency or saved route changes.

Fresh canonical Circuit JSON SHA-256:
`8ab167f29868ccdee845f0b65f687fa5fa3a9bcd06351a8eccdfa7e9a2131a06`.
All three committed mirrors match the exact native minimum-runtime build.
The preservation guard proves all411 purchased-pin electrical partitions,
source parts/pin attributes, every PCB element type/placement and all108 CAD
registrations exact versus0.0.41. Negative checks reject real older wiring and
rejected changed-copper inputs. Original imported model bytes remain unchanged.
Native PCB snapshot matches the actual0.0.41 snapshot exactly.

Fresh native build, TypeScript/format, five CLI source checks, shorts,
manufacturer-pin checks on PCB-disabled output, strict copper/filled-pour,
trace widths/tolerance, power fanouts/corners, USB screens, all38 programmer
assertions, notes and standard-USB checks pass. All82 nets join with327 traces,
224 through vias and82 pours, zero unconnected/dangling/native/strict copper
errors or shorts. All four native Gerber vector layers match checked copper;
224 unique plated drills, six NPTH and108-reference BOM/CPL match. Four supplier
rotation warnings and all existing fabrication limitations remain visible.
The CAD publication guard covers108 CAD entries/80 local models with zero
omitted dependencies in the405-file runtime packet. Its actual native source
filesystem hash is15f4ad3949cab03676ba3a407b9a5043 across216 recognized files.

All nine freshly rendered native A4 sheets and the analyzer's native issue
artifact were viewed. The full style command correctly exits1 for the single
remaining D_VBUS orientation issue. A fresh unmodified C1974707 symbol
reproducer builds successfully and fails its rotation assertion: horizontal
port vector despite native schRotation270. This requires a supported runtime/
importer repair; no custom symbol, dependency patch or JSON editing is adopted.
Automatic value/wire label overlaps remain disclosed. Live UI CDN request is
proxy403; the complete official GitHub source analyzer at immutable commit
3b42ebf254bb5d7343874d3ec1023cc63a7781ce is executed without filters. Exact live
browser/CDN equivalence is not claimed. See [review](docs/SCHEMATIC-STYLE.md).

Initial diagnostic failures are retained separately: width checks lacked the
fresh power-corner prerequisite; manufacturer-pin checks were first given
PCB-bearing JSON; Node catalogue requests lacked inherited proxy activation;
BOM table lacked its unchanged original raw supplier inputs. Supported reruns
pass after correcting inputs/runtime, without reducing assertions. Fresh indexed
catalogue identities are distinct from actual official shop/assembly inventory:
the earlier41/42 fitted-code shop result and missing U1 remain applicable to
this unchanged BOM, with no stock reservation or new shop query claimed.

Evidence: `evidence/rev-0.0.42-alpha.0/`. Exact root Cloud smoke passed: pinned
tools, TypeScript, official critical imports, Shapely/CadQuery, context and all
four routing archives. Actual RAM limit32 GiB, overlay disk about29 GiB free.
Final context refresh is verified separately. Publication/CI receipts are
now verified and retained below. Stage4/5/6 remain incomplete: imported
symbol/readability, MCU sourcing, uniform requested vias, outer-only power,
supplier silk/orientation, stackup/fill/mask/paste/assembler and full loaded
power/thermal review. Firmware, physical programming and hardware tests remain
pending. **PROTOTYPE FABRICATION READY: NO.** No order is authorized.

Publication source commit:
[`035b876fb9cfa7747a672b6b2a58abdc6de652ae`](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/035b876fb9cfa7747a672b6b2a58abdc6de652ae).
The matching public tscircuit release is
`AnasSarkiz/smart-nema14-motor-controller--01a0fd9b@0.0.42-alpha.0`,
release `51894a12-e701-4cdb-b6c5-2b36764a1e20`. Anonymous download verification
matches all405 runtime files, including all80 referenced local model assets and
all three exact canonical Circuit JSON mirrors, plus149 changed immutable
GitHub files. `ready_to_build` is true; a successful hosted preview build is
not claimed. The last archive response timed out after the server stored every
file. A read-only inventory found zero missing files; all405 exact downloaded
hashes passed before readiness was set, without any repeat upload. The original
timeout and recovery logs are retained alongside `PUBLICATION.json`.

The fresh exact-source Linux readiness workflow
[37527242963](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37527242963)
passed every job and step at source commit035b876, including pinned Linux
installation and the complete smoke checks. See `LINUX-READINESS.json`.
The receipt-only follow-up changes validation/context metadata; its405 runtime
files must retain these exact published hashes. CI and public checksum success
do not authorize fabrication or establish hardware readiness.

---

# Current continuation review — 0.0.41-alpha.0, 2026-10-06

No new board revision or candidate copper is adopted. All three public native
JSON mirrors were anonymously rechecked against the canonical SHA256
`e3564bef28127cda269198701137dd2be9b552f6418f82ebc407435d66018430`.
Source electronics, saved routes, all imports, CAD and pinned dependencies remain
unchanged. The current handoff's obsolete Q_PD stock statement is corrected.

Fresh official shop queries verify enough displayed quantity for one board for
41/42 fitted codes (107/108 fitted references). U1 C2847904 is the only absent
fitted code. Q_PD C2965326 has 100 units. Additional LQFP variants provide no
stocked drop-in; stocked QFN parts do not fit the current board. Exact ST
product and LCSC pages are accessible, but official distributor/store requests
need `ksmk.st.com` and `estore.st.com`: actual proxy CONNECT403 is preserved.
No assembler allocation, global sourcing or stock reservation is claimed.

An isolated native top-MOTOR_A2/inner2-DIR manual candidate completed in 53.1 s,
peak sampled RSS 1,494.3 MiB, but failed 13 native errors and 18 strict geometry
violations. Rejected; complete native JSON, source and strict evidence retained.
A different source candidate routes only DIR with native Pipeline9 around that
motor corridor. The default 8 GiB run exceeded its memory guard in 192.3 s;
the changed-mesh 8 GiB run exceeded it in 83.0 s. A 20 GiB/600-second run timed
out in 601.9 s, peak sampled group RSS 16,968.6 MiB, before producing any route.
Last progress was topologyMergingSolver. Source inspection shows tested mesh
settings apply after that stage and finds no supported bypass switch. No
clearance, DRC or connectivity requirement is reduced. New official router
0.0.962 changes were reviewed; they are not represented as installed/qualified
or as a demonstrated repair for this merging bottleneck.

Canonical board: zero native errors, opens, dangling items or shorts; all 82
physical nets joined; 327 traces, 224 through vias and 82 pours. Existing strict
geometry/filled-copper, widths, USB screens and 38 programmer assertions retain
their exact checked input. All fabrication gates remain as documented in
[the current review](docs/FABRICATION-REVIEW.md): uniform vias and outer-only
power are unmet; supplier silk, four supplier rotations, full rail/ground/thermal,
stackup/fill/CAM/assembly approval, sourcing, firmware and hardware testing are
unfinished. **PROTOTYPE FABRICATION READY: NO.** No order is authorized.

Evidence: `evidence/rev-0.0.41-alpha.0/continuation-20261006/`.
Actual Cloud machine: 32 GiB cgroup RAM limit, about 29 GiB available overlay disk.

Exact repository-root `bash scripts/cloud-smoke.sh` passed again: pinned tool
activation, TypeScript, official critical import labels, Shapely/CadQuery,
context and all four archived routing parts. Final metadata/context are checked
separately after retaining the smoke and candidate receipts. Development
readiness is separate from the unchanged **NO** fabrication decision.

Public review commit `bb7d22943ec14df296cbf642d2a8ec70203b1ff7` is pushed
to main. Anonymous immutable GitHub downloads verify 33/33 changed/reviewed
files, including all three canonical native JSON mirrors. All 402 runtime files
still match the previously verified public 0.0.41 package; no new board version
or package-content change is claimed. Fresh Linux readiness run 37524212262
passed every job/step for this review commit:
https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37524212262.
Receipts are retained in the continuation folder. Fabrication decision stays NO.

---

# Remaining fabrication review — 0.0.41-alpha.0, 2026-10-06

Additional audit only; canonical source, purchased imports, saved copper, pinned
dependencies and all three generated Circuit JSON mirrors remain unchanged.
Fresh exact official JLC shop lookup now lists genuine ST Q_PD C2965326 with
100 units (displayed presale number97). U1 C2847904 and CBT6TR remain absent;
related LQFP48 CBT3 has zero stock. No stock reservation or assembler allocation
is claimed. The older rev41 stock receipt below is retained as historical evidence.

Fresh motor-path endpoint/track/barrel review gives a conservative simultaneous
peak copper DC loss bound of 0.072695 W under its explicit 80 C, nominal copper,
18 um uniform plating and -20% width assumptions. Inverting the existing
IPC-2221 30 C screen requires 14.8254 um minimum inner copper; the nominal
15.2 um leaves only 2.53% thickness margin. This is not thermal or manufactured
minimum qualification. Complete rail/ground neck/current-sharing and device
thermal/switching review remains open.

Fresh native CAM silk checks retain a pass for all four owned connector labels,
but fail the production check: 541 supplier paths below 0.15 mm, top ink outside
outline and both sides inside mask clearance. Both native silk renders were
viewed. Four supplier rotations remain unverified. Reviewed newer released
core/CLI/checks and unchanged latest importer/props/exporter show no relevant
silk/orientation repair; dependencies are retained.

A fresh isolated native MOTOR_A2 bottom-layer manual candidate completed in
56.2 s, peak sampled RSS1455.9 MiB, but produced13 native errors and25 strict
geometry violations. It is rejected, with complete source delta, generated JSON,
geometry and status retained. No candidate copper is adopted. Read-only manual
corridor probes also encountered blockers; they are not qualified routes.

The measured fabrication-gate script correctly exits1: uniform0.30/0.45 vias,
outer-only power, complete supplier silk and all supplier rotations remain
blocked. Zero canonical native errors/strict geometry failures and all82 joined
networks remain verified by exact-hash current receipts. A concrete unsent
manufacturer/assembler review checklist is prepared in
[FABRICATION-REVIEW.md](docs/FABRICATION-REVIEW.md). Firmware and physical tests
remain unperformed. **PROTOTYPE FABRICATION READY: NO.**

The additional review is public in GitHub commit
`4b2bd17b454eb42d6e6d0f347434dea83b7b589e`; nine anonymous source/evidence/JSON
downloads match SHA-256. The unchanged public tscircuit release remains
`417fecfa-b1ba-476a-909e-3e54d5ab473a`, version0.0.41-alpha.0; all three published
Circuit JSON mirrors were freshly downloaded and match canonical bytes.
No new board revision or package upload is claimed for this audit-only step.
Exact local Cloud smoke, formatting, Python compilation, current-input reviews
and stale-input rejection checks completed. Fresh Ubuntu Linux readiness
[run37520066445](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37520066445)
passed every job/step for the immutable review commit. Receipts are
`REVIEW-PUBLICATION.json`, `REMAINING-REVIEW-CHECKS.json`,
`REMAINING-REVIEW-LINUX-READINESS.json` and `REMAINING-REVIEW-SMOKE.log.gz`.

# Genuine supplier replacements — 0.0.41-alpha.0, 2026-10-06

User selected U2 TRINAMIC TMC2209-LA-T C2150710 and D_USB Texas Instruments
TPD2EUSB30DRTR C97502. Both are freshly imported with the pinned supported CLI;
all supplier symbol, footprint, pin attributes and model files are unmodified.
ADI Rev 1.09 identifies LA/LA-T as tray/tape-and-reel versions of the same driver
and permits unused pin 25 to connect to GND. TI SLVSAC2G shares the DRT three-pin
land pattern/pin table and USB application. The non-A protector has higher
stand-off/breakdown thresholds (5.5/7 V versus 3.6/4.5 V); no system ESD/surge or
hardware USB immunity is inferred. U1 and Q_PD remain unchanged.

Fresh canonical native build SHA-256:
`e3564bef28127cda269198701137dd2be9b552f6418f82ebc407435d66018430`.
All three committed Circuit JSON mirrors match. Exact comparison with revision
0.0.40 proves all 411 manufacturer-pin electrical partitions, 109 purchased
placements, pads, drills, silkscreen, 327 traces, 224 vias, 82 pours and 108 CAD
registrations/model bytes unchanged. Native regenerated port IDs are compared
by their real component/physical-pin owners. The new pin25 alias is UNUSED;
the USB symbol supplies its own reference label. Updated purpose notes remain
native. Exact-alias checking fixes a prior tokenization bug without relaxing
any expected label or electrical assertion.

Fresh full build, TypeScript/format/import labels, all five supported native
source checks, shorts and snapshots pass; existing imported D_VBUS vertical
rotation issue remains in the schematic-placement output. PCB-disabled physical
manufacturer-pin/value/supply/programmer checks and fresh exploded assembly
inventory pass. All 82 physical filled-copper networks join; zero native errors,
opens, dangling items or shorts, and zero strict track/drill/edge/keepout/copper
clearance violations. All 2,227 wire segments meet the 0.15 mm floor; four motor
nets pass the documented 0.34245 A analytical screen including -20% width
variation. All 34 active power fanout corridors have their requested copper.
Thirty combined-route-tree width, 23 pin-metadata and four refdes warnings remain
visible. Complete loaded rail/pour/via current and thermal qualification is pending.

USB path lengths 25.13552/24.75408 mm, skew 0.38144 mm; limited actual-ground
return and approximately 91.812 ohm nominal pair screens pass their stated
scope. All 38 standard-JST programmer physical-pin/net assertions pass, with
VOUT isolated and the target powered by USB-C. Firmware timing and physical
programming remain untested. All nine fresh schematic sheets, four actual
copper-layer renders and fresh assembly render were viewed; automatic label
and value overlaps remain disclosed. Complete UI style review is unresolved.

Fresh direct native Gerbers/drills/BOM/CPL have 224 unique through-plated drills,
six NPTH and 108 fitted references, R50 DNP. All four strict native Gerber vector
layers match canonical copper with zero per-net losses under the unchanged
explicit 2 um serialization comparison allowance. Four supplier rotations are
unverified. The CAD publication guard covers 108 entries/80 local model assets
with zero omitted dependencies. The minimum runtime packet has 402 files;
all historic original imports, models, saved routing and mechanical references
remain preserved. No routing job, replacement router or dependency patch ran.

Fresh official public JLC shop searches at 18:59 UTC show 16,560 genuine
C2150710 and 5,954 genuine C97502 units. All 43 exact codes are queried; only
U1/C2847904 and Q_PD/C2965326 lack an exact shop match. This is distinct from
LCSC: the user's U1 listing is out of stock and Q_PD listing shows 100 units.
Indexed catalogue identities pass, but assembler allocation/reservations for
the full BOM remain unverified. No stocked compatible MCU alternative is adopted.

The full-history root build was stopped after remaining in generation for more
than five minutes. The documented minimal runtime build completed normally;
only its fresh native output is canonical. Initial diagnostic invocations used
the system Python without Shapely and a missing render output directory; both
were rerun successfully using the installed mechanical venv and explicit output
directory. Font cache write advisories did not prevent correctly rendered fonts.
No failed output is called a pass and no DRC/test threshold is suppressed.

Evidence: `evidence/rev-0.0.41-alpha.0/`; detailed supplier rationale and remaining
requirements: [PART-REPLACEMENTS.md](docs/PART-REPLACEMENTS.md). Repeat the exact
preservation check with `scripts/check-part-replacement.py BASELINE CURRENT REPORT`;
baseline is the immutable rev40 source commit's `dist/index/circuit.json`.
Fresh exact `bash scripts/cloud-smoke.sh` passes with pinned Bun/tscircuit,
TypeScript, critical imports, Shapely/CadQuery, context hashes and all four
historical routing archives. Remote publication receipts are recorded below
when complete.

Publication verified: source/artifact commit `9f7ca62d598f61154ac4be2bc9db2debd83678d1` and public
tscircuit release `417fecfa-b1ba-476a-909e-3e54d5ab473a` (0.0.41-alpha.0). All 402 runtime
files and 25 immutable GitHub source/model/artifact files passed anonymous
SHA-256 readback, including the exact three canonical Circuit JSON mirrors
and both new official model dependencies. The release is ready to build;
no hosted preview/render success or hardware validation is claimed.
Fresh complete Linux readiness workflow [run 37516256224](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37516256224)
passed every job and step for the immutable source/artifact commit.
The actual runtime filesystem MD5 matches the native generated metadata across
215 recognized source files; no metadata was edited to obtain a cache hit.
Exact receipts are PUBLICATION.json, LINUX-READINESS.json and
RUNTIME-SOURCE-HASH.json. Authored TSX/MJS/Python/Markdown whitespace checks
pass; supplier STEP CRLF and native rendered SVG whitespace are preserved
unchanged, and are not fabrication/geometry failures.

Stages 4/5/6 remain incomplete: uniform 0.30/0.45 mm via request, outer-only
power routing, supplier silk/mask/paste/CPL review, stackup/plating/filled-process
acceptance, full loaded power/via/thermal review and sourcing are unresolved.
Firmware, USB/system ESD and physical programming/motor tests are pending.
**PROTOTYPE FABRICATION READY: NO.** No order is placed.

---

# Encoder removal — 0.0.40-alpha.0, 2026-10-06

User requested removal of the unused encoder. U4/C6 are absent from schematic
and PCB; R2/R3 remain required by U9's temperature-monitoring I2C bus. The Encoder
sheet is now I2C with native explanations for both pull-ups. Motor control is
open-loop. Shared supply and bus trees join remaining real pads; a required
central ground return is retained. SDA/ground junctions now use relocated
ordinary 0.30/0.60 mm through vias. Official unused imports/models and historical
references/evidence remain intact.

Fresh build:327 traces/224 vias/82 pours;0 native errors,opens,dangling items
or shorts. All82 physical networks pass strict filled-copper connectivity;
strict track/drill/edge/keepout geometry has zero violations and66 exact named
filled features. All411 surviving purchased-pin partitions and remaining
placements,pads,CAD are preserved;267 unaffected fixed-copper groups match
exactly. Generated pour cutouts are requalified. Programmer38 pin checks,
width/motor-tolerance and USB path screens pass their stated analytical scope.
Fresh native review Gerbers/drills/BOM/CPL have224 unique plated drills,six
NPTH and108 fitted references;four supplier rotations remain unverified.
Fresh PCB-disabled manufacturer-pin and exploded-assembly/model inventory checks
pass. The minimal runtime full build and all five cached native source checks
pass; all four direct Gerber layers match the source with no measured net losses.
Nine sheets and all four physical layer renders were viewed. Existing imported
TVS rotation/style,automatic label overlaps,30 width/24 metadata/four refdes
warnings and all previous fabrication/power/thermal/sourcing blockers remain.
No complete UI style or hardware/programming validation is claimed.

Evidence:evidence/rev-0.0.40-alpha.0/; [removal review](docs/ENCODER-REMOVAL.md).
Publication verified: source/artifact commit
`61f2fb05302dd712770ebdb90e519c5af328865e` and public tscircuit release
`51529005-b37f-4b32-a147-1c4ecfb6a9de` (0.0.40-alpha.0). All 396 runtime files
and 19 immutable GitHub files passed anonymous SHA-256 readback, including
the canonical Circuit JSON mirrors and preserved model dependencies. Canonical
SHA-256 is `e38b284e997482f78cc5575e448647a5f82756447d0c9b87da358e259c710bf0`.
The release is ready to build; hosted preview success is not claimed.
Fresh Ubuntu setup and all workflow steps passed for source run
[37505205560](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37505205560).
Exact receipts are PUBLICATION.json and LINUX-READINESS.json in the evidence folder.
Stages4/5/6 remain incomplete for the previous unresolved
constraints;firmware and hardware tests are pending.
**PROTOTYPE FABRICATION READY: NO.**

---

# Standard USB schematic and six-request review — 0.0.39-alpha.0, 2026-10-06

Native USB-C standard schematic reuses unchanged official C5143397 footprint,
supplier identity and all 16 physical pin groups, including DN1/DN2. Five missing
custom-symbol reference labels and the R41/C34 and R11/U2 collisions are fixed.
All 111 component explanations remain. The schematic CLI retains D_VBUS's known
imported-symbol rotation defect; a fresh official C1974707 reproducer fails as
expected. No symbol/footprint/pin definition is patched. All nine fresh native
renders were viewed; residual automatic net-label/value overlaps are visible.
UI style analysis is blocked at Loading files by denied required CDN metadata
and browser proxy-CA trust; it is not claimed as performed.

Fresh canonical SHA-256:
`a2a836a5ceae27967440cb6a0e324a26426f9ada311d1a73391ced7507bcf3b7`;
all three mirrors match. Full native build, TypeScript, format, notes/USB-pin
checks, native source/placement/shorts/netlist/pin checks run. Zero native PCB
errors, opens, dangling items or shorts;82/82 nets,334 traces,224 vias,82 pours.
Independent actual/filled copper, widths/tolerance, USB and programmer checks
pass their stated scope.30 width,25 pin metadata and four refdes warnings remain.
Exact comparison proves unchanged source ports/traces/nets and all copper/pads/
CAD/placements; only USB classification/cable metadata and schematic objects
change. All official imports,111 runtime assets, mechanical references, saved
routing, local skill and historical evidence remain intact.

All 224 accepted vias are through plated; no blind/buried vias. The requested
uniform0.30/0.45 mm source candidate emits the target size but fails with 109
native errors (66 opens,38 via/pad errors,5 drill-spacing errors) and 217 strict
geometry violations. Foreign drill/track/pad/hole/edge/keepout limits and exact
owner checks are retained. The candidate is rejected; current sizes remain
156×0.30/0.60,64×0.20/0.38 and4×0.15/0.38 mm. JLCPCB's preferred via diameter
minus hole is0.15 mm, so the requested nominal ring is permitted; resizing in
place is unsafe. Genuine escape/plane-contact rerouting and CAM requalification
are still required before adoption.

VM/USB input wires use outer layers;14.052864 mm of V3V3 and portions of all
four motor nets remain inner. Two actual outer-only MOTOR_A1 Pipeline9 trials
produce no route:300-second timeout, then8 GiB process RSS guard exceeded at
119.6seconds after coarser mesh/0.35 mm nominal-width changes. Existing copper
is preserved; outer-layer routing is incomplete. All 44 exact C codes were
freshly checked at the official public JLCPCB stock endpoint. Four fitted codes
remain absent: U1 C2847904, U2 C465949, D_USB C94934, Q_PD C2965326.
Shop stock does not establish assembler allocation; lookalike manufacturer
substitutions are not adopted. See [the complete six-request report](docs/BOARD-REVIEW-39.md).

The Cloud draft retains exact install/start scripts and adds the two necessary
UI CDN hosts. Draft persistence is confirmed; application to the running VM is
not. Supported review/save runtime update and browser trust remain prerequisites
for UI analysis. Latest released tscircuit/CLI/core versions still match pins.
Actual cgroup memory is32 GiB; workspace disk31.45 GiB total,22.57 GiB available.
No environment publication, fabrication order or physical programming is claimed.

The registry archive endpoint rejected the first 9 MB review-ZIP upload with
HTTP 413. A second 5.27 MB ZIP also received HTTP 413. The runtime ZIP now contains only
current revision checks/native sheet images and the applicable prior CAM/USB/silk
qualification subset, below the previously successful 3.22 MB bundle size.
Every complete historical diagnostic and rejected candidate remains committed
in evidence/rev-0.0.39-alpha.0. Sources/Circuit JSON/models are unchanged.

Publication verified: source/artifact commit
`ce56cd20bc29d44ea34384027e309db26f4d16e2` and public tscircuit release
`e4342765-6324-46b2-8071-6c39a4309793` (0.0.39-alpha.0). All 393 runtime-package
files and 19 immutable GitHub files passed anonymous SHA-256 readback, including
all required model assets and exact canonical mirrors. The release is ready to
build; hosted preview success is not claimed. Fresh Ubuntu setup passed for
implementation run [37496872948](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37496872948)
and exact artifact run [37497480348](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37497480348),
with every required job and step successful. Receipts are committed in
PUBLICATION.json and LINUX-READINESS.json. Evidence: evidence/rev-0.0.39-alpha.0/.
All prior supplier silk/CPL/stackup/plating/filled-process and loaded power/thermal
blockers remain. **PROTOTYPE FABRICATION READY: NO.**

---

# Schematic explanations — 0.0.38-alpha.0, 2026-10-06

All 111 electronic references have native purpose notes on their nine A4 sheets,
including actual passive values, hardware defaults and U4/C6/R50 DNP status.
Schematic coordinates and existing prose are reflowed for right-side panels.
The outdated USB routing-pending note now identifies impedance qualification
as pending. See [all sheet images](docs/SCHEMATIC-NOTES.md).

Fresh canonical Circuit JSON SHA-256: `7141f726718ecfe7d3887cb1fdcf29fc58089b19bd390c337a61484c4558289b`. All three mirrors match.
The exact preservation check compares every one of 28 non-schematic element types
(excluding project metadata): source traces/ports/nets/components, all PCB objects,
334 traces /224 vias /82 pours, 423 supplier pads and 108 CAD entries remain
byte-equivalent to revision 0.0.37. All 111 original runtime model assets, official
imports, mechanical references and routing sources are unchanged. No routing ran.

All nine fresh native renders were viewed. The annotation regression check passes:
111/111 references, matching sheets, no purpose-panel symbol/net-label/wire overlap,
adequate line spacing, and DNP disclosures. Native build, TypeScript, formatting,
netlist, source, placement and shorts pass. Native errors/opens/dangling items: zero;
82/82 physical nets remain joined. Thirty width warnings, 27 supplier pin-metadata
warnings, five refdes and five styling warnings remain visible. Native snapshots
record a new visual baseline; exact physical preservation is the regression proof.

Existing strict copper, CAM, width/tolerance, USB and programmer qualification
is retained by exact unchanged electrical/PCB/CAD objects, with baseline evidence
explicitly labeled in the qualification ZIP. This annotation-only step does not
repeat or extend physical qualification. Power/thermal/loaded-via review remains
incomplete; USB impedance is a bounded analytical screen; flashing is untested.
Supplier silk, four CPL rotations, four sourcing/allocation gaps, stackup/plating
and 68 filled/capped via process acceptance still block ordering.

Publications verified: implementation commit `f37e48bcd4688eeb0b4daa01742f0d67475ab91f`
and public tscircuit release `c235fa13-c8bf-4f0e-a7ef-30c1eaa8e070`. All 391
package files and 22 immutable GitHub files passed anonymous SHA-256 readback,
including the component-note helper, all nine sheet sources, Circuit JSON and
every preserved model asset. The release is ready to build; hosted-preview
success is not claimed. The fresh Ubuntu install/startup workflow
[37488982248](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37488982248)
passed; exact step outcomes are recorded in LINUX-READINESS.json.

**PROTOTYPE FABRICATION READY: NO.** No hardware validation or order is claimed.
Evidence: evidence/rev-0.0.38-alpha.0/.

---

# Manual source fixes — 0.0.37-alpha.0, 2026-10-06

Publication verified: source/artifact commit `f29b08808188b69cb31d415ea3ee69740fec21d5`, public
tscircuit release `ca0c7647-3f73-4835-80b6-ce1128d4c26c` (0.0.37-alpha.0).
All **389 package files** and **13 immutable GitHub files** passed anonymous
SHA-256 readback, including every model asset and the three canonical mirrors.
The [fresh Linux install/startup workflow](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37483110250)
passed; exact step outcomes are in LINUX-READINESS.json. The release is ready to
build; hosted preview success and fabrication readiness are not claimed.

Moved the exactly owned GND_C25_ESCAPE from (-11.8, -13.5) to
(-11.67, -13.5) mm. The native inner1 ground polygon beside this barrel had
an irregular sliver erased by the subsequent VBUS_CONN Gerber clear-polarity
hole. The new source position removes that sliver without changing supplier
pads or generated JSON. Strict copper clearance still passes the original
0.35 mm foreign drill-to-pad requirement; the 0.15 mm trial failed by 5 µm
and was rejected. The earlier 0.02 mm trial retained a CAM mismatch.

All four exported copper layers now match native geometry under the existing,
explicit 0.002 mm boundary/curve comparison allowance: zero missing/extra area.
This is a vector-geometry comparison, not full fabrication approval or a claim
that the former sliver was an open net. Native shorts reports none.

Moved USB-C text 0.2 mm left and SWD text below its connector. A fresh native
isolated-text fixture is compared with the full production mask and silkscreen.
All four owned labels pass: 0.214466 mm minimum mask clearance, 0.198 mm actual
Gerber pen width, zero ink within 0.15 mm of openings and zero ink outside outline.
The complete production silk check intentionally still exits 1: 557 unchanged
supplier paths are thinner than 0.15 mm; top mask/outline and bottom mask
violations remain. No supplier graphic is hidden or patched to obtain a pass.

Final canonical Circuit JSON SHA-256: `99df7e9371dce7a57c2d76ad668ba12ba4a4a465ca7f595f08d791757f6bc033`.
Three committed mirrors match. Source compilation at the minimum runtime root
preserves package-relative model URLs. All 421 purchased-pin partitions, 111
placements, 423 supplier pads, 108 CAD entries, 111 existing runtime assets and
223 other barrels remain exact. Default fitted population is 108; U4/C6/R50 DNP.

Fresh native build/checks: zero native/unconnected/dangling errors, 82/82 physical
nets, 334 traces / 224 vias / 82 pours. Strict copper and foreign-pour checks
pass, with all 68 exact reviewed filled/capped owners. Thirty route-width and
27 supplier pin-metadata warnings remain visible. The successful copper checks
ran before the final SWD text-only move; the exact original measurement input
is preserved in qualification-review.zip. COPPER-RECHECK-PRESERVATION.json compares
all other element types byte-for-byte, including every copper and wiring object.
The final canonical independently passes native shorts/placement/source/netlist,
Gerber geometry, USB path, programmer and width/tolerance checks. All four current
copper images were viewed. The nine schematic sheets and CAD geometry are unchanged;
the previous qualified analytical carrier/import/model screens remain applicable.

All 2,218 nonzero segments meet the 0.15 mm floor. Four motor nets pass the
retained −20% width screen at 0.348699 A versus 0.342448 A phase peak, conditional
on 15.2 µm inner copper and the 30 C IPC-2221 model. All 34 declared power branches
retain source widths; complete loaded rails, barrel plating, transient/switching
loops and thermal qualification remain open. USB skew stays 0.381441 mm; signal-core
reference coverage is exact and its screen passes. Nominal 91.812 Ω is not confirmed
controlled impedance. Programmer pin checks pass with 100 Ω series parts; VOUT is
isolated. Physical flashing, operation, thermal behavior and mating are untested.

Refreshed 44 exact supplier identities through the official public Parts Library:
zero request errors; U1 C2847904, U2 C465949, D_USB C94934 and Q_PD C2965326 still
have no exact public in-stock match. This does not establish allocated assembly
stock. J_USB and three LED supplier rotations still lack native orientation metadata.
The drill/BOM/CPL identity check passes 224 PTH, six NPTH and 108 fitted references.
Supplier silk, CPL orientation, sourcing, selected stackup/minimum copper/plating,
68 filled/capped process acceptance and complete power/thermal review block ordering.
See docs/EXPORT-BLOCKERS.md for the supported capability limits and reproductions.

Latest released tscircuit 0.0.2745 / CLI 0.1.2251 remain pinned, with Bun 1.3.9.
Gerber 0.0.112 was inspected: its new files API does not fix these supplier defects;
no dependency patch, substitute exporter/router or unused package was installed.

**PROTOTYPE FABRICATION READY: NO.** No fabrication order or physical test.
Publication and fresh Linux CI outcomes are recorded separately when verified.

---

# Current Linux continuation — 0.0.36-alpha.0, 2026-10-06

Published matching prototype 0.0.36-alpha.0 from source commit
`dd637e4d963ad637e90b6baf27ecc5a45a90293f`. All **387** package files (including every
model asset and fresh Circuit JSON) were downloaded anonymously and SHA-256
verified; **13** matching immutable GitHub raw files passed. Public tscircuit
release `c212d402-dca4-4a88-be0c-ddb521cc58d7` is ready to build.
The [fresh Linux readiness workflow](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37475422263) passed installation
and smoke checks. Hosted 3D rendering, hardware and fabrication readiness are
not claimed. See evidence/rev-0.0.36-alpha.0/PUBLICATION.json and
PUBLICATION-METADATA.json.

The pinned released toolchain is updated to tscircuit 0.0.2745, CLI 0.1.2251,
core 0.0.2095, props 0.0.689, checks 0.0.240, runframe 0.0.2915 and native
Pipeline9 0.0.959. Bun 1.3.9 is retained with its checked lockfile.

Fresh native Circuit JSON SHA-256: `feb1c704d92b3a0c0686bc85fd09198c221a3e393b60b4a8d5fb3b457bc78b80`. The build runs at the minimal
runtime package root so CAD URLs resolve to `./imports/...`; generated JSON is
never edited. All three committed JSON mirrors match. Version 0.0.35 evidence
below is historical; the new reports are in evidence/rev-0.0.36-alpha.0/.

Four motor nets now use at least 0.27 mm inner wires. Their conservative
−20% manufactured-width screen passes: 0.348699 A minimum screened capacity
versus 0.342448 A peak, retaining 15.2 µm inner copper and the 30 C IPC-2221
model. These assumptions are not a guaranteed fabricated copper minimum or
thermal validation. Local native source bends, one ordinary CC1 barrel move,
and a synchronized CAN_RS detour restore full clearances without changing
component placement, motor endpoints, USB geometry or any owned filled feature.
R20/R21/R22 use unchanged official C25076 100 Ω imports, matching the official
standard JST programmer recommendation. VOUT stays isolated; target power is
separate. All 421 purchased-pin wiring partitions and all 111 centers, layers
and rotations are preserved. Default fitted population is 108; U4/C6/R50 are DNP.

Native geometry: 334 traces, 224 vias, 82 pours, zero unconnected/dangling/native
errors; all 82 physical nets joined, zero strict copper or foreign-pour
violations. The 68 individually owned filled/capped features retain their
exact owners. Native shorts, placement, source and netlist checks pass;
27 supplier pin metadata warnings and 30 combined-tree width warnings remain
visible. All 2,218 nonzero wires meet the 0.15 mm floor. All 34 declared active
fanout branches retain their requested widths. This does not qualify every
loaded rail, barrel, switching loop or thermal path.

USB skew remains 0.381441 mm; the signal-core reference screen passes.
Nominal impedance estimate is 91.812 Ω on the selected, unconfirmed stackup.
Programmer physical pin/net assertions pass; flashing and SWD timing are
untested. Default assembly has 108 genuine fitted component models plus the
unchanged official motor; all 111 component identities remain in the assembly
drawing and all supplier assets remain in the packet. Both inner and both
outer rendered layers and the assembly preview were viewed. Carrier and mating
screens pass their documented analytical envelopes; real fit remains untested.

Ordering remains blocked. Strict independent Gerber vector comparison finds
0.000399007 mm² of missing inner1 GND copper after an explicit 0.002 mm/2 µm
boundary comparison allowance. This is an export mismatch, not a claim of an
open net. Supplier silk overlaps mask openings and extends outside the outline;
557 native supplier paths are thinner than 0.15 mm. Four concise connector
labels replace crowded automatic reference text, but final silk is not approved.
108-reference BOM/CPL and 224 PTH/6 NPTH drill identities match. J_USB and the
three LED supplier rotations still lack pin1 metadata and require assembler
confirmation. Official imports, footprints, pads and pin mappings are unchanged.
Do not repair these by editing supplier footprints or generated JSON.

All 44 exact part identities were checked in the indexed catalogue and official
public Parts Library. Of 42 fitted part codes, C2847904 (U1), C465949 (U2),
C94934 (D_USB), and C2965326 (Q_PD) have no exact public in-stock search result.
This is not proof of assembler allocation; Q_PD has a separate pre-order result.
Clone-branded alternatives were not selected. A stocked genuine TMC2209-LA-T
code is recorded as an unqualified procurement candidate, without changing U2.

The fresh supplier geometry fixture uses the released Circuit SDK with
platform routingDisabled. It passes all 44 imports / 261 pin-to-pad mappings.
The CLI fixture retained eight routed traces despite its disabled-routing input;
that failed output and exact commands are retained as a generator/cache diagnostic.
No dependency patches, DRC suppression or weakened tests were used. Negative
via tests now select current manifest coordinates rather than stale revision
positions. The assembly test asserts the exact default DNP set and 109 CAD
entries instead of an obsolete all-fitted 112-entry display.

**PROTOTYPE FABRICATION READY: NO.** Final native-export/silkscreen and supplier
orientation fixes, actual assembly stock allocation, stackup/minimum copper and
plating, filled/capped processing, loaded power/via/thermal and switching-loop
review remain incomplete. Firmware, physical flashing, electrical transients
and functional/fit tests are unperformed. No order was placed.

---

# Current Linux continuation — 0.0.35-alpha.0, 2026-10-06

## Six-point board review — 2026-10-06

See docs/BOARD-REVIEW.md and docs/PROGRAMMING.md. Design sources, imported parts,
placement, saved copper and canonical SHA
`63076b482262db351ea8136616baf8afc8594d505a2a0932eb0c336d29395f53` are unchanged.
Exact canonical checks again pass: 82/82 physical nets, zero unintended opens or
shorts, zero strict copper/filled-pour violations, native placement zero errors
and warnings, native runtime netlist zero errors and warnings, 38 programmer
pin/net assertions passed. Native pin-specification retains 27 metadata warnings.

**The nominal motor-width pass below is not a manufacturing-tolerance pass.**
The now-reachable official JLCPCB capabilities page specifies ±20% track-width
tolerance. Applying it to the retained peak-current/30 C screen fails 26 internal
motor segments across all four phases: minimum .310431/.329776 A vs .342448 A.
Current width qualification is blocked. All 43 exact parts were queried in both
the indexed catalogue and official public Parts Library; four fitted codes
C2847904/C465949/C94934/C2965326 have no exact public in-stock result. Pre-order
results differ and actual assembler allocation is unconfirmed. Programmer J3
five-pin order matches, VOUT remains unconnected, and target needs its own USB-C
supply. Its 1 kilohm series resistors/TMUX require timing qualification versus
the official recommended 100 ohms. Final CAM/orientation/silkscreen and full
power/via/thermal/transient review remain unfinished.

**PROTOTYPE FABRICATION READY: NO. Hardware and programming untested; firmware
not delivered; no fabrication order placed.** This is a review metadata update
for revision 0.0.35-alpha.0, not a new electrical/copper revision. Exact review
checks and official source snapshots are in
evidence/rev-0.0.35-alpha.0/board-review-20261006/.

Routing is complete using supported native source paths. Fresh full CLI build
passes with **334 traces, 224 vias, 82 pours and zero native errors**. All 82
physical nets have one connected copper component, with zero foreign-pour
spacing violations. Strict copper/drill/edge/NPTH checks pass with all 68 exact
filled-feature owners matched; native shorts reports none. All 421 purchased
pins retain their complete named and unnamed wiring partitions. The independent
fresh schematic-only manufacturer-pin tests pass for 111 supplier references,
nine sheets, programming/protection connections and current-limit values.

Canonical SHA-256: `63076b482262db351ea8136616baf8afc8594d505a2a0932eb0c336d29395f53`.
All three committed JSON mirrors match this fresh CLI output. Original 111
placements, 423 pads, 195 prior barrels and 51 prior owned features are preserved;
four local saved paths change to open verified corridors. Added ground and RTN
reconnections repair actual islands without joining EFUSE_RTN to GND. All
physical PCB geometry is exact across the final default-DNP metadata update.
U4/C6/R50 use supported doNotPlace props; their copper remains present, while
BOM/CPL correctly exclude those three references.

All 2,209 nonzero wire segments across 82 nets are inventoried. Width floor
and motor phase-current screens pass; the narrowest internal motor section is
0.23 mm, screened at 0.36494 A versus the conservative 0.34245 A phase peak.
Inner sections of 0.25 mm screen at 0.38768 A. These assume the recorded copper
thickness and 30 C rise model. Thirty native width warnings remain: a combined
same-net tree's minimum is compared with individual .18/.20/.28/.40/.60 mm
requests. All 34 active fanout corridors are covered at their requested widths (POWER-FANOUT-WIDTH-REVIEW.json). No warning is suppressed. Actual loaded power paths, pours/necks,
parallel paths, via plating, switching loops and thermal spreading are not yet
fully qualified. RAW VBUS's previously measured 1.455 mm neck screen remains
applicable because its physical copper is unchanged. Power tolerance/regeneration
corner screens pass their stated bounds; high-frequency transients remain open.

Fresh USB paths measure DP 25.13552 mm, DM 24.75408 mm, skew 0.38144 mm (<0.5).
Adjacent ground covers the signal core. The approximate 91.812 ohm result uses
the selected nominal stackup, not a field solver or confirmed fabrication coupon.
The four copper-layer images were viewed before the DNP metadata-only change;
physical silkscreen is unchanged and still crowded, with some labels outside
outline. Cosmetic D_VBUS schematic rotation and imported metadata warnings remain.

Direct native tscircuit Gerbers/drill/BOM/CPL export passes identity checks:
224 plated drill hits, six NPTH, no duplicate hits, exact supplier identities,
positions/layers and 108 default fitted references. Four supplier orientations
remain unverified: J_USB, LED_POWER, LED_STATUS and LED_FAULT. Complete Gerber
copper/outline/mask/paste review and assembler feedback remain pending. The old
KiCad conversion reported 2,023 violations and 55 disconnected export items,
including duplicate objects and mismatched default rules. Its failures are
retained, not disabled or described as an approved fabrication export.

All local model dependencies remain present. Actual assembly/mounted previews
build, and the nominal exact-motor/front-carrier BRep/AABB audit passes for all
111 references. The carrier/tolerance and constrained mating-envelope analytical screens also
pass; the limiting J_IO clearance is .1643 mm after allowances. Actual
physical assembly and mating fit remain untested. The live catalogue check passes all 43 exact parts with displayed
stock; that does not reserve stock. TypeScript and formatting pass.

Evidence: evidence/rev-0.0.35-alpha.0/, especially cloud/canonical-population/,
TRACE-WIDTH-AUDIT.json, PIN-PARTITION-PRESERVATION.json and NATIVE-CAM-AUDIT.json.
Rejected routing experiments are losslessly archived with per-file SHA-256;
accepted canonical evidence remains unpacked. The runnable package excludes
historical routing/debug trials but retains necessary sources, imports, models,
pinned dependencies, checks and fresh Circuit JSON. Existing historical evidence,
official references, context manifests and .agents/skills/tscircuit are preserved.

Cloud currently denies CONNECT access to jlcpcb.com for its official capability
page. An additive draft preserves the known dependency/supplier hosts and adds
jlcpcb.com. Saving a draft does not apply or publish policy; review/save and
Publish are environment-panel actions, followed by an actual request retry.
Manufacturer confirmation of the .15/.20 mm named TypeVII filled/capped process,
minimum copper/plating and exact stackup remains an ordering blocker.

Revision035 publication is verified: public GitHub source/artifact commit
`9c5b63415baad275a9d045c535696ab3884c56bf` and public tscircuit release
`18fcb173-e240-4c1b-aa98-6a5f83fef3d3`. All 384 runtime package files and
13 GitHub source/artifact files passed anonymous SHA-256 readback,
including all three canonical JSON copies and every unchanged model asset.
PUBLICATION.json identifies that exact snapshot. Subsequent metadata receipts
record only documentation/review updates; routed source and JSON remain exact. No hosted build success is
claimed. Stages 4/5/6 are incomplete; firmware and hardware tests are pending.
**PROTOTYPE FABRICATION READY: NO.** Do not order from this review packet.

# Historical Linux continuation — 0.0.34-alpha.0, 2026-10-05

CAD publication repair (2026-10-06): all 111 CAD entries retain their model
references and all 82 unique local dependencies exist in Git. The earlier
selected publication packet omitted every referenced local OBJ/STEP/STP asset;
this caused missing models in the public package despite intact supplier imports.
All 105 existing model assets (including imported models, exact USB/eFuse models
and the official motor STEP) are now restored and anonymously verified byte for
byte. The motor STEP needs binary upload to preserve its non-UTF8 encoding.
The remaining remote SWD connector OBJ/STEP URLs both return HTTP 200 and valid
model bodies. A new publication coverage guard rejects the old packet with
82 omissions and passes the actual repaired public inventory with zero omissions.
Circuit/source geometry and all three canonical JSON hashes remain unchanged.
See evidence/rev-0.0.34-alpha.0/cad-publication/ for manifests,
before/after audits and asset readback. The hosted rebuild remains pending.
Hosted 3D rendering and assembled fit remain separately unverified.

Publication verification: GitHub main commit
`5b1f28a0068c5107eb37800553e62d39829fe683` and the matching public
tscircuit revision 0.0.34-alpha.0 are anonymously accessible. All 17 updated
metadata/artifact files passed exact remote SHA-256 readback, including all
three unchanged canonical Circuit JSON copies. The separate asset receipt
verifies all 105 model files. See cad-publication/METADATA-PUBLICATION.json
for this verification snapshot; subsequent commits only record this outcome.

SWDIO_GUARDED physically joins U7 pin3 and R20 pin1 through a supported
native source tree. The old POWER_GOOD barrel obstructed the U7 outlet:
0.2258 mm surface gap cannot fit the 0.15 mm signal plus required pad/via
clearance. That ordinary barrel moves to (7,-12.85), retaining dimensions,
full span and masks. One exact-owned TypeVII filled/capped ENIG U7 escape
(.20/.38 mm) and one ordinary .30/.60 mm R20 barrel complete the link.

All 156 other saved paths and all existing explicit pours remain exact.
All 268 other net/layer copper groups remain within 0.1 nm; all 192 other
prior barrels preserve drill, pad, full span and effective tenting. All 421
component pin-net assignments remain exact. The manufacturing manifest has
51 individually declared features, with no blanket exception. Actual native
Pipeline9 input covers all 195 current annuli on all four layers and retains
.30/.60 mm ordinary new-via minima. The board wrapper now consistently selects
the requested beta_pipeline9 even when a seed job has no target list.

Fresh full build: **238 traces / 195 vias / 74 pours**, **9 native unconnected
ports + 6 unfinished trace errors**, **75/82 physical nets complete**.
Canonical SHA-256: `519f8e29e54829445772ef4dec82ef712788d259f3556068d92bd160ce4cc855`.
Strict geometry and foreign filled-copper clearance have zero violations.
Native netlist/shorts/schematic placement, TypeScript, formatting and imports
pass. After successful network verification, the fresh full CLI build completed
in 45.045 seconds with 7255.5 MiB peak sampled RSS. Its element serialization
changed, but all 276 emitted net/layer copper groups preserve geometry within
0.1 nm, all 195 barrel dimensions/spans/effective masks remain exact and all
74 emitted pours remain byte-exact. See cloud/canonical-after-network-verification/
EMITTED-ALL-COPPER-PRESERVATION.json and REBUILD-PRESERVATION.json. All six power/reference networks remain joined and EFUSE_RTN isolated;
USB reference/skew and RAW-neck analytical screens pass. All four current layer
images were actually viewed. Crowded silkscreen and bottom labels at/outside
outline remain. Build/all-net checks correctly exit 1 for retained errors.

Native Pipeline9 seeded controls exhausted iterations at port pathing after
833.624 s / 12904.469 MiB, with no route adopted. A changed SWCLK-only seed job
hit the guard after 743.678 s / 23477.973 MiB at available-segment point solving.
Its seed output is not a completed Pipeline9 result. An earlier wrapper-selected
Pipeline7 seed run was stopped at 43.063 s and rejected; the wrapper is fixed.
A supported endpoint-pair trial created no native phase1 because of inferred net
ownership; it is removed. A manually proposed eFuse fault trunk passed spacing
but split RTN and interrupted USB reference, so its source is reverted. Rejected
trials and exact source snapshots remain evidence, with no checks disabled.
The unseeded POWER_HIGH_CURRENT-only Pipeline9 job timed out after 901.315 s
with 13607.754 MiB peak sampled RSS in edge solving (0.28). No output was adopted.
The invalid eFuse seed is removed from active helpers; exact rejected source
remains archived.
A changed two-real-pad-root POWER_HIGH_CURRENT seed still timed out after
901.447 s / 13132.152 MiB in edge solving. All 195 annuli remained covered in
its actual input. No final route exists. The six-contact experimental extension
is reverted to the fourteen-file pre-trial source snapshot matching the
successful final CLI build; source restoration is checksum verified. The core
diagnostic is retained separately and lacks CLI supplier pin-one metadata; it
is not accepted as a replacement build.

A changed official Pipeline9 SDK attempt forwards that exact 7655-obstacle,
two-real-pad-root input unchanged and uses public mesh options dimension3/ratio30
instead of dimension15/ratio6, retaining minNodeArea .01, effort1 and every
manufacturing constraint. It passes edge solving (68894 regions, 211696 edges),
then times out in portPointPathingSolver after 901.305 s / 21262.180 MiB peak
sampled RSS. No final route exists and no board source/copper is adopted.
The installed official class and pinned dependencies remain intact. Exact input
provenance, source snapshot, progress, guard result and reproduction instructions
are in cloud/power-high-mesh-native9-001/. Explicit source-access alternatives
also violate actual pad/trace/via clearances and are rejected. This is a native
routing performance blocker, not a package-network or setup failure; these
unchanged jobs must not be repeated. An official native improvement or a changed
source plan is required before the seven nets and fabrication gates can finish.
The exact failure/reproduction packet and unchanged three canonical mirrors
are publicly verified at GitHub commit `556d29bfc95f579731448c626d3691d33bbc57bb`
and the existing revision34 release: all 30 updated files and six key GitHub
files passed anonymous checksum readback. See PUBLICATION-PIPELINE9.json.
The registry's unversioned download endpoint caches for 24 hours; its anonymous
file API and checksum-addressed downloads return the current verified bytes.

Exact saved Cloud startup smoke passes: TypeScript, critical import labels,
pinned Linux analysis libraries, complete context inventory and four archive
parts. Source/format checks pass. Actual cgroup RAM is 32 GiB, swap is zero,
and workspace disk has 27.58 GiB free out of 31.45 GiB.

The base publication matches public source/artifact commit
`169b518f865632e9b97b61bb34603463d829ce6a` and tscircuit release
`1f1e413e-9f44-43c5-8c58-e97d64e38a75`: all 386 base package files and
13 key GitHub files passed anonymous SHA-256 readback. PUBLICATION.json records
that initial snapshot. The subsequent network-verified rebuild above changes
serialization only; its current artifact/metadata readback is recorded separately
in PUBLICATION-METADATA.json: all 47 updated files and six key GitHub files
passed anonymous checksum readback at commit
`76c5a75a0758ff55a37b4cf3b488838ced28d6f1`.

Seven physical nets (TMC_DIR, SWCLK, EXT_STEP_CONN, EXT_DIR, CAN_RS,
EFUSE_FLT_N, POWER_HIGH_CURRENT) and full power/via/thermal/transient,
signal, USB/SI, 3D/mechanical and CAM gates remain unfinished. Live official
EasyEDA product responses match all 43 unique supplier identities for 111
references. The official CLI catalogue check now passes all 43 exact parts
with nonzero displayed stock; the exact model URL with its official UUID
returns HTTP 200 and a real OBJ. Both formerly denied hosts now permit these
requests. Node fetch tools use supported NODE_USE_ENV_PROXY=1. The 14-host
draft is saved; successful actual requests do not prove draft publication,
stock reservation or final 3D fit. Earlier 180/360-second failed builds are
rejected, with no stale output accepted. Firmware and hardware tests remain
unperformed; no hosted build success is claimed.
**PROTOTYPE FABRICATION READY: NO.** Continue all TASK.md nets and qualification.

# Historical Linux continuation — 0.0.33-alpha.0, 2026-10-05

TMC_ENABLE_N now physically joins U1 pin15, U2 pin2 and R7 pin2 through the
corrected native three-layer tree and two ordinary 0.30/0.60 mm through vias.
The route initially split the VM plane at C14. A reviewed inner1 native pour
reconnects C14 to the eFuse output, with a local bulge around the USB NPTH; all
six power/reference networks remain joined and EFUSE_RTN stays isolated.

All 151 previous saved paths and 20 explicit pours remain exact. All 265 other
net/layer copper groups stay within a 0.1 nm serialization envelope. All 191
prior via drills, pads, spans and effective tenting flags are preserved; 421
purchased/component pin-net assignments stay exact. Saved paths now walk each
through barrel fully for native obstacle coverage. The active USB ESD GND via
is explicitly 0.30/0.60 mm. Actual Pipeline9 input covers all 193 current via
annuli on all four layers. Two retained filled contacts preserve original
mask settings; all 50 manufacturing declarations remain unchanged.

Fresh official full build: **234 traces / 193 vias / 74 pours**, **11 native
unconnected-port + 6 unfinished trace errors**, **74/82 complete physical nets**.
Canonical SHA-256: `2a308b0c3d2d0ae50ffbd2d748f8f3365f8d842b7184a0b7d36037e1eca26534`.
Strict geometry, foreign fill clearance, native netlist/shorts/schematic placement,
TypeScript, imports and formatting pass. USB return/skew and RAW-neck analytical
screens pass. Full build exits 1 for retained errors; all-net filled review
exits 1 for eight incomplete nets. All four current layer renders were actually
viewed. Crowded silkscreen and bottom labels at/outside outline remain.

Historical Pipeline4 output seeded the corrected enable route but its raw result
failed geometry/power and was not adopted. The VM Pipeline4 run was stopped
when the user selected Pipeline9. VM Pipeline9 timed out at 901.397 seconds,
15,756.520 MiB peak, in joint DRC repair (0.84), with no final route adopted.
All future remaining-net jobs use native beta_pipeline9 only. Rejected source
trials and stale output are explicitly identified in ARCHIVE-PROVENANCE.json;
no check was disabled and no generated JSON or imported component was patched.
See TMC-ENABLE-ADOPTION.json and cloud/canonical/CHECKS.json.

Public revision0.0.33 matches source/artifact commit `642bfbe516b4ac4cbbc0bd00e2f876b07afe537f` and release `20809bda-8414-4ea2-aef8-c7f4c6754ed2`: all 326 base package files and 13 key GitHub files passed anonymous SHA-256 readback. Exact Cloud smoke and 4311 context files plus all four historical archive parts were verified. No hosted build success is claimed. Eight physical nets and
full power/via/thermal/transient, USB/SI, signal, 3D/mechanical and CAM gates
remain unfinished. Live official supplier verification still needs easyeda.com
runtime policy activation through the environment editor. Firmware and hardware
tests are unperformed; no hosted build success is claimed.
**PROTOTYPE FABRICATION READY: NO.** Continue all TASK.md nets and qualification.

# Historical Linux continuation — 0.0.32-alpha.0, 2026-10-05

The four motor phase routes had 0.15 mm internal sections, below the conservative
0.34245 A phase bound in the IPC-2221 / 30°C analytical screen. Native source
repairs now use 0.25 mm internally, with one 0.23 mm MOTOR_A2 corridor segment.
Screened capacities are 0.38768 A and 0.36494 A. Minimum manufactured copper,
barrel plating, thermal and transient qualification remain pending.

Existing saved trunks are represented as real-port native trees. All 253
unchanged net/layer copper groups are preserved within a 0.1 nm numerical
serialization envelope. All 38 V3V3 declarations stay exact; all 48 earlier
owned filled features stay exact. Two individually owned filled contacts and
a native driver/pullup branch reduce TMC_ENABLE_N to two physical groups.
Direct native links now use resolved start-port selectors so the router treats
them as fixed. A numeric-zero-start trial changed four links and failed actual
geometry/shorts; it is rejected and retained separately.

Fresh official full build: **227 traces / 191 vias / 73 pours**, **11 native
unconnected-port + 7 unfinished trace errors**, **73/82 complete physical nets**.
Canonical SHA-256: `dd2cda6ddc62e20f50703db7bb7487df47b862a56c9f41dc516f5c0678872bd1`.
Strict geometry, foreign fill clearance, native netlist/shorts/schematic placement,
TypeScript, imports and formatting pass. All six power/reference networks are
joined and EFUSE_RTN stays isolated. USB reference/skew and RAW-neck analytical
screens pass. Full build exits 1 for retained unresolved errors. All four current
layer images were actually viewed; crowded silkscreen and bottom labels at/outside
the outline remain. Supplier imports, connector placement and mechanics remain
intact. Unchanged manufacturer schematic evidence is reused from revision23.

The earlier access-only driver-enable Pipeline9 attempt was manually stopped
at 1583.226 seconds / 13599.328 MiB peak after edgeSolver stalled; no route was
adopted. The changed compacted/fixed source is eligible for a fresh bounded job.
Optional CLI path-cache serialization still reports a nonunique imported-port
selector; fresh native JSON exists and electrical/import checks pass. Prior
revisions had the same class of cache warning; imports were not patched.
Evidence: POWER-ACCESS-ADOPTION.json and cloud/canonical/CHECKS.json.
Matching public publication is verified: source commit `3c732b1468958add4ffd1e450dab483231eaefc9`, release `29149b5a-7ffd-4c73-8c7d-fa39be2b45d2`, all 314 base files and eight key GitHub files matched anonymous SHA-256 readback. Exact Cloud smoke passed; all 3933 context files and four historical archive parts verified. No hosted build success is claimed. Live official supplier
verification needs the saved easyeda.com policy applied through the environment
editor. Nine nets and full power/USB/signal/3D/CAM gates remain unfinished.
Firmware and hardware tests are unperformed; no hosted build success is claimed.
**PROTOTYPE FABRICATION READY: NO.** Continue all TASK.md nets and qualification.

# Historical Linux continuation — 0.0.31-alpha.0, 2026-10-05

LIMIT1 is physically complete between U1 pin 22, C30 pin 1, R26 pin 2 and R31 pin 2.
The complete native saved star uses inner1, both existing ordinary MCU/cap
escapes and the existing filled filter contact. All 148 earlier saved paths
and all 48 individually owned filled features remain exact. No new vias,
imports, placement, wiring, dependencies or mechanical changes were made.

Fresh full official CLI build: **224 traces / 189 vias / 72 pours**, **14 native
unconnected-port + 6 unfinished trace errors**, **73/82 complete physical nets**.
Canonical SHA-256: `04ba8d990851f101e528d95831c468a3dcb7176b75b184141058bafee406e8a5`.
Strict geometry, foreign fill clearance, source netlist, native shorts, imports,
TypeScript and formatting pass. All six power/reference networks stay joined;
EFUSE_RTN remains isolated from GND. USB reference/skew and RAW-neck analytical
screens pass. Full build exits 1 for retained errors. The unchanged manufacturer
pin schematic-only test reuses 0.0.23 evidence. Cosmetic D_VBUS styling remains.
All four current layer images were actually viewed; crowded silkscreen and
bottom labels near/outside the outline remain. Nine physical nets and complete
power/via/thermal/transient, USB, signal, 3D/mechanical and CAM qualification
remain pending. Firmware and hardware tests are unperformed.

LIMIT1 trial001 omitted its fourth logical endpoint, so native saved-phase
validation rejected it. Trial002 explicitly includes R31 pin 2. Native driver
DIR Pipeline9 timed out at 600.907 seconds in edgeSolver (progress 0.28), with
13146.85 MiB peak sampled RSS and no final output; no route was adopted.
Evidence: LIMIT1-ADOPTION.json and cloud/canonical/CHECKS.json.
Cloud resources and exact smoke results are retained. Live supplier availability
still requires runtime activation of the saved easyeda.com host draft and a
successful official request. Public revision 0.0.31 matches source/artifact commit `b3a748f2c3d6a979ea9088ba172069f49cbae59e`
and tscircuit release `6868a1c3-d5f1-49e7-a4e1-8e70d3c3e9ee`: all 311 package files
and eight GitHub files passed anonymous SHA-256 readback. Hosted build success
is not claimed. See PUBLICATION.json.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining TASK.md nets and gates.

# Historical Linux continuation — 0.0.30-alpha.0, 2026-10-05

I2C_SDA is complete between U1 pin 48, U9 pin 6, DNP encoder U4 pin 6 and R3 pin 2.
The supported saved star uses inner2 around the existing UART/driver/control
copper and an inner1 encoder-to-pullup leg, reusing the two existing ordinary
escapes and two exact filled contacts. All 145 prior saved paths and all 48
filled declarations remain unchanged. No new vias, imports, placement, logical
wiring, dependencies or mechanical changes were made.

Fresh full official CLI build: **224 traces / 189 vias / 71 pours**, **14 native
unconnected-port + 8 unfinished trace errors**, **72/82 complete physical nets**.
Canonical SHA-256: `5007f586de57f7c84af0351fd2931961a71e2a7b9d0e66eec456bf87e95e36f4`.
Strict geometry, foreign fill clearance, source netlist, native shorts, imports,
TypeScript and formatting pass. All six power/reference networks stay joined;
EFUSE_RTN remains isolated from GND. USB reference/skew and RAW-neck analytical
screens pass. Full build exits 1 for retained errors. The 0.0.23 manufacturer-pin
schematic-only test was not repeated for unchanged wiring/imports. Cosmetic
D_VBUS styling remains. All four current layer images were actually viewed;
crowded silkscreen and bottom labels near/outside the outline remain.
Ten physical nets and full power/via/thermal/transient, USB, 3D/mechanical and CAM
qualification remain pending. Firmware and hardware tests are unperformed.
I2C bus rise-time/loading review remains part of final signal qualification.

SDA trial001 replayed unchanged29 because a temporary preparation helper failed
before writing source; corrected owner lookup and source candidate are in002.
Native STEP Pipeline7 timed out at 600.892 seconds in edgeSolver, progress
0.3181818181818182, 13235.03 MiB peak sampled RSS; no final route was adopted.
Evidence: SDA-ADOPTION.json and cloud/canonical/CHECKS.json.
Cloud resource and exact smoke results are retained in this revision. Live
EasyEDA availability still needs runtime activation of the saved official-host
draft and a successful official request. Public revision 0.0.30 matches source/artifact commit `4583f6de0cc0845708e382070052b00a2ada3d84`
and tscircuit release `68b1d6ad-877c-4b09-b708-e8dece529388`: all 311 package files
and eight GitHub files passed anonymous SHA-256 readback. Hosted build success
is not claimed. See PUBLICATION.json.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining TASK.md nets and gates.

# Historical Linux continuation — 0.0.29-alpha.0, 2026-10-05

TEMP_ALERT_N is complete between U1 pin 12, U9 pin 3 and R33 pin 2.
The supported star uses inner1 from the existing MCU filled contact around the
east/north perimeter and the reviewed UART/CC1 corridor to its pullup, plus an
inner2 sensor branch. All 143 earlier saved paths and all 48 individually owned
filled features remain exact; no new vias, purchased imports, placement, logical
wiring, dependencies or mechanics changed.

Fresh full official CLI build: **225 traces / 189 vias / 71 pours**, **14 native
unconnected-port + 10 unfinished trace errors**, **71/82 complete physical nets**.
Canonical SHA-256: `e3032bafd1603fd8fa2eaf78d4a49096a7dbccd37289cce17c05224397f87af1`.
Strict geometry, foreign fill clearance, source netlist, native shorts, imports,
TypeScript and formatting pass. All six power/reference networks stay joined;
EFUSE_RTN remains isolated from GND. USB reference/skew and RAW-neck analytical
screens pass. Full build exits 1 for retained errors. The 0.0.23 manufacturer-pin
schematic-only test was not repeated for unchanged wiring/imports. Cosmetic
D_VBUS styling remains. All four current layer images were actually viewed;
crowded silkscreen and bottom labels near/outside the outline remain.
Eleven physical nets and full power/via/thermal/transient, USB, 3D/mechanical
and CAM qualification remain pending. Firmware and hardware tests are unperformed.

Temperature trial001 failed before saved copper rendering because the new net's
phase selectors were not declared. Trial002 corrected source phase assignments;
001 is rejected. Native STEP Pipeline4 timed out at 180 seconds in nodeSolver,
progress zero, 1474.29 MiB peak RSS, with no final circuit or paths adopted.
Evidence: TEMPERATURE-ADOPTION.json and cloud/canonical/CHECKS.json.
Cloud resource and exact smoke results are retained in this revision. Live
EasyEDA availability still needs runtime activation of the saved official-host
draft and a successful official request. Public revision 0.0.29 matches source/artifact commit `b9c02298b43303ae542fd84ae1bb16e81e6ee7ed`
and tscircuit release `19031b6e-7cf5-4a36-b7bd-00c82a6545f3`: all 310 package files
and eight GitHub files passed anonymous SHA-256 readback. Hosted build success
is not claimed. See PUBLICATION.json.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining TASK.md nets and gates.

# Historical Linux continuation — 0.0.28-alpha.0, 2026-10-05

EXT_ENABLE_N is complete between U1 pin 21, R25 pin 2 and R30 pin 2.
The supported inner1 saved star uses the existing ENABLE_MCU_FILLED and the
individually owned ENABLE_R25_FILLED pad contact: 0.20 mm drill / 0.38 mm pad,
IPC-4761 Type VII filled/capped, ENIG. This exact R25 pin 2 declaration is not
an ordinary-via or blanket manufacturing exemption. All 141 earlier saved paths
and 47 filled features remain unchanged; 48 named filled features now match.
Purchased imports, placement, logical wiring, dependencies and mechanics remain exact.

Fresh full official CLI build: **226 traces / 189 vias / 70 pours**, **14 native
unconnected-port + 11 unfinished trace errors**, **70/82 complete physical nets**.
Canonical SHA-256: `ec9ab91850274401988370ae8f67f0d4968a8c1070bff4a5720c22cb9e179dfe`.
Strict geometry, foreign fill clearance, source netlist, native shorts, imports,
TypeScript and formatting pass. All six power/reference networks stay joined;
EFUSE_RTN remains isolated from GND. USB reference/skew and RAW-neck analytical
screens pass. Full build exits 1 for retained errors. The 0.0.23 manufacturer-pin
schematic-only test was not repeated for unchanged wiring/imports. Cosmetic
D_VBUS styling remains. All four current layer images were actually viewed;
crowded silkscreen and bottom labels near/outside the outline remain.
Twelve physical nets and complete power/via/thermal/transient, USB, 3D/mechanical
and CAM qualification remain pending. Firmware and hardware tests are unperformed.

Evidence: EXT-ENABLE-INTERNAL-ADOPTION.json and cloud/canonical/CHECKS.json.
Cloud resource and exact smoke results are retained in this revision. Live
EasyEDA availability still needs runtime activation of the saved official-host
draft and a successful official request. Public revision 0.0.28 matches source/artifact commit `3d9bed56d9928a4f745d774357888be7bb360b09`
and tscircuit release `a6bb7734-03de-4312-a96e-6f178f2cf35f`: all 309 package files
and eight GitHub files passed anonymous SHA-256 readback. Hosted build success
is not claimed. See PUBLICATION.json.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining TASK.md nets and gates.

# Historical Linux continuation — 0.0.27-alpha.0, 2026-10-05

LIMIT1_CONN is complete between J_IO pin 8, D_IO1 pin 5 and R26 pin 1.
The supported saved star uses inner2 from the connector to its ESD escape and
inner1 from the ESD escape to the series resistor. All 139 earlier saved paths
and all 47 exact filled-via declarations remain unchanged. No new vias,
purchased imports, placements, logical wiring, dependencies or mechanics changed.

Fresh full official CLI build: **225 traces / 188 vias / 70 pours**, **14 native
unconnected-port + 11 unfinished trace errors**, **69/82 complete physical nets**.
Canonical SHA-256: `c5c51d0351f5bc5bc10e212dbc9c917c521e21b8e090cad5f7a6b1ca84134e3d`.
Strict geometry, foreign filled clearance, source netlist, native shorts, imports,
TypeScript and formatting pass. All six power/reference networks remain joined;
EFUSE_RTN stays isolated from GND. USB reference/skew and RAW-neck analytical
screens pass. Full build exits 1 for retained errors. The 0.0.23 manufacturer-pin
schematic-only test was not repeated for unchanged wiring/imports; current source
netlist and imports pass. The cosmetic D_VBUS recommendation remains.
All four current layer images were actually viewed. Silkscreen crowding and
bottom labels near/outside the outline remain; thirteen physical nets remain
incomplete. Full power/via/thermal/transient, USB, mechanical/3D and CAM
qualification remains pending. See LIMIT1-CONN-ADOPTION.json and canonical/CHECKS.json.

Released Pipeline9 timed out at 180 seconds in topologyMergingSolver, progress
0.23455776173285198, with 10260.38 MiB peak sampled RSS. No TMC enable path or
final board output was adopted. Earlier TMC power-network regressions remain
rejected. Exact Cloud smoke and resource results are in the current root evidence.
Live EasyEDA availability still needs activation of the saved official-host
runtime draft and a successful official request. Public revision 0.0.27 matches
source/artifact commit `2af85c6c2da9c26b8da173113f1b0a4382633ad2` and tscircuit release
`4e1cf416-c852-4b90-bb2f-0f766299bc21`: all 309 package files and eight GitHub files
passed anonymous SHA-256 readback. Hosted build success is not claimed.
Firmware and physical tests remain unperformed.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining TASK.md nets and gates.

# Historical Linux continuation — 0.0.26-alpha.0, 2026-10-05

EXT_ENABLE_N_CONN is complete between J_IO pin 7, D_IO1 pin 4 and R25 pin 1.
Two supported inner2 saved star branches use the existing ENABLE_IO_FILLED,
ENABLE_ESD_FILLED and ENABLE_SERIES_FILLED features. All 137 previous saved
paths and all 47 exact filled-via declarations remain unchanged. No new vias,
purchased imports, placement, logical wiring, dependencies or mechanics changed.

Fresh full official CLI build: **226 traces / 188 vias / 70 pours**, **14 native
unconnected-port + 11 unfinished trace errors**, **68/82 complete physical nets**.
Canonical SHA-256: `2e6bda85cb4f339360e0ec33a867164042e92d8fbaf9309516e03de74c00149e`.
Strict geometry, foreign filled clearances and native copper shorts pass. All
six power/reference networks remain joined; EFUSE_RTN stays isolated from GND.
Source netlist, critical imports, TypeScript and formatting pass. Schematic
placement retains the disclosed cosmetic D_VBUS recommendation; the 0.0.23
manufacturer-pin/schematic draft test was not repeated for unchanged wiring.
All four current layer images were actually viewed. Silkscreen crowding and
bottom labels near/outside the outline remain. Full build exits 1 for retained
errors. USB reference/skew and RAW-neck analytical screens remain passing,
without qualifying all power/via/thermal/transient, USB, mechanical or CAM gates.

TMC enable corrected saved trials 001/002 are rejected: they joined TMC_ENABLE_N
and passed geometry but split VM, protected VBUS and C33 eFuse return networks.
All rejected paths were removed before this accepted external-enable build.
See EXT-ENABLE-ADOPTION.json and cloud/canonical/CHECKS.json. Fourteen physical
nets remain incomplete; final power/thermal/USB, silkscreen, 3D and fabrication
export review remain pending. Hardware/firmware tests remain unperformed.
Actual resource measurements are in CLOUD-RESOURCES.json: 32 GiB container
limit, no swap, 28.677 GiB disk available of 31.451 GiB total.
Live EasyEDA availability still needs runtime activation of the saved host draft
and a successful official request. Public revision 0.0.26 matches source/artifact
commit `44b26731f9c6a38c88bd0d7937094cd415b455b0` and tscircuit release
`60b5f48b-8d77-42a3-ac0b-812be521fb64`: all 308 package files and eight GitHub files
passed anonymous SHA-256 readback. Hosted build success is not claimed.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining TASK.md nets and gates.

# Historical Linux continuation — 0.0.25-alpha.0, 2026-10-05

LED_STATUS_DRIVE is complete between U1 pin 30 and R36 pin 1. The released
Pipeline4 timed out at 180 seconds without final output; no native candidate
was adopted. A supported manual inner2 saved path detours around the existing
CAN_RX and EXT_STEP ordinary vias, using STATUS_MCU_FILLED and
STATUS_RESISTOR_FILLED with their existing exact owners/dimensions. All 136
prior saved paths and 47 manufacturing declarations remain identical. No new
vias, purchased imports, placements, logic, dependencies or mechanics changed.
Separate TMC enable Pipeline4 (180 s) and Pipeline7 (240 s) timeouts are retained;
neither produced final board JSON and neither altered accepted copper. Pipeline4
did emit intermediate paths; they remain unqualified and were not adopted.

Fresh full official CLI build: **227 traces / 188 vias / 70 pours**, **14 native
unconnected-port + 11 unfinished trace errors**, **67/82 complete physical nets**.
Canonical SHA-256: `ba082e485f73bbbae4bf0d2ea5a2f7e33bb09ada8466491caf05b422e91f58fc`.
The full build correctly exits 1 for retained errors. Strict geometry and foreign
filled clearances pass; all six power/reference nets remain joined and EFUSE_RTN
stays isolated from GND. Source netlist, native shorts, imports, TypeScript and
formatting are checked in the current evidence. The manufacturer-pin/schematic
draft test was not repeated; its 0.0.23 evidence applies to unchanged imports,
placement and logical wiring. Schematic placement retains the disclosed cosmetic
D_VBUS orientation recommendation.

USB skew remains 0.381441 mm, measured reference-core coverage passes and the
approximate main-pair impedance remains 91.812378 ohm. RAW lower neck remains
1.455 mm, with the limited 1.390106 A analytical estimate versus the 1.0714 A
worst-case current limit. Full power/via/transient/thermal, USB, silkscreen,
3D/mechanical and CAM qualification remain pending. All four current layer images were actually viewed; crowded silkscreen and bottom
refdes near/outside the outline remain. Fifteen physical nets remain incomplete. See LED-ADOPTION.json and canonical/CHECKS.json.

Current Cloud measurements: 32 GiB container limit, 33.289 GiB host RAM, no swap;
31.451 GiB filesystem total and 28.757 GiB available at measurement. These actual
values are recorded in CLOUD-RESOURCES.json. Live supplier availability remains
unverified: activation of the saved additive easyeda.com runtime host policy and
a successful official request are still required. Public revision 0.0.25 matches
GitHub source/artifact commit `239712e457844af5146bc44e7655485f25db18e9` and tscircuit release
`d36a633c-2e68-4796-92e7-163ba4f00626`: all 308 package files and eight GitHub files
passed anonymous SHA-256 readback. No hosted build success is claimed.
Firmware and physical testing remain unperformed.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining TASK.md nets and gates.

# Historical Linux continuation — 0.0.24-alpha.0, 2026-10-05

VBUS_ADC is physically complete across MCU U1 pin 11, C27 pin 1, guard U7 pin 13
and series R51 pin 1. Native Pipeline4 exhausted iterations on four endpoints;
selecting two pins still expanded to the whole net. Supported explicit source
paths form a checked L1 star with two ordinary 0.30/0.60 mm vias at (5.18,-5.75)
and (8.19,-8.1). Individually reviewed ADC_MCU_FILLED and ADC_SERIES_FILLED
0.20/0.38 mm features have exact U1 pin 11 and R51 pin 1 owners. All prior 133
saved paths and 45 filled features remain identical; exactly 47 filled features
now match emitted geometry. No imported component, placement, mechanics,
logical source wiring or dependency was changed.

Fresh official CLI build: **228 traces / 188 vias / 70 pours**, **14 native
unconnected-port + 11 unfinished trace errors**, **66/82 complete physical nets**.
Canonical SHA-256: `46da11d2673d74366c8754c221920d035bc6982debf27583f3dc2feb21214661`.
Strict geometry and foreign filled clearances pass; all six power/reference
networks remain joined and EFUSE_RTN remains isolated from GND. The full CLI
exits 1 for the retained incomplete connections. Source netlist, native copper
shorts, TypeScript, formatting and critical import checks pass. Native schematic
placement retains the disclosed cosmetic D_VBUS orientation recommendation.
The previous revision's manufacturer-pin/schematic-only test remains applicable
to the identical supplier imports and logical wiring; it was not repeated here.

USB skew remains 0.381441 mm, complete measured ground-reference coverage passes,
and the approximate main-pair impedance is 91.812378 ohm. RAW lower neck remains
1.455 mm; its limited analytical current estimate is 1.390106 A against the
1.0714 A worst-case current limit. These screens do not qualify all power paths,
via currents, transients, thermal behavior or final USB performance. All four
current layer images were actually viewed. Crowded silkscreen and 16 incomplete
physical nets remain, with final 3D/mechanical/thermal/visual/CAM review pending.
A separate native guarded SWDIO job timed out at the 180-second bound without
usable output; none was adopted. See ADC-ADOPTION.json and canonical/CHECKS.json.

Live supplier availability is not tested by this full build. The earlier official
EasyEDA CONNECT denial still requires runtime activation of the saved additive
host draft and a successful official request. Public revision 0.0.24 matches
GitHub source/artifact commit `e8f060f16d6b7bd248b7cedb3d34684826a568a2`
and public tscircuit release `662718c8-fe2a-429d-aba6-f9dad467eb5e`: all 305
package files and eight GitHub files passed anonymous exact SHA-256 readback.
Hosted build success is not claimed. See PUBLICATION.json. Firmware and hardware
tests remain unperformed.
**PROTOTYPE FABRICATION READY: NO.** Continue TASK.md; do not stop at this checkpoint.

# Historical Linux continuation — 0.0.23-alpha.0, 2026-10-05

PD_CC2_CONN is physically complete across J_USB pin 15, C24 pin 1 and U3 pin 9.
The source retains the reviewed native Pipeline4 east/north trunk and uses
supported saved paths with explicit corrections. The existing USB and TCPP
filled/capped transitions retain their exact manifest owners; the ordinary
0.30/0.60 mm transition is at (3.68,-3.36). Its short L1 detour preserves USB
reference copper, and the shortened L3 connection preserves the C14 VM return.
All 131 previous saved paths, 45 filled features, imports, placement, mechanics
and dependencies are retained. No generated JSON or dependency was patched.

Fresh official CLI canonical build: **225 traces / 184 vias / 70 pours**;
**18 native unconnected-port + 11 unfinished trace errors**, **65/82 physically
complete nets**. Strict geometry and foreign filled clearances pass; all six
power/reference nets are joined and EFUSE_RTN remains isolated from GND.
Canonical SHA-256: `5f175dd056e620cc8c4a7e80bd96230ef3ceb9c565761ea18a3b923574aa2c80`.
The full CLI correctly exits 1 for retained incomplete connections.

The RAW lower neck remains 1.455 mm, with a limited 1.390106 A analytical screen
against the 1.0714 A worst-case limit. USB skew remains 0.381441 mm, the ground
reference covers the complete measured signal core, and the approximate main
pair impedance remains 91.812378 ohm. These screens do not qualify the entire
power path, via currents, transients, thermal behavior or final USB performance.
Current checks and viewed layers are recorded in cloud/canonical/CHECKS.json.
Crowded silkscreen, 17 incomplete nets and final mechanical/thermal/visual/CAM
qualification remain pending. Firmware and hardware testing remain unperformed.

CC2 trials 001/002 and the original native output are retained with their actual
RTN, VM, USB-reference and clearance failures; none was adopted wholesale.
The four-endpoint VBUS ADC native job exhausted its iteration limit in 55.04 s
and was rejected. See CC2-ADOPTION.json. The latest full build does not check
live supplier availability; the earlier EasyEDA CONNECT denial still requires
runtime activation of the additive host draft and a successful official request.
Matching public 0.0.23 source/artifacts are verified at GitHub commit
`f0e07b440d7ef5c552ce2fd5da9159f1735f03e3` and public tscircuit release
`7f0dc003-4806-42c6-9c2a-0ef83094b939`: all 304 package files and eight
GitHub files passed anonymous exact SHA-256 readback. Hosted build success is
not claimed. See PUBLICATION.json.
**PROTOTYPE FABRICATION READY: NO.** Continue TASK.md; this is a routing checkpoint.

# Historical Linux continuation — 0.0.22-alpha.0, 2026-10-05

PD_CC1_CONN is physically complete through the existing USB/capacitor group and
TCPP pin 7. The source adopts the released native Pipeline4 trunk with explicit
escape/clearance corrections. All 129 earlier saved paths remain identical.
A specifically declared 0.20/0.38 mm filled/capped ground stitch at (-5.55,1.8)
joins the C34 return island; a native 0.15 mm bottom trace joins R44 pin 2 to R39
pin 2 via y=-16.675 mm, retaining isolated EFUSE_RTN connectivity. The CC1
ordinary via is 0.30/0.60 mm at (-4.8,-4.45). Component imports, placement,
outline, mechanics, dependencies and all earlier saved paths are retained.

Fresh canonical official CLI build: **226 traces / 183 vias / 69 pours**;
**18 native unconnected-port errors + 11 dangling-trace errors** remain.
Independent filled-copper review finds **64/82 physically complete nets**,
zero foreign clearance violations, and each of GND, EFUSE_RTN, VBUS_CONN,
VBUS_PROTECTED, VM and V3V3 physically joined. Strict geometry passes with zero
violations and exactly 45 named filled/capped features matched. Canonical SHA-256:
`ad1089660085c886286b7cb4b47072aabdebe0f20ddcbba6a9635f2d3c1e9fe3`.

RAW VBUS neck remains 1.455 mm; its limited IPC-2221 screen is 1.390106 A at an
assumed 30 C rise, versus the 1.0714 A worst-case eFuse limit. USB skew remains
0.381441 mm, adjacent ground covers the signal core, and approximate main-pair
impedance remains 91.812378 ohm. These pass their defined analytical screens;
complete power-path/via/transient/thermal and USB qualification remain pending.
TypeScript, formatting, critical imports, native source netlist and copper-short
checks pass. Native schematic placement retains the disclosed D_VBUS cosmetic
orientation recommendation. A fresh schematic-only build and the unmodified
manufacturer-pin draft test pass for 111 supplier parts and nine A4 sheets.
The full PCB JSON was restored exactly afterward.

All four current official-renderer layer images were actually viewed. Crowded
silkscreen, 18 incomplete physical nets and unfinished escapes remain. The full
CLI build exits 1 for the retained errors. Current JSON retains 29 trace, 14
power-pin, 7 ground-pin, 6 underspecified-pin, 5 refdes and 5 schematic-style
warnings. The current full build does not verify live supplier availability;
the earlier EasyEDA CONNECT denial still requires runtime activation of the
saved additive easyeda.com host and an actual successful official request.

Rejected CC1 trials remain in `evidence/rev-0.0.22-alpha.0/cloud/cc1-saved-001`
through `007`; they are not fabrication candidates. `CC1-ADOPTION.json` records
the actual failure/acceptance decisions. Current qualification is in
`evidence/rev-0.0.22-alpha.0/cloud/canonical/CHECKS.json`.
Matching public 0.0.22 source/artifacts are verified at GitHub commit
`e5da51db64da0743280c1d281e0a5fa6197a2cff` and public tscircuit release
`bb3f8367-b2e6-43da-853a-83499b0d5c83`. All 302 package files and eight
GitHub source/artifact files passed anonymous SHA-256 readback. The release is
ready to build; hosted build success is not claimed. See PUBLICATION.json.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining TASK.md nets and gates.

# Historical Linux step — 0.0.21-alpha.0, 2026-10-05

The user authorized the board continuation after successful Cloud installation
and startup checks. This source revision retains the exact imported electronics,
board outline, placement and motor/carrier design. The ILIM divider escape moved
from y=-15.8 to -15.4 mm and became the exact named filled/capped
ILIM_DIVIDER_FILLED feature (0.20/0.38 mm). This addresses the measured RAW VBUS
neck defect while retaining every other saved path. TMC_UART_TX is complete
through native Pipeline4-derived geometry with supported manual source changes:
the first ordinary via moved away from the resistor pad, and the top route
clears the CAN via and PD_FLT trace. No generated JSON or dependency was patched.

Fresh full CLI build exited 1 with **18 unconnected-port + 11 dangling-trace
errors**, preserving the incomplete design. Canonical JSON SHA-256:
`b34e0750a4ae9700afa078058bd48f4fc32d4d448cbe4c961d4da169752a53c7`.
Copper counts: **226 traces / 181 vias / 64 pours**. Strict geometry passes
with zero violations; all-82-net filled-copper review passes foreign clearance
and correctly fails incomplete connectivity (**63/82 complete**). Native
netlist, copper-short and schematic-placement checks each report zero errors.

RAW VBUS lower-neck measurement: **1.455 mm**, IPC-2221 inner-layer screening
estimate **1.390106 A** (0.0152 mm copper, assumed 30 C rise), versus 1.0714 A
worst-case eFuse limit. This is a local analytical screen, not complete current,
via, transient, thermal or hardware qualification. USB emitted-path lengths are
25.135517/24.754076 mm, skew **0.381441 mm** (0.5 mm screen); the adjacent
ground covers the signal core and the main-pair estimate is **91.812378 ohm**.
These current checks do not complete final USB qualification.

All four current copper layers were rendered with the official renderer and
actually viewed. No apparent missing saved copper was observed; unfinished
escapes and crowded/overlapping silkscreen remain explicit blockers. Final
mechanical/thermal/visual and fabrication export/CAM qualification is pending.
The CLI retains 111 EasyEDA HTTP 403 supplier-footprint lookup warnings, plus
The exact EasyEDA CONNECT request is denied by the Cloud Envoy proxy before
supplier API access; this is not an established supplier rate limit. A draft
adds only easyeda.com to the existing 11 custom hosts; runtime activation is
pending user-facing save/publication and an actual successful retry.
29 trace, 14 power-pin, 7 ground-pin, 6 underspecified-pin, 5 refdes and
5 schematic-style warnings. Critical official import labels and TypeScript/
formatting pass. The historical `test:draft` expects a schematic-only build;
applying it to the full PCB correctly rejects the PCB records. A separate fresh schematic-only build and the unmodified draft test pass; the
full canonical PCB JSON was restored exactly afterward.

Bounded Pipeline9/Pipeline7 CC1 and Pipeline9 UART attempts timed out;
Pipeline4 produced geometry requiring manual correction. Gate branch attempts
were rejected: invalid local trace coordinates/partial via spans, saved-phase
coverage changes, and a 180-second remaining-branch timeout. None of these
outputs was adopted. Public phase props enforce ordinary via minimums for
new routing; individually named filled features retain exact ownership review.

Cloud tscircuit authentication was confirmed as AnasSarkiz. Revision 0.0.21
is public in GitHub source/artifact commit `9f2d6a33c195e13fc1df4e8a9529f9789c7c2610`
and tscircuit release `500e4d7d-eb50-490e-96d8-7b8afd71c3c0` (is_private=false).
All 290 package files were anonymously downloaded and checksum-verified; five
GitHub source/artifact downloads also match. All canonical/preview JSON mirrors
have SHA-256 b34e0750…a53c7. The official compressed archive API repaired the
CLI HTTP 413 failures in bounded batches; full historical archive parts remain
in GitHub. The hosted build was queued; its success is unverified. Exact receipt:
`evidence/rev-0.0.21-alpha.0/PUBLICATION.json`. Full remaining-net completion is still
active; this is not the requested final fabrication candidate.

**PROTOTYPE FABRICATION READY: NO.**

---

# Current Cloud handoff — 0.0.20-alpha.0, 2026-10-05

## Verified Cloud activation and routing-task start

After the user signed in, the browser confirmed GitHub account AnasSarkiz.
Only AnasSarkiz/smart-nema14-motor-controller was selected. The dedicated
[Cloud setup task](https://chatgpt.com/local/01a10b97-5af1-74dc-a50a-05ae18efe070)
verified checkout 43064cc. The actual non-root image has no sudo, so the initial
apt-only install stopped before routing. The install script now uses apt when
authorized administrator access exists and otherwise verifies every required
preinstalled native library/tool, TLS trust and fonts. It retains the complete
venv/dependency/smoke checks. The official Bun tagged GitHub installer provides
a fallback when bun.com is unavailable through the Cloud proxy. Required
package host allowlisting is documented. The corrected exact setup and a
separate smoke run passed in the actual Cloud image at commit
`2bdc0064266d88a65e8cc05668bd2cdfbe65ea6e`: TypeScript, CLI, imports,
Shapely/CadQuery, supervisor syntax, 2,804 context files and all four archive
parts. Both formerly denied package requests returned HTTP 200 after the
reviewed 11-host allowlist was saved. Sharp's interrupted installation was
repaired and PNG rendering verified; repository files remained clean.

The browser explicitly confirmed **Environment published** for the dedicated
`smart-nema14-motor-controller` environment (only this board repository;
environment sharing remains Only me). Actual setup resources were 32 GiB
container memory limit, no swap, approximately 27 GiB free disk. This is not
unlimited RAM; new jobs retain the bounded supervisor.

The [Cloud routing continuation](https://chatgpt.com/local/01a10ba0-5ae2-7690-934b-73780c7ed077)
was started in that exact published environment and visibly reported Working,
with its first response reviewing handoff/evidence and the RAW VBUS bottleneck.
The full docs/cloud/TASK.md plus actual environment details were submitted.
No local routing was started. This verifies task dispatch and initial work,
not completed routing or fabricated output. Cloud task links require the
owner's account; the GitHub and tscircuit board destinations remain public.
The corrected Linux CI [37296728759](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37296728759)
also passed. Electronic sources and checked circuit JSON are unchanged;
fabrication status remains NO with the 20+11 baseline routing errors.


The latest user request moves remaining routing to Codex Cloud because local Mac jobs exhaust memory. No further local remaining-net job was started after that request. This revision promotes the checked trial226 copper to the canonical declarative index, preserves all native errors, pins upgraded released dependencies, and includes portable Cloud setup, complete task/context instructions, and archived experimental evidence. It is a work-in-progress prototype, not fabrication approval.

Current gate status: Stage 1/2/3 prior prototype reviews remain historical evidence, with routing-driven placement changes requiring final regression. Stage 4 in progress; Stage 5 in progress; Stage 6 not started for the completed current design; Stage 7 not started (no physical prototype); Stage 8 in progress as an explicitly untested prototype. Earlier finished checks do not qualify the changed copper.

Fresh `tsci build index.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs` used the pinned updated local CLI and exited **1**, retaining **20 pcb_port_not_connected_error + 11 pcb_trace_error**. The native saved-copper replay contains 225 traces / 179 vias / 65 pours. Required canonical circuit JSON is tracked at dist/index/circuit.json and mirrored in build/routing-review/circuit.json. SHA-256: `d833ec12e4eabb3bcda22e727a8eb6ed111ee19001d09b89321d7c685cae1521`.

Fresh strict actual geometry check passes with zero violations. Native shorts check reports no shorts. Fresh filled-copper review finds zero foreign-clearance violations but **62/82 physically complete nets**, and correctly exits **1** for unfinished connectivity. Six power/reference networks each form one physical component, but actual widths/via-current/thermal qualification remains pending. RAW VBUS neck width and emitted narrow fanouts are documented in CLOUD_HANDOFF.md. USB historical skew and impedance estimates need current/final regression; no complete latest four-layer visual or final fabrication-file review is claimed.

Current canonical output retains 111 supplier-footprint lookup failure warnings, 29 trace warnings, 14 no-power-pin, 7 no-ground-pin, 6 underspecified-pin, 5 refdes and 5 schematic-styling warnings. These are explicit unresolved review items; the live supplier lookups need investigation with working Cloud network access. No warnings are suppressed or automatically accepted.

TypeScript and configured formatting checks pass. Critical official import-label audit passes. The all-import audit was rerun from a fresh isolated build using the valid rev13 supplier fixture: **44 official imports, 261 pin-to-pad mappings, zero geometry discrepancies**. The earlier missing-rev19-manifest failure was an audit invocation problem, not a component blocker. Purchased definitions remain unpatched. Ordinary selected-phase via minimums are explicitly 0.30/0.60 mm; named filled/capped features retain separate strict manifest review.

Cloud setup shell syntax, Python syntax, archive-part checksums and the Mac routing refusal were checked locally. Linux dependency installation/readiness is not inferred from a Mac check; the dedicated GitHub workflow will test it on Ubuntu 24.04. Codex Cloud browser asked for sign-in, so environment publication/task start remains unverified pending account access. Automatic approval review rejected the CLI Set Env selector because no specific environment was confirmed; no alternate action was used to bypass that rejection.

Toolchain: Bun 1.3.9; tscircuit 0.0.2744; CLI 0.1.2237; core 0.0.2090; props 0.0.688; capacity-autorouter 0.0.958; checks 0.0.239; circuit-json 0.0.517; easyeda 0.0.371; runframe 0.0.2908; modelprinter 0.0.8; TypeScript 5.9.3; Biome 2.5.15. Shapely 2.1.2 / CadQuery 2.8.0 are pinned for the fresh Linux analysis venv.

The current handoff preserves all subsequent sources, checked JSON, motor/carrier/model references, 1,627 rev20 evidence files in four compressed parts, and checksummed context manifests. See CLOUD_HANDOFF.md and docs/cloud/TASK.md. Public destination visibility and remote readback for this new revision must be recorded after upload; no local commit alone establishes publication.

**PROTOTYPE FABRICATION READY: NO.** Remaining blockers are incomplete routing/trace endpoints, final power/thermal/USB/manufacturing/visual/export qualification, and Cloud account/environment activation. Future physical testing remains pending and does not by itself excuse incomplete routing.

## Verified remote handoff publication and Linux setup

The code/artifact handoff is public in GitHub commit `e8ac86a139e5d9abbba239be893fa47983f3032a`. Anonymous GitHub downloads returned HTTP 200 and the checked canonical JSON digest `d833ec12e4eabb3bcda22e727a8eb6ed111ee19001d09b89321d7c685cae1521`. The Linux setup workflow [37292488424](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37292488424) passed on a fresh Ubuntu 24.04 checkout: dependency installation, TypeScript, critical imports, analysis-library imports and checksums for 2,799 context files plus the full four-part evidence archive. This confirms Linux repository setup, not Codex Cloud environment publication or a routing run.

The existing tscircuit package was verified public (`is_private: false`). Revision **0.0.20-alpha.0**, release `b33a6427-8b92-4c9c-b3bb-2b1a33d75550`, was published through the same official registry archive API used by CLI compressed publishing, in bounded batches. **500 uploaded files were downloaded and checksum-verified**; canonical and preview circuit JSON and both entry/source files also matched anonymous readback. The canonical build remains d833ec12… and the separately generated preview is `16860a4847e88fa456877a81a62c65a6b12d6511774d38951cc31fca4cb35470`; their copper matches, while generated warning IDs/project metadata differ. Full historical evidence, skills and manufacturer references remain in public GitHub; the registry upload includes the exact board sources, current records and build JSON. See CLOUD-CHECKPOINT-PUBLICATION.json, CLOUD-PUBLIC-ACCESS.json and CLOUD-LINUX-READINESS.json in this revision's evidence.

The hosted tscircuit build was queued; its success is not claimed. The local native build intentionally fails with the retained 20+11 unfinished-routing errors. Cloud environment/task activation still awaits sign-in and a confirmed environment. **PROTOTYPE FABRICATION READY: NO.**

---

## Historical validation record (superseded where the current handoff differs)

# Public visibility and checked build artifact — 0.0.19-alpha.0

2026-10-04 Europe/Tirane. The user explicitly requested public GitHub and tscircuit visibility and the circuit JSON in the build. GitHub AnasSarkiz/smart-nema14-motor-controller is PUBLIC. The package is public and listed with public distribution enabled; anonymous package metadata was verified. Historical private receipts remain historical evidence.

The exact checked partial output is committed under `build/routing-review/circuit.json`, with `BUILD-STATUS.json` provenance. SHA256 is 38bd6ae875aa963ffed135e8cb85d749997855ab7ec81f8771d4236edfdb4b17: 139 traces, 107 through vias, 24 pours, 111 CAD entries and all 88 missing-port errors preserved. Its original native build exits one; this is an incomplete diagnostic preview, not a successful main build or fabrication file. The supported registry output path is `dist/routing-review/circuit.json`; the official `get_preview_circuit_json` route resolves it via `previewComponentPath: routing-review.circuit.tsx`. `mainEntrypoint: index.circuit.tsx` and full-board native completion remain enabled. No electronic source, import, geometry or routing changed; earlier physical and native checks remain applicable.

Artifact digest/error inventory, native shorts, formatting and TypeScript are checked for this publication step. Exact Git and all 14 anonymous registry downloads are checksum verified. The preview API returns the identical diagnostic circuit and retains all 88 missing connections. Source commit 45ef75776d472373224b4cb9902775e099f7e107. The upload response timed out; direct readback proved completion without another upload. Results are recorded in PUBLIC-BUILD-PUBLICATION.json. Stage 4 remains in progress, stages 5/6 unapproved, stage 7 physical tests pending. Previous hosted builds failed after a 30-minute timeout. The upload started new build 35ace8c5-eaff-4a48-ba61-53bfecc99ce1, currently in progress; success remains unverified. Official public build-list evidence is in public-build/HOSTED-BUILDS.json. Neither public visibility nor uploaded build artifacts approves fabrication.

# Current revision 0.0.19-alpha.0 — checked manual eFuse-enable copper

## Connector orientation follow-up — current 0.0.19-alpha.0

Source basis: 5e3aeabc1c5983f36909f7c71e2d3d3c0af8837a. All four actual exported mouths were visually inspected from opposite directions against the manufacturer side-entry drawings. USB faces −Y, motor +Y, bottom I/O and top SWD face +X. The corresponding outer bounds are −0.090, 3.2670, 0.8620 and 0.4625 mm from their exit edges. Bodies need not be flush if their mating corridor is clear. No placement, imported definition or saved route changed.

The renderer independently confirms all 111 current/native mounted component placements and CAD registrations match, plus every connector land. Fresh carrier/fastener envelope and analytical tolerance checks pass. Specified mating envelopes retain 2.2331 /2.0643 /0.1643 /1.0385 mm clearance for USB/motor/I/O/SWD. The exact JST plug CAD is unavailable, so these are explicitly bounded drawing-based envelopes; physical mating remains pending. The I/O margin is tight and needs exact harness fit testing. Native placement reports zero errors/warnings; formatting and TypeScript pass. Evidence and repeatable command: mechanical/CONNECTOR-ORIENTATION-REVIEW.md and evidence/rev-0.0.19-alpha.0/connector-orientation/.

This is an audit checkpoint on the same electronic revision, with unchanged stage statuses and 88 unfinished connections. The exact 19 committed audit files are published to the same private package release and every official download checksum is verified. Source audit commit: 1e3ca249d21ef23634e96e3c87acc8958aa5ddaf. Verification receipt: CONNECTOR-AUDIT-PUBLICATION.json. It is not a completed full-board build or fabrication approval.


**Work in progress; NOT fabrication ready; NOT hardware tested.** 2026-10-04 Europe/Tirane. Source basis: published private Git/main 240c7325ab0161e7de132c54259ecce02cf104e0. Source da326ab9adcdbd3c623e665cc7e01b6d9529c7fc is pushed to private GitHub/main with remote SHA verified. Private tscircuit 0.0.19-alpha.0, release 8aae13ac-f696-41ef-af35-75d8e16237da, contains 1,141 exact files /136,360,522 raw bytes; every file matches official download SHA256. PUBLICATION-RECEIPT.json records the complete readback. Hosted build success remains separately unverified.

The retained source adds two native saved real-port paths joining U10 UVLO pin 10, R38 pin 2 and R39 pin 1. Two physical 0.60/0.30 mm through vias span all four layers. Guarded bends in existing PD_DB and V3V3 copper clear the new vias. No imported definitions, footprints, pin mappings, purchased placements, electronic wiring, BOM or mechanical dimensions changed. The TVS symbol rotation remains user accepted cosmetic feedback.

The fresh current-source partial output SHA256 is **38bd6ae875aa963ffed135e8cb85d749997855ab7ec81f8771d4236edfdb4b17**. It contains **139 traces /107 physical through vias /24 filled pours**, with **88 missing-port errors and no other native errors**. The build exits one because those connections remain unfinished. It is diagnostic output, not manufacturing approval. Saved copper covers 57 complete nets with 135 real-port paths. Main automatic completion remains enabled and unchanged.

Native shorts pass. Independent generated-track/drill geometry has zero violations; filled-copper checks retain zero violations and one physical GND network containing all 90 pads, plus one separate RTN network containing all eight pads. The physical connectivity checker now subtracts actual manufacturing drill voids from every conductor before joining metal; this strengthens the earlier audit. USB primary path lengths and 0.381441 mm skew remain unchanged. Four generated copper layers were inspected for the checked route; crowded reference silkscreen remains unapproved. Current pin/placement checks, formatting and TypeScript pass. The 27 pin metadata warnings are identical to revision 18 and retained; independent physical mapping checks remain applicable. Native schematic-placement advisory for D_VBUS remains visible.

| Stage | Status | Evidence and remaining work |
| --- | --- | --- |
| 1. Requirements | passed | Existing bounded motor, PD/load, stackup and manufacturing requirements unchanged. |
| 2. Schematic/BOM | passed | All 191 imported source/CAD files byte-identical; exact pin/pad and manufacturer audits remain applicable. |
| 3. Placement | passed | Required five checks rerun. No physical placement, holes or mechanical geometry changed. |
| 4. Routing | in progress | 88 missing connections; checked eFuse route retained. Failed I/O copper was rejected, including 51 geometry violations and three GND islands. |
| 5. Full checks/visual approval | not started | Partial checks pass; full current/thermal/USB/silkscreen qualification and accepted snapshots remain pending. |
| 6. Prototype fabrication | not started | Same-source CAM/BOM/CPL/assembler review pending; no order placed. |
| 7. Hardware tests | not started | No physical prototype or delivered/tested firmware. |
| 8. Store release | in progress | Private prototype 0.0.19-alpha.0 is fully upload/readback verified; hosted build and fabrication approval remain unverified. |

Native pipeline 9 full diagnostic finishes with a static reachability error on five GND/RTN paths; its failed output drops the saved traces and is never adopted. Single-net I2C diagnostic timed out. A diagnostic of 23 unfinished non-ground nets, including power nets, was stopped below 2 GiB available disk, with no fresh output. The latest free space fell to about 1.1 GiB; no task-owned routing process remains. Only this task's redundant published cache was removed after complete readback verification. The user has been asked to free 8–10 GB; unrelated applications and files are untouched. The lightweight OVP bus-lane trial fails with no collision-free dogbone assignment and is rejected.

Automatic approval review rejected assigning GND/RTN to phase zero to exclude them from native completion because it could hide unresolved connectivity. The action was not applied or bypassed. Native main and ground/RTN gates remain unchanged. Actual physical copper, not assigned net names, remains the basis for continuity checks.

Evidence: `evidence/rev-0.0.19-alpha.0/`. Rejected routes, logs, native errors and resource stops remain preserved. Full signal/power routing, thermal spreading, USB impedance/return quality, readable silkscreen, same-source native checks/snapshots and final fabrication exports must pass before prototype fabrication approval. Earlier source publication receipts remain historical evidence below.

# Current revision 0.0.18-alpha.0 — connected ground and isolated eFuse return

**Work-in-progress routing prototype; NOT fabrication ready; NOT hardware tested.** 2026-10-04 Europe/Tirane. Published circuit source: private Git/main ace862f130c25a5aa3e33bdd00d59e6c790d317a. Private release c2c21533-6762-49ba-8bc5-57f77a5ffbff contains 1,073 exact files (129,019,703 raw bytes), all SHA256 verified through official downloads on 2026-10-04T01:52:28Z. PUBLICATION-RECEIPT.json records the source/upload result; hosted build success remains separately unverified.

| Stage | Status | Current evidence and remaining work |
| --- | --- | --- |
| 1. Requirements | passed | Bounded 14HM11-0404S/PD/load/stackup requirements retained. Physical mounting-circle exclusion remains 2.50 mm; conservative native planning radius is 2.52 mm. Pour-to-NPTH requirement remains 0.30 mm; 0.31 mm configured margin preserves it after native polygon approximation. |
| 2. Schematic/BOM | passed | Latest released runtime fixture: 44 official identities /261 pin-pad mappings, zero discrepancies. All 191 imported source/model files remain byte-identical to their earlier verified imports. Electronic wiring/BOM unchanged, 111 references /108 fitted /43 selected identities. Cosmetic C1974707 rotation remains explicitly user accepted. |
| 3. Placement | passed | All five required checks passed under released tools; native placement rerun after conservative boundary correction reports zero errors/warnings. Purchased bodies, connectors, holes and exact motor/carrier geometry are unchanged. Nine current native A4 schematic renders inspected. |
| 4. Routing | in progress | Checked partial: 137 traces /105 actual through vias /24 filled pours. All 90 GND pads form one physical network; all eight eFuse RTN pads form a separate physical network. Native errors dropped from 187 to 91, all missing connections. Full and incremental native routing time out; no fresh completed main output exists. |
| 5. Full automated/visual approval | not started | Partial native shorts and independent actual tracks/drills/fills pass; four current layers reviewed. Full-board connectivity, power/thermal/USB qualification, silkscreen correction and accepted snapshots remain required. |
| 6. Prototype fabrication | not started | Same-source approved Gerbers/drills/108-fitted BOM/CPL, CAM and assembler review remain pending. No order placed. |
| 7. Physical prototype | not started | No hardware measurements or delivered/tested firmware. |
| 8. Store release | in progress | Private prototype 0.0.18-alpha.0 is fully source-upload/readback verified; hosted build success is unverified. |

Pinned released dependencies: CLI 0.1.2237, tscircuit 0.0.2743, core 0.0.2074, props 0.0.684, checks 0.0.238, capacity-autorouter 0.0.956, circuit-json 0.0.514, EasyEDA 0.0.370 and runframe 0.0.2897. Official upgrade and registry version evidence are retained. No dependency patch, custom router, manufactured net port or imported definition edit is used.

## Reviewed current copper

`boundary-corrected-partial/circuit.json` SHA256 **754ddc1c4ced5e582749e9133decd4c63bb7d05635aedf160a12a4d12ed044b4** is the checked diagnostic output, not completed manufacturing output. Its build exits 1 and retains exactly 91 `pcb_port_not_connected_error` records. `CURRENT-ROUTING-STATUS.json` lists every missing port. Main completion remains enabled. `SavedRoutes` now uses 133 real-port paths on 56 complete saved nets; shorter trees follow only existing copper. Two guarded manual bends in `ground-stitch-paths.json` clear an ordinary eFuse GND stitch, retaining original widths and layer spans. USB data copper is preserved; native ESD ground escape remains present.

`check-filled-copper.py` measures actual native BRep polygons, pads, tracks and true through-via annuli, then joins only physically touching metal. GND and isolated RTN each have one network. Actual minimum fill spacing is 0.152838 mm to other-net pads, 0.153883 mm to tracks, 0.152808 mm to via annuli and 0.155 mm between separate pours. All exceed the original 0.15 mm requirement. Expanded boundary checks measure 0.306942 mm minimum to NPTH edges and 2.507865 mm minimum radius around the exact required 2.50 mm mounting circles. Earlier 0.012038 mm mounting-circle intrusion and deficient locating-hole clearances were detected and corrected; original copper and sources remain in `before-boundary-correction/`.

`check-copper-geometry.py` checks actual wires, ordinary via drills against every component/test pad including own-net pads, board edges, NPTH and mounting keepouts. It passes with no exceptions and no violations. The USB graph reader walks only emitted copper between actual USB4110 DP2 pin 13 /DN1 pin 12 and STM32 PA12 pin 34 /PA11 pin 33. Primary planar lengths are **25.135517 /24.754076 mm**, skew **0.381441 mm** against the retained 0.50 mm screen. This does not prove differential impedance, return-path quality or full fabrication compliance.

The corrected partial build uses the CLI's supported `--disable-parts-engine` option to avoid redundant supplier metadata lookups, retaining all official electronic definitions and 111 actual CAD entries. It is a diagnostic, not a replacement for the mandatory native checks, availability or assembly audits. An earlier normal partial build was stopped after repeated supplier model-metadata ECONNRESET failures; its log remains. All five mandatory native pre-routing checks passed without disabling them. Only routing strategy and conservative fill margins changed afterward; placement was rerun and TypeScript/format checks pass.

## Routing failures and remaining gates

The main official native pipeline-7 /1x completion timed out after 302.3 seconds in phase 2/2; exit 1, no fresh main output. Its bounded result/log are retained. Incremental I2C SDA attempts also time out (pipeline 7 at 110.1 s; pipeline 3 at 214.8 s). A timeout is not successful routing. Retained partial copper never substitutes for a fresh full output. The official KiCad routing interchange diagnostic preserves pad geometry/net partitions; exporter shared-via duplicates and zero-length saved-path contact markers are recorded explicitly. This is not final CAM or an approved fabrication export.

Remaining blockers before ordering a prototype: complete 91 missing port connections; qualify actual power-path neck widths and thermal spreading (including driver/eFuse thermal vias or equivalent reviewed heat paths); verify USB return/impedance and motor-current layout; correct crowded reference silkscreen; run full native checks/snapshots and inspect every finished layer; generate and review same-source CAM/BOM/CPL and assembler feedback. Nominal width settings and connected ground pours alone do not establish these results. Physical testing remains stage 7 pending.

Evidence folder: `evidence/rev-0.0.18-alpha.0/`. `PRE-ROUTING-CHECKS.json`, `UNCHANGED-IMPORTS.json`, `ALL-IMPORTS-AUDIT.json`, corrected partial geometry/fill/USB reports, native shorts log and `VISUAL-REVIEW.json` identify their scopes. Historical failed trials remain preserved; publication does not waive any failed gate.

# Earlier revision records — historical evidence

# Current publication patch 0.0.17-alpha.1 — same checked partial copper

**Work in progress; NOT fabrication ready; NOT hardware tested.** 2026-10-04 Europe/Tirane. The circuit, placement, imported definitions, routing controls and saved copper are unchanged from source commit 062585ebee9135a57c5ee93879bf55cc45eaa4aa. Revision 17 pre-routing checks and bounded partial-copper reviews remain applicable. This patch only changes package metadata and publication scope. Stage 4 remains in progress; stages 5/6 remain pending.

**Publication failure preserved:** GitHub revision 062585e was pushed and its remote SHA verified. Registry revision 0.0.17-alpha.0, release 2c69ebb2-d74b-423c-a089-562042c7b72f, failed during upload with `total size of jsonb object elements exceeds the maximum of 268435455 bytes`. It was never fully read back or approved. A slow partial-draft cleanup was stopped; no older release was deleted. Patch 0.0.17-alpha.1 uses a smaller distribution. Required sources, all imported definitions and their CAD, selected motor models, current checked partial copper and validation summaries remain included. Large historical trial outputs and duplicate supplier-download caches remain in the private Git source, with exact hashes recorded in PACKAGE-SCOPE.json. Exclusion changes distribution size only; every failing validation result remains explicit and accessible. Patch source commit 26597ae742ab919c11443e782675031ee19f65dd was pushed to private GitHub/main and its remote SHA verified. Private release fedae4ce-0dd1-4745-a6a7-c51384917457 contains 851 exact source/model/evidence files; all match SHA256 via official direct-download readback, and ready_to_build was set after readback. PUBLICATION-PATCH-RECEIPT.json records the result. No circuit or validation gate changed. Hosted build success is separately required.

# Historical circuit revision 0.0.17-alpha.0 — routing development prototype

**Work in progress; NOT fabrication ready; NOT hardware tested.** 2026-10-03 Europe/Tirane. Source basis: e4c6c61fd0c8d31fb06813afca02547697d4ffd3. This revision is local and unpublished until its publication receipt is recorded. Routing is enabled. The main design now retains the 54 checked complete saved nets by default and keeps native automatic completion enabled. `routing-review.circuit.tsx` explicitly stops after this partial copper for inspection; it retains the 187 native missing-port errors and is not the manufacturing entry.

| Stage | Status | Current evidence and limits |
| --- | --- | --- |
| 1. Requirements | passed | Existing bounded motor/PD/load/stackup requirements retained. Physical through vias changed to 0.60/0.30 mm, nominal radial annulus 0.15 mm. Manufacturer capability review below; all drill-to-pad and copper-spacing requirements retained. |
| 2. Schematic/BOM | passed | Revision 16 electrical review remains applicable to unchanged wiring and imported definitions; all 191 imported source/model files were compared byte-for-byte against e4c6c61 and match (`UNCHANGED-IMPORTS.json`). Current source/netlist/pin checks passed. User-accepted cosmetic C1974707 symbol finding is retained. No component definition is patched. |
| 3. Placement | passed | All five mandatory checks pass on the current source; FINAL-PRE-ROUTING-CHECKS.json records exact exit codes and log hashes. D_USB/R42/R43 consumer placements and actual mounted envelopes were rechecked in this revision. Copper changes do not alter bodies, holes or carrier geometry. |
| 4. Routing | in progress | Seven manually specified USB/native paths pass their limited native shorts and independent geometry checks. Full native routing has unresolved errors. Local alternate routing sessions and the optional native saved-path phase are under review. |
| 5. Routed automated/visual checks | not started | Full-board zero-error copper, all-layer inspection and accepted snapshots remain required. A successful diagnostic or subset does not pass this gate. |
| 6. Prototype fabrication | not started | Validated same-source Gerbers, drills, 108-fitted BOM/CPL, CAM and assembler review remain pending. No fabrication order. |
| 7. Physical prototype | not started | No physical tests or firmware delivery. |
| 8. Store release | in progress | Last verified remote revision remains 0.0.16-alpha.0. Revision 17 publication is pending and must retain this prototype label. |

Pinned released tools: tscircuit 0.0.2742, CLI 0.1.2237, EasyEDA 0.0.369, core 0.0.2071, props 0.0.682, circuit-json 0.0.513, checks 0.0.236 and capacity-autorouter 0.0.955. Official routing interchange diagnostics use KiCad 10.0.3, dsn-converter 0.0.92, dsnts 0.1.12 and local Freerouting 2.4.1. No custom routing solver, dependency patch, manually modified imported footprint or fabricated passing result is used.

## Actual reviewed copper and tooling evidence

`evidence/rev-0.0.17-alpha.0/manual-usb-060/circuit.json` SHA256 **9c8ae3eaf1f197d6bd745fe2980ce885d3ab429f158a4740ebf7138790214dff** contains seven native manual paths, 47 wire segments and five 0.60/0.30 mm through vias. Its native shorts check passes. Independent actual-pad/track/drill geometry passes; the smallest ordinary drill-to-pad clearance is 0.364789 mm against the retained 0.35 mm rule. USB primary path lengths are 25.135511 /24.754075 mm, skew 0.381436 mm against the 0.50 mm screen. These measurements qualify only this subset, not all connections, ground-reference continuity, impedance, power widths or fabrication output.

The official KiCad export preserves all **423 SMT pads**, their position, size, shape, orientation, layer and net partitions, plus all **52 existing manual copper objects**. The KiCad DSN component audit checks all 423 transformed pin positions/sides and requires unchanged placement/library/network/wiring sections. Export-only library identities avoid the verified Freerouting image-variant renumbering problem; purchased component geometry is unchanged. Keepouts are native board features. Via-only planning guards enforce ordinary drill-to-pad clearance even on the same net.

The completed first 0.60 mm local routing session is preserved as `manual-usb-060/local-routed.ses`, SHA256 **e58200df3c4880acc5b9fdc5dfe8a2342d57ec17d03c4e4511a34d3021cb2d30**. Its official KiCad session import preserves all **115 footprints** (111 electronic plus four native mounting holes), all pad/net information and all 52 fixed manual copper objects. It contains 1468 copper objects. Diagnostic KiCad DRC reports **36 disconnected items** and **zero shorting-item reports**. It also reports spacing, silkscreen and other findings. Default KiCad project constraints differ from native board constraints, and temporary planning zones are not final fill; this diagnostic is not a passing final DRC. Full native and independent final-copper checks remain mandatory. Do not infer readiness from the router's progress score.

`saved-route-api/complete-build.log`, `shorts.log` and `API-REVIEW.json` qualify the released native `autoroutingphase.pcbTracePaths` API on a complete two-net imported-component diagnostic: four paths, three unique physical vias and zero native errors/shorts. Repeated references to shared vias are consolidated by core; omitting via primitives at a layer change is invalid and the rejected test is preserved. This is a tooling test, not a controller validation result.

The controller topology reader traverses existing routed centerlines and contacts inside the actual convex SMT pads; it never searches for or creates routes through free space. The earlier partial candidate retains 254 paths on 69 nets with disconnected copper components explicit in `TOPOLOGY-REVIEW.json`. Its native fanout follow-up terminated with exit 137 at topology merging; `NATIVE-SAVED-BUILD-RESULT.json` and its log preserve the failure. A Node-runtime diagnostic cannot start because the released CLI imports `calculate-elbow/lib` as a directory (`ERR_UNSUPPORTED_DIR_IMPORT`); no dependency is patched. The current optional candidate instead retains **127 paths on 54 fully connected nets**, using ordinary `auto_local` saved paths. Unfinished nets remain in the implicit native phase. `complete-TOPOLOGY-REVIEW.json` preserves every unresolved component. Routing-phase assignment uses supported native net `routingPhaseIndex` and port selectors. All native DRC remains enabled, and the candidate defaults off until qualified. The automatic path-output helper also reports a nonunique `.D_CAN > port.pin1` selector; this tooling warning is retained without editing the supplier definition.

## Corrected saved-copper checkpoint — 2026-10-04 Europe/Tirane

The user-authorized manual route changes are reproducible from the immutable original complete-net routes, their checksum, `src/routing/manual-edits.json` and `scripts/apply-manual-route-edits.py`. No imported electronic definition or supplier footprint is modified. Original and rejected trials are retained. The first two corner trials caused real shorts/clearance failures and were rejected; the third left keepout/via-spacing failures. The fourth corrects both corner escapes, adds explicit wire contacts at the original five USB vias, and retains **127 saved paths /54 complete nets plus seven native manual USB paths**.

The current explicit `routing-review.circuit.tsx` produces **134 traces /97 physical through vias /2947 nonzero wire segments**. Its native error inventory contains exactly **187 pcb_port_not_connected_error records** and no other native error types. The build exits **1**, and this failure remains visible: the unfinished nets are deliberately not represented as completed copper. `routing-review/NATIVE-REVIEW.json` and `REMAINING-BLOCKERS.json` identify the exact JSON and missing ports. Native shorts reports **no shorts**. The independent actual-geometry check passes with **zero violations**, including same-net ordinary drill-to-pad checks; minimum drill-to-pad is **0.3539372 mm** against 0.35 mm. USB primary path skew remains **0.381436 mm**. These results qualify only the saved subset, not full connectivity, power ampacity, poured copper, thermal paths or fabrication.

Four layer PNGs were inspected and findings recorded in `routing-review/VISUAL-REVIEW.json`. Reference silkscreen is crowded. Measured saved power paths include 0.15 mm sections despite wider net targets; power/thermal qualification remains unfinished. Full ground connectivity, USB return continuity, switching loops, same-source manufacturing output and assembler review remain mandatory. No routed snapshot or fabrication package is accepted.

A manually added CAN_TX trial failed native copper and drill/pad checks; its source, JSON and log are preserved in `routing-review-can-tx/` and the addition was removed from the design. A one-net native routing probe stopped without a fresh result; its source and log are retained. Neither trial counts as completed routing. The main design keeps `routeRemaining` at its native default; the explicit review entry is diagnostic only, and does not weaken checks or mark any gate passed.

`FINAL-PRE-ROUTING-CHECKS.json` records zero exits for formatting, TypeScript, critical imported pins and all five required native netlist, pin-specification, source, schematic-placement and placement commands. Schematic-placement still displays the user-accepted D_VBUS/C1974707 symbol-orientation finding; its failing dedicated regression is retained. React's missing-key warning in the pour rendering is cosmetic and preserved in the logs. The 191 unmodified imported source/model files retain their earlier byte-for-byte provenance.

**Blocking issue — Stage 4:** full-board copper remains incomplete. The completed alternate session has 36 KiCad disconnected items. Native full routing has failed before fresh output, including a measured 13.5 GB peak. The longer local 30-pass run was interrupted after pass 6 (46 router-unrouted items /14 diagnostic violations) and produced no SES; its progress does not establish connectivity. Node CLI startup also failed with ERR_UNSUPPORTED_DIR_IMPORT in calculate-elbow; no dependency patch is used. Stages 5 and 6 cannot pass until complete copper, widths, thermal layout and final checks are resolved. No fabrication-ready claim or order is authorized by this checkpoint.

## Via manufacturing capability review

[JLCPCB published capabilities](https://jlcpcb.com/capabilities/pcb-capabilities/) were checked on 2026-10-03. Its preferred via drill is at least 0.20 mm and preferred pad diameter exceeds drill by at least 0.15 mm. Selected geometry is **0.30 mm drill /0.60 mm pad**, a 0.30 mm diameter difference and 0.15 mm nominal radial annulus. This is a physical change from 0.70/0.30 mm to make dense fanouts more practical, not acceptance of an existing collision. Actual generated geometry must still pass all recorded spacing checks. Hole/plating/registration manufacturing tolerances and final CAM remain required. Ordinary drill-to-component/test-pad clearance remains 0.35 mm including same-net pads. No ordinary via-in-pad exception is granted. Intentional filled/capped thermal vias, exposed-pad heat flow and assembler paste/fill review have not been implemented or approved.

Power paths in local diagnostic trials are not qualified by their routing success. Actual widths, necks, layer copper thickness, current/temperature basis, switching loops, RTN/GND isolation, ground return continuity and thermal coupling remain Stage 4 work. Supplier silkscreen and final functional markings, USB reference copper continuity, same-source output generation and 108-fitted assembly filtering also remain required.

## Historical revision 16 — retained pre-routing evidence

# Current revision 0.0.16-alpha.0 — complete pre-routing prototype review

**Untested prototype. Routing disabled; NOT fabrication ready.** Date: 2026-10-03 Europe/Tirane. Source basis: 43e98f50a0f3392ad9289d5b662d08a447b3022b. The implementation commit and publication receipt will identify the exact revision. Pinned tscircuit 0.0.2742 /CLI 0.1.2237 /EasyEDA 0.0.369 unchanged.

| Stage | Status | Evidence and scope |
| --- | --- | --- |
| 1. Requirements | passed | Bounded programmable prototype: exact 14HM11-0404S, selected four-layer JLC stackup/rules, constrained front carrier, PD/load/temperature and harness assumptions stated below. |
| 2. Schematic/BOM | passed | Manufacturer pin/value/pad reviews, correct decoupling, startup states, supply allocation, reverse-blocking and bounded regeneration screens; 43 exact catalogue identities/111 references/108 fitted. Accepted cosmetic TVS finding only. Physical performance and firmware remain Stage 7. |
| 3. Unrouted placement | passed | All five required native checks exit zero, placement has zero errors/warnings; all 111 actual model envelopes, four supports, mating envelopes and tolerance/load screens pass. Corrected eFuse schematic visually inspected; other eight sheets byte-identical to reviewed revision 15. |
| 4. Routing | not started | Native tolerances/width targets configured, routing still disabled. Actual copper is the next gate. |
| 5. Routed automated/visual checks | not started | Silkscreen, four copper layers, shorts and snapshots pending routed output. |
| 6. Prototype fabrication | not started | Same-revision Gerber/drill/BOM/CPL and CAM/assembly review pending. No fabrication approval/order. |
| 7. Physical prototype | not started | Firmware, fit, retention, cold-start, motion, transients, temperatures and protection tests unperformed. |
| 8. Store release | in progress | Private revision 16 pushed and 651 exact files uploaded/read back; hosted build pending verification. Prototype labeling retained. |

Requirements are design targets, not guaranteed measured operating ratings. PD source must advertise ≥1.5 A initially at 5 V; bootstrap logic ≤150 mA with ENN high/CAN RS high, encoder DNP and no connector supply export. Motion requires a qualified 9/12/15/20 V ≥1.5 A contract, maximum source 21 V, preferably 12/15 V. Legacy/default-current USB hosts are outside scope. Normal logic allocation ≤0.3 A. Sense resistors bound phase peak at 0.34245 A. Speed ≤300 RPM, external reflected inertia ≤0.25×10⁻⁶ kg·m², no continuous backdrive/overhauling. Scope remains an untested programmable hardware prototype; firmware is not delivered. Intended ambient 0–50 °C with actual device/junction temperatures to be measured, not certified thermal limits.

The current power screen gives bootstrap demand 0.24973 A against 0.41667 A low limit; 60% converter efficiency is an engineering allowance, not a guaranteed minimum. Regeneration screen returns 3.99424 mJ into 100.8 µF end-of-life bulk allowance, giving 22.809 V lossless /24.972 V with LF resistive screen versus driver 29 V. High-frequency parasitics and actual heat remain Stage 4 layout and Stage 7 measurement requirements. Typical MLCC curves are explicitly not guaranteed combined production limits. The independent TPS26600 OUT rating resolves USB removal rating concerns. RTN and GND must remain separate in copper. Input TVS is not an arbitrary surge/braking clamp; no USB/ESD certification is claimed.

The native carrier now has four direct 6×6 mm rails. Exact motor/USB STEP bytes and all imported definitions are unchanged. The JLC calculator shows 1.56 mm finished thickness for an ordered 1.6 mm board; mechanical calculations include 1.404–1.716 mm and the rendering nominal offset. A 20 N single-rail load screen gives 0.1357 mm combined deflection and stress factor 10.81; FR4 modulus is an engineering allowance. Conservative drawing-based plug checks pass, smallest remaining clearance 0.1643 mm. Exact mating CAD was unavailable; hardware and cables must stay within the documented envelopes. This passes the design-stage clearance screen, not physical assembly/strength qualification. See mechanical/FRONT-CARRIER-REVIEW.md and the three actual mechanical reports.

Current logs are evidence/rev-0.0.16-alpha.0/. All eleven aggregate commands exit zero. CHECK-RESULTS.json retains the semantic TVS finding and the aggregate exits one. GATE-REVIEW.json records the specific user-accepted cosmetic exception; it does not edit or override machine results. Native eFuse box padding and Q_ILIM text collision were corrected; the only remaining schematic finding is D_VBUS rotation. Original C1974707 definitions and its failing rotation regression are preserved. No electrical error or placement failure is accepted.

Fresh schematic-only and PCB builds, format, TypeScript, critical pins, draft connections, assembly inventory, actual USB model registration, native netlist/pin/source/schematic-placement/placement and live indexed catalogue checks were run. The nominal mounted model was rebuilt with supplier access and inspected. UNCHANGED-IMPORTS.json records every original definition hash against revision 15; prior raw-library/fixture audits remain applicable to identical definitions. Eight schematic PNGs match the previously visually reviewed images byte-for-byte; the corrected InputPower sheet was inspected. Actual routed widths, ordinary drill/pad clearances including same-net cases, intentional thermal-via geometry and assembler paste/fill review are still required. No normal drill exception is assumed.

Native manufacturer tolerances are applied directly as supported board props; power, phase and USB net widths are targets only. The live JLC 90 Ω top/L2 calculator result is 0.1537 mm width /0.1999 mm gap on JLC04161H-3313; actual pair coupling/skew and continuous ground reference must be checked after routing. Stackup is selected, not ordered/CAM-confirmed.

Both destinations remain private under standing publication authorization. Revision 16 source [533fbab](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/533fbab83d42f0477bec143738c837f658aaf984) is pushed to main with exact remote SHA verified. Private tscircuit **0.0.16-alpha.0**, release ID 5a50b240-c618-41c7-9c2a-026305bd8a59, contains **651** exact committed source/CAD/evidence files; every SHA256 matches official direct-download readback. ready_to_build was set only after complete verification. PUBLICATION-RECEIPT.json records the result. This documentation checkpoint changes no circuit, imported definition, placement, routing controls or CAD. Git whitespace checking reports exporter-generated STEP trailing whitespace; source formatting and TypeScript checks pass, and the STEP geometry remains valid. No automated copper approval is implied. Revision 15 hosted status checked 2026-10-03T14:30:34Z is still pending, with no reported code/build error and has_transpiled=false. This is separate from local board validation. Physical prototype tests remain unperformed.

## Historical revision 15 — superseded where current review resolves its gates

# Current revision 0.0.15-alpha.0 — reverse-blocking power replacement and placement

**Work-in-progress prototype: NOT routed, NOT fabrication ready, NOT hardware tested.**

2026-10-03 Europe/Tirane. Source basis: a39dccd. This implementation replaces the earlier eFuse and low-voltage current-limit switch using unmodified official JLCPCB imports. Pinned tools remain tscircuit 0.0.2742 / CLI 0.1.2237 / EasyEDA 0.0.369.

| Stage | Status | Current gate |
| --- | --- | --- |
| 1. Requirements | in progress | Exact single-shaft motor and JLCPCB stackup recorded; bounded PD/load envelope proposed in POWER-CORNER-SCREEN.json. |
| 2. Schematic/BOM | in progress | Selected power imports and analytical disconnect/regeneration screens pass their limited scopes. Startup budget, protection/layout and firmware interlock review remain. |
| 3. Placement/mechanics | in progress | Native placement rerun, genuine CAD contact registration and nominal carrier fit checked; mating harness/tolerance/critical power-loop review remains. |
| 4. Routing | not started | Disabled. |
| 5. Routed checks | not started | No routed copper approval. |
| 6. Prototype fabrication | not started | No validated Gerber/drill/assembly package. |
| 7. Physical prototype | not started | No physical tests. |
| 8. Store release | in progress | Private revision 15 uploaded and 584 exact files verified; hosted build tracked separately. Prototype label mandatory. |

TPS26600RHFR/C2155767 has 60 V operating OUT rating independently of VIN, closing the old TPS25947 disconnect rating concern. This is not a 60 V rating for the controller. MODE connects to isolated RTN for current-limit/autoretry operation. RTN and GND remain separate. The genuine manufacturer RHF0024A CAD has 25 matching contacts. C25769 gives native 24 kΩ current-limit resistors; C20512 DMG1012T-7 preserves G1/S2/D3 and is specified for 2.5 V gate drive. C33/C34 use C268016 2.2 µF/50 V; old R47 is removed. C852665 (lost native resistor value) and C181406 (exposed-pad mismatch) are rejected alternatives, not patched or selected. The selected fixture passes **3 parts / 30 physical pin-to-pad maps**, with no raw geometry discrepancies. Earlier fixture definitions remain unchanged.

The current review BOM is **111 references / 108 default fitted / 43 supplier identities**, each with a catalogue match and indexed stock on 2026-10-03. Stock is not reserved; TMC2209 displays only one unit and the motor connector six. This is not an approved assembler BOM.

The power calculation uses zero credit for internal driver sense resistance, peak 0.34245 A, rotor plus at most 0.25×10⁻⁶ kg·m² external reflected inertia at 300 RPM, and no overhauling/backdrive. Combined phase/kinetic screen is 3.994 mJ. Bulk minimum is 100.8 µF after tolerance, reflow and manufacturer endurance allowances. Calculated VM is 22.809 V lossless / 24.972 V with a conservative LF resistive screen, below 29 V; HF parasitic overshoot remains unqualified. MLCC effective values use typical manufacturer curves and explicit aging allowances, not guaranteed combined limits. Initial source scope is a PD charger/dock advertising at least 1.5 A at 5 V; legacy/default-current USB operation is not established or advertised. Firmware is not delivered or hardware tested. See mechanical/POWER-CORNER-REVIEW.md.

Native source, netlist, pin-specification, schematic-placement and PCB placement are rerun using the installed CLI. The unchanged TVS rotation defect remains visible in the schematic output and failing dedicated regression. The user accepted it as cosmetic after verified physical mappings; the aggregate retains the semantic failure. No electrical error is waived. Final logs and actual generated check records are under evidence/rev-0.0.15-alpha.0/. Exact source/CAD hashes and inspected image records identify this step. Routing remains disabled pending stages 1–3.

## Verified revision-15 publication

Source [252d18a](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/252d18a00f2d67b2b83b7c67b0a176d908c457ce) is pushed to main and the exact remote SHA verified. Private tscircuit **0.0.15-alpha.0**, release ID 5f610381-0e9e-4855-b307-6c82759ea5f5, received **584** exact committed source/CAD/evidence files. Every file passed SHA256 readback through the official direct-download API. ready_to_build was set after complete readback. See PUBLICATION-RECEIPT.json. This documentation checkpoint changes no circuit sources, geometry, imports, dependencies or CAD.

## Historical revision 14 — evidence remains scoped to that revision

# Current revision 0.0.14-alpha.0 — front-flange carrier and PCB support clearance

**Work-in-progress prototype: NOT routed, NOT fabrication ready, NOT hardware tested.**

2026-10-03 Europe/Tirane. Source basis: d01ca428602400d429e7cdb02ec5abece8d5cde3.
This step creates a concrete carrier study for the exact 14HM11-0404S and native PCB mounting features. Supplier definitions, electrical nets, dependencies, and manufacturer motor/USB CAD bytes are unchanged. Imported-symbol rotation remains a visible software failure; the user accepted continuing electrical/PCB work after cathode/anode and physical-pad mappings were verified. This is not a waiver of electrical protection or fabrication checks.

| Stage | Status | Current gate |
| --- | --- | --- |
| 1. Requirements | in progress | Exact motor and proposed carrier defined; bounded operating limits and manufacturing rules still need electrical qualification. |
| 2. Schematic/BOM | blocked | Native connectivity and unchanged imported pins pass; power/startup/regenerative/transient qualification remains unfinished. Cosmetic TVS finding is recorded separately. |
| 3. Placement/mechanics | in progress | Four controller mount holes and native keepouts implemented. Nominal carrier, motor and 111 component mesh envelopes pass. Mating cable/harness, tolerances, thermal loops and full placement review remain. |
| 4. Routing | not started | Disabled; zero copper traces/vias. |
| 5. Routed checks | not started | No routed DRC, layer or snapshot approval. |
| 6. Prototype fabrication | not started | No validated fabrication package or assembler feedback. |
| 7. Physical prototype | not started | No hardware tests. |
| 8. Store release | in progress | Private source and 483-file source/CAD release verified; hosted build success tracked separately. |

## Current implementation and evidence

`mounted-assembly.circuit.tsx` positions the unmodified official motor rear at Z=-10 mm relative to the PCB midplane, and adds the authored mechanical carrier and explicitly labeled fastener envelopes. The original exploded view remains available. These mechanical parts are not supplier electronic definitions.

Four Ø2.5 mm NPTH controller holes are at X/Y=±15.25 mm. They mate with the proposed carrier, not motor rear screws. Each has a 2.5 mm radius native keepout on top, inner1, inner2 and bottom. Component coordinates were revised to clear them; imported footprints were not edited. The body/fastener model, every actual component mesh envelope and the unchanged official motor are checked by `mechanical/check-front-carrier.py`. Conservative component AABBs clear the exact carrier and fastener BReps; nominal minimum clearance is 0.849987 mm. The carrier/motor intersection volume is zero and their front flange datum is in contact. Production tolerances and physical fit/strength are not approved by this nominal check.

Pinned tscircuit 0.0.2742 / CLI 0.1.2237 / EasyEDA 0.0.369 remain current project tools. `UNCHANGED-IMPORTS.json` checks all 44 imported definition hashes against revision 13; no new regeneration is claimed. Prior all-imports and selected manufacturer footprint audits remain applicable because definitions and audit fixtures are unchanged. Native mounted/exploded builds, formatting, TypeScript, critical pins, physical-pin connectivity, model inventory, USB registration and all five mandatory Stage 3 CLI commands were run. PCB placement reports zero errors/warnings. The schematic checker still emits the known D_VBUS vertical-orientation finding while exiting zero. The aggregate remains exit 1 and preserves that finding; no failure is hidden. Nine electrical schematic sheets are unchanged by native mechanical features.

`BOM-CATALOG-AUDIT.json` records exact matches and displayed inventory for all 44 active part identities using the installed CLI's supported public JLCPCB catalogue backend. This is indexed stock, not live assembler inventory or a reservation. TMC2209/C465949 displays one unit; motor connector/C189895 displays six. Review BOM remains 111 references / 108 default fitted. Optional encoder and endpoint termination choices are unchanged.

Current artifacts and logs are in `evidence/rev-0.0.14-alpha.0/`. The inspected mounted 3D rendering is saved there as a rendering, not a hardware photograph. See `mechanical/FRONT-CARRIER-REVIEW.md` for intended dimensions and incomplete qualification. Git/registry publication receipt will identify the completed source commit and exact uploaded bytes. Revision 13's cloud build failed before code execution because its sandbox container capacity was exhausted; that infrastructure failure does not explain or remove local board qualification gates.

## Verified revision-14 publication

Implementation source [d0a374a](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/d0a374a3a69e1baa8f96a5564a6482a97507c695) was pushed to main and its remote SHA verified. Private registry version **0.0.14-alpha.0** received **483 exact committed files**, including all manufacturer CAD bytes and the authored carrier. Every file passed SHA256 readback; PUBLICATION-RECEIPT.json records source commit, exclusions, upload and verification results. Readback resumed after interruption through the official direct-download API, preserving prior checks. `ready_to_build=true` was set only after complete readback. A triggered cloud build is not evidence of hosted success or fabrication readiness. This receipt/documentation checkpoint does not change circuit sources, imports, placement, dependencies or CAD.

## Earlier records — historical evidence only

# Current revision 0.0.13-alpha.0 — released-tooling audit and private publication

**Work-in-progress prototype: NOT routed, NOT fabrication ready, NOT hardware tested.**

2026-10-03 Europe/Tirane. Source basis: `9eb6e1a17c7c7583a48fdbaf6d33d729faec5d31`.
The user authorized creation of missing GitHub and tscircuit destinations and
reconfirmed STEPPERONLINE 14HM11-0404S as the store target. A motor SKU does not
supply an external load, maximum speed, braking or backdrive energy envelope.
Those operating limits remain unqualified. The motor drawing identification is
corrected in mechanical/REVIEW.md to A0217 revision 0, 2025-07-31.

| Stage | Status | Current evidence / remaining gate |
| --- | --- | --- |
| 1. Requirements | blocked | Exact motor locked; qualified carrier, load/braking/thermal envelope and ordered stackup remain unresolved. |
| 2. Schematic/BOM | blocked | Fresh official imports and all 261 physical pin mappings pass; C1974707 rotation B012 and electrical protection qualification remain open. |
| 3. Unrouted placement/mechanics | blocked | Native placement and exact USB CAD registration pass their limited scopes. Carrier, mating harness/cable, tolerances and full access remain unqualified. |
| 4. Routing/copper validation | not started | Routing disabled; zero traces/vias. |
| 5. Routed automated/visual checks | not started | Current checks are unrouted only. No routed shorts/snapshot/layer approval. |
| 6. Prototype fabrication approval | not started | No validated fabrication package or assembler feedback. |
| 7. Physical prototype | not started | No physical test evidence. |
| 8. Store release | in progress | Private source/package destinations created; public visibility pending explicit approval. Prototype labeling retained. |

## Current tooling and repeated checks

The official `tsci upgrade` workflow completed. Project dependencies are pinned
to tscircuit 0.0.2742, CLI 0.1.2237 and EasyEDA 0.0.369. `tsci version --verbose`
reports core 0.0.2056 and runframe 0.0.2887. The short version command reports
the top-level tscircuit version; it is not evidence of the CLI package version.
No core override or installed-package patch was applied.

All 44 imports were regenerated with native `tsci import --jlcpcb <part>
--download --use-exact-footprint`. They are byte-identical to revision 12.
Fresh raw supplier libraries were downloaded with the released EasyEDA
`fetchEasyEDAComponent` export; their exact supplier identities were checked.
IMPORT-REGENERATION-RESULTS.json and RAW-SOURCE-PROVENANCE.json record this work.
A transient disk-full failure interrupted C3662793; that import and the remaining
parts were retried successfully. Supplier library retrieval is not a stock check.

All-imports audit: **44 parts / 261 physical pin-to-pad mappings pass**. The USB
fixture and selected manufacturer footprint audits pass. C5127775 still produces
a native **0.18 ohm** resistor with both pads. STM32 and TCPP labels remain
verified without manual changes. Current sources, nets, board placement and
selected exact motor/USB models are unchanged; only tooling and records changed.

Formatting, TypeScript, critical imports, physical-pin connectivity, assembly
inventory and actual USB GLB registration pass. All five mandatory Stage 3 CLI
checks were executed. Netlist, pin specification, source and PCB placement exit
zero; schematic placement still emits an actionable D_VBUS rotation finding
while exiting zero. The dedicated rotation regression **fails**: C1974707's
270-degree symbol keeps its (0.8, 0) port vector instead of (0, -0.8). CHECK-RESULTS
preserves the semantic failure; no check is weakened or suppressed. The aggregate
check exits 1. Routing remains disabled.

Native assembly/controller builds wrote fresh PNG and GLB files. The current
controller PNG was visually inspected; the USB body is horizontal and sits at
the edge. All nine A4 schematic PNGs are byte-identical to the previously reviewed
revision-11 sheets; SCHEMATIC-EQUIVALENCE.json records their checksums. Their
previous review remains applicable because the actual images are unchanged.
The 111-reference / 108-default-fit BOM remains a review BOM, not a fabrication BOM.
Current evidence is under `evidence/rev-0.0.13-alpha.0/`.

## Destinations and publication scope

The user authorized new repositories. Private GitHub repository
[AnasSarkiz/smart-nema14-motor-controller](https://github.com/AnasSarkiz/smart-nema14-motor-controller)
was created with branch `main`; commit 9eb6e1a was pushed and the remote checked.
The private tscircuit package is
[AnasSarkiz/smart-nema14-motor-controller--01a0fd9b](https://tscircuit.com/AnasSarkiz/smart-nema14-motor-controller--01a0fd9b).
The revision-12 CLI upload encountered HTTP 413 and uncertain timeouts. Exact CAD
bytes can be uploaded through the same official gzip archive endpoint in bounded
requests; duplicate responses are checked by readback rather than assumed failed.
The full-reference revision-12 upload remains incomplete because TPS25947.pdf and
TPS2660.pdf exceed the registry request limit. It is not claimed as fully published.

The revision-13 registry package is a source/CAD distribution: it includes all
circuit sources, unchanged supplier definitions/models, current raw audit inputs,
current evidence, configuration and documentation. Downloaded reference PDFs/ZIPs
remain in the full GitHub source repository; SOURCES.md retains manufacturer links.
The distribution manifest explicitly records these exclusions and exact checksums.
This separates an unavailable document transport from board verification; no design
check is skipped, and no manufacturer geometry is compressed or edited on disk.
Publication receipts record upload/readback and remote build outcomes separately.

Automatic approval review rejected public visibility as public disclosure without
explicit authorization. Both destinations remain private pending the specific
public-visibility question. No order, merge, public disclosure or physical test
is claimed. Publication does not approve fabrication.

## Verified publication receipt — 0.0.13-alpha.0

[GitHub source commit 54fd682](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/54fd68291fc3eeb4891f824229fe7c6fe762a639)
was pushed to `main` and verified through the repository API. Private tscircuit
release **0.0.13-alpha.0**, ID `1b9388cf-42f9-40d2-8097-17158935154e`, received
**422 source/CAD/evidence files**; every file was downloaded through the official
registry APIs and its SHA256 matched the committed distribution. The motor STEP
contained non-UTF8 bytes; readback caught the initial text-encoding change and a
supported binary transfer restored its original manufacturer checksum. No local
STEP or supplier definition was changed. The release reports `is_latest=true`
and `ready_to_build=true`. Hosted transpilation/circuit/image jobs were still
**pending** at the recorded metadata check; their success is not claimed.

`PUBLICATION-RECEIPT.json` contains per-file hashes, uploads, exclusions and remote
metadata. This documentation checkpoint is pushed and mirrored to the same
private design release; circuit validation remains applicable because all circuit
sources, dependencies, supplier definitions, placement and CAD bytes are unchanged.
Public store visibility remains pending explicit approval. Stage 1–3 blockers and
all fabrication/physical-testing limits above remain in force.

## Historical validation records — superseded where stated above

# Historical revision 0.0.12-alpha.0 — external exact-part USB STEP registration

**Work-in-progress prototype: NOT routed, NOT fabrication ready, NOT hardware tested.**

2026-10-03 Europe/Tirane. Completed implementation step: attach and check the exact USB4110-GF-A external STEP through native board CAD properties, preserving the official C5143397 definition. Source basis: local commit `ed4366e`; the implementation commit containing this record and SOURCE-MANIFEST.json identifies the completed revision. Electrical nets, supplier definitions, PCB positions, motor STEP and routing controls are unchanged from revision 11. Historical records below remain evidence for their stated scopes only.

| Stage | Status | Current evidence / remaining gate |
| --- | --- | --- |
| 1. Requirements | blocked | Motor fixed to 14HM11-0404S; load/speed/braking/thermal limits, mounting carrier and ordered stackup unresolved. |
| 2. Schematic/BOM | blocked | 111 supplier references, nine A4 sheets and physical-pin connectivity pass; C1974707 rotation B012 and remaining protection/thermal/availability qualification remain open. |
| 3. Unrouted placement/mechanics | blocked | Native placement has zero errors/warnings. USB STEP inventory and nominal registration pass; full carrier, mating plug/harness and tolerance/clearance qualification B017 remain incomplete. |
| 4. Routing/copper validation | not started | Routing disabled; no PCB traces or vias. |
| 5. Routed automated/visual checks | not started | Only unrouted/preliminary checks have run; no routed shorts, snapshots or copper-layer approval. |
| 6. Prototype fabrication approval | not started | No validated fabrication package or assembler feedback. |
| 7. Physical prototype | not started | No board or physical test evidence. |
| 8. Store release | not started | Prototype only; no configured GitHub remote, B018. |

## Exact connector model and measured registration

The preferred GCT generator and Ultra Librarian exact-part export require sign-in; Component Search Engine advertises registration. No account or access gate was bypassed. A public exact-part STEP was downloaded from [mjbots/fdcanusb](https://github.com/mjbots/fdcanusb/blob/master/hw/3d/usb4110-gf-a.stp). Its header identifies a TraceParts AP242 export dated 2022-09-26 and PRODUCT usb4110-gf-a. It is not represented as a direct authenticated GCT portal download. SOURCE.json records Git blob `d8bdf965651880a271beaacef1826183181c93ba`, file size and SHA256 `fb802f14dd0a87ca59b246036d7a6365de3ea32b20a7896a02ade42b9f35d799`. The original STEP bytes/header are retained.

`imports/USB4110_GF_A/USB4110_GF_A.tsx` remains byte-exact, SHA256 `4e4d79a0a7b9406e39c5dbd6a6484f6ccd56e3ef3906ccf3e7357b94ae86cf05`. No symbol, pad, pin mapping, hole or supplier CAD definition was edited. Native `cadModel.stepUrl`, origin `{0,0,-4.89}`, X rotation +90°, scale 1 and modelBoardNormalDirection z+ register the external source using the installed renderer's STEP Y/Z remap and Scene3D rotation convention. The rendered geometry is checked independently; inspecting JSON properties alone is insufficient.

The STEP imports as one valid BRep solid. Its dimensions agree with GCT USB4110 B4 (2024-05-22): 8.94 mm mouth, 7.35 mm body length, 7.70 mm tail envelope, 11.30 mm tab width, about 3.26 mm height and Ø0.50 mm locating pegs on 5.78 mm centres. Both pegs align with the generated Ø0.65 mm NPTH holes: centre error 0.00001588 mm, nominal radial clearance 0.074977 mm. All 16 physical contacts plus four shell feet land inside their unchanged 16 copper lands; paired power/ground contacts share the wide lands. Rear shell-foot coplanarity is about 0.04 mm, within the drawing's 0.10 mm limit.

The actual generated GLB's connector bounds agree with the registered BRep within 0.001 mm; every audited contact-face vertex agrees within 0.0001 mm (measured maximum about 0.000000204 mm). The mouth is at PCB Y=-17.59 mm, projecting about 0.09 mm beyond the nominal -17.5 mm board edge. This is nominal registration, not tolerance-stack, plug-access or full-assembly approval.

## Checks and reviewed evidence

Paths below are under `evidence/rev-0.0.12-alpha.0/` unless stated otherwise. Exact pinned tooling remains tscircuit 0.0.2742, CLI 0.1.2235, EasyEDA 0.0.368, core 0.0.2056, props 0.0.677, circuit-json 0.0.510, TypeScript 5.9.3, Biome 2.5.15 and Bun 1.3.9; circuit-json-to-gltf is 0.0.141. No dependency/import regeneration was needed for this CAD-only change. Mechanical runtime is identified by mechanical/requirements.lock.txt (CadQuery 2.8.0, OCP 7.9.3.1.1, NumPy 2.5.3).

- Formatting, TypeScript, critical imported labels and physical-pin draft connectivity pass.
- `preview:assembly` produces fresh circuit JSON, PNG and GLB. The first sandboxed attempt reported FailedToOpenSocket and left old 3D artifacts despite exit 0; that output was rejected. The final socket-enabled rebuild logged Written 3d.png/3d.glb and the actual exported vertices pass the geometry audit. `assembly-build.log` preserves the failure; `assembly-build-renderer.log` records the final build.
- `test:usb-model`: passes exact identity/checksums, BRep validity, drawing envelope, two pegs, 20 physical landings and actual GLB contact/bounds checks. USB-EXTERNAL-MODEL-AUDIT.json records the geometry and GLB checksum.
- `test:assembly`: passes 111 PCB components / 112 genuine STEP references including the official motor. There are zero mounting holes and zero PCB routes/vias. Full mounting/cable BRep clearance remains blocked; model inventory is not a fit test.
- `test:usb-footprint`: passes all 16 drawing lands/signals and both locating holes using the unchanged isolated importer fixture. Its cad_model_available=false describes the supplier fixture; the separately audited board-level external model is present.
- Fresh schematic-only build and review BOM generation pass: 111 references, 44 active supplier identities, 108 default fitted parts. All nine rendered sheet PNGs are byte-identical to revision 11's visually reviewed sheets; SCHEMATIC-EQUIVALENCE.json records the comparison. Those visual reviews remain applicable.
- Mandatory native checks `netlist`, `pin_specification`, `source`, `schematic-placement` and `placement` were rerun on index.circuit.tsx. Native command exits are zero; pin_specification retains 27 draft-only metadata warnings. Source/PCB placement have zero errors/warnings. Schematic placement still reports D_VBUS TwoPinComponentShouldBeVertical even with native exit zero. CHECK-RESULTS.json preserves this as a semantic failure; aggregate exit 1 remains.
- `test:symbol-rotation` remains failed: unchanged C1974707's requested 270° port vector is (0.8,0), expected (0,-0.8). No imported symbol, dependency, validator or snapshot is patched or suppressed.
- Fresh assembly and board-only native PNGs were inspected (assembly-native.png, controller-native.png and controller-placement.png). The board-only preview has 111 components, zero pcb_trace/pcb_via and zero circuit error entries. Combined placement silkscreen remains dense/unapproved. In the 3D render: USB body sits on the PCB with its opening at the edge, and the official motor remains lifted +65 mm for inspection. assembly-native.png is a render, not a physical board photograph. No full motor/PCB support, mating-cable, silkscreen, mask, paste or copper approval is claimed.
- The offline assembly viewer was regenerated from the fresh GLB. Live IAB reload returned connection refused even though the local-only HTTP server responded to curl; the live browser view was not accepted as updated visual evidence. The native PNG and audited GLB are the reviewed outputs. Automatic approval review rejected marking the browser tab a deliverable due to remaining board blockers; no such mark was applied.
- The 44-import/261-mapping and eight-part USB supplier audits were rebuilt and rerun: zero geometry discrepancies. Byte-exact raw supplier inputs and import manifest from revision 11 were copied after verifying every definition checksum; SUPPLIER-BASELINE-PROVENANCE.json records their origin. These are reused audit inputs, not new downloads or import regeneration. Prior electrical screens remain applicable only to their stated limited scopes because pinned dependencies and wiring are unchanged. SOURCE-MANIFEST.json identifies the exact current sources, new model and generated/evidence checksums. Authored-source whitespace review excludes byte-exact supplier STEP/generated files, whose upstream CRLF/spacing is retained.

## Remaining gates and publication

B019 model absence and nominal connector registration are resolved. B012 imported TVS rendering, B017 mounting/plug/harness qualification, B013/B006 load/startup/transient/thermal/regeneration work and B007/B008 ordered stackup/full footprint/loop/test-point/stock review remain open. Routing stays disabled until stages 1–3 pass. Fabrication exports and physical tests remain pending.

The board Git repository still has no configured remote; local master has no configured publication branch. The desired tscircuit package name is recorded in package.json, but the required matching GitHub destination is missing. Under the standing publish instruction, B018 remains a blocking issue: **neither GitHub push nor tscircuit publication succeeded or was claimed**. This implementation is preserved in a local commit only; no upstream communication, merge or fabrication order was performed.

## Historical validation records — superseded where stated above

# Historical revision 0.0.11-alpha.0 — electrical expansion and unrouted checks

**Work-in-progress prototype: NOT routed, NOT fabrication ready, NOT hardware tested.**

2026-10-03 Europe/Tirane. This record supersedes all historical component selections, motor limits and stage descriptions below. Board sources remain isolated in this task directory. Source basis: local commit `4ee632f` plus this revision's changes; exact final files are recorded by SOURCE-MANIFEST.json and the local implementation commit.

| Stage | Status | Current evidence / remaining gate |
| --- | --- | --- |
| 1. Requirements | blocked | Exact 14HM11-0404S motor drawing/STEP and 35 × 35 mm/four-layer PCB specified. Load, speed, braking/backdrive, thermal envelope, qualified carrier and ordered stackup unresolved. |
| 2. Schematic/BOM | blocked | 111 official supplier components, nine A4 sheets, physical-pin connectivity passed. Imported-symbol rotation/refdes B012, full transient/startup/thermal/capacitor/stock qualification remain open. |
| 3. Unrouted placement/mechanics | blocked | Native placement reports zero errors/warnings. Full mechanical fit is blocked by absent support geometry and genuine selected USB CAD model B017/B019; mating cable and critical-loop review incomplete. |
| 4. Routing/copper validation | not started | routingDisabled; no routes or vias exist to preserve or repair. |
| 5. Routed automated/visual checks | not started | Unrouted checks and visual review below are preliminary; no routed shorts/snapshots/layer inspection. |
| 6. Prototype fabrication approval | not started | No validated Gerbers/drills/assembly BOM/CPL or assembler feedback. |
| 7. Physical prototype | not started | No physical board, firmware or measurements. |
| 8. Store release | not started | Prototype only; no configured GitHub remote, B018. |

## Requirements and implemented circuit

Motor lock: **STEPPERONLINE 14HM11-0404S**, manufacturer drawing **A0217 revision 0, 2025-07-31**, unchanged official STEP SHA256 `959f43e95b7840beae5ffbd56e997e23c5004a1b09e16b7caa40400296e46281`. Single front shaft Ø5 mm, 24 ±1 mm projection; frame/body maxima 35.2/28.2 mm; front 4×M3 on 26 ±0.2 square, minimum thread depth 4 mm. Rear structural fasteners are not qualified PCB attachment points. The STEP is one valid solid; the exact reference/datum audit passes. Exploded display raises the motor +65 mm only for visibility.

Electrical draft: STM32G0B1 + TMC2209, native UCPD with TCPP01, USB full-speed data, classical CAN, external STEP/DIR/ENABLE, two normally closed dry-contact limits, TMP112 temperature, three indicators and official Standard JST SWD package 0.8.0. Five-volt USB bootstrap must keep the motor disabled. Programmer VOUT is unconnected; guarded signals must be 3.3 V. TMUX1511 + TLV803EA30DBZR isolate SWD/NRST/ADC until the rail is qualified.

The default **review** population omits U4/C6 (optional AS5600; this motor has no rear shaft) and R50 (CAN termination link except at bus endpoints). This follows the original brief's explicit support for an unpopulated encoder. No magnet, feedback or lost-step detection is claimed. Review BOM has 111 references/44 unique supplier parts, 108 fitted defaults; inventory and assembly exports are not frozen.

R5/R6 are now official **C513714 / 1 Ω ±0.1% / 0.25 W**; R10/R11 are both 10 kΩ. The former 180 mΩ shunts and low-VREF divider are superseded. CURRENT-POWER-SCREEN.json bounds phase peak at about 0.336 A under its stated assumptions, below 0.4 A rated phase current; local dissipation screen is about 0.113 W. Actual current, temperature, pulse rating and regulation overshoot are not measured. Full rated motor torque is not claimed.

TPS259470L supplies both buck and VM with controlled charging, reverse blocking, nominal 21.46 V OVP, 0.50 A bootstrap limit and 1.00 A GPIO-selected limit after a valid ≥1.5 A PD contract. Reverse blocking is not a brake. ADC gain is nominal 0.0393236 and measures VBUS_PROTECTED upstream of the eFuse, so it does not detect regenerative VM rise. Full USB bootstrap budget, resistor/capacitor temperature and DC-bias/ripple, ESD/surge and returned-energy qualification remain pending. Intended load and maximum speed were requested during this revision; no response is recorded.

Manufacturer: JLCPCB target, four layers/1.6 mm proposed. Trace/space/via rules and impedance stackup below remain proposals rather than verified current copper or ordered stackup. No routing is enabled merely because packing passes.

## Tooling and official component audits

Global upgrade ran successfully. Exact board dependencies: tscircuit **0.0.2742**, @tscircuit/cli **0.1.2235**, easyeda **0.0.368**, core **0.0.2056**, props **0.0.677**, circuit-json **0.0.510**, TypeScript **5.9.3**, Biome **2.5.15**, Bun **1.3.9**. Upgrade logs and pinned package/bun lock identify the versions.

Official imports were regenerated using `tsci import --jlcpcb … --download --use-exact-footprint`; no definition was hand-created or patched. Raw supplier identities were verified after downloads; exit zero alone did not establish successful network retrieval.

- ALL-IMPORTS-AUDIT.json: **44 imports / 261 physical pin-to-pad mappings**, zero raw rectangular/polygon discrepancies; supplier-origin translation is normalized, relative geometry/rotation is preserved. This covers 43 active local supplier definitions plus the historical fixed C5127775 regression. The 44th active supplier identity, C136657, is provided by the official standard programmer package and checked separately by physical-pin connectivity. This audit does not replace every manufacturer's package drawing.
- Original seven-part released-converter regression: passed, 104 mappings and native 0.18 Ω/0.15 Ω values retained. Those historical shunts are not the active 1 Ω motor-current pair.
- C53283913 loses the 45° centre-pad rotation and is excluded unchanged. Official replacement **C5218924** passes the raw geometry and GND1/RESET2/VDD3 audit. See RETIRED-SUPERVISOR-IMPORT-ISSUE.json.
- GCT **C5143397 / USB4110-GF-A** B4: independent manufacturer audit passes all 16 lands, their physical signals and two Ø0.65 NPTH locating holes. The earlier C165948/C3020560 mismatches are unselected. The selected CAD model remains absent; manufacturer footprint agreement alone does not qualify assembly.
- Motor header **C189895 / JST GH**: catalogue-specified contact pitch/width, hold-down width/length/offset and 5.4 mm vertical span pass. It is rated 1 A with AWG26; mating GHR-04V-S/SSHL-002T-P0.2 harness is still unqualified. Only six units appeared in supplier search; no reservation. C265102/C265332/C157926 are excluded following discrepancies recorded in MOTOR-CONNECTOR-ALTERNATIVES.json. No land/drill dimensions were manually resized.

## Current checks and visual evidence

All paths below are under `evidence/rev-0.0.11-alpha.0/` unless they name dist.

- Formatting, TypeScript, critical import labels and physical-pin draft connectivity pass. `test:draft` validates the schematic-only output, 111 exact suppliers, nine A4 sheets, current/protection values and separate power rails.
- Git's full whitespace review flags supplier STEP CRLF/trailing spaces, generated SVG spacing and captured raw CLI log spacing. Those byte-exact upstream/generated evidence files are preserved rather than manually rewritten. Authored-source/document diff whitespace review passes; these textual warnings do not resolve or waive any electrical, mechanical or DRC finding.
- `tsci check netlist index.circuit.tsx`: exit 0.
- `tsci check pin_specification index.circuit.tsx`: exit 0, **27 visible metadata warnings**. These concern absent imported pin attributes/power/ground classifications on passives, protection, FETs/connectors and some ICs. Independent physical-pin checks verify actual connections. Warnings are accepted only for this draft audit; they do not establish manufacturer or fabrication qualification and are not suppressed.
- `tsci check source index.circuit.tsx`: zero errors/warnings after removal of deprecated, ignored schPinSpacing.
- `tsci check schematic-placement index.circuit.tsx`: exit 0 can still carry semantic findings. The final native U7 box/pin margins clear its layout findings; **D_VBUS rotation remains blocking**, as recorded by check-schematic-placement-5.log. The Programming PNG was inspected after this change.
- `tsci check placement index.circuit.tsx`: exit 0, **zero placement issues, zero DRC errors/warnings**, after official motor-header substitution and native passive rotations. PCB/motor/support/plug qualification still incomplete.
- Builds of isolated imports, the selected USB fixture and controller preview pass with routing disabled. Native controller geometry contains no pcb_trace or pcb_via. Schematic-only builds and connectivity pass.
- Native assembly build passes but `test:assembly` **fails**: selected J_USB C5143397 has only show_as_bounding_box, not a genuine STEP model. ASSEMBLY-MODEL-AUDIT.json records 111 PCB components/112 CAD entries, 111 actual STEP references including the motor, and zero PCB mounting holes. This is not a complete assembly fit test.
- `test:symbol-rotation` **fails**: C1974707's port vector remains (0.8, 0) at 270°. Reproducer and root cause are in references/TOOLING-ROTATION-BLOCKER.md and IMPORTED-SYMBOL-ROTATION.json. The canonical dependency needs a proper fix; no installed package or imported symbol is patched.
- `CHECK-RESULTS.json`: final aggregate unrouted checks exit 1 for the failed missing-model assembly check and D_VBUS semantic finding. The runner records both native exit codes and semantic issues, so the schematic check's exit zero cannot be mistaken for approval. All failures remain visible.

Visually inspected nine current A4 sheet PNGs (MCU, Encoder, CAN, LogicPower, MotorDriver, UsbPd, Programming, Interfaces, InputPower), controller-preview PCB PNG, native assembly PNG, GCT B4 drawing and JST PH/GH layout pages. Programming was reinspected after the final U7 layout change; Encoder was reinspected after its default-population annotation update. The live Board close-up control hides the motor and exposes the PCB; board-close-up.png records the inspected result. GCT model absence and dense overlapping silkscreen in the combined PCB view remain evident; no silkscreen/paste/mask/copper visual approval is claimed. The full 3D viewer remains an exploded diagnostic.

The final schematic-only build contains the final source annotations/pin margins. The earlier controller/assembly geometry remains applicable to PCB positions, official models and pin connectivity: subsequent changes affect schematic-only styling/annotations and audit scripts, not supplier definitions, electrical nets or PCB geometry. SOURCE-MANIFEST.json records the individual source, evidence and generated-output checksums; reviewed-schematics preserves the final nine rendered sheets. These independent artifact scopes do not establish a fabrication revision.

## Publication and later work

GitHub remote is absent; branch is local master. Under standing workspace authorization the implementation is preserved locally, but neither GitHub push nor matching tscircuit publication can be claimed without a configured destination (B018). No upstream message/issue/PR, fabrication order or hardware test is performed.

Before routing: resolve B012 with the canonical released tool fix; obtain a genuine selected USB model; design and qualify motor/PCB support and mating harnesses; establish load/speed/braking and startup/protection/thermal limits; finish stackup, complete footprint/BOM/loop/test-point review. Only after stages 1–3 pass may native routing, generated-copper shorts/DRC, snapshot/layer inspection and the linked fabrication package proceed.

## Historical validation records — superseded where stated above

# Current revision 0.0.10-alpha.0 — exploded inspection preview

2026-10-03 Europe/Tirane. User requested lifting the cover toward +Z to see the
board. The current official motor model is a single solid with no separate PCB
cover. The whole unchanged motor is translated **+65 mm in Z**, and the actual
unrouted controller is included below it. This is an exploded visualization;
no bracket, fastening, sensor position or mounted fit is approved. Board close-up
hides the motor; returning to Exploded assembly restores it. Browser controls
and the resulting views were inspected and saved in `evidence/rev-0.0.10-alpha.0/`.

Completed step: expose the PCB in the native TSX/GLB and interactive preview.
Formatting, TypeScript, existing assembly regression, exact STEP checksum/solid/
datum verification, assembly netlist and unrouted placement checks pass. Requested
PNG/GLB files exist. Same supplier parts/footprints and routing-disabled state are
retained. Existing electrical/import warnings and fabrication blockers remain.
The previous revision's electrical connectivity checks remain applicable because
no schematic connections or component definitions changed. Previous full-board
mechanical qualification was blocked and remains blocked.

| Stage | Status |
| --- | --- |
| 1. Requirements | blocked |
| 2. Schematic/BOM | blocked |
| 3. Unrouted placement and mechanical fit | blocked |
| 4. Routed copper | not started |
| 5. Routed automated/visual checks | not started |
| 6. Fabrication approval | not started |
| 7. Physical tests | not started |
| 8. Store release | not started |

Current source/dependency/artifact hashes: `evidence/rev-0.0.10-alpha.0/MANIFEST.json`.
GitHub repository/branch remain unconfigured (B018). No GitHub push or tscircuit
publication succeeded. This visual change does not resolve that blocker.

## Previous revision 9 record — mechanical/electrical blockers still apply

# Validation — Smart NEMA 14 Motor Controller

Revision **0.0.9-alpha.0**, 2026-10-03 Europe/Tirane. **Mechanics and schematic
qualification blocked; routing disabled; not fabrication ready.**

This same-task revision replaces the previous target with user-selected
STEPPERONLINE 14HM11-0404S. Current source/dependency and artifact checksums are
recorded in `evidence/rev-0.0.9-alpha.0/MANIFEST.json`. Previous evidence is preserved.

| Stage | Status | Current evidence / remaining work |
| --- | --- | --- |
| 1. Confirm requirements | blocked | Exact new motor/drawing/STEP acquired; encoder decision B016, rear attachment B017, thermal envelope and stackup unresolved |
| 2. Schematic and BOM | blocked | Existing 56 official parts retained; B011 USB footprint mismatch, B012 imported symbol limitations and B013 protection qualification remain; motor current conventions and complete BOM unresolved |
| 3. Unrouted placement | blocked | Exact motor reference built; previous holes/posts retired; separate unmounted controller draft built. No qualified PCB/motor/standoff/connector assembly |
| 4. Routed copper | not started | Routing disabled; zero traces/vias |
| 5. Automated and visual routed checks | not started | Only preliminary unrouted source/placement checks; no routed DRC/snapshot approval |
| 6. Prototype fabrication | not started | No fabrication package or assembler feedback |
| 7. Physical testing | not started | No physical prototype evidence |
| 8. Store release | not started | Work-in-progress prototype only; GitHub/package publication blocked by missing destination configuration B018 |

## Current motor requirements and revalidation

- Official [product](https://www.omc-stepperonline.com/nema-14-bipolar-0-9deg-11ncm-15-58oz-in-0-4a-10v-35x35x28mm-4-wires-14hm11-0404s), PDF A0217 revision 1 dated 2025-07-31,
  and STEP downloaded through that product's official download links on 2026-10-03.
- Motor rating is **0.4 A/phase**, 25 ohms ±10%, 24 mH ±20%, 0.9°/step,
  400 full steps/revolution, 0.11 Nm holding torque. Previous 1 A motor limits
  and 200 full steps/revolution are retired. Firmware/current sensing must be
  requalified; no current-limit firmware is implemented or tested. Do not equate
  the motor rating to 0.4 A RMS without resolving driver RMS/peak conventions.
- Single Ø5 mm front shaft, projection 24±1 mm; no rear shaft projection.
  Previous rear magnet/AS5600 mechanics are incompatible. Encoder circuitry is
  optional and retained pending the user's decision, not approved for assembly.
- Front mounting: 4×M3, 26±0.2 mm square, depth ≥4 mm. These are front features.
  STEP rear corner details are present at (±13,±13), but do not establish rear
  screw replacement/engagement/preload requirements. No current PCB mounting holes
  or hardware are selected. Drawing and STEP revisions differ in date; confirm
  purchased hardware matches before mechanical qualification.
- Original 35×35 mm, four-layer controller objective retained; 1.6 mm diagnostic
  thickness and routing disabled. PD startup, current budget, protection,
  operating/thermal envelope and final stackup remain unresolved.

Native motor reference is `assembly.circuit.tsx`; separate PCB draft is
`controller-preview.circuit.tsx`. The old Phidgets tools are guarded against
accidentally overwriting historical artifacts. Original supplier imports are
unchanged; the schematic motor note now describes the unresolved encoder location.
The revised assembly regression verifies exact vendor STEP checksum and datums,
absence of previous hardware and unrouted separate controller. It deliberately
makes no mechanical fit claim. Revision 8's PCB/motor intersection and axis tests
are historical; they cannot be reused for the new motor.

Current command results are in `CHECK-RESULTS.json` and corresponding logs under
`evidence/rev-0.0.9-alpha.0/`. CLI exit status alone is not sufficient: inspect warning
payloads and ensure requested 3D outputs exist. Official motor/drawing and the
interactive viewer were inspected. Standalone PCB geometry and the changed encoder sheet were inspected. The other
electrical sheets are unchanged from revision 8; no full assembly fit is available.

## Revision 9 checks and reviewed artifacts

Ten preliminary checks returned exit 0: formatting, TypeScript, critical import
pins, 162 draft connectivity assertions, exact motor/no-old-mount regression,
netlist, pin specification, source, schematic placement and separate controller
placement. Placement reports no issues. Routing remains absent. Pin specification
still reports 11 imported metadata warnings; schematic placement still reports
D_VBUS orientation despite exit 0. B012 remains unresolved; these command statuses
do not pass the schematic/BOM gate or justify suppressing warnings.

Native motor and controller GLBs exist. Initial controller CAD download failed
under network restrictions despite CLI exit 0; the authorized network retry
produced the requested GLB. The exact motor model is one valid solid with checked
checksum and datums. All 48 revision-8 electronic import input files match their
previous checksums. Changed encoder A4 sheet, separate PCB image, official motor
PDF and interactive motor view were inspected. Motor fit is unperformed because
no bracket/posts/fastener selection is qualified. Heavy historical STEP exports
remain locally with their original recorded hashes; generated files over GitHub's
size limit are excluded from source control without modifying those artifacts.

## Publication blocker B018

Workspace AGENTS.md requires committing/pushing/publishing each implementation
revision. Local board Git has no remote; destination GitHub repository and branch
are unknown. The package name is recorded but its publication destination/access
has not been verified. Do not invent a repository or publish a different destination.
Neither GitHub push nor tscircuit publication succeeded. Source and dependency
checksums preserve this local work-in-progress revision.

## Historical record — revision 8 and earlier

The following material is preserved for provenance. Its Phidgets geometry, proposed
hardware and current limits are superseded; its unchanged electrical import blockers
remain applicable. Historical pass results do not validate revision 9.

# Validation - Smart NEMA 14 Motor Controller

Date: **2026-10-03 Europe/Tirane (2026-10-02 UTC)**. Board revision: **0.0.8-alpha.0**.
Status: **SCHEMATIC QUALIFICATION BLOCKED; MECHANICS BLOCKED; NOT FABRICATION READY; ROUTING DISABLED**.

New isolated design, no source-board predecessor. Local Git has no source commit
or remote. Reviewed source/dependency hashes and artifacts identify this revision
in `evidence/rev-0.0.8-alpha.0/MANIFEST.json`; its full source-inputs.tar.gz
preserves this revision independently. Revision 0.0.6 retains its own verified
0.0.5 baseline plus 0.0.6 delta reconstruction.
Revisions 0.0.1 through 0.0.5 evidence remain preserved. The 0.0.1 label-loss
findings are superseded by the released-converter audit below. Earlier envelope
outputs are historical; the 0.0.4 draft is preserved in revision 0.0.5’s previous-draft/.

## Stage record

| Stage | Status | Evidence / outstanding work |
| --- | --- | --- |
| 1. Confirm requirements | blocked | Phidgets 3323_0 drawing acquired; official STEP shaft discrepancy B014, hardware/axis tolerances B003, operating/thermal envelope and ordered stackup remain blocked |
| 2. Schematic and BOM | blocked | Six A4 draft sheets, 56 official parts and 162 physical-pin checks; B011 connector lands, B012 imported symbol output and B013 power protection qualification block approval; downstream power/SWD/IO/BOM remain unfinished |
| 3. Unrouted placement | blocked | Separate unrouted TSX diagnostic assembly built; main-board placement approval blocked by B003/B011-B015 and incomplete BOM |
| 4. Routed copper | not started | Routing explicitly disabled; no copper geometry exists |
| 5. Automated and visual routed checks | not started | Preliminary schematic checks passed below; no routed board/DRC/snapshot qualification |
| 6. Approve prototype fabrication | not started | No Gerber, drill, assembly BOM/CPL or assembler feedback package |
| 7. Physical prototype tests | not started | No prototype or actual physical evidence; no verified operating limit |
| 8. Store release | not started | No release or publication; incomplete prototype design |

None of the eight complete-board stages has passed. Independent schematic/BOM
work continues while exact motor mechanics gates placement and routing.

## Requirements and unresolved limits

The supplied brief requires a motor-mounted standalone controller, STM32G0B1,
TMC2209, real USB-C PD negotiation, USB data where practical, bottom-side
AS5600, CAN, STEP/DIR, two limit inputs, temperature sensing, power/status/fault
LEDs and the official Standard JST programming connector. Target is 35 x 35 mm
and four layers, with accessible edge connectors and exact rear shaft alignment.

- Supply: default 5 V startup; requested 9/12/15/20 V PD where offered. Prefer
  12/15 V operation. Motor disabled until a valid contract, measured voltage,
  current budget and driver setup are confirmed. Detailed inrush/fallback/
  regen behavior remains unresolved.
- Locked motor rating: 1.0 A per phase, 2.7 ohm / 4.3 mH per phase. This
  supersedes the earlier approximately 1.2 A controller target. Chopper
  RMS/peak convention and thermal limits still need qualification; 0.3 A RMS
  bring-up and no more than 0.7 A RMS (approximately 0.99 A sine peak) are
  conservative proposed firmware limits, not implemented or tested ratings.
- Interface voltage, external-input source impedance and cable protection
  remain to be specified. CAN candidate is classical CAN at 3.3 V logic.
- Mounting: locked to Phidgets 3323_0 / 35STH40-1004B. Its official rear drawing
  supplies two M1.6 holes at 40 degrees on a 14.5 +/-0.15 mm circle; native
  diagnostic PCB holes are placed. Hardware/axis tolerances and the official
  STEP shaft discrepancy remain unresolved.
- Manufacturer: JLCPCB four-layer rigid FR4, through vias. Proposed L1 component/
  signal/power, L2 GND, L3 power/slow signals, L4 encoder/signals arrangement.
  No plane has been created and no stackup/thickness has been selected.

### Proposed manufacturing rules - not copper validation

Conservative candidate values below must be reconciled with the selected
stackup, imported lands, thermal-via construction and JLCPCB DFM before routing.
The [JLCPCB rigid capability page](https://jlcpcb.com/capabilities/pcb-capabilities/)
was consulted on 2026-10-02; quoted capability minima are not power-current
ratings. Use manufacturer-specific geometry/current analysis for critical nets.

| Feature | Proposed design target | Status |
| --- | --- | --- |
| Signal trace width | At least 0.15 mm except a documented USB impedance design | Not implemented/measured |
| Copper clearance | At least 0.15 mm, with larger spacing where protection needs it | Not implemented/measured |
| Ordinary through via | 0.30 mm drill / 0.60 mm copper diameter | Not implemented/measured |
| Ordinary drill edge-to-copper | At least 0.25 mm, including same-net pads | Not implemented/measured |
| Copper-to-board edge | At least 0.30 mm | Not implemented/measured |
| Thermal via array | Pending; review exposed-pad paste and filling/tenting requirements separately | No exception approved |
| Power trace widths | Pending load, copper weight and thermal calculation; inspect narrow necks | No current-capacity claim |
| USB differential impedance | 90 ohm target on chosen manufacturer stackup | Stackup/routing unselected |

The earlier 0.0.1 empty-envelope build defaulted to 1.4 mm thickness and the library's own
DRC minima (including 0.10 mm traces and 0.20/0.30 mm via dimensions). Those
defaults **are not approved fabrication settings**. Do not generate fabrication
outputs from that envelope or treat them as the rules above.

## Tool/dependency record

| Tool | Version |
| --- | --- |
| Bun | 1.3.9 |
| Global tscircuit before update | 0.0.2696 |
| Global tscircuit after first requested update | 0.0.2729 |
| Current global tscircuit after latest wrapper resolution | 0.0.2733 |
| CLI resolved from global wrapper | 0.1.2230 |
| Local tscircuit | 0.0.2733 |
| Local @tscircuit/cli | 0.1.2230 |
| Released EasyEDA converter / CLI bundled requirement | 0.0.366 |
| TypeScript / Biome | 5.9.3 / 2.5.15 |
| Standard JST Programmer | 0.8.0 |
| Direct sheet rendering dependencies | circuit-to-svg 0.0.437 / sharp 0.32.6 |

Dependencies are exactly pinned in package.json and bun.lock. The installed
core/props/transitive versions are recorded in the manifest. The requested `tsci upgrade` ran successfully before imports. The global
wrapper reports tscircuit 0.0.2733; its resolved CLI package is 0.1.2230 (a stale
unrelated globally hoisted CLI was not mistaken for the wrapper's runtime).
Local CLI 0.1.2230 bundles the easyeda ^0.0.366 requirement. CLI-generated
resistance and pin/pad audit verify the actual behavior, not just version strings.
Earlier installs reported a circuit-json peer warning; no relevant type/build/check failure
remains. Exact package versions are in this revision's VERSIONS.json.

## Released-converter baseline audit (0.0.4, rechecked in 0.0.5)

The upstream converter #587/#588 and CLI #5111 are confirmed merged; metadata
is in revision 0.0.4's UPSTREAM-RELEASE.json. C2847904, C1121848, C5127775,
C5127776 and C19947652 were regenerated in revision 0.0.4 through
`tsci import --jlcpcb --use-exact-footprint` using CLI
0.1.2230. Raw supplier inputs were separately saved with released EasyEDA
0.0.366. Current output hashes, raw hashes and reproduction evidence are in
revision 0.0.4's IMPORT-PROVENANCE.json; revision 0.0.5 records their unchanged
hashes and adds fresh encoder/driver imports. Neither definitions nor footprints,
symbols, pin aliases, pad mappings or imported attributes were manually patched.
Generated MCU/TCPP output was copied byte-for-byte to the existing canonical paths.

Four CLI outputs are byte-identical to direct converter reproduction. MCU CLI
output additionally includes official fetched datasheet attributes and uses the
CLI serializer; a second official MCU import reproduces its exact bytes. The
baseline native raw-to-port/pad audit confirmed five identities and 67 mappings,
including the MCU's 48 and TCPP's 13 pads. The current expanded audit confirms
seven identities and 104 mappings. The unchanged critical audit below
continues to pass. Full model/paste/application qualification remains pending.

| Part / physical pin | Current generated aliases | Datasheet comparison |
| --- | --- | --- |
| C2847904 pin 6 | VDD, VDDA | PASS, ST DS13560 Rev 6 Table 12 |
| C2847904 pin 7 | VSS, VSSA | PASS |
| C2847904 pin 33 | PA11_PA9_ | PASS, default PA11 / optional PA9 remap |
| C2847904 pin 34 | PA12_PA10_ | PASS, default PA12 / optional PA10 remap |
| C1121848 pin 10 | DB | PASS, ST DS12900 Rev 7 Table 1 |
| C1121848 pin 11 | FLT | PASS |

The existing critical-import audit is unchanged from 0.0.1 and now passes.
Generated MCU pads 1-48 and TCPP pads 1-13 (including EP) are present exactly
once. This confirms labels/pad presence, not full land-pattern/paste/model or
application qualification. B001/B002 are closed as tooling issues.

## Current schematic/BOM progress

- Five native A4 sheets: MCU, Encoder, CAN, Logic Power, Motor Driver, each
  297 x 210 mm. All 38 instantiated electronic parts are genuine supplier
  imports: U1/U2/U4/U5/U6, C1-C21, R1-R11 and L1.
- Existing MCU supplies, NRST, I2C1, FDCAN2, optional AS5600 in 3.3 V mode
  and SN65HVD230 connections remain. AS5600 OUT/PGO are unused and OTP
  programming is excluded. Magnet mechanics are unresolved.
- AP63203 fixed 3.3 V regulator uses 10 uF input, 100 nF bypass/bootstrap,
  3.9 uH Bourns inductor and two nominal 22 uF output capacitors. Its input net
  VBUS_INRUSH_OUT awaits the protected USB power path. The preliminary 0.3 A
  logic budget is not a tested rating; bias, inductance tolerances, switching
  behavior, fault saturation and thermal/layout qualification remain open.
- TMC2209 support now includes charge-pump/regulator capacitors, nominal
  200 uF/35 V polarized VM bulk, two 180 mOhm/1 W sense resistors, hardware
  disable pull-up, STEP/DIR pull-downs and MCU UART/STEP/DIR/DIAG/ENN wiring.
  VREF derives from the driver's own 5VOUT using a 10k/10k divider and filter.
  VM remains a separate, unsupplied net pending the protected power path.
- Nominal full-scale current calculation is 1.149 A RMS for the selected
  180 mOhm resistors. A 1.0 A firmware cap and 0.3 A bring-up setting are
  proposed, not implemented or verified. The approximately 1.2 A target is
  not met or qualified by this draft. See POWER-AND-MOTOR-REVIEW.md for
  calculations, tolerances and regeneration limitations.
- C2046441, C5127782 and C723743 cannot be downloaded through the converter.
  The prior C5127775 converter bug is resolved: raw 180mΩ now generates a
  native 0.18 Ω resistor with both pads intact. C19947652 and C5127775 replace
  the unavailable inductor/180 mOhm candidate using their own official footprints.
  C5127776 imports as 0.15 Ω with two pads; it is an unused electrical candidate,
  with AEC-Q200 qualification unestablished. Original missing-library parts
  remain blocked/excluded. C167251 remains correctly rejected as an LDO.
  No failed component was recreated or patched.
- C3662793 TPS259470L is an imported, unused power-path candidate; its
  protection/variant/polygon geometry and application are not qualified.
- Corrected the MCU pin plan: TCPP01 pin 6 CTRL_VBUS is an analog OVP divider
  input, not a GPIO control. No imported component definition was changed.
- USB connector/PD protection/inrush/reverse blocking, regeneration handling,
  official programming connector, external IO, termination/protection,
  temperature and LEDs remain stage 2 work. MLCC bias and imported lands/paste
  remain unqualified. No PCB coordinates, holes, planes, traces or vias exist.

## Commands and results for the implemented draft

All commands run from the board directory. Exact argument arrays, exit codes
and log paths are in evidence/rev-0.0.5-alpha.0/CHECK-RESULTS.json.

| Command | Observed result / scope |
| --- | --- |
| tsci upgrade / latest dependency resolution | Exit 0; CLI already 0.1.2230, latest global/local wrapper 0.0.2733, core 0.0.2052; current update logs / VERSIONS.json |
| Fresh tsci import C79815 and C465949 | Exit 0; official exact footprints copied byte-for-byte to canonical paths; direct converter reproduction matches |
| Retry tsci import C2046441, C5127782, C723743 | Each exits 1 with missing supplier-library data; originals remain excluded, current replacements pass |
| bun run preview:imports / test:imports | Exit 0; isolated unrouted fixture, native 0.18/0.15 Ω, 3.9 uH, 104 pin/pad mappings and zero generated error elements |
| tsci check placement scripts/import-audit.circuit.tsx | Exit 0; zero placement errors/warnings for separated import fixture; NOT full board placement |
| bun run validate:imports | Exit 0; six critical label checks pass without audit changes |
| bun run format:check | Exit 0; authored source/config/scripts only; generated imports untouched |
| bun run typecheck | Exit 0 for source and generated imports |
| tsci check netlist index.circuit.tsx | Exit 0; implemented netlist reviewed; unfinished pins remain visible |
| tsci check pin_specification index.circuit.tsx | Exit 0; no errors, two metadata warnings retained and reviewed below |
| tsci check source index.circuit.tsx | Exit 0; zero errors and warnings |
| tsci check schematic-placement index.circuit.tsx | Exit 0; no remaining placement issues reported; explicit visual review also completed |
| bun run preview:schematic | Exit 0; routing disabled and PCB output disabled; all five sheets rendered |
| bun run test:draft | Exit 0; 86 physical-pin net checks, 38 supplier parts, five A4 sheets, five distinct power/ground nets and zero PCB elements |

These are preliminary checks on implemented blocks. They do not establish a
complete netlist, validated BOM, PCB placement or absence of routed shorts.
Actionable schematic box-width, decoupling-spacing and supply-orientation
findings were corrected using layout props, preserving electrical connections.
No DRC or validation option was suppressed.

### Reviewed warnings

Two converter metadata warnings remain: U4 and U2 lack `requires_power`
classifications. Manufacturer pin functions and independent physical-pin checks
confirm U4 pins 1/2 on V3V3 and U2 VCC_IO/VS1/VS2 on their intended rails.
Accept these metadata warnings for this partial schematic only; retain the logs
and re-review during complete-board qualification. The official MCU importer
adds datasheet attributes and resolves its earlier ground-classification warning.
No imported metadata was manually changed. Peer-version install warnings confer
no electrical/fabrication qualification.

## Visual and generated-artifact inspection

Inspected the actual current PNG for each native sheet:

- dist/index/schematic-MCU.png and .svg: readable supply/reset network,
  imported MCU labels, unfinished pins and explicit draft notes within A4.
- dist/index/schematic-Encoder.png and .svg: tied 3.3 V supply pins,
  DIR/GND, two pull-ups, decoupling, OUT/PGO no-connects and mechanical note.
- dist/index/schematic-CAN.png and .svg: transceiver, RS/GND, supply capacitor,
  MCU signal labels and explicit missing connector/termination/ESD note.
- dist/index/schematic-LogicPower.png and .svg: fixed-output regulator,
  bootstrap/inductor and capacitor polarities/nets, unsupplied input and draft
  protection/current-budget notes.
- dist/index/schematic-MotorDriver.png and .svg: all driver signal/power labels,
  charge pump, VM capacitors, polarity, UART, sense resistors, VREF and startup
  pull resistors. Supported instance display arrangement/width changes resolve
  label and grouping issues without changing imported pin definitions.

The CLI's generic schematic.png/.svg show only the first sheet; the additional
native per-sheet renderer ensures the other sheets are actually inspected.
Current circuit.json has 38 source/schematic components, five A4 sheets,
zero PCB elements and no error elements. Two metadata warnings remain as above.
Earlier empty PCB images remain in rev-0.0.2's previous-envelope/.
The preceding five-sheet draft is preserved in current previous-draft/.
Downloaded 3D models, full package lands/paste and mechanical assemblies have
not been visually qualified. Local AP63203 datasheet pages 2, 9 and 13 were rendered and inspected;
manufacturer TMC2209/TCPP documents were reviewed through their online PDFs.
Full supplier package/PDF/land-pattern qualification remains incomplete.
See references/SOURCES.md and POWER-AND-MOTOR-REVIEW.md for exact source links.

CLI schematic-placement can report issues with exit 0, so the final empty issue
report and actual renders were inspected separately from the return code.
Motor-driver box width, bootstrap-capacitor orientation, VM capacitor grouping
and UART resistor label orientation were corrected through schematic layout props.
No routing or error-check option was suppressed.

### Replacement footprint fixture review

Actual dist/scripts/import-audit/pcb.png and pcb.svg were inspected. This is a
separate seven-component 80 x 35 mm four-layer, unrouted fixture, not a proposed controller PCB.
Its two resistor footprints each preserve the supplier's 1.207516 x 1.7010126 mm
lands, centers +/-1.478788 mm. Bourns lands are 1.999996 x 6.499987 mm,
centers +/-2.250059 mm, matching the manufacturer's recommended 6.5 mm square
layout/2.5 mm inner gap within source rounding. MCU/TCPP/encoder/driver pad counts and physical
port links were inspected/audited; exact supplier outlines/courtyards are retained.
No copper traces or vias exist in this fixture. Placement reports zero errors
and warnings at its deliberately separated coordinates. It does not establish
connector access, mounting fit, 35 mm density or manufacturing qualification.

The first diagnostic fixture build had missing test-net connections and sandbox
supplier-fetch failures; its log is preserved. The completed fixture connects
its tested power/passive pins and runs required supplier checks with network
access. No supplier check or DRC was disabled. Current source/config/typecheck
and full draft evidence reflect the corrected fixture source.

## Required later checks

After stage 2 and motor mechanics are complete, run the complete pre-route
checks (including repeating the preliminary ones on the full source):

```sh
tsci check netlist index.circuit.tsx
tsci check pin_specification index.circuit.tsx
tsci check source index.circuit.tsx
tsci check schematic-placement index.circuit.tsx
tsci check placement index.circuit.tsx
```

Only then enable routing, save generated routes and correct any actual defects
through supported native route/cache APIs. Measure widths, clearances, power
necks, holes/vias and keepouts on generated geometry, and run:

```sh
tsci build index.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs
tsci check shorts dist/index/circuit.json
tsci snapshot index.circuit.tsx
```

Review every copper layer, critical detail and changed snapshot before prototype
Gerber/drill/BOM/CPL export and assembler review from the identical revision.
An empty or PCB-disabled preview cannot pass those checks on behalf of a board.

## Readiness

**BOM: NOT READY**  
**SCHEMATIC: NOT READY (partial draft reviewed)**  
**MECHANICS: NOT READY (official STEP discrepancy, hardware/tolerance and connector qualification blockers)**  
**PLACEMENT: NOT READY**  
**ROUTING: DISABLED**  
**FABRICATION: NOT READY**

External requirement blocker B003 and component/circuit blockers B011-B013 remain. Other circuit, supplier,
thermal, stackup and fabrication work remains explicitly unfinished in issues.md.
No physical hardware test, fabrication order or publication has occurred.

## Latest blocker recheck — 2026-10-02

The current dependency manifest resolves latest tscircuit 0.0.2733 / core
0.0.2052. CLI 0.1.2230 and converter 0.0.366 remain the latest observed releases.
The preceding 0.0.4 five-part import provenance remains applicable: its generated
MCU/TCPP/resistor/inductor definitions are unchanged. Current provenance adds
fresh C79815/C465949 imports and matching direct converter reproductions; raw
records for the other five fixture parts are copied unchanged from that evidence.
The unchanged critical-label audit and 86 board physical connections pass.
Expanded native audit passes all 104 raw-symbol/pin/pad mappings for seven parts.
Fresh encoder/driver imports do not resolve their two metadata warnings.
All five current sheet PNGs and the expanded fixture PCB PNG were inspected.

C2046441, C5127782 and C723743 were retried through the official importer and
still report Component not found in EasyEDA library search, exit 1. No failed
part was patched, recreated or introduced into the board. Verified alternatives
remain selected/candidate as recorded. See BLOCKER-RECHECK.md for individual
B001-B010 outcomes; exact mechanics, full protected power/interfaces, worst-case
ratings, stackup, full package review and physical evidence remain outstanding.
No complete-board validation stage is promoted and no fabrication output/order
is generated by this recheck.


## Alternative selection — revision 0.0.6

The user requested use of alternatives. L1 is selected as C19947652, Bourns
SRN6028C-3R9M, 3.9 uH, replacing unavailable C2046441. R5/R6 are selected as
C5127775, native 0.18 ohm, 1 W, 1%, replacing unavailable C5127782. These
parts were already populated in the draft; this revision records the decision
without changing electrical source or manually editing imported definitions.
C5127776 is the verified 0.15 ohm electrical alternative to C723743, retained
as an unpopulated option. There is no C723743 instance to replace. The active
matched 180 mOhm sense pair is retained; fitting 150 mOhm would require current
limit recalculation and requalification. AEC-Q200 is not established.

The original three library failures are excluded candidate findings, not
requirements of the selected draft. Full Stage 2 remains in progress because
power/PD, IO and package/availability qualification are unfinished. Exact motor
geometry still blocks Stage 1/3. Two draft metadata warnings remain accepted
only within their previously recorded scope. See
[evidence/rev-0.0.6-alpha.0/SUBSTITUTIONS.md](evidence/rev-0.0.6-alpha.0/SUBSTITUTIONS.md).

The preceding revision's rendered output and visual reviews remain applicable:
electrical source, import bytes, lockfile and tool versions are unchanged.
Current selection assertions and existing audits are rerun; formatting and
TypeScript are checked. No routed, fabrication or physical test status changes.

## Current revision 0.0.7 - latest releases and USB frontend

Global official upgrade succeeded. Registry records preserve latest observed
releases: tscircuit 0.0.2736, CLI 0.1.2232, EasyEDA 0.0.368. Local dependencies
are pinned to these releases; core 0.0.2052 is unchanged. The peer warning
about circuit-json 0.0.509 remains visible in installation logs; no dependency
was forced or manually patched. Formatting, strict project TypeScript and
current artifact tests are required below. Versions and source hashes identify
actual inputs; this section supersedes previous current-runtime descriptions.

Fifteen critical/selected/USB imports regenerated successfully through the
latest official CLI with exact supplier footprints; no --exclude-pin-attributes
flag or manual component edit. Original C2046441/C5127782/C723743 still fail
with no usable EasyEDA library. Selected C19947652 / C5127775 remain active;
C5127776 remains an unused electrical option, with no AEC-Q200 claim.
C5448795 C0G capacitors replace the excluded C106206 X7R candidate.
Additional C3020560 connector investigation is unselected and not qualified.

Current preliminary results:

- Format and TypeScript checks pass. MCU/TCPP critical labels pass unchanged.
- Netlist and source checks: zero errors and warnings. Pin specification:
  zero errors, eleven metadata warnings reviewed in issues.md; no suppression.
- Draft test: 162 physical pin connections, all 56 supplier identities,
  six native A4 sheets, seven separate supply/ground connectivity groups,
  resistor/capacitor values and no PCB geometry.
- Existing isolated import audit: seven identities and 104 pin/pad mappings.
  New USB audit: eight identities and 38 raw-symbol/native-pin/pad links.
  These checks verify conversion/pin preservation, not complete land-pattern
  approval. Both fixtures are unrouted and have zero generated DRC errors.
- USB fixture placement: zero errors and warnings after native fixture
  coordinates were corrected to expose the connector at the appropriate edge.
  This fixture remains separate from motor-board placement.
- Schematic-placement still reports D_VBUS vertical-orientation issue despite
  supported schRotation=270; B012 remains unresolved. CLI exits zero even
  when this issue exists. This check has not been called a full pass.

Current MCU and USB sheet renders were inspected. Added board annotations
identify three custom-symbol parts missing imported reference text; the
imported definitions themselves remain untouched. USB notes fit inside the
A4 boundary after source layout correction. All remaining four current sheet PNGs and both current fixture PCB PNGs
were inspected; the updated USB fixture edge arrangement was inspected again.
No complete schematic visual-qualification pass is claimed.
Manufacturer HRO/GCT connector drawings, TI data-ESD pinout, ST input-TVS
polarity and ST MOSFET pinout/continuous-drain land were actually rendered
and inspected. See references/USB-PD-REVIEW.md for exact discrepancies,
static calculations, preserved initial fixture findings and artifact paths.

Stage 2 is now explicitly blocked by B011-B013; independent draft changes do
not authorize dependent placement/routing. Stage 1/3 still require exact motor
rear mechanical geometry. Full power path, programmer, IO, protection, BOM,
ratings, stock, stackup and physical validation remain incomplete. There is
no functioning cold-start/PD implementation and no copper or fabrication output.

## Current revision 0.0.8 - exact Phidgets motor and native TSX assembly

Motor identity/drawing acquisition is resolved: Phidgets 3323_0 /
35STH40-1004B, manufacturer drawing 0DZ.252.001. Its original PDF, ZIP
and unmodified extracted STEP are in references/motor/. The drawing and
AS5600 manufacturer datasheet pp. 33-35 were rendered and inspected.
See mechanical/REVIEW.md for primary links, geometry, tolerance assumptions
and unresolved findings. Prior revision statements about the absent motor
are historical and superseded here; full Stage 1/3 are still blocked.

assembly.circuit.tsx uses installed native assembly.device /
assembly.subassembly / cadmodel APIs verified in official docs and local
core/props. It reuses the actual 56-part draft with mechanicalPreview=true,
adds the unchanged official C136657 programmer connector as an isolated
envelope and positions the original motor STEP relative to the PCB.
No imported electronic symbol, footprint, pin mapping or CAD metadata is
patched. Default index.circuit.tsx remains the schematic entry point; preview
coordinates and its two rear clearance holes are diagnostic-only.

Official STEP dimensions measured with OpenCASCADE: body 34.95 x 34.95 x
40 mm; rear projection 12 mm; rear circle 14.5 mm / 40 degrees; rear shaft
**4.0 mm**, discrepant with drawing **3.9 mm maximum (3.75 mm minimum)**.
The original model is retained unchanged, not replaced or corrected. B014
blocks mechanical approval. Front four M3 / 26 mm mounting features remain
in the official motor model only; none is used as a PCB mounting hole.
The STEP rear M1.6 bores are modeled at their minor diameter, not 1.6 mm
clearance diameters; intentional major-thread envelope overlap is recorded.

PCB diagnostic mounting centers: +/-(5.5538222126, 4.6602101702) mm.
Two native NPTH clearance holes, diameter 2.2 mm, are proposed; their
clearance and the motor hole-circle tolerance do not by themselves establish
encoder centering to 0.25 mm. U4 and the magnet nominal axes are at (0,0).
The AS5600 Hall array is centered in its package per the reviewed datasheet.
Standoff length 18.3 mm, male M1.6 projection 2.0 +/-0.1 mm, a nonmagnetic
retaining cup and 6 x 2.5 mm diametric magnet are mechanical proposals, not
qualified purchased hardware. Maximum proposed motor penetration is 2.1 mm,
strictly below 2.5 mm. Nominal magnet/package surface gap is 1.8 mm; a
conditional 0.8-2.7 mm range uses explicitly proposed tolerances and excludes
unqualified solder height, magnetic field, axis/retention and thermal effects.
Typical datasheet air-gap guidance does not prove sensor operation.

The final native assembly build has zero generated error elements and no
traces or vias. Its warnings remain visible and reviewed below; no check or
DRC option was disabled. Diagnostic positions were iterated to remove pad,
hole and courtyard overlaps. This does not qualify a routing layout: critical
decoupling distances, power loop layout, final IO connectors and full BOM are
unfinished. Motor/CAN/STEP-DIR/limit connectors and mating cable models are
not selected, so the requested complete connector assembly cannot pass yet.

29 distinct official supplier STEP URLs were preserved unchanged and linked
to all 57 instantiated supplier component models. The 3D PNG and GLB are
generated from the current native assembly. Separate exact BRep measurements,
assembly STEP and multiple inspection views are preserved in revision 0.0.8.
The diagnostic CAD check also reports USB model / PCB intersection,
0.358309 mm3, requiring model/land registration qualification (B015). No
manual footprint or CAD correction is applied. As requested, the follow-up
manufacturer USB footprint audit remains gated until mechanics pass.
Earlier B011 HRO/GCT drawing discrepancies remain unresolved; no new USB
connector has been silently selected.

An initial geometry run was stopped after profiling repeated expensive exact
bounding-box computations. The checker now caches unchanged shape bounds
and supplier shapes; all pairwise collision checks and exact measurements
remain. Earlier placement failures and initial native artifacts are retained.
The initial assembly regression check used the wrong case/field names for A4;
it was corrected against installed circuit JSON and requires all seven
297 x 210 mm a4 sheets. Prior evidence/import bytes remain unchanged.

The final placement command initially exited 1 despite zero DRC errors/warnings:
seven actionable orientation findings remained. Each was corrected using native
instance pcbRotation=180 (R1/R4/R7/R10/C22/R15/R16), without changing imports
or weakening the check. The complete current assembly was rebuilt and the
placement check and geometry evidence repeated.

The repeated diagnostic placement check exits 0, reports no placement issues
and zero DRC errors/warnings. All ten scripted check commands exit 0, but the
schematic-placement output still flags D_VBUS orientation (B012); CLI exit
status does not override that finding. Existing schematic/BOM and mechanics
blockers remain. The final viewer-only change adds a motor-front camera and
official STEP provenance link; formatting and viewer build were rerun successfully.
The user-provided HOLRY 35HBSG lead-screw image is a different model, and does
not change the accepted Phidgets motor lock. Exact ZIP-member equality and
current native model references are preserved in MOTOR-PROVENANCE.json.

## Qualified partial copper checkpoint — 44/108 nets

The fresh canonical native CLI build has SHA-256 `4e15aa8be90488f9de498393835c2e03fe39c311ffbe09836e71e5fd665d7b21`: 63 traces, 36 ordinary 0.30/0.45 mm through vias, seven native GND pours, and 283 unconnected-port errors. Every one of the 43 saved signal nets and the entire GND network is physically one copper island after removing actual drills. Native shorts/clearance errors and independent copper/fill clearance violations are zero. Six outside-pad ground stitches and shorter local QSPI_CLK, PD_VDD, PD_VREG_2V7 and BUZZER_PWM paths were checked against the full board. Original C_FLASH placement and supplier bytes are preserved.

Fresh CLI netlist, pin_specification, source, schematic-placement, placement and shorts checks pass. The first pin check used an invalid hyphenated spelling; its invocation error is retained and the supported underscore spelling was rerun successfully. Fresh PCB-disabled manufacturer-pin partition checks, 38 programmer assertions, standard USB-C sixteen pad groups, 149 schematic purposes, and TypeScript pass. The official style analyzer still reports the same single unchanged D_VBUS supplier-symbol rotation issue; it is not suppressed. Current genuine STEP bytes are linked to all 148 actual CadQuery results and the checked mounted envelope. USB trunk, MCU-stub and complete plug-path length bounds pass unchanged; coupling, reference coverage, impedance and barrel delay remain unfinished.

Evidence: `evidence/rev-0.0.45-alpha.0/PARTIAL-44-READINESS.json` and its referenced reports. The minimum publication runtime contains 303 files, including original model assets and all three literal assembly STEP dependencies. This checkpoint is partial; remaining signals and power, loaded widths/thermal, full CAM and fabrication qualification are still required. Public matching-revision publication is being verified under the standing authorization. **PROTOTYPE FABRICATION READY: NO.**

Matching revision0.0.45-alpha.0 is public and byte-verified: GitHub source commit `f6c4a8f49895e43591ec3aea869d5a0ddc530423`; tscircuit release `fafe46be-08ad-44f4-84d3-f1667e4ac8f5`. All303 anonymous package downloads and all303 immutable GitHub downloads have exact matching SHA-256. `PUBLICATION.json` records the2026-10-07T10:08:11.994Z receipt and the hosted build request; neither a successful hosted render nor fabrication readiness is claimed. Further routing candidates remain unadopted pending whole-board physical ground/clearance review.

## Revision 50 synthetic readback evidence correction

`bun run test:stusb4500-readback` passes seven reproducible fixture cases,
including correct 15 V acceptance and independently decoded 20 V / 1.5 A
rejection. Inputs are in `tests/fixtures/stusb4500/`; results are in
`evidence/rev-0.0.50-alpha.0/STUSB4500-SYNTHETIC-REGRESSION.json`. The earlier
20v_preferred test actually encoded 14.6 V and is retained as historical
wrong-voltage rejection evidence. No hardware programming/readback result
is claimed. Routing and all physical qualification continue.
