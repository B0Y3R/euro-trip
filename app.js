// ============================================================
//  app.js — renders the Boys Euro Trip site.
//  coords.js + trip.js + config.js load before this.
//  Page type comes from <body data-page="index|city" data-city="...">.
// ============================================================

(function () {
  "use strict";

  var TRIP = window.TRIP;
  var KEY = window.GOOGLE_MAPS_API_KEY;
  var HAS_KEY = !!KEY && KEY !== "YOUR_MAPS_JS_API_KEY_HERE";

  var KIND_EMOJI = {
    stay: "🏨", sight: "📍", do: "📍", eat: "🍽", drink: "🍸",
    coffee: "☕", ferry: "⛴", transit: "🚉",
  };
  var MODE_ICON = { flight: "✈", ferry: "⛴", train: "🚄", drive: "🚗" };
  var STATUS = {
    booked: { label: "✓ BOOKED", cls: "is-booked" },
    todo: { label: "⚠ TO BOOK", cls: "is-todo" },
    plan: { label: "○ TO ARRANGE", cls: "is-plan" },
  };

  var MAP_STYLE = [
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d7e8cf" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#a9cbe0" }] },
  ];

  var MAPS_TO_INIT = []; // { canvas, stops, accent, link }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function enc(s) { return encodeURIComponent(s); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function mapsSearch(q) { return "https://www.google.com/maps/search/?api=1&query=" + enc(q); }
  function cityById(id) {
    return TRIP.cities.filter(function (c) { return c.id === id; })[0];
  }

  // ---- Maps --------------------------------------------------
  function renderMap(canvas, stops, accent, linkToCity) {
    var pts = stops.filter(function (s) { return s.lat && s.lng; });
    if (!pts.length) { canvas.innerHTML = '<div class="map__notice">no map points</div>'; return; }
    var map = new google.maps.Map(canvas, {
      mapTypeControl: false, streetViewControl: false, fullscreenControl: true,
      gestureHandling: "cooperative", backgroundColor: "#efe6d2", styles: MAP_STYLE,
    });
    var bounds = new google.maps.LatLngBounds();
    pts.forEach(function (s, i) {
      var pos = { lat: s.lat, lng: s.lng };
      var marker = new google.maps.Marker({
        position: pos, map: map, title: (i + 1) + ". " + s.name,
        label: { text: String(i + 1), color: "#1c1813", fontFamily: '"JetBrains Mono", monospace', fontWeight: "700", fontSize: "12px" },
        icon: { path: google.maps.SymbolPath.CIRCLE, scale: 13, fillColor: accent, fillOpacity: 1, strokeColor: "#1c1813", strokeWeight: 3 },
      });
      var link = linkToCity && s.cityId
        ? '<a href="' + s.cityId + '.html" style="font:700 12px monospace;color:#b5283b">Open ' + esc(s.name) + ' →</a>'
        : '<a href="' + mapsSearch(s.q || s.name) + '" target="_blank" rel="noopener" style="font:700 12px monospace;color:#9a6a17">Open in Maps ↗</a>';
      var iw = new google.maps.InfoWindow({
        content: '<div style="font:700 14px system-ui;margin-bottom:4px">' + (i + 1) + ". " + esc(s.name) + "</div>" + link,
      });
      marker.addListener("click", function () {
        if (linkToCity && s.cityId) { window.location.href = s.cityId + ".html"; }
        else { iw.open(map, marker); }
      });
      bounds.extend(pos);
    });
    if (pts.length > 1) map.fitBounds(bounds, 56); else { map.setCenter(pts[0]); map.setZoom(13); }
  }

  function mapBlock(stops, accent, opts) {
    opts = opts || {};
    var wrap = el("div", "map");
    if (!HAS_KEY) {
      wrap.appendChild(el("div", "map__notice", "🔑 Add your Maps JavaScript API key to <code>config.js</code>"));
    } else {
      var canvas = el("div", "map__canvas");
      wrap.appendChild(canvas);
      MAPS_TO_INIT.push({ canvas: canvas, stops: stops, accent: accent, link: !!opts.linkToCity });
    }
    if (opts.legend && stops.length > 1) {
      var legend = el("div", "map__legend");
      stops.forEach(function (s, i) {
        var a = el("a", "map__legend-item", "<b>" + (i + 1) + "</b> " + esc(s.name));
        a.href = (opts.linkToCity && s.cityId) ? s.cityId + ".html" : mapsSearch(s.q || s.name);
        if (!(opts.linkToCity && s.cityId)) { a.target = "_blank"; a.rel = "noopener"; }
        legend.appendChild(a);
      });
      wrap.appendChild(legend);
    }
    return wrap;
  }

  function loadMaps() {
    if (!HAS_KEY || !MAPS_TO_INIT.length) return;
    window.__initTripMaps = function () {
      MAPS_TO_INIT.forEach(function (m) {
        try { renderMap(m.canvas, m.stops, m.accent, m.link); }
        catch (e) { m.canvas.innerHTML = '<div class="map__notice">map failed</div>'; }
      });
    };
    var s = document.createElement("script");
    s.src = "https://maps.googleapis.com/maps/api/js?key=" + enc(KEY) + "&callback=__initTripMaps&v=weekly&loading=async";
    s.async = true;
    s.onerror = function () {
      MAPS_TO_INIT.forEach(function (m) { m.canvas.innerHTML = '<div class="map__notice">Couldn\'t load Google Maps — check the key &amp; that Maps JavaScript API is enabled.</div>'; });
    };
    document.head.appendChild(s);
  }

  // ---- Shared chrome ----------------------------------------
  function topnav(currentId) {
    var nav = el("nav", "topnav");
    var home = el("a", "topnav__home" + (currentId ? "" : " is-active"), "✦ TRIP");
    home.href = "index.html";
    nav.appendChild(home);
    TRIP.cities.forEach(function (c) {
      var a = el("a", "topnav__chip" + (c.id === currentId ? " is-active" : ""),
        c.flag + " " + c.code);
      a.href = c.id + ".html";
      a.style.setProperty("--accent", c.accent);
      nav.appendChild(a);
    });
    return nav;
  }

  function card(c) {
    var href = c.url || mapsSearch(c.query || c.name);
    var a = el("a", "card");
    a.href = href; a.target = "_blank"; a.rel = "noopener";
    var top = el("div", "card__top");
    top.appendChild(el("div", "card__kind", KIND_EMOJI[c.kind] || "📍"));
    top.appendChild(el("div", "card__name", esc(c.name)));
    a.appendChild(top);
    if (c.blurb) a.appendChild(el("div", "card__blurb", esc(c.blurb)));
    if (c.tags && c.tags.length) {
      var tags = el("div", "card__tags");
      c.tags.forEach(function (t) { tags.appendChild(el("span", "card__tag", esc(t))); });
      a.appendChild(tags);
    }
    var go = c.url
      ? (/airbnb/.test(c.url) ? "View on Airbnb" : (/booking\.com/.test(c.url) ? "View on Booking" : "Open link"))
      : "Open in Maps";
    a.appendChild(el("div", "card__go", go + " ↗"));
    return a;
  }

  function boardingPass(leg) {
    var st = STATUS[leg.status] || STATUS.plan;
    var bp = el("div", "bp " + st.cls);
    bp.appendChild(el("div", "bp__head",
      '<span class="bp__brand">BOARDING PASS</span><span class="bp__mode">' + (MODE_ICON[leg.mode] || "•") + "</span>"));
    bp.appendChild(el("div", "bp__route",
      '<span class="bp__code">' + esc(leg.from) + "</span>" +
      '<span class="bp__path">┄┄┄ ' + (MODE_ICON[leg.mode] || "•") + " ┄┄┄▸</span>" +
      '<span class="bp__code">' + esc(leg.to) + "</span>"));
    bp.appendChild(el("div", "bp__cities", esc(leg.fromName) + " → " + esc(leg.toName)));
    bp.appendChild(el("div", "bp__perf"));
    bp.appendChild(el("div", "bp__foot",
      '<span class="bp__date">' + esc(leg.date) + "</span>" +
      '<span class="bp__stamp">' + st.label + "</span>"));
    if (leg.note) bp.appendChild(el("div", "bp__note", esc(leg.note)));
    return bp;
  }

  function footer() {
    var f = el("footer", "footer");
    f.appendChild(el("p", "footer__big", "WHEELS UP ✈"));
    var credit = "The boys · Sept 2026";
    f.appendChild(el("p", "footer__small",
      TRIP.notionUrl ? esc(credit) + ' · <a href="' + TRIP.notionUrl + '" target="_blank" rel="noopener">full plan ↗</a>' : esc(credit)));
    return f;
  }

  // ---- Timeline spine ---------------------------------------

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
      // Legs falling inside this stay's window - the Tangier round trip sits
      // inside Tarifa's. Without this they miss every fromIso match and get
      // swept into the trailing loop, rendering after the last stay.
      TRIP.legs.forEach(function (l, i) {
        if (!used[i] && l.iso > stay.fromIso && l.iso < stay.toIso) {
          used[i] = 1;
          wrap.appendChild(legNode(l));
        }
      });
    });
    TRIP.legs.forEach(function (l, i) { if (!used[i]) wrap.appendChild(legNode(l)); });
    return wrap;
  }

  // ---- Index page -------------------------------------------
  function buildIndex(app) {
    app.appendChild(topnav(null));

    var hero = el("header", "hero reveal");
    hero.appendChild(el("p", "hero__kicker", esc(TRIP.subtitle)));
    hero.appendChild(el("h1", "hero__title", esc(TRIP.title)));
    hero.appendChild(el("p", "hero__dates", esc(TRIP.dateRange)));
    hero.appendChild(el("p", "hero__summary", esc(TRIP.summary)));
    app.appendChild(hero);

    // boarding passes
    var legSec = el("section", "section reveal");
    legSec.appendChild(el("h2", "section__title", "✈ The Route"));
    legSec.appendChild(el("p", "section__hint", "Eleven legs, two continents. Stamps show what's booked."));
    var bpGrid = el("div", "bp-grid");
    TRIP.legs.forEach(function (leg) { bpGrid.appendChild(boardingPass(leg)); });
    legSec.appendChild(bpGrid);
    app.appendChild(legSec);

    // overview map (all cities)
    var mapSec = el("section", "section reveal");
    mapSec.appendChild(el("h2", "section__title", "🗺️ Every Stop"));
    var cityStops = TRIP.cities.map(function (c) {
      var co = (window.COORDS || {})["city_" + c.id] || {};
      return { name: c.name, lat: co.lat, lng: co.lng, cityId: c.id, q: c.name };
    });
    mapSec.appendChild(mapBlock(cityStops, "#b5283b", { legend: true, linkToCity: true }));
    app.appendChild(mapSec);

    // timeline
    var tlSec = el("section", "section reveal");
    tlSec.appendChild(el("h2", "section__title", "📅 Day by Day"));
    tlSec.appendChild(el("p", "section__hint", "Blocks are stays, sized by nights. Dots are travel days."));
    tlSec.appendChild(timelineSpine());
    app.appendChild(tlSec);

    // city grid
    var cSec = el("section", "section reveal");
    cSec.appendChild(el("h2", "section__title", "📖 The Cities"));
    var grid = el("div", "city-grid");
    TRIP.cities.forEach(function (c) {
      var a = el("a", "city-card");
      a.href = c.id + ".html";
      a.style.setProperty("--accent", c.accent);
      a.appendChild(el("div", "city-card__flag", c.flag));
      a.appendChild(el("div", "city-card__name", esc(c.name)));
      a.appendChild(el("div", "city-card__meta", esc(c.dates) + " · " + c.nights + (c.nights === 1 ? " night" : " nights")));
      a.appendChild(el("div", "city-card__blurb", esc(c.blurb)));
      a.appendChild(el("div", "city-card__go", "Open " + esc(c.name) + " →"));
      grid.appendChild(a);
    });
    cSec.appendChild(grid);
    app.appendChild(cSec);

    app.appendChild(footer());
  }

  // ---- City page --------------------------------------------
  function buildCity(app, city) {
    app.appendChild(topnav(city.id));
    app.style.setProperty("--accent", city.accent);

    var hero = el("header", "hero hero--city reveal");
    hero.style.setProperty("--accent", city.accent);
    hero.appendChild(el("div", "hero__flag", city.flag));
    hero.appendChild(el("p", "hero__kicker", esc(city.country) + " · " + esc(city.dates)));
    hero.appendChild(el("h1", "hero__title", esc(city.name)));
    hero.appendChild(el("p", "hero__summary", esc(city.blurb)));
    hero.appendChild(el("p", "hero__currency", "💱 " + esc(city.currency)));
    app.appendChild(hero);

    // map
    var mapSec = el("section", "section reveal");
    mapSec.appendChild(el("h2", "section__title", "🗺️ The Map"));
    mapSec.appendChild(mapBlock(city.map.stops, city.accent, { legend: true }));
    app.appendChild(mapSec);

    // sections
    city.sections.forEach(function (sec) {
      var s = el("section", "section reveal");
      s.appendChild(el("h2", "section__title", (sec.icon ? sec.icon + " " : "") + esc(sec.title)));
      var grid = el("div", "cards");
      sec.cards.forEach(function (c) { grid.appendChild(card(c)); });
      s.appendChild(grid);
      app.appendChild(s);
    });

    // prev/next nav
    var idx = TRIP.cities.indexOf(city);
    var pn = el("div", "prevnext");
    if (idx > 0) { var p = el("a", "prevnext__a", "← " + TRIP.cities[idx - 1].flag + " " + esc(TRIP.cities[idx - 1].name)); p.href = TRIP.cities[idx - 1].id + ".html"; pn.appendChild(p); }
    else { pn.appendChild(el("span", "")); }
    if (idx < TRIP.cities.length - 1) { var n = el("a", "prevnext__a prevnext__a--next", esc(TRIP.cities[idx + 1].name) + " " + TRIP.cities[idx + 1].flag + " →"); n.href = TRIP.cities[idx + 1].id + ".html"; pn.appendChild(n); }
    app.appendChild(pn);

    app.appendChild(footer());
  }

  // ---- Scroll reveal ----------------------------------------
  function wireReveals() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });
  }

  // ---- Go ---------------------------------------------------
  function init() {
    var app = document.getElementById("app");
    var page = document.body.dataset.page;
    if (page === "city") {
      var city = cityById(document.body.dataset.city);
      if (city) { document.title = city.name + " · Boys Euro Trip"; buildCity(app, city); }
    } else {
      document.title = "Boys Euro Trip · Sep 2026";
      buildIndex(app);
    }
    wireReveals();
    loadMaps();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
