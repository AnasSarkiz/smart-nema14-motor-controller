# Supplier import blockers — 2026-10-02

Stage 2; released easyeda 0.0.360. No imported definitions modified.

- C2046441 / Bourns SRN6028-3R9M: download reported `Component not found in EasyEDA library search`. No raw input or import exists. CLI incorrectly returned exit 0 despite that diagnostic; success is verified from actual generated files. Dependent buck design was paused until C57269 / Sunlord SWPA4030S4R7MT imported successfully. Different genuine inductor selected with fresh ripple/rating review; no footprint workaround.
- C5127775 / Milliohm HoLRT1206-1W-180mR-1%: unchanged converter output is a generic two-pin chip with no resistance property or resistor symbol. Current-sense validation is blocked for this output; not instantiated, not patched.
- C5127782 / HoYH1206-1W-180mR-1%: download reported the same missing-library error and created no raw input; not instantiated. Not instantiated; dependent sense draft resumed only after C723709 imported correctly and its changed current limit was calculated.
- C167251 was rejected after raw identity review: BL1084-33-CY is an LDO, not an inductor. No TSX import produced.
- C25767 raw identity is 220 kOhm, not 1 kOhm. Retained as an unused candidate. Correct C11702 1 kOhm imported independently.

Inventory catalog presence does not prove EasyEDA importability. Search JSON results are preserved; fuzzy results were not used as identity evidence.

C723743 / Yageo PE1206FRF470R15L also reported missing EasyEDA library data; no raw input was created. C723709 / PE1206FRF470R2L (200 mOhm, not 150/180 mOhm) converts as a real resistor with its resistance intact. It is selected for a conservative approximately 1 A draft, not as a same-value substitute. The rejected 180/150 mOhm options remain excluded.
