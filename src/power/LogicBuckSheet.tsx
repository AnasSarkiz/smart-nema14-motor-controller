import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { CC0603KRX7R9BB104 } from "../../imports/C14663"
import { CL31A106KBHNNNE } from "../../imports/C13585"
import { CL21A226MAQNNNE } from "../../imports/C45783"
import { SRN6028C_3R9M } from "../../imports/SRN6028C_3R9M"
import { AP63203WU_7 } from "../../imports/C780769"

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
        fontSize={0.22}
        text="AP63203 fixed 3.3 V; input requires upstream inrush and reverse-current protection"
        schX={0}
        schY={7}
      />
      <AP63203WU_7
        name="U5"
        {...previewPlacement("U5", mechanicalPreview)}
        schX={-4}
        schY={0}
        connections={{
          VIN: "net.VBUS_INRUSH_OUT",
          EN: "net.VBUS_INRUSH_OUT",
          GND: "net.GND",
          FB: "net.V3V3",
          SW: "net.BUCK_SW",
          BST: "net.BUCK_BST",
        }}
      />
      <CL31A106KBHNNNE
        name="C8"
        {...previewPlacement("C8", mechanicalPreview)}
        schX={-8}
        schY={4}
        schRotation={270}
        connections={{ pin1: "net.VBUS_INRUSH_OUT", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C9"
        {...previewPlacement("C9", mechanicalPreview)}
        schX={-4}
        schY={4}
        schRotation={270}
        connections={{ pin1: "net.VBUS_INRUSH_OUT", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C10"
        {...previewPlacement("C10", mechanicalPreview)}
        schX={1}
        schY={4}
        connections={{ pin1: "net.BUCK_BST", pin2: "net.BUCK_SW" }}
      />
      <SRN6028C_3R9M
        name="L1"
        {...previewPlacement("L1", mechanicalPreview)}
        schX={3}
        schY={0}
        connections={{ pin1: "net.BUCK_SW", pin2: "net.V3V3" }}
      />
      <CL21A226MAQNNNE
        name="C11"
        {...previewPlacement("C11", mechanicalPreview)}
        schX={6}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL21A226MAQNNNE
        name="C12"
        {...previewPlacement("C12", mechanicalPreview)}
        schX={9}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <schematictext
        fontSize={0.22}
        text="C8/C9: 50 V; C10: 100 nF / 50 V bootstrap; C11/C12: 22 uF / 25 V nominal each"
        schX={0}
        schY={-6}
      />
      <schematictext
        fontSize={0.22}
        text="0.3 A logic budget proposed; effective capacitance, startup, ripple and thermal tests pending"
        schX={0}
        schY={-7}
      />
      <schematictext
        fontSize={0.22}
        text="DO NOT connect the 10 uF buck input directly to USB-C: protected power path unfinished"
        schX={0}
        schY={-8}
      />
    </schematicsheet>
  )
}
