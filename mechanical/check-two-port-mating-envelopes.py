"""Check conservative external mating envelopes, not substitute part models.

Public manufacturer catalogue dimensions bound the housing. Own-header overlap
is expected. All other components, carrier and fasteners must clear the envelope.
Cable selection is restricted to the documented envelope; physical fit is stage 7.
"""
import json, os, hashlib
from pathlib import Path
os.environ['XDG_CACHE_HOME'] = str(Path('.mechanical-cache').resolve())
import cadquery as cq
revision = json.loads(Path('package.json').read_text())['version']
evidence = Path('evidence/rev-' + revision)
board_audit = json.loads((evidence / 'FRONT-CARRIER-AUDIT.json').read_text())
assert board_audit['result'] == 'passed nominal envelope clearance'
tolerance = json.loads((evidence / 'CARRIER-TOLERANCE-SCREEN.json').read_text())
assert tolerance['passed_analytical_screen']
carrier = cq.importers.importStep('mechanical/assets/front-flange-carrier.step').val()
fasteners = cq.importers.importStep('mechanical/assets/carrier-fastener-envelopes.step').val()
# Bounds extend from the mating mouth outward, conservatively enclosing the
# catalogue housing and straight exit region. Never bend wires into the motor.
envelopes = [
 {'reference':'J_IO','mate':'SHR-10V-S, SSH-003T-P0.2-H; AWG28','bounds_mm':[[16,-1.6,-4.1],[23,9.6,-0.8]],'catalogue_housing_mm':[11,5,2.8],'source':'https://www.jst-mfg.com/product/pdf/eng/eSH.pdf','reviewed_pages':[1,2]},
 {'reference':'J_SWD','mate':'SHR-05V-S, SSH-003T-P0.2-H; AWG28','bounds_mm':[[16.9375,-10.2,-4.1],[23.9375,-4.0,-0.8]],'catalogue_housing_mm':[6,5,2.8],'source':'https://www.jst-mfg.com/product/pdf/eng/eSH.pdf','reviewed_pages':[1,2]},
 {'reference':'J_MOTOR','mate':'GHR-04V-S, SSHL-002T-P0.2; AWG26','bounds_mm':[[-5,13,0.8],[1.5,22,5.6]],'catalogue_housing_mm':[6.25,5.7,4.15],'source':'https://www.jst-mfg.com/product/pdf/eng/eGH.pdf','reviewed_pages':[1,3]},
 {'reference':'J_USB','mate':'POWER USB-C cable: overmold at most 11 mm wide and 7 mm thick','bounds_mm':[[-11.7,-43.8,-5.605],[-0.7,-18.79,1.395]],'scope':'Restricted cable envelope derived from actual registered connector mouth; no exact cable model claimed','source':'https://gct.co/connector/usb4110'},
 {'reference':'J_DATA','mate':'DATA USB-C cable: overmold at most 11 mm wide and 7 mm thick','bounds_mm':[[0.7,-43.8,-1.395],[11.7,-18.79,5.605]],'scope':'Restricted cable envelope derived from actual registered connector mouth; no exact cable model claimed','source':'https://gct.co/connector/usb4110'},
]
def box_from_bounds(bounds):
 lower,upper=bounds
 return cq.Workplane('XY').box(*(upper[i]-lower[i] for i in range(3)),centered=(False,False,False)).val().translate(tuple(lower))
results=[]
for entry in envelopes:
 box=box_from_bounds(entry['bounds_mm'])
 distances={'carrier':carrier.distance(box),'fasteners':fasteners.distance(box)}
 for component in board_audit['component_results']:
  if component['reference'] != entry['reference']:
   distances[component['reference']]=box.distance(box_from_bounds(component['rendered_bounds_mm']))
 minimum=min(distances.values())
 # Worst-case external mating envelopes include dimensional allowance already.
 # Add PCB half-tolerance plus nominal-model offset (.10), carrier machining (.05), assembly
 # registration (.15) and solder-height (.10) as an independent .40 mm budget.
 load_deflection_mm=tolerance['combined_load_deflection_screen_mm']
 margin=minimum-0.40-load_deflection_mm
 results.append({**entry,'nominal_minimum_clearance_mm':minimum,'limiting_neighbor':min(distances,key=distances.get),'additional_worst_case_allowance_mm':0.40,'load_deflection_screen_mm':load_deflection_mm,'remaining_clearance_mm':margin,'passed':margin>=0.15})
# Each USB cable has its own .40 mm registration/tolerance allowance.
# Keep the same independent load and minimum-clearance thresholds for pair fit.
pair_results=[]
for index,left in enumerate(envelopes):
 for right in envelopes[index+1:]:
  nominal=box_from_bounds(left['bounds_mm']).distance(box_from_bounds(right['bounds_mm']))
  allowance=0.80
  deflection=tolerance['combined_load_deflection_screen_mm']
  remaining=nominal-allowance-deflection
  pair_results.append({'left':left['reference'],'right':right['reference'],'nominal_clearance_mm':nominal,'combined_tolerance_allowance_mm':allowance,'load_deflection_screen_mm':deflection,'remaining_clearance_mm':remaining,'passed':remaining>=0.15})
report={'revision':revision,'scope':'Conservative external mating/straight-wire envelope clearance; actual plug CAD unavailable; own-header mating overlap excluded only','inputs':{'front_carrier_audit_sha256':hashlib.sha256((evidence/'FRONT-CARRIER-AUDIT.json').read_bytes()).hexdigest()},'results':results,'passed':all(row['passed'] for row in results) and all(row['passed'] for row in pair_results),'mating_pair_results':pair_results,'routing_authorized_by_this_check_alone':False,'physical_fit_tested':False,'cable_constraints':'Route wires straight outward beyond envelope before bending. Both USB overmolds <=11x7 mm; the previous single-port12mm allowance is superseded by the measured two-port envelope. No unrestricted cable/backdrive claim.'}
(evidence/'MATING-ENVELOPE-AUDIT.json').write_text(json.dumps(report,indent=2)+'\n')
for row in results:print(row['reference'],row['limiting_neighbor'],round(row['nominal_minimum_clearance_mm'],4),'mm nominal;',round(row['remaining_clearance_mm'],4),'mm after allowance')
assert report['passed'], 'Mating envelope or tolerance clearance failed; see audit'
