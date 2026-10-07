# Revision 0.0.51: common FET-source copper and TMC2209 thermal vias

The RP2040 two-port15V architecture, exact imports and actual component placement
remain unchanged from revision50. The accepted power059 full-board replay has
54/120 physical nets complete,291 open ports,87 traces,66 ordinary0.30/0.45mm
through vias,five thermal0.30/0.45mm through vias,and six GND regions. Native
errors other than opens:0. Unchanged strict copper/drill violations:0. Filled
copper violations:0. GND is one network. All prior53 complete nets remain joined.

The common PD-FET source now joins all seven actual imported terminals. The
qualified update replaces three gate paths and adds six source paths while
preserving the other78 paths exactly. Long power trunks remain0.8mm with narrower
terminal escapes; loaded current and via-barrel qualification remain required.
Internal segments are explicitly visible in the four-layer replay; outer power
routing remains preferred where feasible. No clearance rule was lowered.

Whole-board graph construction repeatedly hit bounded guards. Official native
Pipeline9 SRJ search bounds restrict the solve domain to10×12mm while retaining
all3146 relevant original obstacles and every routing rule/terminal. A two-net
SOURCE/GATE solve completed in202.3seconds. Initial candidates failed full-board
checks and remain unqualified evidence. Manual source repairs address measured
pad,drill,track and ground-island failures. Native serializer reversal required
an explicit spatial width-transition point; generated JSON was never edited.

Five board-owned vias inside the unchanged U2 exposed pad provide a direct
four-layer ground thermal path. Their exact owner/process/mask/paste requirements
and unchanged native ordinary-via guard are in
[TMC2209-THERMAL-CONSTRUCTION.md](TMC2209-THERMAL-CONSTRUCTION.md). They require
selective IPC-4761 TypeVII filling/capping and quote/CAM confirmation. Open holes
are not an accepted substitute. No JEDEC30K/W or physical temperature claim.

Evidence:
`../evidence/rev-0.0.50-alpha.0/routing/power059-replay/` contains the native JSON,
strict measurements,all120 physical-net reports,thermal guard and viewed top,
inner1,inner2,bottom images. `QUALIFICATION-SUMMARY.json` records exact hashes and
all66 remaining net names. `src/routing/rev50-saved-paths.json` is the accepted
source. Historical failures and publication50 remain preserved.

Continue protected VBUS and VM first, then3.3V,PD/eFuse controls,USB pair/return,
and remaining interfaces until every required physical net is complete. Publish
this completed step with freshly rebuilt matching Circuit JSON and original CAD,
then continue immediately. Final loaded-power/USB/thermal,stock,schematic and
matching Gerber/drill/BOM/CPL/fabZIP checks remain. No fabrication order.

**PROTOTYPE FABRICATION READY: NO. Untested WIP prototype; work continues.**
