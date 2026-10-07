"""Reproducible invalid fixtures against the unchanged copper/drill checker."""
import copy
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile

circuit_path, manifest_path, report_path = map(Path, sys.argv[1:4])
circuit = json.loads(circuit_path.read_text())
manifest = json.loads(manifest_path.read_text())
results = []
with tempfile.TemporaryDirectory(prefix='tmc-thermal-guards-') as directory:
    directory = Path(directory)
    for mutation in ('wrong_net', 'wrong_drill', 'unlisted_same_net_contact'):
        fixture = copy.deepcopy(circuit)
        declaration = copy.deepcopy(manifest)
        if mutation == 'wrong_net':
            declaration['vias'][0]['net'] = 'EFUSE_RTN'
        elif mutation == 'wrong_drill':
            declaration['vias'][0]['hole_diameter_mm'] = .31
        else:
            feature = declaration['vias'][0]
            via = next(row for row in fixture if row['type'] == 'pcb_via' and abs(row['x'] - feature['x']) < .00001 and abs(row['y'] - feature['y']) < .00001)
            fixture.append({**via, 'pcb_via_id': 'negative_unlisted_ordinary', 'x': feature['x'] + .2})
        fixture_path = directory / 'fixture.json'
        declaration_path = directory / 'manifest.json'
        checker_report_path = directory / 'report.json'
        fixture_path.write_text(json.dumps(fixture))
        declaration_path.write_text(json.dumps(declaration))
        result = subprocess.run([sys.executable, 'scripts/check-copper-geometry.py', str(fixture_path), str(checker_report_path), str(declaration_path)], capture_output=True, text=True, timeout=120)
        assert result.returncode != 0, f'Invalid {mutation} passed'
        if mutation == 'wrong_net':
            assert 'Thermal via has the wrong electrical net' in result.stderr
        elif mutation == 'wrong_drill':
            assert 'Thermal drill or annulus differs' in result.stderr
        else:
            checker_report = json.loads(checker_report_path.read_text())
            assert any(row.get('via') == 'negative_unlisted_ordinary' and row['check'] == 'via_drill_to_pad_mm' and row['same_net'] for row in checker_report['violations'])
        results.append({'invalid_fixture': mutation, 'rejected': True})
report_path.write_text(json.dumps({'input': str(circuit_path), 'sha256': hashlib.sha256(circuit_path.read_bytes()).hexdigest(), 'unchanged_checker': 'scripts/check-copper-geometry.py', 'results': results, 'passed': True}, indent=2) + '\n')
print(json.dumps(results))
