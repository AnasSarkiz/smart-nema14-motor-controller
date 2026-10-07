import SmartNema14MotorController from "../src/SmartNema14MotorController"
export default function Native47Can076() {
  const netNames = ["CAN_SPI_CS", "CAN_INT_N"]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
