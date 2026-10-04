import { readFileSync, writeFileSync } from "node:fs"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import sharp from "sharp"
import { dirname } from "node:path"

const input = process.argv[2] ?? "dist/index/circuit.json"
const outputDirectory = process.argv[3] ?? dirname(input)

const circuitJson = JSON.parse(readFileSync(input, "utf8"))
const sheets = circuitJson.filter(
  (element) => element.type === "schematic_sheet",
)
const expectedSheets = [
  "MCU",
  "Encoder",
  "CAN",
  "LogicPower",
  "MotorDriver",
  "UsbPd",
  "Programming",
  "Interfaces",
  "InputPower",
]
if (
  sheets.length !== expectedSheets.length ||
  expectedSheets.some((name) => !sheets.some((sheet) => sheet.name === name))
) {
  throw new Error("Missing required A4 schematic sheet")
}
for (const sheet of sheets) {
  const svg = convertCircuitJsonToSchematicSvg(circuitJson, {
    schematicSheetId: sheet.schematic_sheet_id,
    width: 2400,
    height: 1700,
  })
  const stem = `${outputDirectory}/schematic-${sheet.name}`
  writeFileSync(`${stem}.svg`, svg)
  await sharp(Buffer.from(svg)).png().toFile(`${stem}.png`)
  console.log(`Rendered ${sheet.name}: ${stem}.svg and .png`)
}
