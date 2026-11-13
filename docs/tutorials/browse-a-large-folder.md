---
type: Guide
title: "Browse a large folder as a sorted list"
description: "Switch the MESA Portal's Data Browser to a list, page through a folder with many items, and sort what is on the page."
tags: [byte, p1, portal, data-browser]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Browse a large folder as a sorted list

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have paged through a folder of more than a hundred items, and know what
the sort menu does and does not do.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md).

## Steps

1. In the sidebar, click **Data Browser**, then **Shared**.

    You should see: **Shared Data** in the header, and many folders. This is data that
    projects across CyVerse have shared, not only MESA's. Below the last card is a
    line such as *Showing 1–25 of 105 items*.

2. At the right, above the listing, click the second of the two small square buttons.
   Its tooltip is **List View**.

    You should see: one folder to a row. The first button, **Grid View**, puts the
    cards back.

3. Scroll to the bottom and set **Per page** to **50**.

    You should see: fifty rows, and *Showing 1–50*.

4. Click **Next**.

    You should see: *Showing 51–100*, and different folders. **Previous** takes you
    back.

5. Open the sort menu, which reads **Name A–Z**, and choose **Name Z–A**.

    You should see: the rows on this page in reverse order. Only this page is sorted:
    the folder that comes last in the whole listing is still on the last page.

6. Choose **Newest first**.

    You should see: the same rows again, the most recently changed at the top.

## Check it worked

You can say how many items the folder holds, from the *Showing … of …* line, and you
have seen more than the first 25.

## If it didn't

**There is no Next button.** The folder has fewer items than one page holds. Try
**User Shared**, which has more.

**The item you expected first is not first.** Sorting applies to one page at a time.
Set **Per page** to **100** to sort more items together, or
[search by name](search-the-data-browser.md) instead.

## Next

- [Search for a file or folder by name](search-the-data-browser.md), which is faster
  than paging when you know part of the name.
- Reference: [Managing data, "Browse and find files"](https://idss-mesa.github.io/docs/portal/data/#browse-and-find-files).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
