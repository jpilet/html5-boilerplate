#!/bin/bash
set -e

ROOT=$(cd "$(dirname "$0")/.." ; pwd)

php -e "${ROOT}/index_root.php" "l=fr" > "${ROOT}/index_fr.html"
php -e "${ROOT}/index_root.php" "l=en" > "${ROOT}/index_en.html"
