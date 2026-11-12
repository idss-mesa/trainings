---
type: Guide
title: "Tally a quality flag before you trust a number"
description: "Count how many rows carry each value of a quality flag, including the blanks, and look at the flagged rows before deciding what to do with them."
tags: [byte, p2, data-quality, quality-flag, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/reference/api/pandas.Series.value_counts.html"
    title: "pandas.Series.value_counts"
    author: "team:pandas-dev"
---

# Tally a quality flag before you trust a number

!!! warning "Draft: not yet validated"
    The code on this page was run with pandas 3.1 on a laptop. Nobody has yet followed
    the tutorial in MESA JupyterLab, so output may be laid out differently there.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Many datasets carry a column in which the instrument or the provider marks readings
it doubts. A total computed without looking at that column includes those readings.

**You will:** know how many readings are flagged, which ones, and at which gauges.

**Time:** 5 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings`
and `gauges` exist.

## Steps

1. Read what the flag means in the
   [data dictionary](practice-data.md#data-dictionary).

    You should see: blank, or `S` for a reading the sensor marked suspect.

2. Count the rows for each flag value, blanks included:

    ```python
    readings["flag"].value_counts(dropna=False)
    ```

    You should see:

    ```text
    flag
    NaN    150
    S        2
    Name: count, dtype: int64
    ```

3. Check that nothing is left over: 150 + 2 = 152, the number of rows in the table.

    You should see: the counts add up, and no flag value that the dictionary does not
    list.

4. Look at the flagged rows:

    ```python
    readings[readings["flag"] == "S"]
    ```

    You should see:

    ```text
        gauge_id        date  value flag
    76       G03  2026-07-18    0.0    S
    129      G05  2026-07-09  180.0    S
    ```

5. Count flags by gauge:

    ```python
    pd.crosstab(readings["gauge_id"], readings["flag"].fillna("blank"))
    ```

    You should see:

    ```text
    flag      S  blank
    gauge_id
    G01       0     27
    G02       0     31
    G03       1     31
    G04       0     31
    G05       1     30
    ```

6. In a Markdown cell, write down what you will do with flagged readings and why:
   keep them, leave them out, or report the result both ways.

    You should see: your decision recorded in the notebook, where a reader of your
    result can find it.

## Check it worked

You can say how many readings are flagged (2), where they are, and what your analysis
does with them. The tally does not make that decision for you. A flag marks a doubt,
not an error: one of these readings is far outside its gauge's range, the other is an
ordinary dry day.

## If it didn't

**The tally shows only `S    2`.** `dropna=False` is missing, so the blanks were left
out and you cannot check the counts against the row total. Add it and run the cell
again.

## Next

- [Count records per day to find incomplete days](count-records-per-day.md)
- Reference: [pandas.Series.value_counts](https://pandas.pydata.org/docs/reference/api/pandas.Series.value_counts.html)
  and [pandas.crosstab](https://pandas.pydata.org/docs/reference/api/pandas.crosstab.html).

*Not yet validated in MESA JupyterLab. Drafted 2026-11-12; the code was run with pandas 3.1 on the practice data.*
