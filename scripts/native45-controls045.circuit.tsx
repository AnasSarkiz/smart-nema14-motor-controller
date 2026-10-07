import SmartNema14MotorController from "../src/SmartNema14MotorController"
import { fanoutTracePath } from "@tscircuit/props"
import candidate from "../evidence/rev-0.0.45-alpha.0/routing/controls045-input/reset-escape.json"

export default function Native45Controls045() {
  return (
    <SmartNema14MotorController
      nativeFanoutTrial={{
        netNames: candidate.net_names,
        paths: candidate.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
