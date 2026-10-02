# USB-C / native UCPD frontend review - BLOCKED

Revision 0.0.7-alpha.0; reviewed 2026-10-03 Europe/Tirane (2026-10-02 UTC).
This is an incomplete schematic, not a working or fabrication-ready controller.

## Implemented connections

J_USB C165948 has both VBUS banks connected, both ground banks and all shell
stakes grounded, duplicated USB D+/D- contacts joined, and both SBU contacts
marked no-connect. U3 C1121848 protects both CC paths to STM32 pins 28/27.
Q_PD C2965326 uses source pins 1-3 toward VBUS_PROTECTED, gate pin 4 to U3,
and all drain contacts 5-8 plus supplier exposed-pad pin 9 toward VBUS_CONN.
The manufacturer drawing shows the drain and exposed metal as common; this
is not a source-to-drain short. D_USB C94934 pins 1/2/3 are D+/D-/GND.
D_VBUS C1974707 pin 1 is cathode, pin 2 anode/GND.

PB12 drives DB; PB13 reads open-drain FLT with a 10 kOhm pull-up. PA9/PA10
are grounded because TCPP provides dead-battery Rd. Firmware must retain
native PA11/PA12 USB mapping and initialize UCPD sink Rd before raising DB.
No firmware or cold-start test exists. TCPP protection cannot negotiate PD.

VBUS_PROTECTED, VBUS_INRUSH_OUT and VM are deliberately separate. The buck
has no implemented upstream source. Inrush, current limiting, reverse-current
isolation, motor power gating, discharge and regeneration remain unfinished.
No implicit bridge or bypass substitutes for these missing circuits.

## Preliminary static calculations

R13 100 kOhm C852472, R14 1 kOhm C11702 and R15 6.04 kOhm C852895 give
Vtrip = Vthreshold * (1 + (R13 + R14) / R15).
ST specifies threshold 1.20-1.34 V, nominal 1.27 V. Nominal trip is 22.507 V.
A -40 to +85 C screen uses 0.1%/25 ppm precision resistors and an unqualified
100 ppm bound for R14: 21.158-23.868 V, only 0.132 V below TCPP's 24 V
absolute input/source limit at the high corner. Threshold loading/leakage,
aging, actual R14 TCR and transient overshoot are not bounded. This does not
qualify 20 V PD protection. HRO's specified temperature range is only -30 to
+80 C, so the wider screen is not a claimed board operating range.

The ESDA25P35 input TVS has 22 V working stand-off and 41 V clamp at its
specified 35 A pulse. It does not guarantee a 24 V clamp and is not a motor
brake. Fixed absolute OVP also cannot validate the negotiated 5/9/12/15/20 V
contract. Contract-aware shutdown and response timing remain design work.

C23/C24 use official C5448795, 330 pF, 50 V, C0G, 5%. The earlier X7R
C106206 is excluded: its tolerance/temperature upper screen plus TCPP/MCU
capacitance could exceed the 600 pF CC budget. The C0G tolerance-only range
is 313.5-346.5 pF. Adding ST's generic TCPP/MCU table ranges gives
413.5-536.5 pF; exact MCU input capacitance, capacitor temperature/voltage
bounds and PCB parasitics remain unqualified. This is a screening calculation.

R16 220 kOhm, R17 10 kOhm, R18 1 kOhm and C27 100 nF feed PA0.
Nominal divider is 23:1; 21 V maps to 0.913 V. Nominal filter time constant is
1.057 ms. Firmware needs calibration/settling handling. Unpowered MCU input
injection and startup sequencing have not been resolved.
Calculations are preserved in evidence/rev-0.0.7-alpha.0/USB-PROTECTION-SCREEN.json.

## Component blockers and fixture findings

**C165948 blocks Stage 2 footprint approval and Stage 3 placement.** Reviewed
HRO drawing specifies shell slots 0.60 x 1.40 and 0.60 x 1.10 mm; official
import contains 0.80 x 1.60 and 0.80 x 1.40 mm. SMT land length is 1.30 mm,
versus drawing 1.00 mm. No supplier approval for these differences is present.
No imported definition was patched. The replacement investigation C3020560,
GCT USB4105-GF-A, also imports 0.70 mm slots versus drawing 0.60 mm, exceeding
the drawing's +/-0.05 mm land tolerance. It remains an unselected candidate,
not a qualified workaround. Both manufacturer drawings were rendered/read.

**Custom-symbol output blocks complete Stage 2 visual qualification.** Latest
imports C2965326, C94934 and C1974707 omit reference text inside their custom
symbols. Native board text identifies these parts for draft review. C1974707
still renders its ports horizontally despite schRotation=270; schematic-placement
continues to request a vertical orientation. Its generated ports are x=6.5/7.3,
y=6/6. No imported symbol was edited, warning suppressed or check weakened.
This is an unresolved tooling/import limitation, independent of pin connectivity.

The separate 80 x 30 mm USB fixture checks eight supplier identities and all
38 raw-symbol/native-pin/pad mappings, preserving the connector's alphanumeric
contact aliases. It has no routes or vias. Initial fixture omitted the MOSFET's
internally common drain connections and flagged four 0 mm pad clearances
between pins 5/6/7/8 and 9 (minimum 0.1 mm). The fixture now joins these
manufacturer-common terminals to one net, like the actual draft; no DRC rule
was disabled. ST page 12 shows a continuous drain land. Imported drain lands
still need paste/thermal/assembler review; passing connectivity is not that review.
The initial fixture also reported a connector-access warning. Native fixture
coordinates were corrected to expose its cable-facing edge and rechecked:
zero placement errors and warnings. This is still isolated component geometry,
not motor-board placement.
No actual controller placement has been approved.

## Sources and visual evidence

- ST TCPP DS12900 Rev 7, Table 1, electrical limits, startup section 6.5 and
  application tables 10/13: https://www.st.com/resource/en/datasheet/tcpp01-m12.pdf
- ST guidance on protected UCPD dead-battery pins:
  https://community.st.com/stm32-mcus-60/faq-using-dead-battery-pins-in-an-stm32-with-an-integrated-ucpd-136279
  Manufacturer guidance read online; no firmware validation claimed.
- HRO drawing: references/TYPE-C-31-M-12.pdf, rendered TYPE-C-31-M-12-drawing.png.
- GCT drawing Rev B: references/USB4105-GF-A.pdf, rendered USB4105-GF-A-drawing.png.
- ST STL11N3LLH6 DocID17755 Rev 3: references/STL11N3LLH6.pdf,
  rendered/read pages 1 and 12 for pinout and common-drain land.
- ST ESDA25P35 DocID029556 Rev 2: references/ESDA25P35-1U1M.pdf,
  rendered/read page 1 for polarity. Current family electrical specifications
  also reviewed online; old supplier PDF is identified explicitly.
- TI TPD2EUSB30A Rev G: references/TPD2EUSB30A.pdf,
  rendered/read page 3 for pinout.
- C0G exact supplier identity/value/tolerance:
  https://www.lcsc.com/product-detail/multilayer-ceramic-capacitors-mlcc-smd-smt_cctc-tcc0402cog331j500at_C5448795.html
- Precision-resistor manufacturer series/ordering code:
  https://yageogroup.com/content/datasheet/asset/file/PYU-RT_1-TO-0-01_ROHS_L

All PNG evidence is under evidence/rev-0.0.7-alpha.0/. No supplier stock is
reserved, no complete BOM is frozen, and no physical protection test exists.
