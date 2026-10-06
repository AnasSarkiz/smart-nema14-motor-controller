import { assembly } from "@tscircuit/core"
import SmartNema14MotorController from "./index.circuit"
import { selectedMotor } from "./src/mechanics/selected-motor"

/** Exploded inspection view only: PCB attachment remains unqualified; no shaft encoder is fitted.
 * Revision 8 preserves the retired Phidgets assembly and its original hardware.
 * The new motor rear face is the world origin; its front shaft points toward -Z.
 */
export default function SmartNema14Assembly() {
  return (
    <assembly.device name="StepperOnline14hm11ExplodedController">
      <SmartNema14MotorController
        mechanicalPreview
        usbRoutesEnabled={false}
        savedRoutesEnabled={false}
      />
      <assembly.subassembly
        name="OfficialStepperOnline14hm11Motor"
        cadModel={{
          stepUrl: selectedMotor.stepUrl,
          modelOriginPosition: {
            x: 0,
            y: 0,
            z: selectedMotor.bodyLengthMaximumMm,
          },
          rotationOffset: { x: 0, y: 0, z: 0 },
          positionOffset: { x: 0, y: 0, z: 65 },
          modelUnitToMmScale: 1,
        }}
      />
    </assembly.device>
  )
}
