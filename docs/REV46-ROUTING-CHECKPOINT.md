# Routing checkpoint — 0.0.46-alpha.0, 2026-10-07

**PROTOTYPE FABRICATION READY: NO. Routing continues.**

The exact RP2040/STUSB4500 canonical source has 51 of 108 physically connected
networks, including GND: 82 saved tracks, 52 ordinary through vias, nine native
pours and 255 explicit native unconnected-port errors. Every via measures
0.30 mm drill / 0.45 mm pad and spans all four layers. No blind/buried or
filled/capped exception is instantiated. All three generated Circuit JSON
mirrors have SHA-256
`a1a9ae548215b2d24a78fc272cb197901b69e8856eeae92b4685934bca4f546e`.
The native build correctly exits nonzero for the 255 missing connections.
There are zero other native errors and zero strict copper/drill/edge/keepout
violations. All 51 selected networks independently have one physical copper
component; ground includes all 118 actual ground endpoints and eight ordinary
stitching vias. EFUSE_RTN remains electrically separate.

Pipeline9 supplies bounded selected-net candidates, then board-owned native
saved paths retain qualified routes. Manual corrections complete SWDIO,
SWCLK, QSPI_IO0, POWER_GOOD, NRST and both CAN crystal nets. R53 moves beside
R21 to remove a real blocked SWCLK escape; its shared reset via moves 0.16 mm
south for same-net drill-to-pad clearance. The CAN crystal moves locally; two
genuine official C1570 30 pF C0G/5%/50 V capacitors replace four parallel 15 pF
loads. Original imports and historical evidence are retained unmodified.
Both CAN oscillator nets are top-only with zero vias and aggregate lengths
4.9542 / 8.8585 mm, below the unchanged native 10 mm/zero-via constraints.
Nominal 18 pF crystal loading assumes approximately 3 pF PCB stray; oscillator
startup/loading still needs hardware qualification.

There are 147 purchased references, 146 default fitted, 54 exact supplier
identities and 53 fitted SKUs. Only R50 is DNP. Fresh official POST stock/pricing
and exact-SKU page/read-only GET-detail checks pass all 54 identities. The search
snapshot is 2026-10-07 12:01 UTC; no reservation or assembler allocation is claimed.
The five-board exact fitted-parts baseline is USD 136.305 total / 27.261 per
board, excluding PCB, assembly/loading/extended fees, losses/minima, shipping,
tax, carrier and motor. Fourteen fitted SKUs are basic and 39 extended. Removing
two capacitors adds an extended SKU, so delivered savings require a real quote.

Fresh TypeScript, formatting and PCB-disabled manufacturer-pin/load assertions
pass. Native CLI netlist, pin_specification, source, schematic-placement and
shorts exit zero. The placement check exits one with three retained orientation
suggestions: C_IO3, C_CAN_XOUT and D_USB. These are geometric/topology heuristics,
not copper collision findings; strict actual copper passes. Do not claim a
clean placement screen until these are resolved or individually justified.
The full official schematic analyzer retains exactly one imported D_VBUS
rotation finding; purchased definitions are untouched. The user explicitly
allows independent PCB work to continue. All nine current A4 sheets and all
four actual copper layer images were viewed; 147 purpose notes pass the helper.

Actual CadQuery 2.8.0 imports, valid solids and export/reimport pass all 12 ICs
and all 146 fitted genuine STEP models. The mounted assembly exports all 146
meshes. Nominal carrier/fastener clearance is at least 0.91227 mm and minimum
component-pair envelope clearance is 0.6 mm. Manufacturing tolerances, mating
harnesses and physical fit remain separate gates. The exact 14HM11-0404S motor,
35 x 35 mm four-layer outline, four outward connectors and carrier are retained.

The standard JST programmer passes all 38 physical pin/net assertions. Its VOUT
is isolated and target requires its own supply; physical flashing is untested.
The standard USB-C symbol represents all 16 purchased pin/pad groups. Actual
planar USB skew is 0.19510 mm for the main trunk, 0.09995 mm for MCU stubs and
0.40879 mm for both reversible plug paths, below unchanged 0.25/0.25/0.5 mm
limits. Unequal via counts, barrel delay, coupling, actual impedance and reference
continuity remain unqualified. Complete loaded power widths, thermal review,
all remaining 57 nets, fresh matching Gerber/drill/BOM/CPL/CAM and assembler
quote/allocation are unfinished. Historical STM32 fabrication exports do not
manufacture this design. No order, hardware test or fabrication approval is claimed.

Evidence: `evidence/rev-0.0.46-alpha.0/`; qualified native trial `routing/controls065/`.
Failed candidates are preserved and not adopted. Revision publication is pending
until exact anonymous package and immutable GitHub byte checks are recorded.
