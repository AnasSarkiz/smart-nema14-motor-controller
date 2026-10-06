import { Circuit } from "@tscircuit/core"
import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { createElement } from "react"

// Supplier geometry fixtures must be rendered without a routed CLI cache.
// This uses the released public SDK; the production board keeps native routing.
const [sourcePath, outputPath] = process.argv.slice(2)
if (!sourcePath || !outputPath)
  throw new Error("Supply an import audit source and output Circuit JSON path")
const { default: ImportAudit } = await import(resolve(sourcePath))
const circuit = new Circuit({ platform: { routingDisabled: true } })
circuit.add(createElement(ImportAudit))
await circuit.renderUntilSettled()
const circuitJson = circuit.getCircuitJson()
if (
  circuitJson.some((element) => ["pcb_trace", "pcb_via"].includes(element.type))
)
  throw new Error(
    "Isolated supplier geometry unexpectedly contains routed copper",
  )
mkdirSync(resolve(outputPath, ".."), { recursive: true })
writeFileSync(outputPath, `${JSON.stringify(circuitJson, null, 2)}\n`)
console.log("Fresh released-SDK import fixture written:", outputPath)
