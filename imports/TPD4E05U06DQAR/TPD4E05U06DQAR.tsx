import objPath from "./TPD4E05U06DQAR.obj"
import stepPath from "./TPD4E05U06DQAR.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["D1_POS"],
  pin2: ["D1_NEG"],
  pin3: ["GND2"],
  pin4: ["D2_POS"],
  pin5: ["D2_NEG"],
  pin6: ["NC1"],
  pin7: ["NC2"],
  pin8: ["GND1"],
  pin9: ["NC3"],
  pin10: ["NC4"]
} as const

const pinAttributes = {
  pin3: {requiresGround: true},
  pin6: {doNotConnect: true},
  pin7: {doNotConnect: true},
  pin8: {requiresGround: true},
  pin9: {doNotConnect: true},
  pin10: {doNotConnect: true}
} as const

export const TPD4E05U06DQAR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C138714"
  ]
}}
      manufacturerPartNumber="TPD4E05U06DQAR"
      footprint={<footprint>
        <smtpad portHints={["pin6"]} pcbX="0.999998mm" pcbY="0.3999992mm" width="0.1999996mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="0.500126mm" pcbY="0.3999992mm" width="0.1999996mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="0mm" pcbY="0.3999992mm" width="0.3999992mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-0.499872mm" pcbY="0.3999992mm" width="0.1999996mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-0.999998mm" pcbY="0.3999992mm" width="0.1999996mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.999998mm" pcbY="-0.3999992mm" width="0.1999996mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.500126mm" pcbY="-0.3999992mm" width="0.1999996mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0mm" pcbY="-0.3999992mm" width="0.3999992mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.499872mm" pcbY="-0.3999992mm" width="0.1999996mm" height="0.5649976mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-0.999998mm" pcbY="-0.3999992mm" width="0.1999996mm" height="0.5649976mm" shape="rect" />
<silkscreenpath route={[{"x":-1.3261847999999645,"y":-0.5762243999998873},{"x":-1.3261847999999645,"y":0.576224400000001}]} />
<silkscreenpath route={[{"x":1.3261848000000782,"y":0.576224400000001},{"x":1.3261848000000782,"y":-0.5762243999998873}]} />
<silkscreencircle pcbX="-0.999998mm" pcbY="-1.019048mm" radius="0.100076mm" />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="1.6858mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.4999848000001066,"y":0.9324980000000096},{"x":1.5000102000000197,"y":0.9324980000000096},{"x":1.5000102000000197,"y":-0.9324979999998959},{"x":-1.4999848000001066,"y":-0.9324979999998959},{"x":-1.4999848000001066,"y":0.9324980000000096}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012700000070253736, y: 0.000012699999956566899, z: 0 },
      }}
      {...props}
    />
  )
}