#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ "$(uname -s)" != Linux ]]; then
  echo 'Cloud installation is for Linux. No local routing or installation started.' >&2
  exit 2
fi
if [[ $(id -u) -eq 0 ]]; then
  apt_command=(apt-get)
else
  apt_command=(sudo -n apt-get)
fi
"${apt_command[@]}" update
"${apt_command[@]}" install -y ca-certificates curl unzip python3-venv python3-pip \
  libgl1 libglib2.0-0 libxrender1 libxext6 libsm6 libfontconfig1 fonts-dejavu-core
mkdir -p .cloud-tools
installer=$(mktemp)
trap 'rm -f "$installer"' EXIT
curl -fsSL https://bun.com/install -o "$installer"
BUN_INSTALL="$PWD/.cloud-tools/bun" bash "$installer" bun-v1.3.9
export PATH="$PWD/.cloud-tools/bun/bin:$PATH"
[[ "$(bun --version)" == 1.3.9 ]]
bun install --frozen-lockfile
python3 -m venv .mechanical-venv
.mechanical-venv/bin/python -m pip install -r requirements-cloud.txt
bash scripts/cloud-smoke.sh
echo 'Cloud dependencies prepared. No remaining-net autorouting was started.'
