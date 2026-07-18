# Timeline Spine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat day-by-day list with a vertical spine timeline that shows stay duration, sleep location and travel legs, reused on city subpages filtered to a single stay.

**Architecture:** Three additive fields on `window.TRIP` (`iso` on days and legs, `sleep` on days, a new `stays[]` array), then one render function `timelineSpine(opts)` in `app.js` used by both the index and the city pages, differing only by an optional `stayId` argument. New CSS classes built entirely from existing design tokens.

**Tech Stack:** Vanilla ES5-style JS (no build step, no framework), plain CSS, static files served over GitHub Pages. Node 18+ only for the verification script.

## Global Constraints

- **No build step.** Files are loaded directly by `<script>` and `<link>` tags. Do not introduce bundlers, transpilers, or npm dependencies for shipped code.
- **Match existing code style in shipped browser files (`app.js`, `trip.js`):** `var` not `let`/`const`, function declarations not arrow functions, no template literals. Those files are written in that style throughout — follow it. This does **not** apply to `tools/verify-trip.mjs`, which is Node-only tooling and uses modern syntax.
- **No new colours or fonts.** Use only existing tokens: `--paper`, `--paper-2`, `--card`, `--ink`, `--ink-soft`, `--line`, `--accent`, `--stamp-green`, `--stamp-red`, `--stamp-gray`, `--mono`, `--disp`, `--radius`.
- **All 17 timeline entries and all 11 legs must be updated.** Partial data breaks the join silently rather than loudly.
- **Maps do not render on localhost** — the Google Maps key is referrer-locked to `b0y3r.github.io`. Verify the spine locally; verify maps only after deploy.
- **Commit after every task.**

---

## File Structure

| File | Responsibility | Change |
| --- | --- | --- |
| `trip.js` | All trip content and data | Modify: add `iso`/`sleep` to `timeline[]`, `iso` to `legs[]`, add `stays[]` |
| `tools/verify-trip.mjs` | Data-model invariant checks | Create |
| `styles.css` | All styling | Modify: append spine classes |
| `app.js` | All rendering | Modify: add three functions, rewire index and city builders |
| `tallinn.html` … `madrid.html` | Page shells | No change — they are data-driven |

---

### Task 1: Data model — `iso`, `sleep`, and `stays[]`

**Files:**
- Modify: `trip.js`
- Create: `tools/verify-trip.mjs`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `TRIP.timeline[i].iso` — string `"YYYY-MM-DD"`
  - `TRIP.timeline[i].sleep` — string city id, or `"ferry"`, or `"plane"`, or `null`
  - `TRIP.legs[i].iso` — string `"YYYY-MM-DD"`
  - `TRIP.stays` — array of `{id, nights, fromIso, toIso}` plus optional `label`, `flag`, `transit`, `withinStay`

- [ ] **Step 1: Write the failing verification script**

Create `tools/verify-trip.mjs`:

```js
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd ~/Projects/euro-trip && node tools/verify-trip.mjs`
Expected: `FAIL` listing missing `iso`, missing `sleep`, and `stays has 11 -> got 0`.

- [ ] **Step 3: Add `iso` and `sleep` to every timeline entry**

Replace the whole `timeline: [ ... ]` array in `trip.js` with:

