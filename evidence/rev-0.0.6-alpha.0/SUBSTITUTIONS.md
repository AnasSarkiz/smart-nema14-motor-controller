# Selected supplier alternatives

Revision 0.0.6-alpha.0, 2026-10-02. User instruction: "use alternateve".

| Excluded original | Official alternative | Current use |
| --- | --- | --- |
| C2046441, unavailable library | C19947652, Bourns SRN6028C-3R9M, 3.9 uH | Selected L1; own supplier footprint |
| C5127782, unavailable library | C5127775, HoLRT1206-1W-180mR-1%, 0.18 ohm | Selected matched R5/R6; own supplier footprints |
| C723743, unavailable library | C5127776, HoLRT1206-1W-150mR-1%, 0.15 ohm | Verified electrical option, unpopulated; AEC-Q200 unestablished |

L1 and R5/R6 already used the selected alternatives before this instruction.
No unavailable original is instantiated. No additional 150 mOhm resistor is
needed in the current circuit. Changing the active sense pair to 150 mOhm
would change full-scale current and needs separate qualification; this decision
retains 180 mOhm and its existing current calculations.

Official import provenance is preserved in revision 0.0.4/0.0.5 evidence.
The prior 104 raw pin/pad mappings and isolated geometry review remain
applicable, and the existing released-import audit is rerun in this revision.
All imported files and electrical source remain byte-identical to revision
0.0.5; no symbol, footprint, pad, pin mapping or metadata was manually patched.

No current assembly stock reservation, pulse/thermal rating or full PCB fit
qualification is claimed. The original failed imports are no longer active
component requirements. Full schematic, motor geometry, placement, routing,
DRC and fabrication validation remain incomplete. NOT FABRICATION READY.
