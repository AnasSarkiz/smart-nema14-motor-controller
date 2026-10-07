import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.50-alpha.0/routing/POWER038-SOURCE-CANDIDATES.json"

export default function Native50Power038() {
  return (
    <SmartNema14MotorController
      freshRoutesEnabled
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
