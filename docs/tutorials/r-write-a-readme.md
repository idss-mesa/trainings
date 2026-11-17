---
type: Guide
title: "Write a README for a data folder, from RStudio"
description: "Add a short README file to a folder in your Data Store, with the editor in MESA RStudio Geospatial, that says what the files are, where they came from, and who to ask."
tags: [byte, p5, rstudio, documentation, data-store]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
---

# Write a README for a data folder, from RStudio

!!! warning "Draft: not yet validated"
    These steps were followed once in MESA RStudio Geospatial on 2026-11-17 (R 4.6.2),
    by the AI assistant that drafted them, with a shorter text than the one in step 2.
    No person has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A folder of data without a description is a puzzle for the next person, and in six
months that person is you. A README is a plain text file, kept with the data, that
answers the first questions anyone asks.

**You will:** have a `README.md` in a folder of your Data Store that describes what is
in it.

**Time:** 10 minutes. **You need:** the `mesa-practice` folder from
[Load a file from your Data Store in RStudio](r-load-a-file.md), or a folder of your
own, in MESA RStudio Geospatial with R's working folder set to it.

## Steps

1. Choose **File → New File → Markdown File**.

    You should see: an empty editor tab named **Untitled1**, above the **Console**.

2. Type the description. Five short parts cover most folders:

    ```markdown
    # Practice rain-gauge data

    Synthetic data from the MESA Trainings tutorials. It describes no real place.

    ## Files

    - `gauges.csv`: one row per rain gauge (5 rows)
    - `readings.csv`: one row per gauge and day, July 2026 (152 rows)
    - `checks.R`: checks on both files; run it with `source("checks.R")`

    ## Source

    https://idss-mesa.github.io/trainings/tutorials/practice-data/

    ## Notes

    - Orchard (G02) reports in centimetres; the other gauges report in millimetres.
    - Readings flagged `S` were marked suspect by the sensor.

    ## Contact

    Your name, your email address
    ```

    You should see: the headings in colour in the editor. RStudio does not start the
    next bullet for you: type each `-` yourself. Leave out the `checks.R` line if
    your folder has no such script.

3. Click the save button, the disk at the left of the editor's toolbar. The **Save
   File** window opens on R's working folder.

    You should see: the folder's own files listed in the window, such as
    `gauges.csv`.

4. Type `README.md` as the file name and click **Save**.

    You should see: the tab renamed **README.md**. By convention that name is the one
    people look for first.

5. In the **Console**, confirm the file is in the folder:

    ```r
    file.exists("README.md")
    ```

    You should see: `[1] TRUE`.

## Check it worked

`README.md` is listed in the folder, in RStudio and in the portal's Data Browser, and
a person who has never seen the folder could say from it what each file holds.

## If it didn't

**The folder now holds `README.html` as well.** You clicked **Preview** in the
editor's toolbar, which writes a web page beside the README and tries to open it in
a new window. Nothing is lost. Remove the extra file with
`file.remove("README.html")`.

**A window asks about "visual editing mode".** You clicked **Visual**, above the
text. That mode rewrites the file's Markdown in its own style. Click **Cancel** to
stay with the text as you typed it.

**`[1] FALSE` in step 5.** The file was saved somewhere else. Choose
**File → Save As...**, go to your folder in the window, and save it there.

## Next

- [Say where your input data came from](say-where-data-came-from.md): the facts to
  put under **Source**. Its steps name JupyterLab's menus; in RStudio, open
  `README.md` from **File → Open File...** and save with the same disk button.
- [Record the R and package versions a result depends on](r-record-software-versions.md)
- [Add metadata to a file or folder](add-metadata.md), which makes the same facts
  searchable by tools.
- The same task in JupyterLab: [Write a README for a data folder](write-a-readme.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17 and followed there once that day (R 4.6.2).*
