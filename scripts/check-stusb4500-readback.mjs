import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"

const [inputPath, outputPath] = process.argv.slice(2)
assert.ok(
  inputPath && outputPath,
  "Supply actual cold hardware readback and report paths",
)
const readbackBytes = readFileSync(inputPath)
const readback = JSON.parse(readbackBytes)
assert.equal(readback.cold_power_cycle, true)
assert.ok(
  typeof readback.hardware_identity === "string" &&
    readback.hardware_identity.length > 0,
)
assert.ok(Number.isFinite(Date.parse(readback.captured_at)))

function registerByte(address) {
  const byte =
    readback.runtime_registers[
      `0x${address.toString(16).toUpperCase().padStart(2, "0")}`
    ]
  assert.ok(
    Number.isInteger(byte) && byte >= 0 && byte <= 255,
    `Missing byte at 0x${address.toString(16)}`,
  )
  return byte
}

function fixedPdo(firstAddress) {
  const bytes = Array.from({ length: 4 }, (_, index) =>
    registerByte(firstAddress + index),
  )
  const word = bytes.reduce(
    (sum, byte, index) => sum + byte * 2 ** (8 * index),
    0,
  )
  assert.equal(
    Math.floor(word / 2 ** 30),
    0,
    "Only fixed supply PDOs are allowed",
  )
  return {
    voltage_v: ((word >>> 10) & 1023) * 0.05,
    current_a: (word & 1023) * 0.01,
  }
}

assert.equal(registerByte(0x70) & 7, 2, "Three active PDOs can prefer 20 V")
const activePdos = [fixedPdo(0x85), fixedPdo(0x89)]
assert.deepEqual(activePdos, [
  { voltage_v: 5, current_a: 1.5 },
  { voltage_v: 15, current_a: 1.5 },
])
// PDO3 bytes must be captured even though its retained contents are inactive.
for (let address = 0x8d; address <= 0x90; address++) registerByte(address)
assert.equal(readback.nvm_fields.SNK_PDO_NUMB, 2)
assert.equal(
  readback.nvm_fields.POWER_OK_CFG,
  2,
  "POWER_OK2 must indicate PDO2",
)
assert.equal(readback.nvm_fields.POWER_ONLY_ABOVE_5V, 0)
writeFileSync(
  outputPath,
  JSON.stringify(
    {
      passed_readback_decode: true,
      hardware_identity: readback.hardware_identity,
      captured_at: readback.captured_at,
      readback_sha256: createHash("sha256").update(readbackBytes).digest("hex"),
      active_pdos: activePdos,
      inactive_pdo3: true,
      scope:
        "Recorded cold-reset runtime/NVM field consistency only; no live contract, physical voltage or motor validation",
    },
    null,
    2,
  ) + "\n",
)
console.log(
  "Recorded cold readback contains only active 5 V and preferred 15 V PDOs; physical contract tests remain separate.",
)
