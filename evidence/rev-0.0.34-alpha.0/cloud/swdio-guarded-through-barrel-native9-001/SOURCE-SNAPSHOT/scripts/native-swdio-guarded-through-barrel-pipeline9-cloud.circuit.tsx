import Controller from "../src/SmartNema14MotorController"

/** Native Pipeline9 for the two-contact guarded programmer signal. */
export default function NativeSwdioGuardedThroughBarrelPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["SWDIO_GUARDED"]}
      nativeRoutingTargets={[".U7 > .pin3", ".R20 > .pin1"]}
    />
  )
}
