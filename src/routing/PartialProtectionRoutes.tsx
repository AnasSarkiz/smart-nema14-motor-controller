import { fanoutTracePath } from "@tscircuit/props"
import routes from "./partial-protection-paths.json"
const paths = routes.map((path) => fanoutTracePath.parse(path))
/** Explicit saved copper branches. Actual native connectivity remains required.
 * The empty map prevents automatic plane aliases: these are reviewed paths,
 * while the board's actual fills are separately generated and checked.
 */
export function PartialProtectionRoutes() {
  return (
    <autoroutingphase
      name="Saved protection branches"
      phaseIndex={1}
      autorouter="fanout"
      fanoutPourNetMap={{}}
      connections={["net.EFUSE_FLT_N", "net.PD_CC2_CONN", "net.PD_OVP"]}
      pcbTracePaths={paths}
    />
  )
}
