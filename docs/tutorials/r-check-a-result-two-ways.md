---
type: Guide
title: "Check a result a second way in R"
description: "Count the same rows two ways in R, find out why the two disagree, and keep a result only once two independent routes give the same answer."
tags: [byte, p4, rstudio, r, verification, missing-values]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/subset.html"
    title: "Subsetting Vectors, Matrices and Data Frames: subset (R documentation)"
    author: "team:r-core"
---

# Check a result a second way in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-17 (R
    4.6.2), by the AI assistant that drafted it, and produced the output shown. No
    person has yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

If two different routes give the same answer, a mistake would have to be made twice,
in the same way, to go unnoticed. If they disagree, you have found something before
your reader does. This works for a result of your own, a colleague's, or an AI
assistant's.

**You will:** have counted the readings not flagged as suspect in two ways, explained
why the counts differ, and reached a total that two routes agree on.

**Time:** 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. In the **Console**, count the readings whose flag is not `S`:

    ```r
    nrow(subset(readings, flag != "S"))
    ```

    You should see:

    ```text
    [1] 0
    ```

2. Count them again, with square brackets:

    ```r
    odd <- readings[readings$flag != "S", ]
    nrow(odd)
    ```

    You should see: a different answer. At least one route is not doing what you
    meant.

    ```text
    [1] 150
    ```

3. Look at the rows the second route kept:

    ```r
    head(odd, 3)
    ```

    You should see: rows with nothing in them.

    ```text
         gauge_id date value flag
    NA       <NA> <NA>    NA <NA>
    NA.1     <NA> <NA>    NA <NA>
    NA.2     <NA> <NA>    NA <NA>
    ```

    Most flags are missing, and comparing a missing value with `"S"` gives `NA`,
    neither true nor false. `subset()` drops those rows. Square brackets keep one
    empty row for each. Neither route kept the 150 unflagged readings.

4. Say what you mean: keep a row if its flag is missing or is not `S`.

    ```r
    kept <- readings[is.na(readings$flag) | readings$flag != "S", ]
    nrow(kept)
    ```

    You should see:

    ```text
    [1] 150
    ```

5. Check the total rainfall in `kept` by a route that does not use `kept`: the
   whole column, less the readings flagged `S`.

    ```r
    sum(kept$value)
    sum(readings$value) - sum(readings$value[which(readings$flag == "S")])
    ```

    You should see: the same number twice.

    ```text
    [1] 895.43
    [1] 895.43
    ```

## Check it worked

Two routes give 895.43, and you can say why step 1 counted no rows and why the 150
in step 2 was not the 150 you wanted.

## If it didn't

**Step 5 prints `NA`.** `kept` was made with the square brackets of step 2, so it
holds empty rows. Make it again with the line in step 4.

**The two routes agree but you doubt both.** Agreement shows the two were computed the
same way, not that the data is sound. This total still mixes units.

## Next

- [Check that the parts add up to the whole in R](r-check-parts-add-up.md)
- [Tally a quality flag in R](r-tally-a-quality-flag.md)
- Reference: [subset](https://stat.ethz.ch/R-manual/R-devel/library/base/html/subset.html) in the R documentation.

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (R 4.6.2).*
