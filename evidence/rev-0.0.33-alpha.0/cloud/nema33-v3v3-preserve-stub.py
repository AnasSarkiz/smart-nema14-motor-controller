import json,math,hashlib
from pathlib import Path
from collections import defaultdict
from shapely.geometry import LineString,Point
from shapely.ops import unary_union
current=json.load(open('src/routing/power-guarded-paths-trial.json'));tree=json.load(open('/tmp/nema32-compact-dedup-candidate.json'));selectors={p['connection'] for p in current['paths'][:38]};new=[p for p in tree['paths'] if p['connection'] in selectors];assert len(new)==38
old=next(p['route'] for p in current['paths'][:38] if p['connection']=='.U2 > .pin15');loop=old[15:29];added=False
for p in new:
 for i,v in enumerate(p['route']):
  if v['route_type']=='wire' and v['layer']=='top' and (v['x'],v['y'])==(-7.7552,-9.7029):
   p['route'][i+1:i+1]=loop;added=True;break
 if added:break
assert added
candidate={**current,'paths':new+current['paths'][38:]};Path('/tmp/nema33-compact-with-stub-candidate.json').write_text(json.dumps(candidate,indent=2)+'\n')
def shapes(paths):
 out=defaultdict(list);count=0
 for p in paths:
  for v in p['route']:
   if v['route_type']=='via':
    for l in ['top','inner1','inner2','bottom']:out[l].append(Point(v['x'],v['y']).buffer(v['via_diameter']/2,quad_segs=32))
  for a,b in zip(p['route'],p['route'][1:]):
   l=a.get('layer',a.get('to_layer'));w=a.get('width',b.get('width',.15));dist=math.hypot(a['x']-b['x'],a['y']-b['y']);count+=1 if a['x']==b['x'] or a['y']==b['y'] else max(1,math.ceil(dist/w))
   if dist:out[l].append(LineString([(a['x'],a['y']),(b['x'],b['y'])]).buffer(w/2,quad_segs=32))
 return {k:unary_union(v) for k,v in out.items()},count
before,bc=shapes(current['paths'][:38]);after,ac=shapes(new);measurements=[]
for l,a in before.items():
 b=after[l];measurements.append({'net':'V3V3','layer':l,'added_outside_serialization_envelope_mm2':b.difference(a.buffer(.0000001)).area,'removed_outside_serialization_envelope_mm2':a.difference(b.buffer(.0000001)).area})
r={'scope':'Source-only copper tree plus original saved bottom stub loop, copied verbatim at existing via; no new free-space route or generated JSON edit. Not yet replayed/accepted.','baseline_source_sha256':hashlib.sha256(Path('src/routing/power-guarded-paths-trial.json').read_bytes()).hexdigest(),'original_V3V3_wire_obstacle_estimate':bc,'candidate_V3V3_wire_obstacle_estimate':ac,'measurements':measurements,'passed':all(i['added_outside_serialization_envelope_mm2']<1e-10 and i['removed_outside_serialization_envelope_mm2']<1e-10 for i in measurements)};Path('/tmp/nema33-v3v3-compaction-comparison.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
