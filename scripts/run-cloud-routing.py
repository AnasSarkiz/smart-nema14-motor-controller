"""Supervise one official tscircuit routing job on Linux; never alter copper."""
import argparse
import fcntl
import json
import os
import shutil
import signal
import subprocess
import sys
import time
from pathlib import Path


def memory_limit_mb():
    limits = []
    for line in Path('/proc/meminfo').read_text().splitlines():
        if line.startswith('MemTotal:'):
            limits.append(int(line.split()[1]) // 1024)
    for candidate in ['/sys/fs/cgroup/memory.max',
                      '/sys/fs/cgroup/memory/memory.limit_in_bytes']:
        path = Path(candidate)
        if path.exists():
            limit = path.read_text().strip()
            if limit.isdigit():
                limits.append(int(limit) // (1024 * 1024))
    return int(min(limits) * .70)


def group_rss_mb(process_group_id):
    rss_kb = 0
    for directory in Path('/proc').iterdir():
        if not directory.name.isdigit():
            continue
        try:
            if os.getpgid(int(directory.name)) != process_group_id:
                continue
            for line in (directory / 'status').read_text().splitlines():
                if line.startswith('VmRSS:'):
                    rss_kb += int(line.split()[1])
        except (ProcessLookupError, FileNotFoundError):
            continue  # A process can exit while /proc is being sampled.
    return rss_kb / 1024


def stop_process_group(process):
    if process.poll() is not None:
        return
    os.killpg(process.pid, signal.SIGTERM)
    try:
        process.wait(timeout=10)
    except subprocess.TimeoutExpired:
        os.killpg(process.pid, signal.SIGKILL)
        process.wait()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('circuit_source')
    parser.add_argument('evidence_folder')
    parser.add_argument('--timeout-seconds', type=int, default=900)
    parser.add_argument('--memory-mb', type=int)
    parser.add_argument('--native-pipeline9-input', help='Replay an unchanged captured core Pipeline9 event with public SDK mesh options.')
    parser.add_argument('--search-bounds-file', help='Native SRJ solver-domain rectangle only; preserve every obstacle and rule. Full-board source replay remains required.')
    parser.add_argument('--max-node-dimension', type=float, default=3)
    parser.add_argument('--max-node-ratio', type=float, default=30)
    parser.add_argument('--min-node-area', type=float, default=.01)
    parser.add_argument('--capture-before-repair', action='store_true', help='Save a clearly unqualified candidate through Pipeline9 public pre-expansion API; all qualification checks remain mandatory.')
    parser.add_argument('--capture-native-input-only', action='store_true', help='Capture the exact supported core routing-start event without spending a default-mesh routing attempt; exits nonzero because routing is incomplete.')
    parser.add_argument('--capture-routing-phase-index', type=int, default=1, help='Exact native phase to capture; use 3 after accepted phase-2 power fanouts.')
    arguments = parser.parse_args()
    if arguments.capture_routing_phase_index < 0:
        parser.error('Capture routing phase index must be nonnegative.')
    if arguments.capture_routing_phase_index != 1 and not arguments.capture_native_input_only:
        parser.error('Capture phase selection requires native input capture.')
    if arguments.capture_native_input_only and arguments.native_pipeline9_input:
        parser.error('Input capture and SDK routing are separate sequential operations.')
    if sys.platform != 'linux':
        parser.error('Routing is Cloud/Linux only; local Mac routing is disabled.')
    if arguments.timeout_seconds <= 0:
        parser.error('Timeout must be positive.')
    repository = Path(__file__).resolve().parent.parent
    os.chdir(repository)
    source = Path(arguments.circuit_source).resolve()
    source.relative_to(repository)
    if not source.is_file():
        parser.error('Circuit source does not exist.')
    native_input = None
    if arguments.native_pipeline9_input:
        native_input = Path(arguments.native_pipeline9_input).resolve()
        native_input.relative_to(repository)
        if not native_input.is_file():
            parser.error('Captured native input does not exist.')
        import math
        if not math.isfinite(arguments.max_node_dimension) or arguments.max_node_dimension <= 0:
            parser.error('Maximum node dimension must be finite and positive.')
        if not math.isfinite(arguments.max_node_ratio) or arguments.max_node_ratio < 1:
            parser.error('Maximum node ratio must be finite and at least 1.')
        if not math.isfinite(arguments.min_node_area) or arguments.min_node_area <= 0:
            parser.error('Minimum node area must be finite and positive.')
    output = Path(arguments.evidence_folder).resolve()
    output.relative_to(repository)
    output.mkdir(parents=True, exist_ok=True)
    if any(output.iterdir()):
        parser.error('Use a new evidence folder; previous results must be preserved.')
    budget = memory_limit_mb()
    if arguments.memory_mb is not None:
        if not 0 < arguments.memory_mb <= budget:
            parser.error(f'Memory budget must be between 1 and {budget} MiB.')
        budget = arguments.memory_mb
    bun = shutil.which('bun', path=f'{repository}/.cloud-tools/bun/bin:{os.environ.get("PATH", "")}')
    if not bun:
        parser.error('Run scripts/cloud-setup.sh first.')
    with open('.cloud-routing.lock', 'w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        command = [bun, 'scripts/run-native-routing.mjs', str(source), str(output)]
        if arguments.capture_native_input_only:
            command.append('capture-input-only')
            command.append(str(arguments.capture_routing_phase_index))
        if native_input is not None:
            command = [bun, 'scripts/run-pipeline9-sdk-routing.ts', str(native_input),
                       str(output), str(arguments.max_node_dimension),
                       str(arguments.max_node_ratio), str(arguments.min_node_area),
                       'capture-before-repair' if arguments.capture_before_repair else 'full-pipeline-only']
            if arguments.search_bounds_file:
                search_bounds_file = Path(arguments.search_bounds_file).resolve()
                search_bounds_file.relative_to(repository)
                if not search_bounds_file.is_file():
                    parser.error('Search bounds file does not exist.')
                command.append(str(search_bounds_file))
        elif arguments.search_bounds_file:
            parser.error('Search bounds apply only to native Pipeline9 SDK input.')
        started = time.monotonic()
        peak_rss = 0
        termination = None
        with (output / 'BUILD.log').open('w') as log:
            process = subprocess.Popen(command, stdout=log, stderr=subprocess.STDOUT,
                                       start_new_session=True)
            try:
                while process.poll() is None:
                    peak_rss = max(peak_rss, group_rss_mb(process.pid))
                    if peak_rss > budget:
                        termination = 'memory_budget_exceeded'
                        break
                    if time.monotonic() - started > arguments.timeout_seconds:
                        termination = 'timeout'
                        break
                    time.sleep(1)
            finally:
                stop_process_group(process)
                status = {'command': command, 'exit_code': process.returncode,
                          'termination': termination, 'memory_budget_mb': budget,
                          'peak_sampled_group_rss_mb': peak_rss,
                          'elapsed_seconds': time.monotonic() - started,
                          'sampling_note': 'One-second RSS samples; shared pages can be counted more than once. This is a conservative process guard, not an OS memory reservation.'}
                (output / 'BUILD-STATUS.json').write_text(json.dumps(status, indent=2) + '\n')
        print(json.dumps(status))
        return 124 if termination else (process.returncode if process.returncode >= 0 else 1)


if __name__ == '__main__':
    sys.exit(main())
