# Schematic style review — 0.0.42-alpha.0

The user's UI screenshot shows eleven issues on 0.0.40. The full current
official analyzer also reproduces eleven issues on the canonical 0.0.41 JSON.
Revision 0.0.42 reduces that result to **one unresolved issue**, D_VBUS
orientation. No style rule, DRC threshold or imported definition is changed.

| Issue | Source correction |
| --- | --- |
| J_USB box width | Native USB-C wrapper width 1.65 instead of 1.70; all sixteen official pin groups retained |
| U8 inner pin-label collision | Board-owned schematic width increased to 1.80 |
| Six separated capacitor banks | MCU, motor, buck, USB and programming capacitor schematic positions brought closer together |
| U1 reset supply path | Reset pull-up/filter moved to the MCU's reset side |
| U8 ground path | Local native GND label; reset pull-up moved closer |
| Additional automatic U10 ground detour during iteration | Local native GND label |

These changes affect schematic drawing only. The preservation check compares
every purchased manufacturer-pin electrical partition, part/pin attributes,
every PCB element type, placement and CAD registration with 0.0.41. It ignores
generated identifiers while resolving physical-port references to their real
component and manufacturer pin. All 411 purchased pins and all physical PCB/CAD
records remain exact. Original supplier modules and local model bytes are
unchanged. There is no new autorouting search.

## Analyzer and repeatable checks

Official analyzer source:
https://github.com/tscircuit/circuit-json-schematic-placement-analysis/tree/3b42ebf254bb5d7343874d3ec1023cc63a7781ce
(package manifest 0.0.45). The complete default analysis is used, without issue
filters. Its own native issue artifacts are rendered for review.

The pinned CLI's schematic-placement command runs an older, smaller analysis;
its successful exit status does not mean the full UI style analysis is clean.
The current official source reproduces the reported USB width warning even
though the analyzer bundled into the installed checks exempts native USB-C.
The board-owned width correction passes the full analyzer without exemptions.

The UI imports its analyzer from `jscdn.tscircuit.com`. That host returns proxy
403 in this VM. An exact live CDN/browser result is **not** claimed. To enable
that additional check, add only `jscdn.tscircuit.com` in environment network
settings and retry; do not replace the existing allowlist or bypass the proxy.
The official GitHub analyzer source executes locally using the existing pinned
runtime dependencies; no board dependency or lockfile changes are needed.

Example isolated review checkout, from the repository root:

```bash
git clone https://github.com/tscircuit/circuit-json-schematic-placement-analysis.git .publication/style-analyzer
git -C .publication/style-analyzer checkout 3b42ebf254bb5d7343874d3ec1023cc63a7781ce
ln -s "$PWD/node_modules" .publication/style-analyzer/node_modules
bun scripts/check-schematic-style.mjs dist/index/circuit.json .publication/style-analyzer/lib/analyze-schematic-placement.ts /tmp/schematic-style.json
python3 scripts/check-schematic-preservation.py /tmp/rev41-circuit.json dist/index/circuit.json /tmp/schematic-preservation.json
```

Use the immutable 0.0.41 baseline JSON from commit
`9f7ca62d598f61154ac4be2bc9db2debd83678d1` for `/tmp/rev41-circuit.json`.
The full style command correctly exits **1** while D_VBUS remains unresolved;
its report retains every issue and does not turn a known failure into a pass.

## Remaining imported-symbol defect

D_VBUS is official ESDA25P35-1U1M / C1974707. Its imported React `<symbol>`
remains horizontal despite the already requested native `schRotation={270}`.
The installed core's schematic transform translates these React primitives;
it does not apply the requested chip rotation. Changing the rotation number or
wrapping it in a group does not supply the missing runtime rotation.
The existing unmodified import reproducer is
`scripts/imported-symbol-rotation.circuit.tsx`.

This needs a supported upstream core/importer repair before complete schematic
qualification. No custom replacement symbol, dependency patch or generated-JSON
edit is adopted. The physical purchased pins and footprint remain verified.
Some automatic value labels still overlap wires; a zero style count would not
by itself establish readability, electrical correctness or fabrication readiness.

All prior fabrication blockers remain: MCU sourcing, supplier silk/orientation,
uniform requested vias, outer-only power, full power/thermal and manufacturer
process/assembly qualification. Firmware and hardware tests remain pending.
**PROTOTYPE FABRICATION READY: NO.** No fabrication order is authorized.
