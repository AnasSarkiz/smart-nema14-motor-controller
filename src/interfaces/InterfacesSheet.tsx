import { SM10B_SRSS_TB_LF__SN_ } from "../../imports/SM10B_SRSS_TB_LF__SN_/SM10B_SRSS_TB_LF__SN_"
import { SM04B_GHS_TB_LF__SN_ } from "../../imports/SM04B_GHS_TB_LF__SN_/SM04B_GHS_TB_LF__SN_"
import { TMP112AIDRLR } from "../../imports/TMP112AIDRLR/TMP112AIDRLR"
import { TPD4E05U06DQAR } from "../../imports/TPD4E05U06DQAR/TPD4E05U06DQAR"
import { SM712_TCT } from "../../imports/SM712_TCT/SM712_TCT"
import { XL_1608SYGC_06 } from "../../imports/XL_1608SYGC_06/XL_1608SYGC_06"
import { A_0402WGF1001TCE } from "../../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"

export function InterfacesSheet({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="Interfaces"
      displayName="Motor, CAN, control inputs, temperature and indicators"
      sheetSize="A4"
      sheetIndex={8}
    >
      <schematictext
        schX={0}
        schY={9}
        fontSize={0.22}
        text="STEP/DIR/ENABLE: 3.3 V logic only. Limits: normally closed dry contacts to GND; open circuit is a fault."
      />
      <SM10B_SRSS_TB_LF__SN_
        name="J_IO"
        {...previewPlacement("J_IO", mechanicalPreview)}
        schX={-12}
        schY={3}
        connections={{
          pin1: "net.GND",
          pin2: "net.CAN_H",
          pin3: "net.CAN_L",
          pin4: "net.GND",
          pin5: "net.EXT_STEP_CONN",
          pin6: "net.EXT_DIR_CONN",
          pin7: "net.EXT_ENABLE_N_CONN",
          pin8: "net.LIMIT1_CONN",
          pin9: "net.LIMIT2_CONN",
          pin10: "net.GND",
          pin11: "net.GND",
          pin12: "net.GND",
        }}
      />
      <SM04B_GHS_TB_LF__SN_
        name="J_MOTOR"
        {...previewPlacement("J_MOTOR", mechanicalPreview)}
        schX={-12}
        schY={-5}
        connections={{
          pin1: "net.MOTOR_A1",
          pin2: "net.MOTOR_A2",
          pin3: "net.MOTOR_B1",
          pin4: "net.MOTOR_B2",
          pin5: "net.GND",
          pin6: "net.GND",
        }}
      />
      <TMP112AIDRLR
        name="U9"
        {...previewPlacement("U9", mechanicalPreview)}
        schX={-4}
        schY={-6}
        connections={{
          SCL: "net.I2C_SCL",
          SDA: "net.I2C_SDA",
          V_POS: "net.V3V3",
          GND: "net.GND",
          ADD0: "net.GND",
          ALERT: "net.TEMP_ALERT_N",
        }}
      />
      <TPD4E05U06DQAR
        name="D_IO1"
        {...previewPlacement("D_IO1", mechanicalPreview)}
        schX={-5}
        schY={4}
        noConnect={["NC1", "NC2", "NC3", "NC4"]}
        connections={{
          D1_POS: "net.EXT_STEP_CONN",
          D1_NEG: "net.EXT_DIR_CONN",
          D2_POS: "net.EXT_ENABLE_N_CONN",
          D2_NEG: "net.LIMIT1_CONN",
          GND1: "net.GND",
          GND2: "net.GND",
        }}
      />
      <TPD4E05U06DQAR
        name="D_IO2"
        {...previewPlacement("D_IO2", mechanicalPreview)}
        schX={-5}
        schY={0}
        noConnect={["NC1", "NC2", "NC3", "NC4", "D1_NEG", "D2_POS", "D2_NEG"]}
        connections={{
          D1_POS: "net.LIMIT2_CONN",
          GND1: "net.GND",
          GND2: "net.GND",
        }}
      />
      <SM712_TCT
        name="D_CAN"
        {...previewPlacement("D_CAN", mechanicalPreview)}
        schX={-9}
        schY={-1}
        connections={{ A11: "net.CAN_H", A12: "net.CAN_L", K: "net.GND" }}
      />
      <schematictext
        schX={-9}
        schY={-2.2}
        fontSize={0.2}
        text="D_CAN - SM712.TCT"
      />
      <A_0402WGF1001TCE
        name="R23"
        {...previewPlacement("R23", mechanicalPreview)}
        schX={0}
        schY={7}
        connections={{ pin1: "net.EXT_STEP_CONN", pin2: "net.EXT_STEP" }}
      />
      <A_0402WGF1001TCE
        name="R24"
        {...previewPlacement("R24", mechanicalPreview)}
        schX={0}
        schY={4}
        connections={{ pin1: "net.EXT_DIR_CONN", pin2: "net.EXT_DIR" }}
      />
      <A_0402WGF1001TCE
        name="R25"
        {...previewPlacement("R25", mechanicalPreview)}
        schX={0}
        schY={1}
        connections={{
          pin1: "net.EXT_ENABLE_N_CONN",
          pin2: "net.EXT_ENABLE_N",
        }}
      />
      <A_0402WGF1001TCE
        name="R26"
        {...previewPlacement("R26", mechanicalPreview)}
        schX={0}
        schY={-2}
        connections={{ pin1: "net.LIMIT1_CONN", pin2: "net.LIMIT1" }}
      />
      <A_0402WGF1001TCE
        name="R27"
        {...previewPlacement("R27", mechanicalPreview)}
        schX={0}
        schY={-5}
        connections={{ pin1: "net.LIMIT2_CONN", pin2: "net.LIMIT2" }}
      />
      <A_0402WGF1002TCE
        name="R28"
        {...previewPlacement("R28", mechanicalPreview)}
        schX={4}
        schY={7}
        schRotation={270}
        connections={{ pin1: "net.EXT_STEP", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R29"
        {...previewPlacement("R29", mechanicalPreview)}
        schX={4}
        schY={4}
        schRotation={270}
        connections={{ pin1: "net.EXT_DIR", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R30"
        {...previewPlacement("R30", mechanicalPreview)}
        schX={4}
        schY={1}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.EXT_ENABLE_N" }}
      />
      <A_0402WGF1002TCE
        name="R31"
        {...previewPlacement("R31", mechanicalPreview)}
        schX={4}
        schY={-2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.LIMIT1" }}
      />
      <A_0402WGF1002TCE
        name="R32"
        {...previewPlacement("R32", mechanicalPreview)}
        schX={4}
        schY={-5}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.LIMIT2" }}
      />
      <A_0402WGF1002TCE
        name="R33"
        {...previewPlacement("R33", mechanicalPreview)}
        schX={-8}
        schY={-7}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.TEMP_ALERT_N" }}
      />
      <A_0402WGF1002TCE
        name="R34"
        {...previewPlacement("R34", mechanicalPreview)}
        schX={-8}
        schY={7}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.CAN_RS" }}
      />
      <CL05B104KO5NNNC
        name="C30"
        {...previewPlacement("C30", mechanicalPreview)}
        schX={8}
        schY={-2}
        schRotation={270}
        connections={{ pin1: "net.LIMIT1", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C31"
        {...previewPlacement("C31", mechanicalPreview)}
        schX={8}
        schY={-5}
        schRotation={270}
        connections={{ pin1: "net.LIMIT2", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C32"
        {...previewPlacement("C32", mechanicalPreview)}
        schX={-1}
        schY={-8}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R35"
        {...previewPlacement("R35", mechanicalPreview)}
        schX={10}
        schY={7}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.LED_POWER_A" }}
      />
      <XL_1608SYGC_06
        name="LED_POWER"
        {...previewPlacement("LED_POWER", mechanicalPreview)}
        schX={10}
        schY={5}
        schRotation={270}
        connections={{ anode: "net.LED_POWER_A", cathode: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R36"
        {...previewPlacement("R36", mechanicalPreview)}
        schX={10}
        schY={3}
        schRotation={270}
        connections={{ pin1: "net.LED_STATUS_DRIVE", pin2: "net.LED_STATUS_A" }}
      />
      <XL_1608SYGC_06
        name="LED_STATUS"
        {...previewPlacement("LED_STATUS", mechanicalPreview)}
        schX={10}
        schY={1}
        schRotation={270}
        connections={{ anode: "net.LED_STATUS_A", cathode: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R37"
        {...previewPlacement("R37", mechanicalPreview)}
        schX={10}
        schY={-1}
        schRotation={270}
        connections={{ pin1: "net.LED_FAULT_DRIVE", pin2: "net.LED_FAULT_A" }}
      />
      <XL_1608SYGC_06
        name="LED_FAULT"
        {...previewPlacement("LED_FAULT", mechanicalPreview)}
        schX={10}
        schY={-3}
        schRotation={270}
        connections={{ anode: "net.LED_FAULT_A", cathode: "net.GND" }}
      />
      <schematictext
        schX={0}
        schY={-10.5}
        fontSize={0.2}
        text="TMP112 address 0x48; board temperature only. Firmware must enforce motor current and temperature limits."
      />
      <schematictext
        schX={0}
        schY={-11.5}
        fontSize={0.2}
        text="J_MOTOR A1/A2 = one winding; B1/B2 = the other. Confirm cable colors against exact motor before use."
      />
    </schematicsheet>
  )
}
