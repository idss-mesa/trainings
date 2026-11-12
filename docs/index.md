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

[Start with signing in :material-arrow-right:](tutorials/sign-in.md){ .md-button .md-button--primary }
[All tutorials](tutorials/index.md){ .md-button }

!!! warning "These tutorials are drafts"
    Every tutorial here was written from the
    [MESA documentation](https://idss-mesa.github.io/docs/) and has not yet been checked
    step by step on the live portal. Each page says so at the top and at the bottom.
    When a tutorial has been validated, its last line gives the date, who checked it, and
    what it was checked against.

## Getting started

These five tutorials take you from nothing to a saved notebook, in order. You need a web
browser and a free [CyVerse account](https://user.cyverse.org).

| I want to… | Tutorial | Time |
|---|---|---|
| Get into the portal | [Sign in to the MESA Portal with a CyVerse account](tutorials/sign-in.md) | 5 min |
| See the data MESA shares | [Find MESA's community data in the Data Browser](tutorials/find-community-data.md) | 5 min |
| Start working in a notebook | [Launch MESA JupyterLab with your Data Store mounted](tutorials/launch-jupyterlab.md) | 5–10 min |
| Not lose my work | [Save your work where it survives the session](tutorials/save-your-work.md) | 5–10 min |
| Finish for the day | [Stop an app and find your results](tutorials/stop-app-find-results.md) | 5 min |

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

## For AI agents

This site is an [Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
knowledge bundle with the same conventions as the MESA documentation. Start at
[`https://idss-mesa.github.io/trainings/llms.txt`](https://idss-mesa.github.io/trainings/llms.txt)
or read [For AI agents](about/ai-agents.md).
