#!/bin/bash

set -e

ROOT=$(cd "$(dirname "$0")/.." ; pwd)
IMG="${ROOT}/img"

convert -resize 50% "${IMG}/code_high_res.png" -define "png:compression-level=9" -type palette "${IMG}/code.png"
convert -resize 50% "${IMG}/code_review_high_res.png" -define "png:compression-level=9" "${IMG}/codereview.png"
