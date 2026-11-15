"""Guard the practice data: the published files stay as they are, and August does its job.

The tutorials print numbers from the four files published first, so those files must
never change by accident. readings_august.csv was added later for one purpose: the
gauge with the largest monthly total must not be the gauge that was wettest on the
days all five gauges reported.

Usage: python -m unittest discover tests     (standard library only)
"""
import csv
import hashlib
import unittest
from collections import defaultdict
from pathlib import Path

PRACTICE = Path(__file__).resolve().parent.parent / "docs" / "assets" / "practice"

# SHA-256 of the four files as first published. Change one only on purpose, together
# with every output the tutorials show (AGENTS.md, rule 15).
PUBLISHED = {
    "gauges.csv": "111484128495fbcd45c41125e9794cb79ab80c13a5c2f0d619378b68c8534416",
    "readings.csv": "90b2aaf4144e985a217ee34cfaf5a741097650244deee7250d7aa2b1f3b928e9",
    "observations.csv": "dd2edd79924e7ff6035be46dca07e90efc7f027b128ddcd9104e7e8cdb0d6210",
    "gauge_sites.csv": "a9406fd0664969e3edf8e2c05d9f0ffcf7a1a69e0ab2788ee7c2411e633cdc94",
}


def rows(name):
    with open(PRACTICE / name, newline="") as f:
        return list(csv.DictReader(f))


class PublishedFiles(unittest.TestCase):
    def test_the_four_published_files_are_unchanged(self):
        for name, digest in PUBLISHED.items():
            with self.subTest(file=name):
                self.assertEqual(hashlib.sha256((PRACTICE / name).read_bytes()).hexdigest(), digest)


class August(unittest.TestCase):
    def setUp(self):
        self.unit = {g["gauge_id"]: g["unit"] for g in rows("gauges.csv")}
        self.august = rows("readings_august.csv")

    def mm(self, row):
        return float(row["value"]) * (10 if self.unit[row["gauge_id"]] == "cm" else 1)

    def test_same_columns_as_july(self):
        self.assertEqual(list(self.august[0]), list(rows("readings.csv")[0]))

    def test_same_five_gauges_in_august_only(self):
        self.assertEqual({r["gauge_id"] for r in self.august}, set(self.unit))
        self.assertTrue(all(r["date"].startswith("2026-08-") for r in self.august))

    def test_no_other_traps(self):
        self.assertTrue(all(r["flag"] == "" for r in self.august), "a reading is flagged")
        keys = [(r["gauge_id"], r["date"]) for r in self.august]
        self.assertEqual(len(keys), len(set(keys)), "a row is repeated")

    def test_one_gauge_has_a_gap_with_rain_in_it(self):
        days = defaultdict(set)
        for r in self.august:
            days[r["gauge_id"]].add(r["date"])
        short = [g for g, d in days.items() if len(d) < 31]
        self.assertEqual(len(short), 1)
        missing = set.union(*days.values()) - days[short[0]]
        self.assertGreater(sum(self.mm(r) for r in self.august if r["date"] in missing), 0)

    def test_wettest_by_total_is_not_wettest_on_shared_days(self):
        reported = defaultdict(set)
        for r in self.august:
            reported[r["date"]].add(r["gauge_id"])
        total, shared = defaultdict(float), defaultdict(float)
        for r in self.august:
            total[r["gauge_id"]] += self.mm(r)
            if len(reported[r["date"]]) == len(self.unit):
                shared[r["gauge_id"]] += self.mm(r)
        self.assertNotEqual(max(total, key=total.get), max(shared, key=shared.get))


if __name__ == "__main__":
    unittest.main()
