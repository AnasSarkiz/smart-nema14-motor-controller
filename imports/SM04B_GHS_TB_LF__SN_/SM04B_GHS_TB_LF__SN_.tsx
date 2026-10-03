import objPath from "./SM04B_GHS_TB_LF__SN_.obj"
import stepPath from "./SM04B_GHS_TB_LF__SN_.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"]
} as const

export const SM04B_GHS_TB_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C189895"
  ]
}}
      manufacturerPartNumber="SM04B-GHS-TB(LF)(SN)"
      footprint={<footprint>
        <smtpad portHints={["pin6"]} pcbX="-3.724656mm" pcbY="-1.3495655mm" width="0.999998mm" height="2.6999946mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="3.724656mm" pcbY="-1.3495655mm" width="0.999998mm" height="2.6999946mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="1.87452mm" pcbY="1.8495645mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.624586mm" pcbY="1.8495645mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.625602mm" pcbY="1.8495645mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-1.875536mm" pcbY="1.8495645mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<silkscreenpath route={[{"x":-2.359990200000084,"y":1.9399885000000268},{"x":-4.269993999999997,"y":1.9399885000000268},{"x":-4.269993999999997,"y":0.2900045000000091}]} />
<silkscreenpath route={[{"x":-2.999994000000015,"y":-2.460002700000018},{"x":2.9199839999999995,"y":-2.460002700000018}]} />
<silkscreenpath route={[{"x":2.340000400000008,"y":1.9300062999999454},{"x":4.280001599999991,"y":1.9300062999999454},{"x":4.280001599999991,"y":0.23000970000009602}]} />
<silkscreencircle pcbX="-3.43789mm" pcbY="2.3494365mm" radius="0.1249934mm" />
<silkscreentext text="{NAME}" pcbX="0.021844mm" pcbY="3.6890345mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-4.474654999999984,"y":2.949562799999967},{"x":4.474654999999984,"y":2.949562799999967},{"x":4.474654999999984,"y":-2.949562799999967},{"x":-4.474654999999984,"y":-2.949562799999967},{"x":-4.474654999999984,"y":2.949562799999967}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 1.8750126999999566, y: -0.7145026000001098, z: -0.01 },
      }}
      {...props}
    />
  )
}