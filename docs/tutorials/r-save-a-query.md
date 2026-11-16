---
type: Guide
title: "Save a query from R so someone else can run it"
description: "Write a SQL query to a file of its own from R, then run it from that file with the duckdb package in MESA RStudio Geospatial, so that a colleague runs the same text you did."
tags: [byte, p3, rstudio, r, duckdb, sql]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: duckdb
    resource: "https://duckdb.org/docs/stable/clients/r"
    title: "DuckDB R client"
    author: "org:duckdb"
---

# Save a query from R so someone else can run it

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-16 (R 4.6.2),
    by the AI assistant that drafted it, and produced the output shown. No person has
    yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A query typed into the Console is easy to change and hard to hand over. In a file of
its own it has a name, it can be read without opening R, and whoever runs it runs the
same text you did.

**You will:** have a file, `flagged_readings.sql`, in your practice folder, and one
line of R that runs the query from that file.

**Time:** 5 to 10 minutes. **You need:** the `mesa-practice` folder from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md), with R's working folder still set
to it.

## Steps

1. Write the query as lines of text. Start with comment lines, which begin with `--`,
   that say what it returns and which file it reads:

    ```r
    query <- c(
      "-- Readings the sensor marked suspect, oldest first.",
      "-- Needs readings.csv in the folder this is run from.",
      "SELECT gauge_id, date, value",
      "FROM 'readings.csv'",
      "WHERE flag = 'S'",
      "ORDER BY date;"
    )
    ```

    You should see: no output.

2. Save the lines to a file in the working folder:

    ```r
    writeLines(query, "flagged_readings.sql")
    ```

    You should see: no output.

3. Load DuckDB and open a connection:

    ```r
    library(duckdb)
    con <- dbConnect(duckdb())
    ```

    You should see: `Loading required package: DBI`, and then, on first use, the
    question `duckdb: create /home/rstudio/.duckdb? (Yes/no/cancel)`. Type `yes` and
    press ++enter++ before you type anything else.

4. Run the query from the file, not from the variable:

    ```r
    dbGetQuery(con, paste(readLines("flagged_readings.sql"), collapse = "\n"))
    ```

    You should see: the two flagged readings.

    ```text
      gauge_id       date value
    1      G05 2026-07-09   180
    2      G03 2026-07-18     0
    ```

5. In the **Console**, run `file.edit("flagged_readings.sql")`.

    You should see: the query in an editor tab above the Console, with your two
    comment lines at the top. This is what a colleague reads first. From now on, change
    the query here, save it, and run step 4 again.

6. Close the connection:

    ```r
    dbDisconnect(con, shutdown = TRUE)
    ```

    You should see: no output.

## Check it worked

`list.files()` names `flagged_readings.sql`, and the one line in step 4 returns two
rows. Someone with the folder can run that line, or read the file, without asking you
what the query was.

## If it didn't

**`IO Error: No files found that match the pattern "readings.csv"`.** The query names
its data file without a folder, so it must be run from the folder that holds the
file. Go to your practice folder with `setwd()`, as in
[Load a file from your Data Store in RStudio](r-load-a-file.md), and run step 4 again.

**`Unrecognized response`, after step 3.** You typed the next command while DuckDB was
still waiting for `yes`. Run step 3 again, answer `yes`, then go on.

## Next

- [Leave an R script someone else can rerun](r-leave-a-rerunnable-script.md)
- [Query a Parquet file with DuckDB from R](r-query-parquet-with-duckdb.md)
- The same task in Python: [Save a query so someone else can run it](save-a-query.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run there that day (R 4.6.2).*
