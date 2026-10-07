import SmartNema14MotorController from "../src/SmartNema14MotorController"
export default function Native46Can068() {
  const netNames = ["CAN_TX", "CAN_RX"]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
