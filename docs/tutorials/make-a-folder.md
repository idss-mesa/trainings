---
type: Guide
title: "Make a folder in your Data Store"
description: "Create a folder in your Data Store from the MESA Portal's Data Browser, so that a piece of work has one place to live."
tags: [byte, p1, portal, data-browser, folders]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Make a folder in your Data Store

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have a new, empty folder of your own in your Data Store.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md).

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**.

    You should see: your home folder, with **Upload**, **New File**, and **New Folder**
    buttons above the listing.

2. Click **New Folder**.

    You should see: a **Create New Folder** window with a **Folder name** box.

3. Type a name. Use lower-case letters, numbers, and hyphens, for example
   `mesa-practice`.

    You should see: the name in the box. The window allows spaces, but a name without
    them is easier to type in a notebook or a terminal later.

4. Click **Create**.

    You should see: the button read **Creating…**. This can take ten to fifteen
    seconds; do not click again.

5. Wait for the listing to refresh, then click the new folder's name.

    You should see: the folder open and empty, with its name in the dark header band
    and **Owner** as your access.

6. Read the path under the folder's name.

    You should see:

    ```text
    /iplant/home/<your username>/mesa-practice
    ```

## Check it worked

Click **My Files**. The new folder is listed with your other folders. Inside a MESA app
it is at `~/data-store/home/<your username>/mesa-practice`.

## If it didn't

**There is no New Folder button.** You are in a folder you cannot write to, such as
**Community**, or you are signed out. Click **My Files** and look again; if the sidebar
shows only **Home** and **Data Browser**, [sign in](sign-in.md) first.

## Next

- [Share a folder with a collaborator](share-a-folder.md)
- [Add metadata to a file or folder](add-metadata.md)
- Reference: [Managing data, "Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
