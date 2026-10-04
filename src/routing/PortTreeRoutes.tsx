import { fanoutTracePath } from "@tscircuit/props"
import savedRoutes from "./port-tree-simplified.json"

const paths = savedRoutes.paths.map((path) => fanoutTracePath.parse(path))

export function savedRoutingPhaseIndex(netName: string) {
  return savedRoutes.net_names.includes(netName) ? 0 : undefined
}

/** Retain complete physical nets; unfinished nets remain for native routing. */
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
