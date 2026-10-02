import { type BoardViewProps } from "./src/mechanics/preview-placement"
import { ProgrammingConnectorPreview } from "./src/mechanics/ProgrammingConnectorPreview"
import { CanSheet } from "./src/can/CanSheet"
import { EncoderSheet } from "./src/encoder/EncoderSheet"
import { McuSheet } from "./src/mcu/McuSheet"
import { MotorDriverSheet } from "./src/motor-driver/MotorDriverSheet"
import { UsbPdSheet } from "./src/usb-pd/UsbPdSheet"
import { LogicBuckSheet } from "./src/power/LogicBuckSheet"

/** Schematic development only. Mechanics and full circuit review gate placement. */
export default function SmartNema14MotorController({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <board
      width="35mm"
      height="35mm"
      layers={4}
      thickness="1.6mm"
      routingDisabled
      schLayout={{ layoutMode: "none" }}
    >
      {mechanicalPreview && <ProgrammingConnectorPreview />}
      <net name="GND" isGroundNet />
      <net name="V3V3" isPowerNet />
      <net name="NRST" />
      <net name="I2C_SCL" />
      <net name="I2C_SDA" />
      <net name="CAN_TX" />
      <net name="CAN_RX" />
      <net name="CAN_H" />
      <net name="CAN_L" />
      <net name="VBUS_INRUSH_OUT" isPowerNet />
      <net name="BUCK_SW" />
      <net name="BUCK_BST" />
      <net name="VM" isPowerNet />
      <net name="TMC_ENABLE_N" />
      <net name="TMC_STEP" />
      <net name="TMC_DIR" />
      <net name="TMC_DIAG" />
      <net name="TMC_UART_TX" />
      <net name="TMC_UART_RX" />
      <net name="TMC_CPO" />
      <net name="TMC_CPI" />
      <net name="TMC_VCP" />
      <net name="TMC_5VOUT" isPowerNet />
      <net name="TMC_VREF" />
      <net name="TMC_SENSE_A" />
      <net name="TMC_SENSE_B" />
      <net name="MOTOR_A1" />
      <net name="MOTOR_A2" />
      <net name="MOTOR_B1" />
      <net name="MOTOR_B2" />
      <net name="VBUS_CONN" isPowerNet />
      <net name="VBUS_PROTECTED" isPowerNet />
      <net name="USB_DP" />
      <net name="USB_DM" />
      <net name="PD_CC1_CONN" />
      <net name="PD_CC2_CONN" />
      <net name="PD_CC1_MCU" />
      <net name="PD_CC2_MCU" />
      <net name="PD_GATE" />
      <net name="PD_OVP_SERIES" />
      <net name="PD_OVP" />
      <net name="PD_DB" />
      <net name="PD_FLT" />
      <net name="VBUS_DIV" />
      <net name="VBUS_ADC" />
      <McuSheet mechanicalPreview={mechanicalPreview} />
      <EncoderSheet mechanicalPreview={mechanicalPreview} />
      <CanSheet mechanicalPreview={mechanicalPreview} />
      <LogicBuckSheet mechanicalPreview={mechanicalPreview} />
      <MotorDriverSheet mechanicalPreview={mechanicalPreview} />
      <UsbPdSheet mechanicalPreview={mechanicalPreview} />
    </board>
  )
}
