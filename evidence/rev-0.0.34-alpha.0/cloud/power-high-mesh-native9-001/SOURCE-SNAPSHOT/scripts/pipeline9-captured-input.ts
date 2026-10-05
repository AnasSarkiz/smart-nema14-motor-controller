/// <reference types="node" />
import assert from "node:assert/strict"
import { z } from "zod"

const finiteMm = z.number().finite()
const positiveMm = finiteMm.positive()
const point = z.object({ x: finiteMm, y: finiteMm }).passthrough()
const connectionPoint = point
  .extend({
    layer: z.string(),
    layers: z.never().optional(),
    pointId: z.string().optional(),
    pcb_port_id: z.string().optional(),
  })
  .passthrough()
const simpleRouteJsonSchema = z
  .object({
    bounds: z
      .object({
        minX: finiteMm,
        maxX: finiteMm,
        minY: finiteMm,
        maxY: finiteMm,
      })
      .passthrough(),
    layerCount: z.literal(4),
    allowBlindAndBuriedVias: z.literal(false),
    minTraceWidth: positiveMm,
    nominalTraceWidth: positiveMm,
    minViaDiameter: positiveMm,
    minViaHoleDiameter: positiveMm,
    minViaPadDiameter: positiveMm,
    min_via_hole_diameter: positiveMm,
    min_via_pad_diameter: positiveMm,
    minTraceToPadEdgeClearance: positiveMm,
    minTraceToHoleEdgeClearance: positiveMm,
    minViaEdgeToPadEdgeClearance: positiveMm,
    minViaHoleEdgeToViaHoleEdgeClearance: positiveMm,
    minPlatedHoleDrillEdgeToDrillEdgeClearance: positiveMm,
    minPadEdgeToPadEdgeClearance: positiveMm,
    minBoardEdgeClearance: positiveMm,
    traces: z.tuple([]),
    obstacles: z.array(
      z
        .object({
          type: z.literal("rect"),
          layers: z.array(z.string()).nonempty(),
          center: point,
          width: positiveMm,
          height: positiveMm,
          connectedTo: z.array(z.string()),
        })
        .passthrough(),
    ),
    connections: z.array(
      z
        .object({
          name: z.string(),
          nominalTraceWidth: positiveMm.optional(),
          width: positiveMm.optional(),
          externallyConnectedPointIds: z.array(z.array(z.string())).optional(),
          pointsToConnect: z.array(connectionPoint).min(2),
        })
        .passthrough(),
    ),
  })
  .passthrough()
const routingEventSchema = z
  .object({
    solverName: z.literal("AutoroutingPipelineSolver9_PreloadedTraceGraph"),
    autorouterVersion: z.literal("beta_pipeline9"),
    effort: positiveMm,
    simpleRouteJson: simpleRouteJsonSchema,
  })
  .passthrough()

export function parseCapturedPipeline9Input(capturedEventText: string) {
  const capturedEvent = JSON.parse(capturedEventText)
  const routingEvent = routingEventSchema.parse(capturedEvent)
  // Passthrough validation must preserve every producer field and coordinate.
  assert.deepStrictEqual(routingEvent, capturedEvent)
  const srj = routingEvent.simpleRouteJson
  assert.ok(srj.minViaHoleDiameter >= 0.3 && srj.minViaPadDiameter >= 0.6)
  assert.equal(srj.min_via_hole_diameter, srj.minViaHoleDiameter)
  assert.equal(srj.min_via_pad_diameter, srj.minViaPadDiameter)
  assert.ok(srj.minViaHoleEdgeToViaHoleEdgeClearance >= 0.35)
  return routingEvent
}
