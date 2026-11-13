# Tutorials

* [Sign in to the MESA Portal with a CyVerse account](sign-in.md) - Sign in to the MESA Portal at mesa.cyverse.org with a free CyVerse account and confirm that you reached your dashboard.
* [Find MESA's community data in the Data Browser](find-community-data.md) - Open the MESA community folder in the portal's Data Browser, confirm where you are from the folder header, and copy a folder's path.
* [Launch MESA JupyterLab with your Data Store mounted](launch-jupyterlab.md) - Start the MESA JupyterLab app from the MESA Portal and confirm that your CyVerse Data Store is available inside it.
* [Save your work where it survives the session](save-your-work.md) - Save a notebook inside your Data Store from MESA JupyterLab and confirm from the MESA Portal that it will outlive the app.
* [Stop an app and find your results](stop-app-find-results.md) - Stop a running MESA app with Save & Exit from the Analyses page and find its results in the Data Browser.
* [Practice data: five invented rain gauges](practice-data.md) - The synthetic rain-gauge practice dataset used by the data tutorials: what its four files contain, its data dictionary, and how to copy it into your Data Store.
* [Load a file from your Data Store into a notebook](load-a-file.md) - Read a CSV file that sits in your Data Store into a pandas table in MESA JupyterLab and confirm its size against what you expected.
* [Read the data dictionary before the data](read-the-data-dictionary.md) - Use a dataset's data dictionary to find out what each column means and which column you cannot yet add up, before you compute anything.
* [Check a column's range and missing values](check-range-and-missing.md) - Find the smallest and largest value in a column and count the blanks in every column, so that an impossible value or a gap shows up before you compute with it.
* [Tally a quality flag before you trust a number](tally-a-quality-flag.md) - Count how many rows carry each value of a quality flag, including the blanks, and look at the flagged rows before deciding what to do with them.
* [Count records per day to find incomplete days](count-records-per-day.md) - Count the rows for each gauge and day to find days that were recorded twice and days that were not recorded at all.
* [Reconcile row counts before and after a join](reconcile-a-join.md) - Join a table of readings to a table of gauges and confirm that the join neither added nor lost rows and left no reading without a match.
* [Leave a notebook someone else can rerun](leave-a-rerunnable-notebook.md) - Restart a notebook and run it from the top, remove what ties it to your session, and say at the top what it needs, so that another person gets the same result.
* [Find your way around the MESA Portal](find-your-way-around.md) - Use the MESA Portal's sidebar, dashboard, and user menu to reach your data, the apps, your analyses, and your quota.
* [Share a folder with a collaborator](share-a-folder.md) - Give one named CyVerse user read access to a folder in your Data Store from the MESA Portal's Data Browser, and confirm the access took effect.
* [Add metadata to a file or folder](add-metadata.md) - Describe a folder in your Data Store with an attribute and a value from the MESA Portal's Data Browser, and confirm the description was saved.
* [Sign in and start an AI agent in a MESA app](start-an-ai-agent.md) - Sign in to CyVerse from a terminal in a MESA app, connect an AI agent to a language model, and have it list the folders in your Data Store.
* [Keep tokens and passwords out of saved files](keep-secrets-out-of-files.md) - Give a notebook a token without typing it into a cell, and confirm that the saved notebook does not contain it.
* [Turn UTC timestamps into local days](local-days-from-utc.md) - Convert UTC timestamps to local time before grouping by day, and confirm the daily totals against values you already trust.
* [Work with a long table, one row per kind of measurement](work-with-a-long-table.md) - Recognise a table that stacks several kinds of measurement in one value column, summarise each kind separately, and reshape it to one column per measurement.
* [Query a Parquet file with DuckDB from a notebook](query-parquet-with-duckdb.md) - Run SQL against a Parquet file from a notebook with DuckDB, without loading the file into memory first, and bring a result back as a pandas table.
* [Check an AI-suggested result against the data](check-a-suggested-result.md) - Test a result that an AI assistant, or anyone else, hands you: reproduce the number, find what it rests on, and say whether the claim survives.
* [Map point data with sf in MESA RStudio Geospatial](map-points-in-rstudio.md) - Turn a table of longitudes and latitudes into spatial points with sf in MESA RStudio Geospatial, check a distance, and save a map to your Data Store.
* [Make a folder in your Data Store](make-a-folder.md) - Create a folder in your Data Store from the MESA Portal's Data Browser, so that a piece of work has one place to live.
* [Search for a file or folder by name](search-the-data-browser.md) - Find files and folders by name with the MESA Portal's Data Browser search, narrow the results, and open the folder a result lives in.
* [Launch an app with the cores, memory, and time you choose](launch-with-options.md) - Start MESA JupyterLab from the MESA Portal with a name, a number of CPU cores, an amount of memory, and a time limit that you set yourself.
* [Check on a running app and give it more time](monitor-and-extend.md) - Read how long a running MESA app has left, look at its logs, and extend its time limit from the Analyses page before it stops.
* [Load a file from your Data Store in RStudio](r-load-a-file.md) - Read a CSV file from your Data Store into an R data frame in MESA RStudio Geospatial, and confirm its size and column types.
* [Tally a quality flag in R](r-tally-a-quality-flag.md) - Count the rows for each value of a quality flag in R, including the missing ones, and look at the flagged rows before deciding what to do with them.
* [Query a Parquet file with DuckDB from R](r-query-parquet-with-duckdb.md) - Run SQL against a Parquet file from R with the duckdb package in MESA RStudio Geospatial, and get each result back as an ordinary data frame.
