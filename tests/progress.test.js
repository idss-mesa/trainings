// Tests for docs/javascripts/mesa-progress.js.
// Run from the repository root:  node --test tests/progress.test.js
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const P = require("../docs/javascripts/mesa-progress.js");

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "../docs/assets/pathways.json"), "utf8"));

function memory(initial) {
  const items = new Map(Object.entries(initial || {}));
  return {
    getItem: (k) => (items.has(k) ? items.get(k) : null),
    setItem: (k, v) => items.set(k, String(v)),
    removeItem: (k) => items.delete(k),
    items,
  };
}
const broken = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); }, removeItem() { throw new Error("blocked"); } };

test("a new browser has an empty record", () => {
  const got = P.load(memory());
  assert.equal(got.status, "empty");
  assert.deepEqual(got.record, P.empty());
  assert.ok(P.isBlank(got.record));
});

test("storage that throws is reported, not fatal", () => {
  assert.equal(P.load(broken).status, "unavailable");
  assert.equal(P.save(broken, P.empty()), false);
});

test("marking done records the day and the revision, and survives a reload", () => {
  const store = memory();
  const rec = P.markDone(P.empty(), "sign-in", "2026-11-11T00:00:00Z", "2026-11-14");
  assert.equal(P.state(rec, "sign-in"), "done");
  assert.equal(rec.started, "2026-11-14");
  assert.ok(P.save(store, rec));
  const again = P.load(store);
  assert.equal(again.status, "ok");
  assert.deepEqual(again.record, rec);
});

test("marking done again keeps the first date and a check, and takes the new revision", () => {
  const rec = P.empty();
  rec.tutorials["load-a-file"] = { done: "2026-11-01", checked: "2026-11-02", rev: "2026-10-01T00:00:00Z" };
  P.markDone(rec, "load-a-file", "2026-11-12T00:00:00Z", "2026-11-14");
  assert.deepEqual(rec.tutorials["load-a-file"], { done: "2026-11-01", checked: "2026-11-02", rev: "2026-11-12T00:00:00Z" });
  assert.equal(P.state(rec, "load-a-file"), "checked");
});

test("undo removes the tick", () => {
  const rec = P.markDone(P.empty(), "sign-in", "r", "2026-11-14");
  P.unmark(rec, "sign-in");
  assert.equal(P.state(rec, "sign-in"), "todo");
});

test("a tutorial revised after it was finished is flagged, and the tick is kept", () => {
  const rec = P.markDone(P.empty(), "sign-in", "2026-01-01T00:00:00Z", "2026-01-02");
  assert.equal(P.isUpdated(rec, "sign-in", manifest), true);
  assert.equal(P.isFinished(rec, "sign-in"), true);
  P.markDone(rec, "sign-in", manifest.tutorials["sign-in"].revised, "2026-11-14");
  assert.equal(P.isUpdated(rec, "sign-in", manifest), false);
  assert.equal(rec.tutorials["sign-in"].done, "2026-01-02");
});

test("a tutorial past its review date is stale", () => {
  const facts = { stale_after: "2027-05-11T00:00:00Z" };
  assert.equal(P.isStale(facts, "2027-05-10"), false);
  assert.equal(P.isStale(facts, "2027-05-11"), true);
  assert.equal(P.isStale({ stale_after: "" }, "2030-01-01"), false);
});

test("progress, time left, and the next step follow the pathway's order", () => {
  const route = P.findPathway(manifest, "new-to-mesa");
  const names = P.core(route);
  assert.deepEqual(names, ["sign-in", "launch-jupyterlab", "save-your-work"]);
  const rec = P.empty();
  let got = P.route(route, rec, manifest);
  assert.deepEqual([got.done, got.total, got.next], [0, 3, "sign-in"]);
  assert.deepEqual([got.minLeft, got.maxLeft], [route.min, route.max]);
  P.markDone(rec, "sign-in", "r", "2026-11-14");
  P.markDone(rec, "save-your-work", "r", "2026-11-14");
  got = P.route(route, rec, manifest);
  assert.deepEqual([got.done, got.next], [2, "launch-jupyterlab"]);
  assert.equal(P.nextAfter(names, "sign-in", rec), "launch-jupyterlab");
  assert.equal(P.nextAfter(names, "save-your-work", rec), "launch-jupyterlab");
  assert.equal(P.currentStage(route, rec, manifest), 0);
  names.forEach((n) => P.markDone(rec, n, "r", "2026-11-14"));
  assert.equal(P.route(route, rec, manifest).next, "");
  assert.equal(P.nextAfter(names, "sign-in", rec), "");
  assert.equal(P.currentStage(route, rec, manifest), -1);
});

