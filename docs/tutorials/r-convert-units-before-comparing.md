---
type: Guide
title: "Bring two units onto one scale in R"
description: "Give each reading its gauge's unit in R, convert every value to millimetres with a lookup you write yourself, and confirm that no row was left unconverted."
tags: [byte, p3, rstudio, r, units, data-quality]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/Extract.html"
    title: "Extract or Replace Parts of an Object (R documentation)"
    author: "team:r-core"
---

# Bring two units onto one scale in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-16 (R 4.6.2),
    by the AI assistant that drafted it, and produced the output shown. No person has
    yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The practice gauges do not all report in the same unit, and the unit is written in a
different file from the readings. Until the values share a unit, no comparison between
gauges means anything.

**You will:** have a `value_mm` column that holds every reading in millimetres, and
proof that no row was left unconverted.

**Time:** 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. List the units in use:

    ```r
    table(gauges$unit)
    ```

    You should see: two units.

    ```text
    cm mm
     1  4
    ```

2. Write down, as a small lookup of your own, how each unit becomes millimetres:

    ```r
    to_mm <- c(mm = 1, cm = 10)
    ```

    You should see: no output. A unit you have not listed here will show up in step 4.

3. Give each reading its gauge's unit, then convert:

    ```r
    joined <- merge(readings, gauges[c("gauge_id", "unit")], by = "gauge_id", all.x = TRUE)
    joined$value_mm <- joined$value * unname(to_mm[joined$unit])
    head(joined[joined$gauge_id == "G02", ], 3)
    ```

    You should see: the original `value` kept, and `value_mm` ten times larger for
    this gauge. `to_mm[joined$unit]` looks up each row's unit by name.

    ```text
       gauge_id       date value flag unit value_mm
    28      G02 2026-07-01  0.00 <NA>   cm      0.0
    29      G02 2026-07-02  0.00 <NA>   cm      0.0
    30      G02 2026-07-03  2.89 <NA>   cm     28.9
    ```

4. Count the readings that were not converted:

    ```r
    sum(is.na(joined$value_mm))
    ```

    You should see: `0`. A reading with no gauge, or with a unit missing from `to_mm`,
    would have `NA` for `value_mm` and be counted here.

    ```text
    [1] 0
    ```

5. Compare the largest reading at each gauge, before and after:

    ```r
    aggregate(cbind(value, value_mm) ~ gauge_id, data = joined, FUN = max)
    ```

    You should see: G02 no longer far below its neighbours.

    ```text
      gauge_id  value value_mm
    1      G01  24.90     24.9
    2      G02   2.92     29.2
    3      G03  32.50     32.5
    4      G04  26.40     26.4
    5      G05 180.00    180.0
    ```

## Check it worked

`nrow(joined) == nrow(readings)` is `TRUE`, step 4 gave `0`, and for the four gauges
that already reported in millimetres `value_mm` equals `value`.

## If it didn't

**Step 4 gives a number above 0.** Some gauge reports in a unit that `to_mm` does not
list. Run `unique(joined$unit[is.na(joined$value_mm)])` to see which, add it to `to_mm`
in step 2, and run steps 3 and 4 again.

## Next

- The values now share a unit, but a total would still count one row twice. See
  [Find and remove a repeated row in R](r-remove-a-repeated-row.md).
- [Reconcile row counts before and after a join in R](r-reconcile-a-join.md)
- The same task in Python: [Bring two units onto one scale before comparing](convert-units-before-comparing.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run there that day (R 4.6.2).*
