# Smart NEMA 14 controller: complete Cloud handoff

## Current Linux continuation — 0.0.22-alpha.0

CC1 is physically complete; all earlier saved paths and imported electronics
are preserved. Copper is **226 traces / 183 vias / 69 pours**, with **18 native
unconnected-port + 11 dangling-trace errors**, **64/82 physically complete nets**.
Strict geometry and foreign filled-copper clearances pass. All six power/reference
nets remain physically joined; RTN remains isolated from GND. The exact added
ground filled/capped feature and bottom RTN divider bridge are recorded in
CC1-ADOPTION.json and the manufacturing manifest; there are 45 named filled features.
RAW neck and USB skew/return analytical screens pass. Native netlist, shorts,
TypeScript, formatting, critical imports and the schematic-only draft test pass.
All four current layer images were actually viewed; crowded silkscreen and final
power/thermal/USB/mechanical/CAM qualification remain pending. Current canonical
JSON SHA-256 is `ad1089660085c886286b7cb4b47072aabdebe0f20ddcbba6a9635f2d3c1e9fe3`.
Public 0.0.22 publication is pending verification. EasyEDA live supplier access
still requires applying the additive official-host draft; absence of warnings
in the latest full build is not a supplier-availability check.
**PROTOTYPE FABRICATION READY: NO.** Continue TASK.md; do not stop at this checkpoint.

## Historical Linux step — 0.0.21-alpha.0

The Cloud setup/startup checks passed and the user authorized routing. This
revision fixes the measured RAW VBUS neck and completes TMC_UART_TX using
released native Pipeline4 geometry with supported source corrections.
Canonical copper: **226 traces / 181 vias / 64 pours**, **18 native unconnected
port errors + 11 dangling trace errors**, **63/82 physically complete nets**.
The UART uses ordinary 0.30/0.60 mm full-through vias. Strict emitted-copper
geometry and foreign filled-copper clearances pass with zero violations.
USB skew is 0.381441 mm; the adjacent-ground and approximate 91.812 ohm screens
pass, without establishing complete USB qualification. RAW VBUS neck width
is 1.455 mm; its IPC-2221 screening estimate is 1.390106 A at an assumed 30 C
rise and 0.0152 mm inner copper, versus 1.0714 A worst-case current limit.
This screen does not qualify all power paths, vias, transients or thermal behavior.

The exact canonical source/artifact hashes are in the refreshed context manifest.
Current evidence is `evidence/rev-0.0.21-alpha.0/cloud/canonical`; rejected native
trials are separately retained and are never fabrication candidates. All four
copper-layer images were actually viewed. Silkscreen crowding and incomplete
connections remain visible; final visual/manufacturing review is pending.
The canonical CLI retains 111 EasyEDA HTTP 403 supplier lookup warnings, even
though imported footprints remain intact and critical pin checks pass.
Cloud tscircuit login is authenticated as AnasSarkiz. Public revision 0.0.21
was verified against GitHub commit 9f2d6a33c195e13fc1df4e8a9529f9789c7c2610
and tscircuit release 500e4d7d-eb50-490e-96d8-7b8afd71c3c0: 290 anonymous
package-file downloads and five GitHub source/artifact downloads match. The
hosted build is queued, not claimed successful. See the current PUBLICATION.json.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining physical nets in TASK.md.

## Historical 0.0.20 resume point and intent

The user moved remaining routing to Codex Cloud after repeated Mac memory
exhaustion. Do not run further local Mac routing. The required outcome remains
a credible, fully routed **prototype fabrication candidate**, with matching
public GitHub/tscircuit source and circuit JSON; this handoff is not fabrication
approval. Read `docs/cloud/TASK.md` for the complete active task.

The continuation started from revision **0.0.19-alpha.0** (source commit
`da326ab9adcdbd3c623e665cc7e01b6d9529c7fc`, public build commit
`45ef75776d472373224b4cb9902775e099f7e107`), with 88 native unconnected-port
errors across 23 nets. The local repository's previous head was
`ce406b8b283032f5e7c5705a2d2d812665628399`. Revision **0.0.20-alpha.0** preserves
the subsequent checked copper, latest released dependencies and Cloud setup.
Source identity is the Cloud handoff commit and its manifest, not a historical
experimental filename alone.

Linux installation and context checks passed in GitHub Actions run
[37292488424](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37292488424).
The public tscircuit 0.0.20-alpha.0 snapshot was uploaded and all 500 package
files read back with matching hashes. Codex Cloud itself is not yet activated;
the browser requested sign-in and no environment ID is confirmed.

