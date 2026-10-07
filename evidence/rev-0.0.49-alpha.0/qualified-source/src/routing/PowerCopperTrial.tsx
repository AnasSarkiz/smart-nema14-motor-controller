import { Fragment } from "react"
import { applyToPoint, translate } from "transformation-matrix"
import fanouts from "./vm-fanouts-trial.json"
import pours from "./power-pour-trial.json"
import branches from "./single-layer-signal-branches.json"
import savedRoutes from "./power-guarded-paths-trial.json"

const savedViaPositions = savedRoutes.paths.flatMap((path) =>
  path.route.filter((point) => point.route_type === "via"),
)
const unrepresentedFanouts = fanouts.filter(
  (fanout) =>
    savedRoutes.retained_fanout_names.includes(fanout.name) ||
    !savedViaPositions.some(
      (via) => Math.hypot(via.x - fanout.x, via.y - fanout.y) < 0.00001,
    ),
)

/** Explicit native power fanouts. Manufacturing qualification remains required. */
export function PowerCopperTrial() {
  return (
    <>
      {branches.map((branch) => (
        <trace
          key={branch.name}
          name={branch.name}
          from={branch.from}
          to={branch.to}
          thickness="0.15mm"
          pcbPathRelativeTo={branch.from}
          pcbPath={branch.points.length ? branch.points : [branch.from]}
        />
      ))}
      <trace
        name="PROTECTED_NORTH_MONITOR_RECONNECT"
        from=".PROTECTED_MONITOR_EAST > .bottom"
        to=".TCPP_PROTECTED_MONITOR > .bottom"
        thickness="0.18mm"
        pcbPathRelativeTo=".PROTECTED_MONITOR_EAST > .bottom"
        pcbPath={[{ x: 0, y: 4.3 }]}
      />
      <trace
        name="PROTECTED_LOWER_MONITOR_RECONNECT"
        from=".PROTECTED_LOW_RETURN > .bottom"
        to=".PROTECTED_MONITOR_WEST > .bottom"
        thickness="0.18mm"
        pcbPathRelativeTo=".PROTECTED_LOW_RETURN > .bottom"
        pcbPath={[{ x: 0, y: 7.55 }]}
      />
      <trace
        name="RTN_ILIM_DIVIDER_BRIDGE"
        from=".R43 > .pin2"
        to=".R44 > .pin2"
        thickness="0.15mm"
        pcbPathRelativeTo=".R43 > .pin2"
        pcbPath={[
          { x: -0.432816, y: 0.8 },
          { x: 1.817184, y: 0.8 },
        ]}
      />
      <trace
        name="VM_BUCK_DRIVER_BRIDGE"
        from=".VM_TMC_LOW > .top"
        to=".VM_BUCK > .top"
        thickness="0.4mm"
        pcbPathRelativeTo=".VM_TMC_LOW > .top"
        pcbPath={[".VM_TMC_LOW > .top"]}
      />
      <trace
        name="VM_NORTH_RECONNECT"
        from=".VM_TMC_BULK > .top"
        to=".VM_TMC_HIGH > .top"
        thickness="0.6mm"
        pcbPathRelativeTo=".VM_TMC_BULK > .top"
        pcbPath={[".VM_TMC_BULK > .top"]}
      />
      <trace
        name="VM_NORTH_BULK_BRIDGE"
        from=".VM_BULK_LEFT > .top"
        to=".VM_TMC_HIGH > .top"
        thickness="0.4mm"
        pcbPathRelativeTo=".VM_BULK_LEFT > .top"
        pcbPath={[{ x: 0, y: -1.4 }]}
      />
      <trace
        name="PROTECTED_MONITOR_LAYER_BRIDGE"
        from=".PROTECTED_MONITOR_WEST > .bottom"
        to=".PROTECTED_MONITOR_EAST > .bottom"
        thickness="0.18mm"
        pcbPathRelativeTo=".PROTECTED_MONITOR_WEST > .bottom"
        pcbPath={[".PROTECTED_MONITOR_WEST > .bottom"]}
      />
      <trace
        name="R39_RTN_CORRIDOR"
        from=".R39 > .pin2"
        to="net.EFUSE_RTN"
        thickness="0.15mm"
        pcbPathRelativeTo=".R39 > .pin2"
        pcbPath={[
          { x: -0.1, y: -0.6 },
          { x: -0.1, y: -3.0 },
        ]}
      />
      <trace
        name="R40_PROTECTED_RETURN"
        from=".PROTECTED_LEFT > .bottom"
        to=".R40 > .pin1"
        thickness="0.15mm"
        pcbPathRelativeTo=".PROTECTED_LEFT > .bottom"
        pcbPath={[
          { x: -0.1, y: 0 },
          { x: -0.1, y: 1.4 },
          { x: -1.38, y: 1.4 },
        ]}
      />
      <trace
        name="PROTECTED_EFUSE_INPUT_BANK"
        from=".U10 > .pin8"
        to=".U10 > .pin9"
        thickness="0.28mm"
        pcbPathRelativeTo=".U10 > .pin8"
        pcbPath={[".U10 > .pin8"]}
      />
      <trace
        name="PROTECTED_EFUSE_INPUT_CAP"
        from=".U10 > .pin8"
        to=".C34 > .pin1"
        thickness="0.28mm"
        pcbPathRelativeTo=".U10 > .pin8"
        pcbPath={[
          { x: -2.55, y: -1.55 },
          { x: -2.15, y: -2.75 },
          { x: -2.15, y: -3.85 },
        ]}
      />
      <copperpour
        name="VM_L3_DISTRIBUTION"
        layer="inner2"
        connectsTo="net.VM"
        clearance="0.155mm"
        boardEdgeMargin="0.3mm"
        cutoutMargin="0.31mm"
        useThermalReliefs={false}
        coveredWithSolderMask
      />
      {pours.map((pour) => (
        <Fragment key={pour.name}>
          <copperpour
            name={pour.name}
            layer={
              pour.layer === "bottom"
                ? "bottom"
                : pour.layer === "inner1"
                  ? "inner1"
                  : "inner2"
            }
            connectsTo={`net.${pour.net}`}
            unbroken={pour.unbroken}
            clearance="0.155mm"
            boardEdgeMargin="0.3mm"
            cutoutMargin="0.31mm"
            useThermalReliefs={false}
            coveredWithSolderMask
            outline={pour.outline}
          />
        </Fragment>
      ))}
      {unrepresentedFanouts.map((fanout) => (
        <Fragment key={fanout.name}>
          <via
            name={fanout.name}
            pcbX={fanout.x}
            pcbY={fanout.y}
            fromLayer="top"
            toLayer="bottom"
            holeDiameter="0.30mm"
            outerDiameter="0.45mm"
            connectsTo={[
              `net.${fanout.net}`,
              `.${fanout.name} > .top`,
              `.${fanout.name} > .bottom`,
            ]}
            tented
          />
          {fanout.branches.map((branch) => (
            <trace
              key={branch.selector}
              name={`${fanout.name}_${branch.selector.replace(/\W/g, "_")}`}
              from={`.${fanout.name} > .${fanout.layer}`}
              to={branch.selector}
              thickness={fanout.width}
              pcbPathRelativeTo={`.${fanout.name} > .${fanout.layer}`}
              pcbPath={
                branch.points.length
                  ? branch.points.map((point) =>
                      applyToPoint(translate(-fanout.x, -fanout.y), point),
                    )
                  : [`.${fanout.name} > .${fanout.layer}`]
              }
            />
          ))}
        </Fragment>
      ))}
    </>
  )
}
