---
okf_version: "0.2"
title: MESA Trainings
description: MESA Trainings — short, single-task tutorials for the MESA Portal at mesa.cyverse.org and its apps, written for training participants and for anyone using MESA.
icon: lucide/graduation-cap
---

<!-- OKF deviation: OKF v0.2 (§8, §12) reserves the bundle-root index.md as a
     directory listing whose only frontmatter is okf_version. Zensical requires
     index.md to be the site homepage, so this file also keeps title, description
     and icon (consumers tolerate unknown keys, §11) and a homepage body. The same
     deviation is documented in idss-mesa/docs. -->

# MESA Trainings

Short tutorials for getting things done on **MESA**, the Multidisciplinary Environment
for Scientific Advancement. Each one takes you through a single task in five to ten
minutes, tells you what you should see at every step, and ends with a check that shows
whether it worked.

They are written for two readers: people preparing for a MESA training session, and
anyone using MESA who wants to get one thing done. You do not need to be part of a
training program to use them.

[New to MESA? Start here :material-arrow-right:](pathways/new-to-mesa.md){ .md-button .md-button--primary }
[Choose a pathway](pathways/index.md){ .md-button }
[All tutorials](tutorials/index.md){ .md-button }

!!! warning "These tutorials are drafts"
    The portal tutorials were written from the
    [MESA documentation](https://idss-mesa.github.io/docs/), and the code in the data
    tutorials was run on a laptop. None has yet been checked step by step on the live
    portal. Each page says so at the top and at the bottom.
    When a tutorial has been validated, its last line gives the date, who checked it, and
    what it was checked against.

## Getting started

These five tutorials take you from nothing to a saved notebook, in order. You need a web
browser and a free [CyVerse account](https://user.cyverse.org).

| I want to… | Tutorial | Time |
|---|---|---|
| Get into the portal | [Sign in to the MESA Portal with a CyVerse account](tutorials/sign-in.md) | 5 min |
| See the data MESA shares | [Find MESA's community data in the Data Browser](tutorials/find-community-data.md) | 5 min |
| Be allowed to start apps on a new account | [Ask CyVerse for access to interactive apps](tutorials/request-app-access.md) | 5 min |
| Start working in a notebook | [Launch MESA JupyterLab with your Data Store mounted](tutorials/launch-jupyterlab.md) | 5–10 min |
| Not lose my work | [Save your work where it survives the session](tutorials/save-your-work.md) | 5–10 min |
| Finish for the day | [Stop an app and find your results](tutorials/stop-app-find-results.md) | 5 min |

## Working with data

These tutorials each teach one habit for checking data before you trust a result. They
share one small synthetic [practice dataset](tutorials/practice-data.md) and one
notebook, so do the first one first.

| I want to… | Tutorial | Time |
|---|---|---|
| Get a file into a notebook | [Load a file from your Data Store into a notebook](tutorials/load-a-file.md) | 5 min |
| Know what the columns mean | [Read the data dictionary before the data](tutorials/read-the-data-dictionary.md) | 5 min |
| Spot impossible values and blanks | [Check a column's range and missing values](tutorials/check-range-and-missing.md) | 5 min |
| See what the provider doubted | [Tally a quality flag before you trust a number](tutorials/tally-a-quality-flag.md) | 5 min |
| Find repeated and missing days | [Count records per day to find incomplete days](tutorials/count-records-per-day.md) | 5–10 min |
| Join two tables safely | [Reconcile row counts before and after a join](tutorials/reconcile-a-join.md) | 5–10 min |
| Say what a folder of data is | [Write a README for a data folder](tutorials/write-a-readme.md) | 10 min |
| Know which software made a result | [Record the software versions a result depends on](tutorials/record-software-versions.md) | 5 min |
| Hand my notebook to someone | [Leave a notebook someone else can rerun](tutorials/leave-a-rerunnable-notebook.md) | 5–10 min |
| Group hourly data by the right day | [Turn UTC timestamps into local days](tutorials/local-days-from-utc.md) | 10 min |
| Handle several measurements in one column | [Work with a long table, one row per kind of measurement](tutorials/work-with-a-long-table.md) | 5–10 min |
| Run SQL on a Parquet file | [Query a Parquet file with DuckDB from a notebook](tutorials/query-parquet-with-duckdb.md) | 10 min |
| Know which R and packages made a result | [Record the R and package versions a result depends on](tutorials/r-record-software-versions.md) | 5 min |
| Say what a folder of data is, from RStudio | [Write a README for a data folder, from RStudio](tutorials/r-write-a-readme.md) | 10 min |
| Find out if someone else can rerun my R work | [Hand your folder to a colleague and have them rerun it, in R](tutorials/r-hand-over-and-rerun.md) | 10 min |
| Put points on a map in R | [Map point data with sf in MESA RStudio Geospatial](tutorials/map-points-in-rstudio.md) | 10 min |
| Test a result I was handed | [Check an AI-suggested result against the data](tutorials/check-a-suggested-result.md) | 10 min |
| See what a join left out | [Join two tables and keep the unmatched rows visible](tutorials/join-and-keep-unmatched.md) | 10 min |
| Compare gauges that report in different units | [Bring two units onto one scale before comparing](tutorials/convert-units-before-comparing.md) | 10 min |
| Deal with a row that is written twice | [Find and remove a repeated row](tutorials/remove-a-repeated-row.md) | 5–10 min |
| Hand a query to someone else | [Save a query so someone else can run it](tutorials/save-a-query.md) | 5–10 min |
| See an odd value in a chart | [Plot a column to spot odd values](tutorials/plot-to-spot-odd-values.md) | 10 min |
| Make sure a number is not an accident of the method | [Check a result a second way](tutorials/check-a-result-two-ways.md) | 10 min |
| Notice rows a grouping dropped | [Check that the parts add up to the whole](tutorials/check-parts-add-up.md) | 10 min |
| Use one month to question another | [Compare two files that should look alike](tutorials/compare-two-files.md) | 10 min |
| Keep track of what an AI assistant did | [Keep a log of AI-assisted steps](tutorials/keep-an-ai-log.md) | 5–10 min |

## More in the portal, sharing, and AI agents

| I want to… | Tutorial | Time |
|---|---|---|
| Keep work in one place | [Make a folder in your Data Store](tutorials/make-a-folder.md) | 5 min |
| Give a folder a better name | [Rename a folder in your Data Store](tutorials/rename-a-folder.md) | 5 min |
| Tidy folders away | [Move folders into another folder](tutorials/move-folders.md) | 5–10 min |
| Undo a deletion | [Move a folder to the trash and get it back](tutorials/trash-and-restore.md) | 10 min |
| Put a file from my computer into MESA | [Upload a file from your computer to your Data Store](tutorials/upload-a-file.md) | 5 min |
| Take a file home | [Download a file from your Data Store to your computer](tutorials/download-a-file.md) | 5 min |
| Start a note or a script | [Start a new file in the Data Browser](tutorials/make-a-new-file.md) | 5 min |
| Look through a folder with many items | [Browse a large folder as a sorted list](tutorials/browse-a-large-folder.md) | 5 min |
| See what a colleague recorded about a folder | [Read the metadata on a folder shared with you](tutorials/read-shared-metadata.md) | 5–10 min |
| Take back access I gave | [Stop sharing a folder](tutorials/stop-sharing-a-folder.md) | 5 min |
| Let a colleague see an analysis | [Share an analysis with a collaborator](tutorials/share-an-analysis.md) | 5 min |
| Find people working on my topic | [Find a MESA working group and how to join it](tutorials/find-a-working-group.md) | 5 min |
| Say where my data came from | [Say where your input data came from](tutorials/say-where-data-came-from.md) | 5–10 min |
| Find out if someone else can rerun my work | [Hand your folder to a colleague and have them rerun it](tutorials/hand-over-and-rerun.md) | 10 min |
| Know how much computing time and space I have | [Check your CPU hours and storage](tutorials/check-your-usage.md) | 5 min |
| Read a notebook without starting an app | [Read a notebook in the portal without starting an app](tutorials/view-a-notebook.md) | 5 min |
| See what is in a table before I launch anything | [Look inside a CSV file from the portal](tutorials/preview-a-table.md) | 5–10 min |
| Find something by name | [Search for a file or folder by name](tutorials/search-the-data-browser.md) | 5 min |
| Give an app more memory or time | [Launch an app with the cores, memory, and time you choose](tutorials/launch-with-options.md) | 5–10 min |
| Keep an app from timing out | [Check on a running app and give it more time](tutorials/monitor-and-extend.md) | 5 min |
| Know where things are | [Find your way around the MESA Portal](tutorials/find-your-way-around.md) | 5 min |
| Let a colleague see my folder | [Share a folder with a collaborator](tutorials/share-a-folder.md) | 5 min |
| Say what a folder contains | [Add metadata to a file or folder](tutorials/add-metadata.md) | 5 min |
| Ask an AI agent about my data | [Sign in and start an AI agent in a MESA app](tutorials/start-an-ai-agent.md) | 10 min |
| Use a token safely in a notebook | [Keep tokens and passwords out of saved files](tutorials/keep-secrets-out-of-files.md) | 5–10 min |

## Ideas, explained

An [explainer](explainers/index.md) explains one idea in a page, with no steps to
follow: what an AI agent is, where a figure in its answer came from, and how to read
what it did.

## Practise reading what an AI agent did

A [trace card](trace-cards/index.md) shows one short run of an AI agent on the practice
data, as text, and asks whether its answer is supported. The answer is folded away
until you open it. You need no agent, no model, and no key. Start with
[How to use the trace cards](trace-cards/how-to-use.md).

## Bring your own data

The same steps work on data of your own.
[Bring your own data to MESA](bring-your-own-data.md) says what to bring, what to leave
out, and how to check that it arrived.

## Working in R

These use MESA RStudio Geospatial and the same practice data.

| I want to… | Tutorial | Time |
|---|---|---|
| Get a file into R | [Load a file from your Data Store in RStudio](tutorials/r-load-a-file.md) | 5–10 min |
| See what the provider doubted | [Tally a quality flag in R](tutorials/r-tally-a-quality-flag.md) | 5 min |
| Run SQL on a Parquet file from R | [Query a Parquet file with DuckDB from R](tutorials/r-query-parquet-with-duckdb.md) | 10 min |
| Find an impossible value or a gap in R | [Check a column's range and missing values in R](tutorials/r-check-range-and-missing.md) | 5 min |
| Find doubled and missing days in R | [Count records per day in R](tutorials/r-count-records-per-day.md) | 5–10 min |
| Join two tables in R without losing rows | [Reconcile row counts before and after a join in R](tutorials/r-reconcile-a-join.md) | 5–10 min |
| Hand over R work that runs | [Leave an R script someone else can rerun](tutorials/r-leave-a-rerunnable-script.md) | 5–10 min |
| See which rows a join left out, in R | [Join two tables in R and keep the unmatched rows visible](tutorials/r-join-and-keep-unmatched.md) | 10 min |
| Compare gauges that report in different units, in R | [Bring two units onto one scale in R](tutorials/r-convert-units-before-comparing.md) | 10 min |
| Stop a row being counted twice, in R | [Find and remove a repeated row in R](tutorials/r-remove-a-repeated-row.md) | 5–10 min |
| Hand over a query from R | [Save a query from R so someone else can run it](tutorials/r-save-a-query.md) | 5–10 min |
| Know what a column means before using it, in R | [Read the data dictionary before the data, in R](tutorials/r-read-the-data-dictionary.md) | 5 min |
| Put evening rain on the right day, in R | [Turn UTC timestamps into local days in R](tutorials/r-local-days-from-utc.md) | 10 min |
| Handle one row per kind of measurement, in R | [Work with a long table in R](tutorials/r-work-with-a-long-table.md) | 5–10 min |
| See an odd value in a chart, in R | [Plot a column to spot odd values in R](tutorials/r-plot-to-spot-odd-values.md) | 10 min |
| Make sure a number is not an accident of the method, in R | [Check a result a second way in R](tutorials/r-check-a-result-two-ways.md) | 10 min |
| Notice rows a tally dropped, in R | [Check that the parts add up to the whole in R](tutorials/r-check-parts-add-up.md) | 10 min |
| Use one month to question another, in R | [Compare two files that should look alike in R](tutorials/r-compare-two-files.md) | 10 min |
| Put points on a map | [Map point data with sf in MESA RStudio Geospatial](tutorials/map-points-in-rstudio.md) | 10 min |

## The other MESA apps

One first task in each of the apps besides JupyterLab and RStudio.

| I want to… | Tutorial | Time |
|---|---|---|
| Fetch a file from the web into my Data Store | [Download a file from the web into your Data Store with MESA Cloud Shell](tutorials/cloud-shell-download.md) | 5–10 min |
| Write and run a script | [Write and run a Python script in MESA VS Code](tutorials/vscode-run-a-script.md) | 10 min |
| Use a program that needs a desktop | [Open a file from your Data Store in a desktop program](tutorials/desktop-open-a-file.md) | 10 min |
| Leave a long command running | [Keep a command running in MESA Cloud Shell after you close the tab](tutorials/cloud-shell-keep-running.md) | 10 min |
| Find every file that mentions a value | [Find a value in every file of a folder with MESA VS Code](tutorials/vscode-find-in-folder.md) | 5 min |
| Run a command beside a desktop program | [Open a terminal in a Data Store folder on the MESA desktop](tutorials/desktop-open-a-terminal.md) | 5–10 min |

## How a tutorial is laid out

Every tutorial has the same six parts, in the same order:

1. **You will**: what you have at the end.
2. **You need**: what to have ready, with links.
3. **Steps**: one action each, followed by what you should see.
4. **Check it worked**: one result that tells success from failure.
5. **If it didn't**: the most likely slip, described by what you see.
6. **Next**: the tutorials that follow, and the documentation page to read for more.

A tutorial never repeats the documentation. For the full picture of a screen or a
feature, follow its **Reference** link to the
[MESA documentation](https://idss-mesa.github.io/docs/).

## More about MESA

- [MESA website](https://idss-mesa.github.io/): what MESA is and who builds it
- [MESA documentation](https://idss-mesa.github.io/docs/): guides to the portal, the
  apps, and the MESA tools for AI agents
- [MESA Portal](https://mesa.cyverse.org): where the tutorials happen

## Use and reuse

The tutorials are licensed [CC BY 4.0](about/license.md): copy and adapt them, with
credit. To fix one or write a new one, see [Contribute a tutorial](contributing.md).

## How AI was used

The pages on this site were drafted with an AI assistant and are drafts until a person
has followed them. [How AI was used](about/ai-disclosure.md) says what that covers and
how to tell, page by page.

## For AI agents

This site is an [Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
knowledge bundle with the same conventions as the MESA documentation. Start at
[`https://idss-mesa.github.io/trainings/llms.txt`](https://idss-mesa.github.io/trainings/llms.txt)
or read [For AI agents](about/ai-agents.md).
