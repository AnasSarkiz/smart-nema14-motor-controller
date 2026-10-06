"""Read native Gerber region polarities in their actual drawing order."""
import json,math,re
from pathlib import Path
from shapely.geometry import Polygon,Point,LineString
from shapely.ops import unary_union
base=Path('evidence/rev-0.0.35-alpha.0');j=json.load(open('dist/index/circuit.json'));reports=[]
for filename,layer in [('F_Cu.gbr','top'),('In1_Cu.gbr','inner1'),('In2_Cu.gbr','inner2'),('B_Cu.gbr','bottom')]:
 region=False;polarity='D';mode='G01';position=(0.,0.);points=[];plot=Polygon();commands=[];apertures={};aperture=None;other_copper=[]
 for raw in (base/'native-cam-review'/filename).read_text().splitlines():
  line=raw.strip().strip('*')
  match=re.fullmatch(r'%ADD(\d+)C,([\d.]+)\*%',line)
  if match:apertures[int(match[1])]=float(match[2]);continue
  if re.fullmatch(r'D\d+',line) and int(line[1:])>=10:aperture=int(line[1:]);continue
  if not region and line.startswith(('X','Y')):
   fields=dict(re.findall(r'([XYIJD])(-?\d+)',line));x=int(fields.get('X',str(round(position[0]*1e6))))/1e6;y=int(fields.get('Y',str(round(position[1]*1e6))))/1e6
   if layer in ('inner1','inner2'):
    diameter=apertures[aperture]
    if fields.get('D')=='03':other_copper.append(Point(x,y).buffer(diameter/2,quad_segs=64))
    elif fields.get('D')=='01':
     assert mode=='G01'
     other_copper.append(LineString([position,(x,y)]).buffer(diameter/2,quad_segs=64))
   position=(x,y)
   continue
  if line=='%LPD*%':polarity='D'
  elif line=='%LPC*%':polarity='C'
  elif line in ['G01','G02','G03']:mode=line
  elif line=='G36':region=True;points=[]
  elif line=='G37':
   shape=Polygon(points);assert shape.is_valid,(filename,len(commands),shape)
   commands.append((polarity,shape))
   plot=plot.union(shape) if polarity=='D' else plot.difference(shape)
   region=False
  elif region and line.startswith(('X','Y')):
   fields=dict(re.findall(r'([XYIJD])(-?\d+)',line));x=int(fields.get('X',str(round(position[0]*1e6))))/1e6;y=int(fields.get('Y',str(round(position[1]*1e6))))/1e6
   if fields.get('D')=='02' or mode=='G01':points.append((x,y))
   elif mode in ['G02','G03']:
    center=(position[0]+int(fields.get('I','0'))/1e6,position[1]+int(fields.get('J','0'))/1e6);radius=math.dist(position,center)
    start=math.atan2(position[1]-center[1],position[0]-center[0]);end=math.atan2(y-center[1],x-center[0]);angle=(end-start)%(2*math.pi) if mode=='G03' else -((start-end)%(2*math.pi));n=max(2,math.ceil(abs(angle)*math.sqrt(max(radius,1e-12)/2e-7)))
    points.extend((center[0]+radius*math.cos(start+angle*i/n),center[1]+radius*math.sin(start+angle*i/n)) for i in range(1,n+1))
   else:raise ValueError(mode)
   position=(x,y)
 pours=[e for e in j if e['type']=='pcb_copper_pour' and e['layer']==layer];expected=unary_union([Polygon([(v['x'],v['y']) for v in p['brep_shape']['outer_ring']['vertices']], [[(v['x'],v['y']) for v in r['vertices']] for r in p['brep_shape']['inner_rings']]) for p in pours])
 missing=expected.difference(plot.buffer(.000002));extra=plot.difference(expected.buffer(.000002))
 restored_by_later_traces_vias=missing.intersection(unary_union(other_copper)).area
 net_names={e['source_net_id']:e['name'] for e in j if e['type']=='source_net'}
 lost=[]
 for p in pours:
  b=p['brep_shape'];shape=Polygon([(v['x'],v['y']) for v in b['outer_ring']['vertices']], [[(v['x'],v['y']) for v in r['vertices']] for r in b['inner_rings']])
  area=shape.intersection(missing).area
  if area>1e-8:lost.append({'pour':p['pcb_copper_pour_id'],'net':net_names[p['source_net_id']],'area_mm2':area})
 report={'missing_pour_regions':lost,'missing_restored_by_later_traces_vias_mm2':restored_by_later_traces_vias,'missing_after_all_inner_copper_mm2':missing.difference(unary_union(other_copper).buffer(.000002)).area,'file':filename,'layer':layer,'region_commands':len(commands),'source_pours':len(pours),'expected_pour_union_area_mm2':expected.area,'plotted_pour_region_area_mm2':plot.area,'missing_after_2um_allowance_mm2':missing.area,'extra_after_2um_allowance_mm2':extra.area,'missing_bounds_mm':list(missing.bounds) if not missing.is_empty else []}
 reports.append(report);print(report)
(base/'NATIVE-GERBER-POUR-POLARITY-REVIEW.json').write_text(json.dumps({'scope':'Audit actual ordered dark/clear Gerber regions against the native filled-pour union before later pads/traces/vias. Coordinates .000001 mm; 2 um serialization allowance. This is a targeted converter diagnostic, not a complete CAM approval.','layers':reports},indent=2)+'\n')
