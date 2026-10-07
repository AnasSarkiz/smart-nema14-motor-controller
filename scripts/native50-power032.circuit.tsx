import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.50-alpha.0/routing/POWER027-SOURCE-CANDIDATES.json"

/** Replay the official Pipeline9 output as source paths before qualification. */
export default function Native50Power032() {
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
