Create a new **tscircuit Smart NEMA 14 Motor Controller** PCB project.

The board is a compact controller intended to mount directly to the rear of a standard **NEMA 14 / 35 mm stepper motor**.

## References

Use these as design references:

1. **MKS SERVO35D**
   - Reference for the motor-mounted NEMA 14 form factor and overall product concept.
   - Do not blindly copy its circuit.

2. **Rishabh RP2040 Motor Controller**
   - https://tscircuit.com/imrishabh18/rp2040-motor-controller#pcb
   - Reference for a compact motor-mounted controller with USB-C PD and onboard sensing.

3. **tscircuit Standard JST Programmer**
   - https://tscircuit.com/tscircuit/standard-jst-programmer
   - This is REQUIRED for STM32 programming/debugging.
   - Do not create a custom SWD connector if the standard component can be imported.

Our board is NOT just a TMC2209 breakout board. It must be a complete standalone smart motor controller.

---

# Main architecture

Use:

- **STM32G0 family MCU**
- **TMC2209** integrated stepper driver
- **USB-C Power Delivery**
- USB 2.0 data if practical on the same USB-C connector
- **AS5600 magnetic encoder**
- CAN communication
- STEP/DIR interface
- limit-switch inputs
- temperature monitoring
- status/debug LEDs
- tscircuit Standard JST SWD programmer

Target motor:

**NEMA 14 bipolar stepper motor**

Typical target current:

**0.3–1.0 A/phase**

Design for approximately:

**1.2 A/phase maximum continuous target**

Do not design this as a high-current NEMA 23 controller.

---

# Mechanical requirements

Target PCB size:

**35 mm × 35 mm**

The board should mount directly behind a standard NEMA 14 motor.

Use the standard NEMA 14 mounting geometry from a real motor datasheet.

Do NOT guess mounting-hole locations.

Verify:

- motor face dimensions
- mounting-hole pitch
- mounting-hole diameter
- rear-shaft position
- shaft clearance
- screw-head clearance
- connector clearance
- encoder magnet position

The magnetic encoder must align with the rear motor shaft.

Prefer:

- electronics on TOP
- AS5600 on BOTTOM facing the motor shaft
- USB-C and external connectors accessible from board edges

A small connector overhang beyond the nominal 35 × 35 mm motor body is acceptable if mechanically necessary.

Keep the PCB itself as close as practical to 35 × 35 mm.

Use a **4-layer PCB**.

Suggested stack:

- L1: components / power / signals
- L2: solid GND
- L3: power distribution / slow signals
- L4: signals / encoder

---

# MCU

Preferred MCU:

**STM32G0B1 family**

Choose the exact STM32G0B1 package only after confirming:

- enough GPIO
- native USB support
- UCPD support if used for USB-C PD
- FDCAN
- UART for TMC2209
- I2C for AS5600
- SWD
- required timers
- package availability from JLCPCB/LCSC

Prefer a package around **LQFP48 / 7 × 7 mm** unless a smaller package has all required pins.

Do not choose an STM32 package that loses required USB-PD CC pins.

---

# Programming interface

STM32 programming/debugging MUST use:

https://tscircuit.com/tscircuit/standard-jst-programmer

Import and use the existing tscircuit standard programmer component.

Prefer the side-entry SWD + Reset version if it fits the mechanical design.

Connect:

- SWDIO
- SWCLK
- NRST
- GND
- VTREF / target voltage

Follow the standard programmer component's recommended SWD series resistors and connection guidelines.

Do not replace this with loose test pads unless additional test pads are useful.

---

# Motor driver

Use:

**TMC2209**

Requirements:

- STEP
- DIR
- ENABLE
- UART
- DIAG / StallGuard signal
- properly sized sense resistors
- correct VIO handling
- proper VM decoupling
- thermal exposed-pad design
- thermal vias
- sufficient copper around the driver

Configure it for NEMA 14 rather than maximum TMC2209 current.

Target approximately:

**≤1.2 A/phase continuous**

Do not assume the datasheet peak current can be used continuously.

Add suitable bulk motor-rail capacitance close to VM.

---

# USB-C and Power Delivery

USB-C Power Delivery is **MANDATORY**.

