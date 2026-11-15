---
type: Guide
title: "Trace card 1: the wettest gauge in July"
description: "A short constructed run of an AI agent answering \"Which gauge was wettest in July?\" on the practice data, for you to judge before you open the answer."
tags: [trace-card, ai-agents, verification, practice-data]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: practice-data
    resource: "https://idss-mesa.github.io/trainings/tutorials/practice-data/"
    title: "Practice data: five invented rain gauges"
    author: "team:idss-mesa"
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
---

# Trace card 1: the wettest gauge in July

!!! note "Constructed example"
    This run was written by hand, to practise on. No agent and no model produced it.
    The code in it was run on the practice data and gives the output shown.
    [How to use the trace cards](how-to-use.md) explains the format.

**Card 1.** **Data:** `readings.csv` and `gauges.csv`, from the [practice data](../tutorials/practice-data.md).
**Time:** 5 to 8 minutes.

## The question put to the agent

> Which gauge was wettest in July?

## The run

Each numbered item is one line of the run: what the agent said, what it ran, or what
it answered.

1. **The agent says:** "I will read both files, check which unit each gauge reports in,
   leave out anything repeated or flagged, and add up the rest for each gauge."

2. **The agent runs:**

    ```python
    import pandas as pd

    readings = pd.read_csv("readings.csv")
    gauges = pd.read_csv("gauges.csv")
    gauges[["gauge_id", "unit"]]
    ```

    **It gets back:**

    ```text
      gauge_id unit
    0      G01   mm
    1      G02   cm
    2      G03   mm
    3      G04   mm
    4      G05   mm
    ```

3. **The agent says:** "G02 reports in centimetres. I will convert it to millimetres
   before I add anything up."

4. **The agent runs:**

    ```python
    clean = readings.drop_duplicates()
    clean = clean[clean["flag"] != "S"]
    (len(readings), len(clean))
    ```

    **It gets back:**

    ```text
    (152, 149)
    ```

5. **The agent says:** "Three rows are left out: one exact repeat and two readings
   flagged `S`."

6. **The agent runs:**

    ```python
    clean = clean.merge(gauges[["gauge_id", "unit"]], on="gauge_id")
    clean["mm"] = clean["value"] * clean["unit"].map({"mm": 1, "cm": 10})
    clean.groupby("gauge_id")["mm"].sum().round(1)
    ```

    **It gets back:**

    ```text
    gauge_id
    G01    190.3
    G02    218.3
    G03    251.1
    G04    198.8
    G05    210.9
    Name: mm, dtype: float64
    ```

7. **The agent answers:** "Observatory (G03) was the wettest gauge in July, with
   251.1 mm. I converted G02 from centimetres to millimetres, and left out one
   repeated row and two readings the sensor flagged as suspect."

## Your task

Decide before you open the answer.

1. Is the answer supported by the run?
2. If it is not, at which line does it go wrong?
3. What one query would confirm the answer or refute it?

## Run the check

Run your query from question 3 on the practice data, in the notebook from
[Load a file from your Data Store into a notebook](../tutorials/load-a-file.md), and
compare what you get with what the agent reported.

## Answer

??? success "Open the answer"
    **Verdict: supported.** Not every card hides a flaw.

    **Why.** Each thing the answer states came back from a call. The units are at
    line 2, the three rows left out are at line 4, and the totals are at line 6. The
    answer also says what was done to the data, so a reader can disagree with a choice.

    **A query that confirms it,** written another way, in SQL:

    ```python
    import duckdb

    duckdb.sql("""
        SELECT r.gauge_id,
               round(sum(r.value * CASE g.unit WHEN 'cm' THEN 10 ELSE 1 END), 1) AS mm
        FROM (SELECT DISTINCT * FROM 'readings.csv') AS r
        JOIN 'gauges.csv' AS g ON r.gauge_id = g.gauge_id
        WHERE r.flag IS DISTINCT FROM 'S'
        GROUP BY r.gauge_id
        ORDER BY mm DESC
    """)
    ```

    ```text
    ┌──────────┬────────┐
    │ gauge_id │   mm   │
    │ varchar  │ double │
    ├──────────┼────────┤
    │ G03      │  251.1 │
    │ G02      │  218.3 │
    │ G05      │  210.9 │
    │ G04      │  198.8 │
    │ G01      │  190.3 │
    └──────────┴────────┘
    ```

    **What the run did not look at.** Whether every gauge has a row for every day. G01
    has none for 22 to 25 July. The largest reading at any other gauge on those days is:

    ```python
    float(readings[readings["date"].between("2026-07-22", "2026-07-25")]["value"].max())
    ```

    ```text
    0.0
    ```

    Those days were dry everywhere, so the gap changes nothing here. A careful answer
    would still have said that it checked.


## Next

- [Trace card 2: G01's missing days](card-2-missing-days.md)
- The checks this run made, one at a time: [Bring two units onto one scale before comparing](../tutorials/convert-units-before-comparing.md) and [Find and remove a repeated row](../tutorials/remove-a-repeated-row.md).

*Constructed example, drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. The code was run that day outside MESA (pandas 3.1.1, DuckDB 2.0.0). No person has yet checked this card.*
