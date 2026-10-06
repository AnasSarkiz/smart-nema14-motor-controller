# Schematic component explanations

Revision 0.0.40-alpha.0 explains every one of the 109 electronic references inside
the native schematic. Each A4 sheet has a right-side COMPONENT PURPOSE panel,
with values and a short description of each device, passive or connector.
U4/C6 are removed. R2/R3 remain for U9 temperature monitoring; R50 is the
optional CAN endpoint link (DNP, do not populate). The default fitted count remains 108.

Native USB-C standard symbols and the explanatory panels are retained. Revision
40 removes U4/C6 and their notes, renames Encoder to I2C, and reconnects shared
PCB bus/power/ground copper. Remaining purchased placements, pads and CAD are
unchanged. The original component imports and model assets remain intact.

All nine native renders were viewed; the coverage/layout check requires one
explanation per reference on its matching sheet and a panel clear of symbols,
net labels and wiring. TypeScript, format, native build, netlist, shorts, placement
and source checks pass. Existing 30 route-width and 24 supplier-pin metadata
warnings remain disclosed. The snapshot command records a new visual baseline.

Run `bun run test:schematic-notes` on fresh canonical Circuit JSON and
`node scripts/render-schematic-sheets.mjs` to reproduce the individual images.

- [MCU](../evidence/rev-0.0.40-alpha.0/schematic-MCU.png)
- [I2C](../evidence/rev-0.0.40-alpha.0/schematic-I2C.png)
- [CAN](../evidence/rev-0.0.40-alpha.0/schematic-CAN.png)
- [LogicPower](../evidence/rev-0.0.40-alpha.0/schematic-LogicPower.png)
- [MotorDriver](../evidence/rev-0.0.40-alpha.0/schematic-MotorDriver.png)
- [UsbPd](../evidence/rev-0.0.40-alpha.0/schematic-UsbPd.png)
- [Programming](../evidence/rev-0.0.40-alpha.0/schematic-Programming.png)
- [Interfaces](../evidence/rev-0.0.40-alpha.0/schematic-Interfaces.png)
- [InputPower](../evidence/rev-0.0.40-alpha.0/schematic-InputPower.png)

PROTOTYPE FABRICATION READY: NO. Supplier silk, four CPL orientations,
four sourcing/allocation gaps, stackup/plating/filled-via acceptance and complete
power/thermal qualification remain open. Hardware and programming are untested.
