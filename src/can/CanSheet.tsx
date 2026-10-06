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
        fontSize={0.22}
        text="FDCAN2 in classical CAN mode, up to 1 Mbps; no CAN FD data phase"
        schX={0}
        schY={6}
      />
      <SN65HVD230DR
        name="U6"
        {...previewPlacement("U6", mechanicalPreview)}
        schX={-4}
        schY={0}
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
        schX={6}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <A_0402WGF1200TCE
        name="R49"
        {...previewPlacement("R49", mechanicalPreview)}
        schX={4}
        schY={4}
        connections={{ pin1: "net.CAN_H", pin2: "net.CAN_TERM_LINK" }}
      />
      <A_0402WGF0000TCE
        name="R50"
        doNotPlace
        {...previewPlacement("R50", mechanicalPreview)}
        schX={9}
        schY={4}
        connections={{ pin1: "net.CAN_TERM_LINK", pin2: "net.CAN_L" }}
      />
      <schematictext
        fontSize={0.22}
        text="RS pulled high selects standby at reset; PB3 selects active high-speed mode. VREF unused."
        schX={0}
        schY={-5}
      />
      <schematictext
        fontSize={0.22}
        text="R50 is DNP by default. Populate its zero-ohm link ONLY on CAN bus endpoints to enable R49 termination."
        schX={0}
        schY={-6}
      />
    </schematicsheet>
  )
}
