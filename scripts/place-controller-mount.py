"""Propose native coordinates using imported courtyards; never edit footprints.
This is a placement aid. CLI checks, datasheet loop review and 3D inspection remain mandatory.
"""
from pathlib import Path
import json, math, re

circuit = json.loads(Path('dist/controller-preview/circuit.json').read_text())
source = {e['source_component_id']: e['name'] for e in circuit if e['type'] == 'source_component'}
components = {source[e['source_component_id']]: e for e in circuit if e['type'] == 'pcb_component'}
placement_path = Path('src/mechanics/preview-placement.ts')
text = placement_path.read_text()
props = {}
for name, body in re.findall(r'^  (\w+): \{ ([^\n]+) \},', text, re.M):
    props[name] = json.loads('{' + re.sub(r'(\w+):', r'"\1":', body) + '}')
assert len(props) == 111
fixed = set(['U1','U2','U3','U4','U5','U6','U7','U8','U9','U10','J_USB','J_SWD','J_IO','J_MOTOR','Q_PD','Q_ILIM','L1','C19','C20','R5','R6','C8','C9','C10','C11','C12','C13','C14','C15','C16','C17','C18','C21','C26','C32','C33','C34','C7','D_CAN','C28','C1','C3','D_USB','R42','R43'])
preferred = {name: (p['pcbX'], p['pcbY']) for name, p in props.items()}
preferred.update({'U1':(8.5,1.3),'R10':(-6,4),'R11':(-4,6),'R4':(-4,3), 'R7':(-6,-5.5), 'R8':(-3,5), 'R9':(-1,5), 'R2':(1,-3),'R3':(1,-5), 'LED_POWER':(-1,2),'LED_STATUS':(1,4),'LED_FAULT':(1,0), 'C28':(10.2,-10.6),'C29':(5,-5),'R19':(7,-4), 'C30':(8,7.5),'C31':(8,.3), 'R38':(-6,-9),'R39':(-6,-11),'R40':(-8,-7), 'R41':(-6,-7),'R42':(0,-9.75),'R43':(0,-12.5),'R44':(-2,-11),'R45':(-2,-7),'R46':(-7,-3),'R48':(-2,-13), 'R23':(7,6),'R24':(7,4),'R25':(7,2),'R26':(7,0),'R27':(7,-2),'R28':(5,6),'R29':(5,4),'R30':(5,2),'R31':(5,0),'R32':(5,-2),'R33':(-6,6),'R34':(5,8),'R35':(-1,4),'R36':(-1,6),'R37':(1,6)})
rectangles = {}
for name, c in components.items():
    courts = [e for e in circuit if e['type'] == 'pcb_courtyard_outline' and e['pcb_component_id'] == c['pcb_component_id']]
    assert len(courts) == 1, name
    pts = courts[0]['outline']; p = {'pcbX':c['center']['x'], 'pcbY':c['center']['y']}
    rectangles[name] = (min(t['x'] for t in pts)-p['pcbX'], max(t['x'] for t in pts)-p['pcbX'], min(t['y'] for t in pts)-p['pcbY'], max(t['y'] for t in pts)-p['pcbY'])
preferred.update({'U10':(-4.5,-7.75),'C19':(-11.1,8.5),'C20':(7.75,11.5),'J_MOTOR':(-1.75,11.9),'L1':(-10.15,-9.15),'U5':(-15.5,-6),'J_SWD':(14.4,-8.4),'D_CAN':(8.75,5.5)})
mount_centers=[(x,y) for x in (-15.25,15.25) for y in (-15.25,15.25)]
def mount_overlap(r):
    return any(math.hypot(max(r[0]-x,0,x-r[1]),max(r[2]-y,0,y-r[3]))<2.65 for x,y in mount_centers)
placed = {n: preferred[n] for n in fixed}
def bounds(name, pos):
    r=rectangles[name];return r[0]+pos[0],r[1]+pos[0],r[2]+pos[1],r[3]+pos[1]
def overlaps(a,b):
    return min(a[1],b[1])+0.12 > max(a[0],b[0]) and min(a[3],b[3])+0.12 > max(a[2],b[2])
def layer(name):return components[name]['layer']
for n,p in placed.items(): assert not mount_overlap(bounds(n,p)), (n,'mount clearance')
for a in fixed:
    for b in fixed:
        if a<b and layer(a)==layer(b):assert not overlaps(bounds(a,placed[a]),bounds(b,placed[b])), (a,b)
# Prefer larger parts and preserve critical decoupling/sense sites before minor passives.
priority = ['C1','C2','C3','C4','C8','C9','C10','C11','C12','C13','C14','C15','C16','C17','C18','C22','C23','C24','C25','C26','C28','C29','C32','C33','D_USB','D_VBUS','D_IO1','D_IO2','D_CAN']
flex = [n for n in priority if n not in fixed]+[n for n in props if n not in fixed and n not in priority]
for name in flex:
    preferred_pos=preferred[name]
    candidates=[]
    for ix in range(-68,69):
        for iy in range(-68,69):
            pos=(ix*.25,iy*.25);r=bounds(name,pos)
            if mount_overlap(r):continue
            if min(r[0],r[2]) < -17.2 or max(r[1],r[3]) > 17.2:continue
            if any(layer(n)==layer(name) and overlaps(r,bounds(n,p)) for n,p in placed.items()):continue
            # NPTH alignment pins pierce both layers. Reserve conservative circles below USB.
            if layer(name)=='bottom' and any(math.hypot(max(r[0]-hx,0,hx-r[1]),max(r[2]-hy,0,hy-r[3]))<.525 for hx,hy in [(-2.890012,-11.3100104),(2.890012,-11.3100104)]):continue
            distance=(pos[0]-preferred_pos[0])**2+(pos[1]-preferred_pos[1])**2
            candidates.append((distance,pos))
    assert candidates, f'No legal courtyard site for {name}'
    placed[name]=min(candidates)[1]
    print(name,preferred_pos,'->',placed[name],flush=True)
for name,pos in placed.items():
    props[name]['pcbX'],props[name]['pcbY']=pos
    body=', '.join(f'{k}: '+json.dumps(v) for k,v in props[name].items())
    text,count=re.subn(r'^  '+re.escape(name)+r': \{[^\n]+\},',f'  {name}: {{ {body} }},',text,flags=re.M);assert count==1
placement_path.write_text(text)
Path('evidence/rev-'+json.loads(Path('package.json').read_text())['version']+'/PLACEMENT-PROPOSAL.json').write_text(json.dumps({'scope':'Unrouted courtyard proposal; not a validated PCB or mechanical fit','positions':props},indent=2)+'\n')
