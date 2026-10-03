import objPath from "./TCPP01_M12.obj"
import stepPath from "./TCPP01_M12.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["CC2"],
  pin2: ["GND"],
  pin3: ["CC1"],
  pin4: ["SOURCE"],
  pin5: ["GATE"],
  pin6: ["CTRLVBUS"],
  pin7: ["CC1c"],
  pin8: ["IN_GD"],
  pin9: ["CC2c"],
  pin10: ["DB"],
  pin11: ["FLT"],
  pin12: ["VCC"],
  pin13: ["EP"]
} as const

const pinAttributes = {
  pin2: {requiresGround: true},
  pin12: {requiresPower: true}
} as const

export const TCPP01_M12 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C1121848"
  ]
}}
      manufacturerPartNumber="TCPP01-M12"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.499872mm" pcbY="-1.407414mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0mm" pcbY="-1.407414mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.500126mm" pcbY="-1.407414mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="1.407414mm" pcbY="-0.500126mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="1.407414mm" pcbY="0mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="1.407414mm" pcbY="0.499872mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="0.500126mm" pcbY="1.407414mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="0mm" pcbY="1.407414mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-0.499872mm" pcbY="1.407414mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-1.407414mm" pcbY="0.499872mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="-1.407414mm" pcbY="0mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-1.407414mm" pcbY="-0.500126mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="0mm" pcbY="0mm" width="1.499997mm" height="1.499997mm" shape="rect" />
<silkscreenpath route={[{"x":-1.5761970000000929,"y":0.830503799999974},{"x":-1.5761970000000929,"y":1.5761970000000929},{"x":-0.830503799999974,"y":1.5761970000000929}]} />
<silkscreenpath route={[{"x":1.5761969999998655,"y":0.830503799999974},{"x":1.5761969999998655,"y":1.5761970000000929},{"x":0.830503799999974,"y":1.5761970000000929}]} />
<silkscreenpath route={[{"x":-1.5761970000000929,"y":-0.8305037999998603},{"x":-1.5761970000000929,"y":-1.5761969999999792},{"x":-0.830503799999974,"y":-1.5761969999999792}]} />
<silkscreenpath route={[{"x":1.5761969999998655,"y":-0.8305037999998603},{"x":1.5761969999998655,"y":-1.5761969999999792},{"x":0.830503799999974,"y":-1.5761969999999792}]} />
<silkscreencircle pcbX="-0.499872mm" pcbY="-2.040128mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="2.7526mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.9899127000001045,"y":1.9899127000001045},{"x":1.9899126999999908,"y":1.9899127000001045},{"x":1.9899126999999908,"y":-1.9899126999999908},{"x":-1.9899127000001045,"y":-1.9899126999999908},{"x":-1.9899127000001045,"y":1.9899127000001045}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.000012700000070253736, z: 0 },
      }}
      {...props}
    />
  )
}