---
type: Guide
title: "Check an AI-suggested result against the data"
description: "Test a result that an AI assistant, or anyone else, hands you: reproduce the number, find what it rests on, and say whether the claim survives."
tags: [byte, p4, verification, ai-agents, pandas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
---

# Check an AI-suggested result against the data

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA JupyterLab on 2026-11-13 and produced the
    output shown. Nobody has yet followed the steps there by hand, so a menu or a screen
    may differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

An AI assistant answers fluently whether or not the answer is sound, and so does a
hurried colleague. The check is the same for both, and it takes a few minutes.

Suppose you asked an assistant about the practice data and it replied:

> Quarry (G05) was the wettest gauge in July, with 390.9 mm of rain.

**You will:** have decided, from the data, whether that claim stands.

**Time:** 10 minutes. **You need:** the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md), with its first cell run.
You do not need an AI assistant for this tutorial.

## Steps

1. In a Markdown cell, write the claim down and what would make it wrong: a different
   total, or a total that depends on readings you would not trust.

    You should see: the claim in your notebook, where the check will sit beside it.

2. Reproduce the number:

    ```python
    readings.groupby("gauge_id")["value"].sum()
    ```

    You should see: 390.9 for G05. The assistant did not invent the figure.

    ```text
    gauge_id
    G01    190.30
    G02     21.83
    G03    273.60
    G04    198.80
    G05    390.90
    Name: value, dtype: float64
    ```

3. A number you can reproduce is not yet a number you can believe. Look at what it is
   made of:

    ```python
    readings[readings["gauge_id"] == "G05"].nlargest(3, "value")
    ```

    You should see: one reading far larger than the rest, and flagged.

    ```text
        gauge_id        date  value flag
    129      G05  2026-07-09  180.0    S
    130      G05  2026-07-10   27.5  NaN
    123      G05  2026-07-03   27.1  NaN
    ```

4. Recompute without the readings the sensor marked suspect:

    ```python
    kept = readings[readings["flag"] != "S"]
    kept.groupby("gauge_id")["value"].sum()
    ```

    You should see: G05 fall to 210.9, below G03.

    ```text
    gauge_id
    G01    190.30
    G02     21.83
    G03    273.60
    G04    198.80
    G05    210.90
    Name: value, dtype: float64
    ```

5. Under the claim, write your verdict in one or two sentences: what you reproduced,
   what it depended on, and what you conclude.

    You should see: something like "The 390.9 mm is the plain sum, but 180 mm of it is
    one reading flagged as suspect. Without it Quarry is not the wettest gauge."

## Check it worked

Your notebook holds the claim, the code that tests it, and a verdict a reader can
check. You have not shown which gauge *was* wettest: these totals still mix units and
include a repeated row and a gauge with missing days.

## If it didn't

**Step 4 changes nothing.** The flag was compared with the wrong text, for example
`"s"` or `"S "`. Run `readings["flag"].value_counts(dropna=False)` to see the exact
values, and compare against one of those.

## Next

- The other checks a fair comparison needs:
  [Read the data dictionary before the data](read-the-data-dictionary.md) for units and
  [Count records per day to find incomplete days](count-records-per-day.md) for repeats
  and gaps.
- To ask an assistant yourself:
  [Sign in and start an AI agent in a MESA app](start-an-ai-agent.md).

*Not yet validated by a person in MESA JupyterLab. Drafted 2026-11-13; the code was run there on 2026-11-13 (pandas 3.1.1, DuckDB 2.0.0).*
