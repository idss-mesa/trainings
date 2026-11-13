---
type: Guide
title: "Turn UTC timestamps into local days"
description: "Convert UTC timestamps to local time before grouping by day, and confirm the daily totals against values you already trust."
tags: [byte, p2, time-zones, timestamps, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/user_guide/timeseries.html#time-zone-handling"
    title: "Time zone handling (pandas user guide)"
    author: "team:pandas-dev"
---

# Turn UTC timestamps into local days

!!! warning "Draft: not yet validated"
    The code on this page was run with pandas 3.1 on a laptop. Nobody has yet followed
    the tutorial in MESA JupyterLab, so output may be laid out differently there.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Instruments usually record time in UTC. A "day" of UTC is not a day where the
instrument stands: on the invented campus, which keeps US Mountain Time, the UTC date
changes at six in the evening in July. Evening rain lands on the wrong day unless you
convert first.

**You will:** have daily rain totals by local day that match the gauge's daily record.

**Time:** 10 minutes. **You need:** the notebook from
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

2. Keep the rain rows and turn the text timestamps into real ones:

    ```python
    rain = obs[obs["measurement"] == "rain_mm"].copy()
    rain["time_utc"] = pd.to_datetime(rain["timestamp_utc"])
    rain["time_utc"].dt.tz
    ```

    You should see: `UTC`. The trailing `Z` in the file told pandas the zone.

3. Total the rain by UTC date:

    ```python
    rain.groupby(rain["time_utc"].dt.date)["value"].sum()
    ```

    You should see: eight dates for a seven-day week, the first sign of trouble.

    ```text
    time_utc
    2026-07-10     0.0
    2026-07-11    32.4
    2026-07-12     7.4
    2026-07-13    17.6
    2026-07-14     4.4
    2026-07-15    22.1
    2026-07-16     1.7
    2026-07-17     0.0
    Name: value, dtype: float64
    ```

4. Convert to local time and total again:

    ```python
    rain["time_local"] = rain["time_utc"].dt.tz_convert("America/Denver")
    rain.groupby(rain["time_local"].dt.date)["value"].sum()
    ```

    You should see: seven dates, and different totals.

    ```text
    time_local
    2026-07-10    32.4
    2026-07-11     0.0
    2026-07-12    23.0
    2026-07-13     6.4
    2026-07-14    22.1
    2026-07-15     1.7
    2026-07-16     0.0
    Name: value, dtype: float64
    ```

5. Compare with the same gauge's daily record:

    ```python
    week = readings["date"].between("2026-07-10", "2026-07-16")
    readings[(readings["gauge_id"] == "G03") & week][["date", "value"]]
    ```

    You should see: the seven totals from step 4, not those from step 3.

## Check it worked

Your local-day totals equal the daily values in `readings.csv` for G03, day for day.
The week's total is 85.6 mm either way; only the days it falls on change.

## If it didn't

**`TypeError: Cannot convert tz-naive timestamps, use tz_localize to localize`.** The
timestamps were read without a zone, which happens when a file's times have no `Z` or
offset. Say what zone they are in first:
`rain["time_utc"].dt.tz_localize("UTC")`, then convert.

## Next

- [Work with a long table, one row per kind of measurement](work-with-a-long-table.md)
- Reference: [Time zone handling](https://pandas.pydata.org/docs/user_guide/timeseries.html#time-zone-handling)
  in the pandas user guide.

*Not yet validated in MESA JupyterLab. Drafted 2026-11-13; the code was run with pandas 3.1 on the practice data.*
