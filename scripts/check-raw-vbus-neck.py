"""Screen the known RAW VBUS neck in emitted copper; not full power qualification."""
import hashlib
import json
import sys
from pathlib import Path

from shapely.geometry import LineString, Polygon
from shapely.ops import unary_union


def measure_neck(circuit):
    net_names = {
        entry['source_net_id']: entry['name']
        for entry in circuit if entry['type'] == 'source_net'
    }
    polygons = []
    for entry in circuit:
        if (entry['type'] != 'pcb_copper_pour'
                or entry['layer'] != 'inner1'
                or net_names[entry['source_net_id']] != 'VBUS_CONN'):
            continue
        brep = entry['brep_shape']
        polygons.append(Polygon(
            [(point['x'], point['y']) for point in brep['outer_ring']['vertices']],
            [[(point['x'], point['y']) for point in ring['vertices']]
             for ring in brep['inner_rings']],
        ))
    assert polygons, 'No emitted RAW VBUS inner1 copper'
    copper = unary_union(polygons)
    samples = []
    for index in range(801):
        x_mm = -3.5 + index * .001
        cut = copper.intersection(LineString([(x_mm, -17.2), (x_mm, -14.9)]))
        segments = list(cut.geoms) if cut.geom_type == 'MultiLineString' else [cut]
        lower = [segment for segment in segments
                 if not segment.is_empty and abs(segment.bounds[1] + 17.2) < .00002]
        assert len(lower) == 1, 'RAW neck does not reach its recorded lower boundary'
        samples.append({'x_mm': x_mm, 'width_mm': lower[0].length})
    return min(samples, key=lambda sample: sample['width_mm'])


def main():
    input_path, output_path = map(Path, sys.argv[1:])
    minimum = measure_neck(json.loads(input_path.read_text()))
    copper_thickness_mm = .0152
    assumed_rise_c = 30
    worst_case_limit_a = 1.0714
    area_square_mil = minimum['width_mm'] / .0254 * copper_thickness_mm / .0254
    screened_capacity_a = .024 * assumed_rise_c ** .44 * area_square_mil ** .725
    report = {
        'input': str(input_path),
        'sha256': hashlib.sha256(input_path.read_bytes()).hexdigest(),
        'scope': '0.001 mm vertical slices across the recorded RAW VBUS lower neck, x=-3.5..-2.7 mm. Does not qualify other necks, pads, vias, thermal spreading or transients.',
        'minimum': minimum,
        'inner_copper_thickness_mm': copper_thickness_mm,
        'assumed_temperature_rise_c': assumed_rise_c,
        'analytical_model': 'IPC-2221 inner-layer k=0.024; I=k*dT^0.44*A_mil2^0.725, screening estimate only',
        'screened_capacity_a': screened_capacity_a,
        'worst_case_efuse_limit_a': worst_case_limit_a,
        'screen_passed': screened_capacity_a >= worst_case_limit_a,
        'hardware_tested': False,
        'fabrication_ready': False,
    }
    output_path.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report))
    return 0 if report['screen_passed'] else 1


if __name__ == '__main__':
    sys.exit(main())
