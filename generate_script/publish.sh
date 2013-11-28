#!/bin/bash

set -e

ROOT=$(cd "$(dirname "$0")/.." ; pwd)

"${ROOT}/generate_script/gen_pages.sh"

TMP="/tmp/opticode-ftp-upload"

rm -fR "${TMP}"
mkdir "${TMP}"

rsync -ar \
    --exclude "doc" \
    --exclude "generate_script" \
    --exclude "content" \
    --exclude "index_root.php" \
    --exclude "*.md" \
    --exclude ".git*" \
    --exclude ".DS_Store" \
    --exclude ".project" \
    "${ROOT}/"* "${TMP}"

ncftpput -z -R opticode www "${TMP}/"*

rm -fR "${TMP}"
