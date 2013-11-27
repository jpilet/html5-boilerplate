#!/bin/bash

set -e

ROOT=$(cd "$(dirname "$0")/.." ; pwd)

TMP="/tmp/opticode-ftp-upload"

rm -fR "${TMP}"
mkdir "${TMP}"

rsync -ar \
    --exclude "doc" \
    --exclude "generate_script" \
    --exclude "*.md" \
    --exclude ".git*" \
    --exclude ".DS_Store" \
    --exclude ".project" \
    "${ROOT}/"* "${TMP}"

ncftpput -z -R opticode www "${TMP}/"*

rm -fR "${TMP}"
