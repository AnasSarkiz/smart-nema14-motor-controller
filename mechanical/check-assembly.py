"""Measure the unchanged official STEP motor and actual TSX assembly placements.

This is a diagnostic, not a fabrication or physical sensor qualification.
"""
import hashlib
import json
import math
import os
import argparse
from pathlib import Path
from urllib.parse import urlparse

os.environ["XDG_CACHE_HOME"] = str(Path(".mechanical-cache").resolve())
os.environ["MPLCONFIGDIR"] = str(Path(".mechanical-cache/matplotlib").resolve())
import cadquery as cq
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from OCP.BRepAdaptor import BRepAdaptor_Surface
from OCP.BRepExtrema import BRepExtrema_DistShapeShape

output = Path("evidence/rev-0.0.8-alpha.0")
argument_parser = argparse.ArgumentParser()
argument_parser.add_argument("--skip-renders", action="store_true", help="Measure and export exact geometry; use the current native GLB viewer for visual inspection")
arguments = argument_parser.parse_args()
constraints = json.loads(Path("mechanical/design-constraints.json").read_text())
if constraints["motor"] != "Phidgets 3323_0 / 35STH40-1004B":
    raise SystemExit("BLOCKED: retired Phidgets-only tool. Current motor attachment is unqualified; no historical artifacts overwritten.")
circuit = json.loads(Path("dist/assembly/circuit.json").read_text())
source_names = {element["source_component_id"]: element["name"] for element in circuit if element["type"] == "source_component"}
imported_shapes = {}
cached_bounds = {}


def bounds(shape):
    cached = cached_bounds.get(id(shape))
    if cached is not None:
        return cached[1]
    bbox = shape.BoundingBox()
    measured = {"min": [bbox.xmin, bbox.ymin, bbox.zmin], "max": [bbox.xmax, bbox.ymax, bbox.zmax]}
    cached_bounds[id(shape)] = (shape, measured)
    return measured


def minimum_distance(first, second):
    distance = BRepExtrema_DistShapeShape(first.wrapped, second.wrapped)
    distance.Perform()
    if not distance.IsDone():
        raise RuntimeError("OpenCASCADE distance computation failed")
    return distance.Value()


def can_intersect(first, second):
    a, b = bounds(first), bounds(second)
    return all(a["max"][axis] > b["min"][axis] and b["max"][axis] > a["min"][axis] for axis in range(3))


def place_model(element):
    url = element["model_step_url"]
    path = Path("references/mechanical-supplier-models") / Path(urlparse(url).path).name if url.startswith("https://") else Path(url)
    if str(path) not in imported_shapes:
        print(f"Importing and validating {path}", flush=True)
        imported_shape = cq.importers.importStep(str(path)).val()
        if not imported_shape.isValid():
            raise RuntimeError(f"Invalid STEP shape: {path}")
        imported_shapes[str(path)] = imported_shape
    shape = imported_shapes[str(path)]
    origin = element.get("model_origin_position", {"x": 0, "y": 0, "z": 0})
    shape = shape.translate(tuple(-origin[axis] for axis in "xyz"))
    rotation = element["rotation"]
    for axis, vector in [("x", (1, 0, 0)), ("y", (0, 1, 0)), ("z", (0, 0, 1))]:
        shape = shape.rotate((0, 0, 0), vector, rotation[axis])
    position = element["position"]
    return shape.translate(tuple(position[axis] for axis in "xyz"))


motor_source = cq.importers.importStep("references/motor/3323_0.stp").val()
cylinders = []
for face in motor_source.Faces():
    if face.geomType() == "CYLINDER":
        cylinder = BRepAdaptor_Surface(face.wrapped).Cylinder()
        cylinders.append({"radius_mm": cylinder.Radius(), "axis_origin_mm": list(cylinder.Axis().Location().Coord()),
                          "axis_direction": list(cylinder.Axis().Direction().Coord()), "bounds": bounds(face)})
