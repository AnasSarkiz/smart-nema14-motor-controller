import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { USB4110_GF_A } from "../../imports/USB4110_GF_A/USB4110_GF_A"
import { TCPP01_M12 } from "../../imports/TCPP01_M12/TCPP01_M12"
import { STL11N3LLH6 } from "../../imports/STL11N3LLH6/STL11N3LLH6"
import { TPD2EUSB30ADRTR } from "../../imports/TPD2EUSB30ADRTR/TPD2EUSB30ADRTR"
import { ESDA25P35_1U1M } from "../../imports/ESDA25P35_1U1M/ESDA25P35_1U1M"
import { TCC0402COG331J500AT } from "../../imports/TCC0402COG331J500AT/TCC0402COG331J500AT"
import { RT0402BRD07100KL } from "../../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { RT0402BRD076K04L } from "../../imports/RT0402BRD076K04L/RT0402BRD076K04L"
import { UMK107BBJ225KA_T } from "../../imports/UMK107BBJ225KA_T/UMK107BBJ225KA_T"
import { CC0603KRX7R9BB104 } from "../../imports/CC0603KRX7R9BB104/CC0603KRX7R9BB104"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { A_0402WGF1001TCE } from "../../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { A_0402WGF2203TCE } from "../../imports/A_0402WGF2203TCE/A_0402WGF2203TCE"

