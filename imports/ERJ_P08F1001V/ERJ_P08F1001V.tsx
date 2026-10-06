import objPath from "./ERJ_P08F1001V.obj"
import stepPath from "./ERJ_P08F1001V.step"
import type { ResistorProps } from "@tscircuit/props"

export const ERJ_P08F1001V = (props: Omit<ResistorProps, "resistance">) => {
  const { name = "R1", ...restProps } = props

  return (
    <resistor
      name={name}
      resistance="1kohm"
      supplierPartNumbers={{
  "jlcpcb": [
    "C4261071"
  ]
}}
      manufacturerPartNumber="ERJ-P08F1001V"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="1.478788mm" pcbY="0mm" width="1.207516mm" height="1.7010126mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-1.478788mm" pcbY="0mm" width="1.207516mm" height="1.7010126mm" shape="rect" />
<silkscreenpath route={[{"x":0.9512045999999827,"y":-1.0790935999999647},{"x":2.311120599999981,"y":-1.0790935999999647},{"x":2.311120599999981,"y":1.0790936000000784},{"x":0.9512045999999827,"y":1.0790936000000784}]} />
<silkscreenpath route={[{"x":-0.9512046000000964,"y":-1.0790935999999647},{"x":-2.311120600000095,"y":-1.0790935999999647},{"x":-2.311120600000095,"y":1.0790936000000784},{"x":-0.9512046000000964,"y":1.0790936000000784}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="2.0668mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.332546000000093,"y":1.1005063000000064},{"x":2.3325459999999794,"y":1.1005063000000064},{"x":2.3325459999999794,"y":-1.1005063000000064},{"x":-2.332546000000093,"y":-1.1005063000000064},{"x":-2.332546000000093,"y":1.1005063000000064}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...restProps}
    />
  )
}