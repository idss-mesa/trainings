---
type: Guide
title: "Move a folder to the trash and get it back"
description: "Move a folder to your Data Store trash from the MESA Portal, then restore it from the trash in the CyVerse Discovery Environment."
tags: [byte, p1, portal, data-browser, folders, discovery-environment]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Move a folder to the trash and get it back

!!! warning "Draft: not yet validated"
    These steps were followed once on 2026-11-13, by the person who wrote them, on a
    folder and then on a file. The browser used for the test could not show the
    confirmation box in step 3, so it was accepted automatically; its wording is as
    the portal sends it.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have put a folder in the trash, and brought it back.

**Time:** 10 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md),
and a folder of your own that you can afford to lose. [Make one](make-a-folder.md)
called `old-notes`.

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**.

    You should see: a card for each folder, with a **⋮** button at its right-hand end.

2. Click **⋮** on `old-notes`, then **Trash**.

    You should see: your browser ask *Move "old-notes" to trash?*

3. Click **OK**.

    You should see: the notice *"old-notes" moved to trash — it will disappear
    shortly*, and the card turn grey and read **Deleting…**.

4. Wait half a minute and reload the page.

    You should see: no `old-notes` card. The folder is in the trash, not destroyed.

5. The portal has no view of the trash. Open the Discovery Environment at
   <https://de.cyverse.org/data> in a new tab. It uses the same CyVerse account.

    You should see: the Discovery Environment's **Data** page, with a button near the
    top left that carries your username.

6. Click that button and choose **Trash**.

    You should see: one row for the folder, named `old-notes` followed by a dot and a
    few random characters.

7. Tick the box on that row. Then click the **Trash** button at the top right and
   choose **Restore**.

    You should see: the notice *Restoring requested item(s)*.

8. Go back to the MESA Portal tab, wait a minute, and reload **My Files**.

    You should see: `old-notes` again, under its original name.

## Check it worked

`old-notes` is listed in **My Files** with the name and path it had before you
trashed it.

## If it didn't

**The grey card does not go away.** It stays until the page is reloaded. Reload.

**The folder is not back yet.** Restoring is not instant. Wait another minute and
reload. For a minute or so after it returns, moving it can fail with `ERR_CONFLICT`;
wait and try again.

## Next

- In the Discovery Environment's Trash, **Delete** and **Empty Trash** destroy items
  for good. Use them only when you are sure.
- A file goes to the trash and comes back the same way. On the test, a trashed
  file's card left the listing by itself after a few seconds, and the file was back
  half a minute after **Restore**.
- To trash several items at once, tick their boxes and click **Trash** in the
  toolbar: see [Move folders into another folder](move-folders.md) for the toolbar.
- Reference: [Managing data, "Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
