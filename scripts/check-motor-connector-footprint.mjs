import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"
const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const circuit = JSON.parse(
  readFileSync("dist/scripts/all-imports-audit/circuit.json", "utf8"),
)
const source = circuit.find(
  (element) =>
    element.type === "source_component" && element.name === "AUDIT_C189895",
)
assert.deepEqual(source.supplier_part_numbers.jlcpcb, ["C189895"])
const pcb = circuit.find(
  (element) =>
    element.type === "pcb_component" &&
    element.source_component_id === source.source_component_id,
)
const pads = circuit.filter(
  (element) =>
    element.type === "pcb_smtpad" &&
    element.pcb_component_id === pcb.pcb_component_id,
)
assert.equal(pads.length, 6)
function within(actual, specification) {
  assert.ok(
    Math.abs(actual - specification.nominal) <= specification.tolerance,
    `${actual} mm differs from ${specification.nominal} ±${specification.tolerance} mm`,
  )
}
const contacts = [1, 2, 3, 4].map((pin) =>
  pads.find((pad) => pad.port_hints.includes(`pin${pin}`)),
)
const contactRowY = contacts.reduce((sum, pad) => sum + pad.y, 0) / 4
const contactCenterX = contacts.reduce((sum, pad) => sum + pad.x, 0) / 4
for (const [index, pad] of contacts.entries()) {
  assert.equal(pad.shape, "rect")
  within(pad.width, { nominal: 0.6, tolerance: 0.05 })
  within(pad.x - contactCenterX, {
    nominal: (index - 1.5) * 1.25,
    tolerance: 0.05,
  })
  within(pad.y - contactRowY, { nominal: 0, tolerance: 0.05 })
}
for (const pin of [5, 6]) {
  const pad = pads.find((element) => element.port_hints.includes(`pin${pin}`))
  within(pad.width, { nominal: 1, tolerance: 0.1 })
  within(pad.height, { nominal: 2.7, tolerance: 0.1 })
  within(Math.abs(pad.x - contactCenterX), {
    nominal: 1.875 + 1.35 + 0.5,
    tolerance: 0.1,
  })
  within(contactRowY + contacts[0].height / 2 - (pad.y - pad.height / 2), {
    nominal: 5.4,
    tolerance: 0.1,
  })
}
writeFileSync(
  `evidence/rev-${revision}/MOTOR-CONNECTOR-FOOTPRINT-AUDIT.json`,
  JSON.stringify(
    {
      part: "C189895",
      mpn: "SM04B-GHS-TB(LF)(SN)",
      drawing: "JST GH catalogue, page 2, side-entry layout",
      drawing_file: "references/JST-GH.pdf",
      result: "passed for specified catalogue dimensions",
      scope:
        "Contact pitch/width, hold-down width/length/offset and total vertical span; pad geometry separately preserved by ALL-IMPORTS-AUDIT",
      contact_land_length_mm: contacts[0].height,
      contact_land_length_note:
        "Catalogue does not separately dimension contact-land length; exact supplier land retained, no custom adjustment",
      rated_current_a: 1,
      rated_wire_awg: 26,
      motor_rated_phase_current_a: 0.4,
      mating_housing: "GHR-04V-S",
      mating_contact: "SSHL-002T-P0.2",
      stock_observed: 6,
      stock_date: "2026-10-03",
      assembly_fit: "pending actual mating cable and complete 3D clearance",
    },
    null,
    2,
  ) + "\n",
)
console.log(
  "JST GH specified land dimensions pass; 1 A/AWG26 rating exceeds the selected 0.4 A motor phase rating. Assembly fit and stock freeze remain pending.",
)
