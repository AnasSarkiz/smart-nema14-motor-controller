# Remaining fabrication review — 0.0.41-alpha.0

Latest continuation: a fresh exact official shop check confirms enough displayed
stock for one default board for **41/42 fitted codes** (107 of 108 fitted refs).
**U1 C2847904 remains the only missing fitted code.** Genuine ST Q_PD C2965326
has 100 units. All43 catalogue codes were queried, including the DNP part.
Shop stock does not establish assembler allocation. Additional genuine-ST
LQFP variants return no stocked drop-in; stocked QFN alternatives have a
different footprint and have not been substituted. Exact chip distributor sourcing
cannot yet be verified because official `ksmk.st.com` and `estore.st.com`
requests receive proxy CONNECT403. See the continuation evidence below and
[network prerequisites](cloud/ENVIRONMENT.md).

Current public native Circuit JSON was anonymously rechecked: all three mirrors
retain the reviewed SHA256. Purchased imports, component placements, CAD and
canonical copper remain unchanged by the isolated routing trials. Evidence:
`evidence/rev-0.0.41-alpha.0/continuation-20261006/`.

Reviewed 2026-10-06 against canonical native Circuit JSON
`e3564bef28127cda269198701137dd2be9b552f6418f82ebc407435d66018430`.
This is additional evidence for the existing revision. No canonical source,
supplier definition, saved route, dependency, Circuit JSON or Gerber is changed.

## Results

| Item | Actual result | Action still required |
| --- | --- | --- |
| Connections | 82/82 physical networks joined; zero native errors, opens, dangling items or shorts; zero strict geometry violations | Recheck after any adopted layout change |
| Standard JST programmer | Existing 38 physical-pin/net assertions pass; target USB-C powered, VOUT disconnected | Firmware and physical flash/verify/recovery tests |
| Vias | 224 through vias, zero blind/buried; 158 × 0.30/0.60, 63 × 0.20/0.38, 3 × 0.15/0.38 mm hole/pad | Actual topology changes to meet the requested uniform 0.30/0.45 dimensions; retain drill/track/pad checks |
| Power layers | Four motor nets and V3V3 still have inner-layer traces; 20 inner power pour regions | Actual outer-layer routing, with full connectivity/geometry requalification |
| Owned connector text | Pass: 0.198 mm pen and 0.214466 mm minimum mask clearance | No change needed for these four labels |
| Supplier silk | 541 native paths below 0.15 mm; top ink outside outline and both sides inside required mask clearance | Verified released importer/exporter repair; no hand-patched supplier definitions or generated CAM |
| Assembly orientations | J_USB, LED_POWER, LED_STATUS, LED_FAULT still unverified by native exporter | Verified supplier rotation metadata or assembler-approved CPL |
| Q_PD C2965326 | Fresh official JLC shop now lists genuine ST STL11N3LLH6: stock 100, displayed presale number 97 | Order-specific assembler acceptance and allocation; no replacement needed solely for the earlier missing shop result |
| U1 C2847904 | No exact official shop match; STM32G0B1CBT6TR also absent; related LQFP48 CBT3 stock zero | Exact-part sourcing or a separately approved footprint/layout change; stocked QFN48 is a different footprint |

The production silkscreen checker deliberately exits **1**. The fabrication
gate report deliberately exits **1** because measured and external gates remain
unapproved. Those exits are blockers, not successful qualification. The native
front/back silk renders were viewed; measurements use strict native Gerber
vectors, rather than drawing appearance alone.

## Motor copper and minimum thickness

`scripts/review-motor-copper-loss.py` checks all four real driver/connector
physical-pin endpoints and each actual nonzero segment. It ignores beneficial
parallel pads/pours and charges a full 1.716 mm barrel for every distinct used
via. At the existing 0.3424477 A phase peak, -20% finished width, uniform 80 °C
copper, assumed 35/15.2 µm outer/inner copper and uniform 18 µm hole plating:

| Phase | Two-lead series resistance bound | Peak drop | Peak copper loss |
| --- | --- | --- | --- |
| A | 0.239944 Ω | 0.082168 V | 0.028138 W |
| B | 0.379950 Ω | 0.130113 V | 0.044557 W |

Simultaneous peak loss bound is **0.072695 W**, excluding driver/shunts/motor and
other board circuitry. This is a DC analytical bound under assumptions, not a
predicted temperature or a guaranteed manufactured-board bound. Barrel loss is
at most 0.23842 mW per used hole under the same assumptions.

