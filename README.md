# Smart NEMA 14 Motor Controller

Revision `0.0.9-alpha.0`, 2026-10-03 Europe/Tirane. **Incomplete prototype; not fabrication ready. Routing disabled.**

The user selected **STEPPERONLINE 14HM11-0404S**, replacing Phidgets 3323_0.
Its unchanged official drawing and STEP are stored in
`references/motor/14hm11-0404s/`. The drawing was rendered and inspected;
the STEP imports as one valid solid. See [mechanical review](mechanical/REVIEW.md).

The selected motor is 0.9° (400 full steps/revolution), 0.4 A/phase,
25 ohms and 24 mH, with a single Ø5 mm front shaft. It has no projecting
rear shaft for the previous AS5600/magnet arrangement. An encoder is optional
for stepper operation. Open-loop operation is recommended for the first prototype;
the user has not yet decided whether to omit feedback. The existing optional
encoder electrical draft remains; it is not a mechanically qualified location.

`assembly.circuit.tsx` now renders **only the exact selected motor reference**.
The previous two M1.6 PCB holes, posts and rear magnet are absent from the active
preview. `controller-preview.circuit.tsx` separately renders the unmounted
57-part diagnostic PCB (56 draft supplier parts plus the official programmer
connector envelope). No rear bracket or four-post attachment is approved:
the drawing specifies front 4×M3 / 26 mm mounting, but does not specify rear
fastener engagement, replacement length or permissible preload. A manufacturer
specification or separate qualified carrier is needed before mounting the PCB.

The installed versions remain tscircuit 0.0.2736, CLI 0.1.2232 and EasyEDA
0.0.368. Imported electronic definitions are unchanged. USB connector
footprint blockers B011 and incomplete electrical qualification B012/B013 remain.
Six native A4 electrical sheets and their partial connectivity audits are retained.

Read [VALIDATION.md](VALIDATION.md), [issues.md](issues.md), [BOM.md](BOM.md),
[ARCHITECTURE.md](ARCHITECTURE.md) and [original brief](references/USER-BRIEF.md).
The current motor selection supersedes the brief's prior motor geometry.
Revision 8's Phidgets sources, assembly and checks remain archived in its evidence;
they do not qualify this motor or mount.

Run commands from this board directory:

```sh
bun run format:check
bun run typecheck
bun run validate:imports
bun run preview:schematic
bun run test:draft
bun run preview:assembly
bun run preview:controller
bun run test:assembly
bun run preview:viewer
node scripts/run-mechanical-checks.mjs
```

The interactive [motor reference](mechanical/assembly-preview.html) embeds the
native `dist/assembly/3d.glb`. It is a render, not a physical prototype photo.
The historical Phidgets-only analysis/hardware scripts refuse the new target.
No routing, Gerbers, drill files, assembly BOM/CPL, fabrication order or physical
test has been completed. Publication is blocked: no destination GitHub repository
or branch is configured (B018); neither remote update has succeeded.
