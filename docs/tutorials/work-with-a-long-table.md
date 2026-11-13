---
type: Guide
title: "Work with a long table, one row per kind of measurement"
description: "Recognise a table that stacks several kinds of measurement in one value column, summarise each kind separately, and reshape it to one column per measurement."
tags: [byte, p2, long-format, reshaping, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/user_guide/reshaping.html"
    title: "Reshaping and pivot tables (pandas user guide)"
    author: "team:pandas-dev"
---

# Work with a long table, one row per kind of measurement

!!! warning "Draft: not yet validated"
    The code on this page was run with pandas 3.1 on a laptop. Nobody has yet followed
    the tutorial in MESA JupyterLab, so output may be laid out differently there.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Many archives store data *long*: one row per time and per kind of measurement, with
the number in a single `value` column. It is a tidy way to store data and an easy way
to average rainfall with temperature by accident.

**You will:** have the hourly observations summarised by measurement and reshaped to
one column for each.

**Time:** 5 to 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run.

## Steps

1. Check that `observations.csv` is in your `mesa-practice` folder. If it is not, run
   the download cell on the [practice data](practice-data.md) page again. Then run:

    ```python
    obs = pd.read_csv("observations.csv")
    obs.shape
    ```

    You should see:

    ```text
    (336, 4)
    ```

2. Look at the first rows:

    ```python
    obs.head()
    ```

    You should see: each timestamp twice, once for each kind of measurement.

    ```text
      gauge_id         timestamp_utc measurement  value
    0      G03  2026-07-10T06:00:00Z     rain_mm    0.0
    1      G03  2026-07-10T06:00:00Z  air_temp_c   13.8
    2      G03  2026-07-10T07:00:00Z     rain_mm    0.0
    3      G03  2026-07-10T07:00:00Z  air_temp_c   12.3
    4      G03  2026-07-10T08:00:00Z     rain_mm    0.0
    ```

3. Count the rows for each kind:

    ```python
    obs["measurement"].value_counts()
    ```

    You should see:

    ```text
    measurement
    rain_mm       168
    air_temp_c    168
    Name: count, dtype: int64
    ```

4. Summarise each kind on its own:

    ```python
    obs.groupby("measurement")["value"].agg(["min", "max", "mean"]).round(2)
    ```

    You should see: two rows with nothing in common. `obs["value"].mean()` would have
    returned 9.27, a number that is neither millimetres nor degrees.

    ```text
                  min   max   mean
    measurement
    air_temp_c   10.2  25.4  18.03
    rain_mm       0.0  15.8   0.51
    ```

5. Reshape to one column per measurement:

    ```python
    wide = obs.pivot(index="timestamp_utc", columns="measurement", values="value")
    wide.head(3)
    ```

    You should see:

    ```text
    measurement           air_temp_c  rain_mm
    timestamp_utc
    2026-07-10T06:00:00Z        13.8      0.0
    2026-07-10T07:00:00Z        12.3      0.0
    2026-07-10T08:00:00Z        10.7      0.0
    ```

6. Check the reshape lost nothing:

    ```python
    wide.shape
    ```

    You should see: `(168, 2)`.

## Check it worked

The counts reconcile: 168 hours × 2 measurements is 336, the number of rows you
started with, and `wide` has no empty cells (`wide.isna().sum().sum()` is 0).

## If it didn't

**`ValueError: Index contains duplicate entries, cannot reshape`.** Some timestamp has
two rows for the same measurement, so pandas cannot tell which value belongs in the
cell. Find them with
`obs[obs.duplicated(["timestamp_utc", "measurement"], keep=False)]` and settle which
is right before you reshape.

## Next

- [Turn UTC timestamps into local days](local-days-from-utc.md)
- Reference: [Reshaping and pivot tables](https://pandas.pydata.org/docs/user_guide/reshaping.html)
  in the pandas user guide.

*Not yet validated in MESA JupyterLab. Drafted 2026-11-13; the code was run with pandas 3.1 on the practice data.*