Public destinations:
- https://github.com/AnasSarkiz/smart-nema14-motor-controller (`main`)
- https://tscircuit.com/AnasSarkiz/smart-nema14-motor-controller--01a0fd9b

## Exact baseline and authoritative files

`index.circuit.tsx` now exports `src/SmartNema14MotorController.tsx`, which
promotes the checked power-trial226 board wrapper. Experimental power-trial
entry points delegate to that same wrapper. The default **replays saved copper**
and does not start a new remaining-net search. All missing-port/dangling errors
remain in native output. It is an explicitly incomplete prototype preview, not
a disabled-DRC or fabrication build. Route selected nets with explicit phase-1
net assignment and selectors; full-board attempts are not the default.

The pre-handoff upgraded baseline is
`evidence/rev-0.0.20-alpha.0/toolchain-upgrade/circuit226.json`, SHA-256
`1c5a4a58749f8a7e97eabdb31c9f7474219d5871cd74057844194d775b44df33`.
The fresh canonical handoff build is `dist/index/circuit.json`, also mirrored at
`build/routing-review/circuit.json`; its exact hash and source inventory are in
`docs/cloud/CONTEXT-MANIFEST.json`. Never hand-edit generated circuit JSON.

Checked baseline: **225 pcb_trace records, 179 vias, 65 pours**, **20 native
pcb_port_not_connected_error records**, **11 pcb_trace_error records** for
unfinished escape ends. Native record count is not a count of individual
unconnected pins. Independent physical filled-copper review found **62/82 nets
complete**, zero foreign filled-copper clearance violations. Strict geometry
review found zero violations at its recorded thresholds. Those results do not
complete DRC, current, thermal, USB, visual or fabrication qualification.

Remaining physical nets (number of separate physical conductor groups):

| Net | Groups |
| --- | ---: |
| I2C_SDA | 4 |
| TMC_ENABLE_N | 3 |
| TMC_DIR | 3 |
| TMC_UART_TX | 2 |
| PD_CC1_CONN | 2 |
| PD_CC2_CONN | 2 |
| VBUS_ADC | 4 |
| SWDIO_GUARDED | 2 |
| SWCLK | 3 |
| TEMP_ALERT_N | 3 |
| EXT_STEP_CONN | 3 |
| EXT_ENABLE_N_CONN | 3 |
| EXT_DIR | 3 |
| EXT_ENABLE_N | 2 |
| LIMIT1_CONN | 3 |
| LIMIT1 | 3 |
| LED_STATUS_DRIVE | 2 |
| CAN_RS | 3 |
| EFUSE_FLT_N | 3 |
| POWER_HIGH_CURRENT | 3 |

GND, EFUSE_RTN, VBUS_CONN, VBUS_PROTECTED, VM and V3V3 are each physically joined
in the baseline. CAN_TX, NRST_GUARDED, SWCLK_GUARDED and TMC_UART_RX were completed
during continuation. Verify the actual all-net report rather than inferring
completion from saved path net names.

The original local tscircuit skill and its bundled references are synchronized
under `.agents/skills/tscircuit/`, since personal local skills do not automatically
travel to Cloud. Read its current-handbook requirements; archived local code
guidance is not a substitute for checking the current official handbook.

Current source copper:
- `src/routing/PowerSavedRoutesTrial.tsx` and
  `power-guarded-paths-trial.json`: 57 saved net names, 128 native paths; a saved
  net may still need branches. Native phase 0 replays supported pcbTracePaths.
- `PowerCopperTrial.tsx`, `power-pour-trial.json`, `vm-fanouts-trial.json`,
  `single-layer-signal-branches.json`: actual native pours/branches/power fanouts.
- `FilledSignalEscapes.tsx`, `filled-signal-vias-trial.json`,
  `thermal-vias-trial.json`: individually declared manufactured features.
- `GroundReturns.tsx`, USB routes/reference modules and shared placement in
  `src/mechanics/preview-placement.ts`.

## Toolchain and native routing behavior

`tsci upgrade` was run. Global startup initially failed from stale transitive
packages and was corrected using released packages; local lockfile pins the
reproducible board toolchain:

| Package | Version |
| --- | --- |
| Bun | 1.3.9 |
| tscircuit | 0.0.2744 |
| @tscircuit/cli | 0.1.2237 |
| @tscircuit/core | 0.0.2090 |
| @tscircuit/props | 0.0.688 |
| capacity-autorouter | 0.0.958 |
| checks | 0.0.239 |
| circuit-json | 0.0.517 |
| easyeda | 0.0.371 |
| runframe | 0.0.2908 |
| modelprinter | 0.0.8 |
| TypeScript / Biome | 5.9.3 / 2.5.15 |
| Shapely / CadQuery | 2.1.2 / 2.8.0 |

