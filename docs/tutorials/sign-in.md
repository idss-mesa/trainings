---
type: Guide
title: "Sign in to the MESA Portal with a CyVerse account"
description: "Sign in to the MESA Portal at mesa.cyverse.org with a free CyVerse account and confirm that you reached your dashboard."
tags: [byte, p1, portal, sign-in, cyverse]
status: draft
generated: { by: "claude-code/2.1.224", at: "2026-11-11T00:00:00Z" }
stale_after: "2027-05-11T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/overview/"
    title: "MESA Portal overview"
    author: "team:idss-mesa"
---

# Sign in to the MESA Portal with a CyVerse account

!!! warning "Draft: not yet validated"
    This tutorial was written from the MESA documentation. Nobody has yet followed it
    from start to finish on the live portal, so a screen name or a step may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** be signed in to the MESA Portal, looking at your own dashboard.

**Time:** 5 minutes. **You need:** a web browser and a CyVerse account. If you do not
have one, register free at <https://user.cyverse.org> before you start.

## Steps

1. Open <https://mesa.cyverse.org>.

    You should see: the portal's landing page, with a **Sign in with CyVerse** button and
    a **Create Account** button.

    ![The MESA Portal landing page, with Sign in with CyVerse and Create Account buttons](https://idss-mesa.github.io/docs/assets/portal/portal-landing.webp)

2. Click **Sign in with CyVerse**. **Login** in the top bar does the same thing.

    You should see: the CyVerse sign-in page, which asks for a username and a password.

3. Enter your own CyVerse username and password and submit the form. Type them only on
   the CyVerse sign-in page, never into a notebook, a file, or a chat.

    You should see: the portal again, now on **Home**, your dashboard.

4. Look at the sidebar on the left.

    You should see: under **Data & Apps**, the pages **Data Browser**, **Applications**,
    and **Analyses**.

## Check it worked

**Home** shows four panels: **Recent Analyses**, **Resource Usage**, **My Working
Groups**, and **Quick Actions**. A visitor who is not signed in never sees these.

## If it didn't

**The sidebar lists only Home and Data Browser.** You are still signed out. The portal
lets visitors look at public data without an account, so it can seem to work. Click
**Login** in the top bar and repeat steps 2 and 3.

## Next

- [Find MESA's community data in the Data Browser](find-community-data.md)
- [Launch MESA JupyterLab with your Data Store mounted](launch-jupyterlab.md)
- Reference: [MESA Portal overview, "Sign in"](https://idss-mesa.github.io/docs/portal/overview/#sign-in),
  which also lists what works without signing in.

*Not yet validated on the live portal. Drafted 2026-11-11 from the MESA documentation.*
