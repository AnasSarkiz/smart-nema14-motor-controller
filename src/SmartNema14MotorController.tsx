import { BoardLegend } from "./BoardLegend"
import { type BoardViewProps } from "./mechanics/preview-placement"
import { InterfacesSheet } from "./interfaces/InterfacesSheet"
import { ProgrammingSheet } from "./programming/ProgrammingSheet"
import { CanSheet } from "./can/CanSheet"
import { I2cSheet } from "./interfaces/I2cSheet"
import { McuSheet } from "./mcu/McuSheet"
import { MotorDriverSheet } from "./motor-driver/MotorDriverSheet"
import { UsbPdSheet } from "./usb-pd/UsbPdSheet"
import { InputPowerSheet } from "./power/InputPowerSheet"
import { LogicBuckSheet } from "./power/LogicBuckSheet"
import { ControllerMount } from "./mechanics/ControllerMount"

/** RP2040 redesign: fresh source and placement; legacy STM32 copper is historical. */
export default function SmartNema14MotorController({
  mechanicalPreview = true,
  usbRoutesEnabled = false,
  savedRoutesEnabled = false,
  routeRemaining = false,
  nativeRoutingTargets = [],
  nativeRoutingNetNames = [],
  nativePartialSignalBranches = false,
  nativeAutorouterVersion = "beta_pipeline9",
}: BoardViewProps & {
  usbRoutesEnabled?: boolean
  savedRoutesEnabled?: boolean
  routeRemaining?: boolean
  nativeRoutingTargets?: string[]
  nativeRoutingNetNames?: string[]
  nativePartialSignalBranches?: boolean
  nativeAutorouterVersion?:
    | "beta_pipeline4"
    | "beta_pipeline7"
    | "beta_pipeline9"
} = {}) {
  if (savedRoutesEnabled || usbRoutesEnabled || nativePartialSignalBranches) {
    throw new Error(
      "Revision 43 copper belongs to STM32. Regenerate RP2040 routing; never replay the old pin selectors.",
    )
  }
  const copperEnabled = routeRemaining || nativeRoutingTargets.length > 0
  return (
    <board
      width="35mm"
      height="35mm"
      layers={4}
      thickness="1.6mm"
      routeRemaining={routeRemaining}
      routingDisabled={!copperEnabled}
      pcbStyle={{
        viaHoleDiameter: "0.30mm",
        viaPadDiameter: "0.45mm",
        silkscreenTextVisibility: "hidden",
      }}
      autorouterEffortLevel="1x"
      autorouterVersion={nativeAutorouterVersion}
      defaultTraceWidth="0.15mm"
      minTraceWidth="0.15mm"
      autorouter={{
        preset: "auto_local",
        traceClearance: "0.15mm",
        allowViaInPad: false,
      }}
      minTraceToPadEdgeClearance="0.10mm"
      minPadEdgeToPadEdgeClearance="0.15mm"
      minBoardEdgeClearance="0.30mm"
      minViaEdgeToPadEdgeClearance="0.15mm"
      minTraceToHoleEdgeClearance="0.35mm"
      minViaHoleEdgeToViaHoleEdgeClearance="0.35mm"
      minPlatedHoleDrillEdgeToDrillEdgeClearance="0.35mm"
      minViaHoleDiameter="0.30mm"
      minViaPadDiameter="0.45mm"
      schLayout={{ layoutMode: "none" }}
    >
      <BoardLegend />
      <net name="PD_LOAD_ENABLE_N" />
      <net
        name="GND"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("GND") ? 1 : undefined
        }
        isGroundNet
        nominalTraceWidth="0.5mm"
      />
      <net
        name="V3V3"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("V3V3") ? 1 : undefined
        }
        isPowerNet
        nominalTraceWidth="0.35mm"
      />
      <net
        name="NRST"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("NRST") ? 1 : undefined
        }
      />
      <net
        name="I2C_SCL"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("I2C_SCL") ? 1 : undefined
        }
      />
      <net
        name="I2C_SDA"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("I2C_SDA") ? 1 : undefined
        }
      />
      <net
        name="CAN_TX"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_TX") ? 1 : undefined
        }
      />
      <net
        name="CAN_RX"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_RX") ? 1 : undefined
        }
      />
      <net
        name="CAN_H"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_H") ? 1 : undefined
        }
      />
      <net
        name="CAN_L"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_L") ? 1 : undefined
        }
      />
      <net
        name="BUCK_SW"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("BUCK_SW") ? 1 : undefined
        }
      />
      <net
        name="BUCK_BST"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("BUCK_BST") ? 1 : undefined
        }
      />
      <net
        name="VM"
        routingPhaseIndex={nativeRoutingNetNames.includes("VM") ? 1 : undefined}
        isPowerNet
        nominalTraceWidth="0.8mm"
      />
      <net
        name="TMC_ENABLE_N"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_ENABLE_N") ? 1 : undefined
        }
      />
      <net
        name="TMC_STEP"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_STEP") ? 1 : undefined
        }
      />
      <net
        name="TMC_DIR"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_DIR") ? 1 : undefined
        }
      />
      <net
        name="TMC_DIAG"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_DIAG") ? 1 : undefined
        }
      />
      <net
        name="TMC_UART_TX"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_UART_TX") ? 1 : undefined
        }
      />
      <net
        name="TMC_UART_RX"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_UART_RX") ? 1 : undefined
        }
      />
      <net
        name="TMC_CPO"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_CPO") ? 1 : undefined
        }
      />
      <net
        name="TMC_CPI"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_CPI") ? 1 : undefined
        }
      />
      <net
        name="TMC_VCP"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_VCP") ? 1 : undefined
        }
      />
      <net
        name="TMC_5VOUT"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_5VOUT") ? 1 : undefined
        }
      />
      <net
        name="TMC_VREF"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_VREF") ? 1 : undefined
        }
      />
      <net
        name="TMC_SENSE_A"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_SENSE_A") ? 1 : undefined
        }
      />
      <net
        name="TMC_SENSE_B"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TMC_SENSE_B") ? 1 : undefined
        }
      />
      <net
        name="MOTOR_A1"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("MOTOR_A1") ? 1 : undefined
        }
      />
      <net
        name="MOTOR_A2"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("MOTOR_A2") ? 1 : undefined
        }
      />
      <net
        name="MOTOR_B1"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("MOTOR_B1") ? 1 : undefined
        }
      />
      <net
        name="MOTOR_B2"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("MOTOR_B2") ? 1 : undefined
        }
      />
      <net
        name="VBUS_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("VBUS_CONN") ? 1 : undefined
        }
        isPowerNet
        nominalTraceWidth="0.8mm"
      />
      <net
        name="VBUS_PROTECTED"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("VBUS_PROTECTED") ? 1 : undefined
        }
        isPowerNet
        nominalTraceWidth="0.8mm"
      />
      <net
        name="USB_DP"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("USB_DP") ? 1 : undefined
        }
      />
      <net
        name="USB_DM"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("USB_DM") ? 1 : undefined
        }
      />
      <net
        name="PD_CC1_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_CC1_CONN") ? 1 : undefined
        }
      />
      <net
        name="PD_CC2_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_CC2_CONN") ? 1 : undefined
        }
      />
      <net
        name="VBUS_DIV"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("VBUS_DIV") ? 1 : undefined
        }
      />
      <net
        name="VBUS_ADC"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("VBUS_ADC") ? 1 : undefined
        }
      />
      <net
        name="SWDIO_GUARDED"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("SWDIO_GUARDED") ? 1 : undefined
        }
      />
      <net
        name="SWCLK_GUARDED"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("SWCLK_GUARDED") ? 1 : undefined
        }
      />
      <net
        name="NRST_GUARDED"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("NRST_GUARDED") ? 1 : undefined
        }
      />
      <net
        name="SWDIO"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("SWDIO") ? 1 : undefined
        }
      />
      <net
        name="SWCLK"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("SWCLK") ? 1 : undefined
        }
      />
      <net
        name="SWDIO_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("SWDIO_CONN") ? 1 : undefined
        }
      />
      <net
        name="SWCLK_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("SWCLK_CONN") ? 1 : undefined
        }
      />
      <net
        name="NRST_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("NRST_CONN") ? 1 : undefined
        }
      />
      <net
        name="POWER_GOOD"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("POWER_GOOD") ? 1 : undefined
        }
      />
      <net
        name="VBUS_ADC_PRE_GUARD"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("VBUS_ADC_PRE_GUARD") ? 1 : undefined
        }
      />
      <net
        name="TEMP_ALERT_N"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("TEMP_ALERT_N") ? 1 : undefined
        }
      />
      <net
        name="EXT_STEP_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EXT_STEP_CONN") ? 1 : undefined
        }
      />
      <net
        name="EXT_DIR_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EXT_DIR_CONN") ? 1 : undefined
        }
      />
      <net
        name="EXT_ENABLE_N_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EXT_ENABLE_N_CONN") ? 1 : undefined
        }
      />
      <net
        name="EXT_STEP"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EXT_STEP") ? 1 : undefined
        }
      />
      <net
        name="EXT_DIR"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EXT_DIR") ? 1 : undefined
        }
      />
      <net
        name="EXT_ENABLE_N"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EXT_ENABLE_N") ? 1 : undefined
        }
      />
      <net
        name="LIMIT1_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LIMIT1_CONN") ? 1 : undefined
        }
      />
      <net
        name="LIMIT2_CONN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LIMIT2_CONN") ? 1 : undefined
        }
      />
      <net
        name="LIMIT1"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LIMIT1") ? 1 : undefined
        }
      />
      <net
        name="LIMIT2"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LIMIT2") ? 1 : undefined
        }
      />
      <net
        name="LED_POWER_A"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LED_POWER_A") ? 1 : undefined
        }
      />
      <net
        name="LED_STATUS_A"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LED_STATUS_A") ? 1 : undefined
        }
      />
      <net
        name="LED_FAULT_A"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LED_FAULT_A") ? 1 : undefined
        }
      />
      <net
        name="LED_STATUS_DRIVE"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LED_STATUS_DRIVE") ? 1 : undefined
        }
      />
      <net
        name="LED_FAULT_DRIVE"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("LED_FAULT_DRIVE") ? 1 : undefined
        }
      />
      <net
        name="CAN_RS"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_RS") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_FLT_N"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_FLT_N") ? 1 : undefined
        }
      />
      <net
        name="POWER_HIGH_CURRENT"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("POWER_HIGH_CURRENT") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_EN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_EN") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_OVP_TOP_1"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_OVP_TOP_1") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_OVP_TOP_2"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_OVP_TOP_2") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_OVP"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_OVP") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_ILIM"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_ILIM") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_ILIM_SWITCH"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_ILIM_SWITCH") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_DVDT"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_DVDT") ? 1 : undefined
        }
      />
      <net
        name="EFUSE_RTN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("EFUSE_RTN") ? 1 : undefined
        }
        isGroundNet
        nominalTraceWidth="0.5mm"
      />
      <net
        name="CAN_TERM_LINK"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_TERM_LINK") ? 1 : undefined
        }
      />
      <net
        name="VCORE"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("VCORE") ? 1 : undefined
        }
        isPowerNet
        nominalTraceWidth="0.35mm"
      />
      <net
        name="QSPI_IO0"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("QSPI_IO0") ? 1 : undefined
        }
      />
      <net
        name="QSPI_IO1"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("QSPI_IO1") ? 1 : undefined
        }
      />
      <net
        name="QSPI_IO2"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("QSPI_IO2") ? 1 : undefined
        }
      />
      <net
        name="QSPI_IO3"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("QSPI_IO3") ? 1 : undefined
        }
      />
      <net
        name="QSPI_CLK"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("QSPI_CLK") ? 1 : undefined
        }
      />
      <net
        name="QSPI_CS"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("QSPI_CS") ? 1 : undefined
        }
      />
      <net
        name="XIN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("XIN") ? 1 : undefined
        }
      />
      <net
        name="XOUT"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("XOUT") ? 1 : undefined
        }
      />
      <net
        name="XTAL_OUT"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("XTAL_OUT") ? 1 : undefined
        }
      />
      <net
        name="MCU_USB_DM"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("MCU_USB_DM") ? 1 : undefined
        }
      />
      <net
        name="MCU_USB_DP"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("MCU_USB_DP") ? 1 : undefined
        }
      />
      <net
        name="CAN_SPI_MISO"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_SPI_MISO") ? 1 : undefined
        }
      />
      <net
        name="CAN_SPI_MOSI"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_SPI_MOSI") ? 1 : undefined
        }
      />
      <net
        name="CAN_SPI_CS"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_SPI_CS") ? 1 : undefined
        }
      />
      <net
        name="CAN_SPI_CLK"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_SPI_CLK") ? 1 : undefined
        }
      />
      <net
        name="CAN_INT_N"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_INT_N") ? 1 : undefined
        }
      />
      <net
        name="CAN_XIN"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_XIN") ? 1 : undefined
        }
      />
      <net
        name="CAN_XOUT"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("CAN_XOUT") ? 1 : undefined
        }
      />
      <net
        name="PD_ALERT_N"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_ALERT_N") ? 1 : undefined
        }
      />
      <net
        name="PD_RESET"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_RESET") ? 1 : undefined
        }
      />
      <net
        name="PD_POWER_OK3"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_POWER_OK3") ? 1 : undefined
        }
      />
      <net
        name="PD_VREG_1V2"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_VREG_1V2") ? 1 : undefined
        }
      />
      <net
        name="PD_VREG_2V7"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_VREG_2V7") ? 1 : undefined
        }
      />
      <net
        name="PD_VDD"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_VDD") ? 1 : undefined
        }
      />
      <net
        name="PD_FET_SOURCE"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_FET_SOURCE") ? 1 : undefined
        }
        isPowerNet
        nominalTraceWidth="0.8mm"
      />
      <net
        name="PD_GATE"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_GATE") ? 1 : undefined
        }
      />
      <net
        name="PD_DISCH"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_DISCH") ? 1 : undefined
        }
      />
      <net
        name="PD_VBUS_SENSE"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("PD_VBUS_SENSE") ? 1 : undefined
        }
      />
      <net
        name="BUZZER_PWM"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("BUZZER_PWM") ? 1 : undefined
        }
      />
      <net
        name="BUZZER_GATE"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("BUZZER_GATE") ? 1 : undefined
        }
      />
      <net
        name="BUZZER_NEG"
        routingPhaseIndex={
          nativeRoutingNetNames.includes("BUZZER_NEG") ? 1 : undefined
        }
      />
      {nativeRoutingTargets.length > 0 && (
        <autoroutingphase
          name="Bounded RP2040 connection"
          phaseIndex={1}
          minViaHoleDiameter="0.30mm"
          minViaPadDiameter="0.45mm"
          autorouter={{
            preset: "auto_local",
            traceClearance: "0.15mm",
            allowViaInPad: false,
          }}
          connections={nativeRoutingTargets}
        />
      )}
      {copperEnabled && (
        <copperpour
          name="L2_GND_REFERENCE"
          layer="inner1"
          connectsTo="net.GND"
          clearance="0.155mm"
          boardEdgeMargin="0.3mm"
          cutoutMargin="0.31mm"
          useThermalReliefs={false}
        />
      )}
      <ControllerMount />
      <McuSheet mechanicalPreview={mechanicalPreview} />
      <I2cSheet mechanicalPreview={mechanicalPreview} />
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
