import { Fragment } from "react"

/** Functional connector labels; all component identities remain in the assembly drawing.
 * The native Gerber alphabet scales cap height by 0.7. At 2.2mm these four
 * labels target >=1mm cap height and 0.198mm strokes; audit actual CAM.
 */
export function BoardLegend() {
  const legends = [
    { text: "MOTOR", pcbX: -1.75, pcbY: 16.0 },
    { text: "USB-C", pcbX: -9.6, pcbY: -16.0 },
    { text: "SWD", pcbX: 14.8, pcbY: -13.05 },
    { text: "IO", pcbX: 15.6, pcbY: 9.5, pcbRotation: 90 },
  ]
  return legends.map((legend) => (
    <Fragment key={legend.text}>
      <silkscreentext
        {...legend}
        fontSize="2.2mm"
        layer="top"
        pcbStyle={{ silkscreenTextVisibility: "visible" }}
      />
    </Fragment>
  ))
}
