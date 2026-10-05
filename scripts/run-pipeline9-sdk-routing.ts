/// <reference types="node" />
import { AutoroutingPipelineSolver9_PreloadedTraceGraph } from "@tscircuit/capacity-autorouter"
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { parseCapturedPipeline9Input } from "./pipeline9-captured-input"

const [inputPath, outputFolder, maxNodeDimensionText, maxNodeRatioText] =
  process.argv.slice(2)
if (!inputPath || !outputFolder)
  throw new Error("Supply captured input and output")
const maxNodeDimension = Number(maxNodeDimensionText)
const maxNodeRatio = Number(maxNodeRatioText)
if (
  !Number.isFinite(maxNodeDimension) ||
  maxNodeDimension <= 0 ||
  !Number.isFinite(maxNodeRatio) ||
  maxNodeRatio < 1
) {
  throw new Error("Mesh dimension must be positive and aspect ratio at least 1")
}
const capturedEventText = readFileSync(inputPath, "utf8")
const routingEvent = parseCapturedPipeline9Input(capturedEventText)
const options = {
  effort: routingEvent.effort,
  maxNodeDimension,
  maxNodeRatio,
  minNodeArea: 0.01,
}
const solver = new AutoroutingPipelineSolver9_PreloadedTraceGraph(
  routingEvent.simpleRouteJson,
  options,
)
const packageVersion = JSON.parse(
  readFileSync(
    "node_modules/@tscircuit/capacity-autorouter/package.json",
    "utf8",
  ),
).version
writeFileSync(
  resolve(outputFolder, "INPUT-PROVENANCE.json"),
  JSON.stringify(
    {
      router: "beta_pipeline9",
      solver: solver.getSolverName(),
      package_version: packageVersion,
      captured_input_path: inputPath,
      captured_input_sha256: createHash("sha256")
        .update(capturedEventText)
        .digest("hex"),
      input_forwarded_without_field_or_coordinate_changes: true,
      options,
      previous_mesh_options: { maxNodeDimension: 15, maxNodeRatio: 6 },
      obstacle_count: routingEvent.simpleRouteJson.obstacles.length,
      connection_count: routingEvent.simpleRouteJson.connections.length,
      point_count: routingEvent.simpleRouteJson.connections.reduce(
        (count, connection) => count + connection.pointsToConnect.length,
        0,
      ),
      note: "Official installed Pipeline9 public constructor only. Captured core input is anchored to its original source snapshot; output is a candidate, never direct circuit JSON adoption.",
    },
    null,
    2,
  ) + "\n",
)
const startedAt = performance.now()
let lastRecordedAt = 0
while (!solver.solved && !solver.failed) {
  solver.step()
  const now = performance.now()
  if (now - lastRecordedAt >= 5000 || solver.solved || solver.failed) {
    lastRecordedAt = now
    const progress = {
      phase: solver.getCurrentPhase(),
      progress: solver.progress,
      node_count: solver.capacityNodes?.length,
      edge_count: solver.capacityEdges?.length,
      elapsed_seconds: (now - startedAt) / 1000,
      solved: solver.solved,
      failed: solver.failed,
      error: solver.error,
    }
    writeFileSync(
      resolve(outputFolder, "PROGRESS.json"),
      JSON.stringify(progress, null, 2) + "\n",
    )
    console.log(JSON.stringify(progress))
    await new Promise((resume) => setTimeout(resume, 0))
  }
}
if (solver.failed) throw new Error(solver.error || "Native Pipeline9 failed")
writeFileSync(
  resolve(outputFolder, "OUTPUT-SIMPLE-ROUTE.json"),
  JSON.stringify(solver.getOutputSimpleRouteJson(), null, 2) + "\n",
)
