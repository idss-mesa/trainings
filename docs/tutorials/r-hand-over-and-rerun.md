---
type: Guide
title: "Hand your folder to a colleague and have them rerun it, in R"
description: "Test whether your R work can be repeated without you: share the folder, have a colleague copy it and run the script in a new RStudio session, and compare their result with the one you wrote down."
tags: [byte, p5, rstudio, r, reproducibility, sharing]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-data
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
---

# Hand your folder to a colleague and have them rerun it, in R

!!! warning "Draft: not yet validated"
    Nobody has yet followed this tutorial from start to finish: it needs two accounts.
    Only step 5 was run, in MESA RStudio Geospatial on 2026-11-17 (R 4.6.2), by the AI
    assistant that drafted this page. The rest comes from the MESA documentation.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

You cannot tell from the inside whether your folder holds everything. You know where
the files are, what to run, and what the answer should be. The test is to give the
folder to someone who knows none of that, and to say nothing while they try.

**You will:** know whether a colleague can rerun your script, without your help, and
get your result.

**Time:** 10 minutes for you, and 10 for your colleague. **You need:** a folder
holding a script that passes
[Leave an R script someone else can rerun](r-leave-a-rerunnable-script.md); a colleague
who can [sign in to the MESA Portal](sign-in.md); and their CyVerse username.

## Steps

1. Choose one result your script prints and write it down outside the folder: a row
   count, a total, or its last line.

    You should see: one number or one line, in a note or a message draft. For
    `checks.R`, the two flag counts will do: `S` 2, `<NA>` 150.

2. Share the folder with your colleague, with **Read** access, as in
   [Share a folder with a collaborator](share-a-folder.md).

    You should see: **Shared · 1** in the folder's header.

3. Send your colleague three things and nothing more: your CyVerse username, the
   folder's name, and the sentence "Run the script in a new RStudio session and tell
   me what you get." Keep the result from step 1 to yourself.

    You should see: a message with no instructions in it. Anything else they need
    should already be in the folder.

4. Your colleague opens **Data Browser**, clicks **User Shared**, opens the folder
   named with your username, and then your folder. They download each file with the
   download button on its card, and upload the files into a folder of their own
   under **My Files**.

    They should see: the same files in a folder where the header says **Owner**.

5. Your colleague starts [MESA RStudio Geospatial](r-load-a-file.md) and, in the
   **Console**, goes to their copy and runs the script, with their own username and
   folder name in the first line:

    ```r
    setwd("~/data-store/home/<your username>/mesa-practice")
    source("checks.R", echo = TRUE)
    ```

    They should see: the lines of the script and what each prints, with no line that
    begins `Error`. A session that has just started has nothing in its
    **Environment**, so the script gets no help from earlier work.

6. Your colleague tells you three things: whether it ran without an error, the result
   they got, and every question they wanted to ask you on the way.

    You should see: their result equal to the one you wrote down in step 1.

7. Treat each question, and each difference, as something missing from the folder.
   Add it to the README or to the comment at the top of the script, then ask them to
   run it once more.

    You should see: a second run with no questions.

## Check it worked

Your colleague ran the script in their own copy, got the result you wrote down before
you shared the folder, and did not need to ask you anything.

## If it didn't

**Your colleague cannot find your name under User Shared.** That list is refreshed
every few minutes, so a folder shared a moment ago may not be there yet. It also
shows 25 people to a page: they click **Next** until they reach your username. If it
is still missing after ten minutes, open the share dialog and check that their
username is under **Current Permissions**.

**`cannot open file 'checks.R'`.** The folder in `setwd()` is not the one that holds
the copy. Your colleague corrects the path.

## Next

- [Say where your input data came from](say-where-data-came-from.md), which answers
  the question a colleague most often asks.
- [Stop sharing a folder](stop-sharing-a-folder.md), when the test is over.
- Reference: [Managing data, "Share data"](https://idss-mesa.github.io/docs/portal/data/#share-data)
  and ["Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete).
- The same task in Python: [Hand your folder to a colleague and have them rerun it](hand-over-and-rerun.md).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17 from the MESA documentation; step 5 was run in MESA RStudio Geospatial that day (R 4.6.2).*
