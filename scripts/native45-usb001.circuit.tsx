import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Bounded USB selection; coupling/return/skew require independent review. */
export default function Native45Usb001() {
  return (
    <SmartNema14MotorController
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingNetNames={["USB_DP", "USB_DM", "MCU_USB_DP", "MCU_USB_DM"]}
      nativeRoutingTargets={[
        "net.USB_DP",
        "net.USB_DM",
        "net.MCU_USB_DP",
        "net.MCU_USB_DM",
      ]}
    />
  )
}
