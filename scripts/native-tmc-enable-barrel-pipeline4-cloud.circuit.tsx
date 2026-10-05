import Controller from "../src/SmartNema14MotorController"

/** Released Pipeline4 with explicitly connected outer ports on reviewed filled barrels. */
export default function NativeTmcEnableBarrelPipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["TMC_ENABLE_N"]}
      nativeRoutingTargets={[".U1 > .pin15", ".U2 > .pin2", ".R7 > .pin2"]}
    />
  )
}
