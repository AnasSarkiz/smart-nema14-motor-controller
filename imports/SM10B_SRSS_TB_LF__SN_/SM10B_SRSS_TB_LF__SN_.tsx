import objPath from "./SM10B_SRSS_TB_LF__SN_.obj"
import stepPath from "./SM10B_SRSS_TB_LF__SN_.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"],
  pin7: ["pin7"],
  pin8: ["pin8"],
  pin9: ["pin9"],
  pin10: ["pin10"],
  pin11: ["pin11"],
  pin12: ["pin12"]
} as const

export const SM10B_SRSS_TB_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C160409"
  ]
}}
      manufacturerPartNumber="SM10B-SRSS-TB(LF)(SN)"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="-3.499993mm" pcbY="1.96276595mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-4.499991mm" pcbY="1.96276595mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="4.500245mm" pcbY="1.96225795mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="3.500247mm" pcbY="1.96225795mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="2.500249mm" pcbY="1.96225795mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="1.500251mm" pcbY="1.96225795mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="0.500253mm" pcbY="1.96225795mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-0.499745mm" pcbY="1.96225795mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-1.499743mm" pcbY="1.96225795mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-2.499741mm" pcbY="1.96225795mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-5.800217mm" pcbY="-1.91276605mm" width="1.1999976mm" height="1.7999964mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="5.800217mm" pcbY="-1.91276605mm" width="1.1999976mm" height="1.7999964mm" shape="rect" />
<silkscreenpath route={[{"x":5.031384400000093,"y":1.6549941499999932},{"x":6.139992800000073,"y":1.6549941499999932},{"x":6.139992800000073,"y":-0.7816024500000367}]} />
<silkscreenpath route={[{"x":-6.1999875999997585,"y":-0.8850058499999705},{"x":-6.1999875999997585,"y":1.6549941499999932},{"x":-5.031130399999938,"y":1.6549941499999932}]} />
<silkscreenpath route={[{"x":5.107914600000186,"y":-3.023000050000064},{"x":-5.107990799999925,"y":-3.023000050000064}]} />
<silkscreencircle pcbX="-5.499735mm" pcbY="1.33716395mm" radius="0.124968mm" />
<silkscreentext text="{NAME}" pcbX="0.005207mm" pcbY="3.80096595mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-6.650215799999842,"y":3.0627642499999865},{"x":6.650215799999955,"y":3.0627642499999865},{"x":6.650215799999955,"y":-3.0627642499999865},{"x":-6.650215799999842,"y":-3.0627642499999865},{"x":-6.650215799999842,"y":3.0627642499999865}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000012699999956566899, y: 0.5129918499999349, z: -0.01 },
      }}
      {...props}
    />
  )
}