---
type: Reference
title: "Practice data: five invented rain gauges"
description: "The synthetic rain-gauge practice dataset used by the data tutorials: what its two files contain, its data dictionary, and how to copy it into your Data Store."
tags: [practice-data, p2, data-dictionary, jupyterlab]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
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
    Nobody has yet copied these files into a Data Store from MESA JupyterLab by
    following this page. The download address works only once this site is published.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

The data tutorials on this site all use the same two small files, so you can practise
a technique without first finding a dataset.

**The data is synthetic.** It was generated for these tutorials by
[`scripts/make_practice_data.py`](https://github.com/idss-mesa/trainings/blob/main/scripts/make_practice_data.py):
five invented rain gauges, with daily readings for July 2026. It describes no
real place and no real measurement. Like real data, it is not perfectly clean, and the
tutorials show you how to find out where.

## The files

| File | Rows | One row is |
| --- | --- | --- |
| [`gauges.csv`](../assets/practice/gauges.csv) | 5 | one rain gauge |
| [`readings.csv`](../assets/practice/readings.csv) | 152 | one reading from one gauge |

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

## Copy the files into your Data Store

1. In [MESA JupyterLab](launch-jupyterlab.md), open your home folder in the file
   browser, as in [Save your work where it survives the session](save-your-work.md).
2. Click the **New Folder** button, name the folder `mesa-practice`, and open it.
3. Choose **File → New → Notebook**, pick the **Python 3** kernel, and run this cell:

    ```python
    from urllib.request import urlretrieve

    base = "https://idss-mesa.github.io/trainings/assets/practice/"
    for name in ["gauges.csv", "readings.csv"]:
        urlretrieve(base + name, name)
    ```

Both files then appear in `mesa-practice`, beside the notebook. Because the folder is in
your Data Store, they are still there the next time you start an app.

You can also download the two files from the links above and upload them with the
portal's Data Browser; see
[Managing data, "Upload, create, move, and delete"](https://idss-mesa.github.io/docs/portal/data/#upload-create-move-and-delete).

## Next

- [Load a file from your Data Store into a notebook](load-a-file.md)

The practice data is released under [CC BY 4.0](../about/license.md), like the rest of
this site.
