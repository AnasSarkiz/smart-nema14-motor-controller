import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

// Run with Bun against an explicitly selected official analyzer checkout.
// The board's lockfile and runtime dependencies remain unchanged.
const [input, analyzerModule, reportPath] = process.argv.slice(2)
if (!input || !analyzerModule || !reportPath) {
  throw new Error(
    "Usage: bun scripts/check-schematic-style.mjs CIRCUIT_JSON OFFICIAL_ANALYZER_MODULE REPORT_JSON",
  )
}
const bytes = readFileSync(input)
const { analyzeSchematicPlacement } = await import(
  pathToFileURL(resolve(analyzerModule)).href
)
const analysis = analyzeSchematicPlacement(JSON.parse(bytes))
const issues = analysis.getIssues()
writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      canonical_sha256: createHash("sha256").update(bytes).digest("hex"),
      analyzer_module_sha256: createHash("sha256")
        .update(readFileSync(analyzerModule))
        .digest("hex"),
      issue_counts: analysis.getIssueCounts(),
      issue_count: issues.length,
      issues,
      description_xml: analysis.toString(),
      passed: issues.length === 0,
    },
    null,
    2,
  )}\n`,
)
console.log(analysis.toString() || "No schematic style issues")
process.exitCode = issues.length ? 1 : 0
