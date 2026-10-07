import SmartNema14MotorController from "../src/SmartNema14MotorController"
import { fanoutTracePath } from "@tscircuit/props"
import candidate from "../evidence/rev-0.0.46-alpha.0/routing/controls064-candidates.json"
export default function Native46Controls065() {
  return (
    <SmartNema14MotorController
      nativeSavedRouteTrial={{
        netNames: candidate.net_names,
        paths: candidate.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
