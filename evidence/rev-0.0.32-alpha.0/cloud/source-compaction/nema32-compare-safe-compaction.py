import json,math
from pathlib import Path
from collections import defaultdict
from shapely.geometry import LineString,Point
from shapely.ops import unary_union
original=json.load(open('src/routing/power-guarded-paths-trial.json'));candidate=json.load(open('/tmp/nema32-compact-all-candidate.json'));c=json.load(open('dist/index/circuit.json'));parent={}
def root(k):
 parent.setdefault(k,k)
 if parent[k]!=k:parent[k]=root(parent[k])
 return parent[k]
for e in c:
 if e['type']=='source_trace':
  m=e['connected_source_port_ids']+e['connected_source_net_ids']
  for k in m[1:]:parent[root(k)]=root(m[0])
refs={e['source_component_id']:e['name'] for e in c if e['type']=='source_component'};names={root(e['source_net_id']):e['name'] for e in c if e['type']=='source_net'};nets={f".{refs[e['source_component_id']]} > .pin{e['pin_number']}":names.get(root(e['source_port_id'])) for e in c if e['type']=='source_port' and e.get('pin_number') is not None}
candidate['paths']=[p for p in original['paths'] if nets[p['connection']]=='V3V3']+[p for p in candidate['paths'] if nets[p['connection']]!='V3V3']
for p in candidate['paths']:
 route=[]
 for v in p['route']:
  if nets[p['connection']]!='V3V3' and route and v['route_type']=='wire' and route[-1]['route_type']=='wire' and v==route[-1]:continue
  route.append(v)
 p['route']=route
Path('/tmp/nema32-compact-safe-candidate.json').write_text(json.dumps(candidate,indent=2)+'\n')
def shapes(source):
 out=defaultdict(list);count=0
 for p in source['paths']:
  net=nets[p['connection']]
  for a in p['route']:
   if a['route_type']=='via':
    for l in ['top','inner1','inner2','bottom']:out[net,l].append(Point(a['x'],a['y']).buffer(a['via_diameter']/2,quad_segs=32))
  for a,b in zip(p['route'],p['route'][1:]):
   l=a['layer'] if a['route_type']=='wire' else a['to_layer'];w=a['width'] if a['route_type']=='wire' else b.get('width',.15);dist=math.hypot(a['x']-b['x'],a['y']-b['y']);count+=1 if a['x']==b['x'] or a['y']==b['y'] else max(1,math.ceil(dist/w))
   if dist:out[net,l].append(LineString([(a['x'],a['y']),(b['x'],b['y'])]).buffer(w/2,quad_segs=32))
 return {k:unary_union(v) for k,v in out.items()},count
before,bcount=shapes(original);after,acount=shapes(candidate);report=[]
for (n,l),b in before.items():
 a=after[n,l];epsilon=.0000001
 report.append({'net':n,'layer':l,'added_area_mm2':a.difference(b).area,'removed_area_mm2':b.difference(a).area,'added_outside_serialization_envelope_mm2':a.difference(b.buffer(epsilon)).area,'removed_outside_serialization_envelope_mm2':b.difference(a.buffer(epsilon)).area})
r={'scope':'Physical copper union of existing source wire/via paths before and after real-port tree serialization; no free-space routing or generated JSON mutation. Vias modeled with existing through barrels on all four layers.','serialization_envelope_mm':.0000001,'wire_rectangle_estimate_before':bcount,'wire_rectangle_estimate_after':acount,'measurements':report,'passed':all(i['added_outside_serialization_envelope_mm2']<1e-10 and i['removed_outside_serialization_envelope_mm2']<1e-10 for i in report)}
Path('/tmp/nema32-compaction-safe-comparison.json').write_text(json.dumps(r,indent=2)+'\n');print('Wire obstacle estimate',bcount,acount,'passed',r['passed']);print([i for i in report if i['added_outside_serialization_envelope_mm2']>1e-10 or i['removed_outside_serialization_envelope_mm2']>1e-10])
