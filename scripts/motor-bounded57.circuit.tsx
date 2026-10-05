import Board from "./bounded-routing-trial.circuit"
export default function MotorBounded() {
  return (
    <Board
      boundedConnections={["net.MOTOR_B1", "net.TMC_UART_TX", "net.TMC_DIAG"]}
    />
  )
}
