"""Bound motor track/barrel DC losses without claiming thermal qualification.

Reads native geometry and the existing width/current audit. Parallel copper is
ignored; each distinct used via is charged a full board-thickness barrel. Copper
thickness, plating and temperature remain explicit engineering assumptions.
"""
import hashlib
import json
import math
import sys
from pathlib import Path


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def review_motor_path(net, context):
    segments = context['width_records'][net]['segments']
    traces = context['motor_traces'][net]
    assert len(traces) == 1, f'{net}: review branched routing before applying a series bound'
    trace = traces[0]
    terminals = {point[key] for point in trace['route']
                 for key in ('start_pcb_port_id', 'end_pcb_port_id') if key in point}
    assert len(terminals) == 2, f'{net}: expected driver-to-connector pair'
    owners = sorted(context['pcb_port_owners'][terminal] for terminal in terminals)
    assert owners == sorted(context['expected_owners'][net]), (net, owners)
    segment_resistances = []
    required_thicknesses = []
    for segment in segments:
        layer = segment['layer']
        thickness = context['stackup']['inner_copper_mm' if layer in ('inner1', 'inner2') else 'outer_copper_mm']
        finished_width = segment['width_mm'] * context['width_fraction']
        resistance = context['rho_ohm_mm'] * segment['length_mm'] / (finished_width * thickness)
        coefficient = .024 if layer in ('inner1', 'inner2') else .048
        required_area_mil2 = (context['peak_a'] / (coefficient * 30**.44))**(1/.725)
        required_thickness = required_area_mil2 * .0254**2 / finished_width
        segment_resistances.append(resistance)
        required_thicknesses.append({'layer': layer, 'trace_id': segment['trace_id'],
                                    'segment_index': segment['segment_index'],
                                    'nominal_width_mm': segment['width_mm'],
                                    'minimum_thickness_under_existing_30c_screen_mm': required_thickness})
    vias_by_position = {}
    for point in trace['route']:
        if point['route_type'] != 'via':
            continue
        position = (round(point['x'], 6), round(point['y'], 6))
        hits = [via for via in context['vias']
                if math.hypot(via['x']-point['x'], via['y']-point['y']) < .00001]
        assert len(hits) == 1, (net, position, len(hits))
        vias_by_position[position] = hits[0]
    barrel_resistances = []
    for via in vias_by_position.values():
        plating = context['plating_mm']
        # Finished-hole circumference plus wall thickness, assuming uniform wall.
        area_mm2 = math.pi * ((via['hole_diameter']/2+plating)**2 - (via['hole_diameter']/2)**2)
        barrel_resistances.append(context['rho_ohm_mm'] * context['board_max_mm'] / area_mm2)
    track_r = sum(segment_resistances)
    barrel_r = sum(barrel_resistances)
    return {'net': net, 'physical_terminals': owners, 'nonzero_segments': len(segments),
            'track_length_mm': sum(segment['length_mm'] for segment in segments),
            'distinct_used_through_vias': len(vias_by_position),
            'trace_series_resistance_bound_ohms': track_r,
            'barrel_series_resistance_bound_ohms': barrel_r,
            'total_series_resistance_bound_ohms': track_r+barrel_r,
            'voltage_drop_at_phase_peak_v': context['peak_a']*(track_r+barrel_r),
            'dc_loss_at_phase_peak_w': context['peak_a']**2*(track_r+barrel_r),
            'maximum_single_barrel_loss_w': context['peak_a']**2*max(barrel_resistances, default=0),
            'required_thickness_by_layer_mm': {
                layer: max(row['minimum_thickness_under_existing_30c_screen_mm']
                           for row in required_thicknesses if row['layer'] == layer)
                for layer in sorted({row['layer'] for row in required_thicknesses})},
            'segment_thickness_requirements': required_thicknesses}


