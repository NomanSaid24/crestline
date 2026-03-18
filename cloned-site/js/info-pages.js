(function () {
  function setMetaDescription(content) {
    var meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  function createHighlight(item) {
    var card = document.createElement("div");
    card.className = "info-page-highlight";
    card.innerHTML = "<strong>" + item.title + "</strong><span>" + item.text + "</span>";
    return card;
  }

  function sectionId(title) {
    return (
      "section-" +
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );
  }

  function createJumpButton(title) {
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = title;
    button.addEventListener("click", function () {
      var target = document.getElementById(sectionId(title));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    return button;
  }

  function renderTextSections(container, sections) {
    container.innerHTML = "";
    sections.forEach(function (section) {
      var card = document.createElement("article");
      card.className = "info-page-section-card";
      card.id = sectionId(section.title);

      var html = "<h2>" + section.title + "</h2>";
      section.paragraphs.forEach(function (paragraph) {
        html += "<p>" + paragraph + "</p>";
      });

      card.innerHTML = html;
      container.appendChild(card);
    });
  }

  function renderCertifications(container, certifications) {
    container.innerHTML = "";
    var grid = document.createElement("div");
    grid.className = "info-page-cert-grid";

    certifications.forEach(function (cert) {
      var card = document.createElement("article");
      card.className = "info-page-cert-card";
      card.id = sectionId(cert.title);
      card.innerHTML =
        '<div class="info-page-cert-top">' +
        '<div><div class="info-page-cert-scope">Scope / Ref</div><h3>' +
        cert.title +
        "</h3></div>" +
        '<div class="info-page-cert-badge">' +
        cert.code +
        "</div>" +
        "</div>" +
        "<p><strong>" +
        cert.scope +
        "</strong></p>" +
        "<p>" +
        cert.text +
        "</p>";
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  function renderPillars(container, pillars) {
    container.innerHTML = "";
    var grid = document.createElement("div");
    grid.className = "info-page-pillars";

    pillars.forEach(function (pillar) {
      var card = document.createElement("article");
      card.className = "info-page-pillar-card";
      card.id = sectionId(pillar.title);
      card.innerHTML =
        '<div class="info-page-chip">Customer Principle</div>' +
        "<h3>" +
        pillar.title +
        "</h3>" +
        "<p>" +
        pillar.text +
        "</p>";
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  function renderSupport(supportRoot, page, isCustomerPage) {
    supportRoot.innerHTML = "";

    var noteCard = document.createElement("div");
    noteCard.className = "info-page-support-card";
    noteCard.innerHTML =
      '<span class="info-page-card-label">' +
      page.support.label +
      "</span>" +
      "<h3>" +
      page.support.title +
      "</h3>" +
      "<p>" +
      page.support.text +
      "</p>";
    supportRoot.appendChild(noteCard);

    if (isCustomerPage) {
      var illustration = document.createElement("div");
      illustration.className = "info-page-support-card info-page-support-card--accent info-page-illustration";
      illustration.innerHTML =
        '<span class="info-page-card-label">Satisfaction Snapshot</span>' +
        '<div class="info-page-scorecard">' +
        "<h4>What customers value most</h4>" +
        '<div class="info-page-score-row"><span>Quality consistency</span><span class="info-page-score-pill">Core</span></div>' +
        '<div class="info-page-score-row"><span>Reliable timelines</span><span class="info-page-score-pill">High</span></div>' +
        '<div class="info-page-score-row"><span>Compliance alignment</span><span class="info-page-score-pill">High</span></div>' +
        '<div class="info-page-score-row"><span>Responsible production</span><span class="info-page-score-pill">Essential</span></div>' +
        "</div>";
      supportRoot.appendChild(illustration);
      return;
    }

    var ctaCard = document.createElement("div");
    ctaCard.className = "info-page-support-card info-page-support-card--accent";
    ctaCard.innerHTML =
      '<span class="info-page-card-label">Talk to Crestline</span>' +
      "<h3>Need details for a live project?</h3>" +
      "<p>Move from information to action with a quotation or customer inquiry tailored to your product brief.</p>" +
      '<a class="info-page-summary-link" href="/contact-us">Start a customer inquiry</a>';
    supportRoot.appendChild(ctaCard);
  }

  function renderPage(page) {
    document.title = page.pageTitle;
    setMetaDescription(page.metaDescription);

    document.getElementById("infoPageBadge").textContent = page.badge;
    document.getElementById("infoPageTitle").textContent = page.title;
    document.getElementById("infoPageIntro").textContent = page.intro;

    var highlightsRoot = document.getElementById("infoPageHighlights");
    highlightsRoot.innerHTML = "";
    page.highlights.forEach(function (item) {
      highlightsRoot.appendChild(createHighlight(item));
    });

    document.getElementById("infoPageSummaryLabel").textContent = page.summary.label;
    document.getElementById("infoPageSummaryTitle").textContent = page.summary.title;
    document.getElementById("infoPageSummaryText").textContent = page.summary.text;

    var jumpList = document.getElementById("infoPageJumpList");
    jumpList.innerHTML = "";

    if (page.sections) {
      page.sections.forEach(function (section) {
        jumpList.appendChild(createJumpButton(section.title));
      });
      renderTextSections(document.getElementById("infoPageSections"), page.sections);
    } else if (page.certifications) {
      page.certifications.forEach(function (cert) {
        jumpList.appendChild(createJumpButton(cert.title));
      });
      renderCertifications(document.getElementById("infoPageSections"), page.certifications);
    } else if (page.pillars) {
      page.pillars.forEach(function (pillar) {
        jumpList.appendChild(createJumpButton(pillar.title));
      });
      renderPillars(document.getElementById("infoPageSections"), page.pillars);
    }

    renderSupport(document.getElementById("infoPageSupport"), page, Boolean(page.pillars));
  }

  function start() {
    var pageKey = document.body.getAttribute("data-info-page");
    var pages = window.CRESTLINE_INFO_PAGES || {};
    var page = pages[pageKey];

    if (!page) {
      return;
    }

    renderPage(page);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
