import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { checkViasInPads } from "@tscircuit/checks"

const [circuitPath, manifestPath, reportPath] = process.argv.slice(2)
if (!reportPath)
  throw new Error("Supply native Circuit JSON, thermal manifest and report")
const circuitBytes = readFileSync(circuitPath)
const circuit = JSON.parse(circuitBytes)
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"))
const owner = circuit.find(
  (row) => row.type === "source_component" && row.name === "U2",
)
const ownerPcb = circuit.find(
  (row) =>
    row.type === "pcb_component" &&
    row.source_component_id === owner.source_component_id,
)
const ownerPad = circuit.find(
  (row) =>
    row.type === "pcb_smtpad" &&
    row.pcb_component_id === ownerPcb.pcb_component_id &&
    row.port_hints.includes("pin29"),
)
const ground = circuit.find(
  (row) => row.type === "source_net" && row.name === "GND",
)
assert.equal(manifest.vias.length, 5)
assert.match(manifest.fabrication_requirement, /IPC-4761 Type VII/)
const expectedContacts = new Set()
const featureReports = []
for (const feature of manifest.vias) {
  assert.equal(feature.reference, "U2")
  assert.equal(feature.pin_number, 29)
  assert.equal(feature.net, "GND")
  const matches = circuit.filter(
    (row) =>
      row.type === "pcb_via" &&
      Math.hypot(row.x - feature.x, row.y - feature.y) < 0.00001,
  )
  assert.equal(matches.length, 1)
  const via = matches[0]
  assert.equal(via.source_net_id, ground.source_net_id)
  assert.equal(via.hole_diameter, feature.hole_diameter_mm)
  assert.equal(via.outer_diameter, feature.outer_diameter_mm)
  assert.deepEqual([...via.layers].sort(), [
    "bottom",
    "inner1",
    "inner2",
    "top",
  ])
  assert.equal(via.tented_on_top, false)
  assert.equal(via.tented_on_bottom, true)
  expectedContacts.add(`via_in_pad_${via.pcb_via_id}_${ownerPad.pcb_smtpad_id}`)
  featureReports.push({
    name: feature.name,
    pcb_via_id: via.pcb_via_id,
    x: via.x,
    y: via.y,
    construction: "IPC-4761 Type VII",
    owner: "U2.29",
    layer_span: via.layers,
  })
}
// The official board manufacturing flag is needed for intentional Type VII
// construction. Independently re-enable its original native pad-contact check
// for ALL emitted vias; only the manifest's exact five owner contacts may exist.
const nativePadDiagnostics = checkViasInPads(
  circuit.map((row) =>
    row.type === "pcb_board" ? { ...row, is_via_in_pad_allowed: false } : row,
  ),
)
assert.equal(
  nativePadDiagnostics.length,
  expectedContacts.size,
  "Unmanifested ordinary via overlaps a pad",
)
for (const diagnostic of nativePadDiagnostics) {
  assert.ok(
    expectedContacts.has(diagnostic.pcb_placement_error_id),
    "Unmanifested or foreign via/pad contact",
  )
}
const paste = circuit.find(
  (row) =>
    row.type === "pcb_solder_paste" &&
    row.pcb_smtpad_id === ownerPad.pcb_smtpad_id,
)
assert.equal(paste.layer, "top")
assert.ok(Math.abs(paste.width / ownerPad.width - 0.7) < 0.000001)
assert.ok(Math.abs(paste.height / ownerPad.height - 0.7) < 0.000001)
const report = {
  input: circuitPath,
  input_sha256: createHash("sha256").update(circuitBytes).digest("hex"),
  features: featureReports,
  native_ordinary_pad_contact_guard:
    "Original official check re-enabled for every via; exactly five manifest-owned U2 EP contacts and zero other contacts",
  exposed_pad_mm: {
    width: ownerPad.width,
    height: ownerPad.height,
    solder_mask_open: !ownerPad.is_covered_with_solder_mask,
  },
  unchanged_native_paste_mm: {
    width: paste.width,
    height: paste.height,
    coverage_fraction:
      (paste.width * paste.height) / (ownerPad.width * ownerPad.height),
  },
  limitations: [
    "Filling/capping must be explicitly ordered and confirmed in CAM/assembly quote; generated drill geometry alone does not specify it",
    "Thermal load/temperature tests pending; 30 K/W JEDEC value does not qualify this 35 x 35 mm board",
  ],
  passed: true,
}
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(
  "Five direct TMC thermal vias match exact ownership, full layer span, mask and original paste; native ordinary contact guard passes",
)
