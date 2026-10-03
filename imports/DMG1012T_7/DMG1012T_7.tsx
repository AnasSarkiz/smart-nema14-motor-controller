import objPath from "./DMG1012T_7.obj"
import stepPath from "./DMG1012T_7.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["G"],
  pin2: ["S"],
  pin3: ["D"]
} as const

export const DMG1012T_7 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":0.1,"y":0.2},{"x":0.1,"y":-0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.28},{"x":0.2,"y":0.12}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.06},{"x":0.2,"y":-0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":-0.14},{"x":0.2,"y":-0.26}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.2},{"x":0.5,"y":0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.5,"y":0.4},{"x":0.5,"y":-0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":-0.2},{"x":0.5,"y":-0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.36,"y":0},{"x":0.36,"y":-0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.1,"y":0},{"x":-0.1,"y":0}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["G"]} direction="left" schX={-0.5} schY={0} schStemLength={0.4} />
          <port name="pin2" pinNumber={2} aliases={["S"]} direction="down" schX={0.5} schY={-0.8} schStemLength={0.4} />
          <port name="pin3" pinNumber={3} aliases={["D"]} direction="up" schX={0.5} schY={0.8} schStemLength={0.4} />
          <schematicpath points={[{"x":0.36,"y":0},{"x":0.2,"y":0},{"x":0.28,"y":-0.02}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0},{"x":0.28,"y":0.02}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.56,"y":-0.04},{"x":0.44,"y":-0.04},{"x":0.5,"y":0.06},{"x":0.56,"y":-0.04}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.56,"y":0.06},{"x":0.44,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0},{"x":-0.1,"y":-0.4},{"x":0.5,"y":-0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.3,"y":-0.34},{"x":0.3,"y":-0.46},{"x":0.2,"y":-0.4},{"x":0.3,"y":-0.34}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":-0.34},{"x":0.2,"y":-0.46}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.1,"y":-0.46},{"x":0.1,"y":-0.34},{"x":0.2,"y":-0.4},{"x":0.1,"y":-0.46}]} strokeColor="#880000" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C20512"
  ]
}}
      manufacturerPartNumber="DMG1012T-7"
      footprint={<footprint>
        <smtpad portHints={["pin3"]} pcbX="-0.649986mm" pcbY="-0.000127mm" width="0.5100066mm" height="0.3999992mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="0.649986mm" pcbY="-0.499999mm" width="0.5100066mm" height="0.3999992mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.649986mm" pcbY="0.499999mm" width="0.5100066mm" height="0.3999992mm" shape="rect" />
<silkscreenpath route={[{"x":0.45001180000002705,"y":-0.10086339999998017},{"x":0.45001180000002705,"y":0.1008634000000086}]} />
<silkscreenpath route={[{"x":0.45001180000002705,"y":-0.8999981999999989},{"x":0.45001180000002705,"y":-0.8991345999999965}]} />
<silkscreenpath route={[{"x":-0.45001179999999863,"y":0.39913559999999393},{"x":-0.45001179999999863,"y":0.8999981999999989}]} />
<silkscreenpath route={[{"x":-0.45001179999999863,"y":-0.8999981999999989},{"x":-0.45001179999999863,"y":-0.39913559999999393}]} />
<silkscreenpath route={[{"x":-0.45001179999999863,"y":-0.8999981999999989},{"x":0.45001180000002705,"y":-0.8999981999999989}]} />
<silkscreenpath route={[{"x":-0.45001179999999863,"y":0.8999981999999989},{"x":0.45001180000002705,"y":0.8999981999999989}]} />
<silkscreenpath route={[{"x":0.45001180000002705,"y":0.8991346000000107},{"x":0.45001180000002705,"y":0.8999981999999989}]} />
<silkscreencircle pcbX="0.759968mm" pcbY="-1.010031mm" radius="0.067056mm" />
<silkscreentext text="{NAME}" pcbX="0.039116mm" pcbY="1.905129mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.1549892999999969,"y":1.0499984000000069},{"x":1.1549892999999969,"y":1.0499984000000069},{"x":1.1549892999999969,"y":-1.0499983999999927},{"x":-1.1549892999999969,"y":-1.0499983999999927},{"x":-1.1549892999999969,"y":1.0499984000000069}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0, y: 0, z: -0.149083 },
      }}
      {...props}
    />
  )
}