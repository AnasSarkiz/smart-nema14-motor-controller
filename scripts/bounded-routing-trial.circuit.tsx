import { PowerCopperTrial } from "../src/routing/PowerCopperTrial"
import { GroundReturns } from "../src/routing/GroundReturns"
import { UsbGroundRoute } from "../src/routing/UsbGroundRoute"
import { type BoardViewProps } from "../src/mechanics/preview-placement"
import { InterfacesSheet } from "../src/interfaces/InterfacesSheet"
import { ProgrammingSheet } from "../src/programming/ProgrammingSheet"
import { CanSheet } from "../src/can/CanSheet"
import { EncoderSheet } from "../src/encoder/EncoderSheet"
import { McuSheet } from "../src/mcu/McuSheet"
import { MotorDriverSheet } from "../src/motor-driver/MotorDriverSheet"
import { UsbPdSheet } from "../src/usb-pd/UsbPdSheet"
import { InputPowerSheet } from "../src/power/InputPowerSheet"
import { LogicBuckSheet } from "../src/power/LogicBuckSheet"
import { ControllerMount } from "../src/mechanics/ControllerMount"
import { UsbRoutes } from "../src/usb-pd/UsbRoutes"
import { UsbReference } from "../src/usb-pd/UsbReference"
import {
  SavedRoutes,
  savedRoutingPhaseIndex,
} from "../src/routing/PowerSavedRoutesTrial"

