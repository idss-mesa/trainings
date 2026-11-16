---
type: Guide
title: "Find and remove a repeated row in R"
description: "Show the rows of an R data frame that have an exact copy, decide that they are one reading, remove the copy with unique(), and record what you removed."
tags: [byte, p3, rstudio, r, duplicates, data-quality]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/duplicated.html"
    title: "Determine Duplicate Elements: duplicated (R documentation)"
    author: "team:r-core"
---

# Find and remove a repeated row in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-16 (R 4.6.2),
    by the AI assistant that drafted it, and produced the output shown. No person has
    yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A row written twice adds its value to every total twice. Removing it is easy. The
part that needs thought is deciding that the two rows really are one reading.

**You will:** have a table with the repeated row removed, and a note of what you
removed and why.

**Time:** 5 to 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. Show every row that has an exact copy, keeping both copies in view:

    ```r
    readings[duplicated(readings) | duplicated(readings, fromLast = TRUE), ]
    ```

    You should see: one pair. `duplicated()` alone marks only the second of a pair;
    `fromLast = TRUE` marks the first.

    ```text
       gauge_id       date value flag
    63      G03 2026-07-05  22.5 <NA>
    64      G03 2026-07-05  22.5 <NA>
    ```

2. Decide what to keep. Read the pair: the gauge, the day, the value, and the flag are
   all the same, and the [data dictionary](practice-data.md#data-dictionary) says one
   row is one reading from one gauge for one day.

    You should see: no difference between the two rows. They carry the same
    information, so one can go and nothing is lost.

3. Remove the copy, into a new table:

    ```r
    deduped <- unique(readings)
    nrow(readings) - nrow(deduped)
    ```

    You should see: the number of rows removed. `readings` itself is unchanged.

    ```text
    [1] 1
    ```

4. Check for the harder case, two rows for the same gauge and day that *disagree*:

    ```r
    sum(duplicated(deduped[c("gauge_id", "date")]))
    ```

    You should see: `0`. Anything above zero would be two different readings for one
    day. `unique()` leaves those alone, and so should you until you know which is right.

    ```text
    [1] 0
    ```

5. See what the copy was doing to that gauge's total:

    ```r
    c(before = sum(readings$value[readings$gauge_id == "G03"]), after = sum(deduped$value[deduped$gauge_id == "G03"]))
    ```

    You should see: the total fall by the value of the repeated row.

    ```text
    before  after
     273.6  251.1
    ```

6. In a script or a notes file, record what you removed: the gauge, the day, the
   value, and that the two rows were identical.

    You should see: your note where a reader can tell the row was removed on purpose.

## Check it worked

Run step 1 on the new table, with `deduped` in place of `readings`. It prints
`<0 rows>`, and your note says which row went.

## If it didn't

**Step 1 prints `<0 rows>`.** The table was already cleaned, or `readings` was
replaced by another table. Read the file again, as in
[Load a file from your Data Store in RStudio](r-load-a-file.md), then repeat the step.

## Next

- [Count records per day in R](r-count-records-per-day.md), which finds the same row
  another way, and the days with no row at all.
- [Bring two units onto one scale in R](r-convert-units-before-comparing.md)
- The same task in Python: [Find and remove a repeated row](remove-a-repeated-row.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run there that day (R 4.6.2).*
