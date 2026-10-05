import Controller from "../src/SmartNema14MotorController"

/** Join the gate/pulldown seed before native Pipeline9 connects the MCU. */
export default function NativeSeededPowerHighPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["POWER_HIGH_CURRENT"]}
      nativePartialSignalBranches
    />
  )
}
