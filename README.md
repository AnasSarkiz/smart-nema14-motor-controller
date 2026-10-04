# Smart NEMA 14 Motor Controller

Revision **0.0.19-alpha.0**, 2026-10-04. **Routing development prototype; not fabrication ready; not hardware tested.**

35 ×35 mm, four layers, 111 electronic references /108 default fitted, nine native A4 schematic sheets. The exact motor is **STEPPERONLINE 14HM11-0404S**: 0.4 A phase rating, 25 Ω, 24 mH, 0.9°, single front shaft. Default assembly is open-loop: U4/C6 encoder and R50 CAN endpoint link are DNP. No rear shaft or generic NEMA geometry is assumed.

STM32G0B1 provides USB FS, native UCPD, classical CAN, STEP/DIR/ENABLE, limit inputs, SWD and temperature monitoring. TMC2209 drives the motor. TCPP01 protects the USB frontend; TPS26600 supplies reverse-blocking inrush/current limiting, and AP63203 generates 3.3 V. Firmware is not delivered or physically tested. Hardware defaults keep the motor disabled and CAN in standby.

The pre-routing paper and placement review passes for the explicitly bounded prototype. **Routing is enabled**, with reviewed manual USB paths and unfinished full-board routing. The main design retains 57 checked complete saved nets and attempts native completion of the remaining nets. `routing-review.circuit.tsx` shows the checked partial copper: 139 traces /107 vias /24 filled pours, zero independent geometry violations and no detected shorts, but **88 unconnected ports**. It is not the manufacturing entry. No final fabrication package is approved. The unchanged TVS symbol rotation issue is accepted as cosmetic by the user after physical pin/pad checks; its regression and semantic finding remain visible. No electrical failure is waived. See [validation](VALIDATION.md), [power review](mechanical/POWER-CORNER-REVIEW.md) and [carrier review](mechanical/FRONT-CARRIER-REVIEW.md).

Proposed limits, not hardware-tested ratings:

- PD charger/dock advertises ≥1.5 A at initial 5 V. Motion only after a qualified 9/12/15/20 V contract, source ≤21 V and ≥1.5 A; prefer 12/15 V. Legacy/default-current USB hosts are not qualified.
- Bootstrap 3.3 V allocation ≤150 mA, motor disabled/CAN standby; normal logic ≤0.3 A. Nominal input limits are 0.50 A bootstrap /1.00 A after contract. Phase peak screen is 0.34245 A with 1 Ω sense resistors.
- Maximum 300 RPM, external reflected inertia ≤0.25×10⁻⁶ kg·m², no continuous backdrive or overhauling. Arbitrary braking loads are not qualified.
- Front-flange machined carrier with four independent PCB supports, constrained screw/washer and plug envelopes, board/cable load ≤20 N. Physical fit, retention, cold-start, high-frequency transients and temperatures remain prototype tests.

The GCT USB4110-GF-A/C5143397 imported footprint matches its manufacturer drawing. Its exact-part external STEP is registered against actual exported contact geometry. JST GH motor, JST SH I/O and the official standard JST programmer header retain their own imported footprints. All electronic definitions remain unmodified official JLCPCB imports. [BOM-CURRENT.md](BOM-CURRENT.md) lists all 111 references and 43 supplier identities; indexed inventory is not assembler stock reservation.

The selected manufacturing stackup is JLC04161H-3313, ordered 1.6 mm /calculator-finished 1.56 mm ±10%, outer 1 oz and inner 0.5 oz. Manufacturer-calculated top-layer USB geometry is 0.1537 mm width /0.1999 mm gap for 90 Ω with L2 GND reference. These are targets; actual routing, impedance geometry, Gerbers, drills and assembly outputs remain unapproved. No fabrication order is placed.

`mounted-assembly.circuit.tsx` shows the exact motor, current board and carrier together. `assembly.circuit.tsx` lifts the motor +65 mm for inspection. Both show rendered models, not physical photographs. The [original brief](references/USER-BRIEF.md) and historical evidence remain available; the current motor/assembly decisions supersede earlier Phidgets and encoder proposals.

Pinned released tools: tscircuit 0.0.2743, CLI 0.1.2237, EasyEDA 0.0.370. Run board commands from this directory. `bun run preview:schematic` generates the schematic-only input expected by `test:draft`; fixture/model tests require their matching builds. The aggregate records every native command and preserves the accepted TVS finding, so it still exits one. Do not reinterpret that as copper approval.

Private source: [GitHub](https://github.com/AnasSarkiz/smart-nema14-motor-controller), branch main. Private package: [tscircuit](https://tscircuit.com/AnasSarkiz/smart-nema14-motor-controller--01a0fd9b). Last source-upload-verified release is **0.0.18-alpha.0**: **1,073** exact files, source [ace862f](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/ace862f130c25a5aa3e33bdd00d59e6c790d317a), release ID c2c21533-6762-49ba-8bc5-57f77a5ffbff. Every official download matches SHA256. Hosted build success is tracked separately and remains unverified. Public visibility remains awaiting the earlier explicit approval; both destinations stay private.

Revision 0.0.17-alpha.0 upload failed at the registry database size limit and is incomplete. Patch 0.0.17-alpha.1 republishes the same checked copper with a smaller source distribution; all 851 uploaded files match official download checksums. Large failed-trial artifacts and duplicate downloaded supplier-model caches remain in private GitHub with checksum links. All imported definitions and their CAD, the selected motor model, and current partial-copper evidence are retained.

Registry distributions preserve exact source, supplier CAD and current audit evidence. Large reference PDFs/ZIPs remain in GitHub with manufacturer links in references/SOURCES.md. Publication never means fabrication or hardware-test approval.

Revision 18 joins all 90 GND pads physically and keeps all eight eFuse RTN pads on a separate physical network. Copper fills now clear locating holes by at least 0.3069 mm and the required 2.50 mm mounting circle by 0.007865 mm. A 2.52 mm native planning radius compensates conservatively for polygon facets without reducing the original mechanical requirement. USB primary path skew is 0.381441 mm. Full routing runs still time out; actual power widths, thermal paths, USB impedance, silkscreen and CAM remain unfinished. See evidence/rev-0.0.18-alpha.0/CURRENT-ROUTING-STATUS.json. PUBLICATION-RECEIPT.json records the verified source upload; fabrication approval remains pending.

Revision 19 retains a manually checked eFuse-enable route and two guarded existing-route bends. Current partial copper has no shorts or measured spacing violations, but 88 connections remain incomplete. Main routing stays enabled. Full-board routing is also constrained by roughly 1.1 GB free disk; failed trials and the unchanged ground-routing gates remain documented. Revision 19 publication is pending.
