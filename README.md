# Smart NEMA 14 Motor Controller

Revision **0.0.44-alpha.0** — **RP2040 + autonomous STUSB4500 USB-PD**.
**Unrouted prototype. PROTOTYPE FABRICATION READY: NO. Not hardware tested.**

The user-requested redesign replaces STM32/TCPP01 with official RP2040,
external 2 MB QSPI flash, 12 MHz crystal and a dedicated STUSB4500 sink with
back-to-back P-channel power switches. The former MCU had UCPD hardware but
qualified PD firmware was absent; USB-C alone did not establish working PD.
The new controller negotiates autonomously using its factory sink PDOs.
Firmware must qualify the actual contract before enabling the motor/current.

The CAN interface uses a new MCP2515 SPI controller and retains SN65HVD230.
A functional magnetic buzzer driver is added; TMP112 remains the I2C sensor.
Its sheet now includes the sensor, pull-ups, bypasses and buzzer circuit.
All **147 electronic references / 146 default fitted** have purpose notes on
nine native A4 sheets. Only R50, the optional CAN termination link, is DNP.

The board remains **35 x 35 mm, four layers**, with the original four
connectors, front carrier and exact **STEPPERONLINE 14HM11-0404S** single-front-
shaft motor. AS5600 stays removed; motor control is open loop.

See [the complete redesign and every review request](docs/RP2040-USB-PD-REDESIGN.md),
[current validation](VALIDATION.md) and [Cloud task](docs/cloud/TASK.md).
Manufacturer verification, protection/current/oscillator qualification,
mechanical fit, new routing, USB/thermal/CAM review and hardware tests remain.
The full official schematic analyzer leaves one imported TVS rotation defect.
No purchased import, pad mapping, model, DRC or TypeScript rule is patched.

Fresh native [Circuit JSON](dist/index/circuit.json) includes the new placement:
**zero traces / zero vias / zero pours**. Placement builds with zero native
errors, but explicit native connection checking exposes **504 missing port
connections across 108 required nets**. These are not routed or ready to order.
Old STM32 copper is preserved historically and deliberately cannot be replayed
against the new RP2040 pin selectors. Revision 43 Gerbers/exports cannot
manufacture this revision.

The current reproducible lockfile remains pinned to Bun 1.3.9, tscircuit
0.0.2745 / CLI 0.1.2251 / core 0.0.2095 / native Pipeline9 0.0.959. The latest
published toolchain was checked; its upgrade is blocked by a published
modelprinter URL on pkg.pr.new. No substitute dependency is installed.
The required exact host is saved in the Cloud draft, alongside manufacturer
hosts. Saving a draft does not activate its network policy; review/save and
publish in environment settings are required.

```bash
bash scripts/cloud-setup.sh
bash scripts/cloud-smoke.sh
bun run build
bun run typecheck
```

Installation/startup do not route. Future routing uses bounded selected-net
native Pipeline9 jobs on Linux through scripts/run-cloud-routing.py, after
schematic/BOM/placement gates are resolved. Ordinary vias are configured for
0.30 mm drill / 0.45 mm pad with via-in-pad disabled; compliance and outer-layer
power routing must be measured on actual generated copper.

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
