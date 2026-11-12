---
type: Guide
title: "Load a file from your Data Store into a notebook"
description: "Read a CSV file that sits in your Data Store into a pandas table in MESA JupyterLab and confirm its size against what you expected."
tags: [byte, p2, jupyterlab, data-store, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html"
    title: "pandas.read_csv"
    author: "team:pandas-dev"
---

# Load a file from your Data Store into a notebook

!!! warning "Draft: not yet validated"
    The code on this page was run with pandas 3.1 on a laptop. Nobody has yet followed
    the tutorial in MESA JupyterLab, so output may be laid out differently there.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have both practice files loaded as tables in a notebook, with a row count
you have checked.

**Time:** 5 minutes. **You need:** [MESA JupyterLab running](launch-jupyterlab.md), and
the [practice data](practice-data.md) in a `mesa-practice` folder in your Data Store.

## Steps

1. In JupyterLab's file browser, open your `mesa-practice` folder.

    You should see: `gauges.csv` and `readings.csv`.

2. Choose **File → New → Notebook**, pick the **Python 3** kernel, and rename the
   notebook `practice.ipynb` with **File → Rename Notebook…**.

    You should see: `practice.ipynb` in the file browser, beside the two CSV files.

3. Type this into the first cell and press ++shift+enter++:

    ```python
    import pandas as pd

    readings = pd.read_csv("readings.csv")
    gauges = pd.read_csv("gauges.csv")
    ```

    You should see: no output and no error. A file name with no folder in front of it
    means "in the same folder as this notebook".

4. In the next cell, run:

    ```python
    readings.shape
    ```

    You should see: the number of rows, then the number of columns.

    ```text
    (152, 4)
    ```

5. Run:

    ```python
    readings.head()
    ```

    You should see: the first five rows. `NaN` in `flag` is how pandas shows a blank.

    ```text
      gauge_id        date  value flag
    0      G01  2026-07-01    0.0  NaN
    1      G01  2026-07-02    0.0  NaN
    2      G01  2026-07-03   24.9  NaN
    3      G01  2026-07-04    0.0  NaN
    4      G01  2026-07-05   17.6  NaN
    ```

6. Choose **File → Save Notebook**.

    You should see: the dot on the notebook's tab disappear.

## Check it worked

`readings.shape` is `(152, 4)` and `gauges.shape` is `(5, 4)`, the sizes the
[practice data](practice-data.md) page gives. A different count means you loaded a
different file, or only part of this one.

## If it didn't

**`FileNotFoundError: [Errno 2] No such file or directory: 'readings.csv'`.** The
notebook is not in the same folder as the files. In the file browser, drag
`practice.ipynb` into `mesa-practice`, then choose **Kernel → Restart Kernel…** and run
the first cell again.

## Next

- [Read the data dictionary before the data](read-the-data-dictionary.md)
- Reference: [pandas.read_csv](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html),
  and [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/) for what the
  app contains.

*Not yet validated in MESA JupyterLab. Drafted 2026-11-12; the code was run with pandas 3.1 on the practice data.*
