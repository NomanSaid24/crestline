(function () {
  var categoryOrder = [
    "Back Packs",
    "Boat and Tote Bags",
    "Drawstring Bags",
    "Duffle",
    "Fashion Bags",
    "Kitchen Accessories",
    "Messenger",
    "Organic Bags",
    "Recycle Bags",
    "Shopper Tote",
    "Utility Tote"
  ];

  var categoryMeta = {
    "Back Packs": {
      type: "backpack",
      summary: "Structured carry solutions for giveaways, travel kits, and employee packs.",
      palettes: [["#29ADE4", "#9DC1FF", "#EAF6FF"], ["#2A6FD6", "#8F88ED", "#F2F5FF"], ["#0E8599", "#7ED7E8", "#EAFBFF"]]
    },
    "Boat and Tote Bags": {
      type: "boat",
      summary: "Large-format tote silhouettes with generous gussets and long handles.",
      palettes: [["#4CA6FF", "#8F88ED", "#F4F7FF"], ["#0F8D7A", "#8FDCC8", "#EFFAF7"], ["#1E5FA8", "#A7C8F4", "#F1F7FF"]]
    },
    "Drawstring Bags": {
      type: "drawstring",
      summary: "Lightweight, campaign-ready drawstring bags for retail and event use.",
      palettes: [["#29ADE4", "#7EE0FF", "#F0FBFF"], ["#2F88D3", "#A2B9FF", "#F4F7FF"], ["#0B7C91", "#7FD7E7", "#EDF9FC"]]
    },
    Duffle: {
      type: "duffle",
      summary: "Soft-structured duffles with storage capacity for sports and travel programs.",
      palettes: [["#1D9CCF", "#9DC1FF", "#EEF7FF"], ["#2355C3", "#8F88ED", "#F4F3FF"], ["#09708C", "#81D2E5", "#EFF9FB"]]
    },
    "Fashion Bags": {
      type: "fashion",
      summary: "Contemporary silhouettes designed for lifestyle gifting and retail presentation.",
      palettes: [["#188AC0", "#9CC8FF", "#F3F7FF"], ["#2D7BD8", "#B0A5FF", "#F7F3FF"], ["#2A8B7A", "#8FD6BA", "#F2FBF7"]]
    },
    "Kitchen Accessories": {
      type: "kitchen",
      summary: "Aprons, mitts, and utility kitchen textiles for household or promotional programs.",
      palettes: [["#B03A67", "#F29AB8", "#FFF4F7"], ["#284FC2", "#A7BEFF", "#F2F5FF"], ["#188A72", "#9ED9C9", "#F2FCF8"]]
    },
    Messenger: {
      type: "messenger",
      summary: "Crossbody and flap messenger bags for commutes, events, and work essentials.",
      palettes: [["#145F9D", "#8DC6FF", "#EEF7FF"], ["#3652B8", "#A8B4FF", "#F2F4FF"], ["#11748B", "#89D3E2", "#EEF9FB"]]
    },
    "Organic Bags": {
      type: "organic",
      summary: "Organic cotton carry bags positioned for eco-conscious campaigns.",
      palettes: [["#2C9F63", "#A7E1BB", "#F2FCF5"], ["#1B7D56", "#88D1A9", "#ECFAF1"], ["#3AA27D", "#ABE0D0", "#F1FCF8"]]
    },
    "Recycle Bags": {
      type: "recycle",
      summary: "Recycled-fabric bags built for sustainability-led brand programs.",
      palettes: [["#0A7C92", "#7AD2E3", "#EEFBFF"], ["#2E8A61", "#90D0B7", "#F1FBF7"], ["#3170CC", "#99C0FF", "#F2F7FF"]]
    },
    "Shopper Tote": {
      type: "shopper",
      summary: "Retail-focused shopper totes made for stores, events, and gifting programs.",
      palettes: [["#2297D3", "#A5D4FF", "#F2F9FF"], ["#2D72BF", "#9DB8FF", "#F2F5FF"], ["#0F8A9B", "#8FD9E4", "#F0FBFC"]]
    },
    "Utility Tote": {
      type: "utility",
      summary: "High-capacity tote styles with added organization and functional detailing.",
      palettes: [["#165CA5", "#90C1FF", "#EEF6FF"], ["#117B9C", "#8AD6E9", "#EFFBFD"], ["#307AC0", "#A1B4FF", "#F4F4FF"]]
    }
  };

  var catalog = {
    "Back Packs": [
      { name: "Campus Carry Backpack", fabric: "12 oz cotton canvas", size: '17"W x 18"H x 5"D', colors: "Natural, Navy, Black", features: "Front zip pocket, padded straps, inside organizer", description: "A classic backpack silhouette for school campaigns, staff welcome kits, and retail-ready branding." },
      { name: "Transit Utility Backpack", fabric: "Poly/cotton shell with cotton lining", size: '16"W x 19"H x 6"D', colors: "Grey, Olive, Black, Custom color", features: "Laptop sleeve, top handle, adjustable straps", description: "Structured for everyday commuting and premium promotional giveaways with elevated storage." },
      { name: "Summit Promo Backpack", fabric: "Heavy-duty cotton twill", size: '15"W x 18"H x 5"D', colors: "Stone, Maroon, Navy", features: "Drawcord top, flap cover, front branding panel", description: "A softer backpack option that works well for seasonal drops, events, and lifestyle merchandise." }
    ],
    "Boat and Tote Bags": [
      { name: "Harbor Boat Tote", fabric: "14 oz cotton canvas", size: '20"W x 14"H x 8"D', colors: "Natural/Navy, Natural/Black", features: "Wide gusset, reinforced handles, base support", description: "A generous carryall developed for retail merchandising, hospitality gifting, and premium programs." },
      { name: "Weekend Boat Carryall", fabric: "Premium cotton duck", size: '21"W x 15"H x 8"D', colors: "Natural, Red, Marine Blue", features: "Long shoulder straps, open top, contrast base", description: "Built for high-capacity use while maintaining a clean promotional presentation." },
      { name: "Classic Marina Tote", fabric: "Poly/cotton blend", size: '19"W x 13"H x 7"D', colors: "Natural/Olive, Natural/Grey", features: "Interior pocket, contrast handles, structured sides", description: "A polished boat tote option tailored for brand activations and lifestyle product collections." }
    ],
    "Drawstring Bags": [
      { name: "Event Drawstring Sack", fabric: "Cotton sheeting", size: '14"W x 18"H', colors: "White, Black, Royal Blue", features: "Double drawcord, lightweight build, front branding area", description: "Simple, effective, and ideal for campaign handouts, conferences, and club merchandise." },
      { name: "Sport Cinch Backpack", fabric: "Cotton twill", size: '15"W x 19"H', colors: "Grey, Navy, Green", features: "Reinforced corners, thicker cords, hanging loop", description: "A sport-forward option designed for giveaways with added durability and stronger structure." },
      { name: "Promo Cord Bag", fabric: "Recycled poly/cotton", size: '14.5"W x 17.5"H', colors: "Natural, Charcoal, Custom color", features: "Flat profile, foldable construction, clean print panel", description: "Made for campaigns that need lightweight storage with efficient packing and branding." }
    ],
    Duffle: [
      { name: "Weekender Duffle", fabric: "12 oz cotton canvas", size: '21"W x 11"H x 10"D', colors: "Black, Navy, Natural", features: "Long carry handles, detachable shoulder strap, zip closure", description: "A versatile duffle for travel promotions, sports programs, and employee gifting." },
      { name: "Transit Zip Duffle", fabric: "Poly/cotton twill", size: '19"W x 10.5"H x 9"D', colors: "Grey, Olive, Navy", features: "End pocket, inner organizer, piping detail", description: "Compact and polished for premium promotions where portability matters." },
      { name: "Expedition Barrel Bag", fabric: "Heavy cotton duck", size: '22"W x 12"H x 12"D', colors: "Stone, Black, Custom color", features: "Barrel body, strong webbing handles, full wrap zipper", description: "Built for larger volume carrying while staying aligned with branded merchandise programs." }
    ],
    "Fashion Bags": [
      { name: "Everyday Fashion Tote", fabric: "Cotton canvas with lining", size: '16"W x 14"H x 5"D', colors: "Natural, Mauve, Black", features: "Top zip, inner pocket, soft shoulder handles", description: "A refined fashion tote styled for boutique retail and elevated promotional gifting." },
      { name: "City Shopper Bag", fabric: "Poly/cotton blend", size: '15"W x 13"H x 4.5"D', colors: "Cream, Sage, Charcoal", features: "Structured body, snap closure, contrast trim", description: "A cleaner profile designed for brands that want a modern retail-inspired look." },
      { name: "Signature Carry Bag", fabric: "Cotton twill", size: '15"W x 12.5"H x 4"D', colors: "Camel, Black, Burgundy", features: "Short handles, optional shoulder strap, front patch area", description: "Built for fashion-forward merchandise ranges with room for embroidery or print applications." }
    ],
    "Kitchen Accessories": [
      { name: "2 Pocket Twill Apron", fabric: "7 oz polyester/cotton twill", size: '34"W x 29"H', colors: "Maroon, Natural, Black, Custom color", features: '2 front pockets 7.25" x 8", neck strap, waist ties', description: "A kitchen program staple suitable for restaurant promotions, culinary retail, and branded collections." },
      { name: "Quilted Oven Mitt Set", fabric: "Cotton outer with insulated fill", size: '7"W x 12"H', colors: "Red, Black, Natural", features: "Hanging loop, quilted stitching, custom print area", description: "A practical promotional kitchen accessory set that balances function and strong branding visibility." },
      { name: "Potholder Pair", fabric: "Cotton drill with insulated layer", size: '8"W x 8"H', colors: "Natural, Navy, Olive", features: "Bound edges, hanging tab, matching pair", description: "Compact kitchen textile made-ups for campaigns, kitchen bundles, and household gift programs." }
    ],
    Messenger: [
      { name: "Metro Messenger Bag", fabric: "Cotton canvas with lining", size: '15"W x 11"H x 4"D', colors: "Black, Slate, Tan", features: "Flap closure, adjustable strap, document sleeve", description: "A streamlined messenger silhouette suited to office giveaways, universities, and brand kits." },
      { name: "Courier Crossbody", fabric: "Poly/cotton twill", size: '14"W x 10"H x 3.5"D', colors: "Navy, Grey, Custom color", features: "Quick-access pocket, flap buckle detail, full strap adjustability", description: "Designed for lightweight daily carry with a clean brand-facing front panel." },
      { name: "Workday Satchel", fabric: "Heavy cotton duck", size: '16"W x 12"H x 4"D', colors: "Natural, Olive, Black", features: "Magnetic flap, interior divider, back slip pocket", description: "A more premium messenger option created for executive gifting and business promotions." }
    ],
    "Organic Bags": [
      { name: "Organic Grocery Tote", fabric: "Certified organic cotton", size: '15"W x 16"H x 4"D', colors: "Natural, Unbleached, Sage", features: "Long handles, bottom gusset, eco message panel", description: "A sustainability-led tote ideal for grocery programs and eco-conscious promotional initiatives." },
      { name: "Organic Market Bag", fabric: "Organic cotton canvas", size: '17"W x 15"H x 5"D', colors: "Natural, Olive, Black", features: "Wide opening, reinforced seams, retail-friendly print area", description: "A robust market-style organic bag for everyday shopping and branded store use." },
      { name: "Organic Produce Carry Bag", fabric: "Organic cotton sheeting", size: '13"W x 15"H', colors: "Natural, Custom dyed", features: "Foldable design, lightweight handles, minimal packaging footprint", description: "A softer organic option created for produce programs, farm shops, and sustainability campaigns." }
    ],
    "Recycle Bags": [
      { name: "Recycled PET Shopper", fabric: "Recycled PET blend", size: '15"W x 15"H x 4"D', colors: "Grey, Blue, Black", features: "Light structure, stitched handles, print-ready face", description: "A smart recycled bag option designed for corporate sustainability programs and retail promotions." },
      { name: "Eco Woven Carry Bag", fabric: "Recycled woven fabric", size: '16"W x 14"H x 5"D', colors: "Charcoal, Olive, Natural", features: "Contrast panels, reinforced base, easy-fold body", description: "Offers a more substantial hand feel while staying aligned with recycled-material positioning." },
      { name: "Recycle Foldable Tote", fabric: "Recycled poly/cotton blend", size: '15"W x 16"H', colors: "Navy, Grey, Custom color", features: "Packable construction, snap tab, wide logo panel", description: "Engineered for compact storage and repeat use in retail and event distribution." }
    ],
    "Shopper Tote": [
      { name: "Wide Gusset Shopper Tote", fabric: "10 oz cotton canvas", size: '18"W x 15"H x 6"D', colors: "Natural, Navy, Black", features: "Wide gusset, shoulder handles, strong bottom support", description: "A dependable shopper tote developed for grocery promotions and high-volume retail use." },
      { name: "Retail Shopper Tote", fabric: "Poly/cotton twill", size: '17"W x 14"H x 5"D', colors: "Grey, Cream, Olive", features: "Open top, contrast piping, inner slip pocket", description: "A retail-focused carry bag with room for oversized branding and day-to-day shopping use." },
      { name: "Market Carry Tote", fabric: "Cotton duck", size: '19"W x 14.5"H x 6"D', colors: "Natural/Black, Natural/Red", features: "Long handles, strong side seams, easy stacking", description: "Created for market activations, store programs, and branded merchandising bundles." }
    ],
    "Utility Tote": [
      { name: "Multi Pocket Utility Tote", fabric: "Heavy cotton canvas", size: '17"W x 13"H x 7"D', colors: "Natural, Navy, Forest", features: "Outer pockets, reinforced base, large central compartment", description: "A functional tote with extra organization for work kits, household storage, and premium gifting." },
      { name: "Heavy Duty Utility Bag", fabric: "Cotton duck with poly/cotton trim", size: '18"W x 14"H x 7"D', colors: "Grey, Black, Natural", features: "Interior divider, webbing handles, structured body", description: "A high-capacity bag designed for harder use cases where shape retention matters." },
      { name: "Organizer Carry Tote", fabric: "Cotton canvas", size: '16"W x 13"H x 6"D', colors: "Sand, Olive, Navy", features: "Multiple patch pockets, zip top, contrast lining", description: "Balances utility storage with cleaner promotional styling for home, office, and campaign programs." }
    ]
  };

  var state = { query: "", category: "All", activeProductId: null, activeImageIndex: 0 };
  var elements = {
    search: document.getElementById("productSearch"),
    select: document.getElementById("productCategorySelect"),
    categoryNav: document.getElementById("productCategoryNav"),
    sections: document.getElementById("productSections"),
    summary: document.getElementById("productsSummary"),
    empty: document.getElementById("productsEmpty"),
    modal: document.getElementById("productModal"),
    modalClose: document.getElementById("productModalClose"),
    modalCategory: document.getElementById("productModalCategory"),
    modalTitle: document.getElementById("productModalTitle"),
    modalDescription: document.getElementById("productModalDescription"),
    modalFabric: document.getElementById("productModalFabric"),
    modalSize: document.getElementById("productModalSize"),
    modalColors: document.getElementById("productModalColors"),
    modalFeatures: document.getElementById("productModalFeatures"),
    modalImage: document.getElementById("productModalImage"),
    modalThumbs: document.getElementById("productModalThumbs"),
    inquiryLink: document.getElementById("productInquiryLink")
  };

  function resolveCategory(value) {
    if (!value) {
      return "All";
    }

    var normalized = String(value).trim().toLowerCase();
    var match = categoryOrder.find(function (category) {
      return category.toLowerCase() === normalized || slugify(category) === slugify(normalized);
    });

    return match || "All";
  }

  function applyInitialStateFromUrl() {
    if (typeof window === "undefined") {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var categoryParam = params.get("category");
    var queryParam = params.get("q");

    state.category = resolveCategory(categoryParam);
    state.query = queryParam ? queryParam.trim() : "";
  }

  function syncUrl() {
    if (typeof window === "undefined" || !window.history || !window.history.replaceState) {
      return;
    }

    var params = new URLSearchParams(window.location.search);

    if (state.category !== "All") {
      params.set("category", state.category);
    } else {
      params.delete("category");
    }

    if (state.query) {
      params.set("q", state.query);
    } else {
      params.delete("q");
    }

    var nextUrl = window.location.pathname;
    if (params.toString()) {
      nextUrl += "?" + params.toString();
    }
    if (window.location.hash) {
      nextUrl += window.location.hash;
    }

    window.history.replaceState({}, "", nextUrl);
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function escapeXml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function toDataUri(svg) {
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function buildShape(type, primary, secondary, line, soft) {
    var tote =
      '<path d="M240 145c0-35 28-63 80-63s80 28 80 63" fill="none" stroke="' + line + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M180 165h280l-26 224c-4 34-33 59-67 59H273c-34 0-63-25-67-59z" fill="#ffffff" stroke="' + line + '" stroke-width="12" stroke-linejoin="round"/>' +
      '<path d="M224 145c0-48 38-84 96-84s96 36 96 84" fill="none" stroke="' + line + '" stroke-width="12" stroke-linecap="round"/>';

    if (type === "backpack") {
      return '<path d="M220 145c0-48 39-82 100-82s100 34 100 82v28H220z" fill="' + soft + '"/>' +
        '<rect x="200" y="120" width="240" height="290" rx="54" fill="#ffffff" stroke="' + line + '" stroke-width="12"/>' +
        '<path d="M250 120c0-24 20-46 70-46s70 22 70 46" fill="none" stroke="' + line + '" stroke-width="12" stroke-linecap="round"/>' +
        '<rect x="255" y="238" width="130" height="92" rx="22" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M235 166c-18 22-28 47-28 76v88" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M405 166c18 22 28 47 28 76v88" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>';
    }

    if (type === "drawstring") {
      return '<path d="M215 126h210l-15 40 25 162c6 42-27 80-69 80H274c-42 0-75-38-69-80l25-162z" fill="#ffffff" stroke="' + line + '" stroke-width="12"/>' +
        '<path d="M228 126c4 22 25 32 46 32h92c21 0 42-10 46-32" fill="' + soft + '" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M245 165l-54 69v150" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M395 165l54 69v150" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>';
    }

    if (type === "duffle") {
      return '<rect x="165" y="206" width="310" height="150" rx="70" fill="#ffffff" stroke="' + line + '" stroke-width="12"/>' +
        '<path d="M242 208v-36c0-26 22-48 48-48h58c26 0 48 22 48 48v36" fill="none" stroke="' + line + '" stroke-width="12" stroke-linecap="round"/>' +
        '<path d="M225 214c-10 40-35 54-60 61v50c24-3 46-12 64-26" fill="' + soft + '" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M415 214c10 40 35 54 60 61v50c-24-3-46-12-64-26" fill="' + soft + '" stroke="' + line + '" stroke-width="10"/>' +
        '<circle cx="320" cy="282" r="17" fill="' + primary + '"/>';
    }

    if (type === "kitchen") {
      return '<path d="M250 94c24 18 116 18 140 0v72c0 18-14 33-33 33h-74c-18 0-33-15-33-33z" fill="#ffffff" stroke="' + line + '" stroke-width="12"/>' +
        '<path d="M244 166l-46 234h244l-46-234" fill="#ffffff" stroke="' + line + '" stroke-width="12" stroke-linejoin="round"/>' +
        '<rect x="282" y="230" width="76" height="84" rx="18" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M246 115c-42 10-68 35-84 78" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M394 115c42 10 68 35 84 78" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>';
    }

    if (type === "messenger") {
      return '<path d="M207 168c12-41 58-80 113-80 53 0 97 25 120 68" fill="none" stroke="' + line + '" stroke-width="12" stroke-linecap="round"/>' +
        '<rect x="175" y="168" width="290" height="190" rx="30" fill="#ffffff" stroke="' + line + '" stroke-width="12"/>' +
        '<path d="M175 220h290l-37-52H212z" fill="' + soft + '" stroke="' + line + '" stroke-width="10" stroke-linejoin="round"/>' +
        '<rect x="278" y="250" width="84" height="62" rx="18" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="10"/>';
    }

    if (type === "fashion") {
      return tote + '<circle cx="320" cy="252" r="18" fill="' + primary + '"/>' + '<path d="M278 316h84" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>';
    }

    if (type === "organic") {
      return tote + '<path d="M320 230c-26 8-42 28-42 51 0 28 22 48 42 57 20-9 42-29 42-57 0-23-16-43-42-51z" fill="' + secondary + '" opacity="0.35" stroke="' + line + '" stroke-width="10"/>' + '<path d="M320 244v72" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>';
    }

    if (type === "recycle") {
      return tote + '<path d="M295 276l28-46 26 18-13 22h33l-30 52" fill="' + secondary + '" opacity="0.3" stroke="' + line + '" stroke-width="10"/>' + '<path d="M284 321l-26-16 14-24h-31l30-52" fill="' + secondary + '" opacity="0.3" stroke="' + line + '" stroke-width="10"/>';
    }

    if (type === "utility") {
      return tote + '<rect x="235" y="236" width="58" height="72" rx="16" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="10"/>' + '<rect x="347" y="236" width="58" height="72" rx="16" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="10"/>';
    }

    if (type === "boat" || type === "shopper") {
      return tote + '<path d="M206 212h228" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>';
    }

    return tote;
  }

  function buildProductImage(product, variantIndex) {
    var meta = categoryMeta[product.category];
    var palette = meta.palettes[variantIndex % meta.palettes.length];
    var primary = palette[0];
    var secondary = palette[1];
    var soft = palette[2];
    var line = "#21496d";
    var label = escapeXml(product.name.split(" ").slice(0, 2).join(" "));
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="520" viewBox="0 0 640 520">' +
      '<defs><linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="' + soft + '"/></linearGradient></defs>' +
      '<rect width="640" height="520" rx="48" fill="url(#panel)"/>' +
      '<circle cx="125" cy="115" r="84" fill="' + soft + '" opacity="0.75"/>' +
      '<circle cx="542" cy="402" r="88" fill="' + secondary + '" opacity="0.14"/>' +
      '<rect x="36" y="34" width="220" height="42" rx="21" fill="#ffffff" opacity="0.9"/>' +
      '<text x="58" y="60" font-family="Arial, sans-serif" font-size="19" fill="' + line + '">' + escapeXml(product.category) + '</text>' +
      buildShape(meta.type, primary, secondary, line, soft) +
      '<rect x="170" y="430" width="300" height="48" rx="24" fill="#ffffff" opacity="0.95"/>' +
      '<text x="320" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="' + line + '">' + label + "</text>" +
      "</svg>";

    return toDataUri(svg);
  }

  var allProducts = [];
  var productsById = {};

  categoryOrder.forEach(function (category) {
    catalog[category].forEach(function (product) {
      var item = Object.assign({}, product, {
        id: slugify(category + "-" + product.name),
        category: category
      });
      item.images = [buildProductImage(item, 0), buildProductImage(item, 1), buildProductImage(item, 2)];
      allProducts.push(item);
      productsById[item.id] = item;
    });
  });

  function buildSelectOptions() {
    elements.select.innerHTML = ['<option value="All">All Categories</option>']
      .concat(categoryOrder.map(function (category) { return '<option value="' + category + '">' + category + "</option>"; }))
      .join("");
  }

  function getFilteredProducts() {
    var query = state.query.toLowerCase();
    return allProducts.filter(function (product) {
      var matchesCategory = state.category === "All" || product.category === state.category;
      var haystack = [product.category, product.name, product.fabric, product.features, product.description, product.colors].join(" ").toLowerCase();
      return matchesCategory && (!query || haystack.indexOf(query) !== -1);
    });
  }

  function groupProducts(products) {
    return categoryOrder
      .map(function (category) {
        return {
          category: category,
          products: products.filter(function (product) { return product.category === category; })
        };
      })
      .filter(function (section) { return section.products.length > 0; });
  }

  function buildCategoryNav(products) {
    var grouped = groupProducts(products);
    var counts = {};
    grouped.forEach(function (section) { counts[section.category] = section.products.length; });
    elements.categoryNav.innerHTML = ['<button type="button" class="' + (state.category === "All" ? "active" : "") + '" data-category="All">All Categories</button>']
      .concat(categoryOrder.filter(function (category) { return counts[category] || !state.query || state.category === category; }).map(function (category) {
        return '<button type="button" class="' + (state.category === category ? "active" : "") + '" data-category="' + category + '">' + category + (counts[category] ? " (" + counts[category] + ")" : "") + "</button>";
      })).join("");

    Array.prototype.forEach.call(elements.categoryNav.querySelectorAll("button"), function (button) {
      button.addEventListener("click", function () {
        state.category = button.getAttribute("data-category");
        elements.select.value = state.category;
        render();
      });
    });
  }

  function renderSummary(products) {
    elements.summary.textContent = products.length + " products across " + groupProducts(products).length + " categories";
  }

  function renderSections(products) {
    var grouped = groupProducts(products);
    if (!grouped.length) {
      elements.sections.innerHTML = "";
      elements.empty.hidden = false;
      return;
    }

    elements.empty.hidden = true;
    elements.sections.innerHTML = grouped.map(function (section) {
      return '<section class="product-category-section" id="' + slugify(section.category) + '">' +
        '<div class="product-category-head"><div><h3>' + section.category + '</h3><p>' + categoryMeta[section.category].summary + '</p></div><span class="product-count-chip">' + section.products.length + " products</span></div>" +
        '<div class="products-grid">' +
        section.products.map(function (product) {
          return '<button type="button" class="product-card" data-product-id="' + product.id + '">' +
            '<div class="product-card-visual"><img src="' + product.images[0] + '" alt="' + product.name + '"></div>' +
            '<span class="product-card-category">' + product.category + "</span>" +
            "<h4>" + product.name + "</h4>" +
            "<p>" + product.description + "</p>" +
            '<ul class="product-card-meta"><li><strong>Fabric:</strong> <span>' + product.fabric + '</span></li><li><strong>Size:</strong> <span>' + product.size + "</span></li></ul>" +
            '<div class="product-card-action"><span>View Product</span><span>&rarr;</span></div>' +
          "</button>";
        }).join("") +
        "</div></section>";
    }).join("");

    Array.prototype.forEach.call(elements.sections.querySelectorAll(".product-card"), function (button) {
      button.addEventListener("click", function () {
        openModal(button.getAttribute("data-product-id"));
      });
    });
  }

  function setModalImage(product, imageIndex) {
    state.activeImageIndex = imageIndex;
    elements.modalImage.src = product.images[imageIndex];
    elements.modalImage.alt = product.name;
    elements.modalThumbs.innerHTML = product.images.map(function (image, index) {
      return '<button type="button" class="product-thumb' + (index === imageIndex ? " active" : "") + '" data-image-index="' + index + '"><img src="' + image + '" alt="' + product.name + ' preview ' + (index + 1) + '"></button>';
    }).join("");

    Array.prototype.forEach.call(elements.modalThumbs.querySelectorAll(".product-thumb"), function (thumb) {
      thumb.addEventListener("click", function () {
        setModalImage(product, Number(thumb.getAttribute("data-image-index")));
      });
    });
  }

  function openModal(productId) {
    var product = productsById[productId];
    if (!product) {
      return;
    }

    state.activeProductId = productId;
    elements.modalCategory.textContent = product.category;
    elements.modalTitle.textContent = product.name;
    elements.modalDescription.textContent = product.description;
    elements.modalFabric.textContent = product.fabric;
    elements.modalSize.textContent = product.size;
    elements.modalColors.textContent = product.colors;
    elements.modalFeatures.textContent = product.features;
    elements.inquiryLink.href = "/contact-us";
    setModalImage(product, 0);
    elements.modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    elements.modal.hidden = true;
    document.body.style.overflow = "";
  }

  function render() {
    var products = getFilteredProducts();
    renderSummary(products);
    buildCategoryNav(products);
    renderSections(products);
    syncUrl();
  }

  applyInitialStateFromUrl();
  buildSelectOptions();
  elements.search.value = state.query;
  elements.select.value = state.category;
  render();

  elements.search.addEventListener("input", function () {
    state.query = elements.search.value.trim();
    render();
  });

  elements.select.addEventListener("change", function () {
    state.category = elements.select.value;
    render();
  });

  elements.modalClose.addEventListener("click", closeModal);
  elements.modal.addEventListener("click", function (event) {
    if (event.target === elements.modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !elements.modal.hidden) {
      closeModal();
    }
  });
})();
