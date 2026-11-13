---
type: Reference
title: "Tutorial template"
description: "The template every MESA tutorial follows: the front matter, the six fixed parts, the draft notice, and the validation line."
tags: [contributing, template, byte]
status: draft
generated: { by: "claude-code/2.1.224", at: "2026-11-11T00:00:00Z" }
sources:
  - id: quickbytes
    resource: "https://github.com/UNM-CARC/QuickBytes"
    title: "UNM CARC QuickBytes"
    author: "team:unm-carc"
  - id: docs-agents
    resource: "https://github.com/idss-mesa/docs/blob/main/AGENTS.md"
    title: "Agent guide — MESA documentation (page front matter)"
    author: "team:idss-mesa"
---

# Tutorial template

A MESA tutorial, called a *byte*, is one short page that gets a reader through one task.
The format is modelled on UNM CARC's QuickBytes[^quickbytes], and the front matter is
the one the MESA documentation uses for every page[^docs-agents].

Copy the block below into a new file under `docs/tutorials/`, named for the task in
lower case with hyphens (`share-a-folder.md`), and replace everything in angle brackets.
[Contribute a tutorial](contributing.md) explains the rest.

## The template

````markdown
---
type: Guide
title: "<Verb-first task, as the index will list it>"
description: "<One sentence: what the reader will have done.>"
tags: [byte, <pathway point p1-p5>, <feature>]
status: draft
generated: { by: "<human:id, or tool/version>", at: "<YYYY-MM-DD>T00:00:00Z" }
stale_after: "<review date, six months out>T00:00:00Z"
sources:
  - id: docs
    resource: "<URL of the MESA documentation page this draws on>"
    title: "<its title>"
    author: "team:idss-mesa"
---

# <Verb-first task>

!!! warning "Draft: not yet validated"
    This tutorial was written from the MESA documentation. Nobody has yet followed it
    from start to finish on the live portal, so a screen name or a step may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

**You will:** <one sentence naming the thing you end up with>.

**Time:** <5-10> minutes. **You need:** <account, app, or earlier tutorial, each linked>.

## Steps

1. <One action. **Screen labels** in bold.>

    You should see: <what tells you it worked>.

2. <...>

    You should see: <...>.

## Check it worked

<The one observable result that means success.>

## If it didn't

**<Symptom, as the reader sees it>.** <The single most likely cause and its fix.>

## Next

- <The tutorial that follows, linked>
- Reference: <the MESA documentation page for the full picture, linked>

*Not yet validated on the live portal. Drafted <YYYY-MM-DD> from <source>.*
````

## Rules

1. **One task, named by its verb.** "Launch JupyterLab with your Data Store mounted",
   not "JupyterLab". If the title needs "and" to join two tasks, write two tutorials.
2. **Short.** Up to about 600 words and seven steps; five to ten minutes for someone
   doing it for the first time.
3. **Six fixed parts, in this order:** what you will have, what you need, the steps, how
   to check it worked, what to do if it did not, and where to go next.
4. **Every step says what you should see.** A step without a visible result cannot be
   validated.
5. **One check at the end** that tells success from failure without judgment: a file
   listed, a count, a name on screen.
6. **One "If it didn't":** the single most likely slip, described by its symptom. If you
   need more than one, the tutorial covers too much.
7. **Link, don't repeat.** Name the MESA documentation page the tutorial draws on, and
   the tutorials before and after it. Reuse the documentation's screenshots by linking
   to them; a screenshot supports a step and never replaces it, and always has a text
   description.
8. **Names as the screen shows them, in bold.** Anything the reader types goes in a code
   block that can be copied.
9. **No credentials, ever.** Use a placeholder and one line on where readers get their
   own.
10. **Stands on its own.** A tutorial never assumes a training session, a group, or a
    schedule.
11. **Data is public, synthetic, or authorized,** with its attribution line when a
    tutorial uses a dataset.

## Front matter

| Field | What goes in it |
|---|---|
| `type` | `Guide` for a tutorial |
| `title`, `description` | The task, verb first, and one plain sentence. The description becomes the entry in the tutorial list and in `llms.txt`. |
| `tags` | Always `byte`, then one pathway tag (`p1` orient and navigate, `p2` run and understand, `p3` query and connect, `p4` explore and verify, `p5` preserve and share), then the feature |
| `status` | `draft` until someone other than the author has followed the tutorial from start to finish on the live platform, then `stable` |
| `generated` | Who or what wrote it and when: `human:<id>` for a person, `<tool>/<version>` for an AI agent or tool |
| `stale_after` | The review date, six months out. A portal or app release that changes a named screen brings it forward. |
| `sources` | The documentation pages the tutorial draws on |

There is deliberately no `verified:` key in the template. Only a human maintainer adds
it, after validation.

## The draft notice and the validation line

A tutorial that has not been validated carries the **Draft: not yet validated** notice
under its title and ends with the *Not yet validated* line. When it has been validated,
the maintainer removes the notice, sets `status: stable`, and replaces the last line
with:

```markdown
*Validated <date> by <who> on <portal, app, and image or version>.*
```

A data tutorial, one that teaches a technique on the
[practice data](tutorials/practice-data.md), words both a little differently, because
its code can be run before anyone tries it in a MESA app. Its notice says where the
code was run, and its last line reads *Not yet validated in MESA JupyterLab*. Copy
both from an existing data tutorial such as
[Load a file from your Data Store into a notebook](tutorials/load-a-file.md).

[^quickbytes]: UNM CARC QuickBytes, <https://github.com/UNM-CARC/QuickBytes>.
[^docs-agents]: Agent guide, MESA documentation, <https://github.com/idss-mesa/docs/blob/main/AGENTS.md>.
