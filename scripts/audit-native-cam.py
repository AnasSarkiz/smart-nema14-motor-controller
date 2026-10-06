"""Check direct tsci export identity, drill hits and assembly population; never approve CAM."""
import csv
import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path


def drill_hits(path):
    tools = {}
    hits = []
    tool = None
    for line in path.read_text().splitlines():
        match = re.fullmatch(r'T(\d+)C([\d.]+)', line)
        if match:
            tools[int(match[1])] = float(match[2])
            continue
        match = re.fullmatch(r'T(\d+)', line)
        if match:
            tool = int(match[1])
            continue
        match = re.fullmatch(r'X(-?[\d.]+)Y(-?[\d.]+)', line)
        if match:
            hits.append((round(float(match[1]), 4), round(float(match[2]), 4), round(tools[tool], 6)))
        elif line.startswith(('X', 'Y', 'G85', 'G00', 'G01')):
            raise ValueError(f'Unreviewed drill/slot command in {path}: {line}')
    return hits


circuit_path, export_folder, report_path = map(Path, sys.argv[1:4])
circuit = json.loads(circuit_path.read_text())
components = {e['source_component_id']: e for e in circuit if e['type'] == 'source_component'}
placements = {components[e['source_component_id']]['name']: e for e in circuit if e['type'] == 'pcb_component' and e['source_component_id'] in components}
fitted = {ref for ref, placement in placements.items() if not placement.get('do_not_place', False)}
violations = []
drills = []
for filename, kind in [('drill-L1-L4.drl', 'pcb_via'), ('drill_npth.drl', 'pcb_hole')]:
    actual = drill_hits(export_folder / filename)
    expected = [(round(e['x'], 4), round(e['y'], 4), round(e['hole_diameter'], 6)) for e in circuit if e['type'] == kind]
    if Counter(actual) != Counter(expected) or len(actual) != len(set(actual)):
        violations.append({'file': filename, 'check': 'exact_unique_drill_hits'})
    drills.append({'file': filename, 'actual_hits': len(actual), 'expected_hits': len(expected), 'duplicate_hits': len(actual)-len(set(actual)), 'exact_source_match': Counter(actual) == Counter(expected)})
with (export_folder / 'bom.csv').open(newline='') as stream:
    bom = list(csv.DictReader(stream))
with (export_folder / 'pick_and_place.csv').open(newline='') as stream:
    pnp = list(csv.DictReader(stream))
for filename, rows in [('bom.csv', bom), ('pick_and_place.csv', pnp)]:
    references = [row['Designator'] for row in rows]
    if set(references) != fitted or len(references) != len(fitted):
        violations.append({'file': filename, 'check': 'exact_default_population', 'missing': sorted(fitted-set(references)), 'extra': sorted(set(references)-fitted)})
for row in bom:
    source = components[placements[row['Designator']]['source_component_id']]
    if row['JLCPCB Part #'] not in source['supplier_part_numbers']['jlcpcb']:
        violations.append({'reference': row['Designator'], 'check': 'supplier_identity'})
for row in pnp:
    placement = placements[row['Designator']]
    if any(abs(float(row[column])-placement['center'][axis]) > 0.000501 for column, axis in [('Mid X', 'x'), ('Mid Y', 'y')]) or row['Layer'] != placement['layer']:
        violations.append({'reference': row['Designator'], 'check': 'placement_position_layer'})
required = ['F_Cu.gbr', 'In1_Cu.gbr', 'In2_Cu.gbr', 'B_Cu.gbr', 'Edge_Cuts.gbr', 'F_Mask.gbr', 'B_Mask.gbr', 'F_Paste.gbr', 'B_Paste.gbr', 'F_SilkScreen.gbr', 'B_SilkScreen.gbr']
for filename in required:
    contents = (export_folder / filename).read_text()
    if '%FS' not in contents or 'M02*' not in contents:
        violations.append({'file': filename, 'check': 'gerber_structure'})
log = (export_folder.parent / 'NATIVE-GERBERS-EXPORT.log').read_text()
unverified_rotations = re.findall(r'^([^:\n]+): cannot verify jlcpcb pick-and-place rotation', log, re.MULTILINE)
report = {
    'canonical_sha256': hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
    'export_method': 'Pinned tsci export directly from the unchanged canonical Circuit JSON, --format gerbers; no KiCad conversion, replacement router or generated-JSON edits.',
    'drills': drills, 'source_references': len(placements), 'default_fitted_references': len(fitted),
    'dnp_references': sorted(set(placements)-fitted), 'bom_rows': len(bom), 'pick_and_place_rows': len(pnp),
    'unverified_supplier_rotations': unverified_rotations, 'violations': violations,
    'drill_population_identity_checks_passed': not violations,
    'full_cam_review_complete': False, 'prototype_fabrication_ready': False,
    'remaining': ['Supplier/CAM approval of named small filled/capped vias, plating and exact stackup', 'Complete copper/outline/mask/paste Gerber geometry and assembler orientation review', 'Silkscreen cleanup', 'Complete loaded power paths, via current and thermal qualification'],
    'files': [{'path': str(path), 'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()} for path in sorted(export_folder.iterdir()) if path.is_file()],
}
report_path.write_text(json.dumps(report, indent=2) + '\n')
print(f"Drill/population identity: {'PASS' if not violations else 'FAIL'}; {len(fitted)} fitted references; {len(unverified_rotations)} unverified supplier orientations; fabrication readiness: NO")
sys.exit(0 if not violations else 1)
