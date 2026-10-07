import SmartNema14MotorController from "../src/SmartNema14MotorController"

export default function Native50Power052() {
  const netNames = ["PD_GATE", "PD_FET_SOURCE"]
  return (
    <SmartNema14MotorController
      freshRoutesEnabled
      nativeThermalViasTrial
      nativeSavedRouteReplacement={{
        netNames: ["PD_GATE"],
        pathSelectors: [
          ".Q_PD_OUT port.pin4",
          ".R13 port.pin2",
          ".R_PD_GATE port.pin1",
        ],
      }}
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
