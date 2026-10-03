import objPath from "./RT0402BRD076K04L.obj"
import stepPath from "./RT0402BRD076K04L.step"
import type { ResistorProps } from "@tscircuit/props"

export const RT0402BRD076K04L = (props: Omit<ResistorProps, "resistance">) => {
  const { name = "R1", ...restProps } = props

  return (
    <resistor
      name={name}
      resistance="6.04kohm"
      supplierPartNumbers={{
  "jlcpcb": [
    "C852895"
  ]
}}
      manufacturerPartNumber="RT0402BRD076K04L"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="0.432816mm" pcbY="0mm" width="0.565658mm" height="0.540004mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-0.432816mm" pcbY="0mm" width="0.565658mm" height="0.540004mm" shape="rect" />
<silkscreenpath route={[{"x":-0.22621240000012222,"y":-0.4986020000000053},{"x":-0.9442450000001372,"y":-0.4986020000000053},{"x":-0.9442450000001372,"y":0.498602000000119},{"x":-0.22621240000012222,"y":0.498602000000119}]} />
<silkscreenpath route={[{"x":0.22621240000000853,"y":-0.4986020000000053},{"x":0.9442449999999099,"y":-0.4986020000000053},{"x":0.9442449999999099,"y":0.498602000000119},{"x":0.22621240000000853,"y":0.498602000000119}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="1.508mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-0.9656450000001087,"y":0.5200019999999768},{"x":0.965644999999995,"y":0.5200019999999768},{"x":0.965644999999995,"y":-0.5200019999999768},{"x":-0.9656450000001087,"y":-0.5200019999999768},{"x":-0.9656450000001087,"y":0.5200019999999768}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.000012700000070253736, z: 0 },
      }}
      {...restProps}
    />
  )
}