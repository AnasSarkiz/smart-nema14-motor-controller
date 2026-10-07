import SmartNema14MotorController from "../src/SmartNema14MotorController"

export default function Native45Controls041() {
  const netNames = [
    "QSPI_IO0",
    "CAN_SPI_CS",
    "CAN_INT_N",
    "POWER_GOOD",
    "SWDIO",
    "SWCLK",
  ]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
