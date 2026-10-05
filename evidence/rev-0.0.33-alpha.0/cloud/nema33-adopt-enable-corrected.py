import json,shutil
from pathlib import Path
p=Path('src/routing/power-guarded-paths-trial.json');shutil.copy2(p,'/tmp/nema33-saved-before-enable.json');o=json.loads(p.read_text());candidate=json.load(open('/tmp/nema33-enable-native4-corrected4.json'))
def wire(x,y,layer):return {'route_type':'wire','x':x,'y':y,'layer':layer,'width':.15}
def via(x,y,a,b,drill=.3,pad=.6):return {'route_type':'via','x':x,'y':y,'from_layer':a,'to_layer':b,'via_diameter':pad,'via_hole_diameter':drill}
# Complete real-port tree: driver -> pullup -> MCU. Preserve both owned barrels.
driver=[wire(-10.000887,-1.799995,'top'),wire(-10.000887,-3.459659,'top'),wire(-8.825,-4.635,'top'),wire(-6.54104,-4.635,'top'),wire(-6.432816,-5,'top')]
route=[wire(-6.432816,-5,'top'),via(-6.432816,-5,'top','bottom',.2,.38),via(-6.432816,-5,'bottom','top',.2,.38)]
route += [wire(x,y,'top') for x,y in reversed(candidate[4]['route'])]
route += [via(-13.696,-4.055,'top','inner2')]
route += [wire(x,y,'inner2') for x,y in reversed(candidate[2]['route'])]
route += [via(13.677,-6.1,'inner2','bottom')]
route += [wire(x,y,'bottom') for x,y in reversed(candidate[0]['route'])]
route += [via(10.45,-1.85,'bottom','top',.2,.38),wire(10.45,-1.85,'top'),wire(10.45,-.45006,'top'),wire(12.749928,-.45006,'top')]
o['paths'] += [{'connection':'.U2 > .pin2','route':driver},{'connection':'.R7 > .pin2','route':route}]
o['net_names'] += ['TMC_ENABLE_N'];o['connections'] += ['.U1 > .pin15','.U2 > .pin2','.R7 > .pin2'];p.write_text(json.dumps(o,indent=2)+'\n');p=Path('package.json');x=json.loads(p.read_text());x['version']='0.0.33-alpha.0';p.write_text(json.dumps(x,indent=2)+'\n')
print('New complete source tree',len(o['paths']),'paths')
