import type { InductorProps } from "@tscircuit/props"

export const SRN6028C_3R9M = (props: Omit<InductorProps, "inductance">) => {
  return (
    <inductor
      inductance="3.9uH"
      supplierPartNumbers={{
  "jlcpcb": [
    "C19947652"
  ]
}}
      manufacturerPartNumber="SRN6028C-3R9M"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-2.250059mm" pcbY="0mm" width="1.999996mm" height="6.499987mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="2.250059mm" pcbY="0mm" width="1.999996mm" height="6.499987mm" shape="rect" />
<silkscreenpath route={[{"x":-1.018844799999897,"y":3.175000000000068},{"x":1.0188702000001513,"y":3.175000000000068}]} />
<silkscreenpath route={[{"x":-1.1126470000000381,"y":-3.175000000000068},{"x":1.0188702000001513,"y":-3.175000000000068}]} />
<silkscreentext text="{NAME}" pcbX="-0.000127mm" pcbY="4.2512mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-3.5000569999999698,"y":3.4999934999999596},{"x":3.5000569999999698,"y":3.4999934999999596},{"x":3.5000569999999698,"y":-3.4999934999999596},{"x":-3.5000569999999698,"y":-3.4999934999999596},{"x":-3.5000569999999698,"y":3.4999934999999596}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19947652.obj?uuid=f354b441661e4f52a7607dc2818f7bb2",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19947652.step?uuid=f354b441661e4f52a7607dc2818f7bb2",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.22874449999988644, y: -0.2111965000001137, z: -0.533638 },
      }}
      {...props}
    />
  )
}