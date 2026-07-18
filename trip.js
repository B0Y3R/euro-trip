// ============================================================
//  Euro Trip — all content. coords.js must load first.
//  S(name, key, q) builds a map stop from window.COORDS[key].
// ============================================================

function S(name, key, q) {
  var c = (window.COORDS || {})[key] || { lat: 0, lng: 0 };
  return { name: name, lat: c.lat, lng: c.lng, q: q || name };
}

window.TRIP = {
  title: "EURO TRIP",
  subtitle: "Scandinavia → Southern Spain",
  dateRange: "Sep 4 – 20, 2026",
  summary:
    "Seventeen days, nine stops and four day-trips across two continents. " +
    "Saunas and old towns up north, a night in Morocco, then tapas, flamenco and big nights down south.",
  notionUrl: "https://app.notion.com/p/38c8319b49c180fda446eb82e341333c",

  // Boarding passes — the inter-city legs.
  // status: "booked" (✓), "todo" (needs booking), "plan" (to arrange)
  legs: [
    { date: "Sep 4", iso: "2026-09-04", from: "NYC", to: "HEL", fromName: "New York", toName: "Helsinki", mode: "flight", status: "booked", note: "Red-eye out" },
    { date: "Sep 6", iso: "2026-09-06", from: "HEL", to: "TLL", fromName: "Helsinki", toName: "Tallinn", mode: "ferry", status: "plan", note: "~2h across the gulf — Tallink / Eckerö / Viking" },
    { date: "Sep 8", iso: "2026-09-08", from: "TLL", to: "STO", fromName: "Tallinn", toName: "Stockholm", mode: "ferry", status: "todo", note: "Overnight Baltic Queen — sails alternate nights, CONFIRM 9/8" },
    { date: "Sep 10", iso: "2026-09-10", from: "STO", to: "CPH", fromName: "Stockholm", toName: "Copenhagen", mode: "flight", status: "todo", note: "Evening flight from Arlanda (~1h) — still to book" },
    { date: "Sep 12", iso: "2026-09-12", from: "CPH", to: "AGP", fromName: "Copenhagen", toName: "Málaga", mode: "flight", status: "booked", note: "Night flight south, lands ~midnight" },
    { date: "Sep 14", iso: "2026-09-14", from: "AGP", to: "TAR", fromName: "Málaga", toName: "Tarifa", mode: "drive", status: "plan", note: "Rental car ~2h15 — Gibraltar optional en route" },
    { date: "Sep 15", iso: "2026-09-15", from: "TAR", to: "TNG", fromName: "Tarifa", toName: "Tangier", mode: "ferry", status: "todo", note: "Fast ferry ~1h to Tanger Ville — overnight in Morocco" },
    { date: "Sep 16", iso: "2026-09-16", from: "TNG", to: "TAR", fromName: "Tangier", toName: "Tarifa", mode: "ferry", status: "todo", note: "Morning ferry back" },
    { date: "Sep 17", iso: "2026-09-17", from: "TAR", to: "SVQ", fromName: "Tarifa", toName: "Seville", mode: "drive", status: "plan", note: "Via Cádiz — adds only ~10 min. Drop the car at Santa Justa" },
    { date: "Sep 19", iso: "2026-09-19", from: "SVQ", to: "MAD", fromName: "Seville", toName: "Madrid", mode: "train", status: "plan", note: "AVE high-speed, ~2.5h" },
    { date: "Sep 20", iso: "2026-09-20", from: "MAD", to: "NYC", fromName: "Madrid", toName: "New York", mode: "flight", status: "booked", note: "Fly home" },
  ],

  // Day-by-day overview (shown on the home page).
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

  cities: [
    // ===================================================== HELSINKI
    {
      id: "helsinki", flag: "🇫🇮", name: "Helsinki", country: "Finland",
      code: "HEL", dates: "Sep 5–6", nights: 1, accent: "#2e6f95",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "One day, one night, straight off the red-eye. Löyly is the non-negotiable — waterfront sauna, plunge into the Baltic, drinks on the deck — then the walkable core before the morning ferry to Tallinn.",
      map: { stops: [
        S("Helsinki Cathedral", "hel_cathedral"),
        S("Temppeliaukio (Rock Church)", "hel_rockchurch", "Temppeliaukio Church Helsinki"),
        S("Löyly Sauna", "hel_loyly", "Löyly Helsinki"),
        S("Market Square", "hel_market", "Market Square Helsinki"),
        S("Old Market Hall", "hel_oldmarket", "Vanha Kauppahalli Helsinki"),
        S("Amos Rex", "hel_amosrex", "Amos Rex Helsinki"),
        S("Design District", "hel_design", "Design District Helsinki"),
        S("Suomenlinna Fortress", "hel_suomenlinna", "Suomenlinna Helsinki"),
      ] },
      sections: [
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Hotel U14 (Autograph)", blurb: "Boutique in a restored 1914 building by Market Square, on-site sauna, voted #1 hotel breakfast in Helsinki. One night, so take the hotel.", tags: ["★ top pick", "hotel", "~$150–200/nt"], url: "https://hotelu14.fi/" },
          { kind: "stay", name: "Scandic Helsinki Hub", blurb: "Modern high-rise dead center, 9.0/10 guest scores, walking distance to everything. The reliable pick.", tags: ["hotel", "~$130–160/nt"], url: "https://www.scandichotels.com/en/hotels/scandic-helsinki-hub" },
          { kind: "stay", name: "Hotel Indigo Helsinki", blurb: "Boutique design hotel on a quiet street, walkable to the Cathedral, Senate Square and the Design District.", tags: ["hotel", "~$160–200/nt"], url: "https://www.ihg.com/hotelindigo/hotels/us/en/helsinki/helnd/hoteldetail" },
          { kind: "stay", name: "Search Airbnb (1 night, 3 guests)", blurb: "An Airbnb makes less sense for a single night, but the search is here with the right dates if you want to look.", tags: ["airbnb", "1 night"], url: "https://www.airbnb.com/s/Helsinki--Finland/homes?check_in=2026-09-05&check_out=2026-09-06&adults=3" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "Löyly Sauna", blurb: "Award-winning waterfront sauna — three saunas, plunge into the Baltic, drinks on the deck. Book ahead.", tags: ["★ must", "sauna"], url: "https://www.loylyhelsinki.fi/en" },
          { kind: "sight", name: "Temppeliaukio (Rock Church)", blurb: "Church blasted into solid bedrock — copper dome, incredible acoustics.", tags: ["~€5"], query: "Temppeliaukio Church Helsinki" },
          { kind: "sight", name: "Suomenlinna Sea Fortress", blurb: "UNESCO island fortress, 15-min ferry from Market Square. Tunnels, cannons, sea views.", tags: ["½ day", "ferry ~€6"], query: "Suomenlinna Helsinki" },
          { kind: "sight", name: "Amos Rex", blurb: "Underground contemporary art museum with bubble skylights popping out of the plaza.", tags: ["~€20"], url: "https://amosrex.fi/en/" },
          { kind: "sight", name: "Helsinki Cathedral + Market Square", blurb: "Iconic white cathedral over Senate Square; waterfront market below for salmon soup.", tags: ["free"], query: "Helsinki Cathedral" },
          { kind: "sight", name: "Design District", blurb: "25 blocks of Finnish design shops, galleries and studios — Marimekko, Iittala & co.", tags: ["free"], url: "https://www.designdistrict.fi/en/" },
        ] },
        { title: "Eat", icon: "🍽️", cards: [
          { kind: "coffee", name: "Café Regatta", blurb: "Tiny red seaside cottage, legendary cinnamon rolls. The classic morning stop.", tags: ["breakfast"], url: "https://www.caferegatta.fi/in-english" },
          { kind: "eat", name: "Old Market Hall", blurb: "Historic 1889 food hall by the water — reindeer, smoked salmon, pastries. Group graze.", tags: ["lunch"], url: "https://www.vanhakauppahalli.fi/en/" },
          { kind: "eat", name: "Grön", blurb: "Michelin veg-forward Nordic tasting menu — one of Scandinavia's best. Book weeks ahead.", tags: ["★ dinner", "splurge"], url: "https://www.restaurantgron.com/" },
          { kind: "eat", name: "Muru", blurb: "Beloved Finnish-French bistro, great natural wine, buzzy. Book ahead.", tags: ["dinner"], url: "https://www.ravintola-muru.fi/" },
          { kind: "eat", name: "Goose Pastabar", blurb: "Chill homemade-pasta spot if the group wants something low-key.", tags: ["casual"], url: "https://www.gooserestaurants.fi/goose-pastabar" },
        ] },
        { title: "Drink", icon: "🍻", cards: [
          { kind: "drink", name: "Ateljee Bar (Torni rooftop)", blurb: "360° rooftop over the city — the first-night sunset move. No reservation.", tags: ["★ rooftop"], url: "https://www.sokoshotels.fi/en/helsinki/sokos-hotel-torni" },
          { kind: "drink", name: "Liberty or Death", blurb: "Speakeasy-style #1 cocktail bar in the city. Dark and creative.", tags: ["cocktails"], url: "https://sonofapunch.com/liberty-or-death" },
          { kind: "drink", name: "Kaisla", blurb: "Classic beer hall — huge Finnish/international craft list, communal tables.", tags: ["beer"], url: "https://www.raflaamo.fi/en/restaurant/helsinki/kaisla" },
          { kind: "drink", name: "Kaiku", blurb: "Helsinki's best underground techno club. Serious sound system.", tags: ["club", "late"], url: "https://www.ravintolakaiku.fi/" },
        ] },
      ],
    },

    // ===================================================== TALLINN
    {
      id: "tallinn", flag: "🇪🇪", name: "Tallinn", country: "Estonia",
      code: "TLL", dates: "Sep 6–8", nights: 2, accent: "#5b8c5a",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "Two nights in the best-preserved medieval city in Europe — ferry in from Helsinki Sunday, saunas and craft beer in Kalamaja, then the overnight Baltic Queen out to Stockholm Tuesday night. That sailing is STILL TO BOOK, and the ship runs alternate evenings, so confirm Sept 8 before anything else locks.",
      map: { stops: [
        S("Old Town (Raekoja plats)", "tll_oldtown", "Raekoja plats Tallinn"),
        S("Toompea Castle", "tll_toompea", "Toompea Castle Tallinn"),
        S("Alexander Nevsky Cathedral", "tll_alexander", "Alexander Nevsky Cathedral Tallinn"),
        S("St Olaf's Church", "tll_stolav", "St Olafs Church Tallinn"),
        S("Kadriorg Palace", "tll_kadriorg", "Kadriorg Palace Tallinn"),
        S("Telliskivi Creative City", "tll_telliskivi", "Telliskivi Creative City Tallinn"),
        S("Fotografiska Tallinn", "tll_fotografiska", "Fotografiska Tallinn"),
        S("Iglupark Sauna", "tll_iglupark", "Iglupark Tallinn"),
      ] },
      sections: [
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Nordic Hotel Forum", blurb: "Polished 4.5-star across the street from the Old Town gates, with a top-floor pool and sauna after a day of walking.", tags: ["★ top pick", "~$138/nt"], url: "https://www.booking.com/searchresults.html?ss=Nordic+Hotel+Forum+Tallinn&checkin=2026-09-06&checkout=2026-09-08&group_adults=3" },
          { kind: "stay", name: "Palace Hotel Tallinn", blurb: "1930s landmark on Freedom Square folded into Radisson Individuals — old bones, updated rooms, 3 minutes to Old Town.", tags: ["~$90–190/nt", "value"], url: "https://www.booking.com/hotel/ee/palace-tallinn.html" },
          { kind: "stay", name: "Hotel Telegraaf", blurb: "Five-star in a 19th-century telegraph building, widely the nicest hotel inside the walls — the splurge call.", tags: ["splurge", "Old Town"], url: "https://www.booking.com/searchresults.html?ss=Hotel+Telegraaf+Tallinn&checkin=2026-09-06&checkout=2026-09-08&group_adults=3" },
          { kind: "stay", name: "Nunne Boutique Hotel", blurb: "74 rooms built into the medieval city wall itself — modern interiors, best value of the inside-the-walls options.", tags: ["boutique"], url: "https://www.booking.com/searchresults.html?ss=Nunne+Boutique+Hotel+Tallinn&checkin=2026-09-06&checkout=2026-09-08&group_adults=3" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "Old Town + Toompea Hill", blurb: "Climb to the Kohtuotsa and Patkuli platforms for the classic red-roof panoramas — do it on arrival afternoon.", tags: ["★ must", "free"], url: "https://www.visittallinn.ee/eng" },
          { kind: "sight", name: "Seaplane Harbour", blurb: "Maritime museum in vast concrete hangars where you climb down inside a 1930s submarine — best indoor thing in town.", tags: ["~€22", "2 hrs"], url: "https://meremuuseum.ee/lennusadam/en/visitor-information/tickets/" },
          { kind: "sight", name: "Kalma Saun", blurb: "1928 public sauna in Kalamaja — wood-fired stove, steam room, cold plunge, birch whisks; rugged and completely local.", tags: ["★ do it", "€12–18"], url: "https://www.kalmasaun.ee/eng-ajalooga-koht/" },
          { kind: "sight", name: "Iglupark Igloo Saunas", blurb: "Glass-fronted igloo saunas on the Noblessner waterfront — sweat over the bay, then walk straight into the Baltic.", tags: ["book ahead", "private"], url: "https://iglupark.com/en/" },
          { kind: "sight", name: "Telliskivi Creative City", blurb: "Old railway workshops turned creative quarter — street art, taprooms and live music, 15 minutes clear of the stag crowds.", tags: ["free", "evening"], url: "https://telliskivi.cc/en/" },
          { kind: "sight", name: "Fotografiska Tallinn", blurb: "Rotating contemporary photography plus a 6th-floor bar with the best panorama of Old Town and Kalamaja.", tags: ["rooftop"], url: "https://tallinn.fotografiska.com/en/restaurants/fotografiska-restaurant" },
        ] },
        { title: "Eat", icon: "🍽️", cards: [
          { kind: "coffee", name: "Fika", blurb: "Proper barista coffee and flaky almond croissants at the entrance to Telliskivi — the grab-and-go on departure morning.", tags: ["coffee", "~€5–10"], query: "Fika Telliskivi Tallinn" },
          { kind: "eat", name: "F-Hoone", blurb: "Cavernous century-old factory in Telliskivi doing all-day breakfast — order the Kalamaja plate or the oven omelette.", tags: ["breakfast", "~€10–18"], url: "https://www.fhoone.ee/en/" },
          { kind: "eat", name: "Rataskaevu 16", blurb: "The most-recommended mid-range room in Old Town — elk fillet, free chocolate cake, and it books out days ahead.", tags: ["reserve now", "~€20–35"], url: "https://www.rataskaevu16.ee/" },
          { kind: "eat", name: "Fotografiska Restaurant", blurb: "Four straight Michelin Green Stars for zero-waste cooking, sixth floor, best view in the city — your one nice dinner.", tags: ["★ dinner", "book ahead"], url: "https://guide.michelin.com/dk/en/harju/tallinn/restaurant/fotografiska-1199007" },
          { kind: "eat", name: "Olde Hansa", blurb: "Full medieval theatre — candlelight, costumed staff, bear and elk, honey beer in clay mugs; a laugh, and better than it needs to be.", tags: ["fun", "~€35–55"], query: "Olde Hansa Tallinn" },
        ] },
        { title: "Drink", icon: "🍻", cards: [
          { kind: "drink", name: "Pudel", blurb: "Telliskivi craft beer bar with ten taps and 200+ rare bottles that turns into music and dancing later — best first stop.", tags: ["★ first stop", "~€6–9"], query: "Pudel Baar Telliskivi Tallinn" },
          { kind: "drink", name: "Põhjala Tap Room", blurb: "24 taps of Estonia's flagship brewery plus real Texas barbecue, in an old submarine factory two minutes from Iglupark.", tags: ["beer + BBQ", "~€6–10"], url: "https://www.pohjalabeer.com/visit/pohjala-tap-room" },
          { kind: "drink", name: "Sigmund Freud Bar", blurb: "Tallinn's best cocktail room, in a 15th-century building with exposed frescoes and 25+ signature drinks.", tags: ["cocktails", "~€12–16"], url: "https://sigmundfreud.bar/" },
          { kind: "drink", name: "Sveta Baar", blurb: "The city's most interesting live-music venue in Telliskivi — clubs may be dark Sun–Tue, so check what's booked here.", tags: ["live music", "€5–10"], query: "Sveta Baar Telliskivi Tallinn" },
        ] },
      ],
    },

    // ===================================================== STOCKHOLM
    {
      id: "stockholm", flag: "🇸🇪", name: "Stockholm", country: "Sweden",
      code: "STO", dates: "Sep 9–10", nights: 1, accent: "#d4a13a",
      currency: "kr (SEK) · kr10 ≈ $1",
      blurb: "The ferry docks around 10am, so Wednesday is a half day and Thursday runs until the evening flight out of Arlanda. Vasa at opening is the one thing not to cut.",
      map: { stops: [
        S("Gamla Stan (Old Town)", "sto_gamlastan", "Gamla Stan Stockholm"),
        S("Vasa Museum", "sto_vasa", "Vasa Museum Stockholm"),
        S("Fotografiska", "sto_fotografiska", "Fotografiska Stockholm"),
        S("Monteliusvägen viewpoint", "sto_montelius", "Monteliusvägen Stockholm"),
        S("Skansen + ABBA Museum", "sto_skansen", "Skansen Stockholm"),
        S("City Hall (Stadshuset)", "sto_cityhall", "Stockholm City Hall"),
        S("Östermalms Saluhall", "sto_ostermalm", "Östermalms Saluhall Stockholm"),
      ] },
      sections: [
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Old Town Large & Luxury Flat", blurb: "4BR / 2 baths in Gamla Stan, by far the most-reviewed central pick. The safe move.", tags: ["★ top pick", "~$582/nt"], url: "https://www.airbnb.com/rooms/38513842?check_in=2026-09-09&check_out=2026-09-11&adults=3" },
          { kind: "stay", name: "Super Nice New Apartment", blurb: "3BR / 1.5 baths, central, best nightly rate of the central bunch.", tags: ["value", "~$379/nt"], url: "https://www.airbnb.com/rooms/1065814406221701102?check_in=2026-09-09&check_out=2026-09-11&adults=3" },
          { kind: "stay", name: "Hotel Rival (Mariatorget)", blurb: "Art-Deco boutique owned by ABBA's Benny — spacious rooms, buzzy bistro/bar. Best Söder base.", tags: ["hotel", "~$200–270/nt"], url: "https://www.rival.se/en/" },
          { kind: "stay", name: "Hilton Slussen", blurb: "Waterfront, panoramic Gamla Stan views, easy for groups, steps from the ferry terminal.", tags: ["hotel", "views"], url: "https://www.hilton.com/en/hotels/stoslhi-hilton-stockholm-slussen/" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "Vasa Museum", blurb: "A fully intact 1628 warship that sank on its maiden voyage and was raised 333 years later. Jaw-dropping. Go at opening.", tags: ["★ must", "~$22"], url: "https://www.vasamuseet.se/en" },
          { kind: "sight", name: "Gamla Stan (Old Town)", blurb: "Cobbled baroque core — Royal Palace, Stortorget, the changing of the guard. Go early.", tags: ["free"], query: "Gamla Stan Stockholm" },
          { kind: "sight", name: "Floating sauna on Riddarfjärden", blurb: "Rent a private wood-fired sauna that drifts in front of City Hall, cold-plunge into the lake. Peak Nordic. Book ahead.", tags: ["★ sauna"], query: "floating sauna Riddarfjärden Stockholm" },
          { kind: "sight", name: "Fotografiska", blurb: "World-class photography museum on the Söder waterfront, open late with a top-floor bar. Doubles as an evening hang.", tags: ["~$22"], url: "https://www.fotografiska.com/sto/" },
          { kind: "sight", name: "Monteliusvägen + Skinnarviksberget", blurb: "Free clifftop viewpoints over Gamla Stan and the water. The local sunset move, beer in hand.", tags: ["free", "sunset"], query: "Monteliusvägen Stockholm" },
          { kind: "sight", name: "SL Ferry 82 (budget 'cruise')", blurb: "Hop the public ferry Slussen→Djurgården for the same skyline views as a pricey cruise, for a transit fare.", tags: ["~$4 hack"], query: "Slussen ferry terminal Stockholm" },
        ] },
        { title: "Eat", icon: "🍽️", cards: [
          { kind: "coffee", name: "Café Pascal", blurb: "Stockholm's reigning specialty-coffee spot — great pastries and eggs. Lines for a reason.", tags: ["breakfast/fika"], url: "https://www.cafepascal.se/" },
          { kind: "eat", name: "Meatballs for the People", blurb: "SoFo institution — beef, moose, veggie meatballs with lingonberry and mash. The fun group lunch.", tags: ["lunch"], url: "https://www.meatball.se/" },
          { kind: "eat", name: "AG", blurb: "The steakhouse of the trip — in-house dry-aging room, 'best ribeye in the country,' legendary burger.", tags: ["★ dinner", "steak"], url: "https://www.restaurangag.se/" },
          { kind: "eat", name: "Ekstedt", blurb: "Michelin, everything cooked over open fire — no gas, no electricity. The special-night option.", tags: ["splurge"], url: "https://www.ekstedt.nu/" },
          { kind: "eat", name: "Aifur", blurb: "Viking-themed feast hall in Gamla Stan — mead, horns, live music. Cheesy in the best way.", tags: ["group fun"], url: "https://www.aifur.se/" },
        ] },
        { title: "Drink", icon: "🍻", cards: [
          { kind: "drink", name: "Le Hibou (Bank Hotel rooftop)", blurb: "The must-do rooftop — panoramic cocktails, named one of Sweden's best bars. Sunset slot.", tags: ["★ rooftop"], query: "Le Hibou Bank Hotel Stockholm" },
          { kind: "drink", name: "Tjoget", blurb: "NYC-style cocktail bar in Hornstull, on the World's 50 Best list. The nightlife anchor.", tags: ["cocktails"], url: "https://tjoget.com/" },
          { kind: "drink", name: "Kvarnen", blurb: "Historic 1908 beer hall by Medborgarplatsen that flips into a packed late-night party. No pretense.", tags: ["beer", "late"], query: "Kvarnen Medborgarplatsen Stockholm" },
          { kind: "drink", name: "Stureplan (Sturecompagniet)", blurb: "The clubbing heart — multi-storey party palace. Dress smart, expect a line.", tags: ["club"], query: "Sturecompagniet Stockholm" },
        ] },
      ],
    },

    // ===================================================== COPENHAGEN
    {
      id: "copenhagen", flag: "🇩🇰", name: "Copenhagen", country: "Denmark",
      code: "CPH", dates: "Sep 10–12", nights: 2, accent: "#c8453b",
      currency: "kr (DKK) · kr10 ≈ $1.50",
      blurb: "Land Thursday night, then two full days — the extra day splits the old cramped loop in half. Friday goes hard in the Meatpacking District (open till 5am), Saturday is harbour and canals before the night flight to Málaga.",
      map: { stops: [
        S("Nyhavn", "cph_nyhavn", "Nyhavn Copenhagen"),
        S("Kødbyen (Meatpacking)", "cph_kodbyen", "Kødbyen Copenhagen"),
        S("Round Tower", "cph_roundtower", "Rundetårn Copenhagen"),
        S("Torvehallerne", "cph_torvehallerne", "Torvehallerne Copenhagen"),
        S("Church of Our Saviour", "cph_saviour", "Church of Our Saviour Copenhagen"),
        S("Christiania", "cph_christiania", "Freetown Christiania Copenhagen"),
        S("Amalienborg", "cph_amalienborg", "Amalienborg Copenhagen"),
        S("Tivoli Gardens", "cph_tivoli", "Tivoli Gardens Copenhagen"),
      ] },
      sections: [
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Villa Copenhagen", blurb: "Grand 1912 former post office by Tivoli & Central Station — rooftop pool, buzzy bar, great bakery. The move.", tags: ["★ top pick", "hotel"], url: "https://villacopenhagen.com" },
          { kind: "stay", name: "Scandic Kødbyen", blurb: "Literally in the Meatpacking District — roll out of Jolene and be in bed in five minutes.", tags: ["best location", "~$180–260/nt"], url: "https://www.scandichotels.com" },
          { kind: "stay", name: "125m² Central Apt (2.5 baths)", blurb: "3BR Guest Favorite, three bathrooms = no one waits before the night out. 1-night OK.", tags: ["airbnb", "~$220/guy"], url: "https://www.airbnb.com/rooms/25652864?check_in=2026-09-11&check_out=2026-09-12&adults=3" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "Nyhavn + canal cruise", blurb: "The candy-colored harbour — go early for photos, then a Stromma or Hey Captain boat to orient.", tags: ["★", "~$15"], query: "Nyhavn Copenhagen" },
          { kind: "sight", name: "Church of Our Saviour", blurb: "Climb the gold external spiral staircase for the best (and scariest) view in the city.", tags: ["views"], query: "Church of Our Saviour Copenhagen" },
          { kind: "sight", name: "Round Tower", blurb: "17th-century observatory you climb via a spiral ramp to a 360° view. Quick and fun.", tags: ["quick"], query: "Rundetårn Copenhagen" },
          { kind: "sight", name: "Christiania", blurb: "Famous self-governing counterculture commune — murals and atmosphere (respect no-photo zones).", tags: ["free"], query: "Freetown Christiania Copenhagen" },
          { kind: "sight", name: "Tivoli Gardens", blurb: "The 1843 amusement park by Central Station — lights and rides, an easy last stop before the airport.", tags: ["evening"], query: "Tivoli Gardens Copenhagen" },
        ] },
        { title: "Eat", icon: "🍽️", cards: [
          { kind: "eat", name: "Kødbyens Fiskebar", blurb: "The Meatpacking District's original star — outstanding seafood and natural wine. The Friday dinner anchor.", tags: ["★ dinner"], query: "Kødbyens Fiskebar Copenhagen" },
          { kind: "eat", name: "WarPigs", blurb: "Texas BBQ + craft beer (Mikkeller/3 Floyds) on communal tables. Loud, communal and cheap, and it lines the stomach.", tags: ["pre-night"], query: "WarPigs Copenhagen" },
          { kind: "eat", name: "Torvehallerne", blurb: "Glass-and-steel food market — smørrebrød, coffee, stalls. The do-it-all Saturday lunch.", tags: ["lunch"], query: "Torvehallerne Copenhagen" },
          { kind: "eat", name: "Sankt Peders Bageri", blurb: "The city's oldest bakery (1652) — go for the outsized cinnamon snail. Morning fuel.", tags: ["bakery"], query: "Sankt Peders Bageri Copenhagen" },
        ] },
        { title: "Drink", icon: "🍻", cards: [
          { kind: "drink", name: "Jolene", blurb: "The legendary Kødbyen dance floor — indie/disco/house till ~5am Fri/Sat. The center of the night.", tags: ["★ club", "till 5am"], query: "Jolene Bar Copenhagen" },
          { kind: "drink", name: "Bakken", blurb: "Right next door, free entry, colored lights and a patio onto the plaza. Easy first stop.", tags: ["club"], query: "Bakken Kødbyen Copenhagen" },
          { kind: "drink", name: "Lidkoeb", blurb: "Beautiful three-floor cocktail bar in a hidden Vesterbro courtyard. The mid-night cocktail move.", tags: ["cocktails"], query: "Lidkoeb Copenhagen" },
          { kind: "drink", name: "Mikkeller Bar", blurb: "Original taproom of the famous Danish craft brewery. For the beer geeks.", tags: ["beer"], query: "Mikkeller Bar Viktoriagade Copenhagen" },
        ] },
      ],
    },

    // ===================================================== MÁLAGA
    {
      id: "malaga", flag: "🇪🇸", name: "Málaga + Granada", country: "Spain",
      code: "AGP", dates: "Sep 12–14", nights: 2, accent: "#e08a2b",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "Land near midnight and crash at an airport hotel. Sunday is the payoff: grab the rental car and drive to Granada for the Alhambra, back to the same hotel, then south to Tarifa on Monday. Alhambra tickets are the one booking that can't be fixed late.",
      map: { stops: [
        S("Málaga Airport (base)", "agp_airport", "Málaga Airport"),
        S("Alhambra, Granada", "gra_alhambra", "Alhambra Granada"),
        S("Mirador de San Nicolás", "gra_sannicolas", "Mirador de San Nicolas Granada"),
        S("Albaicín", "gra_albaicin", "Albaicin Granada"),
        S("Alcazaba (Málaga)", "mal_alcazaba", "Alcazaba Málaga"),
        S("Museo Picasso", "mal_picasso", "Museo Picasso Málaga"),
        S("Málaga Cathedral", "mal_cathedral", "Catedral de Málaga"),
      ] },
      sections: [
        { title: "Stay — airport", icon: "🏨", cards: [
          { kind: "stay", name: "Holiday Inn Express Málaga Airport", blurb: "Closest bed to the terminal at 1 km, 24/7 desk, and reception reimburses your airport bus ticket.", tags: ["★ top pick", "24h desk", "1 km"], url: "https://www.booking.com/hotel/es/holiday-inn-express-malaga.html?checkin=2026-09-12&checkout=2026-09-14&group_adults=3" },
          { kind: "stay", name: "Hotel Málaga Nostrum Airport", blurb: "Five minutes out, recently refurbished, rooftop pool and a real restaurant — the pleasant option for the Granada night.", tags: ["24h desk", "parking €5/night"], url: "https://www.booking.com/hotel/es/ma-laga-nostrum.en-gb.html?checkin=2026-09-12&checkout=2026-09-14&group_adults=3" },
          { kind: "stay", name: "Travelodge Málaga Airport", blurb: "Two km out with a 24-hour reception, bar and restaurant, and consistently the cheapest credible airport box.", tags: ["24h desk", "cheapest"], url: "https://www.booking.com/hotel/es/travelodge-malaga-airport.html?checkin=2026-09-12&checkout=2026-09-14&group_adults=3" },
          { kind: "stay", name: "Hotel Zen Airport (Torremolinos)", blurb: "Its free shuttle stops at 23:50 and can't be pre-booked, so a 1am landing means taxiing in anyway — only worth it on price.", tags: ["shuttle ends 23:50", "taxi anyway"], url: "https://www.hotelzen.es/en/shuttle.html" },
        ] },
        { title: "Rental car", icon: "🚗", cards: [
          { kind: "sight", name: "Pick up Sunday morning, not at 1am", blurb: "Skip the arrival-night paperwork — every AGP desk is open Sunday morning and you drive straight out toward Granada.", tags: ["★ top pick", "T2 & T3 arrivals"], query: "Malaga Airport AGP car rental" },
          { kind: "sight", name: "One-way AGP → Seville drop-off", blurb: "It's a one-way rental with a relocation fee, so get the number written into the quote, not sprung at the Seville counter.", tags: ["one-way fee", "compare 2–3 firms"], query: "Malaga Airport AGP car rental desks" },
          { kind: "sight", name: "International Driving Permit — required", blurb: "Spain wants an IDP carried alongside your US licence and issued 21,606 fines in 2024 for invalid licences; AAA, ~$20, before you fly.", tags: ["★ must", "~$20", "get it in the US"], url: "https://www.caserexpatinsurance.com/blog-typical-non-spanish/renting-a-car-in-spain-with-a-us-license" },
        ] },
        { title: "Granada — Sun 9/13", icon: "🏔️", cards: [
          { kind: "sight", name: "Alhambra — book tickets NOW", blurb: "Sells out 2–3 months ahead and the Nasrid Palaces slot is a hard timed window you forfeit if you're late — buy the second Sept 13 opens.", tags: ["★ must", "€22.27", "nominative"], url: "https://tickets.alhambra-patronato.es/en/producto/alhambra-general/" },
          { kind: "sight", name: "Alhambra car park", blurb: "About 500 guarded outdoor spaces at the complex itself — take the Serrallo tunnel, exit 5A, and park once.", tags: ["€3.17/hour", "24h guarded"], query: "Parking Alhambra Granada" },
          { kind: "sight", name: "Albaicín + Mirador de San Nicolás", blurb: "White lanes climbing the hill opposite, topped by the classic Alhambra-against-the-Sierra-Nevada view at sunset.", tags: ["free", "late afternoon"], query: "Mirador de San Nicolas Granada" },
          { kind: "sight", name: "Don't drive into the Albaicín", blurb: "The historic core is a camera-enforced restricted zone and your nav app will happily route you into a fine.", tags: ["fines", "walk or taxi"], query: "San Cristobal parking Albaicin Granada" },
        ] },
        { title: "Granada eat & drink", icon: "🍷", cards: [
          { kind: "eat", name: "Bodegas Castañeda", blurb: "The one every local names — hanging jamón, barrels, packed standing bar, and free tapas only if you stand at it.", tags: ["★ top pick", "free tapas"], query: "Bodegas Castaneda Granada" },
          { kind: "eat", name: "Bar Los Diamantes", blurb: "Open since 1942 and built on fried fish — order a drink, pescaíto frito lands in front of you.", tags: ["free tapas", "since 1942"], query: "Bar Los Diamantes Granada" },
          { kind: "drink", name: "Taberna La Tana", blurb: "Tiny serious wine bar from Bourdain's Granada episode — skip the menu and let them pour you something local.", tags: ["wine", "calmer"], query: "Taberna La Tana Granada" },
          { kind: "eat", name: "Bar Poë", blurb: "Cult free-tapas stop with a deliberately un-Spanish list: Brazilian and Portuguese plates, beef stews, chicken curry.", tags: ["free tapas", "breaks the pattern"], query: "Bar Poe Granada" },
        ] },
        { title: "Spare hour in Málaga", icon: "🗺️", cards: [
          { kind: "sight", name: "Alcazaba", blurb: "11th-century Moorish hilltop fortress-palace of horseshoe arches and sea views — the best single sight in the city.", tags: ["★ top pick", "~€3.50", "~1 hour"], query: "Alcazaba Malaga" },
          { kind: "sight", name: "Teatro Romano", blurb: "A 1st-century-BC Roman theatre at the fortress's foot — free, two minutes, and closed Mondays so just look from outside.", tags: ["free", "closed Mondays"], query: "Teatro Romano Malaga" },
          { kind: "drink", name: "Antigua Casa de Guardia", blurb: "The city's oldest bar, 1840, standing-only, sweet Málaga wine from the barrel and your tab chalked on the wood.", tags: ["since 1840", "standing only"], query: "Antigua Casa de Guardia Malaga" },
        ] },
      ],
    },

    // ===================================================== TARIFA
    {
      id: "tarifa", flag: "🏄", name: "Tarifa", country: "Spain",
      code: "TAR", dates: "Sep 14–17", nights: 3, accent: "#3f8e76",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "Windswept kitesurf town at the tip of Spain where the Atlantic meets the Med — the base for Tangier and Cádiz. Three continuous nights booked, so the car and the big bags stay put while you cross to Morocco.",
      days: [
        { iso: "2026-09-14", text: "Drive down from Málaga (~2h15), drop bags, Gibraltar optional" },
        { iso: "2026-09-15", text: "Early fast ferry to Tangier — overnight in Morocco" },
        { iso: "2026-09-16", text: "Ferry back in the morning, then Bolonia beach + Baelo Claudia" },
        { iso: "2026-09-17", text: "Drive to Seville via Cádiz, drop the car at Santa Justa" },
      ],
      map: { stops: [
        S("Tarifa old town", "tar_oldtown", "Tarifa Cádiz Spain"),
        S("Castillo de Guzmán el Bueno", "tar_castillo", "Castillo de Guzman el Bueno Tarifa"),
        S("Punta de Tarifa / Isla de las Palomas", "tar_punta", "Isla de las Palomas Tarifa"),
        S("Playa de Los Lances", "tar_loslances", "Playa de Los Lances Tarifa"),
        S("Playa de Bolonia", "tar_bolonia", "Playa de Bolonia Tarifa"),
        S("Baelo Claudia", "tar_baelo", "Baelo Claudia Tarifa"),
        S("Tarifa ferry terminal", "tar_ferry", "Estación Marítima Tarifa"),
        S("Cádiz old town", "cad_oldtown", "Cádiz old town Spain"),
      ] },
      sections: [
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Airbnb — old town (the pick)", blurb: "Book all 3 nights Sept 14–17 so the car and luggage sit tight during Tangier; inside the walls means every bar and the ferry are a walk.", tags: ["★ must", "book early"], url: "https://www.airbnb.com/s/Tarifa--Spain/homes?checkin=2026-09-14&checkout=2026-09-17&adults=3&min_bedrooms=2" },
          { kind: "stay", name: "Hotel Misiana", blurb: "Central boutique with a buzzy cocktail bar downstairs — the night starts under your room and you walk home.", tags: ["old town", "€120–180"], url: "https://www.misiana.com" },
          { kind: "stay", name: "Posada La Sacristía", blurb: "17th-century townhouse with beams, an art-lounge bar and a sauna, 200m from the ferry — perfect for Tuesday's early boat.", tags: ["character", "€130–190"], url: "https://www.lasacristia.net" },
          { kind: "stay", name: "Kook Hotel", blurb: "Fourteen design rooms in the lanes with a rooftop terrace looking straight across at Africa at sunset.", tags: ["rooftop", "€120–170"], url: "https://www.kookhotel.com" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "Punta de Tarifa / Isla de las Palomas", blurb: "Walk the causeway to the southernmost tip of mainland Europe — Atlantic on one side, Med on the other, Africa 14 km off. Do it at sunset.", tags: ["★ must", "free"], url: "https://anywhereweroam.com/things-to-do-in-tarifa-spain/" },
          { kind: "sight", name: "Castillo de Guzmán el Bueno", blurb: "Ramparts of a 960 AD fortress with the best view in town — old town one way, Morocco the other. Forty-five minutes, tops.", tags: ["quick"], url: "https://www.andalucia.com/tarifa/castle-guzman-bueno.htm" },
          { kind: "sight", name: "Playa de Bolonia + Baelo Claudia", blurb: "White sand, a huge climbable dune, and a near-complete Roman town with a garum factory sitting right on the beach. Best use of Wednesday.", tags: ["★ top pick", "20 min drive"], url: "https://www.tripadvisor.com/Attraction_Review-g315918-d1754746-Reviews-Playa_de_Bolonia-Tarifa_Costa_de_la_Luz_Andalucia.html" },
          { kind: "sight", name: "Whale watching with FIRMM", blurb: "Non-profit research trips into the Strait with a biologist aboard and a 95%+ sighting rate — dolphins and pilot whales near-certain, orcas gone by September.", tags: ["2–3 hrs", "€30"], url: "https://www.firmm.org/en/whale-watching" },
          { kind: "sight", name: "Kitesurf lesson at Valdevaqueros", blurb: "Windiest town in Europe, 30+ schools, and a half-day group lesson where all three of you will be spectacularly bad at it.", tags: ["€70–90", "book ahead"], url: "https://alexpastorkiteclub.com/kitesurf-lessons-tarifa/" },
          { kind: "sight", name: "Old town + Puerta de Jerez", blurb: "Cobbled lanes, whitewash and surf shops through the only surviving 13th-century gate — an hour, best in the early evening.", tags: ["free"], url: "https://alisononfoot.com/the-best-things-to-do-in-tarifa/" },
        ] },
        { title: "Eat", icon: "🍽️", cards: [
          { kind: "coffee", name: "Café Azul", blurb: "Non-negotiable breakfast — vintage room, proper Italian coffee, fresh juices and the enormous crepes it's famous for. Go early, it's tiny.", tags: ["★ must", "€8–14"], url: "https://cafeazul-tarifa.com/" },
          { kind: "eat", name: "Mesón El Picoteo", blurb: "What locals name when asked for the best in town: unfussy Andalusian seafood, and the tuna with tartar sauce reviewers won't shut up about.", tags: ["★ top pick", "€25–40"], url: "https://www.tripadvisor.com/Restaurant_Review-g315918-d2351451-Reviews-Meson_el_Picoteo-Tarifa_Costa_de_la_Luz_Andalucia.html" },
          { kind: "eat", name: "Restaurante La Pescadería", blurb: "Shaded tables on the Alameda built around almadraba tuna from the Strait, fried fish and rice dishes. Order the tuna twice.", tags: ["seafood", "€30–45"], url: "https://www.tripadvisor.com/Restaurant_Review-g315918-d1576335-Reviews-Restaurante_La_Pescaderia-Tarifa_Costa_de_la_Luz_Andalucia.html" },
          { kind: "eat", name: "Bar El Francés", blurb: "Tapas by the castle — pigs' cheeks in red wine, spicy bravas, generous and cheap. No reservations, so turn up by 20:30.", tags: ["tapas", "€15–25"], url: "https://www.minube.net/place/el-frances-bar--a749201" },
          { kind: "eat", name: "Chiringuito Tangana", blurb: "Dune-side beach shack between Valdevaqueros and Punta Paloma doing tuna tartare and Asian salads far better than it needs to.", tags: ["beach lunch", "€18–30"], url: "https://www.guiarepsol.com/es/comer/nuestros-favoritos/chiringuitos-tarifa-cadiz/" },
        ] },
        { title: "Drink", icon: "🍻", cards: [
          { kind: "drink", name: "Almedina Café Bar", blurb: "Built into the medieval walls — arched brick ceilings, good wine, and a weekly live flamenco night. Most memorable room in Tarifa.", tags: ["★ top pick", "€5–10"], url: "https://tarifa.costasur.com/sites/almedina/en/index.html" },
          { kind: "drink", name: "Surf Bar Tomatito", blurb: "Where the night starts: loud, young, unpretentious, table football and cheap beers, alive from about 23:00.", tags: ["first stop", "€5–9"], url: "https://theculturetrip.com/europe/spain/articles/the-top-10-bars-in-tarifa-spain" },
          { kind: "drink", name: "Tetería de Tarifa", blurb: "Open-air Moroccan lounge in the old quarter with cocktails at €4 before midnight — the obvious pre-game.", tags: ["€4 pre-midnight"], url: "https://www.andalucia.com/tarifa/nightlife.htm" },
          { kind: "drink", name: "La Ruina", blurb: "The only year-round club inside the walls, built into a ruin, deep house until 04:30 on weekends. You end up here.", tags: ["late", "€8–12"], url: "https://www.andalucia.com/tarifa/nightlife.htm" },
        ] },
        { title: "Day trips", icon: "🚗", cards: [
          { kind: "ferry", name: "Ferry to Tanger Ville", blurb: "One hour across the Strait on Baleària or AML, landing in Tangier city itself — not Tanger Med, 45 km out. ~€82 round trip, foot passengers only.", tags: ["★ must", "€82 return"], url: "https://www.balearia.com/en/routes-timetables/ferry-tarifa-tanger-ville" },
          { kind: "sight", name: "Gibraltar — optional, Mon 9/14", blurb: "The land border was abolished 15 July 2026, fence and all; cable car is shut until 2027, so the ~2h Rock Tour minibus is the way up to the macaques and tunnels.", tags: ["45 min drive", "£30 reserve"], url: "https://gibraltarinfo.gi/nature-reserve/" },
          { kind: "sight", name: "Cádiz — Thu 9/17, en route to Seville", blurb: "Oldest city in Western Europe, salt-worn and ringed by Atlantic. Tarifa→Cádiz→Seville is 2h36 vs 2h26 direct, so it costs about ten minutes — do it while you still have the car.", tags: ["★ confirmed", "+10 min"], url: "https://alisononfoot.com/the-best-things-to-do-in-cadiz/" },
        ] },
      ],
    },

    // ===================================================== TANGIER
    {
      id: "tangier", flag: "🇲🇦", name: "Tangier", country: "Morocco",
      code: "TNG", dates: "Sep 15–16", nights: 1, accent: "#c96a2b",
      currency: "MAD dirham · 10 MAD ≈ $1",
      blurb: "One night in Africa, an hour from Spain. Medina alleys and Kasbah walls by day, mint tea on the cliff at Café Hafa at sunset — the Tangier of Bowles, Burroughs and Matisse, compressed into 24 hours.",
      days: [
        { iso: "2026-09-15", text: "Early fast ferry over — the medina, the kasbah, mint tea at Café Hafa" },
        { iso: "2026-09-16", text: "Morning ferry back to Tarifa" },
      ],
      map: { stops: [
        S("Tangier Medina", "tng_medina", "Tangier Medina"),
        S("Kasbah", "tng_kasbah", "Kasbah Tangier"),
        S("Grand Socco", "tng_grandsocco", "Grand Socco Tangier"),
        S("Cap Spartel", "tng_capspartel", "Cap Spartel Tangier"),
        S("Caves of Hercules", "tng_hercules", "Caves of Hercules Tangier"),
      ] },
      sections: [
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Hotel Nord-Pinus Tanger", blurb: "Five rooms on the highest point of the Kasbah, Roman foundations below and the Strait in front — best fit for three.", tags: ["★ top pick", "book by email"], url: "https://www.nordpinustanger.com/" },
          { kind: "stay", name: "La Tangerina", blurb: "Owner-run ten-room riad at the top of the medina, in-house hammam and a panoramic roof terrace.", tags: ["Kasbah", "riad"], url: "https://latangerina.com/" },
          { kind: "stay", name: "Dar Nour", blurb: "Oldest guest house in Tangier, sea-facing in the Kasbah — take a suite plus a room, or ask for the whole house.", tags: ["Kasbah", "email direct"], url: "https://darnour.com/en/" },
          { kind: "stay", name: "El Minzah Hotel", blurb: "Grand 1930s five-star with pool and hammam — the fallback with real availability if the riads refuse one night.", tags: ["$223/night", "backup"], url: "https://www.expedia.com/Tangier-Hotels-El-Minzah-Hotel.h11214.Hotel-Information" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "The Medina", blurb: "Yellow, pink and green lanes tangling between souks and mosques — just wander, and refuse every guide who offers.", tags: ["★ must", "free"], query: "Medina of Tangier" },
          { kind: "sight", name: "Kasbah + Kasbah Museum", blurb: "Fortified quarter above the souks; the 17th-century Dar el Makhzen inside is a bonus, not a fixture — closing day is disputed and you arrive Tuesday.", tags: ["~20 MAD", "⚠️ check Tue"], query: "Kasbah Museum Tangier" },
          { kind: "sight", name: "Petit Socco", blurb: "The café-ringed square Burroughs and Bowles knew — order mint tea, take an outside table, watch the city pass.", tags: ["★ must", "free to sit"], query: "Petit Socco Tangier" },
          { kind: "sight", name: "Tangier American Legation Museum", blurb: "Oldest US diplomatic property on earth, with a Paul Bowles wing and blessed air conditioning at midday.", tags: ["50 MAD", "Mon–Fri 10–17"], url: "https://www.tripadvisor.com/Attraction_Review-g293737-d481062-Reviews-Tangier_American_Legation_Museum-Tangier_Tanger_Tetouan_Al_Hoceima.html" },
          { kind: "sight", name: "Caves of Hercules → Cap Spartel", blurb: "Sea cave shaped like Africa, then walk 5 km up Robinson Plage to the lighthouse where two seas meet.", tags: ["★ must", "taxi 150–200 MAD"], url: "https://www.mytangier.com/hercules-caves" },
        ] },
        { title: "Eat", icon: "🍽️", cards: [
          { kind: "eat", name: "El Morocco Club", blurb: "Kasbah townhouse doing refined Moroccan upstairs and a piano bar downstairs — eat and drink without leaving the building.", tags: ["★ top pick", "reserve ahead"], url: "https://www.tripadvisor.com/Restaurant_Review-g293737-d3773838-Reviews-El_Morocco_Club-Tangier_Tanger_Tetouan_Al_Hoceima.html" },
          { kind: "eat", name: "Saveur de Poisson", blurb: "No menu, no choice — shared tables and a fixed seafood parade Bourdain filmed. Cash only, no booze.", tags: ["250 MAD fixed", "cash only"], url: "https://www.tripadvisor.com/Restaurant_Review-g293737-d1763129-Reviews-Le_Saveur_du_Poisson-Tangier_Tanger_Tetouan_Al_Hoceima.html" },
          { kind: "eat", name: "Le Nabab", blurb: "Best traditional dinner in the medina — black arched walls, silk hangings, and reportedly the best harira in Morocco.", tags: ["~150 MAD", "medina"], url: "https://www.tripadvisor.com/Restaurant_Review-g293737-d1762912-Reviews-Le_Nabab-Tangier_Tanger_Tetouan_Al_Hoceima.html" },
          { kind: "eat", name: "Darna", blurb: "Women's cooperative near Cinema Rif, one fixed menu a day under a fig tree — best value proper meal in the medina.", tags: ["70 MAD", "lunch"], query: "Darna Association Tangier" },
        ] },
        { title: "Drink & cafés", icon: "🍵", cards: [
          { kind: "coffee", name: "Café Hafa", blurb: "Cliff terraces since 1921, Tarifa visible across the water — the Stones and Bowles sat here. Go at sunset. Tea only.", tags: ["★ must", "dry", "12–15 MAD"], url: "https://en.wikipedia.org/wiki/Caf%C3%A9_Hafa" },
          { kind: "coffee", name: "Café Baba", blurb: "Unreconstructed 1943 Kasbah room, Keith Richards on the wall, heavy kif smoke — thirty minutes, and count your change.", tags: ["dry", "~20 MAD"], url: "https://www.tripadvisor.com/Restaurant_Review-g293737-d4579208-Reviews-Cafe_Baba-Tangier_Tanger_Tetouan_Al_Hoceima.html" },
          { kind: "drink", name: "Nord-Pinus rooftop bar", blurb: "Best-sited drink in the city, on top of the Kasbah over the town lights and the Strait — tiny, so call ahead.", tags: ["alcohol", "from 17:00"], url: "https://www.nordpinustanger.com/bar/" },
          { kind: "drink", name: "Number One", blurb: "Small unpretentious Ville Nouvelle bar where you sit at the counter and conversation finds you — character over polish.", tags: ["alcohol", "local"], url: "https://ozzyhopper.com/foodiestangier/drinks-and-nightlife-in-tangier" },
        ] },
        { title: "Ferry & border", icon: "⛴️", cards: [
          { kind: "ferry", name: "Book Tanger VILLE — not Tanger Med", blurb: "Tarifa lands you in the city, 15 minutes from the medina; Tanger Med is 45 km out and the classic booking mistake.", tags: ["★ must", "~1 hour", "~€82 return"], url: "https://www.balearia.com/en/routes-timetables/ferry-tarifa-tanger-ville" },
          { kind: "ferry", name: "Morocco is 1 hour BEHIND Spain", blurb: "On Sept 15–16 Tangier is UTC+1 — but Morocco goes permanent GMT on 20 Sept, so any later article will wrongly say two.", tags: ["★ must", "verify live clock"], url: "https://www.timeanddate.com/news/time/morocco-abolish-dst.html" },
          { kind: "ferry", name: "Which clock is your return ticket on?", blurb: "Sailings are quoted in the departure port's local time, but no operator states it in writing — ask at the desk, arrive an hour early.", tags: ["build buffer"], url: "https://www.ferryhopper.com/en/ferry-routes/direct/ferry-tarifa-tanger" },
          { kind: "ferry", name: "Passports, forms and the police desk", blurb: "White form out, yellow form back; board and queue at the onboard police desk immediately or lose an hour docked.", tags: ["no visa <90 days", "6 months validity"], url: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Morocco.html" },
          { kind: "ferry", name: "Leave the rental car in Spain", blurb: "Spanish rental agreements prohibit taking the car to Morocco — cross on foot with an overnight bag, which the medina demands anyway.", tags: ["foot passengers"], url: "https://moroccobeautyspots.com/blog/rental-car-spain-to-morocco" },
        ] },
      ],
    },

    // ===================================================== GIBRALTAR + TANGIER
    {
      id: "gibraltar", flag: "🇬🇮", name: "Gibraltar", country: "optional detour",
      code: "GIB", dates: "Sep 14 · optional", nights: 0, accent: "#8a6f4a",
      currency: "£ Gibraltar pound / sterling",
      blurb: "An optional half day off the Málaga → Tarifa drive. The land border was abolished 15 July 2026 — fence down, no routine checks — so the old 30–90 minute queue is gone. The cable car is shut until 2027, so the way up is the ~2h Rock Tour minibus.",
      map: { stops: [
        S("Gibraltar — Upper Rock", "gib_rock", "Upper Rock Nature Reserve Gibraltar"),
        S("St Michael's Cave", "gib_stmichael", "St Michael's Cave Gibraltar"),
        S("Europa Point", "gib_europa", "Europa Point Gibraltar"),
      ] },
      sections: [
        { title: "The Rock", icon: "🦧", cards: [
          { kind: "sight", name: "Upper Rock Nature Reserve", blurb: "One £30 ticket covers the caves, tunnels, Skywalk and the apes — realistically 3–4 hours up top.", tags: ["★ must", "£30"], url: "https://www.naturereserve.gi" },
          { kind: "sight", name: "Rock Tour minibus", blurb: "The way up now that the cable car is shut until 2027 — about two hours, private cars aren't allowed into the reserve.", tags: ["~2 hrs", "book ahead"], url: "https://gibraltarinfo.gi/nature-reserve/" },
          { kind: "sight", name: "Barbary Macaques (Apes' Den)", blurb: "200+ wild monkeys, the only wild primates in Europe — secure bags, sunglasses and food before you get close.", tags: ["apes"], query: "Apes Den Gibraltar" },
          { kind: "sight", name: "St Michael's Cave", blurb: "Dramatic illuminated cavern used as an auditorium, a 20-minute walk down from the top.", tags: ["cave"], query: "St Michael's Cave Gibraltar" },
          { kind: "sight", name: "Skywalk + Europa Point", blurb: "Glass platform out over the eastern face; Europa Point at the southern tip looks straight across to Morocco.", tags: ["views"], query: "Skywalk Gibraltar" },
        ] },
        { title: "Before you go", icon: "⚠️", cards: [
          { kind: "sight", name: "The border is gone — but bring passports", blurb: "The 15 July 2026 treaty removed the land frontier and the queue with it; it is days old, so carry passports and check live conditions.", tags: ["★ new", "15 Jul 2026"], url: "https://www.aljazeera.com/news/2026/7/15/gibraltar-border-controls-lifted-is-it-part-of-schengen-the-uk-or-both" },
          { kind: "sight", name: "Check the rental agreement", blurb: "Some Spanish rental contracts still restrict taking the car into Gibraltar, treaty or not — if so, park in La Línea and walk across.", tags: ["car"], query: "La Línea de la Concepción parking Gibraltar border" },
          { kind: "sight", name: "Gibraltar notes don't spend elsewhere", blurb: "It's sterling, but Gibraltar-issued notes are worthless the moment you leave — spend them or change them before you go.", tags: ["£ cash"], query: "Gibraltar currency" },
        ] },
      ],
    },

    // ===================================================== SEVILLE
    {
      id: "seville", flag: "🇪🇸", name: "Seville", country: "Spain",
      code: "SVQ", dates: "Sep 17–19", nights: 2, accent: "#cf5b27",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "Two nights only, so it's tight — drive in Thursday via Cádiz and drop the car, Córdoba and the Mezquita on Friday, then Saturday morning before the train to Madrid. And you land mid-run of the Bienal de Flamenco, the biggest flamenco festival on earth.",
      map: { stops: [
        S("Real Alcázar", "sev_alcazar", "Real Alcázar de Sevilla"),
        S("Catedral + La Giralda", "sev_cathedral", "Catedral de Sevilla"),
        S("Plaza de España", "sev_plazaespana", "Plaza de España Sevilla"),
        S("Setas de Sevilla", "sev_setas", "Setas de Sevilla"),
        S("Barrio Santa Cruz", "sev_santacruz", "Barrio Santa Cruz Sevilla"),
        S("Triana", "sev_triana", "Triana Sevilla"),
        S("Torre del Oro", "sev_torreoro", "Torre del Oro Sevilla"),
      ] },
      sections: [
        { title: "Book NOW", icon: "⭐", cards: [
          { kind: "sight", name: "Bienal de Flamenco — you're here for it", blurb: "The world's biggest flamenco festival, 9 Sep–3 Oct, 72 shows and 22 world premieres across 11 venues — some staged inside the Real Alcázar. Tickets €12–75.", tags: ["★ critical", "9 Sep–3 Oct"], url: "https://www.labienal.com/programa-general" },
          { kind: "sight", name: "Real Alcázar (Seville)", blurb: "Caps at 750/day and sells out days ahead. With only two nights, book the Saturday first slot before you arrive.", tags: ["★ critical"], url: "https://www.alcazarsevilla.org/en/" },
          { kind: "sight", name: "Cathedral + Giralda", blurb: "Book online to skip the long line.", tags: ["book ahead"], url: "https://www.catedraldesevilla.es/" },
        ] },
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Cathedral Vista, Private Rooftop", blurb: "Santa Cruz 3BR / 3 baths, ★4.97, private rooftop facing the cathedral. The wow pick, a bath each.", tags: ["★ top pick", "~$513/guy"], url: "https://www.airbnb.com/rooms/39041083?check_in=2026-09-15&check_out=2026-09-19&adults=3" },
          { kind: "stay", name: "Ad32, foot of Triana Bridge", blurb: "3BR / 2 baths Superhost ★4.92, where Centro meets Triana — best of both for tapas. Great price.", tags: ["value", "~$345/guy"], url: "https://www.airbnb.com/rooms/16172109?check_in=2026-09-15&check_out=2026-09-19&adults=3" },
          { kind: "stay", name: "Bécquer Hotel (Arenal)", blurb: "Refurbished 4-star, rooftop pool, superb breakfast, ★4.7. Best all-round hotel value.", tags: ["hotel"], url: "https://www.booking.com/searchresults.html?ss=Becquer+Hotel+Sevilla&checkin=2026-09-15&checkout=2026-09-19&group_adults=3&no_rooms=2" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "Real Alcázar", blurb: "Breathtaking Mudéjar royal palace — horseshoe arches, tiled courtyards, peacock gardens (a GoT location).", tags: ["★ must"], query: "Real Alcázar de Sevilla" },
          { kind: "sight", name: "Cathedral + La Giralda", blurb: "Largest Gothic cathedral in the world, holds Columbus's tomb; climb the Giralda by ramp for the best view.", tags: ["★"], query: "Catedral de Sevilla" },
          { kind: "sight", name: "Plaza de España", blurb: "The grandest plaza in Spain — a tiled semicircle (a Star Wars location). Go at golden hour.", tags: ["free", "sunset"], query: "Plaza de España Sevilla" },
          { kind: "sight", name: "Setas de Sevilla", blurb: "Giant wooden 'mushrooms' with a rooftop walkway over the old town. Best at sunset.", tags: ["~€15"], query: "Setas de Sevilla" },
          { kind: "sight", name: "Barrio Santa Cruz + Triana", blurb: "Whitewashed old Jewish quarter, then cross the river to the flamenco-and-ceramics quarter for tapas.", tags: ["wander"], query: "Barrio Santa Cruz Sevilla" },
        ] },
        { title: "Getting in & out", icon: "🚄", cards: [
          { kind: "sight", name: "Córdoba — the Mezquita (Fri 9/18)", blurb: "A forest of red-and-white arches with a cathedral grown from its centre — book the first morning slot.", tags: ["★ big day"], query: "Mezquita-Catedral de Córdoba" },
          { kind: "sight", name: "Take the FAST Córdoba train", blurb: "AVE/Avant/Avlo/Ouigo run 40–45 min, but Media Distancia takes over 1h30 — the cheap headline fare is often the slow one.", tags: ["the trap", "~€7–15"], url: "https://www.renfe.com/es/en" },
          { kind: "sight", name: "Drop the car at Santa Justa", blurb: "Hertz, Sixt and Europcar desks are at the station — do NOT drive into the old town, the restricted zones are camera-enforced.", tags: ["€200 fine", "Thu 9/17"], query: "Sevilla Santa Justa car rental return" },
          { kind: "sight", name: "Train to Madrid (Sat 9/19)", blurb: "~2h30 on AVE/Ouigo/Iryo/Avlo, 20+ a day — go 10:00–12:00 so you get the Madrid afternoon, and book early for €7–15 over €60+.", tags: ["book ahead"], url: "https://www.renfe.com/es/en" },
        ] },
        { title: "Tapeo & flamenco", icon: "🍷", cards: [
          { kind: "eat", name: "Espacio Eslava", blurb: "The city's most-awarded tapas bar — honey-glazed ribs, egg-on-mushroom-cake. Arrive ~8:30pm, no bar bookings.", tags: ["★ tapas"], query: "Espacio Eslava Sevilla" },
          { kind: "eat", name: "El Rinconcillo", blurb: "Founded 1670, the oldest bar in Seville — hanging hams, chalk tabs, espinacas con garbanzos. Come for one round.", tags: ["historic"], query: "El Rinconcillo Sevilla" },
          { kind: "eat", name: "La Brunilda", blurb: "The most-recommended modern tapas spot (Arenal) — creative plates, fair prices. Queue at opening.", tags: ["modern"], query: "La Brunilda Sevilla" },
          { kind: "drink", name: "La Terraza del EME", blurb: "Iconic rooftop face-to-face with the cathedral and Giralda. Sunset cocktails, DJ later.", tags: ["★ rooftop"], query: "La Terraza del EME Sevilla" },
          { kind: "drink", name: "Casa de la Memoria", blurb: "The fallback if the Bienal doesn't line up — intimate ticketed flamenco in a 15th-century courtyard, no amplification. Book a week ahead.", tags: ["flamenco", "backup"], query: "Casa de la Memoria Sevilla" },
          { kind: "drink", name: "La Carbonería", blurb: "Free, casual, beer-in-hand flamenco in a rambling old coal yard — no ticket, no sitting still. More fun than a formal tablao.", tags: ["free", "casual"], query: "La Carbonería Sevilla" },
        ] },
      ],
    },

    // ===================================================== MADRID
    {
      id: "madrid", flag: "🇪🇸", name: "Madrid", country: "Spain",
      code: "MAD", dates: "Sep 19–20", nights: 1, accent: "#b5283b",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "The finale. Roll in Saturday afternoon for one of Europe's great nights out — the Cava Baja tapas crawl, then clubs till 6am. Sunday: El Rastro flea market and churros before flying home.",
      map: { stops: [
        S("Plaza Mayor", "mad_plazamayor", "Plaza Mayor Madrid"),
        S("Puerta del Sol", "mad_sol", "Puerta del Sol Madrid"),
        S("Mercado de San Miguel", "mad_sanmiguel", "Mercado de San Miguel Madrid"),
        S("Royal Palace", "mad_palace", "Royal Palace of Madrid"),
        S("Templo de Debod", "mad_debod", "Templo de Debod Madrid"),
        S("Calle Cava Baja", "mad_cavabaja", "Calle Cava Baja Madrid"),
        S("Gran Vía", "mad_granvia", "Gran Vía Madrid"),
        S("Retiro Park", "mad_retiro", "Retiro Park Madrid"),
      ] },
      sections: [
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Apartment on Gran Vía with views", blurb: "3BR / 2 baths right on Gran Vía — walkable to Malasaña, Chueca, Sol and every club. Two baths to get ready.", tags: ["★ pick", "~$200/guy"], url: "https://www.airbnb.com/rooms/1550807135526130804?check_in=2026-09-19&check_out=2026-09-20&adults=3" },
          { kind: "stay", name: "5BR in Malasaña", blurb: "5 bedrooms in the nightlife heart for an absurd price — everyone gets a room, stumble home from the bars.", tags: ["value", "~$127/guy"], url: "https://www.airbnb.com/rooms/1044050155301313061?check_in=2026-09-19&check_out=2026-09-20&adults=3" },
          { kind: "stay", name: "Posada del Dragón (La Latina)", blurb: "Boutique at the top of Cava Baja — step out into the tapas crawl, 2 min from El Rastro.", tags: ["hotel"], url: "https://posadadeldragon.com" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "Plaza Mayor + Puerta del Sol", blurb: "The grand arcaded square and the literal center of Spain, 5 min apart. The orientation stroll.", tags: ["free"], query: "Plaza Mayor Madrid" },
          { kind: "sight", name: "Templo de Debod at sunset", blurb: "A real ancient Egyptian temple on a hill — the local golden-hour ritual with the best skyline.", tags: ["★ sunset", "free"], query: "Templo de Debod Madrid" },
          { kind: "sight", name: "Royal Palace + Pl. de Oriente", blurb: "Europe's largest royal palace by floor area — stunning from outside even if you skip going in.", tags: ["palace"], query: "Royal Palace of Madrid" },
          { kind: "sight", name: "El Rastro (Sunday)", blurb: "Madrid's massive open-air flea market in La Latina (~9am–3pm), then slide into the bars for Sunday vermouth.", tags: ["★ Sunday"], query: "El Rastro Madrid" },
          { kind: "sight", name: "Mercado de San Miguel", blurb: "Ornate iron-and-glass food market by Plaza Mayor — jamón, croquetas, vermouth. Good landing spot off the train.", tags: ["graze"], query: "Mercado de San Miguel Madrid" },
        ] },
        { title: "Eat — Cava Baja crawl", icon: "🍽️", cards: [
          { kind: "eat", name: "Juana La Loca", blurb: "Pilgrimage-worthy caramelized-onion tortilla de patatas. The single must-hit of the crawl.", tags: ["★ tortilla"], query: "Juana La Loca Madrid" },
          { kind: "eat", name: "Pez Tortilla", blurb: "Loud and packed — best runny tortilla (try ham-truffle-brie) plus craft beer.", tags: ["tortilla + beer"], query: "Pez Tortilla Cava Baja Madrid" },
          { kind: "eat", name: "Taberna Tempranillo", blurb: "Wine-lover's bar with a staggering by-the-glass list and great cheese/charcuterie. Go early.", tags: ["wine"], query: "Taberna Tempranillo Cava Baja Madrid" },
          { kind: "eat", name: "Sobrino de Botín", blurb: "Guinness-certified oldest restaurant in the world (1725) — roast suckling pig from the original oven. Book ahead.", tags: ["sit-down", "iconic"], query: "Sobrino de Botín Madrid" },
        ] },
        { title: "Drink & dance", icon: "🍸", cards: [
          { kind: "drink", name: "Azotea del Círculo de Bellas Artes", blurb: "Madrid's most famous rooftop, 360° over the city. Go at sunset to start the night.", tags: ["★ rooftop"], query: "Azotea Círculo de Bellas Artes Madrid" },
          { kind: "drink", name: "Plaza del Dos de Mayo (Malasaña)", blurb: "The buzzing plaza at the heart of Malasaña — park here and bar-hop the surrounding streets. No dress code.", tags: ["bar-hop"], query: "Plaza del Dos de Mayo Madrid" },
          { kind: "drink", name: "Teatro Kapital", blurb: "The iconic 7-floor mega-club in an old theater, a genre per level. Arrive ~2am. Smart-casual, bring ID.", tags: ["★ club", "till 6am"], query: "Teatro Kapital Madrid" },
          { kind: "drink", name: "Chocolatería San Ginés", blurb: "24-hour churros-con-chocolate since 1894 — the Sunday-morning OR 5am-end-of-night move.", tags: ["churros", "24h"], query: "Chocolatería San Ginés Madrid" },
        ] },
      ],
    },
  ],
};
