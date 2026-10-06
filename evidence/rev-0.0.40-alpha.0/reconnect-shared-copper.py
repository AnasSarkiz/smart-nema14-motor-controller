import json,re
from pathlib import Path
from copy import deepcopy
p=Path('src/routing/power-guarded-paths-trial.json');current=json.loads(p.read_text());baseline=json.load(open('.publication/fix40/baseline-paths.json'));old=deepcopy(baseline['paths']);by={x['connection']:x for x in old}
# Power trees anchored at C6/U4 must terminate at surviving real pads.
for selector in ['.R33 > .pin1','.R34 > .pin1','.R35 > .pin1']:
 by[selector]['route']+=by['.C6 > .pin1']['route'][1:]
by['.R31 > .pin1']['route']+=by['.U4 > .pin1']['route'][1:]+by['.U4 > .pin2']['route'][1:]
# Complete SDA paths terminate at U1, not an unrepresented branch junction.
sda_tail=deepcopy(by['.U4 > .pin6']['route'])
by['.U9 > .pin6']['route']=by['.U9 > .pin6']['route'][:7]+sda_tail[9:]
by['.R3 > .pin2']['route']=by['.R3 > .pin2']['route'][:10]+sda_tail[4:]
for pt in by['.R3 > .pin2']['route']:
 if pt['route_type']=='via' and (pt['x'],pt['y'])==(-.635,3.2):pt['via_diameter']=.6;pt['via_hole_diameter']=.3
# Complete SCL sensor path meets existing R2 pad; drop encoder-only detour.
by['.U9 > .pin1']['route']=by['.U9 > .pin1']['route'][:11]+by['.U4 > .pin7']['route'][5:]
current['paths']=[x for x in old if not re.search(r'\.(U4|C6) >',x['connection'])]
p.write_text(json.dumps(current,indent=2)+'\n')
