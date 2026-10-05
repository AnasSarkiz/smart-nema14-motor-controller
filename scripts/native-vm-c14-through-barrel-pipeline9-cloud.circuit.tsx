import Controller from "../src/SmartNema14MotorController"

/** Restore C14 VM access using native Pipeline9 and full through-via obstacles. */
export default function NativeVmC14ThroughBarrelPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["VM"]}
      nativeRoutingTargets={[".C14 > .pin2", ".U2 > .pin28"]}
    />
  )
}
