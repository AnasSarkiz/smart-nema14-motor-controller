import assert from "node:assert/strict"
import { readFile, writeFile } from "node:fs/promises"
import { createHash } from "node:crypto"
import { dirname } from "node:path"
import { parseSpectraDsn } from "dsnts"
import {
  applyToPoint,
  compose,
  rotateDEG,
  scale,
  translate,
} from "transformation-matrix"

const dsnPath =
  process.argv[2] ?? "evidence/rev-0.0.17-alpha.0/manual-usb/kicad-native.dsn"
const directory = dirname(dsnPath)
const dsnText = await readFile(dsnPath, "utf8")
const canonicalDsnText = await readFile(
  process.argv[3] ?? `${directory}/kicad-native.dsn`,
  "utf8",
)

// The released reader does not model via_keepout. Audit the canonical component
// sections, then require their exact bytes in the planning export. This avoids
// discarding unknown routing constraints or reserializing purchased footprints.
function nativeSection({ text, name }) {
  const start = text.indexOf(`\n  (${name}\n`)
  assert(start >= 0, `Missing native KiCad ${name} section`)
  const end = text.indexOf("\n  )", start)
  assert(end >= 0, `Missing end of ${name} section`)
  return text.slice(start, end + 4)
}
for (const name of ["placement", "library", "network", "wiring"]) {
  assert(
    nativeSection({ text: dsnText, name }) ===
      nativeSection({ text: canonicalDsnText, name }),
    `Planning export changed ${name}`,
  )
}
const dsn = parseSpectraDsn(canonicalDsnText)
const native = JSON.parse(await readFile(`${directory}/circuit.json`, "utf8"))
const sourceComponents = new Map(
  native
    .filter((e) => e.type === "source_component")
    .map((e) => [e.source_component_id, e.name]),
)
const components = new Map(
  native
    .filter((e) => e.type === "pcb_component")
    .map((e) => [
      e.pcb_component_id,
      sourceComponents.get(e.source_component_id),
    ]),
)
const ports = new Map(
  native
    .filter((e) => e.type === "pcb_port")
    .map((e) => [e.pcb_port_id, e.source_port_id]),
)
const sourcePorts = new Map(
  native
    .filter((e) => e.type === "source_port")
    .map((e) => [e.source_port_id, e]),
)
const measurements = []
const issues = []
for (const component of dsn.placement.components) {
  const image = dsn.library.images.find(
    (image) => image.imageId === component.imageId,
  )
  assert(image, `Missing DSN image ${component.imageId}`)
  for (const place of component.places) {
    const nativePads = native.filter(
      (e) =>
        e.type === "pcb_smtpad" &&
        components.get(e.pcb_component_id) === place.componentRef,
    )
    const transform = compose(
      translate(place.x, place.y),
      rotateDEG(place.rotation),
      scale(place.side === "back" ? -1 : 1, 1),
    )
    for (const pin of image.pins) {
      const actual = applyToPoint(transform, { x: pin.x, y: pin.y })
      if (!nativePads.length) continue
      const pad =
        nativePads.find(
          (pad) =>
            String(sourcePorts.get(ports.get(pad.pcb_port_id))?.pin_number) ===
            String(pin.pinId),
        ) ??
        nativePads.find(
          (pad) =>
            !pad.pcb_port_id &&
            Math.hypot(
              actual.x - (pad.x + 100) * 1000,
              actual.y - (pad.y - 100) * 1000,
            ) < 0.02,
        )
      assert(pad, `Unexpected pin ${place.componentRef}.${pin.pinId}`)
      const expected = applyToPoint(
        compose(translate(100000, -100000), scale(1000, 1000)),
        pad,
      )
      const positionErrorMm =
        Math.hypot(actual.x - expected.x, actual.y - expected.y) / 1000
      const layerMatches =
        (place.side === "back" ? "bottom" : "top") === pad.layer
      const measurement = {
        ref: place.componentRef,
        pin: String(pin.pinId),
        position_error_mm: positionErrorMm,
        layer_matches: layerMatches,
      }
      measurements.push(measurement)
      if (positionErrorMm > 0.00002 || !layerMatches) issues.push(measurement)
    }
  }
}
assert.equal(
  measurements.length,
  native.filter((e) => e.type === "pcb_smtpad").length,
)
const report = {
  input: dsnPath,
  sha256: createHash("sha256").update(dsnText).digest("hex"),
  pads_checked: measurements.length,
  issues,
  measurements,
  status: issues.length
    ? "failed"
    : "DSN pin positions and sides match native pads",
}
await writeFile(`${dsnPath}.audit.json`, `${JSON.stringify(report, null, 2)}\n`)
assert.equal(
  issues.length,
  0,
  `${issues.length} DSN pin position discrepancies`,
)
console.log(
  `${measurements.length} DSN pin positions and sides match; no image variant name collisions`,
)
