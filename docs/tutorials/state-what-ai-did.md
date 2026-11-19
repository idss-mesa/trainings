---
type: Guide
title: "State what AI did in your analysis"
description: "Add a section to a folder's README that says which AI tools helped with the analysis, what they were asked, what you kept, and how you checked it."
tags: [byte, p5, readme, ai-agents, disclosure]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-18T00:00:00Z" }
stale_after: "2027-05-18T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: jupyterlab
    resource: "https://jupyterlab.readthedocs.io/en/stable/user/file_editor.html"
    title: "Text editor (JupyterLab documentation)"
    author: "team:jupyterlab"
---

# State what AI did in your analysis

!!! warning "Draft: not yet validated"
    Nobody has yet followed this tutorial in MESA JupyterLab, so a menu name may differ
    there. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A reader of your result cannot tell which parts an AI assistant wrote unless you say
so. "AI was used" tells them nothing they can check. A short section that names the
tool, the steps, and your checks lets them decide what to look at twice.

**You will:** have an **AI assistance** section in your README that covers every step
an assistant helped with.

**Time:** 5 to 10 minutes. **You need:** the `README.md` from
[Write a README for a data folder](write-a-readme.md), open in
[MESA JupyterLab](launch-jupyterlab.md), and the log from
[Keep a log of AI-assisted steps](keep-an-ai-log.md) if you kept one.

## Steps

1. In JupyterLab's file browser, double-click `README.md`.

    You should see: the README's text in an editor tab.

2. Above `## Contact`, add a heading and one line for each tool you used:

    ```markdown
    ## AI assistance

    - Tool and model: OpenCode, with the model gpt-oss-120b through CyVerse AI Verde
    - Used on: 2026-11-18
    ```

    You should see: the tool's own name and the model name it reported, not "an AI".

3. Under it, list every step the assistant helped with, one line each. Say what you
   asked for and what you did with the answer:

    ```markdown
    - Asked which gauge was wettest in July. Rejected the answer: it counted a reading
      flagged as suspect.
    - Asked for a query that totals rainfall by gauge. Kept it, after changing it to
      leave out flagged readings.
    ```

    You should see: the answers you rejected listed beside the ones you kept.

4. Add how you checked what you kept, and what the assistant did not touch:

    ```markdown
    - Checked by: running each kept query myself and comparing the totals with a
      second method.
    - Not assisted: loading the files, the figures, and this README.
    - Full log: the "AI log" table at the end of `analysis.ipynb`.
    ```

    You should see: a check you ran yourself, named. "Reviewed" is not a check.

5. Read the section against your log. Every row of the log should be covered by a
   line here.

    You should see: no assisted step missing, including small ones such as a fixed
    error message.

6. Choose **File → Save Markdown File**.

    You should see: *Saving completed* in the bar at the bottom.

## Check it worked

From the **AI assistance** section alone, a reader can say which tool and model were
used, which results rest on an assistant's answer, and how each of those was checked.

## If it didn't

**You kept no log and cannot remember every step.** Say so in the section: write what
you do remember, and add `Earlier assisted steps were not recorded`. Do not write a
tidy list from memory as if it were complete. Then start a log for what comes next.

## Next

- [Hand your folder to a colleague and have them rerun it](hand-over-and-rerun.md)
- [Say where your input data came from](say-where-data-came-from.md)
- If no assistant helped, say that too: `## AI assistance` followed by `None`.
- Reference: [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/).

*Not yet validated in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-18 from the MESA documentation and the JupyterLab documentation.*
