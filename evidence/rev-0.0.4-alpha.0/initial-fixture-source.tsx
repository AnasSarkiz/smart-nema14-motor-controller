import { HoLRT1206_1W_180mR_1_ } from "../../imports/HoLRT1206_1W_180mR_1_"
import { HoLRT1206_1W_150mR_1_ } from "../../imports/HoLRT1206_1W_150mR_1_"
import { SRN6028C_3R9M } from "../../imports/SRN6028C_3R9M"
import { STM32G0B1CBT6 } from "../../imports/STM32G0B1CBT6/STM32G0B1CBT6"
import { TCPP01_M12 } from "../../imports/TCPP01_M12/TCPP01_M12"

// Isolated import geometry fixture. These coordinates are not board placement.
export default function ImportAudit() {
  return (
    <board width="80mm" height="35mm" layers={4} routingDisabled schLayout={{ mode: "none" }}>
      <net name="GND" isGround />
      <net name="V3V3" isPower />
      <net name="AUDIT_SENSE_A" />
      <net name="AUDIT_SENSE_B" />
      <net name="AUDIT_BUCK_SW" />
      <schematicsheet name="ImportAudit" sheetSize="A4">
        <HoLRT1206_1W_180mR_1_ name="R180" pcbX={-27} pcbY={0} schX={0} schY={6} connections={{ pin1: "net.AUDIT_SENSE_A", pin2: "net.GND" }} />
        <HoLRT1206_1W_150mR_1_ name="R150" pcbX={-19} pcbY={0} schX={6} schY={6} connections={{ pin1: "net.AUDIT_SENSE_B", pin2: "net.GND" }} />
        <SRN6028C_3R9M name="L39" pcbX={-8} pcbY={0} schX={12} schY={6} connections={{ pin1: "net.AUDIT_BUCK_SW", pin2: "net.V3V3" }} />
        <STM32G0B1CBT6 name="U_MCU" pcbX={8} pcbY={0} schX={-8} schY={0} connections={{ VBAT: "net.V3V3", VREF_POS: "net.V3V3", VDD: "net.V3V3", VSS: "net.GND" }} />
        <TCPP01_M12 name="U_TCPP" pcbX={26} pcbY={0} schX={5} schY={0} connections={{ VCC: "net.V3V3", GND: "net.GND" }} />
      </schematicsheet>
    </board>
  )
}
