import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { CL05A475MP5NRNC } from "../../imports/CL05A475MP5NRNC/CL05A475MP5NRNC"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { STM32G0B1CBT6 } from "../../imports/STM32G0B1CBT6/STM32G0B1CBT6"

export function McuSheet({ mechanicalPreview = false }: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="MCU"
      displayName="MCU core - DRAFT"
      sheetSize="A4"
      sheetIndex={1}
    >
      <schematictext
        fontSize={0.18}
        text={
          "STM32G0B1: native UCPD/USB, TMC UART, SWD, classical CAN, temperature and control inputs."
        }
        schX={-6.5}
        schY={8.7}
      />
      <STM32G0B1CBT6
        name="U1"
        {...previewPlacement("U1", mechanicalPreview)}
        schX={-9.75}
        schY={0}
        schWidth={3.48}
        noConnect={[
          "PC13",
          "PC14_OSC32_IN",
          "PC15_OSC32_OUT",
          "PF0_OSC_IN",
          "PF1_OSC_OUT",
          "PA15",
          "PD0",
          "PD1",
          "PD2",
          "PD3",
          "PB7",
        ]}
        connections={{
          VDD: "net.V3V3",
          VSS: "net.GND",
          VBAT: "net.V3V3",
          VREF_POS: "net.V3V3",
          PF2_NRST: "net.NRST",
          PB8: "net.I2C_SCL",
          PB9: "net.I2C_SDA",
          PB5: "net.CAN_RX",
          PB6: "net.CAN_TX",
          PA2: "net.TMC_UART_TX",
          PA3: "net.TMC_UART_RX",
          PA4: "net.TMC_ENABLE_N",
          PA5: "net.TMC_DIAG",
          PA6: "net.TMC_STEP",
          PA7: "net.TMC_DIR",
          PA11_PA9_: "net.USB_DM",
          PA12_PA10_: "net.USB_DP",
          PA8: "net.PD_CC1_MCU",
          PB15: "net.PD_CC2_MCU",
          PA9: "net.GND",
          PA10: "net.GND",
          PB12: "net.PD_DB",
          PB13: "net.PD_FLT",
          PA0: "net.VBUS_ADC",
          PA1: "net.TEMP_ALERT_N",
          PA13: "net.SWDIO",
          PA14_BOOT0: "net.SWCLK",
          PB0: "net.EXT_STEP",
          PB1: "net.EXT_DIR",
          PB2: "net.EXT_ENABLE_N",
          PB10: "net.LIMIT1",
          PB11: "net.LIMIT2",
          PB14: "net.POWER_HIGH_CURRENT",
          PC6: "net.LED_STATUS_DRIVE",
          PC7: "net.LED_FAULT_DRIVE",
          PB3: "net.CAN_RS",
          PB4: "net.EFUSE_FLT_N",
        }}
      />
      <CL05B104KO5NNNC
        name="C1"
        {...previewPlacement("C1", mechanicalPreview)}
        schX={-3.25}
        schY={3.6}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL05A475MP5NRNC
        name="C2"
        {...previewPlacement("C2", mechanicalPreview)}
        schX={-1.3}
        schY={3.6}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C3"
        {...previewPlacement("C3", mechanicalPreview)}
        schX={-3.25}
        schY={1.44}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C4"
        {...previewPlacement("C4", mechanicalPreview)}
        schX={-1.3}
        schY={1.44}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R1"
        {...previewPlacement("R1", mechanicalPreview)}
        schX={-3.25}
        schY={-2.16}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.NRST" }}
      />
      <CL05B104KO5NNNC
        name="C5"
        {...previewPlacement("C5", mechanicalPreview)}
        schX={-1.3}
        schY={-2.16}
        schRotation={270}
        connections={{ pin1: "net.NRST", pin2: "net.GND" }}
      />
      <schematictext
        fontSize={0.18}
        text={"C1/C2: VDD/VDDA; C3: VREF+; C4: VBAT; C5: NRST"}
        schX={-6.5}
        schY={-8.82}
      />
      <schematictext
        fontSize={0.18}
        text={
          "C2 effective capacitance under 3.3 V bias requires qualification"
        }
        schX={-6.5}
        schY={-9.26}
      />
      <schematictext
        fontSize={0.18}
        text={
          "Unused GPIO: firmware analog mode. HSI48/CRS for USB; no external crystal."
        }
        schX={-6.5}
        schY={-9.7}
      />
      <ComponentNotes sheet="MCU" />
    </schematicsheet>
  )
}
