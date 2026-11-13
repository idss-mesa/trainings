---
type: Guide
title: "Check your CPU hours and storage"
description: "Find how many CPU hours and how much Data Store space your CyVerse plan allows, and how much you have used, in the MESA Portal."
tags: [byte, p1, portal, account, quotas]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/overview/"
    title: "The MESA Portal overview"
    author: "team:idss-mesa"
---

# Check your CPU hours and storage

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** know your plan's limits for computing time and storage, and how much of
each is left.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md).

## Steps

1. In the sidebar, click **Home**.

    You should see: your dashboard, with a **Resource Usage** panel that carries the
    name of your plan, for example **BASIC**.

2. Read the **CPU Hours** line.

    You should see: hours used and hours allowed, for example *0.0 hours / 200.0
    hours*, and the share used as a percentage. A running app uses
    CPU hours for as long as it runs.

3. Read the **Data Storage** line.

    You should see: space used and space allowed, for example *0.00 B / 5.00 GB*.
    This is the space your files take in the Data Store.

4. In the sidebar, click **Analyses**.

    You should see: the same two figures in the page header, as *hours left* and as
    storage used.

5. Hold the pointer over each figure.

    You should see: a tooltip with the share used, such as *CPU hours remaining (0.0%
    used)*.

## Check it worked

You can state your plan's two limits and what is left of each. On a new Basic plan
they read:

```text
200.0 hours left
0.00 B / 5.00 GB
```

## If it didn't

**Your profile page says "Resource usage data is not available".** That panel, under
your name at the top right, was empty on the day this was written. Use **Home** or
**Analyses** instead.

**The figures have not moved after you ran an app.** They may not be updated the moment
an app stops. Look again later.

## Next

- [Stop an app and find your results](stop-app-find-results.md): an app left running
  keeps using CPU hours.
- [Launch an app with the cores, memory, and time you choose](launch-with-options.md)
- Reference: [The MESA Portal overview](https://idss-mesa.github.io/docs/portal/overview/).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
