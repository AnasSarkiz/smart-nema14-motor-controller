"""Measure the complete USB_VDD bypass lead and actual ground/reference copper.

This is a geometric layout screen, not a transient simulation or hardware test.
"""
import hashlib
import json
import math
import sys
from pathlib import Path

from shapely.geometry import LineString, Point, Polygon, box
from shapely.ops import unary_union

circuit_path, physical_path, output_path = map(Path, sys.argv[1:])
circuit = json.loads(circuit_path.read_text())
physical = json.loads(physical_path.read_text())
assert physical['clearances_passed']
assert physical['physical_islands']['GND']['complete_plane_network']
sources = {e['source_component_id']: e['name'] for e in circuit if e['type'] == 'source_component'}
source_ports = {e['source_port_id']: e for e in circuit if e['type'] == 'source_port'}
ports = {e['source_port_id']: e for e in circuit if e['type'] == 'pcb_port'}

def port(reference, pin):
    source = next(e for e in source_ports.values() if sources.get(e['source_component_id']) == reference and str(e.get('pin_number')) == str(pin))
    return source, ports[source['source_port_id']]

usb_source, usb_port = port('U1', 48)
io_source, _ = port('U1', 49)
assert usb_source['name'] == 'USB_VDD' and io_source['name'] == 'IOVDD1'
_, capacitor_power = port('C_USBPHY', 1)
_, capacitor_ground = port('C_USBPHY', 2)
source_trace = next(e for e in circuit if e['type'] == 'source_trace' and e.get('name') == 'V3V3_USB_VDD_LOCAL_BYPASS')
trace = next(e for e in circuit if e['type'] == 'pcb_trace' and e['source_trace_id'] == source_trace['source_trace_id'])
assert all(e['route_type'] == 'wire' and e['layer'] == 'top' and e['width'] >= .18 - 1e-7 for e in trace['route'])
points = [(e['x'], e['y']) for e in trace['route']]
assert math.dist(points[0], (usb_port['x'], usb_port['y'])) < 1e-6
assert math.dist(points[-1], (capacitor_power['x'], capacitor_power['y'])) < 1e-6
lead = LineString(points)
assert lead.length <= 2
pads = [e for e in circuit if e['type'] == 'pcb_smtpad']
def pad_shape(p):
    assert p['shape'] == 'rect'
    return box(p['x']-p['width']/2, p['y']-p['height']/2, p['x']+p['width']/2, p['y']+p['height']/2)

power_lands = [pad_shape(e) for e in pads if e.get('pcb_port_id') in [usb_port['pcb_port_id'], capacitor_power['pcb_port_id']]]
exposed_lead = lead.difference(unary_union(power_lands))
outside_pad_length = exposed_lead.length
assert outside_pad_length <= 1
ground_net = next(e['source_net_id'] for e in circuit if e['type'] == 'source_net' and e['name'] == 'GND')
ground_via = next(e for e in circuit if e['type'] == 'pcb_via' and e.get('source_net_id') == ground_net and math.dist((e['x'], e['y']), (8.3, 7.7)) < 1e-6)
assert set(ground_via['layers']) == {'top', 'inner1', 'inner2', 'bottom'}
def ground_pours(layer):
    regions = []
    for e in circuit:
        if e['type'] != 'pcb_copper_pour' or e['source_net_id'] != ground_net or e['layer'] != layer:
            continue
        brep = e['brep_shape']
        regions.append(Polygon([(p['x'],p['y']) for p in brep['outer_ring']['vertices']], [[(p['x'],p['y']) for p in r['vertices']] for r in brep['inner_rings']]))
    return unary_union(regions)

reference = ground_pours('inner1')
reference_gap = lead.difference(reference)
# The retained QSPI_CS inner1 track crosses under the USB_VDD solder land,
# not under the exposed bypass lead. Measure and disclose that whole-path gap;
# require the full 0.18mm exposed copper strip to retain its actual GND plane.
usb_land = pad_shape(next(e for e in pads if e.get('pcb_port_id') == usb_port['pcb_port_id']))
assert reference_gap.difference(usb_land).is_empty, 'Reference gap extends beyond the actual USB_VDD solder land'
assert reference.buffer(1e-6).covers(exposed_lead.buffer(.09)), 'Exposed supply copper lacks its actual inner1 GND reference'
ground_start = (capacitor_ground['x'], capacitor_ground['y'])
ground_finish = (ground_via['x'], ground_via['y'])
ground_distance = math.dist(ground_start, ground_finish)
unit = [(b-a)/ground_distance for a,b in zip(ground_start, ground_finish)]
annulus_contact = tuple(b-u*.23 for b,u in zip(ground_finish, unit))
ground_pad = next(e for e in pads if e.get('pcb_port_id') == capacitor_ground['pcb_port_id'])
top_ground = unary_union([ground_pours('top'), pad_shape(ground_pad)])
assert top_ground.buffer(2e-5).covers(LineString([ground_start, annulus_contact]).buffer(.075)), 'Actual 0.15mm ground-return corridor is broken'
report = {
    'circuit_sha256': hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
    'scope': 'Complete actual C_USBPHY.1 to U1.48 USB_VDD top copper, C_USBPHY.2 ground return and underlying inner1 GND; not a capacitor-to-via stub',
    'power_center_to_center_length_mm': lead.length,
    'power_length_outside_both_actual_lands_mm': outside_pad_length,
    'power_width_mm': min(p['width'] for p in trace['route']),
    'power_vias': 0,
    'local_ground_pad_to_via_center_mm': ground_distance,
    'ground_return_corridor_width_mm': .15,
    'all_ground_pads_in_one_physical_network': True,
    'whole_power_centerline_inner1_reference_gap_mm': reference_gap.length,
    'reference_gap_entirely_inside_actual_USB_VDD_land': True,
    'full_exposed_0_18mm_power_copper_inner1_reference_covered': True,
    'U1_pin48': 'USB_VDD', 'U1_pin49': 'IOVDD1',
    'field_solver_transient_and_hardware_tests': 'pending',
    'passed_geometry_screen': True,
}
output_path.write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps(report, indent=2))
