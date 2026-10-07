import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { spawnSync } from "node:child_process"

const reportDirectory = mkdtempSync(join(tmpdir(), "stusb4500-synthetic-"))
const cases = [
  { name: "preferred-15v", voltageV: 15, accepted: true },
  { name: "preferred-20v", voltageV: 20, accepted: false },
  { name: "three-active-pdos", voltageV: 15, accepted: false },
  { name: "wrong-power-ok-config", voltageV: 15, accepted: false },
  { name: "disabled-5v-bootstrap", voltageV: 15, accepted: false },
  { name: "mismatched-nvm-count", voltageV: 15, accepted: false },
  { name: "missing-inactive-pdo-byte", voltageV: 15, accepted: false },
]
const results = []
for (const testCase of cases) {
  const fixturePath = `tests/fixtures/stusb4500/${testCase.name}.json`
  const fixtureBytes = readFileSync(fixturePath)
  const fixture = JSON.parse(fixtureBytes)
  assert.equal(fixture.evidence_kind, "SYNTHETIC; no hardware readback")
  assert.match(fixture.hardware_identity, /^SYNTHETIC/)
  const pdo2Bytes = ["0x89", "0x8A", "0x8B", "0x8C"].map(
    (address) => fixture.runtime_registers[address],
  )
  const word = Buffer.from(pdo2Bytes).readUInt32LE()
  const decodedVoltageV = ((word >>> 10) & 1023) * 0.05
  assert.equal(decodedVoltageV, testCase.voltageV)
  assert.equal((word & 1023) * 0.01, 1.5)
  if (testCase.name === "preferred-20v") assert.equal(word, 0x00064096)

  const result = spawnSync(
    process.execPath,
    [
      "scripts/check-stusb4500-readback.mjs",
      fixturePath,
      join(reportDirectory, `${testCase.name}.json`),
    ],
    { encoding: "utf8", timeout: 10000 },
  )
  assert.ifError(result.error)
  assert.equal(result.signal, null)
  assert.equal(result.status, testCase.accepted ? 0 : 1, testCase.name)
  results.push({
    fixture: fixturePath,
    fixture_sha256: createHash("sha256").update(fixtureBytes).digest("hex"),
    pdo2_word_hex: `0x${word.toString(16).padStart(8, "0")}`,
    decoded_pdo2_voltage_v: decodedVoltageV,
    decoded_pdo2_current_a: 1.5,
    expected_accepted: testCase.accepted,
    validator_exit: result.status,
    passed: true,
  })
}
const report = {
  scope:
    "Reproducible synthetic decoder tests only; no NVM programming or hardware evidence",
  validator_sha256: createHash("sha256")
    .update(readFileSync("scripts/check-stusb4500-readback.mjs"))
    .digest("hex"),
  results,
  all_passed: true,
  physical_programming_tested: false,
  physical_readback_tested: false,
  correction:
    "The historical 20v_preferred test changed only byte0x8A and actually encoded14.6V. This fixture encodes20V/1.5A as0x00064096 and asserts its decoded voltage before rejection.",
}
if (process.argv[2]) {
  writeFileSync(process.argv[2], `${JSON.stringify(report, null, 2)}\n`)
}
console.log(
  "Seven synthetic readback cases pass; true20V PDO rejected. Hardware tests remain pending.",
)
