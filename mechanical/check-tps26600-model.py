"""Check official TI package CAD, pad coverage and actual exported GLB placement."""
import os,json,hashlib,struct
from pathlib import Path
os.environ['XDG_CACHE_HOME']=str(Path('.mechanical-cache').resolve())
import cadquery as cq
import numpy as np
root=Path('evidence/power-candidate-audit')
circuit=json.loads(Path('dist/scripts/power-candidate-audit/circuit.json').read_text())
resistor=next(e for e in circuit if e['type']=='source_component' and e['name']=='AUDIT_C25769')
assert resistor['ftype']=='simple_resistor' and resistor['resistance']==24000 and resistor['supplier_part_numbers']['jlcpcb']==['C25769']
source=next(e for e in circuit if e['type']=='source_component' and e['name']=='AUDIT_C2155767')
pcb=next(e for e in circuit if e['type']=='pcb_component' and e['source_component_id']==source['source_component_id'])
pads=[e for e in circuit if e['type']=='pcb_smtpad' and e['pcb_component_id']==pcb['pcb_component_id']]
ports=[e for e in circuit if e['type']=='source_port' and e['source_component_id']==source['source_component_id']]
expected={8:'IN2',9:'IN1',10:'UVLO',12:'OVP',13:'MODE',14:'N_SHDN',15:'RTN',17:'GND',18:'IMON',19:'ILIM',20:'dVdT',22:'N_FLT',23:'OUT2',24:'OUT1',25:'EP'}
for pin,label in expected.items():assert label in next(p for p in ports if p['pin_number']==pin)['port_hints']
assert len(pads)==25 and len(ports)==25
cad=next(e for e in circuit if e['type']=='cad_component' and e['pcb_component_id']==pcb['pcb_component_id'])
model_path=Path('references/tps26600-cad/RHF0024A.stp')
model=cq.importers.importStep(str(model_path)).val()
assert model.isValid() and len(model.Solids())==30
# TI RHF model has X=4, Y=5, Z=1 mm and the drawing's 2.65x3.65 thermal metal.
b=model.BoundingBox();assert max(abs(a-e) for a,e in zip([b.xmin,b.xmax,b.ymin,b.ymax,b.zmin,b.zmax],[-2,2,-2.5,2.5,0,1]))<1e-5
surface_z=next(e for e in circuit if e['type']=='pcb_board')['thickness']/2
registered=model.rotate((0,0,0),(0,0,1),90).translate((pcb['center']['x'],pcb['center']['y'],surface_z))
terminal_checks=[]
for terminal in model.Solids():
 b=terminal.BoundingBox()
 if b.zmax>.10001:continue
 metal=terminal.rotate((0,0,0),(0,0,1),90).translate((pcb['center']['x'],pcb['center']['y'],surface_z));b=metal.BoundingBox()
 matches=[pad for pad in pads if b.xmin>=pad['x']-pad['width']/2-.0005 and b.xmax<=pad['x']+pad['width']/2+.0005 and b.ymin>=pad['y']-pad['height']/2-.0005 and b.ymax<=pad['y']+pad['height']/2+.0005]
 assert len(matches)==1,(b.xmin,b.ymin,matches)
 terminal_checks.append({'physical_terminal_bounds_mm':[b.xmin,b.xmax,b.ymin,b.ymax,b.zmin,b.zmax],'imported_land_hints':matches[0]['port_hints']})
assert len(terminal_checks)==25
blob=Path('dist/scripts/power-candidate-audit/3d.glb').read_bytes();n=struct.unpack_from('<I',blob,12)[0];glb=json.loads(blob[20:20+n]);binary_offset=28+n
node=next(node for node in glb['nodes'] if node.get('name')=='AUDIT_C2155767');assert not any(k in node for k in ('rotation','scale','matrix'))
vertices=[]
for primitive in glb['meshes'][node['mesh']]['primitives']:
 accessor=glb['accessors'][primitive['attributes']['POSITION']];view=glb['bufferViews'][accessor['bufferView']];assert accessor['componentType']==5126
 positions=np.ndarray((accessor['count'],3),dtype='<f4',buffer=blob,offset=binary_offset+view.get('byteOffset',0)+accessor.get('byteOffset',0),strides=(view.get('byteStride',12),4)).astype(float)
 positions+=np.array(node.get('translation',[0,0,0]));vertices.append(np.column_stack((-positions[:,0],positions[:,2],positions[:,1])))
vertices=np.concatenate(vertices);b=registered.BoundingBox();bounds=np.array([[b.xmin,b.ymin,b.zmin],[b.xmax,b.ymax,b.zmax]]);max_error=float(np.abs(np.array([vertices.min(axis=0),vertices.max(axis=0)])-bounds).max());print("Expected and actual bounds", bounds.tolist(),[vertices.min(axis=0).tolist(),vertices.max(axis=0).tolist()],"error",max_error);assert max_error<.001
report={'part':'C2155767','result':'passed nominal manufacturer pin map, 25 contacts and rendered CAD registration','manufacturer_package':'RHF0024A','model_sha256':hashlib.sha256(model_path.read_bytes()).hexdigest(),'terminal_checks':terminal_checks,'rendered_bounds_error_mm':max_error,'footprint_definition_unchanged':True,'fabrication_ready':False,'production_tolerance_and_solder_paste_approval':'pending'}
(root/'MANUFACTURER-MODEL-AUDIT.json').write_text(json.dumps(report,indent=2)+'\n');print('TI RHF0024A: 25 metal contacts fit unchanged imported lands; actual GLB bounds agree within',max_error,'mm')
