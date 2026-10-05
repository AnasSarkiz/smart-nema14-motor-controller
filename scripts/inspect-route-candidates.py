"""Measure explicitly specified via candidates; does not search or route."""
import json
import sys
from pathlib import Path
from shapely import affinity
from shapely.geometry import Point, LineString, box

circuit = json.loads(Path(sys.argv[1]).read_text())
candidates = json.loads(Path(sys.argv[2]).read_text())
parent = {}
def root(key):
    parent.setdefault(key, key)
    if parent[key] != key:
        parent[key] = root(parent[key])
    return parent[key]
for trace in (e for e in circuit if e['type'] == 'source_trace'):
    members = trace['connected_source_port_ids'] + trace['connected_source_net_ids']
    for member in members[1:]:
        parent[root(member)] = root(members[0])
names = {root(e['source_net_id']): e['name'] for e in circuit if e['type'] == 'source_net'}
components = {e['source_component_id']: e['name'] for e in circuit if e['type'] == 'source_component'}
pcb_components = {e['pcb_component_id']: components.get(e['source_component_id'],e['source_component_id']) for e in circuit if e['type'] == 'pcb_component'}
ports = {e['pcb_port_id']: root(e['source_port_id']) for e in circuit if e['type'] == 'pcb_port'}
source_traces = {e['source_trace_id']: e for e in circuit if e['type'] == 'source_trace'}
pads = []
for pad in (e for e in circuit if e['type'] == 'pcb_smtpad'):
    x,y,w,h = [pad[k] for k in ('x','y','width','height')]
    if pad['shape']=='rect':
        shape=box(x-w/2,y-h/2,x+w/2,y+h/2)
    elif pad['shape'] in ('pill','rotated_pill'):
        r=pad['radius'];shape=box(x-max(0,w/2-r),y-max(0,h/2-r),x+max(0,w/2-r),y+max(0,h/2-r)).buffer(r,quad_segs=32)
    elif pad['shape']=='circle':shape=Point(x,y).buffer(pad['radius'],quad_segs=32)
    else:raise ValueError(pad['shape'])
    shape=affinity.rotate(shape,pad.get('ccw_rotation',0),origin=(x,y))
    pads.append((pad,shape))
tracks=[]
for trace in (e for e in circuit if e['type']=='pcb_trace'):
    net=names.get(root(source_traces[trace['source_trace_id']]['connected_source_port_ids'][0]))
    for a,b in zip(trace['route'],trace['route'][1:]):
        if (a['x'],a['y'])==(b['x'],b['y']):continue
        layer=a['layer'] if a['route_type']=='wire' else a['to_layer']
        width=a.get('width',b.get('width'))
        shape=LineString([(a['x'],a['y']),(b['x'],b['y'])]).buffer(width/2,quad_segs=32)
        tracks.append((trace['pcb_trace_id'],net,layer,shape))
