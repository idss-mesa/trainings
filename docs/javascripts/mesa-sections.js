/* MESA Trainings — section pages.

   A section's index.md is a heading, one sentence, and a list of
   "[Title](page) - description" bullets (AGENTS.md rule 2). That list is what
   agents and readers without scripts get. Here it is redrawn as cards: the
   title, the description on its own line, and for a numbered page such as
   "Trace card 4: …" the number set apart. Nothing is added that the list does
   not say. The Tutorials and Pathways sections are drawn by mesa-pathways.js
   and are left alone. */
(function () {
  "use strict";

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  /* "Title - description" bullets only: a link first, then " - " and text. */
  function entry(item) {
    var link = item.firstElementChild;
    if (!link || link.tagName !== "A" || item.children.length !== 1) return null;
    var rest = item.textContent.slice(link.textContent.length);
    var match = /^\s+[-–—]\s+(\S[\s\S]*)$/.exec(rest);
    return match ? { link: link, text: match[1].trim() } : null;
  }

  function draw() {
    var article = document.querySelector("article.md-content__inner");
    if (!article || article.hasAttribute("data-mesa-section")) return;
    if (/\/(tutorials|pathways)\/$/.test(location.pathname)) return; /* drawn by mesa-pathways.js */
    var heading = article.querySelector(":scope > h1");
    var list = article.querySelector(":scope > ul");
    if (!heading || !list || article.querySelectorAll(":scope > ul, :scope > ol, :scope > h2").length !== 1) return;
    var items = [].slice.call(list.children);
    var entries = items.map(entry);
    if (entries.length < 2 || entries.some(function (e) { return !e; })) return;

    article.setAttribute("data-mesa-section", "");
    var lede = heading.nextElementSibling;
    if (lede && lede.tagName === "P") lede.classList.add("mesa-lede");
    list.classList.add("mesa-cards");
    items.forEach(function (item, index) {
      var found = entries[index];
      var title = found.link.textContent;
      var numbered = /^(.*\S\s+\d+):\s+(\S.*)$/.exec(title);
      var guide = index === 0 && /^How to /.test(title);
      item.textContent = "";
      item.className = "mesa-card" + (guide ? " mesa-card--guide" : "");
      if (guide) item.appendChild(el("p", "mesa-card__kicker", "Start here"));
      else if (numbered) item.appendChild(el("p", "mesa-card__kicker", numbered[1]));
      found.link.className = "mesa-card__title";
      if (numbered && !guide) {
        found.link.setAttribute("aria-label", title);
        found.link.textContent = numbered[2].charAt(0).toUpperCase() + numbered[2].slice(1);
      }
      item.appendChild(found.link);
      item.appendChild(el("p", "mesa-card__text", found.text));
    });
  }

  draw();
  if (window.document$ && typeof window.document$.subscribe === "function") window.document$.subscribe(draw);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", draw);
})();
