import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"

const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const evidenceDirectory = `evidence/rev-${revision}`
const circuitJson = JSON.parse(
  readFileSync("dist/scripts/usb-import-audit/circuit.json", "utf8"),
)
const checks = [
  { ref: "J_USB", part: "C5143397", pads: 16 },
  { ref: "Q_PD", part: "C2965326", pads: 9 },
  { ref: "D_USB", part: "C94934", pads: 3 },
  { ref: "D_VBUS", part: "C1974707", pads: 2 },
  { ref: "C_CC", part: "C5448795", pads: 2, capacitance: 330e-12 },
  { ref: "R_TOP", part: "C852472", pads: 2, resistance: 100000 },
  { ref: "R_BOTTOM", part: "C852895", pads: 2, resistance: 6040 },
  { ref: "C_INPUT", part: "C268016", pads: 2, capacitance: 2.2e-6 },
]

function auditComponent(check) {
  const raw = JSON.parse(
    readFileSync(`${evidenceDirectory}/${check.part}.raweasy.json`, "utf8"),
  )
  assert.equal(raw.dataStr.head.c_para["Supplier Part"], check.part)
  const footprint =
    typeof raw.packageDetail.dataStr === "string"
      ? JSON.parse(raw.packageDetail.dataStr)
      : raw.packageDetail.dataStr
  const rawPadTokens = footprint.shape
    .filter((shape) => shape.startsWith("PAD~"))
    .map((shape) => shape.split("~")[8])
  const rawPinTokens = raw.dataStr.shape
    .filter((shape) => shape.startsWith("P~"))
    .map((shape) => shape.split("~")[3])
  assert.deepEqual(
    [...rawPinTokens].sort(),
    [...rawPadTokens].sort(),
    `${check.part}: supplier symbol/footprint mismatch`,
  )
  assert.equal(new Set(rawPadTokens).size, check.pads)
  const component = circuitJson.find(
    (element) =>
      element.type === "source_component" && element.name === check.ref,
  )
  assert.ok(component)
  assert.deepEqual(component.supplier_part_numbers.jlcpcb, [check.part])
  if (check.resistance) assert.equal(component.resistance, check.resistance)
  if (check.capacitance) assert.equal(component.capacitance, check.capacitance)
  const pcbComponent = circuitJson.find(
    (element) =>
      element.type === "pcb_component" &&
      element.source_component_id === component.source_component_id,
  )
  assert.ok(pcbComponent)
  const sourcePorts = circuitJson.filter(
    (element) =>
      element.type === "source_port" &&
      element.source_component_id === component.source_component_id,
  )
  assert.equal(sourcePorts.length, check.pads)
  const pads = circuitJson.filter(
    (element) =>
      (element.type === "pcb_smtpad" || element.type === "pcb_plated_hole") &&
      element.pcb_component_id === pcbComponent.pcb_component_id,
  )
  assert.equal(pads.length, check.pads)
  const mappings = rawPadTokens.map((rawPadToken) => {
    // USB contact names are alphanumeric; connector shell pins and other parts are numeric.
    const sourcePort = sourcePorts.find((port) =>
      /^\d+$/.test(rawPadToken)
        ? port.pin_number === Number(rawPadToken)
        : port.port_hints.includes(rawPadToken),
    )
    assert.ok(sourcePort, `${check.part}: lost supplier pin ${rawPadToken}`)
    const pcbPort = circuitJson.find(
      (element) =>
        element.type === "pcb_port" &&
        element.source_port_id === sourcePort.source_port_id,
    )
    assert.ok(pcbPort)
    const matchingPads = pads.filter(
      (pad) => pad.pcb_port_id === pcbPort.pcb_port_id,
    )
    assert.equal(
      matchingPads.length,
      1,
      `${check.part}: pad ${rawPadToken} must map exactly once`,
    )
    const pad = matchingPads[0]
    assert.ok(pad.port_hints.includes(`pin${sourcePort.pin_number}`))
    return {
      raw_pad_token: rawPadToken,
      native_pin: sourcePort.pin_number,
      port_name: sourcePort.name,
      native_geometry: pad,
    }
  })
  return {
    part_number: check.part,
    reference: check.ref,
    raw_value: raw.dataStr.head.c_para.Value,
    pin_pad_mappings: mappings,
  }
}

const results = checks.map(auditComponent)
assert.equal(
  circuitJson.filter((element) => element.type === "source_component").length,
  8,
)
assert.equal(
  circuitJson.filter(
    (element) => element.type === "pcb_trace" || element.type === "pcb_via",
  ).length,
  0,
)
assert.equal(
  circuitJson.filter((element) => element.type.endsWith("_error")).length,
  0,
)
writeFileSync(
  `${evidenceDirectory}/USB-IMPORT-PIN-PAD-AUDIT.json`,
  `${JSON.stringify({ scope: "Selected supplier identities and pin/pad preservation; manufacturer geometry is independently checked by check-usb-manufacturer-footprint.mjs. Not full assembly or fabrication qualification.", results }, null, 2)}\n`,
)
console.log(
  "USB import audit passed: eight supplier identities, 38 physical pin-to-pad mappings and component values; fixture remains unrouted. Full connector/PCB assembly qualification remains pending.",
)
