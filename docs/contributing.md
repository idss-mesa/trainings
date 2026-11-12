---
type: Guide
title: "Contribute a tutorial"
description: "How to report a problem with a MESA tutorial, fix one, write a new one, and validate one on the live portal."
tags: [contributing, tutorials]
status: draft
generated: { by: "claude-code/2.1.224", at: "2026-11-11T00:00:00Z" }
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
5. Check it locally:

    ```bash
    pip install zensical pyyaml
    python scripts/okf_validate.py docs      # front matter is complete
    python scripts/gen_llms_txt.py           # regenerate llms.txt and llms-full.txt
    zensical build --clean --strict          # the site builds with no broken links
    zensical serve                           # preview at http://localhost:8000
    ```

6. Commit the regenerated `docs/llms.txt` and `docs/llms-full.txt` with your change, and
   open a pull request. Changes reach the site only through a reviewed pull request.

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
