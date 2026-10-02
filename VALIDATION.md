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
