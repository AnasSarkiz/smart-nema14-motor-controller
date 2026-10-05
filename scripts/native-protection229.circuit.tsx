import Controller from "./power-copper-trial.circuit"

export default function NativeProtectionRouting() {
  return (
    <Controller
      nativeRoutingNetNames={["PD_CC1_CONN", "PD_CC2_CONN"]}
      nativeRoutingTargets={[
        ".C23 > .pin1",
        ".J_USB > .pin18",
        ".U3 > .pin7",
        ".J_USB > .pin15",
        ".U3 > .pin9",
        ".C24 > .pin1",
      ]}
    />
  )
}
