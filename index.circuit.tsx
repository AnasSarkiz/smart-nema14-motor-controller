import { type BoardViewProps } from "./src/mechanics/preview-placement"
import { InterfacesSheet } from "./src/interfaces/InterfacesSheet"
import { ProgrammingSheet } from "./src/programming/ProgrammingSheet"
import { CanSheet } from "./src/can/CanSheet"
import { EncoderSheet } from "./src/encoder/EncoderSheet"
import { McuSheet } from "./src/mcu/McuSheet"
import { MotorDriverSheet } from "./src/motor-driver/MotorDriverSheet"
import { UsbPdSheet } from "./src/usb-pd/UsbPdSheet"
import { InputPowerSheet } from "./src/power/InputPowerSheet"
import { LogicBuckSheet } from "./src/power/LogicBuckSheet"
import { ControllerMount } from "./src/mechanics/ControllerMount"

/** Unrouted development board. Fixed placement is shared with the assembly preview. */
export default function SmartNema14MotorController({
  mechanicalPreview = true,
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
      <net name="GND" isGroundNet />
      <net name="V3V3" isPowerNet />
      <net name="NRST" />
      <net name="I2C_SCL" />
      <net name="I2C_SDA" />
      <net name="CAN_TX" />
      <net name="CAN_RX" />
      <net name="CAN_H" />
      <net name="CAN_L" />
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
      <net name="SWDIO_GUARDED" />
      <net name="SWCLK_GUARDED" />
      <net name="NRST_GUARDED" />
      <net name="SWDIO" />
      <net name="SWCLK" />
      <net name="SWDIO_CONN" />
      <net name="SWCLK_CONN" />
      <net name="NRST_CONN" />
      <net name="POWER_GOOD" />
      <net name="VBUS_ADC_PRE_GUARD" />
      <net name="TEMP_ALERT_N" />
      <net name="EXT_STEP_CONN" />
      <net name="EXT_DIR_CONN" />
      <net name="EXT_ENABLE_N_CONN" />
      <net name="EXT_STEP" />
      <net name="EXT_DIR" />
      <net name="EXT_ENABLE_N" />
      <net name="LIMIT1_CONN" />
      <net name="LIMIT2_CONN" />
      <net name="LIMIT1" />
      <net name="LIMIT2" />
      <net name="LED_POWER_A" />
      <net name="LED_STATUS_A" />
      <net name="LED_FAULT_A" />
      <net name="LED_STATUS_DRIVE" />
      <net name="LED_FAULT_DRIVE" />
      <net name="CAN_RS" />
      <net name="EFUSE_FLT_N" />
      <net name="POWER_HIGH_CURRENT" />
      <net name="EFUSE_EN" />
      <net name="EFUSE_OVP_TOP_1" />
      <net name="EFUSE_OVP_TOP_2" />
      <net name="EFUSE_OVP" />
      <net name="EFUSE_ILIM" />
      <net name="EFUSE_ILIM_SWITCH" />
      <net name="EFUSE_DVDT" />
      <net name="EFUSE_RTN" isGroundNet />
      <net name="CAN_TERM_LINK" />
      <ControllerMount />
      <McuSheet mechanicalPreview={mechanicalPreview} />
      <EncoderSheet mechanicalPreview={mechanicalPreview} />
      <CanSheet mechanicalPreview={mechanicalPreview} />
      <LogicBuckSheet mechanicalPreview={mechanicalPreview} />
      <MotorDriverSheet mechanicalPreview={mechanicalPreview} />
      <UsbPdSheet mechanicalPreview={mechanicalPreview} />
      <ProgrammingSheet mechanicalPreview={mechanicalPreview} />
      <InterfacesSheet mechanicalPreview={mechanicalPreview} />
      <InputPowerSheet mechanicalPreview={mechanicalPreview} />
    </board>
  )
}
