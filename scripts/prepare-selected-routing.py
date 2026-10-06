"""Prepare an audited official interchange for a bounded selection of nets.

Defers automatic fills for routing planning only. Final fills and every native
DRC are regenerated and checked after importing the routed paths. Purchased
pad definitions and existing routed copper are immutable.
"""
import hashlib
import json
import sys
from pathlib import Path
import pcbnew
import wx

application = wx.AppConsole() if sys.platform == "linux" else wx.App(False)
folder=Path(sys.argv[1]); selection=json.loads((folder/'selected-nets.json').read_text())
audit=json.loads((folder/'KICAD-INTERCHANGE-AUDIT.json').read_text())
assert audit['status']=='pad geometry, connectivity partitions and manual copper match'
board=pcbnew.LoadBoard(str((folder/'routing-interchange.kicad_pcb').resolve()))
for zone in list(board.Zones()):
 if not zone.GetIsRuleArea():board.Delete(zone)
# Same native USB reference envelopes; reserve L2 for the return underneath the pair.
regions=[[-1.6,-10.65,2.15,-9.1],[.4,-9.15,1.55,-6.3],[1.4,-7.75,4.2,-6.25],[2.12,-6.45,3.23,6.35],[2.12,5.15,7.65,7.78]]
for left,bottom,right,top in regions:
 z=pcbnew.ZONE(board);z.SetIsRuleArea(True);z.SetLayer(pcbnew.In1_Cu);z.SetDoNotAllowTracks(True);z.SetDoNotAllowVias(True);z.SetDoNotAllowPads(False);z.SetDoNotAllowCopperPour(False);z.Outline().NewOutline()
 for x,y in [[left,bottom],[right,bottom],[right,top],[left,top]]:z.Outline().Append(pcbnew.FromMM(100+x),pcbnew.FromMM(100-y))
 board.Add(z)
reference_path = folder / 'routing-reference-keepouts.json'
additional_references = json.loads(reference_path.read_text()) if reference_path.exists() else []
for reference in additional_references:
 layer_id = {'top': pcbnew.F_Cu, 'inner1': pcbnew.In1_Cu, 'inner2': pcbnew.In2_Cu, 'bottom': pcbnew.B_Cu}[reference['layer']]
 z = pcbnew.ZONE(board)
 z.SetIsRuleArea(True)
 z.SetLayer(layer_id)
 z.SetDoNotAllowTracks(True)
 z.SetDoNotAllowVias(True)
 z.SetDoNotAllowPads(False)
 z.SetDoNotAllowCopperPour(False)
 z.Outline().NewOutline()
 for x, y in reference['outline']:
  z.Outline().Append(pcbnew.FromMM(100+x), pcbnew.FromMM(100-y))
 board.Add(z)
# KiCad's current DSN exporter serializes rule-area via restrictions as
# general keepouts, incorrectly blocking traces on every copper layer.
# Preserve their verified via-only semantics using the supported Specctra
# via_keepout primitive (Freerouting Structure parser and Issue039 fixture).
via_guards = json.loads((folder/'routing-pad-guards.json').read_text())['guards']
ripup_scope_path = folder / 'routing-ripup-scope.json'
ripup_nets = set(json.loads(ripup_scope_path.read_text())['nets']) if ripup_scope_path.exists() else set()
assert ripup_nets <= set(selection), 'Ripup must be restricted to the selected routing group'
assert not ripup_nets.intersection({'USB_DP','USB_DM','VM','VBUS_CONN','VBUS_PROTECTED','EFUSE_RTN','GND'}), 'Critical USB and power copper must remain fixed'
remove_path = folder / 'routing-remove-selected-copper.json'
remove_spec = json.loads(remove_path.read_text()) if remove_path.exists() else {'nets': []}
remove_nets = set(remove_spec['nets'])
remove_layers = { {'top': pcbnew.F_Cu, 'inner1': pcbnew.In1_Cu, 'inner2': pcbnew.In2_Cu, 'bottom': pcbnew.B_Cu}[name] for name in remove_spec.get('layers', []) }
layer_names = {'top': pcbnew.F_Cu, 'inner1': pcbnew.In1_Cu, 'inner2': pcbnew.In2_Cu, 'bottom': pcbnew.B_Cu}
per_net_layers = {net: {layer_names[name] for name in names} for net, names in remove_spec.get('net_layers', {}).items()}
assert set(per_net_layers) <= remove_nets
assert remove_nets <= ripup_nets, 'Replacement copper must be explicitly selected for rerouting'
# Explicit native escape features are reviewed source geometry. Preserve their
# exact vias and branches while allowing saved phase copper to be replaced.
native = json.loads((folder / 'circuit.json').read_text())
source_traces = {e['source_trace_id']: e for e in native if e['type'] == 'source_trace'}
fixed_native_vias = [(e['x'], e['y'], e['hole_diameter'], e['outer_diameter']) for e in native if e['type'] == 'pcb_via' and e.get('source_net_id')]
filled_features = json.loads(Path('src/routing/filled-signal-vias-trial.json').read_text())['features']
for feature in filled_features:
 matches = [v for v in native if v['type'] == 'pcb_via' and abs(v['x']-feature['x'])<.00001 and abs(v['y']-feature['y'])<.00001]
 assert len(matches)==1
 via = matches[0]
 fixed_native_vias.append((via['x'],via['y'],via['hole_diameter'],via['outer_diameter']))
