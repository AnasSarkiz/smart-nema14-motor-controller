import objPath from "./SN74LVC1G98DCKR.obj"
import stepPath from "./SN74LVC1G98DCKR.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["IN1"],
  pin2: ["GND"],
  pin3: ["IN0"],
  pin4: ["Y1"],
  pin5: ["VCC"],
  pin6: ["IN2"]
} as const

const pinAttributes = {
  pin2: {requiresGround: true},
  pin5: {requiresPower: true}
} as const

export const SN74LVC1G98DCKR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C485081"
  ]
}}
      manufacturerPartNumber="SN74LVC1G98DCKR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.649986mm" pcbY="-0.882904mm" width="0.3640074mm" height="0.8659876mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0mm" pcbY="-0.882904mm" width="0.3640074mm" height="0.8659876mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.649986mm" pcbY="-0.882904mm" width="0.3640074mm" height="0.8659876mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.649986mm" pcbY="0.882904mm" width="0.3640074mm" height="0.8659876mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-0.649986mm" pcbY="0.882904mm" width="0.3640074mm" height="0.8659876mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0mm" pcbY="0.882904mm" width="0.3640074mm" height="0.8659876mm" shape="rect" />
<silkscreenpath route={[{"x":-1.076198000000005,"y":-0.726211400000011},{"x":-1.076198000000005,"y":0.7262113999999968}]} />
<silkscreenpath route={[{"x":1.076198000000005,"y":-0.726211400000011},{"x":1.076198000000005,"y":0.7262113999999968}]} />
<silkscreencircle pcbX="-1.143mm" pcbY="-1.016mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="-0.0762mm" pcbY="2.3208mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.249998000000005,"y":1.565897800000002},{"x":1.249998000000005,"y":1.565897800000002},{"x":1.249998000000005,"y":-1.565897800000016},{"x":-1.249998000000005,"y":-1.565897800000016},{"x":-1.249998000000005,"y":1.565897800000002}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.5 },
      }}
      {...props}
    />
  )
}