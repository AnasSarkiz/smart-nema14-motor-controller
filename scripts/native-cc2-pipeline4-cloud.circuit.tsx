import Controller from "../src/SmartNema14MotorController"

/** Second PD connection using the released native Pipeline4 and full saved copper. */
export default function NativeCc2Pipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["PD_CC2_CONN"]}
      nativeRoutingTargets={[".C24 > .pin1", ".J_USB > .pin15", ".U3 > .pin9"]}
    />
  )
}
