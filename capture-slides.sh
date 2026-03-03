#!/bin/bash
# Wrapper for capture-slides.mjs
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
node "$SCRIPT_DIR/capture-slides.mjs" "$@"
