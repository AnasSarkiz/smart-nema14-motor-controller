"""Measure USB centerline lengths along existing native copper, with real ports.

This traverses only emitted segments and through-vias, never free space. Via
barrel lengths are omitted equally, as in the original planar length screen.
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

lengths = {}
for polarity,net_name,connector_pin,mcu_pin in [('DP','USB_DP',13,34),('DM','USB_DM',12,33)]:
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
    endpoints = [get_port(('J_USB',connector_pin)),get_port(('U1',mcu_pin))]
    assert all(root(p['source_port_id'])==net for p in endpoints)
    nodes.update(node(p,p['layers'][0])for p in endpoints)
    graph = defaultdict(list)
    for a,b,layer in wires:
        dx,dy = b['x']-a['x'],b['y']-a['y']
        distance_squared = dx*dx+dy*dy
        on_segment = []
        for candidate in nodes:
            if candidate[2]!=layer:
                continue
            fraction = ((candidate[0]-a['x'])*dx+(candidate[1]-a['y'])*dy)/distance_squared
            deviation = abs((candidate[0]-a['x'])*dy-(candidate[1]-a['y'])*dx)/math.sqrt(distance_squared)
            # Only serialization rounding of the actual existing centerline.
            if -.00001<=fraction<=1.00001 and deviation<=.00001:
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
    lengths[polarity] = shortest_existing_length(graph,[node(p,p['layers'][0])for p in endpoints])
skew = abs(lengths['DP']-lengths['DM'])
report = {'input':str(input_path),'sha256':hashlib.sha256(input_path.read_bytes()).hexdigest(),'measured_paths':'Actual J_USB DP2 pin 13 to MCU PA12 pin 34, and DN1 pin 12 to MCU PA11 pin 33 through emitted wire/via geometry, including ESD contacts. Branches to the duplicate receptacle pads excluded from primary length.','precision':'Centerline nodes rounded to 0.00001 mm, with 0.00001 mm collinearity tolerance; this permits only serialization rounding, not physical route repair.','path_lengths_mm':lengths,'skew_mm':skew,'maximum_skew_mm':.5,'passed':skew<=.5}
output_path.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report))
sys.exit(0 if report['passed'] else 1)
