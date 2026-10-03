# Current blockers — 0.0.13-alpha.0

The electrical draft now contains 111 parts on nine A4 sheets. Native placement has zero reported errors/warnings; routing is disabled until the earlier gates pass.

## B011 — Selected USB footprint mismatch: resolved for C5143397

GCT USB4110-GF-A B4 (2024-05-22) agrees with all 16 native lands, physical signals and both Ø0.65 NPTH holes. See USB-MANUFACTURER-FOOTPRINT-AUDIT.json. Old C165948/C3020560 discrepancies remain historical and those components are unselected. The external exact-part STEP now passes nominal registration; full cable/mount clearance remains blocked under B017.

## B012 — Imported symbol rendering: BLOCKING stage 2

C1974707 / ESDA25P35 ignores native schRotation=270: both zero-angle and rotated port vectors remain (0.8, 0) instead of the required (0, -0.8). An unchanged-import reproducer and failing regression are preserved. Core's React-symbol transform applies translation without rotation. C2965326/C94934/C1974707/C12067/C82045 also lack internal reference designator text; native board annotations identify them without editing definitions. A proper released importer/core fix is needed; rotation checks are not suppressed.

## B013/B006 — Startup, transient and braking qualification: BLOCKING stages 1/2

TPS259470L and unpowered SWD/ADC isolation are implemented. Current shunts are now 1 Ω, with a conservative peak-current screen about 0.336 A rather than the obsolete 180 mΩ proposals. Remaining work: bootstrap current budget, capacitor effective values/ripple, thermal/pulse ratings, protection tolerances/transients, contract-aware fault behavior and regenerative energy. The VBUS ADC measures upstream of the eFuse, not regenerative VM. The user reconfirmed the exact store motor rather than an external load envelope. The motor SKU alone does not bound load inertia, maximum speed, deceleration or backdrive energy; those operating limits remain unqualified. Reverse blocking is not a brake.

## B016 — Rear encoder arrangement: closed for the default open-loop review assembly

The selected motor has no rear shaft. The brief permits an unpopulated encoder; the review BOM now explicitly omits U4/C6. Their footprints remain optional, with no qualified magnet location or feedback claim. Relocating or enabling an encoder would require a new mechanical review.

## B017 — PCB/motor attachment: BLOCKING stages 1/3

The exact manufacturer's STEP is valid and unchanged. No rear thread/engagement/preload qualification is supplied for the structural fasteners. The PCB still has no mounting features or qualified carrier. A front-flange wraparound carrier using the known 4×M3 front pattern, or an independently qualified body clamp, can avoid altering rear structural screws; neither has been designed/approved for this assembly. Connector bodies, mating harnesses and support clearances must be checked together. Exploded +65 mm motor separation is display-only.

## B019 — Selected USB CAD inventory/registration: resolved; full assembly remains blocked

C5143397's official footprint is unchanged. The board attaches a byte-exact USB4110-GF-A TraceParts AP242 STEP from the public mjbots/fdcanusb mirror. GCT and Ultra Librarian require sign-in for the offered downloads; no account or access gate was bypassed. SOURCE.json records the public source, Git blob and checksum. The model is not claimed to be a direct authenticated GCT download.

The B4 drawing envelope, both locating pegs and all 20 physical landings align with the generated supplier holes/lands. Native rotation/origin is checked against actual GLB vertices as well as the BRep. `test:assembly` now passes the 112-model inventory and `test:usb-model` passes nominal connector registration. This closes model absence and nominal registration only. Carrier/support, mating-cable envelope, tolerance stack and physical assembly remain unqualified under B017.

## B020 — New supervisor and motor-connector import findings: avoided through official alternatives

C53283913's pin-3 square loses its 45° rotation; it is excluded and replaced by audited C5218924. Motor connector C265102 has 1.80 mm hold-down lands versus JST 1.50 ±0.10; C265332 and C157926 alternatives also differ from their reference layouts. These are excluded. C189895 uses its own unaltered footprint and passes the catalogue's specified dimensions. Mating harness/model placement and stock freeze remain pending.

