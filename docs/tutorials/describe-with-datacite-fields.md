---
type: Guide
title: "Describe a folder with DataCite fields"
description: "Fill in a folder's title, publisher, year, type, and creator on the MESA Portal's full metadata page, and see the standard-named AVUs it saves."
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

# Describe a folder with DataCite fields

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial followed these steps on the live portal
    on 2026-11-24, on a test account, and saw the results shown. It filled in five
    fields and did not try the others on the form. No person has yet followed the page.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

An attribute you name yourself, such as `description`, means what you say it means.
DataCite is a standard set of fields for describing a dataset: title, creator,
publisher, year, type. The portal has a form for them, and saves each as an AVU with a
standard name that other people and tools can recognise.

**You will:** have a folder that carries its title, creator, publisher, year, and type
under DataCite's names.

**Time:** 5 to 10 minutes. **You need:** to have finished
[Add metadata to a file or folder](add-metadata.md), so that your folder has a
`description`.

## Steps

1. In **Data Browser**, **My Files**, click **AVUs** under the folder's name, then
   **Open full metadata page** at the foot of the panel.

    You should see: a page headed with the folder's name and a row of tabs that starts
    **Raw AVUs**, **DataCite**, **Dublin Core**, **EML**.

2. Click **DataCite**.

    You should see: a form headed **DataCite Schema**. **Description** already shows
    the `description` you added earlier; the other fields are empty.

3. Fill in four fields. For the practice folder:

    | Field | Value |
    |---|---|
    | **Title** | `MESA practice data: five invented rain gauges` |
    | **Publisher** | `MESA Trainings` |
    | **Publication Year** | `2026` |
    | **Resource Type General** | `Dataset` |

    You should see: your text in the four fields. Leave **Identifier (DOI)** empty
    unless the data already has one.

4. Scroll down to **Creators** and click **Add Creator**.

    You should see: **Creator #1**, with fields for **Name**, **ORCID**, and
    **Affiliation**. Only the name is marked as required.

5. Type the creator's name. For a person, the field suggests family name first:
   `Last, First`. For the practice folder, type `MESA Trainings`.

    You should see: the name in the field.

6. Scroll back to the top of the form and click **Save**.

    You should see: **Saving metadata…** for a few seconds. Then the count beside the
    folder's name goes up by five; in the example, from **2 AVUs** to **7 AVUs**.

7. Click **Raw AVUs**.

    You should see: your earlier rows and five new ones.

    | Attribute | Value |
    |---|---|
    | `datacite.title` | MESA practice data: five invented rain gauges |
    | `datacite.publisher` | MESA Trainings |
    | `datacite.publicationYear` | 2026 |
    | `datacite.resourceTypeGeneral` | Dataset |
    | `datacite.creator.1.name` | MESA Trainings |

## Check it worked

After you refresh the page, **Raw AVUs** still lists the five `datacite.` rows, and the
**DataCite** tab shows your values. Your `description` row is unchanged: the form
showed it, and did not save a second copy under a DataCite name.

## If it didn't

**There is no Save button, or the fields cannot be edited.** You can read the folder
but not write to it. Use a folder under **My Files**.

**The count has not changed.** Saving took several seconds when this was tried. Wait,
then refresh the page and look at **Raw AVUs** again.

## Next

- [Add Dublin Core fields to a folder](describe-with-dublin-core-fields.md)
- [Say where your input data came from](say-where-data-came-from.md)
- [Read the metadata on a folder shared with you](read-shared-metadata.md)
- Reference: [Managing data, "Describe data with metadata (AVUs)"](https://idss-mesa.github.io/docs/portal/data/#describe-data-with-metadata-avus).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-24 and followed once on the live portal that day.*
