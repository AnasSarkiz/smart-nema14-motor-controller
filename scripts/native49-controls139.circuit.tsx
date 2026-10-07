import SmartNema14MotorController from "../src/SmartNema14MotorController"
export default function Native49Controls139() {
  const netNames = [
    "TMC_UART_RX",
    "TMC_STEP",
    "TMC_DIR",
    "TMC_ENABLE_N",
    "TMC_DIAG",
  ]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
