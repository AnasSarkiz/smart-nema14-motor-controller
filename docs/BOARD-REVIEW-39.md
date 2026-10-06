# Six requested board checks — 0.0.39-alpha.0

This is a verified schematic implementation step with unchanged checked PCB
copper. It does **not** complete every requested redesign or authorize an order.
Circuit JSON: `dist/index/circuit.json`; exact mirrors are in dist/routing-review
and build/routing-review. Final canonical SHA-256:
`a2a836a5ceae27967440cb6a0e324a26426f9ada311d1a73391ced7507bcf3b7`.

| Request | Actual result |
| --- | --- |
| Standard USB schematic | Native `<connector standard="usb_c">` uses the exact official C5143397 component props. All sixteen purchased pin/pad groups are retained and shown, including DN1/DN2. The explicit native arrangement prevents the standard's DM naming from omitting imported D- pins. No import is patched. |
| UI and CLI style analyses | CLI fixes five missing reference labels, R41/C34 and R11/U2 collisions, and USB label/padding issues. Its remaining issue is D_VBUS orientation. Fresh exact C1974707 reproducer proves released core ignores rotation. All nine rendered sheets were viewed; residual automatic value/net-label overlaps are visible. UI remains at Loading files because required CDN access is denied; Chromium also lacks the current proxy root in its read-only NSS store. No complete UI/style pass is claimed. |
| JLCPCB availability | All 44 exact selected C codes were rechecked through JLCPCB's official public Parts Library stock endpoint, with no request errors. Fitted U1 C2847904, U2 C465949, D_USB C94934 and Q_PD C2965326 have no exact result. Public shop stock is separate from assembly allocation. |
| No blind/buried vias | Pass: all 224 current vias explicitly span top, inner1, inner2 and bottom. No blind/buried features. |
| All vias0.30 hole /0.45 pad | Incomplete. This nominal size meets JLCPCB's published preferred0.15 mm diameter difference, i.e.0.075 mm radial ring. Native source trial emits224 vias of this size but fails:66 opens,38 via/pad errors,5 drill-spacing errors; independent strict geometry measures217 violations. Candidate is rejected. Current sizes remain156×0.30/0.60,64×0.20/0.38,4×0.15/0.38. |
| Power wires on outer layers | Interpreted as top/bottom after no reply to optional clarification. VM, VBUS_CONN, VBUS_PROTECTED and BUCK_SW wires already use outer layers. V3V3 includes14.052864 mm inner1 wire; four motor nets include inner wires. Selected MOTOR_A1 native Pipeline9 outer-only jobs with 14,405 fixed obstacles terminate at 300 s or the 8 GiB RSS guard. No output is adopted. This does not establish that an outer route is impossible. |

Exact alternative-MPN searches are also preserved. The official results include
genuine TRINAMIC C2150710 TMC2209-LA-T public stock, but assembly allocation and
same-device ordering/package qualification are not established. The exact TI
TPD2EUSB30A and ST STL11N3 searches produce other-manufacturer lookalikes;
these are not interchangeable merely because their names resemble the originals.
Broader ST searches produce different packages/variants. No clone, substitute
router, weakened TypeScript or local credentials are introduced.

## Accepted board verification

Native build exits0; native source/placement/shorts checks report0 errors.
Native pin checks retain25 metadata warnings; four refdes and30 width warnings
remain disclosed. All five missing custom-label styling warnings are removed.
The schematic CLI exits0 while still reporting its D_VBUS issue: exit status
alone is not a style pass. Snapshot records a current baseline only.

334 traces /224 vias /82 pours;0 unconnected-port or dangling-trace errors;
82/82 physical nets joined. Strict actual copper and filled-copper checks pass,
including the68 exact filled-feature owners and five thermal vias. All 111
placements,423 imported pads,108 CAD components,111 runtime assets and421
purchased-pin electrical partitions are preserved. Exact physical comparison
permits only native USB classification and cable-insertion metadata changes.
Official imports, mechanical references, local tscircuit skill and routing sources
are byte unchanged. All 111 schematic purpose notes remain on nine A4 sheets.

Every nonzero trace segment is measured:2218 segments on82 nets. The stated
motor-current/−20% width analytical screen passes; it is not loaded power or
thermal validation. All 34 declared fanout corridors retain full source width.
USB planar skew remains0.381440727 mm; stackup/impedance/CAM qualification and
physical programmer/firmware tests remain pending. Five-pin standard JST
programmer order and100Ω damping remain checked; VOUT is deliberately NC.

Supplier silkscreen, four CPL orientation gaps, exact sourcing/allocation,
minimum copper/plating/stackup, filled/capped process acceptance and loaded
power/transient/thermal checks still block ordering. Prior CAM comparison is
retained by exact unchanged physical objects, not claimed as a fresh order approval.

## Cloud UI blocker

The saved environment draft revision10 retains the exact repository install
`bash scripts/cloud-setup.sh` and startup `bash scripts/cloud-smoke.sh` instructions.
It adds only the two required UI hosts `data.jsdelivr.com` and
`cdn.tailwindcss.com`, preserving the existing official-source/package hosts.
The supported application path is to review and save environment settings,
which can request an asynchronous runtime update, then recheck actual requests.
Tool draft saves do not apply or publish the configuration. No TLS bypass or
credential copying is used. Importing the already trusted public environment CA
into Chromium's legacy NSS store would require filesystem write access that
was not granted; there is no claim of an automatic-review rejection.

Actual Cloud memory limit:32 GiB, no swap; host RAM33.29 GiB.
Workspace filesystem:31.45 GiB total,22.57 GiB available at the recorded sample.
Current released versions were verified: tscircuit 0.0.2745, CLI 0.1.2251,
core 0.0.2095. No unnecessary package changes are made.

Evidence is in `evidence/rev-0.0.39-alpha.0/`; ROUTING-CANDIDATES.zip preserves
native routing inputs, bounded outcomes and rejected authored source. The
uniform candidate JSON is gzip-compressed and explicitly separate from canonical.

**PROTOTYPE FABRICATION READY: NO.**
