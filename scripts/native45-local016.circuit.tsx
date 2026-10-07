import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.45-alpha.0/routing/local015-clean-candidates.json"

/** Freshly re-render complete local trees after excluding failed trees. */
export default function Native45Local016() {
  return (
    <SmartNema14MotorController
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
