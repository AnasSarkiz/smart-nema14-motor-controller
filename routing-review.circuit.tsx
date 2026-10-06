import SmartNema14MotorController from "./index.circuit"

/** RP2040 placement review: no legacy STM32 copper is replayed. */
export default () => <SmartNema14MotorController routeRemaining={false} />
