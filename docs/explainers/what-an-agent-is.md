---
type: Explainer
title: "What an agent is, and is not"
description: "An agent is a language model that calls tools in a loop and chooses its own next step; this page sets it beside a chat model and a fixed pipeline."
tags: [explainer, ai-agents, p4]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
---

# What an agent is, and is not

!!! warning "Draft: not yet reviewed"
    This explainer was drafted with an AI assistant. Nobody has yet read it against
    the MESA documentation.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

## The idea in one sentence

An agent is a language model that can call tools in a loop and decide the next step
itself.

## Why it matters for your result

What an agent can reach decides what it can get wrong. A model that only writes text
can mislead you. A model that can also run commands can change a file, and can base an
answer on something it fetched without your seeing it.

## How it works

Three things are often called by the same name. The difference between them is who
decides what happens next.

| | Who decides the next step | What that looks like |
|---|---|---|
| A chat model | You | It writes an answer. You read it and choose what to do with it. |
| A fixed pipeline | Whoever wrote it, in advance | The same steps run in the same order every time. |
| An agent | The model, after each result | It calls a tool, reads what came back, and chooses whether to call another. |

## What it looks like in MESA

- Every MESA featured app includes AI agents as command-line tools, which you start
  by typing a command in a terminal[^docs-agents].
- After you run `cyverse-login`, the agents act as you, with access to your home
  folder and to what is shared with you.
- Without it, they have anonymous, read-only access to public data.
- The apps contain no keys for a language model: each person connects their own.

## A common mistake

Treating a fluent answer as a retrieved one. An agent writes the same confident
sentence whether a tool returned the fact or not. How well it reads tells you nothing
about where it came from.

## Check your understanding

Which of these is an agent?

- A chatbot that writes a query for you to run
- A script that runs the same three queries every night
- A program that runs a query, reads the result, and decides whether to run another

??? success "Answer"
    **The third.** It alone chooses its next step from what came back. In the first
    you decide what to do with the query, and in the second the steps were fixed when
    the script was written.

## Next

- [Sign in and start an AI agent in a MESA app](../tutorials/start-an-ai-agent.md)

*Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. No person has yet reviewed this page.*

[PLACEHOLDER: attribution line. The outline traces this explainer's ideas to corpus sections 1.1 to 1.3 (`claude/fellows-corpus.md`), adapted from the UNM CARC course or GPT 101, both CC BY 4.0. The line must name creator, link, revision, license, and what changed. The drafter did not have the corpus, so the line is not written and the text has not been compared with those sections.]

[^docs-agents]: AI agents in the MESA apps, <https://idss-mesa.github.io/docs/apps/agents/>.
