---
name: fezhome-deploy
description: How to run, build, statically generate and deploy the FEZhome site to GitHub Pages, including the baseURL caveat. Use before building, previewing or publishing the site.
---

# FEZhome build and deploy

## Local

```bash
npm install
npm run dev          # http://localhost:3035
npm run build        # uses the github-pages Nitro preset; output in .output/public
```

If port 3035 is already taken (for example by the old FEZLanding server), run `npx nuxt dev --port 3036`.

## Static generation for GitHub Pages

The site is served from a sub-path, `https://feztool-team.github.io/FEZhome/`, so the base URL must be set at build time:

```bash
NUXT_APP_BASE_URL=/FEZhome/ npm run generate
```

`nuxt.config.ts` reads `NUXT_APP_BASE_URL` (default `/`) into `app.baseURL` and uses it for the favicon, manifest and OG links in `app.head`. Assets imported from `~/assets` are prefixed automatically.

**Caveats**
- Anything in `public/` that is referenced by a hard-coded absolute path such as `/favicon.svg` will 404 under `/FEZhome/`. Build such paths from `baseURL`, or import the file from `assets/`.
- In-page links are plain `#anchors`, so they work under any base.
- Pages deploys from GitHub Actions, so Jekyll never runs and `_nuxt/` is served as is. `public/.nojekyll` is only a safeguard in case the source is ever switched to "Deploy from a branch". `upload-pages-artifact` v4+ leaves dotfiles out of the artifact anyway.

To check the sub-path build locally, serve the output under the same prefix:

```bash
rm -rf /tmp/fezhome-serve && mkdir -p /tmp/fezhome-serve && cp -r .output/public /tmp/fezhome-serve/FEZhome
npx serve /tmp/fezhome-serve -l 4000   # open http://localhost:4000/FEZhome/
```

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main` on **Node 24 (npm 11)**: `npm ci`, then `NUXT_APP_BASE_URL=/FEZhome/ npm run generate`, then `actions/upload-pages-artifact` (`.output/public`) and `actions/deploy-pages`.

Repository: https://github.com/FEZtool-team/FEZhome (public). Pages source is **GitHub Actions** (already set).

**Lockfile:** CI uses `npm ci`, which needs `package-lock.json` to match the npm major version in CI. Regenerate the lockfile with npm 11 (Node 24) only. An npm 10 runner rejects npm 11 lockfiles for this dependency tree (`Missing: unplugin@3.4.0 from lock file`).

Publishing is a deliberate step. Do not create the remote, push or enable Pages unless the user asks for it.
