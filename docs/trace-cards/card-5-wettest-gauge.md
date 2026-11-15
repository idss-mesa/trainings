---
type: Guide
title: "Trace card 5: the wettest gauge, a third run"
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

# Trace card 5: the wettest gauge, a third run

!!! note "Constructed example"
    This run was written by hand, to practise on. No agent and no model produced it.
    The code in it was run on the practice data and gives the output shown.
    [How to use the trace cards](how-to-use.md) explains the format.

**Card 5.** **Data:** `readings.csv`, from the [practice data](../tutorials/practice-data.md).
**Time:** 5 to 8 minutes.

## The question put to the agent

> Which gauge was wettest in July?

## The run

Each numbered item is one line of the run: what the agent said, what it ran, or what
it answered.

1. **The agent says:** "To find the wettest gauge I will look for the largest
   reading."

2. **The agent runs:**

    ```python
    import pandas as pd

    readings = pd.read_csv("readings.csv")
    readings.loc[readings["value"].idxmax()]
    ```

    **It gets back:**

    ```text
    gauge_id           G05
    date        2026-07-09
    value            180.0
    flag                 S
    Name: 129, dtype: object
    ```

3. **The agent answers:** "Quarry (G05) was the wettest gauge in July. It recorded
   180.0 mm on 9 July, far more than any other gauge on any day."

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

    **Where it goes wrong: line 1.** The question is about a month. The plan looks for
    one reading. Everything after it is carried out correctly, on the wrong question.

    **Kind of failure: a different question answered.** The call at line 2 does what it
    was asked to do, and the figure in the answer is in the data. An answer can be
    retrieved, and exact, and still not be the answer to what was asked.

    **What else to notice.** Line 2 came back with `flag` set to `S`: the one reading
    the answer rests on is marked suspect, and the answer does not say so.

    **A query that refutes it,** by answering the question that was asked:

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

    Over the month, Observatory (G03) leads with 251.1 mm.


## Next

- [Trace card 7: G03's July total](card-7-g03-total.md)
- [Tally a quality flag before you trust a number](../tutorials/tally-a-quality-flag.md)

*Constructed example, drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. The code was run that day outside MESA (pandas 3.1.1, DuckDB 2.0.0). No person has yet checked this card.*