```js
  timeline: [
    { date: "Fri 9/4",  iso: "2026-09-04", sleep: "plane",      text: "Fly to Helsinki (red-eye)", city: "helsinki" },
    { date: "Sat 9/5",  iso: "2026-09-05", sleep: "helsinki",   text: "Helsinki — land early, one big day", city: "helsinki" },
    { date: "Sun 9/6",  iso: "2026-09-06", sleep: "tallinn",    text: "Ferry → Tallinn", city: "tallinn" },
    { date: "Mon 9/7",  iso: "2026-09-07", sleep: "tallinn",    text: "Tallinn — full day", city: "tallinn" },
    { date: "Tue 9/8",  iso: "2026-09-08", sleep: "ferry",      text: "Tallinn → overnight ferry to Stockholm", city: "tallinn" },
    { date: "Wed 9/9",  iso: "2026-09-09", sleep: "stockholm",  text: "Dock ~10am — Stockholm", city: "stockholm" },
    { date: "Thu 9/10", iso: "2026-09-10", sleep: "copenhagen", text: "Stockholm day → night flight to CPH", city: "stockholm" },
    { date: "Fri 9/11", iso: "2026-09-11", sleep: "copenhagen", text: "Copenhagen — full day, big night", city: "copenhagen" },
    { date: "Sat 9/12", iso: "2026-09-12", sleep: "malaga",     text: "Copenhagen day → night flight to Málaga", city: "copenhagen" },
    { date: "Sun 9/13", iso: "2026-09-13", sleep: "malaga",     text: "Rental car → Granada day trip (Alhambra)", city: "malaga" },
    { date: "Mon 9/14", iso: "2026-09-14", sleep: "tarifa",     text: "Drive → Tarifa · Gibraltar optional", city: "tarifa" },
    { date: "Tue 9/15", iso: "2026-09-15", sleep: "tangier",    text: "Ferry → Tangier, overnight in Morocco", city: "tangier" },
    { date: "Wed 9/16", iso: "2026-09-16", sleep: "tarifa",     text: "Ferry back · Bolonia + Baelo Claudia", city: "tarifa" },
    { date: "Thu 9/17", iso: "2026-09-17", sleep: "seville",    text: "Drive → Seville via Cádiz, drop the car", city: "seville" },
    { date: "Fri 9/18", iso: "2026-09-18", sleep: "seville",    text: "Córdoba day trip (Mezquita)", city: "seville" },
    { date: "Sat 9/19", iso: "2026-09-19", sleep: "madrid",     text: "Train → Madrid, last big night", city: "madrid" },
    { date: "Sun 9/20", iso: "2026-09-20", sleep: null,         text: "El Rastro, churros → fly home", city: "madrid" },
  ],
```

- [ ] **Step 4: Add `iso` to every leg**

In `trip.js`, add an `iso` field to each of the 11 entries in `legs[]`, immediately after `date`. The mapping is one-to-one with the existing `date` strings:

```
"Sep 4"  -> iso: "2026-09-04"
"Sep 6"  -> iso: "2026-09-06"
"Sep 8"  -> iso: "2026-09-08"
"Sep 10" -> iso: "2026-09-10"
"Sep 12" -> iso: "2026-09-12"
"Sep 14" -> iso: "2026-09-14"
"Sep 15" -> iso: "2026-09-15"
"Sep 16" -> iso: "2026-09-16"
"Sep 17" -> iso: "2026-09-17"
"Sep 19" -> iso: "2026-09-19"
"Sep 20" -> iso: "2026-09-20"
```

For example the first leg becomes:

```js
    { date: "Sep 4", iso: "2026-09-04", from: "NYC", to: "HEL", fromName: "New York", toName: "Helsinki", mode: "flight", status: "booked", note: "Red-eye out" },
```

- [ ] **Step 5: Add the `stays[]` array**

Insert immediately after the `timeline: [ ... ],` array in `trip.js`:

```js
  // Continuous blocks of nights. Two are not cities (the red-eye and the Baltic
  // ferry). Tangier nests inside Tarifa because the Tarifa room is held through
  // that night — `withinStay` keeps it off the trip-wide view so the night is
  // not counted twice.
  stays: [
    { id: "plane",      nights: 1, fromIso: "2026-09-04", toIso: "2026-09-05", transit: true, label: "Red-eye", flag: "✈️" },
    { id: "helsinki",   nights: 1, fromIso: "2026-09-05", toIso: "2026-09-06" },
    { id: "tallinn",    nights: 2, fromIso: "2026-09-06", toIso: "2026-09-08" },
    { id: "ferry",      nights: 1, fromIso: "2026-09-08", toIso: "2026-09-09", transit: true, label: "Baltic ferry", flag: "⛴" },
    { id: "stockholm",  nights: 1, fromIso: "2026-09-09", toIso: "2026-09-10" },
    { id: "copenhagen", nights: 2, fromIso: "2026-09-10", toIso: "2026-09-12" },
    { id: "malaga",     nights: 2, fromIso: "2026-09-12", toIso: "2026-09-14" },
    { id: "tarifa",     nights: 3, fromIso: "2026-09-14", toIso: "2026-09-17" },
    { id: "tangier",    nights: 1, fromIso: "2026-09-15", toIso: "2026-09-16", withinStay: "tarifa" },
    { id: "seville",    nights: 2, fromIso: "2026-09-17", toIso: "2026-09-19" },
    { id: "madrid",     nights: 1, fromIso: "2026-09-19", toIso: "2026-09-20" },
  ],
```

