import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"

const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const directory = `evidence/rev-${revision}`
const bom = JSON.parse(readFileSync(`${directory}/REVIEW-BOM.json`, "utf8"))
const catalog = JSON.parse(
  readFileSync(`${directory}/BOM-CATALOG-AUDIT.json`, "utf8"),
)
const circuit = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const sourceComponents = circuit.filter(
  (row) => row.type === "source_component",
)
const sheets = circuit.filter((row) => row.type === "schematic_sheet")
const schematicComponents = circuit.filter(
  (row) => row.type === "schematic_component",
)
const partNames = circuit.filter((row) => row.type === "source_net")
const references = {
  C2847904: "https://www.st.com/resource/en/datasheet/stm32g0b1cb.pdf",
  C465949:
    "https://www.analog.com/media/en/technical-documentation/data-sheets/TMC2209_datasheet_rev1.09.pdf",
  C1121848: "https://www.st.com/resource/en/datasheet/tcpp01-m12.pdf",
  C1974707: "https://www.st.com/resource/en/datasheet/esda25p35-1u1m.pdf",
  C5143397: "https://gct.co/connector/usb4110",
  C12084: "https://www.ti.com/lit/ds/symlink/sn65hvd230.pdf",
  C780769:
    "https://www.diodes.com/datasheet/download/AP63200-AP63201-AP63203-AP63205.pdf",
  C19947652: "https://bourns.com/docs/Product-Datasheets/SRN6028C.pdf",
  C3662793: "https://www.ti.com/lit/ds/symlink/tps25947.pdf",
  C20512: "https://www.diodes.com/datasheet/download/DMG1012T.pdf",
  C2155767: "https://www.ti.com/lit/ds/symlink/tps2660.pdf",
  C178585:
    "https://industrial.panasonic.com/cdbs/www-data/pdf/RDE0000/ABA0000C1184.pdf",
  C268016:
    "https://ds.yuden.co.jp/TYCOMPAS/ut/detail?pn=MSASU168BB5225KTNA01&u=M",
  C189895: "https://www.jst-mfg.com/product/pdf/eng/eGH.pdf",
  C160409: "https://www.jst-mfg.com/product/pdf/eng/eSH.pdf",
  C136657: "https://www.jst-mfg.com/product/pdf/eng/eSH.pdf",
}

function markdownCell(cell) {
  return String(cell ?? "Unverified").replaceAll("|", " / ")
}

const rows = bom.records.map((component) => {
  const supplier = catalog.records.find(
    (row) => row.part === component.jlcpcb_part_number,
  )
  assert.ok(supplier && !supplier.error, component.reference)
  assert.equal(supplier.mfr, component.manufacturer_part_number)
  const raw =
    component.jlcpcb_part_number === "C136657"
      ? null
      : JSON.parse(
          readFileSync(
            ["C2155767", "C25769", "C20512"].includes(
              component.jlcpcb_part_number,
            )
              ? `evidence/power-candidate-audit/${component.jlcpcb_part_number}.raweasy.json`
              : `evidence/rev-0.0.13-alpha.0/${component.jlcpcb_part_number}.raweasy.json`,
            "utf8",
          ),
        )
  const manufacturer =
    component.jlcpcb_part_number === "C136657"
      ? "JST (official standard programmer package)"
      : raw.dataStr.head.c_para.Manufacturer
  assert.ok(manufacturer, component.jlcpcb_part_number)
  const source = sourceComponents.find(
    (row) => row.name === component.reference,
  )
  const schematic = schematicComponents.find(
    (row) => row.source_component_id === source.source_component_id,
  )
  const sheet = sheets.find(
    (row) => row.schematic_sheet_id === schematic.schematic_sheet_id,
  )
  const ports = circuit
    .filter(
      (row) =>
        row.type === "source_port" &&
        row.source_component_id === source.source_component_id,
    )
    .map((row) => row.source_port_id)
  const nets = [
    ...new Set(
      circuit
        .filter(
          (row) =>
            row.type === "source_trace" &&
            row.connected_source_port_ids.some((port) => ports.includes(port)),
        )
        .flatMap((row) => row.connected_source_net_ids)
        .map((id) => partNames.find((row) => row.source_net_id === id).name),
    ),
  ]
  return {
    reference: component.reference,
    function: `${sheet.name}: ${nets.join(", ")}`,
    manufacturer,
    mpn: supplier.mfr,
    package: supplier.package,
    supplier: component.jlcpcb_part_number,
    classification: supplier.is_basic ? "Basic" : "Extended",
    datasheet: references[component.jlcpcb_part_number],
    supplier_link: `https://www.lcsc.com/product-detail/${component.jlcpcb_part_number}.html`,
    displayed_stock: supplier.stock,
    stock_checked_at: supplier.checked_at,
    notes: component.fit_default
      ? "Default fitted; ratings/DFM review pending"
      : component.optional_reason,
  }
})
writeFileSync(
  `${directory}/BOM-TABLE.json`,
  JSON.stringify(rows, null, 2) + "\n",
)
const columns = [
  "reference",
  "function",
  "manufacturer",
  "mpn",
  "package",
  "supplier",
  "classification",
  "datasheet",
  "notes",
]
const table = rows.map((row) => {
  const cells = columns.map((column) => {
    if (column === "datasheet")
      return row.datasheet
        ? `[Manufacturer reference](${row.datasheet})`
        : `[Supplier listing](${row.supplier_link}); exact datasheet qualification pending`
    if (column === "notes")
      return `${row.notes}; indexed stock ${row.displayed_stock} checked ${row.stock_checked_at}`
    return markdownCell(row[column])
  })
  return `| ${cells.join(" | ")} |`
})
writeFileSync(
  "BOM-CURRENT.md",
  `# Complete candidate BOM — ${revision}\n\n109 references / 108 default fitted / 43 exact identities. Design-review BOM, not an assembly or fabrication approval. Stock is the CLI catalogue's indexed display, not an assembler reservation. Manufacturer identity is retained from the previously audited raw supplier record; MPN, package and classification are checked against the current exact catalogue match. Missing exact datasheet reviews remain explicit.\n\n| Ref | Function / connected nets | Manufacturer | MPN | Package | JLCPCB/LCSC | Class | Datasheet/reference | Notes |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${table.join("\n")}\n`,
)
console.log(
  `Wrote complete ${rows.length}-reference candidate table with explicit review limits.`,
)
