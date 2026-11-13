---
type: Guide
title: "Load a file from your Data Store in RStudio"
description: "Read a CSV file from your Data Store into an R data frame in MESA RStudio Geospatial, and confirm its size and column types."
tags: [byte, p2, rstudio, r, data-store]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/utils/html/read.table.html"
    title: "Data Input: read.table and read.csv (R documentation)"
    author: "team:r-core"
---

# Load a file from your Data Store in RStudio

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-13 (R 4.6.2)
    and produced the output shown, one step at a time. Nobody else has yet followed
    the steps, so a screen may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have the practice readings loaded as an R data frame, with a row count
you have checked.

**Time:** 5 to 10 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md),
and your CyVerse username.

## Steps

1. In the portal, click **Applications**, and on the **MESA RStudio Geospatial** card
   click **Instant Launch**. Wait for RStudio to open.

    You should see: RStudio, with the **Console** on the left.

2. In the **Console**, go to a practice folder in your Data Store and fetch the files,
   with your own username in the first line:

    ```r
    setwd("~/data-store/home/<your username>")
    dir.create("mesa-practice", showWarnings = FALSE)
    setwd("mesa-practice")
    base <- "https://idss-mesa.github.io/trainings/assets/practice/"
    for (f in c("gauges.csv", "readings.csv")) download.file(paste0(base, f), f)
    ```

    You should see: two lines that begin `downloaded`.

3. Read both files:

    ```r
    readings <- read.csv("readings.csv", na.strings = "")
    gauges <- read.csv("gauges.csv")
    ```

    You should see: `readings` and `gauges` appear in the **Environment** tab at the
    top right. `na.strings = ""` tells R that an empty cell is a missing value, not an
    empty piece of text.

4. Check the size:

    ```r
    dim(readings)
    ```

    You should see: rows, then columns.

    ```text
    [1] 152   4
    ```

5. Look at the first rows:

    ```r
    head(readings)
    ```

    You should see: `<NA>` wherever `flag` was blank in the file.

    ```text
      gauge_id       date value flag
    1      G01 2026-07-01   0.0 <NA>
    2      G01 2026-07-02   0.0 <NA>
    3      G01 2026-07-03  24.9 <NA>
    4      G01 2026-07-04   0.0 <NA>
    5      G01 2026-07-05  17.6 <NA>
    6      G01 2026-07-06   0.0 <NA>
    ```

6. Check what type each column was read as:

    ```r
    str(readings)
    ```

    You should see: `value` as numbers (`num`), and `date` as text (`chr`). R did not
    turn the dates into dates; `as.Date(readings$date)` does that when you need it.

## Check it worked

`dim(readings)` is `152 4`, the size the [practice data](practice-data.md) page gives,
and the **Environment** tab lists `readings` with 152 obs. of 4 variables.

## If it didn't

**`cannot open file 'readings.csv': No such file or directory`.** R is not in the
folder that holds the file. Run `getwd()` to see where it is, then repeat the `setwd()`
lines in step 2 with your username spelled exactly.

## Next

- [Tally a quality flag in R](r-tally-a-quality-flag.md)
- The same task in Python: [Load a file from your Data Store into a notebook](load-a-file.md).
- Reference: [MESA RStudio Geospatial](https://idss-mesa.github.io/docs/apps/rstudio/).

*Not yet validated by a second person in MESA RStudio Geospatial. Drafted 2026-11-13; the code was run there that day (R 4.6.2).*
