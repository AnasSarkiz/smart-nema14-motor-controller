import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"
import { createHash } from "node:crypto"

const input = process.argv[2] ?? "dist/index/circuit.json"
const bytes = readFileSync(input)
const circuit = JSON.parse(bytes)
const portReviews = []
for (const reference of ["J_USB", "J_DATA"]) {
  const usb = circuit.find(
    (element) =>
      element.type === "source_component" && element.name === reference,
  )
  assert.ok(usb, "Missing purchased USB connector")
  assert.equal(usb.ftype, "simple_connector")
  assert.equal(usb.standard, "usb_c")
  assert.equal(usb.manufacturer_part_number, "USB4110-GF-A")
  assert.deepEqual(usb.supplier_part_numbers, { jlcpcb: ["C5143397"] })
  const ports = circuit.filter(
    (element) =>
      element.type === "source_port" &&
      element.source_component_id === usb.source_component_id,
  )
  // The official import combines duplicate power contacts into these sixteen
  // purchased pad/pin groups. In particular, its D- aliases are DN, not DM.
  const aliases = new Map([
    [8, "SHELL4"],
    [9, "SHELL3"],
    [10, "SHELL2"],
    [11, "SHELL1"],
    [12, "DN1"],
    [13, "DP2"],
    [14, "SBU1"],
    [15, "CC2"],
    [16, "DP1"],
    [17, "DN2"],
    [18, "CC1"],
    [19, "SBU2"],
    [20, "VBUS1"],
    [21, "VBUS2"],
    [22, "GND1"],
    [23, "GND2"],
  ])
  assert.equal(ports.length, aliases.size)
  for (const port of ports) {
    assert.ok(port.port_hints.includes(aliases.get(port.pin_number)))
    const schematic = circuit.filter(
      (element) =>
        element.type === "schematic_port" &&
        element.source_port_id === port.source_port_id,
    )
    assert.equal(
      schematic.length,
      1,
      `USB pin ${port.pin_number} missing or duplicated in the standard symbol`,
    )
    const pcb = circuit.filter(
      (element) =>
        element.type === "pcb_port" &&
        element.source_port_id === port.source_port_id,
    )
    assert.equal(
      pcb.length,
      1,
      `USB pin ${port.pin_number} missing or duplicated on PCB`,
    )
    assert.equal(
      circuit.filter(
        (element) =>
          element.type === "pcb_smtpad" &&
          element.pcb_port_id === pcb[0].pcb_port_id,
      ).length,
      1,
    )
  }
  portReviews.push({
    reference,
    standard: usb.standard,
    physical_pin_groups: ports.length,
  })
}
const report = {
  canonical_sha256: createHash("sha256").update(bytes).digest("hex"),
  standard: "usb_c",
  purchased_part: "C5143397",
  connectors: portReviews,
  physical_pin_groups: 32,
  all_imported_aliases_and_pads_present: true,
  all_pin_groups_represented_in_standard_schematic: true,
  passed: true,
}
if (process.argv[3])
  writeFileSync(process.argv[3], `${JSON.stringify(report, null, 2)}\n`)
console.log(
  "Native USB-C standards: both connectors, all thirty-two official purchased pin/pad groups represented",
)
