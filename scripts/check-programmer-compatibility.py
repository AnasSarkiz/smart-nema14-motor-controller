"""Check target physical pins against the pinned official five-pin programmer.

This checks wiring, not successful flashing, SWD timing or hardware operation.
Merged source traces are resolved as complete electrical partitions.
"""
import hashlib
import json
import re
import sys
from pathlib import Path

circuit_path = Path(sys.argv[1] if len(sys.argv) > 1 else "dist/index/circuit.json")
report_path = Path(sys.argv[2])
circuit = json.loads(circuit_path.read_text())
components = {e["name"]: e for e in circuit if e["type"] == "source_component"}
ports = [e for e in circuit if e["type"] == "source_port"]
traces = [e for e in circuit if e["type"] == "source_trace"]
parent = {}


def root(member):
    parent.setdefault(member, member)
    if parent[member] != member:
        parent[member] = root(parent[member])
    return parent[member]


for trace in traces:
    members = trace["connected_source_port_ids"] + trace["connected_source_net_ids"]
    for member in members[1:]:
        parent[root(member)] = root(members[0])


def port_for(reference_pin):
    reference, pin_number = reference_pin
    candidates = [p for p in ports if p["source_component_id"] ==
                  components[reference]["source_component_id"] and
                  p["pin_number"] == pin_number]
    assert len(candidates) == 1, reference_pin
    return candidates[0]


def net_names(reference_pin):
    port = port_for(reference_pin)
    return sorted({e["name"] for e in circuit if e["type"] == "source_net"
                   and root(e["source_net_id"]) == root(port["source_port_id"])})


package_path = Path("node_modules/@tsci/tscircuit.standard-jst-programmer")
official_package = json.loads((package_path / "package.json").read_text())
declarations = (package_path / "index.d.ts").read_text()
pin_declaration = re.search(r"declare const swdResetPinLabels: \{(.*?)\};",
                            declarations, re.S)
assert pin_declaration is not None
official_pin_labels = {
    int(pin): re.findall(r'"([^"]+)"', labels)
    for pin, labels in re.findall(r"pin(\d+): readonly \[(.*?)\]",
                                  pin_declaration[1])
}
expected_labels = {1: ["VOUT"], 2: ["SWDIO"], 3: ["GND"],
                   4: ["SWCLK"], 5: ["NRST", "nRESET"]}
assert official_pin_labels == expected_labels
assert components["J_SWD"]["supplier_part_numbers"]["jlcpcb"] == ["C136657"]

expected_pin_nets = [
    ("J_SWD", 2, "SWDIO_CONN"), ("J_SWD", 3, "GND"),
    ("J_SWD", 4, "SWCLK_CONN"), ("J_SWD", 5, "NRST_CONN"),
    ("U7", 1, "POWER_GOOD"), ("U7", 2, "SWDIO_CONN"),
    ("U7", 3, "SWDIO_GUARDED"), ("U7", 4, "POWER_GOOD"),
    ("U7", 5, "SWCLK_CONN"), ("U7", 6, "SWCLK_GUARDED"),
    ("U7", 8, "GND"), ("U7", 9, "NRST_GUARDED"),
    ("U7", 10, "NRST_CONN"), ("U7", 11, "POWER_GOOD"),
    ("U7", 15, "POWER_GOOD"), ("U7", 16, "V3V3"),
    ("U8", 1, "GND"), ("U8", 2, "POWER_GOOD"), ("U8", 3, "V3V3"),
    ("R19", 1, "V3V3"), ("R19", 2, "POWER_GOOD"),
    ("R20", 1, "SWDIO_GUARDED"), ("R20", 2, "SWDIO"),
    ("R21", 1, "SWCLK_GUARDED"), ("R21", 2, "SWCLK"),
    ("R22", 1, "NRST_GUARDED"), ("R22", 2, "NRST"),
    ("U1", 35, "SWDIO"), ("U1", 36, "SWCLK"), ("U1", 10, "NRST"),
    ("R1", 1, "V3V3"), ("R1", 2, "NRST"),
    ("C5", 1, "NRST"), ("C5", 2, "GND"),
    ("R52", 1, "SWDIO"), ("R52", 2, "GND"),
    ("R53", 1, "SWCLK"), ("R53", 2, "GND"),
]
checks = []
for reference, pin_number, expected in expected_pin_nets:
    actual = net_names((reference, pin_number))
    assert actual == [expected], (reference, pin_number, actual, expected)
    checks.append({"reference": reference, "pin_number": pin_number,
                   "net": expected, "passed": True})

power_port = port_for(("J_SWD", 1))
assert net_names(("J_SWD", 1)) == []
assert not any(power_port["source_port_id"] in t["connected_source_port_ids"]
               for t in traces), "Programmer VOUT must remain disconnected"
assert root(port_for(("U8", 2))["source_port_id"]) != \
       root(port_for(("U1", 10))["source_port_id"]), \
       "Target reset must not disable the other SWD switch channels"

report = {
    "canonical_sha256": hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
    "official_package_version": official_package["version"],
    "official_interface": "StandardJstSwdResetSide; programmer J3, five-way JST SH",
    "official_physical_pin_labels": official_pin_labels,
    "target_connector_part": "C136657 / SM05B-SRSS-TB(LF)(SN)",
    "physical_pin_checks": checks,
    "wiring_checks_passed": True,
    "programmer_vout_disconnected": True,
    "nrst_independent_of_power_good": True,
    "target_series_resistance_ohms": {
        name: components[name]["resistance"] for name in ["R20", "R21", "R22"]
    },
    "official_recommended_swd_series_resistance_ohms": 100,
    "target_nrst_pullup_ohms": components["R1"]["resistance"],
    "target_nrst_capacitance_f": components["C5"]["capacitance"],
    "qualification": "Pinout compatible; hardware flashing and timing untested. "
                     "Target uses 1 kilohm series resistors and TMUX1511, "
                     "rather than the programmer example's 100 ohms; "
                     "maximum SWD rate requires waveform and flashing tests.",
    "usage": "Straight-through five-way cable from programmer J3 to J_SWD. "
             "Target requires its own qualified USB-C supply. "
             "Programmer SWD/reset logic is fixed 3.3 V. "
             "Load programmer CMSIS-DAP firmware; use STM32G0 OpenOCD target "
             "configuration with hardware reset. Start with a slow SWD clock.",
    "hardware_programming_verified": False,
    "prototype_fabrication_ready": False,
}
report_path.write_text(json.dumps(report, indent=2) + "\n")
print(f"Programmer wiring passed: {len(checks)} physical pin/net assertions; "
      "VOUT isolated. Timing and hardware programming remain unverified.")
