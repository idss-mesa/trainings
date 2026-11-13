---
type: Reference
title: "Practice data: five invented rain gauges"
description: "The synthetic rain-gauge practice dataset used by the data tutorials: what its three files contain, its data dictionary, and how to copy it into your Data Store."
tags: [practice-data, p2, data-dictionary, jupyterlab]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs-jupyterlab
    resource: "https://idss-mesa.github.io/docs/apps/jupyterlab/"
    title: "MESA JupyterLab"
    author: "team:idss-mesa"
  - id: python
    resource: "https://docs.python.org/3/library/urllib.request.html"
    title: "urllib.request (Python standard library)"
    author: "team:python"
---

# Practice data: five invented rain gauges

!!! warning "Draft: not yet validated"
    The download below was run once in MESA JupyterLab, but nobody has yet followed
    this page from start to finish.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The data tutorials on this site all use the same three small files, so you can practise
a technique without first finding a dataset.

**The data is synthetic.** It was generated for these tutorials by
[`scripts/make_practice_data.py`](https://github.com/idss-mesa/trainings/blob/main/scripts/make_practice_data.py):
five invented rain gauges, with daily readings for July 2026 and one week of hourly
observations from one of them. It describes no
real place and no real measurement. Like real data, it is not perfectly clean, and the
tutorials show you how to find out where.

## The files

| File | Rows | One row is |
| --- | --- | --- |
| [`gauges.csv`](../assets/practice/gauges.csv) | 5 | one rain gauge |
| [`readings.csv`](../assets/practice/readings.csv) | 152 | one reading from one gauge |
| [`observations.csv`](../assets/practice/observations.csv) | 336 | one hourly measurement of one kind |

## Data dictionary

**gauges.csv**

| Column | Meaning |
| --- | --- |
| `gauge_id` | Identifier, `G01` to `G05` |
| `name` | Boathouse, Orchard, Observatory, Depot, or Quarry |
| `unit` | The unit this gauge reports in |
| `elevation_m` | Elevation in metres |

**readings.csv**

| Column | Meaning |
| --- | --- |
| `gauge_id` | Which gauge took the reading |
| `date` | Day of the reading, as `YYYY-MM-DD` |
| `value` | Rainfall for that day, in the gauge's own unit |
| `flag` | Blank, or `S` for a reading the sensor marked suspect |

**observations.csv**

| Column | Meaning |
| --- | --- |
| `gauge_id` | Which gauge; all rows are from `G03`, Observatory |
| `timestamp_utc` | Start of the hour, in UTC, as `YYYY-MM-DDTHH:MM:SSZ` |
| `measurement` | What was measured: `rain_mm` (rainfall in the hour, in millimetres) or `air_temp_c` (air temperature, in degrees Celsius) |
| `value` | The measured number, in the unit its `measurement` names |

The invented campus keeps US Mountain Time (`America/Denver`), six hours behind UTC in
July. The observations cover 10 to 16 July 2026 in local time.

## Copy the files into your Data Store

1. In [MESA JupyterLab](launch-jupyterlab.md), double-click **home** in the file
   browser, then the folder named after your CyVerse username.
2. Click the **New Folder** button, name the folder `mesa-practice`, and open it.
3. Choose **File → New → Notebook**. In the **Select Kernel** box, change the
   choice to **Python 3 (ipykernel)** (it starts on another language) and click **Select**.
   Then run this cell:

    ```python
    from urllib.request import urlretrieve

    base = "https://idss-mesa.github.io/trainings/assets/practice/"
    for name in ["gauges.csv", "readings.csv", "observations.csv"]:
        urlretrieve(base + name, name)
    ```

The three files then appear in `mesa-practice`, beside the notebook. Because the folder is in
your Data Store, they are still there the next time you start an app.

You can also download the files from the links above and upload them with the
portal's Data Browser; see
[Managing data, "Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete).

## Next

- [Load a file from your Data Store into a notebook](load-a-file.md)

The practice data is released under [CC BY 4.0](../about/license.md), like the rest of
this site.