- [ ] **Step 6: Run the verification script to confirm it passes**

Run: `cd ~/Projects/euro-trip && node tools/verify-trip.mjs`
Expected: `PASS: 17 days, 11 legs, 11 stays, 16 nights`

If it reports `top-level stay nights total 16 -> got 17`, the `withinStay` flag is missing from Tangier.

- [ ] **Step 7: Commit**

```bash
cd ~/Projects/euro-trip
git add trip.js tools/verify-trip.mjs
git commit -m "feat(data): add iso, sleep and stays[] to trip data"
```

---

### Task 2: Spine styles

**Files:**
- Modify: `styles.css` (append at end)

**Interfaces:**
- Consumes: existing CSS custom properties
- Produces: classes `.spine`, `.leg-node`, `.leg-date`, `.leg-body`, `.leg-stamp`, `.stay`, `.stay__head`, `.stay__flag`, `.stay__name`, `.stay__nights`, `.day`, `.day__date`, `.day__text`, `.day__bed`, `.day.is-away`

- [ ] **Step 1: Append the spine styles**

Add to the end of `styles.css`:

```css
/* ---------------------------------------------------------- TIMELINE SPINE */
.spine { position: relative; padding-left: 2.1rem; }
.spine::before {
  content: ""; position: absolute; left: 0.62rem; top: 0.3rem; bottom: 0.3rem;
  width: 2px; background: var(--ink); opacity: 0.55;
}

.leg-node { position: relative; margin: 0.5rem 0; display: flex; gap: 0.6rem; align-items: baseline; flex-wrap: wrap; }
.leg-node::before {
  content: ""; position: absolute; left: -1.85rem; top: 0.45rem;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--card); border: 2px solid var(--ink);
}
.leg-node.is-booked::before { background: var(--stamp-green); border-color: var(--stamp-green); }
.leg-node.is-todo::before { background: var(--stamp-red); border-color: var(--stamp-red); }
.leg-date { font-family: var(--mono); font-weight: 700; font-size: 0.74rem; color: var(--ink-soft); min-width: 4.6rem; }
.leg-body { font-family: var(--mono); font-size: 0.8rem; }
.leg-stamp {
  font-family: var(--mono); font-weight: 700; font-size: 0.6rem; letter-spacing: 0.12em;
  padding: 0.1rem 0.4rem; border: 2px solid var(--stamp-gray); color: var(--stamp-gray);
  border-radius: 3px; transform: rotate(-3deg);
}
.leg-node.is-booked .leg-stamp { border-color: var(--stamp-green); color: var(--stamp-green); }
.leg-node.is-todo .leg-stamp { border-color: var(--stamp-red); background: var(--stamp-red); color: #fff; }

.stay {
  position: relative; border: 2px solid var(--ink); border-radius: var(--radius);
  background: var(--card); margin: 0.55rem 0; overflow: hidden;
}
.stay::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 7px; background: var(--accent); }
.stay__head {
  display: flex; align-items: center; gap: 0.55rem;
  padding: 0.6rem 0.9rem 0.6rem 1.2rem; border-bottom: 2px dashed var(--line);
}
.stay__flag { font-size: 1.15rem; }
.stay__name { font-weight: 800; letter-spacing: 0.02em; }
.stay__nights {
  margin-left: auto; font-family: var(--mono); font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.1em; color: var(--ink-soft);
  border: 2px solid var(--line); border-radius: 3px; padding: 0.1rem 0.4rem;
}

.day {
  display: grid; grid-template-columns: 4.6rem 1fr auto; gap: 0.6rem; align-items: baseline;
  padding: 0.42rem 0.9rem 0.42rem 1.2rem; border-bottom: 1px solid rgba(195,181,150,0.5);
}
.day:last-child { border-bottom: 0; }
.day__date { font-family: var(--mono); font-weight: 700; font-size: 0.74rem; color: var(--ink-soft); }
.day__text { font-size: 0.9rem; font-weight: 600; }
.day__bed { font-size: 0.85rem; opacity: 0.75; }
.day.is-away { opacity: 0.55; font-style: italic; }
.day.is-away .day__note {
  font-family: var(--mono); font-style: normal; font-size: 0.68rem; color: var(--stamp-red);
}

@media (max-width: 640px) {
  .day { grid-template-columns: 4.2rem 1fr auto; }
}
```

