import { readFileSync } from "node:fs"
import ts from "typescript"

// Compare imported labels with datasheet facts; never alter components.
// This is a limited audit, not full footprint or schematic qualification.
const criticalPinChecks = [
  {
    partNumber: "C20512",
    path: "imports/DMG1012T_7/DMG1012T_7.tsx",
    datasheet: "Diodes DS31783 Rev 8-2, top view",
    pins: { pin1: "G", pin2: "S", pin3: "D" },
  },
  {
    partNumber: "C2155767",
    path: "imports/TPS26600RHFR/TPS26600RHFR.tsx",
    datasheet: "TI SLVSDG2G Rev G, RHF pin table",
    pins: {
      pin8: "IN2",
      pin9: "IN1",
      pin10: "UVLO",
      pin12: "OVP",
      pin13: "MODE",
      pin15: "RTN",
      pin17: "GND",
      pin19: "ILIM",
      pin20: "dVdT",
      pin23: "OUT2",
      pin24: "OUT1",
      pin25: "EP",
    },
  },
  {
    partNumber: "C2847904",
    path: "imports/STM32G0B1CBT6/STM32G0B1CBT6.tsx",
    datasheet: "ST DS13560 Rev 6, Table 12, pp. 47 and 52",
    pins: { pin6: "VDD", pin7: "VSS", pin33: "PA11", pin34: "PA12" },
  },
  {
    partNumber: "C1121848",
    path: "imports/TCPP01_M12/TCPP01_M12.tsx",
    datasheet: "ST DS12900 Rev 7, Table 1, p. 2",
    pins: { pin10: "DB", pin11: "FLT" },
  },
]

function unwrapExpression(expression) {
  return ts.isAsExpression(expression)
    ? unwrapExpression(expression.expression)
    : expression
}

function readPinLabels(importPath) {
  const source = ts.createSourceFile(
    importPath,
    readFileSync(importPath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (
        !ts.isIdentifier(declaration.name) ||
        declaration.name.text !== "pinLabels" ||
        !declaration.initializer
      )
        continue
      const expression = unwrapExpression(declaration.initializer)
      if (!ts.isObjectLiteralExpression(expression))
        throw new Error(`Unsupported pinLabels structure: ${importPath}`)
      return Object.fromEntries(
        expression.properties.map((property) => {
          if (
            !ts.isPropertyAssignment(property) ||
            !(
              ts.isIdentifier(property.name) ||
              ts.isStringLiteral(property.name)
            ) ||
            !ts.isArrayLiteralExpression(property.initializer)
          )
            throw new Error(`Unsupported pinLabels property: ${importPath}`)
          const aliases = property.initializer.elements.map((alias) => {
            if (!ts.isStringLiteral(alias))
              throw new Error(`Nonliteral pin alias: ${importPath}`)
            return alias.text
          })
          return [property.name.text, aliases]
        }),
      )
    }
  }
  throw new Error(`Missing pinLabels: ${importPath}`)
}

function auditImport(check) {
  const pinLabels = readPinLabels(check.path)
  let failures = 0
  for (const [pin, expectedLabel] of Object.entries(check.pins)) {
    const aliases = pinLabels[pin]
    if (!aliases) throw new Error(`Missing physical pin ${pin}: ${check.path}`)
    const matches = aliases.some((alias) =>
      alias.split(/[\s_/]+/).includes(expectedLabel),
    )
    if (!matches) {
      console.error(
        `BLOCKED ${check.partNumber} ${pin}: imported ${JSON.stringify(aliases)}; datasheet requires ${expectedLabel} (${check.datasheet})`,
      )
      failures += 1
    }
  }
  return failures
}

const failures = criticalPinChecks.reduce(
  (total, check) => total + auditImport(check),
  0,
)
if (failures) {
  console.error(`${failures} critical pin-label discrepancies. Build blocked.`)
  process.exitCode = 1
} else {
  console.log(
    "Critical import-label audit passed. Full schematic, BOM, mechanical and fabrication validation remains mandatory.",
  )
}
