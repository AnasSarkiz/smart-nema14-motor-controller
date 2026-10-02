import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["OB2"],
  pin2: ["ENN"],
  pin3: ["GND2"],
  pin4: ["CPO"],
  pin5: ["CPI"],
  pin6: ["VCP"],
  pin7: ["SPREAD"],
  pin8: ["5VOUT"],
  pin9: ["MS1_AD0"],
  pin10: ["MS2_AD1"],
  pin11: ["DIAG"],
  pin12: ["INDEX"],
  pin13: ["CLK"],
  pin14: ["PDN_UART"],
  pin15: ["VCC_IO"],
  pin16: ["STEP"],
  pin17: ["VREF"],
  pin18: ["GND1"],
  pin19: ["DIR"],
  pin20: ["STDBY"],
  pin21: ["OA2"],
  pin22: ["VS2"],
  pin23: ["BRA"],
  pin24: ["OA1"],
  pin25: ["_NEG"],
  pin26: ["OB1"],
  pin27: ["BRB"],
  pin28: ["VS1"],
  pin29: ["EP"]
} as const

const pinAttributes = {
  pin3: {requiresGround: true},
  pin18: {requiresGround: true}
} as const

export const TMC2209_LA = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C465949"
  ]
}}
      manufacturerPartNumber="TMC2209-LA"
      footprint={<footprint>
        <smtpad portHints={["pin29"]} pcbX="-0.000127mm" pcbY="-0.000127mm" width="3.499993mm" height="3.499993mm" shape="rect" />
<smtpad portHints={["pin28"]} pcbX="-2.499995mm" pcbY="-1.501267mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin27"]} pcbX="-2.499995mm" pcbY="-1.000887mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin26"]} pcbX="-2.499995mm" pcbY="-0.500507mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin25"]} pcbX="-2.499995mm" pcbY="-0.000127mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin24"]} pcbX="-2.499995mm" pcbY="0.500253mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin23"]} pcbX="-2.499995mm" pcbY="1.000633mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin22"]} pcbX="-2.499995mm" pcbY="1.501013mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin21"]} pcbX="-1.501267mm" pcbY="2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="-1.000887mm" pcbY="2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="-0.500507mm" pcbY="2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="-0.000127mm" pcbY="2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="0.500253mm" pcbY="2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="1.000633mm" pcbY="2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="1.501013mm" pcbY="2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="2.499995mm" pcbY="1.501013mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="2.499995mm" pcbY="1.000633mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="2.499995mm" pcbY="0.500253mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="2.499995mm" pcbY="-0.000127mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="2.499995mm" pcbY="-0.500507mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="2.499995mm" pcbY="-1.000887mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="2.499995mm" pcbY="-1.501267mm" width="0.8999982mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="1.501013mm" pcbY="-2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="1.000633mm" pcbY="-2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="0.500253mm" pcbY="-2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="-0.000127mm" pcbY="-2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-0.500507mm" pcbY="-2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-1.000887mm" pcbY="-2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin1"]} pcbX="-1.501267mm" pcbY="-2.499995mm" width="0.2800096mm" height="0.8999982mm" radius="0.1400048mm" shape="pill" />
<silkscreenpath route={[{"x":-2.0001991999999973,"y":-2.6500328000000053},{"x":-2.6501851999999957,"y":-2.6500328000000053},{"x":-2.6501851999999957,"y":-2.000046800000007}]} />
<silkscreenpath route={[{"x":-2.0001991999999973,"y":2.6499311999999975},{"x":-2.6501851999999957,"y":2.6499311999999975},{"x":-2.6501851999999957,"y":1.999945199999992}]} />
<silkscreenpath route={[{"x":2.649778800000007,"y":1.999945199999992},{"x":2.649778800000007,"y":2.6499311999999975},{"x":1.9997927999999945,"y":2.6499311999999975}]} />
<silkscreenpath route={[{"x":1.9997927999999945,"y":-2.6500328000000053},{"x":2.649778800000007,"y":-2.6500328000000053},{"x":2.649778800000007,"y":-2.000046800000007}]} />
<silkscreenpath route={[{"x":-2.451303199999991,"y":-2.9997908000000137},{"x":-2.600044255997652,"y":-3.150432829703931},{"x":-2.450033199999993,"y":-3.299810224014749},{"x":-2.300022144002334,"y":-3.150432829703931},{"x":-2.448763199999995,"y":-2.9997908000000137}]} />
<silkscreentext text="{NAME}" pcbX="-0.009271mm" pcbY="3.955671mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-3.199994099999998,"y":3.199994099999998},{"x":3.199994099999998,"y":3.199994099999998},{"x":3.199994099999998,"y":-3.199994100000005},{"x":-3.199994099999998,"y":-3.199994100000005},{"x":-3.199994099999998,"y":3.199994099999998}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C465949.obj?uuid=ae12e1b5ea7a411e8a6f7d8e9f5ed919",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C465949.step?uuid=ae12e1b5ea7a411e8a6f7d8e9f5ed919",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.00006349999998889189, y: -0.00006349999999599731, z: -0.02 },
      }}
      {...props}
    />
  )
}