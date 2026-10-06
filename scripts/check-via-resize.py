"""Verify a via-pad-only revision against actual native board geometry."""

import hashlib
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path


def connected_root(parent, key):
    parent.setdefault(key, key)
    if parent[key] != key:
        parent[key] = connected_root(parent, parent[key])
    return parent[key]


def board_signatures(circuit):
    parent = {}
    for entry in circuit:
        if entry["type"] == "source_trace":
            members = entry["connected_source_port_ids"] + entry["connected_source_net_ids"]
            for member in members[1:]:
                parent[connected_root(parent, member)] = connected_root(parent, members[0])
    references = {entry["source_component_id"]: entry["name"] for entry in circuit
                  if entry["type"] == "source_component"}
    partitions = defaultdict(list)
    for port in circuit:
        if port["type"] == "source_port" and port.get("source_component_id") in references:
            partitions[connected_root(parent, port["source_port_id"])].append(
                (references[port["source_component_id"]], port["pin_number"]))
    net_names = {connected_root(parent, entry["source_net_id"]): entry["name"]
                 for entry in circuit if entry["type"] == "source_net"}
    traces = {entry["source_trace_id"]: entry for entry in circuit
              if entry["type"] == "source_trace"}
    wires = []
    for trace in circuit:
        if trace["type"] != "pcb_trace":
            continue
        source = traces[trace["source_trace_id"]]
        net_name = net_names[connected_root(parent, source["connected_source_port_ids"][0])]
        layer = trace["route"][0].get("layer", "top")
        for start, end in zip(trace["route"], trace["route"][1:]):
            if start["route_type"] == "via":
                layer = start["to_layer"]
            else:
                layer = start["layer"]
            if (start["x"], start["y"]) == (end["x"], end["y"]):
                continue
            width = start.get("width", end.get("width", source.get("min_trace_thickness")))
            wires.append((net_name, layer, start["x"], start["y"], end["x"], end["y"], width))
    return sorted(sorted(group) for group in partitions.values()), sorted(wires)


def strip_ids(entry):
    if isinstance(entry, dict):
        return {key: strip_ids(field) for key, field in entry.items()
                if not key.endswith(("_id", "_ids"))}
    if isinstance(entry, list):
        return [strip_ids(field) for field in entry]
    return entry


baseline_path, current_path, report_path = map(Path, sys.argv[1:4])
baseline = json.loads(baseline_path.read_bytes())
current = json.loads(current_path.read_bytes())
assert not any(entry["type"].endswith("_error") for entry in current), "Native errors remain"
before_partitions, before_wires = board_signatures(baseline)
after_partitions, after_wires = board_signatures(current)
assert before_partitions == after_partitions, "Purchased-pin wiring changed"
assert before_wires == after_wires, "Trace layer, coordinates or width changed"
for kind in ["source_component", "source_port", "cad_component", "pcb_smtpad",
             "pcb_hole", "pcb_keepout", "pcb_courtyard_outline",
             "pcb_silkscreen_path", "pcb_silkscreen_text"]:
    before = sorted(json.dumps(strip_ids(entry), sort_keys=True) for entry in baseline if entry["type"] == kind)
    after = sorted(json.dumps(strip_ids(entry), sort_keys=True) for entry in current if entry["type"] == kind)
    assert before == after, f"{kind} changed"
before_vias = {(entry["x"], entry["y"]): entry for entry in baseline if entry["type"] == "pcb_via"}
after_vias = {(entry["x"], entry["y"]): entry for entry in current if entry["type"] == "pcb_via"}
assert before_vias.keys() == after_vias.keys(), "Via position or count changed"
resized = 0
for position, before in before_vias.items():
    after = after_vias[position]
    assert before["hole_diameter"] == after["hole_diameter"], "Via drill changed"
    assert before["layers"] == after["layers"], "Via span changed"
    expected = .45 if (before["hole_diameter"], before["outer_diameter"]) == (.3, .6) else before["outer_diameter"]
    assert after["outer_diameter"] == expected, "Unexpected via pad change"
    resized += before["outer_diameter"] != after["outer_diameter"]
report = {
    "baseline_sha256": hashlib.sha256(baseline_path.read_bytes()).hexdigest(),
    "canonical_sha256": hashlib.sha256(current_path.read_bytes()).hexdigest(),
    "purchased_pin_count": sum(map(len, after_partitions)),
    "purchased_wiring_parts_pads_cad_and_all_wire_segments_unchanged": True,
    "nonzero_wire_segment_count": len(after_wires),
    "resized_via_count": resized,
    "via_count": len(after_vias),
    "via_sizes": [{"hole_mm": hole, "pad_mm": pad, "count": count}
                  for (hole, pad), count in sorted(Counter((entry["hole_diameter"], entry["outer_diameter"])
                                                           for entry in after_vias.values()).items())],
    "all_vias_match_user_requested_dimensions": all((entry["hole_diameter"], entry["outer_diameter"]) == (.3, .45)
                                                   for entry in after_vias.values()),
    "scope": "Via-pad-only preservation; regenerated fill requires independent filled-copper and CAM checks.",
    "passed": True,
    "prototype_fabrication_ready": False,
}
report_path.write_text(json.dumps(report, indent=2) + "\n")
print(f"Via resize preservation passed: {resized}/{len(after_vias)} resized; purchased wiring and wire geometry unchanged")
