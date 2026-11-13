---
type: Guide
title: "Query a Parquet file with DuckDB from a notebook"
description: "Run SQL against a Parquet file from a notebook with DuckDB, without loading the file into memory first, and bring a result back as a pandas table."
tags: [byte, p3, duckdb, parquet, sql]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: duckdb
    resource: "https://duckdb.org/docs/stable/data/parquet/overview"
    title: "Reading and writing Parquet files (DuckDB documentation)"
    author: "team:duckdb"
---

# Query a Parquet file with DuckDB from a notebook

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-13 and produced the
    output shown. Nobody has yet followed the steps there by hand, so a menu or a screen
    may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Parquet is the format large shared datasets are usually stored in: compressed, typed,
and readable one column at a time. DuckDB runs SQL straight against such a file, so
you can ask a question of data far too large to load.

**You will:** have queried a Parquet file with SQL and turned a result into a pandas
table.

**Time:** 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run.

## Steps

1. Import DuckDB:

    ```python
    import duckdb

    duckdb.__version__
    ```

    You should see: a version number, such as `'2.0.0'`.

2. Make a Parquet file to practise on, from the CSV you already have:

    ```python
    duckdb.sql("COPY (SELECT * FROM 'readings.csv') TO 'readings.parquet' (FORMAT parquet)")
    ```

    You should see: no output, and `readings.parquet` in the file browser.

3. Ask what the file holds, without reading its rows:

    ```python
    duckdb.sql("DESCRIBE SELECT * FROM 'readings.parquet'")
    ```

    You should see: the four columns, each with a type. `date` is a real date here,
    not text.

    ```text
    ┌─────────────┬─────────────┬─────────┬─────────┬─────────┬─────────┐
    │ column_name │ column_type │  null   │   key   │ default │  extra  │
    │   varchar   │   varchar   │ varchar │ varchar │ varchar │ varchar │
    ├─────────────┼─────────────┼─────────┼─────────┼─────────┼─────────┤
    │ gauge_id    │ VARCHAR     │ YES     │ NULL    │ NULL    │ NULL    │
    │ date        │ DATE        │ YES     │ NULL    │ NULL    │ NULL    │
    │ value       │ DOUBLE      │ YES     │ NULL    │ NULL    │ NULL    │
    │ flag        │ VARCHAR     │ YES     │ NULL    │ NULL    │ NULL    │
    └─────────────┴─────────────┴─────────┴─────────┴─────────┴─────────┘
    ```

4. Summarise it with SQL:

    ```python
    duckdb.sql("""
        SELECT gauge_id, count(*) AS n_rows, max(value) AS largest
        FROM 'readings.parquet'
        GROUP BY gauge_id
        ORDER BY gauge_id
    """)
    ```

    You should see:

    ```text
    ┌──────────┬────────┬─────────┐
    │ gauge_id │ n_rows │ largest │
    │ varchar  │ int64  │ double  │
    ├──────────┼────────┼─────────┤
    │ G01      │     27 │    24.9 │
    │ G02      │     31 │    2.92 │
    │ G03      │     32 │    32.5 │
    │ G04      │     31 │    26.4 │
    │ G05      │     31 │   180.0 │
    └──────────┴────────┴─────────┘
    ```

5. Bring a result into pandas with `.df()`:

    ```python
    flagged = duckdb.sql("SELECT * FROM 'readings.parquet' WHERE flag = 'S'").df()
    flagged
    ```

    You should see: an ordinary pandas table with two rows.

    ```text
      gauge_id       date  value flag
    0      G03 2026-07-18    0.0    S
    1      G05 2026-07-09  180.0    S
    ```

## Check it worked

The `n_rows` column adds up to 152, the number of rows pandas counted in
`readings.csv`. Two tools reading the same data should agree before you trust either.

## If it didn't

**`IOException: IO Error: No files found that match the pattern "readings.parquet"`.**
DuckDB looks in the notebook's own folder. Either step 2 did not run, or the notebook
is not in `mesa-practice`. Run step 2 again and look for the file in the file browser.

## Next

- The same SQL runs from a terminal with the `duckdb` command:
  `duckdb :memory: "SELECT count(*) FROM 'readings.parquet'"`. MESA JupyterLab does not
  include DuckDB's R package; for R, see
  [Query a Parquet file with DuckDB from R](r-query-parquet-with-duckdb.md).
- [Reconcile row counts before and after a join](reconcile-a-join.md)
- Reference: [Reading and writing Parquet files](https://duckdb.org/docs/stable/data/parquet/overview)
  and the [client overview](https://duckdb.org/docs/2.0/clients/overview) in the DuckDB
  documentation.

*Not yet validated by a person in MESA JupyterLab. Drafted 2026-11-13; the code was run there on 2026-11-13 (pandas 3.1.1, DuckDB 2.0.0).*