- [ ] **Step 2: Verify the file still parses**

Run: `cd ~/Projects/euro-trip && node -e "const c=require('fs').readFileSync('styles.css','utf8'); const o=(c.match(/{/g)||[]).length, x=(c.match(/}/g)||[]).length; if(o!==x) { console.error('FAIL: brace mismatch '+o+' open vs '+x+' close'); process.exit(1);} console.log('PASS: braces balanced, '+o+' rules');"`
Expected: `PASS: braces balanced, N rules`

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/euro-trip
git add styles.css
git commit -m "feat(styles): add timeline spine classes"
```

---

### Task 3: Render functions

**Files:**
- Modify: `app.js`

**Interfaces:**
- Consumes: `TRIP.stays`, `TRIP.timeline`, `TRIP.legs`, `TRIP.cities`, and the existing helpers `el(tag, cls, html)`, `esc(str)`, `cityById(id)` already defined in `app.js`
- Produces:
  - `stayMeta(stay)` -> `{flag, name, accent}`
  - `daysForStay(stay, includeDeparture)` -> array of `{day, away, departure}`
  - `legNode(leg)` -> Element
  - `stayBlock(stay, opts)` -> Element, `opts.includeDeparture` boolean
  - `timelineSpine(opts)` -> Element, `opts.stayId` optional string

- [ ] **Step 1: Add the helper and render functions**

Insert into `app.js` immediately before the `// ---- Index page` comment:

