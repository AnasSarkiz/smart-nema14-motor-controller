import Controller from "../src/SmartNema14MotorController"

/** Compare the released native Pipeline4 on one net, with full copper and DRC. */
export default function NativeUartTxPipeline4Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline4"
      nativeRoutingNetNames={["TMC_UART_TX"]}
      nativeRoutingTargets={[".U1 > .pin13", ".R4 > .pin1"]}
    />
  )
}
