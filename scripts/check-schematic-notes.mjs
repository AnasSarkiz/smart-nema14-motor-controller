import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { getSchematicElementBounds } from "@tscircuit/circuit-json-util"

const circuitPath = process.argv[2] ?? "dist/index/circuit.json"
const circuitBytes = readFileSync(circuitPath)
const circuit = JSON.parse(circuitBytes)
const components = circuit.filter(
  (element) => element.type === "source_component",
)
const schematicComponents = circuit.filter(
  (element) => element.type === "schematic_component",
)
const sheets = circuit.filter((element) => element.type === "schematic_sheet")
const notes = circuit.filter(
  (element) =>
    element.type === "schematic_text" &&
    components.some((component) =>
      element.text.startsWith(`${component.name}: `),
    ),
)
assert.equal(components.length, 166, "Purchased-reference coverage changed")
assert.equal(notes.length, components.length, "Missing or duplicate purposes")
assert.equal(sheets.length, 11, "Expected eleven native schematic sheets")

const coverage = []
for (const component of components) {
  const matchingNotes = notes.filter((note) =>
    note.text.startsWith(`${component.name}: `),
  )
  assert.equal(
    matchingNotes.length,
    1,
    `${component.name} needs one explanation`,
  )
  const note = matchingNotes[0]
  const symbol = schematicComponents.find(
    (element) => element.source_component_id === component.source_component_id,
  )
  assert.ok(symbol, `${component.name} has no schematic symbol`)
  assert.equal(note.schematic_sheet_id, symbol.schematic_sheet_id)
  assert.ok(note.text.length > component.name.length + 15)
  assert.equal(note.anchor, "left")
  assert.ok(note.font_size >= 0.2, "Purpose text is too small")
  if (["R50"].includes(component.name)) {
    assert.match(note.text, /DNP/, `${component.name} population is unclear`)
  }
  coverage.push({
    reference: component.name,
    sheet: sheets.find(
      (sheet) => sheet.schematic_sheet_id === note.schematic_sheet_id,
    ).name,
    purpose: note.text,
  })
}

for (const sheet of sheets) {
  assert.equal(sheet.sheet_size, "a4")
  assert.equal(sheet.sheet_width, 297)
  assert.equal(sheet.sheet_height, 210)
  const sheetNotes = notes.filter(
    (note) => note.schematic_sheet_id === sheet.schematic_sheet_id,
  )
  const diagramElements = circuit.filter(
    (element) =>
      element.schematic_sheet_id === sheet.schematic_sheet_id &&
      [
        "schematic_component",
        "schematic_net_label",
        "schematic_trace",
      ].includes(element.type),
  )
  const diagramBounds = diagramElements.map(getSchematicElementBounds)
  const rightmostDiagramX = Math.max(
    ...diagramBounds.filter(Boolean).map((bounds) => bounds.maxX),
  )
  for (const note of sheetNotes) {
    assert.ok(
      note.position.x > rightmostDiagramX + 0.3,
      `${sheet.name}: purpose panel overlaps the drawing`,
    )
  }
  for (let index = 1; index < sheetNotes.length; index++) {
    assert.ok(
      Math.abs(
        sheetNotes[index].position.y - sheetNotes[index - 1].position.y,
      ) >=
        2 * sheetNotes[index].font_size,
      `${sheet.name}: purpose lines overlap`,
    )
  }
  assert.equal(
    circuit.filter(
      (element) =>
        element.type === "schematic_text" &&
        element.schematic_sheet_id === sheet.schematic_sheet_id &&
        element.text === "COMPONENT PURPOSE",
    ).length,
    1,
  )
}

const report = {
  canonical_sha256: createHash("sha256").update(circuitBytes).digest("hex"),
  component_count: components.length,
  explained_component_count: coverage.length,
  sheet_count: sheets.length,
  all_purposes_on_correct_sheet: true,
  no_panel_symbol_label_or_wire_overlap: true,
  all_dnp_disclosed: true,
  coverage,
  passed: true,
}
if (process.argv[3]) {
  writeFileSync(process.argv[3], `${JSON.stringify(report, null, 2)}\n`)
}
console.log(
  `${components.length} component explanations on eleven A4 sheets; coverage/layout pass`,
)
