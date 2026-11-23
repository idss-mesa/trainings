---
type: Explainer
title: "When to stop and ask"
description: "Some steps should not be left to an AI agent until a person has looked: the ones that write, delete, share or spend, and the ones whose result you could not check."
tags: [explainer, ai-agents, permissions, verification, p4]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-22T00:00:00Z" }
stale_after: "2027-05-22T00:00:00Z"
sources:
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
---

# When to stop and ask

!!! warning "Draft: not yet reviewed"
    This explainer was drafted with an AI assistant. Nobody has yet read it against
    the MESA documentation.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

## The idea in one sentence

Some steps should wait for a person: the ones that cannot be taken back, and the ones
whose result you could not check.

## Why it matters for your result

A wrong answer costs you a check. A wrong action can cost a file, a shared folder, or
hours of your allocation, and the agent's report afterwards may still read as a success.

## How it works

Sort each step an agent proposes by what it does.

| The step | Why it waits | Look at first |
|---|---|---|
| Writes over a file | The earlier content may be gone | Which file, and whether a copy exists |
| Deletes or moves | Someone may rely on that path | Exactly what, and where it goes |
| Shares, or changes who can read | It reaches other people | Who gains access, and to what |
| Starts an analysis | It spends your allocation | What will run, and for how long |
| Gives a result you could not check | You would be trusting, not verifying | The check you would run |

Reading, listing, counting and drafting can run freely: a mistake there changes nothing.

## What it looks like in MESA

After you run `cyverse-login` in an app, the agents act as you, with access to your home
folder and to what is shared with you. Without it they have anonymous, read-only access
to public data[^docs-agents]. So a signed-in agent can change whatever you can change.

With the further Formation sign-in, an agent can also be asked to launch an analysis in
the Discovery Environment[^docs-agents].

The documentation does not say which steps each agent asks about before it acts.

## A common mistake

Approving a step because the ten before it were fine. The run so far says nothing
about the next step.

## Check your understanding

An agent, signed in as you, is tidying a folder of results. It proposes four steps.
Which should wait for you?

1. List the files in the folder.
2. Count the rows in each CSV file.
3. Delete the files whose names end `-old`.
4. Share the folder with your working group.

??? success "Answer"
    **Steps 3 and 4.** Listing and counting change nothing. Before step 3, read the
    names it would delete: a pattern can match more than you meant. Before step 4,
    confirm who gains access, and to what.

## Next

- [Check what an agent may change before you let it](../tutorials/check-what-an-agent-may-change.md):
  find out what your agent does without asking, in a folder that holds nothing you
  care about.

*Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-22. No person has yet reviewed this page.*

[^docs-agents]: AI agents in the MESA apps, <https://idss-mesa.github.io/docs/apps/agents/>.
