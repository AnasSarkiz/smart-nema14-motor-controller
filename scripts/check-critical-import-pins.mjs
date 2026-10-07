import { readFileSync } from "node:fs"
import ts from "typescript"

// Compare imported labels with datasheet facts; never alter components.
// This is a limited audit, not full footprint or schematic qualification.
const criticalPinChecks = [
  {
    partNumber: "C668868",
    path: "imports/BAT54WS_TP/BAT54WS_TP.tsx",
    datasheet:
      "MCC BAT54WS Rev3-3 SOD323 cathode mark and original supplier polarized terminals",
    pins: { pin1: "cathode", pin2: "anode" },
  },
  {
    partNumber: "C485081",
    path: "imports/SN74LVC1G98DCKR/SN74LVC1G98DCKR.tsx",
    datasheet: "TI SCES417L p1/p2, DCK top view and NAND configuration",
    pins: {
      pin1: "IN1",
      pin2: "GND",
      pin3: "IN0",
      pin4: "Y1",
      pin5: "VCC",
      pin6: "IN2",
    },
  },
  {
    partNumber: "C128410",
    path: "imports/SN74LVC1G27DBVR/SN74LVC1G27DBVR.tsx",
    datasheet: "TI SCES488E top-view pinout; original SN74LVC1G27 PDF",
    pins: {
      pin1: "A",
      pin2: "GND",
      pin3: "B",
      pin4: "Y",
      pin5: "VCC",
      pin6: "C",
    },
  },
  {
    partNumber: "C68245",
    path: "imports/SN74LVC3G17DCUR/SN74LVC3G17DCUR.tsx",
    datasheet: "TI SCES470F section 5, p.3, DCU top view",
    pins: {
      pin1: "1A",
      pin2: "3Y",
      pin3: "2A",
      pin4: "GND",
      pin5: "2Y",
      pin6: "3A",
      pin7: "1Y",
      pin8: "VCC",
    },
  },
  {
    partNumber: "C22624",
    path: "imports/B5819WS/B5819WS.tsx",
    datasheet:
      "CJ B5819WS manufacturer datasheet; SOD323 pin 1 cathode / pin 2 anode",
    pins: { pin1: "cathode", pin2: "anode" },
  },
  {
    partNumber: "C2040",
    path: "imports/RP2040/RP2040.tsx",
    datasheet:
      "Raspberry Pi RP2040 datasheet build dea0a54-clean, Tables 620-626, pp. 629-630; original manufacturer PDF distributed by JLCPCB",
    pins: {
      pin1: "IOVDD6",
      pin19: "TESTEN",
      pin20: "XIN",
      pin21: "XOUT",
      pin23: "DVDD2",
      pin24: "SWCLK",
      pin25: "SWD",
      pin26: "RUN",
      pin43: "ADC_AVDD",
      pin44: "VREG_IN",
      pin45: "VREG_VOUT",
      pin46: "USB_DM",
      pin47: "USB_DP",
      pin48: "USB_VDD",
      pin50: "DVDD1",
      pin56: "QSPI_SS",
      pin57: "GND",
    },
  },
  {
    partNumber: "C2678061",
    path: "imports/STUSB4500QTR/STUSB4500QTR.tsx",
    datasheet: "ST DS12499 Rev 8, Table 1, p. 4",
    pins: {
      pin1: "CC1DB",
      pin2: "CC1",
      pin4: "CC2",
      pin5: "CC2DB",
      pin6: "RESET",
      pin7: "SCL",
      pin8: "SDA",
      pin9: "DISCH",
      pin10: "GND",
      pin12: "ADDR0",
      pin13: "ADDR1",
      pin14: "POWER_OK3",
      pin16: "VBUS_EN_SNK",
      pin18: "VBUS_VS_DISCH",
      pin19: "ALERT",
      pin20: "POWER_OK2",
      pin21: "VREG_1V2",
      pin22: "VSYS",
      pin23: "VREG_2V7",
      pin24: "VDD",
      pin25: "EP",
    },
  },
  {
    partNumber: "C222138",
    path: "imports/STL8P4LLF6/STL8P4LLF6.tsx",
    datasheet:
      "ST DocID025617 Rev 2, internal schematic/PowerFLAT pinout, pp. 1 and 10",
    pins: {
      pin1: "S1",
      pin2: "S2",
      pin3: "S3",
      pin4: "G",
      pin5: "D1",
      pin6: "D2",
      pin7: "D3",
      pin8: "D4",
      pin9: "D5",
    },
  },
  {
    partNumber: "C96140",
    path: "imports/MCP2515T_I_ML/MCP2515T_I_ML.tsx",
    datasheet:
      "Microchip MCP2515 DS20001801H, Table 1-1 p. 4; original manufacturer PDF distributed by JLCPCB",
    pins: {
      pin6: "OSC2",
      pin7: "OSC1",
      pin8: "GND",
      pin11: "N_INT",
      pin12: "SCK",
      pin14: "SI",
      pin15: "SO",
      pin16: "N_CS",
      pin17: "N_RESET",
      pin18: "VDD",
      pin19: "TXCAN",
      pin20: "RXCAN",
      pin21: "EP",
    },
  },
  {
    partNumber: "C2986331",
    path: "imports/GD25Q16EEIGR/GD25Q16EEIGR.tsx",
    datasheet:
      "GigaDevice GD25Q16E Rev 1.2, Table 1 p. 5, USON8 drawing p. 53; exposed metal is internally floating",
    pins: {
      pin1: "N_CS",
      pin2: "SO_IO1",
      pin3: "WP__IO2",
      pin4: "VSS",
      pin5: "SI_IO0",
      pin6: "SCLK",
      pin7: "HOLD__IO3",
      pin8: "VCC",
      pin9: "EP",
    },
  },
  {
    partNumber: "C2843335",
    path: "imports/W25Q16JVUXIQ/W25Q16JVUXIQ.tsx",
    datasheet:
      "Historical Winbond W25Q16JV Rev G, Figure 1b / pin table p. 5; original manufacturer PDF distributed by JLCPCB; historical import retained",
    pins: {
      pin1: "N_CS",
      pin2: "DO_IO1",
      pin3: "WP__IO2",
      pin4: "GND",
      pin5: "DI_IO0",
      pin6: "CLK",
      pin7: "HOLD_orRESET__IO3",
      pin8: "VCC",
      pin9: "EP",
    },
  },

  {
    partNumber: "C2150710",
    path: "imports/TMC2209_LA_T/TMC2209_LA_T.tsx",
    datasheet:
      "ADI TMC2209 Rev 1.09, order codes and pin table, pp. 2 and 9-11",
    pins: {
      pin1: "OB2",
      pin14: "PDN_UART",
      pin16: "STEP",
      pin19: "DIR",
      pin21: "OA2",
      pin24: "OA1",
      pin25: "UNUSED",
      pin26: "OB1",
      pin29: "EP",
    },
  },
  {
    partNumber: "C97502",
    path: "imports/TPD2EUSB30DRTR/TPD2EUSB30DRTR.tsx",
    datasheet: "TI SLVSAC2G, DRT pin table, p. 3",
    pins: { pin1: "D_POS", pin2: "D_NEG", pin3: "GND" },
  },
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
    const matches = aliases.some(
      (alias) =>
        alias === expectedLabel ||
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
