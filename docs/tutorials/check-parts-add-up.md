---
type: Guide
title: "Check that the parts add up to the whole"
description: "After splitting a table into groups, add the groups back up and compare with the whole table, so that rows dropped without warning are noticed."
tags: [byte, p4, verification, groupby, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/user_guide/groupby.html"
    title: "Group by: split-apply-combine (pandas user guide)"
    author: "team:pandas-dev"
---

# Check that the parts add up to the whole

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-17, by the AI
    assistant that drafted it, and produced the output shown. No person has yet followed
    the steps, so a menu or a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Splitting a table into groups should lose nothing: the groups, added up, should give
the table back. When they do not, rows have gone missing without an error message.

**You will:** have caught 150 rows that a grouping dropped without warning, and
confirmed a split that loses none.

**Time:** 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings`
and `gauges` exist.

## Steps

1. State the whole before you split it:

    ```python
    len(readings)
    ```

    You should see: `152`.

2. Split the rows by flag and count each group:

    ```python
    parts = readings.groupby("flag").size()
    parts
    ```

    You should see: one group. Nothing warns you that anything is missing.

    ```text
    flag
    S    2
    dtype: int64
    ```

3. Add the parts up and put the total beside the whole:

    ```python
    int(parts.sum()), len(readings)
    ```

    You should see: `(2, 152)`. The parts are 150 rows short.

4. The missing rows are the ones with a blank flag: a grouping leaves out blank keys
   unless told otherwise. Tell it otherwise:

    ```python
    parts = readings.groupby("flag", dropna=False).size()
    parts
    ```

    You should see:

    ```text
    flag
    S        2
    NaN    150
    dtype: int64
    ```

5. Check again:

    ```python
    int(parts.sum()) == len(readings)
    ```

    You should see: `True`.

6. The same check works for a sum. Split the rainfall by gauge, and compare the
   groups' total with the column's:

    ```python
    by_gauge = readings.groupby("gauge_id")["value"].sum()
    round(float(by_gauge.sum()), 2), round(float(readings["value"].sum()), 2)
    ```

    You should see: `(1075.43, 1075.43)`. No row has a blank `gauge_id`, so this
    split loses nothing.

## Check it worked

You have two comparisons in your notebook where the parts equal the whole: 152 rows
by flag, and 1075.43 by gauge. You can say which rows the first split dropped and why.

## If it didn't

**Step 3 shows `(152, 152)`.** `parts` was already made with `dropna=False`. That is
the corrected version; run step 2 again to see the short one.

**The two numbers in step 6 differ in the last decimal place.** Sums of decimal
numbers can differ by a tiny amount depending on the order of adding. Rounding both,
as the step does, removes that.

## Next

- [Tally a quality flag before you trust a number](tally-a-quality-flag.md), which
  counts the blanks directly.
- [Check a result a second way](check-a-result-two-ways.md)
- Reference: [Group by: split-apply-combine](https://pandas.pydata.org/docs/user_guide/groupby.html)
  in the pandas user guide.

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (pandas 3.1.1, DuckDB 2.0.0).*
