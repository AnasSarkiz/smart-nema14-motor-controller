import { Fragment } from "react"
import { StandardUsbCConnector } from "../src/usb-pd/StandardUsbCConnector"

/** Isolated native renderer registration study; never board placement evidence. */
export default function UsbModelRegistrationStudy() {
  const rotations = [
    { name: "J_TOP", pcbX: -30, layer: "top" as const, x: 90, y: 0, z: 0 },
    {
      name: "J_BOTTOM_A",
      pcbX: -15,
      layer: "bottom" as const,
      x: 90,
      y: 0,
      z: 0,
    },
    {
      name: "J_BOTTOM_B",
      pcbX: 0,
      layer: "bottom" as const,
      x: -90,
      y: 0,
      z: 0,
    },
    {
      name: "J_BOTTOM_C",
      pcbX: 15,
      layer: "bottom" as const,
      x: -90,
      y: 0,
      z: 180,
    },
    {
      name: "J_BOTTOM_D",
      pcbX: 30,
      layer: "bottom" as const,
      x: 90,
      y: 180,
      z: 180,
    },
  ]
  return (
    <board
      width="85mm"
      height="35mm"
      layers={4}
      thickness="1.6mm"
      routingDisabled
    >
      {rotations.map(({ name, pcbX, layer, x, y, z }) => (
        <Fragment key={name}>
          <StandardUsbCConnector
            name={name}
            pcbX={pcbX}
            pcbY={-12.7}
            layer={layer}
            cadModel={{
              stepUrl: "./references/usb4110-external-model/usb4110-gf-a.stp",
              modelOriginPosition: { x: 0, y: 0, z: -4.89 },
              rotationOffset: { x, y, z },
              modelUnitToMmScale: 1,
              modelBoardNormalDirection: "z+",
            }}
          />
        </Fragment>
      ))}
    </board>
  )
}
