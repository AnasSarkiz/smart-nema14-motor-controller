import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.45-alpha.0/routing/clock003-fixed-obstacles/xout-manual-candidate.json"

/** One explicit manual escape relocation; use normal native DRC. */
export default function Native45Clock007() {
  return (
    <SmartNema14MotorController
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
