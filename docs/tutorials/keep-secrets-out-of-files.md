---
type: Guide
title: "Keep tokens and passwords out of saved files"
description: "Give a notebook a token without typing it into a cell, and confirm that the saved notebook does not contain it."
tags: [byte, p3, credentials, jupyterlab, notebook]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-12T00:00:00Z" }
stale_after: "2027-05-12T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/credentials/"
    title: "Credentials"
    author: "team:idss-mesa"
  - id: python
    resource: "https://docs.python.org/3/library/getpass.html"
    title: "getpass (Python standard library)"
    author: "team:python"
---

# Keep tokens and passwords out of saved files

!!! warning "Draft: not yet validated"
    The check in step 5 was run on a laptop. Nobody has yet followed the tutorial in
    MESA JupyterLab, so a menu name may differ there.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A notebook file stores every cell and every output. A token typed into a cell, or
printed by one, is saved with the notebook and goes wherever the notebook goes: your
Data Store, a shared folder, a Git repository.

**You will:** have used a token in a notebook that does not contain it.

**Time:** 5 to 10 minutes. **You need:** `practice.ipynb` from
[Load a file from your Data Store into a notebook](load-a-file.md), open in
[MESA JupyterLab](launch-jupyterlab.md). You will use a made-up token, not a real one.

## Steps

1. In a new cell, run:

    ```python
    from getpass import getpass

    token = getpass("Token: ")
    ```

    You should see: a box labelled **Token:** under the cell.

2. Type `not-a-real-token` into the box and press ++enter++.

    You should see: nothing as you type, then a row of dots beside **Token:**. The
    dots are a placeholder, not your token. The value is in memory as `token`; it is not in the cell and not in the output.

3. Confirm the notebook received it, without displaying it:

    ```python
    len(token)
    ```

    You should see: `16`.

4. Choose **File → Save Notebook**.

    You should see: the dot on the notebook's tab disappear.

5. Count how many times the token appears in the saved file:

    ```python
    open("practice.ipynb").read().count(token)
    ```

    You should see: `0`.

6. Remove it from memory when you have finished:

    ```python
    del token
    ```

    You should see: no output. Restarting the kernel does the same.

## Check it worked

Step 5 returns `0`: the saved notebook does not contain the token, although the
notebook used it.

## If it didn't

**Step 5 returns `1` or more.** The token was typed into a cell or shown in an output,
for example by running `token` or `print(token)`. Delete that cell, choose
**Edit → Clear Outputs of All Cells**, save, and run step 5 again. If it had been a
real token, clearing it would not be enough: replace the token with a new one at the
service that issued it, because earlier copies of the file may still hold the old one.

## Next

- The MESA sign-in commands follow the same rule: `cyverse-login` and `aiverde-setup`
  ask for your password or key and keep it outside your Data Store. See
  [Sign in and start an AI agent in a MESA app](start-an-ai-agent.md).
- Reference: [Credentials](https://idss-mesa.github.io/docs/credentials/) in the MESA
  documentation, which says where each MESA tool stores a password, and
  [getpass](https://docs.python.org/3/library/getpass.html).

*Not yet validated in MESA JupyterLab. Drafted 2026-11-12; the check in step 5 was run locally.*
