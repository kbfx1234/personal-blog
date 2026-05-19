#!/usr/bin/env python3
"""
Validate front matter constraints for content/posts/*.md.

Rules (AC 8.2 / 8.3):
- title: required, ≤ 200 chars
- date:  required, ISO 8601-ish (YYYY-MM-DD or full ISO datetime)
- draft: required, must be 'true' or 'false' (lowercase)
- description: optional, ≤ 160 chars
- summary:     optional, ≤ 300 chars
- tags:        optional array, ≤ 10 items, each ≤ 30 chars
- slug:        optional, validated separately by check_slugs.py

Exits non-zero on first error batch (collected per-file).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$")


def read_front_matter_lines(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    fm: dict[str, str] = {}

    m = re.match(r"\+\+\+\s*\n(.*?)\n\+\+\+", text, re.S)
    delim = "+++" if m else None
    if not m:
        m = re.match(r"---\s*\n(.*?)\n---", text, re.S)
        delim = "---" if m else None
    if not m:
        return fm

    sep = "=" if delim == "+++" else ":"
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        kv = re.match(rf"([A-Za-z_][A-Za-z0-9_]*)\s*{re.escape(sep)}\s*(.+)", line)
        if not kv:
            continue
        k, v = kv.group(1), kv.group(2).strip()
        # strip surrounding quotes (single or double) once
        if (v.startswith("'") and v.endswith("'")) or (
            v.startswith('"') and v.endswith('"')
        ):
            v = v[1:-1]
        fm[k] = v
    return fm


def parse_array(raw: str) -> list[str]:
    """Crude parser for [a, b, "c"] style arrays."""
    raw = raw.strip()
    if not (raw.startswith("[") and raw.endswith("]")):
        return []
    inner = raw[1:-1].strip()
    if not inner:
        return []
    items: list[str] = []
    # Simple split on commas not inside quotes.
    cur: list[str] = []
    in_q: str | None = None
    for ch in inner:
        if in_q:
            if ch == in_q:
                in_q = None
            else:
                cur.append(ch)
        elif ch in "'\"":
            in_q = ch
        elif ch == ",":
            items.append("".join(cur).strip())
            cur = []
        else:
            cur.append(ch)
    if cur:
        items.append("".join(cur).strip())
    # Strip residual quotes
    return [
        i[1:-1] if (i.startswith("'") and i.endswith("'")) or (i.startswith('"') and i.endswith('"')) else i
        for i in items
    ]


def validate_file(path: Path) -> list[str]:
    errors: list[str] = []
    fm = read_front_matter_lines(path)

    # Required
    title = fm.get("title")
    if title is None:
        errors.append("missing required: title")
    elif len(title) > 200:
        errors.append(f"title too long ({len(title)} > 200)")

    date = fm.get("date")
    if date is None:
        errors.append("missing required: date")
    elif not DATE_RE.match(date):
        errors.append(f"date '{date}' not ISO 8601")

    draft = fm.get("draft")
    if draft is None:
        errors.append("missing required: draft")
    elif draft not in ("true", "false"):
        errors.append(f"draft must be 'true' or 'false', got: {draft!r}")

    # Optional bounds
    desc = fm.get("description")
    if desc is not None and len(desc) > 160:
        errors.append(f"description too long ({len(desc)} > 160)")

    summary = fm.get("summary")
    if summary is not None and len(summary) > 300:
        errors.append(f"summary too long ({len(summary)} > 300)")

    tags_raw = fm.get("tags")
    if tags_raw is not None:
        tags = parse_array(tags_raw)
        if len(tags) > 10:
            errors.append(f"too many tags ({len(tags)} > 10)")
        for t in tags:
            if len(t) > 30:
                errors.append(f"tag '{t}' too long ({len(t)} > 30)")

    return [f"{path}: {e}" for e in errors]


def main(root: str = "content/posts") -> int:
    base = Path(root)
    if not base.exists():
        print(f"[check_frontmatter] no directory: {base}")
        return 0
    all_errors: list[str] = []
    n = 0
    for md in sorted(base.rglob("*.md")):
        n += 1
        all_errors.extend(validate_file(md))
    if all_errors:
        print("[check_frontmatter] FAILED:")
        for e in all_errors:
            print(f"  - {e}")
        return 1
    print(f"[check_frontmatter] OK ({n} file(s) checked)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "content/posts"))
