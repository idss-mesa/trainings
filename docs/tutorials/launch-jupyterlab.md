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
    These steps were followed on the live portal on 2026-11-13, on a newly created
    account, by the person who wrote them. Nobody else has yet followed them, so a
    screen may differ.
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

3. Wait. Starting usually takes half a minute to three minutes.

    You should see: the launch page replaced by JupyterLab, with a file browser on the
    left and a **Launcher** tab in the middle. The first time, a small box at the bottom
    right asks whether you want Jupyter news; click **No**.

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

    You should see: two folders.

    ```text
    data  home
    ```

    Your own files are inside `home`, in a folder named after your CyVerse username.
    `home` also holds `shared`, which is data that projects have shared.

## Check it worked

The `ls` command in step 5 lists `data` and `home`. An error such as `No such file or directory`,
or no output at all, means the Data Store is not mounted.

## If it didn't

**No new tab opened, and a Launching Application window appeared on the page.** Your
browser blocked the tab, so the portal shows the same progress in that window. Wait
for it to read **Application Ready**, then click **Open MESA JupyterLab**. If you
closed the window, click **Analyses** in the sidebar and **Open App** on the running
analysis.

**The window reads Launch Failed, with `ERR_PERMISSION_NEEDED`.** A new CyVerse account
must ask once for access to interactive apps. Ignore the advice to stop a running
analysis. Click **Open in Discovery Environment**, then **Request Access**, and send
the form. CyVerse says it answers within one to two days. Then launch again.

## Next

- [Launch an app with the cores, memory, and time you choose](launch-with-options.md)
- [Save your work where it survives the session](save-your-work.md). Do this before you
  write anything you want to keep.
- [Stop an app and find your results](stop-app-find-results.md)
- Reference: [Starting applications](https://idss-mesa.github.io/docs/portal/applications/)
  for **Launch with Options** (CPU cores, memory, time limit, GPU), and
  [MESA JupyterLab](https://idss-mesa.github.io/docs/apps/jupyterlab/) for what the app
  contains.

*Not yet validated by a second person. Drafted 2026-11-11 from the MESA documentation and followed once on the live portal on 2026-11-13.*
