import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"
const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const circuit = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const components = circuit.filter(
  (element) => element.type === "source_component",
)
assert.equal(components.length, 149)
const optionalPopulation = {
  R50: "CAN termination link: omit except on bus endpoints",
}
const records = components
  .map((component) => {
    const parts = component.supplier_part_numbers?.jlcpcb
    assert.equal(
      parts?.length,
      1,
      `Missing exact supplier identity: ${component.name}`,
    )
    return {
      reference: component.name,
      manufacturer_part_number: component.manufacturer_part_number,
      jlcpcb_part_number: parts[0],
      resistance_ohms: component.resistance ?? null,
      capacitance_f: component.capacitance ?? null,
      inductance_h: component.inductance ?? null,
      fit_default: !Object.hasOwn(optionalPopulation, component.name),
      optional_reason: optionalPopulation[component.name] ?? null,
    }
  })
  .sort((left, right) =>
    left.reference.localeCompare(right.reference, undefined, { numeric: true }),
  )
assert.equal(records.filter((component) => !component.fit_default).length, 1)
const directory = `evidence/rev-${revision}`
writeFileSync(
  `${directory}/REVIEW-BOM.json`,
  JSON.stringify(
    {
      revision,
      status:
        "Design review only; supplier availability, footprints and assembly remain unqualified. Not a fabrication BOM.",
      population_basis:
        "U4/C6 removed by user request. Open-loop motor control; retained I2C serves U9. R50 is fitted only at CAN bus endpoints.",
      pcb_component_count: records.length,
      default_fitted_count: records.filter((component) => component.fit_default)
        .length,
      records,
    },
    null,
    2,
  ) + "\n",
)
function csvCell(cell) {
  return '"' + String(cell ?? "").replaceAll('"', '""') + '"'
}
const columns = [
  "reference",
  "manufacturer_part_number",
  "jlcpcb_part_number",
  "resistance_ohms",
  "capacitance_f",
  "inductance_h",
  "fit_default",
  "optional_reason",
]
writeFileSync(
  `${directory}/REVIEW-BOM.csv`,
  [
    columns.join(","),
    ...records.map((record) =>
      columns.map((column) => csvCell(record[column])).join(","),
    ),
  ].join("\n") + "\n",
)
console.log(
  `${records.length} exact supplier identities recorded; ${records.filter((component) => component.fit_default).length} fitted in default open-loop review assembly. Not approved for fabrication.`,
)
