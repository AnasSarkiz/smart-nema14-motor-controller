"""Generate proposed mechanical hardware only. Never author electronic models."""
import json
import math
import os
from pathlib import Path

os.environ["XDG_CACHE_HOME"] = str(Path(".mechanical-cache").resolve())
import cadquery as cq

constraints = json.loads(Path("mechanical/design-constraints.json").read_text())
if constraints["motor"] != "Phidgets 3323_0 / 35STH40-1004B":
    raise SystemExit("BLOCKED: retired Phidgets-only tool. Current motor attachment is unqualified; no historical artifacts overwritten.")
hardware = constraints["proposed_hardware"]
rear_z = constraints["rear_face_z_mm"]
radius = constraints["rear_hole_circle_diameter_mm"] / 2
angle = math.radians(constraints["rear_hole_angle_degrees"])
centers = [(radius * math.cos(angle), radius * math.sin(angle)),
           (-radius * math.cos(angle), -radius * math.sin(angle))]
solids = []
for x, y in centers:
    # Threads are clearance envelopes, not a manufactured thread representation.
    spacer = cq.Workplane("XY").circle(hardware["standoff_outer_diameter_mm"] / 2).extrude(hardware["standoff_length_mm"])
    top_thread = cq.Workplane("XY").workplane(offset=14).circle(0.8).extrude(4.3)
    spacer = spacer.cut(top_thread)
    stud = cq.Workplane("XY").circle(0.8).extrude(-hardware["male_thread_projection_mm"])
    solids.extend([spacer.union(stud).val().translate((x, y, rear_z))])
    washer = cq.Workplane("XY").circle(1.6).circle(0.85).extrude(0.3).val().translate((x, y, 0.8))
    head = cq.Workplane("XY").circle(1.6).extrude(1.2).val().translate((x, y, 1.1))
    screw = cq.Workplane("XY").circle(0.8).extrude(-4).val().translate((x, y, 1.1))
    solids.extend([washer, head, screw])
shaft_tip_z = rear_z + 12
sleeve = cq.Workplane("XY").circle(4).circle(2.025).extrude(5).translate((0, 0, shaft_tip_z - 5))
floor = cq.Workplane("XY").circle(4).extrude(0.3).translate((0, 0, shaft_tip_z))
wall = cq.Workplane("XY").circle(4).circle(3.025).extrude(2.3).translate((0, 0, shaft_tip_z + 0.3))
holder = sleeve.union(floor).union(wall).val()
magnet = cq.Workplane("XY").circle(3).extrude(2.5).val().translate((0, 0, shaft_tip_z + 0.3))
assets = Path("mechanical/assets")
assets.mkdir(parents=True, exist_ok=True)
for name, shape in [("standoffs", cq.Compound.makeCompound(solids)), ("retaining-cup", holder), ("diametric-magnet", magnet)]:
    cq.exporters.export(shape, str(assets / f"{name}.step"))
print("Generated three mechanical envelope files; no electronic definitions changed.")
