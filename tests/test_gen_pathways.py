"""Tests for scripts/gen_pathways.py.

Run from the repository root:  python -m unittest discover tests
"""
import copy
import sys
import unittest
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
import gen_pathways as gp  # noqa: E402

DATA = yaml.safe_load((ROOT / "data" / "pathways.yml").read_text(encoding="utf-8"))


def tutorial(point="p1", low=5, high=5):
    return {"title": "T", "description": "D.", "outcome": "have T.", "point": point, "min": low, "max": high, "status": "draft",
            "revised": "2026-11-14T00:00:00Z", "stale_after": "2027-05-14T00:00:00Z",
            "builds_on": []}


def small_data():
    return {
        "schema": 1, "revised": "2026-11-14",
        "points": {"p1": {"title": "One", "competency": "Do one", "can_do": "You can."},
                   "p2": {"title": "Two", "competency": "Two", "can_do": "You can too."}},
        "pathways": [{"id": "a", "title": "A", "promise": "Do A.",
                      "stages": [{"point": "p1", "tutorials": ["x"], "more": ["y"]}]}],
        "by_point": {"p1": [{"tutorials": ["x"]}]},
    }


class TimeLine(unittest.TestCase):
    def test_single(self):
        self.assertEqual(gp.parse_time("**Time:** 5 minutes. **You need:** a browser.\n\n"), (5, 5))

    def test_range_in_words(self):
        self.assertEqual(gp.parse_time("**Time:** 5 to 10 minutes. **You need:** x.\n"), (5, 10))

    def test_range_with_dash(self):
        self.assertEqual(gp.parse_time("**Time:** 5–10 minutes. **You need:** x.\n"), (5, 10))

    def test_trailing_clause(self):
        body = "**Time:** 10 minutes, some of it waiting. **You need:** x.\n"
        self.assertEqual(gp.parse_time(body), (10, 10))

    def test_absent(self):
        self.assertIsNone(gp.parse_time("No time is given here.\n"))

    def test_needs_span_lines_and_skip_other_links(self):
        body = ("**Time:** 5 minutes. **You need:** the notebook from\n"
                "[Load a file](load-a-file.md), open in [JupyterLab](launch-jupyterlab.md#x),\n"
                "and [a key](https://example.org/), and [again](load-a-file.md).\n\n"
                "## Steps\n\n1. See [another](sign-in.md).\n")
        self.assertEqual(gp.parse_needs(body, "tally"), ["load-a-file", "launch-jupyterlab"])

    def test_outcome(self):
        body = "# T\n\n**You will:** have a notebook saved\nin your Data Store.\n\n**Time:** 5 minutes.\n"
        self.assertEqual(gp.parse_outcome(body), "have a notebook saved in your Data Store.")
        self.assertEqual(gp.parse_outcome("No such line.\n"), "")

    def test_minutes_wording(self):
        self.assertEqual(gp.minutes(5, 5), "5 minutes")
        self.assertEqual(gp.minutes(30, 40), "30 to 40 minutes")


