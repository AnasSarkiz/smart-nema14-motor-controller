import { BoardLegend } from "./BoardLegend"
import { GroundReturnPlanes } from "./routing/GroundReturnPlanes"
import type { FanoutTracePath } from "@tscircuit/props"
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
import {
  Rev45SavedRoutes,
  rev45RoutingPhaseIndex,
} from "./routing/Rev45SavedRoutes"

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
  freshRoutesEnabled = true,
  nativeSavedRouteTrial,
  nativeFanoutTrial,
  nativeGroundPourTrial = true,
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
  freshRoutesEnabled?: boolean
  nativeSavedRouteTrial?: { netNames: string[]; paths: FanoutTracePath[] }
  nativeFanoutTrial?: { netNames: string[]; paths?: FanoutTracePath[] }
  nativeGroundPourTrial?: boolean
} = {}) {
  if (savedRoutesEnabled || usbRoutesEnabled || nativePartialSignalBranches) {
    throw new Error(
      "Revision 43 copper belongs to STM32. Regenerate RP2040 routing; never replay the old pin selectors.",
    )
  }
  const copperEnabled =
    freshRoutesEnabled || routeRemaining || nativeRoutingTargets.length > 0
  const routingContext = {
    freshRoutesEnabled,
    nativeRoutingNetNames,
    trialNetNames: nativeSavedRouteTrial?.netNames,
    fanoutTrialNetNames: nativeFanoutTrial?.netNames,
  }
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
      minViaEdgeToPadEdgeClearance="0.28mm"
      minTraceToHoleEdgeClearance="0.35mm"
      minViaHoleEdgeToViaHoleEdgeClearance="0.35mm"
      minPlatedHoleDrillEdgeToDrillEdgeClearance="0.35mm"
      minViaHoleDiameter="0.30mm"
      minViaPadDiameter="0.45mm"
      schLayout={{ layoutMode: "none" }}
    >
      <BoardLegend />
      <net
        name="PD_LOAD_ENABLE_N"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "PD_LOAD_ENABLE_N",
          routingContext,
        )}
      />
      <net
        name="GND"
        routingPhaseIndex={rev45RoutingPhaseIndex("GND", routingContext)}
        isGroundNet
        nominalTraceWidth="0.5mm"
      />
      <net
        name="V3V3"
        routingPhaseIndex={rev45RoutingPhaseIndex("V3V3", routingContext)}
        isPowerNet
        nominalTraceWidth="0.35mm"
      />
      <net
        name="NRST"
        routingPhaseIndex={rev45RoutingPhaseIndex("NRST", routingContext)}
      />
      <net
        name="I2C_SCL"
        routingPhaseIndex={rev45RoutingPhaseIndex("I2C_SCL", routingContext)}
      />
      <net
        name="I2C_SDA"
        routingPhaseIndex={rev45RoutingPhaseIndex("I2C_SDA", routingContext)}
      />
      <net
        name="CAN_TX"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_TX", routingContext)}
      />
      <net
        name="CAN_RX"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_RX", routingContext)}
      />
      <net
        name="CAN_H"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_H", routingContext)}
      />
      <net
        name="CAN_L"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_L", routingContext)}
      />
      <net
        name="BUCK_SW"
        routingPhaseIndex={rev45RoutingPhaseIndex("BUCK_SW", routingContext)}
        nominalTraceWidth="0.6mm"
      />
      <net
        name="BUCK_BST"
        routingPhaseIndex={rev45RoutingPhaseIndex("BUCK_BST", routingContext)}
      />
      <net
        name="VM"
        routingPhaseIndex={rev45RoutingPhaseIndex("VM", routingContext)}
        isPowerNet
        nominalTraceWidth="0.8mm"
      />
      <net
        name="TMC_ENABLE_N"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "TMC_ENABLE_N",
          routingContext,
        )}
      />
      <net
        name="TMC_STEP"
        routingPhaseIndex={rev45RoutingPhaseIndex("TMC_STEP", routingContext)}
      />
      <net
        name="TMC_DIR"
        routingPhaseIndex={rev45RoutingPhaseIndex("TMC_DIR", routingContext)}
      />
      <net
        name="TMC_DIAG"
        routingPhaseIndex={rev45RoutingPhaseIndex("TMC_DIAG", routingContext)}
      />
      <net
        name="TMC_UART_TX"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "TMC_UART_TX",
          routingContext,
        )}
      />
      <net
        name="TMC_UART_RX"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "TMC_UART_RX",
          routingContext,
        )}
      />
      <net
        name="TMC_CPO"
        routingPhaseIndex={rev45RoutingPhaseIndex("TMC_CPO", routingContext)}
      />
      <net
        name="TMC_CPI"
        routingPhaseIndex={rev45RoutingPhaseIndex("TMC_CPI", routingContext)}
      />
      <net
        name="TMC_VCP"
        routingPhaseIndex={rev45RoutingPhaseIndex("TMC_VCP", routingContext)}
      />
      <net
        name="TMC_5VOUT"
        routingPhaseIndex={rev45RoutingPhaseIndex("TMC_5VOUT", routingContext)}
      />
      <net
        name="TMC_VREF"
        routingPhaseIndex={rev45RoutingPhaseIndex("TMC_VREF", routingContext)}
      />
      <net
        name="TMC_SENSE_A"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "TMC_SENSE_A",
          routingContext,
        )}
        nominalTraceWidth="0.4mm"
      />
      <net
        name="TMC_SENSE_B"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "TMC_SENSE_B",
          routingContext,
        )}
        nominalTraceWidth="0.4mm"
      />
      <net
        name="MOTOR_A1"
        routingPhaseIndex={rev45RoutingPhaseIndex("MOTOR_A1", routingContext)}
        nominalTraceWidth="0.4mm"
      />
      <net
        name="MOTOR_A2"
        routingPhaseIndex={rev45RoutingPhaseIndex("MOTOR_A2", routingContext)}
        nominalTraceWidth="0.4mm"
      />
      <net
        name="MOTOR_B1"
        routingPhaseIndex={rev45RoutingPhaseIndex("MOTOR_B1", routingContext)}
        nominalTraceWidth="0.4mm"
      />
      <net
        name="MOTOR_B2"
        routingPhaseIndex={rev45RoutingPhaseIndex("MOTOR_B2", routingContext)}
        nominalTraceWidth="0.4mm"
      />
      <net
        name="VBUS_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex("VBUS_CONN", routingContext)}
        isPowerNet
        nominalTraceWidth="0.8mm"
      />
      <net
        name="VBUS_PROTECTED"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "VBUS_PROTECTED",
          routingContext,
        )}
        isPowerNet
        nominalTraceWidth="0.8mm"
      />
      <net
        name="USB_DP"
        routingPhaseIndex={rev45RoutingPhaseIndex("USB_DP", routingContext)}
      />
      <net
        name="USB_DM"
        routingPhaseIndex={rev45RoutingPhaseIndex("USB_DM", routingContext)}
      />
      <net
        name="PD_CC1_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "PD_CC1_CONN",
          routingContext,
        )}
      />
      <net
        name="PD_CC2_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "PD_CC2_CONN",
          routingContext,
        )}
      />
      <net
        name="VBUS_DIV"
        routingPhaseIndex={rev45RoutingPhaseIndex("VBUS_DIV", routingContext)}
      />
      <net
        name="VBUS_ADC"
        routingPhaseIndex={rev45RoutingPhaseIndex("VBUS_ADC", routingContext)}
      />
      <net
        name="SWDIO_GUARDED"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "SWDIO_GUARDED",
          routingContext,
        )}
      />
      <net
        name="SWCLK_GUARDED"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "SWCLK_GUARDED",
          routingContext,
        )}
      />
      <net
        name="NRST_GUARDED"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "NRST_GUARDED",
          routingContext,
        )}
      />
      <net
        name="SWDIO"
        routingPhaseIndex={rev45RoutingPhaseIndex("SWDIO", routingContext)}
      />
      <net
        name="SWCLK"
        routingPhaseIndex={rev45RoutingPhaseIndex("SWCLK", routingContext)}
      />
      <net
        name="SWDIO_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex("SWDIO_CONN", routingContext)}
      />
      <net
        name="SWCLK_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex("SWCLK_CONN", routingContext)}
      />
      <net
        name="NRST_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex("NRST_CONN", routingContext)}
      />
      <net
        name="POWER_GOOD"
        routingPhaseIndex={rev45RoutingPhaseIndex("POWER_GOOD", routingContext)}
      />
      <net
        name="VBUS_ADC_PRE_GUARD"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "VBUS_ADC_PRE_GUARD",
          routingContext,
        )}
      />
      <net
        name="TEMP_ALERT_N"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "TEMP_ALERT_N",
          routingContext,
        )}
      />
      <net
        name="EXT_STEP_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "EXT_STEP_CONN",
          routingContext,
        )}
      />
      <net
        name="EXT_DIR_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "EXT_DIR_CONN",
          routingContext,
        )}
      />
      <net
        name="EXT_ENABLE_N_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "EXT_ENABLE_N_CONN",
          routingContext,
        )}
      />
      <net
        name="EXT_STEP"
        routingPhaseIndex={rev45RoutingPhaseIndex("EXT_STEP", routingContext)}
      />
      <net
        name="EXT_DIR"
        routingPhaseIndex={rev45RoutingPhaseIndex("EXT_DIR", routingContext)}
      />
      <net
        name="EXT_ENABLE_N"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "EXT_ENABLE_N",
          routingContext,
        )}
      />
      <net
        name="LIMIT1_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "LIMIT1_CONN",
          routingContext,
        )}
      />
      <net
        name="LIMIT2_CONN"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "LIMIT2_CONN",
          routingContext,
        )}
      />
      <net
        name="LIMIT1"
        routingPhaseIndex={rev45RoutingPhaseIndex("LIMIT1", routingContext)}
      />
      <net
        name="LIMIT2"
        routingPhaseIndex={rev45RoutingPhaseIndex("LIMIT2", routingContext)}
      />
      <net
        name="LED_POWER_A"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "LED_POWER_A",
          routingContext,
        )}
      />
      <net
        name="LED_STATUS_A"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "LED_STATUS_A",
          routingContext,
        )}
      />
      <net
        name="LED_FAULT_A"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "LED_FAULT_A",
          routingContext,
        )}
      />
      <net
        name="LED_STATUS_DRIVE"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "LED_STATUS_DRIVE",
          routingContext,
        )}
      />
      <net
        name="LED_FAULT_DRIVE"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "LED_FAULT_DRIVE",
          routingContext,
        )}
      />
      <net
        name="CAN_RS"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_RS", routingContext)}
      />
      <net
        name="EFUSE_FLT_N"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "EFUSE_FLT_N",
          routingContext,
        )}
      />
      <net
        name="POWER_HIGH_CURRENT"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "POWER_HIGH_CURRENT",
          routingContext,
        )}
      />
      <net
        name="EFUSE_EN"
        routingPhaseIndex={rev45RoutingPhaseIndex("EFUSE_EN", routingContext)}
      />
      <net
        name="EFUSE_OVP_TOP_1"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "EFUSE_OVP_TOP_1",
          routingContext,
        )}
      />
      <net
        name="EFUSE_OVP_TOP_2"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "EFUSE_OVP_TOP_2",
          routingContext,
        )}
      />
      <net
        name="EFUSE_OVP"
        routingPhaseIndex={rev45RoutingPhaseIndex("EFUSE_OVP", routingContext)}
      />
      <net
        name="EFUSE_ILIM"
        routingPhaseIndex={rev45RoutingPhaseIndex("EFUSE_ILIM", routingContext)}
      />
      <net
        name="EFUSE_ILIM_SWITCH"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "EFUSE_ILIM_SWITCH",
          routingContext,
        )}
      />
      <net
        name="EFUSE_DVDT"
        routingPhaseIndex={rev45RoutingPhaseIndex("EFUSE_DVDT", routingContext)}
      />
      <net
        name="EFUSE_RTN"
        routingPhaseIndex={rev45RoutingPhaseIndex("EFUSE_RTN", routingContext)}
        isGroundNet
        nominalTraceWidth="0.5mm"
      />
      <net
        name="CAN_TERM_LINK"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "CAN_TERM_LINK",
          routingContext,
        )}
      />
      <net
        name="VCORE"
        routingPhaseIndex={rev45RoutingPhaseIndex("VCORE", routingContext)}
        isPowerNet
        nominalTraceWidth="0.35mm"
      />
      <net
        name="QSPI_IO0"
        routingPhaseIndex={rev45RoutingPhaseIndex("QSPI_IO0", routingContext)}
      />
      <net
        name="QSPI_IO1"
        routingPhaseIndex={rev45RoutingPhaseIndex("QSPI_IO1", routingContext)}
      />
      <net
        name="QSPI_IO2"
        routingPhaseIndex={rev45RoutingPhaseIndex("QSPI_IO2", routingContext)}
      />
      <net
        name="QSPI_IO3"
        routingPhaseIndex={rev45RoutingPhaseIndex("QSPI_IO3", routingContext)}
      />
      <net
        name="QSPI_CLK"
        routingPhaseIndex={rev45RoutingPhaseIndex("QSPI_CLK", routingContext)}
      />
      <net
        name="QSPI_CS"
        routingPhaseIndex={rev45RoutingPhaseIndex("QSPI_CS", routingContext)}
      />
      <net
        name="XIN"
        routingPhaseIndex={rev45RoutingPhaseIndex("XIN", routingContext)}
      />
      <net
        name="XOUT"
        routingPhaseIndex={rev45RoutingPhaseIndex("XOUT", routingContext)}
      />
      <net
        name="XTAL_OUT"
        routingPhaseIndex={rev45RoutingPhaseIndex("XTAL_OUT", routingContext)}
      />
      <net
        name="MCU_USB_DM"
        routingPhaseIndex={rev45RoutingPhaseIndex("MCU_USB_DM", routingContext)}
      />
      <net
        name="MCU_USB_DP"
        routingPhaseIndex={rev45RoutingPhaseIndex("MCU_USB_DP", routingContext)}
      />
      <net
        name="CAN_SPI_MISO"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "CAN_SPI_MISO",
          routingContext,
        )}
      />
      <net
        name="CAN_SPI_MOSI"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "CAN_SPI_MOSI",
          routingContext,
        )}
      />
      <net
        name="CAN_SPI_CS"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_SPI_CS", routingContext)}
      />
      <net
        name="CAN_SPI_CLK"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "CAN_SPI_CLK",
          routingContext,
        )}
      />
      <net
        name="CAN_INT_N"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_INT_N", routingContext)}
      />
      <net
        name="CAN_XIN"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_XIN", routingContext)}
      />
      <net
        name="CAN_XOUT"
        routingPhaseIndex={rev45RoutingPhaseIndex("CAN_XOUT", routingContext)}
      />
      <net
        name="PD_ALERT_N"
        routingPhaseIndex={rev45RoutingPhaseIndex("PD_ALERT_N", routingContext)}
      />
      <net
        name="PD_RESET"
        routingPhaseIndex={rev45RoutingPhaseIndex("PD_RESET", routingContext)}
      />
      <net
        name="PD_POWER_OK3"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "PD_POWER_OK3",
          routingContext,
        )}
      />
      <net
        name="PD_VREG_1V2"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "PD_VREG_1V2",
          routingContext,
        )}
      />
      <net
        name="PD_VREG_2V7"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "PD_VREG_2V7",
          routingContext,
        )}
      />
      <net
        name="PD_VDD"
        routingPhaseIndex={rev45RoutingPhaseIndex("PD_VDD", routingContext)}
      />
      <net
        name="PD_FET_SOURCE"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "PD_FET_SOURCE",
          routingContext,
        )}
        isPowerNet
        nominalTraceWidth="0.8mm"
      />
      <net
        name="PD_GATE"
        routingPhaseIndex={rev45RoutingPhaseIndex("PD_GATE", routingContext)}
      />
      <net
        name="PD_DISCH"
        routingPhaseIndex={rev45RoutingPhaseIndex("PD_DISCH", routingContext)}
      />
      <net
        name="PD_VBUS_SENSE"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "PD_VBUS_SENSE",
          routingContext,
        )}
      />
      <net
        name="BUZZER_PWM"
        routingPhaseIndex={rev45RoutingPhaseIndex("BUZZER_PWM", routingContext)}
      />
      <net
        name="BUZZER_GATE"
        routingPhaseIndex={rev45RoutingPhaseIndex(
          "BUZZER_GATE",
          routingContext,
        )}
      />
      <net
        name="BUZZER_NEG"
        routingPhaseIndex={rev45RoutingPhaseIndex("BUZZER_NEG", routingContext)}
        nominalTraceWidth="0.35mm"
      />
      {freshRoutesEnabled && (
        <Rev45SavedRoutes
          trialPaths={nativeSavedRouteTrial?.paths}
          trialNetNames={nativeSavedRouteTrial?.netNames}
        />
      )}
      <differentialpair
        name="USB_RECEPTACLE_PAIR"
        positiveConnection=".R_USB_DP > port.pin1"
        negativeConnection=".R_USB_DM > port.pin1"
        pcbTraceGap="0.15mm"
        maxUncoupledLength="2mm"
        targetDifferentialImpedance={90}
      />
      {/* Match the two actual trunks; the reversible connector has branches.
          Both complete plug-orientation paths are checked independently. */}
      <bus
        name="USB_RECEPTACLE_MAIN_LENGTHS"
        connections={[".R_USB_DP > port.pin1", ".R_USB_DM > port.pin1"]}
        maxLengthSkew="0.25mm"
      />
      <differentialpair
        name="USB_MCU_PAIR"
        positiveConnection=".R_USB_DP > port.pin2"
        negativeConnection=".R_USB_DM > port.pin2"
        maxLengthSkew="0.25mm"
        pcbTraceGap="0.15mm"
        maxUncoupledLength="2mm"
        targetDifferentialImpedance={90}
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
      {nativeFanoutTrial && (
        <autoroutingphase
          name="Native component escapes with Pipeline9 continuation"
          phaseIndex={2}
          autorouter={{
            preset: "fanout",
            traceClearance: "0.15mm",
            allowViaInPad: false,
          }}
          connections={nativeFanoutTrial.netNames.map((name) => `net.${name}`)}
          pcbTracePaths={nativeFanoutTrial.paths}
          fanoutPourNetMap={{ inner1: "GND" }}
          minViaHoleDiameter="0.30mm"
          minViaPadDiameter="0.45mm"
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
      {copperEnabled && nativeGroundPourTrial && <GroundReturnPlanes />}
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
