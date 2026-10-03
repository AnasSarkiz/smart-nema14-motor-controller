# Released runtime/importer blocker: imported React symbols do not rotate

Board revision 0.0.11-alpha.0, tscircuit 0.0.2742, @tscircuit/core 0.0.2056, CLI 0.1.2235, easyeda 0.0.368.

Official C1974707 / ESDA25P35-1U1M was imported unchanged. Reproducer: `scripts/imported-symbol-rotation.circuit.tsx`. It instantiates the same official part twice, with schRotation 0 and 270, without overriding symbols, footprints or pins.

Build and check:

```sh
bunx tsci build scripts/imported-symbol-rotation.circuit.tsx --schematic-svgs
bun run test:symbol-rotation
```

Expected: rotating 270° changes the pin1→pin2 vector from (0.8, 0) to (0, -0.8). Actual: both vectors are (0.8, 0). The regression writes `IMPORTED-SYMBOL-ROTATION.json` before failing. The main schematic checker continues to report TwoPinComponentShouldBeVertical for D_VBUS, despite command exit 0.

Root-cause investigation in the installed official core: `computeSchematicPropsTransform` composes translation only; `_doInitialSchematicComponentRenderWithReactSymbol` uses that transform. The separate `_addChildrenFromCircuitJsonSymbol` path applies rotation, but the supported official CLI import produces React TSX symbols. Recreating a component through the other path would violate this board's mandatory import rules and is not used.

The converter-generated React symbols for C2965326/C94934/C1974707/C12067/C82045 also omit internal reference-designator text. Native board annotations identify them in the draft; the warnings remain visible.

Proper resolution: implement rotation and reference-designator handling in the canonical core/converter source with regression/SVG coverage, release the corrected dependency, upgrade and rerun the official imports and board checks. No generated definition, installed dependency, validator or snapshot is manually patched here. No upstream issue, message or PR has been sent.
