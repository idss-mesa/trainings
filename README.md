# MESA Trainings

Short, single-task tutorials for [MESA](https://idss-mesa.github.io/), the
Multidisciplinary Environment for Scientific Advancement: signing in to the
[MESA Portal](https://mesa.cyverse.org), finding data, launching an app, saving
work, and more.

📖 **Site:** <https://idss-mesa.github.io/trainings/>

The tutorials are for people preparing for a MESA training session and for
anyone using MESA. They link to the
[MESA documentation](https://idss-mesa.github.io/docs/) for the full picture
instead of repeating it.

> **Status:** every tutorial is a draft written from the MESA documentation
> and not yet validated on the live portal. Each page says so.

## Build it locally

```bash
pip install zensical pyyaml
zensical serve                                  # preview at http://localhost:8000
python scripts/okf_validate.py docs             # check page front matter
python scripts/gen_llms_txt.py                  # regenerate docs/llms.txt and docs/llms-full.txt
zensical build --clean --strict                 # build into site/
```

Pushing to `main` builds and deploys the site with GitHub Actions
(`.github/workflows/docs.yml`); pull requests run the validation only.

## Contribute

See [Contribute a tutorial](docs/contributing.md) and the
[tutorial template](docs/template.md). Agents: read [AGENTS.md](AGENTS.md).

## Layout

| Path | What it is |
|---|---|
| `docs/tutorials/` | The tutorials, one Markdown file per task |
| `docs/template.md` | The template and rules every tutorial follows |
| `docs/stylesheets/extra.css` | The main MESA site's colors and type, applied to the theme |
| `zensical.toml` | Site settings and navigation |
| `scripts/` | Validation and agent-surface scripts, shared with idss-mesa/docs; `make_practice_data.py` writes the practice data; `check_tutorial_outputs.py` checks the tutorials' printed output |

## License

Training content is licensed [CC BY 4.0](LICENSE). Code is licensed
[BSD 3-Clause](LICENSE-CODE). © 2026 The Regents of the University of New
Mexico.

MESA is supported by the U.S. National Science Foundation under Award
#2632685.
