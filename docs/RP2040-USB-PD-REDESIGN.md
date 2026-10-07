# Active continuation — 0.0.46-alpha.0

Read docs/REV46-ROUTING-CHECKPOINT.md, VALIDATION.md and the manufacturer review
in docs/REV45-PRE-ROUTING-REVIEW.md. Current exact canonical copper connects
51/108 nets:82 tracks,52 ordinary0.30/0.45 mm through vias,nine pours and255
native open ports; zero other native errors or strict copper violations.
All147 references /146 fitted models /12 ICs pass actual CadQuery checks.
Fresh official stock checks pass all54 exact identities; allocation/quote pending.
Two C1570 30pF loads replace four parallel15pF loads and keep native CAN clocks
under10mm with zero vias. Three native placement orientation suggestions and
one disclosed imported TVS schematic rotation finding remain explicit.
Continue one changed bounded selected-net Pipeline9 job at a time, save qualified
source paths and correct actual DRC manually. Finish all copper, outer power
where feasible, USB return/impedance, current/thermal and fresh CAM/assembly
qualification. Preserve official imports/models/history, exact motor, outline,
four connectors and carrier. Publish completed prototype steps with matching
fresh Circuit JSON and original CAD hashes under standing authorization.
PROTOTYPE FABRICATION READY: NO. No fabrication order is authorized.

---

# Historical redesign notes

# Current RP2040 and autonomous USB-PD — 0.0.45-alpha.0

Read [the current manufacturer and routing review](REV45-PRE-ROUTING-REVIEW.md)
and [validation](../VALIDATION.md). Revision45 corrects the flash selection to
GD25Q16EEIGR/C2986331, USB terminations to27 ohm/C25100, adds the qualified-delay
RUN supervisor, and uses the correctly rated genuine B5819WS flyback clamp.
The coherent latest released toolchain installs and passes TypeScript. All53
exact JLCPCB identities have positive official stock/SMT snapshots; all12 ICs
and148 fitted genuine STEP models pass actual CadQuery validity/export checks.

The checked partial board has41/108 physically joined nets,61 tracks,28 ordinary
0.30/0.45mm through vias,0 pours and407 open-port errors. No other native error
or independent copper-clearance violation remains in this partial packet.
Both actual USB plug-orientation paths are connected; planar skew is0.409mm,
the ESD-to-termination trunk skew is0.195mm and MCUstub skew is0.100mm.
A supported native Bus applies the unchanged0.25mm limit to the actual two
trunks. Full plug paths retain the independent0.5mm limit. A branched connector
must not compare its short stub length with a different signal's entire trunk.
The long pair uses one common inner2 layer; actual coupling, via-barrel delay,
ground reference/impedance and complete routing/CAM remain unqualified.

The exact motor, four connectors, 35×35mm four-layer outline and carrier stay
unchanged. Only internal parts move for real USB escape/clearance defects;
original purchased definitions and model bytes are preserved. All149 references
have purpose notes on9 A4 sheets. The disclosed imported TVS orientation style
finding remains visible. The5-board fitted parts baseline is$27.27 per board,
excluding PCB/assembly/loading/supplier losses/shipping/tax/carrier/motor.
**PROTOTYPE FABRICATION READY: NO.** No order or hardware result is claimed.

The following revision44 description is preserved as historical evidence;
its old flash,33 ohm resistors, flyback, blocked toolchain and unrouted counts
are superseded by the current review above.

---

# Historical RP2040 and autonomous USB-PD — revision 0.0.44-alpha.0

This is a new, **unrouted prototype**, replacing the revision 43 STM32 MCU and
TCPP01 protection architecture at the user's request. The former STM32 had a
UCPD peripheral, but the repository did not contain qualified PD negotiation
firmware. A USB-C connector or TCPP01 alone did not establish working USB-PD.

## Actual circuit change

