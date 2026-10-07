import { ComponentNotes } from "../schematic/ComponentNotes"
import { StandardUsbCConnector } from "./StandardUsbCConnector"
import { A_0402WGF5101TCE } from "../../imports/A_0402WGF5101TCE/A_0402WGF5101TCE"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { RT0402BRD07100KL } from "../../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { DMG1012T_7 } from "../../imports/DMG1012T_7/DMG1012T_7"
import { TPD2EUSB30DRTR } from "../../imports/TPD2EUSB30DRTR/TPD2EUSB30DRTR"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"

/** Self-powered USB device. Computer VBUS has no connection to either power rail. */
export function UsbDataSheet({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="UsbData"
      displayName="Computer USB-C data and isolated VBUS detection"
      sheetSize="A4"
      sheetIndex={10}
    >
      <schematictext
        schX={-6.5}
        schY={8.7}
        fontSize={0.22}
        text="DATA port: USB 2.0 device, separate 5.1k Rd on each CC. PD POWER must supply the controller; computer 5V does not power logic or the motor."
      />
      <StandardUsbCConnector
        name="J_DATA"
        {...previewPlacement("J_DATA", mechanicalPreview)}
        schX={-13}
        schY={1.5}
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
          VBUS1: "net.USB_DATA_VBUS",
          VBUS2: "net.USB_DATA_VBUS",
          CC1: "net.USB_DATA_CC1",
          CC2: "net.USB_DATA_CC2",
          DP1: "net.USB_DP",
          DP2: "net.USB_DP",
          DN1: "net.USB_DM",
          DN2: "net.USB_DM",
        }}
      />
      <A_0402WGF5101TCE
        name="R_DATA_CC1"
        {...previewPlacement("R_DATA_CC1", mechanicalPreview)}
        schX={-8.2}
        schY={4.5}
        schRotation={270}
        connections={{ pin1: "net.USB_DATA_CC1", pin2: "net.GND" }}
      />
      <A_0402WGF5101TCE
        name="R_DATA_CC2"
        {...previewPlacement("R_DATA_CC2", mechanicalPreview)}
        schX={-5.5}
        schY={4.5}
        schRotation={270}
        connections={{ pin1: "net.USB_DATA_CC2", pin2: "net.GND" }}
      />
      <TPD2EUSB30DRTR
        name="D_USB"
        {...previewPlacement("D_USB", mechanicalPreview)}
        schX={-8}
        schY={1}
        connections={{
          D_POS: "net.USB_DP",
          D_NEG: "net.USB_DM",
          GND: "net.GND",
        }}
      />
      <A_0402WGF1002TCE
        name="R_DATA_SENSE_TOP"
        {...previewPlacement("R_DATA_SENSE_TOP", mechanicalPreview)}
        schX={-11}
        schY={5.5}
        schRotation={270}
        connections={{
          pin1: "net.USB_DATA_VBUS",
          pin2: "net.USB_DATA_SENSE_GATE",
        }}
      />
      <RT0402BRD07100KL
        name="R_DATA_SENSE_OFF"
        {...previewPlacement("R_DATA_SENSE_OFF", mechanicalPreview)}
        schX={0}
        schY={2}
        schRotation={270}
        connections={{ pin1: "net.USB_DATA_SENSE_GATE", pin2: "net.GND" }}
      />
      <DMG1012T_7
        name="Q_DATA_PRESENT"
        {...previewPlacement("Q_DATA_PRESENT", mechanicalPreview)}
        schX={-3}
        schY={0}
        connections={{
          G: "net.USB_DATA_SENSE_GATE",
          S: "net.GND",
          D: "net.USB_DATA_ABSENT_N",
        }}
      />
      <A_0402WGF1002TCE
        name="R_DATA_PRESENT"
        {...previewPlacement("R_DATA_PRESENT", mechanicalPreview)}
        schX={0}
        schY={-1}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.USB_DATA_ABSENT_N" }}
      />
      <schematictext
        schX={-6.5}
        schY={-8.8}
        fontSize={0.22}
        text="Q_DATA_PRESENT insulates PC VBUS from RP2040 GPIO29 and V3V3. GPIO low means VBUS present. Firmware enables USB pull-up only with computer VBUS present; advertise self-powered."
      />
      <schematictext
        schX={-6.5}
        schY={-9.6}
        fontSize={0.22}
        text="No diode OR or power link to PD VBUS/VM. 10k/100k resistors limit VBUS sensing to about45uA at5V; the MOSFET gate divider stays below its gate rating."
      />
      <ComponentNotes sheet="UsbData" />
    </schematicsheet>
  )
}
