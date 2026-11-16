---
type: Guide
title: "Start a new file in the Data Browser"
description: "Create a new file from a template, such as a Markdown note, in a folder of your Data Store with the New File button in the MESA Portal Data Browser."
tags: [byte, p1, portal, data-browser, files]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Start a new file in the Data Browser

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-16, by the AI
    assistant that drafted them. No person has yet followed them, so a screen may
    differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have a new file in your Data Store, started from a template, ready to
open in a MESA app.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md), and
a folder of your own, such as `mesa-practice` from
[Make a folder in your Data Store](make-a-folder.md).

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**, and open the folder the
   file should go into.

    You should see: **Upload**, **New File**, and **New Folder** above the listing.

2. Click **New File**.

    You should see: a **Create New File** window with a **Filename** box, a row of
    endings under **Extension** (`.md`, `.txt`, `.py`, `.json`, `.csv`, `.r`, and
    **Custom**), and a **Template preview**.

3. Type a name without an ending, for example `notes`. Use lower-case letters,
   numbers, and hyphens.

    You should see: the name in the box.

4. Under **Extension**, click the kind of file you want. `.md`, a Markdown note, is
   already chosen.

    You should see: the **Template preview** show what the file will start with. For
    `.md` that is one line:

    ```text
    # Untitled
    ```

5. Click **Create**.

    You should see: the button read **Creating…**. This can take ten seconds; do not
    click again.

6. Wait for the listing to refresh.

    You should see: a card named `notes.md`, 12.0 B in size.

## Check it worked

The folder lists `notes.md`. The portal made the file; it does not edit it. To write
in it, open it in a MESA app, where it is at
`~/data-store/home/<your username>/` followed by the folder name and `notes.md`.

## If it didn't

**There is no New File button.** You are in a folder you cannot write to, such as
**Community**, or you are signed out. Click **My Files** and look again.

**The new file does not appear.** Wait a few seconds and reload the page.

**You need an ending that is not listed.** Click **Custom** and type the ending, for
example `.yaml`. A custom ending starts as an empty file.

## Next

- [Write a README for a data folder](write-a-readme.md)
- [Launch MESA JupyterLab with your Data Store mounted](launch-jupyterlab.md), to open
  and edit the file.
- Reference: [Managing data, "Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16 and followed once on the live portal that day.*
