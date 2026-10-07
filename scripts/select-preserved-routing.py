"""Select unchanged board-owned paths; native replay and copper checks remain required."""
import hashlib
import json
import re
import sys
from pathlib import Path


def physical_net_members(circuit):
    parent = {}

    def root(member):
        parent.setdefault(member, member)
        if parent[member] != member:
            parent[member] = root(parent[member])
        return parent[member]

    for trace in (entry for entry in circuit if entry['type'] == 'source_trace'):
        members = trace['connected_source_port_ids'] + trace['connected_source_net_ids']
        for member in members[1:]:
            parent[root(member)] = root(members[0])
    names = {root(entry['source_net_id']): entry['name'] for entry in circuit
             if entry['type'] == 'source_net'}
    components = {entry['source_component_id']: entry['name'] for entry in circuit
                  if entry['type'] == 'source_component'}
    pcb_components = {entry['source_component_id']: entry for entry in circuit
                      if entry['type'] == 'pcb_component'}
    source_ports = {entry['source_port_id']: entry for entry in circuit
                    if entry['type'] == 'source_port'}
    members_by_net = {}
    aliases = {}
    for pcb_port in (entry for entry in circuit if entry['type'] == 'pcb_port'):
        source_port = source_ports[pcb_port['source_port_id']]
        owner_id = source_port['source_component_id']
        if owner_id not in components:
            continue  # Ordinary board vias are not purchased component terminals.
        net_name = names.get(root(source_port['source_port_id']))
        if net_name is None:
            continue
        reference = components[owner_id]
        pcb_component = pcb_components[owner_id]
        pin = str(source_port.get('pin_number', source_port['name']))
        key = (reference, pin)
        terminals = members_by_net.setdefault(net_name, {})
        assert key not in terminals, f'Duplicate purchased terminal: {key}'
        terminals[key] = (round(pcb_port['x'], 6), round(pcb_port['y'], 6),
                          tuple(pcb_port['layers']), pcb_component['layer'],
                          pcb_component['rotation'])
        for alias in source_port.get('port_hints', []) + [source_port['name']]:
            alias_key = (reference, alias)
            assert aliases.get(alias_key, net_name) == net_name
            aliases[alias_key] = net_name
    return members_by_net, aliases


def source_path_net(path, aliases):
    connection = path['connection']
    selectors = re.findall(r'\.([\w]+)\s+(?:>\s+)?port\.([\w]+)', connection)
    net_names = set(re.findall(r'net\.([\w]+)', connection))
    for selector in selectors:
        assert selector in aliases, f'Unknown saved terminal: {selector}'
        net_names.add(aliases[selector])
    assert len(net_names) == 1, f'Ambiguous saved path: {connection}'
    return next(iter(net_names))


old_path, new_path, saved_path, output_path, report_path = map(Path, sys.argv[1:])
old_bytes, new_bytes = old_path.read_bytes(), new_path.read_bytes()
old_members, old_aliases = physical_net_members(json.loads(old_bytes))
new_members, _ = physical_net_members(json.loads(new_bytes))
saved = json.loads(saved_path.read_text())
kept = [name for name in saved['net_names']
        if old_members.get(name) and old_members[name] == new_members.get(name)]
selected_paths = [path for path in saved['paths']
                  if source_path_net(path, old_aliases) in kept]
report = {
    'old_circuit_sha256': hashlib.sha256(old_bytes).hexdigest(),
    'comparison_circuit_sha256': hashlib.sha256(new_bytes).hexdigest(),
    'saved_source_sha256': hashlib.sha256(saved_path.read_bytes()).hexdigest(),
    'kept_net_names': kept, 'kept_source_paths': len(selected_paths),
    'removed_nets': [{'net': name,
                      'reason': 'Purchased physical terminals, positions, layers or rotation changed'}
                     for name in saved['net_names'] if name not in kept],
    'native_replay_qualified': False,
    'scope': 'Exact native purchased-terminal comparison only; new obstacles and pours require fresh independent qualification.',
}
output_path.write_text(json.dumps({
    'revision': json.loads(Path('package.json').read_text())['version'],
    'net_names': kept, 'connections': [f'net.{name}' for name in kept],
    'paths': selected_paths, 'preservation_selection': report,
}, indent=2) + '\n')
report_path.write_text(json.dumps(report, indent=2) + '\n')
print(f'{len(kept)} unchanged nets / {len(selected_paths)} source paths selected; replay not yet qualified.')
