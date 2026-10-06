"""Inventory every emitted segment; screen motor current without approving power planes."""
import hashlib
import json
import math
import sys
from collections import defaultdict
from pathlib import Path


def root(node):
    parent.setdefault(node, node)
    if parent[node] != node:
        parent[node] = root(parent[node])
    return parent[node]


def screened_capacity(segment):
    inner = segment['layer'] in ('inner1', 'inner2')
    thickness_mm = stackup['inner_copper_mm'] if inner else stackup['outer_copper_mm']
    area_square_mils = segment['width_mm'] * thickness_mm / 0.0254**2
    return (0.024 if inner else 0.048) * 30**0.44 * area_square_mils**0.725


input_path, output_path = map(Path, sys.argv[1:3])
circuit = json.loads(input_path.read_text())
rules = json.loads(Path('mechanical/manufacturing-rules.json').read_text())
stackup = rules['stackup']
revision = json.loads(Path('package.json').read_text())['version']
power = json.loads(Path(f'evidence/rev-{revision}/POWER-CORNER-SCREEN.json').read_text())
phase_peak_a = power['intended_prototype_envelope']['phase_peak_screen_a']
parent = {}
for trace in (e for e in circuit if e['type'] == 'source_trace'):
    members = trace['connected_source_port_ids'] + trace['connected_source_net_ids']
    for member in members[1:]:
        parent[root(member)] = root(members[0])
nets = {root(e['source_net_id']): e['name'] for e in circuit if e['type'] == 'source_net'}
source_traces = {e['source_trace_id']: e for e in circuit if e['type'] == 'source_trace'}
segments_by_net = defaultdict(list)
violations = []
for trace in (e for e in circuit if e['type'] == 'pcb_trace'):
    source = source_traces[trace['source_trace_id']]
    net = nets[root(source['connected_source_port_ids'][0])]
    layer = trace['route'][0].get('layer', 'top')
    for index, (start, end) in enumerate(zip(trace['route'], trace['route'][1:])):
        layer = start.get('to_layer', start.get('layer', layer))
        length_mm = math.hypot(start['x']-end['x'], start['y']-end['y'])
        if length_mm <= 1e-10:
            continue
        width_mm = start.get('width', end.get('width', source.get('min_trace_thickness')))
        if width_mm is None or width_mm <= 0:
            raise ValueError(f"Missing physical width: {trace['pcb_trace_id']}:{index}")
        segment = {
            'trace_id': trace['pcb_trace_id'], 'segment_index': index,
            'layer': layer, 'width_mm': width_mm, 'length_mm': length_mm,
            'from_mm': [start['x'], start['y']], 'to_mm': [end['x'], end['y']],
            'source_requested_minimum_mm': source.get('min_trace_thickness'),
        }
        segment['ipc2221_30c_screen_a'] = screened_capacity(segment)
        segments_by_net[net].append(segment)
        if width_mm < rules['design_targets']['ordinary_trace_width_mm'] - 0.00002:
            violations.append({'net': net, 'check': 'ordinary_width', **segment})
        if net in ('MOTOR_A1', 'MOTOR_A2', 'MOTOR_B1', 'MOTOR_B2', 'TMC_SENSE_A', 'TMC_SENSE_B'):
            if segment['ipc2221_30c_screen_a'] < phase_peak_a:
                violations.append({'net': net, 'check': 'phase_current', 'required_a': phase_peak_a, **segment})

plane_power_nets = {'GND', 'VM', 'VBUS_CONN', 'VBUS_PROTECTED', 'V3V3'}
switching_nets = {'BUCK_SW', 'BUCK_BST', 'TMC_CPI', 'TMC_CPO', 'TMC_VCP', 'TMC_5VOUT'}
records = []
for net in sorted(set(nets.values())):
    segments = segments_by_net[net]
    if net in plane_power_nets:
        current_scope = 'Pending: actual loaded branches, parallel pours/necks, return paths and via plating must be qualified together. Narrow auxiliary branches do not necessarily carry the whole rail current.'
    elif net in switching_nets:
        current_scope = 'Pending: switching/charge-pump pulse currents, loop inductance and thermal review. A steady-current trace formula is insufficient.'
    elif net.startswith('MOTOR_') or net.startswith('TMC_SENSE_'):
        current_scope = 'Every emitted segment screened against the conservative motor phase peak; Kelvin layout, guaranteed copper thickness and thermal review remain separate.'
    elif net.startswith('USB_'):
        current_scope = 'Width inventory only; differential impedance, skew and reference geometry have separate checks.'
    else:
        current_scope = 'Signal/control width floor checked. This does not establish interface ratings, EMC or device-pin limits.'
    records.append({
        'net': net, 'segment_count': len(segments),
        'minimum_width_mm': min((s['width_mm'] for s in segments), default=None),
        'minimum_screened_capacity_a': min((s['ipc2221_30c_screen_a'] for s in segments), default=None),
        'widths_by_layer_mm': {layer: sorted({s['width_mm'] for s in segments if s['layer'] == layer}) for layer in ('top', 'inner1', 'inner2', 'bottom')},
        'current_qualification_scope': current_scope, 'segments': segments,
    })
report = {
    'input': str(input_path), 'canonical_sha256': hashlib.sha256(input_path.read_bytes()).hexdigest(),
    'named_nets': len(records), 'pcb_traces': sum(e['type'] == 'pcb_trace' for e in circuit),
    'nonzero_wire_segments': sum(len(r['segments']) for r in records),
    'model': 'IPC-2221 I=k*dT^0.44*A_mil2^0.725; k=.048 outer/.024 inner, dT=30 C. Analytical screen only, not an IPC-2152 thermal solution.',
    'stackup': stackup, 'phase_peak_screen_a': phase_peak_a,
    'ordinary_width_and_phase_segment_screens_passed': not violations,
    'native_width_warning_count': sum(e['type'] == 'pcb_trace_warning' for e in circuit),
    'native_width_warnings': [e for e in circuit if e['type'] == 'pcb_trace_warning'],
    'native_width_warning_review': 'Native warnings compare the minimum of a combined same-net route tree with individual source width requests. Retained, not suppressed: actual power branch/pour widths and loaded current paths still require qualification before fabrication.',
    'all_power_paths_qualified': False, 'prototype_fabrication_ready': False,
    'violations': violations, 'nets': records,
}
output_path.write_text(json.dumps(report, indent=2) + '\n')
print(f"{len(records)} nets, {report['nonzero_wire_segments']} nonzero segments; {len(violations)} width/phase-current screen failures. Complete power/thermal qualification remains pending.")
sys.exit(0 if not violations else 1)