test("the chosen pathway comes first among those that hold a tutorial", () => {
  const rec = P.setPathway(P.empty(), "use-an-ai-agent");
  const ids = P.pathwaysWith(manifest, "load-a-file", rec).map((p) => p.id);
  assert.equal(ids[0], "use-an-ai-agent");
  assert.ok(ids.includes("check-a-dataset"));
  assert.deepEqual(P.pathwaysWith(manifest, "make-a-folder", rec), []);
});

test("every tutorial belongs to exactly one point list", () => {
  const all = Object.keys(manifest.points).flatMap((p) => P.pointNames(manifest, p));
  assert.deepEqual([...all].sort(), Object.keys(manifest.tutorials).sort());
});

test("levels are set and removed", () => {
  const rec = P.setLevel(P.empty(), "p2", "investigating", "2026-11-14");
  assert.deepEqual(rec.points.p2, { level: "investigating", on: "2026-11-14" });
  P.setLevel(rec, "p2", "", "2026-11-15");
  assert.deepEqual(rec.points, {});
});

test("schema migration runs each step in order", () => {
  const steps = {
    1: (r) => ({ schema: 2, tutorials: r.tutorials, note: "one" }),
    2: (r) => ({ schema: 3, tutorials: r.tutorials, note: r.note + ",two" }),
  };
  const got = P.migrate({ schema: 1, tutorials: { a: 1 } }, steps, 3);
  assert.equal(got.status, "ok");
  assert.deepEqual(got.record, { schema: 3, tutorials: { a: 1 }, note: "one,two" });
  assert.equal(P.migrate({ schema: 1 }, {}, 2).status, "invalid");
  assert.equal(P.migrate({ schema: 4 }, steps, 3).status, "newer");
  assert.equal(P.migrate({ tutorials: {} }).status, "invalid");
  assert.equal(P.migrate(null).status, "invalid");
});

test("a record from a newer version is left untouched", () => {
  const text = JSON.stringify({ schema: 99, future: true });
  const store = memory({ [P.KEY]: text });
  assert.equal(P.load(store).status, "newer");
  assert.equal(store.items.get(P.KEY), text);
});

test("an unreadable record is copied aside before anything replaces it", () => {
  const store = memory({ [P.KEY]: "{not json" });
  assert.equal(P.load(store).status, "invalid");
  assert.equal(store.items.get(P.KEY + ".unreadable"), "{not json");
});

test("import accepts an exported record exactly", () => {
  const rec = P.empty();
  P.setPathway(rec, "new-to-mesa");
  P.markDone(rec, "sign-in", "2026-11-11T00:00:00Z", "2026-11-14");
  rec.tutorials["load-a-file"] = { done: "2026-11-14", checked: "2026-11-15", rev: "x" };
  rec.checks["rows-without-repeats"] = { correct: true, tries: 2, sure: 3, on: "2026-11-15" };
  rec.points.p2 = { level: "exploring", reflection: "Check the units first.", on: "2026-11-15" };
  const text = P.serialize(rec);
  const got = P.parseImport(text);
  assert.equal(got.ok, true);
  assert.equal(P.serialize(got.record), text);
  assert.deepEqual(got.record, P.validate(rec).record);
});

