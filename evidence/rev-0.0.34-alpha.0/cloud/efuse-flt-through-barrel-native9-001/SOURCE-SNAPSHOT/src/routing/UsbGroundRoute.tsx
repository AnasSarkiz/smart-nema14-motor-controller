import { mechanicalPreviewPlacement } from "../mechanics/preview-placement"

type RoutePoint = {
  x: number
  y: number
  via?: boolean
  fromLayer?: "top" | "bottom"
  toLayer?: "top" | "bottom"
}

// Native pcbPath coordinates are relative to the anchor component transform.
// Store board coordinates here so the paired geometry remains reviewable.
function localPath(reference: "J_USB" | "D_USB", points: RoutePoint[]) {
  const placement = mechanicalPreviewPlacement[reference]
  return points.flatMap((point) => {
    const local = {
      ...point,
      x: point.x - placement.pcbX,
      y: point.y - placement.pcbY,
    }
    if (!point.via) return [local]
    // Native trace validation requires wire contacts on both sides of a via.
    // These coincident endpoints preserve the physical path and layer span.
    const contact = { x: local.x, y: local.y }
    return [contact, local, contact]
  })
}

/** Retain the existing native ESD ground escape during saved USB trial. */
export function UsbGroundRoute() {
  return (
    <trace
      name="USB_ESD_GROUND_ESCAPE"
      from=".D_USB > .pin3"
      to=".C27 > .pin2"
      pcbPathRelativeTo=".D_USB > .pin3"
      thickness="0.15mm"
      pcbPath={localPath("D_USB", [
        { x: 3.1, y: -7, via: true, fromLayer: "top", toLayer: "bottom" },
        { x: 3.5, y: -6.72598457 },
      ])}
    />
  )
}
