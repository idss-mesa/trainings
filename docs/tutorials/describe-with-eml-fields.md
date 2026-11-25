---
type: Guide
title: "Record where and when data was collected, with EML fields"
description: "Fill in a folder's place, bounding box, and date range on the EML tab of the MESA Portal's full metadata page, and see the eml. AVUs it saves."
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

# Record where and when data was collected, with EML fields

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial followed these steps on the live portal
    on 2026-11-24, on a test account, and saw the results shown. It filled in seven fields and did not try the others on the form. No person has
    yet followed the page.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A title and a creator do not say where the measurements were taken, or over which
days. The Ecological Metadata Language (EML) has fields for both, and the portal has a
form for them.

**You will:** have a folder that carries the place, the bounding box, and the date
range of its data under EML's names.

**Time:** 5 to 10 minutes. **You need:** to have finished
[Add Dublin Core fields to a folder](describe-with-dublin-core-fields.md), and to know
the outermost points of your data and its first and last dates.

## Steps

1. In **Data Browser**, **My Files**, click **AVUs** under the folder's name, then
   **Open full metadata page** at the foot of the panel. Click **EML**.

    You should see: a form headed **Ecological Metadata Language**. **Title**,
    **Creator**, and **Contact** already show values you saved earlier. The rest are
    empty.

2. In **Geographic Coverage**, describe the place in words. For the practice folder,
   type `Five invented rain-gauge sites`.

    You should see: your text in the field.

3. Fill in the four bounds in decimal degrees. West of Greenwich and south of the
   equator are negative. For the practice folder, the values come from
   `gauge_sites.csv`:

    | Field | Value |
    |---|---|
    | **West Bound** | `-104.7612` |
    | **East Bound** | `-104.7228` |
    | **North Bound** | `47.1287` |
    | **South Bound** | `47.0962` |

    You should see: the four numbers in the fields.

4. Fill in **Begin Date** and **End Date**, as year, month, day. For the daily
   readings in the practice folder, type `2026-07-01` and `2026-07-31`.

    You should see: the two dates in the fields.

5. Scroll back to the top of the form and click **Save**.

    You should see: **Saving metadata…** Then the count beside the folder's name goes
    up by seven; in the example, from **10 AVUs** to **17 AVUs**. When this was tried,
    that took between ten and twenty seconds.

6. Click **Raw AVUs**.

    You should see: your earlier rows and seven new ones.

    | Attribute | Value |
    |---|---|
    | `eml.geographicCoverage` | Five invented rain-gauge sites |
    | `eml.westBoundingCoordinate` | -104.7612 |
    | `eml.eastBoundingCoordinate` | -104.7228 |
    | `eml.northBoundingCoordinate` | 47.1287 |
    | `eml.southBoundingCoordinate` | 47.0962 |
    | `eml.beginDate` | 2026-07-01 |
    | `eml.endDate` | 2026-07-31 |

## Check it worked

After you refresh the page, **Raw AVUs** still lists the seven `eml.` rows, and the
**EML** tab shows your values. Read the bounds back against your data: west is the
smaller longitude, south the smaller latitude.

## If it didn't

**Creator is empty.** When this was tried, the form showed a creator only after one
had been saved on the **Dublin Core** tab. Type it here, or add it there first.

**The count has not changed.** Wait, then refresh the page and look at **Raw AVUs**
again.

**There is no Save button, or the fields cannot be edited.** You can read the folder
but not write to it. Use a folder under **My Files**.

## Next

- [Make a folder's metadata valid Croissant](make-metadata-valid-croissant.md)
- [Say where your input data came from](say-where-data-came-from.md)
- Reference: [Managing data, "Describe data with metadata (AVUs)"](https://idss-mesa.github.io/docs/portal/data/#describe-data-with-metadata-avus).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-24 and followed once on the live portal that day.*
