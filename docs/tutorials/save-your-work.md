---
type: Guide
title: "Save your work where it survives the session"
description: "Save a notebook inside your Data Store from MESA JupyterLab and confirm from the MESA Portal that it will outlive the app."
tags: [byte, p1, jupyterlab, data-store, saving]
status: draft
generated: { by: "claude-code/2.1.224", at: "2026-11-11T00:00:00Z" }
stale_after: "2027-05-11T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps (Your Data Store inside the app)"
    author: "team:idss-mesa"
  - id: docs-data
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Save your work where it survives the session

!!! warning "Draft: not yet validated"
    This tutorial was written from the MESA documentation. Nobody has yet followed it
    from start to finish on the live portal, so a screen name or a step may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A MESA app runs in a temporary container. When the app ends, everything in it is
deleted except what sits under `~/data-store`, which is your CyVerse Data Store.

**You will:** have a notebook saved in your Data Store, and have seen it from the portal.

**Time:** 5 to 10 minutes. **You need:** [MESA JupyterLab running](launch-jupyterlab.md).

## Steps

1. In JupyterLab, look at the file browser on the left.

    You should see: the contents of `~/data-store`, the folder the app opens in: two
    folders, `data` and `home`.

2. In the file browser, double-click **home**, then the folder named after your
   CyVerse username. That folder is your Data Store home folder.

    You should see: the same files and folders that **My Files** shows in the portal's
    Data Browser. In a new account it may be nearly empty.

3. Choose **File → New → Notebook**. In the **Select Kernel** box, change the
   choice to **Python 3 (ipykernel)** (it starts on another language) and click **Select**.

    You should see: a new tab named `Untitled.ipynb`.

4. Choose **File → Rename Notebook…** and name it `first-notebook.ipynb`.

    You should see: the new name on the tab and in the file browser.

5. Type this into the first cell and press ++shift+enter++, then choose
   **File → Save Notebook**:

    ```python
    print("saved in my Data Store")
    ```

    You should see: `saved in my Data Store` printed under the cell.

6. Go back to the portal's browser tab. Click **Data Browser**, then **My Files**.

    You should see: `first-notebook.ipynb` in the listing. A new file can take a few
    seconds to appear; refresh the page if it is not there yet.

## Check it worked

`first-notebook.ipynb` is listed under **My Files** in the portal. The Data Browser
reads the Data Store directly, not the running app, so a file you can see there is kept
when the app ends.

## If it didn't

**The notebook is in JupyterLab but never appears in My Files.** It was saved outside
your home folder in the Data Store. Find it in JupyterLab's file browser, drag it into
your home folder (step 2), and check **My Files** again. The same applies to anything a
terminal wrote to `~`, `~/work`, or `/tmp`: move it under `~/data-store` before you stop
the app.

## Next

- [Stop an app and find your results](stop-app-find-results.md)
- Reference: [Your Data Store inside the app](https://idss-mesa.github.io/docs/apps/agents/#your-data-store-inside-the-app)
  and [Managing data, "Data in the apps"](https://idss-mesa.github.io/docs/portal/data/#data-in-the-apps).

*Not yet validated on the live portal. Drafted 2026-11-11 from the MESA documentation.*
