import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { CL05B104KO5NNNC } from "../../imports/C1525"
import { CL05A475MP5NRNC } from "../../imports/C23733"
import { A_0402WGF1002TCE } from "../../imports/C25744"
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
        fontSize={0.22}
        text="DRAFT: USB/CC frontend connected; downstream power, SWD and external IO pending"
        schX={0}
        schY={8}
      />
      <STM32G0B1CBT6
        name="U1"
        {...previewPlacement("U1", mechanicalPreview)}
        schX={-5}
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
          "PB3",
          "PB4",
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
        }}
      />
      <CL05B104KO5NNNC
        name="C1"
        {...previewPlacement("C1", mechanicalPreview)}
        schX={5}
        schY={5}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL05A475MP5NRNC
        name="C2"
        {...previewPlacement("C2", mechanicalPreview)}
        schX={8}
        schY={5}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C3"
        {...previewPlacement("C3", mechanicalPreview)}
        schX={5}
        schY={2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C4"
        {...previewPlacement("C4", mechanicalPreview)}
        schX={8}
        schY={2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R1"
        {...previewPlacement("R1", mechanicalPreview)}
        schX={5}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.NRST" }}
      />
      <CL05B104KO5NNNC
        name="C5"
        {...previewPlacement("C5", mechanicalPreview)}
        schX={8}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.NRST", pin2: "net.GND" }}
      />
      <schematictext
        fontSize={0.22}
        text="C1/C2: VDD/VDDA; C3: VREF+; C4: VBAT; C5: NRST"
        schX={0}
        schY={-6}
      />
      <schematictext
        fontSize={0.22}
        text="C2 effective capacitance under 3.3 V bias requires qualification"
        schX={0}
        schY={-7}
      />
      <schematictext
        fontSize={0.22}
        text="Unused GPIO: firmware analog mode. HSI48/CRS for USB; no external crystal."
        schX={0}
        schY={-8}
      />
    </schematicsheet>
  )
}
