import objPath from "./S4B_PH_SM4_K_TB_LF__SN_.obj"
import stepPath from "./S4B_PH_SM4_K_TB_LF__SN_.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"]
} as const

export const S4B_PH_SM4_K_TB_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C265332"
  ]
}}
      manufacturerPartNumber="S4B-PH-SM4-K-TB(LF)(SN)"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="3.002026mm" pcbY="-3.2503745mm" width="0.999998mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.999998mm" pcbY="-3.2503745mm" width="0.999998mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.999998mm" pcbY="-3.2503745mm" width="0.999998mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-2.999994mm" pcbY="-3.2503745mm" width="0.999998mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-5.40004mm" pcbY="2.7503755mm" width="1.999996mm" height="3.999992mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="5.40004mm" pcbY="2.7503755mm" width="1.999996mm" height="3.999992mm" shape="rect" />
<silkscreenpath route={[{"x":-3.7077396000001954,"y":-1.6496411000000535},{"x":-5.001260000000002,"y":-1.6496411000000535},{"x":-5.001260000000002,"y":-1.6486505000001443}]} />
<silkscreenpath route={[{"x":6.000013399999943,"y":-1.6496411000000535},{"x":3.70977159999984,"y":-1.6496411000000535}]} />
<silkscreenpath route={[{"x":3.9999919999999065,"y":-1.6496157000001404},{"x":4.5000164000000495,"y":-0.7496175000001131},{"x":5.000015399999938,"y":-1.6496411000000535}]} />
<silkscreenpath route={[{"x":-5.001260000000002,"y":-1.6486505000001443},{"x":-5.001260000000002,"y":-3.248850500000117}]} />
<silkscreenpath route={[{"x":-4.999990000000025,"y":-3.2496125000001257},{"x":-5.998209999999972,"y":-3.2496125000001257},{"x":-5.998209999999972,"y":-1.6494125000000395}]} />
<silkscreenpath route={[{"x":6.000013399999943,"y":-3.2496125000001257},{"x":5.000015399999938,"y":-3.2496125000001257},{"x":5.000015399999938,"y":-1.6496157000001404}]} />
<silkscreenpath route={[{"x":6.000013399999943,"y":-1.6496157000001404},{"x":6.000013399999943,"y":-3.2496125000001257}]} />
<silkscreenpath route={[{"x":-5.998209999999972,"y":-1.6494125000000395},{"x":-5.99998800000003,"y":-1.6494125000000395},{"x":-5.99998800000003,"y":0.5192394999999124}]} />
<silkscreenpath route={[{"x":6.000013399999943,"y":-1.6496411000000535},{"x":5.999987999999917,"y":-1.6496411000000535},{"x":5.999987999999917,"y":0.5192394999999124}]} />
<silkscreenpath route={[{"x":-4.168902000000003,"y":4.350372300000004},{"x":4.168901999999889,"y":4.350372300000004}]} />
<silkscreencircle pcbX="4.0599868mm" pcbY="-2.4203787mm" radius="0.1500124mm" />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="5.7419895mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-6.650038000000222,"y":5.000371500000028},{"x":6.650038000000109,"y":5.000371500000028},{"x":6.650038000000109,"y":-5.000371500000028},{"x":-6.650038000000222,"y":-5.000371500000028},{"x":-6.650038000000222,"y":5.000371500000028}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0, y: 2.6236220999999436, z: 0.05 },
      }}
      {...props}
    />
  )
}