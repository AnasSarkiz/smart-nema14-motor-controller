import { readFileSync, writeFileSync } from "node:fs"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import sharp from "sharp"

const folder = process.argv[2] ?? "evidence/rev-0.0.17-alpha.0/routing-review"
const circuit = JSON.parse(readFileSync(`${folder}/circuit.json`, "utf8"))
for (const layer of ["top", "inner1", "inner2", "bottom"]) {
  const svg = convertCircuitJsonToPcbSvg(circuit, {
    layer,
    width: 1000,
    height: 1000,
    shouldDrawErrors: true,
    shouldDrawWarnings: true,
    shouldDrawRatsNest: false,
    includeVersion: true,
  })
  writeFileSync(`${folder}/${layer}.svg`, svg)
  await sharp(Buffer.from(svg)).png().toFile(`${folder}/${layer}.png`)
}
console.log(
  "Rendered each physical layer; missing connections remain in native JSON and review metadata",
)
