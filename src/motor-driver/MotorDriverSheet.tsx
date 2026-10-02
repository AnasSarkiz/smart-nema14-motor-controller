import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"
import { A_0402WGF1001TCE } from "../../imports/C11702"
import { CL31A106KBHNNNE } from "../../imports/C13585"
import { CC0603KRX7R9BB104 } from "../../imports/C14663"
import { CL05B104KO5NNNC } from "../../imports/C1525"
import { EEEFPV101XAP } from "../../imports/C178585"
import { A_0402WGF1002TCE } from "../../imports/C25744"
import { CL05B223KB5VPNC } from "../../imports/C307335"
import { HoLRT1206_1W_180mR_1_ } from "../../imports/HoLRT1206_1W_180mR_1_"
import { CL21A475KBQNNNE } from "../../imports/C98192"
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
        fontSize={0.22}
        text="VM power switch, regenerative-energy clamp and motor connector pending; no 5 V motor operation"
        schX={0}
        schY={9}
      />
      <TMC2209_LA
        name="U2"
        {...previewPlacement("U2", mechanicalPreview)}
        schX={-6}
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
        schX={0}
        schY={6}
        connections={{ pin1: "net.TMC_CPO", pin2: "net.TMC_CPI" }}
      />
      <CC0603KRX7R9BB104
        name="C14"
        {...previewPlacement("C14", mechanicalPreview)}
        schX={5}
        schY={6}
        schRotation={270}
        connections={{ pin1: "net.TMC_VCP", pin2: "net.VM" }}
      />
      <CL21A475KBQNNNE
        name="C15"
        {...previewPlacement("C15", mechanicalPreview)}
        schX={-11}
        schY={-5}
        schRotation={270}
        connections={{ pin1: "net.TMC_5VOUT", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C16"
        {...previewPlacement("C16", mechanicalPreview)}
        schX={0}
        schY={3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CC0603KRX7R9BB104
        name="C17"
        {...previewPlacement("C17", mechanicalPreview)}
        schX={4}
        schY={3}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <CL31A106KBHNNNE
        name="C18"
        {...previewPlacement("C18", mechanicalPreview)}
        schX={7}
        schY={3}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <EEEFPV101XAP
        name="C19"
        {...previewPlacement("C19", mechanicalPreview)}
        schX={4}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <EEEFPV101XAP
        name="C20"
        {...previewPlacement("C20", mechanicalPreview)}
        schX={7}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.VM", pin2: "net.GND" }}
      />
      <HoLRT1206_1W_180mR_1_
        name="R5"
        {...previewPlacement("R5", mechanicalPreview)}
        schX={0}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.TMC_SENSE_A", pin2: "net.GND" }}
      />
      <HoLRT1206_1W_180mR_1_
        name="R6"
        {...previewPlacement("R6", mechanicalPreview)}
        schX={4}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.TMC_SENSE_B", pin2: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R4"
        {...previewPlacement("R4", mechanicalPreview)}
        schX={8}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.TMC_UART_TX", pin2: "net.TMC_UART_RX" }}
      />
      <A_0402WGF1002TCE
        name="R7"
        {...previewPlacement("R7", mechanicalPreview)}
        schX={0}
        schY={-6}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.TMC_ENABLE_N" }}
      />
      <A_0402WGF1002TCE
        name="R8"
        {...previewPlacement("R8", mechanicalPreview)}
        schX={4}
        schY={-6}
        schRotation={270}
        connections={{ pin1: "net.TMC_STEP", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R9"
        {...previewPlacement("R9", mechanicalPreview)}
        schX={8}
        schY={-6}
        schRotation={270}
        connections={{ pin1: "net.TMC_DIR", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R10"
        {...previewPlacement("R10", mechanicalPreview)}
        schX={-11}
        schY={5}
        schRotation={270}
        connections={{ pin1: "net.TMC_5VOUT", pin2: "net.TMC_VREF" }}
      />
      <A_0402WGF1002TCE
        name="R11"
        {...previewPlacement("R11", mechanicalPreview)}
        schX={-11}
        schY={2}
        schRotation={270}
        connections={{ pin1: "net.TMC_VREF", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C21"
        {...previewPlacement("C21", mechanicalPreview)}
        schX={-11}
        schY={-2}
        schRotation={270}
        connections={{ pin1: "net.TMC_VREF", pin2: "net.GND" }}
      />
      <schematictext
        fontSize={0.22}
        text="180 mOhm / 1 W sense pair: nominal full scale 1.149 A RMS; proposed firmware cap 1.0 A, bring-up 0.3 A"
        schX={0}
        schY={-9}
      />
      <schematictext
        fontSize={0.22}
        text="200 uF / 35 V bulk nominal; capacitor ripple, polarity, startup and thermal qualification pending"
        schX={0}
        schY={-10}
      />
    </schematicsheet>
  )
}
