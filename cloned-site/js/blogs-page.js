(function () {
  var BLOG_POSTS = window.CRESTLINE_BLOG_POSTS || [];
  var state = {
    query: "",
    topic: "all",
    length: "all"
  };

  var searchInput = document.getElementById("blogSearch");
  var topicFilter = document.getElementById("blogTopicFilter");
  var lengthFilter = document.getElementById("blogLengthFilter");
  var topicChipsRoot = document.getElementById("blogTopicChips");
  var featuredGrid = document.getElementById("blogsFeaturedGrid");
  var archiveGrid = document.getElementById("blogsList");
  var resultsMeta = document.getElementById("blogsResultsMeta");
  var emptyState = document.getElementById("blogsEmptyState");
  var readLatestLink = document.getElementById("blogsReadLatest");
  var heroLeadTopic = document.getElementById("heroLeadTopic");
  var heroLeadTitle = document.getElementById("heroLeadTitle");
  var heroLeadExcerpt = document.getElementById("heroLeadExcerpt");
  var heroLeadMeta = document.getElementById("heroLeadMeta");
  var heroLeadLink = document.getElementById("heroLeadLink");

  function getTopics() {
    var seen = {};
    BLOG_POSTS.forEach(function (post) {
      seen[post.topic] = true;
    });

    return Object.keys(seen).sort();
  }

  function getLengthBucket(readTime) {
    if (readTime <= 4) {
      return "short";
    }
    if (readTime <= 6) {
      return "medium";
    }
    return "long";
  }

  function matchesFilters(post) {
    var haystack = [post.title, post.excerpt, post.topic, post.author].join(" ").toLowerCase();
    var matchesQuery = !state.query || haystack.indexOf(state.query) !== -1;
    var matchesTopic = state.topic === "all" || post.topic === state.topic;
    var matchesLength = state.length === "all" || getLengthBucket(post.readTime) === state.length;
    return matchesQuery && matchesTopic && matchesLength;
  }

  function getArticleHref(slug) {
    return "/blogs/article/?slug=" + encodeURIComponent(slug);
  }

  function createTakeawayList(post, compact) {
    var items = post.takeaways.slice(0, compact ? 2 : 3).map(function (item) {
      return "<li>" + item + "</li>";
    }).join("");

    return (
      '<div class="blog-cover-inside">' +
      '<span class="blog-cover-label">Inside this article</span>' +
      '<ul class="blog-cover-points">' + items + "</ul>" +
      "</div>"
    );
  }

  function renderHero() {
    var lead = BLOG_POSTS.filter(function (post) {
      return post.featured;
    })[0] || BLOG_POSTS[0];

    if (!lead) {
      return;
    }

    if (readLatestLink) {
      readLatestLink.href = getArticleHref(lead.slug);
    }
    if (heroLeadLink) {
      heroLeadLink.href = getArticleHref(lead.slug);
    }
    if (heroLeadTopic) {
      heroLeadTopic.textContent = lead.topic;
    }
    if (heroLeadTitle) {
      heroLeadTitle.textContent = lead.title;
    }
    if (heroLeadExcerpt) {
      heroLeadExcerpt.textContent = lead.excerpt;
    }
    if (heroLeadMeta) {
      heroLeadMeta.innerHTML =
        "<span>" + lead.date + "</span>" +
        "<span>" + lead.readTime + " min read</span>" +
        "<span>" + lead.author + "</span>";
    }
  }

  function renderTopicControls() {
    var topics = getTopics();

    if (topicFilter) {
      topicFilter.innerHTML =
        '<option value="all">All topics</option>' +
        topics.map(function (topic) {
          return '<option value="' + topic + '">' + topic + "</option>";
        }).join("");
      topicFilter.value = state.topic;
    }

    if (topicChipsRoot) {
      topicChipsRoot.innerHTML =
        '<button class="blog-topic-chip' + (state.topic === "all" ? " is-active" : "") + '" data-topic="all">All topics</button>' +
        topics.map(function (topic) {
          return (
            '<button class="blog-topic-chip' + (state.topic === topic ? " is-active" : "") + '" data-topic="' + topic + '">' +
            topic +
            "</button>"
          );
        }).join("");
    }
  }

  function renderFeatured(posts) {
    var featuredPosts = posts.filter(function (post) {
      return post.featured;
    }).slice(0, 3);

    if (!featuredPosts.length) {
      featuredGrid.innerHTML = "";
      return;
    }

    var lead = featuredPosts[0];
    var stack = featuredPosts.slice(1);

    featuredGrid.innerHTML =
      '<a class="blog-feature-card" href="' + getArticleHref(lead.slug) + '">' +
      '<div class="blog-feature-cover" data-tone="' + lead.tone + '">' +
      '<div class="blog-feature-cover-inner">' +
      '<span class="blog-feature-topic">' + lead.topic + "</span>" +
      createTakeawayList(lead, false) +
      "</div>" +
      "</div>" +
      '<div class="blog-feature-body">' +
      '<div class="blog-meta-row"><span>' + lead.date + "</span><span>" + lead.readTime + " min read</span><span>" + lead.author + "</span></div>" +
      "<h3>" + lead.title + "</h3>" +
      "<p>" + lead.excerpt + "</p>" +
      '<span class="blog-card-cta">Read article</span>' +
      "</div>" +
      "</a>" +
      '<div class="blogs-featured-stack">' +
      stack.map(function (post) {
        return (
          '<a class="blog-feature-card" href="' + getArticleHref(post.slug) + '">' +
          '<div class="blog-feature-cover" data-tone="' + post.tone + '">' +
          '<div class="blog-feature-cover-inner">' +
          '<span class="blog-feature-topic">' + post.topic + "</span>" +
          createTakeawayList(post, true) +
          "</div>" +
          "</div>" +
          '<div class="blog-feature-body">' +
          '<div class="blog-meta-row"><span>' + post.date + "</span><span>" + post.readTime + " min read</span></div>" +
          "<h3>" + post.title + "</h3>" +
          "<p>" + post.excerpt + "</p>" +
          '<span class="blog-card-cta">Read article</span>' +
          "</div>" +
          "</a>"
        );
      }).join("") +
      "</div>";
  }

  function renderArchive(posts) {
    archiveGrid.innerHTML = posts.map(function (post) {
      return (
        '<a class="blog-card" href="' + getArticleHref(post.slug) + '">' +
        '<div class="blog-card-cover" data-tone="' + post.tone + '">' +
        '<div class="blog-card-cover-inner">' +
        '<span class="blog-card-topic">' + post.topic + "</span>" +
        createTakeawayList(post, true) +
        "</div>" +
        "</div>" +
        '<div class="blog-card-body">' +
        '<div class="blog-meta-row"><span>' + post.date + "</span><span>" + post.readTime + " min read</span><span>" + post.author + "</span></div>" +
        "<h3>" + post.title + "</h3>" +
        "<p>" + post.excerpt + "</p>" +
        '<span class="blog-card-cta">Read article</span>' +
        "</div>" +
        "</a>"
      );
    }).join("");
  }

  function describeState(posts) {
    if (!posts.length) {
      return "No articles match the current filters. Try another topic, keyword, or read length.";
    }

    var fragments = [];

    if (state.topic !== "all") {
      fragments.push("topic: " + state.topic);
    }
    if (state.length !== "all") {
      fragments.push("length: " + state.length);
    }
    if (state.query) {
      fragments.push('search: "' + state.query + '"');
    }

    if (!fragments.length) {
      return "Explore Crestline editorials on product development, materials, quality control, sustainability, and production planning.";
    }

    return "Showing articles filtered by " + fragments.join(" | ") + ".";
  }

  function renderResults() {
    var filtered = BLOG_POSTS.filter(matchesFilters);

    renderFeatured(filtered);
    renderArchive(filtered);
    renderTopicControls();

    if (resultsMeta) {
      resultsMeta.textContent = describeState(filtered);
    }
    if (emptyState) {
      emptyState.hidden = filtered.length !== 0;
    }
    if (archiveGrid) {
      archiveGrid.hidden = filtered.length === 0;
    }
  }

  document.addEventListener("click", function (event) {
    var chip = event.target.closest("[data-topic]");
    if (!chip) {
      return;
    }

    state.topic = chip.getAttribute("data-topic");
    renderResults();
  });

  if (searchInput) {
    searchInput.addEventListener("input", function (event) {
      state.query = (event.target.value || "").trim().toLowerCase();
      renderResults();
    });
  }

  if (topicFilter) {
    topicFilter.addEventListener("change", function (event) {
      state.topic = event.target.value;
      renderResults();
    });
  }

  if (lengthFilter) {
    lengthFilter.addEventListener("change", function (event) {
      state.length = event.target.value;
      renderResults();
    });
  }

  renderHero();
  renderResults();
})();
