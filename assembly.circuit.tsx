import { assembly } from "@tscircuit/core"
import { selectedMotor } from "./src/mechanics/selected-motor"

/** Exact motor reference only: PCB attachment and encoder choice are unresolved.
 * Revision 8 preserves the retired Phidgets assembly and its original hardware.
 * The new motor rear face is the world origin; its front shaft points toward -Z.
 */
export default function SmartNema14Assembly() {
  return (
    <assembly.device name="StepperOnline14hm11MotorReference">
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
          positionOffset: { x: 0, y: 0, z: 0 },
          modelUnitToMmScale: 1,
        }}
      />
    </assembly.device>
  )
}
