"""Measure declared active fanout corridors against actual same-net copper at full source width."""
import runpy, sys, json, hashlib
from pathlib import Path
from shapely.geometry import LineString
from shapely.ops import unary_union
input_path,output_path=map(Path,sys.argv[1:3])
sys.argv=['scripts/check-filled-copper.py',str(input_path),str(output_path.with_name('FANOUT-COPPER-DIAGNOSTIC.json'))]
g=runpy.run_path('scripts/check-filled-copper.py')
assert not g['violations'] and all(r['complete_plane_network'] for r in g['island_reports'].values()),'Native geometry prerequisites fail'

fanouts=json.loads(Path('src/routing/vm-fanouts-trial.json').read_text())
saved=json.loads(Path('src/routing/power-guarded-paths-trial.json').read_text())
positions=[v for path in saved['paths'] for v in path['route'] if v['route_type']=='via']
fanouts=[f for f in fanouts if f['name'] in saved['retained_fanout_names'] or not any(((f['x']-v['x'])**2+(f['y']-v['y'])**2)**.5<.00001 for v in positions)]
components={e['source_component_id']:e['name'] for e in g['circuit'] if e['type']=='source_component'}
ports={e['source_port_id']:e for e in g['circuit'] if e['type']=='source_port'}
nets={name:key for key,name in g['net_names'].items()}; conductors=g['conductors']; results=[]
for f in fanouts:
 for b in f['branches']:
  width=float(str(f['width']).removesuffix('mm'))
  ref,hint=b['selector'].replace('.','').split(' > ')
  candidates=[v for v in g['pcb_ports'].values() if components.get(ports[v['source_port_id']]['source_component_id'])==ref and hint in ports[v['source_port_id']].get('port_hints',[]) and f['layer'] in v['layers']]
  if hint in ('top','bottom'):
   candidates=[{'x':v['x'],'y':v['y']} for v in json.loads(Path('src/routing/vm-fanouts-trial.json').read_text()) if v['name']==ref]
  assert len(candidates)==1,(f['name'],b['selector'],candidates)
  pad=candidates[0]
  points=[(f['x'],f['y'])]+[(v['x'],v['y']) for v in b['points']]+[(pad['x'],pad['y'])]
  if len(set(points))<2:continue
  actual=unary_union([v['shape'] for v in conductors if v['net']==nets[f['net']] and v['layer']==f['layer']])
  # Mask exact drill voids in both sides; source widths do not require copper inside a through drill.
  required=LineString(points).buffer(width/2,quad_segs=64).difference(g['drill_voids'])
  # 2 um accounts for recorded pad-position serialization, never a routing repair.
  missing=required.difference(actual.buffer(.002))
  results.append({'fanout':f['name'],'port':b['selector'],'net':f['net'],'layer':f['layer'],'requested_width_mm':width,'missing_required_copper_mm2':missing.area,'full_source_branch_width_covered':missing.area<1e-8})
report={'canonical_sha256':hashlib.sha256(input_path.read_bytes()).hexdigest(),'scope':'Compare each documented fanout corridor at its requested width with the actual emitted same-net tracks/pads/pours on that layer. Copper holes excluded symmetrically. 2 um source pad-coordinate precision allowance. Does not establish complete loaded-path current sharing or rail/pour neck capacity.','branches':results,'all_fanout_corridors_covered':all(v['full_source_branch_width_covered'] for v in results)}
output_path.write_text(json.dumps(report,indent=2)+'\n')
print('Fanout branches',len(results),'fully covered',sum(v['full_source_branch_width_covered'] for v in results))
for v in results:
 if not v['full_source_branch_width_covered']:print(v)

sys.exit(0 if report['all_fanout_corridors_covered'] else 1)
