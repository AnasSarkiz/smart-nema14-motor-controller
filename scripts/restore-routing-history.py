"""Verify and optionally restore archived routing evidence into a separate directory."""
import argparse
import hashlib
import json
import tarfile
import tempfile
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--verify-only', action='store_true')
arguments = parser.parse_args()
repository = Path(__file__).resolve().parent.parent
manifest = json.loads((repository / 'docs/cloud/ROUTING-HISTORY-MANIFEST.json').read_text())
with tempfile.TemporaryFile() as reconstructed:
    combined = hashlib.sha256()
    for part in manifest['parts']:
        digest = hashlib.sha256()
        byte_count = 0
        with (repository / part['path']).open('rb') as stream:
            while chunk := stream.read(1024 * 1024):
                reconstructed.write(chunk)
                digest.update(chunk)
                combined.update(chunk)
                byte_count += len(chunk)
        assert digest.hexdigest() == part['sha256'], f'Archive part mismatch: {part["path"]}'
        assert byte_count == part['bytes']
    assert combined.hexdigest() == manifest['archive_sha256'], 'Combined archive mismatch'
    if not arguments.verify_only:
        output = repository / 'evidence/archived-rev20'
        assert not output.exists(), 'Archive destination already exists; preserve prior evidence'
        reconstructed.seek(0)
        with tarfile.open(fileobj=reconstructed, mode='r:gz') as archive:
            archive.extractall(path=output, filter='data')
        for entry in manifest['files']:
            with (output / entry['path']).open('rb') as stream:
                digest = hashlib.file_digest(stream, 'sha256').hexdigest()
            assert digest == entry['sha256'], f'Archived evidence mismatch: {entry["path"]}'
        print(f'Restored {len(manifest["files"])} verified evidence files into {output}')
    else:
        print(f'Verified {len(manifest["parts"])} parts of the full routing evidence archive')
