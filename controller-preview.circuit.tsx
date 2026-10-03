import SmartNema14MotorController from "./index.circuit"

/** Independent unrouted electronics draft; no qualified motor mounting pattern. */
export default function ControllerPreview() {
  return (
    <SmartNema14MotorController
      mechanicalPreview
      usbRoutesEnabled={false}
      savedRoutesEnabled={false}
    />
  )
}
