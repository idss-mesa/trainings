---
type: Guide
title: "Reconcile row counts before and after a join in R"
description: "Join a data frame of readings to a data frame of gauges with merge() and confirm that the join neither added nor lost rows and left no reading without a match."
tags: [byte, p3, rstudio, r, join, data-quality]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/merge.html"
    title: "Merge Two Data Frames: merge (R documentation)"
    author: "team:r-core"
---

# Reconcile row counts before and after a join in R

!!! warning "Draft: not yet validated"
    The code on this page was run with R 4.6.0 on a laptop on 2026-11-16 and produced
    the output shown. The site build runs it again in the MESA RStudio Geospatial
    image. Nobody has yet followed the steps in the app, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A join can silently add rows, when a key repeats in the table you look things up in,
or lose them, when a key has no match. Counting rows before and after catches both.

**You will:** have each reading joined to its gauge's name and unit, with row counts
that prove the join changed nothing else.

**Time:** 5 to 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. Record the size of the table you are starting from:

    ```r
    nrow(readings)
    ```

    You should see:

    ```text
    [1] 152
    ```

2. Confirm that the lookup table has one row for each key:

    ```r
    anyDuplicated(gauges$gauge_id)
    ```

    You should see: `0`, meaning no gauge appears twice. Any other number is the
    position of the first repeat, and every reading of that gauge would be doubled by
    the join.

    ```text
    [1] 0
    ```

3. Join:

    ```r
    joined <- merge(readings, gauges, by = "gauge_id", all.x = TRUE)
    ```

    You should see: no output and no error. `all.x = TRUE` keeps every reading, whether
    or not it finds a gauge. Without it, `merge()` drops the readings that have no
    match and says nothing.

4. Compare the sizes:

    ```r
    c(nrow(readings), nrow(joined))
    ```

    You should see:

    ```text
    [1] 152 152
    ```

5. Count the readings that found no gauge:

    ```r
    sum(is.na(joined$name))
    ```

    You should see:

    ```text
    [1] 0
    ```

6. Look at the result:

    ```r
    head(joined, 3)
    ```

    You should see: the four original columns, then the gauge's columns.

    ```text
      gauge_id       date value flag      name unit elevation_m
    1      G01 2026-07-01   0.0 <NA> Boathouse   mm         512
    2      G01 2026-07-02   0.0 <NA> Boathouse   mm         512
    3      G01 2026-07-03  24.9 <NA> Boathouse   mm         512
    ```

## Check it worked

Three numbers agree: 152 rows before, 152 rows after, and 0 readings without a match.
Each reading now carries its `unit`, which you need before values from different
gauges can be compared.

## If it didn't

**The second number in step 4 is larger than the first.** The lookup table has a
repeated `gauge_id`, and `merge()` multiplied rows without a warning. Find the repeats
with `gauges[gauges$gauge_id %in% gauges$gauge_id[duplicated(gauges$gauge_id)], ]` and
settle which row is right before you join.

**The rows of `joined` are in a different order from `readings`.** `merge()` sorts its
result by the key. Count and compare; do not rely on row positions.

## Next

- [Leave an R script someone else can rerun](r-leave-a-rerunnable-script.md)
- A join carries problems along with it: rows repeated in `readings` are still
  repeated in `joined`. See [Count records per day in R](r-count-records-per-day.md).
- The same task in Python: [Reconcile row counts before and after a join](reconcile-a-join.md).

*Not yet validated in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run that day with R 4.6.0 on a laptop.*
