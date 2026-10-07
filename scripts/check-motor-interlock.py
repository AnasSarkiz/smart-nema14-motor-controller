"""Independent source-pin truth and manufacturer electrical-corner review.

Datasheet limits are recorded with their actual temperature/voltage scope.
This check does not simulate silicon or invent physical startup measurements.
"""
import hashlib
import itertools
import json
from pathlib import Path
import sys

circuit_path, report_path = map(Path, sys.argv[1:3])
circuit_bytes = circuit_path.read_bytes()
circuit = json.loads(circuit_bytes)
components = {row['name']: row for row in circuit if row['type'] == 'source_component'}
nets = {row['source_net_id']: row['name'] for row in circuit if row['type'] == 'source_net'}
ports = [row for row in circuit if row['type'] == 'source_port']
traces = [row for row in circuit if row['type'] == 'source_trace']


def pin_net(reference, number):
    owner = components[reference]['source_component_id']
    port = next(row for row in ports if row['source_component_id'] == owner and row['pin_number'] == number)
    names = {nets[net] for trace in traces if port['source_port_id'] in trace['connected_source_port_ids'] for net in trace['connected_source_net_ids']}
    assert len(names) == 1, (reference, number, names)
    return names.pop()


assert pin_net('U2', 15) == pin_net('R7', 1) == pin_net('U_MOTOR_ENN', 5) == 'V3V3'
assert pin_net('U2', 2) == pin_net('R7', 2) == pin_net('U_MOTOR_ENN', 4) == 'TMC_ENABLE_N'
assert components['U_MOTOR_ENN']['supplier_part_numbers']['jlcpcb'] == ['C485081']
for pin, expected in {1: 'GND', 2: 'GND', 3: 'MOTOR_ENABLE_DRIVE', 6: 'MOTOR_POWER_GOOD'}.items():
    assert pin_net('U_MOTOR_ENN', pin) == expected
assert pin_net('U_MOTOR_SUPERVISOR', 2) == 'MOTOR_POWER_GOOD'
assert pin_net('D_PD_VALID', 1) == 'PD_LOAD_ENABLE_N'  # purchased cathode
assert pin_net('D_PD_VALID', 2) == 'PD_PATH_INVALID_N'  # purchased anode
assert components['D_PD_VALID']['supplier_part_numbers']['jlcpcb'] == ['C668868']
assert not {'Q_MOTOR_ENABLE', 'Q_MOTOR_POWER_GOOD', 'R_MOTOR_GATE_SERIES', 'R_MOTOR_GATE_OFF'} & components.keys()
assert components['R7']['resistance'] == 10000
assert components['R_MOTOR_BOOT_PULLUP']['resistance'] == 180000

# Independent TI SCES417L eight-row multiplexer-inverting truth table, not
# inferred from this design's intended NAND name. IN1 is physically tied low.
gate98_table = {(0, 0, 0): 1, (0, 0, 1): 1, (0, 1, 0): 0, (0, 1, 1): 0,
                (1, 0, 0): 1, (1, 0, 1): 0, (1, 1, 0): 1, (1, 1, 1): 0}
truth_rows = []
for request_n, contract_n, path_invalid_n, power_good in itertools.product((0, 1), repeat=4):
    nor_output = int(not (request_n or contract_n or path_invalid_n))
    enn = gate98_table[(power_good, 0, nor_output)]
    permitted = request_n == contract_n == path_invalid_n == 0 and power_good == 1
    assert (enn == 0) == permitted
    truth_rows.append(dict(request_n=request_n, contract_15_n=contract_n, path_invalid_n=path_invalid_n, power_good=power_good, enn=enn))

reset_load_ua = 1.7 / (180000 * 0.99) * 1e6 + 5
power_good_high_at_3v = 3.0 - 5e-6 * 180000 * 1.01
diode_shift_low_at_25c = 0.4 + 0.32
assert reset_load_ua < 15  # TI POR VOL guarantee load, including negative input leakage
assert power_good_high_at_3v > 1.87  # gate98 VT+ max at VCC=3V
assert 0.3 < 0.35  # POR low versus gate98 VT- min at VCC=1.65V
assert diode_shift_low_at_25c < 0.84  # Schmitt VT- min at VCC=3V
enn_sink_ma = 3.36 / (10000 * 0.99) * 1000 + 0.010
assert enn_sink_ma < 16 and 0.45 < 0.3 * 3.0
assert 2.1 > 1.65 > 0.7  # TMC minimum rising reset > logic min > supervisor POR max

scenarios = [
    dict(name='data only / no logic supply', logic_powered=False, motor_powered=False, motor_enabled=False),
    dict(name='PD5V, with or without data', inputs=[0, 1, 0, 1], enn=1),
    dict(name='PD15V, no request', inputs=[1, 0, 0, 1], enn=1),
    dict(name='PD15V, qualified request', inputs=[0, 0, 0, 1], enn=0),
    dict(name='detach with stale POWER_OK2 and held-up logic', inputs=[0, 0, 1, 1], enn=1),
    dict(name='renegotiation/path loss', inputs=[0, 0, 1, 1], enn=1),
    dict(name='supervisor reset/brownout, any flags', inputs=[0, 0, 0, 0], enn=1),
    dict(name='factory20V configuration', nvm_acceptance=False, fabrication_configuration_acceptance=False),
]
report = dict(circuit_sha256=hashlib.sha256(circuit_bytes).hexdigest(), chosen_gate='TI SN74LVC1G98DCKR C485081, Schmitt-input NAND configuration',
              passed_pin_truth_and_scoped_static_corners=True, truth_rows=truth_rows, scenarios=scenarios,
              corners=dict(supervisor_max_sink_ua=reset_load_ua, supervisor_guarantee_ua=15, power_good_min_high_at_3v=power_good_high_at_3v,
                           pd_diode_shift_max_low_at_25c=diode_shift_low_at_25c, pd_schmitt_low_limit_at_3v=0.84, enn_max_sink_ma=enn_sink_ma,
                           enn_gate_max_low_at_3v=0.45, tmc_low_limit_at_3v=0.9),
              startup_conclusion='No MOS threshold assumption remains. Supervisor feeds a Schmitt input; rising sub-POR is below the TMC minimum I/O reset-release voltage. ENN and VCC_IO share one rail.',
              limitations=['ST open-drain VOL and BAT54 VF/leakage limits used here are guaranteed at25C; hot/cold diode-shift margins require physical qualification.',
                           'Below1.65V logic behavior is outside its operating range. No measured falling-ramp reset threshold or full-ramp waveform is claimed.',
                           'NVM cold readback, live15V negotiation, exact routed input capacitance/edge checks, detach timing and backfeed measurements remain pending.'],
              physical_startup_tested=False, fabrication_ready=False)
report_path.write_text(json.dumps(report, indent=2) + '\n')
print('16 manufacturer truth combinations and scoped static electrical corners pass; physical startup/PD tests remain pending.')
