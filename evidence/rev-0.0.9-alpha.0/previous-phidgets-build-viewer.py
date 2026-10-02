"""Build a portable offline viewer of the actual native assembly GLB."""
import base64
from pathlib import Path

model = base64.b64encode(Path("dist/assembly/3d.glb").read_bytes()).decode("ascii")
script = Path("mechanical/viewer.bundle.js").read_text().replace("</script", "<\\/script")
html = """<!doctype html><html lang="en"><meta charset="utf-8"><title>Phidgets motor + controller</title>
<style>body{margin:0;font:16px system-ui;background:#e9edf1;color:#162432}header{padding:18px 24px;background:white}h1{font-size:22px;margin:0 0 8px}p{margin:7px 0}button{border:1px solid #b6c3cc;background:white;border-radius:6px;padding:9px 14px;margin:8px 5px 0 0;cursor:pointer}label{margin:0 14px}canvas{width:100%;height:calc(100vh - 280px);display:block}.status{color:#824712}footer{padding:8px 24px;font-size:14px}</style>
<header><h1>Phidgets 3323_0 / 35STH40-1004B + controller assembly</h1><p>Unchanged <a href="https://www.phidgets.com/productfiles/3323/3323_0/Images/3323_0_3D.zip">official Phidgets STEP</a> · simplified manufacturer CAD appearance</p><p>Drag to rotate · scroll to zoom · right-drag to move</p>
<p class="status">Diagnostic preview — mechanics blocked; routing disabled; not fabrication ready.</p>
<button data-view="complete">Whole assembly</button><button data-view="front">Motor front</button><button data-view="rear">Rear stack</button><button data-view="side">Side view</button><button data-view="encoder">Encoder close-up</button>
<p><label><input type="checkbox" id="motor" checked>Show motor</label><label><input type="checkbox" id="pcb">Transparent PCB</label></p></header>
<canvas></canvas><footer><span id="loading">Loading exact assembly…</span>Official STEP rear shaft Ø4.0 differs from drawing Ø3.9. Proposed hardware and final connectors remain unqualified.</footer>
<script type="application/octet-stream" id="assembly-model">MODEL</script><script>SCRIPT</script></html>"""
Path("mechanical/assembly-preview.html").write_text(html.replace("MODEL", model).replace("SCRIPT", script))
print("Built portable offline assembly-preview.html from the actual native GLB.")