export function UsbPdSheet({ mechanicalPreview = false }: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="UsbPd"
      displayName="USB-C / UCPD protection frontend - DRAFT"
      sheetSize="A4"
      sheetIndex={6}
    >
      <schematictext
        schX={-6.5}
        schY={8.7}
        fontSize={0.18}
        text={
          "TCPP01 protects CC and drives Q_PD; TPS26600 limits inrush and supplies the buck and motor rail."
        }
      />
      <USB4110_GF_A
        name="J_USB"
        {...previewPlacement("J_USB", mechanicalPreview)}
        cadModel={{
          stepUrl: "./references/usb4110-external-model/usb4110-gf-a.stp",
          modelOriginPosition: { x: 0, y: 0, z: -4.89 },
          rotationOffset: { x: 90, y: 0, z: 0 },
          modelUnitToMmScale: 1,
          modelBoardNormalDirection: "z+",
        }}
        schX={-13}
        schY={1.44}
        noConnect={["SBU1", "SBU2"]}
        connections={{
          SHELL1: "net.GND",
          SHELL2: "net.GND",
          SHELL3: "net.GND",
          SHELL4: "net.GND",
          GND1: "net.GND",
          GND2: "net.GND",
          VBUS1: "net.VBUS_CONN",
          VBUS2: "net.VBUS_CONN",
          CC1: "net.PD_CC1_CONN",
          CC2: "net.PD_CC2_CONN",
          DP1: "net.USB_DP",
          DP2: "net.USB_DP",
          DN1: "net.USB_DM",
          DN2: "net.USB_DM",
        }}
      />
      <TCPP01_M12
        name="U3"
        {...previewPlacement("U3", mechanicalPreview)}
        schX={-8.45}
        schY={1.44}
        connections={{
          CC1c: "net.PD_CC1_CONN",
          CC2c: "net.PD_CC2_CONN",
          CC1: "net.PD_CC1_MCU",
          CC2: "net.PD_CC2_MCU",
          SOURCE: "net.VBUS_PROTECTED",
          GATE: "net.PD_GATE",
          IN_GD: "net.VBUS_CONN",
          CTRLVBUS: "net.PD_OVP",
          VCC: "net.V3V3",
          DB: "net.PD_DB",
          FLT: "net.PD_FLT",
          GND: "net.GND",
          EP: "net.GND",
        }}
      />
      <schematictext
        schX={-3.9}
        schY={2.952}
        fontSize={0.2}
        text="Q_PD - STL11N3LLH6"
      />
      <schematictext
        schX={-1.95}
        schY={3.888}
        fontSize={0.2}
        text="D_VBUS - ESDA25P35"
      />
      <schematictext
        schX={-13}
        schY={-3.96}
        fontSize={0.2}
        text="D_USB - TPD2EUSB30A"
      />
      <STL11N3LLH6
        name="Q_PD"
        {...previewPlacement("Q_PD", mechanicalPreview)}
        schX={-3.9}
        schY={3.6}
        connections={{
          S1: "net.VBUS_PROTECTED",
          S2: "net.VBUS_PROTECTED",
          S3: "net.VBUS_PROTECTED",
          G: "net.PD_GATE",
          D1: "net.VBUS_CONN",
          D2: "net.VBUS_CONN",
          D3: "net.VBUS_CONN",
          D4: "net.VBUS_CONN",
          D5: "net.VBUS_CONN",
        }}
      />
      <TPD2EUSB30ADRTR
        name="D_USB"
        {...previewPlacement("D_USB", mechanicalPreview)}
        schX={-13}
        schY={-5.04}
        connections={{
          D_POS: "net.USB_DP",
          D_NEG: "net.USB_DM",
          GND: "net.GND",
        }}
      />
      <ESDA25P35_1U1M
        name="D_VBUS"
        {...previewPlacement("D_VBUS", mechanicalPreview)}
        schRotation={270}
        schX={-1.95}
        schY={4.32}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      />
      <UMK107BBJ225KA_T
        name="C25"
        {...previewPlacement("C25", mechanicalPreview)}
        schX={0}
        schY={4.32}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C26"
        {...previewPlacement("C26", mechanicalPreview)}
        schX={1.95}
        schY={4.32}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C22"
        {...previewPlacement("C22", mechanicalPreview)}
        schX={-5.85}
        schY={-1.44}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <TCC0402COG331J500AT
        name="C23"
        {...previewPlacement("C23", mechanicalPreview)}
        schX={-3.9}
        schY={-1.44}
        schRotation={270}
        connections={{ pin1: "net.PD_CC1_CONN", pin2: "net.GND" }}
      />
      <TCC0402COG331J500AT
        name="C24"
        {...previewPlacement("C24", mechanicalPreview)}
        schX={-1.95}
        schY={-1.44}
        schRotation={270}
        connections={{ pin1: "net.PD_CC2_CONN", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R12"
        {...previewPlacement("R12", mechanicalPreview)}
        schX={0}
        schY={-1.44}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.PD_FLT" }}
      />
      <RT0402BRD07100KL
        name="R13"
        {...previewPlacement("R13", mechanicalPreview)}
        schX={-5.85}
        schY={-4.32}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.PD_OVP_SERIES" }}
      />
      <A_0402WGF1001TCE
        name="R14"
        {...previewPlacement("R14", mechanicalPreview)}
        schX={-3.9}
        schY={-4.32}
        connections={{ pin1: "net.PD_OVP_SERIES", pin2: "net.PD_OVP" }}
      />
      <RT0402BRD076K04L
        name="R15"
        {...previewPlacement("R15", mechanicalPreview)}
        schX={-1.95}
        schY={-4.32}
        schRotation={270}
        connections={{ pin1: "net.PD_OVP", pin2: "net.GND" }}
      />
      <A_0402WGF2203TCE
        name="R16"
        {...previewPlacement("R16", mechanicalPreview)}
        schX={-9.75}
        schY={-6.12}
        schRotation={270}
        connections={{ pin1: "net.VBUS_PROTECTED", pin2: "net.VBUS_DIV" }}
      />
      <A_0402WGF1002TCE
        name="R17"
        {...previewPlacement("R17", mechanicalPreview)}
        schX={-7.8}
        schY={-6.12}
        schRotation={270}
        connections={{ pin1: "net.VBUS_DIV", pin2: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R18"
        {...previewPlacement("R18", mechanicalPreview)}
        schRotation={270}
        schX={-5.2}
        schY={-6.12}
        connections={{ pin1: "net.VBUS_DIV", pin2: "net.VBUS_ADC_PRE_GUARD" }}
      />
      <CL05B104KO5NNNC
        name="C27"
        {...previewPlacement("C27", mechanicalPreview)}
        schX={-2.6}
        schY={-6.12}
        schRotation={270}
        connections={{ pin1: "net.VBUS_ADC", pin2: "net.GND" }}
      />
      <schematictext
        schX={-6.5}
        schY={-8.58}
        fontSize={0.18}
        text={
          "Initialize UCPD sink Rd BEFORE raising PB12/DB. PA9/PA10 grounded; motor ENN remains pulled high."
        }
      />
      <schematictext
        schX={-6.5}
        schY={-9.26}
        fontSize={0.18}
        text={
          "TCPP OVP: 22.51 V nominal. Downstream eFuse OVP: 22.02 V nominal; transient qualification remains\npending."
        }
      />
      <schematictext
        schX={-6.5}
        schY={-9.7}
        fontSize={0.18}
        text={
          "D_VBUS is input surge protection, NOT a motor brake. USB data: direct FS PHY; impedance qualification pending."
        }
      />
      <ComponentNotes sheet="UsbPd" />
    </schematicsheet>
  )
}
