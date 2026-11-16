---
type: Guide
title: "Read the data dictionary before the data, in R"
description: "Use the practice data's dictionary to say what one row of the readings table is, then confirm in R which gauge reports in a different unit."
tags: [byte, p2, rstudio, r, data-dictionary]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/tapply.html"
    title: "Apply a Function Over a Ragged Array: tapply (R documentation)"
    author: "team:r-core"
---

# Read the data dictionary before the data, in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-16 (R 4.6.2),
    by the AI assistant that drafted it, and produced the output shown. No person has
    yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A *data dictionary* is the table that says what each column means. Five minutes with it
saves you from a number that looks right and is not.

**You will:** be able to say what one row of `readings.csv` is, and why its `value`
column cannot simply be added up across gauges.

**Time:** 5 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. Open the [data dictionary](practice-data.md#data-dictionary) for the practice data
   and read the four rows for `readings.csv`.

    You should see: that one row is one reading, from one gauge, for one day.

2. Read the meaning of `value` again, slowly.

    You should see: "in the gauge's own unit". The column does not promise one unit.

3. Find where the unit is recorded. Read the four rows for `gauges.csv`.

    You should see: a `unit` column, one value for each gauge.

4. In the **Console**, run:

    ```r
    gauges[c("gauge_id", "name", "unit")]
    ```

    You should see:

    ```text
      gauge_id        name unit
    1      G01   Boathouse   mm
    2      G02     Orchard   cm
    3      G03 Observatory   mm
    4      G04       Depot   mm
    5      G05      Quarry   mm
    ```

5. Compare the largest reading at each gauge:

    ```r
    tapply(readings$value, readings$gauge_id, max)
    ```

    You should see: G02's largest reading far below its neighbours'. The dictionary
    has already told you why: G02 reports in centimetres, the others in millimetres.

    ```text
       G01    G02    G03    G04    G05
     24.90   2.92  32.50  26.40 180.00
    ```

6. In a script or a notes file, write one sentence of your own that says what `value`
   holds and what must happen before values from different gauges are compared.

    You should see: your sentence where a reader of your result can find it.

## Check it worked

Without looking at this page, you can name the gauge that reports in a different unit
and the file that told you so.

## If it didn't

**`object 'gauges' not found`.** R has restarted since you loaded the files. Read them
again, as in [Load a file from your Data Store in RStudio](r-load-a-file.md), then
repeat the step.

## Next

- [Check a column's range and missing values in R](r-check-range-and-missing.md)
- [Bring two units onto one scale in R](r-convert-units-before-comparing.md), which
  does the conversion the dictionary calls for.
- The same task in Python: [Read the data dictionary before the data](read-the-data-dictionary.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run there that day (R 4.6.2).*
