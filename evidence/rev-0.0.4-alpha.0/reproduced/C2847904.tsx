import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["PC13"],
  pin2: ["PC14_OSC32_IN"],
  pin3: ["PC15_OSC32_OUT"],
  pin4: ["VBAT"],
  pin5: ["VREF_POS"],
  pin6: ["VDD","VDDA"],
  pin7: ["VSS","VSSA"],
  pin8: ["PF0_OSC_IN"],
  pin9: ["PF1_OSC_OUT"],
  pin10: ["PF2_NRST"],
  pin11: ["PA0"],
  pin12: ["PA1"],
  pin13: ["PA2"],
  pin14: ["PA3"],
  pin15: ["PA4"],
  pin16: ["PA5"],
  pin17: ["PA6"],
  pin18: ["PA7"],
  pin19: ["PB0"],
  pin20: ["PB1"],
  pin21: ["PB2"],
  pin22: ["PB10"],
  pin23: ["PB11"],
  pin24: ["PB12"],
  pin25: ["PB13"],
  pin26: ["PB14"],
  pin27: ["PB15"],
  pin28: ["PA8"],
  pin29: ["PA9"],
  pin30: ["PC6"],
  pin31: ["PC7"],
  pin32: ["PA10"],
  pin33: ["PA11_PA9_"],
  pin34: ["PA12_PA10_"],
  pin35: ["PA13"],
  pin36: ["PA14_BOOT0"],
  pin37: ["PA15"],
  pin38: ["PD0"],
  pin39: ["PD1"],
  pin40: ["PD2"],
  pin41: ["PD3"],
  pin42: ["PB3"],
  pin43: ["PB4"],
  pin44: ["PB5"],
  pin45: ["PB6"],
  pin46: ["PB7"],
  pin47: ["PB8"],
  pin48: ["PB9"]
} as const

const pinAttributes = {
  pin6: {requiresPower: true}
} as const

export const STM32G0B1CBT6 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2847904"
  ]
}}
      manufacturerPartNumber="STM32G0B1CBT6"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-2.750058mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-2.249932mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-1.75006mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="-1.249934mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="-0.750062mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="-0.249936mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="0.249936mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="0.750062mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="1.249934mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="1.75006mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="2.249932mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="2.750058mm" pcbY="-4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="4.249928mm" pcbY="-2.750058mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="4.249928mm" pcbY="-2.249932mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="4.249928mm" pcbY="-1.75006mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="4.249928mm" pcbY="-1.249934mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="4.249928mm" pcbY="-0.750062mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="4.249928mm" pcbY="-0.249936mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="4.249928mm" pcbY="0.249936mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="4.249928mm" pcbY="0.750062mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin21"]} pcbX="4.249928mm" pcbY="1.249934mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin22"]} pcbX="4.249928mm" pcbY="1.75006mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin23"]} pcbX="4.249928mm" pcbY="2.249932mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin24"]} pcbX="4.249928mm" pcbY="2.750058mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin25"]} pcbX="2.750058mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin26"]} pcbX="2.249932mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin27"]} pcbX="1.75006mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin28"]} pcbX="1.249934mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin29"]} pcbX="0.750062mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin30"]} pcbX="0.249936mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin31"]} pcbX="-0.249936mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin32"]} pcbX="-0.750062mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin33"]} pcbX="-1.249934mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin34"]} pcbX="-1.75006mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin35"]} pcbX="-2.249932mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin36"]} pcbX="-2.750058mm" pcbY="4.249928mm" width="0.270002mm" height="1.499997mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin37"]} pcbX="-4.249928mm" pcbY="2.750058mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin38"]} pcbX="-4.249928mm" pcbY="2.249932mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin39"]} pcbX="-4.249928mm" pcbY="1.75006mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin40"]} pcbX="-4.249928mm" pcbY="1.249934mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin41"]} pcbX="-4.249928mm" pcbY="0.750062mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin42"]} pcbX="-4.249928mm" pcbY="0.249936mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin43"]} pcbX="-4.249928mm" pcbY="-0.249936mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin44"]} pcbX="-4.249928mm" pcbY="-0.750062mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin45"]} pcbX="-4.249928mm" pcbY="-1.249934mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin46"]} pcbX="-4.249928mm" pcbY="-1.75006mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin47"]} pcbX="-4.249928mm" pcbY="-2.249932mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<smtpad portHints={["pin48"]} pcbX="-4.249928mm" pcbY="-2.750058mm" width="1.499997mm" height="0.270002mm" radius="0.135001mm" shape="pill" />
<silkscreenpath route={[{"x":-2.8955999999999733,"y":3.3400999999999925},{"x":3.302000000000021,"y":3.3400999999999925},{"x":3.302000000000021,"y":-3.314700000000002},{"x":-3.327399999999983,"y":-3.314700000000002},{"x":-3.327399999999983,"y":3.3400999999999925},{"x":-2.5653999999999826,"y":3.3400999999999925}]} />
<silkscreenpath route={[{"x":-3.3899855999999886,"y":-4.059986800000004},{"x":-3.5791606142161356,"y":-4.198904249194129},{"x":-3.506066828896735,"y":-4.421934610898454},{"x":-3.2713643711032603,"y":-4.421934610898454},{"x":-3.1982705857838596,"y":-4.198904249194129},{"x":-3.3874456000000066,"y":-4.059986800000004}]} />
<silkscreencircle pcbX="-2.62001mm" pcbY="-2.830068mm" radius="0.170434mm" />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="5.8641mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.249926499999987,"y":5.249926499999994},{"x":5.249926500000015,"y":5.249926499999994},{"x":5.249926500000015,"y":-5.249926499999994},{"x":-5.249926499999987,"y":-5.249926499999994},{"x":-5.249926499999987,"y":5.249926499999994}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2847904.obj?uuid=a4b96ad857dc48c08dab3d0efdf20aec",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2847904.step?uuid=a4b96ad857dc48c08dab3d0efdf20aec",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0.000795 },
      }}
      {...props}
    />
  )
}