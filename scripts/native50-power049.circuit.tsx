import SmartNema14MotorController from "../src/SmartNema14MotorController"

export default function Native50Power049() {
  const netNames = ["PD_FET_SOURCE"]
  return (
    <SmartNema14MotorController
      freshRoutesEnabled
      nativeThermalSpreadingTrial
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