## B018 — Publication destination resolved; upload verification in progress

The user authorized creation. Private GitHub repository `AnasSarkiz/smart-nema14-motor-controller`, branch `main`, received commit 9eb6e1a. The private tscircuit package is `AnasSarkiz/smart-nema14-motor-controller--01a0fd9b`. Its official CLI upload encountered HTTP 413 and uncertain request timeouts; supported gzip archive retries and exact-byte readback are required before declaring the release published. Current receipts will be recorded in VALIDATION.md.

## B022 — Large reference PDF transport limitation

The revision-12 full-reference upload cannot transfer references/TPS25947.pdf and references/TPS2660.pdf through the registry's request-limited inline/archive API. The original PDFs remain in GitHub and were used for validation. Revision 13 uses an explicitly scoped source/CAD registry distribution with downloaded reference PDFs/ZIPs kept in the full GitHub repository. This is not a fabrication-check exception. Exact current CAD assets must all upload and match before the source release is declared complete.

## B021 — Public store visibility pending explicit approval

Automatic approval review rejected the public-visibility choice as public disclosure without explicit authorization. Both resources remain private; the user has been asked to approve making the concrete prototype destinations public. No public release is claimed.

## B007/B008 — Stackup and remaining qualification

Select the target JLCPCB four-layer stackup, copper weight, impedance construction and manufacturing rules. Review every footprint/model, critical power loop, silkscreen, test-point access, and final placement against the actual mounting design. These checks are incomplete even though the native placement algorithm reports no violations.

## Historical issue records — superseded where stated above

# Current revision 0.0.9-alpha.0 issues

User-selected STEPPERONLINE 14HM11-0404S replaces Phidgets 3323_0.
B003/B014/B015 below describe the superseded Phidgets assembly only.
B011/B012/B013 and incomplete electrical/BOM work remain active.

## B016 — Encoder decision and single-shaft feedback: BLOCKING scope/placement

The selected motor has no projecting rear shaft. The previous AS5600/magnet
assembly cannot be reused. Encoder feedback is optional for stepping; open-loop
first prototype is recommended. User asked whether it is needed, but has not
approved removing or relocating the optional electrical draft. Stop dependent
encoder placement until this is resolved.

## B017 — Rear PCB attachment: BLOCKING stages 1/3

Exact official STEP and drawing acquired and inspected. Drawing specifies front
4×M3 / 26 mm holes, not rear screw engagement or replacement lengths. The STEP
rear corner fasteners do not alone qualify four posts. Previous two-post holes
and hardware removed from the active reference. Manufacturer fastener details or
an independently qualified carrier are needed; no assembled fit approval.

## B018 — Publication destination: BLOCKING remote updates

Standing workspace instruction requires GitHub push and matching tscircuit
publication. Local board Git has no remote; destination repository and branch
unknown. Package identity exists, destination/access not verified. Neither remote
updated; no repository is invented. Local revision/checksums preserved.

## Historical issues and continuing electrical blockers

# Issues and remaining work

Revision 0.0.7-alpha.0, 2026-10-03 local time.

## B001 - STM32 critical label loss: RESOLVED tooling issue

Part C2847904 / STM32G0B1CBT6, stage 2. Older bundled importer output lost
labels on physical pins 6, 7, 33 and 34. Global tscircuit was updated to
0.0.2729, then the component was regenerated with released `easyeda@0.0.360`.
Current aliases are VDD/VDDA, VSS/VSSA, PA11_PA9_ and PA12_PA10_.
The unchanged critical-label audit passes. Old outputs are preserved.
No manual component edits, pin overrides or generic replacements were used.
This is no longer a component blocker; full application qualification remains stage 2 work.

## B002 - TCPP control/fault label loss: RESOLVED tooling issue

