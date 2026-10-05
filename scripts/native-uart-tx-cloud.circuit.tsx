import Controller from "../src/SmartNema14MotorController"

/** Shorter two-port native diagnostic with ordinary 0.30/0.60 mm vias. */
export default function NativeUartTxCloud() {
  return (
    <Controller
      nativeRoutingNetNames={["TMC_UART_TX"]}
      nativeRoutingTargets={[".U1 > .pin13", ".R4 > .pin1"]}
    />
  )
}