/** Routing-stage prototype. Shared placement is qualified in revision 16. */
export default function SmartNema14MotorController({
  mechanicalPreview = true,
  usbRoutesEnabled = true,
  savedRoutesEnabled = true,
  routeRemaining = false,
  boundedConnections = [],
}: BoardViewProps & {
  usbRoutesEnabled?: boolean
  savedRoutesEnabled?: boolean
  routeRemaining?: boolean
  boundedConnections?: string[]
} = {}) {
  return (
    <board
      width="35mm"
      height="35mm"
      layers={4}
      isViaInPadAllowed
      thickness="1.6mm"
      routeRemaining={routeRemaining}
      pcbStyle={{ viaHoleDiameter: "0.30mm", viaPadDiameter: "0.60mm" }}
      autorouterEffortLevel="1x"
      autorouterVersion="beta_pipeline7"
      defaultTraceWidth="0.15mm"
      autorouter={{
        preset: "auto_local",
        traceClearance: "0.15mm",
        allowViaInPad: false,
      }}
      minTraceWidth="0.15mm"
      minTraceToPadEdgeClearance="0.10mm"
      minPadEdgeToPadEdgeClearance="0.15mm"
      minBoardEdgeClearance="0.30mm"
      minViaEdgeToPadEdgeClearance="0.15mm"
      minTraceToHoleEdgeClearance="0.35mm"
      minViaHoleEdgeToViaHoleEdgeClearance="0.35mm"
      minPlatedHoleDrillEdgeToDrillEdgeClearance="0.35mm"
      minViaHoleDiameter="0.30mm"
      minViaPadDiameter="0.60mm"
      schLayout={{ layoutMode: "none" }}
    >
      <net
        name="GND"
        routingPhaseIndex={
          boundedConnections.includes("net.GND")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("GND")
              : undefined
        }
        nominalTraceWidth="0.5mm"
        isGroundNet
      />
      <net
        name="V3V3"
        routingPhaseIndex={
          boundedConnections.includes("net.V3V3")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("V3V3")
              : undefined
        }
        nominalTraceWidth="0.35mm"
        isPowerNet
      />
      <net
        name="NRST"
        routingPhaseIndex={
          boundedConnections.includes("net.NRST")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("NRST")
              : undefined
        }
      />
      <net
        name="I2C_SCL"
        routingPhaseIndex={
          boundedConnections.includes("net.I2C_SCL")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("I2C_SCL")
              : undefined
        }
      />
      <net
        name="I2C_SDA"
        routingPhaseIndex={
          boundedConnections.includes("net.I2C_SDA")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("I2C_SDA")
              : undefined
        }
      />
      <net
        name="CAN_TX"
        routingPhaseIndex={
          boundedConnections.includes("net.CAN_TX")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("CAN_TX")
              : undefined
        }
      />
      <net
        name="CAN_RX"
        routingPhaseIndex={
          boundedConnections.includes("net.CAN_RX")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("CAN_RX")
              : undefined
        }
      />
      <net
        name="CAN_H"
        routingPhaseIndex={
          boundedConnections.includes("net.CAN_H")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("CAN_H")
              : undefined
        }
      />
      <net
        name="CAN_L"
        routingPhaseIndex={
          boundedConnections.includes("net.CAN_L")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("CAN_L")
              : undefined
        }
      />
      <net
        name="BUCK_SW"
        routingPhaseIndex={
          boundedConnections.includes("net.BUCK_SW")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("BUCK_SW")
              : undefined
        }
      />
      <net
        name="BUCK_BST"
        routingPhaseIndex={
          boundedConnections.includes("net.BUCK_BST")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("BUCK_BST")
              : undefined
        }
      />
      <net
        name="VM"
        routingPhaseIndex={
          boundedConnections.includes("net.VM")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("VM")
              : undefined
        }
        nominalTraceWidth="0.8mm"
        isPowerNet
      />
      <net
        name="TMC_ENABLE_N"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_ENABLE_N")
            : undefined
        }
      />
      <net
        name="TMC_STEP"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_STEP")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_STEP")
              : undefined
        }
      />
      <net
        name="TMC_DIR"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_DIR")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_DIR")
              : undefined
        }
      />
      <net
        name="TMC_DIAG"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_DIAG")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_DIAG")
              : undefined
        }
      />
      <net
        name="TMC_UART_TX"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_UART_TX")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_UART_TX")
              : undefined
        }
      />
      <net
        name="TMC_UART_RX"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_UART_RX")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_UART_RX")
              : undefined
        }
      />
      <net
        name="TMC_CPO"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_CPO")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_CPO")
              : undefined
        }
      />
      <net
        name="TMC_CPI"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_CPI")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_CPI")
              : undefined
        }
      />
      <net
        name="TMC_VCP"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_VCP")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_VCP")
              : undefined
        }
      />
      <net
        name="TMC_5VOUT"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_5VOUT")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_5VOUT")
              : undefined
        }
        isPowerNet
      />
      <net
        name="TMC_VREF"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_VREF")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_VREF")
              : undefined
        }
      />
      <net
        name="TMC_SENSE_A"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_SENSE_A")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_SENSE_A")
              : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="TMC_SENSE_B"
        routingPhaseIndex={
          boundedConnections.includes("net.TMC_SENSE_B")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("TMC_SENSE_B")
              : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="MOTOR_A1"
        routingPhaseIndex={
          boundedConnections.includes("net.MOTOR_A1")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("MOTOR_A1")
              : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="MOTOR_A2"
        routingPhaseIndex={
          boundedConnections.includes("net.MOTOR_A2")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("MOTOR_A2")
              : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="MOTOR_B1"
        routingPhaseIndex={
          boundedConnections.includes("net.MOTOR_B1")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("MOTOR_B1")
              : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="MOTOR_B2"
        routingPhaseIndex={
          boundedConnections.includes("net.MOTOR_B2")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("MOTOR_B2")
              : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="VBUS_CONN"
        routingPhaseIndex={
          boundedConnections.includes("net.VBUS_CONN")
            ? 1
            : boundedConnections.includes("net.VBUS_CONN")
              ? 1
              : savedRoutesEnabled
                ? savedRoutingPhaseIndex("VBUS_CONN")
                : undefined
        }
        nominalTraceWidth="0.8mm"
        isPowerNet
      />
      <net
        name="VBUS_PROTECTED"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("VBUS_PROTECTED")
            : undefined
        }
        nominalTraceWidth="0.8mm"
        isPowerNet
      />
      <net
        name="USB_DP"
        routingPhaseIndex={
          boundedConnections.includes("net.USB_DP")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("USB_DP")
              : undefined
        }
        nominalTraceWidth="0.1537mm"
      />
      <net
        name="USB_DM"
        routingPhaseIndex={
          boundedConnections.includes("net.USB_DM")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("USB_DM")
              : undefined
        }
        nominalTraceWidth="0.1537mm"
      />
      <net
        name="PD_CC1_CONN"
        routingPhaseIndex={
          boundedConnections.includes("net.PD_CC1_CONN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("PD_CC1_CONN")
              : undefined
        }
      />
      <net
        name="PD_CC2_CONN"
        routingPhaseIndex={
          boundedConnections.includes("net.PD_CC2_CONN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("PD_CC2_CONN")
              : undefined
        }
      />
      <net
        name="PD_CC1_MCU"
        routingPhaseIndex={
          boundedConnections.includes("net.PD_CC1_MCU")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("PD_CC1_MCU")
              : undefined
        }
      />
      <net
        name="PD_CC2_MCU"
        routingPhaseIndex={
          boundedConnections.includes("net.PD_CC2_MCU")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("PD_CC2_MCU")
              : undefined
        }
      />
      <net
        name="PD_GATE"
        routingPhaseIndex={
          boundedConnections.includes("net.PD_GATE")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("PD_GATE")
              : undefined
        }
      />
      <net
        name="PD_OVP_SERIES"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_OVP_SERIES")
            : undefined
        }
      />
      <net
        name="PD_OVP"
        routingPhaseIndex={
          boundedConnections.includes("net.PD_OVP")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("PD_OVP")
              : undefined
        }
      />
      <net
        name="PD_DB"
        routingPhaseIndex={
          boundedConnections.includes("net.PD_DB")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("PD_DB")
              : undefined
        }
      />
      <net
        name="PD_FLT"
        routingPhaseIndex={
          boundedConnections.includes("net.PD_FLT")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("PD_FLT")
              : undefined
        }
      />
      <net
        name="VBUS_DIV"
        routingPhaseIndex={
          boundedConnections.includes("net.VBUS_DIV")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("VBUS_DIV")
              : undefined
        }
      />
      <net
        name="VBUS_ADC"
        routingPhaseIndex={
          boundedConnections.includes("net.VBUS_ADC")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("VBUS_ADC")
              : undefined
        }
      />
      <net
        name="SWDIO_GUARDED"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("SWDIO_GUARDED")
            : undefined
        }
      />
      <net
        name="SWCLK_GUARDED"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("SWCLK_GUARDED")
            : undefined
        }
      />
      <net
        name="NRST_GUARDED"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("NRST_GUARDED")
            : undefined
        }
      />
      <net
        name="SWDIO"
        routingPhaseIndex={
          boundedConnections.includes("net.SWDIO")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("SWDIO")
              : undefined
        }
      />
      <net
        name="SWCLK"
        routingPhaseIndex={
          boundedConnections.includes("net.SWCLK")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("SWCLK")
              : undefined
        }
      />
      <net
        name="SWDIO_CONN"
        routingPhaseIndex={
          boundedConnections.includes("net.SWDIO_CONN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("SWDIO_CONN")
              : undefined
        }
      />
      <net
        name="SWCLK_CONN"
        routingPhaseIndex={
          boundedConnections.includes("net.SWCLK_CONN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("SWCLK_CONN")
              : undefined
        }
      />
      <net
        name="NRST_CONN"
        routingPhaseIndex={
          boundedConnections.includes("net.NRST_CONN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("NRST_CONN")
              : undefined
        }
      />
      <net
        name="POWER_GOOD"
        routingPhaseIndex={
          boundedConnections.includes("net.POWER_GOOD")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("POWER_GOOD")
              : undefined
        }
      />
      <net
        name="VBUS_ADC_PRE_GUARD"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("VBUS_ADC_PRE_GUARD")
            : undefined
        }
      />
      <net
        name="TEMP_ALERT_N"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TEMP_ALERT_N")
            : undefined
        }
      />
      <net
        name="EXT_STEP_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_STEP_CONN")
            : undefined
        }
      />
      <net
        name="EXT_DIR_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_DIR_CONN")
            : undefined
        }
      />
      <net
        name="EXT_ENABLE_N_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_ENABLE_N_CONN")
            : undefined
        }
      />
      <net
        name="EXT_STEP"
        routingPhaseIndex={
          boundedConnections.includes("net.EXT_STEP")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EXT_STEP")
              : undefined
        }
      />
      <net
        name="EXT_DIR"
        routingPhaseIndex={
          boundedConnections.includes("net.EXT_DIR")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EXT_DIR")
              : undefined
        }
      />
      <net
        name="EXT_ENABLE_N"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_ENABLE_N")
            : undefined
        }
      />
      <net
        name="LIMIT1_CONN"
        routingPhaseIndex={
          boundedConnections.includes("net.LIMIT1_CONN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("LIMIT1_CONN")
              : undefined
        }
      />
      <net
        name="LIMIT2_CONN"
        routingPhaseIndex={
          boundedConnections.includes("net.LIMIT2_CONN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("LIMIT2_CONN")
              : undefined
        }
      />
      <net
        name="LIMIT1"
        routingPhaseIndex={
          boundedConnections.includes("net.LIMIT1")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("LIMIT1")
              : undefined
        }
      />
      <net
        name="LIMIT2"
        routingPhaseIndex={
          boundedConnections.includes("net.LIMIT2")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("LIMIT2")
              : undefined
        }
      />
      <net
        name="LED_POWER_A"
        routingPhaseIndex={
          boundedConnections.includes("net.LED_POWER_A")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("LED_POWER_A")
              : undefined
        }
      />
      <net
        name="LED_STATUS_A"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LED_STATUS_A")
            : undefined
        }
      />
      <net
        name="LED_FAULT_A"
        routingPhaseIndex={
          boundedConnections.includes("net.LED_FAULT_A")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("LED_FAULT_A")
              : undefined
        }
      />
      <net
        name="LED_STATUS_DRIVE"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LED_STATUS_DRIVE")
            : undefined
        }
      />
      <net
        name="LED_FAULT_DRIVE"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LED_FAULT_DRIVE")
            : undefined
        }
      />
      <net
        name="CAN_RS"
        routingPhaseIndex={
          boundedConnections.includes("net.CAN_RS")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("CAN_RS")
              : undefined
        }
      />
      <net
        name="EFUSE_FLT_N"
        routingPhaseIndex={
          boundedConnections.includes("net.EFUSE_FLT_N")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EFUSE_FLT_N")
              : undefined
        }
      />
      <net
        name="POWER_HIGH_CURRENT"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("POWER_HIGH_CURRENT")
            : undefined
        }
      />
      <net
        name="EFUSE_EN"
        routingPhaseIndex={
          boundedConnections.includes("net.EFUSE_EN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EFUSE_EN")
              : undefined
        }
      />
      <net
        name="EFUSE_OVP_TOP_1"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_OVP_TOP_1")
            : undefined
        }
      />
      <net
        name="EFUSE_OVP_TOP_2"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_OVP_TOP_2")
            : undefined
        }
      />
      <net
        name="EFUSE_OVP"
        routingPhaseIndex={
          boundedConnections.includes("net.EFUSE_OVP")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EFUSE_OVP")
              : undefined
        }
      />
      <net
        name="EFUSE_ILIM"
        routingPhaseIndex={
          boundedConnections.includes("net.EFUSE_ILIM")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EFUSE_ILIM")
              : undefined
        }
      />
      <net
        name="EFUSE_ILIM_SWITCH"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_ILIM_SWITCH")
            : undefined
        }
      />
      <net
        name="EFUSE_DVDT"
        routingPhaseIndex={
          boundedConnections.includes("net.EFUSE_DVDT")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EFUSE_DVDT")
              : undefined
        }
      />
      <net
        name="EFUSE_RTN"
        routingPhaseIndex={
          boundedConnections.includes("net.EFUSE_RTN")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EFUSE_RTN")
              : undefined
        }
        nominalTraceWidth="0.5mm"
        isGroundNet
      />
      <net
        name="CAN_TERM_LINK"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("CAN_TERM_LINK")
            : undefined
        }
      />
      {usbRoutesEnabled &&
        (savedRoutesEnabled ? <UsbGroundRoute /> : <UsbRoutes />)}
      {usbRoutesEnabled && savedRoutesEnabled && <GroundReturns />}
      {usbRoutesEnabled && <UsbReference />}
      {savedRoutesEnabled && <SavedRoutes />}
      {boundedConnections.length > 0 && (
        <autoroutingphase
          name="Bounded protection connections"
          phaseIndex={1}
          autorouter="auto_local"
          connections={boundedConnections}
        />
      )}
      <copperpour
        name="L2_GND_REFERENCE"
        layer="inner1"
        connectsTo="net.GND"
        clearance="0.155mm"
        boardEdgeMargin="0.3mm"
        cutoutMargin="0.31mm"
        useThermalReliefs={false}
      />
      <PowerCopperTrial />
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