Core's older modelprinter dependency lacked getNemaMotorReferencePoints; the
released 0.0.8 dependency resolves startup. No dependency monkey patch exists.
Imports for STM32 C2847904, TCPP C1121848 and resistor C5127775 were fixed
upstream (converter #587/#588 and CLI #5111); do not reopen as component blockers
or manually patch definitions. Official imported replacement candidates were
C19947652 for unavailable C2046441, C5127775 for C5127782, and C5127776 for
C723743; retain the actual reviewed selection/BOM, not this historic candidate
list as a new change request. C5127775 is 0.18 Ω with both pads preserved;
C5127776 AEC-Q200 qualification was not established.

The last native remaining-net attempt was native229, selecting PD_CC1_CONN and
PD_CC2_CONN. Public autorouting:start recorded **Pipeline9_PreloadedTraceGraph**,
2 connections and **6628 obstacles** after poured geometry. It produced no
phase-1 output before stopping; do not adopt nonexistent routes or call this a
successful build. native227 had selectors but no net phase assignment (no new
routes). native228 assigned nets but the attempted phase autorouterVersion was
unsupported and stripped. The correct version belongs on `<board>`; the current
wrapper uses beta_pipeline9 when selected routing targets exist. Selected
`<net>` elements require routingPhaseIndex 1. Native phase-1 new ordinary via
minima are now explicitly 0.30/0.60 mm; global 0.15/0.38 accommodates only named
filled/capped historical features.

The CLI also logged a saved-route serialization ambiguity for
`.D_USB > port.pin1` in native227. The official import audit passes; do not
patch the TVS component to satisfy that helper. Inspect public native phase-end
paths and exact port selectors before adoption, and report a tooling defect if
necessary. This is distinct from the accepted cosmetic symbol rotation.

`scripts/run-native-routing.mjs` uses the public Circuit API and records native
start/end/error events, circuit JSON and nonzero errors. Public phase-end
pcbTracePaths can be adopted into source after independent geometry/connectivity
checks. `scripts/run-cloud-routing.py` supervises one Linux job and records
resource termination without changing the router or masking DRC.

Older experiments used bounded Freerouting 2.4.1; **the user explicitly replaced
that approach with native tscircuit routing**. Historical interchange scripts
and evidence remain for provenance only. Do not install/launch Freerouting,
copy its Java runtime, or switch back when native routing is difficult. A
possible native planning improvement is deferring filled-pour planning in
source while reserving real power/USB corridors, then restoring fills and
revalidating actual copper; this is an unimplemented idea, not a passed fix.
Never hand-edit router/generated JSON or copy a custom routing algorithm.

## Electrical, manufacturing and power context

The exact motor is 0.4 A/phase, 25 Ω, 24 mH, 0.9° steps. Existing 1 Ω TMC2209
sense resistors imply approximately 0.34245 A peak / 0.24215 A RMS under the
reviewed model. PD operating selections are 9/12/15/20 V, ≤21 V, ≥1.5 A source;
5 V boot has motor off. eFuse boot limit 0.5 A, normal 1 A, tolerance worst case
1.0714 A. Logic budget 0.15 A boot / 0.30 A normal. These are analytical intended
limits, not physical measurements. The prior 300 RPM / 0.25e−6 kg·m² inertia /
no continuous backdrive envelope is an assumption needing explicit disclosure;
the user specified the motor, not a measured load/braking duty.

Stackup target JLC04161H-3313, nominal 1.6 mm (about 1.56 mm stack), 35 µm outer
and 15.2 µm inner copper, top-to-L2 dielectric 0.0994 mm, εr about 4.05.
Ordinary new vias: 0.30/0.60 mm, annular ring ≥0.15 mm, full four-layer through
span, drill-to-pad ≥0.35 mm including same net, drill-to-drill ≥0.35 mm. Tracks
≥0.15 mm, trace-to-pad ≥0.10 mm, ordinary copper spacing ≥0.15 mm, edge ≥0.30 mm,
mount keepout radius 2.5 mm. Strict checks name each permitted thermal/filled
feature; they are not a general same-net via exemption.

Filled/capped features require IPC-4761 Type VII epoxy fill and copper cap,
ENIG, exact owner/pin/position/drill/pad, foreign drill-to-pad ≥0.25 mm (ordinary
filled escapes ≥0.35 mm). The 43 named signal/power features and 5 thermal vias
must match the emitted geometry exactly; verify counts from manifests. The
final CAM process/quote still needs verification. Published 18 µm average via
plating is not a guaranteed minimum plating specification.

Known pending power questions:
- Some explicit branch requests of 0.28/0.40 mm historically emitted 0.15 mm.
  Measure the actual output and fix the supported source path width; never
  reduce requested current/width or accept configuration as proof.
- RAW VBUS lower neck near ILIM escape (-3.1,-15.8) was about 0.945 mm inner
  copper, approximately 1.02 A at the 30°C analytical rise assumption, below
  1.0714 A worst-case limit. This is a real unresolved width/current concern.
  A precisely declared filled/capped escape could release space, but no such
  change has yet been made or qualified.
- RAW_FLT_BRIDGE_S (-14.2,-11.7) and N (-13.88,-10.1) are ordinary 0.30/0.60
  through vias with an inner2 power bridge of nominal 1.3 mm. One via each is
  not automatically adequate from an average-plating calculation; review
  bottlenecks/parallel vias and minimum plating.
- IPC estimates: outer 0.28 mm ≈1.289 A at 20°C rise; 0.40 mm ≈1.67 A;
  0.15 mm ≈0.82 A. Inner 1.0 mm ≈1.059 A at 30°C rise, below worst-case limit;
  1.3 mm offers more margin. A 0.30 mm / 18 µm average barrel estimate ≈1.14 A
  at 30°C is not a manufacturing guarantee.
- TMC winding routes and three EP ground thermal vias need actual thermal
  spreading review. Full connectivity alone does not prove thermal capacity.

eFuse RTN lower-divider inner2 corridor was explicitly preserved from
(0.8,-14.9) via (0.8,-12.5),(-0.1,-12.1),(-1.5,-11.9),(-2,-12.1),(-3.6,-12.1),
(-4.3,-11.3) to (-4.5,-7.75), nominal 0.18 mm. EFUSE_RTN must never join GND.
OVP uses U10 **pin12**, not pin11 NC. The completed OVP path joins the reviewed
R42/R43 divider and native saved geometry. FLT still has three physical groups.

## USB and mechanics context

The last USB194 measurement: D+ 25.135517 mm, D− 24.754076 mm, skew
0.3814407 mm ≤0.5 mm. Common trunk 12.5268 mm, width 0.1537 mm, gap 0.1999 mm;
the analytical stack estimate was 91.812 Ω differential. It is not a field
solver, coupon or hardware SI result. Reference coverage passed then; rerun the
actual current copper after all routing/pour changes. TCPP sits roughly 25 mm
from USB; physical ESD performance remains untested.

The original Phidgets rear shaft / two M1.6 encoder-hole requirements and
HOLRY discussions are superseded by exact STEPPERONLINE 14HM11-0404S. Official
STEP is `references/motor/14hm11-0404s/14HM11-0404S.STEP`: maximum body about
35.2 mm square ×28.2 mm, front shaft Ø5 mm / 24±1 mm, front 4×M3 at ±13 mm,
minimum thread engagement drawing requirement 4 mm; no rear shaft. Do not
invent rear mounting threads or rely on generic NEMA14 geometry. Encoder U4/C6 are DNP. R50 is independently DNP by default as the CAN
termination link, populated only at bus endpoints; it is not an encoder part.

Front carrier: 6061 rails, envelope 49.2×36.5×3 mm; 6×6 mm rails at x±21.6,
y±15.25, separate four PCB supports. Keep the chosen exact mechanical design.
The cover was moved upward for visibility in the preview; an exploded preview
is not a measured assembled clearance.

Connector orientation retained:
- USB top (0,-12.7), PCB rotation 0°, outward −Y; GCT USB4110-GF-A CAD X90°,
  Z offset −4.89 mm. C5143397 imported footprint checked against manufacturer
  B4 drawing; exact external manufacturer 3D is allowed, footprint edits are not.
- Motor GH top (-1.75,11.9), rotation 180°, outward +Y.
- I/O bottom (14,4), rotation 90°, CAD Y180°/Z270°, outward +X.
- SWD top (14.4,-8.4), rotation 90°, outward +X.

Earlier analytical cable margins: USB 2.233 mm, motor 2.064 mm, SWD 1.038 mm,
I/O 0.164285 mm (tight; real mating-fit testing pending). Repeat connectors,
standoffs, carrier, board and model together in 3D. A footprint/manufacturer
mismatch blocks fabrication; do not compensate by editing a supplier import.

Routing-required placement changes since19 were U3 to (-11.5,11) bottom;
R24 x5.5, R25 x6; C31 rotation180; R39 y−13.2; R42 (0,−12.8) rotation90;
R43 (0.4,−15.85) rotation180; R44 (−1.85,−16.19) rotation180;
C33 (0.8,−6.5) bottom rotation180; Q_PD y−2.63; C15 x−3.5;
C22 (−8.4,10.9) bottom rotation180. These clear real pads/copper; regression
checks are still required. L1, connectors, outline and carrier were retained.
Some legacy prose/mechanical metadata still describes earlier rear mounting or
routing-disabled stages; reconcile it before a final release rather than
silently treating it as current.

## Evidence and checks

Existing tracked `evidence/` and `references/` retain previous reviews,
datasheets, raw official supplier libraries, model audits, schematics and
mechanical documentation. New rev20 trial evidence is preserved in
four `docs/cloud/routing-history-rev20.tar.gz.00*` parts; their manifest hashes
every archived file. Run `python3 scripts/restore-routing-history.py` only when
needed; it verifies and extracts into a separate evidence/archived-rev20 folder. The
archive contains historical failed experiments, not approved fabrication files.
Latest baseline and toolchain reports are also available directly under
`evidence/rev-0.0.20-alpha.0/toolchain-upgrade/`. Binary runtimes, node_modules,
Mac venv, publishing credentials and temporary lock files are not context.

The following checks use actual geometry, not router success alone:

```bash
bun run typecheck
bun run format:check
bun run validate:imports
bun node_modules/@tscircuit/cli/dist/cli/main.js build index.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs
.mechanical-venv/bin/python scripts/check-copper-geometry.py dist/index/circuit.json evidence/current/GEOMETRY.json src/routing/thermal-vias-trial.json src/routing/filled-signal-vias-trial.json
.mechanical-venv/bin/python scripts/check-filled-copper.py dist/index/circuit.json evidence/current/FILLED.json ALL_NET_NAMES_HERE
.mechanical-venv/bin/python scripts/measure-usb-paths.py dist/index/circuit.json evidence/current/USB.json
.mechanical-venv/bin/python scripts/review-usb-return.py dist/index/circuit.json evidence/current/USB-RETURN.json
```

Create evidence/current first. Replace ALL_NET_NAMES_HERE with **all 82 actual
source-net names**, not literal text; the default filled check only considers
GND/RTN and is insufficient for final connectivity. Current incomplete builds
must exit nonzero. Run required native netlist/pin/source/schematic-placement/
placement/shorts/snapshot commands and meaningful board tests from the copied
workspace instructions; record errors rather than substituting weaker checks.

Fresh canonical output also retains 111 supplier-footprint lookup failure
warnings, 29 trace warnings, 14 no-power-pin, 7 no-ground-pin, 6 underspecified
pin, 5 reference-designator and 5 schematic-styling warnings. These are not
suppressed. The actual official imported geometry audit passes; live supplier
lookup failures must be investigated with working Cloud network access, not
misreported as patched component defects. Review each other warning before final
fabrication qualification. Native trace warnings can expose requested-versus-
emitted width issues; current-capacity qualification is still pending.

The isolated all-imports audit requires the existing supplier fixture manifest
in `evidence/rev-0.0.13-alpha.0`, not a missing rev19 manifest. Build
`scripts/all-imports-audit.circuit.tsx` fresh, then run
`node scripts/check-all-imports.mjs evidence/rev-0.0.13-alpha.0`.
The initial upgraded audit failed from a missing fixture path, not bad parts;
do not fabricate a fixture or weaken comparison. Fill/thermal negative tests
must supply both manufacturing manifests. No final four-layer visual inspection
or full latest qualification has yet passed.

## Decision history and superseded requests

Original pasted specification is `docs/context/ORIGINAL-REQUEST.md` and is
historical source material. Current human steering in TASK/AGENTS wins where
requirements changed. Earlier screenshots compared HOLRY lead-screw motors and
Phidgets rear screws; the later STEP/model-based decision locked STEPPERONLINE.
The user approved alternatives/importer fixes, asked for rotated outward-facing
connectors, an assembled TSX/3D preview, public GitHub/tsci publications and
matching circuit JSON, and explicitly rejected treating cosmetic TVS rotation
or future physical tests as reasons to stop PCB work. A previous tsci release
failed because its cloud infrastructure exceeded running-container capacity;
that log was not evidence of a board-code defect.

Final fabrication candidate is still **NO**. Stage 7 physical testing remains
pending. Once routing is genuinely complete, rerun every gate, inspect each
layer/3D/exports, publish matching checked artifacts and report the required
status. Do not stop merely at a lower connection count, pretend historical
source aliases replay immutable historical geometry, or confuse repo readiness
with a published/running Codex Cloud environment.
