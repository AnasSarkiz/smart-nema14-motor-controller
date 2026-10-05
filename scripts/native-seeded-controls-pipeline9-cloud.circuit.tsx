import Controller from "../src/SmartNema14MotorController"

/** Bounded native fanout seeds followed by the native Pipeline9 solver. */
export default function NativeSeededControlsPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["EXT_STEP_CONN", "POWER_HIGH_CURRENT"]}
      nativePartialSignalBranches
    />
  )
}