```js
  // ---- Timeline spine ---------------------------------------
  var MODE_ICON = { flight: "✈", ferry: "⛴", train: "🚆", drive: "🚗" };

  function stayById(id) {
    return (TRIP.stays || []).filter(function (s) { return s.id === id; })[0];
  }

  function stayMeta(stay) {
    var c = cityById(stay.id);
    return {
      flag: stay.flag || (c ? c.flag : "🛏"),
      name: stay.label || (c ? c.name : stay.id),
      accent: c ? c.accent : "#8a7f6c"
    };
  }

  // Days inside a stay window. `away` marks a night slept elsewhere;
  // `departure` marks the checkout day.
  function daysForStay(stay, includeDeparture) {
    var out = [];
    TRIP.timeline.forEach(function (d) {
      if (d.iso < stay.fromIso) return;
      if (d.iso > stay.toIso) return;
      var isDeparture = d.iso === stay.toIso;
      if (isDeparture && !includeDeparture) return;
      out.push({ day: d, away: !isDeparture && d.sleep !== stay.id, departure: isDeparture });
    });
    return out;
  }

  function bedGlyph(sleep) {
    if (sleep === "ferry") return "🛏⛴";
    if (sleep === "plane") return "🛏✈";
    return "🛏";
  }

  function legNode(leg) {
    var n = el("div", "leg-node is-" + leg.status);
    n.appendChild(el("span", "leg-date", esc(leg.date)));
    n.appendChild(el("span", "leg-body",
      (MODE_ICON[leg.mode] || "→") + " " + esc(leg.fromName) + " → " + esc(leg.toName) + " · " + esc(leg.note)));
    n.appendChild(el("span", "leg-stamp",
      leg.status === "booked" ? "BOOKED" : leg.status === "todo" ? "TO BOOK" : "TO ARRANGE"));
    return n;
  }

  function stayBlock(stay, opts) {
    opts = opts || {};
    var m = stayMeta(stay);
    var box = el("div", "stay");
    box.style.setProperty("--accent", m.accent);

    var head = el("div", "stay__head");
    head.appendChild(el("span", "stay__flag", m.flag));
    head.appendChild(el("span", "stay__name", esc(m.name)));
    head.appendChild(el("span", "stay__nights", stay.nights + (stay.nights === 1 ? " NIGHT" : " NIGHTS")));
    box.appendChild(head);

    daysForStay(stay, opts.includeDeparture).forEach(function (entry) {
      var row = el("div", "day" + (entry.away ? " is-away" : ""));
      row.appendChild(el("span", "day__date", esc(entry.day.date)));
      var text = entry.departure ? "Check out · " + entry.day.text : entry.day.text;
      var cell = el("span", "day__text", esc(text));
      if (entry.away) {
        var awayStay = stayById(entry.day.sleep);
        var awayName = awayStay ? stayMeta(awayStay).name : entry.day.sleep;
        cell.appendChild(el("span", "day__note", " · away in " + esc(awayName) + ", room held"));
      }
      row.appendChild(cell);
      row.appendChild(el("span", "day__bed", entry.departure ? "→" : bedGlyph(entry.day.sleep)));
      box.appendChild(row);
    });
    return box;
  }

  // opts.stayId omitted -> whole trip. Provided -> that stay plus its
  // arrival and departure legs.
  function timelineSpine(opts) {
    opts = opts || {};
    var wrap = el("div", "spine");

    if (opts.stayId) {
      var stay = stayById(opts.stayId);
      if (!stay) return wrap;
      TRIP.legs.forEach(function (l) { if (l.iso === stay.fromIso) wrap.appendChild(legNode(l)); });
      wrap.appendChild(stayBlock(stay, { includeDeparture: true }));
      TRIP.legs.forEach(function (l) { if (l.iso === stay.toIso) wrap.appendChild(legNode(l)); });
      return wrap;
    }

    var used = {};
    (TRIP.stays || []).forEach(function (stay) {
      if (stay.withinStay) return;
      TRIP.legs.forEach(function (l, i) {
        if (!used[i] && l.iso === stay.fromIso) { used[i] = 1; wrap.appendChild(legNode(l)); }
      });
      wrap.appendChild(stayBlock(stay));
    });
    TRIP.legs.forEach(function (l, i) { if (!used[i]) wrap.appendChild(legNode(l)); });
    return wrap;
  }
```

- [ ] **Step 2: Verify the file parses**

Run: `cd ~/Projects/euro-trip && node --check app.js && echo "PASS: app.js parses"`
Expected: `PASS: app.js parses`

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/euro-trip
git add app.js
git commit -m "feat(app): add timelineSpine, stayBlock and legNode"
```

---

### Task 4: Wire the spine into the index page

**Files:**
- Modify: `app.js` (inside `buildIndex`)

**Interfaces:**
- Consumes: `timelineSpine()` from Task 3
- Produces: nothing new

- [ ] **Step 1: Replace the flat timeline list**

In `app.js`, inside `buildIndex`, find this block:

```js
    var tl = el("div", "timeline");
    TRIP.timeline.forEach(function (t) {
      var row = el("a", "tl-row");
      row.href = t.city + ".html";
      var ci = cityById(t.city);
      if (ci) row.style.setProperty("--accent", ci.accent);
      row.appendChild(el("span", "tl-date", esc(t.date)));
      row.appendChild(el("span", "tl-text", esc(t.text)));
      row.appendChild(el("span", "tl-flag", ci ? ci.flag : ""));
      tl.appendChild(row);
    });
    tlSec.appendChild(tl);
