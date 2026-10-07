"""Measure USB centerline lengths along existing native copper, with real ports.

This traverses only emitted segments and through-vias, never free space.
The two series resistors separate the receptacle and MCU nets. Their physical
pad-center separation is disclosed separately, never treated as a copper edge.
"""
import hashlib
import heapq
import json
import math
import sys
from collections import defaultdict
from pathlib import Path

input_path, output_path = map(Path, sys.argv[1:3])
circuit = json.loads(input_path.read_text())
parent = {}

def root(key):
    parent.setdefault(key,key)
    if parent[key] != key:
        parent[key] = root(parent[key])
    return parent[key]

for trace in (e for e in circuit if e['type']=='source_trace'):
    members = trace['connected_source_port_ids'] + trace['connected_source_net_ids']
    for member in members[1:]:
        parent[root(member)] = root(members[0])
source_traces = {e['source_trace_id']:e for e in circuit if e['type']=='source_trace'}
components = {e['source_component_id']:e['name'] for e in circuit if e['type']=='source_component'}
source_ports = {e['source_port_id']:e for e in circuit if e['type']=='source_port'}
pcb_ports = [e for e in circuit if e['type']=='pcb_port']


def node(point, layer):
    return round(point['x'],5), round(point['y'],5), layer


def shortest_existing_length(graph, endpoints):
    start,end = endpoints
    assert start in graph and end in graph, 'USB endpoint missing from physical copper'
    queue = [(0,start)]
    distances = {start:0}
    while queue:
        length,current = heapq.heappop(queue)
        if current == end:
            return length
        if length != distances[current]:
            continue
        for neighbor,cost in graph[current]:
            next_length = length+cost
            if next_length < distances.get(neighbor,math.inf):
                distances[neighbor] = next_length
                heapq.heappush(queue,(next_length,neighbor))
    raise AssertionError('USB physical endpoints are disconnected')


def get_port(reference_and_pin):
    reference,pin = reference_and_pin
    matches = [p for p in pcb_ports if components.get(source_ports[p['source_port_id']]['source_component_id'])==reference and source_ports[p['source_port_id']].get('pin_number')==pin]
    assert len(matches)==1, f'Ambiguous actual USB port {reference}.{pin}'
    return matches[0]

def graph_for(net_name):
    net = root(next(e['source_net_id']for e in circuit if e['type']=='source_net'and e['name']==net_name))
    wires = []
    nodes = set()
    for trace in (e for e in circuit if e['type']=='pcb_trace'):
        source = source_traces[trace['source_trace_id']]
        if root(source['connected_source_port_ids'][0])!=net:
            continue
        current_layer = trace['route'][0].get('layer','top')
        for a,b in zip(trace['route'],trace['route'][1:]):
            if a['route_type']=='via':
                current_layer = a['to_layer']
            elif a['route_type']=='wire':
                current_layer = a['layer']
            else:
                raise ValueError('Unsupported native route primitive')
            if (a['x'],a['y'])==(b['x'],b['y']):
                continue
            wires.append((a,b,current_layer))
            nodes.update([node(a,current_layer),node(b,current_layer)])
    vias = []
    for via in (e for e in circuit if e['type']=='pcb_via'):
        if via.get('source_net_id'):
            via_net = root(via['source_net_id'])
        else:
            trace_id = via.get('source_trace_id') or next(e['source_trace_id']for e in circuit if e['type']=='pcb_trace'and e['pcb_trace_id']==via['pcb_trace_id'])
            via_net = root(source_traces[trace_id]['connected_source_port_ids'][0])
        if via_net!=net:
            continue
        assert set(via['layers'])=={'top','inner1','inner2','bottom'}
        vias.append(via)
        nodes.update(node(via,layer)for layer in via['layers'])
    net_ports = [p for p in pcb_ports if root(p['source_port_id'])==net]
    nodes.update(node(p,p['layers'][0])for p in net_ports)
    graph = defaultdict(list)
    for a,b,layer in wires:
        dx,dy = b['x']-a['x'],b['y']-a['y']
        distance_squared = dx*dx+dy*dy
        fraction_padding = .00001/math.sqrt(distance_squared)
        on_segment = []
        for candidate in nodes:
            if candidate[2]!=layer:
                continue
            fraction = ((candidate[0]-a['x'])*dx+(candidate[1]-a['y'])*dy)/distance_squared
            deviation = abs((candidate[0]-a['x'])*dy-(candidate[1]-a['y'])*dx)/math.sqrt(distance_squared)
            # Only serialization rounding of the actual existing centerline.
            # Fraction is dimensionless: use the documented 0.00001mm
            # endpoint tolerance divided by this actual segment's length.
            # A fixed fractional epsilon wrongly disconnected tiny native
            # length-matching segments after coordinate serialization.
            if -fraction_padding<=fraction<=1+fraction_padding and deviation<=.00001:
                on_segment.append((fraction,candidate))
        on_segment.sort()
        for (_,first),(_,second) in zip(on_segment,on_segment[1:]):
            length = math.hypot(first[0]-second[0],first[1]-second[1])
            graph[first].append((second,length))
            graph[second].append((first,length))
    for via in vias:
        via_nodes = [node(via,layer)for layer in via['layers']]
        for first in via_nodes:
            for second in via_nodes:
                if first!=second:
                    graph[first].append((second,0))
    return net, graph, len(vias)


