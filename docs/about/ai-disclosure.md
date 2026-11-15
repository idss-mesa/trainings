---
type: Reference
title: "How AI was used to make this site"
description: "Which parts of MESA Trainings were drafted with an AI assistant, what a person has and has not checked, and how to tell for any single page."
tags: [about, ai-disclosure, provenance]
status: draft
generated: { by: "claude/mythos-5.2", at: "2026-11-14T00:00:00Z" }
sources:
  - id: repo
    resource: "https://github.com/idss-mesa/trainings"
    title: "idss-mesa/trainings repository (front matter, AGENTS.md, and docs/log.md)"
    author: "team:idss-mesa"
  - id: template
    resource: "https://idss-mesa.github.io/trainings/template/"
    title: "Tutorial template"
    author: "team:idss-mesa"
---

# How AI was used to make this site

Every page on this site was drafted with an AI assistant, working under the direction
of the MESA training team[^repo]. This page says what that covers, what it does not tell
you, and how to check any page for yourself.

## What was drafted with AI

| Part of the site | How AI was used |
|---|---|
| Tutorials | The text, steps, and code were drafted by an AI coding assistant from the MESA documentation |
| Printed results in tutorials | Real output from running the code. Scripts compare them again each time the site is built |
| Learning pathways and self-checks | Drafted with AI assistance |
| Practice data | Synthetic files made by a script with a fixed seed. The page describing them was drafted with AI assistance |
| Other pages, including this one | Drafted with AI assistance |

## What a person has checked

Being drafted with AI says nothing about whether a page is right. Two other signals do.

- **The draft notice.** A tutorial marked *Draft: not yet validated* has not been
  followed from start to finish by a second person. Today that is every tutorial.
- **The last line.** Each tutorial ends by saying what was run or followed, where, and
  when. If that line does not name a person, read it as "not yet checked by one".

When a person validates a tutorial, the notice comes off and the last line names them.
The statement that AI helped draft it stays[^template].

## How to tell for one page

1. Read the tutorial's last line.
2. For the exact tool, open the page's Markdown twin (the page address plus
   `index.md`) and read `generated.by` at the top. A tool name and version means an
   AI assistant or other tool wrote that version of the page. `human:` followed by a
   name means a person did.
3. The [changelog](../log.md) records what was checked on the live portal, by date.

## What this means for you

- Follow a draft with care. Screen names and steps come from documentation and may
  differ from what you see.
- If a step is wrong, [open an issue](https://github.com/idss-mesa/trainings/issues).
  A correction from someone who has just followed the steps is the most useful
  contribution this site can get.
- If you reuse a tutorial under its [license](license.md), keep the statement that it
  was drafted with AI assistance.

## If you contribute

Say when you used AI, in the page's last line and in `generated.by`. See
[Contribute a tutorial](../contributing.md).

[^repo]: idss-mesa/trainings repository, <https://github.com/idss-mesa/trainings>.
[^template]: Tutorial template, <https://idss-mesa.github.io/trainings/template/>.
