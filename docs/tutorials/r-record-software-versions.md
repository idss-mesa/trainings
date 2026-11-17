---
type: Guide
title: "Record the R and package versions a result depends on"
description: "Write the R version and the version of every installed package to files beside your work in MESA RStudio Geospatial, so that a result can be traced to the software that produced it."
tags: [byte, p5, rstudio, r, reproducibility, environment]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r-installed
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/utils/html/installed.packages.html"
    title: "Find Installed Packages: installed.packages (R documentation)"
    author: "team:r-core"
  - id: r-session
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/utils/html/sessionInfo.html"
    title: "Collect Information About the Current R Session: sessionInfo (R documentation)"
    author: "team:r-core"
---

# Record the R and package versions a result depends on

!!! warning "Draft: not yet validated"
    The code on this page was run in MESA RStudio Geospatial on 2026-11-17 (R 4.6.2),
    by the AI assistant that drafted it, and gave the results quoted in the steps. No
    person has yet followed the steps.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The software in a MESA app changes when the app is rebuilt. A number you computed
today may not come out the same next year, and without a record you cannot tell
whether the data or the software changed.

**You will:** have three small files beside your work that say which R and which
package versions it ran on.

**Time:** 5 minutes. **You need:** the `mesa-practice` folder from
[Load a file from your Data Store in RStudio](r-load-a-file.md), or a folder of your
own, in MESA RStudio Geospatial with R's working folder set to it.

## Steps

1. In the **Console**, check the R version:

    ```r
    R.version.string
    ```

    You should see: one line, such as `[1] "R version 4.6.2 (2026-10-29)"`.

2. Write every installed package and its version to a file:

    ```r
    pkgs <- as.data.frame(installed.packages()[, c("Package", "Version")], row.names = FALSE)
    write.csv(pkgs, "r-packages.csv", row.names = FALSE)
    ```

    You should see: no output, and `pkgs` in the **Environment** tab at the top
    right.

3. Count what was recorded:

    ```r
    nrow(pkgs)
    ```

    You should see: a few hundred, one row for each package. In our test, `[1] 288`.

4. Look up the packages your work loads. For the practice tutorials:

    ```r
    pkgs[pkgs$Package %in% c("sf", "duckdb", "terra"), ]
    ```

    You should see: one row for each, with its version. In our test, `duckdb` 2.0.0,
    `sf` 1.1-3 and `terra` 1.9-50. The number at the start of each row is its place
    in the list.

5. Record the session: the operating system, and the packages loaded right now.

    ```r
    writeLines(capture.output(sessionInfo()), "r-session.txt")
    ```

    You should see: no output. Run this at the end of your work, when everything the
    work uses has been loaded.

6. Write a one-line note that ties the files together and dates them:

    ```r
    writeLines(paste0(R.version.string, ", packages in r-packages.csv, recorded ", Sys.Date()), "r-environment.txt")
    readLines("r-environment.txt")
    ```

    You should see: the note. In our test,
    `[1] "R version 4.6.2 (2026-10-29), packages in r-packages.csv, recorded 2026-11-17"`.

## Check it worked

`list.files(pattern = "^r-")` names `r-environment.txt`, `r-packages.csv` and
`r-session.txt`, and step 4 shows a version for each package your work loads.

## If it didn't

**Step 4 prints `[1] Package Version` and `<0 rows>`.** None of the names matched
what is installed. Names are case-sensitive: search with
`pkgs[grepl("duck", pkgs$Package, ignore.case = TRUE), ]` and use the spelling it
shows.

## Next

- These files record the software; they do not rebuild it. To run old work again you
  need an app with the same versions, or to install them yourself.
- Record again whenever a result goes into a report: the date in `r-environment.txt`
  says which run the record belongs to.
- [Leave an R script someone else can rerun](r-leave-a-rerunnable-script.md)
- [Write a README for a data folder, from RStudio](r-write-a-readme.md), and mention
  these three files in it.
- The same task in Python: [Record the software versions a result depends on](record-software-versions.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (R 4.6.2).*
