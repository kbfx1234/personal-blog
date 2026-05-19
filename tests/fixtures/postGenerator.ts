/**
 * fast-check arbitraries + helpers for property-based tests of build artifacts.
 *
 * Used directly in tests/properties/* (lightweight unit-style PBT) and
 * tests/build/* (full hugo build → public/ inspection).
 */

import * as fc from "fast-check";
import { mkdir, writeFile, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

/** Slug arbitrary: matches the production validator regex. */
export const slugArb = fc
  .stringMatching(/^[a-z0-9-]{1,100}$/)
  .filter((s) => s.length > 0);

/** Tag arbitrary: 1–30 chars, allows unicode. */
export const tagArb = fc
  .string({ minLength: 1, maxLength: 30 })
  .filter((s) => s.trim().length > 0);

/** ISO 8601 date in the past 5 years (no future dates → buildFuture rules). */
export const dateArb = fc
  .integer({ min: 0, max: 5 * 365 })
  .map((daysAgo) => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - daysAgo);
    return d.toISOString().slice(0, 10);
  });

/** Single post fixture — title may include CJK + emoji to stress truncation. */
export interface PostFixture {
  title: string;
  date: string;
  slug: string;
  draft: boolean;
  tags: string[];
  categories: string[];
  summary: string;
  description: string;
}

export const postArb: fc.Arbitrary<PostFixture> = fc.record({
  title: fc
    .string({ minLength: 1, maxLength: 200 })
    .filter((s) => s.trim().length > 0),
  date: dateArb,
  slug: slugArb,
  draft: fc.boolean().map((b) => b && Math.random() < 0.3), // ≈30% drafts
  tags: fc.array(tagArb, { minLength: 0, maxLength: 10 }),
  categories: fc.array(tagArb, { minLength: 0, maxLength: 5 }),
  summary: fc.string({ minLength: 0, maxLength: 300 }),
  description: fc.string({ minLength: 0, maxLength: 160 }),
});

/** Posts collection — bounded size, slugs deduplicated. */
export const postsArb: fc.Arbitrary<PostFixture[]> = fc
  .array(postArb, { minLength: 0, maxLength: 30 })
  .map((posts) => {
    const seen = new Set<string>();
    return posts.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
  });

// ---------------------------------------------------------------------------
// Helpers — write a temp Hugo site & run a build
// ---------------------------------------------------------------------------

const REPO_ROOT = new URL("../..", import.meta.url).pathname;

/**
 * Render a PostFixture into Markdown with TOML front matter.
 */
export function renderPost(p: PostFixture): string {
  const fm = [
    "+++",
    `title = ${JSON.stringify(p.title)}`,
    `date = ${p.date}T00:00:00Z`,
    `draft = ${p.draft}`,
    `slug = ${JSON.stringify(p.slug)}`,
    `tags = ${JSON.stringify(p.tags)}`,
    `categories = ${JSON.stringify(p.categories)}`,
    `summary = ${JSON.stringify(p.summary)}`,
    `description = ${JSON.stringify(p.description)}`,
    `images = ["/og-default.png"]`,
    `math = false`,
    "+++",
    "",
    "Body content.",
    "",
  ].join("\n");
  return fm;
}

/**
 * Materialize a minimal Hugo project rooted at `siteDir`. Copies theme,
 * layouts, assets, static, archetypes, and hugo.toml from the live repo,
 * then writes the given posts under content/posts/ and a minimal about.md.
 */
export async function writeTempSite(
  siteDir: string,
  posts: PostFixture[],
): Promise<void> {
  await mkdir(siteDir, { recursive: true });

  // Copy structural directories that Hugo needs.
  for (const sub of ["themes", "layouts", "assets", "static", "archetypes"]) {
    const src = join(REPO_ROOT, sub);
    if (existsSync(src)) {
      await cp(src, join(siteDir, sub), { recursive: true });
    }
  }
  // Copy hugo.toml.
  await cp(join(REPO_ROOT, "hugo.toml"), join(siteDir, "hugo.toml"));

  // Write content.
  const contentDir = join(siteDir, "content");
  await mkdir(join(contentDir, "posts"), { recursive: true });

  // Minimal about.md so we don't break taxonomy expectations.
  await writeFile(
    join(contentDir, "about.md"),
    [
      "+++",
      'title = "About"',
      "date = 2025-01-01T00:00:00Z",
      "draft = false",
      'slug = "about"',
      "+++",
      "",
      "About.",
    ].join("\n"),
  );

  for (const p of posts) {
    await writeFile(
      join(contentDir, "posts", `${p.slug}.md`),
      renderPost(p),
    );
  }
}

/**
 * Run `hugo --minify --gc` in the given site dir. Returns spawn result.
 */
export function runHugoBuild(siteDir: string): {
  status: number | null;
  stdout: string;
  stderr: string;
} {
  const r = spawnSync("hugo", ["--minify", "--gc"], {
    cwd: siteDir,
    encoding: "utf8",
    env: { ...process.env, HUGO_ENV: "test" },
  });
  return {
    status: r.status,
    stdout: r.stdout ?? "",
    stderr: r.stderr ?? "",
  };
}

/**
 * Cleanup helper for tests that build temp sites under tmp/.
 */
export async function cleanupSite(siteDir: string): Promise<void> {
  await rm(siteDir, { recursive: true, force: true });
}

/**
 * Pick a unique tmp dir under repo `tmp/` so tests don't collide.
 */
export function tmpSiteDir(prefix = "pbt"): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return join(REPO_ROOT, "tmp", `${prefix}-${rand}`);
}
