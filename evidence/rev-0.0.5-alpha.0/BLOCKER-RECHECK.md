# Blocker recheck — 2026-10-02, revision 0.0.5-alpha.0

Latest published dependencies were resolved with `bun add --dev --exact
...@latest`: tscircuit **0.0.2733**, @tscircuit/cli **0.1.2230**, EasyEDA
**0.0.366**, core **0.0.2052**. `tsci upgrade` reported the CLI already current;
the separate latest wrapper resolution found 0.0.2733, and the global wrapper
was updated to match. VERSIONS.json and update logs identify the actual runtime.

| Finding | Current result | Evidence / remaining action |
| --- | --- | --- |
| B001 / C2847904 critical MCU labels | Resolved, still passes | Unchanged six-label MCU/TCPP audit; current draft physical connections and raw pin/pad audit pass |
| B002 / C1121848 DB/FLT labels | Resolved, still passes | Physical pins 10/11 retained; no manual edits |
| B009 / C5127775 resistor bug | Resolved, still passes | Native 0.18 Ω with both original pins/pads; replacement remains selected |
| Original C2046441 | Still unavailable, excluded | Fresh official CLI import exits 1: Component not found in EasyEDA library search; C19947652 3.9 µH replacement passes |
| Original C5127782 | Still unavailable, excluded | Fresh official CLI import exits 1 with same error; selected C5127775 180 mΩ replacement passes |
| Original C723743 | Still unavailable, excluded | Fresh official CLI import exits 1 with same error; C5127776 150 mΩ electrical candidate passes, remains unused; AEC-Q200 unestablished |
| U4 C79815 / U2 C465949 power metadata warnings | Still present | Fresh official CLI imports plus direct released-converter reproductions match; requires_power classification absent. Both warnings retained; physical power pins verified, no metadata patch |
| B003 exact motor rear mechanics | Still blocking stages 1/3 | No exact motor model/rear drawing, shaft/magnet/hole/screw/standoff geometry supplied. No board placement or holes inferred |
| B004 complete schematic/BOM and B010 protected PD power | Still unfinished | Actual draft contains 38 parts, five sheets; USB/PD power input, connectors, IO, temperature/LEDs and termination unfinished; VM and buck input unsupplied |
| B005 programmer power | Still unfinished | Official package 0.8.0 pin 1 remains VOUT; power isolation and complete SWD/reset integration unresolved |
| B006 operating/current/thermal/regen envelope | Still unqualified | Selected 180 mΩ sense pair nominal full scale 1.149 A RMS, proposed 1 A cap; no 1.2 A qualification or firmware/physical tests. Exact load and braking solution pending |
| B007 manufacturing stackup/actual copper | Still pending | Stackup not selected; no motor-board copper exists. Latest software cannot validate an absent routed design |
| B008 full package/model/assembly review | Still pending | Seven imported footprints inspected in isolated fixture; full supplier package, model registration, mask/paste, assembly stock and motor fit unqualified |

The latest runtime passes formatting, TypeScript, critical labels, netlist,
pin specification (zero errors, two documented warnings), source checks,
schematic placement, rebuilt five-sheet preview and 86 physical-pin net checks.
The expanded **isolated 80 x 35 mm import fixture** passes all **104**
raw-symbol/physical-port/pad mappings across seven supplier parts and reports
zero placement errors/warnings; no routed traces or vias exist. It is not the
35 x 35 mm motor controller placement. No check was disabled or weakened.

The three failed originals do not prevent the selected replacement draft from
building, but the original supplier imports remain blocked and excluded.
Fabrication remains **NOT READY**. PCB shorts, routed DRC, snapshots,
fabrication outputs and physical tests remain unperformed. None of the eight
complete-board validation stages is marked passed.
