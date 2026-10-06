import hashlib,json
from collections import defaultdict
from pathlib import Path
old_path=Path('.publication/fix40/baseline-circuit.json');new_path=Path('dist/index/circuit.json');old=json.loads(old_path.read_text());new=json.loads(new_path.read_text())
removed={'U4','C6'}
def partitions(circuit):
 parent={}
 def root(key):
  parent.setdefault(key,key)
  if parent[key]!=key:parent[key]=root(parent[key])
  return parent[key]
 for t in circuit:
  if t['type']=='source_trace':
   m=t['connected_source_port_ids']+t['connected_source_net_ids']
   for x in m[1:]:parent[root(x)]=root(m[0])
 refs={x['source_component_id']:x['name'] for x in circuit if x['type']=='source_component'}
 groups=defaultdict(list);port_names={}
 for p in circuit:
  if p['type']=='source_port' and p.get('source_component_id') in refs and refs[p['source_component_id']] not in removed:
   key=(refs[p['source_component_id']],p['pin_number']);port_names[p['source_port_id']]=key;groups[root(p['source_port_id'])].append(key)
 result={key:sorted(members) for members in groups.values() for key in members}
 return result,refs,port_names
before,old_refs,old_ports=partitions(old);after,new_refs,new_ports=partitions(new)
assert before==after,'Surviving manufacturer-pin wiring changed'
assert len(before)==411
assert set(old_refs.values())-set(new_refs.values())==removed
assert len(new_refs)==109

def purchased_geometry(circuit,refs,port_names):
 pcb_refs={x['pcb_component_id']:refs[x['source_component_id']] for x in circuit if x['type']=='pcb_component' and x.get('source_component_id') in refs and refs[x['source_component_id']] not in removed}
 ports={x['pcb_port_id']:port_names[x['source_port_id']] for x in circuit if x['type']=='pcb_port' and x['source_port_id'] in port_names}
 result=defaultdict(list)
 for x in circuit:
  if x['type'] in ['pcb_component','pcb_smtpad','cad_component']:
   ref=pcb_refs.get(x.get('pcb_component_id'))
   if ref is None:continue
   n={k:v for k,v in x.items() if not k.endswith('_id')}
   if x.get('pcb_port_id') in ports:n['manufacturer_pin']=ports[x['pcb_port_id']]
   result[(ref,x['type'])].append(json.dumps(n,sort_keys=True))
 return {str(k):sorted(v) for k,v in result.items()}
assert purchased_geometry(old,old_refs,old_ports)==purchased_geometry(new,new_refs,new_ports),'Surviving pad/placement/CAD geometry changed'
# Compare geometry for every unaffected network with the existing strict checker.
import runpy,sys
sys.argv=['scripts/check-filled-copper.py',str(old_path),'.publication/fix40/baseline-filled-comparison.json'];og=runpy.run_path('scripts/check-filled-copper.py')
sys.argv=['scripts/check-filled-copper.py',str(new_path),'.publication/fix40/new-filled-comparison.json'];ng=runpy.run_path('scripts/check-filled-copper.py')
from shapely.ops import unary_union
allowed={'GND','V3V3','I2C_SCL','I2C_SDA'}
def copper_by_named_net(g):
 grouped=defaultdict(list)
 for p in g['conductors']:
  name=g['net_names'].get(p['net'])
  if name and name not in allowed and p['kind']!='pour':grouped[(name,p['layer'])].append(p['shape'])
 return {key:unary_union(shapes) for key,shapes in grouped.items()}
a=copper_by_named_net(og);b=copper_by_named_net(ng);assert a.keys()==b.keys()
max_difference=max(a[k].symmetric_difference(b[k]).area for k in a);assert max_difference<1e-7,max_difference
report={'revision':'0.0.40-alpha.0','baseline_sha256':hashlib.sha256(old_path.read_bytes()).hexdigest(),'canonical_sha256':hashlib.sha256(new_path.read_bytes()).hexdigest(),'removed_references':sorted(removed),'surviving_reference_count':109,'default_fitted_count':108,'surviving_purchased_pins':411,'all_surviving_pin_partitions_unchanged':True,'all_surviving_placements_pads_and_cad_unchanged':True,'unaffected_fixed_copper_net_layer_groups':len(a), 'pour_rebuild_scope':'Native pours regenerate cutouts around removed U4/C6 pads and relocated vias. Fresh strict filled-copper checks verify all 82 networks; exact pour preservation is not claimed.','maximum_unaffected_copper_area_difference_mm2':max_difference,'affected_nets':sorted(allowed),'hardware_tested':False,'prototype_fabrication_ready':False}
Path('evidence/rev-0.0.40-alpha.0/ENCODER-REMOVAL-PRESERVATION.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
