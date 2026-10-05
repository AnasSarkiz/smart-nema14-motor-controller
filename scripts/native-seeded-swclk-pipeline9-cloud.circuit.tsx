import Controller from "../src/SmartNema14MotorController"

/** Native Pipeline9 for SWCLK, seeded with the reviewed series/pulldown branch. */
export default function NativeSeededSwclkPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["SWCLK"]}
      nativePartialSignalBranches
    />
  )
}
