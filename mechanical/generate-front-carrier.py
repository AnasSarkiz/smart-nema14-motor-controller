"""Create a mechanical carrier study; no electronic component is generated.

Datum: PCB midplane Z=0, motor rear Z=-10, motor front Z=-38.2.
Dimensions are proposed machining dimensions, not manufacturer motor geometry.
Threads are represented by nominal clearance cylinders, not thread solids.
"""
import os
from pathlib import Path

os.environ["XDG_CACHE_HOME"] = str(Path(".mechanical-cache").resolve())
import cadquery as cq

mount_centers = [(x, y) for x in (-15.25, 15.25) for y in (-15.25, 15.25)]
front_z_mm = -38.2
front_plate = cq.Workplane("XY").box(43.2, 35, 3, centered=(True, True, False)).translate((0, 0, front_z_mm - 3))
front_plate = front_plate.cut(cq.Workplane("XY").circle(12).extrude(5).translate((0, 0, front_z_mm - 4)))
for x in (-13, 13):
    for y in (-13, 13):
        front_plate = front_plate.cut(cq.Workplane("XY").circle(1.9).extrude(5).translate((x, y, front_z_mm - 4)))

carrier = front_plate
for x in (-20.1, 20.1):
    rail = cq.Workplane("XY").box(3, 5, 37.4, centered=(True, True, False)).translate((x, 15.25, front_z_mm - 3))
    # Both rails occupy the motor-connector edge; side-entry plugs stay outward.
    carrier = carrier.union(rail)
for x, y in mount_centers:
    x_rail = -20.1 if x < 0 else 20.1
    arm = cq.Workplane("XY").box(abs(x_rail - x) + 3, 5, 3, centered=(True, True, False)).translate(((x_rail + x) / 2, y, -7.8))
    # A vertical return at the far edge connects both PCB supports to each rail.
    return_rail = cq.Workplane("XY").box(3, 35.5, 3, centered=(True, True, False)).translate((x_rail, 0, -7.8))
    boss = cq.Workplane("XY").circle(2.25).extrude(7).translate((x, y, -7.8))
    thread_envelope = cq.Workplane("XY").circle(1).extrude(4.5).translate((x, y, -5.3))
    carrier = carrier.union(arm).union(return_rail).union(boss.cut(thread_envelope))

fasteners = []
for x, y in mount_centers:
    # M2x5 with 0.5-mm washer: nominal engagement = 5 - 1.6 - 0.5 = 2.9 mm.
    washer = cq.Workplane("XY").circle(2.25).circle(1.1).extrude(0.5).translate((x, y, 0.8))
    head = cq.Workplane("XY").circle(1.9).extrude(1.6).translate((x, y, 1.3))
    shaft = cq.Workplane("XY").circle(1).extrude(-5).translate((x, y, 1.3))
    fasteners.extend([washer.val(), head.val(), shaft.val()])
for x in (-13, 13):
    for y in (-13, 13):
        head = cq.Workplane("XY").circle(2.75).extrude(-3).translate((x, y, front_z_mm - 3))
        shaft = cq.Workplane("XY").circle(1.5).extrude(6).translate((x, y, front_z_mm - 3))
        fasteners.extend([head.val(), shaft.val()])

assets = Path("mechanical/assets")
assets.mkdir(exist_ok=True)
carrier_shape = carrier.val()
assert carrier_shape.isValid() and len(carrier_shape.Solids()) == 1
cq.exporters.export(carrier_shape, str(assets / "front-flange-carrier.step"))
cq.exporters.export(cq.Compound.makeCompound(fasteners), str(assets / "carrier-fastener-envelopes.step"))
print("Exported a connected front-flange carrier and proposed fastener envelopes.")
