---
type: Guide
title: "Sign in and start an AI agent in a MESA app"
description: "Sign in to CyVerse from a terminal in a MESA app, connect an AI agent to a language model, and have it list the folders in your Data Store."
tags: [byte, p4, ai-agents, jupyterlab, cyverse]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/apps/agents/"
    title: "AI agents in the MESA apps"
    author: "team:idss-mesa"
---

# Sign in and start an AI agent in a MESA app

!!! warning "Draft: not yet validated"
    This tutorial was written from the MESA documentation. Nobody has yet followed it
    from start to finish on the live portal, so a screen name or a step may differ.
    In particular, what each command prints (steps 2 to 4) is not yet confirmed.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Every MESA app comes with AI coding agents that run in a terminal and can work with
your Data Store through the MESA tools. They need two things from you: who you are,
and a language model to think with.

**You will:** have an agent that answers a question about your own Data Store.

**Time:** 10 minutes. **You need:** [MESA JupyterLab running](launch-jupyterlab.md),
and an API key for [CyVerse AI Verde](https://aiverde-docs.cyverse.ai/), which you get
at <https://chat.cyverse.ai> under **Course → API Key**.

## Steps

1. In JupyterLab's **Launcher**, click **Terminal**.

    You should see: a terminal tab with a prompt.

2. Sign in to CyVerse:

    ```bash
    cyverse-login
    ```

    Enter your CyVerse username and password when it asks.

    You should see: the prompt return with no error. The agents now act as you, with
    access to your own files. Without this step they can read public data only.

3. Connect the language model:

    ```bash
    aiverde-setup
    ```

    Paste your AI Verde key when it asks.

    You should see: a list of the models your course can use.

4. Start an agent:

    ```bash
    opencode
    ```

    You should see: OpenCode's own prompt in place of the terminal's.

5. Ask it:

    ```text
    List the folders in my CyVerse home.
    ```

    You should see: the agent say it is calling one of the MESA tools, then a list of
    folder names.

6. In the portal's browser tab, click **Data Browser**, then **My Files**.

    You should see: the same folder names the agent listed.

## Check it worked

The folders the agent lists are the ones in **My Files**. An agent that had not signed
in as you could not see them.

## If it didn't

**The agent lists only public folders, or says permission was denied.** It was started
before you signed in, so its tools are still anonymous. Quit the agent, run
`cyverse-login` again if you skipped it, and start the agent again.

## Next

- [Check an AI-suggested result against the data](check-a-suggested-result.md)
- Type your password and your key only where these commands ask for them. See
  [Keep tokens and passwords out of saved files](keep-secrets-out-of-files.md).
- Signing in lasts only as long as the app: repeat steps 2 and 3 in each new session.
- Reference: [AI agents in the MESA apps](https://idss-mesa.github.io/docs/apps/agents/),
  for the other agents (`claude`, `codex`, `agy`), using your own account with an
  agent's vendor, and local models on a GPU.

*Not yet validated on the live portal. Drafted 2026-11-12 from the MESA documentation.*
