import { mechanicalPreviewPlacement } from "../mechanics/preview-placement"

function localPath({
  reference,
  points,
}: {
  reference: "U10" | "R38"
  points: { x: number; y: number; via?: boolean; fromLayer?: "bottom" | "inner2"; toLayer?: "bottom" | "inner2" }[]
}) {
  const placement = mechanicalPreviewPlacement[reference]
  const radians = -(("pcbRotation" in placement ? placement.pcbRotation : 0) * Math.PI) / 180
  return points.flatMap((point) => {
    const dx = point.x - placement.pcbX
    const dy = point.y - placement.pcbY
    const local = {
      ...point,
      x: dx * Math.cos(radians) - dy * Math.sin(radians),
      y: dx * Math.sin(radians) + dy * Math.cos(radians),
    }
    if (!point.via) return [local]
    const contact = { x: local.x, y: local.y }
    return [contact, local, contact]
  })
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
            { x: -7.8, y: -7.75, via: true, fromLayer: "bottom", toLayer: "inner2" },
            { x: -6.75, y: -8 },
            { x: -6.75, y: -12 },
            { x: -7.8, y: -13, via: true, fromLayer: "inner2", toLayer: "bottom" },
            { x: -6.1, y: -13.2 },
            { x: -5.2, y: -13.2 },
            { x: -5.2, y: -11.25 },
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
