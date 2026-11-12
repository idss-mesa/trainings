# Agent guide — MESA Trainings

This repository holds the MESA training site,
https://idss-mesa.github.io/trainings/, built with
[Zensical](https://zensical.org) from `docs/`. It follows the conventions of
[idss-mesa/docs](https://github.com/idss-mesa/docs): the `docs/` tree is an
**Open Knowledge Format (OKF) v0.2 knowledge bundle**
([spec](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)),
and every content page carries YAML frontmatter with `type` (Guide |
Reference), `title`, `description`, `tags`, provenance (`generated`,
`sources`) and lifecycle (`status`, `stale_after`) fields. Section `index.md`
files are OKF §8 directory listings (no frontmatter); `docs/log.md` is the
OKF §9 dated change log.

The content is **tutorials** ("bytes"): one short page per task on the MESA
Portal and its apps. The format is in `docs/template.md`; read it before
writing or editing a tutorial.

## Reading the corpus

- `docs/llms.txt` — linked outline of every page with descriptions (generated;
  do not edit).
- `docs/llms-full.txt` — the entire corpus in one file (generated; do not
  edit).
- Live site: any page URL + `index.md` returns that page's Markdown source.
  The same content is on GitHub at
  `https://raw.githubusercontent.com/idss-mesa/trainings/main/docs/<path>.md`.
  Crawlers honour only the origin robots.txt, which lives in the
  `idss-mesa/idss-mesa.github.io` repository.
- Trust: pages without a `verified:` key are **unverified** (OKF §5.3).
  `status: draft` tutorials were written from documentation and have not been
  followed on the live portal.

## Commands

```bash
pip install zensical pyyaml                     # or prefix each command with `uvx --with pyyaml`
zensical serve                                  # live preview at localhost:8000
zensical build --clean --strict                 # static site -> site/
python scripts/okf_validate.py docs             # OKF conformance (CI-enforced; 0 errors required)
python scripts/gen_llms_txt.py                  # regenerate docs/llms.txt + docs/llms-full.txt (CI checks drift)
python scripts/postbuild_agent_surface.py site  # after build: md mirror + okf:* meta + robots.txt
```

The scripts are the ones in idss-mesa/docs and read `site_url`, `repo_url`,
`edit_uri`, and `nav` from `zensical.toml`. Keep them in step with that
repository rather than changing them here.

## Editing rules

1. **Every content page** under `docs/` starts with OKF frontmatter: a
   non-empty `type`, plus `title`, `description` (one plain sentence — it
   becomes the meta description and the `llms.txt` entry), `tags`,
   `generated: { by, at }` and `sources` (each with `id`, `resource`,
   `title`, `author`), `status`, and `stale_after` when the page states facts
   that may change. Run `okf_validate.py` before committing.
2. **`index.md` files carry no frontmatter.** A section index is a
   `# Heading` followed by `* [Title](page.md) - description` bullets listing
   every page in that directory, each description matching the page's
   frontmatter. The one exception is the root `docs/index.md`, which carries
   `okf_version: "0.2"`, `title`, `description` and `icon` and keeps a
   homepage body — a documented deviation; do not "fix" it.
3. **`docs/log.md`** gets a dated entry (`## YYYY-MM-DD`, newest first;
   `* **Creation**:` / `* **Update**:` / `* **Deprecation**:`) for every
   substantive change.
4. **Regenerate after content changes:** `python scripts/gen_llms_txt.py`,
   then commit `docs/llms.txt` and `docs/llms-full.txt` with the change.
5. **New pages go in the `nav` array of `zensical.toml`** and in their
   section's `index.md`; `zensical build --strict` must still succeed.
6. **Links:** links inside this site are relative and plain
   (`sign-in.md`, `../contributing.md`). Links to the MESA documentation are
   absolute (`https://idss-mesa.github.io/docs/...`). Code belongs in fenced
   blocks with a language.
7. **Actors** (OKF §7): `generated.by` is `<producer>/<version>` for an agent
   or tool, `human:<id>` for a person. Bump `generated.at` on a meaningful
   content change, not on typo or formatting fixes.
8. **Never add `verified:`.** Only a human maintainer does that, as
   `verified: { by: "human:<id>", at: <ISO 8601> }`.

## Tutorial rules

9. **One task per tutorial**, up to about 600 words and seven steps, in the
   six fixed parts of `docs/template.md`. Every step says what the reader
   should see.
10. **A tutorial you cannot validate on the live portal is a draft.** Keep
    `status: draft`, keep the "Draft: not yet validated" notice under the
    title, and keep the "Not yet validated" last line. Never write a
    "Validated …" line for a check you did not perform, and never change
    `status` to `stable` yourself.
11. **Link, don't repeat.** Draw the steps from the MESA documentation, name
    the page in `sources` and under "Next", and reuse its screenshots by
    absolute URL with alt text. Do not copy documentation pages into this
    site.
12. **Only documented features.** Write about what the public MESA
    documentation describes. If it does not describe a feature, do not write
    the tutorial; say so in the pull request.
13. **This repository is public.** Publish only what participants and MESA
    users should read. Keep out answer keys, facilitator and session
    materials, review checklists, partner notes, and unconfirmed plans.
14. **No credentials anywhere**: not in text, code, screenshots, or commit
    history. Use placeholders such as `<your username>`.
15. **Data tutorials use the practice data** in `docs/assets/practice/`
    (synthetic; described in `docs/tutorials/practice-data.md`). Run every
    code block and paste its real output. The draft notice says where the
    code was run; the tutorial stays a draft until someone follows it in MESA
    JupyterLab. The files come from `scripts/make_practice_data.py`; if you
    change it, rerun it and update every output the tutorials show.

## Changes

Work on a branch and open a pull request. Do not push to `main`.

## Licenses

Training content is CC BY 4.0 (`LICENSE`); code is BSD 3-Clause
(`LICENSE-CODE`). © 2026 The Regents of the University of New Mexico.
