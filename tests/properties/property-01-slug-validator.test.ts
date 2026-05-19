// Feature: personal-blog, Property 1: Slug 字符集与长度校验
// Validates: Requirements 7.4

import { describe, it } from "vitest";
import * as fc from "fast-check";
import { isValidSlug, SLUG_RE } from "../fixtures/slug.js";

describe("Property 1 — slug validator", () => {
  it("accepts a string iff it matches /^[a-z0-9-]{1,100}$/", () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        return isValidSlug(s) === SLUG_RE.test(s);
      }),
      { numRuns: 200 },
    );
  });

  it("rejects strings longer than 100 chars", () => {
    fc.assert(
      fc.property(
        fc
          .stringMatching(/^[a-z0-9-]+$/)
          .filter((s) => s.length > 100),
        (s) => isValidSlug(s) === false,
      ),
      { numRuns: 100 },
    );
  });

  it("rejects strings containing uppercase or non-allowed chars", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (s) => {
          // Sanity: if the string contains anything outside [a-z0-9-], reject.
          if (!/^[a-z0-9-]+$/.test(s)) {
            return isValidSlug(s) === false;
          }
          // If it's all valid chars and ≤100, must be accepted.
          return isValidSlug(s) === (s.length >= 1 && s.length <= 100);
        },
      ),
      { numRuns: 200 },
    );
  });

  it("accepts a few hand-picked valid slugs", () => {
    for (const ok of [
      "hello-world",
      "a",
      "post-2025-01-15",
      "0123",
      "x".repeat(100),
    ]) {
      if (!isValidSlug(ok)) {
        throw new Error(`expected valid: ${ok}`);
      }
    }
  });

  it("rejects a few hand-picked invalid slugs", () => {
    for (const bad of [
      "",
      "Hello-World", // uppercase
      "hello_world", // underscore
      "hello world", // space
      "你好",
      "x".repeat(101), // too long
    ]) {
      if (isValidSlug(bad)) {
        throw new Error(`expected invalid: ${bad}`);
      }
    }
  });
});
