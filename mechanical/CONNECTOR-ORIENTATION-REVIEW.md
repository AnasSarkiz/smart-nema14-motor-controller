# Connector orientation review — 0.0.19-alpha.0

All four actual native 3D connector openings face outward. No electronic rotation or placement correction is required. Each connector is side entry; the whole connector body need not sit flush with the board edge. The plug must have a clear outward insertion and straight cable exit corridor.

| Reference | Exact connector / JLCPCB | PCB side / rotation | Cable exit viewed from above | Outer model setback from PCB edge | Remaining screened plug clearance |
| --- | --- | --- | --- | --- | --- |
| J_USB | GCT USB4110-GF-A / C5143397 | top / 0° | lower edge, −Y | −0.090 mm (slight protrusion) | 2.2331 mm |
| J_MOTOR | JST SM04B-GHS-TB / C189895 | top / 180° | upper edge, +Y | 3.2670 mm | 2.0643 mm |
| J_IO | JST SM10B-SRSS-TB / C160409 | bottom / 90° | right edge, +X | 0.8620 mm | 0.1643 mm |
| J_SWD | JST SM05B-SRSS-TB / C136657 | top / 90° | right edge, +X | 0.4625 mm | 1.0385 mm |

Setbacks measure the exported model's outer bound, not an independently dimensioned mouth datum. Rotation numbers alone do not establish opening direction. J_IO's generated bottom CAD rotation is Y=180°/Z=270°; its actual exported mouth was reviewed from both sides and points +X. The manufacturer's SH and GH side-entry drawings were rendered and inspected alongside the model views. GCT exact STEP registration and the imported footprint audits remain applicable.

All 111 current component placements and CAD registrations exactly match the mounted model input. Every connector SMT land matches, including the bottom layer. Fresh exact carrier/fastener versus all 111 mesh-envelope checks pass, and the constrained mating screen was rerun. The minimum I/O margin is 0.164285 mm after 0.40 mm static allowance and 0.135715 mm analytical load deflection; this is tight and needs a physical fit test with SHR-10V-S/AWG28. JST actual mating STEP models remain unavailable; the plugs are explicitly drawing-based clearance envelopes. USB overmold ≤12×7 mm; route wires straight outward beyond the reviewed envelope before bending. Do not bend them inward toward the motor or carrier.

The native placement check reports zero errors/warnings. Formatting and TypeScript pass. No purchased definition, footprint, pin mapping, placement, electronic wiring or saved copper changed. The prior five native checks and partial-copper audit remain applicable. This review does not complete the 88 unfinished connections, final copper/current/thermal/USB checks, CAM or physical tests. The design remains an untested routing prototype.

Evidence: `evidence/rev-0.0.19-alpha.0/connector-orientation/ORIENTATION-REVIEW.json`, four isolated opposite-view renderings, connector-access overview, rendered manufacturer drawings, exact input hashes and correspondence report. The overview uses native geometry without the PCB artwork texture, and omits the motor to expose the underside. The separate mounted assembly still contains the exact unchanged motor.

Reproduce the rendered review from a matching mounted export and current partial circuit:

```sh
.mechanical-venv/bin/python mechanical/render-connector-orientation.py --current-circuit evidence/rev-0.0.19-alpha.0/current-partial/circuit.json --mounted-circuit dist/mounted-assembly/circuit.json --glb dist/mounted-assembly/3d.glb --output-dir evidence/rev-0.0.19-alpha.0/connector-orientation
.mechanical-venv/bin/python mechanical/check-front-carrier.py
python3 mechanical/check-carrier-tolerance.py
.mechanical-venv/bin/python mechanical/check-mating-envelopes.py
```

The renderer asserts current placement/CAD/land correspondence before accepting historical mounted geometry. Rebuild mounted geometry if these assertions fail. Dist files are reproducible build outputs; hashes identify the exact inspected input. Rendered images are not physical photos or physical test evidence.
