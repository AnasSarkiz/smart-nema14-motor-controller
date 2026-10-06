"""Require schematic edits to preserve purchased parts, wiring, PCB and CAD."""

import hashlib
import json
import sys
from collections import defaultdict
from pathlib import Path


def connected_root(parent, key):
    parent.setdefault(key, key)
    if parent[key] != key:
        parent[key] = connected_root(parent, parent[key])
    return parent[key]


def electrical_partitions(circuit):
    parent = {}

    for trace in circuit:
        if trace["type"] == "source_trace":
            members = trace["connected_source_port_ids"] + trace["connected_source_net_ids"]
            for member in members[1:]:
                parent[connected_root(parent, member)] = connected_root(parent, members[0])
    references = {entry["source_component_id"]: entry["name"] for entry in circuit
                  if entry["type"] == "source_component"}
    groups = defaultdict(list)
    for port in circuit:
        if port["type"] == "source_port" and port.get("source_component_id") in references:
            groups[connected_root(parent, port["source_port_id"])].append(
                (references[port["source_component_id"]], port["pin_number"]))
    return sorted(sorted(group) for group in groups.values())


def clean_element(entry, pcb_ports):
    if isinstance(entry, dict):
        return {key: ([pcb_ports[port_id] for port_id in field] if key == "connectsTo"
                      else clean_element(field, pcb_ports))
                for key, field in entry.items()
                if not key.endswith(("_id", "_ids"))}
    if isinstance(entry, list):
        return [clean_element(item, pcb_ports) for item in entry]
    return entry


def normalized_elements(circuit):
    references = {entry["source_component_id"]: entry["name"] for entry in circuit
                  if entry["type"] == "source_component"}
    ports = {entry["source_port_id"]: (
        references.get(entry.get("source_component_id"), entry.get("source_manually_placed_via_id")),
        entry.get("pin_number"), entry.get("port_hints"))
        for entry in circuit if entry["type"] == "source_port"}
    pcb_ports = {entry["pcb_port_id"]: ports[entry["source_port_id"]]
                 for entry in circuit if entry["type"] == "pcb_port"}

    return {kind: sorted(json.dumps(clean_element(entry, pcb_ports), sort_keys=True)
                         for entry in circuit if entry["type"] == kind)
            for kind in {entry["type"] for entry in circuit}
            if kind.startswith("pcb_") or kind in {"cad_component", "source_component", "source_port"}}


baseline_path, current_path, report_path = map(Path, sys.argv[1:4])
baseline = json.loads(baseline_path.read_bytes())
current = json.loads(current_path.read_bytes())
assert electrical_partitions(baseline) == electrical_partitions(current), "Purchased-pin wiring changed"
before = normalized_elements(baseline)
after = normalized_elements(current)
assert before.keys() == after.keys(), "Physical element types changed"
for kind in before:
    assert before[kind] == after[kind], f"{kind} changed during schematic-only editing"
assert not [entry for entry in current if entry["type"].endswith("_error")], "Native errors remain"
report = {
    "baseline_sha256": hashlib.sha256(baseline_path.read_bytes()).hexdigest(),
    "canonical_sha256": hashlib.sha256(current_path.read_bytes()).hexdigest(),
    "purchased_pin_count": sum(len(group) for group in electrical_partitions(current)),
    "all_purchased_pin_partitions_unchanged": True,
    "all_purchased_parts_and_pin_attributes_unchanged": True,
    "all_pcb_geometry_and_cad_registrations_exact": True,
    "compared_counts": {kind: len(after[kind]) for kind in sorted(after)},
    "allowed_changes": ["Native schematic layout and ground labels", "Revision/source metadata"],
    "passed": True,
    "hardware_tested": False,
    "prototype_fabrication_ready": False,
}
report_path.write_text(json.dumps(report, indent=2) + "\n")
print("Schematic preservation: purchased wiring, all PCB elements and CAD are exact")
