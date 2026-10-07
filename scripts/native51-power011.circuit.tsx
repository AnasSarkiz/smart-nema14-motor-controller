import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.51-alpha.0/routing/POWER011-SOURCE-CANDIDATES.json"

export default function Native51Power011() {
  return (
    <SmartNema14MotorController
      nativeSavedRouteReplacement={{
        netNames: ["PD_GATE", "VBUS_CONN"],
        pathSelectors: candidates.replaced_path_selectors,
      }}
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
