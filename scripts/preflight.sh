#!/usr/bin/env bash
# preflight.sh — run before pushing to Cloudflare Pages.
#
# Checks (in order, fail fast):
#   1. No {PLACEHOLDER} tokens left in committed config / content / templates / static
#   2. Sitemap line in static/robots.txt agrees with hugo.toml baseURL
#   3. Slug validity & uniqueness across content/posts/
#   4. Front matter constraints across content/posts/
#   5. hugo --minify --gc builds cleanly
#   6. All internal links in public/ resolve

set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$(pwd)"
echo "preflight: working in $ROOT"

SKIP_PLACEHOLDERS=0
for arg in "$@"; do
  case "$arg" in
    --skip-placeholders) SKIP_PLACEHOLDERS=1 ;;
    *) echo "unknown arg: $arg" ; exit 2 ;;
  esac
done

# 1. Placeholder check -------------------------------------------------------
echo
if [ "$SKIP_PLACEHOLDERS" = "1" ]; then
  echo "[1/6] placeholder scan SKIPPED (--skip-placeholders)"
else
  echo "[1/6] placeholder scan"
# Files we want to check for residual {SCREAMING_SNAKE} placeholders.
# We exclude .kiro/ (spec docs intentionally use placeholders), node_modules/,
# tmp/, public/, resources/, themes/ (third-party), and this script.
#
# Whitelist patterns: lines that contain `placeholder` or `PLACEHOLDER` in the
# same line are treated as documentation and skipped. This lets template /
# config files reference the concept without tripping the scan.
PLACEHOLDER_HITS=$(grep -nE '\{[A-Z][A-Z0-9_]+\}' \
  --include='*.toml' --include='*.md' --include='*.html' --include='*.txt' \
  --exclude-dir=.kiro --exclude-dir=node_modules --exclude-dir=tmp \
  --exclude-dir=public --exclude-dir=resources --exclude-dir=themes \
  --exclude-dir=docs \
  -r . | grep -viE '(placeholder)' || true)

if [ -n "$PLACEHOLDER_HITS" ]; then
  echo "FAIL — placeholders still present:"
  echo "$PLACEHOLDER_HITS"
  exit 1
fi
echo "  ok"
fi  # end of placeholder block

# 2. robots.txt vs baseURL ---------------------------------------------------
echo
echo "[2/6] robots.txt Sitemap line matches baseURL"
BASE=$(grep -E '^baseURL' hugo.toml | head -1 | sed -E 's|.*"([^"]+)/?".*|\1|' | sed 's|/$||')
EXPECT="Sitemap: ${BASE}/sitemap.xml"
if ! grep -Fxq "$EXPECT" static/robots.txt; then
  echo "FAIL — expected line in static/robots.txt:"
  echo "  $EXPECT"
  echo "actual robots.txt:"
  cat static/robots.txt
  exit 1
fi
echo "  ok ($EXPECT)"

# 3. Slug validity -----------------------------------------------------------
echo
echo "[3/6] slug validation"
python3 scripts/check_slugs.py content || exit 1

# 4. Front matter ------------------------------------------------------------
echo
echo "[4/6] front matter validation"
python3 scripts/check_frontmatter.py content/posts || exit 1

# 5. Build -------------------------------------------------------------------
echo
echo "[5/6] hugo build"
rm -rf public resources
hugo --minify --gc
test -f public/index.html

# 6. Internal links ----------------------------------------------------------
echo
echo "[6/6] internal link check"
node scripts/check_internal_links.mjs public

echo
echo "preflight: ALL CHECKS PASSED"
