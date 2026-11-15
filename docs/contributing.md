---
type: Guide
title: "Contribute a tutorial"
description: "How to report a problem with a MESA tutorial, fix one, write a new one, add it to a learning pathway, write a self-check, and validate a tutorial on the live portal."
tags: [contributing, tutorials, pathway, self-check]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-14T00:00:00Z" }
sources:
  - id: repo
    resource: "https://github.com/idss-mesa/trainings"
    title: "idss-mesa/trainings repository"
    author: "team:idss-mesa"
---

# Contribute a tutorial

The tutorials live as Markdown files in the
[idss-mesa/trainings](https://github.com/idss-mesa/trainings) repository[^repo]. Anyone
who can write Markdown can improve them.

## Report a problem

If a step did not match what you saw, [open an issue](https://github.com/idss-mesa/trainings/issues)
with the tutorial's title, the step number, what the page said, and what you saw instead.
A screenshot helps. Leave passwords, tokens, and private data out of it.

## Fix or write a tutorial

1. Fork the repository, or create a branch if you are a member of the organization.
2. For a new tutorial, copy the [tutorial template](template.md) into
   `docs/tutorials/<task-name>.md` and follow its rules. One task per tutorial, up to
   about 600 words.
3. Add the page in two places: the `nav` list in `zensical.toml`, and a bullet in
   `docs/tutorials/index.md` whose description matches the page's `description`.
4. Add a dated entry to `docs/log.md`.
5. To put the tutorial in a learning pathway, add its file name to one `tutorials:` list
   in `data/pathways.yml`. Without that it is still listed under its point on
   [Every tutorial, by pathway point](pathway.md).
6. Check it locally:

    ```bash
    pip install zensical pyyaml
    python scripts/okf_validate.py docs      # front matter is complete
    python scripts/gen_pathways.py           # regenerate the pathway pages
    python scripts/gen_llms_txt.py           # regenerate llms.txt and llms-full.txt
    zensical build --clean --strict          # the site builds with no broken links
    zensical serve                           # preview at http://localhost:8000
    ```

7. Commit the regenerated files with your change, and open a pull request. Changes reach the site only through a reviewed pull request.

## Add a tutorial to a pathway

A [learning pathway](pathways/index.md) is a short route through the tutorials towards
one goal. The pathways are described in one file, `data/pathways.yml`, and the pages
are written from it by a script. Never edit `docs/pathways/` or `docs/pathway.md` by
hand.

1. Give the tutorial its pathway tag, `p1` to `p5`, in its front matter, and a
   `**Time:** N minutes.` line. The pathway pages read its title, point, and time from
   the tutorial itself.
2. In `data/pathways.yml`, find the pathway and the stage for the tutorial's point, and
   add the file name, without `.md`, to that stage's `more:` list:

    ```yaml
      - point: p2
        tutorials:
          - practice-data
          - load-a-file
        more:
          - your-new-tutorial
    ```

    `tutorials:` holds the essentials, the few a reader cannot do without, and `more:`
    holds what to take with more time. Pathways are kept short on purpose: the
    essentials of a pathway may not add up to more than `essentials_minutes`, now 25.
    Add to `tutorials:` only if a reader would be stuck without the tutorial, and expect
    to move another one to `more:` to make room.
3. Run `python scripts/gen_pathways.py` and commit what it writes. It stops with a
   message if a name matches no tutorial, if a tutorial sits under the wrong point, or
   if the essentials run over the limit.

Readers can shorten a pathway further by answering "Where are you starting?" on the
[pathways page](pathways/index.md). Two lists under `tailoring:` in the same file
drive that: `foundations`, the point 2 tutorials that later ones build on, and `in_r`,
which names the R tutorial that replaces a Python one. A new R counterpart is one line
there.

A tutorial that is in no pathway still appears under its point on
[Every tutorial, by pathway point](pathway.md). To choose its place there, add it to a
group under `by_point:` in the same file.

A new pathway is a new entry under `pathways:` and one line in the `nav` list in
`zensical.toml`. Name it for what the reader wants to do, never for a numbered session
or a date.

## Write a self-check

A [self-check](pathways/self-checks.md) is one short question a reader tries after a
tutorial. It lives under `checks:` in `data/pathways.yml`, not in the tutorial, so the
tutorial keeps its six parts.

```yaml
  rows-without-repeats:
    tutorial: count-records-per-day
    ask: Remove exact repeats with `drop_duplicates()`. How many rows remain?
    answer: 151
    how: len(readings.drop_duplicates())
    verify:
      python: |
        len(readings.drop_duplicates())
    right: One row, G03 on 5 July, is written twice, so 152 becomes 151.
    slips:
      "152": That is the table as loaded. One row for G03 is written twice.
    otherwise: Count the rows of `readings.drop_duplicates()`.
```

1. **Ask for something the tutorial does not print.** Choose a number the reader gets
   by a small change to what the tutorial taught. If the answer is on the page, it can
   be read off without doing the task.
2. **Give a number**, or for an answer in two parts, a list of `options:` with the right
   one repeated as `answer:`.
3. **Write `verify:` code** whose last line gives the answer from the practice data.
   `pandas` as `pd`, `duckdb`, and the tables `readings`, `gauges`, `sites`, and `obs`
   are already loaded. For an R tutorial use `r:` with one expression. The site will
   not build if the code and the answer disagree.
4. **Name the likely slips.** For each wrong answer a careful person might give, write
   one sentence under `slips:` that says what went wrong, and a general hint under
   `otherwise:`. Write `right:` as the one sentence that explains the answer.
5. **A question about a portal screen has no `verify:`.** It is shown as "not
   machine-checked". Write one only for a tutorial that has been followed on the live
   portal, and take the answer from that tutorial's own text.
6. To let readers skip a point by answering its questions, list their names under that
   point's `skip_check:`.
7. Check it:

    ```bash
    pip install pandas==3.1.1 duckdb==2.0.0 pyyaml
    python scripts/gen_pathways.py           # writes the self-checks page
    python scripts/check_self_checks.py      # the answers agree with the data
    ```

Self-check answers are public and are for a reader's own use. Answer keys for training
sessions do not belong in this repository.

## What belongs here

Only what a participant or a MESA user should read.

- **Yes:** single-task tutorials, and pages that help readers find and use them.
- **No:** answer keys, facilitator notes, session plans, review checklists, or
  correspondence with partners. Those are kept elsewhere.
- **No:** features that the public [MESA documentation](https://idss-mesa.github.io/docs/)
  does not describe. Document the feature there first, then write the tutorial.
- **Never:** usernames, passwords, tokens, or keys, including in screenshots.

## Validate a tutorial

A tutorial is a draft until someone other than its author has followed it from start to
finish on the live portal. To validate one:

1. Follow every step exactly as written, in a fresh browser session.
2. At each step, compare what you see with "You should see". Note every difference,
   however small: a button with another name, a screen in another order.
3. Do the check at the end, and try the "If it didn't" slip on purpose to confirm its
   symptom and its fix.
4. Open a pull request that corrects the text and replaces the last line with the date,
   your name, and what you tested against (portal, app, and image or version).

A maintainer then removes the draft notice, sets `status: stable`, and records the
validation. Only a human maintainer adds the `verified:` key.

## License of contributions

By contributing you agree that your text and images are released under
[CC BY 4.0](about/license.md) and any code under the BSD 3-Clause license, the same
terms as the rest of the site.

[^repo]: idss-mesa/trainings repository, <https://github.com/idss-mesa/trainings>.
