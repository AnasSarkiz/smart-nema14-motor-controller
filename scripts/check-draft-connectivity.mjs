import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

// Independent physical-pin checks against the manufacturer pin tables.
// This qualifies only the implemented draft blocks, never the complete board.
const circuitJson = JSON.parse(
  readFileSync(process.argv[2] ?? "dist/index/circuit.json", "utf8"),
)
const components = circuitJson.filter(
  (element) => element.type === "source_component",
)
const ports = circuitJson.filter((element) => element.type === "source_port")
const nets = circuitJson.filter((element) => element.type === "source_net")
const traces = circuitJson.filter((element) => element.type === "source_trace")

function checkPinNet(pinReference, expectedNetName) {
  const component = components.find(
    (candidate) => candidate.name === pinReference.ref,
  )
  assert.ok(component, `Missing ${pinReference.ref}`)
  const port = ports.find(
    (candidate) =>
      candidate.source_component_id === component.source_component_id &&
      candidate.pin_number === pinReference.pin,
  )
  assert.ok(
    port,
    `Missing ${pinReference.ref} physical pin ${pinReference.pin}`,
  )
  const connectedNetIds = traces
    .filter((trace) =>
      trace.connected_source_port_ids.includes(port.source_port_id),
    )
    .flatMap((trace) => trace.connected_source_net_ids)
  const connectedNetNames = nets
    .filter((net) => connectedNetIds.includes(net.source_net_id))
    .map((net) => net.name)
  assert.deepEqual(
    [...new Set(connectedNetNames)],
    [expectedNetName],
    `${pinReference.ref} physical pin ${pinReference.pin}`,
  )
}

