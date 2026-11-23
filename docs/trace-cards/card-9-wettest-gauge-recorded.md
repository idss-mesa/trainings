---
type: Guide
title: "Trace card 9: the wettest gauge, a recorded run"
description: "A real run of an AI agent in MESA JupyterLab answering \"Which gauge was wettest in July?\" on the practice data, for you to judge before you open the answer."
tags: [trace-card, ai-agents, verification, practice-data]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-22T00:00:00Z" }
stale_after: "2027-05-22T00:00:00Z"
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

# Trace card 9: the wettest gauge, a recorded run

!!! note "Recorded run"
    An agent produced this run: OpenCode 1.19.4, agent `build`, model
    `js2/gpt-oss-120b` through AI Verde, in MESA JupyterLab on 2026-11-22. It was
    started with one command, `opencode run`, in a folder holding copies of the five
    practice files. The calls, the result at line 5 and the answer are as recorded.
    What the reads returned is shortened here, from the files themselves.
    [How to use the trace cards](how-to-use.md) explains the format.

**Card 9.** **Data:** the five files of the [practice data](../tutorials/practice-data.md).
**Time:** 5 to 8 minutes.

## The question put to the agent

> Which gauge was wettest in July?

## The run

Each numbered item is one line of the run. This agent did not say what it planned:
the record holds only its calls and its answer.

1. **The agent calls** `filesystem_list_directory` on its folder. **It gets back** five
   files: `gauge_sites.csv`, `gauges.csv`, `observations.csv`, `readings.csv` and
   `readings_august.csv`.

2. **The agent calls** `read` on the first 20 lines of `observations.csv`. **It gets
   back** hourly rows, beginning:

    ```text
    gauge_id,timestamp_utc,measurement,value
    G03,2026-07-10T06:00:00Z,rain_mm,0.0
    G03,2026-07-10T06:00:00Z,air_temp_c,13.8
    ```

3. **The agent calls** `grep` for `2026-07` in the CSV files. **It gets back** 100
   matches.

4. **The agent calls** `read` on `readings.csv`. **It gets back** the file, beginning:

    ```text
    gauge_id,date,value,flag
    G01,2026-07-01,0.0,
    G01,2026-07-02,0.0,
    G01,2026-07-03,24.9,
    ```

5. **The agent runs** a shell command:

    ```bash
    awk -F',' 'NR>1 {sum[$1]+=$3} END {for (g in sum) print g, sum[g]}' readings.csv
    ```

    **It gets back:**

    ```text
    G03 273.6
    G04 198.8
    G01 190.3
    G02 21.83
    G05 390.9
    ```

6. **The agent calls** `read` on `gauges.csv`. **It gets back:**

    ```text
    gauge_id,name,unit,elevation_m
    G01,Boathouse,mm,512
    G02,Orchard,cm,540
    G03,Observatory,mm,688
    G04,Depot,mm,521
    G05,Quarry,mm,603
    ```

7. **The agent answers:** "The **Quarry** gauge (ID G05) recorded the highest total
   precipitation in July, with about **390.9 mm** of rain."

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

    **Where it goes wrong: between lines 5 and 7.** Line 5 adds up `value` for every
    row. The header at line 4 shows a `flag` column, and the sum never looks at it.
    Line 6 shows that G02 reports in centimetres, and the answer takes only a name
    from that result.

    **Kind of failure: a result misread.** The arithmetic at line 5 is right. You can
    reproduce it:

    ```python
    import pandas as pd

    readings = pd.read_csv("readings.csv")
    readings.groupby("gauge_id")["value"].sum()
    ```

    ```text
    gauge_id
    G01    190.30
    G02     21.83
    G03    273.60
    G04    198.80
    G05    390.90
    Name: value, dtype: float64
    ```

    Reading 390.9 as millimetres of trustworthy rain is the mistake. Unlike the run
    on [card 4](card-4-wettest-gauge.md), this agent did open the file that holds the
    unit. It opened it after it had its number.

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
    flagged as suspect.

    **One run is not a rate.** The same question, put again that day, was answered
    the same way by a different route. Your own agent may answer differently.


## Next

- [Read back what an agent ran](../tutorials/read-what-an-agent-ran.md): how a record
  like this one is taken from OpenCode.
- [Check an AI-suggested result against the data](../tutorials/check-a-suggested-result.md)

*Recorded run, written up with [AI assistance](../about/ai-disclosure.md) on 2026-11-22. An AI assistant started the run on a test account after a person entered the model key. The code in the answer was run that day outside MESA (pandas 3.1.1, DuckDB 2.0.0). No person has yet checked this card.*
