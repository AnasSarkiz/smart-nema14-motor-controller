import Controller from "./power-copper-trial.circuit"
export default function ProtectionRouteTrial() {
  return <Controller nativeRoutingTargets={["net.EFUSE_OVP"]} />
}
