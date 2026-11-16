---
type: Reference
title: "Bring your own data to MESA"
description: "What data you can bring into MESA to work on, what to leave out, how to get it into your Data Store, how to check it arrived, and what to do if it is not ready."
tags: [data, data-store, privacy, readme]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-data
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: usage
    resource: "https://idss-mesa.github.io/trainings/tutorials/check-your-usage/"
    title: "Check your CPU hours and storage"
    author: "team:idss-mesa"
---

# Bring your own data to MESA

!!! warning "Draft: not yet tried with real datasets"
    This page was written from the MESA documentation and the tutorials on this site.
    Nobody has yet used it to bring a dataset of their own into MESA.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The tutorials on this site use a small practice dataset. You can follow the same steps
on data of your own. This page says what to bring, what to leave out, and how to tell
that your data is ready to work on.

## What you can bring

- **Tables as CSV or Parquet files.** These are the two formats the tutorials read, and
  MESA JupyterLab includes DuckDB for querying both[^docs-jupyterlab]. The apps also
  hold Python, R, and Julia with their usual data libraries, so other formats may
  open, but this site has not tried them.
- **Less than your storage allowance, with room to spare.** Your plan sets how much
  your Data Store holds and how many CPU hours you may use.
  [Check your CPU hours and storage](tutorials/check-your-usage.md) shows where to
  read both[^usage]. On a new Basic plan they read 5 GB and 200 hours on 2026-11-13;
  yours may differ.
- **A part before the whole.** If the dataset is large, bring one file, or one month,
  first. A sample that opens in a few seconds is enough to learn on.

## What not to bring

Leave a dataset out if the answer to any of these is yes, or if you are not sure:

1. Does it describe people: names, contact details, health, or anything that could
   identify a person?
2. Did it come under an agreement or a license that forbids copying it to a shared
   platform?
3. Does any file hold a password, a token, or a key?
4. Does it give the exact place of something that could be harmed if the place were
   known, such as a protected species or a site that a community keeps private?
5. Is it someone else's, and have they not agreed to your using it here?

A folder in your Data Store is marked **Private** until you share it. Even so, you may work beside
other people or show your screen, and an AI agent you start in an app acts with your
access.

## Getting it into your Data Store

- From your computer:
  [Upload a file from your computer to your Data Store](tutorials/upload-a-file.md).
  Reference: [Managing data, "Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete)[^docs-data].
- From the web:
  [Download a file from the web into your Data Store with MESA Cloud Shell](tutorials/cloud-shell-download.md).

Put it in a folder of its own. [Make a folder in your Data Store](tutorials/make-a-folder.md)
shows how.

## Check it arrived

1. Open it: [Load a file from your Data Store into a notebook](tutorials/load-a-file.md),
   with your file's name in place of the practice file's.
2. Count its rows and compare with the number you expect from the source.
3. Look at each column you will use:
   [Check a column's range and missing values](tutorials/check-range-and-missing.md).

If the row count is right and the columns hold what you expect, the data is ready.

## Describe it

- [Write a README for a data folder](tutorials/write-a-readme.md), and
  [say where the data came from](tutorials/say-where-data-came-from.md).
- [Add metadata to a file or folder](tutorials/add-metadata.md), so that the same facts
  can be searched.

## If your data are not ready

Use the [practice data](tutorials/practice-data.md). Every tutorial here runs on it,
and what you learn carries over to your own data unchanged. Nothing is lost by
starting there and coming back to your own files later.

*This page was drafted with [AI assistance](about/ai-disclosure.md) on 2026-11-15 from the MESA documentation. No person has yet checked it.*

[^docs-data]: Managing data in the MESA Portal, <https://idss-mesa.github.io/docs/portal/data/>.
[^docs-jupyterlab]: MESA JupyterLab, <https://idss-mesa.github.io/docs/apps/jupyterlab/>.
[^usage]: Check your CPU hours and storage, <https://idss-mesa.github.io/trainings/tutorials/check-your-usage/>.
