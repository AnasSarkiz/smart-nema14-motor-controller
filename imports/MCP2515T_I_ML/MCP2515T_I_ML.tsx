import objPath from "./MCP2515T_I_ML.obj"
import stepPath from "./MCP2515T_I_ML.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["CLKOUT"],
  pin2: ["N_TX0RTS"],
  pin3: ["N_TX1RTS"],
  pin4: ["NC1"],
  pin5: ["N_TX2RTS"],
  pin6: ["OSC2"],
  pin7: ["OSC1"],
  pin8: ["GND"],
  pin9: ["N_RX1BF"],
  pin10: ["N_RX0BF"],
  pin11: ["N_INT"],
  pin12: ["SCK"],
  pin13: ["NC2"],
  pin14: ["SI"],
  pin15: ["SO"],
  pin16: ["N_CS"],
  pin17: ["N_RESET"],
  pin18: ["VDD"],
  pin19: ["TXCAN"],
  pin20: ["RXCAN"],
  pin21: ["EP"]
} as const

const pinAttributes = {
  pin4: {doNotConnect: true},
  pin8: {requiresGround: true},
  pin13: {doNotConnect: true},
  pin18: {requiresPower: true}
} as const

export const MCP2515T_I_ML = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C96140"
  ]
}}
      manufacturerPartNumber="MCP2515T-I/ML"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.90754mm" pcbY="0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-1.90754mm" pcbY="0.499872mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-1.90754mm" pcbY="0mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-1.90754mm" pcbY="-0.500126mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-1.90754mm" pcbY="-0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-0.999998mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-0.499872mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="0mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="0.500126mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="0.999998mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="1.90754mm" pcbY="-0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="1.90754mm" pcbY="-0.500126mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="1.90754mm" pcbY="0mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="1.90754mm" pcbY="0.499872mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="1.90754mm" pcbY="0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="0.999998mm" pcbY="1.90754mm" width="0.279908mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="0.500126mm" pcbY="1.90754mm" width="0.279908mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="0mm" pcbY="1.90754mm" width="0.279908mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="-0.499872mm" pcbY="1.90754mm" width="0.279908mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="-0.999998mm" pcbY="1.90754mm" width="0.279908mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin21"]} pcbX="0mm" pcbY="0mm" width="2.6999946mm" height="2.6999946mm" shape="rect" />
<silkscreenpath route={[{"x":1.3305027999998629,"y":2.0761959999999817},{"x":2.0761959999999817,"y":2.0761959999999817},{"x":2.0761959999999817,"y":1.3305027999999766}]} />
<silkscreenpath route={[{"x":1.3305027999998629,"y":-2.076195999999868},{"x":2.0761959999999817,"y":-2.076195999999868},{"x":2.0761959999999817,"y":-1.3305027999999766}]} />
<silkscreenpath route={[{"x":-1.3305027999999766,"y":2.0761959999999817},{"x":-2.0761960000000954,"y":2.0761959999999817},{"x":-2.0761960000000954,"y":1.3305027999999766}]} />
<silkscreenpath route={[{"x":-1.3305027999999766,"y":-2.076195999999868},{"x":-2.0761960000000954,"y":-2.076195999999868},{"x":-2.0761960000000954,"y":-1.3305027999999766}]} />
<silkscreencircle pcbX="-2.413mm" pcbY="1.905mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="-0.127mm" pcbY="3.2352mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.4900387000001274,"y":2.4900387000000137},{"x":2.4900387000001274,"y":2.4900387000000137},{"x":2.4900387000001274,"y":-2.4900387000000137},{"x":-2.4900387000001274,"y":-2.4900387000000137},{"x":-2.4900387000001274,"y":2.4900387000000137}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012699999842880061, y: 0.000012699999842880061, z: 0.01 },
      }}
      {...props}
    />
  )
}