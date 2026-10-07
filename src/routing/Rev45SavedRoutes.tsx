import { fanoutTracePath } from "@tscircuit/props"
import savedRoutes from "./rev50-saved-paths.json"
import type { FanoutTracePath } from "@tscircuit/props"

const paths = savedRoutes.paths.map((path) => fanoutTracePath.parse(path))

export function rev45RoutingPhaseIndex(
  netName: string,
  context: {
    freshRoutesEnabled: boolean
    nativeRoutingNetNames: string[]
    trialNetNames?: string[]
    fanoutTrialNetNames?: string[]
  },
) {
  if (context.fanoutTrialNetNames?.includes(netName)) return 2
  if (context.nativeRoutingNetNames.includes(netName)) return 1
  return (context.freshRoutesEnabled &&
    savedRoutes.net_names.includes(netName)) ||
    context.trialNetNames?.includes(netName)
    ? 0
    : undefined
}

/** Fresh RP2040 routes only. Historical STM32 copper remains untouched. */
export function Rev45SavedRoutes({
  trialPaths = [],
  trialNetNames = [],
  replacedNetNames = [],
  replacedPathSelectors = [],
}: {
  trialPaths?: FanoutTracePath[]
  trialNetNames?: string[]
  replacedNetNames?: string[]
  replacedPathSelectors?: string[]
} = {}) {
  return (
    <autoroutingphase
      name="Checked RP2040 copper"
      phaseIndex={0}
      autorouter="auto_local"
      connections={[
        ...savedRoutes.connections.filter(
          (connection) =>
            !replacedNetNames.some((name) => connection === `net.${name}`),
        ),
        ...trialNetNames.map((name) => `net.${name}`),
      ]}
      pcbTracePaths={[
        ...paths.filter(
          (path) => !replacedPathSelectors.includes(path.connection),
        ),
        ...trialPaths,
      ]}
    />
  )
}
