---
type: Guide
title: "Leave an R script someone else can rerun"
description: "Put your checks in an R script that reads its own data, then run it from an empty workspace in MESA RStudio Geospatial to confirm it does not depend on anything you typed earlier."
tags: [byte, p5, rstudio, r, reproducibility]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/source.html"
    title: "Read R Code from a File: source (R documentation)"
    author: "team:r-core"
---

# Leave an R script someone else can rerun

!!! warning "Draft: not yet validated"
    The script on this page was run from an empty workspace with R 4.6.0 on a laptop on
    2026-11-16. Nobody has yet followed the steps in MESA RStudio Geospatial, so a menu
    name may differ there. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

What you type in the **Console** stays in R's memory. A script that uses a table you
loaded by hand runs for you and fails for the next person, who starts with nothing
loaded.

**You will:** have a script that runs from an empty workspace, top to bottom, without
you.

**Time:** 5 to 10 minutes. **You need:** the `mesa-practice` folder from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md), with R's working folder still set
to it.

## Steps

1. Choose **File → New File → R Script**.

    You should see: an empty editor tab named **Untitled1**, above the **Console**.

2. Type the script. It says what it needs, reads its own data, and names files without
   a folder in front:

    ```r
    # Checks on the practice rain-gauge data.
    # Needs gauges.csv and readings.csv in the same folder as this script.
    # Both are at https://idss-mesa.github.io/trainings/tutorials/practice-data/

    readings <- read.csv("readings.csv", na.strings = "")
    gauges <- read.csv("gauges.csv")

    stopifnot(nrow(readings) == 152, anyDuplicated(gauges$gauge_id) == 0)
    print(table(readings$flag, useNA = "always"))

    cat(R.version.string, "\n")
    ```

    You should see: the script in the editor. A path that starts at your own home
    folder works only for you; a bare file name works for anyone who has the file
    beside the script.

3. Choose **File → Save As…**, and save it as `checks.R` in `mesa-practice`.

    You should see: the tab renamed **checks.R**, and the file in the **Files** tab at
    the bottom right.

4. In the **Console**, empty R's memory: run `rm(list = ls())`.

    You should see: the **Environment** tab at the top right now empty. This is what
    the next person starts with.

5. In the **Console**, run `source("checks.R", echo = TRUE)`.

    You should see: each line of the script, the flag counts (`S` 2, `<NA>` 150), and
    a last line that names the version of R. No line begins `Error`.

6. Look at the `mesa-practice` folder in the **Files** tab.

    You should see: `checks.R`, `gauges.csv`, and `readings.csv`. The folder holds
    everything the script needs, so the folder is what you share.

## Check it worked

Step 5 ran to the version line from an empty **Environment**. `stopifnot()` stayed
silent, which means the table still has 152 rows and no gauge is listed twice.

## If it didn't

**`Error: object '...' not found`.** The script uses something it never made, which
was in memory only because you had typed it in the Console. Add the line that makes
it above the line that failed, then repeat steps 4 and 5.

**`cannot open file 'readings.csv': No such file or directory`.** R's working folder
is not the folder that holds the script. Choose
**Session → Set Working Directory → To Source File Location**, then repeat step 5.

## Next

- [Record the software versions a result depends on](record-software-versions.md)
- Reference: [Managing data, "Share data"](https://idss-mesa.github.io/docs/portal/data/#share-data),
  for giving a colleague access to the folder.
- The same task in Python: [Leave a notebook someone else can rerun](leave-a-rerunnable-notebook.md).

*Not yet validated in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the script was run that day with R 4.6.0 on a laptop.*
