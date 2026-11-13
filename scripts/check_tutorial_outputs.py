"""Check that the output printed in each tutorial is what its code produces.

For every tutorial under docs/tutorials/, runs each ```python block in page order
against a copy of the practice data, and compares the value of the block's last
expression with the ```text block that follows it. Blocks that need a person, a
network, or a saved notebook are skipped.

Run with the versions in MESA JupyterLab, or the comparison may fail on layout
alone: pip install pandas==3.1.1 duckdb==2.0.0

Usage: python scripts/check_tutorial_outputs.py     (exit status 1 on any mismatch)
"""
import ast
import os
import re
import shutil
import sys
import tempfile
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
TUTORIALS = ROOT / "docs" / "tutorials"
PRACTICE = ROOT / "docs" / "assets" / "practice"
SKIP = ("urlretrieve", "getpass", "practice.ipynb", "token", "sys.version")
SETUP = 'import pandas as pd\nreadings = pd.read_csv("readings.csv")\ngauges = pd.read_csv("gauges.csv")'
BLOCK = re.compile(r"    ```python\n(.*?)    ```\n(.*?)(?=\n\d+\. |\n## )", re.S)
EXPECTED = re.compile(r"    ```text\n(.*?)    ```", re.S)


def dedent(block: str) -> str:
    return "\n".join(line[4:].rstrip() for line in block.splitlines()).strip()


def shown(value) -> str:
    plain = isinstance(value, (pd.DataFrame, pd.Series)) or "duckdb" in type(value).__module__
    return "\n".join(line.rstrip() for line in (str(value) if plain else repr(value)).splitlines()).strip()


def main() -> int:
    compared = failed = 0
    with tempfile.TemporaryDirectory() as work:
        for csv_file in PRACTICE.glob("*.csv"):
            shutil.copy(csv_file, work)
        os.chdir(work)
        for page in sorted(TUTORIALS.glob("*.md")):
            scope = {}
            exec(SETUP, scope)
            for match in BLOCK.finditer(page.read_text()):
                code = dedent(match.group(1))
                if any(word in code for word in SKIP):
                    continue
                tree = ast.parse(code)
                exec(compile(ast.Module(tree.body[:-1], []), page.name, "exec"), scope)
                final = tree.body[-1]
                if not isinstance(final, ast.Expr):
                    exec(compile(ast.Module([final], []), page.name, "exec"), scope)
                    continue
                value = eval(compile(ast.Expression(final.value), page.name, "eval"), scope)
                expected = EXPECTED.search(match.group(2))
                if expected is None or value is None:
                    continue
                compared += 1
                if shown(value) != dedent(expected.group(1)):
                    failed += 1
                    print(f"MISMATCH in {page.name}: {code.splitlines()[-1]}\n--- produced\n{shown(value)}\n--- on the page\n{dedent(expected.group(1))}\n")
        os.chdir(ROOT)
    print(f"Compared {compared} outputs in {TUTORIALS.relative_to(ROOT)}: {failed} mismatch(es).")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
