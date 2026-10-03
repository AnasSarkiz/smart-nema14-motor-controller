import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"
const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const circuit = JSON.parse(
  readFileSync("dist/scripts/imported-symbol-rotation/circuit.json", "utf8"),
)
function pinVector(reference) {
  const source = circuit.find(
    (element) =>
      element.type === "source_component" && element.name === reference,
  )
  const ports = [1, 2].map((pin) =>
    circuit.find(
      (element) =>
        element.type === "source_port" &&
        element.source_component_id === source.source_component_id &&
        element.pin_number === pin,
    ),
  )
  const schematicPorts = ports.map((port) =>
    circuit.find(
      (element) =>
        element.type === "schematic_port" &&
        element.source_port_id === port.source_port_id,
    ),
  )
  return {
    x: schematicPorts[1].center.x - schematicPorts[0].center.x,
    y: schematicPorts[1].center.y - schematicPorts[0].center.y,
  }
}
const zero = pinVector("D_ZERO")
const rotated = pinVector("D_ROTATED")
const expected = { x: zero.y, y: -zero.x }
const passes =
  Math.abs(rotated.x - expected.x) < 0.000001 &&
  Math.abs(rotated.y - expected.y) < 0.000001
writeFileSync(
  `evidence/rev-${revision}/IMPORTED-SYMBOL-ROTATION.json`,
  JSON.stringify(
    {
      part: "C1974707",
      requested_rotation_degrees: 270,
      zero_port_vector: zero,
      rotated_port_vector: rotated,
      expected_port_vector: expected,
      result: passes ? "passed" : "blocked",
      definition_modified: false,
      reproducer: "scripts/imported-symbol-rotation.circuit.tsx",
    },
    null,
    2,
  ) + "\n",
)
assert.ok(
  passes,
  "Official imported React symbol ignores native schRotation=270; component/runtime fix is required before schematic qualification",
)
