"""Compare strict native Gerber vector geometry with canonical native copper.

Requires optional diagnostic PyGerber 2.4.3 and Shapely 2.1.2. This measures
exported files without changing them. It does not qualify mask, paste, impedance,
net ownership, copper plating, thermal behavior or assembler acceptance.
"""
import hashlib
import json
import runpy
import sys
from pathlib import Path

from pygerber.gerberx3.api.v2 import GerberFile, OnParserErrorEnum
from shapely import affinity
from shapely.geometry import Point
from shapely.ops import unary_union

circuit_path, export_folder, report_path = map(Path, sys.argv[1:4])
canonical_sha256 = hashlib.sha256(circuit_path.read_bytes()).hexdigest()
read_svg = runpy.run_path(str(Path(__file__).with_name('read-gerber-svg.py')))['read_gerber_svg']
sys.argv = ['check-filled-copper.py', str(circuit_path), str(report_path.with_name('CAM-SOURCE-COPPER.json'))]
source_geometry = runpy.run_path(str(Path(__file__).with_name('check-filled-copper.py')), run_name='gerber_source_geometry')
assert not source_geometry['violations'], 'Canonical copper prerequisites fail'
drills = unary_union([Point(element['x'], element['y']).buffer(element['hole_diameter']/2, quad_segs=128)
                     for element in source_geometry['circuit'] if element['type'] in ('pcb_via', 'pcb_hole')])
layers = []
# 0.002mm is 2um; record this explicit comparison allowance separately from
# unchanged 0.15mm board clearances. It covers boundary/curve serialization.
comparison_allowance_mm = .002
for filename, layer in [('F_Cu.gbr', 'top'), ('In1_Cu.gbr', 'inner1'), ('In2_Cu.gbr', 'inner2'), ('B_Cu.gbr', 'bottom')]:
    gerber_path = export_folder / filename
    parsed = GerberFile.from_file(gerber_path).parse(on_parser_error=OnParserErrorEnum.Raise)
    bounds = parsed.get_info()
    svg_path = report_path.parent / (filename + '.svg')
    parsed.render_svg(svg_path)
    diagnostics = {}
    actual = read_svg(svg_path, diagnostics)
    actual = affinity.scale(actual, yfact=-1, origin=(0, 0))
    actual = affinity.translate(actual, float(bounds.min_x_mm), float(bounds.max_y_mm)).difference(drills)
    expected = unary_union([conductor['shape'] for conductor in source_geometry['conductors'] if conductor['layer'] == layer]).difference(drills)
    missing = expected.difference(actual.buffer(comparison_allowance_mm))
    extra = actual.difference(expected.buffer(comparison_allowance_mm))
    net_losses = []
    for net_key, net_name in source_geometry['net_names'].items():
        native_net = unary_union([conductor['shape'] for conductor in source_geometry['conductors']
                                if conductor['layer'] == layer and conductor['net'] == net_key]).difference(drills)
        loss = native_net.intersection(missing)
        if loss.area > 0:
            net_losses.append({'net': net_name, 'missing_mm2': loss.area, 'bounds_mm': list(loss.bounds)})
    layers.append({'file': filename, 'layer': layer, 'source_sha256': hashlib.sha256(gerber_path.read_bytes()).hexdigest(),
                   'expected_mm2': expected.area, 'actual_mm2': actual.area,
                   'missing_mm2_after_2um_coordinate_allowance': missing.area,
                   'extra_mm2_after_2um_coordinate_allowance': extra.area,
                   'net_losses': net_losses, 'svg_diagnostics': diagnostics})
assert hashlib.sha256(circuit_path.read_bytes()).hexdigest() == canonical_sha256, 'Circuit input changed during CAM measurement'
report = {'canonical_sha256': canonical_sha256, 'parser': 'PyGerber 2.4.3; Raise on parser errors; ordered dark/clear vector masks',
          'comparison_allowance_mm': comparison_allowance_mm, 'scope': __doc__, 'layers': layers,
          'geometry_comparison_passed': all(layer['missing_mm2_after_2um_coordinate_allowance'] == 0 and
                                            layer['extra_mm2_after_2um_coordinate_allowance'] == 0 for layer in layers),
          'prototype_fabrication_ready': False}
report_path.write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps({'geometry_comparison_passed': report['geometry_comparison_passed'], 'layers': layers}))
sys.exit(0 if report['geometry_comparison_passed'] else 1)