Part C1121848 / TCPP01-M12, stage 2. Regeneration with released
`easyeda@0.0.360` restores physical pin 10 DB and pin 11 FLT.
The unchanged audit passes. No component definition was manually patched.
The complete sink protection circuit remains to be designed and reviewed.

## B003 - Exact rear assembly: BLOCKING mechanical qualification

Motor identity and drawing acquisition are RESOLVED in revision 0.0.8:
Phidgets 3323_0 / 35STH40-1004B, original official drawing and STEP.
Native diagnostic assembly uses only its two rear M1.6 locations on the
14.5 mm / 40 degree circle; front M3 locations are excluded from PCB holes.

Stages 1/3 remain blocked: proposed hardware is not sourced/qualified,
2.2 mm PCB clearance holes permit translation larger than the AS5600
0.25 mm axis allowance without an alignment/registration process, and final
motor/IO connectors and mating cables are absent. Nominal centering is
exact in the native PCB frame; actual physical centering is not established.
B014/B015 additionally block the requested 3D assembly approval.

## B004 - Complete schematic and BOM: IN PROGRESS

Stages 2 and 3. Six A4 draft sheets with 56 imported parts implement MCU,
encoder, CAN, logic buck, TMC2209 support and a USB/CC frontend. Downstream protected power,
programmer power, temperature, LEDs, termination and external connectors
remain unfinished. A partial schematic is not a functioning controller.
Verify each supplier import, pin/function, rating, footprint, model and assembler
inventory before accepting the complete BOM. C2 effective capacitance at 3.3 V
must be qualified; nominal 4.7 uF alone does not establish this.

## B005 - Official programmer power integration: PENDING DESIGN

Stage 2. `StandardJstSwdResetSide` pin 1 is VOUT from the programmer's voltage
selector, not an established passive VTREF input. Complete 3.3 V operation,
power isolation/backfeed handling and documented series resistors before wiring.
The required official package is retained; no custom connector is substituted.

## B006 - Motor current, thermal and regeneration envelope: PENDING DESIGN

Stages 1 and 2. Resolve RMS/peak convention against the exact motor,
load/speed/inertia, PD current budget, fallback and braking energy.
1.2 A/phase is an intended upper target, not a measured rating.
The 180 mOhm / 1 W sense draft has nominal 1.149 A RMS full scale and a
proposed 1.0 A firmware cap; it cannot qualify the 1.2 A upper target.
Preliminary buck/sense/bulk-energy calculations are in references/POWER-AND-MOTOR-REVIEW.md.
Motor bulk stores only 12.9 mJ extra between 20 V and 23 V nominal: it cannot
replace a regenerative-energy solution. Complete power-path/fault calculations
against the exact motor/load, then physical tests.

## B007 - Stackup and copper geometry: PENDING LATER STAGES

Stages 1, 3, 4 and 6. Choose the manufacturer's four-layer stackup, thickness,
copper weight and impedance construction. Current previews contain no PCB
geometry, so they cannot qualify trace width, drills, vias or power bottlenecks.

## B008 - Datasheet/package visual review: PENDING REVIEW

Earlier local ST PDF downloads failed; those diagnostics remain in revision
0.0.1 evidence. Current manufacturer PDF text was accessed through the web;
a working AS5600 PDF URL is now recorded in references/SOURCES.md.
Full rendered land-pattern and 3D registration review remains pending.
No missing component label is attributed to these download failures.

## Draft warnings reviewed

AS5600 and TMC2209 lack a `requires_power` classification. These two
metadata warnings remain visible. The official MCU importer now supplies
manufacturer pin attributes, including VSS ground classification; its prior
warning is resolved without manual edits. Independent generated-net checks
confirm U1 pin 7 to GND, U4 pins 1/2 to 3.3 V and U2 pins 15 to V3V3,
22/28 to VM and 3/18/29 to GND. Accept the remaining metadata warnings only
for this schematic draft; full application/footprint/fabrication qualification
remains open.

## Remaining fabrication stages

