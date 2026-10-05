"""Read the official router's parsed planning rules without changing copper."""
import hashlib
import json
import sys
from collections import Counter
from pathlib import Path

import jpype

folder = Path(sys.argv[1]).resolve()
runtime = Path('.publication/routing-tools').resolve()
jpype.startJVM(str(runtime/'jdk-25.0.4.1+1-jre/Contents/Home/lib/server/libjvm.dylib'),
              '-Djava.awt.headless=true', classpath=[str(runtime/'freerouting-2.4.1.jar')])
java_class = jpype.JClass
manager = java_class('app.freerouting.management.HeadlessBoardManager')(
    java_class('app.freerouting.core.RoutingJob')())
dsn_path = folder/'local-routing.dsn'
stream = java_class('java.io.FileInputStream')(str(dsn_path))
manager.loadFromSpecctraDsn(stream, None,
    java_class('app.freerouting.board.actions.ItemIdGenerator')())
stream.close()
board = manager.getRoutingBoard()
violations = {}
for item in board.getItems():
    for violation in item.clearanceViolations():
        first, second = violation.firstItem, violation.secondItem
        key = (min(first.getId(), second.getId()), max(first.getId(), second.getId()), violation.layer)
        violations[key] = {
            'first_kind': str(first.getClass().getSimpleName()),
            'second_kind': str(second.getClass().getSimpleName()),
            'first_nets': str(first.getAllNetNames()),
            'second_nets': str(second.getAllNetNames()),
            'layer': int(violation.layer),
            'required_mm': float(violation.expectedClearance)/10000,
            'actual_mm': float(violation.actualClearance)/10000,
        }
report = {
    'dsn_sha256': hashlib.sha256(dsn_path.read_bytes()).hexdigest(),
    'pin_count': len(list(board.getPins())),
    'via_count': len(list(board.getVias())),
    'via_padstacks': [{'name':str(v.getPadstack().name), 'attach_allowed':bool(v.getPadstack().attachAllowed)} for v in board.getVias()],
    'via_attachment': [{'center':str(v.getCenter()), 'attach_allowed':bool(v.attachAllowed)} for v in board.getVias()],
    'violation_count': len(violations),
    'by_pair': dict(Counter('-'.join(sorted([v['first_kind'], v['second_kind']])) for v in violations.values())),
    'violations': list(violations.values()),
    'scope': 'Read-only planning diagnostic; final native geometry and filled-copper checks remain required.',
}
(folder/'PLANNER-CLEARANCES.json').write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['violations','via_attachment','via_padstacks']}))
