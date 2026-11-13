---
type: Guide
title: "Check a column's range and missing values"
description: "Find the smallest and largest value in a column and count the blanks in every column, so that an impossible value or a gap shows up before you compute with it."
tags: [byte, p2, data-quality, missing-values, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/user_guide/missing_data.html"
    title: "Working with missing data (pandas user guide)"
    author: "team:pandas-dev"
---

# Check a column's range and missing values

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-13 and produced the
    output shown. Nobody has yet followed the steps there by hand, so a menu or a screen
    may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** know the range of `value` at each gauge and how many blanks each column
of `readings` holds.

**Time:** 5 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings`
and `gauges` exist.

## Steps

1. Run:

    ```python
    readings["value"].min(), readings["value"].max()
    ```

    You should see: `0.0` and `180.0`. Depending on the pandas version, each number may
    be wrapped as `np.float64(...)`.

2. Ask whether both ends are believable. Zero is a dry day. Decide whether 180 could
   be one day's rain before you read on.

    You should see: a reason to look closer. A range tells you that something is
    unusual, not what it is.

3. Split the range by gauge:

    ```python
    readings.groupby("gauge_id")["value"].agg(["min", "max"])
    ```

    You should see:

    ```text
              min     max
    gauge_id
    G01       0.0   24.90
    G02       0.0    2.92
    G03       0.0   32.50
    G04       0.0   26.40
    G05       0.0  180.00
    ```

4. Count the blanks in every column:

    ```python
    readings.isna().sum()
    ```

    You should see:

    ```text
    gauge_id      0
    date          0
    value         0
    flag        150
    dtype: int64
    ```

5. Check the blanks against the [data dictionary](practice-data.md#data-dictionary).

    You should see: that a blank `flag` is expected, since it means the sensor raised
    no concern, and that `value` is never blank.

## Check it worked

You can state two things: the largest `value` at each gauge, and that the only column
with blanks is `flag`, with 150 of them.

## If it didn't

**The counts in step 4 are all zero.** `flag` was read as empty text, not as missing.
That happens when the file is loaded with `keep_default_na=False`. Load it again with
plain `pd.read_csv("readings.csv")`.

## Next

- [Tally a quality flag before you trust a number](tally-a-quality-flag.md), which
  follows up the 180.
- "No blank values" does not mean "no missing days": a day with no row at all is not a
  blank. [Count records per day to find incomplete days](count-records-per-day.md)
  covers that.
- Reference: [Working with missing data](https://pandas.pydata.org/docs/user_guide/missing_data.html)
  in the pandas user guide.

*Not yet validated by a person in MESA JupyterLab. Drafted 2026-11-12; the code was run there on 2026-11-13 (pandas 3.1.1, DuckDB 2.0.0).*
