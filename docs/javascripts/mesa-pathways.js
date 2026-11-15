/* MESA Trainings: draws the reader's progress onto the pages.

   The pages are complete without this script: pathway pages are ordered lists
   of links. This script turns those lists into a path with stops, marks what
   the reader has finished, and adds the "mark as done" strip to tutorials.

   It reads one static file (assets/pathways.json) and the record kept in this
   browser by mesa-progress.js. It sends nothing: no request carries anything
   about the reader. With `navigation.instant` on, the theme swaps pages without
   a reload, so everything here runs again on each page through `document$`. */
(function () {
  "use strict";
  var P = window.MesaProgress;
  if (!P || !document.currentScript || window.__mesaPathways) return;
  window.__mesaPathways = true; /* the theme may run this file again on an in-site navigation */

  var BASE = new URL("..", document.currentScript.src).href;
  var LABEL = { todo: "Not started", next: "Next", done: "Done", checked: "Checked" };
  var LEVELS = [
    ["", "Not chosen", ""],
    ["exploring", "Exploring", "I can do this with a tutorial open."],
    ["investigating", "Investigating", "I can do this on prepared data without a guide."],
    ["extending", "Extending", "I can do this on my own data and explain my choices to someone else."]
  ];
  var manifestRequest = null;
  var view = null; /* what is drawn on the current page: { paint } */

  /* ---------- small helpers ---------- */

  function el(tag, props, kids) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "class") node.className = props[k];
      else if (k === "text") node.textContent = props[k];
      else if (k.slice(0, 2) === "on") node.addEventListener(k.slice(2), props[k]);
      else if (props[k] !== false && props[k] !== null && props[k] !== undefined) node.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (kid) {
      if (kid) node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    });
    return node;
  }

  /* Text that may hold `code` in backticks, as it does in the tutorials. */
  function inline(text) {
    return String(text).split("`").map(function (part, i) {
      return i % 2 ? el("code", { text: part }) : part;
    });
  }

  function storage() {
    try { return window.localStorage; } catch (e) { return { getItem: function () { throw e; } }; }
  }

  function manifest() {
    if (!manifestRequest) {
      manifestRequest = fetch(BASE + "assets/pathways.json", { credentials: "omit" })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .catch(function () { manifestRequest = null; return null; });
    }
    return manifestRequest;
  }

  function tutorialUrl(name) { return BASE + "tutorials/" + name + "/"; }
  function pathwayUrl(id) { return BASE + "pathways/" + id + "/"; }

  /* The tutorial a link points to, or "" (ignores the tutorial list itself). */
  function tutorialOf(link) {
    var href = link && link.href ? link.href.split("#")[0].split("?")[0] : "";
    var found = href.indexOf(BASE + "tutorials/") === 0 && href.slice((BASE + "tutorials/").length).replace(/\/$/, "");
    return found && found.indexOf("/") < 0 && found !== "index.html" ? found : "";
  }

  function here() {
    var rel = location.href.split("#")[0].split("?")[0];
    rel = rel.indexOf(BASE) === 0 ? rel.slice(BASE.length).replace(/index\.html$/, "") : "";
    var parts = rel.split("/").filter(Boolean);
    if (parts[0] === "tutorials") return parts[1] ? { kind: "tutorial", name: parts[1] } : { kind: "tutorials" };
    if (parts[0] === "pathways") return parts[1] ? { kind: "pathway", id: parts[1] } : { kind: "pathways" };
    if (parts[0] === "pathway") return { kind: "points" };
    if (parts[0] === "progress") return { kind: "progress" };
    return { kind: "other" };
  }

  function day(iso) {
    var p = iso.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  }

  function announce(text) {
    var live = document.getElementById("mesa-live");
    if (!live) {
      live = el("div", { id: "mesa-live", class: "mesa-vh", role: "status", "aria-live": "polite" });
      document.body.appendChild(live);
    }
    live.textContent = "";
    window.setTimeout(function () { live.textContent = text; }, 50);
  }

  function bar(done, total) {
    var fill = el("i");
    fill.style.width = (total ? Math.round(100 * done / total) : 0) + "%";
    return el("div", { class: "mesa-bar", "aria-hidden": "true" }, [fill]);
  }

  function box(state) { return el("span", { class: "mesa-box is-" + state, "aria-hidden": "true" }); }

  function writable(store) { return store.status !== "newer" && store.status !== "unavailable"; }

  function change(store, fn) {
    if (!writable(store)) return false;
    fn(store.record);
    return P.save(storage(), store.record);
  }

  /* What a finished tutorial accomplished, in its own words. */
  function accomplished(m, record, name) {
    var facts = m.tutorials[name], entry = record.tutorials[name];
    var lines = [el("p", {}, ["You marked this done on " + day(entry.done) + "."])];
    if (entry.checked) lines.push(el("p", {}, ["Checked on " + day(entry.checked) + ": you answered its self-check correctly."]));
    lines.push(el("p", {}, facts.outcome ? ["You set out to "].concat(inline(facts.outcome)) : inline(facts.description)));
    return lines;
  }

  function continueBlock(m, record, pathway) {
    var got = P.route(pathway, record, m);
    if (!got.next) {
      return el("div", { class: "mesa-continue" }, [el("div", {}, [
        el("p", { class: "mesa-kicker", text: "Pathway finished" }),
        el("p", { class: "mesa-continue__title", text: pathway.title }),
        el("p", { class: "mesa-muted", text: got.done === got.total ? "All " + got.total + " tutorials are marked done."
          : got.done + " of " + got.total + " tutorials are marked done; the rest you skipped by check." })
      ]), el("a", { class: "mesa-btn mesa-btn--plain", href: BASE + "pathways/", text: "Choose another pathway" })]);
    }
    var facts = m.tutorials[got.next];
    return el("div", { class: "mesa-continue" }, [el("div", {}, [
      el("p", { class: "mesa-kicker", text: (got.done ? "Continue" : "Start") + " · " + pathway.title }),
      el("p", { class: "mesa-continue__title", text: facts.title }),
      el("p", { class: "mesa-muted", text: P.minutes(facts.min, facts.max) })
    ]), el("a", { class: "mesa-btn", href: tutorialUrl(got.next), "data-mesa-pathway": pathway.id,
      text: got.done ? "Continue" : "Start" })]);
  }

  /* ---------- self-checks and reflections ---------- */

  var SURE = [[1, "A guess"], [2, "Not sure"], [3, "Fairly sure"], [4, "Certain"]];
  var tries = {}; /* what the reader last did with each check on this visit: { kind, message, value, sure } */

  function answerLine(check) {
    var parts = [el("strong", { text: check.answer + (check.unit ? " " + check.unit : "") }), ". " + check.right];
    return parts;
  }

  /* One self-check: the question, an answer, an optional "how sure", and feedback. */
  function checkForm(m, store, id) {
    var check = m.checks[id], record = store.record;
    var mine = tries[id] || (tries[id] = {});
    var solved = P.isCorrect(record, id) || mine.kind === "right";
    var ask = "mesa-ask-" + id;
    var form = el("form", { class: "mesa-check" + (solved ? " is-right" : ""), novalidate: "novalidate" });
    form.appendChild(el("p", { class: "mesa-check__ask", id: ask }, inline(check.ask)));
    if (!Object.keys(check.verify).length) {
      form.appendChild(el("p", { class: "mesa-note", text: "About a portal screen, so not machine-checked against the practice data." }));
    }
    var how = check.how ? el("pre", { class: "mesa-check__how" }, [el("code", { text: check.how })]) : null;

    if (solved) {
      var entry = record.checks[id];
      form.appendChild(el("p", { class: "mesa-check__result is-right", tabindex: "-1", "data-key": "check-" + id },
        [box("checked"), " Right: "].concat(answerLine(check))));
      if (how) form.appendChild(how);
      if (entry) form.appendChild(el("p", { class: "mesa-note", text: "Answered on " + day(entry.on) + ", in " + entry.tries + (entry.tries === 1 ? " try." : " tries.") }));
      return form;
    }

    var read;
    if (check.options.length) {
      var group = el("div", { class: "mesa-check__options", role: "radiogroup", "aria-labelledby": ask });
      check.options.forEach(function (option) {
        var radio = el("input", { type: "radio", name: "mesa-answer-" + id, value: option });
        radio.checked = mine.value === option;
        group.appendChild(el("label", {}, [radio, el("span", { text: option })]));
      });
      form.appendChild(group);
      read = function () { var on = group.querySelector("input:checked"); return on ? on.value : ""; };
    } else {
      var input = el("input", { type: "text", inputmode: "decimal", autocomplete: "off", class: "mesa-check__input",
        "aria-labelledby": ask, value: mine.value || "", "data-key": "answer-" + id });
      form.appendChild(el("div", { class: "mesa-check__number" }, [input, check.unit ? el("span", { text: check.unit }) : null]));
      read = function () { return input.value; };
    }

    var sure = el("fieldset", { class: "mesa-check__sure" }, [el("legend", { text: "How sure are you? Optional." })]);
    SURE.forEach(function (level) {
      var radio = el("input", { type: "radio", name: "mesa-sure-" + id, value: String(level[0]) });
      radio.checked = mine.sure === level[0];
      sure.appendChild(el("label", {}, [radio, el("span", { text: level[1] })]));
    });
    form.appendChild(sure);
    var readSure = function () { var on = sure.querySelector("input:checked"); return on ? Number(on.value) : 0; };

    form.appendChild(el("div", { class: "mesa-check__actions" }, [
      el("button", { type: "submit", class: "mesa-btn", "data-key": "check-" + id, text: "Check answer" }),
      el("button", { type: "button", class: "mesa-btn mesa-btn--plain", "data-key": "show-" + id, text: "Show the answer",
        onclick: function () {
          tries[id] = { kind: "shown", value: read(), sure: readSure() };
          refresh("show-" + id);
          announce("The answer is " + check.answer + (check.unit ? " " + check.unit : "") + ". " + check.right);
        } })
    ]));

    if (mine.kind === "wrong") {
      form.appendChild(el("p", { class: "mesa-check__result is-wrong" }, [el("strong", { text: "Not yet. " })].concat(inline(mine.message), [" ",
        el("a", { href: tutorialUrl(check.tutorial) + "#steps", text: "Back to the steps of " + m.tutorials[check.tutorial].title })])));
    } else if (mine.kind === "empty") {
      form.appendChild(el("p", { class: "mesa-check__result is-wrong", text: check.options.length ? "Choose an answer first." : "Type an answer first." }));
    } else if (mine.kind === "shown") {
      form.appendChild(el("p", { class: "mesa-check__result" }, ["The answer is "].concat(answerLine(check))));
      if (how) form.appendChild(how);
      form.appendChild(el("p", { class: "mesa-note", text: "Seeing the answer does not count as checked. You can still answer it yourself." }));
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = read(), confidence = readSure(), result = P.grade(check, value);
      if (result.empty) {
        tries[id] = { kind: "empty", value: value, sure: confidence };
        refresh(check.options.length ? "check-" + id : "answer-" + id);
        announce(check.options.length ? "Choose an answer first." : "Type an answer first.");
        return;
      }
      change(store, function (r) {
        P.recordCheck(r, id, check, result.correct, confidence, P.today(), m.tutorials[check.tutorial].revised);
        P.syncSkipped(m, r, P.today());
      });
      tries[id] = result.correct ? { kind: "right" } : { kind: "wrong", message: result.message, value: value, sure: confidence };
      refresh(result.correct || check.options.length ? "check-" + id : "answer-" + id);
      announce(result.correct ? "Right. " + check.right : "Not yet. " + result.message);
    });
    return form;
  }

  /* The optional prompt at the end of a point. Built once; never redrawn while typed in. */
  function reflectionBox(m, point, small) {
    var prompt = m.points[point].reflection;
    if (!prompt) return null;
    var id = "mesa-reflect-" + point + (small ? "-p" : "");
    var area = el("textarea", { id: id, rows: "3", maxlength: "4000", class: "mesa-reflect__text" });
    var status = el("p", { class: "mesa-note", text: "Optional. Kept in this browser only; you can save your notes as a file from Your progress." });
    area.addEventListener("change", function () {
      var store = P.load(storage());
      if (change(store, function (r) { P.setReflection(r, point, area.value, P.today()); })) {
        status.textContent = area.value.trim() ? "Saved in this browser." : "Cleared.";
        announce(status.textContent);
      }
    });
    var body = el("div", { class: "mesa-reflect" }, [el("label", { for: id, text: prompt }), area, status]);
    body.sync = function (record, can) {
      if (document.activeElement !== area) area.value = (record.points[point] || {}).reflection || "";
      area.disabled = !can;
    };
    return body;
  }

  /* ---------- the path: stages with stops, used on four kinds of page ---------- */

  /* Turn one list item into a stop on the path. */
  function makeStop(li, name, m, counted, withDescription) {
    var facts = m.tutorials[name];
    var link = li.querySelector("a");
    link.classList.add("mesa-stop__title");
    while (li.firstChild) li.removeChild(li.firstChild);
    li.className = "mesa-stop";
    var stop = { li: li, name: name, counted: counted, mark: box("todo"), state: el("span", { class: "mesa-state" }),
      extra: el("div", { class: "mesa-stop__extra" }) };
    li.appendChild(stop.mark);
    li.appendChild(el("div", { class: "mesa-stop__body" }, [link,
      withDescription ? el("span", { class: "mesa-stop__desc" }, inline(facts.description)) : null,
      el("span", { class: "mesa-stop__time", text: P.minutes(facts.min, facts.max) }), stop.extra]));
    li.appendChild(stop.state);
    return stop;
  }

  /* Wrap the article's stages (each an h2 and what follows it) into a path.
     `sections` is [{ heading, nodes, pathway? }]. Returns the drawn context. */
  function buildPath(article, sections, m, opts) {
    var path = el("div", { class: "mesa-path" });
    var head = el("div", { class: "mesa-head" });
    var map = el("ol", { class: "mesa-map", "aria-label": "The points on this path" });
    var ctx = { head: head, map: map, stages: [], shown: -1, pathway: opts.pathway || null, title: opts.title };
    var first = sections[0].heading;
    first.parentNode.insertBefore(head, first);
    first.parentNode.insertBefore(map, first);
    first.parentNode.insertBefore(path, first);
    sections.forEach(function (section, i) {
      var stage = { el: el("section", { class: "mesa-stage" }), mark: el("span", { class: "mesa-mark", "aria-hidden": "true" }),
        meter: el("p", { class: "mesa-meter" }), stops: [], title: section.heading.textContent.replace(/[¶#]\s*$/, "").trim(),
        point: section.point, skip: el("div", { class: "mesa-skip" }), skipOpen: false };
      stage.el.appendChild(stage.mark);
      stage.el.appendChild(section.heading);
      stage.el.appendChild(stage.meter);
      stage.el.appendChild(stage.skip);
      var group = null; /* a titled group within a stage, folded behind its title */
      stage.groups = [];
      section.nodes.forEach(function (node) {
        if (node.tagName === "H3") {
          group = { title: node.textContent.replace(/[¶#]\s*$/, "").trim(), names: [], summary: el("summary") };
          group.el = el("details", { class: "mesa-more mesa-group", id: node.id || null }, [group.summary]);
          stage.groups.push(group);
          stage.el.appendChild(group.el);
          return;
        }
        if (node.tagName === "OL" || node.tagName === "UL") {
          var counted = node.tagName === "OL";
          node.classList.add("mesa-stops");
          Array.prototype.forEach.call(node.children, function (li) {
            var name = tutorialOf(li.querySelector("a"));
            if (!name || !m.tutorials[name]) return;
            stage.stops.push(makeStop(li, name, m, counted, opts.descriptions));
            if (group && counted) group.names.push(name);
          });
          if (group && counted) { group.el.appendChild(node); group = null; return; }
          if (!counted) {
            var prev = stage.el.lastElementChild;
            var more = el("details", { class: "mesa-more" }, [el("summary", { text: "More in this area (" + node.children.length + ")" })]);
            if (prev && prev.tagName === "P" && /^More in this area/.test(prev.textContent)) stage.el.removeChild(prev);
            more.appendChild(node);
            stage.el.appendChild(more);
            return;
          }
        }
        stage.el.appendChild(node);
      });
      stage.reflect = stage.point ? reflectionBox(m, stage.point) : null;
      if (stage.reflect) {
        stage.el.appendChild(el("details", { class: "mesa-more mesa-reflect-fold" }, [el("summary", { text: "Reflect (optional)" }), stage.reflect]));
      }
      path.appendChild(stage.el);
      stage.button = el("button", { type: "button", class: "mesa-map__stop", onclick: function () { ctx.shown = i; paintShown(ctx); } });
      map.appendChild(el("li", {}, [stage.button]));
      ctx.stages.push(stage);
    });
    path.addEventListener("click", function (event) {
      var link = event.target.closest ? event.target.closest("a.mesa-stop__title") : null;
      if (link && ctx.pathway) link.setAttribute("data-mesa-pathway", ctx.pathway.id);
    }, true);
    return ctx;
  }

  function paintShown(ctx) {
    ctx.stages.forEach(function (stage, i) {
      stage.el.classList.toggle("is-shown", i === ctx.shown);
      stage.button.setAttribute("aria-pressed", i === ctx.shown ? "true" : "false");
    });
  }

  /* "Check first": a few questions that let a reader skip a point. Missing one
     points to the tutorials; it never closes anything off. */
  function paintSkip(stage, m, store) {
    var ids = stage.point ? m.points[stage.point].skip_check : [];
    while (stage.skip.firstChild) stage.skip.removeChild(stage.skip.firstChild);
    if (!ids.length) return;
    var record = store.record, state = P.skipState(m, record, stage.point);
    var fold = el("details", { class: "mesa-more mesa-skip__fold" }, [el("summary", { "data-key": "skip-" + stage.point,
      text: state === "passed" ? "Skip-check passed" : "Check first: " + ids.length + (ids.length === 1 ? " question" : " questions") + ", and skip this point if you have it" })]);
    fold.open = stage.skipOpen;
    fold.addEventListener("toggle", function () { stage.skipOpen = fold.open; });
    if (state === "passed") {
      fold.appendChild(el("p", { class: "mesa-skip__said", text: "You already have this. Go on to the next point, or take the tutorials anyway." }));
    } else if (state === "missed") {
      var missed = ids.filter(function (id) { return record.checks[id] && !record.checks[id].correct; })
        .map(function (id) { return m.checks[id].tutorial; });
      var said = el("p", { class: "mesa-skip__said" }, ["Not yet. " + (missed.length === 1 ? "This tutorial covers it: " : "These tutorials cover it: ")]);
      missed.filter(function (n, i) { return missed.indexOf(n) === i; }).forEach(function (name, i) {
        if (i) said.appendChild(document.createTextNode(", "));
        said.appendChild(el("a", { href: tutorialUrl(name), text: m.tutorials[name].title }));
      });
      said.appendChild(document.createTextNode("."));
      fold.appendChild(said);
    }
    ids.forEach(function (id) { fold.appendChild(checkForm(m, store, id)); });
    stage.skip.appendChild(fold);
  }

  function paintPath(ctx, m, store) {
    var record = store.record;
    var chosen = P.findPathway(m, record.pathway);
    var route = ctx.pathway || chosen;
    var next = route ? P.route(route, record, m).next : "";
    var counted = [];
    var tallies = ctx.stages.map(function (stage) {
      var names = stage.stops.filter(function (s) { return s.counted; }).map(function (s) { return s.name; });
      counted = counted.concat(names);
      return P.progress(names, record, m);
    });
    var started = counted.some(function (n) { return P.isFinished(record, n); });
    /* "You are here": on a pathway, the first stage with something left; on a
       page that lists everything, the same, once the reader has begun. */
    var current = -1;
    tallies.forEach(function (got, i) {
      var passed = ctx.stages[i].point && P.isSkipped(record, ctx.stages[i].point);
      if (current < 0 && got.done < got.total && !passed && (ctx.pathway || started)) current = i;
    });
    ctx.stages.forEach(function (stage, i) {
      var got = tallies[i];
      stage.stops.forEach(function (stop) {
        var state = P.state(record, stop.name);
        if (state === "todo" && stop.name === next) state = "next";
        stop.li.className = "mesa-stop is-" + state;
        stop.mark.className = "mesa-box is-" + state;
        stop.state.textContent = state === "next" && !ctx.pathway ? "Next on your pathway" : LABEL[state];
        stop.state.className = "mesa-state is-" + state;
        while (stop.extra.firstChild) stop.extra.removeChild(stop.extra.firstChild);
        if (P.isFinished(record, stop.name)) {
          if (P.isUpdated(record, stop.name, m)) {
            stop.extra.appendChild(el("p", { class: "mesa-note", text: "Updated since you finished. Your tick is kept." }));
          }
          stop.extra.appendChild(el("details", { class: "mesa-did" },
            [el("summary", { text: "What you did" })].concat(accomplished(m, record, stop.name))));
        }
      });
      stage.groups.forEach(function (g) {
        var part = P.progress(g.names, record, m);
        g.summary.textContent = g.title + " (" + part.done + " of " + part.total + " done)";
        if (g.names.indexOf(next) >= 0) g.el.open = true;
      });
      var done = got.total > 0 && got.done === got.total;
      var isHere = i === current;
      stage.el.classList.toggle("is-done", done);
      stage.el.classList.toggle("is-here", isHere);
      stage.el.classList.toggle("is-walked", got.done > 0);
      stage.mark.textContent = done ? "\u2713" : String(i + 1);
      while (stage.meter.firstChild) stage.meter.removeChild(stage.meter.firstChild);
      if (isHere) stage.meter.appendChild(el("span", { class: "mesa-here", text: "You are here" }));
      var skipped = stage.point && P.isSkipped(record, stage.point);
      stage.meter.appendChild(document.createTextNode(got.done + " of " + got.total + " done" +
        (done ? ". Point finished." : skipped ? ". Skip-check passed." : "")));
      paintSkip(stage, m, store);
      if (stage.reflect) stage.reflect.sync(record, writable(store));
      stage.button.textContent = done ? "\u2713" : String(i + 1);
      stage.button.className = "mesa-map__stop" + (done ? " is-done" : isHere ? " is-here" : "");
      stage.button.setAttribute("aria-label", "Point " + (i + 1) + ": " + stage.title + ", " + got.done + " of " + got.total + " done" + (isHere ? ", you are here" : ""));
    });
    if (ctx.shown < 0) ctx.shown = current >= 0 ? current : 0;
    paintShown(ctx);

    var all = P.progress(counted, record, m);
    while (ctx.head.firstChild) ctx.head.removeChild(ctx.head.firstChild);
    var story;
    if (!all.done) story = "You have not started. " + all.total + " tutorials, " + P.minutes(all.minLeft, all.maxLeft) + " in all.";
    else if (!all.next) story = "You have walked the whole path: all " + all.total + " tutorials are marked done.";
    else story = all.done + " of " + all.total + " done. About " + P.minutes(all.minLeft, all.maxLeft) + " to go" +
      (current >= 0 ? ", and you are at point " + (current + 1) + " of " + ctx.stages.length + ", " + ctx.stages[current].title.replace(/^\d+\.\s*/, "") : "") + ".";
    ctx.head.appendChild(el("p", { class: "mesa-story", text: story }));
    ctx.head.appendChild(bar(all.done, all.total));
    if (route) ctx.head.appendChild(continueBlock(m, record, route));
    else ctx.head.appendChild(el("p", { class: "mesa-muted" }, ["Looking for a shorter route? ", el("a", { href: BASE + "pathways/", text: "Choose a pathway" }), "."]));
  }

  /* The stages of a generated page: every h2 except the closing ones. */
  function sectionsOf(article) {
    var sections = [], current = null;
    Array.prototype.slice.call(article.children).forEach(function (node) {
      if (node.tagName === "H2") {
        current = /^(next|looking-for-one-thing)$/.test(node.id) ? null : { heading: node, nodes: [] };
        if (current) sections.push(current);
      } else if (current && !/mesa-machine-readable/.test(node.className)) current.nodes.push(node);
    });
    return sections;
  }

  function drawPathway(article, m, id) {
    var pathway = P.findPathway(m, id), sections = sectionsOf(article);
    if (!pathway || !sections.length) return null;
    sections.forEach(function (section, i) { section.point = pathway.stages[i] ? pathway.stages[i].point : ""; });
    var ctx = buildPath(article, sections, m, { pathway: pathway });
    return { paint: function (store) { paintPath(ctx, m, store); } };
  }

  function drawPoints(article, m) {
    var sections = sectionsOf(article);
    if (!sections.length) return null;
    sections.forEach(function (section, i) { section.point = Object.keys(m.points)[i] || ""; });
    var ctx = buildPath(article, sections, m, {});
    return { paint: function (store) { paintPath(ctx, m, store); } };
  }

  /* The flat list of every tutorial, regrouped under the five points. */
  function drawTutorials(article, m) {
    var list = article.querySelector("ul");
    if (!list) return null;
    var items = {};
    Array.prototype.forEach.call(list.children, function (li) {
      var name = tutorialOf(li.querySelector("a"));
      if (name) items[name] = li;
    });
    var sections = [];
    Object.keys(m.points).forEach(function (key, i) {
      var heading = el("h2", { text: (i + 1) + ". " + m.points[key].title });
      var lead = el("p", { text: m.points[key].can_do });
      var nodes = [lead];
      (m.by_point[key] || []).forEach(function (g) {
        var stops = el("ol");
        g.tutorials.forEach(function (name) { if (items[name]) { stops.appendChild(items[name]); delete items[name]; } });
        if (g.title) nodes.push(el("h3", { text: g.title }));
        nodes.push(stops);
      });
      list.parentNode.insertBefore(heading, list);
      sections.push({ heading: heading, nodes: nodes, point: key });
    });
    if (!list.children.length) list.parentNode.removeChild(list);
    var ctx = buildPath(article, sections, m, { descriptions: true });
    return { paint: function (store) { paintPath(ctx, m, store); } };
  }

  /* The list of pathways: each with the reader's progress on it. */
  function drawPathways(article, m) {
    var list = article.querySelector("ul");
    if (!list) return null;
    var lead = el("div", { class: "mesa-head" });
    list.parentNode.insertBefore(lead, list);
    list.classList.add("mesa-routes");
    var rows = [];
    Array.prototype.forEach.call(list.children, function (li) {
      var link = li.querySelector("a");
      var id = link && link.href.indexOf(BASE + "pathways/") === 0 ? link.href.slice((BASE + "pathways/").length).replace(/\/.*$/, "") : "";
      var pathway = P.findPathway(m, id);
      if (!pathway) return;
      var meta = el("div", { class: "mesa-route__meta" });
      li.classList.add("mesa-route");
      li.appendChild(meta);
      rows.push({ li: li, meta: meta, pathway: pathway });
    });
    return { paint: function (store) {
      var record = store.record, chosen = P.findPathway(m, record.pathway);
      while (lead.firstChild) lead.removeChild(lead.firstChild);
      if (chosen) lead.appendChild(continueBlock(m, record, chosen));
      rows.forEach(function (row) {
        var got = P.route(row.pathway, record, m);
        while (row.meta.firstChild) row.meta.removeChild(row.meta.firstChild);
        row.li.classList.toggle("is-chosen", chosen === row.pathway);
        row.meta.appendChild(el("span", { text: (chosen === row.pathway ? "You are on this pathway. " : "") +
          got.done + " of " + got.total + " done" + (got.next ? "" : ". Finished.") }));
        row.meta.appendChild(bar(got.done, got.total));
      });
    } };
  }

  /* ---------- a tutorial page: where it sits, mark as done, what is next ---------- */

  function drawTutorial(article, m, name) {
    var facts = m.tutorials[name], title = article.querySelector("h1");
    if (!facts || !title) return null;
    var where = el("p", { class: "mesa-where" });
    var strip = el("aside", { class: "mesa-strip", "aria-label": "Your progress on this tutorial" });
    title.parentNode.insertBefore(where, title.nextSibling);
    var tail = article.querySelector(".mesa-machine-readable");
    if (tail) article.insertBefore(strip, tail); else article.appendChild(strip);

    function paint(store, focus) {
      var record = store.record;
      var routes = P.pathwaysWith(m, name, record);
      var route = routes[0] && routes[0].id === record.pathway ? routes[0] : null;
      var point = m.points[facts.point];
      var finished = P.isFinished(record, name);
      while (where.firstChild) where.removeChild(where.firstChild);
      while (strip.firstChild) strip.removeChild(strip.firstChild);

      if (route) {
        var names = P.core(route), at = names.indexOf(name);
        where.appendChild(el("a", { href: pathwayUrl(route.id), text: route.title }));
        where.appendChild(document.createTextNode(at >= 0 ? " · tutorial " + (at + 1) + " of " + names.length + " · " + point.title
          : " · more in " + point.title));
      } else {
        where.appendChild(el("a", { href: BASE + "pathway/", text: point.title }));
        if (routes.length) {
          where.appendChild(document.createTextNode(" · on the pathway" + (routes.length > 1 ? "s " : " ")));
          routes.forEach(function (r, i) {
            if (i) where.appendChild(document.createTextNode(", "));
            where.appendChild(el("a", { href: pathwayUrl(r.id), text: r.title }));
          });
        }
      }

      var status = el("div", { class: "mesa-strip__state" }, [box(P.state(record, name)), el("div", {}, finished
        ? accomplished(m, record, name)
        : [el("p", {}, ["Finished the task? Say so here. This site cannot see your work in the portal, so “done” is your own word."])])]);
      strip.appendChild(status);
      if (P.isUpdated(record, name, m)) {
        strip.appendChild(el("p", { class: "mesa-note", text: "This tutorial has been updated since you finished it. Your tick is kept; mark it done again once you have looked at what changed." }));
      }
      if (P.isStale(facts, P.today())) {
        strip.appendChild(el("p", { class: "mesa-note", text: "This tutorial is past its review date, so a screen may have changed since it was written." }));
      }
      var actions = el("div", { class: "mesa-strip__actions" });
      if (writable(store)) {
        if (!finished || P.isUpdated(record, name, m)) {
          actions.appendChild(el("button", { type: "button", class: "mesa-btn", "data-key": "mark",
            text: finished ? "Mark as done again" : "Mark as done",
            onclick: function () {
              change(store, function (r) { if (route) P.setPathway(r, route.id); P.markDone(r, name, facts.revised, P.today()); });
              refresh("undo");
              var after = route ? P.nextAfter(P.openNames(route, store.record), name, store.record) : "";
              announce("Marked as done." + (after ? " Next: " + m.tutorials[after].title + ", " + P.minutes(m.tutorials[after].min, m.tutorials[after].max) + "." : ""));
            } }));
        }
        if (finished) {
          actions.appendChild(el("button", { type: "button", class: "mesa-btn mesa-btn--plain", "data-key": "undo", text: "Undo",
            onclick: function () {
              change(store, function (r) { P.unmark(r, name); });
              refresh("mark");
              announce("No longer marked as done.");
            } }));
        }
      } else {
        actions.appendChild(el("p", { class: "mesa-note", text: store.status === "newer"
          ? "Your progress was saved by a newer version of this site, so this page will not change it. Reload the page."
          : "This browser is not keeping progress, so nothing can be marked here." }));
      }
      strip.appendChild(actions);

      var mine = Object.keys(m.checks).filter(function (id) { return m.checks[id].tutorial === name; });
      if (mine.length) {
        strip.appendChild(el("p", { class: "mesa-kicker mesa-strip__label", text: "Check yourself" }));
        strip.appendChild(el("p", { class: "mesa-muted", text: "One question whose answer comes from doing the task. A right answer marks this tutorial as checked." }));
        mine.forEach(function (id) { strip.appendChild(checkForm(m, store, id)); });
      }

      var after = route ? P.nextAfter(P.openNames(route, record), name, record) : "";
      var next = el("p", { class: "mesa-strip__next" });
      if (after) {
        next.appendChild(document.createTextNode("Next on your pathway: "));
        next.appendChild(el("a", { href: tutorialUrl(after), text: m.tutorials[after].title }));
        next.appendChild(document.createTextNode(" (" + P.minutes(m.tutorials[after].min, m.tutorials[after].max) + ")"));
      } else if (route) {
        next.appendChild(document.createTextNode(finished ? "That was the last one: you have finished " : "This is the last one on "));
        next.appendChild(el("a", { href: pathwayUrl(route.id), text: route.title }));
        next.appendChild(document.createTextNode("."));
      }
      next.appendChild(document.createTextNode(next.firstChild ? " " : ""));
      next.appendChild(el("a", { href: BASE + "progress/", text: "Your progress" }));
      strip.appendChild(next);
      if (focus) {
        var target = strip.querySelector('[data-key="' + focus + '"]') || strip.querySelector("button");
        if (target) target.focus();
      }
    }
    return { paint: paint };
  }

  /* ---------- the progress page ---------- */

  function drawProgress(article, m) {
    var root = el("div", { class: "mesa-progress" });
    var before = article.querySelector("#how-your-progress-is-kept");
    if (before) article.insertBefore(root, before); else article.appendChild(root);
    var reflections = {}; /* built once, so typing is never interrupted by a redraw */
    Object.keys(m.points).forEach(function (key) { reflections[key] = reflectionBox(m, key, true); });
    var pending = null; /* an imported record waiting for "replace" or "merge" */
    var message = "";

    function say(text, focus) { message = text; refresh(focus); announce(text); }

    function exportFile(store) {
      var blob = new Blob([P.serialize(store.record) + "\n"], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var link = el("a", { href: url, download: "mesa-trainings-progress-" + P.today() + ".json" });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      say("Saved a copy of your progress to a file.", "export");
    }

    function exportNotes(store) {
      var blob = new Blob([P.reflectionsMarkdown(store.record, m, P.today())], { type: "text/markdown" });
      var url = URL.createObjectURL(blob);
      var link = el("a", { href: url, download: "mesa-trainings-notes-" + P.today() + ".md" });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      say("Saved your reflections, levels and finished tutorials as a Markdown file.", "notes");
    }

    function importFile(store, file) {
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var got = P.parseImport(String(reader.result));
        if (!got.ok) { say("That file could not be used: " + got.errors[0] + ". Nothing was changed.", "import"); return; }
        if (P.isBlank(store.record)) {
          P.save(storage(), got.record);
          say("Brought back " + Object.keys(got.record.tutorials).length + " finished tutorials from the file.", "import");
        } else { pending = got.record; message = ""; refresh("replace"); }
      };
      reader.onerror = function () { say("That file could not be read. Nothing was changed.", "import"); };
      reader.readAsText(file);
    }

    function paint(store, focus) {
      var record = store.record, can = writable(store);
      var chosen = P.findPathway(m, record.pathway);
      while (root.firstChild) root.removeChild(root.firstChild);
      if (store.status === "newer") root.appendChild(el("p", { class: "mesa-note", text: "Your progress was saved by a newer version of this site. This page will not change it. Reload the page to get the newer version." }));
      if (store.status === "unavailable") root.appendChild(el("p", { class: "mesa-note", text: "This browser is blocking storage for this site, so progress cannot be kept here." }));
      if (store.status === "invalid") root.appendChild(el("p", { class: "mesa-note", text: "The progress stored in this browser could not be read, so this page starts empty. The unreadable copy has been set aside and is removed only by “Clear everything”." }));

      if (chosen) root.appendChild(continueBlock(m, record, chosen));
      else root.appendChild(el("div", { class: "mesa-continue" }, [el("div", {}, [
        el("p", { class: "mesa-kicker", text: "Start" }),
        el("p", { class: "mesa-continue__title", text: "Choose a pathway" }),
        el("p", { class: "mesa-muted", text: "Six short routes, each with its total time." })
      ]), el("a", { class: "mesa-btn", href: BASE + "pathways/", text: "Choose" })]));

      root.appendChild(el("h2", { text: "Your pathways" }));
      var routes = el("ul", { class: "mesa-routes" });
      m.pathways.forEach(function (pathway) {
        var got = P.route(pathway, record, m), mine = chosen === pathway;
        routes.appendChild(el("li", { class: "mesa-route" + (mine ? " is-chosen" : "") }, [
          el("a", { href: pathwayUrl(pathway.id), text: pathway.title }),
          el("div", { class: "mesa-route__meta" }, [
            el("span", { text: (mine ? "You are on this pathway. " : "") + got.done + " of " + got.total + " done. " +
              (got.next ? "About " + P.minutes(got.minLeft, got.maxLeft) + " to go." : "Finished.") }),
            bar(got.done, got.total)]),
          can && !mine ? el("button", { type: "button", class: "mesa-btn mesa-btn--plain mesa-btn--small", "data-key": "follow-" + pathway.id,
            "aria-label": "Follow the pathway " + pathway.title, text: "Follow",
            onclick: function () { change(store, function (r) { P.setPathway(r, pathway.id); }); say("You are now on the pathway " + pathway.title + ".", "export"); } }) : null
        ]));
      });
      root.appendChild(routes);

      root.appendChild(el("h2", { text: "The five points" }));
      root.appendChild(el("p", { class: "mesa-muted", text: "Every tutorial counts here, whichever pathway you took it on. These tutorials take you to Exploring and part of the way to Investigating. Nobody checks the level you choose; it is there to help you decide what to do next." }));
      Object.keys(m.points).forEach(function (key, i) {
        var point = m.points[key], names = P.pointNames(m, key), got = P.progress(names, record, m);
        var finished = names.filter(function (n) { return P.isFinished(record, n); });
        var level = (record.points[key] || {}).level || "";
        var group = el("fieldset", { class: "mesa-levels" }, [el("legend", { text: "Where are you? Your own assessment" })]);
        LEVELS.forEach(function (option) {
          var input = el("input", { type: "radio", name: "mesa-level-" + key, value: option[0], disabled: can ? null : "disabled" });
          input.checked = option[0] === level;
          input.addEventListener("change", function () {
            change(store, function (r) { P.setLevel(r, key, option[0], P.today()); });
            announce(point.title + ": " + (option[0] ? "level set to " + option[1] : "level cleared") + ".");
          });
          group.appendChild(el("label", {}, [input, el("span", {}, [el("strong", { text: option[1] }), option[2] ? " " + option[2] : ""])]));
        });
        var did = el("details", { class: "mesa-did" }, [el("summary", { text: "What you have done here (" + finished.length + ")" })]);
        finished.forEach(function (name) {
          did.appendChild(el("div", { class: "mesa-did__item" }, [el("p", {}, [box(P.state(record, name)), " ",
            el("a", { href: tutorialUrl(name), text: m.tutorials[name].title })])].concat(accomplished(m, record, name))));
        });
        root.appendChild(el("section", { class: "mesa-point" }, [
          el("h3", { text: (i + 1) + ". " + point.title }),
          el("p", { text: point.can_do }),
          el("p", { class: "mesa-meter", text: got.done + " of " + got.total + " tutorials done" }),
          bar(got.done, got.total),
          P.isSkipped(record, key) ? el("p", { class: "mesa-note", text: "You passed the skip-check for this point on " + day(record.points[key].skipped) + "." }) : null,
          finished.length ? did : null, group, reflections[key]]));
        if (reflections[key]) reflections[key].sync(record, can);
      });

      root.appendChild(el("h2", { text: "Your record" }));
      var tools = el("div", { class: "mesa-tools" });
      var picker = el("input", { type: "file", accept: "application/json,.json", class: "mesa-vh", tabindex: "-1", "aria-hidden": "true" });
      picker.addEventListener("change", function () { importFile(store, picker.files[0]); picker.value = ""; });
      tools.appendChild(el("button", { type: "button", class: "mesa-btn mesa-btn--plain", "data-key": "export", text: "Save a copy to a file",
        onclick: function () { exportFile(store); } }));
      tools.appendChild(el("button", { type: "button", class: "mesa-btn mesa-btn--plain", "data-key": "notes", text: "Save my notes as Markdown",
        onclick: function () { exportNotes(store); } }));
      if (can) {
        tools.appendChild(el("button", { type: "button", class: "mesa-btn mesa-btn--plain", "data-key": "import", text: "Bring back a saved copy",
          onclick: function () { picker.click(); } }));
        tools.appendChild(picker);
        tools.appendChild(el("button", { type: "button", class: "mesa-btn mesa-btn--plain", "data-key": "clear", text: "Clear everything",
          onclick: function () { pending = "clear"; message = ""; refresh("confirm-clear"); } }));
      }
      root.appendChild(tools);
      if (pending === "clear") {
        root.appendChild(el("div", { class: "mesa-ask", role: "group", "aria-label": "Clear everything?" }, [
          el("p", { text: "Clear everything this browser holds about your progress? This cannot be undone unless you saved a copy." }),
          el("button", { type: "button", class: "mesa-btn", "data-key": "confirm-clear", text: "Clear everything",
            onclick: function () { pending = null; P.clear(storage()); say("Cleared. This browser now holds nothing about your progress.", "export"); } }),
          el("button", { type: "button", class: "mesa-btn mesa-btn--plain", text: "Keep it", onclick: function () { pending = null; refresh("clear"); } })]));
      } else if (pending) {
        var count = Object.keys(pending.tutorials).length;
        root.appendChild(el("div", { class: "mesa-ask", role: "group", "aria-label": "Replace or merge?" }, [
          el("p", { text: "The file holds " + count + " finished tutorials, and this browser already holds some progress. Replace what is here with the file, or merge the two?" }),
          el("button", { type: "button", class: "mesa-btn", "data-key": "replace", text: "Replace",
            onclick: function () { P.save(storage(), pending); pending = null; say("Replaced your progress with the file.", "import"); } }),
          el("button", { type: "button", class: "mesa-btn mesa-btn--plain", text: "Merge",
            onclick: function () { P.save(storage(), P.merge(store.record, pending)); pending = null; say("Merged the file into your progress. Nothing finished was removed.", "import"); } }),
          el("button", { type: "button", class: "mesa-btn mesa-btn--plain", text: "Cancel", onclick: function () { pending = null; refresh("import"); } })]));
      }
      if (message) root.appendChild(el("p", { class: "mesa-said", text: message }));
      if (focus) {
        var target = root.querySelector('[data-key="' + focus + '"]');
        if (target) target.focus();
      }
    }
    return { paint: paint };
  }

  /* ---------- ticks in the navigation ---------- */

  function paintNav(record) {
    Array.prototype.forEach.call(document.querySelectorAll("a.md-nav__link[href]"), function (link) {
      var name = tutorialOf(link);
      if (!name) return;
      var done = P.isFinished(record, name), mark = link.querySelector(".mesa-nav-tick");
      if (done && !mark) {
        link.appendChild(el("span", { class: "mesa-nav-tick" }, [el("span", { "aria-hidden": "true", text: "✓" }), el("span", { class: "mesa-vh", text: " (done)" })]));
      } else if (!done && mark) link.removeChild(mark);
    });
  }

  /* ---------- drawing and redrawing ---------- */

  function refresh(focus) {
    var store = P.load(storage());
    paintNav(store.record);
    if (view) view.paint(store, focus);
    if (focus) {
      var target = document.querySelector('article [data-key="' + focus + '"]');
      if (target && document.activeElement !== target) target.focus();
    }
  }

  function draw() {
    manifest().then(function (m) {
      var article = document.querySelector("article.md-content__inner");
      if (!m || !article) return;
      if (!article.hasAttribute("data-mesa")) {
        article.setAttribute("data-mesa", "");
        var at = here();
        view = at.kind === "tutorial" ? drawTutorial(article, m, at.name)
          : at.kind === "pathway" ? drawPathway(article, m, at.id)
          : at.kind === "points" ? drawPoints(article, m)
          : at.kind === "tutorials" ? drawTutorials(article, m)
          : at.kind === "pathways" ? drawPathways(article, m)
          : at.kind === "progress" ? drawProgress(article, m)
          : null;
      }
      refresh();
    });
  }

  /* Following a link from a pathway makes that pathway the reader's own. */
  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a[data-mesa-pathway]") : null;
    if (!link) return;
    var store = P.load(storage());
    change(store, function (r) { P.setPathway(r, link.getAttribute("data-mesa-pathway")); });
  });

  /* Progress changed in another tab of this browser. */
  window.addEventListener("storage", function (event) { if (!event.key || event.key === P.KEY) refresh(); });

  if (window.document$ && typeof window.document$.subscribe === "function") window.document$.subscribe(draw);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", draw);
  else draw();
})();
