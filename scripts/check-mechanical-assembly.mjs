import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const circuit = JSON.parse(readFileSync("dist/assembly/circuit.json", "utf8"))
const cad = circuit.filter((element) => element.type === "cad_component")
const pcb = circuit.filter((element) => element.type === "pcb_component")
assert.equal(
  circuit.filter((element) => element.type === "pcb_board").length,
  1,
)
assert.equal(pcb.length, 111)
assert.equal(
  cad.length,
  109,
  "108 default-fitted PCB components plus unchanged manufacturer motor",
)
const sources = circuit.filter((element) => element.type === "source_component")
const sourceById = new Map(
  sources.map((element) => [element.source_component_id, element]),
)
const dnp = pcb.filter((component) => component.do_not_place)
assert.deepEqual(
  dnp
    .map((component) => sourceById.get(component.source_component_id).name)
    .sort(),
  ["C6", "R50", "U4"],
)
assert.ok(
  dnp.every(
    (component) =>
      !cad.some(
        (model) => model.pcb_component_id === component.pcb_component_id,
      ),
  ),
  "Default DNP parts must not appear as fitted models",
)
const motorSource = sources.find(
  (element) => element.name === "OfficialStepperOnline14hm11Motor",
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
for (const type of ["pcb_trace", "pcb_via"])
  assert.equal(circuit.filter((element) => element.type === type).length, 0)
assert.equal(
  circuit.filter((element) => element.type.includes("error")).length,
  0,
)
const missingModels = pcb
  .filter((component) => !component.do_not_place)
  .flatMap((component) => {
    const model = cad.find(
      (element) => element.pcb_component_id === component.pcb_component_id,
    )
    if (model?.model_step_url) return []
    const source = sources.find(
      (element) =>
        element.source_component_id === component.source_component_id,
    )
    return [
      {
        reference: source.name,
        part: source.supplier_part_numbers?.jlcpcb,
        show_as_bounding_box: model?.show_as_bounding_box ?? false,
      },
    ]
  })
const mountingHoles = circuit.filter(
  (element) => element.type === "pcb_hole" && !element.pcb_component_id,
)
assert.equal(
  mountingHoles.length,
  4,
  "Four independent controller/carrier holes are required",
)
assert.ok(mountingHoles.every((hole) => hole.hole_diameter === 2.5))
writeFileSync(
  `evidence/rev-${revision}/ASSEMBLY-MODEL-AUDIT.json`,
  JSON.stringify(
    {
      revision,
      pcb_component_count: pcb.length,
      cad_entry_count: cad.length,
      default_fitted_count: pcb.length - dnp.length,
      dnp_references: ["C6", "R50", "U4"],
      exact_motor_reference: "passed",
      genuine_step_model_count: cad.length - missingModels.length,
      missing_models: missingModels,
      pcb_mounting_hole_count: mountingHoles.length,
      fit_status:
        "Exploded display only; nominal mounted carrier audit is separate. Production mounting/harness qualification pending",
      routing_status: "disabled",
      fabrication_ready: false,
    },
    null,
    2,
  ) + "\n",
)
assert.deepEqual(
  missingModels,
  [],
  "Missing genuine STEP model blocks complete 3D component assembly qualification; bounding-box display is insufficient",
)
console.log(
  "Complete component model inventory verified. PCB support and mechanical BRep clearance review remain separate gates.",
)