U1 is official RP2040 / C2040, with external 2 MB W25Q16JVUXIQ / C2843335 boot
flash, a 12 MHz ABM8-272-T3 / C20625731 crystal, supply bypasses, a 1.1 V internal
regulator reservoir and two 33 ohm USB data resistors. GPIO29 is unused. RUN is
pulled up; SWD is physical pin 25 and SWCLK pin 24. There is no BOOTSEL button in
this revision. Flashing via SWD and boot behavior still require firmware and
hardware testing.

U3 is official STUSB4500QTR / C2678061: an autonomous USB-PD sink on CC1/CC2,
with dead-battery connections, I2C address 0x28, bypasses, alert, reset and an
actual controlled back-to-back P-channel load switch. Q_PD_IN and Q_PD_OUT use
unchanged official STL8P4LLF6 / C222138 imports, common sources and common gates.
A 100 kohm gate-to-source resistor defaults the pair off; 22 kohm connects the
gate to the controller's active-low VBUS_EN_SNK output. The ST reference and
MOSFET manufacturer pin tables were read; complete protection review is open.

Factory sink PDOs are **5 V/1.5 A, 15 V/1.5 A and 20 V/1 A**. They are not a
promise that the connected charger supports them. Firmware must read the
actual negotiated RDO and measured VBUS before enabling higher current or the
motor. POWER_OK3 alone is insufficient. A preferred 15 V operating profile
needs qualified NVM configuration and charger compatibility. Do not enable a
1 A nominal eFuse limit against a 1 A contract without worst-case tolerance and
logic/motor current margins. The retained input limiter boots at nominal 0.5 A.

VBUS sensing uses a 1 kohm Panasonic ERJ-P08F1001V / C4261071 resistor. Two
parallel resistors of that same part discharge VM (effective 500 ohm). Each is
nominally 0.66 W; pulse, temperature derating and bulk-capacitance/discharge
timing qualification are pending. VDD has 470 ohm input filtering. The existing
25 V TVS and 40 V switch require a real transient coordination review against
the PD controller's limits. Nominal operation is not surge qualification.

RP2040 has no hardware CAN peripheral, so the existing CAN function now uses
official MCP2515T-I/ML / C96140 over SPI1 and a 16 MHz ABM8 crystal / C179641.
The SN65HVD230 transceiver and optional endpoint termination are retained.
Each crystal leg has two parallel 15 pF official capacitors (30 pF total);
crystal load/stray capacitance, oscillator startup, 3.3 V SPI clock limits and
bit timing need manufacturer and hardware qualification.

The formerly sparse I2C sheet now contains TMP112 at 0x48, its bypass/alert and
shared pull-ups, plus a functional C94598 MLT-5020 magnetic buzzer circuit:
GPIO25 PWM, official DMG1012T low-side switch, 100 ohm gate resistor, 100 kohm
default-off pull-down, 1N4148WS flyback clamp and 1 uF local bypass. This is a
circuit addition; drive current, acoustic performance, rail budget and carrier
clearance are not yet qualified. No duplicate temperature sensor or AS5600 is
added; the selected single-front-shaft motor remains open loop.

## Firmware interface

| RP2040 GPIO | Function |
| --- | --- |
| 0 / 1 | TMC UART TX / RX |
| 2 / 3 / 4 / 5 | TMC STEP / DIR / active-low enable / DIAG |
| 6 / 7 | I2C1 SDA / SCL (TMP112 0x48, STUSB4500 0x28) |
| 8 / 9 / 10 / 11 | SPI1 MISO / chip select / clock / MOSI |
| 12 / 13 | MCP2515 active-low interrupt / CAN transceiver standby |
| 14 / 15 / 16 | External STEP / DIR / active-low enable |
| 17 / 18 | Limit inputs |
| 19 / 20 | PD active-low alert / active-high reset |
| 21 / 22 | eFuse active-low fault / high-current request |
| 23 / 24 / 25 | Status LED / fault LED / buzzer PWM |
| 26 / 27 / 28 | VBUS ADC / PD POWER_OK3 / temperature alert |
| 29 | Unused |

