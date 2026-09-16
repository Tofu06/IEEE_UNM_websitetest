# IEEE UNM Jekyll Website

A GitHub Pages + Jekyll website for IEEE UNM.

## Folder structure

- `index.html` — homepage
- `about.html` — about page
- `updates.html` — automatically lists posts from `_posts`
- `events.html` — event archive grouped by year
- `contact.html` — contact page
- `_includes/` — shared header and footer
- `_layouts/` — reusable page layouts
- `_posts/` — Markdown updates/events
- `assets/css/style.css` — shared styling
- `assets/js/main.js` — shared mobile navigation
- `images/` — site images
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Adding a new post

Create a new Markdown file in `_posts/` using this naming pattern:

`YYYY-MM-DD-title.md`

Example:

```markdown
---
layout: post
title: "New Workshop"
date: 2026-10-05 14:00:00 +0800
category: Workshop
image: /images/new-workshop.jpg
---

Write the article here.
```

The post will automatically appear on the Updates page and Events archive.

## Local development

GitHub recommends using Bundler to install and run Jekyll locally. GitHub Pages documentation also notes that Jekyll is not officially supported on Windows; using WSL2 is a practical Windows setup.

From the project folder:

```bash
bundle install
bundle exec jekyll serve --baseurl=""
```

Then open:

`http://localhost:4000`

Jekyll will automatically regenerate the site when source files change.

## GitHub Pages

Push the repository to GitHub and enable **Settings → Pages → GitHub Actions** as the source. The included workflow builds the Jekyll site and deploys it.

If the repository name is `IEEE-UNM-website`, keep this in `_config.yml`:

```yaml
baseurl: "/IEEE-UNM-website"
```

For a user/organization site at `username.github.io`, change `baseurl` to an empty string.
