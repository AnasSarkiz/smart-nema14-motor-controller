import Controller from "../src/SmartNema14MotorController"

/** Bounded native Pipeline9 job for the three existing current-limit contacts. */
export default function NativePowerHighPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["POWER_HIGH_CURRENT"]}
      nativeRoutingTargets={[
        ".POWER_HIGH_MCU_FILLED > .top",
        ".POWER_HIGH_GATE_FILLED > .bottom",
        ".POWER_HIGH_PULLDOWN_FILLED > .bottom",
      ]}
    />
  )
}
