import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["N_C10"],
  pin2: ["N_C9"],
  pin3: ["N_C8"],
  pin4: ["N_C7"],
  pin5: ["N_C6"],
  pin6: ["N_C5"],
  pin7: ["N_C4"],
  pin8: ["IN2"],
  pin9: ["IN1"],
  pin10: ["UVLO"],
  pin11: ["N_C3"],
  pin12: ["OVP"],
  pin13: ["MODE"],
  pin14: ["N_SHDN"],
  pin15: ["RTN"],
  pin16: ["N_C2"],
  pin17: ["GND"],
  pin18: ["IMON"],
  pin19: ["ILIM"],
  pin20: ["dVdT"],
  pin21: ["N_C1"],
  pin22: ["N_FLT"],
  pin23: ["OUT2"],
  pin24: ["OUT1"],
  pin25: ["EP"]
} as const

const pinAttributes = {
  pin17: {requiresGround: true}
} as const

export const TPS26600RHFR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2155767"
  ]
}}
      manufacturerPartNumber="TPS26600RHFR"
      footprint={<footprint>
        <smtpad portHints={["pin25"]} pcbX="0.000127mm" pcbY="0mm" width="3.6500054mm" height="2.6500074mm" shape="rect" />
<smtpad portHints={["pin24"]} pcbX="-2.407539mm" pcbY="-0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin23"]} pcbX="-2.407539mm" pcbY="-0.500126mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin22"]} pcbX="-2.407539mm" pcbY="0mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin21"]} pcbX="-2.407539mm" pcbY="0.499872mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="-2.407539mm" pcbY="0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="-1.499997mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="-0.999871mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="-0.499999mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="0.000127mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="0.499999mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="1.000125mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="1.499997mm" pcbY="1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="2.407539mm" pcbY="0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="2.407539mm" pcbY="0.499872mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="2.407539mm" pcbY="0mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="2.407539mm" pcbY="-0.500126mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="2.407539mm" pcbY="-0.999998mm" width="0.6649974mm" height="0.2800096mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="1.499997mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="1.000125mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.499999mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.000127mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.499999mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.999871mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-1.499997mm" pcbY="-1.90754mm" width="0.2800096mm" height="0.6649974mm" shape="rect" />
<silkscreenpath route={[{"x":-2.5761949999999842,"y":1.3304520000000366},{"x":-2.5761949999999842,"y":2.0761452000000418},{"x":-1.8305017999998654,"y":2.0761452000000418}]} />
<silkscreenpath route={[{"x":2.576245800000038,"y":1.3304520000000366},{"x":2.576245800000038,"y":2.0761452000000418},{"x":1.8305526000001464,"y":2.0761452000000418}]} />
<silkscreenpath route={[{"x":-2.5761949999999842,"y":-1.3306043999999702},{"x":-2.5761949999999842,"y":-2.0762975999999753},{"x":-1.8305017999998654,"y":-2.0762975999999753}]} />
<silkscreenpath route={[{"x":2.576245800000038,"y":-1.3306043999999702},{"x":2.576245800000038,"y":-2.0762975999999753},{"x":1.8305526000001464,"y":-2.0762975999999753}]} />
<silkscreencircle pcbX="-1.499743mm" pcbY="-2.54mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="0.014605mm" pcbY="3.244852mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.978594999999814,"y":2.494852000000037},{"x":3.007805000000076,"y":2.494852000000037},{"x":3.007805000000076,"y":-2.856547999999975},{"x":-2.978594999999814,"y":-2.856547999999975},{"x":-2.978594999999814,"y":2.494852000000037}]} />
      </footprint>}
      
      {...props}
    />
  )
}