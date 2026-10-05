import Controller from "../src/SmartNema14MotorController"

/** One PD connection using the released native Pipeline4 and full saved copper. */
export default function NativeCc1Pipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["PD_CC1_CONN"]}
      nativeRoutingTargets={[".C23 > .pin1", ".J_USB > .pin18", ".U3 > .pin7"]}
    />
  )
}
