import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** First bounded RP2040 job; power-loop selection only, not a complete board. */
export default function Native45Power001() {
  return (
    <SmartNema14MotorController
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["BUCK_SW", "BUCK_BST", "TMC_CPI"]}
      nativeRoutingTargets={["net.BUCK_SW", "net.BUCK_BST", "net.TMC_CPI"]}
    />
  )
}
