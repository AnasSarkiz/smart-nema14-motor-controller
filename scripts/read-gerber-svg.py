"""Read geometry from PyGerber 2.4.3 vector renders, including ordered masks.

This strict adapter rejects SVG constructs it cannot measure. It never renders
or converts a PCB design and never changes a manufacturing file.
"""
import re
import xml.etree.ElementTree as ElementTree
from dataclasses import dataclass, field
from shapely import affinity
from shapely.geometry import MultiPoint, Point, Polygon, box
from shapely.ops import unary_union


@dataclass
class SvgGeometryContext:
    definitions: dict
    cache: dict = field(default_factory=dict)
    degenerate_paths: int = 0


def read_gerber_svg(svg_path, diagnostics=None):
    svg = ElementTree.parse(svg_path).getroot()
    context = SvgGeometryContext({element.attrib['id']: element for element in svg.iter()
                                  if 'id' in element.attrib})
    shape = element_geometry(svg, context)
    if diagnostics is not None:
        diagnostics['collinear_zero_area_paths'] = context.degenerate_paths
    return shape


def element_geometry(element, context):
    tag = element.tag.split('}')[-1]
    if tag in ('svg', 'g'):
        shape = unary_union([element_geometry(child, context) for child in element
                             if child.tag.split('}')[-1] != 'defs'])
    elif tag == 'mask':
        shape = Polygon()
        for child in element:
            painted = element_geometry(child, context)
            fill = child.attrib.get('fill', 'black')
            assert fill in ('white', 'black'), 'Unreviewed SVG mask color'
            if fill == 'white':
                shape = shape.union(painted)
            else:
                shape = shape.difference(painted)
    elif tag == 'circle':
        shape = Point(float(element.attrib['cx']), float(element.attrib['cy'])).buffer(
            float(element.attrib['r']), quad_segs=128)
    elif tag == 'rect':
        x, y, width, height = (float(element.attrib[key]) for key in
                                ('x', 'y', 'width', 'height'))
        shape = box(x, y, x + width, y + height)
    elif tag == 'path':
        assert 'stroke' not in element.attrib, 'Unreviewed stroked SVG path'
        path = element.attrib['d']
        assert set(re.findall('[A-Za-z]', path)) <= {'M', 'L', 'Z'}, \
            'Unreviewed SVG curve or relative path'
        assert path.count('M') == 1 and path.count('Z') == 1, \
            'Unreviewed compound or open SVG path'
        coordinates = [float(number) for number in re.findall(r'-?\d+(?:\.\d+)?', path)]
        assert len(coordinates) % 2 == 0 and len(coordinates) >= 6
        vertices = list(zip(coordinates[::2], coordinates[1::2]))
        shape = Polygon(vertices)
        if not shape.is_valid and MultiPoint(vertices).convex_hull.area == 0:
            # SVG fill semantics paint no area for collinear closed paths.
            # This does not repair or accept self-intersecting polygons.
            context.degenerate_paths += 1
            shape = Polygon()
        assert shape.is_valid, 'Invalid Gerber-rendered polygon'
    elif tag == 'use':
        reference = element.attrib['{http://www.w3.org/1999/xlink}href'][1:]
        if reference not in context.cache:
            context.cache[reference] = element_geometry(context.definitions[reference], context)
        shape = affinity.translate(context.cache[reference],
                                   float(element.attrib.get('x', 0)),
                                   float(element.attrib.get('y', 0)))
    else:
        raise ValueError(f'Unreviewed Gerber SVG primitive: {tag}')
    if 'transform' in element.attrib:
        rotation = re.fullmatch(r'rotate\((-?[\d.]+)\)', element.attrib['transform'])
        assert rotation, 'Unreviewed SVG transformation'
        shape = affinity.rotate(shape, float(rotation.group(1)), origin=(0, 0))
    if 'mask' in element.attrib:
        reference = re.fullmatch(r'url\(#([^)]*)\)', element.attrib['mask']).group(1)
        if reference not in context.cache:
            context.cache[reference] = element_geometry(context.definitions[reference], context)
        shape = shape.intersection(context.cache[reference])
    return shape
