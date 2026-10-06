import { ComponentNotes } from "../schematic/ComponentNotes"
import { TPS26600RHFR } from "../../imports/TPS26600RHFR/TPS26600RHFR"
import { DMG1012T_7 } from "../../imports/DMG1012T_7/DMG1012T_7"
import { RT0402BRD07100KL } from "../../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { RT0402BRD076K04L } from "../../imports/RT0402BRD076K04L/RT0402BRD076K04L"
import { A_0402WGF2402TCE } from "../../imports/A_0402WGF2402TCE/A_0402WGF2402TCE"
import { A_0402WGF4702TCE } from "../../imports/A_0402WGF4702TCE/A_0402WGF4702TCE"
import { A_0402WGF4701TCE } from "../../imports/A_0402WGF4701TCE/A_0402WGF4701TCE"
import { UMK107BBJ225KA_T } from "../../imports/UMK107BBJ225KA_T/UMK107BBJ225KA_T"
import { A_0402WGF1001TCE } from "../../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"

export function InputPowerSheet({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="InputPower"
      displayName="USB input current limit, inrush and reverse blocking"
      sheetSize="A4"
      sheetIndex={9}
    >
      <schematictext
        schX={-6.5}
        schY={8.7}
        fontSize={0.18}
        text={
          "Autonomous USB bootstrap; GPIO high-current mode requires a validated >=1.5 A PD contract. Motor ENN\nstays high at 5 V."
        }
      />
      <TPS26600RHFR
        name="U10"
        {...previewPlacement("U10", mechanicalPreview)}
        schX={-9.75}
        schY={0}
        schWidth={1.445}
        schHeight={2.77}
        schPinArrangement={{
          leftSide: [8, 9, 10, 12, 13, 14, 1, 2, 3, 4, 5],
          rightSide: [24, 23, 22, 20, 19, 18, 6, 7, 11, 16, 21],
          bottomSide: [25, 15],
          topSide: [17],
        }}
        cadModel={{
          stepUrl: "./references/tps26600-cad/RHF0024A.stp",
          modelOriginPosition: { x: 0, y: 0, z: 0 },
          rotationOffset: { x: 0, y: 0, z: 90 },
          modelBoardNormalDirection: "z+",
          modelUnitToMmScale: 1,
        }}
        noConnect={[
          "N_C1",
          "N_C2",
          "N_C3",
          "N_C4",
          "N_C5",
          "N_C6",
          "N_C7",
          "N_C8",
          "N_C9",
          "N_C10",
          "N_SHDN",
          "IMON",
        ]}
        connections={{
          IN1: "net.VBUS_PROTECTED",
          IN2: "net.VBUS_PROTECTED",
          OUT1: "net.VM",
          OUT2: "net.VM",
          GND: "net.GND",
          RTN: "net.EFUSE_RTN",
          MODE: "net.EFUSE_RTN",
          EP: "net.EFUSE_RTN",
          UVLO: "net.EFUSE_EN",
          OVP: "net.EFUSE_OVP",
          ILIM: "net.EFUSE_ILIM",
          dVdT: "net.EFUSE_DVDT",
          N_FLT: "net.EFUSE_FLT_N",
        }}
      />
      <DMG1012T_7
        name="Q_ILIM"
        {...previewPlacement("Q_ILIM", mechanicalPreview)}
        schX={-2.6}
        schY={-2.16}
        connections={{
          G: "net.POWER_HIGH_CURRENT",
          S: "net.EFUSE_RTN",
          D: "net.EFUSE_ILIM_SWITCH",
        }}
      >
        <schematictext
          text="{NAME}"
          schX={-1.5}
          schY={0.9}
          fontSize={0.2}
          anchor="left"
        />
      </DMG1012T_7>
      <RT0402BRD07100KL
        name="R38"
        {...previewPlacement("R38", mechanicalPreview)}
        schX={-14.3}
        schY={2.88}
        schRotation={270}
        connections={{ pin1: "net.VBUS_PROTECTED", pin2: "net.EFUSE_EN" }}
      />
      <A_0402WGF4702TCE
        name="R39"
        {...previewPlacement("R39", mechanicalPreview)}
        schX={-14.3}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_EN", pin2: "net.EFUSE_RTN" }}
      />
      <RT0402BRD07100KL
        name="R40"
        {...previewPlacement("R40", mechanicalPreview)}
        schX={-12.35}
        schY={-4.32}
        schRotation={270}
        connections={{
          pin1: "net.VBUS_PROTECTED",
          pin2: "net.EFUSE_OVP_TOP_1",
        }}
      />
      <A_0402WGF1001TCE
        name="R41"
        {...previewPlacement("R41", mechanicalPreview)}
        schX={-10}
        schY={-4.32}
        connections={{
          pin1: "net.EFUSE_OVP_TOP_1",
          pin2: "net.EFUSE_OVP_TOP_2",
        }}
      />
      <A_0402WGF4701TCE
        name="R42"
        {...previewPlacement("R42", mechanicalPreview)}
        schX={-7.15}
        schY={-4.32}
        connections={{ pin1: "net.EFUSE_OVP_TOP_2", pin2: "net.EFUSE_OVP" }}
      />
      <RT0402BRD076K04L
        name="R43"
        {...previewPlacement("R43", mechanicalPreview)}
        schX={-4.55}
        schY={-4.32}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_OVP", pin2: "net.EFUSE_RTN" }}
      />
      <A_0402WGF2402TCE
        name="R44"
        {...previewPlacement("R44", mechanicalPreview)}
        schX={-5.2}
        schY={2.16}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_ILIM", pin2: "net.EFUSE_RTN" }}
      />
      <A_0402WGF2402TCE
        name="R45"
        {...previewPlacement("R45", mechanicalPreview)}
        schX={-2.6}
        schY={2.16}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_ILIM", pin2: "net.EFUSE_ILIM_SWITCH" }}
      />
      <A_0402WGF1002TCE
        name="R46"
        {...previewPlacement("R46", mechanicalPreview)}
        schX={0}
        schY={-2.16}
        schRotation={270}
        connections={{ pin1: "net.POWER_HIGH_CURRENT", pin2: "net.GND" }}
      />
      <UMK107BBJ225KA_T
        name="C33"
        {...previewPlacement("C33", mechanicalPreview)}
        schX={-6.5}
        schY={-6.48}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_DVDT", pin2: "net.EFUSE_RTN" }}
      />
      <UMK107BBJ225KA_T
        name="C34"
        {...previewPlacement("C34", mechanicalPreview)}
        schX={-9.5}
        schY={-6.48}
        schRotation={270}
        connections={{ pin1: "net.VBUS_PROTECTED", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R48"
        {...previewPlacement("R48", mechanicalPreview)}
        schX={-1.95}
        schY={5.04}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.EFUSE_FLT_N" }}
      />
      <schematictext
        schX={-6.5}
        schY={-9.02}
        fontSize={0.18}
        text={
          "2.2 uF dVdT to isolated RTN: nominal slew 0.0526 V/ms. 24k gives 0.50 A; parallel branch gives 1.00 A.\nFirmware must limit USB bootstrap draw."
        }
      />
      <schematictext
        schX={-6.5}
        schY={-9.7}
        fontSize={0.18}
        text={
          "MODE to RTN: current limit with automatic retry; SHDN internal pull-up enables startup. Hold ENN high on\nfault. RTN must remain separate from GND. Reverse blocking is not a brake."
        }
      />
      <netlabel
        net="GND"
        connection=".U10 > .GND"
        schX={-10.7}
        schY={2.4}
        anchorSide="top"
      />
      <ComponentNotes sheet="InputPower" />
    </schematicsheet>
  )
}
