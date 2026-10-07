# TMC2209 exposed-pad thermal construction

ADI TMC2209 Rev1.09 §21.1–21.2 requires thermal conduction from the exposed
die pad into a solid ground plane. The original 62 ordinary vias had no via
within 3 mm of U2. The two outside-pad trial vias passed clearances, but actual
top copper erosion showed only a 0.15–0.20 mm connection neck. That trial is
preserved as unqualified thermal spreading; it is not the accepted solution.

The replacement uses five explicitly named native thermal vias within the
unchanged official U2 pin29 exposed pad. See
[`tmc2209-thermal-vias.json`](../src/routing/tmc2209-thermal-vias.json).
Each is a full four-layer through via with 0.30 mm drill and 0.45 mm pad.
The unchanged independent checker verifies that each annulus lies completely
inside its own ground pad and that every other pad, track, drill and keepout
retains its original clearance. Native filled-copper checks retain one physical
GND network. No supplier footprint, pin or model definition was edited.

These five features require **IPC-4761 Type VII epoxy filling and copper capping**,
with planar, solderable ENIG top caps. Bottom mask is tented; the top exposed
pad stays open. The official native board manufacturing flag allows this
intentional construction; autorouting still has `allowViaInPad=false`.
`scripts/check-tmc-thermal-vias.mjs` independently re-enables the original
official via-in-pad check for every emitted via and requires exactly these
five owner contacts, with zero unlisted or foreign contacts. The original
strict drill checker is unchanged. Reproducible negative fixtures reject a
wrong net, wrong drill, and an extra ordinary same-net pad contact.

Native solder paste remains the original 2.449995 × 2.449995 mm aperture over
the 3.499993 × 3.499993 mm exposed pad: 49% area coverage. Filled planar caps
are required to prevent solder wicking into the five holes. Confirm the exact
fill/cap coordinates, cap finish/flatness, top/bottom mask and exposed-pad
stencil treatment in the final JLCPCB CAM and assembly quote. Ordinary drill
files alone do not order selective filling/capping. Its added fabrication
cost is not yet quoted; do not silently substitute open via-in-pad holes.

The datasheet's 30 K/W value is for a 70 × 133 mm JEDEC board and does not
qualify this 35 × 35 mm controller. Actual barrel plating, copper stackup,
spreading resistance, linear-regulator and switching losses, ambient and
assembled motor/carrier conditions need the final loaded thermal review.
Physical temperature and load tests remain pending; thermal geometry passing
does not establish hardware operation or fabrication readiness.

Current thermal replay evidence:
[`thermal051`](../evidence/rev-0.0.50-alpha.0/routing/thermal051):
53/120 complete nets, 298 opens, 81 tracks and 67 vias, including these five
thermal features. There are zero other native errors and zero strict copper
violations. All previous 53 complete nets remain physically joined. This
thermal candidate has not changed the published routing count by itself.

The five thermal features are adopted in revision51 after the power059 replay:
54/120 complete nets,291 opens,87 tracks and71 total full through vias,zero other
native or unchanged strict errors. The direct thermal path and every prior
physical network remain intact after the FET-source repairs. CAM,quote and
loaded/hardware qualification remain pending.
