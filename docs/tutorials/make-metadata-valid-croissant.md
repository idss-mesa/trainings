---
type: Guide
title: "Make a folder's metadata valid Croissant"
description: "Use the Croissant tab of the MESA Portal's full metadata page to see which required properties a folder lacks, add a description and a licence, and reach a valid Croissant document."
tags: [byte, p5, portal, data-browser, metadata]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-24T00:00:00Z" }
stale_after: "2027-05-24T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Make a folder's metadata valid Croissant

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial followed these steps on the live portal
    on 2026-11-24, on a test account, and saw the results shown. It added a description and a licence. It did not describe files or record sets, and did not download the document. No person has
    yet followed the page.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Croissant is a format that describes a dataset so that machine-learning tools can
load it. It has six required properties. The portal checks your folder against them
as you type, and fills in what it can from fields you have already saved.

**You will:** have a folder whose metadata the portal reports as valid Croissant.

**Time:** 5 to 10 minutes. **You need:** to have finished
[Describe a folder with DataCite fields](describe-with-datacite-fields.md).

## Steps

1. In **Data Browser**, **My Files**, click **AVUs** under the folder's name, then
   **Open full metadata page** at the foot of the panel. Click **Croissant**.

    You should see: a panel headed **Croissant** with a red **2 errors** beside it.
    Under your title, **Required properties** reads **4 of 6**. **Validation** lists
    the two that are missing: **description is required** and **license is required**.

2. Click **Dataset** in the row of views under the heading.

    You should see: a form. **Name**, **Date published**, **Creators**, and
    **Publishers** show your values, each marked **From DataCite**.

3. In **Description**, say what the data is. For the practice folder, type
   `Synthetic rain-gauge practice data from the MESA tutorials`.

    You should see: your text in the box. The form does not take this from a
    `description` AVU; you type it again.

4. Scroll down to **License** and click **Add license**. In the field that appears,
   type the address of the licence. For the practice folder, type
   `https://creativecommons.org/licenses/by/4.0/`.

    You should see: the address in the field.

5. Scroll back to the top and click **Overview**.

    You should see: a green **Valid, 1 warning · unsaved** beside the heading, and
    **Required properties** at **6 of 6**. The warning says **distribution is empty**:
    no files are described yet.

6. Click **Save**.

    You should see: the word **unsaved** go, and the count beside the folder's name go
    up by two; in the example, from **17 AVUs** to **19 AVUs**. Allow twenty seconds.

7. Click **Raw AVUs**.

    You should see: two new rows.

    | Attribute | Value |
    |---|---|
    | `croissant.description` | Synthetic rain-gauge practice data from the MESA tutorials |
    | `croissant.license.1` | https://creativecommons.org/licenses/by/4.0/ |

## Check it worked

After you refresh the page, the **Croissant** tab still reads **Valid**, and its
**JSON-LD** view shows the whole document, with your name, description, licence,
creator, publisher, and year. The warning about distribution stays until you describe
the files, which is a separate task.

## If it didn't

**The count of errors or warnings differs.** The panel counts what your folder lacks,
so your numbers may differ. When this was tried, a folder that also had an ontology
term showed one more warning, about keywords.

**It still reads unsaved.** Click **Save** again and wait; then refresh the page.

**There is no Save button, or the fields cannot be edited.** You can read the folder
but not write to it. Use a folder under **My Files**.

## Next

- [Tag a folder with an ontology term](tag-with-an-ontology-term.md)
- [Say where your input data came from](say-where-data-came-from.md)
- Reference: [Managing data, "Describe data with metadata (AVUs)"](https://idss-mesa.github.io/docs/portal/data/#describe-data-with-metadata-avus).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-24 and followed once on the live portal that day.*
