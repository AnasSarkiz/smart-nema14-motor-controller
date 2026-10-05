import Controller from "../src/SmartNema14MotorController"

/** Route the ADC capacitor-to-guard branch separately after four-port exhaustion. */
export default function NativeVbusAdcCapGuardPipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["VBUS_ADC"]}
      nativeRoutingTargets={[".C27 > .pin1", ".R51 > .pin1"]}
    />
  )
}
