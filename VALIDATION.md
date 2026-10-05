# Current Linux continuation — 0.0.28-alpha.0, 2026-10-05

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
draft and a successful official request. Public matching publication is pending
verification; no hosted build success is claimed.
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
