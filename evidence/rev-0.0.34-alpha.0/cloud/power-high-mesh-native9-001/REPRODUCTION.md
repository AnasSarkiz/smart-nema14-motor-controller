# Native Pipeline9 mesh experiment

This is the installed official @tscircuit/capacity-autorouter 0.0.958
AutoroutingPipelineSolver9_PreloadedTraceGraph. No alternate router or
algorithm implementation is used. Package/lockfile versions remain unchanged.

Run at the repository root on Linux with the pinned Bun runtime:

```bash
python3 scripts/run-cloud-routing.py \
  scripts/native-seeded-power-high-pipeline9-cloud.circuit.tsx \
  evidence/native9-reproduction-NEW-FOLDER \
  --native-pipeline9-input \
  evidence/rev-0.0.34-alpha.0/cloud/seeded-power-high-native9-002/phase-1-stage-1-input.json \
  --max-node-dimension 3 --max-node-ratio 30
```

The SDK wrapper validates and forwards every captured SRJ field unchanged.
The capture has 7655 obstacles, one connection with two real pad roots,
four copper layers and .30/.60 mm new routing via minima. The original
002 SOURCE-SNAPSHOT contains its six synthetic via contacts and gate/pulldown
seed; current default source has the smaller three-branch experiment instead.
SOURCE-ANCHOR.json distinguishes these sources. The earlier actual native
input coverage check verifies all 195 fixed annuli on all four layers.

Public mesh options alone change from dimension15/ratio6 to dimension3/ratio30;
minNodeArea stays .01 and effort stays 1. Drill, copper, clearance and
board-edge constraints remain unchanged. Pipeline9 reported 65227 merged
regions, 68894 subdivided regions, 211696 edges and then portPointPathingSolver.
The mesh option change passed the edge stage that timed out in the baseline.
BUILD-STATUS.json records the final elapsed time, peak sampled RSS and outcome;
PROGRESS.json is the most recent completed progress callback, not wall time.

Explicit access/trunk alternatives were measured with the repository's
candidate inspector while this immutable input ran. All contain violations
and are unadopted. These measurements do not include pour/reference checks
and cannot establish a qualified route. The inspector is a clearance check,
not an alternate autorouter.

Any solved SRJ is a candidate only: adoption requires supported native source,
a fresh full CLI build, actual copper/filled/USB/power/reference checks and
matching verified public publication. Timeout, guard termination, partial
paths and seed output do not establish completed routing or fabrication readiness.
