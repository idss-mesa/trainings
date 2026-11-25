---
type: Guide
title: "Add Dublin Core fields to a folder"
description: "Fill in a folder's creator, subject, and rights on the Dublin Core tab of the MESA Portal's full metadata page, and see which fields the portal carries over for you."
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

# Add Dublin Core fields to a folder

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial followed these steps on the live portal
    on 2026-11-24, on a test account, and saw the results shown. It filled in three fields and did not try the others on the form. No person has
    yet followed the page.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Dublin Core is a short, general set of fifteen fields that libraries and catalogues
read. The portal has a form for it. Fields you have already described under another
name are shown for you, so you type only what is missing.

**You will:** have a folder that carries its creator, subject, and rights under Dublin
Core's names.

**Time:** 5 minutes. **You need:** to have finished
[Describe a folder with DataCite fields](describe-with-datacite-fields.md).

## Steps

1. In **Data Browser**, **My Files**, click **AVUs** under the folder's name, then
   **Open full metadata page** at the foot of the panel. Click **Dublin Core**.

    You should see: a form headed **Dublin Core**, with fifteen fields from **Title**
    to **Rights**. **Title**, **Description**, and **Publisher** already show the
    values you saved earlier. The rest are empty.

2. Fill in three fields. For the practice folder:

    | Field | Value |
    |---|---|
    | **Creator** | `MESA Trainings` |
    | **Subject** | `rainfall` |
    | **Rights** | `CC BY 4.0` |

    You should see: your text in the three fields.

3. Scroll back to the top of the form and click **Save**.

    You should see: after several seconds, the count beside the folder's name goes up
    by three; in the example, from **7 AVUs** to **10 AVUs**. When this was tried, the
    count had not changed after six seconds, and showed **10 AVUs** once the page was
    refreshed.

4. Refresh the page and click **Raw AVUs**.

    You should see: your earlier rows and three new ones.

    | Attribute | Value |
    |---|---|
    | `dc.creator` | MESA Trainings |
    | `dc.subject` | rainfall |
    | `dc.rights` | CC BY 4.0 |

## Check it worked

**Raw AVUs** lists three `dc.` rows, and the **Dublin Core** tab shows all six values.
There is no `dc.title`, `dc.description`, or `dc.publisher` row: the form showed those
three from your `datacite.title`, `description`, and `datacite.publisher` rows, and
did not save a second copy.

## If it didn't

**Title, Description, or Publisher is empty.** The form fills them from AVUs you
already have. Add them first with
[Describe a folder with DataCite fields](describe-with-datacite-fields.md), or type
them here.

**There is no Save button, or the fields cannot be edited.** You can read the folder
but not write to it. Use a folder under **My Files**.

## Next

- [Record where and when data was collected, with EML fields](describe-with-eml-fields.md)
- [Tag a folder with an ontology term](tag-with-an-ontology-term.md)
- Reference: [Managing data, "Describe data with metadata (AVUs)"](https://idss-mesa.github.io/docs/portal/data/#describe-data-with-metadata-avus).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-24 and followed once on the live portal that day.*
