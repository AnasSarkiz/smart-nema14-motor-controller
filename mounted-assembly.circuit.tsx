import { assembly } from "@tscircuit/core"
import SmartNema14MotorController from "./index.circuit"
import { selectedMotor } from "./src/mechanics/selected-motor"

/** Nominal front-flange carrier study. Hardware envelopes are proposed designs. */
export default function MountedControllerStudy() {
  return (
    <assembly.device name="StepperOnline14hm11CarrierStudy">
      <SmartNema14MotorController mechanicalPreview />
      <assembly.subassembly
        name="OfficialStepperOnline14hm11Motor"
        cadModel={{
          stepUrl: selectedMotor.stepUrl,
          modelOriginPosition: { x: 0, y: 0, z: 28.2 },
          positionOffset: { x: 0, y: 0, z: -10 },
          modelUnitToMmScale: 1,
        }}
      />
      <assembly.subassembly
        name="ProposedFrontFlangeCarrier"
        cadModel={{
          stepUrl: "./mechanical/assets/front-flange-carrier.step",
          modelBoardNormalDirection: "z+",
          modelUnitToMmScale: 1,
        }}
      />
      <assembly.subassembly
        name="ProposedFastenerEnvelopes"
        cadModel={{
          stepUrl: "./mechanical/assets/carrier-fastener-envelopes.step",
          modelBoardNormalDirection: "z+",
          modelUnitToMmScale: 1,
        }}
      />
    </assembly.device>
  )
}
