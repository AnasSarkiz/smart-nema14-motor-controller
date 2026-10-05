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

/** Seven physical routes, including ESD ground, for the four-contact Type-C USB2 bus.
 * The automatic pair solver supports point-to-point pairs only. Electrical
 * connections remain on the A4 sheets; this group specifies only their copper.
 * L1 width 0.1537 / gap 0.1999 mm, JLC04161H-3313, target 90 ohms.
 * Actual clearance, reference continuity and skew must pass generated checks.
 */
export function UsbRoutes() {
  return (
    <group name="USB_Copper">
      <trace
        name="USB_DP_CONNECTOR_ESD"
        from=".J_USB > .DP2"
        to=".D_USB > .pin1"
        pcbPathRelativeTo=".J_USB > .DP2"
        thickness="0.1537mm"
        pcbPath={localPath("J_USB", [
          { x: 0.750062, y: -9.2 },
          { x: 1.1536, y: -8.796462 },
          { x: 1.1536, y: -7.350012 },
        ])}
      />
      <trace
        name="USB_DM_CONNECTOR_ESD"
        from=".J_USB > .DN1"
        to=".D_USB > .pin2"
        pcbPathRelativeTo=".J_USB > .DN1"
        thickness="0.1537mm"
        pcbPath={localPath("J_USB", [
          { x: 0.249936, y: -9.2 },
          { x: 0.8, y: -8.649936 },
          { x: 0.8, y: -6.649988 },
        ])}
      />
      <trace
        name="USB_DP_ESD_MCU"
        from=".D_USB > .pin1"
        to=".U1 > .PA12_PA10_"
        pcbPathRelativeTo=".D_USB > .pin1"
        thickness="0.1537mm"
        pcbPath={localPath("D_USB", [
          { x: 2.85, y: -7.6 },
          { x: 3.35, y: -7.6 },
          { x: 3.7, y: -7.25 },
          { x: 3.7, y: -6.75 },
          { x: 3.35, y: -6.4 },
          { x: 2.8536, y: -6.4 },
          { x: 2.8536, y: 6.1268 },
          { x: 3.75, y: 7.0232 },
          { x: 5.9268, y: 7.0232 },
          { x: 6.8232, y: 6.1268 },
        ])}
      />
      <trace
        name="USB_DM_ESD_MCU"
        from=".D_USB > .pin2"
        to=".U1 > .PA11_PA9_"
        pcbPathRelativeTo=".D_USB > .pin2"
        thickness="0.1537mm"
        pcbPath={localPath("D_USB", [
          { x: 2.5, y: -6.2 },
          { x: 2.5, y: 6.2732 },
          { x: 3.6036, y: 7.3768 },
          { x: 6.0732, y: 7.3768 },
          { x: 7.1768, y: 6.2732 },
        ])}
      />
      <trace
        name="USB_DP_DUPLICATE_CONTACT"
        from=".J_USB > .DP1"
        to=".J_USB > .DP2"
        pcbPathRelativeTo=".J_USB > .DP1"
        thickness="0.1537mm"
        pcbPath={localPath("J_USB", [
          { x: -0.249936, y: -9.2 },
          { x: -0.45, y: -9.000064 },
          {
            x: -0.45,
            y: -8.75,
            via: true,
            fromLayer: "top",
            toLayer: "bottom",
          },
          { x: 1, y: -8.833653846 },
          { x: 2.15, y: -8.9, via: true, fromLayer: "bottom", toLayer: "top" },
          { x: 1.1536, y: -8.9 },
          { x: 1.1536, y: -8.796462 },
          { x: 0.750062, y: -9.2 },
        ])}
      />
      {/* Declare the existing ordinary barrel explicitly so fixed routing
          obstacles retain its actual 0.60 mm annulus on every layer. */}
      <via
        name="USB_ESD_GROUND_THROUGH"
        pcbX={3.1}
        pcbY={-7}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo={[
          "net.GND",
          ".USB_ESD_GROUND_THROUGH > .top",
          ".USB_ESD_GROUND_THROUGH > .bottom",
        ]}
        tented
      />
      <trace
        name="USB_ESD_GROUND_ESCAPE_TOP"
        from=".D_USB > .pin3"
        to=".USB_ESD_GROUND_THROUGH > .top"
        pcbPathRelativeTo=".D_USB > .pin3"
        thickness="0.15mm"
        pcbPath={[".D_USB > .pin3"]}
      />
      <trace
        name="USB_ESD_GROUND_ESCAPE_BOTTOM"
        from=".USB_ESD_GROUND_THROUGH > .bottom"
        to=".C27 > .pin2"
        pcbPathRelativeTo=".USB_ESD_GROUND_THROUGH > .bottom"
        thickness="0.15mm"
        // Relative point preserves the existing global corner (3.5, -6.72598457).
        pcbPath={[{ x: 0.4, y: 0.27401543 }]}
      />
      <trace
        name="USB_DM_DUPLICATE_CONTACT"
        from=".J_USB > .DN2"
        to=".J_USB > .DN1"
        pcbPathRelativeTo=".J_USB > .DN2"
        thickness="0.1537mm"
        pcbPath={localPath("J_USB", [
          { x: -0.750062, y: -9.45 },
          { x: -1.15, y: -9.45 },
          { x: -1.15, y: -8.2, via: true, fromLayer: "top", toLayer: "bottom" },
          { x: -1.15, y: -7.7 },
          { x: -0.15, y: -7.7 },
          { x: -0.15, y: -7.9, via: true, fromLayer: "bottom", toLayer: "top" },
          { x: 0.8, y: -7.9 },
          { x: 0.8, y: -8.649936 },
          { x: 0.249936, y: -9.2 },
        ])}
      />
    </group>
  )
}
