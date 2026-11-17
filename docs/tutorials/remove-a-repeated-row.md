---
type: Guide
title: "Find and remove a repeated row"
description: "Find rows that are written twice in a table, decide from what they contain whether one of them can go, remove it, and record what you removed."
tags: [byte, p3, duplicates, data-quality, pandas]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html"
    title: "pandas.DataFrame.drop_duplicates"
    author: "team:pandas-dev"
---

# Find and remove a repeated row

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-16 (pandas 3.1.1,
    DuckDB 2.0.0) by the site's output check, in a terminal there, and gave the values
    shown. No person has yet followed the steps, so a menu or a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A row written twice adds its value to every total twice. Removing it is easy. The
part that needs thought is deciding that the two rows really are one reading.

**You will:** have a table with the repeated row removed, and a note of what you
removed and why.

**Time:** 5 to 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings` exists.

## Steps

1. Show every row that has an exact copy, keeping both copies in view:

    ```python
    readings[readings.duplicated(keep=False)]
    ```

    You should see: one pair.

    ```text
       gauge_id        date  value flag
    62      G03  2026-07-05   22.5  NaN
    63      G03  2026-07-05   22.5  NaN
    ```

2. Decide what to keep. Read the pair: the gauge, the day, the value, and the flag are
   all the same, and the [data dictionary](practice-data.md#data-dictionary) says one
   row is one reading from one gauge for one day.

    You should see: no difference between the two rows. They carry the same
    information, so one can go and nothing is lost.

3. Remove the copy, into a new table:

    ```python
    deduped = readings.drop_duplicates()
    len(readings) - len(deduped)
    ```

    You should see: `1`, the number of rows removed. `readings` itself is unchanged,
    so the earlier cells of your notebook still give what they gave.

4. Check for the harder case, two rows for the same gauge and day that *disagree*:

    ```python
    int(deduped.duplicated(subset=["gauge_id", "date"]).sum())
    ```

    You should see: `0`. Anything above zero would be two different readings for one
    day. `drop_duplicates()` leaves those alone, and so should you until you know which
    is right.

5. See what the copy was doing to that gauge's total:

    ```python
    before = readings.loc[readings["gauge_id"] == "G03", "value"].sum()
    after = deduped.loc[deduped["gauge_id"] == "G03", "value"].sum()
    (float(before.round(1)), float(after.round(1)))
    ```

    You should see: the total fall by the value of the repeated row.

    ```text
    (273.6, 251.1)
    ```

6. In a Markdown cell, record what you removed: the gauge, the day, the value, and that
   the two rows were identical.

    You should see: your note in the notebook, so that a reader can tell the row was
    removed on purpose.

## Check it worked

Run step 1 on the new table, `deduped[deduped.duplicated(keep=False)]`. It returns no
rows, and your note says which row went.

## If it didn't

**Step 1 returns no rows.** The table was already cleaned earlier in the notebook, or
`readings` was replaced by another table. Run the notebook's first cell again to
reload the file, then repeat the step.

## Next

- [Count records per day to find incomplete days](count-records-per-day.md), which
  finds the same row another way, and the days with no row at all.
- [Bring two units onto one scale before comparing](convert-units-before-comparing.md)
- Reference: [pandas.DataFrame.drop_duplicates](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html),
  and [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/) for what the
  app contains.

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15; the code was run there on 2026-11-16 (pandas 3.1.1, DuckDB 2.0.0).*
