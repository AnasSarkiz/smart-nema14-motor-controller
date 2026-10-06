# Sources and review scope

## Revision 0.0.41 replacement review — 2026-10-06

- Fresh official ADI [TMC2209 Rev 1.09](https://www.analog.com/media/en/technical-documentation/data-sheets/TMC2209_datasheet_rev1.09.pdf)
  saved as `references/TMC2209-rev1.09.pdf`: order codes p. 2 establish tray
  versus tape/reel only; pin table pp. 9-10 permits pin 25 at GND. The unchanged
  current-control/thermal limits remain applicable. Hardware qualification is pending.
- Fresh official TI [SLVSAC2G](https://www.ti.com/lit/ds/symlink/tpd2eusb30a.pdf)
  saved in revision 41 evidence: common DRT pin table p. 3, electrical p. 5 and
  0..3.3 V USB application pp. 9-10. Non-A TPD2EUSB30DRTR retains footprint,
  0.7 pF typical capacitance and stated 8 V clamp limit at 1 A, but raises
  stand-off/breakdown from 3.6/4.5 V to 5.5/7 V. These component facts do not
  establish complete STM32/system ESD immunity.
- Official JLCPCB public shop queries and fresh official imports identify
  genuine TRINAMIC C2150710 and TI C97502. Clone-brand equivalents are not used.
  Public shop inventory is not assembler allocation. U1 sourcing is unresolved;
  Q_PD's user screenshot establishes 100 LCSC units, a separate inventory.
- Both fresh imports retain exactly the former raw pad shapes and identical
  downloaded STEP/OBJ bytes. Original modules/assets remain preserved.


Read on 2026-10-02. Web sources may serve cached text; displayed stock counts
are not treated as current assembly inventory or reservations.

| Source | What was established | What remains unverified |
| --- | --- | --- |
| [tscircuit handbook code guide](https://raw.githubusercontent.com/tscircuit/handbook/main/guides/code.md) | Current guide consulted before edits | No handbook exemption invoked |
| [Handbook bootstrapping guide](https://raw.githubusercontent.com/tscircuit/handbook/main/guides/bootstrapping-repos.md) | Repository setup conventions consulted | Board-specific workspace rules govern task isolation |
| [ST STM32G0B1 datasheet DS13560 Rev 6](https://www.st.com/resource/en/datasheet/stm32g0b1cb.pdf) | Table 12 critical pin functions; family interfaces; 48-pin CC availability | Full alternate-function allocation, electrical review and rendered package review |
| [LCSC C2847904](https://lcsc.com/product-detail/Microcontroller-Units-MCUs-MPUs-SOCs_STMicroelectronics-STM32G0B1CBT6_C2847904.html) | Exact MCU identity/package | Live JLC inventory and Basic/Extended classification |
| [ADI TMC2209 Rev 1.09](https://www.analog.com/media/en/technical-documentation/data-sheets/TMC2209_datasheet_rev1.09.pdf) | Pin table, standard support circuit, sense-current and thermal sections consulted | Complete application calculation, footprint and thermal evidence |
| [Supplier-hosted manufacturer TMC2209 datasheet/C465949](https://datasheet.lcsc.com/szlcsc/1912051511_TRINAMIC-Motion-Control-GmbH-TMC2209-LA_C465949.pdf) | Part identity and successful exact supplier import | Live assembler inventory |
| [ST TCPP01 DS12900 Rev 7](https://www.st.com/resource/en/datasheet/tcpp01-m12.pdf) | Table 1 DB/FLT functions and protection/application notes | Complete sink circuit/startup review and rendered land-pattern review |
| [LCSC C1121848](https://www.lcsc.com/product-detail/EMI-Filters-LC-RC-Networks_STMicroelectronics-TCPP01-M12_C1121848.html) | Exact PD protection identity | Live JLC inventory/classification |
| [AS5600 manufacturer-authored datasheet](https://datasheet.lcsc.com/lcsc/1811141115_AMS-AS5600-ASOM_C79815.pdf) | Exact AS5600-ASOM identity and successful supplier import | Complete pin review, magnet design and air gap |
| [AS5600 supplier listing](https://lcsc.com/products/Position-Sensor_11123.html) | C79815 identity | Live JLC inventory/classification |
| [LCSC AP63203 C780769](https://www.lcsc.com/pl/product-detail/C780769.html) | Buck candidate identity/input range | Manufacturer design calculation and import |
| [LCSC TI CAN C12084](https://lcsc.com/product-detail/CAN-ICs_Texas-Instruments-SN65HVD230DR_C12084.html) | Candidate identity; not Tokmas/JSM substitution | Full TI electrical review, import and stock |
| [Required programmer](https://tscircuit.com/tscircuit/standard-jst-programmer) | Direct web view failed; supported CLI installed exact package 0.8.0; installed source/types reviewed | Series resistors and power-mode qualification |
| [LCSC JST C136657](https://www.lcsc.com/product-image/C136657.html) | Five-pin side-entry connector identity agrees with official package source | Mechanical/access and assembler review |
| [Required RP2040 reference](https://tscircuit.com/imrishabh18/rp2040-motor-controller) | Direct web view failed | Source/design reference review remains outstanding; no copying used |
| [STEPPERONLINE rear-shaft reference candidate](https://www.omc-stepperonline.com/nema-14-stepper-l-34mm-w-rear-shaft-screw-hole-gear-ratio-51-1-gearbox-14hs13-0804d-pg51) | Product page specifies rear shaft and rear screw holes | Exact target motor and manufacturer drawing; no hole dimensions adopted |
| [JLCPCB rigid PCB capabilities](https://jlcpcb.com/capabilities/pcb-capabilities/) | Four-layer process, drill/via capability and through-hole-only standard service consulted | Exact ordered stackup, electrical geometry and DFM feedback |

MKS SERVO35D is a concept reference named in the brief; its authoritative
mechanical/circuit documentation has not been qualified for this board.
Downloaded OBJ/STEP files exist for four imported ICs, but their origins,
rotations and body fit have not been visually reviewed.

## Revision 0.0.2-alpha.0 follow-up review

- Current handbook code guide read again from the official repository before edits.
- Released easyeda 0.0.360 installed and its supported download/convert CLI used.
  Raw records retain exact part numbers and Basic/Extended classes for the new imports.
- [Working AS5600 manufacturer PDF](https://datasheet.lcsc.com/datasheet/pdf/fab02cf30a2c48b5aeeebf03db9fe675.pdf?productCode=C79815):
  pin table p. 3, tied 3.3 V rails Figure 13 p. 9, internal PGO pull-up and DIR behavior.
  Runtime readout/volatile configuration only; OTP requirements not implemented.
- [TI SN65HVD230 datasheet Rev O](https://www.ti.com/lit/ds/symlink/sn65hvd230.pdf):
  pin table, 3.3 V supply, RS high-speed mode, 100 nF decoupling and 1 Mbps limit.
- [ST DS13560 Rev 6](https://www.st.com/resource/en/datasheet/stm32g0b1cb.pdf):
  simultaneous candidate pin plan from Tables 12/13 and supply scheme Figure 15.
  No USB/SWD remapping or GPIO sharing is used to conceal a conflict.
- Installed props/core and CLI help confirm A4 sheets, noConnect, net classifications,
  manual schematic layout, PCB-disabled builds and native per-sheet SVG rendering.

The earlier table describes revision 0.0.1 review scope; later evidence supersedes
its MCU/TCPP label-loss, CAN import, class and AS5600 pin-review limitations.
Full package, power-design and mechanical qualification remain unfinished.

## Revision 0.0.3-alpha.0 follow-up review

- [Diodes AP63203 family DS41326 Rev 3-2](https://www.diodes.com/datasheet/download/AP63200-AP63201-AP63203-AP63205.pdf): local PDF retained as references/AP63203.pdf. Rendered/read pp. 2, 9, 10, 11, 13; pin table, fixed feedback, bootstrap and component table reviewed. No full regulator qualification claimed.
- [Sunlord SWPA manufacturer series data](https://datasheet.lcsc.com/lcsc/2310251551_Sunlord-SWPA4030S470MT_C54731.pdf): exact SWPA4030S4R7MT row used; the PDF filename identifies another value in the same series.
- [C57269 JLC supplier listing](https://jlcpcb.com/partdetail/Sunlord-SWPA4030S4R7MT/C57269): exact identity, assembly class and displayed inventory; not a reservation.
- [C723709 Yageo supplier entry](https://jlcpcb.com/partdetail/YAGEO-PE1206FRF470R2L/C723709): exact 200 mOhm / 1 W / 1% identity. Exact manufacturer pulse/derating datasheet remains to be reviewed.
- [C178585 Panasonic entry](https://www.lcsc.com/product-detail/C178585.html): identity, polarity, 100 uF/35 V, body height and supplier ripple/ESR specifications. Full manufacturer capacitor/frequency/temperature review pending.
- [ADI TMC2209 Rev 1.09](https://www.analog.com/media/en/technical-documentation/data-sheets/TMC2209_datasheet_rev1.09.pdf): pp. 9-11, 19, 52-54, 75-77 pin table, support, UART and current calculations read through manufacturer web PDF. Local download timed out; not reported as a local PDF visual review.
- [ST TCPP01 DS12900 Rev 7](https://www.st.com/resource/en/datasheet/tcpp01-m12.pdf): physical pin 6 OVP analog function, 1.20-1.34 V threshold and 24 V absolute limits checked. Local download timed out; full schematic review pending.
- [ST UM2773 Rev 10](https://www.st.com/resource/en/user_manual/um2773-getting-started-with-the-xnucleosnk1m1-usb-typec-power-delivery-sink-expansion-board-based-on-tcpp01m12-for-stm32-nucleo-stmicroelectronics.pdf): authoritative sink reference found; not blindly copied.
- [TI TPS25947 Rev C, May 2026](https://www.ti.com/lit/ds/symlink/tps25947.pdf): reviewed as an unused power-path candidate; C3662793 supplier import succeeds, application and land-pattern not qualified.

Supplier IDs/values/classes were also checked against raw EasyEDA records.
Every new definition is the unchanged released-converter output. Import failures
and rejected identity candidates are recorded in evidence/rev-0.0.3-alpha.0/IMPORT-BLOCKERS.md.

## Revision 0.0.4 importer revalidation — 2026-10-02

- Converter [#587](https://github.com/tscircuit/easyeda-converter/pull/587) and
  [#588](https://github.com/tscircuit/easyeda-converter/pull/588), CLI
  [#5111](https://github.com/tscircuit/cli/pull/5111): merge status independently
  read through GitHub; regression tests/SVG snapshots are upstream. CLI change
  contains dependency changes; no converter fix is copied into this board.
- Official importer CLI 0.1.2230 / released converter 0.0.366: fresh raw JSON,
  generated definition hashes and five-part native pin/pad audit under rev-0.0.4.
- [Bourns SRN6028C datasheet](https://bourns.com/docs/Product-Datasheets/SRN6028C.pdf):
  downloaded references/SRN6028C.pdf; rendered/read page 1 electrical row and
  recommended land pattern. C19947652 is SRN6028C-3R9M, distinct from obsolete
  SRN6028-3R9M / C2046441. DCR is 28 mOhm +/-20%, not a guaranteed 28 mOhm max.
- C5127775 raw Value 180mΩ and C5127776 raw Value 150mΩ are verified against
  native 0.18/0.15 Ω and both pads. 1 W/1% identity comes from exact MPN/raw
  supplier identity and the user's verified electrical findings. Full resistor
  pulse/temperature and current assembler-stock qualification remains pending.
  C5127776 AEC-Q200 qualification is not established.
- All new parts retain their own official footprints. Fixture placement is
  component geometry evidence only; exact motor-dependent board fit is unperformed.

## Revision 0.0.5 latest-runtime blocker recheck — 2026-10-02

Latest package resolution and global wrapper update: tscircuit 0.0.2733,
core 0.0.2052; CLI 0.1.2230 / converter 0.0.366 unchanged. Current official
supplier imports C79815/C465949 were regenerated and raw inputs saved;
direct converter output matches exactly. Raw Extended classifications verified.
Original C2046441/C5127782/C723743 supplier-library failures reproduced with
exit 1; no fallback component or manual patch was introduced. Existing five
verified import definitions/raw records remain unchanged, linked by hashes.
Seven-part geometry fixture checks all 104 raw-symbol/physical-port/pad links;
this is not complete motor-board placement or prototype qualification.

## Revision 0.0.7 USB frontend - 2026-10-03 local time

See [USB-PD-REVIEW.md](USB-PD-REVIEW.md) for precise source pages and actual
rendered pinout/land-pattern reviews. New official raw records and importer
logs are under rev-0.0.7. Latest registry versions are preserved there.
Manufacturer PDFs for HRO, GCT, TI data ESD, ST VBUS TVS and ST MOSFET are
saved alongside this document; the supplier-hosted ST PDFs' older revision
dates are identified explicitly. No unviewed PDF is claimed as a visual review.
No current supplier stock reservation or final assembler availability is claimed.

## Revision 0.0.8 exact motor / assembly

See [mechanical review](../mechanical/REVIEW.md) for the exact official motor
drawing and unchanged STEP ZIP, supplier-preserved manufacturer AS5600
datasheet and visual review pages, primary assembly APIs and all mechanical
assumptions/discrepancies. The exact motor replaces all earlier reference
geometry; no generic NEMA front pattern becomes PCB rear mounting.