rear_shaft = next(cylinder for cylinder in cylinders if cylinder["bounds"]["min"][2] < -11)
rear_holes = [cylinder for cylinder in cylinders if abs(cylinder["radius_mm"] - 0.6105) < 0.000001]
hole_centers = [[cylinder["axis_origin_mm"][0] + 17.475, 17.475 - cylinder["axis_origin_mm"][1]] for cylinder in rear_holes]
hole_radius = math.hypot(*hole_centers[0])
hole_angle = math.degrees(math.atan2(hole_centers[0][1], hole_centers[0][0])) % 180
motor_review = {
    "source": "https://www.phidgets.com/productfiles/3323/3323_0/Images/3323_0_3D.zip",
    "sha256": hashlib.sha256(Path("references/motor/3323_0.stp").read_bytes()).hexdigest(),
    "source_units": "centimetres in STEP; OpenCASCADE imported millimetres",
    "valid_brep": motor_source.isValid(), "bounds_mm": bounds(motor_source),
    "rear_shaft_diameter_mm": rear_shaft["radius_mm"] * 2,
    "drawing_rear_shaft_diameter_range_mm": constraints["rear_shaft_diameter_mm"],
    "rear_shaft_projection_mm": -rear_shaft["bounds"]["min"][2],
    "rear_hole_centers_rear_view_mm": hole_centers,
    "rear_hole_circle_diameter_mm": hole_radius * 2,
    "rear_hole_angle_degrees": hole_angle,
    "rear_hole_model_minor_diameter_mm": rear_holes[0]["radius_mm"] * 2,
    "status": "blocked: official STEP rear shaft is 4.0 mm, drawing maximum is 3.9 mm; model retained unchanged",
    "cylinders": cylinders,
}
(output / "OFFICIAL-MOTOR-STEP-CHECK.json").write_text(json.dumps(motor_review, indent=2) + "\n")

models = {}
for element in circuit:
    if element["type"] == "cad_component":
        if not element.get("model_step_url"):
            raise RuntimeError(f"No exact STEP model for {source_names[element['source_component_id']]}")
        name = source_names[element["source_component_id"]]
        if name == "ProposedNonmagneticHardware":
            name = Path(element["model_step_url"]).stem
        models[name] = place_model(element)

pcb = cq.Workplane("XY").box(35, 35, 1.6).val()
for element in circuit:
    if element["type"] == "pcb_hole":
        drill = cq.Workplane("XY").circle(element["hole_diameter"] / 2).extrude(3, both=True).val()
    elif element["type"] == "pcb_plated_hole":
        if element["shape"] != "pill":
            raise RuntimeError("Unreviewed plated-hole shape")
        drill = cq.Workplane("XY").slot2D(element["hole_height"], element["hole_width"], 90).extrude(3, both=True).val()
    else:
        continue
    pcb = pcb.cut(drill.translate((element["x"], element["y"], 0)))
models["PCB"] = pcb

intersections = []
names = list(models)
for index, first_name in enumerate(names):
    for second_name in names[index + 1:]:
        first, second = models[first_name], models[second_name]
        if not can_intersect(first, second):
            continue
        print(f"Checking intersection {first_name} / {second_name}", flush=True)
        volume = first.intersect(second).Volume()
        if volume > 0.000001:
            intentional_thread = "standoffs" in (first_name, second_name) and "OfficialPhidgets3323Motor" in (first_name, second_name)
            intersections.append({"first": first_name, "second": second_name, "volume_mm3": volume,
                                  "intersection_bounds_mm": bounds(first.intersect(second)),
                                  "classification": "intentional major-thread envelope intersects motor minor-thread bore; detailed threads unmodeled" if intentional_thread else "unresolved geometry intersection"})
critical_distances = []
for critical in ["U4", "diametric-magnet", "retaining-cup", "J_USB", "J_SWD_ENVELOPE"]:
    for other in ["OfficialPhidgets3323Motor", "standoffs", "PCB"]:
        critical_distances.append({"first": critical, "second": other, "minimum_distance_mm": minimum_distance(models[critical], models[other])})

nominal_airgap = bounds(models["U4"])["min"][2] - bounds(models["diametric-magnet"])["max"][2]
hardware = constraints["proposed_hardware"]
max_magnet_face = 12.7 + 0.4 + 2.6
min_magnet_face = 11.7 + 0.2 + 2.4
# A minimum is derived from A2 >=1.25 plus A1 >=0.10, not an invented A nominal.
surface_gap = {"nominal_mm": nominal_airgap, "conditional_minimum_mm": 18.25 - 1.75 - max_magnet_face,
               "conditional_maximum_mm": 18.35 - 1.35 - min_magnet_face,
               "qualification": "proposed hardware/magnet tolerances only; magnetic field, retention, solder height and axis tolerance unqualified"}
