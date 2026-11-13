---
type: Guide
title: "Tally a quality flag in R"
description: "Count the rows for each value of a quality flag in R, including the missing ones, and look at the flagged rows before deciding what to do with them."
tags: [byte, p2, rstudio, r, data-quality]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/table.html"
    title: "Cross Tabulation and Table Creation: table (R documentation)"
    author: "team:r-core"
---

# Tally a quality flag in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-13 (R 4.6.2)
    and produced the output shown, one step at a time. Nobody else has yet followed
    the steps, so a screen may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Many datasets mark the readings their instrument doubted. `table()` counts them, but by
default it leaves missing values out, which hides how many rows carry no flag at all.

**You will:** know how many readings are flagged, which ones, and at which gauges.

**Time:** 5 minutes. **You need:** the `readings` table from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. Read what the flag means in the
   [data dictionary](practice-data.md#data-dictionary).

    You should see: blank, or `S` for a reading the sensor marked suspect.

2. Count the rows for each flag value, missing ones included:

    ```r
    table(readings$flag, useNA = "always")
    ```

    You should see:

    ```text
       S <NA>
       2  150
    ```

3. Check that nothing is left over: 2 + 150 = 152, the number of rows.

    You should see: the counts add up, and no flag value the dictionary does not list.

4. Look at the flagged rows:

    ```r
    readings[which(readings$flag == "S"), ]
    ```

    You should see:

    ```text
        gauge_id       date value flag
    77       G03 2026-07-18     0    S
    130      G05 2026-07-09   180    S
    ```

5. Count flags by gauge:

    ```r
    table(readings$gauge_id, readings$flag, useNA = "ifany")
    ```

    You should see:

    ```text
           S <NA>
      G01  0   27
      G02  0   31
      G03  1   31
      G04  0   31
      G05  1   30
    ```

6. In a script or a notes file, write down what you will do with flagged readings and
   why: keep them, leave them out, or report the result both ways.

    You should see: your decision recorded where a reader of your result can find it.

## Check it worked

You can say how many readings are flagged (2), where they are, and what your analysis
does with them. One is far outside its gauge's range; the other is an ordinary dry day.

## If it didn't

**Step 4 prints 152 rows, 150 of them all `NA`.** You wrote `readings[readings$flag == "S", ]`
without `which()`. Comparing a missing value with `"S"` gives `NA`, and R returns a row
of `NA` for each one. `which()` keeps only the rows where the comparison is true.

## Next

- [Query a Parquet file with DuckDB from R](r-query-parquet-with-duckdb.md)
- The same task in Python: [Tally a quality flag before you trust a number](tally-a-quality-flag.md).

*Not yet validated by a second person in MESA RStudio Geospatial. Drafted 2026-11-13; the code was run there that day (R 4.6.2).*
