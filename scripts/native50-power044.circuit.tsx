import SmartNema14MotorController from "../src/SmartNema14MotorController"

export default function Native50Power044() {
  const netNames = ["PD_FET_SOURCE"]
  return (
    <SmartNema14MotorController
      freshRoutesEnabled
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
