import SmartNema14MotorController from "../src/SmartNema14MotorController"
export default function Native46Controls058() {
  const netNames = ["SWCLK", "CAN_SPI_CS", "CAN_INT_N"]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
