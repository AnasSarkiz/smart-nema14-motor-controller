# Via, outer-layer power and buzzer continuation — 0.0.43-alpha.0

The latest user requests are 0.30 mm drill / 0.45 mm pad vias, outer-layer power
wires where possible, and a buzzer plus I2C sensing like
[Rishabh's RP2040 motor controller](https://tscircuit.com/imrishabh18/rp2040-motor-controller#3d).
These are separate qualification items. This revision implements the ordinary
via pad changes; uniform sizing and the other additions remain incomplete.

## Ordinary via pads

All 158 existing 0.30/0.60 mm vias are changed through native source to
0.30/0.45 mm. Drills, coordinates and through spans are retained. This includes
the five exactly owned filled/capped thermal contacts, whose manifests retain
their owners and processes. The other 66 filled/capped vias remain
63 x 0.20/0.38 and three x 0.15/0.38 mm. **158/224 meet the requested size;
all-via uniform sizing is not complete.**

The current [JLCPCB capability page](https://jlcpcb.com/capabilities/pcb-capabilities/)
states: "Via diameter should be 0.1mm(0.15mm preferred) larger than Via hole
size." The user's 0.15 mm diameter difference is a 0.075 mm radial ring.
The explicit ordinary-via size policy is updated accordingly. No drill/pad/
track/hole/edge/NPTH/keepout spacing rule or exact filled owner check is reduced.

The first candidate changed explicit vias before saved routes, leaving duplicate
coincident holes of different sizes. Native checking reported zero errors but
independent geometry rejected twelve drill and twelve annulus spacings. The
revised candidate changes every instantiated ordinary saved/explicit via and
coalesces correctly: native checking has zero errors, independent geometry has
zero violations under the requested size policy, and filled copper joins all
82 physical nets with zero clearance violations. Neither native exit status
alone nor a size-policy change is treated as a geometry pass.

The prior full uniform conversion has 109 native errors and 217 real spacing
violations. Its complete report and rejected native output remain in revision
0.0.39 evidence. The larger fine-pitch escape holes need actual relocation and
new routes; converting all diameters in place is not an acceptable solution.

## Outer-layer power

VM, input/protected VBUS and buck switch wires already use top/bottom. The 3.3 V
tree still has 14.052864 mm of inner1 wire, and all four motor output nets have
inner wires. Twenty inner power pours remain separately identified.

A fresh native 3.3 V candidate moves its inner path to bottom. It fails four
native errors, including three accidental contacts, and seven independent
track-spacing violations. It is rejected. A further native Pipeline9 candidate
removes the selected 3.3 V saved tree and reserves both inner layers as obstacles.
The first preparation incorrectly retained other 3.3 V saved paths in phase0;
its saved-phase selector error is retained. Corrected preparation reaches the
actual Pipeline9 topology-merging stage, then the 8 GiB process guard stops it
at 240.1 seconds, peak sampled RSS 8432.7 MiB. No completed route is adopted.
These results do not prove that an outer route is impossible. A different
component/escape layout and signal rerouting are still required.

## Reference sensing and buzzer

The reference uses TMP102 at I2C address0x48 and an HYG-8503A / C7544813 alarm.
Our existing U9 TMP112 already provides I2C temperature sensing at0x48, with
R2/R3 pull-ups, bypass and an MCU alert connection. A duplicate temperature
sensor is unnecessary for that role; firmware and thermal shutdown remain
unimplemented. The removed shaft encoder is not reinstated.

The original buzzer's official import has a roughly10x10 mm courtyard that
does not fit the current placement. A smaller official MLT-5020 / C94598
import has a6.80x5.76 mm courtyard. The top trial at(-9.5,13.25) mm fails
the actual C19 courtyard and touches a thermal via with its NC pad. A bottom
trial at(-3.75,13) mm fails four actual pad/trace/via clearances. Shifting
that bottom trial to(-3.75,13.75) mm builds with zero native errors; its strict
measurement is retained separately. All three pads are explicitly unconnected
in these diagnostic fixtures. Neither a connected alarm nor qualified drive,
bottom acoustic space, carrier clearance or final assembly is implemented.
Public JLCPCB shop lookup finds the exact part in stock, separately from
assembly allocation. Listed ratings are3 V nominal,2-4 V supply,4 kHz,
100 mA and external electromagnetic drive. A qualified addition needs a
MOSFET driver, default-off pull-down, flyback protection, bypass, GPIO/PWM,
updated power budget and physical acoustic/clearance tests.

The official datasheet link returns HTML rather than a PDF. Its alternate
official JLCPCB download host,
`jlc-prod-smt.oss-eu-central-1.aliyuncs.com`, is blocked by proxy CONNECT403.
The supported remedy is adding that exact host in environment settings and
saving them, then verifying the real request. No direct network bypass or
substitute specification is used. Buzzer circuit adoption is blocked pending
the manufacturer datasheet and complete wiring/placement/routing checks.

New test imports are unmodified exports from the JLCEDA/EasyEDA Official
Library: [JLCEDA](https://lceda.cn/) and [EasyEDA](https://easyeda.com).

Fresh canonical build and publication results are recorded in VALIDATION.md
and `evidence/rev-0.0.43-alpha.0/`. Full loaded power/thermal, USB/ESD and
physical programmer/firmware tests, MCU sourcing and supplier/manufacturing
approval remain incomplete. **PROTOTYPE FABRICATION READY: NO.**
