import objPath from "./STL8P4LLF6.obj"
import stepPath from "./STL8P4LLF6.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["S1"],
  pin2: ["S2"],
  pin3: ["S3"],
  pin4: ["G"],
  pin5: ["D1"],
  pin6: ["D2"],
  pin7: ["D3"],
  pin8: ["D4"],
  pin9: ["D5"]
} as const

export const STL8P4LLF6 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C222138"
  ]
}}
      manufacturerPartNumber="STL8P4LLF6"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.974979mm" pcbY="-1.599946mm" width="0.419989mm" height="0.6599936mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.324993mm" pcbY="-1.599946mm" width="0.419989mm" height="0.6599936mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.324993mm" pcbY="-1.599946mm" width="0.419989mm" height="0.6599936mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.974979mm" pcbY="-1.599946mm" width="0.419989mm" height="0.6599936mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.974979mm" pcbY="1.599946mm" width="0.419989mm" height="0.6599936mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="0.324993mm" pcbY="1.599946mm" width="0.419989mm" height="0.6599936mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-0.324993mm" pcbY="1.599946mm" width="0.419989mm" height="0.6599936mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-0.974979mm" pcbY="1.599946mm" width="0.419989mm" height="0.6599936mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-0.000127mm" pcbY="0.40005mm" width="2.3999952mm" height="2.2999954mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-1.449959mm" pcbY="-0.1076198mm" width="0.5999988mm" height="0.5700014mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="1.449959mm" pcbY="-0.1076198mm" width="0.5999988mm" height="0.5700014mm" shape="rect" />
<silkscreenpath route={[{"x":-1.5499841999999262,"y":-0.6162802000000056},{"x":-1.5499841999999262,"y":-0.766267199999902}]} />
<silkscreenpath route={[{"x":-1.5499841999999262,"y":1.4499336000000085},{"x":-1.5499841999999262,"y":0.4160011999999824}]} />
<silkscreenpath route={[{"x":1.550009599999953,"y":-0.616000799999938},{"x":1.550009599999953,"y":-0.765987799999948}]} />
<silkscreenpath route={[{"x":1.550009599999953,"y":1.3999209999999493},{"x":1.550009599999953,"y":0.41628060000005007}]} />
<silkscreenpath route={[{"x":-1.4311883999999964,"y":1.4499336000000085},{"x":-1.5499841999999262,"y":1.4499336000000085}]} />
<silkscreenpath route={[{"x":1.550009599999953,"y":1.3999209999999493},{"x":1.3999971999999161,"y":1.3999209999999493}]} />
<silkscreenpath route={[{"x":1.416100799999981,"y":-1.7000727999999299},{"x":1.550009599999953,"y":-1.7000727999999299},{"x":1.550009599999953,"y":-0.765987799999948}]} />
<silkscreenpath route={[{"x":-1.5499841999999262,"y":-0.766267199999902},{"x":-1.5499841999999262,"y":-1.7000727999999299},{"x":-1.416202399999861,"y":-1.7000727999999299}]} />
<silkscreencircle pcbX="-1.4800072mm" pcbY="-2.0999958mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="0.013589mm" pcbY="2.92024mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.9999584000000823,"y":2.179942800000049},{"x":1.9999584000000823,"y":2.179942800000049},{"x":1.9999584000000823,"y":-2.1799427999999352},{"x":-1.9999584000000823,"y":-2.1799427999999352},{"x":-1.9999584000000823,"y":2.179942800000049}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000012699999956566899, y: 0.07999729999983174, z: -0.2 },
      }}
      {...props}
    />
  )
}