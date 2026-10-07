import { Fragment } from "react"

/** Ordinary outside-pad stitching; every location needs full-board clearance review. */
export function GroundReturnPlanes() {
  return (
    <>
      {[
        { name: "GND_STITCH_NORTH", pcbX: 0, pcbY: 15.5 },
        { name: "GND_STITCH_IO2", pcbX: 2.75, pcbY: 1.05 },
        { name: "GND_STITCH_TMP", pcbX: -9, pcbY: 5.8 },
        { name: "GND_STITCH_CORE", pcbX: 10.56, pcbY: 1.5 },
        { name: "GND_STITCH_USBPHY", pcbX: 8.3, pcbY: 7.7 },
        { name: "GND_STITCH_PD_VDD", pcbX: -6.2, pcbY: 10.55 },
        { name: "GND_STITCH_FLASH_IO", pcbX: 10.8, pcbY: 9.5 },
        { name: "GND_STITCH_RESET_RETURN", pcbX: 11.8, pcbY: -4.1 },
        { name: "GND_STITCH_VM_BOOT", pcbX: -14.5, pcbY: 0.4 },
      ].map((position) => (
        <Fragment key={position.name}>
          <via
            {...position}
            fromLayer="top"
            toLayer="bottom"
            holeDiameter="0.30mm"
            outerDiameter="0.45mm"
            connectsTo="net.GND"
          />
        </Fragment>
      ))}
      {(["top", "bottom"] as const).map((layer) => (
        <Fragment key={layer}>
          <copperpour
            name={`GND_RETURN_${layer}`}
            layer={layer}
            connectsTo="net.GND"
            clearance="0.155mm"
            boardEdgeMargin="0.3mm"
            cutoutMargin="0.31mm"
            useThermalReliefs={false}
          />
        </Fragment>
      ))}
    </>
  )
}
