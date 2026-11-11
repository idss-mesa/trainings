---
type: Reference
title: "For AI agents"
description: "How agents should read MESA Trainings: llms.txt, per-page Markdown with OKF frontmatter, and the draft and trust signals on every tutorial."
tags: [about, ai-agents, OKF, llms.txt]
status: draft
generated: { by: "claude-code/2.1.224", at: "2026-11-11T00:00:00Z" }
sources:
  - id: okf-spec
    resource: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md"
    title: "Open Knowledge Format (OKF) v0.2 specification"
    author: "team:google-cloud"
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/about/ai-agents/"
    title: "For AI agents (MESA documentation)"
    author: "team:idss-mesa"
---

# For AI agents

This site is published for people and for AI agents. Its source is an
[Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
knowledge bundle[^okf-spec] that follows the same conventions as the MESA
documentation[^docs-agents].

## Entry points

| What | Address |
|---|---|
| Outline of every page | [`https://idss-mesa.github.io/trainings/llms.txt`](https://idss-mesa.github.io/trainings/llms.txt) |
| Whole site in one file | [`https://idss-mesa.github.io/trainings/llms-full.txt`](https://idss-mesa.github.io/trainings/llms-full.txt) |
| Markdown twin of a page | The page address plus `index.md`, for example [`https://idss-mesa.github.io/trainings/tutorials/sign-in/index.md`](https://idss-mesa.github.io/trainings/tutorials/sign-in/index.md) |
| Raw source on GitHub | [`https://raw.githubusercontent.com/idss-mesa/trainings/main/docs/tutorials/sign-in.md`](https://raw.githubusercontent.com/idss-mesa/trainings/main/docs/tutorials/sign-in.md) |

Crawlers honour only the origin's
[`https://idss-mesa.github.io/robots.txt`](https://idss-mesa.github.io/robots.txt),
which is fully permissive.

## Trust signals

- **`status: draft`** means the tutorial was written from documentation and has not
  been followed on the live portal. Treat its screen names and steps as likely, not
  confirmed, and say so when you relay them.
- **No `verified:` key** means unverified (OKF §5.3). Only a human maintainer adds it.
- **`stale_after`** is the review date. After it, check the tutorial against the
  [MESA documentation](https://idss-mesa.github.io/docs/) before relying on it.
- Tutorials tagged `byte` are single-task pages; the `p1` to `p5` tag groups them by
  stage, from first sign-in to sharing results.

## When to read something else

These pages teach people to use the portal by hand. For how a feature works, read the
[MESA documentation](https://idss-mesa.github.io/docs/llms.txt). For CyVerse data
itself, connect to the MESA MCP servers and call their tools, as the
[documentation's agent guide](https://idss-mesa.github.io/docs/about/ai-agents/)
explains.

[^okf-spec]: Open Knowledge Format v0.2 specification, <https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md>.
[^docs-agents]: For AI agents, MESA documentation, <https://idss-mesa.github.io/docs/about/ai-agents/>.
