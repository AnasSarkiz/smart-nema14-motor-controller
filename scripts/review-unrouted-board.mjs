import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import {
  checkEachPcbPortConnectedToPcbTraces,
  checkPcbTraceSelfShorts,
} from "@tscircuit/checks"

// This review deliberately exposes opens hidden by placement-only builds.
// It does not qualify a routed board or infer connectivity from shared names.
const [input, output] = process.argv.slice(2)
assert.ok(input && output, "Supply native Circuit JSON and report paths")
const bytes = readFileSync(input)
const circuit = JSON.parse(bytes)
const elements = (type) => circuit.filter((element) => element.type === type)
assert.equal(elements("pcb_component").length, 149)
assert.equal(elements("pcb_board").length, 1)
for (const type of ["pcb_trace", "pcb_via", "pcb_copper_pour"])
  assert.equal(elements(type).length, 0, "This is an unrouted-stage review")
const connectionErrors = checkEachPcbPortConnectedToPcbTraces(circuit)
const shorts = checkPcbTraceSelfShorts(circuit)
assert.ok(connectionErrors.length > 0, "Unrouted connections must be exposed")
const parent = new Map()
function root(id) {
  if (!parent.has(id)) parent.set(id, id)
  if (parent.get(id) !== id) parent.set(id, root(parent.get(id)))
  return parent.get(id)
}
for (const trace of elements("source_trace")) {
  const members = [
    ...trace.connected_source_port_ids,
    ...trace.connected_source_net_ids,
  ]
  for (const member of members.slice(1))
    parent.set(root(member), root(members[0]))
}
const portsByNet = new Map()
for (const port of elements("pcb_port")) {
  const net = root(port.source_port_id)
  if (!portsByNet.has(net)) portsByNet.set(net, [])
  portsByNet.get(net).push(port.pcb_port_id)
}
const requiredNets = elements("source_net").filter(
  (net) => (portsByNet.get(root(net.source_net_id))?.length ?? 0) > 1,
)
const report = {
  revision: JSON.parse(readFileSync("package.json", "utf8")).version,
  canonical_sha256: createHash("sha256").update(bytes).digest("hex"),
  scope:
    "Unrouted placement; native connection checking invoked explicitly. Zero placement error elements does not mean the board is electrically joined.",
  pcb_component_count: elements("pcb_component").length,
  pcb_port_count: elements("pcb_port").length,
  required_physical_net_count: requiredNets.length,
  completed_routed_nets: 0,
  trace_count: 0,
  via_count: 0,
  pour_count: 0,
  native_placement_error_count: circuit.filter((e) => e.type.includes("error"))
    .length,
  native_unconnected_port_error_count: connectionErrors.length,
  native_shorts: shorts.length,
  ordinary_via_policy_mm: { drill: 0.3, pad: 0.45 },
  generated_via_size_compliance_verified: false,
  outer_power_routing_verified: false,
  hardware_tested: false,
  prototype_fabrication_ready: false,
  connection_errors: connectionErrors,
}
writeFileSync(output, JSON.stringify(report, null, 2) + "\n")
console.log(
  `${requiredNets.length} required nets; ${connectionErrors.length} native unconnected-port errors; zero routed nets. Fabrication ready: NO.`,
)