def path_length(net_name, first, last):
    net, graph, via_count = graph_for(net_name)
    endpoints = [get_port(first),get_port(last)]
    assert all(root(p['source_port_id'])==net for p in endpoints), 'Endpoint is on the wrong USB net'
    return shortest_existing_length(graph,[node(p,p['layers'][0])for p in endpoints]), via_count


mcu = next(e for e in circuit if e['type']=='source_component' and e['name']=='U1')
assert mcu['manufacturer_part_number']=='RP2040', 'This current check requires the RP2040 pin table'
segments = {}
failures = []
for polarity, mcu_pin, connector_pins, esd_pin in [('DP',47,[16,13],1),('DM',46,[12,17],2)]:
    resistor = next(e for e in circuit if e['type']=='source_component' and e['name']=='R_USB_'+polarity)
    assert resistor['supplier_part_numbers']['jlcpcb']==['C25100'], 'Unqualified USB termination'
    first,second = get_port(('R_USB_'+polarity,1)),get_port(('R_USB_'+polarity,2))
    item = {'mcu_pin':mcu_pin,'series_resistor':'R_USB_'+polarity,
            'series_pad_separation_mm':math.hypot(first['x']-second['x'],first['y']-second['y']),
            'connector_paths_mm':{},'main_trunk_mm':None,'mcu_stub_mm':None,'via_counts':{}}
    try:
        item['mcu_stub_mm'],item['via_counts']['mcu_net'] = path_length('MCU_USB_'+polarity,('R_USB_'+polarity,2),('U1',mcu_pin))
    except AssertionError as error:
        failures.append({'path':'MCU_USB_'+polarity,'reason':str(error)})
    for pin in connector_pins:
        try:
            # Both sides of the ESD contact must have an actual centerline path.
            before,vias = path_length('USB_'+polarity,('J_USB',pin),('D_USB',esd_pin))
            after,_ = path_length('USB_'+polarity,('D_USB',esd_pin),('R_USB_'+polarity,1))
            item['main_trunk_mm'] = after
            item['connector_paths_mm'][str(pin)] = before+after
            item['via_counts']['receptacle_net'] = vias
        except AssertionError as error:
            failures.append({'path':f'J_USB.{pin} via D_USB.{esd_pin} to R_USB_{polarity}.1','reason':str(error)})
    segments[polarity] = item

lengths = {}
orientation_skews = {}
if not failures:
    # The connector's duplicate USB2 contacts form two reversible orientations.
    for orientation,dp_pin,dm_pin in [('DP1_DN1',16,12),('DP2_DN2',13,17)]:
        pair = {}
        for polarity,pin in [('DP',dp_pin),('DM',dm_pin)]:
            item = segments[polarity]
            pair[polarity] = item['connector_paths_mm'][str(pin)]+item['series_pad_separation_mm']+item['mcu_stub_mm']
        lengths[orientation] = pair
        orientation_skews[orientation] = abs(pair['DP']-pair['DM'])
skew = max(orientation_skews.values()) if orientation_skews else None
stub_skew = abs(segments['DP']['mcu_stub_mm']-segments['DM']['mcu_stub_mm']) if all(segments[p]['mcu_stub_mm'] is not None for p in ('DP','DM')) else None
trunk_skew = abs(segments['DP']['main_trunk_mm']-segments['DM']['main_trunk_mm']) if all(segments[p]['main_trunk_mm'] is not None for p in ('DP','DM')) else None
# A reversible receptacle is branched. The supported native Bus binds just
# the two actual trunk source traces, while this independent traversal also
# verifies every connector orientation. Comparing short branches to trunks
# would measure unrelated distances rather than differential path skew.
trunk_buses = [entry for entry in circuit if entry['type']=='source_bus' and entry['name']=='USB_RECEPTACLE_MAIN_LENGTHS']
expected_trunk_source_ids = {
    trace['source_trace_id'] for trace in source_traces.values()
    if any(get_port(('R_USB_'+polarity,1))['source_port_id'] in trace['connected_source_port_ids'] for polarity in ('DP','DM'))
}
declared_trunk_constraint_passed = (
    len(trunk_buses)==1 and len(expected_trunk_source_ids)==2
    and set(trunk_buses[0]['source_trace_ids'])==expected_trunk_source_ids
    and trunk_buses[0].get('max_length_skew')==.25
)
report = {'input':str(input_path),'sha256':hashlib.sha256(input_path.read_bytes()).hexdigest(),
          'measured_paths':'Both actual reversible J_USB contact pairs through D_USB and C25100 series terminations to RP2040 USB_DP pin47 / USB_DM pin46.',
          'precision':'Centerline nodes rounded to 0.00001 mm; 0.00001 mm collinearity tolerance permits serialization rounding only.',
          'scope':'Planar copper length plus disclosed resistor pad separation. Via barrel delay, impedance, coupling, return continuity, physical programming and USB compliance are separate gates; no free-space copper is inferred.',
          'segments':segments,'path_lengths_mm':lengths,'orientation_skew_mm':orientation_skews,
          'mcu_stub_skew_mm':stub_skew,'maximum_mcu_stub_skew_mm':.25,
          'main_trunk_skew_mm':trunk_skew,'maximum_main_trunk_skew_mm':.25,
          'native_trunk_constraint_passed':declared_trunk_constraint_passed,
          'skew_mm':skew,'maximum_skew_mm':.5,'missing_paths':failures,
          'passed':not failures and declared_trunk_constraint_passed and skew<=.5 and stub_skew<=.25 and trunk_skew<=.25}
output_path.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report))
sys.exit(0 if report['passed'] else 1)
