"""Measure native filled copper and physical GND/RTN islands; no routing changes."""
import hashlib
import json
import math
import sys
from pathlib import Path

from shapely import affinity
from shapely.geometry import LineString, Point, Polygon, box
from shapely.ops import unary_union

input_path = Path(sys.argv[1])
output_path = Path(sys.argv[2])
circuit = json.loads(input_path.read_text())
parent = {}

def root(node):
    parent.setdefault(node, node)
    if parent[node] != node:
        parent[node] = root(parent[node])
    return parent[node]

for trace in (entry for entry in circuit if entry['type'] == 'source_trace'):
    members = trace['connected_source_port_ids'] + trace['connected_source_net_ids']
    for member in members[1:]:
        parent[root(member)] = root(members[0])
source_traces = {e['source_trace_id']: e for e in circuit if e['type'] == 'source_trace'}
source_ports = {e['source_port_id']: e for e in circuit if e['type'] == 'source_port'}
source_components = {e['source_component_id']: e['name'] for e in circuit if e['type'] == 'source_component'}
pcb_ports = {e['pcb_port_id']: e for e in circuit if e['type'] == 'pcb_port'}
pcb_components = {e['pcb_component_id']: e for e in circuit if e['type'] == 'pcb_component'}
net_names = {root(e['source_net_id']): e['name'] for e in circuit if e['type'] == 'source_net'}

conductors = []
pads = []
for pad in (e for e in circuit if e['type'] == 'pcb_smtpad'):
    x, y, width, height = (pad[k] for k in ('x', 'y', 'width', 'height'))
    if pad['shape'] == 'rect':
        shape = box(x-width/2, y-height/2, x+width/2, y+height/2)
    elif pad['shape'] in ('pill', 'rotated_pill'):
        radius = pad['radius']
        dx, dy = max(0, width/2-radius), max(0, height/2-radius)
        shape = box(x-dx,y-dy,x+dx,y+dy).buffer(radius,quad_segs=64)
    elif pad['shape'] == 'circle':
        shape = Point(x,y).buffer(pad['radius'],quad_segs=64)
    else:
        raise ValueError(f"Unsupported actual pad shape {pad['shape']}")
    shape = affinity.rotate(shape,pad.get('ccw_rotation',0),origin=(x,y))
    pcb_port = pcb_ports.get(pad.get('pcb_port_id'))
    net = root(pcb_port['source_port_id']) if pcb_port else pad['pcb_smtpad_id']
    label = source_components[pcb_components[pad['pcb_component_id']]['source_component_id']]
    if pcb_port:
        label += '.' + str(source_ports[pcb_port['source_port_id']].get('pin_number'))
    entry = {'id':pad['pcb_smtpad_id'],'layer':pad['layer'],'net':net,'shape':shape,'kind':'pad','label':label}
    conductors.append(entry)
    pads.append(entry)

for trace in (e for e in circuit if e['type'] == 'pcb_trace'):
    source = source_traces[trace['source_trace_id']]
    net = root(source['connected_source_port_ids'][0])
    current_layer = trace['route'][0].get('layer','top')
    for index,(a,b) in enumerate(zip(trace['route'],trace['route'][1:])):
        if a['route_type']=='via':
            current_layer = a['to_layer']
        elif a['route_type']=='wire':
            current_layer = a['layer']
        else:
            raise ValueError('Unsupported native route primitive')
        width = a.get('width',b.get('width',source.get('min_trace_thickness')))
        assert width is not None and width > 0
        if (a['x'],a['y']) == (b['x'],b['y']):
            continue
        shape = LineString([(a['x'],a['y']),(b['x'],b['y'])]).buffer(width/2,quad_segs=64)
        conductors.append({'id':f"{trace['pcb_trace_id']}:{index}",'layer':current_layer,'net':net,'shape':shape,'kind':'trace'})

vias = []
for via in (e for e in circuit if e['type']=='pcb_via'):
    if via.get('source_net_id'):
        net = root(via['source_net_id'])
    else:
        trace_id = via.get('source_trace_id') or next(e['source_trace_id'] for e in circuit if e['type']=='pcb_trace' and e['pcb_trace_id']==via['pcb_trace_id'])
        net = root(source_traces[trace_id]['connected_source_port_ids'][0])
    assert set(via['layers'])=={'top','inner1','inner2','bottom'}, 'Unreviewed blind or buried via'
    shape = Point(via['x'],via['y']).buffer(via['outer_diameter']/2,quad_segs=64).difference(Point(via['x'],via['y']).buffer(via['hole_diameter']/2,quad_segs=64))
    vias.append((via,net,shape))
    for layer in via['layers']:
        conductors.append({'id':via['pcb_via_id'],'layer':layer,'net':net,'shape':shape,'kind':'via'})

pours = []
for pour in (e for e in circuit if e['type']=='pcb_copper_pour'):
    assert pour['shape']=='brep', 'Unreviewed native pour primitive'
    brep = pour['brep_shape']
    shape = Polygon([(p['x'],p['y']) for p in brep['outer_ring']['vertices']], [[(p['x'],p['y']) for p in ring['vertices']] for ring in brep['inner_rings']])
    assert shape.is_valid and not shape.is_empty, 'Invalid filled native copper polygon'
    entry = {'id':pour['pcb_copper_pour_id'],'layer':pour['layer'],'net':root(pour['source_net_id']),'shape':shape,'kind':'pour'}
    pours.append(entry)
    conductors.append(entry)

