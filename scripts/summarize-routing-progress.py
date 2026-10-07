"""Report actual native and independent physical results without waiving opens."""
import hashlib
import json
import sys
from pathlib import Path

native_path, strict_path, physical_path, output_path = map(Path, sys.argv[1:])
native_bytes = native_path.read_bytes()
circuit = json.loads(native_bytes)
strict = json.loads(strict_path.read_text())
physical = json.loads(physical_path.read_text())
sha256 = hashlib.sha256(native_bytes).hexdigest()
assert strict['input_sha256'] == physical['sha256'] == sha256
required = list(physical['physical_islands'])
complete = [name for name in required
            if physical['physical_islands'][name]['physical_components'] == 1]
errors = [entry for entry in circuit if 'error' in entry['type']]
opens = [entry for entry in errors if entry['type'] == 'pcb_port_not_connected_error']
report = {
    'scope': 'Measured native copper and every required purchased-terminal network. Opens remain qualification failures; this progress report does not approve fabrication.',
    'canonical_sha256': sha256,
    'required_net_count': len(required),
    'complete_physical_net_count': len(complete),
    'remaining_required_net_count': len(required) - len(complete),
    'native_open_port_errors': len(opens),
    'other_native_errors': len(errors) - len(opens),
    'trace_count': sum(entry['type'] == 'pcb_trace' for entry in circuit),
    'via_count': sum(entry['type'] == 'pcb_via' for entry in circuit),
    'pour_count': sum(entry['type'] == 'pcb_copper_pour' for entry in circuit),
    'strict_copper_passed': strict['passed'],
    'filled_copper_clearances_passed': physical['clearances_passed'],
    'all_required_physical_nets_complete': len(complete) == len(required),
    'complete_nets': complete,
    'remaining_nets': [name for name in required if name not in complete],
    'hardware_tested': False,
    'prototype_fabrication_ready': False,
}
output_path.write_text(json.dumps(report, indent=2) + '\n')
print(f'{len(complete)}/{len(required)} physically complete; {len(opens)} native opens; '
      f'{len(errors) - len(opens)} other native errors. Fabrication ready: NO.')
