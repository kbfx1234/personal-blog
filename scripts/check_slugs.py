#!/usr/bin/env python3
"""
Validate slugs across content/posts/*.md.

Rules (mirrors tests/fixtures/slug.ts and AC 7.4/7.5):
- Each post's slug must match ^[a-z0-9-]{1,100}$
- Slugs must be globally unique across content/posts/

Exits non-zero with a clear message on the first failure category.
"""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path
from collections import defaultdict

SLUG_RE = re.compile(r"^[a-z0-9-]{1,100}$")


def read_front_matter(path: Path) -> dict[str, str]:
    """Extract a flat string-key map from TOML or YAML front matter.

    Only fields we care about — slug — are needed; we do a light parse to
    avoid pulling in pyyaml / tomli deps. Returns {} if no front matter.
    """
    text = path.read_text(encoding="utf-8")
    fm: dict[str, str] = {}

    # TOML: +++ ... +++
    m = re.match(r"\+\+\+\s*\n(.*?)\n\+\+\+", text, re.S)
    if m:
        for line in m.group(1).splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            kv = re.match(r"([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)", line)
            if not kv:
                continue
            k, v = kv.group(1), kv.group(2).strip()
            if (v.startswith("'") and v.endswith("'")) or (
                v.startswith('"') and v.endswith('"')
            ):
                v = v[1:-1]
            fm[k] = v
        return fm

    # YAML: --- ... ---
    m = re.match(r"---\s*\n(.*?)\n---", text, re.S)
    if m:
        for line in m.group(1).splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            kv = re.match(r"([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)", line)
            if not kv:
                continue
            k, v = kv.group(1), kv.group(2).strip()
            if (v.startswith("'") and v.endswith("'")) or (
                v.startswith('"') and v.endswith('"')
            ):
                v = v[1:-1]
            fm[k] = v
    return fm


def main(roots: list[str]) -> int:
    errors: list[str] = []
    slug_to_files: dict[str, list[Path]] = defaultdict(list)

    for root in roots:
        root_path = Path(root)
        if not root_path.exists():
            continue
        for md in sorted(root_path.rglob("*.md")):
            fm = read_front_matter(md)
            slug = fm.get("slug")
            if slug is None:
                # Hugo will derive slug from filename — skip silently.
                continue
            if not SLUG_RE.fullmatch(slug):
                errors.append(
                    f"{md}: slug '{slug}' fails ^[a-z0-9-]{{1,100}}$"
                )
            slug_to_files[slug].append(md)

    for slug, files in slug_to_files.items():
        if len(files) > 1:
            joined = "\n  ".join(str(f) for f in files)
            errors.append(
                f"slug '{slug}' is not unique; appears in:\n  {joined}"
            )

    if errors:
        print("[check_slugs] FAILED:")
        for e in errors:
            print(f"  - {e}")
        return 1

    total = sum(len(v) for v in slug_to_files.values())
    print(f"[check_slugs] OK ({total} slug(s) checked)")
    return 0


if __name__ == "__main__":
    args = sys.argv[1:] or ["content"]
    sys.exit(main(args))
