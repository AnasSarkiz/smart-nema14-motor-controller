# Two-port 15 V motor-power configuration

J_USB is the motor POWER port. J_DATA is the self-powered COMPUTER DATA port;
its VBUS only drives an isolated MOSFET voltage-presence detector. Computer 5 V
does not supply the controller or motor. Power the POWER port for USB control or
SWD programming. Firmware must use GPIO29's active-low presence flag to control
USB attachment and report a self-powered USB descriptor. Blank-flash ROM behavior
is not a substitute for this firmware; initially program through the guarded JST
SWD connector with its programmer VOUT left disconnected.

The STUSB4500's factory profile is unsuitable: its three active sink PDOs can
prefer 20 V. Factory POWER_OK2/3 may remain asserted after detach. Neither a
USB-C connector nor the chip selection establishes a 15 V contract.

Program this profile using ST's official STUSB4500 NVM configuration software
and its documented I2C programming procedure, preserving unrelated NVM fields:

| Setting | Required value |
| --- | --- |
| SNK_PDO_NUMB | 2 active PDOs |
| PDO1 | Fixed 5 V, 1.50 A |
| PDO2 | Fixed 15 V, 1.50 A; highest active/preferred PDO |
| PDO3 | Inactive; remove 20 V from the active profile |
| POWER_OK_CFG / PWR_OK_CFG | Configuration 2, `10b` |
| POWER_ONLY_ABOVE_5V | 0; allow 5 V logic bootstrap while motor remains inhibited |

This is a nominal 15 V PD contract, not a claim of an exactly 15.000 V physical
rail. ST's voltage monitor has configurable tolerance limits. Firmware must also
check the protected-VBUS ADC, PDO/RDO identity, faults and current settings before
asserting MOTOR_REQUEST_N low. A 5 V-only source must keep the motor disabled.

1. Assemble without a motor connected. Supply a current-limited, 5 V-only source
   to J_USB so factory 20 V preference cannot prevent logic bootstrap. Keep
   MOTOR_REQUEST_N high and verify ENN high.
2. Use the official ST NVM tool through I2C at the configured address 0x28.
   SCL/SDA are the shared 3.3 V bus at R2/R3 and U3 pins 7/8. Use only a 3.3 V
   adapter; do not drive an unpowered bus. Record the tool/version, board identity,
   exported original NVM and programmed NVM, with their checksums.
3. Select two active PDOs and set the table above. Do not merely write volatile
   PDO registers. Save/program the NVM with the official tool and verify its
   decoded fields. UM2650 documents runtime registers; it does not authorize an
   invented NVM sector layout or arbitrary password/programming algorithm.
4. Remove all power, then reapply the 5 V-only source. Read byte register 0x70
   and all bytes 0x85–0x90. Export/read back NVM configuration fields with the
   official tool after this cold restart. Record the actual hardware timestamp.
5. Validate the recorded runtime and NVM readback with
   `node scripts/check-stusb4500-readback.mjs READBACK.json REPORT.json`.
   Required JSON fields are `hardware_identity`, `captured_at`,
   `cold_power_cycle`, `runtime_registers` (hex address strings to integer bytes),
   and `nvm_fields` containing the three named configuration fields above.
   The script rejects factory three-PDO/20 V preference. It never creates a
   hardware readback.
6. With motor disconnected, test POWER-only 5 V, POWER-only 15 V, DATA-only,
   both ports, reset/brownout, detach/replug and renegotiation. Verify live
   VBUS_EN_SNK and POWER_OK2 qualification, ENN, ADC and lack of PC-VBUS backfeed.
   Connect the motor only after these measurements pass and firmware has the
   reviewed 14HM11-0404S current limit. Preserve waveforms and PD analyzer logs.

The hardware interlock uses three Schmitt-conditioned active-low flags, a NOR,
and a Schmitt-input NAND qualified by an independent 3 V supervisor. R7 and the
NAND output both use VCC_IO=3.3 V. The old 5VOUT ENN pull-up and low-threshold
series switches are removed. The supervisor's sub-0.7 V output is undefined;
the TMC2209 specifies I/O undervoltage reset with a minimum 2.1 V rising threshold.
The design does not claim a bench-verified ramp or hot/cold detach test.

Physical NVM programming, cold readback, PD negotiation and motor testing remain
pending. These instructions and analytical checks do not establish hardware
validation or authorize an order.

Sources: ST DS12499 Rev 8 §§2.2.8, 2.2.10, 3.3–3.4, 5; ST UM2650 runtime
programming guide; TI SCES417L (SN74LVC1G98), SCES470F (SN74LVC3G17), SCES488E
(SN74LVC1G27), TLV803E datasheet; ADI TMC2209 Rev 1.09 §§17, 19–20.

Reproduce the synthetic decoder/rejection checks with
`bun run test:stusb4500-readback`. Fixture inputs are preserved in
`tests/fixtures/stusb4500/`; every identity explicitly says SYNTHETIC. The
20 V / 1.5 A rejection fixture uses word `0x00064096`, little-endian runtime
bytes 0x89–0x8C = `96 40 06 00`. The harness asserts its decoded 20 V voltage
and 1.5 A current before invoking the validator. The historical
`20v_preferred` test changed only byte 0x8A, encoding 14.6 V; it demonstrated
a wrong-voltage rejection but was mislabeled. Its original receipt remains
preserved. The corrected regression evidence supersedes that label and does
not represent a programmed chip, cold hardware readback or PD negotiation.
