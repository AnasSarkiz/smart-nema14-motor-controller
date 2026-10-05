import { createHash } from "node:crypto"
import { readFileSync, statSync, writeFileSync } from "node:fs"
import { relative, resolve, sep } from "node:path"

const [circuitPath, inventoryPath, reportPath] = process.argv.slice(2)
if (!circuitPath || !inventoryPath) {
  throw new Error("Supply circuit JSON and publication inventory JSON paths")
}
const circuitText = readFileSync(circuitPath, "utf8")
const circuit = JSON.parse(circuitText)
const inventory = JSON.parse(readFileSync(inventoryPath, "utf8"))
const files =
  inventory.package_files ?? inventory.files ?? inventory.verification
if (!Array.isArray(circuit) || !Array.isArray(files)) {
  throw new Error("Expected circuit elements and a publication file inventory")
}
const publishedPaths = new Set(
  files.map((file) => {
    const path = file.file_path ?? file.path
    if (typeof path !== "string") throw new Error("Inventory path is missing")
    return path.replace(/^\.\//, "").replace(/^\/+/, "")
  }),
)
const repository = process.cwd()
const localPaths = new Set()
const remoteUrls = new Set()
const missingModelReferences = []
const cadComponents = circuit.filter(
  (element) => element.type === "cad_component",
)
if (cadComponents.length === 0)
  throw new Error("Circuit contains no CAD components")
for (const component of cadComponents) {
  const urls = [component.model_obj_url, component.model_step_url].filter(
    (url) => typeof url === "string" && url.length > 0,
  )
  if (urls.length === 0) missingModelReferences.push(component.cad_component_id)
  for (const url of urls) {
    if (/^https?:\/\//.test(url)) {
      remoteUrls.add(url)
      continue
    }
    const path = relative(repository, resolve(repository, url))
    if (path === ".." || path.startsWith(`..${sep}`)) {
      throw new Error(`Model escapes repository: ${url}`)
    }
    if (!statSync(path).isFile() || statSync(path).size === 0) {
      throw new Error(`Local model asset is missing or empty: ${path}`)
    }
    localPaths.add(path.split(sep).join("/"))
  }
}
const missingPublishedPaths = [...localPaths]
  .filter((path) => !publishedPaths.has(path))
  .sort()
const report = {
  canonical_sha256: createHash("sha256").update(circuitText).digest("hex"),
  cad_component_count: cadComponents.length,
  unique_local_model_asset_count: localPaths.size,
  missing_model_reference_ids: missingModelReferences,
  missing_published_asset_paths: missingPublishedPaths,
  remote_model_urls: [...remoteUrls].sort(),
  local_publication_coverage_passed:
    missingModelReferences.length === 0 && missingPublishedPaths.length === 0,
  remote_requests_verified_by_this_check: false,
  hosted_3d_render_verified: false,
  scope:
    "Publication dependency coverage only; geometry and 3D fit require separate review.",
}
if (reportPath)
  writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n")
console.log(
  `${cadComponents.length} CAD components; ${localPaths.size} local model assets; ${missingPublishedPaths.length} omitted published assets`,
)
if (!report.local_publication_coverage_passed) process.exitCode = 1
