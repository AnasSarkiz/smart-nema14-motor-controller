import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Re-route remaining clock/flash trees around the checked fixed copper. */
export default function Native45Clock003() {
  const netNames = ["XOUT", "QSPI_IO0", "QSPI_IO1", "QSPI_IO2", "QSPI_CS"]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
