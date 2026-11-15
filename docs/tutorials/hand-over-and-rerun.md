---
type: Guide
title: "Hand your folder to a colleague and have them rerun it"
description: "Test whether your work can be repeated without you: share the folder, have a colleague copy it and run the notebook from a fresh start, and compare their result with the one you wrote down."
tags: [byte, p5, reproducibility, sharing, notebook]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-data
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
---

# Hand your folder to a colleague and have them rerun it

!!! warning "Draft: not yet validated"
    This tutorial was written from the MESA documentation and from tutorials whose steps
    were followed on the live portal. Nobody has yet followed it from start to finish:
    it needs two accounts. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

You cannot tell from the inside whether your folder holds everything. You know where
the files are, what to run first, and what the answer should be. The test is to give
the folder to someone who knows none of that, and to say nothing while they try.

**You will:** know whether a colleague can rerun your notebook, without your help,
and get your result.

**Time:** 10 minutes for you, and 10 for your colleague. **You need:** a folder
holding a notebook that passes
[Leave a notebook someone else can rerun](leave-a-rerunnable-notebook.md); a colleague
who can [sign in to the MESA Portal](sign-in.md); and their CyVerse username.

## Steps

1. Choose one result your notebook produces and write it down outside the folder: a
   row count, a total, or the last line a cell prints.

    You should see: one number or one line, in a note or a message draft. For the
    practice notebook, the count of rows in `readings` will do.

2. Share the folder with your colleague, with **Read** access, as in
   [Share a folder with a collaborator](share-a-folder.md).

    You should see: **Shared · 1** in the folder's header.

3. Send your colleague three things and nothing more: your CyVerse username, the
   folder's name, and the sentence "Run the notebook from a fresh start and tell me
   what you get." Keep the result from step 1 to yourself.

    You should see: a message with no instructions in it. Anything else they need
    should already be in the folder.

4. Your colleague opens **Data Browser**, clicks **User Shared**, opens the folder
   named with your username, and then your folder. They download each file with the
   download button on its card, and upload the files into a folder of their own
   under **My Files**.

    They should see: the same files in a folder where the header says **Owner**.

5. Your colleague opens their copy in [MESA JupyterLab](launch-jupyterlab.md), opens
   the notebook, and chooses **Kernel → Restart Kernel and Run All Cells…**.

    They should see: every code cell numbered in order, with no red error box.

6. Your colleague tells you three things: whether it ran without an error, the result
   they got, and every question they wanted to ask you on the way.

    You should see: their result equal to the one you wrote down in step 1.

7. Treat each question, and each difference, as something missing from the folder.
   Add it to the README or the notebook, then ask them to run it once more.

    You should see: a second run with no questions.

## Check it worked

Your colleague ran the notebook in their own copy, got the result you wrote down
before you shared the folder, and did not need to ask you anything.

## If it didn't

**Your colleague cannot find your name under User Shared.** That list is refreshed
every few minutes, so a folder shared a moment ago may not be there yet. It also
shows 25 people to a page: they click **Next** until they reach your username. If it
is still missing after ten minutes, open the share dialog and check that their
username is under **Current Permissions**.

## Next

- [Say where your input data came from](say-where-data-came-from.md), which answers
  the question a colleague most often asks.
- [Stop sharing a folder](stop-sharing-a-folder.md), when the test is over.
- Reference: [Managing data, "Share data"](https://idss-mesa.github.io/docs/portal/data/#share-data)
  and ["Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete).

*Not yet validated on the live portal. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15 from the MESA documentation.*
