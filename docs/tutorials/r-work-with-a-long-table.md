---
type: Guide
title: "Work with a long table in R"
description: "Summarise a long table, with one row per time and per kind of measurement, by measurement in R, and reshape it to one column for each kind with reshape()."
tags: [byte, p2, rstudio, r, reshape, long-format]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/reshape.html"
    title: "Reshape Grouped Data: reshape (R documentation)"
    author: "team:r-core"
---

# Work with a long table in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-16 (R 4.6.2),
    by the AI assistant that drafted it, and produced the output shown. No person has
    yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Many archives store data *long*: one row per time and per kind of measurement, with
the number in a single `value` column. It is a tidy way to store data and an easy way
to average rainfall with temperature by accident.

**You will:** have the hourly observations summarised by measurement and reshaped to
one column for each.

**Time:** 5 to 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. In the **Console**, fetch the hourly observations into your practice folder:

    ```r
    download.file("https://idss-mesa.github.io/trainings/assets/practice/observations.csv", "observations.csv")
    ```

    You should see: a line that reads `downloaded 13 KB`.

2. Read the file and check its size:

    ```r
    obs <- read.csv("observations.csv")
    dim(obs)
    ```

    You should see:

    ```text
    [1] 336   4
    ```

3. Look at the first rows:

    ```r
    head(obs, 5)
    ```

    You should see: each timestamp twice, once for each kind of measurement.

    ```text
      gauge_id        timestamp_utc measurement value
    1      G03 2026-07-10T06:00:00Z     rain_mm   0.0
    2      G03 2026-07-10T06:00:00Z  air_temp_c  13.8
    3      G03 2026-07-10T07:00:00Z     rain_mm   0.0
    4      G03 2026-07-10T07:00:00Z  air_temp_c  12.3
    5      G03 2026-07-10T08:00:00Z     rain_mm   0.0
    ```

4. Count the rows for each kind:

    ```r
    table(obs$measurement)
    ```

    You should see:

    ```text
    air_temp_c    rain_mm
           168        168
    ```

5. Summarise each kind on its own:

    ```r
    aggregate(value ~ measurement, data = obs, FUN = function(v) round(c(min = min(v), max = max(v), mean = mean(v)), 2))
    ```

    You should see: two rows with nothing in common. `mean(obs$value)` would have
    returned 9.27, a number that is neither millimetres nor degrees.

    ```text
      measurement value.min value.max value.mean
    1  air_temp_c     10.20     25.40      18.03
    2     rain_mm      0.00     15.80       0.51
    ```

6. Reshape to one column per measurement, and check the size:

    ```r
    wide <- reshape(obs[c("timestamp_utc", "measurement", "value")], idvar = "timestamp_utc", timevar = "measurement", direction = "wide")
    head(wide, 3)
    dim(wide)
    ```

    You should see: one row for each hour, with the timestamp and a column for each
    kind of measurement.

    ```text
             timestamp_utc value.rain_mm value.air_temp_c
    1 2026-07-10T06:00:00Z             0             13.8
    3 2026-07-10T07:00:00Z             0             12.3
    5 2026-07-10T08:00:00Z             0             10.7
    [1] 168   3
    ```

## Check it worked

The counts reconcile: 168 hours × 2 measurements is 336, the number of rows you
started with, and `wide` has no empty cells (`sum(is.na(wide))` is 0).

## If it didn't

**`Warning message: ... multiple rows match for measurement=...: first taken`.** Some
timestamp has two rows for the same measurement. R kept the first and dropped the
other, and only warned. Find them with
`obs[duplicated(obs[c("timestamp_utc", "measurement")]) | duplicated(obs[c("timestamp_utc", "measurement")], fromLast = TRUE), ]`
and settle which is right before you reshape.

## Next

- [Turn UTC timestamps into local days in R](r-local-days-from-utc.md), which uses the
  same file.
- [Query a Parquet file with DuckDB from R](r-query-parquet-with-duckdb.md)
- The same task in Python: [Work with a long table, one row per kind of measurement](work-with-a-long-table.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run there that day (R 4.6.2).*
