import { spawnSync } from "node:child_process"
import { writeFileSync } from "node:fs"

const evidenceDirectory = "evidence/rev-0.0.9-alpha.0"
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
    arguments: ["tsci", "check", "placement", "controller-preview.circuit.tsx"],
  },
]
const results = checks.map((check) => {
  const result = spawnSync(check.executable, check.arguments, {
    encoding: "utf8",
  })
  const logPath = `${evidenceDirectory}/check-${check.name}.log`
  writeFileSync(logPath, result.stdout + result.stderr)
  console.log(`${check.name}: exit ${result.status}`)
  return {
    ...check,
    exit_code: result.status,
    log_path: logPath,
    error: result.error?.message,
  }
})
writeFileSync(
  `${evidenceDirectory}/CHECK-RESULTS.json`,
  `${JSON.stringify(results, null, 2)}\n`,
)
if (results.some((result) => result.exit_code !== 0)) process.exitCode = 1
