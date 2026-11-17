---
type: Guide
title: "Compare two files that should look alike in R"
description: "Put July's and August's readings side by side in R, by row count, by gauge and by largest value, so that what is unusual in one month stands out against the other."
tags: [byte, p4, rstudio, r, exploration, verification]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/tapply.html"
    title: "Apply a Function Over a Ragged Array: tapply (R documentation)"
    author: "team:r-core"
---

# Compare two files that should look alike in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-17 (R
    4.6.2), by the AI assistant that drafted it, and produced the output shown. No
    person has yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A second file of the same kind is a free expectation. Two months from the same five
gauges should have the same columns, about the same number of rows, and values of a
similar size. Where they differ is where to look.

**You will:** have a short list of the places where July's readings and August's
differ, each one a question to follow up.

**Time:** 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md), with R's working folder still set
to `mesa-practice`.

## Steps

1. In the **Console**, fetch August's file into the working folder:

    ```r
    download.file("https://idss-mesa.github.io/trainings/assets/practice/readings_august.csv", "readings_august.csv")
    ```

    You should see: a few lines, the last of which begins `downloaded`.

2. Load it, then compare the row counts and the column names. Five gauges over 31
   days would give 155 rows in each month.

    ```r
    august <- read.csv("readings_august.csv", na.strings = "")
    c(nrow(readings), nrow(august))
    identical(names(readings), names(august))
    ```

    You should see: neither month complete, and the same columns in both.

    ```text
    [1] 152 151
    [1] TRUE
    ```

3. Count the rows for each gauge, with the months side by side:

    ```r
    cbind(july = table(readings$gauge_id), august = table(august$gauge_id))
    ```

    You should see: 31 nearly everywhere. July is short at G01 and one over at G03.
    August is short at G03.

    ```text
        july august
    G01   27     31
    G02   31     31
    G03   32     27
    G04   31     31
    G05   31     31
    ```

4. Do the same for the largest reading:

    ```r
    cbind(
      july = tapply(readings$value, readings$gauge_id, max),
      august = tapply(august$value, august$gauge_id, max)
    )
    ```

    You should see: four gauges within 0.2 of their other month, and G05 with 180 in
    July against 27.4 in August.

    ```text
          july august
    G01  24.90  24.80
    G02   2.92   2.84
    G03  32.50  32.30
    G04  26.40  26.30
    G05 180.00  27.40
    ```

5. Compare the flags. July has two readings flagged `S`. For August:

    ```r
    table(august$flag, useNA = "ifany")
    ```

    You should see: no flag on any row.

    ```text

    <NA>
     151
    ```

6. Write each difference down as a question, as comments in your script or in a
   notes file.

    You should see: a list such as "July G01: four days missing? July G03: a repeated
    row? July G05: is 180 real? August G03: four days missing?"

## Check it worked

Your list has four entries, each naming a month and a gauge. None of them is answered
yet: the comparison tells you where to look, not what happened.

## If it didn't

**Step 2 says `cannot open file 'readings_august.csv'`.** The file is not in R's
working folder. Run `getwd()` to see where R is looking, then repeat step 1.

**`cbind` warns that the lengths differ.** One file has a gauge the other lacks. That
is a difference too; add it to your list.

## Next

- [Count records per day in R](r-count-records-per-day.md),
  for the short and long gauges.
- [Find and remove a repeated row in R](r-remove-a-repeated-row.md)
- [Plot a column to spot odd values in R](r-plot-to-spot-odd-values.md), for the 180.
- Reference: [tapply](https://stat.ethz.ch/R-manual/R-devel/library/base/html/tapply.html) in the R documentation.

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (R 4.6.2).*
