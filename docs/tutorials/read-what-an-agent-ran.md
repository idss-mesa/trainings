---
type: Guide
title: "Read back what an agent ran"
description: "After an AI agent finishes in a MESA app, list its sessions, export one to a file, and print every tool it called with the inputs it gave."
tags: [byte, p4, ai-agents, mcp, verification]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-19T00:00:00Z" }
stale_after: "2027-05-19T00:00:00Z"
sources:
  - id: docs-agents
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
---

# Read back what an agent ran

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial ran steps 1 to 3 in MESA JupyterLab on
    2026-11-19 (OpenCode 1.19.4), on a session it started with one command rather than
    in the OpenCode screen. Nobody has yet followed the page as a reader would.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

While an agent works, its tool calls scroll past. Afterwards you may need to say
exactly which tools it called and on what. OpenCode keeps each conversation as a
session that you can write to a file.

**You will:** have a file with one agent session in it, and a printed list of every
tool call in that session.

**Time:** 5 to 10 minutes. **You need:** to have finished
[Sign in and start an AI agent in a MESA app](start-an-ai-agent.md) in this app
session. If the agent is still open, type `/exit` first.

## Steps

1. In the terminal, list the sessions:

    ```bash
    opencode session list
    ```

    You should see: a table with the columns `Session ID`, `Title` and `Updated`, and
    one row for each conversation. An ID starts with `ses_`. The agent wrote the
    title itself.

2. Export the session to a file. Put your own ID in place of `ses_...`:

    ```bash
    opencode export ses_... > ~/work/agent-run.json
    ```

    You should see: `Exporting session:` and the ID. The file `agent-run.json` is now
    in the `work` folder.

3. Print the tool calls. Paste all seven lines at once and press Enter:

    ```bash
    python3 - <<'PY'
    import json
    run = json.load(open("/home/jovyan/work/agent-run.json"))
    for message in run["messages"]:
        for part in message["parts"]:
            if part["type"] == "tool":
                print(part["tool"], part["state"]["status"], part["state"]["input"])
    PY
    ```

    You should see: one line for each call, in the order they were made. For the
    question in the earlier tutorial, the run that was checked printed:

    ```text
    mesa_ds_list_allowed_directories completed {}
    mesa_ds_list_directory completed {'path': '/iplant/home/gctest01'}
    ```

    Your path has your own username, and your agent may have taken another route.

4. Read each line as three facts: the tool, whether it finished, and what it was
   given.

    You should see: no line you cannot account for. A tool whose name has `write`,
    `delete` or `move` in it would mean the agent changed something.

## Check it worked

The printed lines match the calls you saw on screen while the agent worked, and every
folder or file the agent's answer mentions appears in the input of some line. An
answer that names something no call touched did not come from your data.

## If it didn't

**The table in step 1 is empty.** Sessions do not outlive the app. Run the agent
again in this app session, then list again.

**Step 3 prints nothing.** The agent answered without calling a tool. That is worth
knowing: see
[How an agent reaches data: tools and MCP](../explainers/tools-and-mcp.md).

**`KeyError` in step 3.** The file's layout differs from OpenCode 1.19.4, which this
page was written against. [Tell us](https://github.com/idss-mesa/trainings/issues).

## Next

- [Keep a log of AI-assisted steps](keep-an-ai-log.md): the printed lines are the
  evidence for a row's "What it answered".
- The export holds everything the agent read, word for word. Treat it like the data
  itself before you share it. `opencode export --sanitize` replaces the text and the
  inputs with placeholders and keeps the tool names.
- Files in `work` do not outlive the app. To keep this one, see
  [Save your work where it survives the session](save-your-work.md).
- Reference: [AI agents in the MESA apps](https://idss-mesa.github.io/docs/apps/agents/).

*Not yet validated by a person in MESA JupyterLab. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-19 from the commands' own help text in the app; steps 1 to 3 were run in MESA JupyterLab that day.*
