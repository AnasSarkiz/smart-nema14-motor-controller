import { fanoutTracePath } from "@tscircuit/props"
import savedRoutes from "./power-guarded-paths-trial.json"

const paths = savedRoutes.paths.map((path) => fanoutTracePath.parse(path))

export function savedRoutingPhaseIndex(
  netName: string,
  nativeRoutingNetNames: string[] = [],
) {
  if (nativeRoutingNetNames.includes(netName)) return 1
  if (netName === "POWER_HIGH_CURRENT") return 2
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
