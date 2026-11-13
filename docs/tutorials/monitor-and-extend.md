---
type: Guide
title: "Check on a running app and give it more time"
description: "Read how long a running MESA app has left, look at its logs, and extend its time limit from the Analyses page before it stops."
tags: [byte, p1, portal, analyses, time-limit]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/analyses/"
    title: "Managing analyses in the MESA Portal"
    author: "team:idss-mesa"
---

# Check on a running app and give it more time

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Every interactive app has a time limit. When it runs out the app stops, and anything
not saved under `~/data-store` is lost.

**You will:** know how long your app has left, and have given it more time.

**Time:** 5 minutes. **You need:** a running app, such as
[MESA JupyterLab](launch-jupyterlab.md).

## Steps

1. In the portal's sidebar, click **Analyses**.

    You should see: your app under **Running Analyses**, on a card with a **Running**
    badge.

    ![A running JupyterLab analysis with the Monitor panel open on the Logs tab](https://idss-mesa.github.io/docs/assets/portal/analyses-monitor.webp)

2. Read **Time Remaining** on the card.

    You should see: hours and minutes. With an hour or less left, the **Extend Time**
    button also shows **LOW**.

3. Click **Monitor**.

    You should see: a panel open under the card, on its **Logs** tab, with the app's
    own messages. For JupyterLab the last lines say that the server is running.

4. Type a word such as `error` in the **Filter logs…** box.

    You should see: only the lines that contain it, often none. This is the first
    place to look when an app misbehaves.

5. On the same card, click **Extend Time**, and click **OK** when the browser asks
   you to confirm.

    You should see: the button read **Extending…** for a moment.

6. Read **Time Remaining** again.

    You should see: a longer time, and no **LOW** badge. In our test an app with 59
    minutes left had about 25 hours afterwards.

## Check it worked

**Time Remaining** is longer than it was in step 2.

## If it didn't

**There is no Extend Time button.** It is offered only for running interactive apps,
and not while an app is still starting. Wait for the badge to read **Running**, click
**Refresh**, and look again.

## Next

- An extended app keeps using your CPU hours. When you have finished,
  [stop it](stop-app-find-results.md).
- The panel's **Resources** tab does not yet show live CPU or memory use.
- Reference: [Managing analyses, "Work with a running app"](https://idss-mesa.github.io/docs/portal/analyses/#work-with-a-running-app).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
