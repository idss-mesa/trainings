---
type: Guide
title: "Ask CyVerse for access to interactive apps"
description: "Send the one-time request that lets a new CyVerse account start MESA JupyterLab and the other interactive apps, and know when it has been granted."
tags: [byte, p1, portal, account, applications]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/applications/"
    title: "Starting applications in the MESA Portal"
    author: "team:idss-mesa"
  - id: de-source
    resource: "https://github.com/cyverse-de/sonora/blob/main/public/static/locales/en/vice.json"
    title: "CyVerse Discovery Environment: wording of the access request"
    author: "org:cyverse"
---

# Ask CyVerse for access to interactive apps

!!! warning "Draft: not yet validated"
    Steps 1 and 2 were seen on the live portal on 2026-11-13, on a newly created
    account. Steps 3 to 6 were written from the public source code of the CyVerse
    Discovery Environment: the form was not sent while drafting, so its wording or
    layout may differ. [Tell us what you
    find](https://github.com/idss-mesa/trainings/issues).

**You will:** have asked CyVerse, once, to let your account start interactive apps, and
know how to tell when it has said yes.

**Time:** 5 minutes, then a wait of one to two days. **You need:** to be
[signed in to the MESA Portal](sign-in.md). Do this at least two days before you need
an app.

## Steps

1. In the portal's sidebar, click **Applications**. On the **MESA JupyterLab** card,
   click **Instant Launch**.

    You should see: a **Launching Application** window that reads **Launch Failed**,
    with `ERR_PERMISSION_NEEDED`. If the app starts instead, your account already has
    access: [stop the app](stop-app-find-results.md) and skip the rest.

2. Click **Open in Discovery Environment**. If CyVerse asks you to sign in, use the
   same account.

    You should see: the app's launch page in the CyVerse Discovery Environment, with a
    notice that begins *Please submit this one-time form* and a **Request Access**
    button.

3. Click **Request Access**.

    You should see: a window titled **Request access to VICE apps**, with one box,
    **Briefly describe your science use-case**. VICE is CyVerse's name for interactive
    apps.

4. In the box, say in a sentence or two what you will use the apps for: your
   institution, your project, and that you work through MESA.

    You should see: your text in the box. Write nothing private. People at CyVerse
    read it.

5. Click **Submit**.

    You should see: the window close and the message *Your request is submitted. You
    will be notified when there is an update.*

6. Wait. CyVerse says it answers within one to two days, and longer if it needs to
   know more about your work. Then repeat step 1.

    You should see: the app start.

## Check it worked

Until CyVerse answers, the Discovery Environment shows this when you open an
interactive app there:

```text
VICE Access Request Pending Review
```

Once access is granted, **Instant Launch** in the portal starts the app. Continue with
[Launch MESA JupyterLab with your Data Store mounted](launch-jupyterlab.md).

## If it didn't

**The window says to stop a running analysis.** On a new account nothing is running.
Ignore that advice and go on to step 2.

**Submit does nothing, and the box reads "Must be at least … characters".** Your
description is too short. Add a sentence.

**You see "Unable to submit your request. Please try again."** Click **Submit** again.
If it fails a second time, wait an hour.

**Two working days have passed and the app still fails.** Tell CyVerse support and, if
you are preparing for a session, the person who runs it. Do not send the form again:
it is sent once per account.

## Next

- [Launch MESA JupyterLab with your Data Store mounted](launch-jupyterlab.md)
- [Check your CPU hours and storage](check-your-usage.md)
- Reference: [Starting applications](https://idss-mesa.github.io/docs/portal/applications/).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the failed launch was seen on the live portal on 2026-11-13, and the request form was not sent.*
