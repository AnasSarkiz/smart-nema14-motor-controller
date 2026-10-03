# Current architecture — revision 16

Exact 14HM11-0404S, open-loop default. USB4110/C5143397 → TCPP01/C1121848 and STL11N3LLH6 → TPS26600RHFR/C2155767 → VM → TMC2209 and AP63203 3.3 V buck. Independent OUT rating allows reverse-blocked motor rail on USB removal; board is not rated 60 V. Isolated EFUSE_RTN is distinct from GND. Two 24 kΩ resistors select 0.50 A bootstrap /1.00 A contract-enabled current screen via low-voltage-specified DMG1012T-7. Motor sense pair is 1 Ω, 0.25 W; 10k/10k VREF yields about 0.32 A peak, conservative 0.34245 A screen. Two Panasonic 100 µF/35 V bulk capacitors, manufacturer-recommended buck capacitors and close bypass sites are retained.

Hardware pulls ENN high and CAN RS high at reset. Native MCU UCPD firmware is required for PD; TCPP only protects the port. Bootstrap allocation ≤150 mA at 3.3 V from a PD charger/dock advertising ≥1.5 A at 5 V. Motion only after qualified ≥1.5 A contract at 9/12/15/20 V, max source 21 V. External ports export signals/grounds, not 3.3 V power. SWD and VBUS sensing use powered-off-safe TMUX1511 gated by supply supervisor. U4/C6 and CAN termination link R50 are DNP by default. No rear encoder or rear screw mounting is claimed.

Four-layer 35×35 mm PCB mounts to four separate front-flange carrier supports. Exact official motor/USB models and unmodified supplier electronics are preserved. The configured native routing targets remain disabled in revision 16; actual copper is the next review. See VALIDATION.md, BOM-CURRENT.md and mechanical/POWER-CORNER-REVIEW.md for current limits/evidence. Firmware and physical tests remain pending.

## Historical architecture notes — earlier draft values and unresolved paths below are superseded by the current source

# Current revision 0.0.9-alpha.0 update

Selected motor: STEPPERONLINE 14HM11-0404S; 0.4 A/phase, 25 ohms,
24 mH, 0.9° (400 full steps/revolution), single front shaft. Previous motor
ratings/current-limit proposals and rear encoder mechanics below are retired.
No firmware current limit is implemented or tested. Optional AS5600 electrical
draft remains while feedback selection is pending. Motor attachment is blocked
pending rear fastener specification or a qualified carrier. Electronic supplier
imports and partial connectivity are unchanged; USB footprint/protection blockers
remain. See [current validation](VALIDATION.md).

## Previous electrical draft and historical motor proposals

# Architecture - partial schematic draft, not approved

## Power and startup

USB-C connector -> protected sink power path -> motor VM and 3.3 V buck.
Investigate the STM32G0B1 UCPD peripheral with TCPP01-M12 protection; retain
native PD as the proposed architecture. The TCPP01 is protection, not a
standalone PD-negotiation controller. MCU firmware must negotiate contracts.

Default USB 5 V must boot logic while the motor remains disabled by a hardware
pull-up on TMC2209 ENN. Firmware should select an offered PD contract,
prefer 12 V or 15 V when available, verify measured VBUS and negotiated current,
configure the driver and only then permit motion. Requesting 12 V cannot
guarantee that a particular source offers it. Support 9 V and 20 V where
offered. 5 V fallback is logic-only with ENN high; the chosen standard TMC2209
internal-regulator circuit requires at least 5.5 V. Never bridge 5VOUT to VM
in this multi-voltage design.

The startup supply, TCPP dead-battery behavior, MOSFET orientation, inrush,
connector-side capacitance, voltage sensing, overvoltage threshold and power
discharge still need a complete schematic and review. A bulk motor capacitor
must not be connected indiscriminately across unnegotiated VBUS; assess
isolating it with a controlled power path. Do not assume a MOSFET plus TVS
provides complete USB PD or regeneration protection.

