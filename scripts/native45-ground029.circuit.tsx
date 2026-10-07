import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Omit saved paths to select the actual native fanout solver. */
export default function Native45Ground029() {
  return (
    <SmartNema14MotorController nativeFanoutTrial={{ netNames: ["GND"] }} />
  )
}
