---
type: Explainer
title: "Recalled or retrieved"
description: "A figure in an AI agent's answer either came back from a tool call or came from the model's memory, and only the first can be checked against your data."
tags: [explainer, ai-agents, verification, p4]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
  - id: practice-data
    resource: "https://idss-mesa.github.io/trainings/tutorials/practice-data/"
    title: "Practice data: five invented rain gauges"
    author: "team:idss-mesa"
---

# Recalled or retrieved

!!! warning "Draft: not yet reviewed"
    This explainer was drafted with an AI assistant. Nobody has yet read it against
    the MESA documentation.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

## The idea in one sentence

A figure in an answer either came back from a tool call or came from the model's
memory, and only the first can be checked against your data.

## Why it matters for your result

Memory produces plausible numbers with no source. A retrieved figure has a call behind
it that you can run again. A recalled one has nothing behind it but the sentence.

## How it works

Take one answer about the [practice data](../tutorials/practice-data.md)[^practice-data],
with two figures in it:

> Observatory recorded 251.1 mm of rain in July, well above the 60 mm that is usual for
> the region.

| Figure | Kind | How you can tell |
|---|---|---|
| 251.1 mm | Retrieved | A call in the run summed the readings and returned this number. Run it again and you get it again. |
| 60 mm | Recalled | No call returned it. The data hold one month from invented gauges, so nothing in them says what is usual. |

Both figures are stated in the same voice. Only the record of the run tells them apart.

## What it looks like in MESA

The agents in the MESA apps do their work by calling tools: the MCP servers that are
registered in every app[^docs-agents]. A figure is retrieved when one of those calls
returned it.

## A common mistake

Checking that the number is reasonable instead of where it came from. A recalled figure
is usually reasonable. That is what makes it hard to catch.

## Check your understanding

An answer says: "G05's largest reading was 180.0 mm, a new record for the station."
The run shows one call, which returned the row holding 180.0. Which part is retrieved?

??? success "Answer"
    **Only the 180.0 mm.** The call returned that reading. Nothing in the run compared
    it with earlier years, and the file holds a single month, so "a new record" came
    from nowhere you can check.

## Next

- [Check an AI-suggested result against the data](../tutorials/check-a-suggested-result.md)

*Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. No person has yet reviewed this page.*

[PLACEHOLDER: attribution line. The outline traces this explainer's ideas to corpus sections 1.8 to 1.9 (`claude/fellows-corpus.md`), adapted from the UNM CARC course or GPT 101, both CC BY 4.0. The line must name creator, link, revision, license, and what changed. The drafter did not have the corpus, so the line is not written and the text has not been compared with those sections.]

[^docs-agents]: AI agents in the MESA apps, <https://idss-mesa.github.io/docs/apps/agents/>.
[^practice-data]: Practice data: five invented rain gauges, <https://idss-mesa.github.io/trainings/tutorials/practice-data/>.
