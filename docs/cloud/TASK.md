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

# Active RP2040 / autonomous USB-PD continuation — revision45

Read root AGENTS.md, VALIDATION.md and docs/REV45-PRE-ROUTING-REVIEW.md.
The partial canonical build has44/108 physically joined nets,63 traces,
36 uniform0.30/0.45 ordinary through vias,7 pours and283 native open-port errors.
There are zero other native errors or strict copper violations in that partial
build; full connectivity and fabrication qualification remain incomplete.

All53 exact parts have fresh positive official JLCPCB stock/SMT checks.
Quote/allocation remain pending. All12 ICs /148 genuine STEP models pass actual
CadQuery checks. Ten moved USB/bypass/crystal parts pass renewed native placement
and actual mounted148-mesh nominal envelope clearance. The coherent latest
released tscircuit2750/CLI2254/core2105/Pipeline9 962 toolchain installs with
frozen Bun dependencies through the official registry mirror and normal TLS.

Keep routing one changed selected-net native job at a time until every net is
physically complete. Never replay STM32 copper or patch supplier definitions,
models, generated JSON, dependencies or checks. Preserve failed candidates.
The solved finer-mesh USB candidate is rejected for different inner layers,
self-short, skew and pad clearance; solver success is not qualification.
Prefer outer power, and finish isolatedEFUSE_RTN, ground, USB coupling/return,
loaded widths, thermal and fresh CAM/assembly review. The disclosed TVS style
finding must not stop independent PCB work. Keep the exact motor, outline,
four connectors and carrier. Publish completed prototype steps with exact
matching fresh JSON and original CAD bytes under the standing authorization.
PROTOTYPE FABRICATION READY: NO. No order is authorized.

---

# Historical task — RP2040 / autonomous USB-PD redesign, revision44

The user's latest architecture request supersedes the older STM32/TCPP01
component-preservation and 20-port routing checkpoint below. Read
../../docs/RP2040-USB-PD-REDESIGN.md, root AGENTS.md and VALIDATION.md.
The new canonical board has no saved copper:108 required nets and504 native
unconnected-port errors when checking explicitly. Do not reuse STM32 routes.
Finish manufacturer pin/value/BOM, local bypass/crystal placement and actual
3D fit reviews before native selected-net Pipeline9 routing. Verify0.30/0.45
ordinary through vias, outer power where feasible, all copper widths/shorts/
connectivity/USB/thermal/mechanics and fresh matching fabrication exports.
Preserve the existing official imports, history, exact motor and carrier.

RP2040 has external flash/crystal and a MCP2515 CAN controller. STUSB4500 uses
factory5V/1.5A,15V/1.5A,20V/1A sink profiles: qualify actual negotiated RDO and
current margins before high-current mode. The standard JST programmer wiring
passes independent checks; physical flashing is pending. No order is authorized.

The saved dependency/manufacturer allowlist requires environment publication
to apply; pkg.pr.new currently blocks the full latest toolchain install.
Complete applicable checks and publish each completed prototype step with
exact matching JSON/model hashes under the standing authorization below.
PROTOTYPE FABRICATION READY: NO.

---

# Historical original routing task

# Cloud task prompt

Continue this board from the current public GitHub `main` checkout. Read
AGENTS.md, CLOUD_HANDOFF.md, VALIDATION.md and the linked context/evidence before
working. The original continuation started from 0.0.19-alpha.0; 0.0.20-alpha.0
preserves the latest checked saved copper and upgraded dependencies. The local
Mac runs out of memory during routing, so all new routing must run here in
Cloud/Linux. Use tscircuit's native autorouter only, with bounded selected-net
jobs and supported manual source routes when difficult nets require them.

Do not stop at another partial-routing checkpoint. Finish the current 20
native unconnected-port errors and 11 dangling trace errors, verify all 82
physical nets, and make a credible prototype fabrication candidate. Keep the
exact STEPPERONLINE 14HM11-0404S, existing component selection, 35 × 35 mm
four-layer outline, connector placement and front-carrier design unless an
actual routing/manufacturing defect requires a documented change. Never patch
official JLCPCB component definitions.

Routing priority:
1. VM / VBUS / protected VBUS power paths.
2. USB-C PD / TCPP01 / eFuse control and protection.
3. USB D+ / D−, preserving differential geometry and return path.
4. TMC2209 motor windings + UART.
5. SWD / NRST programmer signals.
6. CAN TX.
7. STEP / DIR / ENABLE / limit inputs.
8. I²C.
9. Remaining fault / OVP / control signals.

The six power/reference nets are physically connected in the checked baseline;
this does not qualify their current capacity. Measure actual copper widths and
bottlenecks, use native pours where appropriate, verify via current capacity,
TMC2209 thermal spreading and exposed-pad vias, and keep EFUSE_RTN isolated from
GND exactly as designed. Review the known RAW VBUS lower-neck issue first.

After zero unintended unconnected ports, repeat the complete qualification:
connectivity/netlist, shorts, copper spacing, drills/annular rings, board edge,
NPTH/keepout clearance, filled-pour connectivity, power-path current/width,
USB length/skew/impedance/return path, thermal review, actual four-layer visual
inspection, silkscreen cleanup, connector/cable clearance and 3D regression,
TypeScript, formatting and meaningful tests. Do not hide errors or weaken checks.

Generate matching Gerbers, drill files, BOM, CPL/pick-and-place and fabrication
ZIP. Audit them against the exact checked circuit/source revision. Fix actual
issues until the board is a credible prototype fabrication candidate. Physical
testing and firmware later must remain disclosed; do not claim production
qualification or hardware validation before physical testing.

Commit/push completed steps to the public GitHub repo and publish matching
versions to the public tscircuit package, with fresh circuit JSON in each build.
Verify public access and matching JSON hashes. If Cloud credentials prevent a
publication, state the exact missing permission and preserve a concrete package
for publication; do not invent success or export credentials from the Mac.

At the end report remaining unconnected ports, completed nets, trace/via/pour
counts, DRC, power-path qualification, USB review, fabrication-file review,
remaining blockers, both public links and revision identifiers, and
**PROTOTYPE FABRICATION READY: YES/NO**.
