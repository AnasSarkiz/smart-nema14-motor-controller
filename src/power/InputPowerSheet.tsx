import { TPS259470LRPWR } from "../../imports/TPS259470LRPWR/TPS259470LRPWR"
import { BSS138LT1G } from "../../imports/BSS138LT1G/BSS138LT1G"
import { RT0402BRD07100KL } from "../../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { RT0402BRD076K04L } from "../../imports/RT0402BRD076K04L/RT0402BRD076K04L"
import { A_0402WGF6651TCE } from "../../imports/A_0402WGF6651TCE/A_0402WGF6651TCE"
import { A_0402WGF4702TCE } from "../../imports/A_0402WGF4702TCE/A_0402WGF4702TCE"
import { A_0402WGF1000TCE } from "../../imports/A_0402WGF1000TCE/A_0402WGF1000TCE"
import { A_0402WGF1001TCE } from "../../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { CC0603KRX7R9BB104 } from "../../imports/CC0603KRX7R9BB104/CC0603KRX7R9BB104"
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
        schX={0}
        schY={8}
        fontSize={0.22}
        text="Autonomous USB bootstrap; GPIO high-current mode requires a validated >=1.5 A PD contract. Motor ENN stays high at 5 V."
      />
      <TPS259470LRPWR
        name="U10"
        {...previewPlacement("U10", mechanicalPreview)}
        schX={-5}
        schY={0}
        noConnect={["AUXOFF", "ITIMER"]}
        connections={{
          IN: "net.VBUS_PROTECTED",
          OUT: "net.VM",
          GND: "net.GND",
          EN: "net.EFUSE_EN",
          OVLO: "net.EFUSE_OVP",
          ILM: "net.EFUSE_ILIM",
          DVDT: "net.EFUSE_DVDT",
          N_FLT: "net.EFUSE_FLT_N",
        }}
      />
      <schematictext
        schX={6}
        schY={-0.8}
        fontSize={0.2}
        text="Q_ILIM - BSS138LT1G"
      />
      <BSS138LT1G
        name="Q_ILIM"
        {...previewPlacement("Q_ILIM", mechanicalPreview)}
        schX={6}
        schY={-3}
        connections={{
          G: "net.POWER_HIGH_CURRENT",
          S: "net.GND",
          D: "net.EFUSE_ILIM_SWITCH",
        }}
      />
      <RT0402BRD07100KL
        name="R38"
        {...previewPlacement("R38", mechanicalPreview)}
        schX={-12}
        schY={4}
        schRotation={270}
        connections={{ pin1: "net.VBUS_PROTECTED", pin2: "net.EFUSE_EN" }}
      />
      <A_0402WGF4702TCE
        name="R39"
        {...previewPlacement("R39", mechanicalPreview)}
        schX={-12}
        schY={0}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_EN", pin2: "net.GND" }}
      />
      <RT0402BRD07100KL
        name="R40"
        {...previewPlacement("R40", mechanicalPreview)}
        schX={-9}
        schY={-6}
        schRotation={270}
        connections={{
          pin1: "net.VBUS_PROTECTED",
          pin2: "net.EFUSE_OVP_TOP_1",
        }}
      />
      <A_0402WGF1001TCE
        name="R41"
        {...previewPlacement("R41", mechanicalPreview)}
        schX={-5}
        schY={-6}
        connections={{
          pin1: "net.EFUSE_OVP_TOP_1",
          pin2: "net.EFUSE_OVP_TOP_2",
        }}
      />
      <A_0402WGF1001TCE
        name="R42"
        {...previewPlacement("R42", mechanicalPreview)}
        schX={-1}
        schY={-6}
        connections={{ pin1: "net.EFUSE_OVP_TOP_2", pin2: "net.EFUSE_OVP" }}
      />
      <RT0402BRD076K04L
        name="R43"
        {...previewPlacement("R43", mechanicalPreview)}
        schX={3}
        schY={-6}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_OVP", pin2: "net.GND" }}
      />
      <A_0402WGF6651TCE
        name="R44"
        {...previewPlacement("R44", mechanicalPreview)}
        schX={2}
        schY={3}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_ILIM", pin2: "net.GND" }}
      />
      <A_0402WGF6651TCE
        name="R45"
        {...previewPlacement("R45", mechanicalPreview)}
        schX={6}
        schY={3}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_ILIM", pin2: "net.EFUSE_ILIM_SWITCH" }}
      />
      <A_0402WGF1002TCE
        name="R46"
        {...previewPlacement("R46", mechanicalPreview)}
        schX={10}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.POWER_HIGH_CURRENT", pin2: "net.GND" }}
      />
      <A_0402WGF1000TCE
        name="R47"
        {...previewPlacement("R47", mechanicalPreview)}
        schX={-5}
        schY={-9}
        connections={{ pin1: "net.EFUSE_DVDT", pin2: "net.EFUSE_DVDT_CAP" }}
      />
      <CC0603KRX7R9BB104
        name="C33"
        {...previewPlacement("C33", mechanicalPreview)}
        schX={0}
        schY={-9}
        schRotation={270}
        connections={{ pin1: "net.EFUSE_DVDT_CAP", pin2: "net.GND" }}
      />
      <A_0402WGF1002TCE
        name="R48"
        {...previewPlacement("R48", mechanicalPreview)}
        schX={7}
        schY={7}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.EFUSE_FLT_N" }}
      />
      <schematictext
        schX={0}
        schY={-11.5}
        fontSize={0.2}
        text="100 nF dVdt capacitor + 100 ohm series: nominal slew 0.020 V/ms. 6.65k gives 0.50 A; parallel branch gives about 1.01 A."
      />
      <schematictext
        schX={0}
        schY={-12.2}
        fontSize={0.2}
        text="Latch-off faults require power cycle or UVLO toggle. Reverse blocking is not a regenerative brake; motor energy limits still require qualification."
      />
    </schematicsheet>
  )
}
