---
type: Guide
title: "Write and run a Python script in MESA VS Code"
description: "Open MESA VS Code on your Data Store, create a Python script in a folder there, and run it in the built-in terminal."
tags: [byte, p1, vscode, python, data-store]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/apps/vscode/"
    title: "MESA VS Code"
    author: "team:idss-mesa"
---

# Write and run a Python script in MESA VS Code

!!! warning "Draft: not yet validated"
    These steps were followed once in the app on 2026-11-13, by the person who wrote
    them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

MESA VS Code is the Visual Studio Code editor in a browser tab, opened on your Data
Store. A script you write there is saved in your Data Store as you type.

**You will:** have a Python script in your Data Store that reads a data file and prints
a result.

**Time:** 10 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md),
and `readings.csv` in a `mesa-practice` folder in your Data Store, from the
[practice data](practice-data.md) or from
[the Cloud Shell tutorial](cloud-shell-download.md).

## Steps

1. In the portal, click **Applications**, and on the **MESA VS Code** card click
   **Instant Launch**. Wait for the editor to open.

    You should see: VS Code, with an **Explorer** panel on the left that lists the
    folders of your Data Store home under your username.

2. In the **Explorer**, click **mesa-practice**.

    You should see: the folder open, with `readings.csv` inside it.

3. Right-click **mesa-practice** and choose **New File…**. Type `count_rows.py` and
   press ++enter++.

    You should see: the new file in the folder, and an empty editor tab named
    `count_rows.py`.

4. Type this into the editor:

    ```python
    import csv

    rows = list(csv.DictReader(open("readings.csv")))
    flagged = [r for r in rows if r["flag"] == "S"]
    print(len(rows), "readings,", len(flagged), "flagged")
    ```

    You should see: the code coloured as Python. VS Code saves it for you: **Auto
    Save** is switched on.

5. Right-click **mesa-practice** again and choose **Open in Integrated Terminal**.

    You should see: a terminal panel under the editor, with a MESA welcome screen and
    a prompt that ends in `mesa-practice $>`.

6. Click in the terminal and run the script:

    ```bash
    python count_rows.py
    ```

    You should see:

    ```text
    152 readings, 2 flagged
    ```

## Check it worked

The terminal prints `152 readings, 2 flagged`, and `count_rows.py` is listed in
**My Files → mesa-practice** in the portal's Data Browser.

## If it didn't

**`FileNotFoundError: [Errno 2] No such file or directory: 'readings.csv'`.** The
terminal is not in the folder that holds the data. Its prompt shows where it is. Close
it, then repeat step 5, making sure you right-click **mesa-practice** and not the
folder above it.

## Next

- [Stop an app and find your results](stop-app-find-results.md), when you have
  finished with the editor.
- Reference: [MESA VS Code](https://idss-mesa.github.io/docs/apps/vscode/), for the
  extensions and tools the app contains.

*Not yet validated by a second person. Drafted 2026-11-13 and followed once in the app that day.*
