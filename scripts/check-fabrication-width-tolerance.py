"""Apply fabricator width tolerance to the retained motor-current screen.

This is an IPC-2221 analytical screen, not a prediction of operating temperature.
The nominal-width report is preserved. A failed screen prevents ordering approval.
"""
import hashlib
import json
import sys
from pathlib import Path

nominal_path = Path(sys.argv[1])
report_path = Path(sys.argv[2])
nominal = json.loads(nominal_path.read_text())
canonical_path = Path(nominal["input"])
assert hashlib.sha256(canonical_path.read_bytes()).hexdigest() == \
       nominal["canonical_sha256"]

minimum_width_fraction = 0.8
ipc2221_area_exponent = 0.725
phase_peak_a = nominal["phase_peak_screen_a"]
motor_results = []
violations = []
for net in nominal["nets"]:
    if not net["net"].startswith("MOTOR_"):
        continue
    adjusted_segments = []
    for segment in net["segments"]:
        adjusted_capacity_a = segment["ipc2221_30c_screen_a"] * \
                              minimum_width_fraction ** ipc2221_area_exponent
        required_nominal_width_mm = segment["width_mm"] * \
            (phase_peak_a / segment["ipc2221_30c_screen_a"]) ** \
            (1 / ipc2221_area_exponent) / minimum_width_fraction
        result = {
            "net": net["net"], "trace_id": segment["trace_id"],
            "segment_index": segment["segment_index"], "layer": segment["layer"],
            "length_mm": segment["length_mm"],
            "nominal_width_mm": segment["width_mm"],
            "minimum_screened_finished_width_mm": segment["width_mm"] *
                                                   minimum_width_fraction,
            "adjusted_30c_screen_capacity_a": adjusted_capacity_a,
            "phase_peak_a": phase_peak_a,
            "required_nominal_width_mm_under_same_model": required_nominal_width_mm,
            "passed": adjusted_capacity_a >= phase_peak_a,
        }
        adjusted_segments.append(result)
        if not result["passed"]:
            violations.append(result)
    motor_results.append({
        "net": net["net"],
        "minimum_adjusted_capacity_a": min(s["adjusted_30c_screen_capacity_a"]
                                          for s in adjusted_segments),
        "passed": all(s["passed"] for s in adjusted_segments),
    })

assert len(motor_results) == 4
report = {
    "canonical_sha256": nominal["canonical_sha256"],
    "nominal_width_audit_sha256": hashlib.sha256(nominal_path.read_bytes()).hexdigest(),
    "official_source_url": "https://jlcpcb.com/capabilities/pcb-capabilities",
    "official_rule_quote": "Track width tolerance ±20%; for a 0.1 mm track, "
                           "finished track width ranges from 0.08 to 0.12 mm.",
    "minimum_width_fraction": minimum_width_fraction,
    "copper_and_thermal_model": nominal["model"],
    "stackup": nominal["stackup"],
    "scope": "Retains the prior peak-current and 30 C rise screen, applying "
             "the fabricator's published width tolerance. Copper thickness "
             "remains the recorded analytical assumption, not a confirmed minimum. "
             "Reports the conservative screen outcome; does not predict physical temperature.",
    "motor_nets": motor_results,
    "violations": violations,
    "passed": not violations,
    "next_action": "Requalify motor paths for manufacturing tolerances and actual "
                   "minimum copper. Under the retained model, internal motor tracks "
                   "need approximately 0.27 mm nominal; widening must also pass "
                   "clearance, filled-pour and routing checks. Do not edit exported JSON.",
    "prototype_fabrication_ready": False,
}
report_path.write_text(json.dumps(report, indent=2) + "\n")
print(f"Motor manufacturing-tolerance screen: {len(violations)} failing segments; "
      f"{sum(r['passed'] for r in motor_results)}/4 nets pass. "
      "Actual generated widths are measured; copper minimum still needs CAM confirmation.")
sys.exit(0 if report["passed"] else 1)
