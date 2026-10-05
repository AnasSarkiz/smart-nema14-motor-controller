import Controller from "../src/SmartNema14MotorController"

/** Selected native TMC enable net, retaining current checked ADC and CC copper. */
export default function NativeTmcEnablePipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["TMC_ENABLE_N"]}
      nativeRoutingTargets={[".U1 > .pin15", ".U2 > .pin2", ".R7 > .pin2"]}
    />
  )
}
