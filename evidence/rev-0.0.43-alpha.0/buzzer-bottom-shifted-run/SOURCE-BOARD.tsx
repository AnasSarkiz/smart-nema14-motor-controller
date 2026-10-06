import { MLT_5020 } from "../imports/MLT_5020/MLT_5020"
import { BoardLegend } from "./BoardLegend"
import { NativePlaneReconnections } from "./routing/NativePlaneReconnections"
import { PowerCopperTrial } from "./routing/PowerCopperTrial"
import { FilledSignalEscapes } from "./routing/FilledSignalEscapes"
import { GroundReturns } from "./routing/GroundReturns"
import { PartialSignalBranches } from "./routing/PartialSignalBranches"
import { UsbGroundRoute } from "./routing/UsbGroundRoute"
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
import { UsbRoutes } from "./usb-pd/UsbRoutes"
import { UsbReference } from "./usb-pd/UsbReference"
import {
  SavedRoutes,
  savedRoutingPhaseIndex,
} from "./routing/PowerSavedRoutesTrial"

/** Incomplete routing prototype: replay checked copper; route selected nets explicitly. */
export default function SmartNema14MotorController({
  mechanicalPreview = true,
  usbRoutesEnabled = true,
  savedRoutesEnabled = true,
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
  const copperEnabled =
    savedRoutesEnabled ||
    usbRoutesEnabled ||
    routeRemaining ||
    nativeRoutingTargets.length > 0
  return (
    <board
      width="35mm"
      height="35mm"
      layers={4}
      isViaInPadAllowed
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
      minViaHoleDiameter="0.15mm"
      minViaPadDiameter="0.38mm"
      schLayout={{ layoutMode: "none" }}
    >
      <BoardLegend />
      <MLT_5020 name="BZ1" pcbX={-3.75} pcbY={13.75} pcbRotation={0} layer="bottom" noConnect={["_POS", "_NEG", "NC"]} />
      <net
        name="GND"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("GND", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.5mm"
        isGroundNet
      />
      <net
        name="V3V3"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("V3V3", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.35mm"
        isPowerNet
      />
      <net
        name="NRST"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("NRST", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="I2C_SCL"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("I2C_SCL", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="I2C_SDA"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("I2C_SDA", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="CAN_TX"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("CAN_TX", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="CAN_RX"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("CAN_RX", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="CAN_H"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("CAN_H", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="CAN_L"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("CAN_L", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="BUCK_SW"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("BUCK_SW", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="BUCK_BST"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("BUCK_BST", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="VM"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("VM", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.8mm"
        isPowerNet
      />
      <net
        name="TMC_ENABLE_N"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_ENABLE_N", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_STEP"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_STEP", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_DIR"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_DIR", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_DIAG"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_DIAG", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_UART_TX"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_UART_TX", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_UART_RX"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_UART_RX", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_CPO"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_CPO", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_CPI"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_CPI", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_VCP"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_VCP", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_5VOUT"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_5VOUT", nativeRoutingNetNames)
            : undefined
        }
        isPowerNet
      />
      <net
        name="TMC_VREF"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_VREF", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="TMC_SENSE_A"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_SENSE_A", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="TMC_SENSE_B"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TMC_SENSE_B", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="MOTOR_A1"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("MOTOR_A1", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="MOTOR_A2"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("MOTOR_A2", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="MOTOR_B1"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("MOTOR_B1", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="MOTOR_B2"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("MOTOR_B2", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.5mm"
      />
      <net
        name="VBUS_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("VBUS_CONN", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.8mm"
        isPowerNet
      />
      <net
        name="VBUS_PROTECTED"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("VBUS_PROTECTED", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.8mm"
        isPowerNet
      />
      <net
        name="USB_DP"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("USB_DP", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.1537mm"
      />
      <net
        name="USB_DM"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("USB_DM", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.1537mm"
      />
      <net
        name="PD_CC1_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_CC1_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="PD_CC2_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_CC2_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="PD_CC1_MCU"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_CC1_MCU", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="PD_CC2_MCU"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_CC2_MCU", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="PD_GATE"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_GATE", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="PD_OVP_SERIES"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_OVP_SERIES", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="PD_OVP"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_OVP", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="PD_DB"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_DB", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="PD_FLT"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("PD_FLT", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="VBUS_DIV"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("VBUS_DIV", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="VBUS_ADC"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("VBUS_ADC", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="SWDIO_GUARDED"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("SWDIO_GUARDED", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="SWCLK_GUARDED"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("SWCLK_GUARDED", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="NRST_GUARDED"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("NRST_GUARDED", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="SWDIO"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("SWDIO", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="SWCLK"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("SWCLK", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="SWDIO_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("SWDIO_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="SWCLK_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("SWCLK_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="NRST_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("NRST_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="POWER_GOOD"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("POWER_GOOD", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="VBUS_ADC_PRE_GUARD"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex(
                "VBUS_ADC_PRE_GUARD",
                nativeRoutingNetNames,
              )
            : undefined
        }
      />
      <net
        name="TEMP_ALERT_N"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("TEMP_ALERT_N", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EXT_STEP_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_STEP_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EXT_DIR_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_DIR_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EXT_ENABLE_N_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_ENABLE_N_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EXT_STEP"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_STEP", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EXT_DIR"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_DIR", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EXT_ENABLE_N"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EXT_ENABLE_N", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LIMIT1_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LIMIT1_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LIMIT2_CONN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LIMIT2_CONN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LIMIT1"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LIMIT1", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LIMIT2"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LIMIT2", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LED_POWER_A"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LED_POWER_A", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LED_STATUS_A"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LED_STATUS_A", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LED_FAULT_A"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LED_FAULT_A", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LED_STATUS_DRIVE"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LED_STATUS_DRIVE", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="LED_FAULT_DRIVE"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("LED_FAULT_DRIVE", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="CAN_RS"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("CAN_RS", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EFUSE_FLT_N"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_FLT_N", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="POWER_HIGH_CURRENT"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex(
                "POWER_HIGH_CURRENT",
                nativeRoutingNetNames,
              )
            : undefined
        }
      />
      <net
        name="EFUSE_EN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_EN", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EFUSE_OVP_TOP_1"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_OVP_TOP_1", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EFUSE_OVP_TOP_2"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_OVP_TOP_2", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EFUSE_OVP"
        routingPhaseIndex={
          nativeRoutingTargets.includes(".U10 > .OVP")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EFUSE_OVP", nativeRoutingNetNames)
              : undefined
        }
      />
      <net
        name="EFUSE_ILIM"
        routingPhaseIndex={
          nativeRoutingTargets.includes(".U10 > .pin19")
            ? 1
            : savedRoutesEnabled
              ? savedRoutingPhaseIndex("EFUSE_ILIM", nativeRoutingNetNames)
              : undefined
        }
      />
      <net
        name="EFUSE_ILIM_SWITCH"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_ILIM_SWITCH", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EFUSE_DVDT"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_DVDT", nativeRoutingNetNames)
            : undefined
        }
      />
      <net
        name="EFUSE_RTN"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("EFUSE_RTN", nativeRoutingNetNames)
            : undefined
        }
        nominalTraceWidth="0.5mm"
        isGroundNet
      />
      <net
        name="CAN_TERM_LINK"
        routingPhaseIndex={
          savedRoutesEnabled
            ? savedRoutingPhaseIndex("CAN_TERM_LINK", nativeRoutingNetNames)
            : undefined
        }
      />
      {usbRoutesEnabled &&
        (savedRoutesEnabled ? <UsbGroundRoute /> : <UsbRoutes />)}
      {usbRoutesEnabled && savedRoutesEnabled && <GroundReturns />}
      {usbRoutesEnabled && <UsbReference />}
      {savedRoutesEnabled && nativePartialSignalBranches && (
        <PartialSignalBranches netNames={nativeRoutingNetNames} />
      )}
      {savedRoutesEnabled && <SavedRoutes />}
      {nativeRoutingTargets.length > 0 && (
        <autoroutingphase
          name="Bounded remaining connection"
          phaseIndex={1}
          minViaHoleDiameter="0.30mm"
          minViaPadDiameter="0.60mm"
          autorouter={{
            preset: "auto_local",
            traceClearance: "0.15mm",
            allowViaInPad: false,
          }}
          connections={nativeRoutingTargets}
        />
      )}
      {copperEnabled && (
        <>
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
          <NativePlaneReconnections />
          <FilledSignalEscapes
            retainSavedFeatureNames={[
              "TMC_ENABLE_MCU_FILLED",
              "TMC_ENABLE_R7_FILLED",
              "SWDIO_U7_FILLED",
              "EFUSE_FLT_USB_RETURN_TRANSFER_01",
              "EFUSE_FLT_USB_RETURN_TRANSFER_02",
              "GND_CAN_BUFFER_BULK_CONTACT",
              "GND_DRIVER_PLANE_RECONNECT",
              "RTN_C33_TRANSFER_01",
              "RTN_C33_TRANSFER_02",
              "POWER_HIGH_MCU_FILLED",
              "POWER_HIGH_GATE_FILLED",
              "POWER_HIGH_PULLDOWN_FILLED",
              "SWCLK_SERIES_FILLED",
              "SWCLK_PULLDOWN_FILLED",
              "STEP_IO_FILLED",
              "STEP_ESD_FILLED",
              "STEP_SERIES_FILLED",
              "FLT_EFUSE_FILLED",
              "FLT_MCU_ESCAPE",
              "FLT_PULLUP_FILLED",
              "CAN_RS_MCU_ESCAPE",
              "EXT_DIR_SERIES_ESCAPE",
              "SWCLK_MCU_ADDITIONAL_FILLED",
              "TMC_DIR_MCU_FILLED_ESCAPE",
              "POWER_HIGH_CURRENT_TRANSFER_07_01",
              "POWER_HIGH_CURRENT_TRANSFER_07_02",
              "SWCLK_TRANSFER_09_03",
              "EFUSE_FLT_N_TRANSFER_13_01",
              "EXT_DIR_TRANSFER_03_01",
              "CAN_RS_TRANSFER_04_01",
            ]}
          />
        </>
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
