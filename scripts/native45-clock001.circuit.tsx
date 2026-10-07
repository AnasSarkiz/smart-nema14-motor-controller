import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Bounded clock/flash selection; each result still requires copper checks. */
export default function Native45Clock001() {
  const netNames = [
    "XIN",
    "XOUT",
    "XTAL_OUT",
    "QSPI_IO0",
    "QSPI_IO1",
    "QSPI_IO2",
    "QSPI_IO3",
    "QSPI_CLK",
    "QSPI_CS",
  ]
  return (
    <SmartNema14MotorController
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
