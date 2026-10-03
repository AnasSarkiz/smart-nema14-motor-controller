import objPath from "./TPS26600RHFT.obj"
import stepPath from "./TPS26600RHFT.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["N_C1"],
  pin2: ["N_C2"],
  pin3: ["N_C3"],
  pin4: ["N_C4"],
  pin5: ["N_C5"],
  pin6: ["N_C6"],
  pin7: ["N_C7"],
  pin8: ["IN1"],
  pin9: ["IN2"],
  pin10: ["UVLO"],
  pin11: ["N_C8"],
  pin12: ["OVP"],
  pin13: ["MODE"],
  pin14: ["N_SHDN"],
  pin15: ["RTN"],
  pin16: ["N_C9"],
  pin17: ["GND"],
  pin18: ["IMON"],
  pin19: ["ILIM"],
  pin20: ["dVdT"],
  pin21: ["N_C10"],
  pin22: ["N_FLT"],
  pin23: ["OUT1"],
  pin24: ["OUT2"],
  pin25: ["EP"]
} as const

const pinAttributes = {
  pin17: {requiresGround: true}
} as const

export const TPS26600RHFT = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C181406"
  ]
}}
      manufacturerPartNumber="TPS26600RHFT"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.49987mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.999998mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.499872mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.500126mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="0.999998mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="1.500124mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="2.407412mm" pcbY="-0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="2.407412mm" pcbY="-0.500126mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="2.407412mm" pcbY="0mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="2.407412mm" pcbY="0.499872mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="2.407412mm" pcbY="0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="1.500124mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="0.999998mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="0.500126mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="0mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="-0.499872mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="-0.999998mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="-1.49987mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="-2.407412mm" pcbY="0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin21"]} pcbX="-2.407412mm" pcbY="0.499872mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin22"]} pcbX="-2.407412mm" pcbY="0mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin23"]} pcbX="-2.407412mm" pcbY="-0.500126mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin24"]} pcbX="-2.407412mm" pcbY="-0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin25"]} pcbX="0mm" pcbY="0mm" width="2.999994mm" height="1.999996mm" shape="rect" />
<silkscreenpath route={[{"x":-2.5761949999999842,"y":1.3305027999999766},{"x":-2.5761949999999842,"y":2.0761959999999817},{"x":-1.8305018000000928,"y":2.0761959999999817}]} />
<silkscreenpath route={[{"x":2.5761949999999842,"y":1.3305027999999766},{"x":2.5761949999999842,"y":2.0761959999999817},{"x":1.8305018000000928,"y":2.0761959999999817}]} />
<silkscreenpath route={[{"x":-2.5761949999999842,"y":-1.3305027999999766},{"x":-2.5761949999999842,"y":-2.076195999999868},{"x":-1.8305018000000928,"y":-2.076195999999868}]} />
<silkscreenpath route={[{"x":2.5761949999999842,"y":-1.3305027999999766},{"x":2.5761949999999842,"y":-2.076195999999868},{"x":1.8305018000000928,"y":-2.076195999999868}]} />
<silkscreencircle pcbX="-1.49987mm" pcbY="-2.54mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="3.2352mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.989910699999996,"y":2.4900387000000137},{"x":2.989910699999882,"y":2.4900387000000137},{"x":2.989910699999882,"y":-2.4900387000000137},{"x":-2.989910699999996,"y":-2.4900387000000137},{"x":-2.989910699999996,"y":2.4900387000000137}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.02 },
      }}
      {...props}
    />
  )
}