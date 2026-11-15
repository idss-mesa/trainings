---
type: Explainer
title: "Reading what an agent did"
description: "The record of an AI agent's calls can be read like a lab notebook, and it goes wrong in five recognisable ways, each with a tell."
tags: [explainer, ai-agents, verification, trace-card, p4]
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

# Reading what an agent did

!!! warning "Draft: not yet reviewed"
    This explainer was drafted with an AI assistant. Nobody has yet read it against
    the MESA documentation.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

## The idea in one sentence

The record of an agent's calls can be read like a lab notebook, and it fails in a small
number of recognisable ways.

## Why it matters for your result

An answer can be wrong while every sentence in it sounds right. The record of what the
agent ran, and what came back, is where the fault shows.

## How it works

Read the run line by line and look for five things.

| Failure | The tell |
|---|---|
| The wrong tool or query | What the call asks for is not what the question asked for |
| A malformed call | A call comes back with an error, and an answer follows anyway |
| A result misread | The call and its result are right, but the answer says they mean something else: a unit or a column's meaning that was never looked up |
| Stopping early | Every check made is right, and something in a result that does not add up is never followed |
| A fact from memory | A figure in the answer appears in no result |

## What it looks like in MESA

The agents in the MESA apps run in a terminal and work by calling the MCP servers
registered in every app[^docs-agents]. Those calls, and what they returned, are the
record to read.

## A common mistake

Reading only the final answer. It is the one part of the run that the agent wrote to
be believed.

## Check your understanding

A run on the [practice data](../tutorials/practice-data.md)[^practice-data]. Which
failure is it?

1. The question: "On how many days in July did G04 record rain?"
2. The agent says: "I will count G04's readings."
3. The call returns: 31.
4. The agent answers: "G04 recorded rain on 31 days in July."

??? success "Answer"
    **The wrong query.** The call counted G04's rows, one for every day, and many of
    those rows record no rain. Counting only the rows with a value above zero gives 14.
    The tell is at line 2: the plan already asks a different question.

## Next

- [Trace cards](../trace-cards/index.md): five short runs to judge, with answers.

*Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-15. No person has yet reviewed this page.*

*Adapted from [AI Automation and Agents](https://tyson-swetnam.github.io/AI-Automation-and-Agents/), Center for Advanced Research Computing, University of New Mexico, 2026 (developed at the Arizona Institute for Artificial Intelligence, University of Arizona), by Carlos Lizárraga-Celaya, Michelle Yung, Michele Cosi, and Tyson Swetnam: [Module 2 Reading Guides, Reading Guide 3](https://tyson-swetnam.github.io/AI-Automation-and-Agents/modules/module-2/reading-guides/#reading-guide-3). [Revision a65855c](https://github.com/tyson-swetnam/AI-Automation-and-Agents/tree/a65855c), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changes: the ideas are restated and shortened; the five example runs are MESA's own; no text is copied.*

[^docs-agents]: AI agents in the MESA apps, <https://idss-mesa.github.io/docs/apps/agents/>.
[^practice-data]: Practice data: five invented rain gauges, <https://idss-mesa.github.io/trainings/tutorials/practice-data/>.
