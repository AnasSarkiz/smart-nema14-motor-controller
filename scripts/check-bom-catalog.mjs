import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"

const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const bom = JSON.parse(
  readFileSync(`evidence/rev-${revision}/REVIEW-BOM.json`, "utf8"),
)
const parts = [...new Set(bom.records.map((row) => row.jlcpcb_part_number))]

async function fetchPart(part) {
  // Public catalogue endpoint used by the installed CLI's `search --jlcpcb`.
  const response = await fetch(
    `https://jlcsearch.tscircuit.com/api/search?limit=10&q=${encodeURIComponent(part)}`,
  )
  assert.ok(response.ok, `${part}: catalogue HTTP ${response.status}`)
  const result = await response.json()
  assert.ok(
    Array.isArray(result.components),
    `${part}: invalid catalogue result`,
  )
  const matches = result.components.filter((row) => `C${row.lcsc}` === part)
  assert.equal(matches.length, 1, `${part}: no unique exact supplier match`)
  return { part, checked_at: new Date().toISOString(), ...matches[0] }
}

const records = []
for (let offset = 0; offset < parts.length; offset += 6) {
  const results = await Promise.allSettled(
    parts.slice(offset, offset + 6).map(fetchPart),
  )
  results.forEach((result, index) => {
    records.push(
      result.status === "fulfilled"
        ? result.value
        : { part: parts[offset + index], error: result.reason.message },
    )
  })
  console.log(
    `Checked ${records.length}/${parts.length} exact supplier identities`,
  )
}
const failures = records.filter((row) => row.error)
const zeroStock = records.filter((row) => row.stock === 0)
writeFileSync(
  `evidence/rev-${revision}/BOM-CATALOG-AUDIT.json`,
  JSON.stringify(
    {
      revision,
      provider: "Official tscircuit CLI JLCPCB catalogue backend jlcsearch",
      scope:
        "Exact identity, catalogue package, classification and displayed inventory. Indexed catalogue is not live assembler inventory or a reservation.",
      part_count: parts.length,
      records,
      failures,
      zero_displayed_stock: zeroStock,
      assembler_stock_freeze: "pending",
      fabrication_ready: false,
    },
    null,
    2,
  ) + "\n",
)
assert.deepEqual(failures, [], "Exact supplier identity lookup failed")
assert.deepEqual(zeroStock, [], "A selected part has no displayed inventory")
console.log(
  "All exact BOM parts have catalogue identities and displayed stock.",
)
