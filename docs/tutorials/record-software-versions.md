---
type: Guide
title: "Record the software versions a result depends on"
description: "Write the Python version and the versions of every installed package to files beside your work, so that a result can be traced to the software that produced it."
tags: [byte, p5, reproducibility, jupyterlab, environment]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: pip
    resource: "https://pip.pypa.io/en/stable/cli/pip_list/"
    title: "pip list (pip documentation)"
    author: "team:pypa"
---

# Record the software versions a result depends on

!!! warning "Draft: not yet validated"
    The commands on this page were run in MESA JupyterLab on 2026-11-13 and produced
    the output shown. Nobody else has yet followed the steps.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The software in a MESA app changes when the app is rebuilt. A number you computed
today may not come out the same next year, and without a record you cannot tell
whether the data or the software changed.

**You will:** have two small files beside your work that say which Python and which
package versions it ran on.

**Time:** 5 minutes. **You need:** [MESA JupyterLab running](launch-jupyterlab.md), and
a folder that holds your work, such as `mesa-practice` from the
[practice data](practice-data.md).

## Steps

1. In JupyterLab's file browser, open the folder that holds your work. In the
   **Launcher**, click **Terminal**.

    You should see: a terminal whose prompt ends with the name of your folder. A
    terminal opened from the Launcher starts in the folder the file browser is showing.

2. Check the Python version:

    ```bash
    python --version
    ```

    You should see: one line, such as `Python 3.13.18`.

3. Write every installed package and its version to a file:

    ```bash
    pip list --format=freeze > requirements.txt
    ```

    You should see: no output, and `requirements.txt` in the file browser.

4. Count what was recorded:

    ```bash
    wc -l requirements.txt
    ```

    You should see: a few hundred lines, one for each package. In our test:

    ```text
    244 requirements.txt
    ```

5. Look up the packages your work imports:

    ```bash
    grep -E '^(pandas|duckdb|numpy)==' requirements.txt
    ```

    You should see: one line for each, with its version. In our test:

    ```text
    duckdb==2.0.0
    numpy==2.5.4
    pandas==3.1.1
    ```

6. Write a one-line note that ties the two together and dates them:

    ```bash
    echo "Python $(python --version | cut -d' ' -f2), packages in requirements.txt, recorded $(date +%F)" > environment.txt
    cat environment.txt
    ```

    You should see: the note. In our test:

    ```text
    Python 3.13.18, packages in requirements.txt, recorded 2026-11-13
    ```

## Check it worked

The folder holds `requirements.txt` and `environment.txt`, and step 5 shows a version
for each package your work imports.

## If it didn't

**Step 5 prints nothing.** The package names in the pattern do not match what is
installed. Search for one name without the `==`, for example
`grep -i pandas requirements.txt`, and use the spelling it shows.

## Next

- These files record the software; they do not rebuild it. To run old work again you
  need an app with the same versions, or to install them yourself.
- Record again whenever a result goes into a report: the date in `environment.txt`
  says which run the record belongs to.
- [Leave a notebook someone else can rerun](leave-a-rerunnable-notebook.md)
- [Write a README for a data folder](write-a-readme.md), and mention these two files
  in it.

*Not yet validated by a second person. Drafted 2026-11-13 and followed in MESA JupyterLab that day.*
