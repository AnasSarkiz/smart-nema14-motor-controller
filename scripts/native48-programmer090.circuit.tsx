import SmartNema14MotorController from "../src/SmartNema14MotorController"
export default function Native48Programmer090() {
  const netNames = [
    "SWDIO_CONN",
    "SWCLK_CONN",
    "NRST_CONN",
    "SWDIO_GUARDED",
    "SWCLK_GUARDED",
    "NRST_GUARDED",
    "VBUS_ADC_PRE_GUARD",
  ]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
