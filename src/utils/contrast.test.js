import assert from "node:assert/strict";
import test from "node:test";
import { contrastRatio, getContrastLevels, hexToRgb, normalizeHex, relativeLuminance } from "./contrast.js";

test("normalizes shorthand and full hex colors", () => {
  assert.equal(normalizeHex("abc"), "#AABBCC");
  assert.equal(normalizeHex(" #12aBcF "), "#12ABCF");
  assert.deepEqual(hexToRgb("#abc"), [170, 187, 204]);
});

test("rejects invalid and alpha hex inputs", () => {
  for (const value of ["", "#12", "#12345", "#abcd", "blue"]) assert.throws(() => normalizeHex(value), /hex color/);
});

test("computes WCAG luminance and contrast ratios", () => {
  assert.equal(relativeLuminance("#000000"), 0);
  assert.equal(relativeLuminance("#FFFFFF"), 1);
  assert.equal(contrastRatio("#000", "#fff"), 21);
  assert.ok(Math.abs(contrastRatio("#777", "#fff") - 4.478) < 0.002);
});

test("evaluates the AA and AAA thresholds for normal and large text", () => {
  assert.deepEqual(getContrastLevels(2.9), { aaNormal: false, aaLarge: false, aaaNormal: false, aaaLarge: false });
  assert.deepEqual(getContrastLevels(3), { aaNormal: false, aaLarge: true, aaaNormal: false, aaaLarge: false });
  assert.deepEqual(getContrastLevels(4.5), { aaNormal: true, aaLarge: true, aaaNormal: false, aaaLarge: true });
  assert.deepEqual(getContrastLevels(7), { aaNormal: true, aaLarge: true, aaaNormal: true, aaaLarge: true });
});
