import { Fragment } from "react"
import thermalSpreading from "./tmc2209-thermal-spreading-trial.json"

/** Candidate ordinary thermal spreading; all existing clearance rules apply. */
export function TmcThermalSpreadingTrial() {
  return (
    <>
      {thermalSpreading.vias.map((via) => (
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
            tented="top_and_bottom_tented"
          />
        </Fragment>
      ))}
    </>
  )
}
