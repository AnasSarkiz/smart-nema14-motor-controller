import Controller from "../src/SmartNema14MotorController"

/** Released native Pipeline4, bounded Cloud job for all four ADC endpoints. */
export default function NativeVbusAdcPipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["VBUS_ADC"]}
      nativeRoutingTargets={[
        ".U1 > .pin11",
        ".C27 > .pin1",
        ".U7 > .pin13",
        ".R51 > .pin1",
      ]}
    />
  )
}
