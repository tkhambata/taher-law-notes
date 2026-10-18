# Taher's Law Notes

A personal law-study website built with the existing Astro Starlight application and edited through Pages CMS. Keep legal propositions tied to verified sources and the correct jurisdiction.

## Where things live

- Notes: `src/content/docs/` (Markdown or MDX).
- Subject navigation and homepage cards: `src/data/subjects.json`.
- Homepage: `src/content/docs/index.mdx` and `src/components/SubjectDashboard.astro`.
- Colours and reading styles: `src/styles/study.css`.
- Editor configuration: `.pages.yml`.
- Automatic media: `ContentWithMedia.astro`, `DiagramViewer.astro`, and `VideoEmbed.astro` in `src/components/`.

The subject registry is the single source for subject names, homepage descriptions, destinations and sidebar group order. The sidebar uses Starlight's built-in autogeneration inside each registered folder. Homepage cards do not imply that every subject contains completed notes.

## A. Add a note to an existing subject

1. Open this repository in Pages CMS and select the branch you intend to edit. Use a review branch while testing changes; saving to `main` may publish through the existing deployment connection.
2. Open **Law Notes - choose a subject folder first**. Navigate into the existing subject folder, such as `contract`, before creating a file. If your editor view does not offer creation in that folder, create `src/content/docs/contract/your-topic.md` in GitHub instead; do not leave the note at the collection root.
3. Enter a title and description, then the note body. Add jurisdiction and the law-current-to date where known. Use a safe lowercase, hyphenated filename such as `your-topic.md`.
4. Save. A note within a registered subject folder is picked up automatically by its sidebar group at the next successful build. No homepage or Astro config edit is needed.
5. Check the branch preview or the deployed page after the build. The CMS tree remains alphabetical, regardless of website navigation order.

## B. Add a new subject

New subjects are not inferred from arbitrary folders. Create a page, then make one subject-registry entry. You do not separately edit the homepage and sidebar.

1. Create `src/content/docs/new-subject/index.md` in GitHub (or use the CMS folder/file controls when available). Use:

```md
---
title: New Subject
description: A short description of the subject.
sidebar:
  label: Overview
  order: 0
---

Your subject introduction.
```

2. In Pages CMS open **Subject navigation and homepage** and add one subject:
   - Subject name: `New Subject`
   - Existing subject folder: `new-subject`
   - Subject overview URL: `/new-subject/`
   - Homepage card description: a short, accurate description.
3. Save. The subject list order controls both the homepage cards and sidebar groups. Its new folder's notes are automatically generated within the group.
4. Run the build and rendered-link check below. A registry entry does not create its destination page. A missing page should block the validation check, not be published as an empty link.

Keep the existing `Constitutional Law` folder and its note in place. Its registry destination is `/constitutional-law/constitutional-law/`, based on the existing filename. This change does not move it into Public Law or rename the file. Confirm that route in the production build before merging.

## C. Change note order

Open the note's **Navigation settings**. Set **Display order** to a number: smaller values appear first. Reserve `0` for the subject overview and use `1`, `2`, `3`, etc. for topics. Unnumbered pages use Starlight's default sorting. Leave the short navigation label unset for normal notes; the page title will be used. Use `Overview` only for the subject landing page. Do not change filenames simply to reorder notes.

## D. Add diagrams and videos

- Diagram: in the note's **Diagrams** list, add a title, upload/select a diagram, provide meaningful alternative text, and add a full description of important branches or steps. Save the note. The existing media component renders it automatically; no imports are needed.
- Video: paste the complete YouTube URL into **YouTube URL**. Optionally add a title and a nonnegative whole-number start time in seconds. If no video is wanted, remove the URL field rather than saving an empty string. The existing video component handles display.
- Preserve uploaded assets that other pages may use. Deleting a demonstration page is not permission to delete its media.

## Build and checks

Use a Node version compatible with the locked dependencies (the CI workflow uses Node 22). From the repository root:

```sh
npm ci
npm run build
node scripts/check-built-site.mjs
npm run preview
```

`npm run build` is the existing project build; dependencies and the lockfile are unchanged. The new script checks rendered subject cards, subject destinations, local HTML hrefs/anchors, and removed demo routes. It does not replace TypeScript checking, image/video network checks, browser accessibility tests, or visual review. A GitHub Actions workflow runs the build and rendered-link checks for review branches and pull requests.

For local development follow `AGENTS.md` and `CLAUDE.md`, including their background-server instructions.

## Before merging

- Confirm CI has actually passed; adding a workflow does not prove a successful build.
- Check 375px mobile, 768px tablet and 1440px desktop layouts in light and dark themes.
- At the top and after scrolling, check title visibility, header/search, sidebar controls, anchor targets, cards and horizontal overflow.
- Use Tab/Enter to navigate and check visible focus. Test reduced-motion preferences and browser zoom.
- Smoke-test existing diagram selection, pan/zoom, reset, download, full screen and keyboard controls; verify a real YouTube URL and start time. Use a local or uncommitted fixture if no real note has media; do not recreate public test pages.
- Existing note files and URL structure are preserved. Removed demo/test URLs intentionally return not found; no automatic redirect is added to unrelated legal content.
- Merge only after review. Verify Cloudflare's deployment status separately; a GitHub commit or successful CI build alone does not prove production deployment.
