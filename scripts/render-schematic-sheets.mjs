import { readFileSync, writeFileSync } from "node:fs"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import sharp from "sharp"

const circuitJson = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const sheets = circuitJson.filter(
  (element) => element.type === "schematic_sheet",
)
if (sheets.length !== 6) throw new Error("Expected six draft schematic sheets")
for (const sheet of sheets) {
  const svg = convertCircuitJsonToSchematicSvg(circuitJson, {
    schematicSheetId: sheet.schematic_sheet_id,
    width: 2400,
    height: 1700,
  })
  const stem = `dist/index/schematic-${sheet.name}`
  writeFileSync(`${stem}.svg`, svg)
  await sharp(Buffer.from(svg)).png().toFile(`${stem}.png`)
  console.log(`Rendered ${sheet.name}: ${stem}.svg and .png`)
}
