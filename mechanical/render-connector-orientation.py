"""Render actual exported connector meshes and verify they match current placement.

The images support a manual mouth-direction review, not an automated mating test.
No supplier component is reconstructed or modified.
"""
import argparse
import hashlib
import json
import os
import struct
from pathlib import Path

os.environ['MPLCONFIGDIR'] = str(Path('.mechanical-cache/matplotlib').resolve())
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

parser = argparse.ArgumentParser()
parser.add_argument('--current-circuit', required=True)
parser.add_argument('--mounted-circuit', required=True)
parser.add_argument('--glb', required=True)
parser.add_argument('--output-dir', required=True)
args = parser.parse_args()
output = Path(args.output_dir)
output.mkdir(parents=True, exist_ok=True)
current = json.loads(Path(args.current_circuit).read_text())
mounted = json.loads(Path(args.mounted_circuit).read_text())
glb_bytes = Path(args.glb).read_bytes()
assert glb_bytes[:4] == b'glTF'
json_length = struct.unpack_from('<I', glb_bytes, 12)[0]
glb = json.loads(glb_bytes[20:20 + json_length])
binary_offset = 20 + json_length + 8
references = ['J_USB', 'J_MOTOR', 'J_IO', 'J_SWD']


def component_entries(circuit, reference):
    source = next(e for e in circuit if e['type'] == 'source_component' and e['name'] == reference)
    pcb = next(e for e in circuit if e['type'] == 'pcb_component' and e['source_component_id'] == source['source_component_id'])
    cad = next(e for e in circuit if e['type'] == 'cad_component' and e['source_component_id'] == source['source_component_id'])
    return source, pcb, cad


def accessor_array(index):
    accessor = glb['accessors'][index]
    view = glb['bufferViews'][accessor['bufferView']]
    dtype = {5121: '<u1', 5123: '<u2', 5125: '<u4', 5126: '<f4'}[accessor['componentType']]
    columns = {'SCALAR': 1, 'VEC3': 3}[accessor['type']]
    item_bytes = np.dtype(dtype).itemsize
    offset = binary_offset + view.get('byteOffset', 0) + accessor.get('byteOffset', 0)
    return np.ndarray((accessor['count'], columns), dtype=dtype, buffer=glb_bytes,
                      offset=offset, strides=(view.get('byteStride', item_bytes * columns), item_bytes)).copy()


def node_primitives(reference):
    node = next(n for n in glb['nodes'] if n.get('name') == reference)
    assert 'mesh' in node and not any(k in node for k in ('matrix', 'rotation', 'scale'))
    primitives = []
    for primitive in glb['meshes'][node['mesh']]['primitives']:
        positions = accessor_array(primitive['attributes']['POSITION']).astype(float)
        positions += np.array(node.get('translation', [0, 0, 0]))
        positions = np.column_stack((-positions[:, 0], positions[:, 2], positions[:, 1]))
        indices = accessor_array(primitive['indices']).reshape(-1, 3)
        material = glb['materials'][primitive['material']]
        color = material.get('pbrMetallicRoughness', {}).get('baseColorFactor', [0.8, 0.8, 0.8, 1])[:3]
        primitives.append((positions, indices, color))
    return primitives


all_references = [e['name'] for e in current if e['type'] == 'source_component']
assert len(all_references) == 109
for reference in all_references:
    _, current_pcb, current_cad = component_entries(current, reference)
    _, mounted_pcb, mounted_cad = component_entries(mounted, reference)
    for field in ['center', 'rotation', 'layer', 'width', 'height']:
        assert current_pcb[field] == mounted_pcb[field], (reference, field)
    for field in ['position', 'rotation', 'model_step_url', 'model_origin_position']:
        assert current_cad.get(field) == mounted_cad.get(field), (reference, field)
meshes = {reference: node_primitives(reference) for reference in all_references + ['Box0', 'ProposedFrontFlangeCarrier', 'ProposedFastenerEnvelopes']}
rows = []
for reference in references:
    source, pcb, cad = component_entries(current, reference)
    old_source, old_pcb, old_cad = component_entries(mounted, reference)
    assert source['supplier_part_numbers'] == old_source['supplier_part_numbers']
    for field in ['center', 'rotation', 'layer', 'width', 'height']:
        assert pcb[field] == old_pcb[field], (reference, field)
    for field in ['position', 'rotation', 'model_step_url', 'model_origin_position']:
        assert cad[field] == old_cad[field], (reference, field)
    current_pads = [{k: e[k] for k in ('x', 'y', 'width', 'height', 'rotation', 'layer', 'port_hints') if k in e}
                    for e in current if e['type'] == 'pcb_smtpad' and e['pcb_component_id'] == pcb['pcb_component_id']]
    old_pads = [{k: e[k] for k in ('x', 'y', 'width', 'height', 'rotation', 'layer', 'port_hints') if k in e}
               for e in mounted if e['type'] == 'pcb_smtpad' and e['pcb_component_id'] == old_pcb['pcb_component_id']]
    assert current_pads == old_pads, reference
    vertices = np.concatenate([primitive[0] for primitive in meshes[reference]])
    rows.append({'reference': reference, 'mpn': source['manufacturer_part_number'],
                 'supplier_part_numbers': source['supplier_part_numbers'], 'pcb': pcb,
                 'cad': cad, 'rendered_bounds_mm': [vertices.min(axis=0).tolist(), vertices.max(axis=0).tolist()],
                 'unchanged_native_placement_and_lands': True})


