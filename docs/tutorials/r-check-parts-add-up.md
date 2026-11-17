---
type: Guide
title: "Check that the parts add up to the whole in R"
description: "After splitting an R data frame into groups, add the groups back up and compare with the whole table, so that rows dropped without warning are noticed."
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
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/table.html"
    title: "Cross Tabulation and Table Creation: table (R documentation)"
    author: "team:r-core"
---

# Check that the parts add up to the whole in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-17 (R
    4.6.2), by the AI assistant that drafted it, and produced the output shown. No
    person has yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Splitting a table into groups should lose nothing: the groups, added up, should give
the table back. When they do not, rows have gone missing without an error message.

**You will:** have caught 150 rows that a tally dropped without warning, and
confirmed a split that loses none.

**Time:** 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. In the **Console**, state the whole before you split it:

    ```r
    nrow(readings)
    ```

    You should see:

    ```text
    [1] 152
    ```

2. Count the rows for each flag:

    ```r
    parts <- table(readings$flag)
    parts
    ```

    You should see: one group. Nothing warns you that anything is missing.

    ```text

    S
    2
    ```

3. Add the parts up and put the total beside the whole:

    ```r
    c(sum(parts), nrow(readings))
    ```

    You should see: the parts 150 rows short.

    ```text
    [1]   2 152
    ```

4. The missing rows are the ones with no flag: `table()` leaves out missing values
   unless told otherwise. Tell it otherwise:

    ```r
    parts <- table(readings$flag, useNA = "ifany")
    parts
    ```

    You should see:

    ```text

       S <NA>
       2  150
    ```

5. Check again:

    ```r
    sum(parts) == nrow(readings)
    ```

    You should see:

    ```text
    [1] TRUE
    ```

6. The same check works for a sum. Split the rainfall by gauge, and compare the
   groups' total with the column's:

    ```r
    by_gauge <- tapply(readings$value, readings$gauge_id, sum)
    c(sum(by_gauge), sum(readings$value))
    ```

    You should see: the same number twice. No row is missing its `gauge_id`, so this
    split loses nothing.

    ```text
    [1] 1075.43 1075.43
    ```

## Check it worked

You have made two comparisons where the parts equal the whole: 152 rows by flag, and
1075.43 by gauge. You can say which rows the first tally dropped and why.

## If it didn't

**Step 3 shows `[1] 152 152`.** `parts` was already made with `useNA = "ifany"`. That
is the corrected version; run step 2 again to see the short one.

**Step 6 shows `NA`.** A value is missing somewhere in the column. Run
`sum(is.na(readings$value))`; in the practice data it is 0.

## Next

- [Tally a quality flag in R](r-tally-a-quality-flag.md),
  which counts the missing flags directly.
- [Check a result a second way in R](r-check-a-result-two-ways.md)
- Reference: [table](https://stat.ethz.ch/R-manual/R-devel/library/base/html/table.html) in the R documentation.

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (R 4.6.2).*
