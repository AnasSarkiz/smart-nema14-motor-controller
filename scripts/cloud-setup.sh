#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ "$(uname -s)" != Linux ]]; then
  echo 'Cloud installation is for Linux. No local routing or installation started.' >&2
  exit 2
fi
if [[ $(id -u) -eq 0 ]] && command -v apt-get >/dev/null; then
  apt_command=(apt-get)
elif command -v sudo >/dev/null && sudo -n true 2>/dev/null && command -v apt-get >/dev/null; then
  apt_command=(sudo -n apt-get)
else
  apt_command=()
  echo 'No administrator access; verifying the preinstalled Linux native runtime.'
fi
if (( ${#apt_command[@]} )); then
  "${apt_command[@]}" update
  "${apt_command[@]}" install -y ca-certificates curl unzip python3-venv python3-pip \
    libgl1 libglib2.0-0 libxrender1 libxext6 libsm6 libfontconfig1 fonts-dejavu-core
fi
for required_tool in curl unzip python3 fc-list; do
  command -v "$required_tool" >/dev/null || { echo "Missing native prerequisite: $required_tool" >&2; exit 1; }
done
python3 scripts/check-cloud-native-runtime.py
[[ -n "$(fc-list)" ]] || { echo 'No system fonts found.' >&2; exit 1; }
mkdir -p .cloud-tools
installer=$(mktemp)
trap 'rm -f "$installer"' EXIT
if ! curl -fsSL https://bun.com/install -o "$installer"; then
  echo 'Using the official Bun 1.3.9 tagged installer from oven-sh/bun.'
  curl -fsSL https://raw.githubusercontent.com/oven-sh/bun/bun-v1.3.9/src/cli/install.sh -o "$installer"
fi
BUN_INSTALL="$PWD/.cloud-tools/bun" bash "$installer" bun-v1.3.9
export PATH="$PWD/.cloud-tools/bun/bin:$PATH"
[[ "$(bun --version)" == 1.3.9 ]]
bun install --frozen-lockfile
python3 -m venv .mechanical-venv
.mechanical-venv/bin/python -m pip install -r requirements-cloud.txt
bash scripts/cloud-smoke.sh
echo 'Cloud dependencies prepared. No remaining-net autorouting was started.'
