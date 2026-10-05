"""Verify that a fresh checkout contains the exact Cloud handoff artifacts."""
import hashlib
import json
from pathlib import Path

repository = Path(__file__).resolve().parent.parent
manifest = json.loads((repository / 'docs/cloud/CONTEXT-MANIFEST.json').read_text())
paths = {entry['path'] for entry in manifest['files']}
for required in ['index.circuit.tsx', 'src/SmartNema14MotorController.tsx',
                 'bun.lock', 'package.json', 'AGENTS.md', 'CLOUD_HANDOFF.md',
                 'docs/cloud/TASK.md', 'dist/index/circuit.json',
                 'src/routing/power-guarded-paths-trial.json']:
    assert required in paths, f'Missing required context inventory: {required}'
for entry in manifest['files']:
    path = repository / entry['path']
    assert path.is_file(), f'Missing context file: {entry["path"]}'
    with path.open('rb') as stream:
        digest = hashlib.file_digest(stream, 'sha256').hexdigest()
    assert digest == entry['sha256'], f'Context checksum mismatch: {entry["path"]}'
with (repository / 'dist/index/circuit.json').open() as stream:
    circuit = json.load(stream)
counts = {kind: sum(element['type'] == kind for element in circuit)
          for kind in ['pcb_trace', 'pcb_via', 'pcb_copper_pour',
                       'pcb_port_not_connected_error', 'pcb_trace_error']}
assert counts == manifest['circuit_counts'], 'Checked circuit status differs'
print(f'Verified {len(paths)} context files; native errors retained: {counts}')
