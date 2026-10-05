import Controller from "./power-copper-trial.circuit"
export default function ProtectionRouteTrial() {
  return <Controller nativeRoutingTargets={[".U10 > .pin12"]} />
}
