# Smart NEMA 14 Motor Controller

Revision **0.0.45-alpha.0** — **RP2040 + autonomous STUSB4500 USB-PD**.
**Partially routed prototype. PROTOTYPE FABRICATION READY: NO. Not hardware tested.**

The user-requested redesign replaces STM32/TCPP01 with official RP2040,
external 2 MB QSPI flash, 12 MHz crystal and a dedicated STUSB4500 sink with
back-to-back P-channel power switches. The former MCU had UCPD hardware but
qualified PD firmware was absent; USB-C alone did not establish working PD.
The new controller negotiates autonomously using its factory sink PDOs.
Firmware must qualify the actual contract before enabling the motor/current.

The CAN interface uses a new MCP2515 SPI controller and retains SN65HVD230.
A functional magnetic buzzer driver is added; TMP112 remains the I2C sensor.
Its sheet now includes the sensor, pull-ups, bypasses and buzzer circuit.
All **149 electronic references / 148 default fitted** have purpose notes on
nine native A4 sheets. Only R50, the optional CAN termination link, is DNP.

The board remains **35 x 35 mm, four layers**, with the original four
connectors, front carrier and exact **STEPPERONLINE 14HM11-0404S** single-front-
shaft motor. AS5600 stays removed; motor control is open loop.

See [the complete redesign and every review request](docs/RP2040-USB-PD-REDESIGN.md),
[current validation](VALIDATION.md) and [Cloud task](docs/cloud/TASK.md).
Manufacturer pin/BOM and initial placement/model reviews permit routing.
Complete copper, power/USB/thermal/CAM qualification and hardware tests remain.
The full official schematic analyzer leaves one imported TVS rotation defect.
No purchased import, pad mapping, model, DRC or TypeScript rule is patched.

Fresh native [Circuit JSON](dist/index/circuit.json) contains **63 traces,
36 ordinary through vias and7 native ground pours**. **44 of108 required nets** have
one independently measured physical copper island. Native checking still
reports **283 open-port errors**, with zero other native errors and zero strict
copper/drill/edge/keepout violations in this partial build. The build exits1
because connectivity remains incomplete. It is not ready to order.
Old STM32 copper is preserved historically and deliberately cannot be replayed
against the new RP2040 pin selectors. Revision 43 Gerbers/exports cannot
manufacture this revision.

The reproducible lockfile uses Bun1.3.9, tscircuit0.0.2750 / CLI0.1.2254 /
core0.0.2105 / native Pipeline9 0.0.962 with coherent released dependencies.
Frozen installation succeeds through the official registry mirror with normal
TLS/integrity. No substitute router, dependency patch or proxy bypass is used.
Saving a Cloud draft alone does not activate its network policy.

All12 ICs and all148 fitted genuine STEP models pass actual CadQuery import,
solid validity and export/reimport. Ten moved USB/bypass/crystal parts pass renewed
native placement and the actual mounted148-mesh nominal envelope checks.
All53 exact part numbers have positive official JLCPCB stock/SMT availability
checked2026-10-07 06:47UTC; customer allocation remains pending. The5-board
fitted-part baseline is$27.27 per board, excluding PCB, assembly/loading fees,
supplier losses, shipping/tax, carrier and motor. This is not a delivered quote.

```bash
bash scripts/cloud-setup.sh
bash scripts/cloud-smoke.sh
bun run build
bun run typecheck
```

Installation/startup do not route. Routing uses one bounded selected-net
native Pipeline9 job at a time on Linux through scripts/run-cloud-routing.py,
plus supported native saved manual paths. All36 current vias measure0.30mm
drill /0.45mm pad and span all four layers. Via-in-pad is disabled. Outer power,
complete loaded widths and USB coupling/return require copper qualification.

The standard JST programmer's five-pin order and protected SWD paths are
preserved. Its VOUT is isolated; independently power the target and use an
RP2040 programming target. The 38 wiring assertions pass; successful flashing
has not been tested.

Public destinations: [GitHub main](https://github.com/AnasSarkiz/smart-nema14-motor-controller)
and [tscircuit](https://tscircuit.com/AnasSarkiz/smart-nema14-motor-controller--01a0fd9b).
Publication receipts identify the exact successfully uploaded revision; a
local version number does not prove publication. The runtime packet includes
unchanged official OBJ/STEP dependencies and matching native JSON, excluding
old experiments. Full historical evidence and the tscircuit skill remain in Git.
No fabrication order is authorized.

The mounted native GLB has an empty J_SWD mesh after intermittent HTTP503
from the standard programmer's original model URL. The mechanical guard
reports145/146 fitted meshes measured, no carrier/fastener/pair collisions
among those145, and **fails** on the missing connector. A successful builder
exit does not qualify complete CAD rendering or fit. Original supplier models
and URLs are retained; no placeholder or changed component is substituted.
