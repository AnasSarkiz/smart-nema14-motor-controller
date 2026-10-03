import objPath from "./S4B_PH_K_S_LF__SN_.obj"
import stepPath from "./S4B_PH_K_S_LF__SN_.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const S4B_PH_K_S_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C157926"
  ]
}}
      manufacturerPartNumber="S4B-PH-K-S(LF)(SN)"
      footprint={<footprint>
        <platedhole  portHints={["pin4"]} pcbX="2.999994mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
<platedhole  portHints={["pin3"]} pcbX="0.999998mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
<platedhole  portHints={["pin2"]} pcbX="-0.999998mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
<platedhole  portHints={["pin1"]} pcbX="-2.999994mm" pcbY="0mm" holeWidth="0.999998mm" holeHeight="0.999998mm" outerWidth="1.499997mm" outerHeight="1.499997mm" rectPad={true} pcbRotation="0deg" shape="pill" />
<silkscreenpath route={[{"x":5.000040800000079,"y":1.3000227999999652},{"x":4.000042800000074,"y":1.3000227999999652},{"x":4.000042800000074,"y":-0.1999996000001829}]} />
<silkscreenpath route={[{"x":1.999056200000041,"y":-2.1990050000000565},{"x":1.999056200000041,"y":-6.199504999999931}]} />
<silkscreenpath route={[{"x":2.0000468000000637,"y":-2.1990050000000565},{"x":-1.99890379999988,"y":-2.1990050000000565},{"x":-1.99890379999988,"y":-6.199504999999931}]} />
<silkscreenpath route={[{"x":-4.9999138000000585,"y":1.3000227999999652},{"x":-3.999890399999913,"y":1.3000227999999652},{"x":-3.999890399999913,"y":-0.1999996000001829}]} />
<silkscreenpath route={[{"x":4.998796200000015,"y":-6.301079600000094},{"x":4.998796200000015,"y":1.3011404000000084}]} />
<silkscreenpath route={[{"x":-4.9999138000000585,"y":1.3000227999999652},{"x":-4.9999138000000585,"y":-6.2999620000000505}]} />
<silkscreenpath route={[{"x":5.000040800000079,"y":-6.301079600000094},{"x":-4.998669199999995,"y":-6.301079600000094}]} />
<silkscreencircle pcbX="-3.099816mm" pcbY="1.229868mm" radius="0.24003mm" />
<silkscreentext text="{NAME}" pcbX="0.014986mm" pcbY="2.46304mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.8699479999999085,"y":-6.299987400000077},{"x":-2.1299423999998908,"y":-6.299987400000077},{"x":-2.1299423999998908,"y":-2.080006000000026},{"x":-2.11993480000001,"y":-2.0699984000000313},{"x":2.1300440000001117,"y":-2.0699984000000313},{"x":2.1300440000001117,"y":-6.299987400000077},{"x":1.8700496000000157,"y":-6.299987400000077},{"x":1.8700496000000157,"y":-2.319985200000133},{"x":-1.8699479999999085,"y":-2.319985200000133},{"x":-1.8699479999999085,"y":-6.299987400000077}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-5.200002799999993,"y":1.5999845999999707},{"x":5.199977399999966,"y":1.5999845999999707},{"x":5.199977399999966,"y":-6.500000200000045},{"x":-5.200002799999993,"y":-6.500000200000045},{"x":-5.200002799999993,"y":1.5999845999999707}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.0005127000000699766, y: 3.25000779999998, z: 0.09999300000000044 },
      }}
      {...props}
    />
  )
}