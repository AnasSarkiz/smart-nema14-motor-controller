import Controller from "../src/SmartNema14MotorController"

/** Selected native TMC enable net, retaining current checked ADC, LED and external-enable copper. */
export default function NativeTmcEnablePipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["TMC_ENABLE_N"]}
      nativeRoutingTargets={[".U1 > .pin15", ".U2 > .pin2", ".R7 > .pin2"]}
    />
  )
}