No PCB placement, routed shorts/DRC, routed snapshots, Gerbers/drills/assembly
BOM/CPL, assembler feedback or physical tests have been completed.
There are no routes to save or manually repair yet.

## B009 - Candidate import audit: C5127775 RESOLVED; library failures excluded

Stage 2. Official `tsci upgrade` completed, global tscircuit 0.0.2732 resolves
CLI 0.1.2230; board dependencies pin that CLI and EasyEDA 0.0.366.
Converter #587/#588 and CLI #5111 merge status was independently verified.
C5127775 regenerates as a native 0.18 Ω resistor with original pins/pads 1/2.
The preserved legacy generic file is excluded, not patched.
R5/R6 now use this genuine 180 mOhm/1 W/1% import.

C2046441, C5127782 and C723743 remain supplier-library unavailable.
Verified replacements imported through the official CLI:

- C19947652 / Bourns SRN6028C-3R9M: 3.9 uH; L1 now uses its own exact
  footprint. Manufacturer dimensions and preliminary ripple calculation reviewed.
- C5127775 / Milliohm HoLRT1206-1W-180mR-1%: replaces unavailable C5127782.
- C5127776 / Milliohm HoLRT1206-1W-150mR-1%: native 0.15 Ω electrical
  candidate for C723743; not instantiated. AEC-Q200 qualification is unestablished.

Audit passes raw resistance, exact supplier identities and all 67 physical
pin-to-pad mappings across these three parts plus regenerated MCU/TCPP01.
An isolated unrouted footprint fixture has zero placement errors/warnings.
This is not full 35 x 35 mm board placement. Current assembler stock, worst-case
current, resistor pulse/temperature ratings and complete-board qualification
remain pending. See evidence/rev-0.0.4-alpha.0/IMPORT-PIN-PAD-AUDIT.json and
IMPORT-PROVENANCE.json. No generated component was manually edited.

## B010 - Protected USB power path: IN PROGRESS

TCPP CTRLVBUS pin 6 was incorrectly reserved for a GPIO in the candidate plan;
it is now correctly identified as an analog OVP divider input. No incorrect
connection was wired. VBUS_INRUSH_OUT and VM are unsupplied draft interfaces.
Resolve default-5 V bootstrap, <=10 uF connector-side capacitance, controlled
bulk charging, reverse-current protection, OVP tolerances and regeneration
before connecting these supplies or enabling PCB routing. Imported TI C3662793
eFuse is an unused candidate; application/footprint qualification is pending.

## Latest-runtime recheck — revision 0.0.5

Global/local tscircuit are 0.0.2733, core 0.0.2052, CLI 0.1.2230, converter
0.0.366. Original C2046441, C5127782 and C723743 were retried through the
latest official importer; all fail with missing-library data and exit 1.
Their supported replacement draft still builds. C79815 and C465949 were
regenerated without edits; the two requires_power metadata warnings persist.
Critical-label checks, 86 physical-pin net checks and expanded 104 raw-symbol/
physical-port/pad mappings pass. Isolated fixture placement has zero errors
or warnings. B003-B008/B010 design/requirement work remains unfinished as
listed above; these are not resolved by dependency updates. Full per-blocker
status and logs: evidence/rev-0.0.5-alpha.0/BLOCKER-RECHECK.md.


## Selected alternatives — 0.0.6

C19947652 is selected for L1; C5127775 is selected for both R5/R6. Their own
unaltered official footprints are used. Original C2046441/C5127782 imports are
excluded and no active circuit requires them. C5127776 is the verified
150 mOhm electrical alternative for excluded C723743, retained unpopulated;
the active sense pair remains 180 mOhm. No AEC-Q200 claim is made.
Selection and remaining qualifications are recorded in
[evidence/rev-0.0.6-alpha.0/SUBSTITUTIONS.md](evidence/rev-0.0.6-alpha.0/SUBSTITUTIONS.md).

## B011 - USB connector footprint: BLOCKING component issue

