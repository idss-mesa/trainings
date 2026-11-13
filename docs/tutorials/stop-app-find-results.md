---
type: Guide
title: "Stop an app and find your results"
description: "Stop a running MESA app with Save & Exit from the Analyses page and find its results in the Data Browser."
tags: [byte, p1, portal, analyses, results]
status: draft
generated: { by: "claude-code/2.1.224", at: "2026-11-11T00:00:00Z" }
stale_after: "2027-05-11T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/analyses/"
    title: "Managing analyses in the MESA Portal"
    author: "team:idss-mesa"
---

# Stop an app and find your results

!!! warning "Draft: not yet validated"
    This tutorial was written from the MESA documentation. Nobody has yet followed it
    from start to finish on the live portal, so a screen name or a step may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Every app you run is listed in the portal as an *analysis*. A running app counts against
your CPU-hour quota until it stops, so stop the ones you have finished with.

**You will:** have stopped a running app cleanly and found the work you saved.

**Time:** 5 minutes. **You need:** a running app, such as
[MESA JupyterLab](launch-jupyterlab.md), with the work you want to keep already
[saved in your Data Store](save-your-work.md).

## Steps

1. In the portal's sidebar, click **Analyses**.

    You should see: your app under **Running**, on a card with a **VICE** badge and the
    time it has left.

    ![The Analyses page: quota badges, status cards, and running analyses](https://idss-mesa.github.io/docs/assets/portal/analyses-overview.webp)

2. On that card, click **Save & Exit**, and click **OK** when the browser asks you
   to confirm.

    You should see: the card's badge change to **Stopping**, its buttons disappear, and
    the message *Saving outputs and exiting…*. This takes up to a minute, and you do not
    need to click again.

3. Wait for the page to update, then click the **Completed Analyses** heading to open
   that section.

    You should see: your analysis first in the list, with a **Completed** badge and an
    **Output** path.

4. On the completed analysis, click **View Results**.

    You should see: the Data Browser, open on the analysis's output folder. For an
    interactive app such as JupyterLab this folder is empty, and the portal may say
    **Unable to Load Files** and offer a password box. Leave the box empty: nothing is
    wrong, and your work is not kept here.

5. Read the path under the folder's name in the header.

    You should see: a path under your `analyses` folder, unless you chose another output
    folder when you launched:

    ```text
    /iplant/home/<your username>/analyses/<app name and start time>
    ```

6. Click **My Files** and open the folder where you saved your own work.

    You should see: the notebooks and files you saved in your home folder under
    `~/data-store` while the app was running. This is where an interactive app's work
    lives.

## Check it worked

The analysis is listed under **Completed**, and the files you saved are in **My Files**.

## If it didn't

**The analysis is under Canceled, not Completed.** You clicked **Terminate**, which ends
the app at once without saving its outputs. Work you had saved under `~/data-store` is
still in **My Files**; anything else from that session is gone. Click **Relaunch** to
start the app again with the same settings.

## Next

- [Launch MESA JupyterLab with your Data Store mounted](launch-jupyterlab.md), to start
  again
- Reference: [Managing analyses, "Stop an app"](https://idss-mesa.github.io/docs/portal/analyses/#stop-an-app)
  and ["Find the results"](https://idss-mesa.github.io/docs/portal/analyses/#find-the-results),
  which also cover **Extend Time**, **Monitor**, and failed analyses.

*Not yet validated on the live portal. Drafted 2026-11-11 from the MESA documentation.*
