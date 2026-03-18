(function () {
  var BLOG_POSTS = window.CRESTLINE_BLOG_POSTS || [];
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");
  var article = BLOG_POSTS.find(function (post) {
    return post.slug === slug;
  }) || BLOG_POSTS[0];

  if (!article) {
    return;
  }

  var related = BLOG_POSTS.filter(function (post) {
    return post.slug !== article.slug;
  }).sort(function (a, b) {
    if (a.topic === article.topic && b.topic !== article.topic) {
      return -1;
    }
    if (a.topic !== article.topic && b.topic === article.topic) {
      return 1;
    }
    return 0;
  }).slice(0, 3);

  document.title = article.title + " | Blogs | Crestline";

  document.getElementById("articleBreadcrumbTopic").textContent = article.topic;
  document.getElementById("articleBreadcrumbTitle").textContent = article.title;
  document.getElementById("articleTopic").textContent = article.topic;
  document.getElementById("articleTitle").textContent = article.title;
  document.getElementById("articleExcerpt").textContent = article.excerpt;
  document.getElementById("articleDate").textContent = article.date;
  document.getElementById("articleReadTime").textContent = article.readTime + " min read";
  document.getElementById("articleAuthor").textContent = article.author;
  document.getElementById("articleLead").textContent = article.intro;

  document.getElementById("articleTakeaways").innerHTML = article.takeaways.map(function (item) {
    return "<li>" + item + "</li>";
  }).join("");

  document.getElementById("articleSections").innerHTML = article.sections.map(function (section) {
    return (
      '<section class="blog-article-section">' +
      "<h2>" + section.heading + "</h2>" +
      section.paragraphs.map(function (paragraph) {
        return "<p>" + paragraph + "</p>";
      }).join("") +
      "</section>"
    );
  }).join("");

  document.getElementById("relatedArticles").innerHTML = related.map(function (post) {
    return (
      '<a href="/blogs/article/?slug=' + encodeURIComponent(post.slug) + '">' +
      '<span class="blog-article-related-topic">' + post.topic + "</span>" +
      '<span class="blog-article-related-title">' + post.title + "</span>" +
      '<span class="blog-article-related-meta">' + post.date + " | " + post.readTime + " min read</span>" +
      "</a>"
    );
  }).join("");
})();