test("import rejects anything that is not a progress record", () => {
  const bad = [
    "not json",
    "[]",
    JSON.stringify({ schema: 3 }),
    JSON.stringify({ schema: 0 }),
    JSON.stringify({ schema: 1, extra: 1 }),
    JSON.stringify({ schema: 2, profile: { portal: "maybe" } }),
    JSON.stringify({ schema: 2, profile: { minutes: 45 } }),
    JSON.stringify({ schema: 2, profile: { name: "x" } }),
    JSON.stringify({ schema: 1, tutorials: { "Bad Name": { done: "2026-11-14", rev: "" } } }),
    JSON.stringify({ schema: 1, tutorials: { a: { done: "yesterday", rev: "" } } }),
    JSON.stringify({ schema: 1, tutorials: { a: { done: "2026-11-14", rev: "", score: 10 } } }),
    JSON.stringify({ schema: 1, tutorials: { __proto__: { done: "2026-11-14", rev: "" } } }).replace('"tutorials":{}', '"tutorials":{"__proto__":{"done":"2026-11-14","rev":""}}'),
    JSON.stringify({ schema: 1, checks: { a: { correct: "yes", tries: 1, on: "2026-11-14" } } }),
    JSON.stringify({ schema: 1, points: { p9: { level: "exploring" } } }),
    JSON.stringify({ schema: 1, points: { p1: { level: "expert" } } }),
    JSON.stringify({ schema: 1, points: { p1: { reflection: "x".repeat(4001) } } }),
    JSON.stringify({ schema: 1, pathway: "<script>" }),
    "x".repeat(1000001),
  ];
  for (const text of bad) assert.equal(P.parseImport(text).ok, false, text.slice(0, 60));
});

test("merge keeps everything finished in either record", () => {
  const here = P.empty();
  here.tutorials.a = { done: "2026-11-10", rev: "1" };
  here.tutorials.b = { done: "2026-11-12", rev: "2" };
  const file = P.empty();
  file.pathway = "work-in-r";
  file.tutorials.b = { done: "2026-11-11", checked: "2026-11-13", rev: "1" };
  file.tutorials.c = { done: "2026-11-09", rev: "1" };
  file.points.p1 = { level: "exploring", on: "2026-11-09" };
  const got = P.merge(here, file);
  assert.deepEqual(Object.keys(got.tutorials), ["a", "b", "c"]);
  assert.deepEqual(got.tutorials.b, { done: "2026-11-11", checked: "2026-11-13", rev: "2" });
  assert.equal(got.pathway, "work-in-r");
  assert.equal(got.points.p1.level, "exploring");
});

test("clear removes the record", () => {
  const store = memory();
  P.save(store, P.markDone(P.empty(), "sign-in", "r", "2026-11-14"));
  assert.ok(P.clear(store));
  assert.equal(P.load(store).status, "empty");
});

test("minutes are worded as on the pages", () => {
  assert.equal(P.minutes(5, 5), "5 minutes");
  assert.equal(P.minutes(30, 40), "30 to 40 minutes");
});

// --- self-checks, skip-checks, reflections (phase 4) ---

test("every self-check accepts its own answer and explains each listed slip", () => {
  const ids = Object.keys(manifest.checks);
  assert.ok(ids.length >= 15);
  for (const id of ids) {
    const check = manifest.checks[id];
    const right = P.grade(check, check.answer);
    assert.deepEqual([right.correct, right.message], [true, check.right], id);
    for (const [slip, why] of Object.entries(check.slips)) {
      const wrong = P.grade(check, slip);
      assert.deepEqual([wrong.correct, wrong.message], [false, why], id + " / " + slip);
    }
    assert.equal(P.grade(check, "").empty, true);
  }
});

test("a number may be typed with a unit, spaces, or a thousands comma", () => {
  const check = manifest.checks["g02-in-millimetres"];
  for (const typed of ["29.2", " 29.2 mm", "29.20", "29.2mm"]) assert.equal(P.grade(check, typed).correct, true, typed);
  assert.equal(P.grade(check, "29.3").correct, false);
  assert.equal(P.grade(check, "29.3").message, check.otherwise);
  assert.match(P.grade(check, "about thirty").message, /as a number/);
  assert.equal(P.grade({ options: [], answer: "1151", slips: {}, otherwise: "o", right: "r" }, "1,151").correct, true);
});

