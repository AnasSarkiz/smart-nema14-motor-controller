import type { FanoutTracePath } from "@tscircuit/props"
import { CL05B104KO5NNNC } from "../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"

/** Qualify native saved routes sharing one physical through via.
 * This diagnostic fixture uses the same unmodified supplier imports as the
 * controller. It is not a fabrication design or the package entry point.
 */
export default function SavedRouteApiFixture({
  paths,
}: {
  paths?: FanoutTracePath[]
} = {}) {
  return (
    <board
      width="20mm"
      height="20mm"
      layers={4}
      routingDisabled={!paths}
      pcbStyle={{ viaHoleDiameter: "0.3mm", viaPadDiameter: "0.6mm" }}
    >
      <net name="TEST" />
      <net name="RETURN" />
      {paths && (
        <autoroutingphase
          name="Saved TEST copper"
          connections={["net.TEST", "net.RETURN"]}
          pcbTracePaths={paths}
        />
      )}
      <schematicsheet name="SavedRouteApi" sheetSize="A4" sheetIndex={1}>
        <CL05B104KO5NNNC
          name="C_TEST1"
          pcbX={-5}
          pcbY={0}
          pcbRotation={180}
          schX={-5}
          schY={0}
          connections={{ pin1: "net.TEST", pin2: "net.RETURN" }}
        />
        <CL05B104KO5NNNC
          name="C_TEST2"
          pcbX={0}
          pcbY={5}
          pcbRotation={90}
          layer="bottom"
          schX={0}
          schY={3}
          connections={{ pin1: "net.TEST", pin2: "net.RETURN" }}
        />
        <CL05B104KO5NNNC
          name="C_TEST3"
          pcbX={5}
          pcbY={0}
          layer="bottom"
          schX={5}
          schY={0}
          connections={{ pin1: "net.TEST", pin2: "net.RETURN" }}
        />
      </schematicsheet>
    </board>
  )
}
