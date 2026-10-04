import { mechanicalPreviewPlacement } from "../mechanics/preview-placement"

function localPath({
  reference,
  points,
}: {
  reference: "U10" | "R38"
  points: { x: number; y: number }[]
}) {
  const placement = mechanicalPreviewPlacement[reference]
  return points.map(({ x, y }) => ({
    x: x - placement.pcbX,
    y: y - placement.pcbY,
  }))
}

/** Manually specified eFuse enable control copper; generated DRC must pass. */
export function EfuseEnableRoutes() {
  return (
    <group name="EfuseEnableCopper">
      <trace
        name="EFUSE_ENABLE_TO_PULLUP"
        from=".U10 > .pin10"
        to=".R38 > .pin2"
        thickness="0.15mm"
        pcbPathRelativeTo=".U10 > .pin10"
        pcbPath={localPath({
          reference: "U10",
          points: [
            { x: -6.907539, y: -7.75 },
            { x: -7.7, y: -7.75 },
            { x: -7.7, y: -10.25 },
            { x: -4.5, y: -10.25 },
            { x: -4.5, y: -11.25 },
            { x: -5.317184, y: -11.25 },
          ],
        })}
      />
      <trace
        name="EFUSE_ENABLE_DIVIDER_JOIN"
        from=".R38 > .pin2"
        to=".R39 > .pin1"
        thickness="0.15mm"
        pcbPathRelativeTo=".R38 > .pin2"
        pcbPath={localPath({
          reference: "R38",
          points: [
            { x: -5.317184, y: -11.25 },
            { x: -4, y: -11.25 },
            { x: -4, y: -12 },
            { x: -4.4, y: -12 },
            { x: -4.682816, y: -12.5 },
          ],
        })}
      />
    </group>
  )
}
