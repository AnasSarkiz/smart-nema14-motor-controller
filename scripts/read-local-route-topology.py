"""Read existing copper into native saved paths; never search for new routing.

Only connections along already routed wire/via centerlines are traversed.
Disconnected components stay separate and are explicitly reported.
"""
import hashlib
import heapq
import json
import math
import sys
from collections import defaultdict
from pathlib import Path

from shapely import affinity
from shapely.geometry import LineString, Point, box

folder = Path(sys.argv[1])
complete_nets_only = len(sys.argv) > 2 and sys.argv[2] == "complete"
native = json.loads((folder / "circuit.json").read_text())
copper = json.loads((folder / "local-copper.json").read_text())
audit = json.loads((folder / "KICAD-INTERCHANGE-AUDIT.json").read_text())
assert audit["status"] == "pad geometry, connectivity partitions and manual copper match"
components = {e["source_component_id"]: e["name"] for e in native if e["type"] == "source_component"}
source_ports = {e["source_port_id"]: e for e in native if e["type"] == "source_port"}
pcb_ports = {e["pcb_port_id"]: e for e in native if e["type"] == "pcb_port"}
pads = {e["pcb_smtpad_id"]: e for e in native if e["type"] == "pcb_smtpad"}
port_nets = {}
for measurement in audit["measurements"]:
    pad = pads[measurement["native_pad_id"]]
    if pad.get("pcb_port_id") and measurement.get("exported_net"):
        port_nets[pad["pcb_port_id"]] = measurement["exported_net"]
layers = ["top", "inner1", "inner2", "bottom"]
paths = []
net_reports = []


def node(point, layer):
    return (round(point["x"], 5), round(point["y"], 5), layer)


def wire_point(position, width):
    return {"route_type": "wire", "x": position[0], "y": position[1],
            "layer": position[2], "width": width}


def pad_outline(pad):
    x, y, width, height = (pad[key] for key in ("x", "y", "width", "height"))
    if pad["shape"] == "rect":
        outline = box(x - width / 2, y - height / 2, x + width / 2, y + height / 2)
    elif pad["shape"] in ("pill", "rotated_pill"):
        radius = pad["radius"]
        half_x, half_y = max(0, width / 2 - radius), max(0, height / 2 - radius)
        outline = box(x - half_x, y - half_y, x + half_x, y + half_y).buffer(radius, quad_segs=64)
    elif pad["shape"] == "circle":
        outline = Point(x, y).buffer(pad["radius"], quad_segs=64)
    else:
        raise ValueError(f"Unreviewed native pad shape {pad['shape']}")
    return affinity.rotate(outline, pad.get("ccw_rotation", 0), origin=(x, y))


def shortest_existing_path(graph, endpoints):
    start, end = endpoints
    queue = [(0, start)]
    distances = {start: 0}
    previous = {}
    while queue:
        distance, current = heapq.heappop(queue)
        if current == end:
            edges = []
            while current != start:
                prior, edge = previous[current]
                edges.append((prior, current, edge))
                current = prior
            return list(reversed(edges))
        if distance != distances[current]:
            continue
        for neighbor, edge in graph[current]:
            cost = distance + (math.hypot(current[0] - neighbor[0], current[1] - neighbor[1]) if edge["type"] == "wire" else 0.1)
            if cost < distances.get(neighbor, math.inf):
                distances[neighbor] = cost
                previous[neighbor] = (current, edge)
                heapq.heappush(queue, (cost, neighbor))
    raise AssertionError("Existing copper component has no traversable path")


