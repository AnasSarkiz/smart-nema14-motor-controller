import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Bounded remaining digital controls; power and ground have separate jobs. */
export default function Native45Signals025() {
  const netNames = [
    "TMC_ENABLE_N",
    "TMC_STEP",
    "TMC_DIR",
    "TMC_DIAG",
    "TMC_UART_TX",
    "TMC_UART_RX",
    "CAN_TX",
    "CAN_RX",
    "LED_FAULT_A",
    "LED_STATUS_DRIVE",
    "LED_FAULT_DRIVE",
    "BUZZER_PWM",
    "SWDIO_GUARDED",
    "SWCLK_GUARDED",
    "NRST_GUARDED",
    "SWDIO_CONN",
    "SWCLK_CONN",
    "NRST_CONN",
    "PD_LOAD_ENABLE_N",
    "EFUSE_OVP_TOP_2",
  ]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
