import Controller from "../src/SmartNema14MotorController"

/** Two reviewed filled contacts and a fixed driver/pullup link reduce unresolved access groups. */
export default function NativeTmcEnableAccessPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["TMC_ENABLE_N"]}
      nativeRoutingTargets={[".U1 > .pin15", ".U2 > .pin2", ".R7 > .pin2"]}
    />
  )
}
