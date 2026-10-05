import Controller from "../src/SmartNema14MotorController"

/** Planning output is never a fabrication build; restore the plane for review. */
export default function NativeCc1PlanningCloud() {
  return (
    <Controller
      deferGroundPourForPlanning
      nativeRoutingNetNames={["PD_CC1_CONN"]}
      nativeRoutingTargets={[
        ".C23 > .pin1",
        ".J_USB > .pin18",
        ".U3 > .pin7",
      ]}
    />
  )
}
