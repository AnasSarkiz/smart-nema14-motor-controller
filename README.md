# Smart NEMA 14 Motor Controller

Revision `0.0.15-alpha.0`, 2026-10-03 Europe/Tirane. **Work-in-progress prototype. Unrouted and not fabrication ready.**

The controller targets the user-selected **STEPPERONLINE 14HM11-0404S**, using its unchanged official STEP and drawing A0217 revision 0. It is a 35 × 35 mm, four-layer design with 111 supplier components on nine native A4 schematic sheets. STM32G0B1 provides USB, UCPD and classical CAN; TMC2209 drives the motor. Power protection, self-powered SWD isolation, external STEP/DIR/ENABLE, two limits, temperature sensing and three LEDs are implemented as an unqualified electrical draft.

The pinned tools are tscircuit **0.0.2742**, CLI **0.1.2237** and EasyEDA **0.0.369**. All electronic definitions are official imports without manual corrections. The active BOM has **43** supplier identities: 39 covered by the unchanged earlier fixture, three selected power imports with 30 physical pin/pad mappings, and C136657 from the official programmer package. Historical and rejected alternatives remain explicitly excluded.

The motor has a single front shaft and no rear shaft for the former magnet arrangement. The default open-loop review BOM omits U4/C6; their optional footprints remain. R50 is omitted except at CAN bus endpoints. This population choice follows the brief's allowance for an unpopulated encoder; no feedback or lost-step detection is claimed.

R5/R6 now use official 1 Ω precision parts C513714. The 10 kΩ/10 kΩ VREF divider avoids operation below the driver's recommended reference range. A conservative current screen is about **0.34245 A peak**, below the motor's 0.4 A/phase rating; current regulation, thermal limits and torque remain untested. The eFuse has nominal 0.50 A bootstrap and 1.00 A contract-enabled limits. These are circuit calculations, not verified operating ratings.

Selected connectors are GCT USB4110-GF-A (C5143397), JST GH motor header (C189895), JST SH ten-pin I/O (C160409), and the official JST SWD header (C136657). The USB-C manufacturer's B4 drawing agrees with all 16 imported lands and two locating holes. Its exact-part TraceParts STEP from the public mjbots mirror is attached through native board-level CAD properties, leaving C5143397 unchanged. The two pegs and 20 physical landings pass nominal registration, including a check of the exported GLB vertices. Full plug/carrier clearance remains unqualified. The replacement motor header passes the dimensions specified in JST's catalogue; its mating harness and complete 3D fit still need review. Supplier stock is not reserved.

The native placement checker reports zero errors and warnings. **Routing remains disabled** because schematic/BOM and mechanical gates have not passed. The proposed carrier passes nominal clearance, but mating harnesses, production tolerances, critical power loops and startup/regeneration limits remain unresolved. The TVS rotation is a documented drawing defect with verified electrical mapping. Do not export or order this revision as fabrication-ready hardware.

`assembly.circuit.tsx` shows the actual PCB beneath the unchanged motor, lifted **+65 mm in Z** for inspection. The offline viewer at `mechanical/assembly-preview.html` offers a **Board close-up** view. Exploded separation is not an operating assembly. The old Phidgets holes, two posts and rear magnet are absent.

Run commands from this directory:

```sh
bun run format:check
bun run typecheck
bun run preview:schematic
bun run test:draft
bun run test:all-imports
bun run test:usb-footprint
bun run test:motor-footprint
bun run preview:assembly
bun run test:assembly
bun run test:usb-model
bun run preview:viewer
```

Fixture tests require the matching generated fixture. `test:assembly` checks the complete STEP inventory; `test:usb-model` checks the exact connector and rendered registration. Both pass their limited scopes. `test:symbol-rotation` still exposes the unresolved runtime defect, and the aggregate placement checks remain blocked. No failure is suppressed. See [VALIDATION.md](VALIDATION.md), [issues.md](issues.md), [BOM.md](BOM.md), and [the original brief](references/USER-BRIEF.md). Current carrier/CAD and catalogue evidence is in `evidence/rev-0.0.15-alpha.0/`; unchanged supplier definitions retain the revision-13 import evidence. The complete current 111-reference candidate table is [BOM-CURRENT.md](BOM-CURRENT.md).

The new [mounted assembly](mounted-assembly.circuit.tsx) adds a proposed front-flange carrier and four separate M2 PCB supports. The PCB holes are Ø2.5 mm on a 30.5 mm square, with 2.5 mm radius keepouts on every copper layer. These are controller/carrier holes, not motor rear holes. The carrier uses the documented front 4×M3 / 26 mm pattern, leaves the rear structural screws untouched, and keeps the exact motor rear face 10 mm behind the PCB midplane. Its nominal BRep and all 111 exported component envelope checks pass, with minimum 1.00 mm clearance. Material, hardware, cable envelopes, production tolerances and strength remain prototype design work. See [carrier review](mechanical/FRONT-CARRIER-REVIEW.md).

All 43 active BOM identities now have exact catalogue matches and displayed stock; this is not an assembler reservation. The catalogue displays only one TMC2209 and six motor connectors. The TVS rotation remains a reproduced drawing defect with correct electrical pin/pad mappings; the user accepted continuing the electrical/PCB work while keeping that finding visible.

The private source repository is [AnasSarkiz/smart-nema14-motor-controller](https://github.com/AnasSarkiz/smart-nema14-motor-controller), branch `main`. The private registry destination is [AnasSarkiz/smart-nema14-motor-controller--01a0fd9b](https://tscircuit.com/AnasSarkiz/smart-nema14-motor-controller--01a0fd9b). Publication receipts in VALIDATION.md distinguish successful updates from unfinished uploads. Public store visibility requires the explicit approval requested after automatic approval review rejected public disclosure. No fabrication package, order or hardware test is claimed.

The registry distribution contains the circuit sources, exact CAD assets and current audit evidence. Downloaded reference PDFs/ZIPs are preserved in the full GitHub repository; manufacturer links remain in references/SOURCES.md. The earlier full-reference upload encountered HTTP 413 for two large PDFs, recorded in VALIDATION.md.

Private release **0.0.13-alpha.0** is uploaded; all 422 initial source/CAD/evidence files passed SHA256 readback. See evidence/rev-0.0.13-alpha.0/PUBLICATION-RECEIPT.json. Its hosted build failed before code execution because the cloud sandbox exceeded its running-container limit. The receipt/documentation follow-up retains the same validated circuit revision.

Revision 15 replaces U10 with TPS26600RHFR/C2155767 and its official TI package CAD, uses 24 kΩ C25769 current-limit resistors, and replaces the control transistor with DMG1012T-7/C20512, specified at 2.5 V gate drive. C33 and the new C34 use official C268016 capacitors; R47 is removed. Independent 60 V OUT rating resolves the former eFuse disconnect concern. The complete board is **not rated for 60 V**. Proposed bounded power calculations are in mechanical/POWER-CORNER-REVIEW.md; startup, HF overshoot and routing remain unfinished. Private version **0.0.15-alpha.0** is uploaded: all **584** committed source/CAD/evidence files passed SHA256 readback. Source commit [252d18a](https://github.com/AnasSarkiz/smart-nema14-motor-controller/commit/252d18a00f2d67b2b83b7c67b0a176d908c457ce), release ID 5f610381-0e9e-4855-b307-6c82759ea5f5. Hosted build success remains separate.
