---
type: Guide
title: "Reconcile row counts before and after a join"
description: "Join a table of readings to a table of gauges and confirm that the join neither added nor lost rows and left no reading without a match."
tags: [byte, p3, join, data-quality, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html"
    title: "pandas.DataFrame.merge"
    author: "team:pandas-dev"
---

# Reconcile row counts before and after a join

!!! warning "Draft: not yet validated"
    The code on this page was run with pandas 3.1 on a laptop. Nobody has yet followed
    the tutorial in MESA JupyterLab, so output may be laid out differently there.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A join can silently add rows, when a key repeats in the table you look things up in,
or lose them, when a key has no match. Counting rows before and after catches both.

**You will:** have each reading joined to its gauge's name and unit, with row counts
that prove the join changed nothing else.

**Time:** 5 to 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings`
and `gauges` exist.

## Steps

1. Record the size of the table you are starting from:

    ```python
    len(readings)
    ```

    You should see: `152`.

2. Confirm that the lookup table has one row for each key:

    ```python
    gauges["gauge_id"].is_unique
    ```

    You should see: `True`. If a gauge appeared twice, every one of its readings would
    be doubled by the join.

3. Join, and have pandas enforce what you just checked:

    ```python
    joined = readings.merge(gauges, on="gauge_id", how="left", validate="many_to_one")
    ```

    You should see: no output and no error. `how="left"` keeps every reading, whether
    or not it finds a gauge.

4. Compare the sizes:

    ```python
    len(readings), len(joined)
    ```

    You should see:

    ```text
    (152, 152)
    ```

5. Count the readings that found no gauge:

    ```python
    joined["name"].isna().sum()
    ```

    You should see: `0`. Depending on the pandas version, it may be wrapped as
    `np.int64(0)`.

6. Look at the result:

    ```python
    joined.head(3)
    ```

    You should see: the four original columns, then the gauge's columns.

    ```text
      gauge_id        date  value flag       name unit  elevation_m
    0      G01  2026-07-01    0.0  NaN  Boathouse   mm          512
    1      G01  2026-07-02    0.0  NaN  Boathouse   mm          512
    2      G01  2026-07-03   24.9  NaN  Boathouse   mm          512
    ```

## Check it worked

Three numbers agree: 152 rows before, 152 rows after, and 0 readings without a match.
Each reading now carries its `unit`, which you need before values from different
gauges can be compared.

## If it didn't

**`MergeError: Merge keys are not unique in right dataset; not a many-to-one merge`.**
The lookup table has a repeated `gauge_id`, and `validate` stopped the join before it
could multiply rows. Find the repeats with
`gauges[gauges["gauge_id"].duplicated(keep=False)]` and settle which row is right
before you join.

## Next

- A join carries problems along with it: rows repeated in `readings` are still
  repeated in `joined`. See
  [Count records per day to find incomplete days](count-records-per-day.md).
- Reference: [pandas.DataFrame.merge](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html).

*Not yet validated in MESA JupyterLab. Drafted 2026-11-12; the code was run with pandas 3.1 on the practice data.*
