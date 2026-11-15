---
type: Guide
title: "Bring two units onto one scale before comparing"
description: "Convert readings that were recorded in different units to one unit, using the table that says which unit each gauge reports in, and confirm that every row was converted."
tags: [byte, p3, units, join, pandas]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/reference/api/pandas.Series.map.html"
    title: "pandas.Series.map"
    author: "team:pandas-dev"
---

# Bring two units onto one scale before comparing

!!! warning "Draft: not yet validated"
    The code on this page was run on 2026-11-15 with pandas 3.1.1 and DuckDB 2.0.0, the
    versions in MESA JupyterLab, and produced the output shown. It was not run inside
    MESA JupyterLab, and nobody has yet followed the steps there, so a menu or a screen
    may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The practice gauges do not all report in the same unit, and the unit is written in a
different file from the readings. Until the values share a unit, no comparison between
gauges means anything.

**You will:** have a `value_mm` column that holds every reading in millimetres, and
proof that no row was left unconverted.

**Time:** 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings` and `gauges` exist.

## Steps

1. List the units in use:

    ```python
    gauges["unit"].value_counts()
    ```

    You should see: two units.

    ```text
    unit
    mm    4
    cm    1
    Name: count, dtype: int64
    ```

2. Write down, as a small table of your own, how each unit becomes millimetres:

    ```python
    to_mm = {"mm": 1, "cm": 10}
    ```

    You should see: no output. A unit you have not listed here will show up in step 4.

3. Give each reading its gauge's unit, then convert:

    ```python
    joined = readings.merge(gauges[["gauge_id", "unit"]], on="gauge_id", how="left", validate="many_to_one")
    joined["value_mm"] = joined["value"] * joined["unit"].map(to_mm)
    joined[joined["gauge_id"] == "G02"].head(3)
    ```

    You should see: the original `value` kept, and `value_mm` ten times larger for
    this gauge.

    ```text
       gauge_id        date  value flag unit  value_mm
    27      G02  2026-07-01   0.00  NaN   cm       0.0
    28      G02  2026-07-02   0.00  NaN   cm       0.0
    29      G02  2026-07-03   2.89  NaN   cm      28.9
    ```

4. Count the readings that were not converted:

    ```python
    int(joined["value_mm"].isna().sum())
    ```

    You should see: `0`. A reading with no gauge, or with a unit missing from `to_mm`,
    would have an empty `value_mm` and be counted here.

5. Compare the largest reading at each gauge, before and after:

    ```python
    joined.groupby("gauge_id")[["value", "value_mm"]].max()
    ```

    You should see: G02 no longer far below its neighbours.

    ```text
               value  value_mm
    gauge_id
    G01        24.90      24.9
    G02         2.92      29.2
    G03        32.50      32.5
    G04        26.40      26.4
    G05       180.00     180.0
    ```

## Check it worked

`joined` has the same number of rows as `readings`, step 4 gave `0`, and for the four
gauges that already reported in millimetres `value_mm` equals `value`.

## If it didn't

**Step 4 gives a number above 0.** Some gauge reports in a unit that `to_mm` does not
list. Run `joined.loc[joined["value_mm"].isna(), "unit"].unique()` to see which, add
it to `to_mm` in step 2, and run steps 3 and 4 again.

## Next

- The values now share a unit, but a total would still count one row twice. See
  [Find and remove a repeated row](remove-a-repeated-row.md).
- [Read the data dictionary before the data](read-the-data-dictionary.md), which is
  where the two units were first noticed.
- Reference: [pandas.Series.map](https://pandas.pydata.org/docs/reference/api/pandas.Series.map.html),
  and [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/) for what the
  app contains.

*Not yet validated in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15; the code was run that day outside MESA (pandas 3.1.1, DuckDB 2.0.0).*
