import { MCP2515T_I_ML } from "../../imports/MCP2515T_I_ML/MCP2515T_I_ML"
import { ABM8_16_000MHZ_B2_T } from "../../imports/ABM8_16_000MHZ_B2_T/ABM8_16_000MHZ_B2_T"
import { A_0402CG300J500NT } from "../../imports/A_0402CG300J500NT/A_0402CG300J500NT"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { A_0402WGF1200TCE } from "../../imports/A_0402WGF1200TCE/A_0402WGF1200TCE"
import { A_0402WGF0000TCE } from "../../imports/A_0402WGF0000TCE/A_0402WGF0000TCE"
import { SN65HVD230DR } from "../../imports/SN65HVD230DR/SN65HVD230DR"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"

export function CanSheet({ mechanicalPreview = false }: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="CAN"
      displayName="Classical CAN interface - DRAFT"
      sheetSize="A4"
      sheetIndex={3}
    >
      <schematictext
        fontSize={0.18}
        text={
          "MCP2515 external SPI CAN controller with 16 MHz crystal. RP2040 has no built-in CAN controller. Classical CAN only."
        }
        schX={-6.5}
        schY={8.7}
      />
      <SN65HVD230DR
        name="U6"
        {...previewPlacement("U6", mechanicalPreview)}
        schX={-4}
        schY={2.7}
        noConnect={["VREF"]}
        connections={{
          D: "net.CAN_TX",
          R: "net.CAN_RX",
          VCC: "net.V3V3",
          GND: "net.GND",
          RS: "net.CAN_RS",
          CANH: "net.CAN_H",
          CANL: "net.CAN_L",
        }}
      />
      <CL05B104KO5NNNC
        name="C7"
        {...previewPlacement("C7", mechanicalPreview)}
        schX={-2.6}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <A_0402WGF1200TCE
        name="R49"
        {...previewPlacement("R49", mechanicalPreview)}
        schX={-3.9}
        schY={7}
        connections={{ pin1: "net.CAN_H", pin2: "net.CAN_TERM_LINK" }}
      />
      <A_0402WGF0000TCE
        name="R50"
        doNotPlace
        {...previewPlacement("R50", mechanicalPreview)}
        schX={-0.65}
        schY={7}
        connections={{ pin1: "net.CAN_TERM_LINK", pin2: "net.CAN_L" }}
      />
      <schematictext
        fontSize={0.18}
        text={
          "RS pulled high selects standby at reset; GPIO13 selects active high-speed mode. SPI1: GPIO8/9/10/11; IRQ GPIO12."
        }
        schX={-6.5}
        schY={-9.26}
      />
      <schematictext
        fontSize={0.18}
        text={
          "R50 is DNP by default. Populate its zero-ohm link ONLY on CAN bus endpoints to enable R49 termination."
        }
        schX={-6.5}
        schY={-9.7}
      />
      <MCP2515T_I_ML
        name="U_CAN"
        {...previewPlacement("U_CAN", mechanicalPreview)}
        schX={-12}
        schY={0}
        schWidth={2.3}
        noConnect={[
          "CLKOUT",
          "N_TX0RTS",
          "N_TX1RTS",
          "N_TX2RTS",
          "N_RX1BF",
          "N_RX0BF",
          "NC1",
          "NC2",
        ]}
        connections={{
          SCK: "net.CAN_SPI_CLK",
          SI: "net.CAN_SPI_MOSI",
          SO: "net.CAN_SPI_MISO",
          N_CS: "net.CAN_SPI_CS",
          N_INT: "net.CAN_INT_N",
          N_RESET: "net.NRST",
          VDD: "net.V3V3",
          GND: "net.GND",
          EP: "net.GND",
          TXCAN: "net.CAN_TX",
          RXCAN: "net.CAN_RX",
          OSC1: "net.CAN_XIN",
          OSC2: "net.CAN_XOUT",
        }}
      />
      <ABM8_16_000MHZ_B2_T
        loadCapacitance="18pF"
        name="Y_CAN"
        {...previewPlacement("Y_CAN", mechanicalPreview)}
        schX={-4}
        schY={-3}
        connections={{
          pin1: "net.CAN_XIN",
          pin3: "net.CAN_XOUT",
          pin2: "net.GND",
          pin4: "net.GND",
        }}
      />
      <A_0402CG300J500NT
        name="C_CAN_XIN"
        {...previewPlacement("C_CAN_XIN", mechanicalPreview)}
        schX={-6}
        schY={-5}
        schRotation={270}
        connections={{ pin1: "net.CAN_XIN", pin2: "net.GND" }}
      />
      <A_0402CG300J500NT
        name="C_CAN_XOUT"
        {...previewPlacement("C_CAN_XOUT", mechanicalPreview)}
        schX={-2}
        schY={-5}
        schRotation={270}
        connections={{ pin1: "net.CAN_XOUT", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C_CAN_CORE"
        {...previewPlacement("C_CAN_CORE", mechanicalPreview)}
        schX={-0.7}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R_CAN_CS"
        {...previewPlacement("R_CAN_CS", mechanicalPreview)}
        schX={-8}
        schY={5.3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.CAN_SPI_CS" }}
      />
      <A_0402WGF1002TCE
        name="R_CAN_INT"
        {...previewPlacement("R_CAN_INT", mechanicalPreview)}
        schX={-5}
        schY={5.3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.CAN_INT_N" }}
      />
      <ComponentNotes sheet="CAN" />
    </schematicsheet>
  )
}
