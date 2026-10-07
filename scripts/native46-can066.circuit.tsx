import SmartNema14MotorController from "../src/SmartNema14MotorController"
export default function Native46Can066() {
  const netNames = ["CAN_SPI_CS", "CAN_INT_N", "CAN_TX", "CAN_RX"]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
