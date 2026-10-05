"""Retain audited, fully connected local copper as supported native saved paths.

This does not create geometry or alter circuit JSON. Native build and all copper
checks must run after each adoption. Temporary escape features remain the
caller's responsibility: remove ones already represented by complete paths.
"""
import json
import sys
from pathlib import Path

folder = Path(sys.argv[1])
selected = set(sys.argv[2:])
assert selected
audit = json.loads((folder / "SESSION-IMPORT-AUDIT.json").read_text())
assert audit["status"] == "preservation passed"
topology = json.loads((folder / "complete-TOPOLOGY-REVIEW.json").read_text())
complete = {net["net"] for net in topology["nets"]
            if net["copper_components_containing_ports"] == 1}
assert selected <= complete, f"Incomplete nets cannot be adopted: {selected - complete}"
native = json.loads((folder / "circuit.json").read_text())
names = {e["source_component_id"]: e["name"] for e in native if e["type"] == "source_component"}
parent = {}


def root(key):
    parent.setdefault(key, key)
    if parent[key] != key:
        parent[key] = root(parent[key])
    return parent[key]


for trace in (e for e in native if e["type"] == "source_trace"):
    members = trace["connected_source_port_ids"] + trace["connected_source_net_ids"]
    for member in members[1:]:
        parent[root(member)] = root(members[0])
net_names = {root(e["source_net_id"]): e["name"] for e in native if e["type"] == "source_net"}
selector_nets = {f".{names[e['source_component_id']]} > .pin{e['pin_number']}":
                 net_names.get(root(e["source_port_id"]))
                 for e in native if e["type"] == "source_port" and e["source_component_id"] in names}
incoming = json.loads((folder / "complete-saved-paths.json").read_text())
destination = Path("src/routing/power-guarded-paths-trial.json")
saved = json.loads(destination.read_text())
saved["net_names"] = sorted(set(saved["net_names"]) | selected)
saved["connections"] = [s for s in saved["connections"] if selector_nets.get(s) not in selected]
saved["connections"] += [s for s in incoming["connections"] if selector_nets.get(s) in selected]
saved["paths"] = [p for p in saved["paths"] if selector_nets.get(p["connection"]) not in selected]
adopted_paths = [p for p in incoming["paths"] if selector_nets.get(p["connection"]) in selected]
assert adopted_paths
saved["paths"] += adopted_paths
saved.setdefault("audited_adoptions", []).append({
    "folder": str(folder), "nets": sorted(selected),
    "session_sha256": audit["session_sha256"],
    "native_json_sha256": audit["native_json_sha256"],
    "paths": len(adopted_paths), "scope": "Native regeneration and full qualification required.",
})
destination.write_text(json.dumps(saved, indent=2) + "\n")
print(f"Adopted {len(adopted_paths)} complete paths on {len(selected)} nets")
