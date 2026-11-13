---
type: Guide
title: "Search for a file or folder by name"
description: "Find files and folders by name with the MESA Portal's Data Browser search, narrow the results, and open the folder a result lives in."
tags: [byte, p1, portal, data-browser, search]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Search for a file or folder by name

!!! warning "Draft: not yet validated"
    These steps were followed once on the live portal on 2026-11-13, by the person who
    wrote them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Search looks through the folder you are in and every folder below it, so where you
stand decides what you find.

**You will:** have found a folder in MESA's community data by typing part of its name.

**Time:** 5 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md).

## Steps

1. In the sidebar, click **Data Browser**, then **Community**.

    You should see: **MESA Community** in the header, and a **Search files and
    folders…** box above the listing.

2. Click in the search box and type `lakehouse`. You do not need to press
   ++enter++.

    You should see: after a few seconds, the header change to **Search results in MESA
    Community**, and a line that begins *Found … results for "lakehouse"*.

    ![Search results for "plot" in the SRER folder](https://idss-mesa.github.io/docs/assets/portal/data-search.webp)

3. Look at one result.

    You should see: its name, and under the name its full path. The path tells you
    which folder it is in.

4. In the menu at the right of the search box, choose **Folders**.

    You should see: only folders in the results. **Files** does the opposite, and
    **All** shows both.

5. Click the name of a folder in the results.

    You should see: that folder open, with its trail in the header.

6. Go back to the results with your browser's back button, then click **Clear
   search**.

    You should see: the ordinary listing of the folder you searched from.

## Check it worked

You reached a folder by typing part of its name, without clicking down through the
folders above it.

## If it didn't

**"No results found" for something you know is there.** Two causes are common. You are
searching from a folder that does not contain it: click **My Files** or **Community**
and search again from the top. Or the item is new: in our test, files created within
the previous day were not yet found by search. Browse to those instead.

## Next

- [Find MESA's community data in the Data Browser](find-community-data.md)
- Reference: [Managing data, "Search"](https://idss-mesa.github.io/docs/portal/data/#search).

*Not yet validated by a second person. Drafted 2026-11-13 and followed once on the live portal that day.*
