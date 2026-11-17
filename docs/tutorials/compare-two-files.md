---
type: Guide
title: "Compare two files that should look alike"
description: "Put July's and August's readings side by side, by row count, by gauge and by largest value, so that what is unusual in one month stands out against the other."
tags: [byte, p4, exploration, verification, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
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

# Compare two files that should look alike

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-17, by the AI
    assistant that drafted it, and produced the output shown. No person has yet followed
    the steps, so a menu or a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A second file of the same kind is a free expectation. Two months from the same five
gauges should have the same columns, about the same number of rows, and values of a
similar size. Where they differ is where to look.

**You will:** have a short list of the places where July's readings and August's
differ, each one a question to follow up.

**Time:** 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run, and
`readings_august.csv` from the [practice data](practice-data.md) in the same folder.

## Steps

1. Load August and compare the row counts. Five gauges over 31 days would give 155
   rows in each month.

    ```python
    august = pd.read_csv("readings_august.csv")
    len(readings), len(august)
    ```

    You should see: `(152, 151)`. Neither month is complete.

2. Check that the columns match:

    ```python
    list(readings.columns) == list(august.columns)
    ```

    You should see: `True`.

3. Count the rows for each gauge, with the months side by side:

    ```python
    pd.DataFrame({
        "july": readings.groupby("gauge_id")["value"].count(),
        "august": august.groupby("gauge_id")["value"].count(),
    })
    ```

    You should see: 31 nearly everywhere. July is short at G01 and one over at G03.
    August is short at G03.

    ```text
              july  august
    gauge_id
    G01         27      31
    G02         31      31
    G03         32      27
    G04         31      31
    G05         31      31
    ```

4. Do the same for the largest reading:

    ```python
    pd.DataFrame({
        "july": readings.groupby("gauge_id")["value"].max(),
        "august": august.groupby("gauge_id")["value"].max(),
    })
    ```

    You should see: four gauges within 0.2 of their other month, and G05 with 180 in
    July against 27.4 in August.

    ```text
                july  august
    gauge_id
    G01        24.90   24.80
    G02         2.92    2.84
    G03        32.50   32.30
    G04        26.40   26.30
    G05       180.00   27.40
    ```

5. Compare the flags. July has two readings flagged `S`. For August:

    ```python
    august["flag"].value_counts(dropna=False)
    ```

    You should see: no flag on any row.

    ```text
    flag
    NaN    151
    Name: count, dtype: int64
    ```

6. In a Markdown cell, list each difference as a question.

    You should see: a list such as "July G01: four days missing? July G03: a repeated
    row? July G05: is 180 real? August G03: four days missing?"

## Check it worked

Your list has four entries, each naming a month and a gauge. None of them is answered
yet: the comparison tells you where to look, not what happened.

## If it didn't

**Step 1 says the file is not found.** `readings_august.csv` is not in the folder the
notebook is in. Run the download cell on the [practice data](practice-data.md) page.

**A table shows `NaN` for a gauge.** That gauge has no rows in one of the files. That
is a difference too; add it to your list.

## Next

- [Count records per day to find incomplete days](count-records-per-day.md), for the
  short and long gauges.
- [Find and remove a repeated row](remove-a-repeated-row.md)
- [Plot a column to spot odd values](plot-to-spot-odd-values.md), for the 180.
- Reference: [Group by: split-apply-combine](https://pandas.pydata.org/docs/user_guide/groupby.html)
  in the pandas user guide.

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (pandas 3.1.1, DuckDB 2.0.0).*
