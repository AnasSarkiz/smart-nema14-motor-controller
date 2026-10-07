import { applyToPoint, translate } from "transformation-matrix"
import connections from "./native-plane-reconnections.json"

/** Fixed native return links. Physical filled-copper checks remain mandatory. */
export function NativePlaneReconnections() {
  return (
    <>
      {connections.map((connection) => {
        const start = connection.points[0]
        return (
          <trace
            key={connection.name}
            name={connection.name}
            from={connection.from}
            to={connection.to}
            thickness={connection.width_mm}
            pcbPathRelativeTo={connection.from}
            pcbPath={[
              connection.from,
              // Native traces append the resolved destination port themselves.
              ...connection.points
                .slice(1, -1)
                .map((point) =>
                  applyToPoint(translate(-start.x, -start.y), point),
                ),
            ]}
          />
        )
      })}
    </>
  )
}