fixed_native_segments = []
source_components = {e['source_component_id']:e['name'] for e in native if e['type']=='source_component'}
source_ports = {e['source_port_id']:e for e in native if e['type']=='source_port'}
selector_ports = {f".{source_components[source_ports[e['source_port_id']]['source_component_id']]} > .pin{source_ports[e['source_port_id']]['pin_number']}":e for e in native if e['type']=='pcb_port' and source_ports[e['source_port_id']]['source_component_id'] in source_components}
for feature in filled_features:
 for branch in feature['branches']:
  owner = selector_ports[branch['selector']]
  corners = [{'x':feature['x'],'y':feature['y']}, *branch['points'], {'x':owner['x'],'y':owner['y']}]
  for a,b in zip(corners,corners[1:]):
   a = {**a,'layer':branch.get('layer',feature['owner_layer']),'width':.15}
   fixed_native_segments.append((a,b))
for trace in (e for e in native if e['type'] == 'pcb_trace'):
 if trace['pcb_trace_id'].startswith('saved_phase'):
  continue
 route = trace['route']
 for first, second in zip(route, route[1:]):
  if first.get('route_type') == 'wire' and (first['x'], first['y']) != (second['x'], second['y']):
   fixed_native_segments.append((first, second))

def is_explicit_native_feature(track):
 if track.GetClass() == 'PCB_VIA':
  x, y = pcbnew.ToMM(track.GetPosition().x)-100, 100-pcbnew.ToMM(track.GetPosition().y)
  return any(abs(x-fx)<.000002 and abs(y-fy)<.000002 and abs(pcbnew.ToMM(track.GetDrillValue())-hole)<.000002 and abs(pcbnew.ToMM(track.GetWidth(pcbnew.F_Cu))-outer)<.000002 for fx,fy,hole,outer in fixed_native_vias)
 actual = sorted([(round(pcbnew.ToMM(track.GetStart().x)-100,5), round(100-pcbnew.ToMM(track.GetStart().y),5)), (round(pcbnew.ToMM(track.GetEnd().x)-100,5), round(100-pcbnew.ToMM(track.GetEnd().y),5))])
 return any(actual == sorted([(round(a['x'],5),round(a['y'],5)),(round(b['x'],5),round(b['y'],5))]) and track.GetLayer() == layer_names[a['layer']] and abs(pcbnew.ToMM(track.GetWidth())-a['width'])<.000002 for a,b in fixed_native_segments)

# The official export repeats shared native contacts. Collapse only exact
# coincident planning objects before the router, which also deduplicates them.
# The original export/native audit above remains mandatory and unchanged.
def planning_copper_signature(track):
 if track.GetClass() == 'PCB_VIA':
  return ('via', track.GetNetCode(), track.GetPosition().x, track.GetPosition().y,
          track.GetWidth(pcbnew.F_Cu), track.GetDrillValue(), track.TopLayer(), track.BottomLayer())
 endpoints = sorted([(track.GetStart().x,track.GetStart().y), (track.GetEnd().x,track.GetEnd().y)])
 return ('wire', track.GetNetCode(), track.GetLayer(), track.GetWidth(), *endpoints[0], *endpoints[1])

seen_planning_copper = set()
coincident_copies_removed = []
for track in list(board.GetTracks()):
 signature = planning_copper_signature(track)
 if signature in seen_planning_copper:
  coincident_copies_removed.append(signature)
  board.Delete(track)
 else:
  seen_planning_copper.add(signature)
assert seen_planning_copper == {planning_copper_signature(track) for track in board.GetTracks()}
(folder/'ROUTING-COINCIDENT-CLEANUP.json').write_text(json.dumps({
 'scope':'Planning interchange only; exact coincident copies removed, every unique net/layer/endpoint/width/drill/span signature retained. No native Circuit JSON or purchased pad is changed.',
 'unique_physical_copper_objects':len(seen_planning_copper),
 'coincident_copies_removed':coincident_copies_removed},indent=2)+'\n')

removed_objects = 0
for track in list(board.GetTracks()):
 selected_layers = per_net_layers.get(track.GetNetname(), remove_layers)
 if not is_explicit_native_feature(track) and track.GetNetname() in remove_nets and (not selected_layers or (track.GetClass() != 'PCB_VIA' and track.GetLayer() in selected_layers)):
  board.Delete(track)
  removed_objects += 1
