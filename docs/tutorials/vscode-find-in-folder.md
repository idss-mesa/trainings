---
type: Guide
title: "Find a value in every file of a folder with MESA VS Code"
description: "Search all the files in a folder of your Data Store for a piece of text in MESA VS Code, read how many times each file contains it, and open a file at the matching line."
tags: [byte, p1, vscode, search, data-store]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/apps/vscode/"
    title: "MESA VS Code"
    author: "team:idss-mesa"
  - id: vscode-search
    resource: "https://code.visualstudio.com/docs/editing/codebasics#_search-across-files"
    title: "Basic editing: Search across files (Visual Studio Code documentation)"
    author: "team:microsoft"
---

# Find a value in every file of a folder with MESA VS Code

!!! warning "Draft: not yet validated"
    These steps were followed once in the app on 2026-11-17, by the AI assistant that
    drafted them, in a folder that held more files than the two named here. No person
    has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Before you rename a gauge, drop a column, or change a code, you need to know every
file that mentions it. The portal's search looks at file names. VS Code looks inside
the files.

**You will:** know which files in a folder contain a given piece of text, and how
many times.

**Time:** 5 minutes. **You need:** MESA VS Code open, as in
[Write and run a Python script in MESA VS Code](vscode-run-a-script.md), and the
`mesa-practice` folder with `gauges.csv` and `readings.csv` from the
[practice data](practice-data.md).

## Steps

1. In the **Explorer**, right-click **mesa-practice** and choose **Find in Folder…**.

    You should see: the **Search** panel in place of the Explorer, with
    `./mesa-practice` already filled in under **files to include**.

2. In the box at the top, type `G02` and press ++enter++.

    You should see: a line such as *32 results in 2 files*, and under it each file
    with the lines that match. The count can rise for a few seconds while the search
    finishes.

3. Read the number at the right of each file name.

    You should see: `1` beside `gauges.csv` and `31` beside `readings.csv`: one row
    that describes the gauge, and one reading for each day of July. Other practice
    files that mention the gauge, such as `readings_august.csv`, are listed with
    their own counts.

4. Click the small arrow at the left of a long file, such as `readings.csv`.

    You should see: its lines fold away, so that the other files fit on the screen.

5. Under `gauges.csv`, click the line `G02,Orchard,cm,540`.

    You should see: `gauges.csv` open in the editor, with `G02` selected on line 3,
    and *Ln 3, Col 4* in the bar at the bottom.

6. Look, and do not type. The file is open for editing, and VS Code saves what you
   type as you type it.

    You should see: the tab's name in italics, which means a preview. It closes by
    itself when you open another file.

## Check it worked

You can say, without opening them one by one, which files in `mesa-practice` mention
`G02` and how often: `gauges.csv` once and `readings.csv` 31 times.

## If it didn't

**The search finds files outside your folder.** **files to include** is empty, so
VS Code searched your whole Data Store home. Type `./mesa-practice` in that box and
press ++enter++.

**A file you expected is missing.** Search reads text. It skips files that are not
text, such as `readings.parquet` and images.

**You typed into the file by accident.** Press ++ctrl+z++ (++cmd+z++ on a Mac) until
the line reads as it did.

## Next

- The three buttons at the right of the search box narrow the search: **Aa** matches
  capitals exactly, and **ab** matches whole words only, so that `G02` does not also
  find `G020`.
- [Search for files and folders by name](search-the-data-browser.md), in the portal.
- Reference: [MESA VS Code](https://idss-mesa.github.io/docs/apps/vscode/).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17 and followed once in the app that day.*
