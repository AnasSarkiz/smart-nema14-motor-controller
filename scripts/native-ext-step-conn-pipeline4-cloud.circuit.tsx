import Controller from "../src/SmartNema14MotorController"

/** Route the connector-side STEP net with released native Pipeline4 and saved copper retained. */
export default function NativeExtStepConnPipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["EXT_STEP_CONN"]}
      nativeRoutingTargets={[".J_IO > .pin5", ".D_IO1 > .pin1", ".R23 > .pin1"]}
    />
  )
}
