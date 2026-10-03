import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"

const revision = JSON.parse(readFileSync("package.json", "utf8")).version
const directory = `evidence/rev-${revision}`
const manifest = JSON.parse(
  readFileSync(`${directory}/REGENERATED-SOURCE-MANIFEST.json`, "utf8"),
)
const circuit = JSON.parse(
  readFileSync("dist/scripts/all-imports-audit/circuit.json", "utf8"),
)
const errors = circuit.filter((e) => e.type.endsWith("_error"))
assert.deepEqual(errors, [], "Isolated imports contain build errors")
assert.equal(
  circuit.filter((e) => e.type === "pcb_trace" || e.type === "pcb_via").length,
  0,
)
const issues = []
const results = []
function near(value, expected) {
  return Math.abs(value - expected) <= 0.0005
}
for (const entry of manifest) {
  const raw = JSON.parse(
    readFileSync(`${directory}/${entry.part}.raweasy.json`, "utf8"),
  )
  assert.equal(raw.dataStr.head.c_para["Supplier Part"], entry.part)
  const footprint =
    typeof raw.packageDetail.dataStr === "string"
      ? JSON.parse(raw.packageDetail.dataStr)
      : raw.packageDetail.dataStr
  const tokens = footprint.shape
    .filter((s) => s.startsWith("PAD~"))
    .map((s) => s.split("~"))
  const component = circuit.find(
    (e) => e.type === "source_component" && e.name === `AUDIT_${entry.part}`,
  )
  assert.ok(component, entry.part)
  assert.deepEqual(component.supplier_part_numbers.jlcpcb, [entry.part])
  const pcb = circuit.find(
    (e) =>
      e.type === "pcb_component" &&
      e.source_component_id === component.source_component_id,
  )
  assert.ok(pcb)
  const pads = circuit.filter(
    (e) =>
      ["pcb_smtpad", "pcb_plated_hole"].includes(e.type) &&
      e.pcb_component_id === pcb.pcb_component_id,
  )
  const ports = circuit.filter(
    (e) =>
      e.type === "source_port" &&
      e.source_component_id === component.source_component_id,
  )
  assert.equal(pads.length, tokens.length, `${entry.part}: pad count`)
  assert.equal(
    ports.length,
    new Set(tokens.map((t) => t[8])).size,
    `${entry.part}: port count`,
  )
  // Supplier origins need not be at the pad-array centre. Fit translation only;
  // every relative coordinate and dimension must still be preserved.
  const translations = tokens.map((token) => {
    const pin = token[8]
    const source = ports.find((p) =>
      /^\d+$/.test(pin)
        ? p.pin_number === Number(pin)
        : p.port_hints.includes(pin),
    )
    assert.ok(source, `${entry.part}: missing physical pin ${pin}`)
    const pcbPort = circuit.find(
      (e) =>
        e.type === "pcb_port" && e.source_port_id === source.source_port_id,
    )
    const pad = pads.find((e) => e.pcb_port_id === pcbPort?.pcb_port_id)
    assert.ok(pad)
    const x =
      pad.shape === "polygon"
        ? (Math.min(...pad.points.map((p) => p.x)) +
            Math.max(...pad.points.map((p) => p.x))) /
          2
        : pad.x
    const y =
      pad.shape === "polygon"
        ? (Math.min(...pad.points.map((p) => p.y)) +
            Math.max(...pad.points.map((p) => p.y))) /
          2
        : pad.y
    return {
      x:
        x -
        (Number(token[2]) - footprint.head.x) * 0.254 -
        pcb.display_offset_x,
      y:
        y -
        (footprint.head.y - Number(token[3])) * 0.254 -
        pcb.display_offset_y,
    }
  })
  const originTranslation = {
    x: translations.reduce((sum, t) => sum + t.x, 0) / translations.length,
    y: translations.reduce((sum, t) => sum + t.y, 0) / translations.length,
  }
  const mappings = []
  for (const token of tokens) {
    const pin = token[8]
    const source = ports.find((p) =>
      /^\d+$/.test(pin)
        ? p.pin_number === Number(pin)
        : p.port_hints.includes(pin),
    )
    assert.ok(source, `${entry.part}: missing physical pin ${pin}`)
    const pcbPort = circuit.find(
      (e) =>
        e.type === "pcb_port" && e.source_port_id === source.source_port_id,
    )
    const pad = pads.find((e) => e.pcb_port_id === pcbPort?.pcb_port_id)
    assert.ok(pad, `${entry.part}: pin ${pin} lacks a pad`)
    assert.ok(pad.port_hints.includes(`pin${source.pin_number}`))
    const rawX =
      (Number(token[2]) - footprint.head.x) * 0.254 +
      pcb.display_offset_x +
      originTranslation.x
    const rawY =
      (footprint.head.y - Number(token[3])) * 0.254 +
      pcb.display_offset_y +
      originTranslation.y
    if (pad.shape === "rect") {
      const rotation = (Number(token[11]) * Math.PI) / 180
      const width = Number(token[4]) * 0.254
      const height = Number(token[5]) * 0.254
      const xExtent =
        Math.abs(width * Math.cos(rotation)) +
        Math.abs(height * Math.sin(rotation))
      const yExtent =
        Math.abs(width * Math.sin(rotation)) +
        Math.abs(height * Math.cos(rotation))
      if (
        !near(pad.x, rawX) ||
        !near(pad.y, rawY) ||
        !near(pad.width, xExtent) ||
        !near(pad.height, yExtent)
      ) {
        issues.push({
          part: entry.part,
          pin,
          problem:
            "Raw rectangular pad geometry/rotation differs from released imported output",
          raw: {
            x: rawX,
            y: rawY,
            width: xExtent,
            height: yExtent,
            rotationDegrees: Number(token[11]),
          },
          imported: {
            x: pad.x,
            y: pad.y,
            width: pad.width,
            height: pad.height,
          },
        })
      }
    } else if (pad.shape === "polygon") {
      const coordinates = token[10].trim().split(/\s+/).map(Number)
      const points = []
      for (let i = 0; i < coordinates.length; i += 2)
        points.push({
          x:
            (coordinates[i] - footprint.head.x) * 0.254 +
            pcb.display_offset_x +
            originTranslation.x,
          y:
            (footprint.head.y - coordinates[i + 1]) * 0.254 +
            pcb.display_offset_y +
            originTranslation.y,
        })
      assert.equal(
        pad.points.length,
        points.length,
        `${entry.part}: polygon vertices`,
      )
      if (
        !points.every(
          (point, index) =>
            near(point.x, pad.points[index].x) &&
            near(point.y, pad.points[index].y),
        )
      )
        issues.push({
          part: entry.part,
          pin,
          problem: "Polygon-pad vertices changed",
          raw: points,
          imported: pad.points,
        })
    }
    mappings.push({
      raw_pin: pin,
      imported_pin: source.pin_number,
      aliases: source.port_hints,
      pad_id: pad.pcb_smtpad_id ?? pad.pcb_plated_hole_id,
      shape: pad.shape,
    })
  }
  results.push({
    part: entry.part,
    originTranslationMm: originTranslation,
    manufacturer: component.manufacturer_part_number,
    ftype: component.ftype,
    resistance_ohms: component.resistance,
    capacitance_f: component.capacitance,
    pad_mappings: mappings,
  })
}
writeFileSync(
  `${directory}/ALL-IMPORTS-AUDIT.json`,
  JSON.stringify(
    {
      scope:
        "Exact supplier identities, all pad mappings and raw rectangular/polygon geometry; independent datasheet qualification remains required",
      results,
      issues,
    },
    null,
    2,
  ) + "\n",
)
console.log(
  `Audited ${results.length} official imports and ${results.reduce((sum, r) => sum + r.pad_mappings.length, 0)} pin-to-pad mappings; ${issues.length} geometry discrepancies.`,
)
if (issues.length) {
  console.error(JSON.stringify(issues, null, 2))
  process.exitCode = 1
}
