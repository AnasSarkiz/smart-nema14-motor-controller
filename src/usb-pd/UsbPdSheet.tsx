import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { TYPE_C_31_M_12 } from "../../imports/TYPE_C_31_M_12"
import { TCPP01_M12 } from "../../imports/TCPP01_M12/TCPP01_M12"
import { STL11N3LLH6 } from "../../imports/STL11N3LLH6"
import { TPD2EUSB30ADRTR } from "../../imports/TPD2EUSB30ADRTR"
import { ESDA25P35_1U1M } from "../../imports/ESDA25P35_1U1M"
import { TCC0402COG331J500AT } from "../../imports/TCC0402COG331J500AT"
import { RT0402BRD07100KL } from "../../imports/RT0402BRD07100KL"
import { RT0402BRD076K04L } from "../../imports/RT0402BRD076K04L"
import { UMK107BBJ225KA_T } from "../../imports/UMK107BBJ225KA_T"
import { CC0603KRX7R9BB104 } from "../../imports/C14663"
import { CL05B104KO5NNNC } from "../../imports/C1525"
import { A_0402WGF1002TCE } from "../../imports/C25744"
import { A_0402WGF1001TCE } from "../../imports/C11702"
import { A_0402WGF2203TCE } from "../../imports/C25767"

export function UsbPdSheet({ mechanicalPreview = false }: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="UsbPd"
      displayName="USB-C / UCPD protection frontend - DRAFT"
      sheetSize="A4"
      sheetIndex={6}
    >
      <schematictext
        schX={0}
        schY={8.5}
        fontSize={0.22}
        text="DRAFT: protected output NOT yet connected to buck or motor; inrush/reverse blocking pending"
      />
      <TYPE_C_31_M_12
        name="J_USB"
        {...previewPlacement("J_USB", mechanicalPreview)}
        schX={-10}
        schY={2}
        noConnect={["SBU1", "SBU2"]}
        connections={{
          EH1: "net.GND",
          EH2: "net.GND",
          EH3: "net.GND",
          EH4: "net.GND",
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
        schX={-3}
        schY={2}
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
        schX={4}
        schY={4.1}
        fontSize={0.2}
        text="Q_PD - STL11N3LLH6"
      />
      <schematictext
        schX={7}
        schY={5.4}
        fontSize={0.2}
        text="D_VBUS - ESDA25P35"
      />
      <schematictext
        schX={-10}
        schY={-5.5}
        fontSize={0.2}
        text="D_USB - TPD2EUSB30A"
      />
      <STL11N3LLH6
        name="Q_PD"
        {...previewPlacement("Q_PD", mechanicalPreview)}
        schX={4}
        schY={5}
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
        schX={-10}
        schY={-7}
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
        schX={7}
        schY={6}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      />
      <UMK107BBJ225KA_T
        name="C25"
        {...previewPlacement("C25", mechanicalPreview)}
        schX={10}
        schY={6}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C26"
        {...previewPlacement("C26", mechanicalPreview)}
        schX={13}
        schY={6}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C22"
        {...previewPlacement("C22", mechanicalPreview)}
        schX={1}
        schY={-2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <TCC0402COG331J500AT
        name="C23"
        {...previewPlacement("C23", mechanicalPreview)}
        schX={4}
        schY={-2}
        schRotation={270}
        connections={{ pin1: "net.PD_CC1_CONN", pin2: "net.GND" }}
      />
      <TCC0402COG331J500AT
        name="C24"
        {...previewPlacement("C24", mechanicalPreview)}
        schX={7}
        schY={-2}
        schRotation={270}
        connections={{ pin1: "net.PD_CC2_CONN", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R12"
        {...previewPlacement("R12", mechanicalPreview)}
        schX={10}
        schY={-2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.PD_FLT" }}
      />
      <RT0402BRD07100KL
        name="R13"
        {...previewPlacement("R13", mechanicalPreview)}
        schX={1}
        schY={-6}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.PD_OVP_SERIES" }}
      />
      <A_0402WGF1001TCE
        name="R14"
        {...previewPlacement("R14", mechanicalPreview)}
        schX={4}
        schY={-6}
        connections={{ pin1: "net.PD_OVP_SERIES", pin2: "net.PD_OVP" }}
      />
      <RT0402BRD076K04L
        name="R15"
        {...previewPlacement("R15", mechanicalPreview)}
        schX={7}
        schY={-6}
        schRotation={270}
        connections={{ pin1: "net.PD_OVP", pin2: "net.GND" }}
      />
      <A_0402WGF2203TCE
        name="R16"
        {...previewPlacement("R16", mechanicalPreview)}
        schX={-5}
        schY={-8.5}
        schRotation={270}
        connections={{ pin1: "net.VBUS_PROTECTED", pin2: "net.VBUS_DIV" }}
      />
      <A_0402WGF1002TCE
        name="R17"
        {...previewPlacement("R17", mechanicalPreview)}
        schX={-2}
        schY={-8.5}
        schRotation={270}
        connections={{ pin1: "net.VBUS_DIV", pin2: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R18"
        {...previewPlacement("R18", mechanicalPreview)}
        schRotation={270}
        schX={2}
        schY={-8.5}
        connections={{ pin1: "net.VBUS_DIV", pin2: "net.VBUS_ADC" }}
      />
      <CL05B104KO5NNNC
        name="C27"
        {...previewPlacement("C27", mechanicalPreview)}
        schX={6}
        schY={-8.5}
        schRotation={270}
        connections={{ pin1: "net.VBUS_ADC", pin2: "net.GND" }}
      />
      <schematictext
        schX={0}
        schY={-11}
        fontSize={0.2}
        text="Initialize UCPD sink Rd BEFORE raising PB12/DB. PA9/PA10 grounded; motor ENN remains pulled high."
      />
      <schematictext
        schX={0}
        schY={-11.5}
        fontSize={0.2}
        text="OVP static screen: 22.51 V nominal; narrow transient margin still BLOCKS protection qualification."
      />
      <schematictext
        schX={0}
        schY={-12}
        fontSize={0.2}
        text="D_VBUS is input surge protection, NOT a motor brake. USB data: direct FS PHY, 90-ohm routing pending."
      />
    </schematicsheet>
  )
}
