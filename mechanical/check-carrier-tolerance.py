"""Analytical carrier/tolerance screen for declared prototype loading only.
Not FEA, a material certificate, fatigue approval, or physical strength test.
"""
import json, math
from pathlib import Path
revision=json.loads(Path('package.json').read_text())['version']
evidence=Path('evidence/rev-'+revision)
# Bound a single long rail and short boss arm as independent cantilevers in series.
# Any one of the four direct rails carries the full declared 20 N load.
# Use minimum section dimensions after machining allowance, weak bending axis.
modulus_mpa=69000
minimum_yield_mpa=240
load_total_n=20
rail_side_mm=5.9
rail_length_mm=38
rail_second_moment_mm4=rail_side_mm**4/12
rail_load_n=load_total_n
rail_deflection_mm=rail_load_n*rail_length_mm**3/(3*modulus_mpa*rail_second_moment_mm4)
rail_stress_mpa=rail_load_n*rail_length_mm*(rail_side_mm/2)/rail_second_moment_mm4
return_width_mm=4.9
return_thickness_mm=3.9
return_length_mm=6.4
return_second_moment_mm4=return_width_mm*return_thickness_mm**3/12
return_load_n=load_total_n
return_deflection_mm=return_load_n*return_length_mm**3/(3*modulus_mpa*return_second_moment_mm4)
return_stress_mpa=return_load_n*return_length_mm*(return_thickness_mm/2)/return_second_moment_mm4
# Conservative one-dimensional FR4 beam screen; modulus is an engineering
# lower allowance, not an established laminate material guarantee.
pcb_modulus_mpa=18000
pcb_thickness_mm=1.56*(1-.10)
pcb_width_mm=35
pcb_span_mm=30.6
pcb_second_moment_mm4=pcb_width_mm*pcb_thickness_mm**3/12
pcb_deflection_mm=load_total_n*pcb_span_mm**3/(48*pcb_modulus_mpa*pcb_second_moment_mm4)
combined_deflection_mm=rail_deflection_mm+return_deflection_mm+pcb_deflection_mm
m2_engagement_mm=[4.8-1.56*1.1-.55-.05,5.2-1.56*.9-.45+.05]
m3_penetration_mm=[5.8-3.05,6.2-2.95]
report={'revision':revision,'scope':'Independent cantilever/PCB beam engineering screen, not FEA, guaranteed laminate properties, fatigue or hardware test','material':'6061-T6/T651 machined monolithic carrier; no welding','source':'https://d2zo35mdb530wx.cloudfront.net/_legacy/UCPthyssenkruppBAMXUK/assets.files/material-data-sheets/aluminium/aluminium-6061.pdf','source_pages':[2,3],'youngs_modulus_screen_mpa':modulus_mpa,'minimum_yield_mpa':minimum_yield_mpa,'external_board_and_cable_load_total_limit_n':load_total_n,'rail_stress_mpa':rail_stress_mpa,'return_stress_mpa':return_stress_mpa,'stress_safety_factor':minimum_yield_mpa/max(rail_stress_mpa,return_stress_mpa),'rail_deflection_mm':rail_deflection_mm,'return_deflection_mm':return_deflection_mm,'pcb_deflection_mm':pcb_deflection_mm,'combined_load_deflection_screen_mm':combined_deflection_mm,'m2_engagement_mm':m2_engagement_mm,'minimum_thread_depth_mm':4.45,'m3_motor_penetration_mm':m3_penetration_mm,'motor_minimum_available_thread_depth_mm':4,'minimum_m2_radial_bore_clearance_mm':.25,'mount_axis_misregistration_allowance_mm':.15,'pcb_mount_hole_pitch_mm':30.5,'hardware_constraints':'M2x5 length 5 +/-0.2 mm; head <=3.8 mm diameter x1.6 mm high; custom washer OD4.5/ID2.2/thickness0.50 +/-0.05 mm. M3x6 head <=5.5x3 mm. Retention/torque must be physically qualified. Hardware within these envelopes only.','passed_analytical_screen':minimum_yield_mpa/max(rail_stress_mpa,return_stress_mpa)>4 and combined_deflection_mm<.16 and m2_engagement_mm[1]<4.45 and m3_penetration_mm[1]<4,'physical_fit_or_strength_tested':False}
(evidence/'CARRIER-TOLERANCE-SCREEN.json').write_text(json.dumps(report,indent=2)+'\n')
print('Combined deflection screen',round(combined_deflection_mm,4),'mm; section stress safety factor',round(report['stress_safety_factor'],2))
assert report['passed_analytical_screen'], report