This is not a basic USB-C connector with only 5.1 kΩ Rd resistors.

The board must negotiate a real USB PD contract.

Support common PD voltages:

- 5 V startup/fallback
- 9 V
- 12 V
- 15 V
- 20 V

The firmware/power architecture should allow selecting an appropriate requested PD voltage.

For ordinary NEMA 14 operation, prefer **12 V or 15 V**.

20 V support is useful for higher motor speed/headroom.

The power architecture must safely:

1. start from default USB VBUS
2. keep the motor stage disabled
3. negotiate USB PD
4. verify the resulting power state
5. enable the motor stage only after power is valid

Investigate using the STM32G0B1 UCPD peripheral.

If using native STM32 UCPD, include the required external USB-C/PD protection components such as an appropriate **TCPP01-class protection device**, MOSFETs, resistors and ESD protection.

If native STM32 PD creates unacceptable board complexity, document a dedicated PD-controller alternative before changing architecture.

Do not silently replace USB-PD with fixed USB-C 5 V input.

---

# USB data

Prefer ONE USB-C connector for:

- USB-C PD power
- USB 2.0 data

Connect STM32 USB D+ / D- correctly.

Include:

- USB ESD protection
- proper differential routing
- required series resistors if recommended
- CC1/CC2 circuitry
- VBUS sensing as required

USB-C is the normal customer interface.

The Standard JST SWD connector remains the manufacturing/debugging interface.

---

# Power rails

Expected rails:

USB-C PD VBUS
→ motor VM rail

USB-C PD VBUS
→ buck regulator
→ 3.3 V logic rail

Choose a compact buck regulator that safely handles the full possible PD input voltage with suitable margin.

Do NOT use a regulator whose absolute maximum is too close to 20 V.

Check:

- maximum input voltage
- switching frequency
- inductor requirements
- thermal performance
- JLCPCB availability

---

# Encoder

Use:

**AS5600**

Mount it on the motor-facing side of the PCB.

Place it exactly at the motor shaft center.

Provide correct:

- decoupling
- I2C pull-ups
- magnet orientation documentation
- air-gap requirement
- shaft/magnet clearance

The encoder should allow:

- rotor position measurement
- missed-step detection
- position verification
- future closed-loop features

The board must still be usable if the encoder is not populated.

---

# CAN

Add CAN communication.

STM32G0B1 FDCAN:
→ CAN transceiver
→ CAN-H / CAN-L connector

Use a small 3.3 V CAN transceiver with good JLCPCB availability.

Include:

- CAN-H
- CAN-L
- GND
- optional power pin if useful
- configurable 120 Ω termination

Do not permanently terminate every board.

Use a resistor/jumper/bridge so termination can be enabled only on bus endpoints.

---

# STEP/DIR and external IO

Provide external control for:

- STEP
- DIR
- ENABLE if useful
- limit switch 1
- limit switch 2

Keep the external connector count low.

Prefer one compact JST-SH connector carrying several low-voltage signals instead of many individual connectors.

Do not mix raw motor power into a small low-current signal connector.

---

# Temperature monitoring

Add temperature monitoring near the TMC2209 / power stage.

Use either:

- a compact digital temperature sensor, or
- an NTC with STM32 ADC

The firmware should be able to detect excessive board temperature and disable the motor stage.

---

# LEDs

Add useful debugging LEDs only.

Minimum:

- POWER
- STATUS/RUN
- FAULT
- CAN/activity if space allows

Avoid excessive decorative LEDs.

An RGB status LED is acceptable if it saves board space.

---

# Protection

Include appropriate protection for:

- USB-C ESD
- CC-line protection
- USB D+/D-
- overvoltage
- reverse/current fault where applicable
- motor supply transients
- logic rail decoupling
- motor-driver thermal/current faults

Evaluate whether a TVS device is appropriate for the motor power rail.

---

# Connectors

Keep the board compact.

Expected connectors:

1. USB-C
   - PD power
   - USB data

2. Standard JST STM32 programmer
   - imported from the official tscircuit component

3. CAN / STEP-DIR / IO connector
   - consolidate signals where practical

4. Motor connection
   - either direct short connection to the motor or a compact 4-pin motor connector

