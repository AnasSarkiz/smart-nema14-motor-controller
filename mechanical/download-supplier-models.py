"""Preserve models from actual circuit JSON URLs, without altering supplier imports."""
import hashlib
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urlparse

circuit = json.loads(Path("dist/assembly/circuit.json").read_text())
models = sorted({element["model_step_url"] for element in circuit
                 if element["type"] == "cad_component" and
                 element.get("model_step_url", "").startswith("https://modelcdn.tscircuit.com/")})
destination = Path("references/mechanical-supplier-models")
destination.mkdir(exist_ok=True)


def download_model(url):
    filename = Path(urlparse(url).path).name
    output = destination / filename
    result = subprocess.run(["curl", "--http1.1", "--fail", "--location",
                             "--silent", "--show-error", "--max-time", "40",
                             url, "--output", str(output)], capture_output=True, text=True)
    if result.returncode:
        return {"url": url, "path": str(output), "status": "blocked",
                "error": result.stderr, "exit_code": result.returncode}
    return {"url": url, "path": str(output), "status": "downloaded",
            "sha256": hashlib.sha256(output.read_bytes()).hexdigest()}


with ThreadPoolExecutor(max_workers=6) as executor:
    records = list(executor.map(download_model, models))
Path("evidence/rev-0.0.8-alpha.0/SUPPLIER-MODELS.json").write_text(json.dumps(records, indent=2) + "\n")
print(f"Preserved {sum(record['status'] == 'downloaded' for record in records)}/{len(records)} official supplier model URLs.")
if any(record["status"] == "blocked" for record in records):
    raise SystemExit(1)