class Checks(unittest.TestCase):
    def setUp(self):
        self.data = small_data()
        self.tutorials = {"x": tutorial(), "y": tutorial(), "z": tutorial("p2")}

    def test_sound_data_has_no_problems(self):
        self.assertEqual(gp.check(self.data, self.tutorials), [])

    def test_unknown_tutorial(self):
        self.data["pathways"][0]["stages"][0]["tutorials"].append("nope")
        self.assertTrue(any("no tutorial named nope" in p for p in gp.check(self.data, self.tutorials)))

    def test_wrong_point(self):
        self.data["pathways"][0]["stages"][0]["tutorials"].append("z")
        self.assertTrue(any("tagged p2" in p for p in gp.check(self.data, self.tutorials)))

    def test_more_than_seven_in_view(self):
        names = [f"t{n}" for n in range(8)]
        self.tutorials.update({n: tutorial() for n in names})
        self.data["pathways"][0]["stages"][0]["tutorials"] = names
        self.assertTrue(any("limit is 7" in p for p in gp.check(self.data, self.tutorials)))

    def test_essentials_over_the_limit_are_refused(self):
        self.data["essentials_minutes"] = 8
        self.tutorials["w"] = tutorial()
        self.data["pathways"][0]["stages"][0]["tutorials"] = ["x", "w"]
        self.assertTrue(any("the limit is 8" in p for p in gp.check(self.data, self.tutorials)))

    def test_a_stage_may_hold_only_more_but_a_pathway_needs_essentials(self):
        self.data["pathways"][0]["stages"].append({"point": "p2", "more": ["z"]})
        self.assertEqual(gp.check(self.data, self.tutorials), [])
        self.assertIn("## Two\n\nYou can too.\n\nIf you have more time:", gp.build(self.data, self.tutorials)[0]["pathways/a.md"])
        self.data["pathways"][0]["stages"] = [{"point": "p1", "more": ["x"]}]
        self.assertTrue(any("no essentials" in p for p in gp.check(self.data, self.tutorials)))

    def test_tailoring_names_are_checked(self):
        self.data["tailoring"] = {"foundations": ["nope"], "in_r": {"x": "gone", "y": None}}
        problems = gp.check(self.data, self.tutorials)
        self.assertTrue(any("tailoring.foundations: no tutorial named nope" in p for p in problems))
        self.assertTrue(any("tailoring.in_r: no tutorial named gone" in p for p in problems))

    def test_listed_twice(self):
        self.data["pathways"][0]["stages"][0]["tutorials"] = ["x", "x"]
        self.assertTrue(any("listed twice" in p for p in gp.check(self.data, self.tutorials)))

    def test_build_refuses_unsound_data(self):
        self.data["pathways"][0]["after"] = "missing"
        with self.assertRaises(gp.PathwayError):
            gp.build(self.data, self.tutorials)

    def test_tutorial_left_out_of_by_point_is_added(self):
        groups, added = gp.by_point(self.data, self.tutorials)
        self.assertEqual(added, ["y", "z"])
        self.assertEqual(groups["p1"][-1], {"title": "More", "tutorials": ["y"]})
        self.assertEqual(groups["p2"], [{"title": "", "tutorials": ["z"]}])

    def test_pages(self):
        files, _ = gp.build(self.data, self.tutorials, "https://github.com/o/r")
        page = files["pathways/a.md"]
        self.assertIn("**The essentials: 1 tutorial, 5 minutes in all.**", page)
        self.assertIn("If you have more time:", page)
        self.assertIn("1. [T](../tutorials/x.md) (5 minutes)", page)
        self.assertIn("- [T](../tutorials/y.md) (5 minutes)", page)
        self.assertIn("*Do one.* You can.", page)
        self.assertIn("status: draft", page)
        self.assertNotIn("verified", page)
        self.assertIn("* [A](a.md) - Do A: 1 tutorial to start with, 5 minutes in all", files["pathways/index.md"])
        self.assertFalse(files["pathways/index.md"].startswith("---"))
        self.assertNotIn("*Two.*", files["pathway.md"])

    def test_pages_that_are_not_tutorials_are_listed_after_the_stages(self):
        import tempfile
        with tempfile.TemporaryDirectory() as tmp:
            docs = Path(tmp)
            (docs / "explainers").mkdir()
            (docs / "explainers" / "an-idea.md").write_text(
                '---\ntitle: "An idea"\n---\n\n# An idea\n', encoding="utf-8")
            (docs / "explainers" / "untitled.md").write_text("# No front matter\n", encoding="utf-8")
            self.data["pathways"][0]["also"] = [{"title": "Read the idea", "pages": ["explainers/an-idea"]}]
            files, _ = gp.build(self.data, self.tutorials, "https://github.com/o/r", docs)
            page = files["pathways/a.md"]
            self.assertIn("## Ideas and practice", page)
            self.assertIn("**Read the idea**\n\n- [An idea](../explainers/an-idea.md)", page)
            self.assertLess(page.index("## Ideas and practice"), page.index("## Next"))
            self.assertLess(page.index("../tutorials/y.md"), page.index("## Ideas and practice"))
            self.assertIn("**The essentials: 1 tutorial, 5 minutes in all.**", page)
            import json
            listed = json.loads(files["assets/pathways.json"])["pathways"][0]["also"]
            self.assertEqual(listed, [{"title": "Read the idea", "pages": ["explainers/an-idea"]}])
            for pages, message in ((["explainers/missing"], "no page at docs/explainers/missing.md"),
                                   (["tutorials/x"], "is a tutorial"),
                                   (["explainers/untitled"], "has no title"),
                                   (["../outside"], "no page at"),
                                   (["explainers/an-idea", "explainers/an-idea"], "listed twice"),
                                   ([], "needs a `title` and `pages`")):
                self.data["pathways"][0]["also"] = [{"title": "Read", "pages": pages}]
                with self.assertRaises(gp.PathwayError) as raised:
                    gp.build(self.data, self.tutorials, "", docs)
                self.assertIn(message, str(raised.exception))

    def test_a_pathway_without_other_pages_has_no_such_heading(self):
        files, _ = gp.build(self.data, self.tutorials, "")
        self.assertNotIn("Ideas and practice", files["pathways/a.md"])

    def test_self_checks_are_validated_and_listed_with_their_answers(self):
        self.data["points"]["p1"]["skip_check"] = ["how-many"]
        self.data["checks"] = {"how-many": {
            "tutorial": "x", "ask": "How many `rows`?", "answer": 3.0, "unit": "rows", "how": "len(t)",
            "verify": {"python": "3"}, "right": "Three.", "slips": {"4": "One too many."}, "otherwise": "Count."}}
        self.assertEqual(gp.check(self.data, self.tutorials), [])
        files, _ = gp.build(self.data, self.tutorials)
        page = files["pathways/self-checks.md"]
        self.assertIn('??? question "How many rows?"', page)
        self.assertIn("**3 rows.** Three.", page)
        self.assertIn("If you answered *4*: One too many.", page)
        self.assertIn("*skip-check*", page)
        self.assertIn("[Self-checks](self-checks.md)", files["pathways/index.md"])
        self.assertIn('"answer": "3"', files["assets/pathways.json"])

    def test_unsound_self_checks_are_refused(self):
        base = {"tutorial": "x", "ask": "Q?", "right": "R.", "otherwise": "O."}
        cases = {
            "the answer is not among the options": dict(base, answer="a", options=["b", "c"]),
            "the answer must be a number": dict(base, answer="three"),
            "a slip repeats the answer": dict(base, answer=3, slips={"3": "no"}),
            "no tutorial named nope": dict(base, tutorial="nope", answer=3),
            "`right` is missing": dict(base, answer=3, right=""),
        }
        for message, entry in cases.items():
            with self.subTest(message):
                self.data["checks"] = {"c": entry}
                self.assertTrue(any(message in p for p in gp.check(self.data, self.tutorials)))
        # The right answer may not sit in the same place in most self-checks with choices.
        first = {f"c{i}": dict(base, answer="a", options=["a", "b", "c"]) for i in range(4)}
        self.data["checks"] = first
        self.assertTrue(any("vary where it sits" in p for p in gp.check(self.data, self.tutorials)))
        first["c0"]["options"], first["c1"]["options"] = ["b", "a", "c"], ["b", "c", "a"]
        self.assertFalse(any("vary where it sits" in p for p in gp.check(self.data, self.tutorials)))
        self.data["checks"] = {"c": dict(base, tutorial="z", answer=3)}
        self.data["points"]["p1"]["skip_check"] = ["c"]
        self.assertTrue(any("belongs to another point" in p for p in gp.check(self.data, self.tutorials)))

    def test_missing_from_nav(self):
        files, _ = gp.build(self.data, self.tutorials)
        nav = [{"Pathways": ["pathways/index.md", {"All": "pathway.md"}]}]
        self.assertEqual(gp.missing_from_nav(files, nav), ["pathways/a.md"])


