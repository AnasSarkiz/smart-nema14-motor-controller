"""Verify the native libraries and TLS trust store before a Cloud install."""

import ctypes
import ctypes.util
import ssl
import sys

if sys.platform != "linux":
    raise SystemExit("Native Cloud runtime verification requires Linux.")

for library in ("GL", "glib-2.0", "Xrender", "Xext", "SM", "fontconfig"):
    resolved = ctypes.util.find_library(library)
    if not resolved:
        raise SystemExit(f"Missing required native library: {library}")
    try:
        ctypes.CDLL(resolved)
    except OSError as error:
        raise SystemExit(f"Cannot load native library {library}: {error}") from error
    print(f"Verified native library: {library}")

if not ssl.create_default_context().get_ca_certs():
    raise SystemExit("Missing system CA certificates; TLS verification must stay enabled.")
print("Verified system TLS trust store.")
