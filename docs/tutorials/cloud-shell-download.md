---
type: Guide
title: "Download a file from the web into your Data Store with MESA Cloud Shell"
description: "Start MESA Cloud Shell, go to a folder in your Data Store, and fetch a file from a web address straight into it with curl."
tags: [byte, p1, cloud-shell, terminal, data-store]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/apps/cli/"
    title: "MESA CLI (Cloud Shell)"
    author: "team:idss-mesa"
---

# Download a file from the web into your Data Store with MESA Cloud Shell

!!! warning "Draft: not yet validated"
    These steps were followed once in the app on 2026-11-13, by the person who wrote
    them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

MESA Cloud Shell is a terminal in your browser. It is the quickest app to start, and
a file it downloads goes straight into your Data Store without passing through your
own computer.

**You will:** have a file from a web address saved in your Data Store.

**Time:** 5 to 10 minutes. **You need:** to be [signed in to the MESA Portal](sign-in.md).

## Steps

1. In the portal, click **Applications**, and on the **MESA Cloud Shell** card click
   **Instant Launch**. Wait for the app to open; it can take a minute or two.

    You should see: a terminal with a MESA welcome screen and a prompt that ends in
    `~/data-store $>`.

2. Go to your home folder in the Data Store:

    ```bash
    cd ~/data-store/home/$IPLANT_USER
    pwd
    ```

    You should see: the path, ending in your CyVerse username.

    ```text
    /home/jovyan/data-store/home/<your username>
    ```

3. Make a folder for the file and go into it:

    ```bash
    mkdir -p mesa-practice
    cd mesa-practice
    ```

    You should see: the prompt now ends in `mesa-practice $>`.

4. Fetch the file. `-O` keeps the file's own name:

    ```bash
    curl -O https://idss-mesa.github.io/trainings/assets/practice/readings.csv
    ```

    You should see: a progress table whose first number reaches `100`.

5. Check what arrived:

    ```bash
    wc -l readings.csv
    head -3 readings.csv
    ```

    You should see: the line count, then the first three lines.

    ```text
    153 readings.csv
    gauge_id,date,value,flag
    G01,2026-07-01,0.0,
    G01,2026-07-02,0.0,
    ```

6. In the portal's browser tab, click **Data Browser**, then **My Files**, and open
   **mesa-practice**.

    You should see: `readings.csv` in the listing.

## Check it worked

`readings.csv` is in **My Files → mesa-practice** in the portal, and `wc -l` counted
153 lines: a header and 152 readings.

## If it didn't

**`head` shows HTML such as `<!doctype html>` instead of data.** The address was
wrong, and `curl` saved the website's error page under the file's name. Delete it with
`rm readings.csv`, check the address, and run step 4 again. Adding `-f` to `curl`
makes it refuse to save an error page.

## Next

- [Stop an app and find your results](stop-app-find-results.md), when you have
  finished with the terminal.
- [Load a file from your Data Store into a notebook](load-a-file.md)
- Reference: [MESA CLI (Cloud Shell)](https://idss-mesa.github.io/docs/apps/cli/), for
  what else the terminal contains.

*Not yet validated by a second person. Drafted 2026-11-13 and followed once in the app that day.*
