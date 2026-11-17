---
type: Guide
title: "Check a result a second way"
description: "Compute the same count in pandas and in DuckDB, find out why the two disagree, and keep the result only once both routes give the same answer."
tags: [byte, p4, verification, duckdb, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: duckdb-nulls
    resource: "https://duckdb.org/docs/stable/sql/data_types/nulls"
    title: "NULL values (DuckDB documentation)"
    author: "org:duckdb"
---

# Check a result a second way

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-17, by the AI
    assistant that drafted it, and produced the output shown. No person has yet followed
    the steps, so a menu or a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

If two different routes give the same answer, a mistake would have to be made twice,
in the same way, to go unnoticed. If they disagree, you have found something before
your reader does. This works for a result of your own, a colleague's, or an AI
assistant's.

**You will:** have counted the readings not flagged as suspect in two ways, explained
why the counts first differ, and made them agree.

**Time:** 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings`
and `gauges` exist.

## Steps

1. Count the readings whose flag is not `S`, in pandas:

    ```python
    kept = readings[readings["flag"] != "S"]
    len(kept)
    ```

    You should see: `150`.

2. Count them again with a SQL query. DuckDB can query the `readings` table in your
   notebook by name:

    ```python
    import duckdb
    duckdb.sql("SELECT count(*) AS n FROM readings WHERE flag <> 'S'")
    ```

    You should see: `0`, not `150`. The two routes disagree, so at least one of them
    is not doing what you meant. In a notebook, DuckDB draws each result as a table;
    the text below holds the same rows.

    ```text
    ┌───────┐
    │   n   │
    │ int64 │
    ├───────┤
    │     0 │
    └───────┘
    ```

3. Look at what the column holds:

    ```python
    duckdb.sql("SELECT flag, count(*) AS n FROM readings GROUP BY flag ORDER BY flag")
    ```

    You should see: two rows flagged `S`, and 150 with no flag at all, which SQL calls
    `NULL`.

    ```text
    ┌─────────┬───────┐
    │  flag   │   n   │
    │ varchar │ int64 │
    ├─────────┼───────┤
    │ S       │     2 │
    │ NULL    │   150 │
    └─────────┴───────┘
    ```

    In SQL, comparing `NULL` with anything is neither true nor false, so `WHERE`
    drops those rows. pandas treats a blank as "not equal to S" and keeps them.

4. Say what you mean in SQL: keep every row whose flag is anything other than `S`,
   blanks included.

    ```python
    duckdb.sql("SELECT count(*) AS n FROM readings WHERE flag IS DISTINCT FROM 'S'")
    ```

    You should see: `150`, the same as step 1.

    ```text
    ┌───────┐
    │   n   │
    │ int64 │
    ├───────┤
    │   150 │
    └───────┘
    ```

5. With the counts in agreement, compare a result built on them:

    ```python
    duckdb.sql("""
        SELECT gauge_id, round(sum(value), 2) AS total
        FROM readings
        WHERE flag IS DISTINCT FROM 'S'
        GROUP BY gauge_id ORDER BY gauge_id
    """)
    ```

    You should see: the totals that `kept.groupby("gauge_id")["value"].sum()` gives
    in pandas.

    ```text
    ┌──────────┬────────┐
    │ gauge_id │ total  │
    │ varchar  │ double │
    ├──────────┼────────┤
    │ G01      │  190.3 │
    │ G02      │  21.83 │
    │ G03      │  273.6 │
    │ G04      │  198.8 │
    │ G05      │  210.9 │
    └──────────┴────────┘
    ```

## Check it worked

Both routes count 150 readings and give 210.9 for G05, and you can say why the first
SQL query counted none.

## If it didn't

**Step 2 says the table `readings` does not exist.** The first cell of the notebook
has not been run in this session. Run it, then try again.

**The two routes agree but you doubt both.** Agreement shows the two were computed the
same way, not that the data is sound. These totals still mix units.

## Next

- [Check that the parts add up to the whole](check-parts-add-up.md), a check that
  needs no second tool.
- [Check an AI-suggested result against the data](check-a-suggested-result.md)
- Reference: [NULL values](https://duckdb.org/docs/stable/sql/data_types/nulls) in the
  DuckDB documentation.

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (pandas 3.1.1, DuckDB 2.0.0).*
