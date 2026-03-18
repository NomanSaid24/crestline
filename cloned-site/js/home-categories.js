(function () {
  var categories = [
    {
      name: "Back Packs",
      type: "backpack",
      summary: "Structured bags for employee kits, campus campaigns, and branded travel packs.",
      palette: ["#29ADE4", "#9DC1FF", "#EAF6FF"]
    },
    {
      name: "Boat and Tote Bags",
      type: "boat",
      summary: "Large-format totes with generous gussets for retail, events, and hospitality gifting.",
      palette: ["#2A6FD6", "#8F88ED", "#F2F5FF"]
    },
    {
      name: "Drawstring Bags",
      type: "drawstring",
      summary: "Lightweight promotional bags for conferences, clubs, and event distribution.",
      palette: ["#0E8599", "#7ED7E8", "#EAFBFF"]
    },
    {
      name: "Duffle",
      type: "duffle",
      summary: "Soft-structured duffles designed for sports programs, travel, and premium gifting.",
      palette: ["#2355C3", "#8F88ED", "#F4F3FF"]
    },
    {
      name: "Fashion Bags",
      type: "fashion",
      summary: "Lifestyle silhouettes for boutique retail, branded drops, and elevated merchandise.",
      palette: ["#188AC0", "#9CC8FF", "#F3F7FF"]
    },
    {
      name: "Kitchen Accessories",
      type: "kitchen",
      summary: "Aprons, mitts, and kitchen textile accessories built for utility and branding.",
      palette: ["#B03A67", "#F29AB8", "#FFF4F7"]
    },
    {
      name: "Messenger",
      type: "messenger",
      summary: "Crossbody and flap bags for work essentials, daily carry, and event programs.",
      palette: ["#145F9D", "#8DC6FF", "#EEF7FF"]
    },
    {
      name: "Organic Bags",
      type: "organic",
      summary: "Organic cotton carry solutions positioned for eco-conscious brand campaigns.",
      palette: ["#2C9F63", "#A7E1BB", "#F2FCF5"]
    },
    {
      name: "Recycle Bags",
      type: "recycle",
      summary: "Recycled-fabric bag options developed for sustainability-led marketing programs.",
      palette: ["#0A7C92", "#7AD2E3", "#EEFBFF"]
    },
    {
      name: "Shopper Tote",
      type: "shopper",
      summary: "Retail-ready shopper totes for stores, activations, and merchandising bundles.",
      palette: ["#2297D3", "#A5D4FF", "#F2F9FF"]
    },
    {
      name: "Utility Tote",
      type: "utility",
      summary: "High-capacity totes with added organization for work kits and functional everyday use.",
      palette: ["#165CA5", "#90C1FF", "#EEF6FF"]
    }
  ];

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
      '<path d="M180 106c0-30 24-54 69-54s69 24 69 54" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M128 124h242l-22 190c-3 29-28 51-58 51H208c-30 0-55-22-58-51z" fill="#ffffff" stroke="' + line + '" stroke-width="10" stroke-linejoin="round"/>' +
      '<path d="M164 106c0-41 32-72 85-72s85 31 85 72" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>';

    if (type === "backpack") {
      return '<path d="M158 124c0-40 33-68 91-68s91 28 91 68v24H158z" fill="' + soft + '"/>' +
        '<rect x="142" y="100" width="214" height="248" rx="48" fill="#ffffff" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M185 100c0-21 18-39 64-39s64 18 64 39" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>' +
        '<rect x="192" y="200" width="114" height="80" rx="18" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="8"/>';
    }

    if (type === "drawstring") {
      return '<path d="M155 106h188l-13 34 23 136c5 36-23 68-59 68H204c-36 0-64-32-59-68l23-136z" fill="#ffffff" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M168 106c3 18 22 27 42 27h80c20 0 39-9 42-27" fill="' + soft + '" stroke="' + line + '" stroke-width="8"/>' +
        '<path d="M182 140l-44 60v128" fill="none" stroke="' + line + '" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M316 140l44 60v128" fill="none" stroke="' + line + '" stroke-width="8" stroke-linecap="round"/>';
    }

    if (type === "duffle") {
      return '<rect x="120" y="178" width="258" height="120" rx="56" fill="#ffffff" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M182 178v-30c0-22 18-40 40-40h54c22 0 40 18 40 40v30" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>' +
        '<circle cx="249" cy="236" r="16" fill="' + primary + '"/>';
    }

    if (type === "kitchen") {
      return '<path d="M196 66c20 15 97 15 117 0v58c0 16-13 30-30 30h-57c-17 0-30-14-30-30z" fill="#ffffff" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M190 124l-38 186h205l-38-186" fill="#ffffff" stroke="' + line + '" stroke-width="10" stroke-linejoin="round"/>' +
        '<rect x="224" y="180" width="50" height="72" rx="14" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="8"/>';
    }

    if (type === "messenger") {
      return '<path d="M148 134c10-35 49-68 101-68 48 0 87 21 107 58" fill="none" stroke="' + line + '" stroke-width="10" stroke-linecap="round"/>' +
        '<rect x="124" y="136" width="250" height="168" rx="26" fill="#ffffff" stroke="' + line + '" stroke-width="10"/>' +
        '<path d="M124 182h250l-32-46H156z" fill="' + soft + '" stroke="' + line + '" stroke-width="8" stroke-linejoin="round"/>';
    }

    if (type === "organic") {
      return tote +
        '<path d="M249 180c-23 7-37 25-37 46 0 25 19 43 37 51 18-8 37-26 37-51 0-21-14-39-37-46z" fill="' + secondary + '" opacity="0.35" stroke="' + line + '" stroke-width="8"/>' +
        '<path d="M249 192v64" stroke="' + line + '" stroke-width="8" stroke-linecap="round"/>';
    }

    if (type === "recycle") {
      return tote +
        '<path d="M228 212l24-38 21 14-10 18h29l-25 44" fill="' + secondary + '" opacity="0.3" stroke="' + line + '" stroke-width="8"/>' +
        '<path d="M218 248l-22-14 12-19h-27l25-43" fill="' + secondary + '" opacity="0.3" stroke="' + line + '" stroke-width="8"/>';
    }

    if (type === "utility") {
      return tote +
        '<rect x="173" y="184" width="48" height="64" rx="14" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="8"/>' +
        '<rect x="277" y="184" width="48" height="64" rx="14" fill="' + secondary + '" opacity="0.28" stroke="' + line + '" stroke-width="8"/>';
    }

    if (type === "boat" || type === "shopper") {
      return tote + '<path d="M150 166h198" stroke="' + line + '" stroke-width="8" stroke-linecap="round"/>';
    }

    return tote + '<circle cx="249" cy="220" r="16" fill="' + primary + '"/>';
  }

  function buildCategoryImage(category, index) {
    var primary = category.palette[0];
    var secondary = category.palette[1];
    var soft = category.palette[2];
    var line = "#21496d";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="390" viewBox="0 0 500 390">' +
      '<defs><linearGradient id="panel-' + index + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="' + soft + '"/></linearGradient></defs>' +
      '<rect width="500" height="390" rx="42" fill="url(#panel-' + index + ')"/>' +
      '<circle cx="104" cy="92" r="68" fill="' + soft + '" opacity="0.75"/>' +
      '<circle cx="410" cy="302" r="74" fill="' + secondary + '" opacity="0.16"/>' +
      '<rect x="34" y="28" width="190" height="36" rx="18" fill="#ffffff" opacity="0.92"/>' +
      '<text x="55" y="52" font-family="Arial, sans-serif" font-size="18" fill="' + line + '">' + escapeXml(category.name) + "</text>" +
      buildShape(category.type, primary, secondary, line, soft) +
      '<rect x="138" y="320" width="222" height="36" rx="18" fill="#ffffff" opacity="0.92"/>' +
      '<text x="249" y="343" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="' + line + '">View category</text>' +
      "</svg>";

    return toDataUri(svg);
  }

  function ensureSection() {
    var section = document.getElementById("homeCategoryShowcase");
    if (section) {
      if (!section.querySelector(".home-category-shell")) {
        section.innerHTML =
          '<div class="home-category-shell">' +
          '<div class="home-category-header">' +
          '<span class="home-category-badge">Product Categories</span>' +
          '<h2>Browse Crestline&#8217;s Core Textile Categories</h2>' +
          '<p>Explore the main product groups we manufacture for custom branding, promotional programs, retail launches, and campaign sourcing. Select any category to open the products page already filtered for that range.</p>' +
          "</div>" +
          '<div class="home-category-grid" id="homeCategoryGrid"></div>' +
          "</div>";
      }
      return section;
    }

    var unitTeams = document.querySelector(".UnitTeams");
    if (!unitTeams || !unitTeams.parentNode) {
      return null;
    }

    section = document.createElement("section");
    section.className = "home-category-showcase";
    section.id = "homeCategoryShowcase";
    section.innerHTML =
      '<div class="home-category-shell">' +
      '<div class="home-category-header">' +
      '<span class="home-category-badge">Product Categories</span>' +
      '<h2>Browse Crestline&#8217;s Core Textile Categories</h2>' +
      '<p>Explore the main product groups we manufacture for custom branding, promotional programs, retail launches, and campaign sourcing. Select any category to open the products page already filtered for that range.</p>' +
      "</div>" +
      '<div class="home-category-grid" id="homeCategoryGrid"></div>' +
      "</div>";

    unitTeams.insertAdjacentElement("afterend", section);
    return section;
  }

  function renderCategories() {
    var section = ensureSection();
    var grid = section ? section.querySelector("#homeCategoryGrid") : null;
    var liveCatalog = window.crestlineCatalogData && window.crestlineCatalogData.catalog ? window.crestlineCatalogData.catalog : null;
    if (!grid) {
      return;
    }

    grid.innerHTML = categories.map(function (category, index) {
      var featuredProduct = liveCatalog && liveCatalog[category.name] && liveCatalog[category.name][0] ? liveCatalog[category.name][0] : null;
      var imageSrc = featuredProduct && featuredProduct.images && featuredProduct.images[0] ? featuredProduct.images[0] : buildCategoryImage(category, index);
      var featuredName = featuredProduct && featuredProduct.name ? featuredProduct.name : "Category Preview";
      var featuredMeta = featuredProduct
        ? [featuredProduct.fabric, featuredProduct.size].filter(Boolean).join(" · ")
        : category.summary;
      return [
        '<a class="home-category-card" href="/products/?category=',
        encodeURIComponent(category.name),
        '#productsBrowse">',
        '<div class="home-category-card-image">',
        '<img src="',
        imageSrc,
        '" alt="',
        escapeXml(featuredName),
        '">',
        "</div>",
        '<div class="home-category-card-copy">',
        '<span class="home-category-card-kicker">Featured Product</span>',
        "<h3>",
        escapeXml(category.name),
        "</h3>",
        '<p class="home-category-card-featured">',
        escapeXml(featuredName),
        "</p>",
        '<p class="home-category-card-summary">',
        escapeXml(featuredMeta),
        "</p>",
        "</div>",
        '<div class="home-category-card-action"><span>Browse Products</span><span>&rarr;</span></div>',
        "</a>"
      ].join("");
    }).join("");
  }

  window.renderHomeCategoriesSection = renderCategories;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderCategories);
  } else {
    renderCategories();
  }
})();
