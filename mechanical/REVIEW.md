# Current mechanical scope — revision 0.0.13-alpha.0

The selected motor remains STEPPERONLINE **14HM11-0404S**. Its drawing is
**A0217 revision 0, 2025-07-31**; the historical revision-1 statement below
was incorrect. No manufacturer geometry was changed. The default review BOM
omits U4/C6 and makes no encoder-feedback claim. USB4110-GF-A C5143397 now
passes the manufacturer footprint and exact external-model registration checks;
old USB alternatives below remain unselected historical findings.

The exported native connector CAD and unchanged official motor STEP were
rebuilt with CLI 0.1.2237 and EasyEDA 0.0.369. All 112 CAD objects are present,
and the actual USB GLB vertices pass registration checks. These limited checks
do not approve a mounting carrier, mating cable, harness, tolerances or thermal
fit. The motor remains lifted +65 mm for inspection; the board is unmounted.
Routing remains disabled. Current evidence: `evidence/rev-0.0.13-alpha.0/`.

## Historical mechanical records — superseded where stated above

# Revision 0.0.10-alpha.0 visualization update

Motor raised +65 mm along Z; actual controller shown below in an exploded view.
No separate cover is modeled. This is inspection spacing, not mounting geometry.
Board close-up temporarily hides the motor. Rear mounting/encoder qualification
remains blocked as described below. Official STEP and supplier definitions are
unchanged. Evidence: `evidence/rev-0.0.10-alpha.0/`.

# STEPPERONLINE 14HM11-0404S mechanical review

Revision 0.0.9-alpha.0, 2026-10-03. **Mount unqualified; routing disabled.**

