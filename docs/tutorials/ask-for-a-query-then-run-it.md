---
type: Guide
title: "Ask an agent for a query, then run it yourself"
description: "Have an AI agent draft a DuckDB query without running it, read the draft, save it to a file, run it yourself, and write down what the query leaves out."
tags: [byte, p4, ai-agents, verification, duckdb]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-19T00:00:00Z" }
stale_after: "2027-05-19T00:00:00Z"
sources:
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
---

# Ask an agent for a query, then run it yourself

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial sent the request in step 1 twice in
    MESA JupyterLab on 2026-11-19 (OpenCode 1.19.4), with one command rather than in
    the OpenCode screen, and ran the code in steps 3 to 5 in a terminal there. Nobody
    has yet followed the page as a reader would.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

An agent that runs its own query hands you a number. An agent that only drafts the
query hands you something you can read first. The run, and the result, are yours.

**You will:** have the agent's query in a file beside your notebook, a result you ran
yourself, and a note of what the query leaves out.

**Time:** 10 minutes. **You need:** to have finished
[Sign in and start an AI agent in a MESA app](start-an-ai-agent.md) in this app
session, and the notebook from
[Load a file from your Data Store into a notebook](load-a-file.md) with its first cell
run.

## Steps

1. In the OpenCode screen, ask for a draft and nothing more:

    ```text
    Write one DuckDB SQL query that reads the file readings.csv (columns: gauge_id,
    date, value, flag) and returns the total of value for each gauge_id. Do not run
    it and do not use any tools. Reply with the SQL only.
    ```

    You should see: a query of a few lines and no tool calls. Yours may differ from
    the one below.

2. Before you run it, read it for three things: which file it reads, which rows it
   leaves out, and whether it changes anything.

    You should see, for the draft below: `readings.csv` in the folder it is run from;
    no rows left out, as there is no `WHERE`; and nothing changed, as it is a single
    `SELECT`.

3. In your notebook, paste the draft into a cell and save it to a file. Put first where
   it came from:

    ```python
    from pathlib import Path

    draft = """-- Drafted by an AI agent (OpenCode, gpt-oss-120b) on 2026-11-19.
    -- Not yet checked.
    SELECT
        gauge_id,
        SUM(value) AS total_value
    FROM
        read_csv_auto('readings.csv')
    GROUP BY
        gauge_id
    ORDER BY
        gauge_id;
    """
    saved = Path("agent_total_by_gauge.sql").write_text(draft)
    ```

    You should see: no output, and `agent_total_by_gauge.sql` in the file browser.

4. Run the query from the file:

    ```python
    import duckdb

    duckdb.sql(Path("agent_total_by_gauge.sql").read_text())
    ```

    You should see: one total for each gauge. The long decimals come from adding
    fractions; 390.8999999999999 is 390.9.

    ```text
    ┌──────────┬────────────────────┐
    │ gauge_id │    total_value     │
    │ varchar  │       double       │
    ├──────────┼────────────────────┤
    │ G01      │ 190.29999999999998 │
    │ G02      │ 21.830000000000002 │
    │ G03      │ 273.59999999999997 │
    │ G04      │ 198.80000000000004 │
    │ G05      │  390.8999999999999 │
    └──────────┴────────────────────┘
    ```

5. Compare it with a total you compute another way:

    ```python
    readings.groupby("gauge_id")["value"].sum()
    ```

    You should see: the same five totals. The query does what you asked.

    ```text
    gauge_id
    G01    190.30
    G02     21.83
    G03    273.60
    G04    198.80
    G05    390.90
    Name: value, dtype: float64
    ```

6. In the file, replace `Not yet checked.` with what you found and what the query
   leaves out.

    You should see: something like "Run and matched against pandas on 2026-11-19.
    A plain sum: it includes the readings flagged `S`."

## Check it worked

The folder holds `agent_total_by_gauge.sql`, whose first lines say who drafted it and
what you checked. You can say why G05's 390.9 is not yet a rainfall total: you asked
for a sum, the agent never saw the data, and so nothing in the draft knows about the
flagged 180 mm reading.

## If it didn't

**The agent ran the query, or called a tool.** Nothing is harmed. Ask again, keeping
the sentence that begins "Do not run it".

**`IO Error: No files found that match the pattern "readings.csv"`.** The draft names
the file without a folder. Open the notebook from `mesa-practice` and run the cell
again.

## Next

- [Check an AI-suggested result against the data](check-a-suggested-result.md) takes
  the 390.9 apart.
- [Save a query so someone else can run it](save-a-query.md)
- [Read back what an agent ran](read-what-an-agent-ran.md) confirms it called no tools.
- Reference: [AI agents in the MESA apps](https://idss-mesa.github.io/docs/apps/agents/).

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-19; the request and the code were run there that day (pandas 3.1.1, DuckDB 2.0.0).*
