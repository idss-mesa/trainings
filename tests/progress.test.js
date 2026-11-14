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
  const rec = P.empty();
  let got = P.progress(names, rec, manifest);
  assert.deepEqual([got.done, got.total, got.next], [0, 6, "sign-in"]);
  assert.deepEqual([got.minLeft, got.maxLeft], [route.min, route.max]);
  P.markDone(rec, "sign-in", "r", "2026-11-14");
  P.markDone(rec, "find-community-data", "r", "2026-11-14");
  got = P.progress(names, rec, manifest);
  assert.deepEqual([got.done, got.next], [2, "find-your-way-around"]);
  assert.equal(P.nextAfter(names, "find-community-data", rec), "launch-jupyterlab");
  assert.equal(P.nextAfter(names, "stop-app-find-results", rec), "find-your-way-around");
  assert.equal(P.currentStage(route, rec), 0);
  names.forEach((n) => P.markDone(rec, n, "r", "2026-11-14"));
  assert.equal(P.progress(names, rec, manifest).next, "");
  assert.equal(P.nextAfter(names, "sign-in", rec), "");
  assert.equal(P.currentStage(route, rec), -1);
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
    JSON.stringify({ schema: 2 }),
    JSON.stringify({ schema: 1, extra: 1 }),
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
  assert.equal(got.total, 7);
  assert.equal(got.done, 3, "only the three tutorials whose checks were answered count as done");
  assert.equal(got.next, "reconcile-a-join", "the route passes over the skipped point");
  assert.equal(P.currentStage(pathway, rec), 1);
  assert.equal(P.state(rec, "practice-data"), "todo", "skipping never ticks a tutorial");
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
