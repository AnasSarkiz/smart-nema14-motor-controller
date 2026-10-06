# Encoder removal — 0.0.40-alpha.0

U4 (AS5600-ASOM / C79815) and C6 (its 100 nF supply bypass) are removed from
both native schematic and PCB at the user's request. The selected STEPPERONLINE
14HM11-0404S has a single front shaft and no qualified magnet/encoder arrangement.
Motor control is open-loop: commanded steps are not measured shaft position.

R2/R3 are retained at 4.7 kohm because the same I2C bus connects STM32 U1 to the
TMP112 temperature sensor U9. The former Encoder A4 sheet is now I2C. Every one
of the remaining 109 electronic references has a native purpose note; default
assembly still fits 108 references and only the CAN endpoint link R50 is DNP.

Existing supply and bus trees originally terminated at encoder pads. The saved
source routes now join remaining real pads using their existing corridors.
Encoder-only signal and ground stubs are removed. Two U4-owned filled contacts
are retired; the required SDA junction and ground return use ordinary through
0.30/0.60 mm vias at (-0.635,3.05) and (1.8807994,2.2950079) mm. The central
GND pour/stitch is retained because it serves the remaining board. Rejected
open/collision candidates are preserved as evidence; none is adopted. Pours
regenerate their cutouts around the removed pads and relocated vias.

Native build has zero errors: 327 traces,224 vias,82 pours; zero opens/dangling
items/shorts. Strict actual copper/drill/edge/keepout checks and all 82 filled
networks pass. All 411 surviving purchased-pin electrical partitions, remaining
placements/pads and 108 fitted CAD entries match the previous revision;267
unaffected fixed-copper net/layer groups are geometrically exact. Full pour
identity is not claimed because native cutouts regenerated. The programmer's
38 physical pin/net checks and VOUT isolation pass unchanged. Hardware flashing
and SWD timing remain untested.

Fresh review Gerbers/drills/BOM/CPL match source identities and 108 fitted parts;
four supplier rotations remain unverified. Width floor/motor-tolerance and USB
path screens pass their stated analytical scope. Uniform0.30/0.45 mm resizing,
outer-only power routing, four exact public stock gaps, supplier silk/CAM approval,
stackup/plating/filled-process acceptance and loaded power/thermal qualification
remain incomplete as documented in BOARD-REVIEW-39.md. No fabrication or hardware
readiness is inferred from encoder removal. Official unused imports/models,
mechanical references and historical evidence remain preserved.

Evidence: evidence/rev-0.0.40-alpha.0/. Current review artifacts are also included
in build/qualification-review.zip. **PROTOTYPE FABRICATION READY: NO.**
