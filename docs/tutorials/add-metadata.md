---
type: Guide
title: "Add metadata to a file or folder"
description: "Describe a folder in your Data Store with an attribute and a value from the MESA Portal's Data Browser, and confirm the description was saved."
tags: [byte, p5, portal, data-browser, metadata]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Add metadata to a file or folder

!!! warning "Draft: not yet validated"
    These steps were followed on the live portal on 2026-11-13, on a newly created
    account, by the person who wrote them. Nobody else has yet followed them, so a
    screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The Data Store keeps metadata as *AVUs*: an attribute, a value, and an optional unit.
"Elevation, 512, m" is one AVU. Metadata stays attached to the file or folder, so it
reaches whoever you share the data with, and AI agents using the MESA tools can read it.

**You will:** have a folder that says, in its own metadata, what it contains.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md),
and a folder of your own in **My Files**, such as the `mesa-practice` folder from the
[practice data](practice-data.md).

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**.

    You should see: a card for each of your files and folders, each with a small
    **AVUs** button under its name.

2. Click **AVUs** under the folder's name.

    You should see: a panel listing the folder's AVUs. For a folder you have just
    made it says *No AVUs yet*.

    ![The AVU panel for data.csv, with editable attribute, value, and unit fields](https://idss-mesa.github.io/docs/assets/portal/data-avus.webp){ width="560" }

3. Click **Add row**.

    You should see: an empty row with three fields: attribute, value, and unit.

4. Type `description` as the attribute and a short sentence as the value, for example
   `Synthetic rain-gauge practice data from the MESA tutorials`. Leave the unit empty.

    You should see: your text in the two fields.

5. Click **Add row** again and enter `contact` with your name as the value.

    You should see: two rows.

6. Click **Save**.

    You should see: **Saved.** in the panel, with both rows still listed.

7. Refresh the page and click **AVUs** on the folder again.

    You should see: both rows, as you typed them.

## Check it worked

After a page refresh, the folder's AVU panel still lists `description` and `contact`
with your values.

## If it didn't

**The fields cannot be edited, or there is no Add row.** You can read the folder but
not write to it. Open the folder and read its header: you need **Owner** or **Can
edit**, not **Read only**. Use a folder under **My Files**.

## Next

- [Share a folder with a collaborator](share-a-folder.md)
- Reference: [Managing data, "Describe data with metadata (AVUs)"](https://idss-mesa.github.io/docs/portal/data/#describe-data-with-metadata-avus),
  which covers reserved attribute names and the full metadata page with its DataCite,
  Dublin Core, and EML views.

*Not yet validated by a second person. Drafted 2026-11-12 from the MESA documentation and followed once on the live portal on 2026-11-13.*