Inverting the retained IPC-2221 30 °C current screen requires **14.8254 µm minimum
inner copper** for the 0.27 mm nominal motor tracks at -20% width. The assumed
15.2 µm is only 2.53% above that thickness requirement. The manufacturer must
confirm a minimum, rather than an average or nominal weight. The corresponding
outer requirement for the 0.15 mm motor segments is 10.2581 µm under that model.
This does not qualify rail/ground pour necks, simultaneous branch sharing,
switching-loop inductance, device junction temperatures or IPC-2152 behavior.

## Rejected outer-layer trial

A fresh isolated native manual-source candidate moved only the MOTOR_A2 inner2
span to bottom, retaining its XY route, widths, ports and through barrels. It
completed within 56.2 s using a peak sampled 1,455.9 MiB. Native DRC found **13
errors** and independent geometry found **25 violations**, including U9 GND/V+
pads, V3V3, TEMP_ALERT_N and TMC_DIR contacts. The candidate is rejected and its
source delta, complete generated JSON, geometry and run status are retained.

Read-only manual corridor probes also found obstacles in alternative top and
bottom corridors; they are not native-qualified routing solutions. These trials
do not prove that no solution exists. Meeting outer-only power routing needs
coordinated signal/feature routing changes; changing a layer name alone is unsafe.
The earlier uniform-via and native Pipeline9 failures remain preserved.

## Toolchain review

Latest checked releases are core 0.0.2097, CLI 0.1.2253, checks 0.0.241, props
0.0.689, EasyEDA importer 0.0.371 and Gerber exporter 0.0.112. Core adds multiple
PCB paths; other new changes update dependencies. No relevant supplier
silkscreen clipping/width or assembly-rotation repair was found. The already
checked pinned toolchain is retained. A version bump alone would not repair the
current fabrication defects.

## Concrete manufacturer/assembler review request

This is a prepared checklist, **not a sent request or an order**. Supply the
existing immutable `NATIVE-REVIEW-GERBERS.zip`, `REVIEW-BOM.csv`, native CPL and
`FABRICATION-GATES.json` after layout/import defects have been repaired.

1. Confirm exact JLC04161H-3313 four-layer construction, finished thickness and
   tolerance; guarantee minimum inner/outer copper and minimum barrel plating.
2. Confirm all 66 individually named filled/capped features against
   `src/routing/filled-signal-vias-trial.json` and `thermal-vias-trial.json`.
   Require IPC-4761 Type VII epoxy fill/copper cap and ENIG as specified;
   recognize the isolated eFuse RTN exposed pad separately from GND.
3. Confirm solder mask/paste and soldering of exposed pads, clear board outline
   and production silkscreen. Existing supplier silk failures are unresolved.
4. Approve polarity and absolute CPL rotations for the four named parts against
   actual supplier reels and footprints. Native fallback PCB rotation is not
   supplier approval.
5. Obtain actual acceptance/allocation for all **108 fitted references / 42
   fitted part codes** (43 codes including R50 DNP). Ask whether exact genuine ST
   STM32G0B1CBT6 C2847904 can be obtained through global sourcing; do not approve
   a clone, different package or unreviewed ordering suffix. Q_PD C2965326 now
   has a positive public shop listing, but no stock has been reserved.

Evidence: `evidence/rev-0.0.41-alpha.0/{MOTOR-COPPER-LOSS,FABRICATION-GATES,
SILKSCREEN-CAM,REMAINING-PART-SEARCH,RELEASE-FIX-REVIEW,
REJECTED-OUTER-A2-TRIAL}.json`, with complete rejected geometry/JSON compressed
alongside. The owned-text fixture and its native Gerbers are retained for
independent reproduction.

**PROTOTYPE FABRICATION READY: NO.** No fabrication order, assembler approval,
firmware operation, physical programming, ESD/USB/power/thermal or motor test is
claimed.

Repeat the new reviews from the repository root:

```sh
python3 scripts/review-motor-copper-loss.py dist/index/circuit.json \
  evidence/rev-0.0.41-alpha.0/TRACE-WIDTH-AUDIT.json \
  evidence/rev-0.0.41-alpha.0/POWER-CORNER-SCREEN.json \
  evidence/rev-0.0.41-alpha.0/MOTOR-COPPER-LOSS.json
python3 scripts/review-fabrication-gates.py dist/index/circuit.json \
  evidence/rev-0.0.41-alpha.0 evidence/rev-0.0.41-alpha.0/FABRICATION-GATES.json
```

The second command is expected to exit 1 while the reported blockers remain.
