---
type: Guide
title: "Plot a column to spot odd values"
description: "Draw one box per gauge for a column of readings, so that a value far from the rest, or a gauge on a different scale, shows up at a glance."
tags: [byte, p4, exploration, plotting, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pandas
    resource: "https://pandas.pydata.org/docs/user_guide/visualization.html"
    title: "Chart visualization (pandas user guide)"
    author: "team:pandas-dev"
---

# Plot a column to spot odd values

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-17, by the AI
    assistant that drafted it, and produced the output shown. No person has yet followed
    the steps, so a menu or a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A table of 152 numbers hides what a picture shows in a second. This check suits any
column of measurements, whoever or whatever produced it.

**You will:** have found one reading and one gauge in `readings` that do not sit with
the rest, from a chart.

**Time:** 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run so that `readings`
and `gauges` exist.

## Steps

1. Draw one box per gauge:

    ```python
    readings.boxplot(column="value", by="gauge_id")
    ```

    You should see: a chart titled **Boxplot grouped by gauge_id**, with five boxes
    squashed below 35 and a single circle near 180 above **G05**. A line of text
    beginning `<Axes:` may appear above the chart; ignore it.

2. Find the row behind the circle:

    ```python
    readings[readings["value"] > 100]
    ```

    You should see:

    ```text
        gauge_id        date  value flag
    129      G05  2026-07-09  180.0    S
    ```

3. One extreme value sets the scale for everything else. Draw the chart again without
   it, to look at the rest:

    ```python
    readings[readings["value"] < 100].boxplot(column="value", by="gauge_id")
    ```

    You should see: the axis now ends near 35. Four gauges reach 25 to 33. The box for
    **G02** stays under 3.

4. A gauge ten times lower than its neighbours is either in a much drier place or on
   a different scale. Look at the gauge table:

    ```python
    gauges
    ```

    You should see: `cm` in the `unit` column for G02, and `mm` for the others.

    ```text
      gauge_id         name unit  elevation_m
    0      G01    Boathouse   mm          512
    1      G02      Orchard   cm          540
    2      G03  Observatory   mm          688
    3      G04        Depot   mm          521
    4      G05       Quarry   mm          603
    ```

5. In a Markdown cell, write down the two things the chart showed and what you would
   do about each before computing with `value`.

    You should see: a note such as "G05 has one reading of 180 on 2026-07-09, flagged
    S. G02 is recorded in cm, the others in mm."

## Check it worked

You can name the date of the odd reading and the gauge on a different scale, and you
found both from the chart before you looked at any row.

## If it didn't

**Only the `<Axes:` line appears, and no chart.** Run `%matplotlib inline` in a cell of
its own, then run step 1 again.

**The second chart looks like the first.** The filter was left out. Check that the
line begins `readings[readings["value"] < 100]`.

## Next

- [Tally a quality flag before you trust a number](tally-a-quality-flag.md), for what
  the `S` on that row means.
- [Bring two units onto one scale before comparing](convert-units-before-comparing.md), to put G02
  on the same scale as the others.
- Reference: [Chart visualization](https://pandas.pydata.org/docs/user_guide/visualization.html)
  in the pandas user guide.

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (pandas 3.1.1, DuckDB 2.0.0).*