The user selected this exact motor in place of Phidgets 3323_0. The unchanged
STEP and full datasheet downloaded from the [official product](https://www.omc-stepperonline.com/nema-14-bipolar-0-9deg-11ncm-15-58oz-in-0-4a-10v-35x35x28mm-4-wires-14hm11-0404s)
are in `references/motor/14hm11-0404s/`. The PDF drawing A0217 rev. 1 was
rendered to `evidence/rev-0.0.9-alpha.0/motor-drawing.png` and inspected. The STEP
SHA256 is `959f43e95b7840beae5ffbd56e997e23c5004a1b09e16b7caa40400296e46281`.

OpenCASCADE imported one valid solid. Source datums: front face Z=0,
rear face Z=28.2, shaft end Z=-24. The native TSX uses the rear face as world
origin, moving the front face to Z=-28.2 and shaft end to Z=-52.2.
No generic geometry or altered vendor STEP is used. Native GLB and viewer show
this reference alone, and the previous motor/PCB mounting proposal is retired.

The drawing specifies a single Ø5 mm front shaft, 24±1 mm projection;
4×M3 front holes on a 26±0.2 mm square, depth ≥4 mm. The original 2×M1.6
Phidgets rear pattern does not apply. STEP shows rear corner recesses/fasteners
at (±13,±13), but the drawing does not qualify those as controller attachment
points or specify replacement screw length, thread engagement or preload.
Obtain a manufacturer specification or design a separate qualified carrier
before choosing posts/holes. Do not remove structural motor screws on an assumption.

Encoder feedback is optional. This single-shaft motor cannot use the previous
rear-shaft magnet. The user has asked whether an encoder is necessary; no omission
or relocation has yet been approved. Optional electrical draft remains retained.
A front-mounted encoder would need a separately qualified mechanical arrangement.

The vendor STEP header is dated 2018, while the supplied drawing revision is
2025. Both are the official files currently linked for this SKU; their complete
revision compatibility and physical purchased hardware remain unverified.
The STEP's full bounds include modeled wires; approximate BRep bounds are not a
measurement of frame size alone. No frame-dimension mismatch is asserted from
those approximate bounds.

Inspect `dist/assembly/3d.glb`, `3d.png`, `circuit.json` and the offline
`mechanical/assembly-preview.html`. The separate `dist/controller-preview/`
is an unmounted placement draft. PCB, hardware, sensor, connector and cable fit
together **has not passed**. USB footprint blockers remain, including C165948
and the unselected C3020560 alternative. No fabrication readiness claim is made.

## Historical Phidgets review — superseded mechanical target

# Phidgets 3323_0 motor-mounted diagnostic assembly

Revision 0.0.8-alpha.0, 2026-10-03 Europe/Tirane. **Mechanics blocked;
routing disabled; not fabrication ready.** This file supersedes the earlier
unknown-motor requirement. It does not pass a complete-board validation stage.

## Authoritative motor and encoder sources

- [Phidgets 3323_0 product](https://www.phidgets.com/?prodid=342), model
  35STH40-1004B. 1 A/phase, 2.7 ohm, 4.3 mH; the earlier 1.2 A target is
  retired. Proposed firmware limits require RMS/peak and thermal qualification.
- [Official drawing 0DZ.252.001](https://www.phidgets.com/productfiles/3323/3323_0/Documentation/3323_0_Mechanical.pdf),
  retained unchanged in references/motor/3323_0_Mechanical.pdf and visually
  inspected after rendering. Rear view is used, wires toward -Y.
- [Official STEP ZIP](https://www.phidgets.com/productfiles/3323/3323_0/Images/3323_0_3D.zip),
  retained unchanged; its single 3323_0.stp is extracted byte-for-byte.
  OpenCASCADE imports centimetre STEP source units into millimetres.
- AMS AS5600 datasheet v1-02, 2015-Nov-13, from the
  [official component supplier](https://datasheet.lcsc.com/datasheet/pdf/fab02cf30a2c48b5aeeebf03db9fe675.pdf?productCode=C79815).
  Original manufacturer URL returned 404 and no replacement datasheet is
  invented. Reviewed rendered pp. 33-35: package-centered Hall array, 6 mm
  magnet displacement guidance of 0.25 mm, typical 0.5-3 mm air gap,
  SOIC8 dimensions and AGC qualification requirement.

## Exact geometry lock and model findings

| Feature | Official drawing / requirement | Original STEP measurement |
| --- | --- | --- |
| Rear shaft diameter | 3.9 +0/-0.15 mm | **4.0 mm: discrepancy, B014** |
| Rear shaft projection | 12 +0.7/-0.3 mm | 12 mm nominal |
| Rear mounting | 2 x M1.6 through PCB, circle 14.5 +/-0.15 mm | 14.5 mm, modeled minor bores 1.221 mm |
| Rear hole line | 40 degrees from +X in rear view | 40 degrees |
| Screw depth into motor | Strictly below 2.5 mm | Proposed male stud 2.0 +/-0.1 mm; maximum 2.1 mm |
| Motor body | 35.2 mm maximum, 40 mm axial length | 34.95 x 34.95 x 40 mm |
| Front features | 4 x M3 / 26 mm; excluded from PCB rear mounting | Retained only in the original motor model |

Native PCB rear hole centers are exactly +/-(5.553822212612591,
4.660210170227409) mm. Clearance-hole diameter 2.2 mm is a proposal,
not a 2.2 mm thread or altered motor hole. AS5600 native center and magnet
axis are (0,0), bottom sensor faces the magnet. Native CAD retains the
importer's model origin; its encoder origin rounding is 0.0000127 mm.
Nominal centering does not establish physical assembly alignment.

World origin is the PCB mid-plane. PCB is 35 x 35 x 1.6 mm. Motor rear
face is Z=-19.1 mm; original model rear-plane datum (-17.475,17.475,0)
is translated and rotated 180 degrees about X. Motor body extends toward
-Z and rear shaft points toward the PCB. No generic motor geometry or
manually edited original STEP is used.

## Proposed mechanical hardware — not sourced or approved

Generated CAD describes mechanical envelopes only, not electronic component
definitions. All electronic definitions and their CAD metadata remain the
unchanged official supplier/package outputs.

- Nonmagnetic standoffs: 18.3 +/-0.05 mm long, outside diameter 3.2 mm,
  M1.6 male projection 2.0 +/-0.1 mm, top female threaded envelope. Model
  includes proposed 4 mm top screw, 0.3 mm washer and 3.2 mm head envelope.
  Threads are major/minor clearance envelopes, not detailed thread profiles.
  Major-thread overlap with the motor's minor bore is an intentional modeled
  thread-engagement exception; procurement, torque and vibration remain open.
- Nonmagnetic retaining cup: 4.05 mm bore, 8 mm outside diameter, 0.3 mm
  floor, proposed adhesive/jig alignment. The loose bore is not a centered
  press fit. Retention, runout, shaft/motor discrepancy, material, temperature
  and manufacturing tolerances require qualification.
- Diametrically magnetized 6 x 2.5 mm magnet envelope. Exact magnet supply,
  magnetization/field and tolerances are not qualified; no candidate is
  presented as a purchased approved part.

Measured nominal magnet-to-package surface gap: 1.8 mm. Conditional stack
range: 0.8-2.7 mm, using 11.7-12.7 mm shaft projection, proposed floor
0.2-0.4 mm, proposed magnet height 2.4-2.6 mm, standoff 18.25-18.35 mm,
package A maximum 1.75 mm and A2 minimum 1.25 plus A1 minimum 0.10 mm.
This excludes solder height, retention, axial end-play not specified by the
drawing, thermal movement and magnetic qualification. The typical data-sheet
gap range is not an operating guarantee. Check AGC/field and angle performance
on a physical prototype.

The 2.2 mm PCB holes around M1.6 fasteners permit 0.3 mm radial movement,
already larger than the 0.25 mm magnet-axis allowance before adding placement,
motor-hole and magnet-runout tolerances. An axis registration/jig process and
qualified hardware tolerances are required; CAD nominal coordinates alone
do not pass this requirement (B003).

## Actual assembly and visual review

assembly.circuit.tsx uses native assembly.device / assembly.subassembly /
cadmodel APIs from installed core 0.0.2052 / props 0.0.676, verified in local
source and [official documentation](https://docs.tscircuit.com/elements/assembly-subassembly).
It reuses all 56 actual draft supplier components, adds unchanged official
C136657 programmer connector as a separate mechanical envelope and native
rear holes. Programmer VOUT is deliberately unconnected in the fixture;
functional power integration remains unresolved in the main design.

Only the diagnostic view uses these provisional coordinates. This is not an
approved high-current/decoupling/routing layout. Motor, CAN, STEP/DIR and
limit connectors and their mating cables are not selected and cannot be
qualified or shown as completed geometry. USB/C136657 models are present;
full cable/mating access remains unqualified. The programming connector was
rotated toward the right edge after an insertion-direction warning.

Current native PCB PNG, 3D PNG, GLB and interactive viewer were inspected.
Whole, motor-front, rear-stack, side and transparent-board encoder views are preserved
as viewer-*.png in revision 0.0.8 evidence. The viewer uses the actual current
native GLB, with no substituted electronics. Its transparency control was
fixed for the GLB's PCB group, then visually retested; no additional console
error occurred after that repair. It is an offline standalone HTML file.

The user's comparison image identifies HOLRY NEMA14 (35HBSG), a lead-screw
motor with 27/34 mm body lengths. That is a different model from the locked
Phidgets 3323_0 / 35STH40-1004B. NEMA 14 frame size alone does not establish
interchangeable rear geometry. The viewer now exposes the original motor front
and links directly to the official Phidgets ZIP. ZIP-member bytes match the
local STEP exactly; its plain appearance is the original simplified vendor CAD.
Download identity is confirmed; the 4.0/3.9 mm discrepancy still blocks fit approval.

Previous CadQuery inspection renders under previous-jst-orientation/ use
the earlier programmer orientation and are explicitly historical. Exact
measurements and assembly STEP were regenerated after the final connector
rotation; the current native viewer supplies the latest visual review.

## Collision evidence and remaining gates

The exact CAD checker imports all 29 distinct official supplier STEP URLs
for 57 components, and checks their actual circuit-JSON placement alongside
the original motor, PCB and proposed hardware. It reports 62 shape groups.
All pairwise positive-volume intersections and critical distances are saved
in ASSEMBLY-GEOMETRY-CHECK.json, linked to the native circuit SHA-256.

Unresolved USB C165948 model / PCB intersection: **0.358309 mm3**, B015.
Determine model/land/native placement registration before approving fit.
No hand-edited footprint or CAD compensation is allowed. Model contacts at
zero distance to the PCB are not positive-volume collisions. The intentional
modeled motor thread engagement is separately identified.

Measured nominal clearances include AS5600 to standoffs 2.223104 mm,
cup to standoffs 1.65 mm, magnet to standoffs 2.65 mm, magnet to PCB
3.5 mm, and AS5600 to unchanged STEP rear shaft tip 4.6 mm. These are
nominal CAD distances, not fully toleranced manufacturer acceptance.

Official native assembly build: zero generated error elements, no traces or
vias. Official placement DRC reports zero errors/warnings, after the seven actionable
orientation suggestions were fixed through native instance pcbRotation props.
This remains a diagnostic fixture, not qualification of the future routed layout. Existing imported symbol
and power/ground metadata warnings remain visible; none is suppressed or
accepted for fabrication. Functional schematic/BOM blockers remain.

**Mechanics has not passed.** Per the user's sequence, the next manufacturer
USB footprint audit remains gated. The existing B011 HRO/GCT land-pattern
discrepancies remain valid and neither connector is qualified for fabrication.
There is no routed copper, fabrication package, prototype test or order.