for (const [ref, pin, net] of [
  ["U1", 4, "V3V3"],
  ["U1", 5, "V3V3"],
  ["U1", 6, "V3V3"],
  ["U1", 7, "GND"],
  ["U1", 10, "NRST"],
  ["U1", 44, "CAN_RX"],
  ["U1", 45, "CAN_TX"],
  ["U1", 47, "I2C_SCL"],
  ["U1", 48, "I2C_SDA"],
  ["U4", 1, "V3V3"],
  ["U4", 2, "V3V3"],
  ["U4", 4, "GND"],
  ["U4", 6, "I2C_SDA"],
  ["U4", 7, "I2C_SCL"],
  ["U4", 8, "GND"],
  ["U6", 1, "CAN_TX"],
  ["U6", 2, "GND"],
  ["U6", 3, "V3V3"],
  ["U6", 4, "CAN_RX"],
  ["U6", 6, "CAN_L"],
  ["U6", 7, "CAN_H"],
  ["U6", 8, "CAN_RS"],
  ["U1", 13, "TMC_UART_TX"],
  ["U1", 14, "TMC_UART_RX"],
  ["U1", 15, "TMC_ENABLE_N"],
  ["U1", 16, "TMC_DIAG"],
  ["U1", 17, "TMC_STEP"],
  ["U1", 18, "TMC_DIR"],
  ["U5", 1, "V3V3"],
  ["U5", 2, "VM"],
  ["U5", 3, "VM"],
  ["U5", 4, "GND"],
  ["U5", 5, "BUCK_SW"],
  ["U5", 6, "BUCK_BST"],
  ["U2", 1, "MOTOR_B2"],
  ["U2", 2, "TMC_ENABLE_N"],
  ["U2", 3, "GND"],
  ["U2", 4, "TMC_CPO"],
  ["U2", 5, "TMC_CPI"],
  ["U2", 6, "TMC_VCP"],
  ["U2", 7, "GND"],
  ["U2", 8, "TMC_5VOUT"],
  ["U2", 9, "GND"],
  ["U2", 10, "GND"],
  ["U2", 11, "TMC_DIAG"],
  ["U2", 13, "GND"],
  ["U2", 14, "TMC_UART_RX"],
  ["U2", 15, "V3V3"],
  ["U2", 16, "TMC_STEP"],
  ["U2", 17, "TMC_VREF"],
  ["U2", 18, "GND"],
  ["U2", 19, "TMC_DIR"],
  ["U2", 20, "GND"],
  ["U2", 21, "MOTOR_A2"],
  ["U2", 22, "VM"],
  ["U2", 23, "TMC_SENSE_A"],
  ["U2", 24, "MOTOR_A1"],
  ["U2", 25, "GND"],
  ["U2", 26, "MOTOR_B1"],
  ["U2", 27, "TMC_SENSE_B"],
  ["U2", 28, "VM"],
  ["U2", 29, "GND"],
  ["L1", 1, "BUCK_SW"],
  ["L1", 2, "V3V3"],
  ["C10", 1, "BUCK_BST"],
  ["C10", 2, "BUCK_SW"],
  ["C13", 1, "TMC_CPO"],
  ["C13", 2, "TMC_CPI"],
  ["C14", 1, "TMC_VCP"],
  ["C14", 2, "VM"],
  ["C19", 1, "VM"],
  ["C19", 2, "GND"],
  ["C20", 1, "VM"],
  ["C20", 2, "GND"],
  ["R4", 1, "TMC_UART_TX"],
  ["R4", 2, "TMC_UART_RX"],
  ["R5", 1, "TMC_SENSE_A"],
  ["R5", 2, "GND"],
  ["R6", 1, "TMC_SENSE_B"],
  ["R6", 2, "GND"],
  ["R7", 1, "V3V3"],
  ["R7", 2, "TMC_ENABLE_N"],
  ["R10", 1, "TMC_5VOUT"],
  ["R10", 2, "TMC_VREF"],
  ["R11", 1, "TMC_VREF"],
  ["R11", 2, "GND"],
  ["U1", 11, "VBUS_ADC"],
  ["U1", 24, "PD_DB"],
  ["U1", 25, "PD_FLT"],
  ["U1", 27, "PD_CC2_MCU"],
  ["U1", 28, "PD_CC1_MCU"],
  ["U1", 29, "GND"],
  ["U1", 32, "GND"],
  ["U1", 33, "USB_DM"],
  ["U1", 34, "USB_DP"],
  ["J_USB", 8, "GND"],
  ["J_USB", 9, "GND"],
  ["J_USB", 10, "GND"],
  ["J_USB", 11, "GND"],
  ["J_USB", 12, "USB_DM"],
  ["J_USB", 13, "USB_DP"],
  ["J_USB", 15, "PD_CC2_CONN"],
  ["J_USB", 16, "USB_DP"],
  ["J_USB", 17, "USB_DM"],
  ["J_USB", 18, "PD_CC1_CONN"],
  ["J_USB", 20, "VBUS_CONN"],
  ["J_USB", 21, "VBUS_CONN"],
  ["J_USB", 22, "GND"],
  ["J_USB", 23, "GND"],
  ["U3", 1, "PD_CC2_MCU"],
  ["U3", 2, "GND"],
  ["U3", 3, "PD_CC1_MCU"],
  ["U3", 4, "VBUS_PROTECTED"],
  ["U3", 5, "PD_GATE"],
  ["U3", 6, "PD_OVP"],
  ["U3", 7, "PD_CC1_CONN"],
  ["U3", 8, "VBUS_CONN"],
  ["U3", 9, "PD_CC2_CONN"],
  ["U3", 10, "PD_DB"],
  ["U3", 11, "PD_FLT"],
  ["U3", 12, "V3V3"],
  ["U3", 13, "GND"],
  ["Q_PD", 1, "VBUS_PROTECTED"],
  ["Q_PD", 2, "VBUS_PROTECTED"],
  ["Q_PD", 3, "VBUS_PROTECTED"],
  ["Q_PD", 4, "PD_GATE"],
  ["Q_PD", 5, "VBUS_CONN"],
  ["Q_PD", 6, "VBUS_CONN"],
  ["Q_PD", 7, "VBUS_CONN"],
  ["Q_PD", 8, "VBUS_CONN"],
  ["Q_PD", 9, "VBUS_CONN"],
  ["D_USB", 1, "USB_DP"],
  ["D_USB", 2, "USB_DM"],
  ["D_USB", 3, "GND"],
  ["D_VBUS", 1, "VBUS_CONN"],
  ["D_VBUS", 2, "GND"],
  ["C22", 1, "V3V3"],
  ["C22", 2, "GND"],
  ["C23", 1, "PD_CC1_CONN"],
  ["C23", 2, "GND"],
  ["C24", 1, "PD_CC2_CONN"],
  ["C24", 2, "GND"],
  ["C25", 1, "VBUS_CONN"],
  ["C25", 2, "GND"],
  ["C26", 1, "VBUS_CONN"],
  ["C26", 2, "GND"],
  ["C27", 1, "VBUS_ADC"],
  ["C27", 2, "GND"],
  ["R12", 1, "V3V3"],
  ["R12", 2, "PD_FLT"],
  ["R13", 1, "VBUS_CONN"],
  ["R13", 2, "PD_OVP_SERIES"],
  ["R14", 1, "PD_OVP_SERIES"],
  ["R14", 2, "PD_OVP"],
  ["R15", 1, "PD_OVP"],
  ["R15", 2, "GND"],
  ["R16", 1, "VBUS_PROTECTED"],
  ["R16", 2, "VBUS_DIV"],
  ["R17", 1, "VBUS_DIV"],
  ["R17", 2, "GND"],
  ["R18", 1, "VBUS_DIV"],
  ["R18", 2, "VBUS_ADC_PRE_GUARD"],
  ["U1", 12, "TEMP_ALERT_N"],
  ["U1", 19, "EXT_STEP"],
  ["U1", 20, "EXT_DIR"],
  ["U1", 21, "EXT_ENABLE_N"],
  ["U1", 22, "LIMIT1"],
  ["U1", 23, "LIMIT2"],
  ["U1", 26, "POWER_HIGH_CURRENT"],
  ["U1", 30, "LED_STATUS_DRIVE"],
  ["U1", 31, "LED_FAULT_DRIVE"],
  ["U1", 35, "SWDIO"],
  ["U1", 36, "SWCLK"],
  ["U1", 42, "CAN_RS"],
  ["U1", 43, "EFUSE_FLT_N"],
  ["U7", 1, "POWER_GOOD"],
  ["U7", 2, "SWDIO_CONN"],
  ["U7", 3, "SWDIO_GUARDED"],
  ["U7", 4, "POWER_GOOD"],
  ["U7", 5, "SWCLK_CONN"],
  ["U7", 6, "SWCLK_GUARDED"],
  ["U7", 8, "GND"],
  ["U7", 9, "NRST_GUARDED"],
  ["U7", 10, "NRST_CONN"],
  ["U7", 11, "POWER_GOOD"],
  ["U7", 13, "VBUS_ADC"],
  ["U7", 14, "VBUS_ADC_PRE_GUARD"],
  ["U7", 15, "POWER_GOOD"],
  ["U7", 16, "V3V3"],
  ["U8", 2, "POWER_GOOD"],
  ["U8", 1, "GND"],
  ["U8", 3, "V3V3"],
  ["U9", 1, "I2C_SCL"],
  ["U9", 2, "GND"],
  ["U9", 3, "TEMP_ALERT_N"],
  ["U9", 4, "GND"],
  ["U9", 5, "V3V3"],
  ["U9", 6, "I2C_SDA"],
  ["U10", 8, "VBUS_PROTECTED"],
  ["U10", 9, "VBUS_PROTECTED"],
  ["U10", 10, "EFUSE_EN"],
  ["U10", 12, "EFUSE_OVP"],
  ["U10", 13, "EFUSE_RTN"],
  ["U10", 15, "EFUSE_RTN"],
  ["U10", 17, "GND"],
  ["U10", 19, "EFUSE_ILIM"],
  ["U10", 20, "EFUSE_DVDT"],
  ["U10", 22, "EFUSE_FLT_N"],
  ["U10", 23, "VM"],
  ["U10", 24, "VM"],
  ["U10", 25, "EFUSE_RTN"],
  ["C33", 1, "EFUSE_DVDT"],
  ["C33", 2, "EFUSE_RTN"],
  ["C34", 1, "VBUS_PROTECTED"],
  ["C34", 2, "GND"],
  ["R39", 2, "EFUSE_RTN"],
  ["R43", 2, "EFUSE_RTN"],
  ["R44", 2, "EFUSE_RTN"],
  ["J_SWD", 2, "SWDIO_CONN"],
  ["J_SWD", 3, "GND"],
  ["J_SWD", 4, "SWCLK_CONN"],
  ["J_SWD", 5, "NRST_CONN"],
  ["J_MOTOR", 1, "MOTOR_A1"],
  ["J_MOTOR", 2, "MOTOR_A2"],
  ["J_MOTOR", 3, "MOTOR_B1"],
  ["J_MOTOR", 4, "MOTOR_B2"],
  ["J_MOTOR", 5, "GND"],
  ["J_MOTOR", 6, "GND"],
  ["J_IO", 1, "GND"],
  ["J_IO", 2, "CAN_H"],
  ["J_IO", 3, "CAN_L"],
  ["J_IO", 4, "GND"],
  ["J_IO", 5, "EXT_STEP_CONN"],
  ["J_IO", 6, "EXT_DIR_CONN"],
  ["J_IO", 7, "EXT_ENABLE_N_CONN"],
  ["J_IO", 8, "LIMIT1_CONN"],
  ["J_IO", 9, "LIMIT2_CONN"],
  ["J_IO", 10, "GND"],
  ["J_IO", 11, "GND"],
  ["J_IO", 12, "GND"],
  ["D_IO1", 1, "EXT_STEP_CONN"],
  ["D_IO1", 2, "EXT_DIR_CONN"],
  ["D_IO1", 3, "GND"],
  ["D_IO1", 4, "EXT_ENABLE_N_CONN"],
  ["D_IO1", 5, "LIMIT1_CONN"],
  ["D_IO1", 8, "GND"],
  ["D_IO2", 1, "LIMIT2_CONN"],
  ["D_IO2", 3, "GND"],
  ["D_IO2", 8, "GND"],
  ["D_CAN", 1, "CAN_H"],
  ["D_CAN", 2, "CAN_L"],
  ["D_CAN", 3, "GND"],
  ["Q_ILIM", 1, "POWER_HIGH_CURRENT"],
  ["Q_ILIM", 2, "EFUSE_RTN"],
  ["Q_ILIM", 3, "EFUSE_ILIM_SWITCH"],
  ["LED_POWER", 1, "GND"],
  ["LED_POWER", 2, "LED_POWER_A"],
  ["LED_STATUS", 1, "GND"],
  ["LED_STATUS", 2, "LED_STATUS_A"],
  ["LED_FAULT", 1, "GND"],
  ["LED_FAULT", 2, "LED_FAULT_A"],
  ["R19", 1, "V3V3"],
  ["R19", 2, "POWER_GOOD"],
  ["R20", 1, "SWDIO_GUARDED"],
  ["R20", 2, "SWDIO"],
  ["R21", 1, "SWCLK_GUARDED"],
  ["R21", 2, "SWCLK"],
  ["R22", 1, "NRST_GUARDED"],
  ["R22", 2, "NRST"],
  ["R49", 1, "CAN_H"],
  ["R49", 2, "CAN_TERM_LINK"],
  ["R50", 1, "CAN_TERM_LINK"],
  ["R50", 2, "CAN_L"],
  ["R51", 1, "VBUS_ADC"],
  ["R51", 2, "GND"],
  ["R52", 1, "SWDIO"],
  ["R52", 2, "GND"],
  ["R53", 1, "SWCLK"],
  ["R53", 2, "GND"],
])
  checkPinNet({ ref, pin }, net)

