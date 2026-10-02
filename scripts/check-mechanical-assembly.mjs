import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"

const circuit = JSON.parse(readFileSync("dist/assembly/circuit.json", "utf8"))
const cad = circuit.filter((element) => element.type === "cad_component")
assert.equal(
  cad.length,
  58,
  "Official motor plus 57 supplier PCB models; no assumed mounting hardware",
)
const motorSource = circuit.find(
  (element) =>
    element.type === "source_component" &&
    element.name === "OfficialStepperOnline14hm11Motor",
)
const motorCad = cad.find(
  (element) => element.source_component_id === motorSource.source_component_id,
)
assert.equal(
  motorCad.model_step_url,
  "./references/motor/14hm11-0404s/14HM11-0404S.STEP",
)
assert.deepEqual(motorCad.model_origin_position, { x: 0, y: 0, z: 28.2 })
assert.deepEqual(motorCad.position, { x: 0, y: 0, z: 65 })
assert.deepEqual(motorCad.rotation, { x: 0, y: 0, z: 0 })
assert.equal(motorCad.model_unit_to_mm_scale_factor, 1)
assert.equal(
  createHash("sha256")
    .update(readFileSync(motorCad.model_step_url))
    .digest("hex"),
  "959f43e95b7840beae5ffbd56e997e23c5004a1b09e16b7caa40400296e46281",
)
assert.equal(
  circuit.filter((element) => element.type === "pcb_board").length,
  1,
)
assert.equal(
  circuit.filter((element) => element.type === "pcb_component").length,
  57,
)
assert.equal(
  circuit.filter(
    (element) => element.type === "pcb_hole" && !element.pcb_component_id,
  ).length,
  0,
)
for (const type of ["pcb_trace", "pcb_via"]) {
  assert.equal(circuit.filter((element) => element.type === type).length, 0)
}
assert.equal(
  circuit.filter((element) => element.type.includes("error")).length,
  0,
)

const controller = JSON.parse(
  readFileSync("dist/controller-preview/circuit.json", "utf8"),
)
assert.equal(
  controller.filter((element) => element.type === "pcb_component").length,
  57,
)
assert.equal(
  controller.filter(
    (element) => element.type === "pcb_hole" && !element.pcb_component_id,
  ).length,
  0,
  "Retired Phidgets rear holes must be absent",
)
assert.equal(
  controller.filter((element) => element.type === "pcb_trace").length,
  0,
)
assert.equal(
  controller.filter((element) => element.type === "pcb_via").length,
  0,
)
assert.equal(
  controller.filter((element) => element.type.includes("error")).length,
  0,
)
console.log(
  "Official motor raised +65 mm in Z above the actual unrouted PCB; no mounting hardware assumed.",
)
console.log(
  "Mounting and encoder decisions remain unresolved. These checks do not qualify assembly fit or fabrication.",
)
