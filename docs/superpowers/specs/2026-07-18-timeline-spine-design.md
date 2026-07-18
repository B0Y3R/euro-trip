# Timeline spine — design

**Date:** 2026-07-18
**Status:** approved, ready for implementation planning
**Scope:** `trip.js` (data), `app.js` (render), `styles.css` (new classes)

## Problem

The site shows the trip's schedule as a flat 17-row list on the index page: date, one line of text, a flag. City subpages show no schedule at all.

That list answers "what happens on day N?" but not the three questions that actually matter when planning or navigating the trip:

1. **How long are we in each place?** Nights per stay are invisible; every row looks the same weight.
2. **Where do we sleep each night?** Not encoded at all. Two nights are spent in transit (the red-eye on 9/4 and the Baltic ferry on 9/8) and nothing conveys that.
3. **Where do the travel legs fall?** Legs live in a separate "The Route" section above, disconnected from the days they belong to.

The city pages have a further gap. A stay like Tarifa (three continuous nights, 14–17 Sept, with the middle night spent in Tangier) cannot be represented at all, and naively filtering days by city would render it as two disconnected fragments — the exact confusion the booking decision was made to avoid.

## Approach

A single **vertical spine** component, used on both the index and the city pages, differing only in the data slice passed to it.

Chosen over two alternatives:

- *Shape bar + spine* — added a proportional nights strip above the spine. Real "shape at a glance" value, but it competes with the spine for attention and gets cramped on mobile. Rejected as noise above the real content.
- *Grouped stay cards* — each stay a card, legs as dividers. Reads well but loses duration: every card is a similar height regardless of nights, so a 1-night stay and a 3-night stay look alike. That defeats problem 1.

The spine wins because block height scales naturally with day count, so duration is legible without a separate device.

## Data model

Three additions to `window.TRIP` in `trip.js`. All are additive; nothing existing is removed.

### `iso` on timeline entries and legs

Every entry in `timeline[]` and `legs[]` gains `iso: "YYYY-MM-DD"`.

The prototype joined legs to days by regex-matching `"Sep 4"` against `"Fri 9/4"`. That is fragile and silently mis-joins on any format drift. An ISO key makes the join exact and makes ordering reliable without depending on array position.

Existing `date` fields stay as the human-facing display strings.

### `sleep` on timeline entries

Every entry in `timeline[]` gains `sleep`, one of:

- a city id (`"tarifa"`) — sleeping in that city
- `"ferry"` or `"plane"` — a night in transit
- `null` — the final day, when nobody sleeps anywhere on the trip

This single field drives both the bed markers and away-day detection. It is authored data rather than derived, because the sleep location genuinely diverges from the day's activity on several days (9/8 is a Tallinn day but a ferry night; 9/10 is a Stockholm day but a Copenhagen night; 9/12 is a Copenhagen day but a Málaga night).

### `stays[]`

A new top-level array, one entry per continuous block of nights:

```js
{ id: "tarifa", nights: 3, fromIso: "2026-09-14", toIso: "2026-09-17" }
```

Optional fields `label`, `flag`, `transit: true` cover the two stays that are not cities — the 9/4 red-eye and the 9/8 Baltic ferry.

Stays cannot be derived from `cities[]` alone, precisely because of those two transit nights. They also cannot be derived from `timeline[]` alone, because a stay's window includes nights spent elsewhere (Tarifa's 9/15).

`fromIso` is the check-in date; `toIso` is the check-out date. Nights = number of days between them.

There are **11 stays**: red-eye, Helsinki, Tallinn, Baltic ferry, Stockholm, Copenhagen, Málaga, Tarifa, Tangier, Seville, Madrid.

### Nested stays

Tangier is a one-night stay (15–16 Sept) whose window sits **inside** Tarifa's (14–17 Sept), because the Tarifa room is deliberately held through that night. Two stays are therefore live on the same date.

Resolved with one optional field:

```js
{ id: "tangier", nights: 1, fromIso: "2026-09-15", toIso: "2026-09-16", withinStay: "tarifa" }
```

- **Index** skips any stay with `withinStay` set. Tangier is already represented there as Tarifa's away day, so rendering it again would double-count the night and break the visual run of the trip. The index renders **10 stay blocks**.
- **The Tangier city page** renders its own stay normally — `withinStay` only suppresses it from the trip-wide view.
- **The Tarifa city page** is unaffected: 9/15 is an away day by the rule above, and its marker names Tangier.

### Cities with no stay