Keep ENN high, high-current request low, buzzer off and CAN in standby at
reset. PD reset is active high and has a physical pull-down. The existing
standard JST programmer's VOUT stays isolated from target power; the target
must be powered independently. Its five-pin order and protection remain.
The updated independent 38-assertion check verifies wiring, **not successful
physical programming**. Use an RP2040 SWD/OpenOCD target, not STM32 firmware.

## Every review request and its actual status

| Review | Result / remaining work |
| --- | --- |
| RP2040 standardization | Implemented with genuine imports, flash and crystal; firmware and full manufacturer qualification pending. |
| Actual USB-PD | Dedicated autonomous STUSB4500 circuit implemented; NVM/contract/current/transient and physical tests pending. |
| Schematic readability | Nine functional A4 sheets, 147 purpose notes; sparse pull-up sheet fixed. Full official analyzer leaves one imported TVS rotation defect, not suppressed. |
| Standard USB-C symbol | Native standard symbol and all 16 purchased pad/pin groups checked. |
| JLCPCB availability | 147 exact supplier identities / 146 default fitted. Fresh official search has incomplete responses due HTTP 503; historical and initial candidate stock is not assembler reservation. |
| Placements and component correctness | New placement is checked natively and revised to improve actual bypass/crystal proximity. Manufacturer verification, route inductance/lengths and 3D fit remain gates. |
| Ordinary vias 0.30 / 0.45 mm | Configured through-via policy with via-in-pad disabled. There are zero generated vias: no claim of routed compliance. |
| No blind/buried vias | No vias yet. Verify every actual span after routing. |
| Power wires on outer layers | Required for new routing where feasible; no power traces exist yet. Old inner-power copper is historical. |
| Buzzer and I2C sensor | Complete source circuit added; retained TMP112 sensor. Drive/power/mechanical and routing qualification pending. |
| No shorts / opens / DRC | Placement build and explicit shorts screen reviewed separately. Explicit connection checks expose the missing new routes; board connectivity is incomplete. |
| Trace widths, power and USB | New copper, stackup, differential routing/return, current/thermal and regenerative-energy review required. Prior revision 43 metrics do not apply. |
| All 3D models | Official model dependencies must accompany publication; current dependency coverage is checked separately from actual mechanical fit. |
| Minimum runtime / circuit JSON | Dedicated runtime packet excludes old routing experiments. Fresh native JSON is required in all three mirrors. Old imports, copper and evidence remain historical in Git. |
| Updated tscircuit | Latest registry versions researched. Full upgrade fails on published modelprinter dependency at blocked pkg.pr.new; original frozen pins retained, not substituted. |
| Push to tscircuit | Publish a clearly labeled unrouted prototype only after applicable checks; exact public file hashes and matching GitHub commit must be verified. |
| Ready to order | **NO.** Stages 2/3 remain in progress; no routing/fabrication/hardware approval follows from installation or a zero placement-error count. |

Manufacturer hosts and `pkg.pr.new` are saved in the environment draft, retaining
the package-manager preset and existing install/startup instructions. The
configuration tool says **requires_publish**: review/save in environment
settings, then publish the environment to apply the policy. A saved draft is
not effective runtime access. No proxy bypass, package substitution, credential
copy or TypeScript/DRC reduction is used.

The 35 x 35 mm four-layer outline, four connectors, front carrier and exact
STEPPERONLINE 14HM11-0404S are retained. Revision 43 routing modules, models,
context manifests and evidence are preserved historically. Replaying STM32
pin selectors against RP2040 is explicitly rejected. Previous Gerbers and
qualification ZIPs cannot manufacture this revision.

**PROTOTYPE FABRICATION READY: NO. No fabrication order is authorized.**

The mounted native GLB has an empty J_SWD mesh after intermittent HTTP503
from the standard programmer's original model URL. The mechanical guard
reports145/146 fitted meshes measured, no carrier/fastener/pair collisions
among those145, and **fails** on the missing connector. A successful builder
exit does not qualify complete CAD rendering or fit. Original supplier models
and URLs are retained; no placeholder or changed component is substituted.
