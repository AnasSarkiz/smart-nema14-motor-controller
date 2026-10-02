import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"]
} as const

export const ESDA25P35_1U1M = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":-0.2,"y":0.14},{"x":-0.2,"y":-0.14}]} strokeColor="#880000" />
          <schematicpath svgPath="M 0 0.12 L -0.2 0 L 0 -0.14 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.5} schY={0} schStemLength={0.3} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.3} schY={0} schStemLength={0.3} />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C1974707"
  ]
}}
      manufacturerPartNumber="ESDA25P35-1U1M"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="0.524891mm" pcbY="0mm" width="0.5999988mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-0.524891mm" pcbY="0mm" width="0.5999988mm" height="0.8999982mm" shape="rect" />
<silkscreenpath route={[{"x":1.1500103999999283,"y":0.6999223999999913},{"x":1.1500103999999283,"y":-0.7000747999999248}]} />
<silkscreenpath route={[{"x":-1.3999972000001435,"y":0.6999223999999913},{"x":1.1500103999999283,"y":0.6999223999999913}]} />
<silkscreenpath route={[{"x":-1.3999972000001435,"y":-0.7000747999999248},{"x":1.1500103999999283,"y":-0.7000747999999248}]} />
<silkscreenpath route={[{"x":-1.1500104000001556,"y":0.6999223999999913},{"x":-1.1500104000001556,"y":-0.7000747999999248}]} />
<silkscreenpath route={[{"x":-1.3999972000001435,"y":0.6999223999999913},{"x":-1.3999972000001435,"y":-0.7000747999999248}]} />
<silkscreentext text="{NAME}" pcbX="-0.127635mm" pcbY="1.688848mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":0.5999987999999803,"y":-0.200075800000036},{"x":0.5999987999999803,"y":0.2999231999999665},{"x":0.6999985999998444,"y":0.2999231999999665},{"x":0.6999985999998444,"y":-0.200075800000036},{"x":0.5999987999999803,"y":-0.200075800000036}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.3998975999999175,"y":0.0999235999998973},{"x":0.89989659999992,"y":0.0999235999998973},{"x":0.89989659999992,"y":-0.00007619999996677507},{"x":0.3998975999999175,"y":-0.00007619999996677507},{"x":0.3998975999999175,"y":0.0999235999998973}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-0.7999984000000495,"y":0.0999235999998973},{"x":-0.299999400000047,"y":0.0999235999998973},{"x":-0.299999400000047,"y":-0.00007619999996677507},{"x":-0.7999984000000495,"y":-0.00007619999996677507},{"x":-0.7999984000000495,"y":0.0999235999998973}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-1.074890400000072,"y":0.7499227999999221},{"x":1.074890400000072,"y":0.7499227999999221},{"x":1.074890400000072,"y":-0.7500751999999693},{"x":-1.074890400000072,"y":-0.7500751999999693},{"x":-1.074890400000072,"y":0.7499227999999221}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C1974707.obj?uuid=f410d8974c0443bc9ff656f954d8e306",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C1974707.step?uuid=f410d8974c0443bc9ff656f954d8e306",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0.0000762000000804619, z: -0.02 },
      }}
      {...props}
    />
  )
}