import objPath from "./S4B_PH_SM4_TB_LF__SN_.obj"
import stepPath from "./S4B_PH_SM4_TB_LF__SN_.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"]
} as const

export const S4B_PH_SM4_TB_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C265102"
  ]
}}
      manufacturerPartNumber="S4B-PH-SM4-TB(LF)(SN)"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="2.999994mm" pcbY="-3.0375479mm" width="0.999998mm" height="3.499993mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.999998mm" pcbY="-3.0372939mm" width="0.999998mm" height="3.499993mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.999998mm" pcbY="-3.0372939mm" width="0.999998mm" height="3.499993mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-2.999994mm" pcbY="-3.0372939mm" width="0.999998mm" height="3.499993mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-5.350002mm" pcbY="2.9375481mm" width="1.7999964mm" height="3.6999926mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="5.350002mm" pcbY="2.9375481mm" width="1.7999964mm" height="3.6999926mm" shape="rect" />
<silkscreenpath route={[{"x":-3.810000000000059,"y":-1.5742539000000306},{"x":-4.988560000000007,"y":-1.5742539000000306},{"x":-4.988560000000007,"y":-3.1388939000001983},{"x":-5.969000000000051,"y":-3.1388939000001983},{"x":-5.969000000000051,"y":0.7120508999998947},{"x":-5.969000000000051,"y":0.8390508999998474}]} />
<silkscreenpath route={[{"x":5.969000000000051,"y":0.8387460999999803},{"x":5.969000000000051,"y":0.8387460999999803},{"x":5.969000000000051,"y":-3.1388939000001983},{"x":5.1155599999999595,"y":-3.1388939000001983},{"x":4.988560000000007,"y":-3.1388939000001983},{"x":4.988560000000007,"y":-1.5742539000000306},{"x":3.936999999999898,"y":-1.5742539000000306},{"x":3.8099999999999454,"y":-1.5739491000001635}]} />
<silkscreenpath route={[{"x":-4.191000000000031,"y":4.52205089999984},{"x":4.190999999999917,"y":4.52205089999984}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="5.7757461mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-6.500000200000159,"y":5.037544399999888},{"x":6.500000200000159,"y":5.037544399999888},{"x":6.500000200000159,"y":-5.037544400000002},{"x":-6.500000200000159,"y":-5.037544400000002},{"x":-6.500000200000159,"y":5.037544399999888}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0, y: 2.650063499999897, z: 0.05 },
      }}
      {...props}
    />
  )
}