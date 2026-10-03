import { StandardJstSwdResetSide } from "@tsci/tscircuit.standard-jst-programmer"
import { RT0402BRD07100KL } from "../../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { TMUX1511RSVR } from "../../imports/TMUX1511RSVR/TMUX1511RSVR"
import { TLV803EA30DBZR } from "../../imports/TLV803EA30DBZR/TLV803EA30DBZR"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { A_0402WGF1001TCE } from "../../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"

export function ProgrammingSheet({
  mechanicalPreview = false,
}: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="Programming"
      displayName="Self-powered 3.3 V SWD and voltage-sense isolation"
      sheetSize="A4"
      sheetIndex={7}
    >
      <schematictext
        schX={0}
        schY={8}
        fontSize={0.22}
        text="USB-C supplies the target. Programmer signals must be 3.3 V; its VOUT is deliberately disconnected."
      />
      <StandardJstSwdResetSide
        name="J_SWD"
        {...previewPlacement("J_SWD", mechanicalPreview)}
        schX={-10}
        schY={2}
        noConnect={["VOUT"]}
        connections={{
          SWDIO: "net.SWDIO_CONN",
          GND: "net.GND",
          SWCLK: "net.SWCLK_CONN",
          NRST: "net.NRST_CONN",
        }}
      />
      <TMUX1511RSVR
        name="U7"
        schWidth={1.58}
        schHeight={2}
        schPinStyle={{ VDD: { leftMargin: 0.3, rightMargin: 0.3 } }}
        schPinArrangement={{
          leftSide: ["S1", "S2", "S3", "S4"],
          rightSide: ["D1", "D2", "D3", "D4"],
          topSide: ["N_C_1", "VDD", "N_C_2"],
          bottomSide: ["GND", "SEL1", "SEL2", "SEL3", "SEL4"],
        }}
        {...previewPlacement("U7", mechanicalPreview)}
        schX={-3}
        schY={0}
        noConnect={["N_C_1", "N_C_2"]}
        connections={{
          VDD: "net.V3V3",
          GND: "net.GND",
          SEL1: "net.POWER_GOOD",
          SEL2: "net.POWER_GOOD",
          SEL3: "net.POWER_GOOD",
          SEL4: "net.POWER_GOOD",
          S1: "net.SWDIO_CONN",
          D1: "net.SWDIO_GUARDED",
          S2: "net.SWCLK_CONN",
          D2: "net.SWCLK_GUARDED",
          S3: "net.NRST_CONN",
          D3: "net.NRST_GUARDED",
          S4: "net.VBUS_ADC_PRE_GUARD",
          D4: "net.VBUS_ADC",
        }}
      />
      <TLV803EA30DBZR
        name="U8"
        {...previewPlacement("U8", mechanicalPreview)}
        schX={-3}
        schY={-7}
        connections={{
          VDD: "net.V3V3",
          GND: "net.GND",
          N_RESET: "net.POWER_GOOD",
        }}
      />
      <A_0402WGF1002TCE
        name="R19"
        {...previewPlacement("R19", mechanicalPreview)}
        schX={3}
        schY={-7}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.POWER_GOOD" }}
      />
      <CL05B104KO5NNNC
        name="C28"
        {...previewPlacement("C28", mechanicalPreview)}
        schX={6}
        schY={-7}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL05B104KO5NNNC
        name="C29"
        {...previewPlacement("C29", mechanicalPreview)}
        schX={9}
        schY={-7}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <A_0402WGF1001TCE
        name="R20"
        {...previewPlacement("R20", mechanicalPreview)}
        schX={5}
        schY={4}
        connections={{ pin1: "net.SWDIO_GUARDED", pin2: "net.SWDIO" }}
      />
      <A_0402WGF1001TCE
        name="R21"
        {...previewPlacement("R21", mechanicalPreview)}
        schX={5}
        schY={1}
        connections={{ pin1: "net.SWCLK_GUARDED", pin2: "net.SWCLK" }}
      />
      <A_0402WGF1001TCE
        name="R22"
        {...previewPlacement("R22", mechanicalPreview)}
        schX={5}
        schY={-2}
        connections={{ pin1: "net.NRST_GUARDED", pin2: "net.NRST" }}
      />
      <RT0402BRD07100KL
        name="R51"
        {...previewPlacement("R51", mechanicalPreview)}
        schX={11}
        schY={1}
        schRotation={270}
        connections={{ pin1: "net.VBUS_ADC", pin2: "net.GND" }}
      />
      <RT0402BRD07100KL
        name="R52"
        {...previewPlacement("R52", mechanicalPreview)}
        schX={11}
        schY={5}
        schRotation={270}
        connections={{ pin1: "net.SWDIO", pin2: "net.GND" }}
      />
      <RT0402BRD07100KL
        name="R53"
        {...previewPlacement("R53", mechanicalPreview)}
        schX={11}
        schY={-3}
        schRotation={270}
        connections={{ pin1: "net.SWCLK", pin2: "net.GND" }}
      />
      <schematictext
        schX={0}
        schY={-10}
        fontSize={0.2}
        text="U8 gates all four channels until 3.0 V rail qualification plus 200 ms. TMUX powered-off signal limit is 3.6 V."
      />
      <schematictext
        schX={0}
        schY={-11}
        fontSize={0.2}
        text="NRST has its own channel; programmer reset does not disable the other channels. Verify SWD timing on the prototype."
      />
    </schematicsheet>
  )
}
