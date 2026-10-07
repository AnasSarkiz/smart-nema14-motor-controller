import { Circuit } from "@tscircuit/core"
import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { createElement } from "react"

const circuitPath = process.argv[2]
const outputFolder = process.argv[3]
const captureNativeInputOnly = process.argv[4] === "capture-input-only"
if (!circuitPath || !outputFolder) {
  throw new Error("Supply a circuit source path and evidence folder")
}
mkdirSync(outputFolder, { recursive: true })
const { default: Board } = await import(resolve(circuitPath))
const circuit = new Circuit()
function recordRoutingStage(event, suffix) {
  writeFileSync(
    `${outputFolder}/phase-${event.routingPhaseIndex}-stage-${event.phaseStageIndex ?? 0}-${suffix}.json`,
    JSON.stringify(event, null, 2),
  )
}

let lastProgressRecordedAt = 0
circuit.on("autorouting:progress", (event) => {
  if (Date.now() - lastProgressRecordedAt < 5000) return
  lastProgressRecordedAt = Date.now()
  const { debugGraphics, ...progress } = event
  writeFileSync(
    `${outputFolder}/phase-${event.routingPhaseIndex}-progress.json`,
    JSON.stringify(progress, null, 2),
  )
  recordRoutingStage(progress, "progress")
  console.log("Routing progress", event.routingPhaseIndex, event.progress)
})
circuit.on("autorouting:start", (event) => {
  writeFileSync(
    `${outputFolder}/phase-${event.routingPhaseIndex}-input.json`,
    JSON.stringify(event, null, 2),
  )
  recordRoutingStage(event, "input")
  console.log(
    "Routing phase",
    event.routingPhaseIndex,
    event.solverName,
    event.connectionCount,
    "connections",
    event.obstacleCount,
    "obstacles",
  )
  if (captureNativeInputOnly && event.routingPhaseIndex === 1) {
    writeFileSync(
      `${outputFolder}/BASELINE-AT-ROUTING-START.json`,
      JSON.stringify(circuit.getCircuitJson(), null, 2),
    )
    writeFileSync(
      `${outputFolder}/INPUT-CAPTURE-STATUS.json`,
      JSON.stringify(
        {
          scope:
            "Exact native core routing-start event and native baseline only. No source input fields or coordinates changed. No selected-net solve or copper qualification claimed.",
          routing_complete: false,
          next_step:
            "Run the official Pipeline9 SDK against the exact captured event, then qualify saved source routes.",
        },
        null,
        2,
      ) + "\n",
    )
    process.exit(2)
  }
})
circuit.on("autorouting:end", (event) => {
  recordRoutingStage(event, "output")
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
  recordRoutingStage(event, "error")
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
