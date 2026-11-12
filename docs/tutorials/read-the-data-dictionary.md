---
type: Guide
title: "Read the data dictionary before the data"
description: "Use a dataset's data dictionary to find out what each column means and which column you cannot yet add up, before you compute anything."
tags: [byte, p2, data-dictionary, units, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/user_guide/indexing.html"
    title: "Indexing and selecting data (pandas user guide)"
    author: "team:pandas-dev"
---

# Read the data dictionary before the data

!!! warning "Draft: not yet validated"
    The code on this page was run with pandas 3.1 on a laptop. Nobody has yet followed
    the tutorial in MESA JupyterLab, so output may be laid out differently there.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A *data dictionary* is the table that says what each column means. Five minutes with it
saves you from a number that looks right and is not.

**You will:** be able to say what one row of `readings.csv` is, and why its `value`
column cannot simply be added up across gauges.

**Time:** 5 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings`
and `gauges` exist.

## Steps

1. Open the [data dictionary](practice-data.md#data-dictionary) for the practice data
   and read the four rows for `readings.csv`.

    You should see: that one row is one reading, from one gauge, for one day.

2. Read the meaning of `value` again, slowly.

    You should see: "in the gauge's own unit". The column does not promise one unit.

3. Find where the unit is recorded. Read the four rows for `gauges.csv`.

    You should see: a `unit` column, one value for each gauge.

4. In your notebook, run:

    ```python
    gauges[["gauge_id", "name", "unit"]]
    ```

    You should see:

    ```text
      gauge_id         name unit
    0      G01    Boathouse   mm
    1      G02      Orchard   cm
    2      G03  Observatory   mm
    3      G04        Depot   mm
    4      G05       Quarry   mm
    ```

5. Compare the largest reading at each gauge:

    ```python
    readings.groupby("gauge_id")["value"].max()
    ```

    You should see: G02's largest reading far below its neighbours'. The dictionary
    has already told you why: G02 reports in centimetres, the others in millimetres.

6. In a Markdown cell (**Esc**, then **M**), write one sentence of your own that says
   what `value` holds and what must happen before values from different gauges are
   compared.

    You should see: your sentence, rendered, after you press ++shift+enter++.

## Check it worked

Without looking at this page, you can name the gauge that reports in a different unit
and the file that told you so.

## If it didn't

**`NameError: name 'gauges' is not defined`.** The kernel has restarted since you
loaded the files. Run the notebook's first cell again, then repeat the step.

## Next

- [Check a column's range and missing values](check-range-and-missing.md)
- Reference: the [practice data](practice-data.md) page, which holds the dictionary.

*Not yet validated in MESA JupyterLab. Drafted 2026-11-12; the code was run with pandas 3.1 on the practice data.*
