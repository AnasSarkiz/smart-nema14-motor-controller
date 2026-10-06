import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { A_0402WGF4701TCE } from "../../imports/A_0402WGF4701TCE/A_0402WGF4701TCE"

export function I2cSheet({ mechanicalPreview = false }: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="I2C"
      displayName="Temperature sensor I2C bus - DRAFT"
      sheetSize="A4"
      sheetIndex={2}
    >
      <schematictext
        fontSize={0.18}
        text="3.3 V I2C pull-ups for U1 and the U9 TMP112 temperature sensor (address 0x48)."
        schX={-6.5}
        schY={8.7}
      />
      <A_0402WGF4701TCE
        name="R2"
        {...previewPlacement("R2", mechanicalPreview)}
        schX={-3.25}
        schY={2.88}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.I2C_SCL" }}
      />
      <A_0402WGF4701TCE
        name="R3"
        {...previewPlacement("R3", mechanicalPreview)}
        schX={0}
        schY={2.88}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.I2C_SDA" }}
      />
      <schematictext
        fontSize={0.18}
        text="AS5600 encoder and its C6 bypass removed. Motor position feedback is unavailable; open-loop control."
        schX={-6.5}
        schY={-9.7}
      />
      <ComponentNotes sheet="I2C" />
    </schematicsheet>
  )
}
