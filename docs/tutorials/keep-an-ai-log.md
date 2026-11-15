---
type: Guide
title: "Keep a log of AI-assisted steps"
description: "Keep a table in your notebook with one row for each step an AI assistant helped with: what you asked, what it answered, how you checked it, and what you decided."
tags: [byte, p4, ai-agents, verification, disclosure]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
  - id: jupyterlab
    resource: "https://jupyterlab.readthedocs.io/en/stable/user/notebook.html"
    title: "Notebooks (JupyterLab documentation)"
    author: "team:jupyterlab"
---

# Keep a log of AI-assisted steps

!!! warning "Draft: not yet validated"
    Nobody has yet followed this tutorial in MESA JupyterLab, so a key or a menu name
    may differ there. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

An answer from an AI assistant that went into your work unrecorded cannot be checked
later, by you or by anyone else. A log made as you go costs a minute a row, and it is
what lets you say afterwards exactly what the assistant did.

**You will:** have an AI log in your notebook, with a first row filled in.

**Time:** 5 to 10 minutes. **You need:** `practice.ipynb` from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md). You do not need an AI assistant: the first
row uses the answer tested in
[Check an AI-suggested result against the data](check-a-suggested-result.md).

## Steps

1. Click the last cell of the notebook, press ++esc++, then ++b++ to add a cell below
   it, then ++m++ to make it a Markdown cell.

    You should see: an empty cell at the end, with no `[ ]:` beside it.

2. Type the heading and the top of the table:

    ```markdown
    ## AI log

    | # | Date | Tool and model | What I asked | What it answered | How I checked | Verdict |
    |---|---|---|---|---|---|---|
    ```

    You should see: after ++shift+enter++, the heading and one row of column titles.

3. Double-click the cell to edit it again, and add one row under the table for the
   example answer:

    ```markdown
    | 1 | 2026-11-15 | (example from a tutorial; no tool) | Which gauge was wettest in July? | Quarry (G05), 390.9 mm | Recomputed the totals without flagged readings | Rejected: 180 mm of it is one reading flagged as suspect |
    ```

    You should see: after ++shift+enter++, a table with one numbered row.

4. Read the row against these four rules, which hold for every row you add later:

    - **What I asked** is the prompt as you gave it, or its exact first sentence.
    - **What it answered** is the claim you used or refused, with its numbers.
    - **How I checked** names something you ran or read yourself. "Looked right" is
      not a check.
    - **Verdict** is one of *kept*, *changed*, or *rejected*, and why.

    You should see: that the example row passes all four.

5. Add a row each time an assistant helps, at the moment it happens, including the
   answers you rejected. Under **Tool and model**, write the command you started and
   the model it used, for example the agent's name and the model name it reports.

    You should see: one row for each assisted step, in the order they happened.

6. Choose **File → Save Notebook**.

    You should see: the log saved in the notebook, so that it goes wherever the
    notebook goes.

## Check it worked

The notebook ends with an **AI log** table, and no row has an empty **How I checked**
or **Verdict**. For any number in the notebook that came from an assistant, you can
point to its row.

## If it didn't

**The table shows as lines of text with `|` between the words.** The second line of
the table, the one made of dashes, is missing or has a different number of columns
from the first. Double-click the cell, make the two lines match, and press
++shift+enter++.

## Next

- [Check an AI-suggested result against the data](check-a-suggested-result.md), for
  the check behind the example row.
- [Sign in and start an AI agent in a MESA app](start-an-ai-agent.md)
- Reference: [AI agents in the MESA apps](https://idss-mesa.github.io/docs/apps/agents/),
  for the agents each app includes and how each connects to a model.

*Not yet validated in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15 from the MESA documentation and the JupyterLab documentation.*