assert.equal(
  components.length,
  111,
  "Do not validate an empty or unexpected draft",
)
assert.ok(
  components.every(
    (component) => component.supplier_part_numbers?.jlcpcb?.length > 0,
  ),
  "Every instantiated part must carry a JLCPCB supplier number",
)
const sheets = circuitJson.filter(
  (element) => element.type === "schematic_sheet",
)
assert.equal(sheets.length, 9)
assert.ok(
  sheets.every(
    (sheet) =>
      sheet.sheet_size === "a4" &&
      sheet.sheet_width === 297 &&
      sheet.sheet_height === 210,
  ),
)
const powerNet = nets.find((net) => net.name === "V3V3")
const groundNet = nets.find((net) => net.name === "GND")
assert.notEqual(
  powerNet.subcircuit_connectivity_map_key,
  groundNet.subcircuit_connectivity_map_key,
  "Power and ground must be separate connectivity groups",
)
const distinctPowerNets = [
  "GND",
  "EFUSE_RTN",
  "V3V3",
  "VM",
  "TMC_5VOUT",
  "VBUS_CONN",
  "VBUS_PROTECTED",
].map((netName) => {
  const net = nets.find((candidate) => candidate.name === netName)
  assert.ok(net, `Missing ${netName}`)
  return net.subcircuit_connectivity_map_key
})
assert.equal(
  new Set(distinctPowerNets).size,
  distinctPowerNets.length,
  "Different supply rails must never be shorted together",
)
for (const ref of ["R5", "R6"]) {
  const resistor = components.find((component) => component.name === ref)
  assert.equal(resistor.ftype, "simple_resistor")
  assert.equal(resistor.resistance, 1, `${ref} sense resistance`)
  assert.deepEqual(resistor.supplier_part_numbers.jlcpcb, ["C513714"])
}
for (const ref of ["C19", "C20"]) {
  const capacitor = components.find((component) => component.name === ref)
  assert.equal(capacitor.capacitance, 100e-6, `${ref} motor bulk`)
  assert.equal(
    capacitor.are_pins_interchangeable,
    false,
    `${ref} must stay polarized`,
  )
}
assert.equal(
  components.find((component) => component.name === "C13").capacitance,
  22e-9,
  "Charge-pump flying capacitor must be 22 nF",
)
assert.equal(
  components.find((component) => component.name === "L1").inductance,
  "3.9uH",
  "Buck inductor must match the reviewed ripple calculation",
)
assert.deepEqual(
  components.find((component) => component.name === "L1").supplier_part_numbers
    .jlcpcb,
  ["C19947652"],
  "Buck inductor must use its own Bourns supplier import",
)
for (const ref of ["C23", "C24"]) {
  const capacitor = components.find((component) => component.name === ref)
  assert.equal(capacitor.capacitance, 330e-12)
  assert.deepEqual(capacitor.supplier_part_numbers.jlcpcb, ["C5448795"])
}
assert.equal(
  components.find((component) => component.name === "R13").resistance,
  100000,
)
assert.equal(
  components.find((component) => component.name === "R15").resistance,
  6040,
)
for (const [ref, expectedOhms] of [
  ["R10", 10000],
  ["R11", 10000],
  ["R40", 100000],
  ["R41", 1000],
  ["R42", 4700],
  ["R43", 6040],
  ["R44", 24000],
  ["R45", 24000],
  ["R49", 120],
  ["R50", 0],
  ["R51", 100000],
  ["R52", 100000],
  ["R53", 100000],
]) {
  assert.equal(
    components.find((c) => c.name === ref)?.resistance,
    expectedOhms,
    `${ref} reviewed value`,
  )
}
assert.deepEqual(
  components.find((c) => c.name === "U10")?.supplier_part_numbers.jlcpcb,
  ["C2155767"],
)
assert.equal(components.find((c) => c.name === "C33")?.capacitance, 2.2e-6)
assert.equal(components.find((c) => c.name === "C34")?.capacitance, 2.2e-6)
assert.deepEqual(
  components.find((c) => c.name === "Q_ILIM")?.supplier_part_numbers.jlcpcb,
  ["C20512"],
)
assert.deepEqual(
  components.find((c) => c.name === "J_USB")?.supplier_part_numbers.jlcpcb,
  ["C5143397"],
)
assert.equal(
  circuitJson.filter((element) => element.type.startsWith("pcb_")).length,
  0,
  "Draft evidence must be generated with --disable-pcb; placement awaits mechanics",
)
assert.equal(
  circuitJson.filter((element) => element.type.endsWith("_error")).length,
  0,
)
console.log(
  "Draft checks passed: manufacturer pin connections, 111 supplier parts, nine A4 sheets, protected programming paths, current-limit values and separate supply rails; no PCB output.",
)
