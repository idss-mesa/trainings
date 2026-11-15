---
type: Guide
title: "Save a query so someone else can run it"
description: "Put a SQL query in its own file beside the notebook, with a comment that says what it needs, and run it from that file so that a colleague runs exactly what you ran."
tags: [byte, p3, sql, duckdb, reproducibility]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: duckdb
    resource: "https://duckdb.org/docs/stable/clients/python/overview"
    title: "Python API overview (DuckDB documentation)"
    author: "team:duckdb"
---

# Save a query so someone else can run it

!!! warning "Draft: not yet validated"
    The code on this page was run on 2026-11-15 with pandas 3.1.1 and DuckDB 2.0.0, the
    versions in MESA JupyterLab, and produced the output shown. It was not run inside
    MESA JupyterLab, and nobody has yet followed the steps there, so a menu or a screen
    may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A query typed into a notebook cell is easy to change and hard to hand over. In a file
of its own it has a name, it can be read without opening the notebook, and whoever
runs it runs the same text you did.

**You will:** have a file, `flagged_readings.sql`, beside your notebook, and a cell
that runs the query from that file.

**Time:** 5 to 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run.

## Steps

1. Write the query as text. Start it with comment lines, which begin with `--`, that
   say what it returns and which file it reads:

    ```python
    query = """-- Readings the sensor marked suspect, oldest first.
    -- Needs readings.csv in the folder this is run from.
    SELECT gauge_id, date, value
    FROM 'readings.csv'
    WHERE flag = 'S'
    ORDER BY date;
    """
    ```

    You should see: no output.

2. Save the text to a file beside the notebook:

    ```python
    from pathlib import Path

    saved = Path("flagged_readings.sql").write_text(query)
    ```

    You should see: no output, and `flagged_readings.sql` in the file browser.

3. Run the query from the file, not from the variable:

    ```python
    import duckdb

    duckdb.sql(Path("flagged_readings.sql").read_text())
    ```

    You should see: the two flagged readings.

    ```text
    ┌──────────┬────────────┬────────┐
    │ gauge_id │    date    │ value  │
    │ varchar  │    date    │ double │
    ├──────────┼────────────┼────────┤
    │ G05      │ 2026-07-09 │  180.0 │
    │ G03      │ 2026-07-18 │    0.0 │
    └──────────┴────────────┴────────┘
    ```

4. Double-click `flagged_readings.sql` in the file browser.

    You should see: the query in an editor tab, with your two comment lines at the
    top. This is what a colleague reads first.

5. From now on, change the query in the file, save it, and run the cell from step 3
   again. Delete the cells from steps 1 and 2 once the file exists, so that the
   notebook holds one copy of the query and not two.

    You should see: the cell from step 3 still giving the same two rows.

## Check it worked

The folder holds `flagged_readings.sql`, and the one cell that reads it returns two
rows. Someone with the folder can run that cell, or read the file, without asking you
what the query was.

## If it didn't

**`IO Error: No files found that match the pattern "readings.csv"`.** The query names
its data file without a folder, so it must be run from the folder that holds the
file. Open the notebook from `mesa-practice`, where `readings.csv` is, and run the cell
again.

## Next

- [Leave a notebook someone else can rerun](leave-a-rerunnable-notebook.md)
- [Query a Parquet file with DuckDB from a notebook](query-parquet-with-duckdb.md)
- Reference: the [Python API overview](https://duckdb.org/docs/stable/clients/python/overview)
  in the DuckDB documentation, and
  [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/) for what the app
  contains.

*Not yet validated in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15; the code was run that day outside MESA (pandas 3.1.1, DuckDB 2.0.0).*
