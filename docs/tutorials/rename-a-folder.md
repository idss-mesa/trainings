---
type: Guide
title: "Rename a folder in your Data Store"
description: "Give a folder in your Data Store a clearer name from the MESA Portal's Data Browser, and confirm its path changed with it."
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

# Rename a folder in your Data Store

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them, on a folder. The same menu appears on files, but renaming a file was not
    tried. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have a folder with a new name, and know what else the change affects.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md), and
a folder of your own to rename. [Make a folder](make-a-folder.md) called `draft` if you
have none to spare.

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**.

    You should see: a card for each of your folders, each with a **⋮** button at its
    right-hand end.

2. Click **⋮** on the folder's card.

    You should see: a menu with **Rename**, **Metadata**, **Full Metadata Page**,
    **Share**, and **Trash**.

    ![A card's ⋮ menu: Rename, Metadata, Full Metadata Page, Share, and Trash](https://idss-mesa.github.io/docs/assets/portal/data-card-menu.webp){ width="420" }

3. Click **Rename**.

    You should see: a **Rename** window with a **New name** box. The present name is
    in the box and already selected.

4. Type the new name, for example `rain-2026`. Use lower-case letters, numbers, and
   hyphens.

    You should see: your text replace the old name.

5. Click **Rename**.

    You should see: the notice **Renamed successfully** at the top right, and after a
    few seconds the card under its new name.

6. Click the folder's new name to open it, and read the path under its name in the
   header.

    You should see: the path end in the new name.

## Check it worked

The path in the folder header ends with the name you typed:

```text
/iplant/home/<your username>/rain-2026
```

## If it didn't

**The card still shows the old name.** The listing can lag behind the change. Wait a
few seconds and reload the page.

**There is no ⋮ button, or no Rename in the menu.** The folder is not yours. Click
**My Files** and look there.

## Next

- A rename changes the path. Any notebook or script that reads from the old path must
  be changed to the new one, so rename early, before you write code against a folder.
- [Move folders into another folder](move-folders.md)
- Reference: [Managing data, "Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
