import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { A_0402WGF1001TCE } from "../../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { CL31A106KBHNNNE } from "../../imports/CL31A106KBHNNNE/CL31A106KBHNNNE"
import { CC0603KRX7R9BB104 } from "../../imports/CC0603KRX7R9BB104/CC0603KRX7R9BB104"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { EEEFPV101XAP } from "../../imports/EEEFPV101XAP/EEEFPV101XAP"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { CL05B223KB5VPNC } from "../../imports/CL05B223KB5VPNC/CL05B223KB5VPNC"
import { RT1206BRD071RL } from "../../imports/RT1206BRD071RL/RT1206BRD071RL"
import { CL21A475KBQNNNE } from "../../imports/CL21A475KBQNNNE/CL21A475KBQNNNE"
import { TMC2209_LA } from "../../imports/TMC2209_LA/TMC2209_LA"

export function MotorDriverSheet({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="MotorDriver"
      displayName="TMC2209 motor stage - DRAFT"
      sheetSize="A4"
      sheetIndex={5}
    >
      <schematictext
        fontSize={0.18}
        text={
          "VM from TPS26600; motor connector fitted. Regenerative energy qualification pending; ENN high during 5 V\nbootstrap."
        }
        schX={-6.5}
        schY={8.7}
      />
      <TMC2209_LA
        name="U2"
        {...previewPlacement("U2", mechanicalPreview)}
        schX={-10.4}
        schY={0}
        schWidth={2.53}
        schPinArrangement={{
          leftSide: [2, 16, 19, 14, 11, 12, 7, 9, 10, 13, 20, 3, 18, 25, 29],
          rightSide: [15, 17, 8, 6, 4, 5, 22, 28, 24, 21, 26, 1, 23, 27],
        }}
        noConnect={["INDEX"]}
        connections={{
          OB2: "net.MOTOR_B2",
          OB1: "net.MOTOR_B1",
          OA2: "net.MOTOR_A2",
          OA1: "net.MOTOR_A1",
          ENN: "net.TMC_ENABLE_N",
          GND1: "net.GND",
          GND2: "net.GND",
          EP: "net.GND",
          _NEG: "net.GND",
          CPO: "net.TMC_CPO",
          CPI: "net.TMC_CPI",
          VCP: "net.TMC_VCP",
          "5VOUT": "net.TMC_5VOUT",
          SPREAD: "net.GND",
          MS1_AD0: "net.GND",
          MS2_AD1: "net.GND",
          CLK: "net.GND",
          STDBY: "net.GND",
          DIAG: "net.TMC_DIAG",
          PDN_UART: "net.TMC_UART_RX",
          VCC_IO: "net.V3V3",
          STEP: "net.TMC_STEP",
          DIR: "net.TMC_DIR",
          VREF: "net.TMC_VREF",
          VS1: "net.VM",
          VS2: "net.VM",
          BRA: "net.TMC_SENSE_A",
          BRB: "net.TMC_SENSE_B",
        }}
      />
      <CL05B223KB5VPNC
        name="C13"
        {...previewPlacement("C13", mechanicalPreview)}
        schX={-6.5}
        schY={4.32}
        connections={{ pin1: "net.TMC_CPO", pin2: "net.TMC_CPI" }}
      />
      <CC0603KRX7R9BB104
        name="C14"
        {...previewPlacement("C14", mechanicalPreview)}
        schX={-3.25}
        schY={4.32}
        schRotation={270}
        connections={{ pin1: "net.TMC_VCP", pin2: "net.VM" }}
      />
      <CL21A475KBQNNNE
        name="C15"
        {...previewPlacement("C15", mechanicalPreview)}
        schX={-13.65}
        schY={-3.6}
        schRotation={270}
        connections={{ pin1: "net.TMC_5VOUT", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C16"
        {...previewPlacement("C16", mechanicalPreview)}
        schX={-6.5}
        schY={2.16}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C17"
        {...previewPlacement("C17", mechanicalPreview)}
        schX={-3.9}
        schY={2.16}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <CL31A106KBHNNNE
        name="C18"
        {...previewPlacement("C18", mechanicalPreview)}
        schX={-1.95}
        schY={2.16}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <EEEFPV101XAP
        name="C19"
        {...previewPlacement("C19", mechanicalPreview)}
        schX={-3.9}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <EEEFPV101XAP
        name="C20"
        {...previewPlacement("C20", mechanicalPreview)}
        schX={-1.95}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <RT1206BRD071RL
        name="R5"
        {...previewPlacement("R5", mechanicalPreview)}
        schX={-6.5}
        schY={-2.16}
        schRotation={270}
        connections={{ pin1: "net.TMC_SENSE_A", pin2: "net.GND" }}
      />
      <RT1206BRD071RL
        name="R6"
        {...previewPlacement("R6", mechanicalPreview)}
        schX={-3.9}
        schY={-2.16}
        schRotation={270}
        connections={{ pin1: "net.TMC_SENSE_B", pin2: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R4"
        {...previewPlacement("R4", mechanicalPreview)}
        schX={-1.3}
        schY={-2.16}
        schRotation={270}
        connections={{ pin1: "net.TMC_UART_TX", pin2: "net.TMC_UART_RX" }}
      />
      <A_0402WGF1002TCE
        name="R7"
        {...previewPlacement("R7", mechanicalPreview)}
        schX={-6.5}
        schY={-4.32}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.TMC_ENABLE_N" }}
      />
      <A_0402WGF1002TCE
        name="R8"
        {...previewPlacement("R8", mechanicalPreview)}
        schX={-3.9}
        schY={-4.32}
        schRotation={270}
        connections={{ pin1: "net.TMC_STEP", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R9"
        {...previewPlacement("R9", mechanicalPreview)}
        schX={-1.3}
        schY={-4.32}
        schRotation={270}
        connections={{ pin1: "net.TMC_DIR", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R10"
        {...previewPlacement("R10", mechanicalPreview)}
        schX={-13.65}
        schY={3.6}
        schRotation={270}
        connections={{ pin1: "net.TMC_5VOUT", pin2: "net.TMC_VREF" }}
      />
      <A_0402WGF1002TCE
        name="R11"
        {...previewPlacement("R11", mechanicalPreview)}
        schX={-13.65}
        schY={1.44}
        schRotation={270}
        connections={{ pin1: "net.TMC_VREF", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C21"
        {...previewPlacement("C21", mechanicalPreview)}
        schX={-13.65}
        schY={-1.44}
        schRotation={270}
        connections={{ pin1: "net.TMC_VREF", pin2: "net.GND" }}
      />
      <schematictext
        fontSize={0.18}
        text={
          "1 ohm / 0.25 W precision sense pair: about 0.32 A peak at full scale; 10k/10k VREF avoids low-reference\noperation."
        }
        schX={-6.5}
        schY={-9.26}
      />
      <schematictext
        fontSize={0.18}
        text={
          "200 uF / 35 V bulk nominal; capacitor ripple, polarity, startup and thermal qualification pending"
        }
        schX={-6.5}
        schY={-9.7}
      />
      <ComponentNotes sheet="MotorDriver" />
    </schematicsheet>
  )
}
