"""Verify exact electrical and manufacturing geometry across supplier substitutions."""
import hashlib
import json
import sys
from collections import defaultdict
from pathlib import Path

baseline = Path(sys.argv[1])
canonical = Path(sys.argv[2])
before = json.loads(baseline.read_text())
after = json.loads(canonical.read_text())


def partitions(circuit):
    parent = {}
    def root(key):
        parent.setdefault(key, key)
        if parent[key] != key:
            parent[key] = root(parent[key])
        return parent[key]
    for trace in circuit:
        if trace['type'] != 'source_trace':
            continue
        members = trace['connected_source_port_ids'] + trace['connected_source_net_ids']
        for member in members[1:]:
            parent[root(member)] = root(members[0])
    refs = {entry['source_component_id']: entry['name'] for entry in circuit if entry['type'] == 'source_component'}
    groups = defaultdict(list)
    for port in circuit:
        if port['type'] == 'source_port' and port.get('source_component_id') in refs:
            groups[root(port['source_port_id'])].append((refs[port['source_component_id']], port['pin_number']))
    return {pin: sorted(group) for group in groups.values() for pin in group}


assert partitions(before) == partitions(after), 'Manufacturer-pin electrical partition changed'
assert len(partitions(after)) == 411
assert not [entry for entry in after if entry['type'].endswith('_error')], 'Native build contains errors'
refs = {entry['name']: entry for entry in after if entry['type'] == 'source_component'}
assert len(refs) == 109
for ref, part, mpn in [('U2', 'C2150710', 'TMC2209-LA-T'), ('D_USB', 'C97502', 'TPD2EUSB30DRTR')]:
    assert refs[ref]['supplier_part_numbers']['jlcpcb'] == [part]
    assert refs[ref]['manufacturer_part_number'] == mpn


def geometry_cleaner(circuit):
    sources = {e['source_component_id']: e['name'] for e in circuit if e['type'] == 'source_component'}
    ports = {e['source_port_id']: (sources.get(e.get('source_component_id'), e.get('source_manually_placed_via_id')), e.get('pin_number'), e.get('port_hints')) for e in circuit if e['type'] == 'source_port'}
    pcb_ports = {e['pcb_port_id']: ports[e['source_port_id']] for e in circuit if e['type'] == 'pcb_port'}
    def clean(entry):
        if isinstance(entry, dict):
            return {key: ([pcb_ports[value] for value in entry[key]] if key == 'connectsTo' else clean(value)) for key, value in entry.items() if not key.endswith(('_id', '_ids'))}
        if isinstance(entry, list):
            return [clean(value) for value in entry]
        return entry
    return clean

clean_before = geometry_cleaner(before)
clean_after = geometry_cleaner(after)

geometry_types = ['pcb_trace', 'pcb_via', 'pcb_copper_pour', 'pcb_smtpad', 'pcb_plated_hole', 'pcb_hole',
                  'pcb_board', 'pcb_keepout', 'pcb_cutout', 'pcb_silkscreen_path', 'pcb_silkscreen_text',
                  'pcb_courtyard_outline']
geometry_counts = {}
for kind in geometry_types:
    old = sorted(json.dumps(clean_before(entry), sort_keys=True) for entry in before if entry['type'] == kind)
    new = sorted(json.dumps(clean_after(entry), sort_keys=True) for entry in after if entry['type'] == kind)
    assert old == new, f'Physical {kind} geometry changed'
    geometry_counts[kind] = len(new)

for key in ['center', 'width', 'height', 'rotation', 'layer', 'display_offset_x', 'display_offset_y']:
    old = [entry.get(key) for entry in before if entry['type'] == 'pcb_component']
    new = [entry.get(key) for entry in after if entry['type'] == 'pcb_component']
    assert old == new, f'Purchased placement {key} changed'

model_pairs = [('TMC2209_LA', 'TMC2209_LA_T'), ('TPD2EUSB30ADRTR', 'TPD2EUSB30DRTR')]
url_map = {}
for old, new in model_pairs:
    for extension in ['obj', 'step']:
        old_path = f'imports/{old}/{old}.{extension}'
        new_path = f'imports/{new}/{new}.{extension}'
        assert Path(old_path).read_bytes() == Path(new_path).read_bytes(), f'Manufacturer model bytes changed: {new}'
        url_map[f'./{new_path}'] = f'./{old_path}'
old_cad = sorted(json.dumps(clean_before(entry), sort_keys=True) for entry in before if entry['type'] == 'cad_component')
new_cad = []
for entry in after:
    if entry['type'] != 'cad_component':
        continue
    normalized = clean_after(entry)
    for key in ['model_obj_url', 'model_step_url']:
        if key in normalized:
            normalized[key] = url_map.get(normalized[key], normalized[key])
    new_cad.append(json.dumps(normalized, sort_keys=True))
assert old_cad == sorted(new_cad), 'CAD geometry/registration changed beyond reviewed model-path substitutions'

report = {'revision': '0.0.41-alpha.0', 'baseline_sha256': hashlib.sha256(baseline.read_bytes()).hexdigest(),
          'canonical_sha256': hashlib.sha256(canonical.read_bytes()).hexdigest(),
          'all_411_purchased_pin_partitions_unchanged': True, 'all_purchased_placements_unchanged': True,
          'all_copper_pads_drills_and_silkscreen_geometry_exact': True, 'geometry_counts': geometry_counts,
          'cad_registration_and_model_bytes_unchanged': True, 'cad_entries': len(new_cad),
          'allowed_changes': ['U2/D_USB supplier identities', 'U2 pin25 alias UNUSED and fresh manufacturer pin attributes',
                              'Schematic symbols/labels/purpose notes', 'Two model URL paths with identical model bytes',
                              'Revision/source-filesystem metadata'],
          'hardware_tested': False, 'prototype_fabrication_ready': False}
Path(sys.argv[3]).write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps(report, indent=2))
