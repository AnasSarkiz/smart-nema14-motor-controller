# Current manual fixes — 0.0.37-alpha.0

The native Gerber ground mismatch is resolved by moving the exactly owned C25
ground escape 0.13 mm in source. All four board-owned connector labels now pass
native CAM mask/width/outline measurements. All 82 nets remain connected, with
zero native errors/shorts and zero strict copper violations. Supplier outlines,
four orientation metadata gaps, sourcing, power/thermal and fabrication-process
qualification remain open. Read current VALIDATION.md, docs/EXPORT-BLOCKERS.md
and evidence/rev-0.0.37-alpha.0/. Preserve every official import and model asset.
**PROTOTYPE FABRICATION READY: NO.** No order authorized.

---

# Board fixes — 0.0.36-alpha.0, 2026-10-06

Updated released tscircuit; widened motor inner traces to 0.27 mm and corrected
CC1/CAN_RS clearances; replaced programmer R20/R21/R22 with official 100 Ω parts;
normalized native-build CAD paths by building at the runtime package root. All
421 purchased-pin wiring partitions and 111 placements are preserved.

| Review | Current result |
| --- | --- |
| Copper and connections | 82/82 native networks joined; zero strict copper, foreign-pour or native errors/shorts; 334 traces, 224 vias, 82 pours. |
| Widths | All 2,218 segments meet the 0.15 mm floor. Four motor nets pass the −20% width screen under the retained copper/thermal assumptions. Full loaded rails/barrels/thermal scope remains open. |
| Components and models | 108 fitted electronics, three exact DNP references. All 44 official import geometries pass 261 pin-to-pad comparisons. Fitted models and original assets are preserved. |
| Programmer | Correct five-pin J3 cable order, 100 Ω target series parts, independent reset, VOUT disconnected. Physical flashing/timing untested. |
| JLCPCB | Four selected fitted codes have no exact public stock result; assembler acceptance/allocation and four CPL rotations are unverified. |
| Fabrication | Native drill/BOM/CPL identity passes. Independent CAM finds a small inner GND export mismatch. Supplier silk still violates mask clearance/width/outline requirements. Stackup, plating and 68 owned filled/capped features need process confirmation. |

**PROTOTYPE FABRICATION READY: NO.** Complete evidence and exact canonical SHA
are in the current VALIDATION.md and evidence/rev-0.0.36-alpha.0/. The retained
0.0.35 review below records the earlier findings, including widths and resistor
values that this revision changes; it is not the current board status.

---

# Board review — 2026-10-06

Controller 0.0.35-alpha.0, unchanged design from source commit
`81296d8a2abd78fd02a035a74bee8344abe0350b`. Canonical Circuit JSON SHA-256:
`63076b482262db351ea8136616baf8afc8594d505a2a0932eb0c336d29395f53`.
Reports are in `evidence/rev-0.0.35-alpha.0/board-review-20261006/`.

**PROTOTYPE FABRICATION READY: NO.** This review finds additional ordering
blockers. It does not change components, supplier imports, footprints, pads,
placement or saved copper. No physical board or firmware has been tested.

| Requested review | Finding |
| --- | --- |
| Placement | Native check: zero errors/warnings. All 111 component centers, rotations and layers match the reviewed mounted CAD. Existing conservative component-body clearance is 0.600 mm minimum; carrier clearance is at least 1.000 mm. Connector/mating screens pass only their stated envelopes and tolerances; real fit is untested. Electrical high-current/decoupling and switching-loop placement is not fully qualified. |
| Component suitability | The manufacturer pin checks, original imports and bounded power screens remain applicable. The design is for STM32G0B1, TMC2209 and the exact 14HM11-0404S motor. U4/C6 encoder parts are DNP; the single-shaft motor has no qualified rear encoder. R50 termination is DNP except at a CAN bus endpoint. Full rated torque, arbitrary loads/backdrive and unconditional operation are not qualified. |
| JLCPCB availability | Refreshed all 43 exact identities in the indexed catalogue and official public Parts Library. Four fitted parts have no exact official public in-stock result; see below. Stock for shop procurement, indexed assembler inventory and allocated assembly stock are different. No allocation or assembler acceptance is confirmed. |
| Nets and operation | Exact canonical checks pass: 82/82 copper networks connected, zero unintended opens/shorts, zero strict copper or foreign-filled-pour violations. Native netlist on the exact published runtime reports zero errors/warnings. This establishes connectivity, not functional firmware or transient/thermal performance. |
| Standard JST programmer | Official package remains 0.8.0; five-pin J3 matches J_SWD. Thirty-eight physical pin/net assertions pass, including independent NRST and isolated VOUT. Use a straight-through five-way cable and separate target USB-C supply. Timing and physical programming are untested. See PROGRAMMING.md. |
| No board issues | Not established. Motor width tolerance, sourcing, programming timing, final CAM/silkscreen/orientation, loaded power/via/thermal and switching-loop qualification remain open. |

