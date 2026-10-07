import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Bounded programmer, connector protection and local indicator trees. */
export default function Native45Interfaces001() {
  const netNames = [
    "SWDIO_GUARDED",
    "SWCLK_GUARDED",
    "NRST_GUARDED",
    "SWDIO",
    "SWCLK",
    "SWDIO_CONN",
    "SWCLK_CONN",
    "NRST_CONN",
    "POWER_GOOD",
    "NRST",
    "EXT_STEP_CONN",
    "EXT_DIR_CONN",
    "EXT_ENABLE_N_CONN",
    "LIMIT1_CONN",
    "LIMIT2_CONN",
    "LED_POWER_A",
    "LED_STATUS_A",
    "LED_FAULT_A",
    "CAN_TERM_LINK",
    "TMC_UART_RX",
  ]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