for candidate in candidates:
    if 'route' in candidate:
        violations = []
        net = candidate['net']
        layer = candidate['layer']
        width = candidate['width']
        for index, (first, second) in enumerate(zip(candidate['route'], candidate['route'][1:])):
            shape = LineString([first, second]).buffer(width/2, quad_segs=32)
            for pad, outline in pads:
                if pad['layer'] != layer or names.get(ports.get(pad.get('pcb_port_id'))) == net:
                    continue
                gap = shape.distance(outline)
                if gap < .1-.00002:
                    violations.append(('track_pad', index, pcb_components[pad['pcb_component_id']], pad['pcb_smtpad_id'], round(gap, 4)))
            for trace, trace_net, trace_layer, outline in tracks:
                if layer == trace_layer and trace_net != net:
                    gap = shape.distance(outline)
                    if gap < .15-.00002:
                        violations.append(('track_track', index, trace, trace_net, round(gap, 4)))
            for via in (e for e in circuit if e['type']=='pcb_via'):
                via_net = names.get(root(via['source_net_id'])) if via.get('source_net_id') else names.get(root(source_traces[via.get('source_trace_id') or next(e['source_trace_id'] for e in circuit if e['type']=='pcb_trace' and e['pcb_trace_id']==via['pcb_trace_id'])]['connected_source_port_ids'][0]))
                if via_net != net and layer in via['layers']:
                    gap = shape.distance(Point(via['x'],via['y']))-via['outer_diameter']/2
                    if gap < .15-.00002:
                        violations.append(('track_via', index, via['pcb_via_id'], via['x'], via['y'], via_net, round(gap,4)))
            for hole in (e for e in circuit if e['type']=='pcb_hole'):
                gap = shape.distance(Point(hole['x'],hole['y']))-hole['hole_diameter']/2
                if gap < .35-.00002:
                    violations.append(('track_npth', index, hole['pcb_hole_id'], round(gap,4)))
            for keepout in (e for e in circuit if e['type']=='pcb_keepout' and layer in e['layers']):
                gap = shape.distance(Point(keepout['center']['x'],keepout['center']['y']))-keepout['radius']
                if gap < -.00002:
                    violations.append(('track_keepout', index, keepout['pcb_keepout_id'], round(gap,4)))
            if not box(-17.2,-17.2,17.2,17.2).buffer(.00002).covers(shape):
                violations.append(('track_board_edge', index))
        print(candidate, violations)
        continue
    pos=Point(candidate['x'],candidate['y']);net=candidate['net'];violations=[]
    hole_diameter = candidate.get('hole_diameter_mm', .3)
    outer_diameter = candidate.get('outer_diameter_mm', .6)
    owner = candidate.get('owner')
    for pad,shape in pads:
        clearance=pos.distance(shape)-hole_diameter/2
        is_owner = owner and pcb_components[pad['pcb_component_id']] == owner['reference'] and f"pin{owner['pin_number']}" in pad['port_hints']
        if is_owner:
            assert names.get(ports.get(pad.get('pcb_port_id'))) == net
            if candidate['construction'] == 'filled_capped_pad_contact':
                if pos.distance(shape) > outer_diameter/2:
                    violations.append(('owner_contact_missing',))
                continue
        required = .25 if candidate.get('construction') == 'filled_capped_close_escape' or candidate.get('construction') == 'filled_capped_pad_contact' else .35
        if clearance<required-.00002:violations.append(('drill_pad',pcb_components[pad['pcb_component_id']],pad['pcb_smtpad_id'],round(clearance,4)))
        if names.get(ports.get(pad.get('pcb_port_id'))) != net and pos.distance(shape)-outer_diameter/2 < .15-.00002:
            violations.append(('annulus_pad',pcb_components[pad['pcb_component_id']],pad['pcb_smtpad_id'],round(pos.distance(shape)-outer_diameter/2,4)))
    for trace,trace_net,layer,shape in tracks:
        clearance=pos.distance(shape)-outer_diameter/2
        if trace_net!=net and clearance<.15-.00002:violations.append(('annulus_trace',trace,trace_net,layer,round(clearance,4)))
    for via in (e for e in circuit if e['type']=='pcb_via'):
        clearance=pos.distance(Point(via['x'],via['y']))-(via['outer_diameter']+outer_diameter)/2
        if clearance<.15-.00002:violations.append(('via_spacing',via['pcb_via_id'],round(clearance,4)))
        drill_gap=pos.distance(Point(via['x'],via['y']))-(via['hole_diameter']+hole_diameter)/2
        if drill_gap<.35-.00002:violations.append(('via_drill_spacing',via['pcb_via_id'],round(drill_gap,4)))
    for hole in (e for e in circuit if e['type']=='pcb_hole'):
        clearance=pos.distance(Point(hole['x'],hole['y']))-(hole['hole_diameter']+outer_diameter)/2
        if clearance<.35-.00002:violations.append(('npth',hole['pcb_hole_id'],round(clearance,4)))
    for keepout in (e for e in circuit if e['type']=='pcb_keepout'):
        clearance=pos.distance(Point(keepout['center']['x'],keepout['center']['y']))-outer_diameter/2-keepout['radius']
        if clearance<-.00002:violations.append(('keepout',keepout['pcb_keepout_id'],round(clearance,4)))
    if abs(candidate['x'])+outer_diameter/2>17.2 or abs(candidate['y'])+outer_diameter/2>17.2:violations.append(('board_edge',))
    print(candidate,violations)
