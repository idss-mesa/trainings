---
type: Guide
title: "See which tool servers your agent can use"
description: "List the tool servers an AI agent has in a MESA app, read which are connected and which need a sign-in, and say what the agent can and cannot reach."
tags: [byte, p4, ai-agents, mcp, jupyterlab]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-19T00:00:00Z" }
stale_after: "2027-05-19T00:00:00Z"
sources:
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
  - id: docs-mesa-mcp
    resource: "https://idss-mesa.github.io/docs/servers/mesa-mcp/"
    title: "mesa-mcp"
    author: "team:idss-mesa"
---

# See which tool servers your agent can use

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial ran steps 1 to 3 in MESA JupyterLab on
    2026-11-19 (OpenCode 1.19.4), without signing in to CyVerse. Nobody has yet
    followed it as a reader would.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

An agent can only act through its tools, and tools come from servers. Before you trust
an agent with a task, look at which servers it has and which of them are working. It
takes one command and no language model.

**You will:** know which tool servers your agent has, which are connected, and what
each one reaches.

**Time:** 5 minutes. **You need:** [MESA JupyterLab running](launch-jupyterlab.md). You
do not need a key or a sign-in for this task.

## Steps

1. In JupyterLab's **Launcher**, click **Terminal**.

    You should see: a welcome text with a line that starts `MCP` and names four
    servers: `irods · mesa · formation · filesystem`.

2. Ask the agent for its servers and their state:

    ```bash
    opencode mcp list
    ```

    You should see: a list headed `MCP Servers` that ends `4 server(s)`:

    ```text
    ✓ irods connected
        https://mcp-public.cyverse.ai/mcp
    ✓ mesa connected
        /usr/local/bin/mesa-mcp
    ⚠ formation needs authentication
        https://de.cyverse.org/formation/mcp
    ✓ filesystem connected
        /home/jovyan/.npm-global/bin/mcp-server-filesystem /home/jovyan/work /home/jovyan/data-store
    ```

3. Read each entry against this table.

    | Server | What its tools reach | What the second line tells you |
    |---|---|---|
    | `irods` | The Data Store | A web address: it runs outside your app |
    | `mesa` | The Data Store, plus metadata | A program: it runs inside your app |
    | `formation` | Apps and analyses | Not usable until you sign in to it |
    | `filesystem` | Files in the app | The two folders it may touch, and no others |

    You should see: three servers with `✓` and one with `⚠`. `connected` means the
    server answered. It does not mean it is signed in as you.

4. Write down one thing the agent cannot do as it stands.

    You should see: something like "it cannot launch an app, because `formation` is
    not signed in", or "it cannot read files outside `work` and `data-store`".

## Check it worked

You can say, without starting the agent, which of these it could do: list a public
folder in the Data Store (yes), read a file in `/home/jovyan/work` (yes), check on a
running analysis (no).

## If it didn't

**A server is missing, or does not show `connected`.** Stop the app and launch a new one; the
servers are set up when the app starts. If it happens again,
[report it](https://github.com/idss-mesa/trainings/issues) with the output of the
command.

**You use a different agent.** Each has its own command. `claude mcp list` was seen to
work on 2026-11-18 and showed one more entry, `irods-auth`. The reference below has the
others.

## Next

- [Sign in and start an AI agent in a MESA app](start-an-ai-agent.md): after
  `cyverse-login`, the Data Store tools act as you. This list stays the same: it was
  read again after signing in on 2026-11-19.
- [How an agent reaches data: tools and MCP](../explainers/tools-and-mcp.md)
- This list names servers, not single tools. To see a tool's name, watch which one the
  agent calls when it works.
- Reference: [AI agents in the MESA apps](https://idss-mesa.github.io/docs/apps/agents/)
  and [mesa-mcp](https://idss-mesa.github.io/docs/servers/mesa-mcp/).

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-19; steps 1 to 3 were run in MESA JupyterLab that day.*
