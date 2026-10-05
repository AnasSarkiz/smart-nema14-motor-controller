import json,hashlib
from pathlib import Path

def assignments(path):
 c=json.loads(path.read_text());parent={}
 def root(k):
  parent.setdefault(k,k)
  if parent[k]!=k:parent[k]=root(parent[k])
  return parent[k]
 for e in c:
  if e['type']=='source_trace':
   members=e['connected_source_port_ids']+e['connected_source_net_ids']
   for k in members[1:]:parent[root(k)]=root(members[0])
 names={root(e['source_net_id']):e['name'] for e in c if e['type']=='source_net'};refs={e['source_component_id']:e['name'] for e in c if e['type']=='source_component'}
 return {f"{refs[e['source_component_id']]}.pin{e['pin_number']}":names.get(root(e['source_port_id'])) for e in c if e['type']=='source_port' and e.get('pin_number') is not None}
a=Path('evidence/rev-0.0.32-alpha.0/cloud/canonical/circuit.json');b=Path('evidence/rev-0.0.33-alpha.0/cloud/barrel-port-canonical-trial/circuit.json');before=assignments(a);after=assignments(b);o={'scope':'Every purchased/component physical pin retains its exact named net. Only synthetic via outer-port declarations were added.','baseline_sha256':hashlib.sha256(a.read_bytes()).hexdigest(),'target_sha256':hashlib.sha256(b.read_bytes()).hexdigest(),'pins_compared':len(before),'passed':before==after,'changes':{k:{'before':v,'after':after.get(k)} for k,v in before.items() if v!=after.get(k)}};Path('evidence/rev-0.0.33-alpha.0/cloud/barrel-port-canonical-trial/SOURCE-NET-EQUIVALENCE.json').write_text(json.dumps(o,indent=2)+'\n');print(o)
