import { fanoutTracePath } from "@tscircuit/props"
import { representThroughBarrel } from "./PowerSavedRoutesTrial"
import branches from "./partial-signal-branches.json"

/** Precomputed native branches join two contacts of unfinished nets.
 * Enable only in an explicit bounded job: native fanout replays these seeds,
 * then its documented default follow-up runs the board-selected Pipeline9.
 * Canonical replay leaves this phase disabled. All-net physical checks decide
 * completion; the seeds alone do not complete those nets. */
export function PartialSignalBranches({ netNames }: { netNames: string[] }) {
  const paths = branches
    .filter((branch) => netNames.includes(branch.net))
    .map((branch) => {
      const path = fanoutTracePath.parse(branch)
      return { ...path, route: path.route.flatMap(representThroughBarrel) }
    })
  return (
    <autoroutingphase
      name="Reviewed partial signal branches"
      phaseIndex={1}
      autorouter="fanout"
      minViaHoleDiameter="0.30mm"
      minViaPadDiameter="0.60mm"
      // These seeds join signal contacts, with no plane-termination targets.
      // Keep the existing multi-layer pours out of automatic fanout mapping.
      fanoutPourNetMap={{}}
      connections={paths.map((path) => path.connection)}
      pcbTracePaths={paths}
    />
  )
}
