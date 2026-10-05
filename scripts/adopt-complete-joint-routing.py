"""Preserve a jointly routed selection, including its explicit unfinished groups.

Existing centerline geometry is translated into supported native fanout paths.
No new path is searched for and no production circuit JSON is edited. Replacing
the entire selected copper avoids combining new routes with obsolete copper
that the routing session removed. Completeness and DRC remain mandatory native
and independent checks after regeneration; this is never a qualification pass.
"""
import json
import sys
from pathlib import Path

folder = Path(sys.argv[1])
audit = json.loads((folder / "SESSION-IMPORT-AUDIT.json").read_text())
assert audit["status"] == "preservation passed"
selected = set(json.loads((folder / "selected-nets.json").read_text()))
native = json.loads((folder / "circuit.json").read_text())
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
names = {e["source_component_id"]: e["name"] for e in native if e["type"] == "source_component"}
net_names = {root(e["source_net_id"]): e["name"] for e in native if e["type"] == "source_net"}
selector_nets = {
    f".{names[e['source_component_id']]} > .pin{e['pin_number']}": net_names.get(root(e["source_port_id"]))
    for e in native if e["type"] == "source_port" and e["source_component_id"] in names
}
incoming = json.loads((folder / "complete-saved-paths.json").read_text())
destination = Path("src/routing/power-guarded-paths-trial.json")
saved = json.loads(destination.read_text())
saved["net_names"] = sorted((set(saved["net_names"]) - selected) | (set(incoming["net_names"]) & selected))
saved["connections"] = [s for s in saved["connections"] if selector_nets.get(s) not in selected]
saved["connections"] += [s for s in incoming["connections"] if selector_nets.get(s) in selected]
saved["paths"] = [p for p in saved["paths"] if selector_nets.get(p["connection"]) not in selected]
incoming_paths = [p for p in incoming["paths"] if selector_nets.get(p["connection"]) in selected]
saved["paths"] += incoming_paths
saved.setdefault("complete_joint_routing_trials", []).append({
    "folder": str(folder), "nets": sorted(selected), "paths": len(incoming_paths),
    "session_sha256": audit["session_sha256"], "native_json_sha256": audit["native_json_sha256"],
    "scope": "Only complete centerline paths are adopted. All unfinished selected copper was removed and its ports remain pending. Native geometry and filled-copper checks remain mandatory.",
})
destination.write_text(json.dumps(saved, indent=2) + "\n")
print(f"Replaced the {len(selected)}-net selection with {len(incoming_paths)} existing native paths; unfinished selected groups are removed and remain pending")
