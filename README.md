# Smart NEMA 14 Motor Controller

Revision **0.0.27-alpha.0**, 2026-10-05. **Incomplete routing prototype; not fabrication ready; not hardware tested.**

35 × 35 mm, four layers, 111 electronic references / 108 default fitted, nine native A4 schematic sheets. Exact motor: **STEPPERONLINE 14HM11-0404S**, 0.4 A/phase, 25 Ω, 24 mH, 0.9°, single front shaft. U4/C6 encoder parts and the R50 CAN endpoint link are DNP by default. The front carrier uses the official motor geometry.

STM32G0B1 provides USB FS, UCPD, classical CAN, STEP/DIR/ENABLE, limit inputs, SWD and temperature monitoring. TMC2209 drives the motor; TCPP01 protects USB; TPS26600 provides input protection/current limiting and AP63203 generates 3.3 V. Firmware and hardware tests remain pending. Hardware defaults keep the motor disabled and CAN in standby.

The current saved-copper build has **225 traces, 188 vias and 70 pours**. It retains **14 native unconnected-port errors and 11 unfinished trace errors**. Independent actual-copper review finds **69 of 82 nets physically complete**; strict geometry and native shorts checks pass for this partial copper. The measured RAW VBUS lower neck is now 1.455 mm and passes its limited current screen; the complete power/via/thermal qualification remains pending. Current USB length/skew and adjacent-ground screens pass; complete qualification and final fabrication exports remain pending. Neither publication nor these partial checks approve fabrication.

## Continue in Codex Cloud

Local remaining-net routing exhausted the Mac's memory. New routing is Cloud/Linux only, using **tscircuit's native autorouter**. Read [AGENTS.md](AGENTS.md), the [complete handoff](CLOUD_HANDOFF.md), [environment setup](docs/cloud/ENVIRONMENT.md), [Cloud task](docs/cloud/TASK.md), and [validation record](VALIDATION.md).

The default entry replays checked source routes/pours and preserves all errors without launching a new remaining-net search. Explicit selected-net jobs use released native Pipelines 4/7/9 with ordinary 0.30/0.60 mm vias. Saved copper includes individually declared filled/capped features; follow the manufacturing manifests, not a blanket same-net drill exemption. Do not resume older Freerouting experiments.

The fresh Ubuntu 24.04 [Linux readiness run](https://github.com/AnasSarkiz/smart-nema14-motor-controller/actions/runs/37292488424) passed. The Codex Cloud setup and startup smoke checks passed; the environment was published and the user authorized board continuation. Cloud tscircuit authentication is now established.

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
