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

Installation requires an Ubuntu/Debian Linux image with root or noninteractive
sudo for apt. It installs pinned Bun 1.3.9, the exact bun.lock dependencies,
Shapely 2.1.2 and CadQuery 2.8.0 in a fresh Linux .mechanical-venv. It never copies
the Mac venv. Python 3.11/3.12 are the intended Linux runtime; validate actual
wheel/tool availability during setup. No routing, fabrication approval or final
board checks are implied by a successful setup smoke check.

Allow package-manager domains and the official Bun download hosts `bun.com`,
`github.com`, `release-assets.githubusercontent.com`, `objects.githubusercontent.com`.
The Bun lockfile also uses `registry.npmjs.org` and
`registry-api.tscircuit.com`; Python wheels use `pypi.org` and
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

The Linux setup was verified in GitHub Actions run 37292488424 on the pushed
handoff source. The original Cloud setup browser required sign-in. Repository preparation does
not itself create/publish a Cloud environment. Confirm **Environment published**
and a task ID before reporting either action as complete.

Official documentation checked 2026-10-05:
https://learn.chatgpt.com/docs/environments/cloud-environments
and https://bun.com/docs/installation.