```

Replace those lines with:

```js
    tlSec.appendChild(el("p", "section__hint", "Blocks are stays, sized by nights. Dots are travel days."));
    tlSec.appendChild(timelineSpine());
```

- [ ] **Step 2: Fix the stale leg count in the Route hint**

In the same function, find:

```js
    legSec.appendChild(el("p", "section__hint", "Eight legs, two continents. Stamps show what's booked."));
```

Replace with:

```js
    legSec.appendChild(el("p", "section__hint", "Eleven legs, two continents. Stamps show what's booked."));
```

- [ ] **Step 3: Verify by rendering**

Run:
```bash
cd ~/Projects/euro-trip && python3 -m http.server 8787 >/dev/null 2>&1 &
sleep 1 && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8787/index.html
```
Expected: `200`

Then open `http://localhost:8787/index.html` in a browser and confirm:
- 10 stay blocks (Tangier must NOT appear as its own block)
- 11 leg nodes
- Tarifa's block shows 3 nights with Tue 9/15 dimmed and reading "away in Tangier, room held"
- Nights badges read: 1, 1, 2, 1, 1, 2, 2, 3, 2, 1

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/euro-trip
git add app.js
git commit -m "feat(index): replace flat day list with timeline spine"
```

---

### Task 5: Add the spine to city pages

**Files:**
- Modify: `app.js` (inside `buildCity`)

**Interfaces:**
- Consumes: `timelineSpine({stayId})`, `stayById()` from Task 3
- Produces: nothing new

- [ ] **Step 1: Insert the conditional timeline section**

In `app.js`, inside `buildCity`, locate the line that appends the map section (it calls `mapBlock(...)`). Immediately **before** that section is appended, insert:

```js
    // Day-by-day for this stay. Cities with no stay (Gibraltar is a day trip,
    // nights: 0) get no section rather than an empty one.
    if (stayById(city.id)) {
      var citySec = el("section", "section reveal");
      citySec.appendChild(el("h2", "section__title", "📅 Your Days Here"));
      citySec.appendChild(timelineSpine({ stayId: city.id }));
      app.appendChild(citySec);
    }
```

- [ ] **Step 2: Verify by rendering**

With the server from Task 4 still running, open each and confirm:

| URL | Expect |
| --- | --- |
| `http://localhost:8787/tarifa.html` | One 3-night block, Tue 9/15 dimmed and marked away in Tangier, Thu 9/17 as "Check out", plus arrival and departure leg nodes |
| `http://localhost:8787/tangier.html` | One 1-night block for Tangier |
| `http://localhost:8787/gibraltar.html` | **No** "Your Days Here" section at all |
| `http://localhost:8787/helsinki.html` | One 1-night block |

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/euro-trip
git add app.js
git commit -m "feat(city): add per-stay timeline to city pages"
```

---

### Task 6: Optional authored day detail

**Files:**
- Modify: `app.js` (inside `stayBlock`)
- Modify: `trip.js` (add a `days` array to the Tarifa city entry as the worked example)

**Interfaces:**
- Consumes: `stayBlock` from Task 3
- Produces: optional `TRIP.cities[i].days` — array of `{iso, text}`

- [ ] **Step 1: Add the override lookup to `stayBlock`**

In `app.js`, inside `stayBlock`, find this line:

```js
      var text = entry.departure ? "Check out · " + entry.day.text : entry.day.text;
```

Replace it with:

```js
      var override = null;
      if (opts.stayId) {
        var oc = cityById(opts.stayId);
        if (oc && oc.days) {
          oc.days.forEach(function (o) { if (o.iso === entry.day.iso) override = o.text; });
        }
      }
      var base = override || entry.day.text;
      var text = entry.departure ? "Check out · " + base : base;
