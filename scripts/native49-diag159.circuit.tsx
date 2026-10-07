import SmartNema14MotorController from "../src/SmartNema14MotorController"
export default function Native49Diag159() {
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={["TMC_DIAG"]}
      nativeRoutingTargets={["net.TMC_DIAG"]}
    />
  )
}
