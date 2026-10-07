import { Fragment } from "react"
import thermalVias from "./tmc2209-thermal-vias.json"

/** Explicit filled/capped manufacturing features; supplier footprint is unchanged. */
export function TmcThermalVias() {
  return (
    <>
      {thermalVias.vias.map((via) => (
        <Fragment key={via.name}>
          <via
            name={via.name}
            pcbX={via.x}
            pcbY={via.y}
            fromLayer="top"
            toLayer="bottom"
            holeDiameter={via.hole_diameter_mm}
            outerDiameter={via.outer_diameter_mm}
            connectsTo="net.GND"
            tented="bottom_tented"
          />
        </Fragment>
      ))}
    </>
  )
}
