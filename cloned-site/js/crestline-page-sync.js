(function () {
  var homeAboutCardsObserver = null;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  var seoByPath = {
    "/": {
      title: "Crestline | Custom Promotional Textiles Manufacturer",
      description:
        "Crestline (SMC-PVT) Limited manufactures custom promotional textiles, cotton bags, aprons, oven mitts, and export-ready products for global brands."
    },
    "/about": {
      title: "About Us | Crestline",
      description:
        "Learn about Crestline (SMC-PVT) Limited, a trusted manufacturer and exporter of custom promotional textiles founded in 1982."
    },
    "/products": {
      title: "Products & Custom Manufacturing | Crestline",
      description:
        "Explore Crestline textile products, including cotton bags, aprons, oven mitts, potholders, and custom promotional manufacturing solutions."
    },
    "/pricing": {
      title: "Pricing & Lead Times | Crestline",
      description:
        "Request competitive pricing, MOQ details, and lead times from Crestline for custom promotional textile orders."
    },
    "/contact-us": {
      title: "Contact Us | Crestline",
      description:
        "Contact Crestline (SMC-PVT) Limited for quotations, production timelines, and custom promotional textile inquiries."
    },
    "/services": {
      title: "Services | Crestline",
      description:
        "Discover Crestline manufacturing, sampling, sourcing, and branding services for custom promotional textile programs."
    },
    "/raw-material": {
      title: "Raw Materials | Crestline",
      description:
        "Review Crestline raw material capabilities for cotton, poly/cotton, dyed, and export-ready promotional textile production."
    },
    "/certifications": {
      title: "Certifications | Crestline",
      description:
        "See Crestline certifications, compliance standards, and responsible production credentials for global textile buyers."
    },
    "/terms-and-conditions": {
      title: "Terms & Conditions | Crestline",
      description:
        "Read Crestline commercial terms, production conditions, and quotation policies for custom promotional textile orders."
    },
    "/general-information": {
      title: "General Information | Crestline",
      description:
        "Get general company information about Crestline, its manufacturing process, export background, and buyer support."
    },
    "/customer-satisfaction": {
      title: "Customer Satisfaction | Crestline",
      description:
        "Learn how Crestline supports customer satisfaction through quality control, dependable timelines, and responsive communication."
    },
    "/blogs": {
      title: "Blogs | Crestline",
      description:
        "Read Crestline insights on promotional textiles, manufacturing quality, sourcing, compliance, and export production."
    },
    "/blogs/article": {
      title: "Article | Crestline",
      description:
        "Read Crestline articles covering custom promotional textile manufacturing, sourcing, compliance, and production guidance."
    },
    "/features": {
      title: "Manufacturing Features | Crestline",
      description:
        "Explore Crestline manufacturing features, production visibility, quality control systems, and export support capabilities."
    },
    "/addons": {
      title: "Capabilities | Crestline",
      description:
        "Review Crestline operational capabilities, manufacturing support, and custom textile production advantages for global buyers."
    }
  };

  function getSeoForRoute(route) {
    if (seoByPath[route]) {
      return seoByPath[route];
    }

    var label = route
      .replace(/^\//, "")
      .split("/")
      .filter(Boolean)
      .map(function (segment) {
        return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      })
      .join(" | ");

    return {
      title: (label || "Crestline") + " | Crestline",
      description:
        "Crestline (SMC-PVT) Limited manufactures custom promotional textiles for global brands with quality, consistency, and responsible production."
    };
  }

  function setMeta(name, content) {
    var meta = document.querySelector('meta[name="' + name + '"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      document.head.appendChild(meta);
    }
    if (meta.content !== content) {
      meta.content = content;
    }
  }

  function setPropertyMeta(property, content) {
    var meta = document.querySelector('meta[property="' + property + '"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", property);
      document.head.appendChild(meta);
    }
    if (meta.getAttribute("content") !== content) {
      meta.setAttribute("content", content);
    }
  }

  function setLink(rel, href) {
    var selector = 'link[rel="' + rel + '"]';
    var link = document.querySelector(selector);

    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }

    if (link.getAttribute("href") !== href) {
      link.href = href;
    }
  }

  function getBaseUrl() {
    if (window.location && /^https?:$/i.test(window.location.protocol)) {
      return window.location.origin;
    }

    return "https://www.crestline.com.pk";
  }

  function applyBrandingMeta(path) {
    var seo = getSeoForRoute(path);
    var baseUrl = getBaseUrl();
    var canonicalUrl = new URL(path === "/" ? "/" : path + "/", baseUrl).toString();
    var iconPath = "/images/branding/crestline-logo.png?v=20260327a";
    var imageUrl = new URL(iconPath, baseUrl).toString();

    document.title = seo.title;
    setMeta("description", seo.description);
    setMeta("robots", "index,follow");
    setMeta("theme-color", "#e8faff");
    setMeta("application-name", "Crestline");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
    setMeta("twitter:image", imageUrl);
    setPropertyMeta("og:site_name", "Crestline (SMC-PVT) Limited");
    setPropertyMeta("og:type", "website");
    setPropertyMeta("og:title", seo.title);
    setPropertyMeta("og:description", seo.description);
    setPropertyMeta("og:url", canonicalUrl);
    setPropertyMeta("og:image", imageUrl);
    setPropertyMeta("og:image:alt", "Crestline (SMC-PVT) Limited logo");
    setLink("icon", iconPath);
    setLink("shortcut icon", iconPath);
    setLink("apple-touch-icon", iconPath);
    setLink("canonical", canonicalUrl);
    setLink("me", "https://www.linkedin.com/company/crestline-smc-pvt-limited/");
  }

  function setFirstTextNode(el, text) {
    if (!el) {
      return;
    }

    var firstTextNode = Array.prototype.find.call(el.childNodes, function (node) {
      return node.nodeType === 3 && normalize(node.nodeValue);
    });

    if (firstTextNode) {
      firstTextNode.nodeValue = text;
      return;
    }

    el.insertBefore(document.createTextNode(text), el.firstChild);
  }

  function findHeading(text, scope) {
    var root = scope || document;
    var wanted = normalize(text);

    return Array.prototype.find.call(root.querySelectorAll("h1, h2, h3"), function (node) {
      return normalize(node.textContent) === wanted;
    }) || null;
  }

  function setText(node, text) {
    if (node && node.textContent !== text) {
      node.textContent = text;
    }
  }

  function setHtml(node, html) {
    if (node && node.innerHTML !== html) {
      node.innerHTML = html;
    }
  }

  function setTextList(nodes, values) {
    Array.prototype.forEach.call(nodes || [], function (node, index) {
      if (values[index]) {
        node.textContent = values[index];
      }
    });
  }

  function hideNode(node) {
    if (node) {
      node.style.display = "none";
    }
  }

  function removeNode(node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  function ensureStyle(id, cssText) {
    if (document.getElementById(id)) {
      return;
    }

    var style = document.createElement("style");
    style.id = id;
    style.textContent = cssText;
    document.head.appendChild(style);
  }

  function ensureShellStyles() {
    ensureStyle(
      "crestline-shell-inline-style",
      ".crestline-nav-dropdown-item{list-style:none;display:flex;align-items:center}.crestline-nav-dropdown{position:relative;display:inline-flex;align-items:center}.crestline-nav-trigger{appearance:none;border:none;background:transparent;color:inherit;font:inherit;padding:.5rem .5rem;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:.45rem;cursor:pointer;transition:color .2s ease,background-color .2s ease}.crestline-nav-trigger:hover,.crestline-nav-trigger:focus-visible{color:#26ade3;outline:none}.crestline-nav-chevron{width:.85rem;height:.85rem;transition:transform .22s ease}.crestline-nav-dropdown:hover .crestline-nav-chevron,.crestline-nav-dropdown:focus-within .crestline-nav-chevron{transform:rotate(180deg)}.crestline-nav-panel{position:absolute;top:calc(100% + 14px);left:50%;transform:translateX(-50%) translateY(12px);min-width:248px;padding:.85rem;border-radius:22px;border:1px solid rgba(157,193,255,.45);background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(244,249,255,.9));box-shadow:0 22px 60px rgba(0,39,77,.12),inset 0 1px 0 rgba(255,255,255,.7);backdrop-filter:blur(28px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s ease,transform .2s ease,visibility .2s ease;z-index:60}.crestline-nav-dropdown:hover .crestline-nav-panel,.crestline-nav-dropdown:focus-within .crestline-nav-panel{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}.crestline-nav-link{display:block;padding:.8rem .9rem;border-radius:16px;color:#00274d;font-size:.92rem;line-height:1.35;text-align:left;transition:background-color .2s ease,color .2s ease,transform .2s ease;white-space:nowrap}.crestline-nav-link:hover,.crestline-nav-link:focus-visible{background:rgba(41,173,228,.08);color:#26ade3;outline:none;transform:translateX(2px)}nav a[href=\"/contact-us\"].group.relative.items-stretch.justify-center{background:#00b14c !important;background-image:none !important}nav a[href=\"/contact-us\"].group.relative.items-stretch.justify-center:hover,nav a[href=\"/contact-us\"].group.relative.items-stretch.justify-center:focus-visible{background:#00b14c !important;background-image:none !important}.whatsapp-float-btn{position:fixed !important;right:clamp(14px,1.5vw,24px) !important;bottom:calc(env(safe-area-inset-bottom, 0px) + 16px) !important;width:64px !important;height:64px !important;background:transparent !important;border:none !important;box-shadow:none !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;text-decoration:none !important;z-index:9999999 !important;transition:transform .2s ease !important;padding:0 !important;margin:0 !important}.whatsapp-float-btn:hover{transform:translateY(-2px) scale(1.05) !important}.whatsapp-float-btn svg{width:100% !important;height:100% !important;display:block !important}.wm-hero-button-icon{display:none !important}@media (max-width:1023px){.crestline-nav-panel{left:0;transform:translateX(0) translateY(12px);min-width:min(280px,82vw)}.crestline-nav-dropdown:hover .crestline-nav-panel,.crestline-nav-dropdown:focus-within .crestline-nav-panel{transform:translateX(0) translateY(0)}}@media (max-width:768px){.whatsapp-float-btn{right:12px !important;bottom:calc(env(safe-area-inset-bottom, 0px) + 12px) !important;width:54px !important;height:54px !important}}"
    );
    ensureStyle(
      "crestline-side-contact-widget-style",
      ".whatsapp-float-btn.wm-side-contact-widget{position:fixed!important;top:60%!important;right:0!important;left:auto!important;bottom:auto!important;transform:translate3d(0,-50%,0)!important;width:52px!important;height:auto!important;display:block!important;padding:0!important;margin:0!important;background:transparent!important;border:none!important;border-radius:0!important;overflow:visible!important;box-shadow:none!important;z-index:9999999!important;text-decoration:none!important}.whatsapp-float-btn.wm-side-contact-widget:hover{transform:translate3d(0,-50%,0)!important}.wm-side-contact-widget__rail{position:relative;display:flex;flex-direction:column;align-items:stretch;width:52px;margin-left:auto;box-shadow:0 12px 28px rgba(0,0,0,.18)}.wm-side-contact-widget__toggle,.wm-side-contact-widget__contact{appearance:none;border:none;cursor:pointer;font:inherit}.wm-side-contact-widget__toggle{display:flex;align-items:center;justify-content:center;width:52px;height:34px;padding:0;background:#080808;color:#fff;border-radius:6px 0 0 0;transition:background-color .2s ease}.wm-side-contact-widget__toggle:hover,.wm-side-contact-widget__toggle:focus-visible{background:#131313;outline:none}.wm-side-contact-widget__toggle-label{display:block;font-size:23px;line-height:1;transform:translateX(1px)}.wm-side-contact-widget__contact{display:flex;align-items:center;justify-content:center;gap:10px;width:52px;height:142px;padding:14px 0;background:#5b6168;color:#fff;writing-mode:vertical-rl;text-orientation:mixed;border-top:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);transition:background-color .22s ease}.wm-side-contact-widget__contact:hover,.wm-side-contact-widget__contact:focus-visible{background:#656b73;outline:none}.wm-side-contact-widget__contact-label{display:block;transform:rotate(180deg);font-size:12px;font-weight:600;line-height:1;letter-spacing:.01em;white-space:nowrap}.wm-side-contact-widget__contact-icon{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;transform:rotate(90deg);color:#fff}.wm-side-contact-widget__contact-icon svg{width:16px!important;height:16px!important;display:block!important}.wm-side-contact-widget__whatsapp-wrap{position:relative;width:52px;height:50px}.wm-side-contact-widget__whatsapp{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;width:52px;height:50px;background:#20c65a;color:#fff;border-radius:0 0 0 6px;transition:border-radius .2s ease}.wm-side-contact-widget__whatsapp svg{width:21px!important;height:21px!important;display:block!important}.wm-side-contact-widget__whatsapp-flyout{position:absolute;right:52px;bottom:0;display:flex;align-items:center;justify-content:center;height:50px;width:0;overflow:hidden;background:#20c65a;color:#fff;border-radius:6px 0 0 6px;white-space:nowrap;opacity:0;pointer-events:none;transform:translateX(14px);transition:width .28s ease,opacity .22s ease,transform .28s ease}.wm-side-contact-widget__whatsapp-flyout-text{display:flex;align-items:center;justify-content:center;min-width:168px;padding:0 24px 0 22px;font-size:12px;font-weight:600;letter-spacing:.01em}.wm-side-contact-widget__form{position:fixed;top:50%;right:52px;width:min(680px,calc(100vw - 96px));max-height:calc(100vh - 24px);padding:10px 14px 14px;background:#fff;border:1px solid rgba(221,226,232,.92);border-radius:14px;box-shadow:0 18px 44px rgba(0,0,0,.14);opacity:0;pointer-events:none;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-width:thin;transform:translate3d(14px,-50%,0);transition:opacity .22s ease,transform .28s ease}.wm-side-contact-widget__form-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.wm-side-contact-widget__form-title{margin:0;color:#1fc55a;font-size:21px;font-weight:600;line-height:1.2}.wm-side-contact-widget__form-close{appearance:none;border:none;background:transparent;color:#c5bfd0;font-size:22px;line-height:1;padding:0 4px;cursor:pointer}.wm-side-contact-widget__form-close:hover,.wm-side-contact-widget__form-close:focus-visible{color:#a79ab8;outline:none}.wm-side-contact-widget__form-fields{display:flex;flex-direction:column;gap:10px}.wm-side-contact-widget__field-input,.wm-side-contact-widget__field-textarea{width:100%;padding:12px 16px;border:1px solid #dde3ea;border-radius:999px;background:#fff;color:#4f5864;font:inherit;font-size:13px;line-height:1.25;outline:none;box-sizing:border-box;box-shadow:none;transition:border-color .2s ease,box-shadow .2s ease}.wm-side-contact-widget__field-textarea{min-height:96px;resize:none;border-radius:26px;padding-top:14px}.wm-side-contact-widget__field-input:focus,.wm-side-contact-widget__field-textarea:focus{border-color:#cad4de;box-shadow:0 0 0 3px rgba(31,197,90,.08)}.wm-side-contact-widget__field-input::placeholder,.wm-side-contact-widget__field-textarea::placeholder{color:#626c78;opacity:1}.wm-side-contact-widget__form-submit{margin-top:2px;width:100%;height:44px;border:none;border-radius:999px;background:#2f2f2f;color:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:filter .2s ease}.wm-side-contact-widget__form-submit:hover,.wm-side-contact-widget__form-submit:focus-visible{filter:brightness(1.04);outline:none}.wm-side-contact-widget--contact-open .wm-side-contact-widget__form{opacity:1;pointer-events:auto;transform:translate3d(0,-50%,0)}.wm-side-contact-widget--whatsapp-open .wm-side-contact-widget__whatsapp-flyout{width:176px;opacity:1;transform:translateX(0)}.wm-side-contact-widget--whatsapp-open .wm-side-contact-widget__whatsapp{border-radius:0}.wm-side-contact-widget--collapsed{right:0!important;width:36px!important;max-width:36px!important;overflow:hidden!important}.wm-side-contact-widget--collapsed .wm-side-contact-widget__rail{width:36px;box-shadow:none}.wm-side-contact-widget--collapsed .wm-side-contact-widget__toggle{width:36px;height:42px;border-radius:6px 0 0 6px}.wm-side-contact-widget--collapsed .wm-side-contact-widget__contact,.wm-side-contact-widget--collapsed .wm-side-contact-widget__whatsapp-wrap{display:none!important}.wm-side-contact-widget--collapsed .wm-side-contact-widget__form{display:none!important}.wm-side-contact-widget--collapsed .wm-side-contact-widget__whatsapp-flyout{display:none!important}.wm-side-contact-widget--contact-open .wm-side-contact-widget__contact,.wm-side-contact-widget--whatsapp-open .wm-side-contact-widget__contact{background:#656b73}@media (max-width:900px){.whatsapp-float-btn.wm-side-contact-widget{top:62%!important}.wm-side-contact-widget__form{width:min(520px,calc(100vw - 76px))}}@media (max-width:768px){.whatsapp-float-btn.wm-side-contact-widget{top:65%!important;width:46px!important}.wm-side-contact-widget__rail{width:46px}.wm-side-contact-widget__toggle{width:46px;height:32px;border-radius:6px 0 0 0}.wm-side-contact-widget__contact{width:46px;height:122px}.wm-side-contact-widget__contact-label{font-size:11px}.wm-side-contact-widget__contact-icon,.wm-side-contact-widget__contact-icon svg{width:14px!important;height:14px!important}.wm-side-contact-widget__whatsapp-wrap,.wm-side-contact-widget__whatsapp{width:46px;height:46px}.wm-side-contact-widget__whatsapp-flyout{right:46px;height:46px;border-radius:6px 0 0 6px}.wm-side-contact-widget__whatsapp-flyout-text{min-width:140px;padding:0 16px}.wm-side-contact-widget__whatsapp svg{width:19px!important;height:19px!important}.wm-side-contact-widget__form{right:46px;width:min(248px,calc(100vw - 58px));max-height:calc(100vh - 20px);padding:10px 12px 12px;border-radius:12px;transform:translate3d(14px,-50%,0)}.wm-side-contact-widget--contact-open .wm-side-contact-widget__form{transform:translate3d(0,-50%,0)}.wm-side-contact-widget__form-title{font-size:18px}.wm-side-contact-widget__form-close{font-size:20px}.wm-side-contact-widget__form-fields{gap:9px}.wm-side-contact-widget__field-input,.wm-side-contact-widget__field-textarea{font-size:12.5px;padding:10px 14px}.wm-side-contact-widget__field-textarea{min-height:74px;padding-top:12px}.wm-side-contact-widget__form-submit{height:38px;font-size:13px}.wm-side-contact-widget--collapsed{width:32px!important;max-width:32px!important}.wm-side-contact-widget--collapsed .wm-side-contact-widget__rail{width:32px}.wm-side-contact-widget--collapsed .wm-side-contact-widget__toggle{width:32px;height:42px;border-radius:6px 0 0 6px}}"
    );
    ensureStyle(
      "crestline-home-about-inline-style",
      ".wm-home-about-section{position:relative;z-index:2;padding:clamp(4.5rem,7vw,6.5rem) 1rem clamp(4.75rem,7vw,6.75rem)}.wm-home-about-inner{max-width:919px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.5rem}.wm-home-about-heading{max-width:874px;margin:0 auto;font-family:inherit;font-size:clamp(1.875rem,1.42rem + 2.27vw,3.4375rem);line-height:clamp(2.625rem,2.1rem + 2.62vw,4.46875rem);font-weight:400;letter-spacing:-2px;color:#00274D}.wm-home-about-copy{max-width:919px;margin:.5rem auto 0;font-family:inherit;font-size:clamp(.9375rem,.82rem + .59vw,1.333rem);line-height:1.3;font-weight:400;color:rgb(71 77 77/var(--tw-text-opacity,1))}.wm-home-about-cta{display:inline-flex;align-items:center;gap:.5rem;margin-top:.5rem;padding:.28rem .28rem .28rem .78rem;border-radius:999px;background:linear-gradient(90deg,#26ADE3 0%,rgba(38,173,227,.16) 100%);color:#fff;font-family:'Denim Ink',Arial,sans-serif;font-size:.82rem;font-weight:500;text-decoration:none;white-space:nowrap}.wm-home-about-cta-icon{width:30.96px;height:30.96px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:#fff;flex-shrink:0}.wm-home-about-cards{max-width:1273px;margin:clamp(3rem,6vw,5rem) auto 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-areas:'vision .' '. mission';column-gap:clamp(1.5rem,3vw,2.5rem);row-gap:clamp(1rem,2vw,1.5rem);align-items:start}.wm-home-about-card{width:min(100%,560px);padding:clamp(1.75rem,2vw,2.4rem);border-radius:32px;border:5px solid #fff;background:linear-gradient(311.9deg,#FFFFFF 24.13%,rgba(255,255,255,.04) 137.99%);backdrop-filter:blur(44.5px);box-shadow:0 18px 60px rgba(143,136,237,.12);display:flex;flex-direction:column;gap:1rem;color:#00274D;text-align:left}.wm-home-about-card.wm-home-about-card--reveal-ready{opacity:0;transform:translate3d(0,56px,0) scale(.98);filter:blur(10px);transition:opacity .72s ease,transform .72s cubic-bezier(.22,1,.36,1),filter .72s ease;will-change:opacity,transform,filter}.wm-home-about-card.wm-home-about-card--reveal-ready.wm-home-about-card--visible{opacity:1;transform:translate3d(0,0,0) scale(1);filter:blur(0)}.wm-home-about-card--vision{grid-area:vision;justify-self:start}.wm-home-about-card--mission{grid-area:mission;justify-self:end}.wm-home-about-card-title{margin:0;font-family:inherit;font-size:clamp(2rem,1.72rem + 1.4vw,2.675rem);line-height:1.08;font-weight:400;letter-spacing:-2px;color:#00274D}.wm-home-about-card-copy{margin:0;font-size:clamp(.9rem,.84rem + .18vw,1rem);line-height:1.7;font-weight:400;color:#00274D}.wm-home-about-card-tags{margin:.2rem 0 0;font-size:clamp(.82rem,.76rem + .18vw,.95rem);line-height:1.5;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#00274D}@media (prefers-reduced-motion:reduce){.wm-home-about-card.wm-home-about-card--reveal-ready,.wm-home-about-card.wm-home-about-card--reveal-ready.wm-home-about-card--visible{opacity:1;transform:none;filter:none;transition:none}}@media (max-width:768px){.wm-home-about-cards{grid-template-columns:1fr;grid-template-areas:'vision' 'mission'}.wm-home-about-card,.wm-home-about-card--vision,.wm-home-about-card--mission{width:100%;justify-self:stretch}.wm-home-about-card--mission{margin-top:0}}"
    );
  }

  function ensureFloatingWhatsApp() {
    if (!document.body) {
      return;
    }

    var widget = document.querySelector(".whatsapp-float-btn.wm-side-contact-widget");
    var legacyButton = document.querySelector(".whatsapp-float-btn:not(.wm-side-contact-widget)");
    var markup = [
      '<div class="wm-side-contact-widget__form" aria-hidden="true">',
      '<div class="wm-side-contact-widget__form-header">',
      '<h3 class="wm-side-contact-widget__form-title">Contact Form</h3>',
      '<button type="button" class="wm-side-contact-widget__form-close" aria-label="Close contact form">&times;</button>',
      "</div>",
      '<form class="wm-side-contact-widget__form-fields" novalidate>',
      '<input class="wm-side-contact-widget__field-input" type="text" name="name" placeholder="Name*" aria-label="Name" required>',
      '<input class="wm-side-contact-widget__field-input" type="email" name="email" placeholder="Email*" aria-label="Email" required>',
      '<input class="wm-side-contact-widget__field-input" type="text" name="company" placeholder="Company / Brand*" aria-label="Company / Brand" required>',
      '<input class="wm-side-contact-widget__field-input" type="text" name="country" placeholder="Country / Market*" aria-label="Country / Market" required>',
      '<textarea class="wm-side-contact-widget__field-textarea" name="help" placeholder="Inquiry Details*" aria-label="Inquiry Details" required></textarea>',
      '<button type="submit" class="wm-side-contact-widget__form-submit">Submit</button>',
      "</form>",
      "</div>",
      '<div class="wm-side-contact-widget__rail">',
      '<button type="button" class="wm-side-contact-widget__toggle" aria-expanded="true" aria-label="Collapse quick contact widget"><span class="wm-side-contact-widget__toggle-label" aria-hidden="true">&rarr;</span></button>',
      '<button type="button" class="wm-side-contact-widget__contact" aria-label="Open contact form">',
      '<span class="wm-side-contact-widget__contact-label">Contact Us</span>',
      '<span class="wm-side-contact-widget__contact-icon" aria-hidden="true">',
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7.25H19.5C19.7761 7.25 20 7.47386 20 7.75V16.25C20 16.5261 19.7761 16.75 19.5 16.75H4.5C4.22386 16.75 4 16.5261 4 16.25V7.75C4 7.47386 4.22386 7.25 4.5 7.25Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4.75 8L11.2092 12.5298C11.6878 12.8654 12.3122 12.8654 12.7908 12.5298L19.25 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      "</span>",
      "</button>",
      '<div class="wm-side-contact-widget__whatsapp-wrap">',
      '<div class="wm-side-contact-widget__whatsapp-flyout" aria-hidden="true"><span class="wm-side-contact-widget__whatsapp-flyout-text">WhatsApp</span></div>',
      '<a class="wm-side-contact-widget__whatsapp" href="https://wa.me/923212572225" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">',
      '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="white"/><path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="#20C65A"/></svg>',
      "</a>",
      "</div>",
      "</div>"
    ].join("");

    if (!widget) {
      widget = document.createElement("div");
      widget.className = "whatsapp-float-btn wm-side-contact-widget";
      widget.setAttribute("aria-label", "Quick contact links");

      if (legacyButton && legacyButton.parentNode) {
        legacyButton.parentNode.replaceChild(widget, legacyButton);
      } else {
        document.body.appendChild(widget);
      }
    }

    if (
      !widget.querySelector(".wm-side-contact-widget__rail") ||
      !widget.querySelector('input[name="company"]') ||
      !widget.querySelector('textarea[name="help"]')
    ) {
      widget.innerHTML = markup;
      widget.removeAttribute("data-crestline-widget-bound");
    }

    if (widget.getAttribute("data-crestline-widget-bound") !== "1") {
      var toggle = widget.querySelector(".wm-side-contact-widget__toggle");
      var toggleLabel = widget.querySelector(".wm-side-contact-widget__toggle-label");
      var contactTrigger = widget.querySelector(".wm-side-contact-widget__contact");
      var whatsappTrigger = widget.querySelector(".wm-side-contact-widget__whatsapp");
      var formPanel = widget.querySelector(".wm-side-contact-widget__form");
      var closeButton = widget.querySelector(".wm-side-contact-widget__form-close");
      var form = widget.querySelector(".wm-side-contact-widget__form form");

      function setCollapsed(collapsed) {
        widget.classList.toggle("wm-side-contact-widget--collapsed", collapsed);
        widget.classList.remove("wm-side-contact-widget--contact-open");
        widget.classList.remove("wm-side-contact-widget--whatsapp-open");
        if (toggle) {
          toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
          toggle.setAttribute("aria-label", collapsed ? "Open quick contact widget" : "Collapse quick contact widget");
        }
        if (toggleLabel) {
          toggleLabel.innerHTML = collapsed ? "&larr;" : "&rarr;";
        }
        if (formPanel) {
          formPanel.setAttribute("aria-hidden", "true");
        }
      }

      function openContact() {
        if (widget.classList.contains("wm-side-contact-widget--collapsed")) {
          return;
        }
        widget.classList.add("wm-side-contact-widget--contact-open");
        widget.classList.remove("wm-side-contact-widget--whatsapp-open");
        if (formPanel) {
          formPanel.setAttribute("aria-hidden", "false");
        }
      }

      function closeContact() {
        widget.classList.remove("wm-side-contact-widget--contact-open");
        if (formPanel) {
          formPanel.setAttribute("aria-hidden", "true");
        }
      }

      function openWhatsAppPreview() {
        if (widget.classList.contains("wm-side-contact-widget--collapsed")) {
          return;
        }
        widget.classList.remove("wm-side-contact-widget--contact-open");
        widget.classList.add("wm-side-contact-widget--whatsapp-open");
        if (formPanel) {
          formPanel.setAttribute("aria-hidden", "true");
        }
      }

      function closeWhatsAppPreview() {
        widget.classList.remove("wm-side-contact-widget--whatsapp-open");
      }

      if (toggle) {
        toggle.addEventListener("click", function (event) {
          event.preventDefault();
          setCollapsed(!widget.classList.contains("wm-side-contact-widget--collapsed"));
        });
      }

      if (contactTrigger) {
        contactTrigger.addEventListener("mouseenter", openContact);
        contactTrigger.addEventListener("focus", openContact);
        contactTrigger.addEventListener("click", function (event) {
          event.preventDefault();
          if (widget.classList.contains("wm-side-contact-widget--collapsed")) {
            setCollapsed(false);
          }
          openContact();
        });
      }

      if (whatsappTrigger) {
        whatsappTrigger.addEventListener("mouseenter", openWhatsAppPreview);
        whatsappTrigger.addEventListener("focus", openWhatsAppPreview);
        whatsappTrigger.addEventListener("blur", closeWhatsAppPreview);
      }

      if (formPanel) {
        formPanel.addEventListener("mouseenter", openContact);
      }

      widget.addEventListener("mouseleave", function () {
        closeContact();
        closeWhatsAppPreview();
      });

      document.addEventListener("pointerdown", function (event) {
        if (!widget.contains(event.target)) {
          closeContact();
          closeWhatsAppPreview();
        }
      });

      if (closeButton) {
        closeButton.addEventListener("click", function (event) {
          event.preventDefault();
          closeContact();
        });
      }

      if (form) {
        form.addEventListener("submit", function (event) {
          var formData;
          var draft;

          event.preventDefault();

          if (typeof form.reportValidity === "function" && !form.reportValidity()) {
            return;
          }

          formData = new FormData(form);
          draft = {
            name: normalize(formData.get("name")),
            email: normalize(formData.get("email")),
            company: normalize(formData.get("company")),
            country: normalize(formData.get("country")),
            help: normalize(formData.get("help"))
          };

          try {
            window.sessionStorage.setItem("crestlineFloatingInquiryDraft", JSON.stringify(draft));
          } catch (error) {
            // Ignore storage failures and still send the user to the main contact page.
          }

          window.location.href = "/contact-us?source=floating-widget";
        });
      }

      setCollapsed(false);
      widget.setAttribute("data-crestline-widget-bound", "1");
    }

    Array.prototype.forEach.call(document.querySelectorAll(".wm-hero-button-icon"), function (icon) {
      if (icon.style.display !== "none") {
        icon.style.display = "none";
      }
    });
  }

  function buildInfoNavMarkup() {
    return (
      '<div class="crestline-nav-dropdown">' +
      '<button type="button" class="crestline-nav-trigger">Information Hub' +
      '<svg class="crestline-nav-chevron" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>' +
      "</button>" +
      '<div class="crestline-nav-panel">' +
      '<a class="crestline-nav-link" href="/raw-material">Raw Material</a>' +
      '<a class="crestline-nav-link" href="/certifications">Certifications</a>' +
      '<a class="crestline-nav-link" href="/terms-and-conditions">Terms &amp; Conditions</a>' +
      '<a class="crestline-nav-link" href="/general-information">General Information</a>' +
      '<a class="crestline-nav-link" href="/services">Services</a>' +
      '<a class="crestline-nav-link" href="/customer-satisfaction">Customer Satisfaction</a>' +
      "</div>" +
      "</div>"
    );
  }

  function buildStandardNavMarkup() {
    return (
      '<div class="max-w-[1328px] flex flex-col lg:flex-row flex-wrap items-center justify-between mx-auto p-4">' +
      '<div class="flex justify-between w-full lg:w-fit">' +
      '<a class="flex items-center space-x-3 rtl:space-x-reverse" href="/">' +
      '<img alt="Crestline Logo" width="99" height="26" class="w-[130px] h-[26px]" src="/images/branding/crestline-logo.png">' +
      "</a>" +
      '<button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg border-none outline-none lg:hidden focus:outline-none" aria-controls="navbar-sticky" aria-expanded="false">' +
      '<span class="sr-only">Open main menu</span>' +
      '<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M0.113985 2.2438C0.113985 1.33509 0.850497 0.601562 1.76289 0.601562H19.3513C20.2636 0.601562 21.0002 1.33509 21.0002 2.2438C21.0002 3.1525 20.2636 3.88603 19.3513 3.88603H1.76289C0.850497 3.88603 0.113985 3.1525 0.113985 2.2438ZM19.3513 18.1187H1.76289C0.850497 18.1187 0.113985 18.8522 0.113985 19.7609C0.113985 20.6696 0.850497 21.4032 1.76289 21.4032H19.3513C20.2636 21.4032 21.0002 20.6696 21.0002 19.7609C21.0002 18.8522 20.2636 18.1187 19.3513 18.1187ZM19.2373 9.36014H1.64891C0.736513 9.36014 0 10.0937 0 11.0024C0 11.9111 0.736513 12.6446 1.64891 12.6446H19.2373C20.1497 12.6446 20.8862 11.9111 20.8862 11.0024C20.8862 10.0937 20.1497 9.36014 19.2373 9.36014Z" fill="white" fill-opacity="0.2"></path>' +
      '<path d="M0.113985 2.2438C0.113985 1.33509 0.850497 0.601562 1.76289 0.601562H19.3513C20.2636 0.601562 21.0002 1.33509 21.0002 2.2438C21.0002 3.1525 20.2636 3.88603 19.3513 3.88603H1.76289C0.850497 3.88603 0.113985 3.1525 0.113985 2.2438ZM19.3513 18.1187H1.76289C0.850497 18.1187 0.113985 18.8522 0.113985 19.7609C0.113985 20.6696 0.850497 21.4032 1.76289 21.4032H19.3513C20.2636 21.4032 21.0002 20.6696 21.0002 19.7609C21.0002 18.8522 20.2636 18.1187 19.3513 18.1187ZM19.2373 9.36014H1.64891C0.736513 9.36014 0 10.0937 0 11.0024C0 11.9111 0.736513 12.6446 1.64891 12.6446H19.2373C20.1497 12.6446 20.8862 11.9111 20.8862 11.0024C20.8862 10.0937 20.1497 9.36014 19.2373 9.36014Z" fill="url(#paint0_linear_1375_7667)"></path>' +
      "<defs>" +
      '<linearGradient id="paint0_linear_1375_7667" x1="6.86973" y1="1.31886" x2="17.2515" y2="29.2865" gradientUnits="userSpaceOnUse">' +
      '<stop stop-color="#00D4FF"></stop>' +
      '<stop offset="1" stop-color="#8F88ED"></stop>' +
      "</linearGradient>" +
      "</defs>" +
      "</svg>" +
      "</button>" +
      "</div>" +
      '<div class="flex md:w-[700px] xl:w-[800px] justify-between">' +
      '<div class="flex lg:order-2 space-x-2 lg:space-x-0 rtl:space-x-reverse relative z-20">' +
      '<a href="/contact-us" type="button" class="group relative items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-[#00b14c] text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-[#00b14c] dark:bg-[#00b14c] dark:focus:ring-cyan-800 dark:enabled:hover:bg-[#00b14c] rounded-full hidden lg:block"><span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm"><span class="leading-0 text-[15px] font-extralight text-center !p-0 w-full">Get Quotation</span></span></a>' +
      "</div>" +
      '<div class="items-center justify-center hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-sticky">' +
      '<ul class="flex flex-col xl:p-0 font-medium xl:space-x-3 rtl:space-x-reverse lg:flex-row xl:mt-0 xl:border-0 text-gray-900 dark:bg-gray-800 xl:dark:bg-gray-900 dark:border-gray-700 text-center text-[15px] lg:max-w-[1100px] font-normal">' +
      '<li><a class="block py-2 lg:px-2 rounded-sm md:hover:bg-transparent md:hover:text-[#26ade3] transition-all transition-1000 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/">Home</a></li>' +
      '<li><a class="block py-2 lg:px-2 rounded-sm md:hover:bg-transparent md:hover:text-[#26ade3] transition-all transition-1000 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/about">About Us</a></li>' +
      '<li><a class="block py-2 lg:px-2 rounded-sm md:hover:bg-transparent md:hover:text-[#26ade3] transition-all transition-1000 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/contact-us">Contact</a></li>' +
      '<div class="xl:hidden gap-4 items-center flex flex-col mt-2"><a href="/contact-us" type="button" class="group relative items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-[#00b14c] text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-[#00b14c] dark:bg-[#00b14c] dark:focus:ring-cyan-800 dark:enabled:hover:bg-[#00b14c] rounded-full block lg:hidden"><span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm"><span class="leading-0 text-[15px] font-extralight text-center !p-0 w-full">Get Quotation</span></span></a></div>' +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function bindStandardNav(nav) {
    if (!nav || nav.getAttribute("data-crestline-nav-bound") === "1") {
      return;
    }

    var toggle = nav.querySelector('[data-collapse-toggle="navbar-sticky"]');
    var menu = nav.querySelector("#navbar-sticky");

    if (!toggle || !menu) {
      return;
    }

    function setMenuState(isOpen) {
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menu.classList.toggle("hidden", !isOpen);
      menu.classList.toggle("block", isOpen);
    }

    toggle.addEventListener("click", function () {
      if (window.innerWidth >= 1024) {
        return;
      }

      setMenuState(toggle.getAttribute("aria-expanded") !== "true");
    });

    Array.prototype.forEach.call(menu.querySelectorAll("a"), function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 1024) {
          setMenuState(false);
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) {
        menu.classList.remove("block");
        menu.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
        return;
      }

      if (toggle.getAttribute("aria-expanded") !== "true") {
        menu.classList.remove("block");
        menu.classList.add("hidden");
      }
    });

    setMenuState(false);
    nav.setAttribute("data-crestline-nav-bound", "1");
  }

  function standardizeInfoPageNavigation() {
    var nav = document.querySelector("nav");
    if (!nav) {
      return;
    }

    if (nav.getAttribute("data-crestline-standard-nav") !== "1") {
      nav.className =
        "backdrop-blur-[83.1px] bg-transparent fixed w-full top-0 start-0 border-b border-gray-200 m-auto transition-all duration-300 z-[999999]";
      nav.innerHTML = buildStandardNavMarkup();
      nav.setAttribute("data-crestline-standard-nav", "1");
    }

    bindStandardNav(nav);
  }

  function updateFooter() {
    var footer = document.querySelector("footer");
    var linksMarkup;
    if (!footer) {
      return;
    }

    var grid = footer.querySelector(".grid.gap-6");
    if (!grid || grid.children.length < 3) {
      return;
    }

    var brandColumn = grid.children[0];
    var linksColumn = grid.children[1];
    var ctaColumn = grid.children[2];
    var brandText = brandColumn.querySelector("div.mt-3");

    if (brandText) {
      brandText.textContent = "Custom promotional textiles manufactured with quality, consistency, and responsible production since 1982.";
    }

    if (brandColumn) {
      var quoteButtons = Array.prototype.filter.call(brandColumn.querySelectorAll("a, button"), function (node) {
        var text = normalize(node.textContent);
        if (text !== "Get Quotation") {
          return false;
        }

        if (node.tagName === "A") {
          var nodeHref = node.getAttribute("href") || "";
          return !nodeHref || nodeHref === "/contact-us" || nodeHref.indexOf("/contact-us") === 0;
        }

        return true;
      });

      var brandQuoteButton = brandColumn.querySelector("[data-crestline-footer-quote]") || quoteButtons[0] || null;

      if (brandQuoteButton) {
        brandQuoteButton.setAttribute("data-crestline-footer-quote", "1");
        if (brandQuoteButton.tagName === "A") {
          brandQuoteButton.href = "/contact-us";
        }
        brandQuoteButton.className =
          "rounded-full w-fit inline-flex text-[12.98px] gap-2 bg-gradient-to-r from-[#26ADE3] to-[#26ADE329] text-white items-center p-1 pl-[8px] font-extralight mt-5 mx-auto md:mx-0";

        Array.prototype.forEach.call(quoteButtons, function (node) {
          if (node !== brandQuoteButton) {
            node.remove();
          }
        });
      } else {
        brandQuoteButton = document.createElement("a");
        brandQuoteButton.setAttribute("data-crestline-footer-quote", "1");
        brandQuoteButton.href = "/contact-us";
        brandQuoteButton.className =
          "rounded-full w-fit inline-flex text-[12.98px] gap-2 bg-gradient-to-r from-[#26ADE3] to-[#26ADE329] text-white items-center p-1 pl-[8px] font-extralight mt-5 mx-auto md:mx-0";
        setHtml(
          brandQuoteButton,
          'Get Quotation<div class="w-[30.96px] h-[30.96px] flex items-center justify-center bg-white rounded-full"><svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.7077 1.57031C6.7077 1.15667 6.37238 0.821354 5.95874 0.821354C5.5451 0.821354 5.20978 1.15667 5.20978 1.57031L6.7077 1.57031ZM5.42915 16.0805C5.72163 16.3729 6.19585 16.3729 6.48833 16.0805L11.2547 11.3141C11.5472 11.0216 11.5472 10.5474 11.2547 10.2549C10.9622 9.96245 10.488 9.96245 10.1955 10.2549L5.95874 14.4917L1.72199 10.2549C1.4295 9.96245 0.95529 9.96245 0.662804 10.2549C0.370318 10.5474 0.370318 11.0216 0.662804 11.3141L5.42915 16.0805ZM5.95874 1.57031L5.20978 1.57031L5.20978 15.5509L5.95874 15.5509L6.7077 15.5509L6.7077 1.57031L5.95874 1.57031Z" fill="#29ADE4"></path></svg></div>'
        );

        if (brandText) {
          brandText.insertAdjacentElement("afterend", brandQuoteButton);
        } else {
          brandColumn.appendChild(brandQuoteButton);
        }
      }
    }

    if (linksColumn) {
      linksMarkup =
        '<div class="grid grid-cols-2 text-sm font-normal">' +
        '<div>' +
        '<p class=" mb-4 lg:mb-8 text-[#343C6A] font-bold lg:font-medium ">Quick Links</p>' +
        '<ul>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/about">About Us</a></li>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/raw-material">Raw Material</a></li>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/certifications">Certifications</a></li>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/contact-us">Contact Us</a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="flex justify-end md:block">' +
        '<div>' +
        '<p class=" mb-4 lg:mb-8 text-[#343C6A] font-bold lg:font-medium ">Company</p>' +
        '<ul>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/general-information">General Information</a></li>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/services">Services</a></li>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/customer-satisfaction">Customer Satisfaction</a></li>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>' +
        '<li class="mb-4 text-[#343C6A]"><a href="/contact-us">Get Quotation</a></li>' +
        '</ul>' +
        "<div></div>" +
        "</div>" +
        "</div>" +
        "</div>";
      setHtml(linksColumn, linksMarkup);
    }

    if (ctaColumn) {
      var title = ctaColumn.querySelector("p");
      var input = ctaColumn.querySelector("input");
      var button = ctaColumn.querySelector("button");
      var socialRow = ctaColumn.querySelector(".flex.gap-2");

      setText(title, "Start Your Next Custom Project");

      if (input) {
        if (input.placeholder !== "Enter Your Email") {
          input.placeholder = "Enter Your Email";
        }
      }

      setText(button, "Subscribe");

      if (socialRow) {
        var socialItems = Array.prototype.filter.call(socialRow.children, function (node) {
          return node && node.querySelector && node.querySelector("svg");
        });
        var linkedinItem = socialItems[1];

        if (linkedinItem) {
          var linkedinAnchor = linkedinItem;

          if (linkedinItem.tagName !== "A") {
            linkedinAnchor = document.createElement("a");
            linkedinAnchor.className = linkedinItem.className;
            linkedinAnchor.innerHTML = linkedinItem.innerHTML;
            socialRow.replaceChild(linkedinAnchor, linkedinItem);
          }

          linkedinAnchor.href = "https://www.linkedin.com/company/crestline-smc-pvt-limited/";
          linkedinAnchor.target = "_blank";
          linkedinAnchor.rel = "noopener noreferrer";
          linkedinAnchor.setAttribute("aria-label", "Crestline LinkedIn");
        }
      }
    }
  }

  function removeMenuLink(link) {
    if (!link) {
      return;
    }

    var listItem = link.closest("li");
    if (listItem) {
      listItem.remove();
      return;
    }

    link.remove();
  }

  function updateGlobalNavigation() {
    Array.prototype.forEach.call(document.querySelectorAll("nav a, footer a"), function (link) {
      var label = normalize(link.textContent);
      var href = link.getAttribute("href") || "";

      if (
        label === "Add-Ons" ||
        label === "Blogs" ||
        label === "Products" ||
        label === "Pricing" ||
        href === "/addons" ||
        href === "/blogs" ||
        href === "/products" ||
        href === "/pricing"
      ) {
        removeMenuLink(link);
      }
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-crestline-info-nav]"), function (node) {
      node.remove();
    });

    Array.prototype.forEach.call(document.querySelectorAll("nav button, nav a"), function (node) {
      if (normalize(node.textContent) === "Information Hub") {
        var wrapper = node.closest("li") || node.closest(".crestline-nav-dropdown-item");
        if (wrapper) {
          wrapper.remove();
        } else {
          node.remove();
        }
      }
    });
  }

  function buildHomeAboutMarkup() {
    return (
      '<div class="wm-home-about-inner">' +
      '<h2 class="wm-home-about-heading">About Us</h2>' +
      '<p class="wm-home-about-copy">Founded in 1982, Crestline (SMC-PVT) Limited is a trusted manufacturer and exporter of custom promotional textiles, specializing in premium cotton and poly/cotton products for the global promotional industry.</p>' +
      '<a class="wm-home-about-cta" href="/contact-us">Get Quotation<span class="wm-home-about-cta-icon" aria-hidden="true"><svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.7077 1.57031C6.7077 1.15667 6.37238 0.821354 5.95874 0.821354C5.5451 0.821354 5.20978 1.15667 5.20978 1.57031L6.7077 1.57031ZM5.42915 16.0805C5.72163 16.3729 6.19585 16.3729 6.48833 16.0805L11.2547 11.3141C11.5472 11.0216 11.5472 10.5474 11.2547 10.2549C10.9622 9.96245 10.488 9.96245 10.1955 10.2549L5.95874 14.4917L1.72199 10.2549C1.4295 9.96245 0.95529 9.96245 0.662804 10.2549C0.370318 10.5474 0.370318 11.0216 0.662804 11.3141L5.42915 16.0805ZM5.95874 1.57031L5.20978 1.57031L5.20978 15.5509L5.95874 15.5509L6.7077 15.5509L6.7077 1.57031L5.95874 1.57031Z" fill="#29ADE4"></path></svg></span></a>' +
      "</div>" +
      '<div class="wm-home-about-cards" aria-label="Crestline Vision and Mission">' +
      '<article class="wm-home-about-card wm-home-about-card--vision">' +
      '<h3 class="wm-home-about-card-title">Our Vision</h3>' +
      '<p class="wm-home-about-card-copy">To be the leading provider of responsible, high-quality promotional textiles for global brands. Crestline combines premium materials, compliance-focused manufacturing, and dependable service to support long-term customer partnerships across global markets.</p>' +
      '<p class="wm-home-about-card-tags">QUALITY - CONSISTENCY - SUSTAINABILITY</p>' +
      "</article>" +
      '<article class="wm-home-about-card wm-home-about-card--mission">' +
      '<h3 class="wm-home-about-card-title">Our Mission</h3>' +
      '<p class="wm-home-about-card-copy">Our mission is to deliver quality, responsibly made textile products at scale while maintaining ethical standards and dependable production timelines. We work closely with customers to develop tailored solutions that align with brand requirements, product specifications, and market needs.</p>' +
      '<p class="wm-home-about-card-tags">SCALE - COMPLIANCE - SUSTAINABILITY - PARTNERSHIP</p>' +
      "</article>" +
      "</div>"
    );
  }

  function initHomeAboutCardAnimations() {
    var cards = document.querySelectorAll("[data-crestline-home-about] .wm-home-about-card");
    var reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cards.length) {
      if (homeAboutCardsObserver) {
        homeAboutCardsObserver.disconnect();
        homeAboutCardsObserver = null;
      }
      return;
    }

    if (
      Array.prototype.every.call(cards, function (card) {
        return card.getAttribute("data-home-about-reveal-bound") === "1";
      })
    ) {
      return;
    }

    if (homeAboutCardsObserver) {
      homeAboutCardsObserver.disconnect();
      homeAboutCardsObserver = null;
    }

    Array.prototype.forEach.call(cards, function (card) {
      card.setAttribute("data-home-about-reveal-bound", "1");
      card.classList.add("wm-home-about-card--reveal-ready");
      card.classList.remove("wm-home-about-card--visible");
    });

    if (!("IntersectionObserver" in window) || reduceMotion) {
      Array.prototype.forEach.call(cards, function (card) {
        card.classList.add("wm-home-about-card--visible");
      });
      return;
    }

    homeAboutCardsObserver = new IntersectionObserver(
      function (entries, observer) {
        Array.prototype.forEach.call(entries, function (entry) {
          if (entry.isIntersecting || entry.intersectionRatio > 0.24) {
            entry.target.classList.add("wm-home-about-card--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: [0.24, 0.45],
        rootMargin: "0px 0px -10% 0px"
      }
    );

    Array.prototype.forEach.call(cards, function (card) {
      homeAboutCardsObserver.observe(card);
    });
  }

  function removeHomeInquirySection() {
    var inquirySlider = document.getElementById("paymentSlider1");
    var inquirySection = inquirySlider ? inquirySlider.closest("section") : null;

    if (!inquirySection) {
      var inquiryHeading =
        findHeading("Quotations shared within 48 hours") || findHeading("25+ Payment Gateways");
      inquirySection = inquiryHeading ? inquiryHeading.closest("section") : null;
    }

    removeNode(inquirySection);
  }

  function ensureHomeAboutSection() {
    var processCard = document.getElementById("cubeAnimation");
    var processSection = processCard ? processCard.closest("section") : null;
    var aboutSection = document.querySelector("[data-crestline-home-about]");
    var aboutMarkup = buildHomeAboutMarkup();

    if (!processSection || !processSection.parentNode) {
      return;
    }

    if (!aboutSection) {
      aboutSection = document.createElement("section");
      aboutSection.setAttribute("data-crestline-home-about", "1");
    }

    aboutSection.className = "wm-home-about-section";
    if (aboutSection.innerHTML !== aboutMarkup) {
      setHtml(aboutSection, aboutMarkup);
    }

    if (aboutSection.nextElementSibling !== processSection) {
      processSection.parentNode.insertBefore(aboutSection, processSection);
    }

    initHomeAboutCardAnimations();
  }

  function updateAboutPage() {
    document.title = "About Us | Crestline";
    setMeta(
      "description",
      "Learn about Crestline (SMC-PVT) Limited, a trusted manufacturer and exporter of custom promotional textiles founded in 1982."
    );

    updateFooter();

    var hero = document.querySelector('section.relative div[class*="lg:w-5/12"]');
    if (hero) {
      Array.prototype.forEach.call(hero.childNodes, function (node) {
        if (node.nodeType === 3 && normalize(node.nodeValue).toLowerCase() === "about us") {
          node.nodeValue = "";
        }
      });

      var heroBadge = hero.querySelector("[data-crestline-about-badge]");
      if (!heroBadge) {
        heroBadge = document.createElement("p");
        heroBadge.setAttribute("data-crestline-about-badge", "1");
        heroBadge.className = "text-sm lg:mb-5 text-[#484848]";
        var heroHeading = hero.querySelector("h2");
        if (heroHeading) {
          hero.insertBefore(heroBadge, heroHeading);
        }
      }

      setText(heroBadge, "About Us");
      setText(hero.querySelector("h2"), "Founded in 1982. Built on Quality.");

      var heroDescription = Array.prototype.find.call(hero.querySelectorAll("p"), function (node) {
        return !node.hasAttribute("data-crestline-about-badge") && normalize(node.textContent).length > 40;
      });

      setText(
        heroDescription,
        "Founded in 1982, Crestline (SMC-PVT) Limited is a trusted manufacturer and exporter of custom promotional textiles, specializing in premium cotton and poly/cotton products for the global promotional industry."
      );

      var heroCta = hero.querySelector("a");
      if (heroCta) {
        heroCta.href = "/contact-us";
        setFirstTextNode(heroCta, "Get Quotation");
      }
    }

    var heroImage = document.querySelector('section.relative img[alt="dashboard"], section.relative img[src*="Group 427320734"]');
    if (heroImage) {
      heroImage.src = "/images/pricing/crestline-pricing-overview.png?v=20260316c";
      heroImage.alt = "Crestline pricing overview";
      heroImage.style.objectFit = "cover";
      heroImage.style.width = "100%";
      heroImage.style.height = "100%";
      heroImage.style.display = "block";
    }

    var visionHeading = findHeading("Our Vision");
    if (visionHeading) {
      setText(
        visionHeading.parentElement.querySelector("p"),
        "Leading responsible promotional textiles for global brands."
      );

      var visionBody = visionHeading.parentElement.nextElementSibling;
      if (visionBody) {
        var visionParagraphs = visionBody.querySelectorAll("p");
        setTextList(visionParagraphs, [
          "To be the leading provider of responsible, high-quality promotional textiles for global brands.",
          "Crestline combines premium materials, compliance-focused manufacturing, and dependable service to support long-term customer partnerships across global markets."
        ]);
        setText(visionBody.querySelector("span"), "QUALITY - CONSISTENCY - SUSTAINABILITY");
      }
    }

    var missionHeading = findHeading("Our Mission");
    if (missionHeading) {
      setText(
        missionHeading.parentElement.querySelector("p"),
        "Delivering scale, quality, and responsible manufacturing."
      );

      var missionBody = missionHeading.parentElement.nextElementSibling;
      if (missionBody) {
        var missionParagraphs = missionBody.querySelectorAll("p");
        setTextList(missionParagraphs, [
          "Our mission is to deliver quality, responsibly made textile products at scale while maintaining ethical standards and dependable production timelines.",
          "We work closely with customers to develop tailored solutions that align with brand requirements, product specifications, and market needs."
        ]);
        setText(missionBody.querySelector("span"), "SCALE - COMPLIANCE - SUSTAINABILITY - PARTNERSHIP");
      }
    }

    var whyHeading = findHeading("Why Choose Us?");
    if (whyHeading) {
      var whySection = whyHeading.closest("section");
      var whyIntro = whyHeading.parentElement.querySelector("p");
      setText(
        whyIntro,
        "Crestline delivers premium promotional textiles through strict quality control, responsible production, and reliable manufacturing at scale."
      );

      var cardMap = {
        "Innovative Solution": {
          title: "Premium Quality Standards",
          description:
            "Our key differentiator is premium product quality backed by rigorous in-house inspection and strict quality control at every stage."
        },
        "Customer-Centric Approach": {
          title: "Tailored Customer Solutions",
          description:
            "We work closely with customers to develop products that match their specifications, branding goals, and market requirements."
        },
        "Seamless Scalability": {
          title: "Reliable Production Capacity",
          description:
            "Crestline maintains consistent output across large production volumes to support promotional programs in global markets."
        },
        "Reliability and Security": {
          title: "Responsible Manufacturing",
          description:
            "Eco-friendly fabrics, ethical labor practices, and compliance-focused production are embedded into our manufacturing process."
        }
      };

      Array.prototype.forEach.call(whySection.querySelectorAll("h3"), function (heading) {
        var cardData = cardMap[normalize(heading.textContent)];
        if (!cardData) {
          return;
        }

        var card = heading.closest("div.bg-white");
        setText(heading, cardData.title);

        if (card) {
          setText(card.querySelector("div.my-3 p"), cardData.description);

          var cardLink = card.querySelector("a");
          if (cardLink) {
            cardLink.href = "/contact-us";
            setFirstTextNode(cardLink, "Get Quotation");
          }
        }
      });
    }

    var highlightsSection = Array.prototype.find.call(document.querySelectorAll("section"), function (node) {
      return normalize(node.textContent).indexOf("We're passionate about empowering.") !== -1;
    });

    if (highlightsSection) {
      var leftCard = highlightsSection.querySelector("div.border");
      var rightCards = highlightsSection.querySelectorAll("div.p-8.rounded-3xl");

      if (leftCard) {
        var leftHeading = leftCard.querySelector("h2");
        var leftParagraphs = leftCard.querySelectorAll("div.flex.flex-col.gap-4 p");
        var leftCta = leftCard.querySelector("a");

        setText(leftHeading, "Built on Experience. Focused on Quality.");
        setTextList(leftParagraphs, [
          "Founded in 1982, Crestline began as Crescent Enterprises and built its reputation by exporting cotton and poly/cotton textiles to international markets.",
          "We expanded into bag manufacturing for the US market in 1986 and continue to support global promotional programs with dependable production expertise.",
          "In 2025, we restructured as Crestline (SMC-PVT) Limited while preserving the values, workmanship, and customer focus developed over four decades."
        ]);

        if (leftCta) {
          leftCta.href = "/contact-us";
          setFirstTextNode(leftCta, "Get Quotation");
        }
      }

      if (rightCards.length >= 3) {
        var topHeading = rightCards[0].querySelector("h2");
        var topText = rightCards[0].querySelector("p");
        var topLink = rightCards[0].querySelector("a");
        var statOneHeading = rightCards[1].querySelector("h2");
        var statOneText = rightCards[1].querySelector("p");
        var statTwoHeading = rightCards[2].querySelector("h2");
        var statTwoText = rightCards[2].querySelector("p");

        setText(topHeading, "40+ Years");
        setText(topText, "Trusted manufacturing and export experience in custom promotional textiles.");

        if (topLink) {
          topLink.href = "/contact-us";
          setFirstTextNode(topLink, "Get Quotation");
        }

        setText(statOneHeading, "750K-1M");
        setText(statOneText, "pieces per month");
        setText(statTwoHeading, "2002");
        setText(statTwoText, "Dallas office launched");
      }
    }

    var valuesSection = Array.prototype.find.call(document.querySelectorAll("section"), function (node) {
      return normalize(node.textContent).indexOf("What Drives Us") !== -1;
    });

    if (valuesSection) {
      var valuesHeading = valuesSection.querySelector("h2");
      var valuesIntro = valuesSection.querySelector("div.mb-10 p");
      var valuesCards = valuesSection.querySelectorAll("div.grid.grid-rows-3 > div");
      var brokenImage = valuesSection.querySelector("img");

      setText(valuesHeading, "What Drives Crestline");
      setText(
        valuesIntro,
        "Our growth is guided by quality, responsibility, and lasting partnerships across global promotional markets."
      );

      if (brokenImage) {
        brokenImage.src = "/images/pricing/crestline-pricing-overview.png?v=20260316c";
        brokenImage.alt = "Crestline pricing overview";
        brokenImage.style.objectFit = "cover";
        brokenImage.style.width = "100%";
        brokenImage.style.height = "100%";
        brokenImage.style.display = "block";
      }

      if (valuesCards.length >= 3) {
        var valuesMap = [
          {
            title: "Quality First",
            description:
              "Premium products are supported by rigorous in-house inspection and strict quality control at every stage."
          },
          {
            title: "Responsible Production",
            description:
              "Eco-friendly fabrics, ethical labor practices, and compliance-focused manufacturing are built into our process."
          },
          {
            title: "Global Partnership",
            description:
              "We deliver tailored solutions, reliable timelines, and long-term support for brands in global promotional markets."
          }
        ];

        Array.prototype.forEach.call(valuesCards, function (card, index) {
          var title = card.querySelector("h4");
          var description = card.querySelector("p");
          var value = valuesMap[index];

          if (!value) {
            return;
          }

          setText(title, value.title);
          setText(description, value.description);
        });
      }
    }
  }

  function updatePricingCard(oldTitles, data) {
    Array.prototype.forEach.call(document.querySelectorAll("h3"), function (heading) {
      var current = normalize(heading.textContent);
      if (oldTitles.indexOf(current) === -1) {
        return;
      }

      var card = heading.closest('div[class*="rounded-[33px]"]') || heading.closest("div.bg-cover");
      var headerBlock = heading.closest('div[class*="border-b-2"]');

      setText(heading, data.title);

      if (headerBlock) {
        var description = headerBlock.querySelector("p.text-sm");
        var values = headerBlock.querySelectorAll("div.flex.items-end p");

        setText(description, data.description);

        if (values.length >= 2) {
          setText(values[0], data.value);
          setText(values[1], data.suffix);
        }
      }

      if (card) {
        var featureNodes = Array.prototype.filter.call(card.querySelectorAll("div.flex.gap-2 p"), function (node) {
          return !node.closest('div[class*="items-end"]');
        });

        setTextList(featureNodes, data.features);

        Array.prototype.forEach.call(featureNodes, function (node, index) {
          if (index >= data.features.length) {
            hideNode(node.closest("div.flex.justify-between.py-2"));
          }
        });

        var cardButton = Array.prototype.find.call(card.querySelectorAll("a"), function (node) {
          return node.className && node.className.indexOf("rounded-full") !== -1;
        });
        if (cardButton) {
          cardButton.href = "/contact-us";
          cardButton.target = "";
          cardButton.rel = "";

          var buttonLabel = cardButton.querySelector("div") || cardButton;
          setText(buttonLabel, data.buttonText);
        }
      }
    });
  }

  function insertPricingSummary() {
    var existing = document.getElementById("crestlinePricingTerms");
    if (existing) {
      existing.remove();
    }
  }

  function updatePricingPage() {
    document.title = "Pricing | Crestline";
    setMeta(
      "description",
      "Request competitive pricing, MOQ details, and lead times from Crestline for custom promotional textile orders."
    );

    updateFooter();

    var heroSection = document.querySelector("section.p-8.overflow-hidden");
    if (heroSection) {
      var heroContent = Array.prototype.find.call(heroSection.querySelectorAll("div"), function (node) {
        return node.className && node.className.indexOf("max-w-[1273px]") !== -1 && node.className.indexOf("h-fit") !== -1;
      });
      var heroLabel = heroSection.querySelector("p.text-sm");
      var heroHeading = heroSection.querySelector("h2");
      var existingIntro = heroSection.querySelector("[data-crestline-pricing-intro]");

      if (heroContent) {
        heroContent.style.display = "";
      }

      setText(heroLabel, "Commercial Terms");
      setText(heroHeading, "Pricing & Lead Times");

      if (!existingIntro && heroHeading) {
        existingIntro = document.createElement("p");
        existingIntro.setAttribute("data-crestline-pricing-intro", "1");
        existingIntro.className = "text-[#616A6B] max-w-[620px] mt-4";
        heroHeading.insertAdjacentElement("afterend", existingIntro);
      }

      setText(
        existingIntro,
        "Competitive pricing, MOQ details, and production timelines are shared based on your product specifications, quantity, and material requirements."
      );

      var toggle = Array.prototype.find.call(heroSection.querySelectorAll("div"), function (node) {
        var text = normalize(node.textContent);
        var className = typeof node.className === "string" ? node.className : "";
        return (
          (text === "Monthly/Yearly" || text === "Monthly / Yearly") ||
          (
            text.indexOf("Monthly") !== -1 &&
            text.indexOf("Yearly") !== -1 &&
            className.indexOf("rounded-full") !== -1 &&
            className.indexOf("border-2") !== -1
          )
        );
      });

      hideNode(toggle);
    }

    updatePricingCard(["Free Tier"], {
      title: "Quote Turnaround",
      description: "Competitive pricing and minimum order quantity details are shared within 48 hours of inquiry.",
      value: "48",
      suffix: "hrs",
      features: [
        "Competitive pricing guidance",
        "MOQ details on request",
        "Tailored quotations for custom specs",
        "Final timelines confirmed at quotation stage"
      ],
      buttonText: "Request Quote"
    });

    updatePricingCard(["Professional Tier"], {
      title: "Natural Fabric Lead Time",
      description: "Standard lead time for natural fabric orders under normal production planning conditions.",
      value: "45",
      suffix: "days",
      features: [
        "Suitable for standard promotional programs",
        "Aligned with approved specifications",
        "Supports reliable campaign planning",
        "Timelines may vary by order volume"
      ],
      buttonText: "Get Quotation"
    });

    updatePricingCard(["Enterprise Tier", "Enterprise Plan"], {
      title: "Dyed Fabric Lead Time",
      description: "Standard lead time for dyed fabric orders requiring additional production and processing stages.",
      value: "75",
      suffix: "days",
      features: [
        "Designed for dyed material programs",
        "Includes added production complexity",
        "Supports branded custom textile orders",
        "Final schedule depends on quantity"
      ],
      buttonText: "Talk to Sales"
    });

    var pricingCompare = document.getElementById("pricingDetailCont");
    if (pricingCompare) {
      hideNode(pricingCompare.closest("section") || pricingCompare);
    }

    var quoteSection = Array.prototype.find.call(document.querySelectorAll("section"), function (node) {
      return normalize(node.textContent).indexOf("Forest Admin") !== -1;
    });

    if (quoteSection) {
      var quoteCard = Array.prototype.find.call(quoteSection.querySelectorAll("div"), function (node) {
        return node.className && node.className.indexOf("pt-12") !== -1 && node.className.indexOf("border-4") !== -1;
      });

      if (quoteCard) {
        quoteCard.innerHTML =
          '<div class="flex justify-between items-center text-center flex-col max-w-[1180px] mx-4 text-[20px] md:text-[28px] font-normal gap-8">' +
          '<p>"Crestline provides competitive quotations within 48 hours and supports dependable production planning with clear lead time guidance for custom promotional textile orders."</p>' +
          '<div class="m-auto md:gap-2 flex md:grid grid-cols-2 text-left items-center py-4 px-4">' +
          '<div class="text-[#343C6A] text-2xl text-right font-bold border-r border-[#484848] pr-4 max-h-[28px]">Crestline</div>' +
          '<div class="flex flex-col pl-4 text-base text-[#1B3665]">' +
          '<div>Commercial Terms</div>' +
          '<div>Pricing, lead times, and delivery planning</div>' +
          '</div>' +
          '</div>' +
          '</div>';
      }
    }

    var showcaseSection = Array.prototype.find.call(document.querySelectorAll("section"), function (node) {
      return (
        normalize(node.textContent).indexOf("Try it for free") !== -1 ||
        !!node.querySelector('img[src*="crestline-pricing-overview"], img[src*="accouting-db-"]')
      );
    });

    if (showcaseSection) {
      showcaseSection.style.display = "";

      var showcaseHeading = showcaseSection.querySelector("h2");
      var showcasePoints = showcaseSection.querySelectorAll("li p");
      var showcaseButton = showcaseSection.querySelector("a");
      var showcaseImage = showcaseSection.querySelector("img");

      setText(showcaseHeading, "Plan Your Order With Confidence");
      setTextList(showcasePoints, [
        "Competitive pricing and MOQ details shared within 48 hours of inquiry",
        "Standard lead times: 45 days for natural fabric and 75 days for dyed fabric",
        "Final timelines confirmed based on quantity, material, and product complexity"
      ]);

      if (showcaseButton) {
        showcaseButton.href = "/contact-us";
        setText(showcaseButton.querySelector("div") || showcaseButton, "Get Quotation");
      }

      if (showcaseImage) {
        showcaseImage.src = "/images/pricing/crestline-pricing-overview.png?v=20260316c";
        showcaseImage.alt = "Crestline pricing overview";
      }
    }

    insertPricingSummary();
  }

  function updateContactCard(card, href, title, description, iconSvg) {
    if (!card) {
      return;
    }

    card.href = href;
    card.target = "";
    card.rel = "";

    var titleNode = card.querySelector(".font-semibold");
    var textBlock = Array.prototype.find.call(card.querySelectorAll("div"), function (node) {
      return node.className && node.className.indexOf("text-center text-[18px]") !== -1;
    });

    card.style.width = "291px";
    card.style.maxWidth = "100%";
    card.style.minHeight = "245px";
    card.style.textDecoration = "none";

    if (textBlock) {
      textBlock.style.maxWidth = "220px";
      textBlock.style.margin = "0 auto";
      textBlock.style.overflowWrap = "normal";
      textBlock.style.wordBreak = "normal";
    }

    Array.prototype.forEach.call(card.querySelectorAll("svg, [data-crestline-contact-icon]"), function (node) {
      node.remove();
    });

    if (iconSvg) {
      var iconWrap = document.createElement("div");
      iconWrap.setAttribute("data-crestline-contact-icon", "1");
      iconWrap.innerHTML = iconSvg;
      card.insertBefore(iconWrap, card.firstChild);
    }

    setText(titleNode, title);

    if (textBlock) {
      var nodes = Array.prototype.filter.call(textBlock.childNodes, function (node) {
        return node.nodeType === 3 && normalize(node.nodeValue);
      });

      if (nodes.length) {
        nodes[0].nodeValue = description;
      } else {
        textBlock.appendChild(document.createTextNode(description));
      }
    }

    if (href.indexOf("mailto:") === 0 && textBlock) {
      textBlock.style.maxWidth = "100%";
      textBlock.style.fontSize = "14px";
      textBlock.style.lineHeight = "1.35";
      textBlock.style.whiteSpace = "nowrap";
      textBlock.style.letterSpacing = "-0.01em";
    }
  }

  function updateContactPage() {
    document.title = "Contact Us | Crestline";
    setMeta(
      "description",
      "Contact Crestline (SMC-PVT) Limited for quotations, production timelines, and custom promotional textile inquiries."
    );

    updateFooter();
    ensureStyle(
      "crestline-contact-inline-style",
      ".crestline-contact-eyebrow{font-size:14px;line-height:1.4;color:#484848;margin-bottom:10px}.crestline-contact-headline{font-size:clamp(20px,2vw,24px);line-height:1.25;color:#00274D;font-weight:600;white-space:nowrap;margin:0}.crestline-contact-status{font-size:13px;line-height:1.5;margin-top:12px;padding:10px 14px;border-radius:14px}.crestline-contact-status--success{background:rgba(41,173,228,0.12);color:#0d4e73}.crestline-contact-status--error{background:rgba(239,68,68,0.1);color:#991b1b}@media (max-width: 767px){.crestline-contact-headline{white-space:normal}}"
    );

    var heading = Array.prototype.find.call(document.querySelectorAll("h1"), function (node) {
      var text = normalize(node.textContent);
      return text === "Talk to sales" || text === "Contact Crestline";
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-crestline-contact-summary]"), function (node) {
      node.remove();
    });

    if (heading && heading.parentElement) {
      var headingBox = heading.parentElement;
      var lines = Array.prototype.filter.call(headingBox.children, function (node) {
        return node.tagName === "P";
      });
      var eyebrow = lines[0] || document.createElement("p");

      if (!eyebrow.parentElement) {
        headingBox.insertBefore(eyebrow, heading);
      }

      eyebrow.className = "crestline-contact-eyebrow";
      setText(eyebrow, "Contact Crestline");

      setText(heading, "Let's discuss your next custom textile order.");
      heading.className = "crestline-contact-headline";

      Array.prototype.forEach.call(lines.slice(1), function (node) {
        hideNode(node);
      });

      headingBox.style.maxWidth = "100%";
    }

    var existingStatus = document.querySelector("[data-crestline-contact-status]");
    if (existingStatus) {
      existingStatus.remove();
    }

    var form = document.querySelector("form");

    var params = new URLSearchParams(window.location.search);

    if (heading && heading.parentElement && form) {
      var status = null;

      if (params.get("sent") === "1") {
        status = document.createElement("div");
        status.setAttribute("data-crestline-contact-status", "1");
        status.className = "crestline-contact-status crestline-contact-status--success";
        status.textContent = "Your inquiry has been sent successfully. Crestline will get back to you soon.";
      } else if (params.get("error") === "1") {
        status = document.createElement("div");
        status.setAttribute("data-crestline-contact-status", "1");
        status.className = "crestline-contact-status crestline-contact-status--error";
        status.textContent = "We could not send your inquiry right now. Please try again or email info@crestlinepromotion.com.";
      }

      if (status) {
        heading.parentElement.appendChild(status);
      }
    }

    var floatingDraft = null;
    var companyLabel = document.querySelector('label[for="company"]');
    var countryLabel = document.querySelector('label[for="country"]');
    var helpLabel = document.querySelector('label[for="help"]');
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var companyInput = document.getElementById("company");
    var countryInput = document.getElementById("country");
    var helpInput = document.getElementById("help");
    var submitButton = Array.prototype.find.call(document.querySelectorAll('button[type="submit"]'), function (node) {
      return normalize(node.textContent) === "Get in touch";
    });

    try {
      floatingDraft = JSON.parse(window.sessionStorage.getItem("crestlineFloatingInquiryDraft") || "null");
    } catch (error) {
      floatingDraft = null;
    }

    setText(companyLabel, "Company / Brand");
    setText(countryLabel, "Country / Market");
    setText(helpLabel, "Inquiry Details");

    if (companyInput) {
      companyInput.placeholder = "Company / Brand";
    }

    if (countryInput) {
      countryInput.placeholder = "Country / Market";
    }

    if (helpInput) {
      helpInput.placeholder = "Tell us the product, quantity, material, branding, and required delivery timeline";
    }

    if (nameInput && params.get("name") && !normalize(nameInput.value)) {
      nameInput.value = params.get("name");
    }

    if (emailInput && params.get("email") && !normalize(emailInput.value)) {
      emailInput.value = params.get("email");
    }

    if (companyInput && params.get("company") && !normalize(companyInput.value)) {
      companyInput.value = params.get("company");
    }

    if (countryInput && params.get("country") && !normalize(countryInput.value)) {
      countryInput.value = params.get("country");
    }

    if (helpInput && !normalize(helpInput.value)) {
      var prefills = [];
      if (params.get("product")) {
        prefills.push("Product type: " + params.get("product"));
      }
      if (params.get("quantity")) {
        prefills.push("Estimated quantity: " + params.get("quantity"));
      }
      if (params.get("help")) {
        prefills.push(params.get("help"));
      }
      if (prefills.length) {
        helpInput.value = prefills.join("\n");
      }
    }

    if (floatingDraft) {
      var floatingHelp = [];

      if (nameInput && floatingDraft.name && !normalize(nameInput.value)) {
        nameInput.value = floatingDraft.name;
      }

      if (emailInput && floatingDraft.email && !normalize(emailInput.value)) {
        emailInput.value = floatingDraft.email;
      }

      if (companyInput && floatingDraft.company && !normalize(companyInput.value)) {
        companyInput.value = floatingDraft.company;
      }

      if (countryInput && floatingDraft.country && !normalize(countryInput.value)) {
        countryInput.value = floatingDraft.country;
      }

      if (floatingDraft.phone) {
        floatingHelp.push("Phone: " + floatingDraft.phone);
      }

      if (floatingDraft.message) {
        floatingHelp.push(floatingDraft.message);
      }

      if (floatingDraft.help) {
        floatingHelp.push(floatingDraft.help);
      }

      if (helpInput && floatingHelp.length) {
        helpInput.value = normalize(helpInput.value)
          ? helpInput.value + "\n\n" + floatingHelp.join("\n\n")
          : floatingHelp.join("\n\n");
      }

      try {
        window.sessionStorage.removeItem("crestlineFloatingInquiryDraft");
      } catch (error) {
        // Ignore storage cleanup failures.
      }
    }

    if (form) {
      form.method = "POST";
      form.action = "/contact-submit.php";
      form.acceptCharset = "UTF-8";

      if (companyInput) {
        companyInput.required = true;
      }

      if (countryInput) {
        countryInput.required = true;
      }

      if (nameInput) {
        nameInput.required = true;
      }

      if (emailInput) {
        emailInput.required = true;
      }

      if (helpInput) {
        helpInput.required = true;
      }

      var honeypot = document.getElementById("website");
      if (!honeypot) {
        honeypot = document.createElement("input");
        honeypot.type = "text";
        honeypot.name = "website";
        honeypot.id = "website";
        honeypot.tabIndex = -1;
        honeypot.autocomplete = "off";
        honeypot.style.position = "absolute";
        honeypot.style.left = "-9999px";
        honeypot.setAttribute("aria-hidden", "true");
        form.appendChild(honeypot);
      }
    }

    setText(submitButton, "Send Inquiry");

    var cards = Array.prototype.filter.call(document.querySelectorAll("section a"), function (node) {
      return node.className && node.className.indexOf("md:max-w-[291px]") !== -1 && node.className.indexOf("h-[245px]") !== -1;
    });
    var cardsWrapper = cards.length ? cards[0].parentElement : null;

    if (cardsWrapper) {
      cardsWrapper.style.alignItems = "center";
    }

    updateContactCard(
      cards[0],
      "tel:+923301933319",
      "Call Us",
      "+92 330 1933319",
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.833 10.444C9.267 13.262 10.738 14.733 13.556 16.167L15.747 13.977C16.016 13.708 16.418 13.618 16.771 13.742C17.906 14.121 19.131 14.333 20.4 14.333C20.952 14.333 21.4 14.781 21.4 15.333V19.6C21.4 20.152 20.952 20.6 20.4 20.6C10.79 20.6 3 12.81 3 3.2C3 2.648 3.448 2.2 4 2.2H8.267C8.819 2.2 9.267 2.648 9.267 3.2C9.267 4.469 9.479 5.694 9.858 6.829C9.982 7.182 9.892 7.584 9.623 7.853L7.833 10.444Z" fill="#00274D"/></svg>'
    );
    updateContactCard(
      cards[1],
      "mailto:info@crestlinepromotion.com",
      "Email Us",
      "info@crestlinepromotion.com",
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.5H20C20.828 5.5 21.5 6.172 21.5 7V17C21.5 17.828 20.828 18.5 20 18.5H4C3.172 18.5 2.5 17.828 2.5 17V7C2.5 6.172 3.172 5.5 4 5.5ZM4.8 7.5L12 12.55L19.2 7.5H4.8ZM19.5 16.5V8.43L12.43 13.39C12.173 13.57 11.827 13.57 11.57 13.39L4.5 8.43V16.5H19.5Z" fill="#00274D"/></svg>'
    );
    updateContactCard(
      cards[2],
      "https://www.crestline.com.pk/",
      "Visit Website",
      "www.crestline.com.pk",
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.5C17.247 2.5 21.5 6.753 21.5 12C21.5 17.247 17.247 21.5 12 21.5C6.753 21.5 2.5 17.247 2.5 12C2.5 6.753 6.753 2.5 12 2.5ZM17.633 10.75H14.941C14.861 8.783 14.43 7.015 13.742 5.772C15.617 6.403 17.104 8.357 17.633 10.75ZM12 4.544C12.779 5.531 13.384 7.916 13.441 10.75H10.559C10.616 7.916 11.221 5.531 12 4.544ZM4.367 13.25H7.059C7.139 15.217 7.57 16.985 8.258 18.228C6.383 17.597 4.896 15.643 4.367 13.25ZM7.059 10.75H4.367C4.896 8.357 6.383 6.403 8.258 5.772C7.57 7.015 7.139 8.783 7.059 10.75ZM12 19.456C11.221 18.469 10.616 16.084 10.559 13.25H13.441C13.384 16.084 12.779 18.469 12 19.456ZM10.559 10.75H13.441C13.384 7.916 12.779 5.531 12 4.544C11.221 5.531 10.616 7.916 10.559 10.75ZM13.742 18.228C14.43 16.985 14.861 15.217 14.941 13.25H17.633C17.104 15.643 15.617 17.597 13.742 18.228Z" fill="#00274D"/></svg>'
    );
  }

  function runSync() {
    var path = window.location.pathname.replace(/\/+$/, "") || "/";

    ensureShellStyles();
    applyBrandingMeta(path);
    ensureFloatingWhatsApp();

    if (path === "/") {
      removeHomeInquirySection();
      ensureHomeAboutSection();
      return;
    }

    updateFooter();
    standardizeInfoPageNavigation();
    updateGlobalNavigation();

    if (path === "/about") {
      updateAboutPage();
      return;
    }

    if (path === "/pricing") {
      updatePricingPage();
      return;
    }

    if (path === "/contact-us") {
      updateContactPage();
    }
  }

  function isSyncSettled(path) {
    var hasWhatsApp = !!document.querySelector(".whatsapp-float-btn");
    var title = normalize(document.title).toLowerCase();

    if (!hasWhatsApp || title.indexOf("crestline") === -1) {
      return false;
    }

    if (path === "/") {
      return document.readyState === "complete" && !!document.querySelector("[data-crestline-home-about]");
    }

    return !!document.querySelector("footer");
  }

  function start() {
    var attempts = 0;
    var stablePasses = 0;
    var path = window.location.pathname.replace(/\/+$/, "") || "/";
    runSync();

    var timer = window.setInterval(function () {
      runSync();
      attempts += 1;

      if (isSyncSettled(path)) {
        stablePasses += 1;
      } else {
        stablePasses = 0;
      }

      if (stablePasses >= 2 || attempts >= 8) {
        window.clearInterval(timer);
      }
    }, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  window.addEventListener("load", runSync);
  window.addEventListener("pageshow", runSync);
})();
