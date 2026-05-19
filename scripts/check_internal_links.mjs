#!/usr/bin/env node
/**
 * Walk public/**\/*.html and assert every internal href ('/foo' style)
 * resolves to a real file under public/.
 *
 * Resolution order (Property 14):
 *   public${href}             — exact file
 *   public${href}/index.html  — directory page
 *   public${href}.html        — pretty-URL fallback
 *
 * Skips: external URLs, mailto:, tel:, hash-only links, query-only links.
 * Also skips href="" and href="#anchor".
 */
import { readFile, readdir, stat } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { existsSync } from "node:fs";
import { load } from "cheerio";

const PUBLIC_ROOT = resolve(process.argv[2] || "public");

async function* walkHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkHtml(p);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      yield p;
    }
  }
}

function stripFragmentAndQuery(href) {
  return href.split("#")[0].split("?")[0];
}

function isInternal(href) {
  if (!href) return false;
  if (href.startsWith("//")) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return false; // scheme://
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (href.startsWith("#")) return false;
  return href.startsWith("/");
}

function resolves(rootedHref) {
  // rootedHref starts with '/'; URL-decode for filesystem lookup so that
  // '/categories/%E6%9D%82%E8%AE%B0/' matches the on-disk dir '/categories/杂记/'.
  let decoded;
  try {
    decoded = decodeURIComponent(rootedHref);
  } catch {
    decoded = rootedHref;
  }
  const candidates = [
    join(PUBLIC_ROOT, decoded),
    join(PUBLIC_ROOT, decoded, "index.html"),
    join(PUBLIC_ROOT, decoded + ".html"),
  ];
  // Also strip trailing slash for the .html fallback
  if (decoded.endsWith("/")) {
    candidates.push(
      join(PUBLIC_ROOT, decoded.slice(0, -1) + ".html"),
    );
  }
  return candidates.some((p) => existsSync(p));
}

// Pagefind assets are emitted by `npx pagefind --site public` during
// `npm run build:full` (task 7.4), not by `hugo` alone. Treat /pagefind/*
// as expected-missing in plain `hugo --minify --gc` runs.
function isPagefindAsset(rootedHref) {
  return rootedHref.startsWith("/pagefind/");
}

async function main() {
  if (!existsSync(PUBLIC_ROOT)) {
    console.error(`[check_internal_links] no such dir: ${PUBLIC_ROOT}`);
    process.exit(2);
  }
  const broken = [];
  let pages = 0;
  let links = 0;
  for await (const file of walkHtml(PUBLIC_ROOT)) {
    pages++;
    const html = await readFile(file, "utf8");
    const $ = load(html);
    $("a[href], link[href]").each((_, el) => {
      const raw = $(el).attr("href");
      if (!raw) return;
      const href = stripFragmentAndQuery(raw);
      if (!isInternal(href)) return;
      if (isPagefindAsset(href)) return;
      links++;
      if (!resolves(href)) {
        broken.push({ file, href: raw });
      }
    });
  }
  if (broken.length > 0) {
    console.error(`[check_internal_links] FAILED — ${broken.length} broken link(s):`);
    for (const { file, href } of broken.slice(0, 50)) {
      console.error(`  - ${file} -> ${href}`);
    }
    if (broken.length > 50) {
      console.error(`  ... and ${broken.length - 50} more`);
    }
    process.exit(1);
  }
  console.log(
    `[check_internal_links] OK (${pages} page(s), ${links} internal link(s) checked)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
