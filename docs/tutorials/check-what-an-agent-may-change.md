---
type: Guide
title: "Check what an agent may change before you let it"
description: "Read an AI agent's permission rules in a MESA app, then test them in a scratch folder: what it writes without asking, what it is stopped from, and what a read-only agent does instead."
tags: [byte, p4, ai-agents, permissions, verification]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-20T00:00:00Z" }
stale_after: "2027-05-20T00:00:00Z"
sources:
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
---

# Check what an agent may change before you let it

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial ran every command on this page in MESA
    JupyterLab on 2026-11-20 (OpenCode 1.19.4) and saw the results shown. It did not
    test what a shell command run by the agent may reach, or the question the OpenCode
    screen asks. Nobody has yet followed the page as a reader would.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

You may expect an agent to ask before it changes a file. In a MESA app, OpenCode's
default agent does not: inside the folder where you start it, it writes at once. Find
out where its limits are in a folder that holds nothing you care about.

**You will:** know what your agent changes without asking, what stops it, and how to
run it so that it changes nothing.

**Time:** 10 minutes. **You need:** to have finished
[Sign in and start an AI agent in a MESA app](start-an-ai-agent.md) in this app
session. If the agent is open, type `/exit` first.

## Steps

1. In the terminal, make a scratch folder and move into it:

    ```bash
    mkdir -p ~/work/agent-test && cd ~/work/agent-test
    ```

    You should see: the prompt, now ending `agent-test`.

2. Read the first rule of the default agent, `build`:

    ```bash
    opencode agent list | head -7
    ```

    You should see: permission `*` with action `allow`. Everything is allowed unless a
    later rule says otherwise. The full list is long; the later rules for `build` ask
    only for paths outside the starting folder and for files ending `.env`.

    ```text
    build (primary)
      [
      {
        "permission": "*",
        "action": "allow",
        "pattern": "*"
      },
    ```

3. Test it. Ask for a file in this folder:

    ```bash
    opencode run "Create a file named agent-note.txt in the current folder containing the single line: written by the agent. Then stop."
    ```

    You should see: the file written, and no question asked.

    ```text
    ← Write agent-note.txt
    Wrote file successfully.
    ```

4. Ask for a file outside the folder:

    ```bash
    opencode run "Create a file at /home/jovyan/outside-note.txt containing the single line: written by the agent. Use the write tool, not a shell command. Then stop."
    ```

    You should see: the request stopped. Run this way, nobody is there to answer, so
    OpenCode refuses for you.

    ```text
    ! permission requested: external_directory (/home/jovyan/*); auto-rejecting
    ✗ Write /home/jovyan/outside-note.txt failed
    ```

5. Ask the `plan` agent for a file here:

    ```bash
    opencode run --agent plan "Create a file named plan-note.txt in the current folder containing the single line: written by the agent. Then stop."
    ```

    You should see: a few lines describing how it would make the file, and no
    `Write` line.

6. Look at what exists:

    ```bash
    ls ~/work/agent-test ~/outside-note.txt
    ```

    You should see: `agent-note.txt` alone in the folder, and
    `No such file or directory` for the other.

## Check it worked

You can finish each sentence. "Inside the folder I start it in, the agent …" (writes
without asking). "Outside that folder, it …" (must ask, and is refused when nobody
answers). "To get advice and no changes, I …" (add `--agent plan`).

So choose the starting folder with care: start the agent in the smallest folder that
holds the task, not in your home folder or your Data Store.

## If it didn't

**Step 3 or 5 gives an error about a key or a model.** The key is not loaded in this
terminal. Run the `source` line from step 3 of
[Sign in and start an AI agent in a MESA app](start-an-ai-agent.md) and try again.

**Step 5 wrote the file.** Your rules differ from the ones seen here. Run
`opencode agent list`, find `plan`, and look for a rule with permission `edit`.

## Next

- Remove the scratch folder: `rm -r ~/work/agent-test`.
- [See which tool servers your agent can use](see-an-agents-tools.md): these rules
  cover the agent's own tools. What a tool server may change in your Data Store is a
  separate question.
- [Read back what an agent ran](read-what-an-agent-ran.md)
- Reference: [AI agents in the MESA apps](https://idss-mesa.github.io/docs/apps/agents/).

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-20; every command was run there that day.*
