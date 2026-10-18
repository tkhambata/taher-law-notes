---
title: How to edit these notes
description: Add and edit notes, cases, videos and diagrams with the subject-based visual editor.
prev: false
next: false
---

## Open your editor

[Open Pages CMS](https://app.pagescms.org/) and sign in with your own GitHub account. Select this website repository and the branch you intend to edit. Saving on the production branch can trigger publication; use a review branch when testing changes.

## Add a page

1. Choose a subject collection, such as Contract Law - notes.
2. Use its new-entry control. Enter a clear page title. If a filename is requested, use lowercase words separated by hyphens, such as offer-and-acceptance.
3. Write in Write your notes here. Use the visual toolbar for headings, lists, emphasis, links and images. No Markdown or HTML is required.
4. Optionally add a short summary, jurisdiction and page position. Use the law-checked date only if you have checked the legal content to that date.
5. Save, then check the website after a successful build and deployment. Saving alone does not prove deployment succeeded.

The website automatically lists notes inside registered subjects. Subject introductions have separate Introduction entries and are excluded from ordinary note collections to reduce accidental deletion.

## Edit or delete a page

Open its subject collection, search for the title, and open the note to edit it. To delete it, use the entry's deletion action, verify the title, and confirm. Update hand-written links to a deleted page. Do not delete shared images simply because one note is removed.

Introduction entries have delete and rename disabled in this configuration. Removing an entire subject needs a separate review of its notes, registry and editor entries.

## Add a YouTube lesson

Paste the complete YouTube or youtu.be URL into YouTube video link. Optionally add a heading and a whole-number start time in seconds. To remove the video, remove the URL field rather than save an empty string.

The existing website component displays the player after the written note and diagram viewer. This is not a draggable video block within the visual text editor.

## Add a diagram

Under Diagrams - upload and describe, add an entry. Give it a heading, upload/select the image, and write both a short accessible description and an explanation of its steps or branches. Save and check the resulting page. Diagram-list entries use the existing zoom and download viewer below the written note.

An ordinary image inserted into the note body is not automatically a diagram-viewer entry.

## Order notes

Under Page order and menu label, enter Position in the subject. Smaller numbers appear first; keep 0 for introductions. The CMS list is alphabetically sorted separately from the website sidebar.

## Use the worked example

Open Worked example - Carlill in Contract Law. It shows facts, issues, authority, reasoning, a fictional practice problem, sources, a diagram and a supplementary video. Copy the written structure into a new entry and replace the content. This setup does not add a custom one-click duplication feature.

## Add a new subject

Routine pages inside existing subjects need no configuration edit. A new subject needs one-time setup: create its folder and introduction, register its homepage/sidebar information, and add its notes collection and protected introduction entry in the editor configuration. Ask for that setup while you are learning rather than changing the advanced entries yourself.

## What this editor does not do

This is a visual content editor, not an exact live preview or a drag-and-drop website designer. Check legal accuracy, jurisdiction, sources, accessibility descriptions and media playback separately. A successful build does not establish legal accuracy or that a YouTube video remains playable.
