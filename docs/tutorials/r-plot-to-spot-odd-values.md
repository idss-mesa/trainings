---
type: Guide
title: "Plot a column to spot odd values in R"
description: "Draw one box per gauge for a column of readings in R, so that a value far from the rest, or a gauge on a different scale, shows up at a glance."
tags: [byte, p4, rstudio, r, exploration, plotting]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/graphics/html/boxplot.html"
    title: "Box Plots: boxplot (R documentation)"
    author: "team:r-core"
---

# Plot a column to spot odd values in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-17 (R
    4.6.2), by the AI assistant that drafted it, and produced the output shown. No
    person has yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A table of 152 numbers hides what a picture shows in a second. This check suits any
column of measurements, whoever or whatever produced it.

**You will:** have found one reading and one gauge in `readings` that do not sit with
the rest, from a chart.

**Time:** 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. In the **Console**, draw one box per gauge:

    ```r
    boxplot(value ~ gauge_id, data = readings)
    ```

    You should see: a chart in the **Plots** pane, with five boxes squashed below 35
    and a single circle near 180 above **G05**.

2. Find the row behind the circle:

    ```r
    readings[readings$value > 100, ]
    ```

    You should see:

    ```text
        gauge_id       date value flag
    130      G05 2026-07-09   180    S
    ```

3. One extreme value sets the scale for everything else. Draw the chart again without
   it, to look at the rest:

    ```r
    boxplot(value ~ gauge_id, data = readings[readings$value < 100, ])
    ```

    You should see: the axis now ends near 35. Four gauges reach 25 to 33. The box for
    **G02** stays under 3.

4. A gauge ten times lower than its neighbours is either in a much drier place or on
   a different scale. Look at the gauge table:

    ```r
    gauges
    ```

    You should see: `cm` in the `unit` column for G02, and `mm` for the others.

    ```text
      gauge_id        name unit elevation_m
    1      G01   Boathouse   mm         512
    2      G02     Orchard   cm         540
    3      G03 Observatory   mm         688
    4      G04       Depot   mm         521
    5      G05      Quarry   mm         603
    ```

5. Write down, as comments in your script or in a notes file, the two things the
   chart showed and what you would do about each before computing with `value`.

    You should see: a note such as "G05 has one reading of 180 on 2026-07-09, flagged
    S. G02 is recorded in cm, the others in mm."

## Check it worked

You can name the date of the odd reading and the gauge on a different scale, and you
found both from the chart before you looked at any row.

## If it didn't

**No chart appears.** The **Plots** pane may be hidden behind **Files** or **Help** at
the bottom right. Click the **Plots** tab.

**The second chart looks like the first.** The filter was left out. Check that the
line ends `data = readings[readings$value < 100, ])`.

## Next

- [Tally a quality flag in R](r-tally-a-quality-flag.md),
  for what the `S` on that row means.
- [Bring two units onto one scale in R](r-convert-units-before-comparing.md),
  to put G02 on the same scale as the others.
- Reference: [boxplot](https://stat.ethz.ch/R-manual/R-devel/library/graphics/html/boxplot.html) in the R documentation.

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17; the code was run there that day (R 4.6.2).*
