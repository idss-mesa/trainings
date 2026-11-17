---
type: Guide
title: "Keep a command running in MESA Cloud Shell after you close the tab"
description: "Start a slow command in MESA Cloud Shell, open a second terminal window beside it, close the browser tab, and come back from the Analyses page to find the command still running."
tags: [byte, p1, cloud-shell, terminal, tmux]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-17T00:00:00Z" }
stale_after: "2027-05-17T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/apps/cli/"
    title: "MESA CLI (Cloud Shell)"
    author: "team:idss-mesa"
  - id: tmux
    resource: "https://github.com/tmux/tmux/wiki/Getting-Started"
    title: "Getting Started (tmux wiki)"
    author: "team:tmux"
---

# Keep a command running in MESA Cloud Shell after you close the tab

!!! warning "Draft: not yet validated"
    These steps were followed once in the app on 2026-11-17, by the AI assistant that
    drafted them, with a longer loop and by leaving the page, not closing the tab. No
    person has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A download or a conversion can take longer than you want to watch. The Cloud Shell
terminal runs inside a program called `tmux`, which keeps your session going on the
server whether or not a browser tab is showing it.

**You will:** have left a running command, closed the tab, and come back to find it
further along.

**Time:** 10 minutes. **You need:** MESA Cloud Shell running, as in
[Download a file from the web into your Data Store with MESA Cloud Shell](cloud-shell-download.md).

## Steps

1. Click in the terminal and start a command that takes five minutes. This one counts
   to 60, one step every five seconds:

    ```bash
    for i in $(seq 1 60); do echo "step $i"; sleep 5; done
    ```

    You should see: `step 1`, then a new line every five seconds.

2. Press ++ctrl+b++, let go, then press ++c++.

    You should see: an empty terminal with a new prompt, which begins `(geospatial)`.
    The counter is out of sight, in the first window. This is a second window of the
    same session.

3. List the windows:

    ```bash
    tmux list-windows
    ```

    You should see: two lines, numbered `0` and `1`, with `(active)` at the end of
    the one you are in.

    ```text
    0: bash- (1 panes) [160x63] [layout bbfd,160x63,0,0,0] @0
    1: bash* (1 panes) [160x63] [layout bbfe,160x63,0,0,1] @1 (active)
    ```

    The numbers in square brackets depend on the size of your browser window.

4. Close the browser tab that holds the terminal. Wait a minute.

    You should see: the portal's tab, if you still have it open. Nothing in the app
    has been stopped.

5. In the portal, click **Analyses**, and on the **MESA Cloud Shell** card click
   **Open App**.

    You should see: the terminal again, on the window you left: the `tmux
    list-windows` lines are still there.

6. Press ++ctrl+b++, let go, then press ++0++.

    You should see: the counter, a dozen or more steps further on than when you left
    it. It ran while no tab was open.

7. Press ++ctrl+b++, then ++1++, to go back to the second window. Type `exit` and
   press ++enter++.

    You should see: the first window again. The second one is closed; the counter
    stops by itself at `step 60`.

## Check it worked

The counter in window `0` shows a higher step after step 6 than it did before you
closed the tab, with no step missing in between.

## If it didn't

**A `c` or a `0` appears at the prompt and nothing else happens.** `tmux` did not
take the two keys as one command. Delete the character, press ++ctrl+b++, release
both keys, then press the second key by itself.

**There is no MESA Cloud Shell card with Open App.** The app has stopped: it reached
its time limit, or someone stopped it. A stopped app takes its session with it. Start
the app again, and see
[Check on a running app and give it more time](monitor-and-extend.md).

## Next

- `tmux` keeps a command running only while the app runs. For work that takes hours,
  [launch the app with a longer time limit](launch-with-options.md).
- Anything the command writes should go under `~/data-store`. The rest of the app is
  deleted when it stops.
- [Stop an app and find your results](stop-app-find-results.md)
- Reference: [MESA CLI (Cloud Shell), "First steps"](https://idss-mesa.github.io/docs/apps/cli/#first-steps),
  for splitting a window in two.

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-17 and followed once in the app that day.*