`gibraltar` has `nights: 0` — it is an optional day trip off the Málaga → Tarifa drive, not a place anyone sleeps. It has no `stays[]` entry.

Any city page whose id matches no stay **renders no timeline section at all** rather than an empty block. The section is conditional on a stay existing.

### Away days fall out of the model

A day is "away" when it sits inside a stay's window but its `sleep` is not that stay:

```
day.iso >= stay.fromIso && day.iso < stay.toIso && day.sleep !== stay.id
```

Tarifa's 9/15 satisfies this and renders dimmed with a "room held" marker. No special-casing. Any future stay with the same shape behaves correctly for free.

## Components

Three functions in `app.js`, each with one job.

### `timelineSpine(opts) -> Element`

Renders the spine. `opts.stayId` optional:

- **omitted** — the whole trip: every stay in order, with each leg rendered as a node immediately before the stay it delivers you to. Any leg not matched to a stay start (the final flight home) renders at the end.
- **provided** — one stay, preceded by its arrival leg and followed by its departure leg, with the checkout day included.

This is the only entry point. The index and city pages differ by one argument.

### `stayBlock(stay, opts) -> Element`

The bordered block: header (flag, name, nights badge) then one row per day. Applies the away-day and checkout-day treatments. `opts.includeDeparture` controls whether the checkout day is shown — true on city pages, false on the index, where the next stay's first day already covers it.

### `legNode(leg) -> Element`

A node on the line: mode icon, route, note, and a booked / to-book / to-arrange stamp. Reuses the existing stamp colour tokens.

### Optional authored day detail

Any entry in `cities[]` may carry an optional `days` array:

```js
days: [ { iso: "2026-09-16", text: "Ferry back AM, then Bolonia and Baelo Claudia" } ]
```

When present, it overrides the derived text for matching days on that city's page only. The index always uses the master `timeline[]` text, so the two cannot drift on the overview.

This is the agreed hybrid: ship derived, upgrade individual cities later without touching the component.

## Render placement

| Page | Change |
| --- | --- |
| `index.html` | The `📅 Day by Day` section's flat list is replaced by `timelineSpine()`. Same section, same position, same heading. |
| City pages | New section between the hero and the map, so the page answers *when* before *where*. Calls `timelineSpine({stayId: city.id})`. |
| `✈ The Route` | Unchanged. It answers "what's booked?"; the spine answers "what happens when?". Keeping both was an explicit decision. |

Incidental fix: the Route section's hint reads "Eight legs" and there are now eleven. Correct while in the file.

## Styling

New classes in `styles.css`, all built from existing tokens (`--paper`, `--ink`, `--line`, `--card`, `--accent`, the three stamp colours, `--mono`, `--disp`). No new colours, no new fonts.

`.spine`, `.leg-node`, `.leg-date`, `.leg-body`, `.leg-stamp`, `.stay`, `.stay__head`, `.stay__flag`, `.stay__name`, `.stay__nights`, `.day`, `.day__date`, `.day__text`, `.day__bed`, `.day.is-away`.

Each stay block sets `--accent` from its city, matching the existing city-card pattern.

## Out of scope

Deliberately excluded:

- **No scroll animation on the spine.** The site already has reveal-on-scroll; stacking motion would be noise.
- **No collapsing or expanding of days.** Seventeen days is short enough to read straight through.
- **No per-day times.** The trip is not planned to that resolution, and inventing structure the content cannot fill would make the page feel emptier, not fuller.
- **No shape bar.** Considered and rejected above.

## Verification

The change is visual, so it must be checked by rendering, not by inspection:

1. `trip.js` parses and `TRIP.stays.length === 11`.
2. Every `timeline[]` entry has an `iso` and a `sleep`; every `legs[]` entry has an `iso`.
3. Every `stays[]` entry's `fromIso`/`toIso` resolve to real timeline days.
4. Index renders **10** stay blocks (Tangier suppressed by `withinStay`) and 11 leg nodes.
5. Total nights across index-rendered stays equals 16 — the nights from 9/4 to 9/20. If Tangier were double-counted this would read 17, so the count is the regression guard.
6. Tarifa's city page renders one 3-night block with 9/15 marked away and 9/17 as checkout, plus the arrival and departure legs.
7. Tangier's city page renders its own 1-night stay.
8. Gibraltar's city page renders **no** timeline section.
9. Nights per stay in the rendered output match `cities[].nights` for every city that has a stay.
10. Renders correctly at mobile width.

Note that maps do not render on `localhost` — the Google Maps key is referrer-locked to `b0y3r.github.io`. Verify the spine locally; verify maps only after deploy.
