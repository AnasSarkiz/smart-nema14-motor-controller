import SmartNema14MotorController from "../src/SmartNema14MotorController"

export default function Native51Power001() {
  const netNames = ["VBUS_PROTECTED", "VM"]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
