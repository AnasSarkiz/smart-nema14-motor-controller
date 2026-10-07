import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.45-alpha.0/routing/controls001/clean-candidates.json"

/** Keep failing control trees out of the canonical source. */
export default function Native45Controls002() {
  return (
    <SmartNema14MotorController
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
