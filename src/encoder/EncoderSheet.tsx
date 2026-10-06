import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { AS5600_ASOM } from "../../imports/AS5600_ASOM/AS5600_ASOM"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { A_0402WGF4701TCE } from "../../imports/A_0402WGF4701TCE/A_0402WGF4701TCE"

export function EncoderSheet({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="Encoder"
      displayName="Optional encoder - DRAFT"
      sheetSize="A4"
      sheetIndex={2}
    >
      <schematictext
        fontSize={0.22}
        text="AS5600, 3.3 V, I2C address 0x36 - optional assembly population"
        schX={0}
        schY={6}
      />
      <AS5600_ASOM
        name="U4"
        doNotPlace
        {...previewPlacement("U4", mechanicalPreview)}
        layer="bottom"
        schX={-5}
        schY={0}
        noConnect={["OUT", "PGO"]}
        connections={{
          VDD5V: "net.V3V3",
          VDD3V3: "net.V3V3",
          GND: "net.GND",
          DIR: "net.GND",
          SDA: "net.I2C_SDA",
          SCL: "net.I2C_SCL",
        }}
      />
      <CL05B104KO5NNNC
        name="C6"
        doNotPlace
        {...previewPlacement("C6", mechanicalPreview)}
        layer="bottom"
        schX={6}
        schY={-4}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <A_0402WGF4701TCE
        name="R2"
        {...previewPlacement("R2", mechanicalPreview)}
        schX={5}
        schY={4}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.I2C_SCL" }}
      />
      <A_0402WGF4701TCE
        name="R3"
        {...previewPlacement("R3", mechanicalPreview)}
        schX={10}
        schY={4}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.I2C_SDA" }}
      />
      <schematictext
        fontSize={0.22}
        text="PGO retains internal pull-up; OUT unused. Volatile settings only; OTP programming excluded."
        schX={0}
        schY={-5}
      />
      <schematictext
        fontSize={0.22}
        text="DIR=GND: clockwise viewed per datasheet. Motor-side orientation must be calibrated."
        schX={0}
        schY={-6}
      />
      <schematictext
        fontSize={0.22}
        text="14HM11-0404S has no rear shaft. Open-loop review default: U4/C6 unpopulated; no magnet or feedback qualified."
        schX={0}
        schY={-7}
      />
    </schematicsheet>
  )
}
