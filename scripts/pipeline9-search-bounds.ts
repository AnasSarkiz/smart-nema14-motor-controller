/// <reference types="node" />
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { z } from "zod"
import type { SimpleRouteJson } from "@tscircuit/capacity-autorouter"

const searchBoundsSchema = z
  .object({
    minX: z.number().finite(),
    maxX: z.number().finite(),
    minY: z.number().finite(),
    maxY: z.number().finite(),
  })
  .strict()

/** Limit only the solver domain; keep all obstacles and design rules intact. */
export function withPipeline9SearchBounds(
  simpleRouteJson: SimpleRouteJson,
  searchBoundsPath: string,
): SimpleRouteJson {
  const bounds = searchBoundsSchema.parse(
    JSON.parse(readFileSync(searchBoundsPath, "utf8")),
  )
  assert.ok(bounds.minX < bounds.maxX && bounds.minY < bounds.maxY)
  assert.ok(
    bounds.minX >= simpleRouteJson.bounds.minX &&
      bounds.maxX <= simpleRouteJson.bounds.maxX,
  )
  assert.ok(
    bounds.minY >= simpleRouteJson.bounds.minY &&
      bounds.maxY <= simpleRouteJson.bounds.maxY,
  )
  for (const connection of simpleRouteJson.connections) {
    for (const point of connection.pointsToConnect) {
      assert.ok(point.x > bounds.minX && point.x < bounds.maxX)
      assert.ok(point.y > bounds.minY && point.y < bounds.maxY)
    }
  }
  const boundedSimpleRouteJson = { ...simpleRouteJson, bounds }
  assert.deepStrictEqual(
    { ...boundedSimpleRouteJson, bounds: simpleRouteJson.bounds },
    simpleRouteJson,
  )
  return boundedSimpleRouteJson
}
