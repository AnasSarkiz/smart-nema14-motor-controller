import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Continue power copper after the raw PD VBUS replay is qualified and saved. */
export default function Native50Power039() {
  const netNames = ["PD_FET_SOURCE", "VBUS_PROTECTED", "VM"]
  return (
    <SmartNema14MotorController
      freshRoutesEnabled
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
