import SmartNema14MotorController from "../src/SmartNema14MotorController"

/** Local power/driver/control trees; geometry and current checks remain required. */
export default function Native45Controls001() {
  const netNames = [
    "PD_VREG_1V2",
    "PD_VREG_2V7",
    "PD_VDD",
    "PD_VBUS_SENSE",
    "PD_DISCH",
    "PD_GATE",
    "PD_LOAD_ENABLE_N",
    "EFUSE_OVP_TOP_1",
    "EFUSE_OVP_TOP_2",
    "EFUSE_OVP",
    "EFUSE_ILIM",
    "EFUSE_ILIM_SWITCH",
    "EFUSE_DVDT",
    "EFUSE_EN",
    "BUZZER_GATE",
    "BUZZER_NEG",
    "TMC_CPO",
    "TMC_VCP",
    "TMC_5VOUT",
    "TMC_VREF",
  ]
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={netNames}
      nativeRoutingTargets={netNames.map((name) => `net.${name}`)}
    />
  )
}
