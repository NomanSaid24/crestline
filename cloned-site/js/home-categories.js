(function () {
  var categories = [
    {
      name: "Back Packs",
      summary: "Structured bags for employee kits, campus campaigns, and branded travel packs.",
      detailText: "Backpack styles in this range are built for commuting, campus kits, travel programs, and premium branded giveaways.",
      fabricNote: "Canvas, peach canvas, waxed cotton, and custom fabric constructions depending on the pack design.",
      sizeNote: "Available in multiple backpack sizes for daily carry, travel, and utility-focused programs.",
      colorNote: "Natural, black, navy, grey, and custom brand colors depending on the selected style.",
      image: "/images/products/categories/24e39cdb-5ee2-43c1-90fa-f6e5fd23b24c.JPG",
      gallery: ["/images/products/categories/24e39cdb-5ee2-43c1-90fa-f6e5fd23b24c.JPG"]
    },
    {
      name: "Boat and Tote Bags",
      summary: "Large-format totes with generous gussets for retail, events, and hospitality gifting.",
      detailText: "Boat and tote silhouettes in this range are designed for retail presentation, gifting, hospitality, and everyday carry.",
      fabricNote: "Cotton canvas, duck, and recycled cotton options with structured gussets and long-handle variations.",
      sizeNote: "From compact everyday totes to large-capacity carryalls for merchandising and travel programs.",
      colorNote: "Natural body colors, contrast trim options, and custom color combinations are available.",
      image: "/images/products/categories/55d22b40-78b4-4f7a-9054-dcc591af1907.JPG",
      gallery: [
        "/images/products/categories/55d22b40-78b4-4f7a-9054-dcc591af1907.JPG",
        "/images/products/categories/aaa56673-8f10-4d16-8e9d-1f728a0d32e4.JPG"
      ]
    },
    {
      name: "Drawstring Bags",
      summary: "Lightweight promotional bags for conferences, clubs, and event distribution.",
      detailText: "Drawstring bags are lightweight, campaign-ready solutions for events, retail inserts, clubs, and promotional giveaways.",
      fabricNote: "Cotton sheeting, twill, mesh, and custom fabric options depending on the carry requirement.",
      sizeNote: "Offered in flat and larger-format sizes for giveaways, sports kits, and laundry-style use.",
      colorNote: "Natural, black, bright promotional shades, and custom brand colors are available on request.",
      image: "/images/products/categories/26652ece-a17b-40b6-8b43-e929ce8ab209.JPG",
      gallery: ["/images/products/categories/26652ece-a17b-40b6-8b43-e929ce8ab209.JPG"]
    },
    {
      name: "Duffle",
      summary: "Soft-structured duffles designed for sports programs, travel, and premium gifting.",
      detailText: "Duffle styles are developed for travel kits, sports programs, executive gifting, and premium branded carry solutions.",
      fabricNote: "Cotton canvas, peach canvas, waxed cotton, and blended options based on the desired structure.",
      sizeNote: "Multiple barrel and weekender sizes are available for compact carry through to large-capacity travel use.",
      colorNote: "Natural, black, navy, brown, and custom color programs are available depending on the style.",
      image: "/images/products/categories/68d1dc92-8913-4360-bb32-3fc51892a4e3.JPG",
      gallery: ["/images/products/categories/68d1dc92-8913-4360-bb32-3fc51892a4e3.JPG"]
    },
    {
      name: "Fashion Bags",
      summary: "Lifestyle silhouettes for boutique retail, branded drops, and elevated merchandise.",
      detailText: "Fashion bag silhouettes focus on lifestyle presentation, boutique retail, and elevated promotional merchandise.",
      fabricNote: "Canvas, peach canvas, twill, and lined constructions are available for fashion-forward programs.",
      sizeNote: "Available in compact to medium carry formats suited to retail drops, branded merchandise, and daily use.",
      colorNote: "Natural, fashion colors, contrast trims, and custom brand palettes are available.",
      image: "/images/products/categories/164b8942-4ad2-403d-bf48-b7d6c22fec20.JPG",
      gallery: ["/images/products/categories/164b8942-4ad2-403d-bf48-b7d6c22fec20.JPG"]
    },
    {
      name: "Kitchen Accessories",
      summary: "Aprons, mitts, and kitchen textile accessories built for utility and branding.",
      detailText: "Kitchen accessories include practical textile items for culinary promotions, hospitality, household gifting, and branded kitchen sets.",
      fabricNote: "Poly/cotton twill, cotton drill, quilted constructions, and insulated textile builds depending on the product.",
      sizeNote: "Category sizes vary by apron, mitt, potholder, and kitchen utility item requirements.",
      colorNote: "Natural, black, white, bold hospitality colors, and custom dyed programs are available.",
      image: "/images/products/categories/a4f0bbf2-16d1-414e-8e8b-95a87c05f418.JPG",
      gallery: [
        "/images/products/categories/a4f0bbf2-16d1-414e-8e8b-95a87c05f418.JPG",
        "/images/products/categories/8ec28988-3e83-479c-af24-962609c1e76a.JPG",
        "/images/products/categories/e45cda8e-30c0-44fb-bf89-903bca7d4b6a.JPG"
      ]
    },
    {
      name: "Messenger",
      summary: "Crossbody and flap bags for work essentials, daily carry, and event programs.",
      detailText: "Messenger and crossbody styles support commuting, conferences, office kits, and workday carry essentials.",
      fabricNote: "Canvas, denim, twill, and recycled cotton options are available depending on strap and flap construction.",
      sizeNote: "Available in compact document sizes through larger messenger formats with organizer features.",
      colorNote: "Natural, black, red, blue, denim tones, and custom brand colors are available.",
      image: "/images/products/categories/223f0cc6-b415-4ccd-829e-41d2482dbdb4.JPG",
      gallery: ["/images/products/categories/223f0cc6-b415-4ccd-829e-41d2482dbdb4.JPG"]
    },
    {
      name: "Organic Bags",
      summary: "Organic cotton carry solutions positioned for eco-conscious brand campaigns.",
      detailText: "Organic bag styles are positioned for sustainability-led retail, grocery, gifting, and promotional programs.",
      fabricNote: "Certified organic cotton and organic canvas constructions tailored to lightweight and structured carry options.",
      sizeNote: "Available in flat, gusseted, and market-style sizes depending on the program need.",
      colorNote: "Natural, unbleached, olive, black, and custom dyed organic programs can be developed.",
      image: "/images/products/categories/72b9b179-dc0b-4987-82de-5c4d35f80454.JPG",
      gallery: ["/images/products/categories/72b9b179-dc0b-4987-82de-5c4d35f80454.JPG"]
    },
    {
      name: "Recycle Bags",
      summary: "Recycled-fabric bag options developed for sustainability-led marketing programs.",
      detailText: "Recycle bag styles help brands communicate sustainability while still delivering practical everyday carry solutions.",
      fabricNote: "Recycled cotton, recycled PET blends, and woven recycled constructions depending on the product application.",
      sizeNote: "Available in foldable, shopper, and gusseted formats for retail, events, and repeat-use programs.",
      colorNote: "Natural, charcoal, navy, black, and custom recycled-fabric color programs are available.",
      image: "/images/products/categories/44868946-17ab-4f85-b715-06b0cef9bd49.JPG",
      gallery: ["/images/products/categories/44868946-17ab-4f85-b715-06b0cef9bd49.JPG"]
    },
    {
      name: "Shopper Tote",
      summary: "Retail-ready shopper totes for stores, activations, and merchandising bundles.",
      detailText: "Shopper totes are built for retail checkout, merchandising bundles, grocery programs, and campaign distribution.",
      fabricNote: "Cotton canvas, duck, twill, and recycled fabric options depending on required weight and finish.",
      sizeNote: "Available in compact to oversized shopper formats with multiple gusset and handle configurations.",
      colorNote: "Natural bodies, contrast trims, solid colors, and custom brand combinations are available.",
      image: "/images/products/categories/e8943eff-b843-4952-89df-cee5559c61a3.JPG",
      gallery: ["/images/products/categories/e8943eff-b843-4952-89df-cee5559c61a3.JPG"]
    },
    {
      name: "Utility Tote",
      summary: "High-capacity totes with added organization for work kits and functional everyday use.",
      detailText: "Utility totes combine capacity and organization for work kits, home storage, premium gifting, and heavy-use programs.",
      fabricNote: "Heavy canvas, duck with lamination, and structured blended constructions for added durability.",
      sizeNote: "Available in tall, wide, round, and multi-pocket utility formats depending on the end use.",
      colorNote: "Natural, black, navy, olive, and custom trim combinations are available.",
      image: "/images/products/categories/63b66388-c058-421b-b129-28dc757fe839.JPG",
      gallery: ["/images/products/categories/63b66388-c058-421b-b129-28dc757fe839.JPG"]
    }
  ];

  var modalState = {
    previousOverflow: "",
    images: [],
    title: ""
  };

  function slugify(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function escapeXml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function uniqueStrings(list) {
    var seen = {};
    return list.filter(function (item) {
      if (!item || seen[item]) {
        return false;
      }
      seen[item] = true;
      return true;
    });
  }

  function getCatalog() {
    return window.crestlineCatalogData && window.crestlineCatalogData.catalog
      ? window.crestlineCatalogData.catalog
      : {};
  }

  function getCategoryByName(name) {
    return categories.find(function (category) {
      return category.name === name;
    }) || null;
  }

  function setTextIfChanged(node, text) {
    if (node && node.textContent !== text) {
      node.textContent = text;
    }
  }

  function getSectionMarkup() {
    return (
      '<div class="home-category-shell">' +
      '<div class="home-category-header">' +
      '<span class="home-category-badge">Product Categories</span>' +
      "<h2>Browse Crestline's Core Textile Categories</h2>" +
      '<p>Explore the main product groups we manufacture for custom branding, promotional programs, retail launches, and campaign sourcing. Select any category to open a detailed popup with representative product information.</p>' +
      "</div>" +
      '<div class="home-category-grid" id="homeCategoryGrid"></div>' +
      "</div>"
    );
  }

  function ensureSection() {
    var section = document.getElementById("homeCategoryShowcase");
    var insertBeforeNode;

    if (section) {
      if (!section.querySelector(".home-category-shell")) {
        section.innerHTML = getSectionMarkup();
      }
      return section;
    }

    insertBeforeNode = document.getElementById("cyavoice") ||
      document.getElementById("pricing") ||
      document.querySelector("footer");

    section = document.createElement("section");
    section.className = "home-category-showcase";
    section.id = "homeCategoryShowcase";
    section.innerHTML = getSectionMarkup();

    if (insertBeforeNode && insertBeforeNode.parentNode) {
      insertBeforeNode.parentNode.insertBefore(section, insertBeforeNode);
      return section;
    }

    if (document.body) {
      document.body.appendChild(section);
      return section;
    }

    return section;
  }

  function ensureModal() {
    var modal = document.getElementById("productModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "productModal";
      modal.className = "product-modal";
      modal.hidden = true;
      modal.innerHTML =
        '<div class="product-modal-panel" role="dialog" aria-modal="true" aria-labelledby="productModalTitle">' +
        '<button type="button" class="product-modal-close" id="productModalClose" aria-label="Close category details">&times;</button>' +
        '<div class="product-modal-grid">' +
        "<div>" +
        '<div class="product-modal-main-image">' +
        '<img id="productModalImage" alt="">' +
        "</div>" +
        '<div id="productModalThumbs" class="product-modal-thumbs"></div>' +
        "</div>" +
        "<div>" +
        '<div id="productModalCategory" class="product-modal-category"></div>' +
        '<h3 id="productModalTitle"></h3>' +
        '<p id="productModalDescription" class="product-modal-description"></p>' +
        '<dl class="product-modal-specs">' +
        "<div><dt>Fabric Range</dt><dd id=\"productModalFabric\"></dd></div>" +
        "<div><dt>Size Scope</dt><dd id=\"productModalSize\"></dd></div>" +
        "<div><dt>Color Options</dt><dd id=\"productModalColors\"></dd></div>" +
        "<div><dt>Representative Styles</dt><dd id=\"productModalFeatures\"></dd></div>" +
        "</dl>" +
        '<div class="product-modal-actions">' +
        '<a id="productInquiryLink" class="product-inquiry-button" href="/contact-us">Customer Inquiry</a>' +
        '<span class="product-modal-note">Need custom branding, quantities, or packaging? Use Customer Inquiry and our team will route you to quotation support.</span>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
      document.body.appendChild(modal);
    }

    return {
      modal: modal,
      modalPanel: modal.querySelector(".product-modal-panel"),
      modalClose: modal.querySelector("#productModalClose"),
      modalCategory: modal.querySelector("#productModalCategory"),
      modalTitle: modal.querySelector("#productModalTitle"),
      modalDescription: modal.querySelector("#productModalDescription"),
      modalFabric: modal.querySelector("#productModalFabric"),
      modalSize: modal.querySelector("#productModalSize"),
      modalColors: modal.querySelector("#productModalColors"),
      modalFeatures: modal.querySelector("#productModalFeatures"),
      modalImage: modal.querySelector("#productModalImage"),
      modalThumbs: modal.querySelector("#productModalThumbs"),
      inquiryLink: modal.querySelector("#productInquiryLink")
    };
  }

  function bindModalEvents() {
    if (window.__homeCategoryModalBound) {
      return;
    }

    var nodes = ensureModal();
    window.__homeCategoryModalBound = true;

    nodes.modalClose.addEventListener("click", closeCategoryModal);
    nodes.modal.addEventListener("click", function (event) {
      if (event.target === nodes.modal) {
        closeCategoryModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !nodes.modal.hidden) {
        closeCategoryModal();
      }
    });
  }

  function buildCategoryGallery(category, categoryProducts) {
    var productImages = categoryProducts
      .map(function (product) {
        return product && product.images && product.images[0] ? product.images[0] : "";
      })
      .filter(Boolean)
      .slice(0, 3);

    return uniqueStrings((category.gallery || []).concat(productImages));
  }

  function buildRepresentativeStyles(categoryProducts) {
    var names = categoryProducts
      .slice(0, 3)
      .map(function (product) {
        return product && product.name ? product.name : "";
      })
      .filter(Boolean);

    return names.length
      ? names.join(", ")
      : "Representative styles can be developed around your specifications, materials, and branding requirements.";
  }

  function setModalImage(nodes, images, title, imageIndex) {
    modalState.images = images;
    modalState.title = title;

    nodes.modalImage.src = images[imageIndex];
    nodes.modalImage.alt = title;
    nodes.modalThumbs.innerHTML = images.map(function (image, index) {
      return (
        '<button type="button" class="product-thumb' +
        (index === imageIndex ? " active" : "") +
        '" data-image-index="' +
        index +
        '">' +
        '<img src="' +
        image +
        '" alt="' +
        escapeXml(title) +
        " preview " +
        (index + 1) +
        '">' +
        "</button>"
      );
    }).join("");

    Array.prototype.forEach.call(nodes.modalThumbs.querySelectorAll(".product-thumb"), function (thumb) {
      thumb.addEventListener("click", function () {
        setModalImage(nodes, images, title, Number(thumb.getAttribute("data-image-index")));
      });
    });
  }

  function openCategoryModal(categoryName) {
    var category = getCategoryByName(categoryName);
    var catalog = getCatalog();
    var categoryProducts = category ? (catalog[category.name] || []) : [];
    var nodes = ensureModal();
    var description;
    var galleryImages;

    if (!category) {
      return;
    }

    bindModalEvents();

    description = category.detailText;
    if (categoryProducts.length) {
      description += " Representative styles in this range include " +
        categoryProducts
          .slice(0, 3)
          .map(function (product) { return product.name; })
          .join(", ") +
        ".";
    }

    galleryImages = buildCategoryGallery(category, categoryProducts);
    if (!galleryImages.length) {
      galleryImages = [category.image];
    }

    nodes.modalCategory.textContent = category.name;
    nodes.modalTitle.textContent = category.name;
    nodes.modalDescription.textContent = description;
    nodes.modalFabric.textContent = category.fabricNote;
    nodes.modalSize.textContent = category.sizeNote;
    nodes.modalColors.textContent = category.colorNote;
    nodes.modalFeatures.textContent = buildRepresentativeStyles(categoryProducts);
    nodes.inquiryLink.href = "/contact-us?category=" + encodeURIComponent(category.name);

    setModalImage(nodes, galleryImages, category.name, 0);

    modalState.previousOverflow = document.body.style.overflow;
    nodes.modal.hidden = false;
    document.body.style.overflow = "hidden";

    if (nodes.modalPanel) {
      nodes.modalPanel.scrollTop = 0;
    }

    window.setTimeout(function () {
      nodes.modalClose.focus();
    }, 30);
  }

  function closeCategoryModal() {
    var nodes = ensureModal();
    if (nodes.modal.hidden) {
      return;
    }

    nodes.modal.hidden = true;
    document.body.style.overflow = modalState.previousOverflow || "";
  }

  function bindGridEvents(grid) {
    if (!grid || grid.getAttribute("data-home-category-grid-bound") === "1") {
      return;
    }

    grid.addEventListener("click", function (event) {
      var card = event.target.closest(".home-category-card");

      if (!card || !grid.contains(card)) {
        return;
      }

      openCategoryModal(card.getAttribute("data-category"));
    });

    grid.setAttribute("data-home-category-grid-bound", "1");
  }

  function getRenderSignature(catalog) {
    return categories.map(function (category) {
      var categoryProducts = catalog[category.name] || [];
      var featuredProduct = categoryProducts[0] || null;
      var featuredName = featuredProduct && featuredProduct.name ? featuredProduct.name : "Representative product range";

      return [category.name, featuredName].join("::");
    }).join("||");
  }

  function renderCategories() {
    var section = ensureSection();
    var grid = section ? section.querySelector("#homeCategoryGrid") : null;
    var header = section ? section.querySelector(".home-category-header") : null;
    var catalog = getCatalog();
    var renderSignature;

    if (!grid) {
      return;
    }

    if (header) {
      if (header.querySelector("h2")) {
        setTextIfChanged(header.querySelector("h2"), "Browse Crestline's Core Textile Categories");
      }
      if (header.querySelector("p")) {
        setTextIfChanged(
          header.querySelector("p"),
          "Explore the main product groups we manufacture for custom branding, promotional programs, retail launches, and campaign sourcing. Select any category to open a detailed popup with representative product information."
        );
      }
    }

    bindGridEvents(grid);
    renderSignature = getRenderSignature(catalog);

    if (grid.getAttribute("data-home-category-signature") === renderSignature) {
      return;
    }

    grid.innerHTML = categories.map(function (category) {
      return [
        '<button type="button" class="home-category-card" data-category="',
        escapeXml(category.name),
        '" aria-haspopup="dialog" aria-label="Open ',
        escapeXml(category.name),
        ' category details">',
        '<div class="home-category-card-image">',
        '<img src="',
        category.image,
        '" alt="',
        escapeXml(category.name),
        ' category preview">',
        "</div>",
        '<div class="home-category-card-copy">',
        "<h3>",
        escapeXml(category.name),
        "</h3>",
        '<p class="home-category-card-summary">',
        escapeXml(category.summary),
        "</p>",
        "</div>",
        '<div class="home-category-card-action"><span>View Details</span><span>&rarr;</span></div>',
        "</button>"
      ].join("");
    }).join("");

    grid.setAttribute("data-home-category-signature", renderSignature);
  }

  window.renderHomeCategoriesSection = renderCategories;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderCategories);
  } else {
    renderCategories();
  }
})();
