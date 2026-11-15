---
type: Guide
title: "Trace card 4: the wettest gauge, a second run"
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

# Trace card 4: the wettest gauge, a second run

!!! note "Constructed example"
    This run was written by hand, to practise on. No agent and no model produced it.
    The code in it was run on the practice data and gives the output shown.
    [How to use the trace cards](how-to-use.md) explains the format.

**Card 4.** **Data:** `readings.csv`, from the [practice data](../tutorials/practice-data.md).
**Time:** 5 to 8 minutes.

## The question put to the agent

> Which gauge was wettest in July?

## The run

Each numbered item is one line of the run: what the agent said, what it ran, or what
it answered.

1. **The agent says:** "`readings.csv` has one row for each gauge and day, with the
   rainfall in `value`. I will add up `value` for each gauge."

2. **The agent runs:**

    ```python
    import pandas as pd

    readings = pd.read_csv("readings.csv")
    readings.head(3)
    ```

    **It gets back:**

    ```text
      gauge_id        date  value flag
    0      G01  2026-07-01    0.0  NaN
    1      G01  2026-07-02    0.0  NaN
    2      G01  2026-07-03   24.9  NaN
    ```

3. **The agent runs:**

    ```python
    readings.groupby("gauge_id")["value"].sum()
    ```

    **It gets back:**

    ```text
    gauge_id
    G01    190.30
    G02     21.83
    G03    273.60
    G04    198.80
    G05    390.90
    Name: value, dtype: float64
    ```

4. **The agent answers:** "Quarry (G05) was the wettest gauge in July, with 390.9 mm.
   Orchard (G02) was much the driest, with 21.8 mm."

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

    **Where it goes wrong: line 1.** The agent says what `value` holds without looking
    it up. It never opens `gauges.csv`, which records that G02 reports in centimetres,
    and it never looks at the `flag` column that line 2 shows.

    **Kind of failure: a result misread.** The sums at line 3 are correct arithmetic.
    Reading them as millimetres of trustworthy rain is the mistake. The clue is on the
    page: G02 at about a tenth of its neighbours.

    **A query that refutes it,** with the units made the same, the repeated row
    counted once, and the flagged readings left out:

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

    Observatory (G03) leads, with 251.1 mm. Of G05's 390.9, 180.0 is one reading
    flagged as suspect, and G02's true total is 218.3 mm, not 21.8.


## Next

- [Trace card 5: the wettest gauge, a third run](card-5-wettest-gauge.md)
- [Read the data dictionary before the data](../tutorials/read-the-data-dictionary.md)

*Constructed example, drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. The code was run that day outside MESA (pandas 3.1.1, DuckDB 2.0.0). No person has yet checked this card.*
