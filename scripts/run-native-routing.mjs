import { Circuit } from "@tscircuit/core"
import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { createElement } from "react"

const circuitPath = process.argv[2]
const outputFolder = process.argv[3]
if (!circuitPath || !outputFolder) {
  throw new Error("Supply a circuit source path and evidence folder")
}
mkdirSync(outputFolder, { recursive: true })
const { default: Board } = await import(resolve(circuitPath))
const circuit = new Circuit()
circuit.on("autorouting:start", (event) => {
  writeFileSync(
    `${outputFolder}/phase-${event.routingPhaseIndex}-input.json`,
    JSON.stringify(event, null, 2),
  )
  console.log(
    "Routing phase",
    event.routingPhaseIndex,
    event.solverName,
    event.connectionCount,
    "connections",
    event.obstacleCount,
    "obstacles",
  )
})
circuit.on("autorouting:end", (event) => {
  writeFileSync(
    `${outputFolder}/phase-${event.routingPhaseIndex}-output.json`,
    JSON.stringify(event, null, 2),
  )
})
circuit.on("autorouting:error", (event) => {
  writeFileSync(
    `${outputFolder}/routing-error.json`,
    JSON.stringify(event, null, 2),
  )
  console.error(event.error)
})
circuit.add(createElement(Board))
await circuit.renderUntilSettled()
const circuitJson = circuit.getCircuitJson()
writeFileSync(
  `${outputFolder}/circuit.json`,
  JSON.stringify(circuitJson, null, 2),
)
const errors = circuitJson.filter((element) => element.type.endsWith("_error"))
console.log("Native render complete:", errors.length, "unresolved errors")
process.exitCode = errors.length ? 1 : 0
