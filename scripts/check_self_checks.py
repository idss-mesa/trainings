"""Check every self-check's answer against the practice data.

For each self-check in data/pathways.yml that has `verify: python:`, runs that
code against a copy of the practice data and compares the value of its last
line with the stated answer. So an answer can never drift from the data: if
scripts/make_practice_data.py changes the files, this fails until the answers
are brought up to date. Self-checks with `verify: r:` are checked by
scripts/check_self_checks.R; those with no `verify` are about portal screens and
are listed as not machine-checked.

Run with the versions in MESA JupyterLab: pip install pandas==3.1.1 duckdb==2.0.0 pyyaml

Usage: python scripts/check_self_checks.py     (exit status 1 on any mismatch)
"""
import ast
import math
import os
import shutil
import sys
import tempfile
from pathlib import Path

import duckdb
import pandas as pd
import yaml

ROOT = Path(__file__).resolve().parent.parent
PRACTICE = ROOT / "docs" / "assets" / "practice"
SETUP = ('readings = pd.read_csv("readings.csv")\ngauges = pd.read_csv("gauges.csv")\n'
         'sites = pd.read_csv("gauge_sites.csv")\nobs = pd.read_csv("observations.csv")')


def run(code: str, scope: dict):
    """Execute the code and return the value of its last line."""
    tree = ast.parse(code)
    exec(compile(ast.Module(tree.body[:-1], []), "<verify>", "exec"), scope)
    return eval(compile(ast.Expression(tree.body[-1].value), "<verify>", "eval"), scope)


def agrees(value, answer) -> bool:
    if isinstance(answer, (int, float)) and not isinstance(answer, bool):
        try:
            return math.isclose(float(value), float(answer), rel_tol=0, abs_tol=1e-9)
        except (TypeError, ValueError):
            return False
    return str(value) == str(answer)


def main() -> int:
    checks = yaml.safe_load((ROOT / "data" / "pathways.yml").read_text(encoding="utf-8")).get("checks") or {}
    compared = failed = 0
    elsewhere, unchecked = [], []
    with tempfile.TemporaryDirectory() as work:
        for csv_file in PRACTICE.glob("*.csv"):
            shutil.copy(csv_file, work)
        os.chdir(work)
        for cid, check in checks.items():
            verify = check.get("verify") or {}
            if "python" not in verify:
                (elsewhere if "r" in verify else unchecked).append(cid)
                continue
            scope = {"pd": pd, "duckdb": duckdb}
            exec(SETUP, scope)
            compared += 1
            try:
                value = run(verify["python"], scope)
            except Exception as err:  # a broken check is a failure, not a crash
                value = f"{type(err).__name__}: {err}"
            if not agrees(value, check["answer"]):
                failed += 1
                print(f"MISMATCH in {cid} ({check['tutorial']}): the data gives {value!r}, "
                      f"the answer says {check['answer']!r}")
        os.chdir(ROOT)
    print(f"Compared {compared} self-check answers with the practice data: {failed} mismatch(es).")
    if elsewhere:
        print(f"Checked in R instead: {', '.join(elsewhere)}")
    if unchecked:
        print(f"Not machine-checked (portal screens): {', '.join(unchecked)}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
