# Active task — RP2040 / autonomous USB-PD redesign, revision44

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
