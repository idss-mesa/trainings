---
type: Guide
title: "Open a file from your Data Store in a desktop program"
description: "Start the MESA KASM Ubuntu Desktop, find a file in your Data Store with its file manager, and open it in a desktop program."
tags: [byte, p1, kasm, desktop, data-store]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-13T00:00:00Z" }
stale_after: "2027-05-13T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/apps/kasm/"
    title: "MESA KASM Ubuntu Desktop"
    author: "team:idss-mesa"
---

# Open a file from your Data Store in a desktop program

!!! warning "Draft: not yet validated"
    These steps were followed once in the app on 2026-11-13, by the person who wrote
    them. Nobody else has yet followed them, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Some software only has a graphical interface: desktop GIS, image editors, 3D viewers.
The MESA KASM Ubuntu Desktop is a full Linux desktop in a browser tab, with your Data
Store attached, for that kind of program.

**You will:** have opened an image from your Data Store in GIMP, an image editor, on
the MESA desktop.

**Time:** 10 minutes, some of it waiting for the desktop to start. **You need:** to be
[signed in to the MESA Portal](sign-in.md), and an image in your Data Store, such as
`gauge-map.png` from
[Map point data with sf in MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. In the portal, click **Applications**, and on the **MESA KASM Ubuntu Desktop** card
   click **Instant Launch**. Wait for the desktop; in our test it took two and a half
   minutes.

    You should see: a desktop with **Trash**, **File System**, and **Home** icons at
    the top left, and a row of icons at the bottom.

2. Double-click **Home**.

    You should see: a file manager window with a **data-store** folder among the
    others.

3. Double-click **data-store**, then **home**, then the folder named after your
   CyVerse username.

    You should see: the folders of your Data Store home, the same ones **My Files**
    shows in the portal.

4. Double-click the folder that holds your image, for example **mesa-practice**.

    You should see: your files, each with an icon for its type.

5. Right-click the image, point to **Open With**, and choose **GNU Image Manipulation
   Program**.

    You should see: after ten to twenty seconds, a GIMP window with the image in the
    middle and tool panels on both sides.

6. Read the title bar of the GIMP window.

    You should see: the file's name and its size in pixels, for example
    `[gauge-map] (imported)-1.0 (… 1800x1200 – GIMP`.

## Check it worked

The image is displayed in GIMP, and the title bar shows its name. You opened it where
it lives: nothing was downloaded to your own computer.

## If it didn't

**A window asks you to accept the Google Chrome terms of service.** You double-clicked
the image, and the desktop's default program for images is Chrome. Click **Cancel**,
then open the image with the right-click menu as in step 5.

## Next

- Save anything you change under **data-store**. The rest of the desktop is deleted
  when the app stops.
- [Stop an app and find your results](stop-app-find-results.md), when you have
  finished with the desktop.
- Reference: [MESA KASM Ubuntu Desktop](https://idss-mesa.github.io/docs/apps/kasm/),
  for what the desktop contains.

*Not yet validated by a second person. Drafted 2026-11-13 and followed once in the app that day.*