for track in board.GetTracks():track.SetLocked(track.GetNetname() not in ripup_nets or is_explicit_native_feature(track))
pcbnew.SaveBoard(str((folder/'local-routing.kicad_pcb').resolve()),board)
assert pcbnew.ExportSpecctraDSN(board,str((folder/'local-export.dsn').resolve()))
p=folder/'local-export.dsn';dsn=p.read_text();start=dsn.index('(class kicad_default ');depth=0;end=None
for i in range(start,len(dsn)):
 if dsn[i]=='(':depth+=1
 elif dsn[i]==')':
  depth-=1
  if depth==0:end=i+1;break
assert end is not None
block=dsn[start:end];net_names=block[len('(class kicad_default '):block.index('(circuit')].split();assert set(selection)<=set(net_names)
rules=block[block.index('(circuit'):]
# A class-level untyped clearance creates a separate clearance class for every
# item, overriding the global pad/trace distinction in Freerouting Network.java.
# Inherit the global matrix instead: .15 copper/copper and .10 trace/pad.
assert rules.count('(clearance 150)') == 1
rules=rules.replace('(clearance 150)', '')
deferred=[n for n in net_names if n not in selection]
classes='(class selected '+ ' '.join(selection)+' '+rules+'\n    (class deferred '+' '.join(deferred)+' '+rules
modified=dsn[:start]+classes+dsn[end:];assert modified.count('(class selected ')==1 and modified.count('(class deferred ')==1
# KiCad's exporter reduces SMT clearances. Restore the stated board rules.
smt='(clearance 37.5 (type smd_smd))';assert modified.count(smt)==1
modified=modified.replace(smt,'(clearance 150 (type smd_smd))\n      (clearance 100 (type smd_wire))')
# KiCad exports attach=off even for the reviewed, filled/capped native vias.
# Enable same-net pad attachment for native via stacks, never purchased pad
# stacks. The via-only pad guards still forbid new ordinary drills in pads;
# only the exact, manifest-audited fixed features have apertures.
via_attachment_stacks=[]
for hole_um, outer_um in sorted({(round(v['hole_diameter']*1000), round(v['outer_diameter']*1000)) for v in native if v['type']=='pcb_via'}):
 stack_name=f'Via[0-3]_{outer_um}:{hole_um}_um'
 stack_start=modified.index(f'(padstack "{stack_name}"')
 stack_end=modified.index('\n    )', stack_start)+6
 stack=modified[stack_start:stack_end]
 assert stack.count('(attach off)')==1
 modified=modified[:stack_start]+stack.replace('(attach off)','(attach on)')+modified[stack_end:]
 via_attachment_stacks.append(stack_name)
assert '(via_at_smd ' not in modified
modified=modified.replace('(structure', '(structure\n    (control (via_at_smd on))', 1)
guard_scopes = []
for guard in via_guards:
 corners = [*guard['outline'], guard['outline'][0]]
 coordinates = ' '.join(f"{(100+x)*1000:.6f} {(y-100)*1000:.6f}" for x,y in corners)
 for layer in ['F.Cu','In1.Cu','In2.Cu','B.Cu']:
  windows = []
  for window in guard.get('windows', []):
   window_corners = [*window, window[0]]
   window_coordinates = ' '.join(f"{(100+x)*1000:.6f} {(y-100)*1000:.6f}" for x,y in window_corners)
   windows.append(f'(window (polygon {layer} 0 {window_coordinates}))')
  guard_scopes.append(f'(via_keepout "" (polygon {layer} 0 {coordinates}) '+ ' '.join(windows)+')')
assert modified.count('(structure') == 1
insertion = modified.index('(keepout ')
assert max(modified.index('(layer '+layer) for layer in ['F.Cu','In1.Cu','In2.Cu','B.Cu']) < insertion, 'Layer declarations must precede via guard scopes'
modified = modified[:insertion]+'\n    '.join(guard_scopes)+'\n    '+modified[insertion:]
assert modified.count('(via_keepout ') == len(via_guards)*4, 'Every ordinary drill guard must retain via-only semantics on all four layers'
(folder/'local-routing.dsn').write_text(modified)
report={'selected_nets':selection,'deferred_nets':deferred,'rerouting_nets':sorted(ripup_nets),'native_json_sha256':hashlib.sha256((folder/'circuit.json').read_bytes()).hexdigest(),'dsn_sha256':hashlib.sha256(modified.encode()).hexdigest(),'fixed_native_copper_objects':sum(t.IsLocked() for t in board.GetTracks()),'selected_copper_objects_available_for_rerouting':sum(not t.IsLocked() for t in board.GetTracks()),'usb_reference_regions':len(regions),'via_only_guard_polygons':len(via_guards)*4,'via_guard_semantics_reference':'https://github.com/freerouting/freerouting/blob/master/src/main/java/app/freerouting/io/specctra/parser/Structure.java','scope':'Official bounded routing planning; final native pours, current widths and all clearances must be qualified again.'}
(folder/'SELECTED-ROUTING-PLAN.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