def main():
    circuit_path, width_path, power_path, report_path = map(Path, sys.argv[1:5])
    circuit = json.loads(circuit_path.read_text())
    width = json.loads(width_path.read_text())
    power = json.loads(power_path.read_text())
    rules_path = Path('mechanical/manufacturing-rules.json')
    motor_path = Path('mechanical/design-constraints.json')
    rules = json.loads(rules_path.read_text())
    motor = json.loads(motor_path.read_text())
    digest = sha256(circuit_path)
    assert digest == width['canonical_sha256']
    assert width['ordinary_width_and_phase_segment_screens_passed']
    peak = power['intended_prototype_envelope']['phase_peak_screen_a']
    assert peak == width['phase_peak_screen_a']
    sources = {row['source_component_id']: row['name'] for row in circuit if row['type'] == 'source_component'}
    ports = {row['source_port_id']: (sources[row['source_component_id']], row['pin_number'])
             for row in circuit if row['type'] == 'source_port' and row.get('pin_number') is not None}
    source_traces = {row['source_trace_id']: row for row in circuit if row['type'] == 'source_trace'}
    nets = {row['source_net_id']: row['name'] for row in circuit if row['type'] == 'source_net'}
    motor_names = ('MOTOR_A1', 'MOTOR_A2', 'MOTOR_B1', 'MOTOR_B2')
    motor_traces = {name: [] for name in motor_names}
    for row in circuit:
        if row['type'] != 'pcb_trace':
            continue
        names = [nets[net] for net in source_traces[row['source_trace_id']]['connected_source_net_ids']]
        for name in motor_names:
            if name in names:
                motor_traces[name].append(row)
    assert all(set(via['layers']) == {'top', 'inner1', 'inner2', 'bottom'}
               for via in circuit if via['type'] == 'pcb_via')
    context = {'width_records': {row['net']: row for row in width['nets']},
               'motor_traces': motor_traces, 'source_traces': source_traces,
               'pcb_port_owners': {row['pcb_port_id']: ports[row['source_port_id']]
                                   for row in circuit if row['type'] == 'pcb_port'
                                   and row['source_port_id'] in ports},
               'vias': [row for row in circuit if row['type'] == 'pcb_via'],
               'expected_owners': {'MOTOR_A1': [('U2', 24), ('J_MOTOR', 1)],
                                   'MOTOR_A2': [('U2', 21), ('J_MOTOR', 2)],
                                   'MOTOR_B1': [('U2', 26), ('J_MOTOR', 3)],
                                   'MOTOR_B2': [('U2', 1), ('J_MOTOR', 4)]},
               'stackup': rules['stackup'], 'width_fraction': .8, 'peak_a': peak,
               'rho_ohm_mm': 1.724e-5*(1+.00393*(80-20)),
               'plating_mm': .018,
               'board_max_mm': rules['stackup']['finished_thickness_mm']*1.1}
    results = [review_motor_path(name, context) for name in motor_names]
    by_name = {row['net']: row for row in results}
    loops = []
    for phase in ('A', 'B'):
        resistance = sum(by_name[f'MOTOR_{phase}{leg}']['total_series_resistance_bound_ohms'] for leg in (1, 2))
        loops.append({'phase': phase, 'two_lead_series_resistance_bound_ohms': resistance,
                      'fraction_of_25ohm_nominal_winding_resistance': resistance/motor['phase_resistance_ohms'],
                      'two_lead_drop_at_peak_v': peak*resistance,
                      'two_lead_dc_loss_at_peak_w': peak**2*resistance})
    report = {'canonical_sha256': digest, 'input_hashes': {
                str(path): sha256(path) for path in (circuit_path, width_path, power_path, rules_path, motor_path)},
              'scope': __doc__, 'assumptions': {
                'uniform_copper_temperature_c': 80, 'resistivity_20c_ohm_mm': 1.724e-5,
                'temperature_coefficient_per_c': .00393, 'finished_width_fraction': .8,
                'outer_copper_mm': rules['stackup']['outer_copper_mm'],
                'inner_copper_mm': rules['stackup']['inner_copper_mm'],
                'uniform_barrel_plating_mm': context['plating_mm'],
                'charged_length_per_distinct_via_mm': context['board_max_mm'],
                'copper_and_plating_are_guaranteed_minima': False,
                'parallel_tracks_pads_pours_ignored': True,
                'conservative_simultaneous_phase_peak_current_a': peak},
              'paths': results, 'phase_loops': loops,
              'both_phase_loops_simultaneous_peak_dc_loss_bound_w': sum(row['two_lead_dc_loss_at_peak_w'] for row in loops),
              'method': 'rho(T)*L/A per emitted nonzero segment at -20% width; one full-thickness barrel per distinct used hole. Required track thickness inverts the existing IPC-2221 30 C screen.',
              'unqualified': ['Guaranteed minimum manufactured copper/plating and process acceptance',
                              'Loaded VM/VBUS/V3V3 and ground pour-neck/current-sharing network',
                              'IPC-2152/thermal simulation or temperature measurements',
                              'Switching-loop inductance, driver/eFuse/buck junction temperatures and transients',
                              'Physical motor operation and firmware current limits'],
              'prototype_fabrication_ready': False}
    report_path.write_text(json.dumps(report, indent=2)+'\n')
    print(json.dumps({'motor_paths_reviewed': len(results), 'phase_loops': loops,
                      'total_copper_peak_loss_bound_w': report['both_phase_loops_simultaneous_peak_dc_loss_bound_w']}))


if __name__ == '__main__':
    main()
