# Tutorials

* [Sign in to the MESA Portal with a CyVerse account](sign-in.md) - Sign in to the MESA Portal at mesa.cyverse.org with a free CyVerse account and confirm that you reached your dashboard.
* [Find MESA's community data in the Data Browser](find-community-data.md) - Open the MESA community folder in the portal's Data Browser, confirm where you are from the folder header, and copy a folder's path.
* [Launch MESA JupyterLab with your Data Store mounted](launch-jupyterlab.md) - Start the MESA JupyterLab app from the MESA Portal and confirm that your CyVerse Data Store is available inside it.
* [Save your work where it survives the session](save-your-work.md) - Save a notebook inside your Data Store from MESA JupyterLab and confirm from the MESA Portal that it will outlive the app.
* [Stop an app and find your results](stop-app-find-results.md) - Stop a running MESA app with Save & Exit from the Analyses page and find its results in the Data Browser.
* [Practice data: five invented rain gauges](practice-data.md) - The synthetic rain-gauge practice dataset used by the data tutorials: what its two files contain, its data dictionary, and how to copy it into your Data Store.
* [Load a file from your Data Store into a notebook](load-a-file.md) - Read a CSV file that sits in your Data Store into a pandas table in MESA JupyterLab and confirm its size against what you expected.
* [Read the data dictionary before the data](read-the-data-dictionary.md) - Use a dataset's data dictionary to find out what each column means and which column you cannot yet add up, before you compute anything.
* [Check a column's range and missing values](check-range-and-missing.md) - Find the smallest and largest value in a column and count the blanks in every column, so that an impossible value or a gap shows up before you compute with it.
* [Tally a quality flag before you trust a number](tally-a-quality-flag.md) - Count how many rows carry each value of a quality flag, including the blanks, and look at the flagged rows before deciding what to do with them.
* [Count records per day to find incomplete days](count-records-per-day.md) - Count the rows for each gauge and day to find days that were recorded twice and days that were not recorded at all.
* [Reconcile row counts before and after a join](reconcile-a-join.md) - Join a table of readings to a table of gauges and confirm that the join neither added nor lost rows and left no reading without a match.
* [Leave a notebook someone else can rerun](leave-a-rerunnable-notebook.md) - Restart a notebook and run it from the top, remove what ties it to your session, and say at the top what it needs, so that another person gets the same result.