The logic regulator draft now uses imported Diodes AP63203WU-7, C780769,
fixed 3.3 V with a 32 V operating input limit, 3.9 uH C19947652 / Bourns SRN6028C-3R9M, 10 uF/50 V
input, 100 nF bootstrap and two nominal 22 uF/25 V output capacitors.
Its VBUS_INRUSH_OUT input is not supplied yet. Upstream inrush/reverse-current
protection, effective capacitance, transient tests and thermal review remain gates.

## MCU and interfaces

Candidate STM32G0B1CBT6, C2847904, LQFP48/7 x 7 mm. The manufacturer
datasheet confirms USB FS, UCPD and FDCAN in this family. The 48-pin package
exposes UCPD1 CC pins PA8 and PB15 and USB PA11/PA12. The simultaneous candidate pin allocation is recorded in
references/MCU-PIN-PLAN.md. CAN uses PB5/PB6, preserving USB PA11/PA12.
MCU supply/reset, I2C, CAN and motor UART/STEP/DIR/ENN/DIAG connections
are instantiated. USB/CC frontend is now wired as a draft; downstream power, SWD and external IO remain unfinished.

Use MCU-generated STEP/DIR/ENN, UART and DIAG with the TMC2209. Receive
external STEP/DIR and limits through MCU inputs with defined pull states,
protection and documented logic levels. Do not short external STEP/DIR
drivers directly to actively driven MCU outputs.

Candidate CAN transceiver: TI SN65HVD230DR, C12084, 3.3 V. The imported part is instantiated in the CAN draft sheet
for classical CAN; no CAN FD data-phase support is claimed. Termination must
be selectable at endpoints. Connector pinout, protection and termination
switch remain unselected.

The C165948 USB-C connector draft carries PD and USB 2.0 data, with C94934
data ESD protection. Connector footprint approval is blocked by its difference
from the manufacturer drawing; C3020560 remains an unqualified alternative. Verify duplicated receptacle USB pins, return paths and the
final 90-ohm differential geometry against the chosen stackup.

## Programming

The official installed package exports `StandardJstSwdResetSide`, backed by
JST SM05B-SRSS-TB(LF)(SN), C136657. Its pinout is:

| Pin | Official signal |
| --- | --- |
| 1 | VOUT |
| 2 | SWDIO |
| 3 | GND |
| 4 | SWCLK |
| 5 | NRST |

**Pin 1 is programmer power output, not a confirmed passive VTREF input.**
The package describes a voltage selector. Resolve 3.3 V-only operation and
backfeed protection before connecting it to the USB-powered logic rail.
Verify the recommended series resistors and programming power arrangement
from the package's source/documentation. They have not been qualified.
No custom SWD connector is proposed.

## Motor current and temperature

0.3-1.0 A/phase is the typical target; 1.2 A/phase continuous is an intended
upper design target, **not a verified operating limit**. Resolve RMS versus
peak current conventions for the motor, driver configuration and advertised
limits. The current draft uses imported C5127775 / HoLRT1206-1W-180mR-1%, 180 mOhm,
1 W, 1%, giving nominal full-scale 1.149 A RMS / 1.477 A sine peak. This
conservative iteration targets no more than 1.0 A RMS in firmware, with 0.3 A
bring-up. It does not implement the approximately 1.2 A upper target. Exact
motor/nameplate convention, resistor tolerance/temperature, driver threshold
spread and actual thermal capability must be qualified before rating the board.

Provide the manufacturer-specified charge-pump capacitors, VIO and 5VOUT
decoupling, compact VM capacitance, grounded exposed pad, thermal vias and
ground-plane spreading. Select either an NTC/ADC network or a digital sensor
near the driver with firmware thermal shutdown and recovery rules.

A warm motor housing cannot be assumed to cool the driver. No numerical
1.2 A thermal qualification exists yet. Review the heat path, copper area,
ambient conditions and enclosure, then measure driver/PCB/motor temperatures
on an actual prototype. Determine a lower bring-up current before first motion.

Motor deceleration can return energy to VM. USB PD sources are not assumed
to absorb it. Define the load/inertia/speed range and size an energy absorption
or braking arrangement; TVS clamping voltage and energy must protect every
rail-connected component across tolerances.

## Encoder and mechanics

