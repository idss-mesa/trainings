---
type: Guide
title: "Leave a notebook someone else can rerun"
description: "Restart a notebook and run it from the top, remove what ties it to your session, and say at the top what it needs, so that another person gets the same result."
tags: [byte, p5, reproducibility, jupyterlab, notebook]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: jupyterlab
    resource: "https://jupyterlab.readthedocs.io/en/stable/user/notebook.html"
    title: "Notebooks (JupyterLab documentation)"
    author: "team:jupyterlab"
---

# Leave a notebook someone else can rerun

!!! warning "Draft: not yet validated"
    Nobody has yet followed this tutorial in MESA JupyterLab, so a menu name may differ
    there. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A notebook remembers every cell you ran, in the order you ran it, including cells you
have since changed or deleted. What it shows can therefore differ from what it
produces when someone else runs it from the top.

**You will:** have a notebook that runs from a fresh start, top to bottom, without you.

**Time:** 5 to 10 minutes. **You need:** `practice.ipynb` from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with whatever you have added to it since.

## Steps

1. Choose **Kernel → Restart Kernel and Run All Cells…** and confirm with **Restart**.

    You should see: every code cell numbered in order down the page, `[1]`, `[2]`,
    `[3]`, with no red error box. If a cell fails, go to "If it didn't" below, then come
    back.

2. Choose **Edit → Find…** and search the notebook for `/home/`.

    You should see: no matches. A path that starts at your own home folder works only
    for you; a bare file name such as `"readings.csv"` works for anyone who has the
    file beside the notebook.

3. Click the first cell, press ++esc++, then ++a++ to add a cell above it, then ++m++
   to make it a Markdown cell. Write what the notebook does, which files it needs, and
   where they come from:

    ```markdown
    # Checks on the practice rain-gauge data

    Needs `gauges.csv` and `readings.csv` in the same folder as this notebook.
    Both are at https://idss-mesa.github.io/trainings/tutorials/practice-data/
    ```

    You should see: the heading and the text, rendered, after you press
    ++shift+enter++.

4. Add a code cell at the very end that records what the notebook ran on:

    ```python
    import sys

    print("Python", sys.version.split()[0], "| pandas", pd.__version__)
    ```

    You should see: one line with two version numbers.

5. Repeat step 1, then choose **File → Save Notebook**.

    You should see: the cells numbered in order again, and the outputs now saved in
    the file are the ones a fresh run produces.

6. Look at the `mesa-practice` folder in the file browser.

    You should see: `practice.ipynb`, `gauges.csv`, and `readings.csv`. The folder holds
    everything the notebook needs, so the folder is what you share.

## Check it worked

After **Restart Kernel and Run All Cells…**, the code cells are numbered consecutively
from `[1]` and none shows an error. Numbers that skip or run out of order mean cells
were run by hand since the last restart.

## If it didn't

**A cell stops with `NameError: name '...' is not defined`.** The cell uses something
that was defined in a cell you later deleted or changed, or in a cell further down.
It worked before only because the kernel still remembered the old definition. Put the
definition in a cell above the one that failed, then repeat step 1.

## Next

- Reference: [Managing data, "Share data"](https://idss-mesa.github.io/docs/portal/data/#share-data),
  for giving a colleague access to the folder.
- Reference: [Notebooks](https://jupyterlab.readthedocs.io/en/stable/user/notebook.html)
  in the JupyterLab documentation.

*Not yet validated in MESA JupyterLab. Drafted 2026-11-12; the version cell was run with pandas 3.1.*