test("a correct self-check marks its tutorial checked and done; a wrong one marks nothing", () => {
  const check = manifest.checks["rows-without-repeats"];
  const rec = P.empty();
  P.recordCheck(rec, "rows-without-repeats", check, false, 4, "2026-11-14", "rev1");
  assert.deepEqual(rec.checks["rows-without-repeats"], { correct: false, tries: 1, sure: 4, on: "2026-11-14" });
  assert.equal(P.state(rec, check.tutorial), "todo");
  P.recordCheck(rec, "rows-without-repeats", check, true, 0, "2026-11-15", "rev1");
  assert.deepEqual(rec.checks["rows-without-repeats"], { correct: true, tries: 2, sure: 4, on: "2026-11-15" });
  assert.deepEqual(rec.tutorials[check.tutorial], { done: "2026-11-15", checked: "2026-11-15", rev: "rev1" });
  P.recordCheck(rec, "rows-without-repeats", check, false, 0, "2026-11-16", "rev1");
  assert.equal(P.isCorrect(rec, "rows-without-repeats"), true);
  assert.equal(rec.checks["rows-without-repeats"].on, "2026-11-15");
  assert.equal(P.validate(rec).ok, true);
});

test("a correct self-check keeps the day a tutorial was first marked done", () => {
  const check = manifest.checks["last-row"];
  const rec = P.markDone(P.empty(), "load-a-file", "rev0", "2026-11-01");
  P.recordCheck(rec, "last-row", check, true, 0, "2026-11-14", "rev9");
  assert.deepEqual(rec.tutorials["load-a-file"], { done: "2026-11-01", checked: "2026-11-14", rev: "rev0" });
});

test("a skip-check is passed only when every question is right, and it moves the route on", () => {
  const rec = P.empty();
  assert.equal(P.skipState(manifest, rec, "p2"), "open");
  assert.equal(P.skipState(manifest, rec, "p5"), "none");
  const ids = manifest.points.p2.skip_check;
  P.recordCheck(rec, ids[0], manifest.checks[ids[0]], false, 0, "2026-11-14", "r");
  assert.equal(P.skipState(manifest, rec, "p2"), "missed");
  ids.forEach((id) => P.recordCheck(rec, id, manifest.checks[id], true, 0, "2026-11-14", "r"));
  assert.equal(P.skipState(manifest, rec, "p2"), "passed");
  P.syncSkipped(manifest, rec, "2026-11-14");
  assert.equal(P.isSkipped(rec, "p2"), true);
  assert.equal(P.isSkipped(rec, "p1"), false);

  const pathway = P.findPathway(manifest, "check-a-dataset");
  const got = P.route(pathway, rec, manifest);
  assert.deepEqual([got.done, got.total, got.next], [0, 0, ""], "every essential of this pathway is in the skipped point");
  assert.deepEqual(P.plan(manifest, pathway, rec).left.map((l) => l.why), ["skip", "skip", "skip", "skip", "skip"]);
  assert.equal(P.currentStage(pathway, rec, manifest), -1);
  assert.equal(P.state(rec, "practice-data"), "todo", "skipping never ticks a tutorial");
  const session = P.findPathway(manifest, "get-ready-for-a-session");
  assert.deepEqual(P.openNames(session, rec, manifest), ["sign-in", "launch-jupyterlab"]);
});

test("reflections are kept, trimmed to the limit, and removed when emptied", () => {
  const rec = P.setReflection(P.empty(), "p2", "Check the units first.", "2026-11-14");
  assert.deepEqual(rec.points.p2, { reflection: "Check the units first.", on: "2026-11-14" });
  P.setReflection(rec, "p3", "x".repeat(5000), "2026-11-14");
  assert.equal(rec.points.p3.reflection.length, 4000);
  assert.equal(P.validate(rec).ok, true);
  P.setReflection(rec, "p2", "   ", "2026-11-15");
  assert.equal(rec.points.p2, undefined);
});

