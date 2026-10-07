import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.45-alpha.0/routing/interfaces002-mesh3/candidates.json"

/** Re-render the unchanged official solver output for independent qualification. */
export default function Native45Interfaces003() {
  return (
    <SmartNema14MotorController
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
