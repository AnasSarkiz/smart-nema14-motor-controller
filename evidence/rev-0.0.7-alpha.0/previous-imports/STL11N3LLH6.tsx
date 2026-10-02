import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["S1"],
  pin2: ["S2"],
  pin3: ["S3"],
  pin4: ["G"],
  pin5: ["D4"],
  pin6: ["D3"],
  pin7: ["D2"],
  pin8: ["D1"],
  pin9: ["D5"]
} as const

export const STL11N3LLH6 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":0,"y":0},{"x":0.12,"y":-0.04},{"x":0.12,"y":0.04},{"x":0,"y":0}]} strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0.4,"y":0.04},{"x":0.34,"y":-0.06},{"x":0.46,"y":-0.06},{"x":0.4,"y":0.04}]} strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0,"y":0.14},{"x":0.2,"y":0.14},{"x":0.2,"y":0.2},{"x":0.4,"y":0.2},{"x":0.4,"y":0.04}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":0},{"x":0.2,"y":0},{"x":0.2,"y":-0.2},{"x":0.4,"y":-0.2},{"x":0.4,"y":-0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":-0.14},{"x":0,"y":-0.14}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":0.18},{"x":-0.04,"y":-0.18}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":0.18},{"x":0,"y":0.1}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.04},{"x":0,"y":0.04}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.18},{"x":0,"y":-0.1}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":0},{"x":-0.04,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.48,"y":0.04},{"x":0.44,"y":0.04},{"x":0.36,"y":0.04},{"x":0.32,"y":0.04}]} strokeColor="#880000" />
          <port name="pin5" pinNumber={5} aliases={["D4"]} direction="up" schX={0.2} schY={0.4} schStemLength={0.2} />
          <port name="pin4" pinNumber={4} aliases={["G"]} direction="left" schX={-0.3} schY={0} schStemLength={0.2} />
          <port name="pin1" pinNumber={1} aliases={["S1"]} direction="down" schX={0.2} schY={-0.4} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["S2"]} direction="down" schX={0.2} schY={-0.4} schStemLength={0.2} />
          <port name="pin3" pinNumber={3} aliases={["S3"]} direction="down" schX={0.2} schY={-0.4} schStemLength={0.2} />
          <port name="pin6" pinNumber={6} aliases={["D3"]} direction="up" schX={0.2} schY={0.4} schStemLength={0.2} />
          <port name="pin7" pinNumber={7} aliases={["D2"]} direction="up" schX={0.2} schY={0.4} schStemLength={0.2} />
          <port name="pin8" pinNumber={8} aliases={["D1"]} direction="up" schX={0.2} schY={0.4} schStemLength={0.2} />
          <port name="pin9" pinNumber={9} aliases={["D5"]} direction="up" schX={0.2} schY={0.4} schStemLength={0.2} />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C2965326"
  ]
}}
      manufacturerPartNumber="STL11N3LLH6"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.970534mm" pcbY="-1.599946mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.32004mm" pcbY="-1.599946mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.329692mm" pcbY="-1.599946mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.979678mm" pcbY="-1.599946mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-0.970534mm" pcbY="1.599946mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-0.320294mm" pcbY="1.599946mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="0.329692mm" pcbY="1.599946mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.979678mm" pcbY="1.599946mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="0mm" pcbY="0.350012mm" width="2.5999948mm" height="1.999996mm" shape="rect" />
<silkscreenpath route={[{"x":1.5643860000000132,"y":1.5499080000000731},{"x":1.5643860000000132,"y":0.35412680000013097}]} />
<silkscreenpath route={[{"x":1.366951800000038,"y":-1.5499079999999594},{"x":1.5643860000000132,"y":-1.5501619999998866}]} />
<silkscreenpath route={[{"x":-1.5869920000000093,"y":1.5499080000000731},{"x":-1.4296390000000656,"y":1.5499080000000731}]} />
<silkscreenpath route={[{"x":1.429638999999952,"y":1.5499080000000731},{"x":1.5643860000000132,"y":1.5499080000000731}]} />
<silkscreenpath route={[{"x":-1.5869920000000093,"y":-1.5499079999999594},{"x":-1.391081799999938,"y":-1.5499079999999594}]} />
<silkscreenpath route={[{"x":1.5643860000000132,"y":-0.3541267999999036},{"x":1.5643860000000132,"y":-1.5501619999998866}]} />
<silkscreenpath route={[{"x":-1.5869920000000093,"y":-1.5499079999999594},{"x":-1.5869920000000093,"y":-0.3541267999999036}]} />
<silkscreenpath route={[{"x":-1.5869920000000093,"y":0.35412680000013097},{"x":-1.5869920000000093,"y":1.5499080000000731}]} />
<silkscreencircle pcbX="-0.97536mm" pcbY="-2.31013mm" radius="0.100076mm" />
<silkscreentext text="{NAME}" pcbX="-0.002032mm" pcbY="3.00152mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.8454248000000462,"y":2.24994520000007},{"x":1.8545688000000382,"y":2.24994520000007},{"x":1.8545688000000382,"y":-2.2499451999999565},{"x":-1.8454248000000462,"y":-2.2499451999999565},{"x":-1.8454248000000462,"y":2.24994520000007}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2965326.obj?uuid=dc995b620ee847a582c4de461d7eca9a",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2965326.step?uuid=dc995b620ee847a582c4de461d7eca9a",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.00457199999993918, y: 0.000012699999842880061, z: -0.04 },
      }}
      {...props}
    />
  )
}