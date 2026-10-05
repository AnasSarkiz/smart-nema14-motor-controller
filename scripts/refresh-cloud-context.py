"""Inventory the checked handoff files; run after final edits and before commit."""
import hashlib
import json
import subprocess
from pathlib import Path

repository = Path(__file__).resolve().parent.parent
manifest_path = 'docs/cloud/CONTEXT-MANIFEST.json'
paths = subprocess.check_output(['git', 'ls-files', '-z'], cwd=repository).decode().split('\0')
files = []
for relative_path in sorted(set(paths)):
    if not relative_path or relative_path == manifest_path:
        continue
    path = repository / relative_path
    with path.open('rb') as stream:
        digest = hashlib.file_digest(stream, 'sha256').hexdigest()
    files.append({'path': relative_path, 'bytes': path.stat().st_size, 'sha256': digest})
circuit = json.loads((repository / 'dist/index/circuit.json').read_text())
counts = {kind: sum(element['type'] == kind for element in circuit)
          for kind in ['pcb_trace', 'pcb_via', 'pcb_copper_pour',
                       'pcb_port_not_connected_error', 'pcb_trace_error']}
manifest = {'revision': json.loads((repository / 'package.json').read_text())['version'],
            'source_identity': 'The Git commit containing this manifest identifies the source, evidence and checked build.',
            'scope': 'Every tracked file except this self-referential manifest; archived routing evidence has its own per-file inventory.',
            'circuit_counts': counts, 'files': files}
(repository / manifest_path).write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Inventoried {len(files)} exact files for {manifest["revision"]}')
