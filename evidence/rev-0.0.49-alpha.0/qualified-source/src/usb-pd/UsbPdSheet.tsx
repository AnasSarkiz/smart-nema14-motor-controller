import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { StandardUsbCConnector } from "./StandardUsbCConnector"
import { STUSB4500QTR } from "../../imports/STUSB4500QTR/STUSB4500QTR"
import { STL8P4LLF6 } from "../../imports/STL8P4LLF6/STL8P4LLF6"
import { TPD2EUSB30DRTR } from "../../imports/TPD2EUSB30DRTR/TPD2EUSB30DRTR"
import { ESDA25P35_1U1M } from "../../imports/ESDA25P35_1U1M/ESDA25P35_1U1M"
import { UMK107BBJ225KA_T } from "../../imports/UMK107BBJ225KA_T/UMK107BBJ225KA_T"
import { CC0603KRX7R9BB104 } from "../../imports/CC0603KRX7R9BB104/CC0603KRX7R9BB104"
import { CL10A105KB8NNNC } from "../../imports/CL10A105KB8NNNC/CL10A105KB8NNNC"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { RT0402BRD07100KL } from "../../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { A_0402WGF1001TCE } from "../../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { A_0402WGF2202TCE } from "../../imports/A_0402WGF2202TCE/A_0402WGF2202TCE"
import { A_0402WGF2203TCE } from "../../imports/A_0402WGF2203TCE/A_0402WGF2203TCE"
import { A_0402WGF4700TCE } from "../../imports/A_0402WGF4700TCE/A_0402WGF4700TCE"
import { ERJ_P08F1001V } from "../../imports/ERJ_P08F1001V/ERJ_P08F1001V"

