# Smart NEMA 14 Motor Controller

Revision `0.0.13-alpha.0`, 2026-10-03 Europe/Tirane. **Work-in-progress prototype. Unrouted and not fabrication ready.**

The controller targets the user-selected **STEPPERONLINE 14HM11-0404S**, using its unchanged official STEP and drawing A0217 revision 0. It is a 35 × 35 mm, four-layer design with 111 supplier components on nine native A4 schematic sheets. STM32G0B1 provides USB, UCPD and classical CAN; TMC2209 drives the motor. Power protection, self-powered SWD isolation, external STEP/DIR/ENABLE, two limits, temperature sensing and three LEDs are implemented as an unqualified electrical draft.

The pinned tools are tscircuit **0.0.2742**, CLI **0.1.2237** and EasyEDA **0.0.369**. Component definitions were regenerated through the official importer without manual corrections. The isolated import audit checks 44 imports and 261 pin-to-pad mappings. The board uses 44 unique supplier identities: 43 of those are in that fixture; C136657 comes from the official standard programmer package. The fixture additionally retains the upstream 180 mΩ resistor regression.

The motor has a single front shaft and no rear shaft for the former magnet arrangement. The default open-loop review BOM omits U4/C6; their optional footprints remain. R50 is omitted except at CAN bus endpoints. This population choice follows the brief's allowance for an unpopulated encoder; no feedback or lost-step detection is claimed.

R5/R6 now use official 1 Ω precision parts C513714. The 10 kΩ/10 kΩ VREF divider avoids operation below the driver's recommended reference range. A conservative current screen is about **0.336 A peak**, below the motor's 0.4 A/phase rating; current regulation, thermal limits and torque remain untested. The eFuse has nominal 0.50 A bootstrap and 1.00 A contract-enabled limits. These are circuit calculations, not verified operating ratings.

Selected connectors are GCT USB4110-GF-A (C5143397), JST GH motor header (C189895), JST SH ten-pin I/O (C160409), and the official JST SWD header (C136657). The USB-C manufacturer's B4 drawing agrees with all 16 imported lands and two locating holes. Its exact-part TraceParts STEP from the public mjbots mirror is attached through native board-level CAD properties, leaving C5143397 unchanged. The two pegs and 20 physical landings pass nominal registration, including a check of the exported GLB vertices. Full plug/carrier clearance remains unqualified. The replacement motor header passes the dimensions specified in JST's catalogue; its mating harness and complete 3D fit still need review. Supplier stock is not reserved.

The native placement checker reports zero errors and warnings. **Routing remains disabled** because schematic/BOM and mechanical gates have not passed. In particular, the imported C1974707 TVS symbol ignores rotation, the PCB has no qualified attachment/carrier, and startup/regeneration/load limits remain unresolved. Do not export or order this revision as fabrication-ready hardware.

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

Fixture tests require the matching generated fixture. `test:assembly` checks the complete STEP inventory; `test:usb-model` checks the exact connector and rendered registration. Both pass their limited scopes. `test:symbol-rotation` still exposes the unresolved runtime defect, and the aggregate placement checks remain blocked. No failure is suppressed. See [VALIDATION.md](VALIDATION.md), [issues.md](issues.md), [BOM.md](BOM.md), and [the original brief](references/USER-BRIEF.md). Current CAD evidence is in `evidence/rev-0.0.13-alpha.0/`; supplier audits were rerun against fresh official EasyEDA downloads; prior electrical screens remain in revision 11.

The private source repository is [AnasSarkiz/smart-nema14-motor-controller](https://github.com/AnasSarkiz/smart-nema14-motor-controller), branch `main`. The private registry destination is [AnasSarkiz/smart-nema14-motor-controller--01a0fd9b](https://tscircuit.com/AnasSarkiz/smart-nema14-motor-controller--01a0fd9b). Publication receipts in VALIDATION.md distinguish successful updates from unfinished uploads. Public store visibility requires the explicit approval requested after automatic approval review rejected public disclosure. No fabrication package, order or hardware test is claimed.

The registry distribution contains the circuit sources, exact CAD assets and current audit evidence. Downloaded reference PDFs/ZIPs are preserved in the full GitHub repository; manufacturer links remain in references/SOURCES.md. The earlier full-reference upload encountered HTTP 413 for two large PDFs, recorded in VALIDATION.md.
