// ============================================================
//  Boys Euro Trip — all content. coords.js must load first.
//  S(name, key, q) builds a map stop from window.COORDS[key].
// ============================================================

function S(name, key, q) {
  var c = (window.COORDS || {})[key] || { lat: 0, lng: 0 };
  return { name: name, lat: c.lat, lng: c.lng, q: q || name };
}

window.TRIP = {
  title: "BOYS EURO TRIP",
  subtitle: "Scandinavia → Southern Spain",
  dateRange: "Sep 4 – 20, 2026",
  summary:
    "Three guys, seventeen days, seven cities and two day-trips across two continents. " +
    "Saunas and design up north, then tapas, flamenco and big nights down south.",
  notionUrl: "https://app.notion.com/p/38c8319b49c180fda446eb82e341333c",

  // Boarding passes — the inter-city legs.
  // status: "booked" (✓), "todo" (needs booking), "plan" (to arrange)
  legs: [
    { date: "Sep 4", from: "NYC", to: "HEL", fromName: "New York", toName: "Helsinki", mode: "flight", status: "booked", note: "Red-eye out" },
    { date: "Sep 8", from: "HEL", to: "STO", fromName: "Helsinki", toName: "Stockholm", mode: "ferry", status: "todo", note: "Overnight Baltic cruise — still to book" },
    { date: "Sep 11", from: "STO", to: "CPH", fromName: "Stockholm", toName: "Copenhagen", mode: "train", status: "plan", note: "Morning train" },
    { date: "Sep 12", from: "CPH", to: "AGP", fromName: "Copenhagen", toName: "Málaga", mode: "flight", status: "booked", note: "Night flight south" },
    { date: "Sep 13", from: "AGP", to: "TAR", fromName: "Málaga", toName: "Tarifa", mode: "drive", status: "plan", note: "Rental car, via Gibraltar" },
    { date: "Sep 15", from: "TAR", to: "SVQ", fromName: "Tarifa", toName: "Seville", mode: "drive", status: "plan", note: "Drive to Andalusia base" },
    { date: "Sep 19", from: "SVQ", to: "MAD", fromName: "Seville", toName: "Madrid", mode: "train", status: "plan", note: "AVE high-speed, ~2.5h" },
    { date: "Sep 20", from: "MAD", to: "NYC", fromName: "Madrid", toName: "New York", mode: "flight", status: "booked", note: "Fly home" },
  ],

  // Day-by-day overview (shown on the home page).
  timeline: [
    { date: "Fri 9/4", text: "Fly to Helsinki (red-eye)", city: "helsinki" },
    { date: "Sat 9/5", text: "Helsinki — arrive & sightsee", city: "helsinki" },
    { date: "Sun 9/6", text: "Helsinki — full day", city: "helsinki" },
    { date: "Mon 9/7", text: "Tallinn day trip (optional)", city: "helsinki" },
    { date: "Tue 9/8", text: "Overnight ferry → Stockholm", city: "stockholm" },
    { date: "Wed 9/9", text: "Stockholm", city: "stockholm" },
    { date: "Thu 9/10", text: "Stockholm", city: "stockholm" },
    { date: "Fri 9/11", text: "Train → Copenhagen, big night", city: "copenhagen" },
    { date: "Sat 9/12", text: "Copenhagen day → night flight", city: "copenhagen" },
    { date: "Sun 9/13", text: "Málaga AM → Gibraltar → Tarifa", city: "malaga" },
    { date: "Mon 9/14", text: "Tangier day trip", city: "gibraltar" },
    { date: "Tue 9/15", text: "Drive → Seville", city: "seville" },
    { date: "Wed 9/16", text: "Seville — full day", city: "seville" },
    { date: "Thu 9/17", text: "Granada day trip (Alhambra)", city: "seville" },
    { date: "Fri 9/18", text: "Córdoba day trip (Mezquita)", city: "seville" },
    { date: "Sat 9/19", text: "Train → Madrid, last big night", city: "madrid" },
    { date: "Sun 9/20", text: "El Rastro, churros → fly home", city: "madrid" },
  ],

  cities: [
    // ===================================================== HELSINKI
    {
      id: "helsinki", flag: "🇫🇮", name: "Helsinki", country: "Finland",
      code: "HEL", dates: "Sep 5–7", nights: 3, accent: "#2e6f95",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "Off the red-eye into sauna country — waterfront design, a church carved from bedrock, and Baltic saunas before the overnight ferry to Stockholm.",
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
          { kind: "stay", name: "Townhouse w/ Private Sauna (Kamppi)", blurb: "3BR, 3 kings, 2.5 baths, dead-center with its own sauna. The comfortable pick.", tags: ["★ top pick", "sauna", "~$467/nt"], url: "https://www.airbnb.com/rooms/610659813174018066?check_in=2026-09-05&check_out=2026-09-08&adults=3" },
          { kind: "stay", name: "City Centre Design Apt + Balcony", blurb: "4BR in Kruununhaka, ★4.98. Best-value central 4BR (only 1 bath).", tags: ["best value", "~$335/nt"], url: "https://www.airbnb.com/rooms/30609237?check_in=2026-09-05&check_out=2026-09-08&adults=3" },
          { kind: "stay", name: "Designer 4BR + Sauna (Kamppi)", blurb: "True 4BR, everyone gets a room, private sauna. Guest Favorite.", tags: ["4BR", "sauna", "~$594/nt"], url: "https://www.airbnb.com/rooms/52359037?check_in=2026-09-05&check_out=2026-09-08&adults=3" },
          { kind: "stay", name: "Hotel U14 (Autograph)", blurb: "Boutique by the waterfront, voted #1 hotel breakfast in Helsinki.", tags: ["hotel", "~$150–200/nt"], url: "https://hotelu14.fi/" },
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

    // ===================================================== STOCKHOLM
    {
      id: "stockholm", flag: "🇸🇪", name: "Stockholm", country: "Sweden",
      code: "STO", dates: "Sep 9–11", nights: 2, accent: "#d4a13a",
      currency: "kr (SEK) · kr10 ≈ $1",
      blurb: "Arrive on the overnight ferry. Old-town alleys, a raised 17th-century warship, clifftop sunsets and a floating sauna on the lake.",
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
          { kind: "eat", name: "AG", blurb: "The boys-trip steakhouse — in-house dry-aging room, 'best ribeye in the country,' legendary burger.", tags: ["★ dinner", "steak"], url: "https://www.restaurangag.se/" },
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
      code: "CPH", dates: "Sep 11–12", nights: 1, accent: "#c8453b",
      currency: "kr (DKK) · kr10 ≈ $1.50",
      blurb: "One Friday night, one Saturday day. Go hard in the Meatpacking District (open till 5am Fri/Sat), then the harbour-and-canals loop before the night flight to Málaga.",
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
          { kind: "eat", name: "WarPigs", blurb: "Texas BBQ + craft beer (Mikkeller/3 Floyds) on communal tables. Max boys-trip energy, lines the stomach.", tags: ["pre-night"], query: "WarPigs Copenhagen" },
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
      id: "malaga", flag: "🇪🇸", name: "Málaga", country: "Spain",
      code: "AGP", dates: "Sep 13", nights: 1, accent: "#e08a2b",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "Night flight in, late tapas and a rooftop. Sunday: a compact old-town loop — Moorish Alcazaba, Roman theatre, Picasso — then grab the rental car west toward Gibraltar.",
      map: { stops: [
        S("Alcazaba", "mal_alcazaba", "Alcazaba Málaga"),
        S("Teatro Romano", "mal_teatro", "Teatro Romano Málaga"),
        S("Castillo de Gibralfaro", "mal_gibralfaro", "Castillo de Gibralfaro Málaga"),
        S("Museo Picasso", "mal_picasso", "Museo Picasso Málaga"),
        S("Málaga Cathedral", "mal_cathedral", "Catedral de Málaga"),
        S("Calle Larios", "mal_larios", "Calle Marqués de Larios Málaga"),
        S("Muelle Uno", "mal_muelle", "Muelle Uno Málaga"),
      ] },
      sections: [
        { title: "Stay", icon: "🏨", cards: [
          { kind: "stay", name: "Hotel Catalonia Molina Lario", blurb: "Reliable 4-star steps from the cathedral, rooftop pool + bar, books triple rooms. Best no-fuss central pick.", tags: ["★ pick", "hotel"], url: "https://www.booking.com/searchresults.html?ss=Catalonia+Molina+Lario+Malaga&checkin=2026-09-12&checkout=2026-09-13&group_adults=3&no_rooms=1" },
          { kind: "stay", name: "Only YOU Hotel Málaga", blurb: "Design-forward, buzzy rooftop bar with sea views, 10 min to the old town. Trendiest base.", tags: ["rooftop"], url: "https://www.booking.com/searchresults.html?ss=Only+YOU+Hotel+Malaga&checkin=2026-09-12&checkout=2026-09-13&group_adults=3&no_rooms=1" },
          { kind: "stay", name: "Duplex in the center + parking", blurb: "3BR Guest Favorite ★4.94 with private parking (handy with the rental). Cheapest central pick.", tags: ["airbnb", "~$84/guy"], url: "https://www.airbnb.com/rooms/1319468407938939717?check_in=2026-09-12&check_out=2026-09-13&adults=3" },
        ] },
        { title: "Do", icon: "🗺️", cards: [
          { kind: "sight", name: "Alcazaba", blurb: "Superb 11th-century Moorish hilltop fortress-palace — arches, courtyards, sea views. The signature sight (free Sun from 2pm).", tags: ["★ must", "~€3.50"], query: "Alcazaba Málaga" },
          { kind: "sight", name: "Castillo de Gibralfaro", blurb: "Hilltop castle above the Alcazaba, best panorama in Málaga. Steep 20-min walk up.", tags: ["views"], query: "Castillo de Gibralfaro Málaga" },
          { kind: "sight", name: "Teatro Romano", blurb: "1st-century-BC Roman theatre at the foot of the Alcazaba — the city's oldest monument. Free.", tags: ["free"], query: "Teatro Romano Málaga" },
          { kind: "sight", name: "Museo Picasso Málaga", blurb: "The serious Picasso collection in a Renaissance palace. Open Sunday mornings.", tags: ["~€12"], query: "Museo Picasso Málaga" },
          { kind: "sight", name: "Cathedral 'La Manquita'", blurb: "Grand Renaissance-Baroque cathedral, famously one-armed. Sunday interior is afternoon-only.", tags: ["facade"], query: "Catedral de Málaga" },
        ] },
        { title: "Eat & Drink", icon: "🍷", cards: [
          { kind: "eat", name: "Casa Aranda", blurb: "Churros institution since 1932 down an alley off Calle Larios. The classic Sunday morning move.", tags: ["breakfast", "churros"], query: "Casa Aranda Málaga" },
          { kind: "drink", name: "Bar La Tranca", blurb: "Rowdy, beloved local vermut bar — frozen beers, cheap tapas, open till 1am. The safe late bet.", tags: ["★ tapas/vermut"], query: "Bar La Tranca Málaga" },
          { kind: "drink", name: "Bodega El Pimpi", blurb: "Málaga's most famous bodega — tiled rooms, wine barrels, terrace facing the Alcazaba.", tags: ["wine", "setting"], query: "El Pimpi Málaga" },
          { kind: "drink", name: "La Terraza de la Alcazaba", blurb: "Rooftop cocktails facing the floodlit fortress, open till 3am Sat. The late-arrival move.", tags: ["rooftop", "till 3am"], query: "La Terraza de la Alcazaba Málaga" },
        ] },
      ],
    },

    // ===================================================== GIBRALTAR + TANGIER
    {
      id: "gibraltar", flag: "🇬🇮", name: "Gibraltar & Tangier", country: "Tarifa base",
      code: "TAR", dates: "Sep 13–15", nights: 2, accent: "#3f8e76",
      currency: "£ Gibraltar · € Tarifa · MAD Tangier",
      blurb: "Base in windswept Tarifa. Half a day on the Rock (apes, caves, two continents in view), then a one-hour fast ferry to Tangier for a full day in the medina.",
      map: { stops: [
        S("Tarifa old town", "tar_oldtown", "Tarifa Cádiz Spain"),
        S("Tarifa ferry terminal", "tar_ferry", "Estación Marítima Tarifa"),
        S("Gibraltar — Upper Rock", "gib_rock", "Upper Rock Nature Reserve Gibraltar"),
        S("St Michael's Cave", "gib_stmichael", "St Michael's Cave Gibraltar"),
        S("Europa Point", "gib_europa", "Europa Point Gibraltar"),
        S("Tangier Medina", "tng_medina", "Tangier Medina"),
        S("Tangier Kasbah", "tng_kasbah", "Kasbah Tangier"),
        S("Cap Spartel", "tng_capspartel", "Cap Spartel Tangier"),
        S("Caves of Hercules", "tng_hercules", "Caves of Hercules Tangier"),
      ] },
      sections: [
        { title: "Stay (Tarifa)", icon: "🏨", cards: [
          { kind: "stay", name: "Viento del Sur", blurb: "3BR Guest Favorite ★4.91 — best value-meets-rating in the old town. 2 nights.", tags: ["★ pick", "~$118/guy"], url: "https://www.airbnb.com/rooms/621319416058275166?check_in=2026-09-13&check_out=2026-09-15&adults=3" },
          { kind: "stay", name: "Casa Teté (4BR + parking)", blurb: "4BR / 8 beds, everyone gets a room, free parking for the rental. The space pick.", tags: ["4BR", "~$250/guy"], url: "https://www.airbnb.com/rooms/573301384411273327?check_in=2026-09-13&check_out=2026-09-15&adults=3" },
          { kind: "stay", name: "Hotel Misiana", blurb: "Central boutique in the old town with a buzzy ground-floor cocktail bar. Middle of the action.", tags: ["hotel"], url: "https://www.misiana.com" },
        ] },
        { title: "Gibraltar — the Rock", icon: "🦧", cards: [
          { kind: "sight", name: "Upper Rock Nature Reserve", blurb: "Cable car or minibus up; one £30 ticket covers the caves, tunnels, Skywalk and apes. Bring passports for the land border.", tags: ["★", "half day"], url: "https://www.naturereserve.gi" },
          { kind: "sight", name: "Barbary Macaques (Apes' Den)", blurb: "200+ wild monkeys — the only wild primates in Europe. Secure bags, sunglasses and food.", tags: ["apes"], query: "Apes Den Gibraltar" },
          { kind: "sight", name: "St Michael's Cave", blurb: "Dramatic illuminated cavern used as an auditorium, a 20-min walk down from the top.", tags: ["cave"], query: "St Michael's Cave Gibraltar" },
          { kind: "sight", name: "Skywalk + Europa Point", blurb: "Glass platform over the eastern face; Europa Point at the southern tip sees across to Morocco.", tags: ["views"], query: "Skywalk Gibraltar" },
        ] },
        { title: "Tangier — day trip", icon: "🇲🇦", cards: [
          { kind: "ferry", name: "Tarifa → Tangier fast ferry", blurb: "~1 hour to Tangier Ville port, ~10 crossings/day, from ~€40 each way. Catch the ~9am out, late-afternoon back. Passport stamped onboard.", tags: ["★ book ahead"], url: "https://www.balearia.com/en/routes-timetables/ferry-tarifa-tanger-ville" },
          { kind: "sight", name: "The Medina + Kasbah", blurb: "Walled old town of tangled lanes and tea houses; the hilltop Kasbah has the best views and the museum.", tags: ["★ medina"], query: "Tangier Medina" },
          { kind: "sight", name: "Cap Spartel + Caves of Hercules", blurb: "Northwest tip of Africa where the Atlantic meets the Med; the sea cave's opening is shaped like the map of Africa.", tags: ["~25 min west"], query: "Cap Spartel Tangier" },
          { kind: "sight", name: "Café Hafa", blurb: "Clifftop terraces pouring mint tea since 1921 (the Stones and Hendrix drank here). The classic Tangier view.", tags: ["mint tea"], query: "Café Hafa Tangier" },
        ] },
        { title: "Tarifa food", icon: "🍽️", cards: [
          { kind: "eat", name: "El Lola", blurb: "Lively old-town tapas with flamenco soul — the fun group dinner.", tags: ["tapas"], query: "El Lola Tarifa" },
          { kind: "eat", name: "Mandrágora", blurb: "Andalusian-Moroccan cooking, intimate and well-rated — an on-theme bridge to Tangier.", tags: ["dinner"], query: "Mandrágora Tarifa" },
        ] },
      ],
    },

    // ===================================================== SEVILLE
    {
      id: "seville", flag: "🇪🇸", name: "Seville", country: "Spain",
      code: "SVQ", dates: "Sep 15–19", nights: 4, accent: "#cf5b27",
      currency: "€ euro · €1 ≈ $1.14",
      blurb: "The Andalusia home base for four nights — the best tapas city in Spain, a jaw-dropping Mudéjar palace, flamenco in its birthplace, and day trips to the Alhambra and the Mezquita.",
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
          { kind: "sight", name: "Alhambra — Nasrid Palaces (Granada)", blurb: "The single most important booking of the trip. Timed entry, sells out weeks ahead. Pick an early-afternoon slot.", tags: ["★ critical", "day trip 9/17"], url: "https://tickets.alhambra-patronato.es/en/" },
          { kind: "sight", name: "Real Alcázar (Seville)", blurb: "Caps at 750/day and sells out days ahead. Book before you arrive.", tags: ["book ahead"], url: "https://www.alcazarsevilla.org/en/" },
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
        { title: "Day trips", icon: "🚄", cards: [
          { kind: "sight", name: "Granada — the Alhambra (9/17)", blurb: "~2.5h each way by AVANT/AVE or a guided tour. The Nasrid Palaces, Generalife gardens and the Albaicín view. Bring your passport.", tags: ["★ big day"], query: "Alhambra Granada" },
          { kind: "sight", name: "Córdoba — the Mezquita (9/18)", blurb: "Effortless ~45-min AVE. A forest of red-and-white arches with a cathedral grown from its center. Book the first morning slot.", tags: ["easy + epic"], query: "Mezquita-Catedral de Córdoba" },
        ] },
        { title: "Tapeo & flamenco", icon: "🍷", cards: [
          { kind: "eat", name: "Espacio Eslava", blurb: "The city's most-awarded tapas bar — honey-glazed ribs, egg-on-mushroom-cake. Arrive ~8:30pm, no bar bookings.", tags: ["★ tapas"], query: "Espacio Eslava Sevilla" },
          { kind: "eat", name: "El Rinconcillo", blurb: "Founded 1670, the oldest bar in Seville — hanging hams, chalk tabs, espinacas con garbanzos. Come for one round.", tags: ["historic"], query: "El Rinconcillo Sevilla" },
          { kind: "eat", name: "La Brunilda", blurb: "The most-recommended modern tapas spot (Arenal) — creative plates, fair prices. Queue at opening.", tags: ["modern"], query: "La Brunilda Sevilla" },
          { kind: "drink", name: "La Terraza del EME", blurb: "Iconic rooftop face-to-face with the cathedral and Giralda. Sunset cocktails, DJ later.", tags: ["★ rooftop"], query: "La Terraza del EME Sevilla" },
          { kind: "drink", name: "Casa de la Memoria", blurb: "The best intimate ticketed flamenco — a 15th-century courtyard, raw and emotional. Book a week ahead.", tags: ["flamenco"], query: "Casa de la Memoria Sevilla" },
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
