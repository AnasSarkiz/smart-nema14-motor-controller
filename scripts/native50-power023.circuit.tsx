import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Raw PD VBUS first; the separate data-port supply is excluded. */
export default function Native50Power023() {
  const netNames = ["VBUS_CONN"]
  return (
    <SmartNema14MotorController
      freshRoutesEnabled
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
