# Revision 0.0.53: USB supply escape and local logic branches

The canonical source replay matches the qualified logic022 trial exactly:
56/120 complete physical nets,240 required open ports,128 tracks,82 ordinary
0.30/0.45mm four-layer through vias,five unchanged TypeVII thermal vias and
seven native filled regions. All previous56 complete nets survive. Native
errors other than opens,unchanged strict copper/drill/contact violations and
filled-copper clearance failures are zero. GND is one physical network.
All four actual trial layers were viewed. Final loaded and manufacturing
qualification remains incomplete; this publication is a WIP prototype.

The original C_USBPHY position/rotation and original(8.3,7.7)GND stitch remain.
Supported board-owned paths repair QSPI_IO2's top approach and move QSPI_IO3
onto inner2 with two ordinary through vias, preserving the inner1 reference.
The complete ordered protected-VBUS subtree is retained; only the220kohm R16
auxiliary-discharge branch moves onto inner2. Its15.75V/1% corner is below73uA.
Original QSPI clock, all VM fanouts, supplier definitions and electronic model
transforms are unchanged. No generated Circuit JSON or vendor edits.

Sixteen explicit native local V3V3 traces include a0.18mm top USB_VDD bypass,
a0.18mm USB_VDD-to-IOVDD1 tie,a0.15mm low-current branch and thirteen0.35mm
local power branches. U1 pin48 is USB_VDD; pin49 is IOVDD1. The complete bypass
path is1.6603mm between pad centres,of which0.8815mm is outside the actual lands,
with zero supply vias. Its full exposed0.18mm copper strip has actual inner1
GND beneath it. A0.15mm top GND corridor joins the capacitor's ground pad to
its original via,0.7815mm away. A0.1989mm reference gap lies wholly beneath
the USB_VDD solder land; it is measured and disclosed,not a full-path plane
coverage claim. This is a geometry screen,not a field solver or transient test.

The capacitor INSTANCE declares a2mm centre-path target because the unchanged
QFN/0402 geometry needs1.6603mm. Core's automatic generic1mm centre limit appears
only when the direct paired bypass trace is declared; it is not a manufacturer
limit. The independent board audit retains a1mm OUTSIDE-LAND limit, checks the
whole capacitor-to-USB_VDD path and actual ground return,and requires every GND
pad in one physical network. Other capacitor defaults and all physical spacing,
contact,drill,edge and thermal-owner guards are unchanged. The native source is
typed and uses the released maxDecouplingTraceLength property.

Bounded installed Pipeline9 attempts and failed candidates are retained under
revision52 routing evidence. Logic021 exhausted path finding; logic024 with the
new branches and supported5x effort identified C_IO2's blocked supply escape.
Neither failure is adopted as copper. Continue repairing that actual escape,
then finish ALL3.3V/core,PD/eFuse,USB and remaining signal connections.

Manufacturing targets now record the actual0.30/0.45mm ordinary vias and0.075mm
nominal ring,matching JLCPCB's published preferred0.15mm diameter difference.
Exactly five manifested TypeVII thermal features remain; historical66-feature
STM32 process counts and82/82 connectivity are superseded. Selective fill/cap,
finished registration,thermal,current,USB,stock allocation and CAM/PCBA quote
confirmation are pending. No physical NVM/PD/temperature/flashing validation.

**PROTOTYPE FABRICATION READY:NO. No fabrication order. Work continues.**
