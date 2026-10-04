"""Apply explicit board-route bends to clear the eFuse ground through-via."""
import hashlib
import json
from pathlib import Path

source = Path('src/routing/port-tree-simplified.json')
original = json.loads(source.read_text())
changes = []
for path in original['paths']:
    route = path['route']
    if path['connection'] == '.R3 > .pin1':
        for i,(a,b) in enumerate(zip(route,route[1:])):
            if (a.get('layer'),a['x'],a['y'],b['x'],b['y']) == ('top',-.0371,-5.1448,-5.5672,-5.1448):
                assert a['width']==b['width']==.15
                bends = [(-3.25,-5.1448),(-3.5,-5.8),(-4.5,-5.8),(-4.75,-5.1448)]
                route[i+1:i+1] = [{**a,'x':x,'y':y}for x,y in bends]
                changes.append({'connection':path['connection'],'old_segment':[a,b],'bends_mm':bends})
                break
    if path['connection'] == '.R7 > .pin2':
        for i,point in enumerate(route):
            if (point.get('layer'),point['x'],point['y']) == ('inner2',-4.1269,-5.0167):
                assert route[i-1]['x']==-4.6837 and route[i-1]['y']==-4.4599
                assert route[i+1]['x']==10.7086 and route[i+1]['y']==-5.0167
                bends = [(-4.6837,-5.75),(-3.4,-5.75),(-3.4,-5.0167)]
                route[i:i+1] = [{**point,'x':x,'y':y}for x,y in bends]
                changes.append({'connection':path['connection'],'old_bend':point,'bends_mm':bends})
                break
assert len(changes)==2, 'Expected both original route segments; inspect before applying to a different source'
original['manual_ground_stitch_bends']={'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'through_via_mm':[-4,-5],'changes':changes,'scope':'Explicit manual route changes, validation required. Imported definitions unchanged.'}
Path('src/routing/ground-stitch-paths.json').write_text(json.dumps(original,indent=2)+'\n')
print('Applied two manually specified route bends; native and independent checks remain required')
