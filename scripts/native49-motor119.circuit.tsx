import SmartNema14MotorController from "../src/SmartNema14MotorController"
export default function Native49Motor119() {
  const netNames = [
    "MOTOR_A2",
    "MOTOR_B1",
    "MOTOR_B2",
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