AS5600-ASOM, C79815, is the proposed optional bottom-side I2C encoder.
Its sensing center must align with the actual rear shaft and a diametrically
magnetized magnet. Verify the manufacturer's field-strength/air-gap limits,
package sensing location, magnet holder and assembly tolerance. The center
of a generic SOIC bounding box is not enough evidence.

The only modeled geometry is the requested 35 x 35 mm envelope. No holes
or shaft clearance have been guessed. STEPPERONLINE 14HS13-0804D-PG51 is a
possible reference because its page explicitly specifies a rear shaft and
rear screw holes, but it is a geared model and is **not the selected motor**.
The manufacturer's drawing has not been obtained/reviewed. Front NEMA hole
pitch cannot by itself qualify a rear mounting arrangement.

## Future route corrections

The installed props expose `pcbRouteCache` and native PCB trace/path APIs.
Once prior gates pass, retain each routed circuit JSON and its source/dependency
checksums before changing routes. Correct geometry in supported native source
or route-cache inputs, rebuild, then repeat shorts, clearances, drill-to-copper,
connectivity and visual checks. Never edit Gerbers or erase DRC records to
conceal a fault. No routes exist in this revision to save or edit.

References and the limits of each review are in `references/SOURCES.md`.

## Revision 0.0.6-alpha.0 schematic progress

The old critical label-loss issues are resolved through released converter output,
with the original audit unchanged. Five native A4 sheets now implement:

- STM32 power/reset and I2C1/FDCAN2 pin connections with imported passives.
- AS5600 at 3.3 V: both supply pins tied together, 100 nF, 4.7 kOhm I2C pull-ups,
  DIR grounded, OUT unused and PGO retaining its internal pull-up. This draft
  supports volatile configuration/readout only, not OTP programming.
- AP63203 with imported passives and a reviewed preliminary inductor ripple calculation.
- TMC2209, two 180 mOhm sense resistors, charge pump, 5VOUT/VIO/VM decoupling,
  200 uF nominal motor bulk, 10 kOhm ENN pull-up, STEP/DIR pull-downs, UART
  TX 1 kOhm and 5VOUT-derived VREF divider. No PCB thermal-via geometry yet.
- SN65HVD230 with 100 nF, RS grounded for high-speed classical CAN, VREF unused.
  The connector, ESD and selectable termination are still pending.

The regulator and motor support networks are present but their protected supply
inputs have no source yet. The separate VM input prevents a draft from implying
that the motor bulk can be connected directly to USB VBUS. Unwired MCU pins reserved for unfinished
blocks are intentionally visible; they are not declared as unused. Only actually
unused GPIO are marked no-connect and must be set to analog mode in firmware.
C2's nominal 4.7 uF must be checked for effective capacitance under bias.
No PCB coordinates are assigned. Encoder bottom-side intent does not establish
shaft alignment; all previews use PCB generation disabled.

TCPP physical pin 6 CTRLVBUS is the analog OVP divider input, not an MCU
control output. The pin plan was corrected before any such wiring was created.
TI TPS259470LRPWR / C3662793 was imported as an unused power-path candidate;
its presence does not qualify or implement the USB power path.

## Revision 0.0.7 USB frontend

See references/USB-PD-REVIEW.md for implemented pin connections, dead-battery
sequence, C0G replacement, OVP tolerance screen and explicit component blockers.
The protected output is not connected to buck or motor. No startup, PD contract,
overvoltage, reverse-current, current-limit or regeneration behavior is qualified.

## Revision 0.0.8 motor lock

Phidgets 3323_0 / 35STH40-1004B is the sole target motor. Motor rating
is 1 A/phase, superseding the earlier 1.2 A target. Until waveform/current
and thermal qualification, conservative proposed driver limits are 0.3 A RMS
bring-up and 0.7 A RMS maximum (approximately 0.99 A sine peak). These
limits are not implemented or verified firmware. Exact rear drawing and
original STEP are retained; the STEP's 4.0 mm rear shaft differs from the
drawing's 3.9 mm maximum. Diagnostic-only native assembly, proposed hardware
and remaining gates are described in mechanical/REVIEW.md. Routing is disabled.
