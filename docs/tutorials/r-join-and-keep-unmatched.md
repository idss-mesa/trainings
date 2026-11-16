---
type: Guide
title: "Join two tables in R and keep the unmatched rows visible"
description: "Join a table of gauges to an incomplete table of positions with merge() in R, keep the gauge that finds no match, and count how many matched."
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

# Join two tables in R and keep the unmatched rows visible

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-16 (R 4.6.2),
    by the AI assistant that drafted it, and produced the output shown. No person has
    yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

`merge()` keeps only the rows that find a match. The rest leave without a message, and
every count after the join is quietly smaller. `all.x = TRUE` keeps them where you can
see them.

**You will:** have a join in which a gauge with no position is still listed, and a
count of how many gauges matched.

**Time:** 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. In the **Console**, fetch the file of gauge positions into your practice folder:

    ```r
    download.file("https://idss-mesa.github.io/trainings/assets/practice/gauge_sites.csv", "gauge_sites.csv")
    ```

    You should see: a line that reads `downloaded 144 bytes`.

2. Read it, and make a copy that is incomplete on purpose: only the gauges west of one
   line of longitude.

    ```r
    sites <- read.csv("gauge_sites.csv")
    west <- sites[sites$longitude < -104.73, ]
    nrow(west)
    ```

    You should see: four positions, for five gauges.

    ```text
    [1] 4
    ```

3. Join the gauges to those positions in the ordinary way:

    ```r
    merge(gauges[c("gauge_id", "name")], west[c("gauge_id", "longitude", "latitude")], by = "gauge_id")
    ```

    You should see: four rows and no warning. One gauge has gone, and nothing says so.

    ```text
      gauge_id      name longitude latitude
    1      G01 Boathouse -104.7612  47.1034
    2      G02   Orchard -104.7391  47.1108
    3      G04     Depot -104.7533  47.1175
    4      G05    Quarry -104.7306  47.0962
    ```

4. Add `all.x = TRUE`, which keeps every row of the table named first:

    ```r
    kept <- merge(gauges[c("gauge_id", "name")], west[c("gauge_id", "longitude", "latitude")], by = "gauge_id", all.x = TRUE)
    kept
    ```

    You should see: five rows. The gauge without a position is there, with `NA` where
    its position would be.

    ```text
      gauge_id        name longitude latitude
    1      G01   Boathouse -104.7612  47.1034
    2      G02     Orchard -104.7391  47.1108
    3      G03 Observatory        NA       NA
    4      G04       Depot -104.7533  47.1175
    5      G05      Quarry -104.7306  47.0962
    ```

5. Count the matches, so the answer does not depend on reading every row:

    ```r
    c(gauges = nrow(kept), matched = sum(!is.na(kept$longitude)), unmatched = sum(is.na(kept$longitude)))
    ```

    You should see:

    ```text
       gauges   matched unmatched
            5         4         1
    ```

6. Run the same join and count against the complete table, `sites`:

    ```r
    full <- merge(gauges[c("gauge_id", "name")], sites[c("gauge_id", "longitude", "latitude")], by = "gauge_id", all.x = TRUE)
    c(gauges = nrow(full), matched = sum(!is.na(full$longitude)), unmatched = sum(is.na(full$longitude)))
    ```

    You should see: every gauge matched.

    ```text
       gauges   matched unmatched
            5         5         0
    ```

## Check it worked

In each count, `matched` plus `unmatched` equals `gauges`. You can say which gauge had
no position in step 4, and that the complete table leaves none out.

## If it didn't

**`cannot open file 'gauge_sites.csv': No such file or directory`.** Step 1 saved the
file somewhere else, because R is not in your practice folder. Run `getwd()` to see
where it is, go to the folder with `setwd()` as in
[Load a file from your Data Store in RStudio](r-load-a-file.md), and repeat step 1.

**`object 'west' not found`.** R has restarted since step 2. Run step 2 again.

## Next

- [Reconcile row counts before and after a join in R](r-reconcile-a-join.md)
- [Bring two units onto one scale in R](r-convert-units-before-comparing.md)
- The same task in Python: [Join two tables and keep the unmatched rows visible](join-and-keep-unmatched.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run there that day (R 4.6.2).*
