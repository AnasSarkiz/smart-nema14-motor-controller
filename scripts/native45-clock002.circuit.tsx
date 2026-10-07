import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.45-alpha.0/routing/clock001/good-candidates.json"

/** Diagnostic re-render of the unchanged, independently screened native trees. */
export default function Native45Clock002() {
  return (
    <SmartNema14MotorController
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
