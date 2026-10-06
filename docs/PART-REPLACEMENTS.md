# Supplier substitutions — 0.0.41-alpha.0

U2 changes from TMC2209-LA / C465949 to official TRINAMIC
[TMC2209-LA-T / C2150710](https://jlcpcb.com/partdetail/2242757-TMC2209_LAT/C2150710).
ADI Rev 1.09 p. 2 confirms identical driver hardware with tape/reel rather
than tray packaging. Its unused physical pin 25 remains grounded, explicitly
allowed by the manufacturer pin table. The new import names it UNUSED rather
than the old `_NEG` alias; source wiring uses the official new alias.

D_USB changes from TI TPD2EUSB30ADRTR / C94934 to official TI
[TPD2EUSB30DRTR / C97502](https://jlcpcb.com/partdetail/TexasInstruments-TPD2EUSB30DRTR/C97502).
TI SLVSAC2G supplies a shared DRT footprint/pin table: pin 1 D+, pin 2 D-,
pin 3 GND. Typical capacitance remains 0.7 pF; the document lists an 8 V clamp
limit at 1 A. The non-A part has 5.5 V stand-off and 7 V typical breakdown,
compared with 3.6/4.5 V. TI's shared USB application covers 0..3.3 V signals.
No full STM32/system ESD, surge or hardware USB qualification is inferred.

Both official pad drawings and downloaded STEP/OBJ bytes match the original
parts exactly. Imported symbols/footprints/pin attributes are unmodified.
The new USB symbol supplies its own reference label, replacing the old
board-owned duplicate label. Native purpose notes identify both new selections.
The critical-pin checker now accepts an exact whole alias before tokenized
multi-function aliases, so names such as PDN_UART and D_POS are actually checked.
No required pin, electrical assertion or DRC threshold is removed.

Validation and manufacturing review results are recorded in VALIDATION.md and
`evidence/rev-0.0.41-alpha.0/`. Fresh native build, TypeScript, critical pin labels,
all five native source checks, shorts, snapshots, PCB-disabled physical-pin
checks, assembly inventory, all 82 filled nets, strict copper geometry, widths,
motor tolerance, all 34 power fanouts, USB paths and 38 programmer assertions
pass their stated scope. All four native Gerber layers match the generated
copper; BOM/drill/CPL identity checks pass with four unverified supplier rotations.
All nine schematic sheets, four copper layers and the assembly render were
viewed. Existing TVS rotation, automatic label overlaps, 30 route-width,
23 pin-metadata and four refdes warnings remain disclosed. Existing supplier imports, historical evidence, saved copper,
mechanical references and the local tscircuit skill remain preserved.

Fresh official public shop searches show 16,560 C2150710 and 5,954 C97502 units.
These counts do not reserve assembly stock. U1 remains unavailable in the user's
LCSC listing and has no verified stocked footprint-compatible replacement.
Q_PD remains unchanged; its user LCSC listing shows 100 units. Public JLCPCB
shop searches return no exact U1/Q_PD match, illustrating separate inventory.

Uniform 0.30/0.45 mm via sizing, outer-only power routing, supplier silk/mask/
paste/CPL approval, four supplier orientations, stackup/plating/filled-process
acceptance and full loaded power/via/thermal review remain unresolved. Firmware,
physical programming, USB/ESD and motor testing are pending.
**PROTOTYPE FABRICATION READY: NO.** No order is placed.
