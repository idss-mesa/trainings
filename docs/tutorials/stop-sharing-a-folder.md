---
type: Guide
title: "Stop sharing a folder"
description: "Take away a collaborator's access to a folder in your Data Store from the MESA Portal's share dialog, and confirm the folder is private again."
tags: [byte, p1, portal, data-browser, sharing]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Stop sharing a folder

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them. The browser used for the test could not show the confirmation box in step 4, so it was accepted automatically; its wording is as the portal sends it. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have removed one person's access to a folder, and seen the folder marked
private again.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md), and a folder you have
[shared with a collaborator](share-a-folder.md).

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**, and open the shared
   folder.

    You should see: **Shared · 1** in the folder header, or a higher number if you
    shared it with more people.

2. Click **Share** in the folder header.

    You should see: the share dialog. Under **Current Permissions** are you, as
    **OWNER**, and each person you shared with, with their access level and a
    **Remove** button.

3. Click **Remove** beside the person's name.

    You should see: your browser ask *Remove access for …?*, naming the person and
    the folder.

4. Click **OK**.

    You should see: *Updating access…* for up to half a minute, then the person gone
    from the list. If nobody else has access, the list says *Not shared with anyone
    else*.

5. Click **Close** and look at the folder header.

    You should see: **Private** where it said **Shared · 1**.

## Check it worked

Ask the person to open **User Shared** and the folder named with your username. The
folder you stopped sharing is no longer listed there.

## If it didn't

**The header still says Shared.** Someone else still has access, or one of the two
**Public Access** boxes in the dialog is ticked. Open the dialog again and look at
both.

## Next

- The two **Public Access** boxes are different from sharing with a named person.
  **All CyVerse Users** lets every CyVerse account read the folder. **Anyone without
  login** lets anyone on the internet read it and find it by browsing your home folder
  on data.cyverse.org. Leave both unticked unless you mean to publish.
- Removing access does not take back copies. Anything the person already downloaded
  or copied stays with them.
- Reference: [Managing data, "Share data"](https://idss-mesa.github.io/docs/portal/data/#share-data).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