C165948, Stages 2 and 3: imported shell slots 0.80 x 1.60 / 0.80 x 1.40 mm
versus HRO drawing 0.60 x 1.40 / 0.60 x 1.10 mm. Imported SMT land length
1.30 mm versus drawing 1.00 mm. Fresh official converter 0.0.368 preserves
the discrepancy; no manual footprint correction is allowed or applied.
GCT alternative C3020560 also imports 0.70 mm slot widths versus its 0.60 mm
recommendation (+/-0.05 mm drawing tolerance); it is unselected. Supplier
qualification or an officially imported alternative with verified lands is needed.
Dependent connector placement/fabrication work stops here.

## B012 - USB imported custom symbols: BLOCKING visual qualification

C2965326, C94934 and C1974707 lack internal reference text. Native board
annotations identify them in the draft without modifying imported symbols.
C1974707 still ignores chip schRotation=270 in rendered port geometry and
schematic-placement reports a remaining vertical-orientation issue. Pin/pad
links are correct; full Stage 2 visual qualification is blocked by these
import/runtime limitations. No warnings or checks are suppressed.

## B013 - USB power protection/startup: BLOCKING circuit qualification

U3 C1121848 threshold screen is 21.158-23.868 V with only 0.132 V margin to
its 24 V absolute limit at the high corner. This screen assumes unverified
R14 temperature behavior and omits dynamic overshoot/loading/leakage/aging.
The input TVS cannot guarantee a 24 V clamp. Unpowered VBUS ADC injection,
inrush/current/reverse protection, contract-aware shutdown and motor regen
are unresolved. Protected input stays disconnected from buck and motor.
See references/USB-PD-REVIEW.md and the recorded calculation JSON.

## Latest-runtime warning review - revision 0.0.7

Pin specification reports 11 warnings: Q_PD/D_VBUS underspecified; U4/U2,
J_USB/Q_PD/D_USB/D_VBUS lack requires_power; J_USB/Q_PD/D_VBUS lack
requires_ground. External high-side MOSFET and passive shunt ESD devices
need no separate VCC pin, and the MOSFET has no ground pin. Actual connector
VBUS/GND, ESD ground, TVS polarity and IC supplies are checked independently
by physical pin. Accept these metadata warnings only for draft connectivity,
not component or fabrication qualification. Missing symbol reference warnings
and D_VBUS orientation are recorded as B012, not silently accepted.
Original C2046441/C5127782/C723743 library failures still reproduce with
CLI 0.1.2232 / converter 0.0.368. The selected 3.9 uH/180 mOhm alternatives
remain valid imports; the 150 mOhm option stays unpopulated.

## B014 - Official Phidgets STEP / drawing shaft discrepancy: BLOCKING

Stages 1/3. Phidgets 3323_0 original STEP model is a valid BRep but its rear
shaft radius is 2.0 mm (4.0 mm diameter). Drawing 0DZ.252.001 and user lock
require 3.9 mm, tolerance +0/-0.15 mm. Rear projection and hole centers agree
with nominal drawing geometry; body 34.95 mm is below its 35.2 mm maximum.
Do not modify the model or substitute generic NEMA geometry. Manufacturer
clarification/corrected exact STEP or actual measured motor evidence is
required to resolve the discrepancy. Original files and measurements are
in references/motor/ and revision 0.0.8/OFFICIAL-MOTOR-STEP-CHECK.json.

## B015 - USB STEP / PCB registration: BLOCKING 3D qualification

Stages 2/3. Exact diagnostic CAD reports 0.358309 mm3 intersection between
unchanged C165948 STEP geometry and PCB after actual native imported
placement and drilled slots. Determine whether model origin, native CAD
placement or land geometry causes the mismatch before approving assembly.
This mechanical finding is not a new manufacturer footprint audit; that
audit remains gated until mechanics pass. B011 remains independently valid.
Never compensate by manually patching imported footprint/CAD metadata.