```

- [ ] **Step 2: Pass `stayId` through from `timelineSpine`**

In `app.js`, inside `timelineSpine`, find:

```js
      wrap.appendChild(stayBlock(stay, { includeDeparture: true }));
```

Replace with:

```js
      wrap.appendChild(stayBlock(stay, { includeDeparture: true, stayId: opts.stayId }));
```

This keeps overrides off the index by construction: the trip-wide branch never passes `stayId`, so it always renders the master timeline text.

- [ ] **Step 3: Add the worked example to Tarifa**

In `trip.js`, inside the `tarifa` city object, add a `days` field immediately after the `blurb` line:

```js
      days: [
        { iso: "2026-09-14", text: "Drive down from Málaga (~2h15), drop bags, Gibraltar optional" },
        { iso: "2026-09-15", text: "Early fast ferry to Tangier — overnight in Morocco" },
        { iso: "2026-09-16", text: "Ferry back in the morning, then Bolonia beach + Baelo Claudia" },
        { iso: "2026-09-17", text: "Drive to Seville via Cádiz, drop the car at Santa Justa" },
      ],
```

- [ ] **Step 4: Verify override applies on the city page but not the index**

Run: `cd ~/Projects/euro-trip && node tools/verify-trip.mjs`
Expected: `PASS: 17 days, 11 legs, 11 stays, 16 nights`

Then in the browser:
- `http://localhost:8787/tarifa.html` — Mon 9/14 reads "Drive down from Málaga (~2h15), drop bags, Gibraltar optional"
- `http://localhost:8787/index.html` — Mon 9/14 still reads "Drive → Tarifa · Gibraltar optional"

- [ ] **Step 5: Commit**

```bash
cd ~/Projects/euro-trip
git add app.js trip.js
git commit -m "feat: optional authored day detail per city"
```

---

### Task 7: Mobile check, deploy, verify live

**Files:** none modified unless the mobile check fails

- [ ] **Step 1: Check mobile width**

In the browser at `http://localhost:8787/index.html`, set the viewport to 375px wide. Confirm:
- Day rows do not overflow horizontally
- Leg nodes wrap rather than clipping
- The spine line stays aligned with the leg dots

If anything overflows, adjust the `@media (max-width: 640px)` block in `styles.css` and commit that fix before continuing.

- [ ] **Step 2: Run the full verification**

Run: `cd ~/Projects/euro-trip && node tools/verify-trip.mjs && node --check app.js && echo "ALL PASS"`
Expected: `PASS: ...` then `ALL PASS`

- [ ] **Step 3: Stop the local server**

Run: `pkill -f "http.server 8787"`

- [ ] **Step 4: Push**

```bash
cd ~/Projects/euro-trip
git push origin HEAD
```

- [ ] **Step 5: Verify live after Pages rebuilds**

Run:
```bash
for i in $(seq 1 8); do
  if curl -s https://b0y3r.github.io/euro-trip/trip.js | grep -q '"stays"\|stays:'; then echo "DEPLOYED"; break; fi
  sleep 15
done
```

Then open `https://b0y3r.github.io/euro-trip/` and confirm the spine renders **and** the maps still draw — maps cannot be verified locally because the API key is referrer-locked to this domain.

---

## Verification summary

Mapped from the spec's verification list:

| Spec check | Where |
| --- | --- |
| `trip.js` parses, 11 stays | Task 1 Step 6 |
| Every day has `iso` + `sleep`, every leg has `iso` | Task 1 Step 6 |
| Stay windows resolve to real days | Task 1 Step 6 |
| Index renders 10 blocks, 11 legs | Task 4 Step 3 |
| Nights total 16 (Tangier double-count guard) | Task 1 Step 6 |
| Tarifa: away day + checkout day | Task 4 Step 3, Task 5 Step 2 |
| Tangier renders its own stay | Task 5 Step 2 |
| Gibraltar renders no timeline | Task 5 Step 2 |
| City nights match stay nights | Task 1 Step 6 |
| Mobile width | Task 7 Step 1 |
