import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Local SPI, oscillator, sense and control trees; no full-board attempt. */
export default function Native45Local015() {
  const netNames = [
    "CAN_SPI_MOSI",
    "CAN_SPI_MISO",
    "CAN_SPI_CS",
    "CAN_SPI_CLK",
    "CAN_INT_N",
    "CAN_XIN",
    "CAN_XOUT",
    "QSPI_IO0",
    "TMC_SENSE_A",
    "TMC_SENSE_B",
    "EFUSE_DVDT",
    "VBUS_DIV",
    "PD_VREG_2V7",
    "EFUSE_ILIM_SWITCH",
    "TMC_VREF",
  ]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
