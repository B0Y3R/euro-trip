// Data-model invariants for trip.js. Run: node tools/verify-trip.mjs
import { readFileSync } from "node:fs";

globalThis.window = {};
new Function(readFileSync("coords.js", "utf8"))();
new Function(readFileSync("trip.js", "utf8"))();
const T = globalThis.window.TRIP;

const fails = [];
const check = (name, cond, detail) => {
  if (!cond) fails.push(name + (detail ? " -> " + detail : ""));
};
const ISO = /^\d{4}-\d{2}-\d{2}$/;

check("timeline has 17 days", T.timeline.length === 17, "got " + T.timeline.length);
T.timeline.forEach(function (d, i) {
  check("timeline[" + i + "].iso is ISO", ISO.test(d.iso || ""), String(d.iso));
  check("timeline[" + i + "].sleep present", "sleep" in d, d.date);
});

check("legs has 11", T.legs.length === 11, "got " + T.legs.length);
T.legs.forEach(function (l, i) {
  check("legs[" + i + "].iso is ISO", ISO.test(l.iso || ""), String(l.iso));
});

check("stays has 11", (T.stays || []).length === 11, "got " + (T.stays || []).length);

const days = new Set(T.timeline.map(function (d) { return d.iso; }));
(T.stays || []).forEach(function (s) {
  check("stay " + s.id + " fromIso is a real day", days.has(s.fromIso), s.fromIso);
  check("stay " + s.id + " toIso is a real day", days.has(s.toIso), s.toIso);
  const span = (new Date(s.toIso) - new Date(s.fromIso)) / 86400000;
  check("stay " + s.id + " nights matches span", span === s.nights, span + " vs " + s.nights);
});

// Regression guard: double-counting Tangier reads 17 instead of 16.
const topLevel = (T.stays || []).filter(function (s) { return !s.withinStay; });
const nights = topLevel.reduce(function (n, s) { return n + s.nights; }, 0);
check("top-level stay nights total 16", nights === 16, "got " + nights);

// Every sleep value resolves to a stay id or a known transit token.
const stayIds = new Set((T.stays || []).map(function (s) { return s.id; }));
T.timeline.forEach(function (d) {
  if (d.sleep === null) return;
  check("sleep '" + d.sleep + "' resolves", stayIds.has(d.sleep), d.date);
});

// Cities that have a stay must agree on night count.
T.cities.forEach(function (c) {
  const s = (T.stays || []).filter(function (x) { return x.id === c.id; })[0];
  if (!s) return;
  check("city " + c.id + " nights matches stay", c.nights === s.nights, c.nights + " vs " + s.nights);
});

if (fails.length) {
  console.error("FAIL (" + fails.length + ")");
  fails.forEach(function (f) { console.error("  - " + f); });
  process.exit(1);
}
console.log("PASS: " + T.timeline.length + " days, " + T.legs.length + " legs, " + T.stays.length + " stays, " + nights + " nights");
