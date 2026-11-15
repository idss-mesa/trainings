---
type: Guide
title: "Trace card 7: G03's July total"
description: "A short constructed run of an AI agent answering \"What is G03's July total?\" on the practice data, for you to judge before you open the answer."
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

# Trace card 7: G03's July total

!!! note "Constructed example"
    This run was written by hand, to practise on. No agent and no model produced it.
    The code in it was run on the practice data and gives the output shown.
    [How to use the trace cards](how-to-use.md) explains the format.

**Card 7.** **Data:** `readings.csv` and `gauges.csv`, from the [practice data](../tutorials/practice-data.md).
**Time:** 5 to 8 minutes.

## The question put to the agent

> What is G03's July total?

## The run

Each numbered item is one line of the run: what the agent said, what it ran, or what
it answered.

1. **The agent says:** "I will check G03's unit and its flagged readings, then add up
   its values."

2. **The agent runs:**

    ```python
    import pandas as pd

    readings = pd.read_csv("readings.csv")
    gauges = pd.read_csv("gauges.csv")
    gauges[gauges["gauge_id"] == "G03"]
    ```

    **It gets back:**

    ```text
      gauge_id         name unit  elevation_m
    2      G03  Observatory   mm          688
    ```

3. **The agent runs:**

    ```python
    g03 = readings[readings["gauge_id"] == "G03"]
    g03["flag"].value_counts(dropna=False)
    ```

    **It gets back:**

    ```text
    flag
    NaN    31
    S       1
    Name: count, dtype: int64
    ```

4. **The agent runs:**

    ```python
    g03[g03["flag"] == "S"]
    ```

    **It gets back:**

    ```text
       gauge_id        date  value flag
    76      G03  2026-07-18    0.0    S
    ```

5. **The agent says:** "The one flagged reading is 0.0, so the total is the same
   whether I keep it or not."

6. **The agent runs:**

    ```python
    float(g03["value"].sum().round(1))
    ```

    **It gets back:**

    ```text
    273.6
    ```

7. **The agent answers:** "Observatory (G03) recorded 273.6 mm in July. It reports in
   millimetres, and its one flagged reading is 0.0, so it does not change the total."

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
    **Verdict: not supported.**

    **Where it goes wrong.** No line is wrong. Everything the agent checked, it checked
    correctly: the unit at line 2, the flag at lines 3 to 5. It stopped one check short
    and answered at line 7. The clue it passed over is at line 3: 31 rows and 1 row
    make 32, and July has 31 days.

    **Kind of failure: stopped early.** A run that makes two careful checks reads as
    thorough. Ask what it did not look at.

    **A query that refutes it:** count G03's rows and its different days.

    ```python
    (len(g03), g03["date"].nunique())
    ```

    ```text
    (32, 31)
    ```

    One day is written twice. With the repeated row counted once:

    ```python
    float(g03.drop_duplicates()["value"].sum().round(1))
    ```

    ```text
    251.1
    ```

    G03's July total is 251.1 mm, not 273.6.


## Next

- [Check an AI-suggested result against the data](../tutorials/check-a-suggested-result.md)
- [Find and remove a repeated row](../tutorials/remove-a-repeated-row.md)

*Constructed example, drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. The code was run that day outside MESA (pandas 3.1.1, DuckDB 2.0.0). No person has yet checked this card.*
