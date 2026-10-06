import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { A_0402WGF4701TCE } from "../../imports/A_0402WGF4701TCE/A_0402WGF4701TCE"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { A_0402WGF1000TCE } from "../../imports/A_0402WGF1000TCE/A_0402WGF1000TCE"
import { RT0402BRD07100KL } from "../../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { CL10A105KB8NNNC } from "../../imports/CL10A105KB8NNNC/CL10A105KB8NNNC"
import { TMP112AIDRLR } from "../../imports/TMP112AIDRLR/TMP112AIDRLR"
import { DMG1012T_7 } from "../../imports/DMG1012T_7/DMG1012T_7"
import { MLT_5020 } from "../../imports/MLT_5020/MLT_5020"
import { A_1N4148WS } from "../../imports/A_1N4148WS/A_1N4148WS"

export function I2cSheet({ mechanicalPreview = false }: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="I2C"
      displayName="Temperature sensor, I2C pull-ups and buzzer"
      sheetSize="A4"
      sheetIndex={2}
    >
      <schematictext
        fontSize={0.22}
        schX={-6.5}
        schY={8.7}
        text="One shared 3.3 V I2C bus: TMP112 at 0x48 and STUSB4500 at 0x28. Pull-ups and sensor are on this sheet."
      />
      <TMP112AIDRLR
        name="U9"
        {...previewPlacement("U9", mechanicalPreview)}
        schX={-11}
        schY={3.5}
        connections={{
          SCL: "net.I2C_SCL",
          SDA: "net.I2C_SDA",
          V_POS: "net.V3V3",
          GND: "net.GND",
          ADD0: "net.GND",
          ALERT: "net.TEMP_ALERT_N",
        }}
      />
      <A_0402WGF4701TCE
        name="R2"
        {...previewPlacement("R2", mechanicalPreview)}
        schX={-7}
        schY={5.5}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.I2C_SCL" }}
      />
      <A_0402WGF4701TCE
        name="R3"
        {...previewPlacement("R3", mechanicalPreview)}
        schX={-4.5}
        schY={5.5}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.I2C_SDA" }}
      />
      <A_0402WGF1002TCE
        name="R33"
        {...previewPlacement("R33", mechanicalPreview)}
        schX={-2}
        schY={5.5}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.TEMP_ALERT_N" }}
      />
      <CL05B104KO5NNNC
        name="C32"
        {...previewPlacement("C32", mechanicalPreview)}
        schX={-2}
        schY={3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <MLT_5020
        name="BZ1"
        {...previewPlacement("BZ1", mechanicalPreview)}
        schX={-10}
        schY={-2}
        noConnect={["NC"]}
        connections={{ pin1: "net.V3V3", pin2: "net.BUZZER_NEG" }}
      />
      <A_1N4148WS
        name="D_BUZZ"
        {...previewPlacement("D_BUZZ", mechanicalPreview)}
        schX={-7}
        schY={-2}
        schRotation={270}
        connections={{ cathode: "net.V3V3", anode: "net.BUZZER_NEG" }}
      />
      <DMG1012T_7
        name="Q_BUZZ"
        {...previewPlacement("Q_BUZZ", mechanicalPreview)}
        schX={-7}
        schY={-5}
        connections={{
          G: "net.BUZZER_GATE",
          S: "net.GND",
          D: "net.BUZZER_NEG",
        }}
      >
        <schematictext
          text="{NAME}"
          schX={-1.4}
          schY={0.85}
          fontSize={0.2}
          anchor="left"
        />
      </DMG1012T_7>
      <A_0402WGF1000TCE
        name="R_BUZZ_GATE"
        {...previewPlacement("R_BUZZ_GATE", mechanicalPreview)}
        schX={-11}
        schY={-5}
        connections={{ pin1: "net.BUZZER_PWM", pin2: "net.BUZZER_GATE" }}
      />
      <RT0402BRD07100KL
        name="R_BUZZ_OFF"
        {...previewPlacement("R_BUZZ_OFF", mechanicalPreview)}
        schX={-3}
        schY={-5}
        schRotation={270}
        connections={{ pin1: "net.BUZZER_GATE", pin2: "net.GND" }}
      />
      <CL10A105KB8NNNC
        name="C_BUZZ"
        {...previewPlacement("C_BUZZ", mechanicalPreview)}
        schX={-0.5}
        schY={3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <schematictext
        fontSize={0.22}
        schX={-6.5}
        schY={-8.7}
        text="BZ1 is externally driven: GPIO25 PWM through Q_BUZZ, with flyback clamp and default-off pull-down. Driver/mechanical qualification pending."
      />
      <schematictext
        fontSize={0.22}
        schX={-6.5}
        schY={-9.4}
        text="TMP112 measures board temperature, not motor position. The single-shaft motor remains open loop; U4/C6 encoder stays removed."
      />
      <ComponentNotes sheet="I2C" />
    </schematicsheet>
  )
}
