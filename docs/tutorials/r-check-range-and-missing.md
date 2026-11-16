---
type: Guide
title: "Check a column's range and missing values in R"
description: "Find the smallest and largest value in a column and count the missing values in every column of an R data frame, so that an impossible value or a gap shows up before you compute with it."
tags: [byte, p2, rstudio, r, data-quality, missing-values]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/NA.html"
    title: "Not Available / Missing Values: NA and is.na (R documentation)"
    author: "team:r-core"
---

# Check a column's range and missing values in R

!!! warning "Draft: not yet validated"
    The code on this page was run with R 4.6.0 on a laptop on 2026-11-16 and produced
    the output shown. The site build runs it again in the MESA RStudio Geospatial
    image. Nobody has yet followed the steps in the app, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** know the range of `value` at each gauge and how many missing values each
column of `readings` holds.

**Time:** 5 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. In the **Console**, run:

    ```r
    range(readings$value)
    ```

    You should see: the smallest value, then the largest.

    ```text
    [1]   0 180
    ```

2. Ask whether both ends are believable. Zero is a dry day. Decide whether 180 could
   be one day's rain before you read on.

    You should see: a reason to look closer. A range tells you that something is
    unusual, not what it is.

3. Split the range by gauge:

    ```r
    aggregate(value ~ gauge_id, data = readings, FUN = function(v) c(min = min(v), max = max(v)))
    ```

    You should see:

    ```text
      gauge_id value.min value.max
    1      G01      0.00     24.90
    2      G02      0.00      2.92
    3      G03      0.00     32.50
    4      G04      0.00     26.40
    5      G05      0.00    180.00
    ```

4. Count the missing values in every column:

    ```r
    colSums(is.na(readings))
    ```

    You should see:

    ```text
    gauge_id     date    value     flag
           0        0        0      150
    ```

5. Check the count against the [data dictionary](practice-data.md#data-dictionary).

    You should see: that a blank `flag` is expected, since it means the sensor raised
    no concern, and that `value` is never missing.

## Check it worked

You can state two things: the largest `value` at each gauge, and that the only column
with missing values is `flag`, with 150 of them.

## If it didn't

**The counts in step 4 are all zero.** `flag` was read as empty text, not as missing.
Read the file again with `na.strings = ""`, as in
[Load a file from your Data Store in RStudio](r-load-a-file.md).

**Step 1 prints `[1] NA NA`.** The column holds a missing value, and `range()` will not
guess around it. `range(readings$value, na.rm = TRUE)` leaves the missing values out;
count them first, so you know how many you set aside.

## Next

- [Tally a quality flag in R](r-tally-a-quality-flag.md), which follows up the 180.
- "No missing values" does not mean "no missing days": a day with no row at all is not
  an `NA`. [Count records per day in R](r-count-records-per-day.md) covers that.
- The same task in Python: [Check a column's range and missing values](check-range-and-missing.md).

*Not yet validated in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run that day with R 4.6.0 on a laptop.*
