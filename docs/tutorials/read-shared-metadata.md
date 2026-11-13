---
type: Guide
title: "Read the metadata on a folder shared with you"
description: "Open the metadata on a folder another CyVerse user has shared with you, in the MESA Portal's quick panel and on its full metadata page."
tags: [byte, p1, portal, data-browser, metadata, sharing]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Read the metadata on a folder shared with you

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have read what a collaborator recorded about a folder, and found when it
was created and who can reach it.

**Time:** 5–10 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md), and a folder that a collaborator has
[shared with you](share-a-folder.md) after [adding metadata](add-metadata.md) to it.
Working in a pair, each of you can do this on the other's folder.

## Steps

1. In the sidebar, click **Data Browser**, then **User Shared**. Open the folder named
   with your collaborator's username.

    You should see: the folder they shared, and **Read only** in the header.

2. Click **AVUs** under the shared folder's name.

    You should see: a panel marked **READ ONLY** that lists each attribute, value, and
    unit, with the note *You can view these AVUs but not change them*.

3. Click **Open full metadata page** at the bottom of the panel.

    You should see: a page headed with the folder's name, the number of AVUs, and
    **Read-only**. The first tab, **Raw AVUs**, shows the same rows as the panel.

4. Click the **DataCite** tab.

    You should see: a form of standard fields for describing a dataset. A field is
    filled where the folder has an attribute of the same name, such as `description`.

5. Click the **iRODS** tab.

    You should see: the folder's path, the dates it was created and last modified,
    and under **Access Control** your own access, **read**.

6. Click **Back**.

    You should see: the Data Browser again.

## Check it worked

You can say, without asking your collaborator, what the folder's `description` is and
on what date the folder was created.

## If it didn't

**The panel says there are no AVUs.** Your collaborator has not added any, or added
them to a different folder. Ask them to check theirs under **My Files**.

**Your collaborator's username is not on the first page of User Shared.** The list
runs to several pages. Click **Next**, or set **Per page** to **100**.

## Next

- [Add metadata to a file or folder](add-metadata.md) of your own.
- Reference: [Managing data, "Describe data with metadata (AVUs)"](https://idss-mesa.github.io/docs/portal/data/#describe-data-with-metadata-avus).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
