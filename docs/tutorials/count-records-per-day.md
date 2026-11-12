---
type: Guide
title: "Count records per day to find incomplete days"
description: "Count the rows for each gauge and day to find days that were recorded twice and days that were not recorded at all."
tags: [byte, p2, data-quality, completeness, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/user_guide/groupby.html"
    title: "Group by: split-apply-combine (pandas user guide)"
    author: "team:pandas-dev"
---

# Count records per day to find incomplete days

!!! warning "Draft: not yet validated"
    The code on this page was run with pandas 3.1 on a laptop. Nobody has yet followed
    the tutorial in MESA JupyterLab, so output may be laid out differently there.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The data dictionary says one row is one reading for one gauge on one day. This
tutorial tests that claim. A day counted twice inflates a total, and a missing day
shrinks it, and neither shows up as a blank value.

**You will:** know, for each gauge, whether July has exactly one row per day.

**Time:** 5 to 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings`
and `gauges` exist.

## Steps

1. Work out what a complete table would hold: 5 gauges × 31 days in July.

    You should see: 155. The table has 152 rows, so something is uneven.

2. Count the rows for each gauge:

    ```python
    readings.groupby("gauge_id").size()
    ```

    You should see:

    ```text
    gauge_id
    G01    27
    G02    31
    G03    32
    G04    31
    G05    31
    dtype: int64
    ```

3. Count the *distinct* days for each gauge:

    ```python
    readings.groupby("gauge_id")["date"].nunique()
    ```

    You should see: G03 with 31 days, not 32, and G01 still with 27.

    ```text
    gauge_id
    G01    27
    G02    31
    G03    31
    G04    31
    G05    31
    Name: date, dtype: int64
    ```

4. Find any gauge and day with more than one row:

    ```python
    per_day = readings.groupby(["gauge_id", "date"]).size()
    per_day[per_day != 1]
    ```

    You should see:

    ```text
    gauge_id  date
    G03       2026-07-05    2
    dtype: int64
    ```

5. List the days on which G01 has no row:

    ```python
    july = pd.date_range("2026-07-01", "2026-07-31").strftime("%Y-%m-%d")
    sorted(set(july) - set(readings.loc[readings["gauge_id"] == "G01", "date"]))
    ```

    You should see: four consecutive days.

    ```text
    ['2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25']
    ```

6. In a Markdown cell, note both findings and what each does to a monthly total.

    You should see: your note in the notebook, beside the evidence.

## Check it worked

The numbers reconcile: 155 expected rows, plus 1 repeated row, minus 4 missing days,
is 152, the size of the table.

## If it didn't

**Step 4 returns an empty result.** You ran it on a table from which repeated rows had
already been removed, for example after `drop_duplicates()`. Run the notebook's first
cell again to reload the file, then repeat the step.

## Next

- [Reconcile row counts before and after a join](reconcile-a-join.md)
- Reference: [Group by: split-apply-combine](https://pandas.pydata.org/docs/user_guide/groupby.html)
  in the pandas user guide.

*Not yet validated in MESA JupyterLab. Drafted 2026-11-12; the code was run with pandas 3.1 on the practice data.*
