---
type: Reference
title: "Learning pathway"
description: "The five points of the MESA learning pathway, from finding your way around to sharing work others can rerun, with the tutorials that belong to each."
tags: [pathway, tutorials, getting-started]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/"
    title: "MESA documentation"
    author: "team:idss-mesa"
---

# Learning pathway

The tutorials are arranged along one pathway of five points. Each point builds on the
one before, but every tutorial says what it needs, so you can also start wherever your
question is.

!!! warning "These tutorials are drafts"
    Each tutorial says at the top how far it has been checked. More tutorials will be
    added to each point.

## 1. Orient and navigate

Get into MESA, find data, start an app, and keep and share what you make.

1. [Sign in to the MESA Portal with a CyVerse account](tutorials/sign-in.md)
2. [Find your way around the MESA Portal](tutorials/find-your-way-around.md)
3. [Find MESA's community data in the Data Browser](tutorials/find-community-data.md)
4. [Search for a file or folder by name](tutorials/search-the-data-browser.md)
5. [Make a folder in your Data Store](tutorials/make-a-folder.md)
6. [Launch MESA JupyterLab with your Data Store mounted](tutorials/launch-jupyterlab.md)
7. [Launch an app with the cores, memory, and time you choose](tutorials/launch-with-options.md)
8. [Save your work where it survives the session](tutorials/save-your-work.md)
9. [Check on a running app and give it more time](tutorials/monitor-and-extend.md)
10. [Stop an app and find your results](tutorials/stop-app-find-results.md)
11. [Share a folder with a collaborator](tutorials/share-a-folder.md)
12. [Rename a folder in your Data Store](tutorials/rename-a-folder.md)
13. [Move folders into another folder](tutorials/move-folders.md)
14. [Move a folder to the trash and get it back](tutorials/trash-and-restore.md)
15. [Browse a large folder as a sorted list](tutorials/browse-a-large-folder.md)
16. [Read the metadata on a folder shared with you](tutorials/read-shared-metadata.md)
17. [Stop sharing a folder](tutorials/stop-sharing-a-folder.md)
18. [Check your CPU hours and storage](tutorials/check-your-usage.md)

The other MESA apps, one first task each:

1. [Download a file from the web into your Data Store with MESA Cloud Shell](tutorials/cloud-shell-download.md)
2. [Write and run a Python script in MESA VS Code](tutorials/vscode-run-a-script.md)
3. [Open a file from your Data Store in a desktop program](tutorials/desktop-open-a-file.md)

## 2. Run and understand

Load a dataset and find out what it holds, and where it is incomplete or doubtful, before you compute with it.

1. [Practice data: five invented rain gauges](tutorials/practice-data.md)
2. [Load a file from your Data Store into a notebook](tutorials/load-a-file.md)
3. [Read the data dictionary before the data](tutorials/read-the-data-dictionary.md)
4. [Check a column's range and missing values](tutorials/check-range-and-missing.md)
5. [Tally a quality flag before you trust a number](tutorials/tally-a-quality-flag.md)
6. [Count records per day to find incomplete days](tutorials/count-records-per-day.md)
7. [Turn UTC timestamps into local days](tutorials/local-days-from-utc.md)
8. [Work with a long table, one row per kind of measurement](tutorials/work-with-a-long-table.md)
9. [Map point data with sf in MESA RStudio Geospatial](tutorials/map-points-in-rstudio.md)

The same ground in R, in MESA RStudio Geospatial:

1. [Load a file from your Data Store in RStudio](tutorials/r-load-a-file.md)
2. [Tally a quality flag in R](tutorials/r-tally-a-quality-flag.md)

## 3. Query and connect

Ask questions across files and tables, and check that combining them did what you meant.

1. [Query a Parquet file with DuckDB from a notebook](tutorials/query-parquet-with-duckdb.md)
2. [Reconcile row counts before and after a join](tutorials/reconcile-a-join.md)
3. [Keep tokens and passwords out of saved files](tutorials/keep-secrets-out-of-files.md)
4. [Query a Parquet file with DuckDB from R](tutorials/r-query-parquet-with-duckdb.md)

## 4. Explore and verify

Work with an AI assistant, and test what it tells you against the data.

1. [Sign in and start an AI agent in a MESA app](tutorials/start-an-ai-agent.md)
2. [Check an AI-suggested result against the data](tutorials/check-a-suggested-result.md)

## 5. Preserve and share

Leave work that someone else can find, understand, and run again.

1. [Write a README for a data folder](tutorials/write-a-readme.md)
2. [Add metadata to a file or folder](tutorials/add-metadata.md)
3. [Record the software versions a result depends on](tutorials/record-software-versions.md)
4. [Leave a notebook someone else can rerun](tutorials/leave-a-rerunnable-notebook.md)

## Where to start

- **New to MESA:** take point 1 in order. It needs only a web browser and a free
  [CyVerse account](https://user.cyverse.org).
- **Comfortable in the portal, new to checking data:** copy the
  [practice data](tutorials/practice-data.md) and take point 2 in order. Points 3 and 4
  use the same notebook.
- **Working in R:** start with
  [Load a file from your Data Store in RStudio](tutorials/r-load-a-file.md); each R
  tutorial links its Python counterpart.
- **Looking for one thing:** every tutorial is listed, with a one-line description,
  under [Tutorials](tutorials/index.md).
