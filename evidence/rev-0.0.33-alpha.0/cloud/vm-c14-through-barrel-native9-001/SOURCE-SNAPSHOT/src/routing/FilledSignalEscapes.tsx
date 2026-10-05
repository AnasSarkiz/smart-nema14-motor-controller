import { Fragment } from "react"
import { applyToPoint, translate } from "transformation-matrix"
import { z } from "zod"
import manifest from "./filled-signal-vias-trial.json"
import savedRoutes from "./power-guarded-paths-trial.json"

const featureSchema = z.object({
  name: z.string(),
  net: z.string(),
  x: z.number(),
  y: z.number(),
  owner_layer: z.enum(["top", "bottom"]),
  hole_diameter_mm: z.union([z.literal(0.15), z.literal(0.2)]),
  outer_diameter_mm: z.literal(0.38),
  process: z.literal("IPC-4761 Type VII epoxy filled and copper capped, ENIG"),
  branches: z.array(
    z.object({
      selector: z.string(),
      layer: z.enum(["top", "bottom"]).optional(),
      points: z.array(z.object({ x: z.number(), y: z.number() })),
    }),
  ),
})
// Saved routes already contain some audited escape vias and pad branches.
// Keep any feature absent from the actual saved geometry, including escapes
// on disconnected groups. The manufacturing manifest checks every feature.
const savedViaPositions = savedRoutes.paths.flatMap((path) =>
  path.route.filter((point) => point.route_type === "via"),
)
const features = z
  .array(featureSchema)
  .parse(manifest.features)
  .filter(
    (feature) =>
      !savedViaPositions.some(
        (via) => Math.hypot(via.x - feature.x, via.y - feature.y) < 0.00001,
      ),
  )

/** Named PCB features; purchased pad definitions remain unchanged.
 * Every feature requires filled/capped fabrication, ownership and geometry
 * qualification. These are not replacements for ordinary routing vias.
 */
export function FilledSignalEscapes() {
  return (
    <>
      {features.map((feature) => (
        <Fragment key={feature.name}>
          <via
            name={feature.name}
            pcbX={feature.x}
            pcbY={feature.y}
            fromLayer="top"
            toLayer="bottom"
            holeDiameter={feature.hole_diameter_mm}
            outerDiameter={feature.outer_diameter_mm}
            connectsTo={[
              `net.${feature.net}`,
              `.${feature.name} > .top`,
              `.${feature.name} > .bottom`,
            ]}
            tented
          />
          {feature.branches.map((branch) => (
            <trace
              key={branch.selector}
              name={`${feature.name}_${branch.selector.replace(/\W/g, "_")}`}
              from={`.${feature.name} > .${branch.layer ?? feature.owner_layer}`}
              to={branch.selector}
              thickness="0.15mm"
              pcbPathRelativeTo={`.${feature.name} > .${branch.layer ?? feature.owner_layer}`}
              // A resolved start-port selector keeps a direct contact fixed
              // without transforming a zero offset to the component center.
              pcbPath={
                branch.points.length
                  ? branch.points.map((point) =>
                      applyToPoint(translate(-feature.x, -feature.y), point),
                    )
                  : [
                      `.${feature.name} > .${branch.layer ?? feature.owner_layer}`,
                    ]
              }
            />
          ))}
        </Fragment>
      ))}
    </>
  )
}
