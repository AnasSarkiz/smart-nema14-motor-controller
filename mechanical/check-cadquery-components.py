"""Check actual STEP solids and export/reimport compatibility of fitted parts.

This checks file compatibility, not supplier accuracy, registration or fit.
Remote dependencies must be downloaded and independently verified before they
can be qualified; merely declaring a URL is insufficient.
"""
import hashlib
import json
import math
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import cadquery as cq


def check_step_model(model_path, export_directory):
    original_sha256 = hashlib.sha256(model_path.read_bytes()).hexdigest()
    imported_shapes = cq.importers.importStep(str(model_path)).vals()
    assert imported_shapes, "STEP imported no shapes"
    shape = cq.Compound.makeCompound(imported_shapes)
    solids = shape.Solids()
    assert shape.isValid(), "Invalid imported BRep"
    assert solids, "STEP contains no solids"
    assert all(solid.isValid() and solid.Volume() > 0 for solid in solids), \
        "Invalid or zero-volume solid"
    bounds = shape.BoundingBox()
    dimensions_mm = [bounds.xlen, bounds.ylen, bounds.zlen]
    assert all(math.isfinite(dimension) and dimension > 0 for dimension in dimensions_mm), \
        "Invalid model envelope"
    exported_path = export_directory / f"{original_sha256}.step"
    cq.exporters.export(shape, str(exported_path), exportType="STEP")
    roundtrip_shape = cq.Compound.makeCompound(
        cq.importers.importStep(str(exported_path)).vals()
    )
    assert roundtrip_shape.isValid(), "Export/reimport produced invalid BRep"
    assert len(roundtrip_shape.Solids()) == len(solids), "Roundtrip changed solid count"
    original_volume_mm3 = sum(solid.Volume() for solid in solids)
    roundtrip_volume_mm3 = sum(solid.Volume() for solid in roundtrip_shape.Solids())
    assert math.isclose(original_volume_mm3, roundtrip_volume_mm3, rel_tol=1e-6, abs_tol=1e-8), \
        "Roundtrip changed solid volume"
    roundtrip_bounds = roundtrip_shape.BoundingBox()
    for attribute in ["xmin", "xmax", "ymin", "ymax", "zmin", "zmax"]:
        assert math.isclose(getattr(bounds, attribute), getattr(roundtrip_bounds, attribute), abs_tol=1e-6), \
            "Roundtrip changed model bounds"
    assert hashlib.sha256(model_path.read_bytes()).hexdigest() == original_sha256, \
        "Original supplier model was modified"
    return {
        "sha256": original_sha256,
        "valid_brep": True,
        "solid_count": len(solids),
        "volume_mm3": original_volume_mm3,
        "dimensions_mm": dimensions_mm,
        "step_export_reimport_passed": True,
    }


def review_components(circuit_path, review_output):
    report_path = review_output["report_path"]
    remote_models = review_output["remote_models"]
    circuit_bytes = circuit_path.read_bytes()
    circuit = json.loads(circuit_bytes)
    sources = {
        component["source_component_id"]: component
        for component in circuit if component["type"] == "source_component"
    }
    models = {
        model["pcb_component_id"]: model
        for model in circuit if model["type"] == "cad_component" and model.get("pcb_component_id")
    }
    fitted_components = [
        component for component in circuit
        if component["type"] == "pcb_component" and not component.get("do_not_place", False)
    ]
    model_results = {}
    component_results = []
    with tempfile.TemporaryDirectory(prefix="nema-cadquery-") as temporary_directory:
        for component in fitted_components:
            source = sources[component["source_component_id"]]
            reference = source["name"]
            model = models.get(component["pcb_component_id"], {})
            step_url = model.get("model_step_url")
            result = {
                "reference": reference,
                "supplier_part_numbers": source.get("supplier_part_numbers", {}),
                "is_chip": reference.startswith("U"),
                "model_step_url": step_url,
                "passed": False,
            }
            if not step_url:
                result["error"] = "No STEP model for default fitted component"
            elif step_url.startswith(("https://", "http://")) and step_url not in remote_models:
                result["error"] = "Remote STEP dependency not locally verified"
            else:
                remote_model = remote_models.get(step_url)
                model_path = Path(remote_model["path"] if remote_model else step_url)
                if step_url not in model_results:
                    try:
                        if remote_model:
                            assert remote_model["download_http_status"] == 200, "Remote download did not succeed"
                            assert hashlib.sha256(model_path.read_bytes()).hexdigest() == remote_model["sha256"], \
                                "Downloaded remote model checksum changed"
                        model_results[step_url] = {
                            "passed": True,
                            **check_step_model(model_path, Path(temporary_directory)),
                        }
                    except Exception as error:
                        model_results[step_url] = {
                            "passed": False,
                            "error": f"{type(error).__name__}: {error}",
                        }
                    print(f"Checked STEP {len(model_results)}: {model_path.name}", flush=True)
                result.update(model_results[step_url])
            component_results.append(result)
    chip_results = [result for result in component_results if result["is_chip"]]
    report = {
        "checked_at_utc": datetime.now(timezone.utc).isoformat(),
        "cadquery_version": cq.__version__,
        "canonical_sha256": hashlib.sha256(circuit_bytes).hexdigest(),
        "scope": "Default fitted component STEP import, valid solids, unchanged original bytes and export/reimport; not footprint registration, electrical correctness or mechanical fit",
        "fitted_component_count": len(fitted_components),
        "unique_step_model_count": len(model_results),
        "verified_remote_step_urls": sorted(remote_models),
        "chip_count": len(chip_results),
        "all_chip_models_passed": bool(chip_results) and all(result["passed"] for result in chip_results),
        "all_fitted_component_models_passed": bool(component_results) and all(result["passed"] for result in component_results),
        "component_results": component_results,
        "prototype_fabrication_ready": False,
    }
    report_path.write_text(json.dumps(report, indent=2) + "\n")
    print(f"Chip STEP compatibility: {sum(result['passed'] for result in chip_results)}/{len(chip_results)}", flush=True)
    print(f"All fitted components: {sum(result['passed'] for result in component_results)}/{len(component_results)}", flush=True)
    return report["all_fitted_component_models_passed"]


if __name__ == "__main__":
    assert len(sys.argv) in [3, 4], "Supply native Circuit JSON, output report and optional verified remote-model manifest paths"
    remote_models = json.loads(Path(sys.argv[3]).read_text()) if len(sys.argv) == 4 else {}
    passed = review_components(Path(sys.argv[1]), {
        "report_path": Path(sys.argv[2]),
        "remote_models": remote_models,
    })
    sys.exit(0 if passed else 1)
