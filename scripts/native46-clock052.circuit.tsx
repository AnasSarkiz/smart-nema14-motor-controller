import SmartNema14MotorController from "../src/SmartNema14MotorController"
import { fanoutTracePath } from "@tscircuit/props"
import candidate from "../evidence/rev-0.0.45-alpha.0/routing/controls051-candidates.json"
export default function Native46Clock052() {
  const netNames = ["CAN_XIN", "CAN_XOUT"]
  return (
    <SmartNema14MotorController
      nativeSavedRouteTrial={{
        netNames: candidate.net_names,
        paths: candidate.paths.map((path) => fanoutTracePath.parse(path)),
      }}
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
