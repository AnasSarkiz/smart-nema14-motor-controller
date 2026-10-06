"""Report measured fabrication blockers for the current native board, without approving an order."""
import hashlib
import json
import math
import sys
from collections import Counter, defaultdict
from pathlib import Path


def main():
    circuit_path, evidence_folder, report_path = map(Path, sys.argv[1:4])
    circuit = json.loads(circuit_path.read_text())
    digest = hashlib.sha256(circuit_path.read_bytes()).hexdigest()
    receipts = {}
    for filename in ('READINESS.json', 'NATIVE-CAM-AUDIT.json', 'PROGRAMMER-COMPATIBILITY.json',
                     'SILKSCREEN-CAM.json', 'MOTOR-COPPER-LOSS.json', 'COPPER-GEOMETRY.json'):
        path = evidence_folder / filename
        receipt = json.loads(path.read_text())
        hash_field = 'input_sha256' if filename == 'COPPER-GEOMETRY.json' else 'canonical_sha256'
        assert receipt[hash_field] == digest, f'Stale evidence: {filename}'
        receipts[filename] = receipt
    filled = json.loads((evidence_folder/'FILLED-COPPER.json').read_text())
    assert filled['sha256'] == digest, 'Stale filled-copper evidence'
    parent = {}

    def root(node):
        parent.setdefault(node, node)
        if parent[node] != node:
            parent[node] = root(parent[node])
        return parent[node]

    source_traces = {row['source_trace_id']: row for row in circuit if row['type'] == 'source_trace'}
    for trace in source_traces.values():
        members = trace['connected_source_port_ids'] + trace['connected_source_net_ids']
        for member in members[1:]:
            parent[root(member)] = root(members[0])
    net_names = {root(row['source_net_id']): row['name'] for row in circuit if row['type'] == 'source_net'}
    power_names = {'VM', 'VBUS_CONN', 'VBUS_PROTECTED', 'V3V3',
                   'MOTOR_A1', 'MOTOR_A2', 'MOTOR_B1', 'MOTOR_B2', 'BUCK_SW'}
    lengths = defaultdict(lambda: defaultdict(float))
    for trace in (row for row in circuit if row['type'] == 'pcb_trace'):
        source = source_traces[trace['source_trace_id']]
        net = net_names[root((source['connected_source_port_ids']+source['connected_source_net_ids'])[0])]
        if net not in power_names:
            continue
        layer = trace['route'][0].get('layer', 'top')
        for start, end in zip(trace['route'], trace['route'][1:]):
            layer = start.get('to_layer', start.get('layer', layer))
            length = math.hypot(start['x']-end['x'], start['y']-end['y'])
            if length > 1e-10:
                lengths[net][layer] += length
    vias = [row for row in circuit if row['type'] == 'pcb_via']
    sizes = Counter((round(row['hole_diameter'], 6), round(row['outer_diameter'], 6)) for row in vias)
    blind_count = sum(set(row['layers']) != {'top', 'inner1', 'inner2', 'bottom'} for row in vias)
    native_errors = [row for row in circuit if row['type'].endswith('_error')]
    width_warnings = [row for row in circuit if row['type'] == 'pcb_trace_warning']
    silk = receipts['SILKSCREEN-CAM.json']
    rotations = receipts['NATIVE-CAM-AUDIT.json']['unverified_supplier_rotations']
    measured_gates = [
        {'gate': 'Native errors', 'passed': not native_errors, 'count': len(native_errors)},
        {'gate': 'Strict copper/drill/edge geometry',
         'passed': not receipts['COPPER-GEOMETRY.json']['violations']},
        {'gate': 'Every physical copper network joined',
         'passed': filled['clearances_passed'] and all(row['complete_plane_network'] for row in filled['physical_islands'].values()),
         'joined_nets': sum(row['complete_plane_network'] for row in filled['physical_islands'].values()),
         'total_nets': len(filled['physical_islands'])},
        {'gate': 'No blind or buried vias', 'passed': blind_count == 0, 'count': blind_count},
        {'gate': 'Every via has requested 0.30 mm hole and 0.45 mm pad',
         'passed': all(abs(row['hole_diameter']-.30)<1e-6 and abs(row['outer_diameter']-.45)<1e-6 for row in vias)},
        {'gate': 'All power/motor trace segments on outer layers',
         'passed': not any(layer in ('inner1', 'inner2') for layers in lengths.values() for layer in layers)},
        {'gate': 'Board-owned connector silkscreen', 'passed': silk['owned_text_passed']},
        {'gate': 'Complete production silkscreen', 'passed': silk['production_silkscreen_passed']},
        {'gate': 'All native supplier assembly rotations verified', 'passed': not rotations, 'unverified': rotations},
    ]
    report = {'canonical_sha256': digest, 'scope': __doc__,
              'native_error_count': len(native_errors), 'native_width_warning_count': len(width_warnings),
              'counts': dict(Counter(row['type'] for row in circuit)),
              'via_dimensions_mm': [{'hole': hole, 'pad': pad, 'count': count} for (hole, pad), count in sorted(sizes.items())],
              'power_trace_length_mm_by_layer': dict(lengths),
              'inner_power_pours': [{'net': net_names[root(row['source_net_id'])], 'layer': row['layer'], 'id': row['pcb_copper_pour_id']}
                                    for row in circuit if row['type'] == 'pcb_copper_pour'
                                    and row['layer'] in ('inner1', 'inner2')
                                    and net_names[root(row['source_net_id'])] in power_names],
              'measured_gates': measured_gates,
              'remaining_measured_failures': [row['gate'] for row in measured_gates if not row['passed']],
              'external_or_incomplete_gates': [
                  'Exact MCU sourcing and order-specific acceptance/allocation of all fitted parts',
                  'Manufacturer confirmation of minimum copper/plating, exact stackup, mask/paste and named filled/capped features',
                  'Loaded rail/ground pour-neck/via current sharing, complete device thermal and switching-loop qualification',
                  'Imported-symbol/automatic-label repairs and complete UI schematic style review',
                  'Higher-threshold USB protection system qualification',
              ],
              'hardware_testing': 'Firmware, physical programming/USB/PD/power/motor/temperature tests have not been performed',
              'prototype_fabrication_ready': False}
    report_path.write_text(json.dumps(report, indent=2)+'\n')
    for row in measured_gates:
        print(('PASS' if row['passed'] else 'BLOCKED')+': '+row['gate'])
    print('PROTOTYPE FABRICATION READY: NO')
    # External gates are intentionally unapproved; passing DRC cannot approve fabrication.
    return 1


if __name__ == '__main__':
    sys.exit(main())
