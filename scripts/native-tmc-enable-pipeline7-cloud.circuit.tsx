import Controller from "../src/SmartNema14MotorController"

/** Compare released Pipeline7 on the TMC enable net, retaining current checked ADC and CC copper. */
export default function NativeTmcEnablePipeline7Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline7"
      nativeRoutingNetNames={["TMC_ENABLE_N"]}
      nativeRoutingTargets={[".U1 > .pin15", ".U2 > .pin2", ".R7 > .pin2"]}
    />
  )
}
