import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const circuit = JSON.parse(readFileSync("dist/assembly/circuit.json", "utf8"))
const sources = circuit.filter((element) => element.type === "source_component")
const pcbComponents = circuit.filter(
  (element) => element.type === "pcb_component",
)
const rearHoles = circuit.filter(
  (element) => element.type === "pcb_hole" && !element.pcb_component_id,
)
const board = circuit.find((element) => element.type === "pcb_board")
assert.equal(board.width, 35)
assert.equal(board.height, 35)
assert.equal(board.thickness, 1.6)
assert.equal(rearHoles.length, 2, "Only the two official rear mounting holes")
for (const [index, hole] of rearHoles.entries()) {
  const sign = index === 0 ? 1 : -1
  assert.ok(Math.abs(hole.x - sign * 5.553822212612591) < 1e-9)
  assert.ok(Math.abs(hole.y - sign * 4.660210170227409) < 1e-9)
  assert.equal(hole.hole_diameter, 2.2)
}
const encoderSource = sources.find((element) => element.name === "U4")
const encoderPcb = pcbComponents.find(
  (element) =>
    element.source_component_id === encoderSource.source_component_id,
)
assert.deepEqual(encoderPcb.center, { x: 0, y: 0 })
assert.equal(encoderPcb.layer, "bottom")
const motorSource = sources.find(
  (element) => element.name === "OfficialPhidgets3323Motor",
)
const motorCad = circuit.find(
  (element) =>
    element.type === "cad_component" &&
    element.source_component_id === motorSource.source_component_id,
)
assert.equal(motorCad.model_step_url, "./references/motor/3323_0.stp")
assert.deepEqual(motorCad.model_origin_position, {
  x: -17.475,
  y: 17.475,
  z: 0,
})
assert.deepEqual(motorCad.rotation, { x: 180, y: 0, z: 0 })
assert.deepEqual(motorCad.position, { x: 0, y: 0, z: -19.1 })
assert.equal(
  pcbComponents.length,
  57,
  "56 actual draft parts plus official JST envelope",
)
assert.equal(
  circuit.filter((element) => element.type === "cad_component").length,
  61,
)
assert.equal(
  circuit.filter((element) => element.type.includes("error")).length,
  0,
)
assert.equal(
  circuit.filter((element) => element.type === "pcb_trace").length,
  0,
)
assert.equal(circuit.filter((element) => element.type === "pcb_via").length, 0)
assert.ok(
  circuit
    .filter((element) => element.type === "schematic_sheet")
    .every(
      (element) =>
        element.sheet_size === "a4" &&
        element.sheet_width === 297 &&
        element.sheet_height === 210,
    ),
)
console.log(
  "Unrouted diagnostic assembly: 57 supplier parts, official motor frame, two rear holes, bottom encoder centered; no generated errors, routes or vias.",
)
console.log(
  "This regression check does not pass mechanical, full placement or fabrication qualification.",
)
