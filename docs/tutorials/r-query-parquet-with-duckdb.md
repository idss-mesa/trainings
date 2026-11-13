---
type: Guide
title: "Query a Parquet file with DuckDB from R"
description: "Run SQL against a Parquet file from R with the duckdb package in MESA RStudio Geospatial, and get each result back as an ordinary data frame."
tags: [byte, p3, rstudio, duckdb, parquet]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: duckdb
    resource: "https://duckdb.org/docs/2.0/clients/r"
    title: "R Client (DuckDB documentation)"
    author: "team:duckdb"
---

# Query a Parquet file with DuckDB from R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-13 (R 4.6.2, duckdb 2.0.0)
    and produced the output shown. Nobody else has yet followed the steps, so a screen
    may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

DuckDB runs SQL straight against a Parquet file, so R can summarise data far too large
to read into memory. MESA RStudio Geospatial has the R `duckdb` package installed.

**You will:** have queried a Parquet file with SQL from R, and have the result as a data
frame.

**Time:** 10 minutes. **You need:** the practice files in your working folder, from
[Load a file from your Data Store in RStudio](r-load-a-file.md).

## Steps

1. Load the package and open a connection:

    ```r
    library(duckdb)
    con <- dbConnect(duckdb())
    ```

    You should see: on first use, the question
    `duckdb: create /home/rstudio/.duckdb? (Yes/no/cancel)`. Type `yes` and press
    ++enter++. That folder holds DuckDB's settings; it is on the app's own disk and is
    removed when the app stops.

2. Make a Parquet file to practise on, from the CSV you already have:

    ```r
    dbExecute(con, "COPY (SELECT * FROM 'readings.csv') TO 'readings.parquet' (FORMAT parquet)")
    ```

    You should see: the number of rows written.

    ```text
    [1] 152
    ```

3. Ask what the file holds, without reading its rows:

    ```r
    dbGetQuery(con, "DESCRIBE SELECT * FROM 'readings.parquet'")
    ```

    You should see: the four columns with their types. Unlike `read.csv()`, DuckDB
    recognised `date` as a date.

    ```text
      column_name column_type null  key default extra
    1    gauge_id     VARCHAR  YES <NA>    <NA>  <NA>
    2        date        DATE  YES <NA>    <NA>  <NA>
    3       value      DOUBLE  YES <NA>    <NA>  <NA>
    4        flag     VARCHAR  YES <NA>    <NA>  <NA>
    ```

4. Summarise it with SQL:

    ```r
    dbGetQuery(con, "
      SELECT gauge_id, count(*) AS n_rows, max(value) AS largest
      FROM 'readings.parquet'
      GROUP BY gauge_id
      ORDER BY gauge_id
    ")
    ```

    You should see:

    ```text
      gauge_id n_rows largest
    1      G01     27   24.90
    2      G02     31    2.92
    3      G03     32   32.50
    4      G04     31   26.40
    5      G05     31  180.00
    ```

5. Keep a result as a data frame:

    ```r
    flagged <- dbGetQuery(con, "SELECT * FROM 'readings.parquet' WHERE flag = 'S'")
    flagged
    ```

    You should see: two rows, in an ordinary data frame you can pass to any R function.

    ```text
      gauge_id       date value flag
    1      G03 2026-07-18     0    S
    2      G05 2026-07-09   180    S
    ```

6. Close the connection when you have finished:

    ```r
    dbDisconnect(con, shutdown = TRUE)
    ```

    You should see: no output.

## Check it worked

The `n_rows` column adds up to 152, the number of rows `dim(readings)` reported when R
read the CSV. Two tools reading the same data should agree before you trust either.

## If it didn't

**`IO Error: No files found that match the pattern "readings.parquet"`.** DuckDB looks
in R's working folder. Either step 2 did not run, or R is somewhere else: run
`getwd()`, and `setwd()` to your `mesa-practice` folder.

## Next

- The same task in Python: [Query a Parquet file with DuckDB from a notebook](query-parquet-with-duckdb.md).
- [Map point data with sf in MESA RStudio Geospatial](map-points-in-rstudio.md)
- Reference: [R Client](https://duckdb.org/docs/2.0/clients/r) in the DuckDB
  documentation, which also covers `dplyr` through `dbplyr`.

*Not yet validated by a second person in MESA RStudio Geospatial. Drafted 2026-11-13; the code was run there that day (R 4.6.2, duckdb 2.0.0).*
