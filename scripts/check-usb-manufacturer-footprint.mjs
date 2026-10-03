import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"

const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const circuit = JSON.parse(
  readFileSync("dist/scripts/usb-import-audit/circuit.json", "utf8"),
)
const source = circuit.find(
  (element) => element.type === "source_component" && element.name === "J_USB",
)
assert.deepEqual(source.supplier_part_numbers.jlcpcb, ["C5143397"])
const pcb = circuit.find(
  (element) =>
    element.type === "pcb_component" &&
    element.source_component_id === source.source_component_id,
)
assert.equal(pcb.rotation, 0)
const pads = circuit.filter(
  (element) =>
    element.type === "pcb_smtpad" &&
    element.pcb_component_id === pcb.pcb_component_id,
)
const holes = circuit.filter(
  (element) =>
    element.type === "pcb_hole" &&
    element.pcb_component_id === pcb.pcb_component_id,
)
const ports = circuit.filter(
  (element) =>
    element.type === "source_port" &&
    element.source_component_id === source.source_component_id,
)
// Independent dimensions transcribed from GCT USB4110 drawing B4, sheet 1:
// reference origin is the centre of the contact-land row, viewed from component side.
const expected = [
  { pin: 8, alias: "SHELL4", x: -5.11, y: -0.575, width: 2.18, height: 2 },
  { pin: 9, alias: "SHELL3", x: 5.11, y: -0.575, width: 2.18, height: 2 },
  { pin: 10, alias: "SHELL2", x: -5.11, y: -4.505, width: 2.18, height: 2 },
  { pin: 11, alias: "SHELL1", x: 5.11, y: -4.505, width: 2.18, height: 2 },
  { pin: 12, alias: "DN1", x: 0.25, y: 0, width: 0.3, height: 1.15 },
  { pin: 13, alias: "DP2", x: 0.75, y: 0, width: 0.3, height: 1.15 },
  { pin: 14, alias: "SBU1", x: 1.25, y: 0, width: 0.3, height: 1.15 },
  { pin: 15, alias: "CC2", x: 1.75, y: 0, width: 0.3, height: 1.15 },
  { pin: 16, alias: "DP1", x: -0.25, y: 0, width: 0.3, height: 1.15 },
  { pin: 17, alias: "DN2", x: -0.75, y: 0, width: 0.3, height: 1.15 },
  { pin: 18, alias: "CC1", x: -1.25, y: 0, width: 0.3, height: 1.15 },
  { pin: 19, alias: "SBU2", x: -1.75, y: 0, width: 0.3, height: 1.15 },
  { pin: 20, alias: "VBUS1", x: 2.4, y: 0, width: 0.6, height: 1.15 },
  { pin: 21, alias: "VBUS2", x: -2.4, y: 0, width: 0.6, height: 1.15 },
  { pin: 22, alias: "GND1", x: 3.2, y: 0, width: 0.6, height: 1.15 },
  { pin: 23, alias: "GND2", x: -3.2, y: 0, width: 0.6, height: 1.15 },
]
const contactY =
  pads
    .filter((pad) => Number(pad.port_hints[0].slice(3)) >= 12)
    .reduce((sum, pad) => sum + pad.y, 0) / 12
function close(actual, target) {
  assert.ok(
    Math.abs(actual - target) <= 0.0002,
    `${actual} differs from drawing nominal ${target} mm`,
  )
}
for (const land of expected) {
  const pad = pads.find((element) =>
    element.port_hints.includes(`pin${land.pin}`),
  )
  const port = ports.find((element) => element.pin_number === land.pin)
  assert.ok(
    port.port_hints.includes(land.alias),
    `Manufacturer signal mismatch at pin ${land.pin}`,
  )
  assert.equal(pad.shape, "rect")
  close(pad.x - pcb.center.x, land.x)
  close(pad.y - contactY, land.y)
  close(pad.width, land.width)
  close(pad.height, land.height)
}
assert.equal(holes.length, 2)
for (const x of [-2.89, 2.89]) {
  const hole = holes.find(
    (element) => Math.sign(element.x - pcb.center.x) === Math.sign(x),
  )
  assert.equal(hole.hole_shape, "circle")
  close(hole.x - pcb.center.x, x)
  close(hole.y - contactY, -1.075)
  close(hole.hole_diameter, 0.65)
}
const hasCadModel = circuit.some(
  (element) =>
    element.type === "cad_component" &&
    element.pcb_component_id === pcb.pcb_component_id &&
    Boolean(element.model_step_url || element.model_obj_url),
)
writeFileSync(
  `evidence/rev-${revision}/USB-MANUFACTURER-FOOTPRINT-AUDIT.json`,
  JSON.stringify(
    {
      part: "C5143397",
      manufacturer: "GCT USB4110-GF-A",
      drawing: "USB4110 B4, 2024-05-22, sheet 1",
      drawing_file: "references/USB4110-GF-A-current.pdf",
      result: "passed",
      scope:
        "All 16 copper lands, their manufacturer signals and both NPTH locating holes; independent nominal dimensions",
      numeric_tolerance_mm: 0.0002,
      manufacturer_layout_tolerance_mm: 0.05,
      cad_model_available: hasCadModel,
      assembly_clearance_status: "not qualified",
      expected_lands: expected,
    },
    null,
    2,
  ) + "\n",
)
console.log(
  "GCT B4 footprint audit passed: 16 correctly mapped lands and two NPTH locating holes. Full 3D connector assembly remains unqualified.",
)
