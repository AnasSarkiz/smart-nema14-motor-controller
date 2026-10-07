import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.51-alpha.0/routing/POWER017-SOURCE-CANDIDATES.json"

import vmCandidates from "../evidence/rev-0.0.51-alpha.0/routing/POWER017-VM-SOURCE-CANDIDATES.json"

export default function Native51Power017() {
  return (
    <SmartNema14MotorController
      nativeVmPlaneTrial
      nativeFanoutTrial={{
        netNames: vmCandidates.net_names,
        paths: vmCandidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
      nativeSavedRouteReplacement={{
        netNames: ["PD_GATE", "VBUS_CONN", "MOTOR_A2"],
        pathSelectors: candidates.replaced_path_selectors,
      }}
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
