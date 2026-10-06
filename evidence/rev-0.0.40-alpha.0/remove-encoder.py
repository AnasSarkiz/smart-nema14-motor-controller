import json
import re
from pathlib import Path
from copy import deepcopy

# Changes authoring sources only; generated circuit JSON is rebuilt by tsci.
for p in [Path('src/SmartNema14MotorController.tsx'), *Path('scripts').glob('*.tsx')]:
 s=p.read_text()
 if 'EncoderSheet' in s:
  p.write_text(s.replace('EncoderSheet','I2cSheet').replace('./encoder/I2cSheet','./interfaces/I2cSheet').replace('../src/encoder/I2cSheet','../src/interfaces/I2cSheet'))
p=Path('src/schematic/ComponentNotes.tsx');s=p.read_text().replace('  Encoder: [','  I2C: [')
s='\n'.join(line for line in s.split('\n') if '"U4:' not in line and '"C6:' not in line);p.write_text(s)
p=Path('src/mechanics/preview-placement.ts');s=p.read_text();s=re.sub(r'^  (U4|C6):.*\n','',s,flags=re.M);p.write_text(s)
p=Path('src/routing/GroundReturns.tsx');s=p.read_text()
for name,tag in [('DNP_ENCODER_GROUND_RECONNECT','trace'),('ENCODER_DNP_GND_REGION','copperpour'),('GND_STITCH_ENCODER','via')]:
 s,count=re.subn(r'      <'+tag+r'\n        name="'+name+r'".*?      />\n','',s,flags=re.S);assert count==1,name
p.write_text(s)
# Preserve required I2C copper; join existing segments at their identical junctions.
p=Path('src/routing/power-guarded-paths-trial.json');routes=json.loads(p.read_text());old=deepcopy(routes['paths'])
by={x['connection']:x for x in old}
u9sda=by['.U9 > .pin6'];u4sda=by['.U4 > .pin6'];u9scl=by['.U9 > .pin1'];u4scl=by['.U4 > .pin7'];r3=by['.R3 > .pin2']
assert u9scl['route'][10]==u4scl['route'][4]
u9scl['route']=u9scl['route'][:11]+u4scl['route'][5:]
# SDA shared junction remains necessary for U1/U9/R3; replace its former
# U4-owned microvia with an ordinary through via and remove its sensor stub.
u9sda['route']=u9sda['route'][:12]
r3['route']=r3['route'][:10]
for point in r3['route']:
 if point['route_type']=='via' and (point['x'],point['y'])==(-.635,3.2):
  point['via_diameter']=.6;point['via_hole_diameter']=.3
reverse=[]
for point in reversed(u4sda['route'][3:]):
 point=deepcopy(point)
 if point['route_type']=='via':point['from_layer'],point['to_layer']=point['to_layer'],point['from_layer']
 reverse.append(point)
u4sda['connection']='.U1 > .pin48';u4sda['route']=reverse
routes['connections']=[x for x in routes['connections'] if not re.search(r'\.(U4|C6) >',x)]
routes['paths']=[x for x in old if not re.search(r'\.(U4|C6) >',x['connection'])]
assert all(not re.search(r'\.(U4|C6) >',str(x)) for x in routes['paths'])
routes['encoder_removal_basis']={'revision':'0.0.40-alpha.0','reason':'User requested removal for the single-front-shaft 14HM11-0404S. Remove U4/C6 and dedicated stubs; retain temperature-sensor I2C pull-ups and exact existing bus corridors. SDA junction now ordinary 0.30/0.60 mm through via; requalification required.'}
p.write_text(json.dumps(routes,indent=2)+'\n')
p=Path('src/routing/filled-signal-vias-trial.json');features=json.loads(p.read_text());features['features']=[x for x in features['features'] if x['owner']['reference']!='U4'];p.write_text(json.dumps(features,indent=2)+'\n')
# New physical bill has 109 references, 108 fitted, only R50 DNP.
for name in ['scripts/check-draft-connectivity.mjs','scripts/check-schematic-notes.mjs','scripts/generate-review-bom.mjs','scripts/check-mechanical-assembly.mjs']:
 p=Path(name);s=p.read_text();s=re.sub(r'^  \["U4",.*\n','',s,flags=re.M)
 s=s.replace('111','109').replace('["C6", "R50", "U4"]','["R50"]').replace('["U4", "C6", "R50"]','["R50"]')
 if name.endswith('generate-review-bom.mjs'):
  s=re.sub(r'^  (U4|C6):.*\n','',s,flags=re.M).replace('fit_default).length, 3','fit_default).length, 1').replace('Optional unpopulated encoder is permitted by USER-BRIEF.md; no rear-shaft feedback for this motor. R50 is fitted only at CAN bus endpoints.','U4/C6 removed by user request. Open-loop motor control; retained I2C serves U9. R50 is fitted only at CAN bus endpoints.')
 p.write_text(s)
p=Path('scripts/render-schematic-sheets.mjs');p.write_text(p.read_text().replace('"Encoder"','"I2C"'))
p=Path('scripts/generate-bom-table.mjs');p.write_text(p.read_text().replace('111 references / 108 default fitted / 44 exact identities','109 references / 108 default fitted / 43 exact identities'))
p=Path('mechanical/check-front-carrier.py');p.write_text(p.read_text().replace('111','109'))
p=Path('mechanical/render-connector-orientation.py');p.write_text(p.read_text().replace('111','109'))
p=Path('mechanical/build-viewer.py');p.write_text(p.read_text().replace('Optional AS5600 footprints are shown; the open-loop review BOM omits U4/C6.','The AS5600 and its bypass have been removed; this controller uses open-loop motor control.'))
p=Path('mechanical/design-constraints.json');s=p.read_text().replace('Open-loop default review BOM; U4/C6 DNP. No rear-shaft feedback claimed.','Open-loop controller; U4/C6 removed by user request in revision 0.0.40-alpha.0. No shaft feedback.').replace('"optional_electrical_draft_retained": true','"optional_electrical_draft_retained": false');p.write_text(s)
p=Path('package.json');p.write_text(p.read_text().replace('0.0.39-alpha.0','0.0.40-alpha.0'))
