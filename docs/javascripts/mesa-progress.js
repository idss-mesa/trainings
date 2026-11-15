/* MESA Trainings: the learner's record, as plain logic with no page access.

   The record lives only in this browser's localStorage, under one key. Nothing
   here makes a network request. The page script (mesa-pathways.js) draws what
   this file computes; tests/progress.test.js runs this file under Node.

   The record (schema 2; schema 1 had no `profile`):
     { schema, started, pathway,
       profile:   { portal?: "yes"|"no", language?: "python"|"r", data?: "yes"|"no", minutes?: 15|30|60 },
       tutorials: { <name>: { done: "YYYY-MM-DD", checked?: "YYYY-MM-DD", rev } },
       checks:    { <id>:   { correct, tries, sure?, on } },
       points:    { p1..p5: { level?, skipped?, reflection?, on? } } }
   "done" is the learner's own word. "checked" means a self-check was answered
   correctly. `rev` is the tutorial's revision when it was marked done. */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MesaProgress = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var SCHEMA = 2;
  var PROFILE = { portal: ["yes", "no"], language: ["python", "r"], data: ["yes", "no"], minutes: [15, 30, 60] };
  var KEY = "mesa-trainings";
  var LEVELS = ["exploring", "investigating", "extending"];
  var DATE = /^\d{4}-\d{2}-\d{2}$/;
  var NAME = /^[a-z0-9][a-z0-9-]{0,79}$/;
  var POINT = /^p[1-5]$/;
  var MAX_TEXT = 4000;

  /* Changes of schema: MIGRATIONS[n] turns a schema-n record into schema n+1. */
  var MIGRATIONS = {
    /* 1 -> 2: the answers to "Where are you starting?" joined the record. */
    1: function (r) {
      var out = {};
      Object.keys(r).forEach(function (k) { out[k] = r[k]; });
      out.schema = 2;
      out.profile = {};
      return out;
    }
  };

  function empty() {
    return { schema: SCHEMA, started: "", pathway: "", profile: {}, tutorials: {}, checks: {}, points: {} };
  }

  function isObject(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  function today(now) {
    var d = now || new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  /* Check a record's shape and return a clean copy with keys in a fixed order.
     Anything unexpected is an error: an imported file is not trusted. */
  function validate(raw) {
    var errors = [];
    var out = empty();
    var only = function (obj, allowed, where) {
      Object.keys(obj).forEach(function (k) {
        if (allowed.indexOf(k) < 0) errors.push(where + ": unexpected entry \"" + k + "\"");
      });
    };
    var date = function (v, where) {
      if (typeof v !== "string" || !DATE.test(v)) errors.push(where + ": not a date (YYYY-MM-DD)");
      return v;
    };
    if (!isObject(raw)) return { ok: false, errors: ["not a progress record"], record: null };
    if (raw.schema !== SCHEMA) {
      return { ok: false, errors: ["schema " + JSON.stringify(raw.schema) + " is not " + SCHEMA], record: null };
    }
    only(raw, ["schema", "started", "pathway", "profile", "tutorials", "checks", "points"], "record");
    if (raw.profile !== undefined) {
      if (!isObject(raw.profile)) errors.push("profile: not a list of answers");
      else {
        only(raw.profile, Object.keys(PROFILE), "profile");
        Object.keys(PROFILE).forEach(function (k) {
          if (raw.profile[k] === undefined) return;
          if (PROFILE[k].indexOf(raw.profile[k]) < 0) errors.push("profile." + k + ": not one of the answers");
          else out.profile[k] = raw.profile[k];
        });
      }
    }
    if (raw.started !== undefined && raw.started !== "") out.started = date(raw.started, "started");
    if (raw.pathway !== undefined && raw.pathway !== "") {
      if (typeof raw.pathway !== "string" || !NAME.test(raw.pathway)) errors.push("pathway: not a pathway name");
      else out.pathway = raw.pathway;
    }
    ["tutorials", "checks", "points"].forEach(function (part) {
      if (raw[part] !== undefined && !isObject(raw[part])) errors.push(part + ": not a list of entries");
    });
    Object.keys(isObject(raw.tutorials) ? raw.tutorials : {}).sort().forEach(function (name) {
      var t = raw.tutorials[name], where = "tutorials." + name;
      if (!NAME.test(name) || !isObject(t)) { errors.push(where + ": not a tutorial entry"); return; }
      only(t, ["done", "checked", "rev"], where);
      var clean = { done: date(t.done, where + ".done") };
      if (t.checked !== undefined) clean.checked = date(t.checked, where + ".checked");
      if (typeof t.rev !== "string" || t.rev.length > 40) errors.push(where + ".rev: not a revision");
      clean.rev = t.rev;
      out.tutorials[name] = clean;
    });
    Object.keys(isObject(raw.checks) ? raw.checks : {}).sort().forEach(function (id) {
      var c = raw.checks[id], where = "checks." + id;
      if (!NAME.test(id) || !isObject(c)) { errors.push(where + ": not a self-check entry"); return; }
      only(c, ["correct", "tries", "sure", "on"], where);
      if (typeof c.correct !== "boolean") errors.push(where + ".correct: not true or false");
      if (!Number.isInteger(c.tries) || c.tries < 0 || c.tries > 999) errors.push(where + ".tries: not a count");
      var clean = { correct: c.correct, tries: c.tries };
      if (c.sure !== undefined) {
        if (!Number.isInteger(c.sure) || c.sure < 1 || c.sure > 4) errors.push(where + ".sure: not 1 to 4");
        clean.sure = c.sure;
      }
      clean.on = date(c.on, where + ".on");
      out.checks[id] = clean;
    });
    Object.keys(isObject(raw.points) ? raw.points : {}).sort().forEach(function (p) {
      var v = raw.points[p], where = "points." + p;
      if (!POINT.test(p) || !isObject(v)) { errors.push(where + ": not a point entry"); return; }
      only(v, ["level", "skipped", "reflection", "on"], where);
      var clean = {};
      if (v.level !== undefined && v.level !== "") {
        if (LEVELS.indexOf(v.level) < 0) errors.push(where + ".level: not a level");
        clean.level = v.level;
      }
      if (v.skipped !== undefined && v.skipped !== null) clean.skipped = date(v.skipped, where + ".skipped");
      if (v.reflection !== undefined && v.reflection !== "") {
        if (typeof v.reflection !== "string" || v.reflection.length > MAX_TEXT) errors.push(where + ".reflection: too long or not text");
        clean.reflection = v.reflection;
      }
      if (v.on !== undefined) clean.on = date(v.on, where + ".on");
      if (Object.keys(clean).length) out.points[p] = clean;
    });
    return errors.length ? { ok: false, errors: errors, record: null } : { ok: true, errors: [], record: out };
  }

  /* Bring a stored object up to the current schema.
     status: "ok" | "newer" (made by a later version: leave it alone) | "invalid". */
  function migrate(raw, migrations, current) {
    migrations = migrations || MIGRATIONS;
    current = current || SCHEMA;
    if (!isObject(raw) || !Number.isInteger(raw.schema) || raw.schema < 1) return { status: "invalid", record: null };
    if (raw.schema > current) return { status: "newer", record: null };
    var record = raw;
    while (record.schema < current) {
      var step = migrations[record.schema];
      if (typeof step !== "function") return { status: "invalid", record: null };
      record = step(record);
    }
    return { status: "ok", record: record };
  }

  /* Read the record. status: "empty" | "ok" | "newer" | "invalid" | "unavailable".
     A record this version cannot read is never overwritten silently: "newer"
     makes the page read-only, and an unreadable one is first copied aside. */
  function load(storage) {
    var text;
    try { text = storage.getItem(KEY); } catch (e) { return { status: "unavailable", record: empty() }; }
    if (text === null || text === undefined) return { status: "empty", record: empty() };
    var raw;
    try { raw = JSON.parse(text); } catch (e) { raw = null; }
    var moved = migrate(raw);
    if (moved.status === "newer") return { status: "newer", record: empty() };
    var checked = moved.status === "ok" ? validate(moved.record) : { ok: false };
    if (!checked.ok) {
      try { storage.setItem(KEY + ".unreadable", text); } catch (e) { /* nothing more to do */ }
      return { status: "invalid", record: empty() };
    }
    return { status: "ok", record: checked.record };
  }

  function serialize(record) {
    return JSON.stringify(validate(record).record || empty(), null, 1);
  }

  function save(storage, record) {
    try { storage.setItem(KEY, serialize(record)); return true; } catch (e) { return false; }
  }

  function clear(storage) {
    try { storage.removeItem(KEY); storage.removeItem(KEY + ".unreadable"); return true; } catch (e) { return false; }
  }

  function isBlank(record) {
    return !record.pathway && !Object.keys(record.profile).length && !Object.keys(record.tutorials).length &&
      !Object.keys(record.checks).length && !Object.keys(record.points).length;
  }

  /* --- changes to the record (each returns the record it was given) --- */

  function markDone(record, name, rev, day) {
    if (!record.started) record.started = day;
    var was = record.tutorials[name];
    record.tutorials[name] = { done: was ? was.done : day, rev: rev || "" };
    if (was && was.checked) {
      record.tutorials[name] = { done: was.done, checked: was.checked, rev: rev || "" };
    }
    return record;
  }

  function unmark(record, name) {
    delete record.tutorials[name];
    return record;
  }

  function setPathway(record, id) {
    record.pathway = id || "";
    return record;
  }

  function setLevel(record, point, level, day) {
    var entry = record.points[point] || {};
    if (level) { entry.level = level; entry.on = day; } else { delete entry.level; }
    if (Object.keys(entry).filter(function (k) { return k !== "on"; }).length) record.points[point] = entry;
    else delete record.points[point];
    return record;
  }

  /* --- self-checks, skip-checks, and reflections --- */

  function asNumber(text) {
    var found = String(text).replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
    return found ? Number(found[0]) : NaN;
  }

  /* Mark an answer. Returns { empty, correct, message }: for a wrong answer the
     message names the likely slip, or gives the general hint. */
  function grade(check, input) {
    var given = String(input === undefined || input === null ? "" : input).trim();
    if (!given) return { empty: true, correct: false, message: "" };
    var same;
    if (check.options.length) {
      same = function (a, b) { return a === b; };
    } else {
      if (isNaN(asNumber(given))) return { empty: false, correct: false, message: "Give your answer as a number. " + check.otherwise };
      same = function (a, b) { return Math.abs(asNumber(a) - asNumber(b)) < 1e-9; };
    }
    if (same(given, check.answer)) return { empty: false, correct: true, message: check.right };
    var slip = Object.keys(check.slips).filter(function (k) { return same(given, k); })[0];
    return { empty: false, correct: false, message: slip !== undefined ? check.slips[slip] : check.otherwise };
  }

  /* Record one try at a self-check. A correct answer marks its tutorial
     "checked" (and done, if it was not): the answer comes from doing the task. */
  function recordCheck(record, id, check, correct, sure, day, rev) {
    var was = record.checks[id] || { correct: false, tries: 0 };
    var entry = { correct: was.correct || correct, tries: Math.min(was.tries + 1, 999) };
    if (sure) entry.sure = sure; else if (was.sure) entry.sure = was.sure;
    entry.on = was.correct && !correct ? was.on : day;
    record.checks[id] = entry;
    if (!record.started) record.started = day;
    if (correct) {
      var t = record.tutorials[check.tutorial];
      record.tutorials[check.tutorial] = { done: t ? t.done : day, checked: t && t.checked ? t.checked : day, rev: t ? t.rev : (rev || "") };
    }
    return record;
  }

  function isCorrect(record, id) {
    return Boolean(record.checks[id] && record.checks[id].correct);
  }

  /* Where a point's skip-check stands: "none" | "open" | "missed" | "passed". */
  function skipState(manifest, record, point) {
    var ids = manifest.points[point].skip_check || [];
    if (!ids.length) return "none";
    if (ids.every(function (id) { return isCorrect(record, id); })) return "passed";
    return ids.some(function (id) { return record.checks[id] && !record.checks[id].correct; }) ? "missed" : "open";
  }

  /* Note a passed skip-check on the point. It never ticks the tutorials. */
  function syncSkipped(manifest, record, day) {
    Object.keys(manifest.points).forEach(function (point) {
      var entry = record.points[point] || {};
      if (skipState(manifest, record, point) === "passed" && !entry.skipped) {
        entry.skipped = day;
        record.points[point] = entry;
      }
    });
    return record;
  }

  function isSkipped(record, point) {
    return Boolean(record.points[point] && record.points[point].skipped);
  }

  function setReflection(record, point, text, day) {
    var entry = record.points[point] || {};
    var clean = String(text || "").slice(0, MAX_TEXT);
    if (clean.trim()) { entry.reflection = clean; entry.on = day; } else { delete entry.reflection; }
    if (Object.keys(entry).filter(function (k) { return k !== "on"; }).length) record.points[point] = entry;
    else delete record.points[point];
    return record;
  }

  /* The reader's reflections, levels, and finished tutorials as Markdown. */
  function reflectionsMarkdown(record, manifest, day) {
    var lines = ["# My MESA Trainings notes", "", "Saved on " + day + " from my own browser. Levels are my own assessment.", ""];
    Object.keys(manifest.points).forEach(function (point, i) {
      var facts = manifest.points[point], entry = record.points[point] || {};
      var names = pointNames(manifest, point);
      var finished = names.filter(function (n) { return isFinished(record, n); });
      lines.push("## " + (i + 1) + ". " + facts.title, "");
      lines.push("- Tutorials done: " + finished.length + " of " + names.length);
      if (entry.level) lines.push("- My level: " + entry.level.charAt(0).toUpperCase() + entry.level.slice(1));
      if (entry.skipped) lines.push("- Passed the skip-check on " + entry.skipped);
      lines.push("");
      if (facts.reflection) {
        lines.push("**" + facts.reflection + "**", "");
        lines.push(entry.reflection ? entry.reflection.trim() : "_Nothing written yet._", "");
      }
      finished.forEach(function (n) {
        lines.push("- " + (state(record, n) === "checked" ? "Checked" : "Done") + ": " + manifest.tutorials[n].title);
      });
      if (finished.length) lines.push("");
    });
    return lines.join("\n").replace(/\n+$/, "") + "\n";
  }

  /* --- a route tailored to the reader --- */

  function setProfile(record, key, value) {
    if (PROFILE[key] && PROFILE[key].indexOf(value) >= 0) record.profile[key] = value;
    else delete record.profile[key];
    return record;
  }

  var WHY = {
    skip: "you passed the skip-check for this point",
    portal: "you have used the portal before",
    data: "you have checked a dataset before",
    r: "your route uses the R version",
    "r-unneeded": "it is not needed when you work in R",
    "python-only": "there is no R version of it yet",
    time: "it does not fit in the time you have"
  };

  /* The reader's own route through a pathway: its essentials, shortened by
     their answers and by any skip-check they passed, then filled with "more"
     while it fits the time they have. Returns
       { names: [tutorial], left: [{ name, why, instead? }] }
     where `left` lists every essential that was taken out, and why. With no
     answers and no skip-check, `names` is simply the pathway's essentials. */
  function plan(manifest, pathway, record) {
    var profile = record.profile || {}, rules = manifest.tailoring || { foundations: [], in_r: {} };
    var inR = profile.language === "r";
    var names = [], left = [];
    var drop = function (name, why, instead) { left.push(instead ? { name: name, why: why, instead: instead } : { name: name, why: why }); };
    var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };

    /* Decide one tutorial. Returns the name to take, or "" if it is left out. */
    var settle = function (name, point, quiet) {
      var why = "", instead = "";
      /* A tutorial the reader has finished is never left out for being
         something they already know: they did it, so it stays and counts.
         In R the tutorial they would take is the R version, so that is the
         one that has to be finished. */
      var taken = inR && has(rules.in_r, name) && rules.in_r[name] ? rules.in_r[name] : name;
      var fresh = !isFinished(record, taken);
      if (fresh && isSkipped(record, point)) why = "skip";
      else if (fresh && profile.portal === "yes" && point === "p1") why = "portal";
      else if (fresh && profile.data === "yes" && point === "p2" && rules.foundations.indexOf(name) < 0) why = "data";
      else if (inR && has(rules.in_r, name)) {
        if (rules.in_r[name]) { why = "r"; instead = rules.in_r[name]; }
      } else if (inR && (manifest.tutorials[name].builds_on || []).indexOf("load-a-file") >= 0) why = "python-only";
      if (!why) return name;
      if (!quiet) drop(name, why, instead);
      return instead;
    };

    pathway.stages.forEach(function (stage) {
      stage.tutorials.forEach(function (name) {
        var take = settle(name, stage.point, false);
        if (take && names.indexOf(take) < 0) names.push(take);
      });
    });

    /* In R, a step R does not need goes too, unless something kept still builds on it. */
    if (inR) {
      names = names.filter(function (name) {
        if (!has(rules.in_r, name) || rules.in_r[name]) return true;
        var needed = names.some(function (other) { return (manifest.tutorials[other].builds_on || []).indexOf(name) >= 0; });
        if (!needed) drop(name, "r-unneeded");
        return needed;
      });
    }

    /* The time the reader has: trim from the end, then add "more" while it fits. */
    if (profile.minutes) {
      var spent = 0, kept = [];
      names.forEach(function (name) {
        var cost = manifest.tutorials[name].max;
        if (!kept.length || spent + cost <= profile.minutes) { kept.push(name); spent += cost; }
        else drop(name, "time");
      });
      var trimmed = kept.length < names.length;
      names = kept;
      if (!trimmed) {
        pathway.stages.forEach(function (stage) {
          stage.more.forEach(function (name) {
            var take = settle(name, stage.point, true);
            if (!take || names.indexOf(take) >= 0) return;
            if (inR && has(rules.in_r, take) && !rules.in_r[take]) return;
            var cost = manifest.tutorials[take].max;
            if (spent + cost <= profile.minutes) { names.push(take); spent += cost; }
          });
        });
      }
    }
    /* Walk the route point by point: something added because there is time
       sits with its own point, after that point's essentials. */
    var stageOf = function (name) {
      for (var i = 0; i < pathway.stages.length; i++) {
        if (stageNames(manifest, pathway.stages[i]).indexOf(name) >= 0) return i;
      }
      return pathway.stages.length;
    };
    names = names.map(function (name, i) { return { name: name, stage: stageOf(name), i: i }; })
      .sort(function (x, y) { return x.stage - y.stage || x.i - y.i; })
      .map(function (x) { return x.name; });
    return { names: names, left: left };
  }

  function why(code) { return WHY[code] || ""; }

  /* True when the reader's answers or skip-checks changed a pathway's route. */
  function isTailored(record) {
    return Object.keys(record.profile || {}).length > 0;
  }

  /* The tutorials on the reader's route through a pathway, in order. */
  function openNames(pathway, record, manifest) {
    return plan(manifest, pathway, record).names;
  }

  /* Progress on a pathway, over the reader's own route. */
  function route(pathway, record, manifest) {
    return progress(openNames(pathway, record, manifest), record, manifest);
  }

  /* Combine an imported record with the one already here. Nothing finished is
     lost: an entry in either stays, and the earlier "done" date is kept. */
  function merge(here, incoming) {
    var out = validate(here).record;
    var add = validate(incoming).record;
    if (!out.started || (add.started && add.started < out.started)) out.started = add.started || out.started;
    if (!out.pathway) out.pathway = add.pathway;
    Object.keys(add.profile).forEach(function (k) { if (out.profile[k] === undefined) out.profile[k] = add.profile[k]; });
    Object.keys(add.tutorials).forEach(function (name) {
      var a = out.tutorials[name], b = add.tutorials[name];
      if (!a) { out.tutorials[name] = b; return; }
      var joined = { done: a.done < b.done ? a.done : b.done };
      var checked = [a.checked, b.checked].filter(Boolean).sort()[0];
      if (checked) joined.checked = checked;
      joined.rev = a.rev > b.rev ? a.rev : b.rev;
      out.tutorials[name] = joined;
    });
    Object.keys(add.checks).forEach(function (id) {
      var a = out.checks[id], b = add.checks[id];
      if (!a || (b.correct && !a.correct) || (b.correct === a.correct && b.on > a.on)) out.checks[id] = b;
    });
    Object.keys(add.points).forEach(function (p) {
      var a = out.points[p] || {}, b = add.points[p];
      ["level", "skipped", "reflection", "on"].forEach(function (k) {
        if (a[k] === undefined && b[k] !== undefined) a[k] = b[k];
      });
      out.points[p] = a;
    });
    return validate(out).record;
  }

  /* Read an exported file's text. Returns { ok, record, errors }. */
  function parseImport(text) {
    var raw;
    if (typeof text !== "string" || text.length > 1000000) return { ok: false, errors: ["the file is too large"], record: null };
    try { raw = JSON.parse(text); } catch (e) { return { ok: false, errors: ["the file is not a progress file"], record: null }; }
    var moved = migrate(raw);
    if (moved.status === "newer") return { ok: false, errors: ["the file was made by a newer version of this site"], record: null };
    if (moved.status !== "ok") return { ok: false, errors: ["the file is not a progress file"], record: null };
    return validate(moved.record);
  }

  /* --- questions about the record, given the manifest (pathways.json) --- */

  function state(record, name) {
    var t = record.tutorials[name];
    return !t ? "todo" : t.checked ? "checked" : "done";
  }

  function isFinished(record, name) {
    return Boolean(record.tutorials[name]);
  }

  /* True when the tutorial was revised after the learner finished it. */
  function isUpdated(record, name, manifest) {
    var t = record.tutorials[name], facts = manifest.tutorials[name];
    return Boolean(t && facts && t.rev && facts.revised && t.rev < facts.revised);
  }

  function isStale(facts, day) {
    return Boolean(facts && facts.stale_after && day >= facts.stale_after.slice(0, 10));
  }

  function core(pathway) {
    return pathway.stages.reduce(function (all, s) { return all.concat(s.tutorials); }, []);
  }

  function findPathway(manifest, id) {
    return manifest.pathways.filter(function (p) { return p.id === id; })[0] || null;
  }

  /* Progress through a list of tutorials: counts, minutes left, and the next one. */
  function progress(names, record, manifest) {
    var left = names.filter(function (n) { return !isFinished(record, n); });
    var sum = function (key) {
      return left.reduce(function (t, n) { return t + (manifest.tutorials[n] ? manifest.tutorials[n][key] : 0); }, 0);
    };
    return { done: names.length - left.length, total: names.length, minLeft: sum("min"), maxLeft: sum("max"), next: left[0] || "" };
  }

  /* The tutorial to suggest after `name` in a list: the first unfinished one
     later in the list, else the first unfinished one anywhere, else "". */
  function nextAfter(names, name, record) {
    var at = names.indexOf(name);
    var open = function (n) { return n !== name && !isFinished(record, n); };
    return names.slice(at + 1).filter(open)[0] || names.filter(open)[0] || "";
  }

  /* The index of the stage the reader is in: the first that still has a
     tutorial on their route to do. -1 when the route is finished. */
  /* The tutorials a stage lists, with the R versions that stand in for them. A
     reader's route can hold a stand-in the pathway itself never names. */
  function stageNames(manifest, stage) {
    var swaps = (manifest && manifest.tailoring && manifest.tailoring.in_r) || {};
    var listed = stage.tutorials.concat(stage.more);
    return listed.concat(listed.map(function (n) { return swaps[n]; }).filter(Boolean));
  }

  function currentStage(pathway, record, manifest) {
    var names = manifest ? plan(manifest, pathway, record).names : core(pathway);
    for (var i = 0; i < pathway.stages.length; i++) {
      var here = stageNames(manifest, pathway.stages[i]);
      if (here.some(function (n) { return names.indexOf(n) >= 0 && !isFinished(record, n); })) return i;
    }
    return -1;
  }

  /* The pathways that hold a tutorial, the learner's chosen one first. The
     chosen pathway also holds whatever the reader's own route puts on it. */
  function pathwaysWith(manifest, name, record) {
    var holds = manifest.pathways.filter(function (p) {
      if (p.stages.some(function (s) { return s.tutorials.concat(s.more).indexOf(name) >= 0; })) return true;
      return p.id === record.pathway && plan(manifest, p, record).names.indexOf(name) >= 0;
    });
    return holds.sort(function (a, b) { return (b.id === record.pathway) - (a.id === record.pathway); });
  }

  function pointNames(manifest, point) {
    return (manifest.by_point[point] || []).reduce(function (all, g) { return all.concat(g.tutorials); }, []);
  }

  function minutes(low, high) {
    return low === high ? low + " minutes" : low + " to " + high + " minutes";
  }

  return {
    SCHEMA: SCHEMA, KEY: KEY, LEVELS: LEVELS,
    empty: empty, today: today, validate: validate, migrate: migrate, load: load, save: save,
    serialize: serialize, clear: clear, isBlank: isBlank, markDone: markDone, unmark: unmark,
    setPathway: setPathway, setLevel: setLevel, merge: merge, parseImport: parseImport,
    state: state, isFinished: isFinished, isUpdated: isUpdated, isStale: isStale, core: core,
    findPathway: findPathway, progress: progress, nextAfter: nextAfter, currentStage: currentStage,
    pathwaysWith: pathwaysWith, pointNames: pointNames, minutes: minutes,
    grade: grade, recordCheck: recordCheck, isCorrect: isCorrect, skipState: skipState,
    syncSkipped: syncSkipped, isSkipped: isSkipped, setReflection: setReflection,
    reflectionsMarkdown: reflectionsMarkdown, openNames: openNames, route: route,
    PROFILE: PROFILE, setProfile: setProfile, plan: plan, why: why, isTailored: isTailored
  };
});
