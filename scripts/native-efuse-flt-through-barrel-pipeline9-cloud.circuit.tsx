import Controller from "../src/SmartNema14MotorController"

/** Native Pipeline9 on the remaining fault net with full through-via obstacles. */
export default function NativeEfuseFltThroughBarrelPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["EFUSE_FLT_N"]}
      nativeRoutingTargets={[".U1 > .pin43", ".U10 > .pin22", ".R48 > .pin2"]}
    />
  )
}
