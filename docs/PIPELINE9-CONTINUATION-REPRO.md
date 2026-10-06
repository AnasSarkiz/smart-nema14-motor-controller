# Selected DIR routing bottleneck — native Pipeline9

This is a captured, unmodified native routing input for an isolated source
candidate based on c299b12e9311a0e9c58096d7a6e76044f88b4758, board revision
0.0.41-alpha.0. It is an unsent upstream review packet, not an approved design.
The canonical board and its public native JSON remain unchanged.

The candidate moves MOTOR_A2 to a manually authored top corridor, removes only
the physically identified DIR saved paths and asks native beta_pipeline9 to
route DIR. It preserves purchased imports, other saved copper and all exact
filled-via owners. Native input contains one 11-port DIR connection, four layers,
13,453 fixed obstacles, ordinary 0.30/0.60 mm via minima and unchanged clearances.

Default 8 GiB and changed-mesh 8 GiB runs exceed their guards. The changed-mesh
20 GiB/600-second job times out before a route is returned; peak sampled group
RSS 16,968.6 MiB. Last recorded stage is topologyMergingSolver. The installed
source puts this stage before nodeDimensionSubdivisionSolver, which applies the
tested maxNodeDimension/maxNodeRatio options. No supported bypass is found.
The newer official 0.0.962 diff does not directly change TopologyMergingSolver;
its later-stage changes are not a demonstrated fix for this captured input.

Exact sources, input, provenance, progress, guard outcomes and the separately
rejected manual native JSON/strict geometry are in
`evidence/rev-0.0.41-alpha.0/continuation-20261006/`. All failed candidates are
kept separate from production. Do not adopt an SDK result directly as Circuit
JSON. Translate a successful native route to supported source paths, rebuild,
and repeat all qualification gates before any adoption.

To replay the captured SDK input on Linux after the normal Cloud startup:

```bash
mkdir -p .publication/continuation-repro
gzip -dc evidence/rev-0.0.41-alpha.0/continuation-20261006/NATIVE-DIR-INPUT.json.gz > .publication/continuation-repro/input.json
python3 scripts/run-cloud-routing.py index.circuit.tsx \
  .publication/continuation-repro/run \
  --native-pipeline9-input .publication/continuation-repro/input.json \
  --max-node-dimension 3 --max-node-ratio 30 \
  --timeout-seconds 600 --memory-mb 20480
```

The wrapper's source-file argument is validated but not rendered when the
captured-input option selects the SDK helper. Input SHA256 and installed router
version are recorded. Use a fresh output directory and only one routing job.
