"""Lossless cleanup of repeated points and straight runs of existing copper."""
import json
import hashlib
from pathlib import Path

source = Path('src/routing/saved-paths.json')
original = json.loads(source.read_text())
removed = 0
paths = []
for path in original['paths']:
    kept = []
    for point in path['route']:
        if kept and point['route_type'] == kept[-1]['route_type'] == 'wire' and point == kept[-1]:
            removed += 1
            continue
        kept.append(point)
        while len(kept) >= 3:
            first, middle, last = kept[-3:]
            if not all(p['route_type'] == 'wire' for p in [first,middle,last]):break
            if len({(p['layer'],p['width']) for p in [first,middle,last]}) != 1:break
            ax,ay = middle['x']-first['x'],middle['y']-first['y']
            bx,by = last['x']-middle['x'],last['y']-middle['y']
            if abs(ax*by-ay*bx)>1e-12 or ax*bx+ay*by < 0:break
            # Keep explicit contacts on both sides of every via.
            if len(kept) >= 4 and kept[-4]['route_type'] == 'via' and first['x'] == middle['x'] and first['y'] == middle['y']:break
            del kept[-2]
            removed += 1
    if len(kept)<2: kept=path['route']
    assert kept[0] == path['route'][0] and kept[-1] == path['route'][-1]
    paths.append({**path,'route':kept})
result={**original,'paths':paths,'simplification_basis':{'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'removed_points':removed,'method':'Exact duplicate wires and collinear same-width/same-layer runs; unchanged endpoints and all vias. No new route search.'}}
Path('src/routing/simplified-paths.json').write_text(json.dumps(result,indent=2)+'\n')
print('Removed',removed,'redundant points; all',len(paths),'complete path endpoints retained')
