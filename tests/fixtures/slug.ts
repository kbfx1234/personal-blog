/**
 * Slug validator (single source of truth for tests + scripts).
 *
 * Property 1: slug accepted iff length in [1, 100] AND chars only [a-z0-9-].
 *
 * The first/last character may be a hyphen — that's allowed by Hugo and not
 * disallowed in requirements.md AC 7.4. If you want stricter rules later
 * (no leading/trailing hyphen, no double hyphens), tighten the regex here
 * and update Property 1 + AC 7.4 accordingly.
 */
export const SLUG_RE = /^[a-z0-9-]{1,100}$/;

export function isValidSlug(s: string): boolean {
  return SLUG_RE.test(s);
}
