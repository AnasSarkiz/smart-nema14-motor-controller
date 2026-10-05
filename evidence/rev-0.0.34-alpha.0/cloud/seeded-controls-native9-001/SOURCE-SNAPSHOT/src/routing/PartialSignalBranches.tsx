import { fanoutTracePath } from "@tscircuit/props"
import { representThroughBarrel } from "./PowerSavedRoutesTrial"
import branches from "./partial-signal-branches.json"

const paths = branches.map((branch) => {
  const path = fanoutTracePath.parse(branch)
  return {
    ...path,
    route: path.route.flatMap(representThroughBarrel),
  }
})

/** Precomputed native branches join two contacts of three unfinished nets.
 * Enable only in an explicit bounded job: native fanout replays these seeds,
 * then its documented default follow-up runs the board-selected Pipeline9.
 * Canonical replay leaves this phase disabled. All-net physical checks decide
 * completion; the seeds alone do not complete these three nets. */
export function PartialSignalBranches() {
  return (
    <autoroutingphase
      name="Reviewed partial signal branches"
      phaseIndex={1}
      autorouter="fanout"
      minViaHoleDiameter="0.30mm"
      minViaPadDiameter="0.60mm"
      // Existing GND pours span every layer; identify the reference plane
      // explicitly instead of leaving native fanout inference ambiguous.
      fanoutPourNetMap={{ inner1: "net.GND" }}
      connections={paths.map((path) => path.connection)}
      pcbTracePaths={paths}
    />
  )
}
