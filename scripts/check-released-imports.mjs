import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"

// Geometry fixture only: this is not the 35 mm motor board placement.
const supplierFixtureDirectory = "evidence/rev-0.0.5-alpha.0"
const boardRevision = JSON.parse(readFileSync("package.json", "utf8")).version
const reportDirectory = `evidence/rev-${boardRevision}`
const circuitJson = JSON.parse(
  readFileSync("dist/scripts/import-audit/circuit.json", "utf8"),
)
const importChecks = [
  { ref: "U_ENCODER", partNumber: "C79815", ftype: "simple_chip", padCount: 8 },
  {
    ref: "U_DRIVER",
    partNumber: "C465949",
    ftype: "simple_chip",
    padCount: 29,
  },
  {
    ref: "R180",
    partNumber: "C5127775",
    ftype: "simple_resistor",
    resistanceOhms: 0.18,
    rawResistance: "180mΩ",
    padCount: 2,
  },
  {
    ref: "R150",
    partNumber: "C5127776",
    ftype: "simple_resistor",
    resistanceOhms: 0.15,
    rawResistance: "150mΩ",
    padCount: 2,
  },
  {
    ref: "L39",
    partNumber: "C19947652",
    ftype: "simple_inductor",
    inductance: "3.9uH",
    padCount: 2,
  },
  { ref: "U_MCU", partNumber: "C2847904", ftype: "simple_chip", padCount: 48 },
  { ref: "U_TCPP", partNumber: "C1121848", ftype: "simple_chip", padCount: 13 },
]

function auditImportedComponent(check) {
  const raw = JSON.parse(
    readFileSync(
      `${supplierFixtureDirectory}/${check.partNumber}.raweasy.json`,
      "utf8",
    ),
  )
  const supplierParameters = raw.dataStr.head.c_para
  assert.equal(supplierParameters["Supplier Part"], check.partNumber)
  if (check.rawResistance)
    assert.equal(supplierParameters.Value, check.rawResistance)
  const component = circuitJson.find(
    (element) =>
      element.type === "source_component" && element.name === check.ref,
  )
  assert.ok(component, `Missing ${check.ref}`)
  assert.equal(component.ftype, check.ftype)
  assert.deepEqual(component.supplier_part_numbers.jlcpcb, [check.partNumber])
  if (check.resistanceOhms)
    assert.equal(component.resistance, check.resistanceOhms)
  if (check.inductance) assert.equal(component.inductance, check.inductance)
  const pcbComponent = circuitJson.find(
    (element) =>
      element.type === "pcb_component" &&
      element.source_component_id === component.source_component_id,
  )
  assert.ok(pcbComponent)
  const pads = circuitJson.filter(
    (element) =>
      element.type === "pcb_smtpad" &&
      element.pcb_component_id === pcbComponent.pcb_component_id,
  )
  assert.equal(pads.length, check.padCount)
  const footprint =
    typeof raw.packageDetail.dataStr === "string"
      ? JSON.parse(raw.packageDetail.dataStr)
      : raw.packageDetail.dataStr
  const rawPadNumbers = footprint.shape
    .filter((shape) => shape.startsWith("PAD~"))
    .map((shape) => Number(shape.split("~")[8]))
    .sort((a, b) => a - b)
  const sourcePorts = circuitJson.filter(
    (element) =>
      element.type === "source_port" &&
      element.source_component_id === component.source_component_id,
  )
  assert.equal(sourcePorts.length, check.padCount)
  const rawSymbolPinNumbers = raw.dataStr.shape
    .filter((shape) => shape.startsWith("P~"))
    .map((shape) => Number(shape.split("~")[3]))
    .sort((a, b) => a - b)
  assert.deepEqual(
    sourcePorts.map((port) => port.pin_number).sort((a, b) => a - b),
    rawSymbolPinNumbers,
    `${check.partNumber}: raw schematic pin numbers must survive import`,
  )
  const padMappings = pads
    .map((pad) => {
      const pcbPort = circuitJson.find(
        (element) =>
          element.type === "pcb_port" &&
          element.pcb_port_id === pad.pcb_port_id,
      )
      assert.ok(pcbPort, `${check.ref}: pad has no PCB port`)
      const sourcePort = circuitJson.find(
        (element) =>
          element.type === "source_port" &&
          element.source_port_id === pcbPort.source_port_id,
      )
      assert.ok(sourcePort, `${check.ref}: pad has no source port`)
      assert.equal(
        sourcePort.source_component_id,
        component.source_component_id,
      )
      assert.ok(pad.port_hints.includes(`pin${sourcePort.pin_number}`))
      return {
        pin_number: sourcePort.pin_number,
        port_name: sourcePort.name,
        port_hints: pad.port_hints,
        x_mm: pad.x,
        y_mm: pad.y,
        width_mm: pad.width,
        height_mm: pad.height,
      }
    })
    .sort((a, b) => a.pin_number - b.pin_number)
  assert.deepEqual(
    padMappings.map((pad) => pad.pin_number),
    rawPadNumbers,
    `${check.partNumber}: raw pad numbers must be preserved exactly once`,
  )
  assert.equal(new Set(rawPadNumbers).size, check.padCount)
  return {
    part_number: check.partNumber,
    fixture_reference: check.ref,
    ftype: component.ftype,
    resistance_ohms: component.resistance,
    inductance: component.inductance,
    manufacturer_part_number: component.manufacturer_part_number,
    raw_value: supplierParameters.Value,
    pad_mappings: padMappings,
  }
}

const auditResults = importChecks.map(auditImportedComponent)
assert.equal(
  circuitJson.filter(
    (element) => element.type === "pcb_trace" || element.type === "pcb_via",
  ).length,
  0,
  "Import fixture must remain unrouted",
)
assert.equal(
  circuitJson.filter((element) => element.type.endsWith("_error")).length,
  0,
  "Import fixture has unresolved errors",
)
writeFileSync(
  `${reportDirectory}/IMPORT-PIN-PAD-AUDIT.json`,
  `${JSON.stringify({ scope: "Seven imported components and isolated unrouted fixture; not full board placement or fabrication qualification", results: auditResults }, null, 2)}\n`,
)
console.log(
  "Released import audit passed: 0.18 Ω and 0.15 Ω native resistors, 3.9 µH inductor, seven supplier identities and all 104 pin-to-pad mappings preserved; fixture has no copper routes.",
)
