---
type: Guide
title: "Say where your input data came from"
description: "Record in a folder's README where its data came from, when you retrieved it, which version it is, and what its license allows, so that someone else can get the same data again."
tags: [byte, p5, readme, provenance, license]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
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

# Say where your input data came from

!!! warning "Draft: not yet validated"
    Nobody has yet followed this tutorial in MESA JupyterLab, so a menu name may differ
    there. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A result can be repeated only by someone who can get the same data. A link alone is
not enough: the page behind it changes, and it does not say whether the data may be
reused. Four facts, written down on the day you fetch the data, settle it.

**You will:** have a **Source** section in your README that says where the data came
from, when you got it, which version it is, and what its license allows.

**Time:** 5 to 10 minutes. **You need:** the `README.md` from
[Write a README for a data folder](write-a-readme.md), in a folder open in
[MESA JupyterLab](launch-jupyterlab.md).

## Steps

1. In JupyterLab's file browser, double-click `README.md`.

    You should see: the README's text in an editor tab, with a `## Source` heading and
    one link under it.

2. Replace what is under `## Source` with a list of facts. For the practice data:

    ```markdown
    ## Source

    - From: https://idss-mesa.github.io/trainings/tutorials/practice-data/
    - Made by: MESA Trainings. Synthetic data, written by a script.
    - Retrieved: 2026-11-15, with the download cell on that page
    - Version: the files as published on that date
    - License: CC BY 4.0
    - Changed since: nothing
    ```

    You should see: six lines, each starting with what it records.

3. Correct **Retrieved** to the day you copied the files, not today's date, and say
   how you got them: a download cell, a command, or an upload from your computer.

    You should see: a date and a method that would let you fetch the files the same
    way again.

4. Look up **License** on the source's own page. Do not write it from memory. For
   the practice data, the [practice data](practice-data.md) page states it near the
   end.

    You should see: the license as the source words it.

5. Under **Changed since**, list anything you have done to the files after fetching
   them: rows removed, columns renamed, units converted. If the files are as they
   arrived, leave "nothing".

    You should see: a line that lets a reader tell your copy from the original.

6. Choose **File → Save Markdown File**.

    You should see: *Saving completed* in the bar at the bottom.

## Check it worked

From the **Source** section alone, a reader can answer three questions: where to get
the data again, whether they may reuse it, and whether your copy differs from the
original.

## If it didn't

**The source's page states no license.** Write `License: not stated on the source
page`, with the date you looked. Do not guess one. Without a license you may not
have the right to pass the data on, so ask whoever publishes it before you share the
folder.

## Next

- [Record the software versions a result depends on](record-software-versions.md)
- [Hand your folder to a colleague and have them rerun it](hand-over-and-rerun.md)
- Reference: [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/).

*Not yet validated in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15 from the MESA documentation and the JupyterLab documentation.*
