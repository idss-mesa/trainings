---
type: Guide
title: "Look inside a CSV file from the portal"
description: "Open a CSV file in the MESA Portal's Data Viewer and read its columns, row count, and value ranges, then run one SQL query, without launching an app."
tags: [byte, p1, portal, data-browser, csv, duckdb]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
  - id: duckdb-summarize
    resource: "https://duckdb.org/docs/stable/guides/meta/summarize"
    title: "DuckDB: SUMMARIZE"
    author: "team:duckdb"
---

# Look inside a CSV file from the portal

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them. The browser used for the test blocks new tabs, so the viewer was
    opened at its address, not with the **View** button.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** know a table's columns, how many rows it has, and the range of each
column, before you launch anything.

**Time:** 5–10 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md),
and `readings.csv` in a `mesa-practice` folder in your Data Store.
[Download it with MESA Cloud Shell](cloud-shell-download.md) if you have not.

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**, then `mesa-practice`.
   On the `readings.csv` card, click **View**.

    You should see: a new tab named `readings.csv - Data Viewer`, with an **SQL
    Query** box and, under it, the first rows of the table.

2. Click **Schema**.

    You should see: one row for each column, with its type.

    ```text
    gauge_id   VARCHAR
    date       DATE
    value      DOUBLE
    flag       VARCHAR
    ```

3. Click **Count**.

    You should see: `total_rows` and, under it, `152`.

4. Click **Stats**.

    You should see: one row for each column again, now with its smallest and largest
    value. `date` runs from `2026-07-01` to `2026-07-31`, and `value` from `0.0` to
    `180.0`.

5. Each button wrote a query into the **SQL Query** box. Replace it with this one,
   then click **Run**:

    ```sql
    SELECT flag, count(*) AS n FROM read_csv('source.csv', auto_detect=true) GROUP BY flag;
    ```

    You should see: two rows.

    ```text
    flag   n
    NULL   150
    S      2
    ```

## Check it worked

The two counts in step 5 add up to the row count in step 3: 150 + 2 = 152. Two
readings carry the flag `S`, and the rest have none.

## If it didn't

**The dates are long numbers.** **Preview**, and the table the viewer opens with, show
a date as a number such as `1782864000000`. **Stats** shows the same column as dates.
The file is not damaged.

**Run gives an error.** Check the quotes and the spelling. `'source.csv'` is the
viewer's name for the CSV file you opened, whatever the file is called. Clicking
**Preview** puts a working query back.

**There is no View button.** The Data Viewer opens CSV, TSV, Parquet, and DuckDB
files. For other tables, [load the file into a notebook](load-a-file.md).

## Next

- A largest value of 180 is worth a second look:
  [Check a column's range and missing values](check-range-and-missing.md).
- [Tally a quality flag before you trust a number](tally-a-quality-flag.md) does step
  5 in a notebook, where you can keep the result.
- Reference: [Managing data, "View files in the browser"](https://idss-mesa.github.io/docs/portal/data/#view-files-in-the-browser).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
