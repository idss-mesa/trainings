---
type: Guide
title: "Write a README for a data folder"
description: "Add a short README file to a folder in your Data Store, from MESA JupyterLab, that says what the files are, where they came from, and who to ask."
tags: [byte, p5, documentation, jupyterlab, data-store]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
---

# Write a README for a data folder

!!! warning "Draft: not yet validated"
    These steps were followed once in MESA JupyterLab on 2026-11-13, by the person who
    wrote them, except that the rename in step 5 was done from a terminal and the
    preview in step 6 was not seen. Nobody else has yet followed them.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A folder of data without a description is a puzzle for the next person, and in six
months that person is you. A README is a plain text file, kept with the data, that
answers the first questions anyone asks.

**You will:** have a `README.md` in a folder of your Data Store that describes what is
in it.

**Time:** 10 minutes. **You need:** [MESA JupyterLab running](launch-jupyterlab.md),
and a folder of your own to describe, such as `mesa-practice` from the
[practice data](practice-data.md).

## Steps

1. In JupyterLab's file browser, open the folder you want to describe. Click the **+**
   button at the top of the file browser if no **Launcher** tab is open.

    You should see: a **Launcher** tab that names your folder at its top.

2. In the **Launcher**, under **Other**, click **Markdown File**.

    You should see: an empty editor tab named `untitled.md`, and the same file in the
    file browser.

3. Type the description. Five short parts cover most folders:

    ```markdown
    # Practice rain-gauge data

    Synthetic data from the MESA Trainings tutorials. It describes no real place.

    ## Files

    - `gauges.csv`: one row per rain gauge (5 rows)
    - `readings.csv`: one row per gauge and day, July 2026 (152 rows)

    ## Source

    https://idss-mesa.github.io/trainings/tutorials/practice-data/

    ## Notes

    - Orchard (G02) reports in centimetres; the other gauges report in millimetres.
    - Readings flagged `S` were marked suspect by the sensor.

    ## Contact

    Your name, your email address
    ```

    You should see: the headings in bold in the editor.

4. Choose **File → Save Markdown File**.

    You should see: *Saving completed* in the bar at the bottom, and the dot on the tab
    disappear.

5. In the file browser, right-click `untitled.md`, choose **Rename**, and type
   `README.md`.

    You should see: `README.md` in the file browser. By convention that name is the
    one people look for first.

6. Right-click inside the editor and choose **Show Markdown Preview**.

    You should see: the README laid out with headings and bullets, beside the text.

## Check it worked

`README.md` is listed in the folder, in JupyterLab and in the portal's Data Browser,
and a person who has never seen the folder could say from it what each file holds.

## If it didn't

**The folder has both `untitled.md` and `README.md`.** You chose **File → Save Markdown
File As…**, which writes a second copy. Open `README.md` to check it is complete, then
right-click `untitled.md` and choose **Delete**.

## Next

- [Record the software versions a result depends on](record-software-versions.md)
- [Add metadata to a file or folder](add-metadata.md), which makes the same facts
  searchable by tools.
- [Share a folder with a collaborator](share-a-folder.md)
- Reference: [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/).

*Not yet validated by a second person. Drafted 2026-11-13 and followed in MESA JupyterLab that day.*
