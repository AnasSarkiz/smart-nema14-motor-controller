# Schematic component explanations

Revision 0.0.38-alpha.0 explains every one of the 111 electronic references inside
the native schematic. Each A4 sheet has a right-side COMPONENT PURPOSE panel,
with values and a short description of each device, passive or connector.
DNP means do not populate: U4/C6 are optional encoder parts; R50 is the optional
CAN endpoint link. The default fitted count remains 108.

Schematic coordinates were reflowed to keep the drawing clear of the purpose
panels. All original supplier modules, connections, PCB geometry and CAD are
unchanged from revision 0.0.37. The native schematic text is included in fresh
Circuit JSON and the published tscircuit revision.

All nine native renders were viewed; the coverage/layout check requires one
explanation per reference on its matching sheet and a panel clear of symbols,
net labels and wiring. TypeScript, format, native build, netlist, shorts, placement
and source checks pass. Existing 30 route-width and 27 supplier-pin metadata
warnings remain disclosed. The snapshot command records a new visual baseline.

Run `bun run test:schematic-notes` on fresh canonical Circuit JSON and
`node scripts/render-schematic-sheets.mjs` to reproduce the individual images.

- [MCU](../evidence/rev-0.0.38-alpha.0/schematic-MCU.png)
- [Encoder](../evidence/rev-0.0.38-alpha.0/schematic-Encoder.png)
- [CAN](../evidence/rev-0.0.38-alpha.0/schematic-CAN.png)
- [LogicPower](../evidence/rev-0.0.38-alpha.0/schematic-LogicPower.png)
- [MotorDriver](../evidence/rev-0.0.38-alpha.0/schematic-MotorDriver.png)
- [UsbPd](../evidence/rev-0.0.38-alpha.0/schematic-UsbPd.png)
- [Programming](../evidence/rev-0.0.38-alpha.0/schematic-Programming.png)
- [Interfaces](../evidence/rev-0.0.38-alpha.0/schematic-Interfaces.png)
- [InputPower](../evidence/rev-0.0.38-alpha.0/schematic-InputPower.png)

PROTOTYPE FABRICATION READY: NO. Supplier silk, four CPL orientations,
four sourcing/allocation gaps, stackup/plating/filled-via acceptance and complete
power/thermal qualification remain open. Hardware and programming are untested.
