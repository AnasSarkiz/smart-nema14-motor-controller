# Active owner requirement — two USB-C ports / 15 V motor power

Current implementation, electrical interlock and routing evidence are in
`docs/REV50-TWO-PORT-ROUTING.md`. Read it before continuing. Finish raw/protected
VBUS and VM power first, then PD/eFuse controls, then USB data with its return
path, then all remaining required nets. Revision48 is historical;
exact publication status is recorded by the receipts in VALIDATION.md.

Revision0.0.50-alpha.0 continues the RP2040/STUSB4500/MCP2515 board. The latest
owner instruction requires separate USB-C motor PD POWER and COMPUTER DATA ports.
Motor power must prefer exactly15V (remove the active20V PDO in STUSB4500 NVM,
program/read back and document the procedure). Data-port5V must stay electrically
isolated from high-voltage PD VBUS and must never energize the motor. Verify
RP2040 data VBUS sensing, logic startup and hardware motor inhibition until a
valid15V contract. Use additional official imported parts and necessary connector
placement changes, retaining35x35mm4layers, motor and front carrier where possible.
Requalify electrical pin tables, exact models, actual assembly/cable/hole fit and
placement before dependent routing. Earlier one-port/four-connector freezes below
are historical and superseded only as needed for this two-port architecture.

The pre-change routing is preserved in evidence/rev-0.0.49-alpha.0/qualified-source
and routing/manual160:69/108 networks,102 source paths,92 ordinary0.30/0.45mm vias,
nine pours,217 opens,zero other native/strict errors,all69 includingGND physically
joined. Do not throw away unchanged qualified work or replay legacy STM32 copper.
Finish every required connection using one bounded nativePipeline9 job at a time
and supported manual source paths. No unchanged repetitive timeouts, generated
JSON edits, vendor patches, lowered DRC or substitute routers. Verify/install latest
released coherent tscircuit/CLI/core/router/converter with Bun lockfile. Preserve
all imports/models/evidence. Complete power/USB/thermal/freshCAM/stock/assemblyquote
gates and matching public GitHub/tscircuit source/JSON/CAD publication. Do not stop
at a partial checkpoint. PROTOTYPE FABRICATION READY:NO; no fabrication order.

---

# Active routing — 0.0.48-alpha.0

Read docs/REV48-ROUTING-CHECKPOINT.md, VALIDATION.md and the manufacturer review
in docs/REV45-PRE-ROUTING-REVIEW.md. The checked native replay connects64/108 nets:
97 tracks,79 ordinary0.30/0.45mm through vias,eight pours and227 open ports;
zero other native errors or strict copper violations. GND is one physical
network. Programmer/ADC/CAN select/interrupt routes are saved and manually
corrected. R_CAN_CS moves to bottom(1.5,-0.2), rotation0; C31 remains original.
Actual current CadQuery and mounted146-mesh review pass. Continue one bounded
selected-net native Pipeline9 job at a time; save qualified source paths and
manually correct actual DRC. All44 remaining nets, current/thermal/USB/fresh
CAM/assembly quote remain open. Preserve imports/models/history, exact motor,
connectors, outline and carrier. Publish completed checked prototype steps
with exact JSON/CAD bytes under standing authorization. FABRICATION READY: NO.

---

# Historical revision47 continuation

# Active routing — 0.0.47-alpha.0

Read docs/REV47-ROUTING-CHECKPOINT.md, VALIDATION.md and the manufacturer review
in docs/REV45-PRE-ROUTING-REVIEW.md. Current canonical copper connects54/108 nets:
85 tracks,56 ordinary0.30/0.45mm through vias,nine pours and249 open ports;
zero other native errors, native shorts or strict copper violations. GND has
one physical network. CAN TX/RX and one top-only motor winding are now saved.
Continue one bounded selected-net Pipeline9 job at a time, save qualified source
paths and correct actual DRC manually. Input-only diagnostics and public SDK
pre-repair capture never imply solved or qualified routes. All remaining54 nets,
loaded widths/USB/reference/thermal/fresh CAM and assembly quote remain open.
147 references/146 fitted genuine CAD records are unchanged from revision46.
Preserve original supplier imports/models/evidence, exact motor, connectors,
outline and carrier. Publish completed prototype steps with exact Circuit JSON
and CAD bytes under standing authorization. PROTOTYPE FABRICATION READY: NO.

---

# Historical revision46 continuation

# Active continuation — 0.0.46-alpha.0

Read docs/REV46-ROUTING-CHECKPOINT.md, VALIDATION.md and the manufacturer review
in docs/REV45-PRE-ROUTING-REVIEW.md. Current exact canonical copper connects
51/108 nets:82 tracks,52 ordinary0.30/0.45 mm through vias,nine pours and255
native open ports; zero other native errors or strict copper violations.
All147 references /146 fitted models /12 ICs pass actual CadQuery checks.
Fresh official stock checks pass all54 exact identities; allocation/quote pending.
Two C1570 30pF loads replace four parallel15pF loads and keep native CAN clocks
under10mm with zero vias. Three native placement orientation suggestions and
one disclosed imported TVS schematic rotation finding remain explicit.
Continue one changed bounded selected-net Pipeline9 job at a time, save qualified
source paths and correct actual DRC manually. Finish all copper, outer power
where feasible, USB return/impedance, current/thermal and fresh CAM/assembly
qualification. Preserve official imports/models/history, exact motor, outline,
four connectors and carrier. Publish completed prototype steps with matching
fresh Circuit JSON and original CAD hashes under standing authorization.
PROTOTYPE FABRICATION READY: NO. No fabrication order is authorized.

---

# Historical revision45 handoff

# Active user redesign — 0.0.45-alpha.0