The top, bottom and both inner copper images were viewed during this review.
Crowded labels and labels beyond the outline remain visible. The narrow routing
corridors and partitioned inner reference plane require electrical review beyond
native geometry checks. Existing USB checks measure 0.381441 mm skew and ground
coverage of the signal core; the nominal impedance estimate is not controlled
impedance approval or complete high-frequency layout qualification.

## Manufacturing-tolerance finding

JLCPCB's official capability page is now reachable over HTTPS (200). It states
**±20% track-width tolerance**. The earlier motor-current screen used nominal
widths; that pass is explicitly superseded for manufacturing worst-case review.

Keeping the previous 15.2 micrometre assumed inner copper, 30 C rise IPC-2221
screen and 0.342448 A phase peak, a 20% width reduction gives:

| Motor net | Narrowest adjusted current screen | Required peak |
| --- | --- | --- |
| MOTOR_A1 | 0.329776 A | 0.342448 A |
| MOTOR_A2 | 0.310431 A | 0.342448 A |
| MOTOR_B1 | 0.329776 A | 0.342448 A |
| MOTOR_B2 | 0.329776 A | 0.342448 A |

Twenty-six internal wire segments fail this retained conservative screen. This
does not prove overheating on real hardware. It prevents claiming that all trace
widths are qualified. Under these same assumptions, nominal inner widths need
at least 0.263346 mm, approximately 0.27 mm before additional margin. Any widening
must use supported native source routes and pass clearance and connectivity
again; guaranteed fabricated copper and thermal behavior still require review.
Thirty native route-width warnings also remain unsuppressed.

The official page supports multilayer .15/.20 mm holes and offers epoxy
filled/capped processing. This resolves the earlier capability-page access
blocker. It does not confirm the order's exact four-layer process, 68 individually
owned filled features, selected stackup or minimum plating. The page's average
18 micrometre hole plating is not a guaranteed minimum.

## Exact parts requiring sourcing confirmation

| Reference | Exact part | JLCPCB code | Official public query result |
| --- | --- | --- | --- |
| U1 | STM32G0B1CBT6 | C2847904 | No exact in-stock result; pre-order entry reports zero stock |
| U2 | TMC2209-LA | C465949 | No exact public in-stock or pre-order result; indexed catalogue reports one unit |
| D_USB | TPD2EUSB30ADRTR | C94934 | No exact in-stock result; pre-order entry reports zero stock |
| Q_PD | STL11N3LLH6 | C2965326 | No exact in-stock result; pre-order entry exists with a separate stock figure |

The motor connector C189895 illustrates why these sources must not be combined:
the indexed catalogue reports six, while the public shop reports 46,617.
Neither query reserves assembly stock. No substitute part or modified import is
selected. Confirm the actual BOM quantity, procurement/assembly acceptance and
allocation before approving an order.

## Programmer qualification

Official five-pin contact order is VOUT, SWDIO, GND, SWCLK, NRST. Target VOUT is
intentionally disconnected. The programmer's SWD/reset logic is fixed 3.3 V.
TMUX1511 gates each signal separately until POWER_GOOD; asserting reset does not
disable SWD channels. The target uses 1 kilohm R20/R21/R22, versus the official
example's recommended 100 ohm SWD series resistors. No maximum rate is approved.
Initial low-speed bring-up, reset recovery, flash/verify and waveform checks are
required. The programmer cannot power this target or monitor its consumption.

Programming does not supply motor-control or USB-PD firmware. Motion requires
a qualified 9/12/15/20 V PD contract, default motor disable at 5 V, configured
current limiting, rail/fault checks and firmware interlocks. Those behaviors have
not been demonstrated on hardware.

## Tooling and remaining fabrication review

Native placement, source and shorts checks pass. Native pin-specification check
retains **27 metadata warnings** with zero errors; no official import is patched.
The CLI netlist command does not accept the canonical JSON argument directly.
A root-checkout source attempt hit a PCB-disabled routing error and was stopped;
the exact immutable published runtime source entry passes the native netlist
command with zero errors/warnings. Both failed attempts remain in the evidence.
The validated generated board JSON was not overwritten.

Final native Gerber/outline/mask/paste review and supplier orientation approval
for J_USB, LED_POWER, LED_STATUS and LED_FAULT remain pending. The older KiCad
conversion's errors are retained and are not fabrication approval. Full loaded
power paths, via current capacity, high-frequency transients, switching loops
and thermal spreading remain unfinished. Physical fit, power-up, flashing,
interfaces, motion and protection tests require an actual prototype.
