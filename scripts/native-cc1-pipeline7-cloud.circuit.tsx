import Controller from "../src/SmartNema14MotorController"

/** Bounded native Pipeline7 comparison, preserving full copper and errors. */
export default function NativeCc1Pipeline7Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline7"
      nativeRoutingNetNames={["PD_CC1_CONN"]}
      nativeRoutingTargets={[".C23 > .pin1", ".J_USB > .pin18", ".U3 > .pin7"]}
    />
  )
}