The user authorizes RP2040, dedicated USB-PD, functional buzzer and all review
fixes. Read docs/REV45-PRE-ROUTING-REVIEW.md and docs/RP2040-USB-PD-REDESIGN.md.
Stage2 static manufacturer/BOM and Stage3 initial placement/CadQuery review now
permit bounded selected-net Pipeline9 routing. Exact saved stock snapshots are
positive for all 53 current identities; the exact official GET refresh at
2026-10-07 06:47UTC passes all53. PCBA quote/allocation remain pending. The unchanged imported TVS schematic-rotation finding is retained and
must not block independent PCB work under the user's explicit instruction.
The canonical source now includes checked partial RP2040 routes; generated
canonical JSON must be rebuilt before publication. Never replay historical STM32 routes. Preserve official imports,
historical copper/models/evidence, exact motor, outline, connectors and carrier.
All 12 ICs / 148 fitted genuine STEP models pass CadQuery. Stage4/5/6 remain
unfinished. PROTOTYPE FABRICATION READY: NO.

---

# Smart NEMA 14 controller — Cloud continuation

Use the repository-synced tscircuit skill at `.agents/skills/tscircuit/SKILL.md`.
Read `CLOUD_HANDOFF.md`, `docs/cloud/TASK.md`, `VALIDATION.md`, and
`docs/context/WORKSPACE-INSTRUCTIONS.md` before changing the design. This public
repository is the dedicated board directory from the original workspace. Work
inside this checkout; do not create a second board or rebuild the store app.
The source revision before this continuation was 0.0.19-alpha.0.

The latest human instruction moves routing to Codex Cloud because local Mac
routing exhausts memory. **Do not run remaining-net routing on macOS.** Use only
tscircuit's native autorouter, in bounded selected-net jobs. Do not resume
Freerouting, repeat unchanged full-board attempts, or spawn parallel routing
jobs. Use `scripts/run-cloud-routing.py` on Linux, with a fresh evidence folder.
Inspect failure logs and change the actual routing approach before retrying.

Keep the exact STEPPERONLINE 14HM11-0404S, existing imported component selection,
35 × 35 mm four-layer outline, connector placement, and front carrier. Document
any change necessary for a real routing/manufacturing defect. The earlier
Phidgets/HOLRY/rear-shaft proposals are superseded. U4/C6 were removed by the user in revision 0.0.40-alpha.0; the
single front-shaft motor has no encoder arrangement. Retain R2/R3 for U9 I2C.
Revision 0.0.41-alpha.0 selects official C2150710 TMC2209-LA-T and C97502
TI TPD2EUSB30DRTR by user request. Preserve their original supplier definitions.

All purchased electronics must retain official JLCPCB imports. Never create,
recreate, or patch imported symbols, footprints, pins, or pad mappings. Resolve
importer bugs upstream or use the verified released converter. The TVS symbol's
rotation is a disclosed cosmetic issue, not permission to alter its footprint.
Native board structure, wiring, mounting holes and copper features are allowed.

Do not hand-edit generated circuit JSON, suppress DRC, weaken checks, patch
dependencies, introduce type escapes, or claim a visual inspection without
viewing the rendered output. Consult the current tscircuit handbook and the
installed CLI help/types before using an unfamiliar API. Keep the canonical
entry point `index.circuit.tsx` declarative. Bun and the checked lockfile are the
project's package manager; do not silently switch tools.

Keep eFuse EFUSE_RTN electrically isolated from GND. Small filled/capped vias
are allowed only when individually declared in the reviewed manufacturing
manifests with exact owners. The user's latest requested ordinary via size is
0.30 mm drill / 0.45 mm pad / 0.075 mm radial annular ring, matching JLCPCB's
published preferred diameter difference. Preserve every independent spacing
check. The 66 small filled features belong to the historical STM32 board; the current
RP2040 candidate uses only ordinary 0.30/0.45 mm through vias. Do not let the autorouter's board-wide
minimum for named filled features become an undeclared blanket exception.

Finish the remaining nets, then run every qualification gate in the task and
workspace instructions. Stage 4/5/6 remain incomplete. Firmware and physical
testing later do not excuse stopping before a credible prototype fabrication
candidate; neither do automated checks establish production/hardware validation.

Public GitHub repository: `AnasSarkiz/smart-nema14-motor-controller`, branch `main`.
Public tscircuit package:
`AnasSarkiz/smart-nema14-motor-controller--01a0fd9b`.
The user has authorized committing/pushing each completed board step and
publishing its matching prototype revision to both public destinations. Include
fresh generated circuit JSON, verify the exact remote checksum and public
access, and record outcomes in VALIDATION.md. No authorization to merge PRs or
place fabrication orders is implied. If Cloud lacks publication credentials,
report that exact publication blocker; never copy Mac Keychain/session tokens
into this repository. Do not assume a local commit is published.

Publication must include the unchanged local OBJ/STEP/STP assets referenced by
Circuit JSON, together with imported source modules. Before publishing, run
`node scripts/check-publication-cad-assets.mjs dist/index/circuit.json PACKET_INVENTORY.json`.
Any omitted model dependency blocks publication; verify uploaded asset hashes.

Use GitHub account AnasSarkiz. Prefer the authenticated connector. Cloud doesn't
have the local Mac Keychain; use its configured GitHub integration. Respect all
remaining validation gates and standing publication requirements in the copied
workspace instructions.

Every new revision must state its unresolved errors, incomplete checks and
untested prototype status. Required final board report: unconnected-port count,
completed nets, trace/via/pour counts, DRC, power, USB and fabrication review,
remaining blockers, and **PROTOTYPE FABRICATION READY: YES/NO**.
