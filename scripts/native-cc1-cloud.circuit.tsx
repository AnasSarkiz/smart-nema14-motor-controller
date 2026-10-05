import Controller from "../src/SmartNema14MotorController"

/** One selected PD net; all saved copper and native errors remain enabled. */
export default function NativeCc1Cloud() {
  return (
    <Controller
      nativeRoutingNetNames={["PD_CC1_CONN"]}
      nativeRoutingTargets={[".C23 > .pin1", ".J_USB > .pin18", ".U3 > .pin7"]}
    />
  )
}
