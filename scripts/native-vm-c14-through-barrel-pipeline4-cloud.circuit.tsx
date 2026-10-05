import Controller from "../src/SmartNema14MotorController"

/** Restore C14 VM access using released native routing and full through-via obstacles. */
export default function NativeVmC14ThroughBarrelPipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["VM"]}
      nativeRoutingTargets={[".C14 > .pin2", ".U2 > .pin28"]}
    />
  )
}
