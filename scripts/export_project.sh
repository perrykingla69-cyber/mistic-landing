#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${1:-$ROOT_DIR/dist}"
PROJECT_NAME="mistic-landing"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

mkdir -p "$OUTPUT_DIR"

ZIP_FILE="$OUTPUT_DIR/${PROJECT_NAME}-${TIMESTAMP}.zip"
TAR_FILE="$OUTPUT_DIR/${PROJECT_NAME}-${TIMESTAMP}.tar.gz"

cd "$ROOT_DIR"

# Empaqueta el proyecto completo, excluyendo artefactos locales comunes
zip -r "$ZIP_FILE" . \
  -x "./.git/*" \
     "./dist/*" \
     "./node_modules/*" \
     "./.env" \
     "./*.log"

tar --exclude='.git' \
    --exclude='dist' \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='*.log' \
    -czf "$TAR_FILE" .

echo "ZIP generado: $ZIP_FILE"
echo "TAR generado: $TAR_FILE"
