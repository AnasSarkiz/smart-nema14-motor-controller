import Controller from "../src/SmartNema14MotorController"

/** Use released Pipeline7 for connector STEP after Pipeline4's bounded node-solver timeout. */
export default function NativeExtStepConnPipeline7Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline7"
      nativeRoutingNetNames={["EXT_STEP_CONN"]}
      nativeRoutingTargets={[".J_IO > .pin5", ".D_IO1 > .pin1", ".R23 > .pin1"]}
    />
  )
}