def draw_mesh(ax, reference):
    for positions, indices, color in meshes[reference]:
        ax.add_collection3d(Poly3DCollection(positions[indices], facecolors=color, linewidths=0, shade=True, lightsource=matplotlib.colors.LightSource(azdeg=135, altdeg=45)))


for reference in references:
    row = next(r for r in rows if r['reference'] == reference)
    lower, upper = np.array(row['rendered_bounds_mm'])
    middle = (lower + upper) / 2
    span = max(upper - lower) * 0.7
    fig = plt.figure(figsize=(10, 5))
    for index, azimuth in enumerate([45, -135]):
        ax = fig.add_subplot(1, 2, index + 1, projection='3d')
        draw_mesh(ax, reference)
        ax.set(xlim=(middle[0] - span, middle[0] + span), ylim=(middle[1] - span, middle[1] + span),
               zlim=(min(lower[2], -0.8) - 0.3, max(upper[2], 0.8) + 0.3), xlabel='PCB X (mm)', ylabel='PCB Y (mm)', zlabel='PCB Z (mm)')
        ax.set_box_aspect((2 * span, 2 * span, max(upper[2], 0.8) - min(lower[2], -0.8) + 0.6))
        ax.view_init(elev=25 if row['pcb']['layer'] == 'top' else -25, azim=azimuth)
    fig.suptitle(reference + ' — actual native 3D mesh / opposite views')
    fig.tight_layout()
    fig.savefig(output / (reference + '.png'), dpi=150)
    plt.close(fig)

fig = plt.figure(figsize=(12, 7))
for index, elevation in enumerate([70, -70]):
    ax = fig.add_subplot(1, 2, index + 1, projection='3d')
    polygons, colors = [], []
    for reference in meshes:
        for positions, indices, color in meshes[reference]:
            polygons.extend(positions[indices])
            colors.extend([color] * len(indices))
    ax.add_collection3d(Poly3DCollection(polygons, facecolors=colors, linewidths=0, shade=True, lightsource=matplotlib.colors.LightSource(azdeg=135, altdeg=45)))
    for reference, start, delta in [
        ('USB', (0, -18, 2.5), (0, -7, 0)),
        ('MOTOR', (-1.75, 15, 3), (0, 9, 0)),
        ('SWD', (18, -8.4, 2.5), (7, 0, 0)),
        ('I/O underside', (18, 4, -2.5), (7, 0, 0))]:
        ax.quiver(*start, *delta, color='#cc3030', arrow_length_ratio=0.18, linewidth=2)
        ax.text(*(np.array(start) + np.array(delta)), reference, color='#9a1818', fontsize=9)
    ax.set(xlim=(-27, 30), ylim=(-29, 29), zlim=(-8, 8), xlabel='PCB X (mm)', ylabel='PCB Y (mm)')
    ax.set_proj_type('ortho')
    ax.set_zticks([])
    ax.set_box_aspect((57, 58, 16))
    ax.view_init(elev=elevation, azim=-90)
    ax.set_title('Top / outward cable exits' if index == 0 else 'Underside / outward cable exits')
fig.suptitle('Actual native PCB, 109 component meshes, carrier and fastener envelopes')
fig.text(0.5, 0.025, 'Motor omitted here to expose the underside; plug envelopes and physical fit have separate qualification limits.', ha='center', fontsize=9)
fig.tight_layout()
fig.savefig(output / 'connector-access-overview.png', dpi=150)
plt.close(fig)

report = {'all_109_component_placements_and_cad_registrations_unchanged': True, 'scope': 'Actual native exported connector meshes; verify old mounted view against current diagnostic placement, CAD registration and every connector SMT land',
          'inputs': {name: {'path': path, 'sha256': hashlib.sha256(Path(path).read_bytes()).hexdigest()}
                     for name, path in [('current_circuit', args.current_circuit), ('mounted_circuit', args.mounted_circuit), ('mounted_glb', args.glb)]},
          'result': 'passed unchanged placement/land correspondence; mouth direction requires visual review',
          'connectors': rows, 'physical_mating_fit_tested': False, 'fabrication_ready': False}
(output / 'MESH-CORRESPONDENCE.json').write_text(json.dumps(report, indent=2) + '\n')
print('Four actual connector meshes rendered; current placement, CAD and every SMT land match the mounted export.')
