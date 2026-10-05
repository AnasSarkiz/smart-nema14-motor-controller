"""Serialize existing copper between nearby real ports, preserving native endpoints.

This traverses only already saved wire/via edges. It never routes through free
space. Original corrected copper remains immutable; output is a routing trial.
"""
import hashlib
import heapq
import json
import math
from collections import defaultdict
from pathlib import Path

source = Path('src/routing/power-guarded-paths-trial.json')
original = json.loads(source.read_text())
native = json.loads(Path('dist/index/circuit.json').read_text())
parent = {}
def root(key):
    parent.setdefault(key,key)
    if parent[key]!=key:parent[key]=root(parent[key])
    return parent[key]
for trace in [e for e in native if e['type']=='source_trace']:
    members=trace['connected_source_port_ids']+trace['connected_source_net_ids']
    for member in members[1:]:parent[root(member)]=root(members[0])
components={e['source_component_id']:e['name']for e in native if e['type']=='source_component'}
ports=defaultdict(list)
for port in [e for e in native if e['type']=='source_port' and e.get('pin_number') is not None]:
    ports[f".{components[port['source_component_id']]} > .pin{port['pin_number']}"].append(port)
groups=defaultdict(list)
selected_indices=list(range(len(original["paths"])))
for path in [original['paths'][i] for i in selected_indices]:
    roots={root(p['source_port_id'])for p in ports[path['connection']]}
    assert len(roots)==1, 'Ambiguous saved connection net'
    groups[next(iter(roots))].append(path)

def node(point,layer=None):return(round(point['x'],8),round(point['y'],8),layer or point['layer'])
def shortest(graph,start,targets):
    queue=[(0,start)];costs={start:0};previous={}
    while queue:
        distance,current=heapq.heappop(queue)
        if distance!=costs[current]:continue
        if current in targets:
            result=[];end=current
            while current!=start:
                before,edge=previous[current];result.append((before,current,edge));current=before
            return distance,end,list(reversed(result))
        for neighbor,edge,cost in graph[current]:
            candidate=distance+cost
            if candidate<costs.get(neighbor,math.inf):costs[neighbor]=candidate;previous[neighbor]=(current,edge);heapq.heappush(queue,(candidate,neighbor))
    raise RuntimeError('Saved copper has no path to a represented real port')

result=[];reports=[]
for net,paths in groups.items():
    print('Compacting',net,len(paths),flush=True)
    if len(paths)==1:
        result.extend(paths)
        continue
    graph=defaultdict(list);terminals={};position={}
    for path in paths:
        route=path['route'];terminals[node(route[0])]=path['connection'];position[node(route[0])]=(route[0]['x'],route[0]['y'])
        end=node(route[-1]);position[end]=(route[-1]['x'],route[-1]['y'])
        terminals.setdefault(end,None)
        prior=None
        for point in route:
            if point['route_type']=='via':
                before=node(point,point['from_layer']);after=node(point,point['to_layer']);edge={**point};cost=0.1
                graph[before].append((after,edge,cost));graph[after].append((before,edge,cost));prior=after
                continue
            current=node(point);position[current]=(point['x'],point['y'])
            if prior is not None and prior!=current:
                assert prior[2]==current[2], 'Layer change without saved via'
                edge={'route_type':'wire','width':point['width'],'layer':current[2]};cost=math.hypot(prior[0]-current[0],prior[1]-current[1])
                graph[prior].append((current,edge,cost));graph[current].append((prior,edge,cost))
            prior=current
    anchors=[terminal for terminal,selector in terminals.items()if selector is None]
    assert len(anchors)==1, 'Complete star must retain its common real-port anchor'
    represented={anchors[0]};pending=set(terminals)-represented;point_count_before=sum(len(p['route'])for p in paths);count=0
    while pending:
        candidates=[(shortest(graph,terminal,represented),terminal)for terminal in pending]
        (distance,end,edges),start=min(candidates,key=lambda row:row[0][0])
        width=next(edge['width']for _,_,edge in edges if edge['route_type']=='wire');points=[]
        def wire(point,current_width):
            x,y=position.get(point,point[:2]);return {'route_type':'wire','x':x,'y':y,'layer':point[2],'width':current_width}
        points.append(wire(start,width))
        for before,after,edge in edges:
            if edge['route_type']=='via':
                points.append(wire(before,width));points.append({**edge,'from_layer':before[2],'to_layer':after[2]});points.append(wire(after,width))
            else:
                width=edge['width'];points.append(wire(before,width));points.append(wire(after,width))
        result.append({'connection':terminals[start],'route':points});represented.add(start);pending.remove(start);count+=len(points)
    reports.append({'ports':len(terminals),'original_points':point_count_before,'new_points':count})
# The native importer consumes each start port. Serialize leaves before parents
# so every path still ends at an unconsumed real connection endpoint.
result.reverse()
output={**original,'paths':result,'compaction_basis':{'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'method':'Shortest existing saved copper to a represented real port; no free-space route generation.','groups':reports}}
preserved=[p for i,p in enumerate(original['paths']) if i not in selected_indices]
output['paths']=preserved+result
Path('/tmp/nema32-compact-all-candidate.json').write_text(json.dumps(output,indent=2)+'\n')
print('Retained',len(result),'complete real-port paths;',sum(r['original_points']for r in reports),'points to',sum(r['new_points']for r in reports))
