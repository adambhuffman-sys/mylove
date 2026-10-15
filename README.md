# 350 Pegs: six things to make

A tiny, mobile-first static site: six craft projects for a pile of mini colored clothespins, each with mockups, a supplies checklist, and a full step-by-step how-to. Plain HTML, CSS and JavaScript. No build step, no dependencies, works offline (the Inter Tight font is bundled).

## Put it online (GitHub Pages)

1. On github.com, click **+** (top right) → **New repository**. Name it, for example, `pegs`. Set it to **Public** (free GitHub Pages needs a public repo). Click **Create repository**.
2. On the new repo page, click **uploading an existing file**.
3. Unzip `clothespin-ideas.zip` on your computer. Open the folder and select **everything inside it** (including the hidden `.nojekyll` file, plus `fonts` and `img` folders), then drag it all into the GitHub page. `index.html` must end up at the **top level** of the repo, not inside a subfolder.
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: main**, **Folder: / (root)**, then **Save**.
6. Wait about a minute. Your site will be at `https://<your-username>.github.io/<repo-name>/` (for example `https://adam.github.io/pegs/`). Text that link to the recipient.

> Tip for dragging folders: if the browser upload skips the `.nojekyll` file, it's optional here (the site has no Jekyll-style files), so you can ignore it.

## Make the iMessage link preview work (do this after step 6)

Link previews need an **absolute** image URL. Open `index.html` in GitHub (pencil icon) and change:

```html
<meta property="og:image" content="img/og.png">
```

to

```html
<meta property="og:image" content="https://<your-username>.github.io/<repo-name>/img/og.png">
```

Optionally add `<meta property="og:url" content="https://<your-username>.github.io/<repo-name>/">`. Commit, wait a minute, then send the link. (iMessage caches previews, so if you test first, send a fresh link with `?v=2` on the end.)

## Add to Home Screen

On iPhone: open the link in Safari → Share → **Add to Home Screen**. It opens full-screen like an app.

## Editing

* Text and steps: `data.js` (one object per project).
* Look and feel: `styles.css` (colors are CSS variables at the top).
* Mockup images: `img/photos/*.webp` are the AI-generated concept mockups (shown first, tagged "Concept mockup"); `img/*.svg` are the diagrams (shown last, tagged "Diagram"). Slide order, captions, alt text and aspect ratios live in `data.js`.
* Peg counts and the "Pin math" bar read from `pins` in `data.js` and the `TOTAL` constant in `app.js` (350).

All paths are relative, so it works at a subpath like `/pegs/` and when opened from any folder.

## Files

```
index.html  styles.css  app.js  data.js
fonts/      Inter Tight (400, 600, 800)
img/        diagrams (SVG), photos/ (WebP mockups), og.png (link preview)
favicon.svg favicon-32.png apple-touch-icon.png  .nojekyll
```
