import SmartNema14MotorController from "../src/SmartNema14MotorController"

export default function Native50Data022() {
  const netNames = ["USB_DATA_CC1", "USB_DATA_CC2", "USB_DATA_SENSE_GATE"]
  return (
    <SmartNema14MotorController
      freshRoutesEnabled
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
