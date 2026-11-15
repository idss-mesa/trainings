---
type: Guide
title: "Trace card 2: G01's missing days"
description: "A short constructed run of an AI agent answering \"How many days is G01 missing in July?\" on the practice data, for you to judge before you open the answer."
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

# Trace card 2: G01's missing days

!!! note "Constructed example"
    This run was written by hand, to practise on. No agent and no model produced it.
    The code in it was run on the practice data and gives the output shown.
    [How to use the trace cards](how-to-use.md) explains the format.

**Card 2.** **Data:** `readings.csv`, from the [practice data](../tutorials/practice-data.md).
**Time:** 5 to 8 minutes.

## The question put to the agent

> How many days is G01 missing in July?

## The run

Each numbered item is one line of the run: what the agent said, what it ran, or what
it answered.

1. **The agent says:** "I will count the days G01 has, and compare them with the
   calendar for July."

2. **The agent runs:**

    ```python
    import pandas as pd

    readings = pd.read_csv("readings.csv")
    g01 = readings[readings["gauge_id"] == "G01"]
    (len(g01), g01["date"].nunique(), g01["date"].min(), g01["date"].max())
    ```

    **It gets back:**

    ```text
    (27, 27, '2026-07-01', '2026-07-31')
    ```

3. **The agent says:** "27 rows for 27 different days, so no day is repeated. The first
   and the last day of July are both there, so the gap is inside the month."

4. **The agent runs:**

    ```python
    july = pd.date_range("2026-07-01", "2026-07-31").strftime("%Y-%m-%d")
    sorted(set(july) - set(g01["date"]))
    ```

    **It gets back:**

    ```text
    ['2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25']
    ```

5. **The agent answers:** "G01 is missing four days in July 2026: the 22nd, 23rd, 24th,
   and 25th. It has 27 rows for 27 different days, so none of its days is repeated."

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

    **Why.** The answer gives a count and the days, and both came back from line 4.
    Line 2 rules out the other way to get 27 rows from fewer days, a repeated day,
    before the agent relies on the count.

    **A query that confirms it,** from the other side: on those four days, which gauges
    do have a row?

    ```python
    readings[readings["date"].between("2026-07-22", "2026-07-25")].groupby("gauge_id").size()
    ```

    ```text
    gauge_id
    G02    4
    G03    4
    G04    4
    G05    4
    dtype: int64
    ```

    Four gauges have all four days, and G01 is not in the list.


## Next

- [Trace card 4: the wettest gauge, a second run](card-4-wettest-gauge.md)
- The same check as a tutorial: [Count records per day to find incomplete days](../tutorials/count-records-per-day.md).

*Constructed example, drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. The code was run that day outside MESA (pandas 3.1.1, DuckDB 2.0.0). No person has yet checked this card.*
