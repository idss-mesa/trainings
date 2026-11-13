---
type: Guide
title: "Find MESA's community data in the Data Browser"
description: "Open the MESA community folder in the portal's Data Browser, confirm where you are from the folder header, and copy a folder's path."
tags: [byte, p1, portal, data-browser, community-data]
status: draft
generated: { by: "claude-code/2.1.224", at: "2026-11-11T00:00:00Z" }
stale_after: "2027-05-11T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Find MESA's community data in the Data Browser

!!! warning "Draft: not yet validated"
    This tutorial was written from the MESA documentation. Nobody has yet followed it
    from start to finish on the live portal, so a screen name or a step may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** have the MESA community folder open and the path of one of its folders
copied, ready to paste into a notebook or a terminal.

**Time:** 5 minutes. **You need:** a web browser. The community folder is open to
everyone, so you can do this without an account; to do it signed in, first
[sign in to the MESA Portal](sign-in.md).

## Steps

1. Open <https://mesa.cyverse.org> and click **Data Browser** in the sidebar.

    You should see: a folder listing. Signed in, it is your own home folder. Signed out,
    it is already the MESA community data.

2. In the row of buttons under the header, click **Community**.

    You should see: the folders that MESA shares with everyone.

    ![The MESA Community folder as a signed-out visitor sees it: read only, with Community and Public views](https://idss-mesa.github.io/docs/assets/portal/data-community.webp)

3. Read the dark band at the top of the listing, the folder header.

    You should see: the folder's name, counts of folders and files with their total
    size, and under the name the folder's full address in the CyVerse Data Store, its
    *path*.

4. Click the name of a folder to open it.

    You should see: that folder's contents, and a longer trail in the header. Click any
    part of the trail to go back up.

5. Click the small copy button beside the path. Its tooltip is **Copy path**.

    You should see: nothing change on the page; the path is now on your clipboard. Paste
    it somewhere to look at it.

## Check it worked

The path you pasted starts with:

```text
/iplant/home/shared/mesa
```

## If it didn't

**The path stops at `/iplant/home/shared`, and the listing holds many projects that are
not MESA's.** You clicked **Shared**, which opens every CyVerse community project.
**Community** is the MESA folder inside it. Click **Community** and repeat from step 3.

## Next

- [Search for a file or folder by name](search-the-data-browser.md)
- [Launch MESA JupyterLab with your Data Store mounted](launch-jupyterlab.md)
- Reference: [Managing data, "Choose where to look"](https://idss-mesa.github.io/docs/portal/data/#choose-where-to-look),
  which explains all five views, and
  ["Browse and find files"](https://idss-mesa.github.io/docs/portal/data/#browse-and-find-files)
  for search and the built-in file viewer.

*Not yet validated on the live portal. Drafted 2026-11-11 from the MESA documentation.*
