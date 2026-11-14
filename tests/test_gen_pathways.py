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
    return {"title": "T", "point": point, "min": low, "max": high, "status": "draft",
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
        self.assertIn("**1 tutorial, 5 minutes in all.**", page)
        self.assertIn("1. [T](../tutorials/x.md) (5 minutes)", page)
        self.assertIn("- [T](../tutorials/y.md) (5 minutes)", page)
        self.assertIn("*Do one.* You can.", page)
        self.assertIn("status: draft", page)
        self.assertNotIn("verified", page)
        self.assertIn("* [A](a.md) - Do A: a route of 1 tutorial", files["pathways/index.md"])
        self.assertFalse(files["pathways/index.md"].startswith("---"))
        self.assertNotIn("*Two.*", files["pathway.md"])

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

    def test_session_route_takes_one_to_two_hours(self):
        route = next(p for p in self.data["pathways"] if p["id"] == "get-ready-for-a-session")
        low, high = gp.total(gp.core(route), self.tutorials)
        self.assertGreaterEqual(low, 60)
        self.assertLessEqual(high, 120)

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
