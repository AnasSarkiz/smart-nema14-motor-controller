import Controller from "../src/SmartNema14MotorController"

/** Native programmer guard connection; separate bounded job with current copper. */
export default function NativeSwdioGuardedPipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["SWDIO_GUARDED"]}
      nativeRoutingTargets={[".U7 > .pin3", ".R20 > .pin1"]}
    />
  )
}
