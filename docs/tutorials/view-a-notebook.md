---
type: Guide
title: "Read a notebook in the portal without starting an app"
description: "Open a saved Jupyter notebook in the MESA Portal's Notebook Viewer to read its code and saved output, without launching JupyterLab."
tags: [byte, p1, portal, data-browser, notebook]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Read a notebook in the portal without starting an app

!!! warning "Draft: not yet validated"
    The viewer was opened once on the live portal on 2026-11-13, by the person who
    wrote these steps. The browser used for the test blocks new tabs, so the viewer
    was opened at its address, not with the **View** button.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Starting JupyterLab takes a minute and uses CPU hours. To read a notebook, you do not
need it: the portal shows the code and the output that was saved with it.

**You will:** have read a saved notebook, with its output, in the portal.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md),
and a notebook in your Data Store, such as `first-notebook.ipynb` from
[Save your work](save-your-work.md).

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**. Open the folder that
   holds the notebook, if it is in one.

    You should see: a card for the notebook, with `.ipynb` under its name and a green
    **View** button.

2. Click **View**.

    You should see: a new browser tab named `first-notebook.ipynb - Notebook Viewer`.
    Under the notebook's name it says **Jupyter Notebook** and how many cells there
    are.

3. Read down the page.

    You should see: each cell's code beside a label such as `In [1]:`, and under it
    the output that cell gave when the notebook was last saved. For
    `first-notebook.ipynb`:

    ```text
    saved in my Data Store
    ```

4. Close the tab.

    You should see: the Data Browser tab, as you left it.

## Check it worked

You read the notebook's output, and the **Analyses** page shows no new running app.
The viewer only displays the file. It runs nothing and changes nothing.

## If it didn't

**No tab opened.** Your browser blocked the pop-up. Allow pop-ups for
`mesa.cyverse.org` and click **View** again.

**A cell has no output under it.** The notebook was saved before that cell was run.
The viewer shows what is in the file; it cannot run a cell. Open the notebook in
[MESA JupyterLab](launch-jupyterlab.md), run it, and save.

**A card has no View button.** The portal has no viewer for that kind of file. A
Python script (`.py`) is one example.

## Next

- Images open the same way. **View** on a `.png` opens the Image Viewer, which shows
  the picture with its size in pixels and zoom buttons.
- [Look inside a CSV file from the portal](preview-a-table.md)
- Reference: [Managing data, "View files in the browser"](https://idss-mesa.github.io/docs/portal/data/#view-files-in-the-browser).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