test("reflections export as Markdown with the prompt, the level, and what was finished", () => {
  const rec = P.empty();
  P.setReflection(rec, "p2", "Check the units first.\n", "2026-11-14");
  P.setLevel(rec, "p2", "exploring", "2026-11-14");
  P.markDone(rec, "load-a-file", "r", "2026-11-14");
  const text = P.reflectionsMarkdown(rec, manifest, "2026-11-14");
  assert.match(text, /^# My MESA Trainings notes\n/);
  assert.match(text, /## 2\. Run and understand\n\n- Tutorials done: 1 of 11\n- My level: Exploring\n/);
  assert.match(text, /\*\*What would you check first if this result looked wrong\?\*\*\n\nCheck the units first\.\n/);
  assert.match(text, /- Done: Load a file from your Data Store into a notebook\n/);
  assert.match(text, /## 1\. Orient and navigate[\s\S]*_Nothing written yet\._/);
  assert.ok(text.endsWith("\n") && !text.endsWith("\n\n"));
});

// --- shorter, tailored pathways ---

function planFor(id, profile) {
  const rec = P.empty();
  Object.entries(profile).forEach(([k, v]) => P.setProfile(rec, k, v));
  return P.plan(manifest, P.findPathway(manifest, id), rec);
}

test("the essentials of every pathway fit in 25 minutes", () => {
  for (const pathway of manifest.pathways) {
    assert.ok(pathway.max <= 25, pathway.id + " takes up to " + pathway.max);
    assert.ok(P.core(pathway).length >= 1, pathway.id);
    assert.deepEqual(planFor(pathway.id, {}), { names: P.core(pathway), left: [] }, pathway.id);
  }
});

test("session preparation shrinks with what the reader already knows", () => {
  const id = "get-ready-for-a-session";
  assert.deepEqual(planFor(id, {}).names, ["sign-in", "launch-jupyterlab", "practice-data", "load-a-file"]);
  const knows = planFor(id, { portal: "yes" });
  assert.deepEqual(knows.names, ["practice-data", "load-a-file"]);
  assert.deepEqual(knows.left, [{ name: "sign-in", why: "portal" }, { name: "launch-jupyterlab", why: "portal" }]);
  const inR = planFor(id, { language: "r" });
  assert.deepEqual(inR.names, ["sign-in", "r-load-a-file"]);
  assert.deepEqual(inR.left.find((l) => l.name === "load-a-file"), { name: "load-a-file", why: "r", instead: "r-load-a-file" });
  assert.deepEqual(inR.left.filter((l) => l.why === "r-unneeded").map((l) => l.name), ["launch-jupyterlab", "practice-data"]);
  assert.deepEqual(planFor(id, { portal: "yes", language: "r" }).names, ["r-load-a-file"]);
  assert.deepEqual(planFor(id, { portal: "no", language: "python", data: "no" }).names, P.core(P.findPathway(manifest, id)));
});

test("a reader who has checked data before keeps only what later tutorials build on", () => {
  const got = planFor("check-a-dataset", { data: "yes" });
  assert.deepEqual(got.names, ["practice-data", "load-a-file"]);
  assert.deepEqual(got.left.map((l) => l.why), ["data", "data", "data"]);
});

test("in R, a step is kept when something on the route still needs it, and Python-only steps are named", () => {
  assert.deepEqual(planFor("new-to-mesa", { language: "r" }).names, ["sign-in", "launch-jupyterlab", "save-your-work"]);
  const got = planFor("check-a-dataset", { language: "r" });
  assert.deepEqual(got.names, ["r-load-a-file", "r-tally-a-quality-flag"]);
  assert.deepEqual(got.left.filter((l) => l.why === "python-only").map((l) => l.name), ["read-the-data-dictionary", "check-range-and-missing"]);
});

test("the time a reader has trims the route, or fills it with more", () => {
  const short = planFor("get-ready-for-a-session", { minutes: 15 });
  assert.deepEqual(short.names, ["sign-in", "launch-jupyterlab"]);
  assert.deepEqual(short.left, [{ name: "practice-data", why: "time" }, { name: "load-a-file", why: "time" }]);
  const long = planFor("get-ready-for-a-session", { minutes: 60 });
  assert.deepEqual(long.names.slice(0, 4), ["sign-in", "launch-jupyterlab", "practice-data", "load-a-file"]);
  assert.ok(long.names.length > 4 && long.left.length === 0);
  const cost = long.names.reduce((sum, n) => sum + manifest.tutorials[n].max, 0);
  assert.ok(cost <= 60, "fits the hour: " + cost);
  assert.equal(new Set(long.names).size, long.names.length);
  const rec = P.empty();
  rec.profile.minutes = 1; // below any tutorial: the route still keeps its first step
  assert.deepEqual(P.plan(manifest, P.findPathway(manifest, "get-ready-for-a-session"), rec).names, ["sign-in"]);
  const rHour = planFor("work-in-r", { language: "r", minutes: 60 }).names;
  assert.deepEqual(rHour, ["r-load-a-file", "r-tally-a-quality-flag", "map-points-in-rstudio", "r-query-parquet-with-duckdb"]);
});

test("every reason for leaving a tutorial out has words", () => {
  for (const code of ["skip", "portal", "data", "r", "r-unneeded", "python-only", "time"]) assert.ok(P.why(code).length > 10, code);
});

test("answers are kept, changed, cleared, exported, and checked on import", () => {
  const rec = P.empty();
  P.setProfile(rec, "portal", "yes");
  P.setProfile(rec, "minutes", 30);
  P.setProfile(rec, "language", "cobol");
  assert.deepEqual(rec.profile, { portal: "yes", minutes: 30 });
  assert.equal(P.isTailored(rec), true);
  assert.equal(P.isBlank(rec), false);
  const back = P.parseImport(P.serialize(rec));
  assert.equal(back.ok, true);
  assert.deepEqual(back.record.profile, { portal: "yes", minutes: 30 });
  P.setProfile(rec, "portal", "");
  P.setProfile(rec, "minutes", 0);
  assert.equal(P.isTailored(rec), false);
});

test("a schema 1 record, from before the answers existed, is brought forward untouched", () => {
  const old = { schema: 1, started: "2026-11-01", pathway: "new-to-mesa",
    tutorials: { "sign-in": { done: "2026-11-01", rev: "r" } }, checks: {}, points: { p1: { level: "exploring", on: "2026-11-01" } } };
  const store = memory({ [P.KEY]: JSON.stringify(old) });
  const got = P.load(store);
  assert.equal(got.status, "ok");
  assert.equal(got.record.schema, 2);
  assert.deepEqual(got.record.profile, {});
  assert.deepEqual(got.record.tutorials, old.tutorials);
  assert.deepEqual(got.record.points, old.points);
  assert.equal(P.parseImport(JSON.stringify(old)).ok, true, "an exported schema 1 file still imports");
  assert.equal(P.load(memory({ [P.KEY]: JSON.stringify({ schema: 3 }) })).status, "newer");
});

test("an R version on the reader's route belongs to the pathway being followed", () => {
  const rec = P.setPathway(P.empty(), "get-ready-for-a-session");
  rec.profile = { portal: "yes", language: "r", minutes: 30 };
  const session = P.findPathway(manifest, "get-ready-for-a-session");
  assert.deepEqual(P.openNames(session, rec, manifest), ["r-load-a-file", "r-tally-a-quality-flag"]);
  assert.equal(P.pathwaysWith(manifest, "r-load-a-file", rec)[0].id, "get-ready-for-a-session");
  assert.equal(P.nextAfter(P.openNames(session, rec, manifest), "r-load-a-file", rec), "r-tally-a-quality-flag");
  /* "You are here" is the point whose tutorial the R version stands in for. */
  assert.equal(P.currentStage(session, rec, manifest), 1);
  /* Without the answers, the R tutorial is on Work in R only. */
  const plain = P.setPathway(P.empty(), "get-ready-for-a-session");
  assert.deepEqual(P.pathwaysWith(manifest, "r-load-a-file", plain).map((p) => p.id), ["work-in-r"]);
});
