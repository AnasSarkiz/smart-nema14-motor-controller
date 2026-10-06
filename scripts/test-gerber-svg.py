"""Verify ordered Gerber masks and rejection of unsupported/invalid geometry."""
import runpy
import tempfile
from pathlib import Path

read_svg = runpy.run_path(str(Path(__file__).with_name('read-gerber-svg.py')))['read_gerber_svg']


def measure(fragment):
    with tempfile.TemporaryDirectory() as folder:
        path = Path(folder) / 'test.svg'
        path.write_text('<svg xmlns="http://www.w3.org/2000/svg">' + fragment + '</svg>')
        return read_svg(path)


assert measure('<rect x="0" y="0" width="2" height="3"/>').area == 6
masked = '<defs><mask id="clear"><rect x="0" y="0" width="2" height="3" fill="white"/><rect x="0" y="0" width="1" height="1" fill="black"/></mask></defs><g mask="url(#clear)"><rect x="0" y="0" width="2" height="3"/></g>'
assert measure(masked).area == 5
assert measure('<path d="M 0 0 L 1 0 L 2 0 Z"/>').is_empty
for fragment in ['<path d="M 0 0 L 2 2 L 0 2 L 2 0 Z"/>',
                 '<path d="M 0 0 Q 1 1 2 0 Z"/>',
                 '<rect x="0" y="0" width="1" height="1" transform="skewX(3)"/>']:
    try:
        measure(fragment)
    except AssertionError:
        continue
    raise AssertionError('Unsupported or self-intersecting SVG was accepted')
print('Gerber SVG geometry: dark/clear masks, zero-area fill, invalid polygons and unsupported constructs checked')
