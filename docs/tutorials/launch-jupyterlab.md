---
type: Guide
title: "Launch MESA JupyterLab with your Data Store mounted"
description: "Start the MESA JupyterLab app from the MESA Portal and confirm that your CyVerse Data Store is available inside it."
tags: [byte, p1, applications, jupyterlab, data-store]
status: draft
generated: { by: "claude-code/2.1.224", at: "2026-11-11T00:00:00Z" }
stale_after: "2027-05-11T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/applications/"
    title: "Starting applications in the MESA Portal"
    author: "team:idss-mesa"
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
---

# Launch MESA JupyterLab with your Data Store mounted

!!! warning "Draft: not yet validated"
    This tutorial was written from the MESA documentation. Nobody has yet followed it
    from start to finish on the live portal, so a screen name or a step may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have JupyterLab running in a browser tab, with your CyVerse Data Store
files available inside it.

**Time:** 5 to 10 minutes, most of it waiting for the app to start. **You need:** to be
[signed in to the MESA Portal](sign-in.md).

## Steps

1. In the portal's sidebar, click **Applications**.

    You should see: the **MESA Apps** tab, with a card for each MESA app. One of them is
    **MESA JupyterLab**.

    ![The MESA Apps tab: MESA JupyterLab, MESA Cloud Shell, MESA RStudio Geospatial, MESA VS Code, and MESA KASM Ubuntu Desktop](https://idss-mesa.github.io/docs/assets/portal/apps-mesa-apps.webp)

2. On the **MESA JupyterLab** card, click **Instant Launch**.

    You should see: a new browser tab with a launch page that steps through
    **Submitting**, **Queued**, **Container Starting**, **Initializing**, and **Running**.

3. Wait. Starting usually takes one to three minutes.

    You should see: the launch page replaced by JupyterLab, with a file browser on the
    left and a **Launcher** tab in the middle.

4. In the **Launcher**, click **Terminal**, then run:

    ```bash
    pwd
    ```

    You should see:

    ```text
    /home/jovyan/data-store
    ```

    The app opens inside `~/data-store`, which is where your Data Store is mounted.

5. In the same terminal, run:

    ```bash
    ls ~/data-store
    ```

    You should see: one or more folder names.

## Check it worked

The `ls` command in step 5 lists folders. An error such as `No such file or directory`,
or no output at all, means the Data Store is not mounted.

## If it didn't

**The launch page reaches Running, but JupyterLab never opens.** Your browser blocked the
new tab. Allow pop-ups for `mesa.cyverse.org`, then click **Analyses** in the portal's
sidebar and click **Open App** on the running analysis.

## Next

- [Save your work where it survives the session](save-your-work.md). Do this before you
  write anything you want to keep.
- [Stop an app and find your results](stop-app-find-results.md)
- Reference: [Starting applications](https://idss-mesa.github.io/docs/portal/applications/)
  for **Launch with Options** (CPU cores, memory, time limit, GPU), and
  [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/) for what the app
  contains.

*Not yet validated on the live portal. Drafted 2026-11-11 from the MESA documentation.*
