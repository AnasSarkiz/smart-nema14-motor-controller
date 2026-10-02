import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { SN65HVD230DR } from "../../imports/C12084"
import { CL05B104KO5NNNC } from "../../imports/C1525"

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
          RS: "net.GND",
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
      <schematictext
        fontSize={0.22}
        text="RS grounded selects high-speed mode. VREF unused."
        schX={0}
        schY={-5}
      />
      <schematictext
        fontSize={0.22}
        text="DRAFT: external connector, bus ESD and selectable 120 ohm termination still pending."
        schX={0}
        schY={-6}
      />
    </schematicsheet>
  )
}
