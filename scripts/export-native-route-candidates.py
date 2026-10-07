"""Serialize native SRJ copper as board-owned saved-path candidates.

This does not route or edit Circuit JSON. Exact native coordinates, widths,
layers and drills are retained; tree edges may be reversed to start at leaves.
Candidates need a fresh native render and all independent copper checks.
Descendant port selectors also support untouched supplier custom symbols.
"""
import argparse
import hashlib
import json
from collections import Counter
from pathlib import Path


def reverse_route(route):
    return [
        {**point, 'from_layer': point['to_layer'], 'to_layer': point['from_layer']}
        if point['route_type'] == 'via' else dict(point)
        for point in reversed(route)
    ]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('circuit_json')
    parser.add_argument('routing_output')
    parser.add_argument('candidate_output')
    parser.add_argument('net_names', nargs='+')
    args = parser.parse_args()
    circuit = json.loads(Path(args.circuit_json).read_text())
    output = json.loads(Path(args.routing_output).read_text())
    srj = output.get('simpleRouteJson', output)
    references = {e['source_component_id']: e['name'] for e in circuit if e['type'] == 'source_component'}
    component_references = {e['pcb_component_id']: references[e['source_component_id']] for e in circuit if e['type'] == 'pcb_component'}
    source_ports = {e['source_port_id']: e for e in circuit if e['type'] == 'source_port'}
    ports = {e['pcb_port_id']: e for e in circuit if e['type'] == 'pcb_port'}
    net_names = {e['source_net_id']: e['name'] for e in circuit if e['type'] == 'source_net'}
    paths = []
    for net_name in args.net_names:
        edges = [dict(trace) for trace in srj['traces'] if net_names.get(trace['connection_name']) == net_name]
        if not edges:
            raise ValueError('No native routes for ' + net_name)
        while edges:
            degree = Counter(port for edge in edges for port in edge['connectsTo'])
            edge = next((edge for edge in edges if any(degree[port] == 1 for port in edge['connectsTo'])), None)
            if edge is None:
                raise ValueError('Native route graph is not a tree: ' + net_name)
            first, last = edge['connectsTo']
            if len(edge['connectsTo']) != 2:
                raise ValueError('Expected two physical endpoint IDs')
            route = edge['route']
            if degree[first] != 1:
                first, last = last, first
            first_point = ports[first]
            last_point = ports[last]
            if abs(route[0]['x']-first_point['x']) + abs(route[0]['y']-first_point['y']) > .00001:
                route = reverse_route(route)
            assert abs(route[0]['x']-first_point['x']) + abs(route[0]['y']-first_point['y']) < .00001
            assert abs(route[-1]['x']-last_point['x']) + abs(route[-1]['y']-last_point['y']) < .00001
            source_port = source_ports[first_point['source_port_id']]
            reference = component_references[first_point['pcb_component_id']]
            selector = f".{reference} port.pin{source_port['pin_number']}"
            paths.append({'connection': selector, 'route': route})
            edges.remove(edge)
    candidate = {
        'net_names': args.net_names,
        'paths': paths,
        'provenance': {
            'circuit_json': args.circuit_json,
            'circuit_json_sha256': hashlib.sha256(Path(args.circuit_json).read_bytes()).hexdigest(),
            'routing_output': args.routing_output,
            'routing_output_sha256': hashlib.sha256(Path(args.routing_output).read_bytes()).hexdigest(),
            'status': 'candidate only; no connectivity or clearance qualification implied',
        },
    }
    destination = Path(args.candidate_output)
    if destination.exists():
        raise ValueError('Preserve prior candidates; choose a new output path')
    destination.write_text(json.dumps(candidate, indent=2)+'\n')
    print(f'{len(paths)} native paths serialized for {len(args.net_names)} nets')


if __name__ == '__main__':
    main()
