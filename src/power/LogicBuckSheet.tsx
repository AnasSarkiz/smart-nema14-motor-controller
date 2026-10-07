import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { CC0603KRX7R9BB104 } from "../../imports/CC0603KRX7R9BB104/CC0603KRX7R9BB104"
import { CL31A106KBHNNNE } from "../../imports/CL31A106KBHNNNE/CL31A106KBHNNNE"
import { CL21A226MAQNNNE } from "../../imports/CL21A226MAQNNNE/CL21A226MAQNNNE"
import { SRN6028C_3R9M } from "../../imports/SRN6028C_3R9M/SRN6028C_3R9M"
import { AP63203WU_7 } from "../../imports/AP63203WU_7/AP63203WU_7"

export function LogicBuckSheet({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="LogicPower"
      displayName="3.3 V logic regulator - DRAFT"
      sheetSize="A4"
      sheetIndex={4}
    >
      <schematictext
        fontSize={0.18}
        text={
          "AP63203 fixed 3.3 V; input requires upstream inrush and reverse-current protection"
        }
        schX={-6.5}
        schY={8.7}
      />
      <AP63203WU_7
        name="U5"
        {...previewPlacement("U5", mechanicalPreview)}
        schX={-9.1}
        schY={0}
        connections={{
          VIN: "net.VM",
          EN: "net.VM",
          GND: "net.GND",
          FB: "net.V3V3",
          SW: "net.BUCK_SW",
          BST: "net.BUCK_BST",
        }}
      />
      <CL31A106KBHNNNE
        name="C8"
        {...previewPlacement("C8", mechanicalPreview)}
        schX={-11.7}
        schY={2.88}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C9"
        {...previewPlacement("C9", mechanicalPreview)}
        schX={-9.85}
        schY={2.88}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C10"
        {...previewPlacement("C10", mechanicalPreview)}
        schX={-5.85}
        schY={2.88}
        connections={{ pin1: "net.BUCK_BST", pin2: "net.BUCK_SW" }}
      />
      <SRN6028C_3R9M
        name="L1"
        {...previewPlacement("L1", mechanicalPreview)}
        schX={-4.55}
        schY={0}
        connections={{ pin1: "net.BUCK_SW", pin2: "net.V3V3" }}
      />
      <CL21A226MAQNNNE
        name="C11"
        {...previewPlacement("C11", mechanicalPreview)}
        schX={-2.6}
        schY={-2.16}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL21A226MAQNNNE
        name="C12"
        {...previewPlacement("C12", mechanicalPreview)}
        schX={-0.85}
        schY={-2.16}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <schematictext
        fontSize={0.18}
        text={
          "C8/C9: 50 V; C10: 100 nF / 50 V bootstrap; C11/C12: 22 uF / 25 V nominal each"
        }
        schX={-6.5}
        schY={-8.82}
      />
      <schematictext
        fontSize={0.18}
        text={
          "0.5 A logic budget proposed; effective capacitance, startup, ripple and thermal tests pending"
        }
        schX={-6.5}
        schY={-9.26}
      />
      <schematictext
        fontSize={0.18}
        text={
          "Buck and motor bulk capacitors are behind the TPS26600 controlled-slew, reverse-blocking input."
        }
        schX={-6.5}
        schY={-9.7}
      />
      <ComponentNotes sheet="LogicPower" />
    </schematicsheet>
  )
}
