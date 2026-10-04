import { Fragment } from "react"

// The 2.50 mm physical clearance is reserved with a 2.52 mm planning radius
// so the native polygon approximation stays outside the required circle.
/** Controller holes attach to the proposed carrier, never to rear motor screws. */
export const controllerMountCenters = [
  { x: -15.25, y: -15.25 },
  { x: -15.25, y: 15.25 },
  { x: 15.25, y: -15.25 },
  { x: 15.25, y: 15.25 },
] as const

export function ControllerMount() {
  return (
    <>
      {controllerMountCenters.map(({ x, y }) => (
        <Fragment key={`mount-${x}-${y}`}>
          <hole pcbX={x} pcbY={y} diameter="2.5mm" />
        </Fragment>
      ))}
      {controllerMountCenters.map(({ x, y }) => (
        <Fragment key={`mount-clearance-${x}-${y}`}>
          <keepout
            pcbX={x}
            pcbY={y}
            shape="circle"
            radius="2.52mm"
            layers={["top", "inner1", "inner2", "bottom"]}
          />
        </Fragment>
      ))}
    </>
  )
}
