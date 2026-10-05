import { fanoutTracePath } from "@tscircuit/props"
import type { z } from "zod"
import savedRoutes from "./power-guarded-paths-trial.json"

type SavedTracePoint = z.output<typeof fanoutTracePath>["route"][number]

export function representThroughBarrel(
  point: SavedTracePoint,
): SavedTracePoint[] {
  if (point.route_type !== "via") return [point]
  if (
    (point.from_layer === "top" && point.to_layer === "bottom") ||
    (point.from_layer === "bottom" && point.to_layer === "top")
  ) {
    return [point]
  }
  // Every reviewed via is through plated. Traverse its full physical barrel
  // before exiting on the routed layer so fixed obstacles cover all layers.
  const layers: Extract<
    SavedTracePoint,
    { route_type: "via" }
  >["from_layer"][] =
    point.from_layer === "bottom"
      ? [point.from_layer, "top", point.to_layer]
      : [point.from_layer, "top", "bottom", point.to_layer]
  return layers.flatMap((from_layer, index) => {
    const to_layer = layers[index + 1]
    return to_layer && from_layer !== to_layer
      ? [{ ...point, from_layer, to_layer }]
      : []
  })
}

const paths = savedRoutes.paths.map((path) => {
  const parsedPath = fanoutTracePath.parse(path)
  return {
    ...parsedPath,
    route: parsedPath.route.flatMap(representThroughBarrel),
  }
})

export function savedRoutingPhaseIndex(
  netName: string,
  nativeRoutingNetNames: string[] = [],
) {
  if (nativeRoutingNetNames.includes(netName)) return 1
  return savedRoutes.net_names.includes(netName) ? 0 : undefined
}

/** Preserve complete saved paths through the native routing phase API.
 * Unfinished groups remain pending; native DRC and actual filled-copper checks
 * must prove final connectivity before fabrication qualification. */
export function SavedRoutes() {
  return (
    <autoroutingphase
      name="Saved local copper"
      phaseIndex={0}
      autorouter="auto_local"
      connections={savedRoutes.connections}
      pcbTracePaths={paths}
    />
  )
}
