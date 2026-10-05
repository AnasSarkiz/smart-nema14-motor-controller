#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$PWD/.cloud-tools/bun/bin:$PATH"
[[ "$(bun --version)" == 1.3.9 ]]
bun node_modules/@tscircuit/cli/dist/cli/main.js --version
bun run typecheck
bun run validate:imports
python3 -m py_compile scripts/run-cloud-routing.py
.mechanical-venv/bin/python -c 'import shapely, cadquery; print("Shapely", shapely.__version__, "CadQuery", cadquery.__version__)'
python3 scripts/verify-cloud-context.py
python3 scripts/restore-routing-history.py --verify-only