class TheRepository(unittest.TestCase):
    """The committed data, the tutorials, and the generated files agree."""

    @classmethod
    def setUpClass(cls):
        cls.data = copy.deepcopy(DATA)
        cls.tutorials = gp.load_tutorials(cls.data)
        cls.files, cls.added = gp.build(cls.data, cls.tutorials,
                                        gp.load_config().get("repo_url", ""))

    def test_every_tutorial_has_a_place(self):
        self.assertEqual(self.added, [])

    def test_the_essentials_of_every_pathway_are_short(self):
        limit = self.data["essentials_minutes"]
        self.assertLessEqual(limit, 25)
        for route in self.data["pathways"]:
            with self.subTest(route["id"]):
                low, high = gp.total(gp.core(route), self.tutorials)
                self.assertGreater(low, 0)
                self.assertLessEqual(high, limit)

    def test_session_preparation_is_what_a_reader_must_arrive_with(self):
        route = next(p for p in self.data["pathways"] if p["id"] == "get-ready-for-a-session")
        self.assertEqual(gp.core(route), ["sign-in", "launch-jupyterlab", "practice-data", "load-a-file"])

    def test_every_tutorial_is_a_draft(self):
        self.assertEqual({t["status"] for t in self.tutorials.values()}, {"draft"})

    def test_generated_files_are_current(self):
        for rel, content in self.files.items():
            with self.subTest(rel):
                self.assertEqual((gp.DOCS / rel).read_text(encoding="utf-8"), content,
                                 "run python scripts/gen_pathways.py")

    def test_generated_pages_are_in_the_nav(self):
        self.assertEqual(gp.missing_from_nav(self.files, gp.load_config()["nav"]), [])


if __name__ == "__main__":
    unittest.main()
