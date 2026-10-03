import { spawnSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"

const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const evidenceDirectory = `evidence/rev-${revision}`
const checks = [
  {
    name: "format-check",
    executable: "bun",
    arguments: ["run", "format:check"],
  },
  { name: "typecheck", executable: "bun", arguments: ["run", "typecheck"] },
  {
    name: "critical-imports",
    executable: "bun",
    arguments: ["run", "validate:imports"],
  },
  {
    name: "draft-connectivity",
    executable: "bun",
    arguments: ["run", "test:draft"],
  },
  {
    name: "mechanical-regression",
    executable: "bun",
    arguments: ["run", "test:assembly"],
  },
  {
    name: "usb-model-registration",
    executable: "bun",
    arguments: ["run", "test:usb-model"],
  },
  {
    name: "netlist",
    executable: "bunx",
    arguments: ["tsci", "check", "netlist", "index.circuit.tsx"],
  },
  {
    name: "pin-specification",
    executable: "bunx",
    arguments: ["tsci", "check", "pin_specification", "index.circuit.tsx"],
  },
  {
    name: "source",
    executable: "bunx",
    arguments: ["tsci", "check", "source", "index.circuit.tsx"],
  },
  {
    name: "schematic-placement",
    executable: "bunx",
    arguments: ["tsci", "check", "schematic-placement", "index.circuit.tsx"],
  },
  {
    name: "controller-placement",
    executable: "bunx",
    arguments: ["tsci", "check", "placement", "index.circuit.tsx"],
  },
]
const results = checks.map((check) => {
  const result = spawnSync(check.executable, check.arguments, {
    encoding: "utf8",
  })
  const logPath = `${evidenceDirectory}/check-${check.name}.log`
  const output = result.stdout + result.stderr
  writeFileSync(logPath, output)
  // The CLI reports actionable schematic findings even with exit zero.
  const hasSemanticIssues =
    check.name === "schematic-placement" &&
    /<SchematicPlacementIssues>\s*<[^/]/.test(output)
  console.log(
    `${check.name}: exit ${result.status}${hasSemanticIssues ? "; semantic issues remain" : ""}`,
  )
  return {
    ...check,
    exit_code: result.status,
    semantic_issues_present: hasSemanticIssues,
    log_path: logPath,
    error: result.error?.message,
  }
})
writeFileSync(
  `${evidenceDirectory}/CHECK-RESULTS.json`,
  `${JSON.stringify(results, null, 2)}\n`,
)
if (
  results.some(
    (result) => result.exit_code !== 0 || result.semantic_issues_present,
  )
)
  process.exitCode = 1
