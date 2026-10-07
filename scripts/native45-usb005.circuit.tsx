import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import branches from "../evidence/rev-0.0.45-alpha.0/routing/usb004-coupled-clearance/manual-branches.json"

/** Public fanout preset forwards the remaining two-point pair to Pipeline9. */
export default function Native45Usb005() {
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={["MCU_USB_DP", "MCU_USB_DM"]}
      nativeRoutingTargets={["net.MCU_USB_DP", "net.MCU_USB_DM"]}
      nativeFanoutTrial={{
        netNames: branches.net_names,
        paths: branches.paths.map((path) => fanoutTracePath.parse(path)),
      }}
    />
  )
}
