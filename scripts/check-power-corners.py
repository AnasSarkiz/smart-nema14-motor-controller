"""Repeatable analytical screens; explicitly distinguish assumptions from device limits."""
from pathlib import Path
import json, math
revision=json.loads(Path('package.json').read_text())['version']
old=json.loads(Path('evidence/rev-0.0.11-alpha.0/CURRENT-POWER-SCREEN.json').read_text())
peak=.325*1.05/old['shunts']['minimum_shunt_ohms']  # zero internal-resistance credit
def curve_at(v):
 d=json.loads(Path('references/capacitors/UMK107BBJ225KA-dc-bias.json').read_text());g=d['graphChartSetting']['graphs'][0]
 pts=sorted((float(r[g['xField']]),float(r[g['yField']])) for r in d['graphChartData'])
 for (a,b),(c,e) in zip(pts,pts[1:]):
  if a<=v<=c:return b+(e-b)*(v-a)/(c-a)
 raise ValueError(v)
# Engineering screen includes a separate 20% aging allowance for the MLCC.
# Vendor curves are typical, not guaranteed production limits.
cap_dvdt=2.2e-6*.9*.85*.8*(1+curve_at(1.0)/100)
cap_input=2.2e-6*.9*.85*.8*(1+curve_at(21.0)/100)
slew=5.5e-6*25.5/cap_dvdt
vm_caps_max=270e-6
# Current-limiting mode; the 24k point has no guaranteed +/-5% entry.
resistor_fraction=.01+100e-6*100
boot_range=[.5*.85/(1+resistor_fraction),.5*1.15/(1-resistor_fraction)]
high_range=[1*.95/(1+resistor_fraction),1*1.05/(1-resistor_fraction)]
# OVP uses precision top/bottom and standard small top resistors, 100 C TCR screen.
precision=.001+25e-6*100; standard=.01+100e-6*100
rtop_low=100000*(1-precision)+5700*(1-standard);rtop_high=100000*(1+precision)+5700*(1+standard)
bottom_low=6040*(1-precision);bottom_high=6040*(1+precision)
ovp=[1.17*(1+rtop_low/bottom_high)-100e-9*rtop_high,1.225*(1+rtop_high/bottom_low)+100e-9*rtop_high]
# FP datasheet 2025 permits -30% endurance change, and -10% after reflow.
# Cascading both allowances is deliberately conservative.
bulk_eol=200e-6*.8*.9*.7
rpm=300; external_inertia=.25e-6;rotor_inertia=1e-6
magnetic=.0288*peak**2
kinetic=.5*(rotor_inertia+external_inertia)*(rpm*2*math.pi/60)**2
energy=magnetic+kinetic
regen_voltage=math.sqrt(21**2+2*energy/bulk_eol)
# 120 Hz tan(delta) relation is a low-frequency screen, not HF ESR qualification.
low_freq_equiv_r=.24/(2*math.pi*120*bulk_eol)
low_freq_step=2*peak*low_freq_equiv_r
record={
 'revision':revision,'scope':'Analytical screens, not physical tests or USB certification','fabrication_ready':False,
 'intended_prototype_envelope':{'motor':'14HM11-0404S','pd_contract_voltages_v':[9,12,15,20],'preferred_motor_pd_v':[12,15],'maximum_source_v':21,'phase_peak_screen_a':peak,'maximum_rpm':rpm,'maximum_external_reflected_inertia_kg_m2':external_inertia,'continuous_overhauling_or_backdrive':'excluded','initial_5v_source_requirement':'USB-C PD charger/powered dock advertising >=1.5 A; legacy/default-current USB hosts not qualified','gpio_high_current_contract_min_a':1.5,'physical_limits_verified':False},
 'efuse':{'part':'C2155767','out_operating_limit_independent_of_vin_v':60,'out_abs_max_v':62,'mode':'current limiting with auto-retry; MODE to isolated RTN','r44_r45_each_ohms':24000,'bootstrap_current_screen_a':boot_range,'parallel_high_current_screen_a':high_range,'high_current_switch':'C20512 DMG1012T-7: max 0.5 ohm at VGS 2.5 V, 25 C; temperature curve is typical; <0.01% resistor-branch contribution with 2-ohm design allowance','ovp_worst_case_screen_v':ovp,'ovp_input_leakage_bound_a':100e-9,'dvdt_cap_f':2.2e-6,'dvdt_effective_screen_f':cap_dvdt,'fast_slew_screen_v_per_ms':slew/1000,'maximum_vm_cap_charge_screen_a':vm_caps_max*slew,'input_bypass_effective_typical_screen_f_at_21v':cap_input,'disconnect_rating_concern':'resolved by independent OUT rating; whole system limits remain 29 V or lower'},
 'regeneration':{'phase_independent_bound_j':magnetic,'rotor_plus_allowed_load_energy_j':kinetic,'returned_energy_j':energy,'minimum_bulk_screen_after_tolerance_reflow_and_endurance_f':bulk_eol,'lossless_vm_peak_v':regen_voltage,'lf_esr_screen_ohms':low_freq_equiv_r,'lf_resistive_step_v':low_freq_step,'peak_plus_lf_screen_v':regen_voltage+low_freq_step,'driver_operating_max_v':29,'high_frequency_parasitic_overshoot':'not included; native short power layout and prototype measurement required'},
 'startup':{'ap63203_soft_start_typ_ms':4,'datasheet_minimum_soft_start_ms':None,'buck_bootstrap_efficiency_guarantee':None,'legacy_100ma_pre_enumeration_compliance':'not established; not advertised','cold_start_contract_firmware':'not delivered or physically tested'},
 'sources':{'efuse':'https://www.ti.com/lit/ds/symlink/tps2660.pdf','bulk':'https://industrial.panasonic.com/cdbs/www-data/pdf/RDE0000/ABA0000C1184.pdf','mlcc':'https://ds.yuden.co.jp/TYCOMPAS/ut/detail?pn=MSASU168BB5225KTNA01&u=M','buck':'https://www.diodes.com/datasheet/download/AP63200-AP63201-AP63203-AP63205.pdf'},
 'remaining':['USB bootstrap/PD sequence and current budget','Typical MLCC curves and aging allowance are engineering screens, not guaranteed combined tolerance','High-frequency regeneration overshoot/ripple and thermal qualification','Critical routed power loops; current-carrying copper; firmware interlocks']}
assert ovp[0]>21 and ovp[1]<29
assert cap_input>=.1e-6
assert peak<.4 and energy<.004
assert regen_voltage+low_freq_step<29
Path(f'evidence/rev-{revision}/POWER-CORNER-SCREEN.json').write_text(json.dumps(record,indent=2)+'\n')
print('Analytical screens pass their stated bounds; startup, HF transients and firmware qualification remain explicit.')
print('OVP',ovp,'C_input effective screen',cap_input,'VM lossless/LF-screen',regen_voltage,regen_voltage+low_freq_step)
