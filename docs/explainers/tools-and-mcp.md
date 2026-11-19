---
type: Explainer
title: "How an agent reaches data: tools and MCP"
description: "An AI agent can only do what its tools let it do, and MCP is the common way those tools are offered to it; this page names the tool servers in the MESA apps."
tags: [explainer, ai-agents, mcp, p4]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-18T00:00:00Z" }
stale_after: "2027-05-18T00:00:00Z"
sources:
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
  - id: docs-mesa-mcp
    resource: "https://idss-mesa.github.io/docs/servers/mesa-mcp/"
    title: "mesa-mcp"
    author: "team:idss-mesa"
  - id: mcp-spec
    resource: "https://modelcontextprotocol.io/specification/2025-11-25"
    title: "Model Context Protocol specification, revision 2025-11-25: Architecture, Tools"
    author: "team:modelcontextprotocol"
---

# How an agent reaches data: tools and MCP

!!! warning "Draft: not yet reviewed"
    This explainer was drafted with an AI assistant from the MCP specification and the
    MESA documentation. The assistant saw the four server names in a MESA JupyterLab
    terminal on 2026-11-18. Nobody has yet read the page against either source.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

## The idea in one sentence

An agent can only do what its tools let it do, and the Model Context Protocol (MCP) is
the common way tools are offered to it.

## Why it matters for your result

Knowing the tools tells you what an answer could have been based on. If no tool can
read a file, nothing the agent says about that file came from the file.

## How it works

A language model on its own produces text. To list a folder or read a table, something
else has to do the work and hand back the result. MCP is an agreed way to set that
up[^mcp-spec].

| Part | What it is |
|---|---|
| Server | A program that offers tools. It runs beside the agent or somewhere else. |
| Tool | One thing a server can do. It has a name, a description, and the inputs it needs. |
| Call | The agent's request to run one tool with given inputs. The server does it and returns the result. |

The model reads the list of tools and picks one from its **description**. It does not
look inside the tool. A tool with a vague description gets called at the wrong time,
or not at all.

## What it looks like in MESA

Every MESA app registers the same four servers for its agents[^docs-agents]:

| Server | What its tools are for |
|---|---|
| `irods` | The Data Store: list, read, write, and move files and folders |
| `mesa` | The Data Store again, plus metadata and ontology terms[^docs-mesa-mcp] |
| `formation` | The Discovery Environment: list and launch apps, check on an analysis |
| `filesystem` | Files inside the running app |

The terminal's welcome text lists them by these names. Until you run `cyverse-login`,
the Data Store tools read public data only. `formation` needs a sign-in of its own.

## A common mistake

Assuming the agent "has access to MESA" as a whole. It has these tools, with your
sign-in or without it, and nothing else. It cannot see the portal page you are looking
at.

## Check your understanding

You ask an agent how many CPU hours you have left. It answers at once, with a number,
and the run shows no tool call. What do you know about the number?

??? success "Answer"
    **It did not come from MESA.** Nothing was called, so nothing was looked up. The
    number is [recalled, not retrieved](recalled-or-retrieved.md). Read your hours in
    the portal: [Check your CPU hours and storage](../tutorials/check-your-usage.md).

## Next

- [Sign in and start an AI agent in a MESA app](../tutorials/start-an-ai-agent.md)

*Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-18. No person has yet reviewed this page.*

[^docs-agents]: AI agents in the MESA apps, <https://idss-mesa.github.io/docs/apps/agents/>.
[^docs-mesa-mcp]: mesa-mcp, <https://idss-mesa.github.io/docs/servers/mesa-mcp/>.
[^mcp-spec]: Model Context Protocol specification, revision 2025-11-25, <https://modelcontextprotocol.io/specification/2025-11-25>.
