import { ComponentNotes } from "../schematic/ComponentNotes"
import { SN74LVC1G27DBVR } from "../../imports/SN74LVC1G27DBVR/SN74LVC1G27DBVR"
import { SN74LVC3G17DCUR } from "../../imports/SN74LVC3G17DCUR/SN74LVC3G17DCUR"
import { BAT54WS_TP } from "../../imports/BAT54WS_TP/BAT54WS_TP"
import { SN74LVC1G98DCKR } from "../../imports/SN74LVC1G98DCKR/SN74LVC1G98DCKR"
import { A_0402WGF1803TCE } from "../../imports/A_0402WGF1803TCE/A_0402WGF1803TCE"
import { TLV803EA30DBZR } from "../../imports/TLV803EA30DBZR/TLV803EA30DBZR"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"

/** A stale POWER_OK flag alone cannot enable the motor after PD detachment. */
export function MotorInterlockSheet({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="MotorInterlock"
      displayName="Hardware motor inhibit: request, 15V PDO and live PD path"
      sheetSize="A4"
      sheetIndex={11}
    >
      <schematictext
        schX={-6.5}
        schY={8.7}
        fontSize={0.22}
        text="NOR output qualifies the request only when MCU request, POWER_OK2 and live VBUS_EN_SNK are all low. PWR_OK_CFG=10b; active PDO2 must be15V. POWER_OK2 alone can remain asserted after unplug."
      />
      <BAT54WS_TP
        name="D_PD_VALID"
        {...previewPlacement("D_PD_VALID", mechanicalPreview)}
        schX={-12}
        schY={2}
        schRotation={270}
        connections={{
          pin1: "net.PD_LOAD_ENABLE_N",
          pin2: "net.PD_PATH_INVALID_N",
        }}
      />
      <A_0402WGF1002TCE
        name="R_PD_PATH"
        {...previewPlacement("R_PD_PATH", mechanicalPreview)}
        schX={-12}
        schY={4.6}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.PD_PATH_INVALID_N" }}
      />
      <A_0402WGF1002TCE
        name="R_MOTOR_REQUEST"
        {...previewPlacement("R_MOTOR_REQUEST", mechanicalPreview)}
        schX={-9}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.MOTOR_REQUEST_N" }}
      />
      <SN74LVC1G27DBVR
        name="U_MOTOR_INTERLOCK"
        {...previewPlacement("U_MOTOR_INTERLOCK", mechanicalPreview)}
        schX={-5}
        schY={2}
        connections={{
          A: "net.MOTOR_REQUEST_CLEAN_N",
          B: "net.PD_CONTRACT_15_CLEAN_N",
          C: "net.PD_PATH_INVALID_CLEAN_N",
          Y: "net.MOTOR_ENABLE_DRIVE",
          VCC: "net.V3V3",
          GND: "net.GND",
        }}
      />
      <SN74LVC3G17DCUR
        name="U_PD_SCHMITT"
        {...previewPlacement("U_PD_SCHMITT", mechanicalPreview)}
        schX={-9}
        schY={-3.8}
        connections={{
          pin1: "net.MOTOR_REQUEST_N",
          pin7: "net.MOTOR_REQUEST_CLEAN_N",
          pin3: "net.PD_CONTRACT_15_N",
          pin5: "net.PD_CONTRACT_15_CLEAN_N",
          pin6: "net.PD_PATH_INVALID_N",
          pin2: "net.PD_PATH_INVALID_CLEAN_N",
          pin4: "net.GND",
          pin8: "net.V3V3",
        }}
      />
      <CL05B104KO5NNNC
        name="C_PD_SCHMITT"
        {...previewPlacement("C_PD_SCHMITT", mechanicalPreview)}
        schX={-3}
        schY={-4.8}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C_MOTOR_INTERLOCK"
        {...previewPlacement("C_MOTOR_INTERLOCK", mechanicalPreview)}
        schX={-3}
        schY={-6.2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <SN74LVC1G98DCKR
        name="U_MOTOR_ENN"
        {...previewPlacement("U_MOTOR_ENN", mechanicalPreview)}
        schX={0.8}
        schY={2}
        connections={{
          pin1: "net.GND",
          pin2: "net.GND",
          pin3: "net.MOTOR_ENABLE_DRIVE",
          pin4: "net.TMC_ENABLE_N",
          pin5: "net.V3V3",
          pin6: "net.MOTOR_POWER_GOOD",
        }}
      />
      <CL05B104KO5NNNC
        name="C_MOTOR_ENN"
        {...previewPlacement("C_MOTOR_ENN", mechanicalPreview)}
        schX={-3}
        schY={-7.6}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <TLV803EA30DBZR
        name="U_MOTOR_SUPERVISOR"
        {...previewPlacement("U_MOTOR_SUPERVISOR", mechanicalPreview)}
        schX={-7.4}
        schY={-7}
        schWidth={2.05}
        connections={{
          VDD: "net.V3V3",
          GND: "net.GND",
          N_RESET: "net.MOTOR_POWER_GOOD",
        }}
      />
      <A_0402WGF1803TCE
        name="R_MOTOR_BOOT_PULLUP"
        {...previewPlacement("R_MOTOR_BOOT_PULLUP", mechanicalPreview)}
        schX={-12}
        schY={-7}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.MOTOR_POWER_GOOD" }}
      />
      <CL05B104KO5NNNC
        name="C_MOTOR_SUPERVISOR"
        {...previewPlacement("C_MOTOR_SUPERVISOR", mechanicalPreview)}
        schX={-3}
        schY={-9}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <schematictext
        schX={-6.5}
        schY={-10.7}
        fontSize={0.22}
        text="U_MOTOR_ENN is a Schmitt-input NAND: ENN is low only with a qualified request AND supervisor power-good. R7 uses TMC VCC_IO (3V3), never5VOUT. TMC I/O undervoltage reset covers the sub-POR region."
      />
      <schematictext
        schX={-6.5}
        schY={-11.7}
        fontSize={0.22}
        text="D_PD_VALID blocks the high-voltage PD gate node. U_PD_SCHMITT accepts slow open-drain edges and drives the NOR inputs; qualification includes VOL plus diode drop, leakage and unpowered operation."
      />
      <ComponentNotes sheet="MotorInterlock" />
    </schematicsheet>
  )
}
