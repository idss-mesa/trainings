---
type: Guide
title: "Open a terminal in a Data Store folder on the MESA desktop"
description: "On the MESA KASM Ubuntu Desktop, go to a folder of your Data Store in the file manager, open a terminal that starts in that folder, and run a command on a file there."
tags: [byte, p1, kasm, desktop, terminal, data-store]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/apps/kasm/"
    title: "MESA KASM Ubuntu Desktop"
    author: "team:idss-mesa"
---

# Open a terminal in a Data Store folder on the MESA desktop

!!! warning "Draft: not yet validated"
    These steps were followed once in the app on 2026-11-17, by the AI assistant that
    drafted them. No person has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A desktop program and a command often work on the same files: you look at a map in
one window and convert or count the data in another. On the MESA desktop the file
manager can open a terminal that starts in the folder you are looking at, so you do
not have to type the path.

**You will:** have a terminal on the MESA desktop, in a folder of your Data Store,
that has run a command on a file there.

**Time:** 5 to 10 minutes. **You need:** the MESA KASM Ubuntu Desktop running, as in
[Open a file from your Data Store in a desktop program](desktop-open-a-file.md), and
`readings.csv` in a `mesa-practice` folder, from the
[practice data](practice-data.md).

## Steps

1. Double-click **Home**, then **data-store**, then **home**, then the folder named
   after your CyVerse username, then **mesa-practice**.

    You should see: your files, and the folder's path in the bar at the top of the
    window, ending in `/mesa-practice/`.

2. Right-click an empty part of the window, between the icons or below them.

    You should see: a short menu that begins **Create Folder…** and contains **Open
    Terminal Here**.

3. Choose **Open Terminal Here**.

    You should see: a **Terminal** window with a MESA welcome screen, and a prompt
    that ends in `mesa-practice $>`.

4. Click in the terminal and list the folder:

    ```bash
    ls
    ```

    You should see: the same file names the file manager shows, `readings.csv` among
    them.

5. Count the lines of a file:

    ```bash
    wc -l readings.csv
    ```

    You should see: a header line and 152 readings.

    ```text
    153 readings.csv
    ```

## Check it worked

The terminal's prompt names `mesa-practice`, and `wc -l` counted 153 lines in
`readings.csv` without you typing a path.

## If it didn't

**The menu begins "Open With" and has no "Open Terminal Here".** You right-clicked a
file, not the empty background. Press ++esc++ and right-click a gap between two
icons.

**The prompt shows a path that starts `/data-store/iplant/home/`.** That is the same
folder as `~/data-store/home/` under its full name. Nothing is wrong.

## Next

- Save what you want to keep under **data-store**. The rest of the desktop is deleted
  when the app stops.
- [Download a file from the web into your Data Store with MESA Cloud Shell](cloud-shell-download.md),
  for more to do in a terminal.
- [Stop an app and find your results](stop-app-find-results.md)
- Reference: [MESA KASM Ubuntu Desktop](https://idss-mesa.github.io/docs/apps/kasm/).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17 and followed once in the app that day.*
