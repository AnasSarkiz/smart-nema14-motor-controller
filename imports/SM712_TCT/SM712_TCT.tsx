import objPath from "./SM712_TCT.obj"
import stepPath from "./SM712_TCT.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["A11"],
  pin2: ["A12"],
  pin3: ["K"]
} as const

export const SM712_TCT = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin1" pinNumber={1} aliases={["A11"]} direction="left" schX={-0.7} schY={0.4} schStemLength={0.3} />
          <port name="pin3" pinNumber={3} aliases={["K"]} direction="right" schX={0.7} schY={0} schStemLength={0.3} />
          <schematicpath svgPath="M -0.1 0.28 L 0.1 0.4 L -0.1 0.54 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0.14,"y":0.54},{"x":0.1,"y":0.54},{"x":0.1,"y":0.24},{"x":0.04,"y":0.24}]} strokeColor="#880000" />
          <schematicpath svgPath="M -0.22 0.52 L -0.42 0.4 L -0.22 0.26 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":-0.46,"y":0.26},{"x":-0.42,"y":0.26},{"x":-0.42,"y":0.56},{"x":-0.36,"y":0.56}]} strokeColor="#880000" />
          <schematicpath svgPath="M -0.1 -0.52 L 0.1 -0.4 L -0.1 -0.26 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0.14,"y":-0.26},{"x":0.1,"y":-0.26},{"x":0.1,"y":-0.56},{"x":0.04,"y":-0.56}]} strokeColor="#880000" />
          <schematicpath svgPath="M -0.22 -0.28 L -0.42 -0.4 L -0.22 -0.54 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":-0.46,"y":-0.54},{"x":-0.42,"y":-0.54},{"x":-0.42,"y":-0.24},{"x":-0.36,"y":-0.24}]} strokeColor="#880000" />
          <port name="pin2" pinNumber={2} aliases={["A12"]} direction="left" schX={-0.7} schY={-0.4} schStemLength={0.3} />
          <schematicpath points={[{"x":0.1,"y":0.4},{"x":0.4,"y":0.4},{"x":0.4,"y":-0.4},{"x":0.1,"y":-0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.22,"y":0.4},{"x":-0.1,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.22,"y":-0.4},{"x":-0.1,"y":-0.4}]} strokeColor="#880000" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C12067"
  ]
}}
      manufacturerPartNumber="SM712.TCT"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="1.101344mm" pcbY="-0.94996mm" width="1.0374884mm" height="0.532003mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="1.101344mm" pcbY="0.94996mm" width="1.0374884mm" height="0.532003mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-1.101344mm" pcbY="0mm" width="1.0374884mm" height="0.532003mm" shape="rect" />
<silkscreenpath route={[{"x":0.8586978000000727,"y":1.5262098000000606},{"x":-0.8586978000000727,"y":1.5262098000000606},{"x":-0.8586978000000727,"y":0.49458879999997407}]} />
<silkscreenpath route={[{"x":0.8586978000000727,"y":-1.5262097999999469},{"x":-0.8586978000000727,"y":-1.5262097999999469},{"x":-0.8586978000000727,"y":-0.49458879999997407}]} />
<silkscreenpath route={[{"x":0.8586978000000727,"y":0.45539659999997184},{"x":0.8586978000000727,"y":-0.45539659999985815}]} />
<silkscreentext text="{NAME}" pcbX="0.0635mm" pcbY="2.524mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.8700882000000547,"y":1.700009800000089},{"x":1.870088199999941,"y":1.700009800000089},{"x":1.870088199999941,"y":-1.6999843999999484},{"x":-1.8700882000000547,"y":-1.6999843999999484},{"x":-1.8700882000000547,"y":1.700009800000089}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.000012700000070253736, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}