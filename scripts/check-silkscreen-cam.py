"""Measure native production silkscreen and isolated board-owned connector text.

Uses optional PyGerber 2.4.3/Shapely 2.1.2 diagnostics. Reports supplier defects
without editing imports, Circuit JSON, Gerbers or manufacturing thresholds.
"""
import hashlib
import json
import re
import runpy
import sys
from pathlib import Path

from pygerber.gerberx3.api.v2 import GerberFile, OnParserErrorEnum
from shapely import affinity
from shapely.geometry import box

circuit_path, cam_folder, legend_circuit_path, legend_cam_folder, report_path = map(Path, sys.argv[1:6])
circuit = json.loads(circuit_path.read_text())
legend_circuit = json.loads(legend_circuit_path.read_text())
read_svg = runpy.run_path(str(Path(__file__).with_name('read-gerber-svg.py')))['read_gerber_svg']
file_hashes = {}


def measure_native_layer(path):
    file_hashes[str(path)] = hashlib.sha256(path.read_bytes()).hexdigest()
    parsed = GerberFile.from_file(path).parse(on_parser_error=OnParserErrorEnum.Raise)
    bounds = parsed.get_info()
    svg_path = report_path.parent / (path.parent.name + '-' + path.name + '.svg')
    parsed.render_svg(svg_path)
    shape = read_svg(svg_path)
    return affinity.translate(affinity.scale(shape, yfact=-1, origin=(0, 0)),
                              float(bounds.min_x_mm), float(bounds.max_y_mm))


def text_identity(element):
    return {key: element[key] for key in ('text', 'anchor_position', 'anchor_alignment',
                                        'font_size', 'layer', 'ccw_rotation')}


def screen_clearance(silk, mask):
    return {'mask_clearance_mm': silk.distance(mask),
            'ink_within_0_15mm_mask_clearance_mm2': silk.intersection(mask.buffer(.15)).area,
            'ink_outside_outline_mm2': silk.difference(outline).area}


board = next(element for element in circuit if element['type'] == 'pcb_board')
outline = box(board['center']['x'] - board['width']/2, board['center']['y'] - board['height']/2,
              board['center']['x'] + board['width']/2, board['center']['y'] + board['height']/2)
assert not any(element['type'] in ('pcb_smtpad', 'pcb_trace', 'pcb_via', 'pcb_copper_pour')
               for element in legend_circuit), 'Owned-text fixture contains copper'
owned_texts = [text_identity(element) for element in circuit
               if element['type'] == 'pcb_silkscreen_text' and not element.get('pcb_component_id')]
fixture_texts = [text_identity(element) for element in legend_circuit if element['type'] == 'pcb_silkscreen_text']
assert len(owned_texts) == 4 and sorted(owned_texts, key=lambda element: element['text']) == \
    sorted(fixture_texts, key=lambda element: element['text']), 'Fixture does not match canonical owned text'
production_layers = []
for side in ('F', 'B'):
    silk = measure_native_layer(cam_folder / (side + '_SilkScreen.gbr'))
    mask = measure_native_layer(cam_folder / (side + '_Mask.gbr'))
    production_layers.append({'layer': side, **screen_clearance(silk, mask)})
    if side == 'F':
        owned_ink = measure_native_layer(legend_cam_folder / 'F_SilkScreen.gbr')
        assert owned_ink.difference(silk.buffer(.002)).area == 0, 'Production CAM omits owned text'
        owned_clearance = screen_clearance(owned_ink, mask)
        # The isolated text export uses one circular pen aperture, measured from
        # the native CAM rather than assuming the alphabet's source scaling.
        pens = [float(width) for width in re.findall(r'%ADD\d+C,([\d.]+)\*%',
                                                     (legend_cam_folder / 'F_SilkScreen.gbr').read_text())]
        assert pens and min(pens) >= .15, 'Owned text has an undersized native CAM pen'
thin_supplier_paths = [{'id': element.get('pcb_silkscreen_path_id'),
                        'pcb_component_id': element.get('pcb_component_id'),
                        'stroke_width_mm': element['stroke_width']}
                       for element in circuit if element['type'] == 'pcb_silkscreen_path'
                       and element['stroke_width'] < .15]
owned_passed = all(owned_clearance[key] == 0 for key in
                   ('ink_within_0_15mm_mask_clearance_mm2', 'ink_outside_outline_mm2'))
production_passed = not thin_supplier_paths and all(layer[key] == 0 for layer in production_layers
                        for key in ('ink_within_0_15mm_mask_clearance_mm2', 'ink_outside_outline_mm2'))
report = {'canonical_sha256': hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
          'legend_fixture_sha256': hashlib.sha256(legend_circuit_path.read_bytes()).hexdigest(),
          'scope': __doc__, 'file_sha256': file_hashes,
          'owned_connector_texts': owned_texts, 'owned_text_pen_widths_mm': pens,
          'owned_text_clearance': owned_clearance, 'owned_text_passed': owned_passed,
          'production_layers': production_layers, 'native_supplier_paths_below_0_15mm': thin_supplier_paths,
          'production_silkscreen_passed': production_passed, 'prototype_fabrication_ready': False}
report_path.write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'owned_text_passed': owned_passed, 'owned_text_clearance': owned_clearance,
                  'production_silkscreen_passed': production_passed, 'production_layers': production_layers,
                  'thin_supplier_path_count': len(thin_supplier_paths)}))
sys.exit(0 if owned_passed and production_passed else 1)