violations = []
minimum = {}
for pour in pours:
    for copper in conductors:
        if copper['layer'] != pour['layer'] or copper['net'] == pour['net']:
            continue
        distance = pour['shape'].distance(copper['shape'])
        key = copper['kind']
        measurement = {'pour':pour['id'],'other':copper['id'],'layer':pour['layer'],'actual_mm':distance,'required_mm':0.15}
        if key not in minimum or distance < minimum[key]['actual_mm']:
            minimum[key] = measurement
        if distance < .15-.00002:
            violations.append({'check':'filled_copper_to_other_net_'+key,**measurement})

# Mechanical requirements are separate from the larger native planning radius.
# Native circular keepouts are polygon approximations; actual copper must stay
# outside the original exact required circle, never a relaxed polygon boundary.
constraints_path = Path("mechanical/design-constraints.json")
constraints = json.loads(constraints_path.read_text())["controller_mount_copper_clearance"]
assert constraints["required_radius_mm"] == 2.5
assert constraints["copper_to_npth_mm"] == .3
board = next(e for e in circuit if e['type'] == 'pcb_board')
edge = box(board['center']['x']-board['width']/2+.3, board['center']['y']-board['height']/2+.3, board['center']['x']+board['width']/2-.3, board['center']['y']+board['height']/2-.3)
for pour in pours:
    if not edge.buffer(.00002).covers(pour['shape']):
        violations.append({'check':'pour_board_edge','pour':pour['id'],'required_mm':.3})
    for hole in (e for e in circuit if e['type']=='pcb_hole'):
        assert hole['hole_shape']=='circle'
        clearance = pour['shape'].distance(Point(hole['x'],hole['y']))-hole['hole_diameter']/2
        measurement = {'pour':pour['id'],'hole':hole['pcb_hole_id'],'layer':pour['layer'],'actual_mm':clearance,'required_mm':.3}
        if 'npth' not in minimum or clearance < minimum['npth']['actual_mm']:
            minimum['npth'] = measurement
        if clearance < .3-.00002:
            violations.append({'check':'pour_npth',**measurement})
    for keepout in (e for e in circuit if e['type']=='pcb_keepout' and pour['layer'] in e['layers']):
        assert keepout['shape']=='circle' and keepout['radius']>=constraints['native_planning_radius_mm']
        center = Point(keepout['center']['x'],keepout['center']['y'])
        radius = constraints['required_radius_mm']
        distance = pour['shape'].distance(center)
        measurement = {'pour':pour['id'],'keepout':keepout['pcb_keepout_id'],'layer':pour['layer'],'actual_radius_mm':distance,'required_radius_mm':radius,'native_planning_radius_mm':keepout['radius']}
        if 'mount_circle' not in minimum or distance < minimum['mount_circle']['actual_radius_mm']:
            minimum['mount_circle'] = measurement
        if distance < radius-.00002:
            violations.append({'check':'pour_mount_circle',**measurement})

# Apply actual manufacturing drill removal before physical connectivity.
drill_voids = unary_union([Point(via['x'],via['y']).buffer(via['hole_diameter']/2,quad_segs=64) for via,_,_ in vias])
for conductor in conductors:
    conductor['shape'] = conductor['shape'].difference(drill_voids)

island_reports = {}
for net_name in sys.argv[3:] or ('GND','EFUSE_RTN'):
    net = next(key for key,name in net_names.items() if name==net_name)
    regions = []
    for layer in ('top','inner1','inner2','bottom'):
        geometries = [c['shape'] for c in conductors if c['layer']==layer and c['net']==net]
        if not geometries:
            continue
        filled = unary_union(geometries)
        assert filled.geom_type in ('Polygon','MultiPolygon')
        for geometry in (filled.geoms if filled.geom_type=='MultiPolygon' else [filled]):
            regions.append((layer,geometry))
    region_parent = list(range(len(regions)))
    def region_root(index):
        while region_parent[index] != index:
            index = region_parent[index]
        return index
    for via,via_net,shape in vias:
        if via_net != net:
            continue
        joined = [i for i,(layer,geometry) in enumerate(regions) if layer in via['layers'] and geometry.intersects(shape)]
        for index in joined[1:]:
            region_parent[region_root(index)] = region_root(joined[0])
    groups = {}
    for index,(layer,geometry) in enumerate(regions):
        group = groups.setdefault(region_root(index),{'area_mm2':0,'layers':set(),'pads':set()})
        group.setdefault('regions',[]).append({'layer':layer,'bounds_mm':list(geometry.bounds)})
        group['area_mm2'] += geometry.area
        group['layers'].add(layer)
        for pad in pads:
            if pad['net']==net and pad['layer']==layer and geometry.intersects(pad['shape']):
                group['pads'].add(pad['label'])
    island_reports[net_name] = {'physical_components':len(groups),'components':[{'area_mm2':group['area_mm2'],'layers':sorted(group['layers']),'pads':sorted(group['pads']),'regions':group['regions']} for group in sorted(groups.values(),key=lambda g:g['area_mm2'],reverse=True)],'complete_plane_network':len(groups)==1}

report = {'input':str(input_path),'sha256':hashlib.sha256(input_path.read_bytes()).hexdigest(),'scope':'Native filled BRep against actual pads, traces, via annuli and other pours; physical same-net conductors joined across full through-via spans. No net-name-only connectivity assumption. Impedance, thermal/current limits and CAM remain separate.','mechanical_constraints_sha256':hashlib.sha256(constraints_path.read_bytes()).hexdigest(),'pour_count':len(pours),'minimum_clearances':minimum,'clearance_violations':violations,'physical_islands':island_reports,'clearances_passed':not violations}
output_path.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'pour_count':len(pours),'clearance_violations':len(violations),'physical_components':{name:r['physical_components'] for name,r in island_reports.items()}}))
if __name__ == '__main__':
    sys.exit(0 if not violations and all(r['complete_plane_network'] for r in island_reports.values()) else 1)
