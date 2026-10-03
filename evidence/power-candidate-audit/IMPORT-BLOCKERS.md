# Candidate import discrepancies

2026-10-03, CLI 0.1.2237 / EasyEDA 0.0.369.

C852665 / RT0402BRD0724KL is an electrical-model blocker for stage 2: the supplier source has prefix U? and Value=24kΩ; official conversion creates `<chip>` without a resistance property. Both physical pads match, but a geometry-only pass did not establish a native resistor value. The final draft value audit failed R44/R45 (`undefined` versus 24000 Ω). This part is excluded; no imported definition is patched. C25769 / 0402WGF2402TCE is the selected official 24 kΩ alternative. The native value is 24000 Ω; both physical pads, exact supplier identity and unchanged footprint pass the candidate fixture and independent board connectivity/value audit. Its tolerance is ±1%, not the rejected candidate's ±0.1%.

C181406 / TPS26600RHFT is unselected. Its imported thermal land is 3.0×2.0 mm, whereas TI RHF0024A shows 3.65×2.65 mm exposed metal. It is not substituted for C2155767. C2155767 retains its own native 3.6500054×2.6500074 mm thermal land; the external manufacturer TI STEP is attached through consumer CAD properties.

No failed candidate is approved for fabrication. Candidate reports distinguish physical mappings from native values and manufacturer qualification.
