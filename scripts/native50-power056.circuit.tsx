import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.50-alpha.0/routing/POWER056-SOURCE-CANDIDATES.json"

export default function Native50Power056() {
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
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