report = {
    "status": "blocked", "scope": "all 57 actual supplier component STEP models plus unchanged official motor and proposed hardware; present draft only",
    "native_circuit_sha256": hashlib.sha256(Path("dist/assembly/circuit.json").read_bytes()).hexdigest(),
    "model_count": len(models), "rear_shaft_nominal_axis_xy_mm": [0, 0],
    "as5600_native_pcb_center_xy_mm": [0, 0], "magnet_nominal_axis_xy_mm": [0, 0],
    "encoder_nominal_gap": surface_gap,
    "maximum_proposed_motor_screw_penetration_mm": hardware["male_thread_projection_mm"] + hardware["male_thread_projection_tolerance_mm"],
    "motor_screw_penetration_requirement_exclusive_mm": 2.5,
    "model_bounds_mm": {name: bounds(shape) for name, shape in models.items()},
    "intersections": intersections, "critical_distances": critical_distances,
    "blockers": ["Official motor STEP rear shaft 4.0 mm versus drawing 3.9 mm maximum", "Magnet, retaining cup, standoff and screws not sourced/manufacturing-qualified", "Final motor/CAN/STEP-DIR/limit connectors and mating cables not yet selected", "Existing USB footprint issues; follow-up audit deferred until mechanics pass"],
}
(output / "ASSEMBLY-GEOMETRY-CHECK.json").write_text(json.dumps(report, indent=2) + "\n")
assembly = cq.Assembly(name="Phidgets3323DiagnosticAssembly")
for name, shape in models.items():
    assembly.add(shape, name=name)
assembly.save(str(output / "diagnostic-assembly.step"))


def render_view(settings):
    fig = plt.figure(figsize=(11, 9))
    ax = fig.add_subplot(111, projection="3d")
    for name, shape in models.items():
        vertices, triangles = shape.tessellate(0.12)
        polygons = [[vertices[vertex].toTuple() for vertex in triangle] for triangle in triangles]
        color = "#31835c" if name == "PCB" else "#b7bdc5" if name == "OfficialPhidgets3323Motor" else "#cf9a40" if name in ["standoffs", "retaining-cup"] else "#a93c5e" if name == "diametric-magnet" else "#4a5665"
        ax.add_collection3d(Poly3DCollection(polygons, facecolor=color, edgecolor="none", alpha=0.3 if name == "PCB" and settings["transparent_pcb"] else 1))
    ax.set(xlim=(-20, 20), ylim=(-20, 20), zlim=settings["zlim"], xlabel="X (mm)", ylabel="Y (mm)", zlabel="Z (mm)")
    ax.set_box_aspect((40, 40, settings["zlim"][1] - settings["zlim"][0]))
    ax.view_init(elev=settings["elevation"], azim=settings["azimuth"])
    ax.set_title(settings["title"], pad=18)
    fig.text(0.5, 0.02, "DIAGNOSTIC • Official STEP shaft discrepancy • Hardware / final connectors unqualified • Routing disabled", ha="center", fontsize=9)
    fig.savefig(output / settings["filename"], dpi=160)
    plt.close(fig)


for settings in [] if arguments.skip_renders else [
    {"filename": "assembly-isometric.png", "title": "Phidgets 3323_0 + actual controller draft", "elevation": 22, "azimuth": -55, "zlim": (-81, 10), "transparent_pcb": False},
    {"filename": "assembly-rear-stack.png", "title": "Rear shaft / magnet / bottom AS5600 / standoffs", "elevation": 0, "azimuth": -50, "zlim": (-23, 10), "transparent_pcb": True},
    {"filename": "assembly-axis-section.png", "title": "Side inspection of encoder stack and connectors", "elevation": 0, "azimuth": 0, "zlim": (-23, 10), "transparent_pcb": True},
]:
    render_view(settings)
print(f"Measured {len(models)} STEP solids/assemblies; {len(intersections)} intersections recorded. Mechanical status remains blocked.")
