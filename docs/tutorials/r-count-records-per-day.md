---
type: Guide
title: "Count records per day in R"
description: "Count the rows for each gauge and day in an R data frame to find days recorded twice and days with no record at all."
tags: [byte, p2, rstudio, r, data-quality, completeness]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/aggregate.html"
    title: "Compute Summary Statistics of Data Subsets: aggregate (R documentation)"
    author: "team:r-core"
---

# Count records per day in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-16 (R 4.6.2)
    and produced the output shown, one step at a time. Nobody else has yet followed
    the steps, so a screen may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The data dictionary says one row is one reading for one gauge on one day. This
tutorial tests that claim. A day counted twice inflates a total, and a missing day
shrinks it, and neither shows up as an `NA`.

**You will:** know, for each gauge, whether July has exactly one row per day.

**Time:** 5 to 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. Work out what a complete table would hold: 5 gauges × 31 days in July.

    You should see: 155. The table has 152 rows, so something is uneven.

2. Count the rows for each gauge:

    ```r
    table(readings$gauge_id)
    ```

    You should see:

    ```text
    G01 G02 G03 G04 G05
     27  31  32  31  31
    ```

3. Count the *distinct* days for each gauge:

    ```r
    tapply(readings$date, readings$gauge_id, function(d) length(unique(d)))
    ```

    You should see: G03 with 31 days, not 32, and G01 still with 27.

    ```text
    G01 G02 G03 G04 G05
     27  31  31  31  31
    ```

4. Find any gauge and day with more than one row:

    ```r
    per_day <- aggregate(value ~ gauge_id + date, data = readings, FUN = length)
    per_day[per_day$value != 1, ]
    ```

    You should see: one gauge and day, where the `value` column now holds the number
    of rows.

    ```text
       gauge_id       date value
    23      G03 2026-07-05     2
    ```

5. List the days on which G01 has no row:

    ```r
    july <- as.character(seq(as.Date("2026-07-01"), as.Date("2026-07-31"), by = "day"))
    setdiff(july, readings$date[readings$gauge_id == "G01"])
    ```

    You should see: four consecutive days.

    ```text
    [1] "2026-07-22" "2026-07-23" "2026-07-24" "2026-07-25"
    ```

6. In a script or a notes file, note both findings and what each does to a monthly
   total.

    You should see: your note where a reader of your result can find it.

## Check it worked

The numbers reconcile: 155 expected rows, plus 1 repeated row, minus 4 missing days,
is 152, the size of the table.

## If it didn't

**Step 4 prints `<0 rows>`.** You ran it on a table from which repeated rows had
already been removed, for example with `unique()`. Read the file again, then repeat
the step.

**Step 5 lists all 31 days.** `date` is no longer text. `setdiff()` compares like with
like, so compare text with text: use `as.character(readings$date)`.

## Next

- [Query a Parquet file with DuckDB from R](r-query-parquet-with-duckdb.md)
- [Reconcile row counts before and after a join in R](r-reconcile-a-join.md)
- The same task in Python: [Count records per day to find incomplete days](count-records-per-day.md).

*Not yet validated by a second person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run there that day (R 4.6.2).*
