---
type: Guide
title: "Join two tables and keep the unmatched rows visible"
description: "Join a table of gauges to a table of positions with DuckDB so that a gauge with no match stays in the result and is counted, instead of dropping out unseen."
tags: [byte, p3, join, duckdb, sql]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: duckdb
    resource: "https://duckdb.org/docs/stable/sql/query_syntax/from"
    title: "FROM and JOIN clauses (DuckDB documentation)"
    author: "team:duckdb"
---

# Join two tables and keep the unmatched rows visible

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-16 (pandas 3.1.1,
    DuckDB 2.0.0) by the site's output check, in a terminal there, and gave the values
    shown. No person has yet followed the steps, so a menu or a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

An ordinary join keeps only the rows that find a match. The rest leave without a
message, and every count after the join is quietly smaller. A left join keeps them
where you can see them.

**You will:** have a join in which a gauge with no position is still listed, and a
count of how many gauges matched.

**Time:** 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run.

## Steps

1. Make a table of positions that is incomplete on purpose: only the gauges west of
   one line of longitude.

    ```python
    import duckdb

    duckdb.sql("CREATE OR REPLACE VIEW west AS SELECT * FROM 'gauge_sites.csv' WHERE longitude < -104.73")
    duckdb.sql("SELECT count(*) AS n FROM west")
    ```

    You should see: four positions, for five gauges. In a notebook, DuckDB draws
    the result as a table, with each column's type under its name; the text below
    holds the same rows.

    ```text
    ┌───────┐
    │   n   │
    │ int64 │
    ├───────┤
    │     4 │
    └───────┘
    ```

2. Join the gauges to those positions in the ordinary way:

    ```python
    duckdb.sql("""
        SELECT g.gauge_id, g.name, w.longitude, w.latitude
        FROM 'gauges.csv' AS g
        JOIN west AS w ON g.gauge_id = w.gauge_id
        ORDER BY g.gauge_id
    """)
    ```

    You should see: four rows and no warning. One gauge has gone, and nothing says so.

    ```text
    ┌──────────┬───────────┬───────────┬──────────┐
    │ gauge_id │   name    │ longitude │ latitude │
    │ varchar  │  varchar  │  double   │  double  │
    ├──────────┼───────────┼───────────┼──────────┤
    │ G01      │ Boathouse │ -104.7612 │  47.1034 │
    │ G02      │ Orchard   │ -104.7391 │  47.1108 │
    │ G04      │ Depot     │ -104.7533 │  47.1175 │
    │ G05      │ Quarry    │ -104.7306 │  47.0962 │
    └──────────┴───────────┴───────────┴──────────┘
    ```

3. Change `JOIN` to `LEFT JOIN`, which keeps every row of the table named first:

    ```python
    duckdb.sql("""
        SELECT g.gauge_id, g.name, w.longitude, w.latitude
        FROM 'gauges.csv' AS g
        LEFT JOIN west AS w ON g.gauge_id = w.gauge_id
        ORDER BY g.gauge_id
    """)
    ```

    You should see: five rows. The gauge without a position is there, with `NULL`
    where its position would be.

    ```text
    ┌──────────┬─────────────┬───────────┬──────────┐
    │ gauge_id │    name     │ longitude │ latitude │
    │ varchar  │   varchar   │  double   │  double  │
    ├──────────┼─────────────┼───────────┼──────────┤
    │ G01      │ Boathouse   │ -104.7612 │  47.1034 │
    │ G02      │ Orchard     │ -104.7391 │  47.1108 │
    │ G03      │ Observatory │      NULL │     NULL │
    │ G04      │ Depot       │ -104.7533 │  47.1175 │
    │ G05      │ Quarry      │ -104.7306 │  47.0962 │
    └──────────┴─────────────┴───────────┴──────────┘
    ```

4. Count the matches, so the answer does not depend on reading every row.
   `count(w.gauge_id)` counts only the rows where a position was found:

    ```python
    duckdb.sql("""
        SELECT count(*) AS gauges,
               count(w.gauge_id) AS matched,
               count(*) - count(w.gauge_id) AS unmatched
        FROM 'gauges.csv' AS g
        LEFT JOIN west AS w ON g.gauge_id = w.gauge_id
    """)
    ```

    You should see:

    ```text
    ┌────────┬─────────┬───────────┐
    │ gauges │ matched │ unmatched │
    │ int64  │  int64  │   int64   │
    ├────────┼─────────┼───────────┤
    │      5 │       4 │         1 │
    └────────┴─────────┴───────────┘
    ```

5. Run the same count against the complete file, `'gauge_sites.csv'`, in place of
   `west`:

    ```python
    duckdb.sql("""
        SELECT count(*) AS gauges,
               count(s.gauge_id) AS matched,
               count(*) - count(s.gauge_id) AS unmatched
        FROM 'gauges.csv' AS g
        LEFT JOIN 'gauge_sites.csv' AS s ON g.gauge_id = s.gauge_id
    """)
    ```

    You should see: every gauge matched.

    ```text
    ┌────────┬─────────┬───────────┐
    │ gauges │ matched │ unmatched │
    │ int64  │  int64  │   int64   │
    ├────────┼─────────┼───────────┤
    │      5 │       5 │         0 │
    └────────┴─────────┴───────────┘
    ```

## Check it worked

In each count, `matched` plus `unmatched` equals `gauges`. You can say which gauge had
no position in step 3, and that the complete file leaves none out.

## If it didn't

**`Catalog Error: Table with name west does not exist!`** The kernel has restarted
since step 1, and the view went with it. Run step 1 again, then repeat the step.

## Next

- [Reconcile row counts before and after a join](reconcile-a-join.md), the same care
  in pandas.
- [Bring two units onto one scale before comparing](convert-units-before-comparing.md)
- Reference: [FROM and JOIN clauses](https://duckdb.org/docs/stable/sql/query_syntax/from)
  in the DuckDB documentation, and
  [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/) for what the app
  contains.

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15; the code was run there on 2026-11-16 (pandas 3.1.1, DuckDB 2.0.0).*
