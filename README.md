# Smart NEMA 14 Motor Controller

Revision **0.0.16-alpha.0**, 2026-10-03. **Untested prototype; unrouted; not fabrication ready.**

35 ×35 mm, four layers, 111 electronic references /108 default fitted, nine native A4 schematic sheets. The exact motor is **STEPPERONLINE 14HM11-0404S**: 0.4 A phase rating, 25 Ω, 24 mH, 0.9°, single front shaft. Default assembly is open-loop: U4/C6 encoder and R50 CAN endpoint link are DNP. No rear shaft or generic NEMA geometry is assumed.

STM32G0B1 provides USB FS, native UCPD, classical CAN, STEP/DIR/ENABLE, limit inputs, SWD and temperature monitoring. TMC2209 drives the motor. TCPP01 protects the USB frontend; TPS26600 supplies reverse-blocking inrush/current limiting, and AP63203 generates 3.3 V. Firmware is not delivered or physically tested. Hardware defaults keep the motor disabled and CAN in standby.

The pre-routing paper and placement review passes for the explicitly bounded prototype. Routing controls are configured but **routing remains disabled in this revision**. The unchanged TVS symbol rotation issue is accepted as cosmetic by the user after physical pin/pad checks; its regression and semantic finding remain visible. No electrical failure is waived. See [validation](VALIDATION.md), [power review](mechanical/POWER-CORNER-REVIEW.md) and [carrier review](mechanical/FRONT-CARRIER-REVIEW.md).

Proposed limits, not hardware-tested ratings:

- PD charger/dock advertises ≥1.5 A at initial 5 V. Motion only after a qualified 9/12/15/20 V contract, source ≤21 V and ≥1.5 A; prefer 12/15 V. Legacy/default-current USB hosts are not qualified.
- Bootstrap 3.3 V allocation ≤150 mA, motor disabled/CAN standby; normal logic ≤0.3 A. Nominal input limits are 0.50 A bootstrap /1.00 A after contract. Phase peak screen is 0.34245 A with 1 Ω sense resistors.
- Maximum 300 RPM, external reflected inertia ≤0.25×10⁻⁶ kg·m², no continuous backdrive or overhauling. Arbitrary braking loads are not qualified.
- Front-flange machined carrier with four independent PCB supports, constrained screw/washer and plug envelopes, board/cable load ≤20 N. Physical fit, retention, cold-start, high-frequency transients and temperatures remain prototype tests.

The GCT USB4110-GF-A/C5143397 imported footprint matches its manufacturer drawing. Its exact-part external STEP is registered against actual exported contact geometry. JST GH motor, JST SH I/O and the official standard JST programmer header retain their own imported footprints. All electronic definitions remain unmodified official JLCPCB imports. [BOM-CURRENT.md](BOM-CURRENT.md) lists all 111 references and 43 supplier identities; indexed inventory is not assembler stock reservation.

The selected manufacturing stackup is JLC04161H-3313, ordered 1.6 mm /calculator-finished 1.56 mm ±10%, outer 1 oz and inner 0.5 oz. Manufacturer-calculated top-layer USB geometry is 0.1537 mm width /0.1999 mm gap for 90 Ω with L2 GND reference. These are targets; actual routing, impedance geometry, Gerbers, drills and assembly outputs remain unapproved. No fabrication order is placed.

`mounted-assembly.circuit.tsx` shows the exact motor, current board and carrier together. `assembly.circuit.tsx` lifts the motor +65 mm for inspection. Both show rendered models, not physical photographs. The [original brief](references/USER-BRIEF.md) and historical evidence remain available; the current motor/assembly decisions supersede earlier Phidgets and encoder proposals.

Pinned tools: tscircuit 0.0.2742, CLI 0.1.2237, EasyEDA 0.0.369. Run board commands from this directory. `bun run preview:schematic` generates the schematic-only input expected by `test:draft`; fixture/model tests require their matching builds. The aggregate records every native command and preserves the accepted TVS finding, so it still exits one. Do not reinterpret that as copper approval.

Private source: [GitHub](https://github.com/AnasSarkiz/smart-nema14-motor-controller), branch main. Private package: [tscircuit](https://tscircuit.com/AnasSarkiz/smart-nema14-motor-controller--01a0fd9b). Last fully verified release is **0.0.15-alpha.0** /source [252d18a](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/252d18a00f2d67b2b83b7c67b0a176d908c457ce), 584 initial exact files plus a verified documentation checkpoint. Revision 16 publication is pending until its receipt is recorded. The hosted revision-15 build remains pending at its latest check. Public visibility remains awaiting the earlier explicit approval; both destinations stay private.

Registry distributions preserve exact source, supplier CAD and audit evidence. Large reference PDFs/ZIPs remain in GitHub with manufacturer links in references/SOURCES.md. Publication never means fabrication or hardware-test approval.
