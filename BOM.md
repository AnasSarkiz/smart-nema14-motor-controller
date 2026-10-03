# Current review BOM — 0.0.15-alpha.0

**Design review only; not an approved fabrication BOM.** All 111 instantiated components have exact JLCPCB identities. The generated [per-reference review BOM](evidence/rev-0.0.15-alpha.0/REVIEW-BOM.csv) and [JSON record](evidence/rev-0.0.15-alpha.0/REVIEW-BOM.json) come from the current schematic.

The default open-loop review assembly fits 108 parts and omits U4/C6 (optional encoder) and R50 (CAN termination link). Retain R2/R3: the temperature sensor still requires I²C pull-ups. Manufacturing exports must apply the same population manifest to both BOM and placement files; that fabrication export has not been performed.

See [the complete 111-reference candidate table](BOM-CURRENT.md) for values, manufacturer identities, circuit roles and current catalogue evidence. Indexed stock is not an assembler reservation.

Changes superseding every historical proposal below:

- R5/R6: **C513714**, Yageo RT1206BRD071RL, 1 Ω, ±0.1%, 25 ppm/°C, 0.25 W. The 180 mΩ sense pair is no longer active. R10/R11 are both 10 kΩ.
- J_USB: **C5143397**, GCT USB4110-GF-A. B4 manufacturer footprint audit passes; the external exact-part TraceParts STEP passes nominal registration and rendered-contact checks. Full mounted fit remains unqualified.
- J_MOTOR: **C189895**, JST SM04B-GHS-TB(LF)(SN), GH 1.25 mm, 1 A with AWG26. Mates with GHR-04V-S and SSHL-002T-P0.2 contacts. Search showed only six supplier units on 2026-10-03; stock must be rechecked before ordering. C265102/C265332/C157926 are excluded following footprint review.
- J_IO: **C160409**, JST SM10B-SRSS-TB(LF)(SN), SH ten-position side entry. Full footprint/model and mating harness qualification remains pending.
- J_SWD: **C136657**, official package 0.8.0. Pin 1 VOUT is intentionally disconnected; signal voltage must be 3.3 V. USB powers the board.
- U7: **C2673275**, TMUX1511RSVR, isolates programmer signals and the VBUS ADC while unpowered.
- U8: **C5218924**, TLV803EA30DBZR, 3.0 V supervisor with 200 ms reset delay; GND1/RESET2/VDD3. C53283913 is excluded because its released import loses the rotated centre-pad geometry.
- U9: **C28927**, TMP112AIDRLR, board temperature at I²C address 0x48.
- U10: **C2155767**, TPS26600RHFR, protected VM feeding both buck and motor. Controlled charging and reverse blocking do not provide a regenerative brake.
- D_IO1/D_IO2: **C138714**; D_CAN: **C12067**; Q_ILIM: **C20512**, DMG1012T-7; three LEDs: **C965805**.

Current imports and physical-pin connectivity pass their limited audit scopes. Availability of the complete assembly, effective capacitance, startup budget, transient protection, thermal ratings and all mechanical interfaces remain unqualified. No generic or manually patched component definitions are used.


- R44/R45: **C25769**, 24 kΩ ±1%, official native resistor import. R42 is 4.7 kΩ C25900; MODE connects to isolated EFUSE_RTN for current limiting with automatic retry.
- C33/C34: **C268016**, 2.2 µF/50 V X5R. C33 controls dV/dt and C34 bypasses the protected input. C25 uses the same part. R47 is removed.
- C852665 and C181406 are rejected alternatives, excluded from the active board because their imports failed value/footprint review. No definition was repaired manually.

## Historical BOM proposals — superseded by the current per-reference record

# Current revision 0.0.9-alpha.0 update

