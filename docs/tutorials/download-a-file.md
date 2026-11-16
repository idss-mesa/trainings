---
type: Guide
title: "Download a file from your Data Store to your computer"
description: "Save a copy of a file from the MESA Portal Data Browser to your own computer with the card's Download button, and confirm the copy is complete."
tags: [byte, p1, portal, data-browser, download]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Download a file from your Data Store to your computer

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-16, by the AI
    assistant that drafted them. No person has yet followed them, so a screen may
    differ. [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have a copy of one Data Store file on your own computer, and know it is
whole.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md), and
a file in your Data Store, such as `gauges.csv` from the
[practice data](practice-data.md).

## Steps

1. In the sidebar, click **Data Browser**, then **My Files**, and open the folder that
   holds the file.

    You should see: a card for each file, with its name, its size, and a row of small
    buttons at the right.

2. On the file's card, hold the pointer over the button with the downward arrow.

    You should see: the label **Download**.

3. Note the size on the card, then click **Download**.

    You should see: the message *Downloading gauges.csv...* at the top right. The page
    itself does not change.

4. Look at your browser's downloads list.

    You should see: the file, under the name it has in the Data Store. Your browser
    saves it where it saves every download, usually a folder named **Downloads**.

5. Compare the size of the saved file with the size on the card.

    You should see: the same size. For `gauges.csv`:

    ```text
    135 B
    ```

## Check it worked

The saved file opens on your computer, and its size matches the card. `gauges.csv`
begins with the line `gauge_id,name,unit,elevation_m`.

## If it didn't

**A red message reads "Could not download …".** The portal could not fetch the file.
Reload the page, check that you are still signed in, and try again.

**The message appears but no file arrives.** Your browser may have asked whether this
site may download files, or blocked it. Look for a prompt or an icon in the address
bar, and allow it.

**The file is large and nothing seems to happen.** The portal reads the whole file
before your browser saves it, so a large file takes a while with no progress bar. Wait,
and do not click again.

## Next

- [Upload a file from your computer to your Data Store](upload-a-file.md)
- [Look inside a CSV file from the portal](preview-a-table.md), to read a file without
  downloading it.
- Reference: [Managing data](https://idss-mesa.github.io/docs/portal/data/).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16 and followed once on the live portal that day.*
