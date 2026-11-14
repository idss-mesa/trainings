---
type: Guide
title: "Move folders into another folder"
description: "Select several folders in the MESA Portal's Data Browser and move them together into another folder in your Data Store."
tags: [byte, p1, portal, data-browser, folders]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Move folders into another folder

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them, on folders. Moving one file the same way was also tried once and
    behaved the same. Moving by dragging was not tried.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have two folders moved together into a third.

**Time:** 5–10 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md),
and three folders of your own in the same place. [Make them](make-a-folder.md) if you
need to: `notes-a`, `notes-b`, and `archive`.

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**.

    You should see: a card for each folder, each with a small box at its left-hand
    end.

2. Tick the box on `notes-a`.

    You should see: a toolbar above the cards that says **1 item selected**, with
    **Trash**, **Move**, **Share**, and **Clear**.

3. Tick the box on `notes-b`.

    You should see: **2 items selected**. **Select All**, above the listing, ticks
    every card on the page, and **Clear** unticks them all.

4. Click **Move** in the toolbar.

    You should see: a **Move 2 item(s)** window with a **Destination path** box.

5. Make the box hold the full path of the folder to move into. If it already holds
   the path of the folder you are in, add `/archive` to the end. If it is empty, type
   the whole path:

    ```text
    /iplant/home/<your username>/archive
    ```

    You should see: the complete path in the box, starting with `/iplant/home/`.

6. Click **Move**.

    You should see: the notice **Moved 2 item(s)** at the top right.

7. Wait about twenty seconds, reload the page, and click `archive` to open it.

    You should see: `notes-a` and `notes-b` inside `archive`, and no longer in the
    folder you started in.

## Check it worked

Open one of the moved folders and read the path in its header. It now passes through
`archive`:

```text
/iplant/home/<your username>/archive/notes-a
```

## If it didn't

**The folders are still listed where they were.** The notice appears before the
listing catches up. Wait, then reload the page; do not move them a second time.

**Move failed, "dest must be a non-blank string".** The path in the box was not
complete. Type all of it, from `/iplant/home/`.

**Move failed, `ERR_CONFLICT`.** CyVerse is still busy with one of the items, for
example one just restored from the trash. Wait a minute and click **Move** again.

## Next

- A move changes the path, just as a rename does: update any notebook or script that
  reads from the old one.
- [Move a folder to the trash and get it back](trash-and-restore.md)
- Reference: [Managing data, "Work on several items at once"](https://idss-mesa.github.io/docs/portal/data/#work-on-several-items-at-once).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
