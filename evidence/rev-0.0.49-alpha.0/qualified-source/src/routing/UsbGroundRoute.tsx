/** Preserve the existing ESD ground copper with an explicit ordinary barrel.
 * Fixed routing obstacles must cover its actual 0.60 mm annulus on all layers.
 */
export function UsbGroundRoute() {
  return (
    <>
      <via
        name="USB_ESD_GROUND_THROUGH"
        pcbX={3.1}
        pcbY={-7}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.45mm"
        connectsTo={[
          "net.GND",
          ".USB_ESD_GROUND_THROUGH > .top",
          ".USB_ESD_GROUND_THROUGH > .bottom",
        ]}
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
        // Relative point preserves the original global corner (3.5, -6.72598457).
        pcbPath={[{ x: 0.4, y: 0.27401543 }]}
      />
    </>
  )
}
