---
type: Guide
title: "Tag a folder with an ontology term"
description: "Find a term in the Environment Ontology on the Ontologies tab of the MESA Portal's full metadata page, add it to a folder, and see the AVU that carries the term's identifier."
tags: [byte, p5, portal, data-browser, metadata]
status: draft
generated: { by: "claude-code/mythos-5.2", at: "2026-11-24T00:00:00Z" }
stale_after: "2027-05-24T00:00:00Z"
sources:
  - id: docs
    resource: "https://idss-mesa.github.io/docs/portal/data/"
    title: "Managing data in the MESA Portal"
    author: "team:idss-mesa"
---

# Tag a folder with an ontology term

!!! warning "Draft: not yet validated"
    The AI assistant that drafted this tutorial followed these steps on the live portal
    on 2026-11-24, on a test account, and saw the results shown. It added one term from one ontology, ENVO, and did not try the others. No person has
    yet followed the page.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

A keyword such as `rainfall` is a word you chose. Someone else may have chosen
`precipitation`. An ontology term is a word with an identifier and a definition that a
community has agreed. Tag a folder with one and a search by that identifier finds it,
whatever word you would have used.

**You will:** have a folder tagged with a term from the Environment Ontology (ENVO).

**Time:** 5 minutes. **You need:** a folder of your own under **My Files**.

## Steps

1. In **Data Browser**, **My Files**, click **AVUs** under the folder's name, then
   **Open full metadata page** at the foot of the panel. Click **Ontologies**.

    You should see: a panel headed **Ontology Explorer**, a search box, and rows of
    buttons under **Environmental Sciences**, **General Biology**, and **Registries**.

2. Click **ENVO**.

    You should see: **Loading ENVO…** for several seconds. Then a panel headed
    **Environment Ontology** with a few terms listed, and at its foot a second search
    box labelled **Add term from ENVO**.

3. In that second box, type a word for what your data is about. For the practice
   folder, type `rain`.

    You should see: a list of terms, each with an identifier and the start of its
    definition. The first is **rain**, `ENVO:01001564`.

4. Read the definition, then click the term that fits. For the practice folder, click
   **rain**.

    You should see: a new row in the panel, **rain**, marked **NEW**, with
    `ENVO:01001564` under it and the word `rain` in the field beside it.

5. Scroll back to the top of the panel and click **Save**.

    You should see: after ten to twenty seconds, the count beside the folder's name
    goes up by one; in the example, from **19 AVUs** to **20 AVUs**. A line appears
    under the first search box: **1 namespaced AVU on this item**, with an **ENVO**
    button.

6. Click **Raw AVUs**.

    You should see: one new row. The term's identifier is in the **Unit** column.

    | Attribute | Value | Unit |
    |---|---|---|
    | `envo.rain` | rain | ENVO:01001564 |

## Check it worked

After you refresh the page, **Raw AVUs** still lists the `envo.rain` row with its
identifier, and the **Ontologies** tab still shows **1 namespaced AVU on this item**.

## If it didn't

**The search lists whole ontologies, not terms.** You typed in the first search box,
which searches the names of ontologies. When this was tried, `rain` there returned
nine, most of them atlases of the brain. Click **ENVO** first, then use the box
labelled **Add term from ENVO**.

**No term fits.** Try a broader word, or another ontology from the buttons. Do not
pick a term whose definition does not match your data: a wrong identifier misleads
more than a missing one.

**There is no Save button, or the fields cannot be edited.** You can read the folder
but not write to it. Use a folder under **My Files**.

## Next

- [Make a folder's metadata valid Croissant](make-metadata-valid-croissant.md)
- [Read the metadata on a folder shared with you](read-shared-metadata.md)
- Reference: [Managing data, "Describe data with metadata (AVUs)"](https://idss-mesa.github.io/docs/portal/data/#describe-data-with-metadata-avus).

*Not yet validated by a person. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-24 and followed once on the live portal that day.*
