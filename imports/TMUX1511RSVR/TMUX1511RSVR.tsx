import objPath from "./TMUX1511RSVR.obj"
import stepPath from "./TMUX1511RSVR.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["SEL1"],
  pin2: ["S1"],
  pin3: ["D1"],
  pin4: ["SEL2"],
  pin5: ["S2"],
  pin6: ["D2"],
  pin7: ["N_C_1"],
  pin8: ["GND"],
  pin9: ["D3"],
  pin10: ["S3"],
  pin11: ["SEL3"],
  pin12: ["N_C_2"],
  pin13: ["D4"],
  pin14: ["S4"],
  pin15: ["SEL4"],
  pin16: ["VDD"]
} as const

const pinAttributes = {
  pin8: {requiresGround: true},
  pin16: {requiresPower: true}
} as const

export const TMUX1511RSVR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2673275"
  ]
}}
      manufacturerPartNumber="TMUX1511RSVR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.600202mm" pcbY="-0.7679944mm" width="0.2100072mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.200152mm" pcbY="-0.7679944mm" width="0.2100072mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.199644mm" pcbY="-0.7679944mm" width="0.2100072mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.599694mm" pcbY="-0.7679944mm" width="0.2100072mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="1.231646mm" pcbY="-0.599948mm" width="0.6649974mm" height="0.2100072mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="1.232154mm" pcbY="-0.199898mm" width="0.6649974mm" height="0.2100072mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="1.232154mm" pcbY="0.199898mm" width="0.6649974mm" height="0.2100072mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="1.232154mm" pcbY="0.599948mm" width="0.6649974mm" height="0.2100072mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="0.599694mm" pcbY="0.7679944mm" width="0.2100072mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="0.199644mm" pcbY="0.7679944mm" width="0.2100072mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="-0.200152mm" pcbY="0.7679944mm" width="0.2100072mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-0.600202mm" pcbY="0.7679944mm" width="0.2100072mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="-1.232154mm" pcbY="0.599948mm" width="0.6649974mm" height="0.2100072mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="-1.232154mm" pcbY="0.199898mm" width="0.6649974mm" height="0.2100072mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="-1.232154mm" pcbY="-0.199898mm" width="0.6649974mm" height="0.2100072mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="-1.232154mm" pcbY="-0.599948mm" width="0.6649974mm" height="0.2100072mm" shape="rect" />
<silkscreenpath route={[{"x":-0.9043416000000661,"y":-0.8999981999999136},{"x":-1.2999973999998247,"y":-0.8999981999999136}]} />
<silkscreenpath route={[{"x":1.299997400000052,"y":-0.8999981999999136},{"x":0.9038335999999845,"y":-0.8999981999999136}]} />
<silkscreenpath route={[{"x":-0.9043416000000661,"y":0.8999982000000273},{"x":-1.2999973999998247,"y":0.8999982000000273}]} />
<silkscreenpath route={[{"x":1.299997400000052,"y":0.8999982000000273},{"x":0.9038335999999845,"y":0.8999982000000273}]} />
<silkscreencircle pcbX="-0.610108mm" pcbY="-1.310132mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="-0.012954mm" pcbY="2.0922mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.8146526999998969,"y":1.3504930999999942},{"x":1.8146526999998969,"y":1.3504930999999942},{"x":1.8146526999998969,"y":-1.3504930999999942},{"x":-1.8146526999998969,"y":-1.3504930999999942},{"x":-1.8146526999998969,"y":1.3504930999999942}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0.000012699999842880061, z: -0.01 },
      }}
      {...props}
    />
  )
}