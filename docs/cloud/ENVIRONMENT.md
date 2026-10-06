# Configure the Cloud environment

Select public repository `AnasSarkiz/smart-nema14-motor-controller`, branch
`main`, in **Work in → Cloud → Select environment → Create environment**.
Use the dedicated board repository root as the working directory.

Install script:

```bash
bash scripts/cloud-setup.sh
```

Startup instructions (Start skill): read AGENTS.md and CLOUD_HANDOFF.md, then run
`bash scripts/cloud-smoke.sh` from the repository root. Do not autoroute during
installation/startup. Save the verified setup and publish the environment;
start the continuation using `docs/cloud/TASK.md`.

Installation uses an Ubuntu/Debian Linux image. With root or noninteractive
sudo, apt installs native prerequisites. On a non-root Cloud image without
sudo, the script verifies curl/unzip/Python/fontconfig, installed system fonts,
loadable native graphics libraries and the TLS trust store, and fails on a
missing prerequisite. Python venv/pip and analysis libraries are verified by
the subsequent installation and smoke checks. It installs pinned Bun 1.3.9, the exact bun.lock dependencies,
Shapely 2.1.2 and CadQuery 2.8.0 in a fresh Linux .mechanical-venv. It never copies
the Mac venv. Python 3.11/3.12 are the intended Linux runtime; validate actual
wheel/tool availability during setup. No routing, fabrication approval or final
board checks are implied by a successful setup smoke check.

Allow package-manager domains and the official Bun download hosts `bun.com`,
`github.com`, `raw.githubusercontent.com`, `api.github.com`,
`release-assets.githubusercontent.com`, `objects.githubusercontent.com`.
The Bun lockfile also uses `registry.npmjs.org` and
`registry-api.tscircuit.com` and `npm.tscircuit.com`; Python wheels use `pypi.org` and
`files.pythonhosted.org`. Add official datasheet/model/source hosts only as
needed for verification. Internet host access does not grant authentication.
GitHub and tscircuit publication need their configured integrations/credentials;
do not place secrets in Git or copy local session tokens to the Cloud handoff.

Use one native routing job at a time:

```bash
python3 scripts/run-cloud-routing.py scripts/native-protection229.circuit.tsx \
  evidence/rev-0.0.20-alpha.0/cloud/cc-001 --timeout-seconds 900
```

This is an example resume command, **not** an instruction to repeat the failed
two-net job unchanged. Inspect its historical phase input and congestion first;
split nets/adjust supported source planning as justified. The supervisor rejects
macOS, locks out simultaneous jobs, preserves old evidence, and stops at 70% of
detected VM/cgroup memory or the time limit. It records actual native errors and
nonzero exit status. A killed job is a failure, never a passing build. One-second
RSS polling is a guard, not an unlimited-memory guarantee.

The Linux setup was verified in GitHub Actions runs 37292488424 and 37296728759.
After sign-in, the actual non-root Cloud setup at commit 2bdc006 passed, including
TypeScript, imports, analysis libraries, context/archive checks and PNG rendering.
The browser confirmed **Environment published** on 2026-10-05. The dedicated
smart-nema14-motor-controller environment includes only this board repository;
sharing remains Only me. Actual setup VM: 32 GiB cgroup RAM limit, no swap,
approximately 27 GiB free disk. The routing continuation visibly started:
https://chatgpt.com/local/01a10ba0-5ae2-7690-934b-73780c7ed077.
Task dispatch does not establish routing or fabrication qualification. See
VALIDATION.md for the verified setup/dispatch evidence and pending board gates.

Official documentation checked 2026-10-05:
https://learn.chatgpt.com/docs/environments/cloud-environments
and https://bun.com/docs/installation.

## Live supplier verification during board continuation

The minimal setup allowlist above remains sufficient for installation and smoke
checks. Full CLI board builds additionally query the official EasyEDA component
API at `easyeda.com/api/components/search` and `easyeda.com/api/components/...`.
Earlier builds received CONNECT HTTP 403 for `easyeda.com`, reported as 111
supplier-footprint lookup warnings. On 2026-10-05 the live product API returned
all 43 exact supplier identities used by the 111 component references, with
the sale flag set for each. Raw responses and checksums are retained in
`evidence/rev-0.0.34-alpha.0/cloud/supplier-live/`. This does not reserve stock
or qualify assembly. Imported footprints remain intact.

The exact BOM catalogue check uses the installed CLI's official backend
`jlcsearch.tscircuit.com`; model requests use `modelcdn.tscircuit.com`.
Both initially received CONNECT HTTP 403. The additive 14-host draft preserves
the package-manager preset, install/startup instructions and existing hosts.
The supported draft tool returned saved and requires_publish: true. Draft
saving alone does not prove effective policy application. The supported editor
Save/Publish controls apply environment configuration; actual requests must
be retried to verify access. No wildcard, proxy bypass or TLS disable is used.

Latest actual verification: the exact CLI catalogue check passes all 43 parts
with displayed stock using `NODE_USE_ENV_PROXY=1 node scripts/check-bom-catalog.mjs`.
Node 24 requires this supported environment-proxy option for fetch-based tools;
without it the registry request failed DNS resolution. Registry access returns
HTTP 200 with the option. Curl also returns HTTP 200 for the catalogue.
The exact CLI model URL, including the UUID from the official product response,
returns HTTP 200 and a real OBJ. Omitting that UUID returned service HTTP 504;
that was not a policy denial. These observations establish current request
access, not publication of the saved draft, stock reservation or final 3D fit.

## Revision035 startup and fabricator verification

The portable startup smoke now supplies repository-local XDG configuration/cache/
data defaults for a Cloud image with read-only HOME. The saved startup draft
also initializes these paths and NODE_USE_ENV_PROXY=1 for subsequent commands.
The exact startup smoke passes with the current checked board and context.

Fabricator qualification needs the official host jlcpcb.com. Its capability
page currently receives CONNECT 403. An additive 15-host draft preserves the
11 installation hosts and three verified supplier/model hosts and adds this
exact host. The tool confirms saved, requires_publish:true. Review/save and
Publish in environment settings are required; draft persistence does not apply
policy. An actual successful request and CAM/process confirmation are still
needed before ordering. No wildcard, TLS relaxation or proxy bypass is used.
