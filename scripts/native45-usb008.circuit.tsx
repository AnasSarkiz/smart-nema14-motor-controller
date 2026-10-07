import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import branches from "../evidence/rev-0.0.45-alpha.0/routing/usb004-coupled-clearance/manual-branches.json"

/** Prejoin duplicate USB contacts, then route the remaining native pair. */
export default function Native45Usb008() {
  return (
    <SmartNema14MotorController
      nativeFanoutTrial={{
        netNames: branches.net_names,
        paths: branches.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
