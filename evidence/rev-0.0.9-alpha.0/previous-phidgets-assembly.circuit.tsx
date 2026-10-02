import { assembly } from "@tscircuit/core"
import SmartNema14MotorController from "./index.circuit"
import { motorRearFaceZMm } from "./src/mechanics/motor-lock"

/** Diagnostic assembly: preserves the actual draft circuit and supplier models.
 * Motor STEP shaft discrepancy, proposed hardware, unfinished IO and footprint
 * blockers prevent this preview from qualifying placement or fabrication.
 */
export default function SmartNema14Assembly() {
  return (
    <assembly.device name="Phidgets3323ControllerAssembly">
      <SmartNema14MotorController mechanicalPreview />
      <assembly.subassembly
        name="OfficialPhidgets3323Motor"
        cadModel={{
          stepUrl: "./references/motor/3323_0.stp",
          modelOriginPosition: { x: -17.475, y: 17.475, z: 0 },
          rotationOffset: { x: 180, y: 0, z: 0 },
          positionOffset: { x: 0, y: 0, z: motorRearFaceZMm },
          modelUnitToMmScale: 1,
        }}
      />
      <assembly.subassembly name="ProposedNonmagneticHardware">
        <cadmodel
          modelUrl="./mechanical/assets/standoffs.step"
          modelOriginPosition={{ x: 0, y: 0, z: 0 }}
        />
        <cadmodel
          modelUrl="./mechanical/assets/retaining-cup.step"
          modelOriginPosition={{ x: 0, y: 0, z: 0 }}
        />
        <cadmodel
          modelUrl="./mechanical/assets/diametric-magnet.step"
          modelOriginPosition={{ x: 0, y: 0, z: 0 }}
        />
      </assembly.subassembly>
    </assembly.device>
  )
}
