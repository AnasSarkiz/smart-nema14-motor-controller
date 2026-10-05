# Smart NEMA 14 controller: complete Cloud handoff

## Current Linux continuation — 0.0.32-alpha.0

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

## Historical Linux continuation — 0.0.31-alpha.0

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

## Historical Linux continuation — 0.0.30-alpha.0

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

## Historical Linux continuation — 0.0.29-alpha.0

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

## Historical Linux continuation — 0.0.28-alpha.0

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

## Historical Linux continuation — 0.0.27-alpha.0

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

## Historical Linux continuation — 0.0.26-alpha.0

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

## Historical Linux continuation — 0.0.25-alpha.0

LED_STATUS_DRIVE now joins U1 pin 30 and R36 pin 1 through a supported manual
inner2 saved-phase path using the two existing named filled features. All 136
previous saved paths and all 47 filled-via declarations remain exact. No new
vias, imports, placement, logical wiring, dependencies or mechanics were added.
Fresh canonical copper: **227 traces / 188 vias / 70 pours**, **14 native
unconnected-port + 11 unfinished trace errors**, **67/82 physically complete
nets**. Strict geometry and foreign filled clearances pass. All six power/
reference nets stay joined; RTN stays isolated. USB reference/skew and RAW neck
analytical screens pass. Source netlist, shorts, imports, TypeScript and
formatting are checked in current evidence. All four current layer images were actually viewed; final power/thermal/USB, silkscreen,
3D/mechanical and fabrication-file qualification remain incomplete.
Canonical SHA-256: `ba082e485f73bbbae4bf0d2ea5a2f7e33bb09ada8466491caf05b422e91f58fc`.
Evidence: evidence/rev-0.0.25-alpha.0/LED-ADOPTION.json and cloud/canonical.
TMC enable Pipeline4/7 and LED Pipeline4 timeouts are retained without adoption.
Pipeline4 emitted intermediate TMC paths but timed out before final board JSON;
those paths still need correction and full qualification.
Public release d36a633c-2e68-4796-92e7-163ba4f00626 matches source/artifact commit
239712e457844af5146bc44e7655485f25db18e9: all 308 package files and eight GitHub files
passed anonymous checksum readback. Hosted build success is not claimed; see PUBLICATION.json.
Live EasyEDA availability still requires activation of the saved official-host draft.
**PROTOTYPE FABRICATION READY: NO.** Continue the 15 remaining nets and TASK.md.

## Historical Linux continuation — 0.0.24-alpha.0

The four-endpoint VBUS_ADC net is complete through supported L1 source star paths.
Two ordinary 0.30/0.60 mm transitions and two individually owned ADC filled/capped
features are recorded in ADC-ADOPTION.json; all prior 133 saved paths and 45 filled
features remain exact. There are now 47 matched filled features. Copper is
**228 traces / 188 vias / 70 pours**, **14 native unconnected-port + 11 unfinished
trace errors**, **66/82 physically complete nets**. Strict geometry and foreign
filled clearances pass; all six power/reference nets remain joined and RTN stays
isolated from GND. USB reference/skew and RAW lower-neck screens pass.
Source netlist, shorts, imports, TypeScript and formatting pass. All four current
layer images were viewed; silkscreen and full qualification remain pending.
Canonical SHA-256: `46da11d2673d74366c8754c221920d035bc6982debf27583f3dc2feb21214661`.
The native ADC iteration failures and a guarded SWDIO timeout are retained.
Current evidence: evidence/rev-0.0.24-alpha.0/cloud/canonical and ADC-ADOPTION.json.
Public 0.0.24 release 662718c8-fe2a-429d-aba6-f9dad467eb5e matches GitHub
source/artifact commit e8f060f16d6b7bd248b7cedb3d34684826a568a2. All 305 package
files and eight GitHub files passed anonymous checksum readback. Hosted build
success is not claimed. See PUBLICATION.json. Live EasyEDA availability
still requires runtime activation of the saved additive host draft.
**PROTOTYPE FABRICATION READY: NO.** Continue the 16 remaining physical nets and TASK.md.

## Historical Linux continuation — 0.0.23-alpha.0

CC2 now joins all three endpoints, retaining the native east/north trunk with
supported source corrections. All 131 earlier saved paths and 45 filled features
remain exact. Copper is **225 traces / 184 vias / 70 pours**, **18 native
unconnected-port + 11 unfinished trace errors**, **65/82 complete physical nets**.
Strict geometry, foreign filled clearances and all six power/reference networks
pass. EFUSE_RTN remains isolated from GND. USB reference/skew and RAW lower-neck
analytical screens pass. The exact new ordinary transition is at (3.68,-3.36).
Canonical SHA-256: `5f175dd056e620cc8c4a7e80bd96230ef3ceb9c565761ea18a3b923574aa2c80`.
Rejected CC2 trials and the ADC iteration exhaustion remain explicit in evidence.
Current evidence: evidence/rev-0.0.23-alpha.0/cloud/canonical and CC2-ADOPTION.json.
Public revision 0.0.23 release 7f0dc003-4806-42c6-9c2a-0ef83094b939 matches
GitHub source/artifact commit f0e07b440d7ef5c552ce2fd5da9159f1735f03e3.
All 304 package files and eight GitHub files passed anonymous checksum readback;
hosted build success is not claimed. See PUBLICATION.json. Live EasyEDA supplier access
still awaits runtime activation of its additive official-host draft.
**PROTOTYPE FABRICATION READY: NO.** Continue all remaining nets and TASK.md gates.

## Historical Linux continuation — 0.0.22-alpha.0

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
Public 0.0.22 release bb3f8367-b2e6-43da-853a-83499b0d5c83 matches
GitHub source/artifact commit e5da51db64da0743280c1d281e0a5fa6197a2cff.
All 302 package files and eight GitHub files passed anonymous checksum readback;
hosted build success is not claimed. See PUBLICATION.json. EasyEDA live supplier access
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