/** ST DS12499 Rev 8: autonomous sink, dead-battery Rd and CC-only PD signaling. */
export function UsbPdSheet({ mechanicalPreview = false }: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="UsbPd"
      displayName="Autonomous USB-PD sink and protected power path"
      sheetSize="A4"
      sheetIndex={6}
    >
      <schematictext
        schX={-6.5}
        schY={8.7}
        fontSize={0.22}
        text="STUSB4500 negotiates USB-PD on CC1/CC2, independently of RP2040 firmware. D+/D- remain USB data only."
      />
      <StandardUsbCConnector
        name="J_USB"
        {...previewPlacement("J_USB", mechanicalPreview)}
        schX={-13}
        schY={1.44}
        cadModel={{
          stepUrl: "./references/usb4110-external-model/usb4110-gf-a.stp",
          modelOriginPosition: { x: 0, y: 0, z: -4.89 },
          rotationOffset: { x: 90, y: 0, z: 0 },
          modelUnitToMmScale: 1,
          modelBoardNormalDirection: "z+",
        }}
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
      <STUSB4500QTR
        name="U3"
        {...previewPlacement("U3", mechanicalPreview)}
        schX={-7.5}
        schY={0}
        schWidth={2.5}
        noConnect={["NC", "ATTACH", "GPIO", "A_B_SIDE", "POWER_OK2"]}
        connections={{
          CC1DB: "net.PD_CC1_CONN",
          CC1: "net.PD_CC1_CONN",
          CC2: "net.PD_CC2_CONN",
          CC2DB: "net.PD_CC2_CONN",
          RESET: "net.PD_RESET",
          SCL: "net.I2C_SCL",
          SDA: "net.I2C_SDA",
          DISCH: "net.PD_DISCH",
          GND: "net.GND",
          ADDR0: "net.GND",
          ADDR1: "net.GND",
          POWER_OK3: "net.PD_POWER_OK3",
          VBUS_EN_SNK: "net.PD_LOAD_ENABLE_N",
          VBUS_VS_DISCH: "net.PD_VBUS_SENSE",
          ALERT: "net.PD_ALERT_N",
          VREG_1V2: "net.PD_VREG_1V2",
          VSYS: "net.GND",
          VREG_2V7: "net.PD_VREG_2V7",
          VDD: "net.PD_VDD",
          EP: "net.GND",
        }}
      />
      <STL8P4LLF6
        name="Q_PD_IN"
        {...previewPlacement("Q_PD_IN", mechanicalPreview)}
        schX={-3.9}
        schY={6.2}
        connections={{
          S1: "net.PD_FET_SOURCE",
          S2: "net.PD_FET_SOURCE",
          S3: "net.PD_FET_SOURCE",
          G: "net.PD_GATE",
          D1: "net.VBUS_CONN",
          D2: "net.VBUS_CONN",
          D3: "net.VBUS_CONN",
          D4: "net.VBUS_CONN",
          D5: "net.VBUS_CONN",
        }}
      />
      <STL8P4LLF6
        name="Q_PD_OUT"
        {...previewPlacement("Q_PD_OUT", mechanicalPreview)}
        schX={0.5}
        schY={6.2}
        connections={{
          S1: "net.PD_FET_SOURCE",
          S2: "net.PD_FET_SOURCE",
          S3: "net.PD_FET_SOURCE",
          G: "net.PD_GATE",
          D1: "net.VBUS_PROTECTED",
          D2: "net.VBUS_PROTECTED",
          D3: "net.VBUS_PROTECTED",
          D4: "net.VBUS_PROTECTED",
          D5: "net.VBUS_PROTECTED",
        }}
      />
      <RT0402BRD07100KL
        name="R13"
        {...previewPlacement("R13", mechanicalPreview)}
        schX={-3.1}
        schY={4.1}
        schRotation={270}
        connections={{ pin1: "net.PD_FET_SOURCE", pin2: "net.PD_GATE" }}
      />
      <A_0402WGF2202TCE
        name="R_PD_GATE"
        {...previewPlacement("R_PD_GATE", mechanicalPreview)}
        schX={0.5}
        schY={4.1}
        schRotation={270}
        connections={{ pin1: "net.PD_GATE", pin2: "net.PD_LOAD_ENABLE_N" }}
      />
      <A_0402WGF4700TCE
        name="R14"
        {...previewPlacement("R14", mechanicalPreview)}
        schX={-7.5}
        schY={6.2}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.PD_VDD" }}
      />
      <UMK107BBJ225KA_T
        name="C_PD_VDD"
        {...previewPlacement("C_PD_VDD", mechanicalPreview)}
        schX={-7.5}
        schY={4.1}
        schRotation={270}
        connections={{ pin1: "net.PD_VDD", pin2: "net.GND" }}
      />
      <CL10A105KB8NNNC
        name="C_PD_1V2"
        {...previewPlacement("C_PD_1V2", mechanicalPreview)}
        schX={-3.5}
        schY={1}
        schRotation={270}
        connections={{ pin1: "net.PD_VREG_1V2", pin2: "net.GND" }}
      />
      <CL10A105KB8NNNC
        name="C_PD_2V7"
        {...previewPlacement("C_PD_2V7", mechanicalPreview)}
        schX={0.5}
        schY={1}
        schRotation={270}
        connections={{ pin1: "net.PD_VREG_2V7", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R_PD_RESET"
        {...previewPlacement("R_PD_RESET", mechanicalPreview)}
        schX={-3.5}
        schY={-1.2}
        schRotation={270}
        connections={{ pin1: "net.PD_RESET", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R12"
        {...previewPlacement("R12", mechanicalPreview)}
        schX={0.5}
        schY={-1.2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.PD_ALERT_N" }}
      />
      <A_0402WGF1002TCE
        name="R_PD_OK"
        {...previewPlacement("R_PD_OK", mechanicalPreview)}
        schX={2.8}
        schY={1}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.PD_POWER_OK3" }}
      />
      <ERJ_P08F1001V
        name="R_PD_SENSE"
        {...previewPlacement("R_PD_SENSE", mechanicalPreview)}
        schX={-11}
        schY={-5.5}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.PD_VBUS_SENSE" }}
      />
      <ERJ_P08F1001V
        name="R_PD_DISCH1"
        {...previewPlacement("R_PD_DISCH1", mechanicalPreview)}
        schX={-7.5}
        schY={-5.5}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.PD_DISCH" }}
      />
      <ERJ_P08F1001V
        name="R_PD_DISCH2"
        {...previewPlacement("R_PD_DISCH2", mechanicalPreview)}
        schX={-7.5}
        schY={-7}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.PD_DISCH" }}
      />
      <TPD2EUSB30DRTR
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
        schX={-4.5}
        schY={-3.3}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      >
        <schematictext
          text="{NAME}"
          schX={-0.7}
          schY={0.65}
          fontSize={0.2}
          anchor="left"
        />
      </ESDA25P35_1U1M>
      <UMK107BBJ225KA_T
        name="C25"
        {...previewPlacement("C25", mechanicalPreview)}
        schX={0}
        schY={-3.3}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C26"
        {...previewPlacement("C26", mechanicalPreview)}
        schX={1.7}
        schY={-3.3}
        schRotation={270}
        connections={{ pin1: "net.VBUS_CONN", pin2: "net.GND" }}
      />
      <A_0402WGF2203TCE
        name="R16"
        {...previewPlacement("R16", mechanicalPreview)}
        schX={-2.5}
        schY={-5.5}
        schRotation={270}
        connections={{ pin1: "net.VBUS_PROTECTED", pin2: "net.VBUS_DIV" }}
      />
      <A_0402WGF1002TCE
        name="R17"
        {...previewPlacement("R17", mechanicalPreview)}
        schX={0}
        schY={-5.5}
        schRotation={270}
        connections={{ pin1: "net.VBUS_DIV", pin2: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R18"
        {...previewPlacement("R18", mechanicalPreview)}
        schX={1.7}
        schY={-5.5}
        schRotation={270}
        connections={{ pin1: "net.VBUS_DIV", pin2: "net.VBUS_ADC_PRE_GUARD" }}
      />
      <CL05B104KO5NNNC
        name="C27"
        {...previewPlacement("C27", mechanicalPreview)}
        schX={3.5}
        schY={-7}
        schRotation={270}
        connections={{ pin1: "net.VBUS_ADC", pin2: "net.GND" }}
      />
      <schematictext
        schX={-6.5}
        schY={-8.9}
        fontSize={0.22}
        text="Factory PDOs: 5 V/1.5 A, 15 V/1.5 A, 20 V/1 A. Read the actual RDO before high-current mode; reset leaves motor disabled."
      />
      <schematictext
        schX={-6.5}
        schY={-9.6}
        fontSize={0.22}
        text="U3 I2C address 0x28. Gate divider defaults off. Discharge, transient/ESD, firmware and physical PD testing remain qualification gates."
      />
      <ComponentNotes sheet="UsbPd" />
    </schematicsheet>
  )
}
