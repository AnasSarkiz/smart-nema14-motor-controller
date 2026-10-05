import { fanoutTracePath } from "@tscircuit/props"

export const powerHighBranchFeatureNames = [
  "POWER_HIGH_GATE_FILLED",
  "POWER_HIGH_PULLDOWN_FILLED",
]
const paths = [
  {
    connection: ".Q_ILIM > .pin1",
    route: [
      {
        route_type: "wire",
        x: -5.649986,
        y: -3.499999,
        layer: "bottom",
        width: 0.15,
      },
      {
        route_type: "wire",
        x: -5.649986,
        y: -4.3,
        layer: "bottom",
        width: 0.15,
      },
      {
        route_type: "via",
        x: -5.649986,
        y: -4.3,
        from_layer: "bottom",
        to_layer: "inner1",
        via_diameter: 0.38,
        via_hole_diameter: 0.2,
      },
      {
        route_type: "wire",
        x: -5.649986,
        y: -4.3,
        layer: "inner1",
        width: 0.15,
      },
      {
        route_type: "wire",
        x: -6.96,
        y: -4.3,
        layer: "inner1",
        width: 0.15,
      },
      {
        route_type: "wire",
        x: -6.96,
        y: 0.4,
        layer: "inner1",
        width: 0.15,
      },
      {
        route_type: "wire",
        x: -6.1,
        y: 0.4,
        layer: "inner1",
        width: 0.15,
      },
      {
        route_type: "wire",
        x: -5.7,
        y: 0,
        layer: "inner1",
        width: 0.15,
      },
      {
        route_type: "via",
        x: -5.7,
        y: 0,
        from_layer: "inner1",
        to_layer: "bottom",
        via_diameter: 0.38,
        via_hole_diameter: 0.2,
      },
      {
        route_type: "wire",
        x: -5.7,
        y: 0,
        layer: "bottom",
        width: 0.15,
      },
      {
        route_type: "wire",
        x: -6.567184,
        y: 0,
        layer: "bottom",
        width: 0.15,
      },
    ],
  },
  {
    connection: ".R46 > .pin1",
    route: [
      {
        route_type: "wire",
        x: -6.567184,
        y: 0,
        layer: "bottom",
        width: 0.15,
      },
      {
        route_type: "wire",
        x: -5.7,
        y: 0,
        layer: "bottom",
        width: 0.15,
      },
      {
        route_type: "via",
        x: -5.7,
        y: 0,
        from_layer: "bottom",
        to_layer: "inner1",
        via_diameter: 0.38,
        via_hole_diameter: 0.2,
      },
      {
        route_type: "wire",
        x: -5.7,
        y: 0,
        layer: "inner1",
        width: 0.15,
      },
    ],
  },
]
export function PowerHighCurrentBranch() {
  return (
    <autoroutingphase
      name="Saved gate pulldown branch"
      phaseIndex={2}
      autorouter="fanout"
      minViaHoleDiameter="0.30mm"
      minViaPadDiameter="0.60mm"
      fanoutPourNetMap={{}}
      connections={[".Q_ILIM > .pin1", ".R46 > .pin1"]}
      pcbTracePaths={paths.map((path) => fanoutTracePath.parse(path))}
    />
  )
}
