# Power disconnect and regeneration review — revision 14

This is an analytical design screen, not hardware test evidence. Current TPS259470LRPWR/C3662793 remains implemented; routing is disabled.

TI TPS25947 Rev C lists OUT absolute maximum min(28 V, VIN+21 V) over −40 to 125 °C, min(28 V, VIN+22 V) over −10 to 125 °C, and recommended OUT min(23 V, VIN+20 V). USB removal can take VIN toward zero while reverse blocking retains charged output capacitors. A 20 V contract at +5% gives 21 V before any returned energy. The powered-input rating alone does not qualify that condition.

The existing conservative screen bounds both 28.8 mH phases independently at 0.33571 A, plus rotor inertia 1×10⁻⁶ kg·m² at 300 RPM. Magnetic energy = L·I² = 3.246 mJ; rotor energy = 0.4935 mJ. With 160 µF minimum bulk capacitance, lossless conversion gives sqrt(21² + 2·0.003739/0.000160) = 22.0849 V before ESR. Actual sinusoidal phase currents may reduce magnetic energy substantially; this calculation does not demonstrate a measured overload. It does demonstrate missing margin and dependence on disconnect conditions. No external load inertia, driven-backward load or braking envelope is qualified.

Candidate TPS26600RHFR/C2155767 has independently specified 60 V operating OUT range and 62 V absolute rating, reverse blocking and programmable current limiting. Its official import, pin/footprint mapping, current-limit resistors, mode, startup and dVdT timing must be checked before implementation. Existing TPS25947 resistor values cannot simply be reused. Catalogue shows an exact identity match and 2484 indexed units on 2026-10-03; availability is not reserved.

Primary references: [TI TPS25947](https://www.ti.com/lit/ds/symlink/tps25947.pdf), [TI TPS2660](https://www.ti.com/lit/ds/symlink/tps2660.pdf), [LCSC exact candidate](https://www.lcsc.com/product-detail/C2155767.html). Original manufacturer PDFs remain in references. This review does not establish transient immunity, thermal qualification, startup budget or fabrication readiness.
