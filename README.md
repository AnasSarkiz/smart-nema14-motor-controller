# Smart NEMA 14 Motor Controller

Revision **0.0.38-alpha.0**, 2026-10-06. **Routing complete; fabrication qualification pending; not hardware tested.**

[Every component now has a purpose note](docs/SCHEMATIC-NOTES.md) on its native schematic sheet, including values and DNP assembly notes. The right-side panels explain all 111 references without changing PCB geometry or electrical connections.

35 × 35 mm, four layers, 111 electronic references / 108 default fitted, nine native A4 schematic sheets. Exact motor: **STEPPERONLINE 14HM11-0404S**, 0.4 A/phase, single front shaft. U4/C6 encoder parts and R50 are marked DNP in source and excluded from default assembly exports. Their imported footprints, pads and wiring remain intact.

STM32G0B1 provides USB FS, UCPD, classical CAN, STEP/DIR/ENABLE, limit inputs, SWD and temperature monitoring. TMC2209 drives the motor; TCPP01 protects USB; TPS26600 provides input protection/current limiting and AP63203 generates 3.3 V. Hardware defaults keep the motor disabled and CAN in standby. Firmware is pending.

Updated pinned toolchain: tscircuit 0.0.2745, CLI 0.1.2251, core 0.0.2095 and native Pipeline9 dependency 0.0.959. R20/R21/R22 now use official C25076 100 Ω imports for the standard JST programmer; placements and the five-pin order are preserved. Cluttered automatic reference text is replaced by four connector labels; all 111 identities remain in the assembly drawing.

Revision 0.0.37 fixes the native Gerber ground mismatch and measures all four
owned connector labels clear of mask openings, with 0.198 mm pens. Supplier
silkscreen and ordering blockers remain; see [current validation](VALIDATION.md).

Fresh native build: **334 traces / 224 vias / 82 pours**, **zero native errors or shorts**, and **82/82 physical nets joined**. Independent actual-copper spacing, drills, board edges, NPTH and filled-pour checks pass, including exact owners of all 68 declared filled features. All 421 purchased-pin wiring partitions are preserved. Fresh [Circuit JSON](dist/index/circuit.json) is included in the package; its exact checksum is recorded in [build status](build/routing-review/BUILD-STATUS.json) and publication receipts.

Every nonzero trace segment is inventoried: 2,218 segments across 82 nets meet the 0.15 mm width floor. All four motor nets now use ≥0.27 mm inner segments and pass the stated 0.34245 A analytical screen with the manufacturer’s −20% width tolerance; complete rail/pour/via current and thermal qualification remains pending. Thirty combined-route-tree width warnings are retained; all 34 active fanout corridors have their requested copper width, but checking the minimum width alone does not qualify loaded power paths. USB skew is 0.38144 mm and its limited return/impedance screens pass. These are analytical checks, not measured hardware ratings.

Use direct pinned tscircuit export for review files:

```bash
bunx tsci export dist/index/circuit.json --format gerbers --output "$PWD/review-gerbers.zip"
```

The checked review ZIP has 224 unique plated drill hits, six NPTH holes and matching 108-reference BOM/CPL. Four supplier placement orientations remain unverified (J_USB and three LEDs). The earlier KiCad conversion has duplicated objects/default-rule failures and 55 reported disconnected items; it is diagnostic evidence, not an approved fabrication package. All four copper layers pass the native/CAM vector comparison. Supplier silkscreen, mask/paste approval, small filled-via process, stackup/plating, power and thermal reviews remain blockers. **Do not order this revision.**

The public runtime packet contains the board sources, unchanged supplier models, pinned lockfile and fresh Circuit JSON. Review records are in `build/qualification-review.zip`; full historical evidence and all qualification tools remain in the GitHub checkout. This keeps old routing experiments out of the runnable package.

```bash
bun install --frozen-lockfile
bun run build
bun run typecheck
```

## Continue in Codex Cloud

Local remaining-net routing exhausted the Mac's memory. New routing is Cloud/Linux only, using **tscircuit's native autorouter**. Read [AGENTS.md](AGENTS.md), the [complete handoff](CLOUD_HANDOFF.md), [environment setup](docs/cloud/ENVIRONMENT.md), [Cloud task](docs/cloud/TASK.md), and [validation record](VALIDATION.md).

The default entry replays checked source routes/pours and preserves all errors without launching a new remaining-net search. Explicit selected-net jobs use released native Pipeline9 with ordinary 0.30/0.60 mm vias. Saved copper includes individually declared filled/capped features; follow the manufacturing manifests, not a blanket same-net drill exemption. Do not resume older Freerouting experiments.

The fresh Ubuntu 24.04 [Linux readiness run](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37488982248) passed. The Codex Cloud setup and startup smoke checks passed; the environment was published and the user authorized board continuation. Cloud tscircuit authentication is now established.

Cloud environment install command: `bash scripts/cloud-setup.sh`. Startup check: `bash scripts/cloud-smoke.sh`. The active board task is TASK.md. A repository commit alone does not create or start a Cloud environment.

All 1,627 rev20 experimental evidence files are retained in four compressed archive parts, with exact hashes. `python3 scripts/restore-routing-history.py` restores them into a separate folder when needed. Current checked JSON is committed at [dist/index/circuit.json](dist/index/circuit.json) and mirrored in [build/routing-review/circuit.json](build/routing-review/circuit.json).

## Intended limits and assembly

These are analytical design limits, not hardware-tested ratings:

- PD source advertises ≥1.5 A. Motor off during 5 V boot; motion only after a qualified 9/12/15/20 V contract, source ≤21 V. Prefer 12/15 V.
- Nominal input current limit: 0.50 A boot / 1.00 A normal; reviewed tolerance worst case 1.0714 A. Logic allocation ≤0.15 A boot / ≤0.30 A normal. TMC phase peak screen is approximately 0.34245 A with 1 Ω sense resistors.
- Earlier analytical operating envelope assumed ≤300 RPM, reflected inertia ≤0.25×10⁻⁶ kg·m² and no continuous backdrive. Actual load/braking behavior is not physically established.
- EFUSE_RTN must remain isolated from GND. Final stackup/current/thermal, via-fill/CAM, solder mask/paste and connector mating fit must pass before ordering.
- The I/O mating-envelope screen has only about 0.1643 mm margin; physical mating and motor/carrier assembly tests remain pending.

Keep connectors facing outward: USB −Y, motor +Y, I/O +X, SWD +X. Preserve their manufacturer-audited imported footprints and exact CAD registrations. The TVS symbol rotation issue is disclosed as cosmetic after pin/pad review; its footprint is not patched.

## Public destinations

- [GitHub repository](https://github.com/AnasSarkiz/smart-nema14-motor-controller)
- [tscircuit package](https://tscircuit.com/AnasSarkiz/smart-nema14-motor-controller--01a0fd9b)

Both must remain public. Every published revision must include fresh circuit JSON matching the checked source. Publication receipts record what actually succeeded; hosted preview success is separate from file readback and fabrication qualification.

**PROTOTYPE FABRICATION READY: NO.** No fabrication order is authorized. Historical reviews, superseded requirements and publication evidence remain in VALIDATION.md, references, evidence, and Git history.