The board is motor-mounted, so avoid unnecessary large screw terminals.

---

# BOM requirements

Before placement or routing, create a complete BOM table.

For EVERY component include:

| Ref | Function | Manufacturer | MPN | Package | LCSC/JLCPCB Part Number | Basic/Extended | Datasheet | Notes |
|---|---|---|---|---|---|---|---|---|

The BOM must include at minimum:

- STM32 MCU
- TMC2209
- USB-C connector
- USB PD/UCPD protection components
- buck regulator
- inductor
- CAN transceiver
- AS5600
- USB ESD device
- motor power capacitors
- current-sense resistors
- temperature sensor/NTC
- LEDs
- JST connectors
- Standard JST Programmer import
- termination resistor
- all protection parts

All production parts should preferably be available from **JLCPCB/LCSC**.

Do not invent LCSC numbers.

Verify each supplier part number.

If a part cannot be verified, mark it clearly as BLOCKED rather than guessing.

---

# tscircuit implementation rules

Initialize this as a proper tscircuit repository.

Keep the project organized and readable.

Suggested organization:

- `main.tsx`
- `src/`
  - `mcu/`
  - `motor-driver/`
  - `usb-pd/`
  - `power/`
  - `encoder/`
  - `can/`
  - `io/`
  - `mechanical/`
- `BOM.md`
- `issues.md`
- `README.md`

Use reusable subcircuits/components instead of putting the entire design in one giant file.

Use existing tscircuit components/packages whenever appropriate.

Do not author custom footprints if a verified supplier/imported component already exists.

---

# CRITICAL: routing must stay disabled

DO NOT ROUTE THE PCB YET.

The first phase is:

1. Initialize repository
2. Select exact components
3. Verify BOM
4. Verify JLCPCB/LCSC numbers
5. Import components
6. Verify footprints
7. Verify 3D models
8. Create schematic
9. Define exact NEMA 14 mechanics
10. Place mounting holes
11. Place encoder at exact shaft center
12. Perform component placement
13. Review connector access
14. Review thermal design
15. Review mechanical collisions
16. Review USB-C clearance
17. Review programmer clearance

Only after the BOM, schematic, mechanics and placement are approved should routing be enabled.

Explicitly keep autorouting/routing disabled during the initial work.

---

# Placement priorities

Placement order:

1. mounting holes
2. shaft/encoder center
3. USB-C
4. TMC2209
5. motor connector
6. bulk motor capacitors
7. STM32
8. USB-C PD protection
9. buck regulator
10. CAN transceiver
11. Standard JST programmer
12. IO connector
13. temperature sensor
14. LEDs/passives

Keep the TMC2209 and its current-sense/decoupling network extremely compact.

Keep switching-regulator loops compact.

Keep USB differential signals away from the switching node and motor-current paths.

Keep AS5600 away from large current loops and magnetic components where practical.

---

# Thermal requirements

This is a motor-mounted PCB, so thermal design matters.

For TMC2209:

- large exposed-pad copper area
- thermal-via array
- solid GND-plane connection
- avoid routing through the thermal pad
- provide sufficient copper spreading

Check whether thermal coupling from the PCB into the motor housing is helpful or harmful.

Do not assume the motor body will always be cool enough to use as the driver's heatsink.

---

# Deliverables for the FIRST iteration

Do NOT produce a fabrication-ready board yet.

First deliver:

1. proposed architecture
2. exact NEMA 14 reference motor/datasheet
3. complete candidate BOM
4. JLCPCB/LCSC part numbers
5. schematic
6. 35 × 35 mm board outline
7. verified NEMA 14 mounting holes
8. encoder/shaft alignment
9. component placement
10. 3D board preview
11. thermal assessment
12. `issues.md` containing every unresolved issue
13. explanation of anything that prevents routing

Finish the first iteration with a clear status:

**BOM READY / NOT READY**

**SCHEMATIC READY / NOT READY**

**MECHANICS READY / NOT READY**

**PLACEMENT READY / NOT READY**

**ROUTING: DISABLED**

Do not claim fabrication readiness until each stage has been separately reviewed.

The goal is a professional compact **USB-C PD Smart NEMA 14 Motor Controller** that mounts directly on the motor and follows tscircuit project conventions.