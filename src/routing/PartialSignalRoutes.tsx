import { fanoutTracePath } from "@tscircuit/props"
import saved from "./partial-signal-paths.json"
const paths = saved.paths.map((path) => fanoutTracePath.parse(path))
/** Retain audited branches; missing connections remain native DRC errors. */
export function PartialSignalRoutes() {
  return (
    <autoroutingphase
      name="Audited signal branches"
      phaseIndex={1}
      autorouter="fanout"
      fanoutPourNetMap={{}}
      connections={saved.connections}
      pcbTracePaths={paths}
    />
  )
}