for net in sorted({route["net"] for route in copper}):
    if net in ("USB_DP", "USB_DM"):
        continue  # The seven reviewed native USB paths already retain this copper.
    routes = [route for route in copper if route["net"] == net]
    ports = [pcb_ports[port_id] for port_id, port_net in port_nets.items() if port_net == net]
    if len(ports) < 2:
        continue
    nodes = set()
    for route in routes:
        if route["type"] == "wire":
            nodes.update((node(route["start"], route["layer"]), node(route["end"], route["layer"])))
        else:
            nodes.update(node(route, layer) for layer in layers)
    nodes.update(node(port, port["layers"][0]) for port in ports)
    graph = defaultdict(list)
    for route in routes:
        if route["type"] == "via":
            via_nodes = [node(route, layer) for layer in layers]
            for start in via_nodes:
                for end in via_nodes:
                    if start != end:
                        graph[start].append((end, route))
            continue
        line = LineString([(route["start"]["x"], route["start"]["y"]), (route["end"]["x"], route["end"]["y"])])
        if line.length < 0.000001:
            continue
        points = sorted((line.project(Point(p[:2])), p) for p in nodes
                        if p[2] == route["layer"] and line.distance(Point(p[:2])) < 0.00002)
        for (_, start), (_, end) in zip(points, points[1:]):
            if start != end:
                graph[start].append((end, route))
                graph[end].append((start, route))
    # A branch may terminate at a pad edge, rather than at its center. Connect
    # only existing centerline nodes contained in the same actual pad. Convex
    # native SMT pads already contain this copper; no free-space wire is added.
    for pad in pads.values():
        if port_nets.get(pad.get("pcb_port_id")) != net:
            continue
        port = pcb_ports[pad["pcb_port_id"]]
        center = node(port, port["layers"][0])
        outline = pad_outline(pad)
        for existing in nodes:
            if existing != center and existing[2] == pad["layer"] and outline.distance(Point(existing[:2])) < 0.00002:
                edge = {"type": "wire", "width": 0.15, "native_pad_id": pad["pcb_smtpad_id"]}
                graph[center].append((existing, edge))
                graph[existing].append((center, edge))
    connected_components = []
    unseen = set(nodes)
    while unseen:
        seed = min(unseen)
        component = {seed}
        pending = [seed]
        while pending:
            current = pending.pop()
            for neighbor, _ in graph[current]:
                if neighbor not in component:
                    component.add(neighbor)
                    pending.append(neighbor)
        unseen.difference_update(component)
        connected_components.append(component)
    groups = [[port for port in ports if node(port, port["layers"][0]) in component]
              for component in connected_components]
    groups = [group for group in groups if group]
    net_path_count = 0
    for group in groups if not complete_nets_only or len(groups) == 1 else []:
        anchor = group[0]
        anchor_node = node(anchor, anchor["layers"][0])
        represented_nodes = set()
        for port in group[1:]:
            port_node = node(port, port["layers"][0])
            edges = shortest_existing_path(graph, (port_node, anchor_node))
            if not edges:
                continue
            # Stop at copper already represented by a prior native path. The
            # fanout API permits an endpoint on an existing junction. This
            # preserves branches without serializing the same long trunk for
            # every pad and duplicating thousands of routing obstacles.
            if represented_nodes and not complete_nets_only:
                for index, (_, end, _) in enumerate(edges):
                    if end in represented_nodes:
                        edges = edges[:index + 1]
                        break
            for start, end, _ in edges:
                represented_nodes.update((start, end))
            route_points = []
            width = next((edge["width"] for _, _, edge in edges if edge["type"] == "wire"), 0.15)
            route_points.append(wire_point(port_node, width))
            for start, end, edge in edges:
                if edge["type"] == "via":
                    route_points.append({"route_type": "via", "x": start[0], "y": start[1],
                                         "from_layer": start[2], "to_layer": end[2],
                                         "via_diameter": edge["width"],
                                         "via_hole_diameter": edge["hole_diameter"]})
                    route_points.append(wire_point(end, width))
                else:
                    width = edge["width"]
                    route_points.append(wire_point(start, width))
                    route_points.append(wire_point(end, width))
            route_points[0].update({"x": port["x"], "y": port["y"]})
            if edges[-1][1] == anchor_node:
                route_points[-1].update({"x": anchor["x"], "y": anchor["y"]})
            source_port = source_ports[port["source_port_id"]]
            selector = f".{components[source_port['source_component_id']]} > .pin{source_port['pin_number']}"
            paths.append({"connection": selector, "route": route_points})
            net_path_count += 1
    net_reports.append({"net": net, "ports": len(ports), "copper_components_containing_ports": len(groups),
                        "saved_paths": net_path_count,
                        "isolated_ports": [source_ports[p["source_port_id"]]["name"] for group in groups if len(group) == 1 for p in group]})

selected_nets = {report["net"] for report in net_reports if report["saved_paths"]}
connections = []
for port_id, net in port_nets.items():
    if net not in selected_nets:
        continue
    source_port = source_ports[pcb_ports[port_id]["source_port_id"]]
    connections.append(f".{components[source_port['source_component_id']]} > .pin{source_port['pin_number']}")
prefix = "complete-" if complete_nets_only else ""
(folder / f"{prefix}saved-paths.json").write_text(json.dumps({"net_names": sorted(selected_nets), "connections": connections, "paths": paths}, indent=2) + "\n")
(folder / f"{prefix}TOPOLOGY-REVIEW.json").write_text(json.dumps({
    "native_json_sha256": hashlib.sha256((folder / "circuit.json").read_bytes()).hexdigest(),
    "saved_paths": len(paths), "nets": net_reports,
    "complete_nets_only": complete_nets_only,
    "scope": "Existing routed centerline traversal only. Disconnected components remain unfinished; no fabrication approval.",
}, indent=2) + "\n")
print(f"Read {len(paths)} existing paths on {len(selected_nets)} nets; disconnected components remain explicit")
