# Remaining manufacturing export issues — 0.0.41-alpha.0

The owned copper and connector-label fixes are complete. These remaining
supplier issues cannot be corrected by moving a trace or changing its width.
AGENTS.md requires unchanged official imported symbols, footprints and pad maps;
source/library fixes must come through a verified released importer/exporter.

## Supplier silkscreen

Run the fresh native full build and Gerber export, then build
`scripts/board-legend-audit.circuit.tsx` and export its Gerbers separately. Run:

```sh
.cloud-tools/cam-venv/bin/python scripts/check-silkscreen-cam.py \
  dist/index/circuit.json FULL_CAM_FOLDER LEGEND_CIRCUIT_JSON \
  LEGEND_CAM_FOLDER SILKSCREEN_REPORT.json
```

The optional diagnostic environment uses PyGerber 2.4.3 and Shapely 2.1.2.
It reads immutable native files and raises on unsupported Gerber constructs.
The owned-label gate passes; the complete production check correctly exits 1.
The fresh revision41 audit finds 541 supplier paths below 0.15 mm, top ink outside the 35 mm outline,
and ink inside the required 0.15 mm mask-opening clearance on both sides.
Exact measurements, canonical input and export hashes are in the current
`evidence/rev-0.0.41-alpha.0/SILKSCREEN-CAM.json`. The owned-text fixture and
native Gerbers are retained alongside it. Both native silk renders were viewed.

Installed props 0.0.689 expose text visibility/size/position through pcbStyle,
but no inherited graphic-path visibility, minimum stroke or mask/outline
clipping control. The native CLI Gerber exporter 0.0.111 does not provide these
controls either. Latest released Gerber 0.0.112 adds a files API, rather than
repairing these defects. Changing copper cannot repair an imported silk line.
The proper fix is supported manufacturing graphic clipping/width handling or a
corrected official supplier import. No generated file or supplier source is patched.

## Four supplier orientations

Native export reports missing authored pin1_location for J_USB and LED_POWER,
LED_STATUS and LED_FAULT. It emits PCB rotations with warnings rather than
verified supplier rotations. The original pad/pin geometry and positions are
preserved, but a silent zero-degree assumption does not resolve that metadata.
Native import fixtures and the complete source are reproducible in this Git
checkout. NATIVE-GERBERS-EXPORT.log and NATIVE-CAM-AUDIT.json retain the findings.
No supported authored pin1_location prop was found in the pinned component API.
Repair importer/core orientation inference or obtain assembler-approved CPL
orientation before ordering; do not add fields to generated Circuit JSON.

## Procurement and process

Revision41 replaces C465949 with genuine C2150710 and C94934 with genuine
C97502, with unchanged official physical pads/models and manufacturer review.
Fresh subsequent public stock queries now return exact genuine ST C2965326
with 100 units; Q_PD does not need a replacement solely for the old missing shop
result. U1 C2847904 remains unresolved, with no verified stocked compatible
LQFP48 alternative. Shop/pre-order results, indexed catalogue stock and allocated
assembly stock differ. No parts are reserved or assembler-approved.

Minimum copper/plating, the selected four-layer stackup and 66 exact owned
filled/capped features require manufacturer acceptance. Current width/power/USB
screens have explicit assumptions; full loaded power/via/thermal and switching
loop review remains unfinished. None of these is established by a successful
native DRC check or by environment setup.

The new actual motor track/barrel loss and required minimum-copper review,
rejected native manual outer-layer candidate, release comparisons and concrete
manufacturer review checklist are in [FABRICATION-REVIEW.md](FABRICATION-REVIEW.md).
Neither uniform 0.30/0.45 mm vias nor outer-only power routing is complete.

**PROTOTYPE FABRICATION READY: NO.** Hardware and firmware remain untested.
