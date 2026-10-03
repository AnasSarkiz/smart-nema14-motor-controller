import SmartNema14MotorController from "./index.circuit"

/** Partial copper review only: native checks must retain missing-port errors. */
export default () => (
  <SmartNema14MotorController savedRoutesEnabled routeRemaining={false} />
)
