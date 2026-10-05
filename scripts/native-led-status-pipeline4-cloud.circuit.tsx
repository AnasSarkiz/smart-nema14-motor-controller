import Controller from "../src/SmartNema14MotorController"

/** Route the remaining status drive through the released native Pipeline4 engine. */
export default function NativeLedStatusPipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["LED_STATUS_DRIVE"]}
      nativeRoutingTargets={[".U1 > .pin30", ".R36 > .pin1"]}
    />
  )
}
