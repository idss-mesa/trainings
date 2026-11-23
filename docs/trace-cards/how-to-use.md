---
type: Reference
title: "How to use the trace cards"
description: "What a trace card is, how to work through one, and the kinds of failure to look for when you read what an AI agent did."
tags: [trace-card, ai-agents, verification]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-15T00:00:00Z" }
stale_after: "2027-05-15T00:00:00Z"
sources:
  - id: practice-data
    resource: "https://idss-mesa.github.io/trainings/tutorials/practice-data/"
    title: "Practice data: five invented rain gauges"
    author: "team:idss-mesa"
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
---

# How to use the trace cards

A trace card shows one short run of an AI agent, as text, and asks you to judge it. An
agent in a MESA app answers a question by running things and reading what comes
back[^docs-agents]. The record of those steps tells you far more than the final answer
does. The cards let you practise reading such a record with no agent, no model, and no
key.

## What is on a card

| Part | What it holds |
|---|---|
| The question put to the agent | One sentence |
| The run | Numbered lines: what the agent said it would do, what it ran, what came back, and its final answer |
| Your task | Three questions, the same on every card |
| Run the check | You run your own query on the practice data |
| Answer | Folded away until you open it |

Cards 1 to 7 are **constructed examples**: written by hand to show one thing clearly,
and labelled so. No agent or model produced them. Card 9 is a **recorded run**: an agent
in MESA JupyterLab produced it, and the card names the agent, the model and the date.
The code on every card was run on the
[practice data](../tutorials/practice-data.md)[^practice-data], and the output shown is
what it gives; a script compares them each time the site is built.

## How to work through one

1. Read the question, then the run, line by line. Do not skip to the answer the agent
   gave.
2. Answer the three questions for yourself, in writing: is the answer supported, where
   does it go wrong if it does, and what one query would settle it.
3. Run your query on the practice data.
4. Open the answer and compare.

Some runs are sound. "Find the flaw" is not always the right answer, and saying that
a sound run is sound, and why, is part of the skill.

## What to look for

| Kind of failure | What it looks like in a run |
|---|---|
| A different question answered | The plan, or the query, asks for something other than what was asked |
| A result misread | The call is right and what came back is right, but the agent says it means something it does not |
| Stopped early | Every check made is correct, and one that matters was never made |

Two more kinds are not in this practice set: a call that fails, after which the agent
answers anyway; and a figure in the answer that no call returned.

## The cards

- [Trace card 1: the wettest gauge in July](card-1-wettest-gauge.md)
- [Trace card 2: G01's missing days](card-2-missing-days.md)
- [Trace card 4: the wettest gauge, a second run](card-4-wettest-gauge.md)
- [Trace card 5: the wettest gauge, a third run](card-5-wettest-gauge.md)
- [Trace card 7: G03's July total](card-7-g03-total.md)
- [Trace card 9: the wettest gauge, a recorded run](card-9-wettest-gauge-recorded.md)

The numbers have gaps because cards 3, 6, and 8 are not published.

## Next

- [Check an AI-suggested result against the data](../tutorials/check-a-suggested-result.md)
- [Keep a log of AI-assisted steps](../tutorials/keep-an-ai-log.md)

*This page was drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. No person has yet checked it.*

[^docs-agents]: AI agents in the MESA apps, <https://idss-mesa.github.io/docs/apps/agents/>.
[^practice-data]: Practice data: five invented rain gauges, <https://idss-mesa.github.io/trainings/tutorials/practice-data/>.
