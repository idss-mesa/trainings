/* MESA Trainings: the learner's record, as plain logic with no page access.

   The record lives only in this browser's localStorage, under one key. Nothing
   here makes a network request. The page script (mesa-pathways.js) draws what
   this file computes; tests/progress.test.js runs this file under Node.

   The record (schema 1):
     { schema, started, pathway,
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

  var SCHEMA = 1;
  var KEY = "mesa-trainings";
  var LEVELS = ["exploring", "investigating", "extending"];
  var DATE = /^\d{4}-\d{2}-\d{2}$/;
  var NAME = /^[a-z0-9][a-z0-9-]{0,79}$/;
  var POINT = /^p[1-5]$/;
  var MAX_TEXT = 4000;

  /* Changes of schema: MIGRATIONS[n] turns a schema-n record into schema n+1. */
  var MIGRATIONS = {};

  function empty() {
    return { schema: SCHEMA, started: "", pathway: "", tutorials: {}, checks: {}, points: {} };
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
    only(raw, ["schema", "started", "pathway", "tutorials", "checks", "points"], "record");
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
    return !record.pathway && !Object.keys(record.tutorials).length &&
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

  /* Combine an imported record with the one already here. Nothing finished is
     lost: an entry in either stays, and the earlier "done" date is kept. */
  function merge(here, incoming) {
    var out = validate(here).record;
    var add = validate(incoming).record;
    if (!out.started || (add.started && add.started < out.started)) out.started = add.started || out.started;
    if (!out.pathway) out.pathway = add.pathway;
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

  /* The index of the stage the learner is in: the first with something left. */
  function currentStage(pathway, record) {
    for (var i = 0; i < pathway.stages.length; i++) {
      if (pathway.stages[i].tutorials.some(function (n) { return !isFinished(record, n); })) return i;
    }
    return -1;
  }

  /* The pathways that hold a tutorial, the learner's chosen one first. */
  function pathwaysWith(manifest, name, record) {
    var holds = manifest.pathways.filter(function (p) {
      return p.stages.some(function (s) { return s.tutorials.concat(s.more).indexOf(name) >= 0; });
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
    pathwaysWith: pathwaysWith, pointNames: pointNames, minutes: minutes
  };
});
