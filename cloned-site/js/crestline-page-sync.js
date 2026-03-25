(function () {
  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function setMeta(name, content) {
    var meta = document.querySelector('meta[name="' + name + '"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  function setPropertyMeta(property, content) {
    var meta = document.querySelector('meta[property="' + property + '"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  function setLink(rel, href) {
    var link = document.querySelector('link[rel="' + rel + '"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = href;
  }

  function applySeo(title, description) {
    var canonicalUrl = window.location.href;
    document.title = title;
    setMeta("description", description);
    setMeta("robots", "index,follow");
    setMeta("application-name", "Crestline");
    setMeta("theme-color", "#e8faff");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", "/images/branding/crestline-logo.png");
    setLink("canonical", canonicalUrl);
    setPropertyMeta("og:site_name", "Crestline (SMC-PVT) Limited");
    setPropertyMeta("og:type", "website");
    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonicalUrl);
    setPropertyMeta("og:image", "/images/branding/crestline-logo.png");
    setPropertyMeta("og:image:alt", "Crestline (SMC-PVT) Limited logo");
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
    if (node) {
      node.textContent = text;
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
      ".crestline-nav-dropdown-item{list-style:none;display:flex;align-items:center}.crestline-nav-dropdown{position:relative;display:inline-flex;align-items:center}.crestline-nav-trigger{appearance:none;border:none;background:transparent;color:inherit;font:inherit;padding:.5rem .5rem;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:.45rem;cursor:pointer;transition:color .2s ease,background-color .2s ease}.crestline-nav-trigger:hover,.crestline-nav-trigger:focus-visible{color:#26ade3;outline:none}.crestline-nav-chevron{width:.85rem;height:.85rem;transition:transform .22s ease}.crestline-nav-dropdown:hover .crestline-nav-chevron,.crestline-nav-dropdown:focus-within .crestline-nav-chevron{transform:rotate(180deg)}.crestline-nav-panel{position:absolute;top:calc(100% + 14px);left:50%;transform:translateX(-50%) translateY(12px);min-width:248px;padding:.85rem;border-radius:22px;border:1px solid rgba(157,193,255,.45);background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(244,249,255,.9));box-shadow:0 22px 60px rgba(0,39,77,.12),inset 0 1px 0 rgba(255,255,255,.7);backdrop-filter:blur(28px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s ease,transform .2s ease,visibility .2s ease;z-index:60}.crestline-nav-dropdown:hover .crestline-nav-panel,.crestline-nav-dropdown:focus-within .crestline-nav-panel{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}.crestline-nav-link{display:block;padding:.8rem .9rem;border-radius:16px;color:#00274d;font-size:.92rem;line-height:1.35;text-align:left;transition:background-color .2s ease,color .2s ease,transform .2s ease;white-space:nowrap}.crestline-nav-link:hover,.crestline-nav-link:focus-visible{background:rgba(41,173,228,.08);color:#26ade3;outline:none;transform:translateX(2px)}@media (max-width:1023px){.crestline-nav-panel{left:0;transform:translateX(0) translateY(12px);min-width:min(280px,82vw)}.crestline-nav-dropdown:hover .crestline-nav-panel,.crestline-nav-dropdown:focus-within .crestline-nav-panel{transform:translateX(0) translateY(0)}}"
    );
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
      '<a href="/contact-us" type="button" class="group relative items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 rounded-full bg-gradient-to-b from-global to-[#9DC1FF] hover:!bg-transparent hover:outline-solid hidden lg:block"><span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm"><span class="leading-0 text-[15px] font-extralight text-center !p-0 w-full">Get Quotation</span></span></a>' +
      "</div>" +
      '<div class="items-center justify-center hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-sticky">' +
      '<ul class="flex flex-col xl:p-0 font-medium xl:space-x-3 rtl:space-x-reverse lg:flex-row xl:mt-0 xl:border-0 text-gray-900 dark:bg-gray-800 xl:dark:bg-gray-900 dark:border-gray-700 text-center text-[15px] lg:max-w-[1100px] font-normal">' +
      '<li><a class="block py-2 lg:px-2 rounded-sm md:hover:bg-transparent md:hover:text-[#26ade3] transition-all transition-1000 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/">Home</a></li>' +
      '<li><a class="block py-2 lg:px-2 rounded-sm md:hover:bg-transparent md:hover:text-[#26ade3] transition-all transition-1000 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/about">About Us</a></li>' +
      '<li><a class="block py-2 lg:px-2 rounded-sm md:hover:bg-transparent md:hover:text-[#26ade3] transition-all transition-1000 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/contact-us">Contact</a></li>' +
      '<div class="xl:hidden gap-4 items-center flex flex-col mt-2"><a href="/contact-us" type="button" class="group relative items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 rounded-full bg-gradient-to-b from-global to-[#9DC1FF] hover:!bg-transparent hover:outline-solid block lg:hidden"><span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm"><span class="leading-0 text-[15px] font-extralight text-center !p-0 w-full">Get Quotation</span></span></a></div>' +
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
    var body = document.body;
    if (!body || !body.dataset || !body.dataset.infoPage) {
      return;
    }

    var nav = document.querySelector("body[data-info-page] nav");
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
      var brandQuoteButton = brandColumn.querySelector("[data-crestline-footer-quote]");
      if (!brandQuoteButton) {
        brandQuoteButton = document.createElement("a");
        brandQuoteButton.setAttribute("data-crestline-footer-quote", "1");
        brandQuoteButton.href = "/contact-us";
        brandQuoteButton.className =
          "rounded-full w-fit inline-flex text-[12.98px] gap-2 bg-gradient-to-r from-[#26ADE3] to-[#26ADE329] text-white items-center p-1 pl-[8px] font-extralight mt-5 mx-auto md:mx-0";
        brandQuoteButton.innerHTML =
          'Get Quotation<div class="w-[30.96px] h-[30.96px] flex items-center justify-center bg-white rounded-full"><svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.7077 1.57031C6.7077 1.15667 6.37238 0.821354 5.95874 0.821354C5.5451 0.821354 5.20978 1.15667 5.20978 1.57031L6.7077 1.57031ZM5.42915 16.0805C5.72163 16.3729 6.19585 16.3729 6.48833 16.0805L11.2547 11.3141C11.5472 11.0216 11.5472 10.5474 11.2547 10.2549C10.9622 9.96245 10.488 9.96245 10.1955 10.2549L5.95874 14.4917L1.72199 10.2549C1.4295 9.96245 0.95529 9.96245 0.662804 10.2549C0.370318 10.5474 0.370318 11.0216 0.662804 11.3141L5.42915 16.0805ZM5.95874 1.57031L5.20978 1.57031L5.20978 15.5509L5.95874 15.5509L6.7077 15.5509L6.7077 1.57031L5.95874 1.57031Z" fill="#29ADE4"></path></svg></div>';

        if (brandText) {
          brandText.insertAdjacentElement("afterend", brandQuoteButton);
        } else {
          brandColumn.appendChild(brandQuoteButton);
        }
      }
    }

    if (linksColumn) {
      linksColumn.innerHTML =
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
    }

    if (ctaColumn) {
      var title = ctaColumn.querySelector("p");
      var input = ctaColumn.querySelector("input");
      var button = ctaColumn.querySelector("button");

      setText(title, "Start Your Next Custom Project");

      if (input) {
        input.placeholder = "Enter Your Email";
      }

      setText(button, "Send Inquiry");
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

  function updateAboutPage() {
    applySeo(
      "About Us | Crestline",
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

        var cardButton = Array.prototype.find.call(card.querySelectorAll("a"), function (link) {
          var href = (link.getAttribute("href") || "").toLowerCase();
          return href.indexOf("demo.") !== -1 || href.indexOf("/contact-us") !== -1;
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
    applySeo(
      "Pricing & Lead Times | Crestline",
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
        !!node.querySelector('img[src*="accouting-db-crestline.webp"]')
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
    applySeo(
      "Contact Us | Crestline",
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

    var cards = Array.prototype.filter.call(document.querySelectorAll("section a"), function (link) {
      var href = (link.getAttribute("href") || "").toLowerCase();
      return href.indexOf("demo.") !== -1 || href.indexOf("/contact-us") !== -1;
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

  function start() {
    var attempts = 0;
    runSync();

    var timer = window.setInterval(function () {
      runSync();
      attempts += 1;
      if (attempts >= 12) {
        window.clearInterval(timer);
      }
    }, 400);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  window.addEventListener("load", runSync);
})();