Selected motor: STEPPERONLINE 14HM11-0404S; 0.4 A/phase, 25 ohms,
24 mH, 0.9° (400 full steps/revolution), single front shaft. Previous motor
ratings/current-limit proposals and rear encoder mechanics below are retired.
No firmware current limit is implemented or tested. Optional AS5600 electrical
draft remains while feedback selection is pending. Motor attachment is blocked
pending rear fastener specification or a qualified carrier. Electronic supplier
imports and partial connectivity are unchanged; USB footprint/protection blockers
remain. See [current validation](VALIDATION.md).

## Previous electrical draft and historical motor proposals

# Candidate BOM - NOT READY

Revision 0.0.7-alpha.0; identity/import checks 2026-10-03 local time.
Six draft sheets instantiate U1-U6, C1-C27, R1-R18, L1, J_USB, Q_PD, D_USB and D_VBUS (56 parts).
Other rows are candidates or unfinished coverage items, not an assembly BOM.
Basic/Extended below is the class reported by the fetched supplier JSON;
reported LCSC stock is not a reservation or verified current JLC assembly stock.
Ratings, footprint/model registration, assembler inventory and substitutions
remain subject to stage 2 qualification.

| Ref | Function | Manufacturer | MPN | Package | LCSC/JLCPCB Part Number | Basic/Extended | Datasheet | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| U1 | MCU, USB, UCPD, FDCAN | ST | STM32G0B1CBT6 | LQFP48, 7 x 7 mm | C2847904 | Extended | [ST DS13560](https://www.st.com/resource/en/datasheet/stm32g0b1cb.pdf) | Regenerated with official CLI 0.1.2232 / easyeda 0.0.368; critical-label audit PASS; MCU draft instantiated |
| U2 | Stepper driver | ADI/Trinamic | TMC2209-LA | QFN28 exposed pad, 5 x 5 mm | C465949 | Extended | [ADI Rev 1.09](https://www.analog.com/media/en/technical-documentation/data-sheets/TMC2209_datasheet_rev1.09.pdf) | Latest official import regenerated; draft instantiated with support/sense network; 5 V fallback motor disabled; full footprint/paste/thermal review pending |
| U3 | USB PD protection | ST | TCPP01-M12 | QFN12 exposed pad, 3 x 3 mm | C1121848 | Extended | [ST DS12900](https://www.st.com/resource/en/datasheet/tcpp01-m12.pdf) | Regenerated with official CLI 0.1.2232 / easyeda 0.0.368; DB/FLT audit PASS; frontend instantiated; downstream protection qualification BLOCKED; protection does not negotiate PD |
| U4 | Optional magnetic encoder | ams | AS5600-ASOM | SOIC8 | C79815 | Extended | [Manufacturer-authored datasheet](https://datasheet.lcsc.com/datasheet/pdf/fab02cf30a2c48b5aeeebf03db9fe675.pdf?productCode=C79815) | Latest official import regenerated; 3.3 V I2C draft instantiated; optional U4/C6 population; bottom mechanics and models pending |
| U5 | 3.3 V logic buck | Diodes | AP63203WU-7 | TSOT26 | C780769 | Extended | [Diodes DS41326 Rev 3-2](https://www.diodes.com/datasheet/download/AP63200-AP63201-AP63203-AP63205.pdf) | Imported unchanged; draft instantiated; input power path, effective capacitance and thermal qualification pending |
| U6 | Classical CAN candidate | TI | SN65HVD230DR | SOIC8 | C12084 | Extended | [TI datasheet](https://www.ti.com/lit/ds/symlink/sn65hvd230.pdf) | Imported with easyeda 0.0.360; draft instantiated, RS=GND; termination/ESD pending; no CAN FD claim |
| C1 | MCU VDD 100 nF | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | X7R, 16 V; imported unchanged; placement pending |
| C3 | MCU VREF+ 100 nF | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | X7R, 16 V; imported unchanged; placement pending |
| C4 | MCU VBAT 100 nF | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | X7R, 16 V; imported unchanged; placement pending |
| C5 | Reset filter 100 nF | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | X7R, 16 V; imported unchanged; placement pending |
| C6 | Encoder supply 100 nF | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | X7R, 16 V; imported unchanged; placement pending |
| C7 | CAN supply 100 nF | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | X7R, 16 V; imported unchanged; placement pending |
| C2 | MCU bulk 4.7 uF nominal | Samsung | CL05A475MP5NRNC | 0402 | C23733 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C23733.pdf) | X5R, 10 V; effective 3.3 V capacitance not qualified |
| R1 | Reset pull-up 10 kOhm | UniRoyal | 0402WGF1002TCE | 0402 | C25744 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25744.pdf) | 1%; imported unchanged |
| R2 | I2C SCL pull-up 4.7 kOhm | UniRoyal | 0402WGF4701TCE | 0402 | C25900 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25900.pdf) | 1%; bus capacitance/rise-time qualification pending |
| R3 | I2C SDA pull-up 4.7 kOhm | UniRoyal | 0402WGF4701TCE | 0402 | C25900 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25900.pdf) | 1%; bus capacitance/rise-time qualification pending |
| C8 | Buck input 10 uF/50 V | Samsung | CL31A106KBHNNNE | 1206 | C13585 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C13585.pdf) | Effective input capacitance/ripple and controlled charging pending |
| C9 | Buck input HF 100 nF/50 V | Yageo | CC0603KRX7R9BB104 | 0603 | C14663 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C14663.pdf) | Close VIN/GND loop required |
| C10 | Buck bootstrap 100 nF/50 V | Yageo | CC0603KRX7R9BB104 | 0603 | C14663 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C14663.pdf) | BST to SW, not to ground |
| C11 | Buck output 22 uF/25 V | Samsung | CL21A226MAQNNNE | 0805 | C45783 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C45783.pdf) | Effective capacitance/loop stability pending |
| C12 | Buck output 22 uF/25 V | Samsung | CL21A226MAQNNNE | 0805 | C45783 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C45783.pdf) | Parallel C11; effective capacitance pending |
| C13 | TMC flying charge pump 22 nF/50 V | Samsung | CL05B223KB5VPNC | 0402 | C307335 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C307335.pdf) | Between CPO and CPI |
| C14 | TMC pump reservoir 100 nF/50 V | Yageo | CC0603KRX7R9BB104 | 0603 | C14663 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C14663.pdf) | VCP to VM, not ground |
| C15 | TMC 5VOUT regulator 4.7 uF/50 V | Samsung | CL21A475KBQNNNE | 0805 | C98192 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C98192.pdf) | Effective capacitance at 5 V must remain adequate |
| C16 | TMC VIO 100 nF/16 V | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | 3.3 V logic |
| C17 | TMC VM HF 100 nF/50 V | Yageo | CC0603KRX7R9BB104 | 0603 | C14663 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C14663.pdf) | Near VS pins and EP |
| C18 | TMC VM ceramic 10 uF/50 V | Samsung | CL31A106KBHNNNE | 1206 | C13585 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C13585.pdf) | Effective capacitance at motor voltage pending |
| C19 | TMC VM bulk 100 uF/35 V | Panasonic | EEEFPV101XAP | SMD 6.3 x 7.7 mm | C178585 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C178585.pdf) | Polarized, pin1 positive; 600 mA/160 mOhm at 100 kHz; ripple/layout pending |
| C20 | TMC VM bulk 100 uF/35 V | Panasonic | EEEFPV101XAP | SMD 6.3 x 7.7 mm | C178585 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C178585.pdf) | Parallel C19; nominal 200 uF total, -20% minimum 160 uF; not a brake |
| C21 | TMC VREF filter 100 nF/16 V | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | VREF to GND |
| R4 | TMC UART TX isolation 1 kOhm | UniRoyal | 0402WGF1001TCE | 0402 | C11702 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C11702.pdf) | TX through resistor, MCU RX directly on single-wire UART |
| R5 | TMC phase A sense 180 mOhm/1 W | Milliohm | HoLRT1206-1W-180mR-1% | 1206 | C5127775 | Extended | [Supplier record](https://www.lcsc.com/product-detail/C5127775.html) | 1%; fixed official native import, 0.18 Ω and both pads audited; nominal 1.149 A RMS full scale; proposed firmware cap 1 A; pulse/temperature/Kelvin review pending |
| R6 | TMC phase B sense 180 mOhm/1 W | Milliohm | HoLRT1206-1W-180mR-1% | 1206 | C5127775 | Extended | [Supplier record](https://www.lcsc.com/product-detail/C5127775.html) | Match R5; official footprint, no manual edits |
| R7 | TMC ENN pull-up 10 kOhm | UniRoyal | 0402WGF1002TCE | 0402 | C25744 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25744.pdf) | Hardware disabled while MCU resets |
| R8 | TMC STEP pull-down 10 kOhm | UniRoyal | 0402WGF1002TCE | 0402 | C25744 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25744.pdf) | Defined reset state |
| R9 | TMC DIR pull-down 10 kOhm | UniRoyal | 0402WGF1002TCE | 0402 | C25744 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25744.pdf) | Defined reset state |
| R10 | TMC VREF upper 10 kOhm | UniRoyal | 0402WGF1002TCE | 0402 | C25744 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25744.pdf) | From 5VOUT; review divider/regulator tolerances |
| R11 | TMC VREF lower 10 kOhm | UniRoyal | 0402WGF1002TCE | 0402 | C25744 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25744.pdf) | To GND; nominal VREF 2.5 V |
| L1 | Buck 3.9 uH power inductor | Bourns | SRN6028C-3R9M | 6 x 6 mm, max 2.8 mm height | C19947652 | Extended | [Bourns datasheet](https://bourns.com/docs/Product-Datasheets/SRN6028C.pdf) | +/-20%; DCR 28 mOhm +/-20%; 3.3 A Irms / 3.9 A Isat typical at 25 C; own 6.5 mm lands reviewed; screening calculation updated |
| J_SWD | Official Standard JST SWD + Reset Side | JST | SM05B-SRSS-TB(LF)(SN) | JST SH 5-pin, 1 mm, side entry | C136657 | Unverified | [JST SH series](https://www.jst-mfg.com/product/pdf/eng/eSH.pdf) | Official package 0.8.0 installed; VOUT/VTREF distinction unresolved |
| J_USB | USB-C PD + USB2 receptacle | HRO | TYPE-C-31-M-12 | 16 native ports, SMT + shell slots | C165948 | Extended | [Manufacturer drawing](references/TYPE-C-31-M-12.pdf) | Draft instantiated; 5 A / 20 V nominal; footprint dimensions differ from drawing: BLOCKING Stage 2/3 issue |
| Q_PD | TCPP high-side sink MOSFET | ST | STL11N3LLH6 | PowerFLAT 3.3 x 3.3, supplier drain EP pin9 | C2965326 | Extended | [ST DocID17755](references/STL11N3LLH6.pdf) | 30 V; native draft instantiated; source/drain/EP links audited; not complete inrush/reverse/regen protection |
| Power-path parts | Inrush/current/reverse protection | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | Qualification must precede connecting input to buck/motor |
| D_USB | USB data ESD | TI | TPD2EUSB30ADRTR | SOT-9X3-3 | C94934 | Extended | [TI Rev G](references/TPD2EUSB30A.pdf) | D+1/D-2/GND3; imported custom-symbol reference text missing, draft board annotation added |
| D_VBUS | Input TVS | ST | ESDA25P35-1U1M | DFN1610-2 | C1974707 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C1974707.pdf) | 22 V stand-off; not a 24 V clamp or motor brake; imported rotation issue blocks schematic visual qualification |
| C22 | TCPP decoupling 100 nF/16 V | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | V3V3 to ground |
| C23 | CC1 330 pF/50 V | CCTC | TCC0402COG331J500AT | 0402 | C5448795 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C5448795.pdf) | C0G, +/-5%; official replacement for excluded X7R candidate; total capacitance qualification pending |
| C24 | CC2 330 pF/50 V | CCTC | TCC0402COG331J500AT | 0402 | C5448795 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C5448795.pdf) | Match C23; own unchanged official footprint |
| C25 | Input 2.2 uF/50 V | Taiyo Yuden | UMK107BBJ225KA-T | 0603 | C268016 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C268016.pdf) | X5R; effective capacitance/inrush pending |
| C26 | TCPP IN_GD HF 100 nF/50 V | Yageo | CC0603KRX7R9BB104 | 0603 | C14663 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C14663.pdf) | X7R; placement pending |
| C27 | VBUS ADC filter 100 nF/16 V | Samsung | CL05B104KO5NNNC | 0402 | C1525 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C1525.pdf) | Unpowered MCU injection unresolved |
| R12 | FLT pull-up 10 kOhm | UniRoyal | 0402WGF1002TCE | 0402 | C25744 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25744.pdf) | Open-drain fault input |
| R13 | OVP upper 100 kOhm | Yageo | RT0402BRD07100KL | 0402 | C852472 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C852472.pdf) | 0.1%, 25 ppm/C; static screen only |
| R14 | OVP series 1 kOhm | UniRoyal | 0402WGF1001TCE | 0402 | C11702 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C11702.pdf) | 1%; exact TCR/leakage/loading qualification pending |
| R15 | OVP lower 6.04 kOhm | Yageo | RT0402BRD076K04L | 0402 | C852895 | Extended | [Supplier datasheet](https://www.lcsc.com/datasheet/C852895.pdf) | 0.1%, 25 ppm/C; transient margin BLOCKED |
| R16 | VBUS sense upper 220 kOhm | UniRoyal | 0402WGF2203TCE | 0402 | C25767 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25767.pdf) | 1%; connected to protected output |
| R17 | VBUS sense lower 10 kOhm | UniRoyal | 0402WGF1002TCE | 0402 | C25744 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C25744.pdf) | 1%; measurement calibration required |
| R18 | VBUS ADC series 1 kOhm | UniRoyal | 0402WGF1001TCE | 0402 | C11702 | Basic | [Supplier datasheet](https://www.lcsc.com/datasheet/C11702.pdf) | 1%; part of ADC settling/filter network |
| D_VM / brake parts | Motor transient/regen protection | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | Voltage margin and energy qualification required |
| C* | VM/logic/charge-pump/encoder/USB/buck decoupling | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | Every capacitor needs exact value, rating and supplier import |
| R* | Bias, pull-ups, dividers, SWD/UART/IO support | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | Exact per-reference list requires completed schematic |
| R_CAN / termination control | Selectable CAN termination | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | 120 ohm resistor plus verified selectable connection |
| TEMP | Temperature sensor or NTC network | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | Thermal trip, fault behavior and sensing placement |
| LED* | Power, status, fault indicators | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | Exact LED and current-limiting resistor imports |
| J_IO | Consolidated CAN/STEP/DIR/limits/low-voltage IO | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | Final pin count, current and access clearance |
| J_MOTOR | Four-wire motor connection | BLOCKED selection | BLOCKED | BLOCKED | BLOCKED | Unverified | Pending | Current rating for intended phase-current convention |

The grouped pending rows are a coverage checklist, not an assembly BOM.
Do not export or order them. A complete per-reference BOM must be reviewed
before placement and routing; supplier substitutes require new imports and
validation.

## Supplier import evidence

Raw records and converter outputs are preserved in evidence/rev-0.0.2-alpha.0.
Reported LCSC stock from those records: C1525 869375, C23733 100, C25744 235900, C25900 420100, C12084 17337.
These values may be cached; recheck assembly inventory before freezing the BOM.
C52923 / Samsung CL05A105KA5NQNC, 1 uF, 0402, Basic, was also imported as a
support-component candidate but is not instantiated and has no production reference.

The protected PD input, programmer power and IO still require a complete per-reference BOM.
No grouped pending row can be used as a fabrication BOM.

## Additional imported candidates and exclusions (not assembly parts)

- TI TPS259470LRPWR, C3662793, QFN10 / 2 x 2 mm, Extended: exact released
  import retained for input inrush/reverse-current protection investigation; not
  instantiated. [TI datasheet Rev C](https://www.ti.com/lit/ds/symlink/tps25947.pdf).
- C52923 (1 uF) is an unused support candidate; C25767 is now active R16.
- C5127775 converter defect is resolved upstream and in this board's official
  regenerated import. Historical generic output imports/C5127775.tsx remains
  excluded; active R5/R6 use imports/HoLRT1206_1W_180mR_1_.tsx.
- C5127776 / Milliohm HoLRT1206-1W-150mR-1%, 1206, 150 mOhm, 1 W, 1%,
  Extended: official native import/pin/pad audit passes; unused electrical
  replacement candidate for C723743. AEC-Q200 qualification is not established.
- C2046441, C5127782 and C723743 remain library-unavailable and excluded.
  C19947652 replaces C2046441 using its own official Bourns footprint;
  C5127775 replaces the unavailable C5127782 electrically.
- Prior C57269 4.7 uH and C723709 200 mOhm imports are retained but no longer
  instantiated. Supplier stock observations below describe historical candidates.
- Raw C167251 identifies BL1084-33-CY LDO and was rejected as an inductor candidate.

The latest supplier pages were observed on 2026-10-02, but cached counts vary.
C57269 JLC page displayed 51,228 stock and 49,442 available order quantity;
C723709 LCSC pages displayed 625 to 2,370 stock; C178585 displayed 525 stock,
while raw library JSON reported 1,798. These differences prevent an inventory
freeze claim. Recheck actual assembler stock from the final BOM before fabrication.

Revision 0.0.4 supplier library identities and Extended classifications were
checked on 2026-10-02 from preserved official records for C19947652, C5127775
and C5127776. Successful import is not proof of assembly stock. Current JLCPCB
assembly inventory for these replacements is unverified and remains a Stage 2
BOM qualification item; no inventory freeze or assembly BOM is claimed.

Latest recheck preserves all selected part values and operating assumptions.
C79815 and C465949 Extended classifications were checked from fresh official
raw records; their generated definitions are byte-identical to direct converter
0.0.366 reproduction. These checks do not establish assembly stock, 3D model
registration, resistor pulse capability or prototype operation.


## Selected alternatives — 0.0.6

C19947652 is selected for L1; C5127775 is selected for both R5/R6. Their own
unaltered official footprints are used. Original C2046441/C5127782 imports are
excluded and no active circuit requires them. C5127776 is the verified
150 mOhm electrical alternative for excluded C723743, retained unpopulated;
the active sense pair remains 180 mOhm. No AEC-Q200 claim is made.
Selection and remaining qualifications are recorded in
[evidence/rev-0.0.6-alpha.0/SUBSTITUTIONS.md](evidence/rev-0.0.6-alpha.0/SUBSTITUTIONS.md).

## Revision 0.0.7 USB additions

All eight new active supplier identities were officially regenerated and audited
with CLI 0.1.2232 / EasyEDA 0.0.368; 38 native pin/pad links survive conversion.
Raw supplier records classify these eight as Extended. C106206 X7R330p is
excluded; C5448795 C0G330p is selected for C23/C24. GCT USB4105-GF-A C3020560
is imported but unselected: its 0.70 mm shell slots differ from the 0.60 mm
manufacturer recommendation. HRO C165948 remains a blocked draft component,
not an approved fabrication choice. See references/USB-PD-REVIEW.md.
No assembly availability freeze, paste approval, mechanical fit or full BOM
qualification is claimed. The official programmer remains uninstantiated.
