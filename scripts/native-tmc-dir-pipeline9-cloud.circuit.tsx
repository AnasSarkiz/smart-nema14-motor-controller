import Controller from "../src/SmartNema14MotorController"

/** Selected driver direction net; retain all checked power, USB and saved signal copper. */
export default function NativeTmcDirPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["TMC_DIR"]}
      nativeRoutingTargets={[".U1 > .pin18", ".U2 > .pin19", ".R9 > .pin1"]}
    />
  )
}
