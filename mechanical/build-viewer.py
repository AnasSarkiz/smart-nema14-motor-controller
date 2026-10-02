"""Build a portable offline viewer of the actual native assembly GLB."""
import base64
from pathlib import Path

model = base64.b64encode(Path("dist/assembly/3d.glb").read_bytes()).decode("ascii")
script = Path("mechanical/viewer.bundle.js").read_text().replace("</script", "<\\/script")
html = """<!doctype html><html lang="en"><meta charset="utf-8"><title>STEPPERONLINE controller — exploded view</title>
<style>body{margin:0;font:16px system-ui;background:#e9edf1;color:#162432}header{padding:18px 24px;background:white}h1{font-size:22px;margin:0 0 8px}p{margin:7px 0}button{border:1px solid #b6c3cc;background:white;border-radius:6px;padding:9px 14px;margin:8px 5px 0 0;cursor:pointer}label{margin:0 14px}canvas{width:100%;height:calc(100vh - 280px);display:block}.status{color:#824712}footer{padding:8px 24px;font-size:14px}</style>
<header><h1>STEPPERONLINE 14HM11-0404S + controller — exploded view</h1><p>Unchanged <a href="https://www.omc-stepperonline.com/nema-14-bipolar-0-9deg-11ncm-15-58oz-in-0-4a-10v-35x35x28mm-4-wires-14hm11-0404s">official manufacturer STEP</a> · drawing A0217, rev. 1</p><p>Drag to rotate · scroll to zoom · right-drag to move</p>
<p class="status">Exploded inspection view — motor raised +65 mm in Z; no mounting qualification; routing disabled.</p>
<button data-view="complete">Exploded assembly</button><button data-view="front">Motor front</button><button data-view="rear">Motor rear</button><button data-view="side">Side view</button><button data-view="board">Board close-up</button>
<p><label><input type="checkbox" id="motor" checked>Show motor</label>Motor lifted for visibility; no separate PCB cover is modeled.</p></header>
<canvas></canvas><footer><span id="loading">Loading official motor…</span>0.9° · 0.4 A/phase · 35 × 35 × 28.2 mm. Actual unrouted controller below the lifted official motor. Separation is for inspection; mounting and encoder decisions remain pending.</footer>
<script type="application/octet-stream" id="assembly-model">MODEL</script><script>SCRIPT</script></html>"""
Path("mechanical/assembly-preview.html").write_text(html.replace("MODEL", model).replace("SCRIPT", script))
print("Built portable offline assembly-preview.html from the actual native GLB.")
