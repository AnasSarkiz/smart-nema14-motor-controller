/// <reference types="node" />
import assert from "node:assert/strict"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { parseCapturedPipeline9Input } from "./pipeline9-captured-input"
import { withPipeline9SearchBounds } from "./pipeline9-search-bounds"

const capturedInputPath = process.argv[2]
const validBoundsPath = process.argv[3]
if (!capturedInputPath || !validBoundsPath) {
  throw new Error("Supply a genuine native capture and its local search bounds")
}
const { simpleRouteJson } = parseCapturedPipeline9Input(
  readFileSync(capturedInputPath, "utf8"),
)
const originalText = JSON.stringify(simpleRouteJson)
const boundedSimpleRouteJson = withPipeline9SearchBounds(
  simpleRouteJson,
  validBoundsPath,
)
assert.notDeepEqual(boundedSimpleRouteJson.bounds, simpleRouteJson.bounds)
assert.deepEqual(
  { ...boundedSimpleRouteJson, bounds: simpleRouteJson.bounds },
  simpleRouteJson,
)
assert.equal(JSON.stringify(simpleRouteJson), originalText)
assert.strictEqual(boundedSimpleRouteJson.obstacles, simpleRouteJson.obstacles)
assert.strictEqual(
  boundedSimpleRouteJson.connections,
  simpleRouteJson.connections,
)
const temporaryFolder = mkdtempSync(join(tmpdir(), "nema-pipeline9-bounds-"))
try {
  const boundsPath = join(temporaryFolder, "invalid.json")
  for (const bounds of [
    { minX: -99, maxX: 5, minY: -6, maxY: 6 },
    { minX: -15, maxX: -14, minY: -6, maxY: 6 },
    { minX: -15, maxX: -5, minY: 6, maxY: -6 },
    { minX: -15, maxX: -5, minY: -6, maxY: 6, obstacles: [] },
  ]) {
    writeFileSync(boundsPath, JSON.stringify(bounds))
    assert.throws(() => withPipeline9SearchBounds(simpleRouteJson, boundsPath))
  }
} finally {
  rmSync(temporaryFolder, { recursive: true })
}
console.log(
  "Search domain tested: every original obstacle, terminal, layer and rule preserved; invalid bounds rejected",
)
