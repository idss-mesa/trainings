# Directory Update Log

## 2026-11-16

* **Creation**: Added three tutorials for buttons the portal has now had repaired:
  [Upload a file from your computer to your Data Store](tutorials/upload-a-file.md),
  [Download a file from your Data Store to your computer](tutorials/download-a-file.md), and
  [Start a new file in the Data Browser](tutorials/make-a-new-file.md). Each was followed
  once on the live portal by the AI assistant that drafted it; in the upload tutorial
  the file was supplied by a script, because the test browser cannot open a file
  chooser. No person has yet followed them.
* **Update**: The four R tutorials added today were followed in MESA RStudio Geospatial
  (R 4.6.2), and every output matched. Three details changed in
  [Leave an R script someone else can rerun](tutorials/r-leave-a-rerunnable-script.md):
  the **Save File** window opens on R's working folder; `source()` shortens the start
  of the script to `[TRUNCATED]`; and the folder is listed with `list.files()`, because
  the **Files** tab does not follow R's working folder. All remain drafts.
* **Creation**: Added four tutorials for readers who work in R, each the R version of
  a Python one: [Check a column's range and missing values in R](tutorials/r-check-range-and-missing.md),
  [Count records per day in R](tutorials/r-count-records-per-day.md),
  [Reconcile row counts before and after a join in R](tutorials/r-reconcile-a-join.md), and
  [Leave an R script someone else can rerun](tutorials/r-leave-a-rerunnable-script.md).
  The code was run with R 4.6.0 on a laptop, and the site build runs it in the MESA
  RStudio Geospatial image; nobody has yet followed the steps in the app. A reader who
  answers "R" on the pathways page is now given these in place of the Python versions,
  and [Work in R](pathways/work-in-r.md) lists them under "If you have more time".
* **Creation**: Added [Ask CyVerse for access to interactive apps](tutorials/request-app-access.md):
  the one-time request a new CyVerse account must send before it can start an app. The
  failed launch was seen on the live portal; the form itself was written from the
  Discovery Environment's public source code and has not been sent by the writer. It is
  listed under "If you have more time" in [New to MESA](pathways/new-to-mesa.md) and
  [Get ready for a hands-on session](pathways/get-ready-for-a-session.md), and the
  [launch tutorial](tutorials/launch-jupyterlab.md) now points to it.
* **Update**: Four fixes to bringing back a saved copy on [Your progress](progress.md).
  Merging no longer drops a note: when the browser and the file both hold a note on the
  same point, the file's note is added below yours, and the message says so. If the two
  together are too long to keep, yours stays and the message says the file's was left
  out. When the stored record was made by a newer version of the site, "Save a copy to
  a file" now saves that record as it is stored, not an empty one. The message counts
  tutorials correctly ("1 finished tutorial") and counts only tutorials the site still
  has. The "Replace or merge?" and "Clear everything?" questions now take focus
  themselves, so pressing Enter straight away changes nothing. A file with a date that
  is not a real day, such as 2026-13-45, is refused.
* **Update**: "Clear everything" on [Your progress](progress.md) now also clears what
  another open tab is showing. An answer given to a self-check on that visit used to stay
  on screen in the other tab until it was reloaded, although nothing was stored.
* **Update**: Two fixes to the files saved from [Your progress](progress.md). A note
  typed just before pressing "Save my notes as Markdown" or "Save a copy to a file" was
  stored but left out of the file; both files now hold it. In the Markdown file each note
  is now a block quote with its line breaks kept, so a line of a note that starts with
  "#" can no longer become a heading of the file, and a tag in a note stays as text.
* **Update**: Two fixes to the note boxes at the end of each point. A note is now
  stored a moment after you stop typing and when the page is hidden, closed or left, as
  well as when you leave the box; reloading with the cursor still in the box used to
  lose what had been typed. After "Clear everything" the line under an empty box no
  longer says "Saved in this browser."

## 2026-11-15

* **Creation**: Added a second kind of page, the explainer, which explains one idea
  and gives no steps, with three to begin:
  [What an agent is, and is not](explainers/what-an-agent-is.md),
  [Recalled or retrieved](explainers/recalled-or-retrieved.md), and
  [Reading what an agent did](explainers/reading-what-an-agent-did.md). The
  [tutorial template](template.md) says how one is written.
* **Creation**: Added [Bring your own data to MESA](bring-your-own-data.md): what you
  can bring, what to leave out, how to get it into your Data Store, how to check it
  arrived, and what to do if it is not ready. A draft: nobody has yet used it with a
  dataset of their own.
* **Creation**: Added five [trace cards](trace-cards/index.md): short runs of an AI
  agent on the practice data, written as text, for practising how to read what an
  agent did. Each asks whether the answer is supported, with the answer folded away.
  All five are constructed examples, written by hand and labelled so; some of the runs
  are sound. [How to use the trace cards](trace-cards/how-to-use.md) explains them.
  The output check now covers the cards, so every figure on one is recomputed when
  the site is built.
* **Creation**: Added seven tutorials for the thinner pathway points. Under point 3:
  [Join two tables and keep the unmatched rows visible](tutorials/join-and-keep-unmatched.md),
  [Bring two units onto one scale before comparing](tutorials/convert-units-before-comparing.md),
  [Find and remove a repeated row](tutorials/remove-a-repeated-row.md), and
  [Save a query so someone else can run it](tutorials/save-a-query.md). Under point 4:
  [Keep a log of AI-assisted steps](tutorials/keep-an-ai-log.md). Under point 5:
  [Say where your input data came from](tutorials/say-where-data-came-from.md) and
  [Hand your folder to a colleague and have them rerun it](tutorials/hand-over-and-rerun.md).
  All are drafts. The code in the four data tutorials was run outside MESA with the
  versions MESA JupyterLab has; none has been followed in MESA. Each is in a
  [learning pathway](pathways/index.md) under "If you have more time".
* **Creation**: Added a fifth practice file,
  [`readings_august.csv`](assets/practice/readings_august.csv): the same five gauges'
  daily readings for August 2026, described on the
  [practice data](tutorials/practice-data.md) page. The four files published earlier
  are unchanged, byte for byte, and a test now holds their checksums.
* **Update**: A pathway point whose tutorials are all done no longer offers "Skip the
  rest of this point": there was nothing left to skip. It says the skip-check
  questions were answered.
* **Update**: Answering a self-check on its tutorial no longer shortens your route. On
  Use an AI agent with an hour, a right answer on "Check an AI-suggested result" also
  counted as passing that point's skip-check, so two tutorials dropped off and the
  pathway read as finished early. Now only the "Check first" questions on a pathway
  page skip a point. If you got them all right on the tutorials, the pathway page says
  so and offers "Skip the rest of this point"; nothing is left out until you choose it.
* **Update**: The answer boxes on the self-checks and the notes box under each point
  now use text of at least 16 pixels. They were at 15 on a phone, and below 16 Safari
  on an iPhone zooms the page in when a box is tapped and leaves it zoomed.
* **Update**: In the six self-checks with choices, the right answer was always listed
  first. The choices are now in a plain order, and the site build refuses a set of
  self-checks where the right answer mostly sits in one place.
* **Update**: A route shortened or filled by your answers now runs point by point: a
  tutorial added because you have time sits with its own point. The practice-data page
  now says what you set out to do when you mark it done.
* **Update**: For a reader working in R, passing the skip-check for a point now leaves
  nothing to do on it. Since the change that keeps a finished tutorial on your route,
  the R version of a tutorial whose question you had just answered came back as
  something still to take.
* **Update**: "Clear everything" now also forgets a self-check answered earlier in the
  same visit. Before, going back to that tutorial without reloading the page still
  showed the answer as right, although nothing was stored. Replacing your progress
  from a file does the same.
* **Update**: A tutorial you have finished now stays on your route and keeps counting,
  even when you later pass the skip-check for its point or say you have used the portal
  or checked a dataset before. Before, answering the last self-check on "Use an AI
  agent" turned a finished route of three tutorials into two.
* **Update**: Fixes for readers who answer "R" to "Where are you starting?". The R
  version of a tutorial now has its own stop on the pathway page, under the point it
  belongs to; its page names the pathway you are following and links to what comes
  next; and code in a self-check's explanation is shown as code.
* **Creation**: Added [How AI was used](about/ai-disclosure.md), a statement of which
  parts of this site were drafted with an AI assistant and what a person has checked.
* **Update**: Every tutorial's last line now says it was drafted with AI assistance and
  links to that page. The template, the contributing guide, the site footer, and
  `AGENTS.md` (rule 17) require the same of new pages.
* **Update**: The [learning pathways](pathways/index.md) are much shorter. Each now
  opens with its essentials, 10 to 25 minutes, and lists the rest under "If you have
  more time". [Get ready for a hands-on session](pathways/get-ready-for-a-session.md)
  went from 13 tutorials and 70 to 90 minutes to 4 tutorials and 20 to 25 minutes: sign
  in, start an app, and load the practice data. It also says to do the first two at
  least two days ahead, because a new account must ask for access to apps.
* **Creation**: With scripts on, the pathways page asks "Where are you starting?": what
  you are here for, whether you have used the portal, Python or R, whether you have
  checked a dataset before, and how long you have. The answers shorten your route, say
  what was left out and why, and stay in your browser. Nothing is locked.

## 2026-11-14

* **Update**: Accessibility pass. The pathway, tutorial, list, self-check and progress
  pages now pass an automated check at desktop width and at 320 pixels, and a whole
  pathway can be followed with the keyboard alone. The current tab and page are no
  longer marked in the bright accent, which was too faint at that size; code colours
  were darkened for the same reason; and the empty link before each line of a code
  block is gone.
* **Update**: [Contribute a tutorial](contributing.md) now explains how to add a
  tutorial to a learning pathway and how to write a self-check.
* **Creation**: Added fifteen [self-checks](pathways/self-checks.md), short questions
  whose answers come from doing a task, each with the likely slips explained. Twelve
  are confirmed against the practice data whenever the site is built; three are about
  portal screens and say so. With scripts on, a tutorial's self-check appears on its
  page, a point can be skipped by answering its questions, and each point ends with an
  optional reflection, which [Your progress](progress.md) can save as Markdown.
* **Creation**: Added [Your progress](progress.md) and progress on the
  [learning pathways](pathways/index.md). With scripts on, a pathway is drawn as a path
  with a stop for each tutorial; a tutorial can be marked done, and each finished one
  says what it set out to do; [Tutorials](tutorials/index.md) and
  [Every tutorial, by pathway point](pathway.md) are drawn the same way. The record is
  kept only in the reader's browser, and can be saved to a file, brought back, and
  cleared. Every page still reads as plain lists with scripts off.
* **Creation**: Added six [learning pathways](pathways/index.md), goal-based routes
  through the tutorials that each state their total time:
  [New to MESA](pathways/new-to-mesa.md),
  [Get ready for a hands-on session](pathways/get-ready-for-a-session.md),
  [Check a dataset before you trust it](pathways/check-a-dataset.md),
  [Work in R](pathways/work-in-r.md),
  [Use an AI agent and check what it says](pathways/use-an-ai-agent.md), and
  [Leave work others can rerun](pathways/leave-work-others-can-rerun.md).
  They are generated from `data/pathways.yml` by `scripts/gen_pathways.py`.
* **Update**: [Every tutorial, by pathway point](pathway.md), formerly "Learning
  pathway", is now generated at the same address. It gives each tutorial's time, names
  what each point builds, and splits point 1 into the six tutorials a newcomer needs and
  five small groups of reference tutorials. The home page now opens on the pathways.

## 2026-11-13

* **Creation**: Added two tutorials on the portal's built-in viewers, each followed once
  on the live portal:
  [Read a notebook in the portal without starting an app](tutorials/view-a-notebook.md) and
  [Look inside a CSV file from the portal](tutorials/preview-a-table.md).
* **Update**: Renamed, moved, trashed and restored a file on the live portal, and
  recorded that these work as they do for folders in
  [Rename a folder in your Data Store](tutorials/rename-a-folder.md),
  [Move folders into another folder](tutorials/move-folders.md), and
  [Move a folder to the trash and get it back](tutorials/trash-and-restore.md).
* **Update**: Finished the run on a newly created account, once CyVerse had granted it
  access to interactive apps. All five MESA apps started. The Python tutorials' code
  (28 outputs) and the R tutorials' code (11 outputs) gave the printed results inside
  MESA JupyterLab and MESA RStudio Geospatial. Followed by hand: launching JupyterLab,
  saving a notebook, loading a file, Monitor and Extend Time, Save & Exit, loading a
  file in RStudio, and the Cloud Shell, VS Code and desktop tutorials. Small corrections
  for what a new account sees went into
  [Launch MESA JupyterLab with your Data Store mounted](tutorials/launch-jupyterlab.md),
  [Save your work where it survives the session](tutorials/save-your-work.md),
  [Check on a running app and give it more time](tutorials/monitor-and-extend.md),
  [Write and run a Python script in MESA VS Code](tutorials/vscode-run-a-script.md),
  [Open a file from your Data Store in a desktop program](tutorials/desktop-open-a-file.md), and
  [Check your CPU hours and storage](tutorials/check-your-usage.md).
* **Creation**: Added four short portal tutorials, each followed once on the live portal:
  [Browse a large folder as a sorted list](tutorials/browse-a-large-folder.md),
  [Read the metadata on a folder shared with you](tutorials/read-shared-metadata.md),
  [Stop sharing a folder](tutorials/stop-sharing-a-folder.md), and
  [Check your CPU hours and storage](tutorials/check-your-usage.md).
* **Creation**: Added three file-handling tutorials, each followed once on the live
  portal with folders:
  [Rename a folder in your Data Store](tutorials/rename-a-folder.md),
  [Move folders into another folder](tutorials/move-folders.md), and
  [Move a folder to the trash and get it back](tutorials/trash-and-restore.md).
* **Update**: Checked [Share a folder with a collaborator](tutorials/share-a-folder.md)
  from a second account. **User Shared** lists a folder for each user, so the check now
  says how the collaborator finds yours and what read-only access looks like.
* **Update**: Began a run of the tutorials on a new CyVerse account. A new account
  cannot start an app until CyVerse grants access to interactive apps, so
  [Launch MESA JupyterLab with your Data Store mounted](tutorials/launch-jupyterlab.md)
  now says what the failed launch looks like and how to ask for access.
  [Share a folder with a collaborator](tutorials/share-a-folder.md) now describes the
  match line and the wait after **Share**.
* **Creation**: Added two tutorials to pathway point 5, followed in MESA JupyterLab:
  [Write a README for a data folder](tutorials/write-a-readme.md) and
  [Record the software versions a result depends on](tutorials/record-software-versions.md).
* **Creation**: Added a first tutorial for each of the remaining MESA apps, each followed
  once in the app:
  [Download a file from the web into your Data Store with MESA Cloud Shell](tutorials/cloud-shell-download.md),
  [Write and run a Python script in MESA VS Code](tutorials/vscode-run-a-script.md), and
  [Open a file from your Data Store in a desktop program](tutorials/desktop-open-a-file.md).
* **Update**: Closed gaps in today's tutorials after a second pass on the live portal.
  The R tutorials were followed one step at a time in MESA RStudio Geospatial. In
  [Search for a file or folder by name](tutorials/search-the-data-browser.md) every
  step is now one that was clicked, with its own screenshot and a note on searching
  after you open a result. `scripts/check_tutorial_outputs.R` checks the R tutorials'
  printed output, and the build workflow runs it in the MESA RStudio image.
* **Creation**: Added an R track for MESA RStudio Geospatial, run in the app:
  [Load a file from your Data Store in RStudio](tutorials/r-load-a-file.md),
  [Tally a quality flag in R](tutorials/r-tally-a-quality-flag.md), and
  [Query a Parquet file with DuckDB from R](tutorials/r-query-parquet-with-duckdb.md).
* **Creation**: Added four portal tutorials, each followed once on the live portal:
  [Make a folder in your Data Store](tutorials/make-a-folder.md),
  [Search for a file or folder by name](tutorials/search-the-data-browser.md),
  [Launch an app with the cores, memory, and time you choose](tutorials/launch-with-options.md),
  and [Check on a running app and give it more time](tutorials/monitor-and-extend.md).
  Tutorials on uploading a file and relaunching an app were not written, because both
  actions failed on the portal that day.
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
