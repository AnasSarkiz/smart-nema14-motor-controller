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
The current proxy denies CONNECT to `easyeda.com` with HTTP 403; the CLI reports
this as 111 supplier-footprint lookup warnings. This is a policy denial, not
proof of a supplier API rate limit or an invalid component definition. Imported
component footprints remain intact and critical pin checks pass.

For this board continuation, add only `easyeda.com` to the existing 11 custom
hosts. No wildcard is needed. The onboarding draft preserves the existing hosts,
package-manager preset, installation and startup instructions. An agent draft
save does not apply live policy. Saving through the environment editor can request
a runtime update; retry the actual HTTPS request afterward. Publishing activates
an environment configuration/snapshot and does not migrate unrelated running
tasks. Do not bypass the proxy, disable TLS, replace components, or hide the
parts-engine warnings to avoid the denial.
