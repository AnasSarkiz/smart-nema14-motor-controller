import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Native plane-terminated ground fanout; no manual vias or hidden exceptions. */
export default function Native45Ground027() {
  return (
    <SmartNema14MotorController
      nativeFanoutTrial={{ netNames: ["GND"], paths: [] }}
    />
  )
}
