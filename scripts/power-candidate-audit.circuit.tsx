import { TPS26600RHFR } from "../imports/TPS26600RHFR/TPS26600RHFR"
import { A_0402WGF2402TCE } from "../imports/A_0402WGF2402TCE/A_0402WGF2402TCE"

import { DMG1012T_7 } from "../imports/DMG1012T_7/DMG1012T_7"

export default () => (
  <board width="20mm" height="15mm" routingDisabled>
    <TPS26600RHFR
      name="AUDIT_C2155767"
      pcbX={-4}
      pcbY={0}
      schX={-4}
      schY={0}
      cadModel={{
        stepUrl: "./references/tps26600-cad/RHF0024A.stp",
        modelOriginPosition: { x: 0, y: 0, z: 0 },
        rotationOffset: { x: 0, y: 0, z: 90 },
        modelBoardNormalDirection: "z+",
        modelUnitToMmScale: 1,
      }}
    />
    <A_0402WGF2402TCE name="AUDIT_C25769" pcbX={4} pcbY={0} schX={4} schY={0} />
    <DMG1012T_7 name="AUDIT_C20512" pcbX={4} pcbY={4} schX={4} schY={4} />
  </board>
)
