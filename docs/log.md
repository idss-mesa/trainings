# Directory Update Log

## 2026-11-13

* **Creation**: Added [Map point data with sf in MESA RStudio Geospatial](tutorials/map-points-in-rstudio.md),
  the first tutorial for that app, run there on 2026-11-13. The
  [practice data](tutorials/practice-data.md) gained `gauge_sites.csv`, invented
  coordinates for the five gauges.
* **Update**: Ran every data tutorial's code inside MESA JupyterLab (pandas 3.1.1, DuckDB
  2.0.0): all 28 printed outputs matched, and the four newest tutorials ran without
  error as notebooks. Their notices now say so. They remain drafts until a person follows
  the steps by hand.
* **Creation**: Added the [Learning pathway](pathway.md), which arranges every tutorial
  under the five pathway points, and four draft tutorials:
  [Turn UTC timestamps into local days](tutorials/local-days-from-utc.md),
  [Work with a long table, one row per kind of measurement](tutorials/work-with-a-long-table.md),
  [Query a Parquet file with DuckDB from a notebook](tutorials/query-parquet-with-duckdb.md),
  and [Check an AI-suggested result against the data](tutorials/check-a-suggested-result.md).
* **Update**: The [practice data](tutorials/practice-data.md) gained a third file,
  `observations.csv`: a week of hourly rain and air temperature from one gauge, in long
  format with UTC timestamps. `scripts/check_tutorial_outputs.py` now runs every
  tutorial's code against the practice data and compares it with the output on the page;
  the build workflow runs it on every pull request.

## 2026-11-12

* **Update**: [Launch MESA JupyterLab](tutorials/launch-jupyterlab.md) again describes
  the launch page in a new tab. The **Launching Application** window is what the portal
  shows when the browser blocks that tab, and is now the tutorial's recovery case.
* **Update**: Corrected the tutorials after a first pass on the live portal and in MESA
  JupyterLab (pandas 3.1.1): `~/data-store` holds `data` and `home`, and your
  files are in `home/<username>`; a new notebook asks for a kernel and does not offer
  Python first; **Save & Exit** asks for confirmation; the share dialog's levels are
  **Read**, **Read & Write**, and **Full Control**; the theme button cycles **Light**,
  **Dark**, **System**. After **Save & Exit** the analysis is under **Completed
  Analyses**, which is collapsed; **View Results** opens an empty output folder for an
  interactive app, where the portal may show **Unable to Load Files**. All tutorials
  remain drafts.
* **Creation**: Added five draft tutorials written from the MESA documentation:
  [Find your way around the MESA Portal](tutorials/find-your-way-around.md),
  [Share a folder with a collaborator](tutorials/share-a-folder.md),
  [Add metadata to a file or folder](tutorials/add-metadata.md),
  [Sign in and start an AI agent in a MESA app](tutorials/start-an-ai-agent.md), and
  [Keep tokens and passwords out of saved files](tutorials/keep-secrets-out-of-files.md).
  None has been validated on the live portal.
* **Creation**: Added the [practice data](tutorials/practice-data.md), two small
  synthetic rain-gauge files with a data dictionary (made by
  `scripts/make_practice_data.py`), and seven draft data tutorials that
  use it: [Load a file from your Data Store into a notebook](tutorials/load-a-file.md),
  [Read the data dictionary before the data](tutorials/read-the-data-dictionary.md),
  [Check a column's range and missing values](tutorials/check-range-and-missing.md),
  [Tally a quality flag before you trust a number](tutorials/tally-a-quality-flag.md),
  [Count records per day to find incomplete days](tutorials/count-records-per-day.md),
  [Reconcile row counts before and after a join](tutorials/reconcile-a-join.md), and
  [Leave a notebook someone else can rerun](tutorials/leave-a-rerunnable-notebook.md).
  The code was run with pandas 3.1 on a laptop; none has been validated in MESA
  JupyterLab.

## 2026-11-11

* **Creation**: Scaffolded the MESA Trainings site: the [home page](index.md), the
  [tutorial template](template.md), [Contribute a tutorial](contributing.md), the
  [license](about/license.md) page (CC BY 4.0 for content, BSD 3-Clause for code), and
  [For AI agents](about/ai-agents.md). The build, validation, and agent-surface scripts
  come from idss-mesa/docs.
* **Creation**: Added the first five tutorials, all drafts written from the MESA
  documentation and not yet validated on the live portal:
  [Sign in to the MESA Portal with a CyVerse account](tutorials/sign-in.md),
  [Find MESA's community data in the Data Browser](tutorials/find-community-data.md),
  [Launch MESA JupyterLab with your Data Store mounted](tutorials/launch-jupyterlab.md),
  [Save your work where it survives the session](tutorials/save-your-work.md), and
  [Stop an app and find your results](tutorials/stop-app-find-results.md).
