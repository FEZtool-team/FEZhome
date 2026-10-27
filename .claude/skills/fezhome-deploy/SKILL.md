---
name: fezhome-deploy
description: How to run, build, statically generate and deploy the FEZhome site (feztool.com) to GitHub Pages, including the site URL and baseURL settings. Use before building, previewing or publishing the site.
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

The site is served from the root of its custom domain, `https://feztool.com/`, so the default base URL `/` is right:

```bash
npm run generate     # output in .output/public, including sitemap.xml
npx serve .output/public -l 4000
```

`feztool-team.github.io/FEZhome/` redirects to `https://feztool.com/`. The domain is set in the repository's Pages settings (there is no `CNAME` file; Actions deploys don't need one).

- `runtimeConfig.public.siteUrl` (env `NUXT_PUBLIC_SITE_URL`, default `https://feztool.com`) is the origin used for canonical URLs, `og:image`, JSON-LD and `sitemap.xml`. Change it only if the domain changes.
- `NUXT_APP_BASE_URL` (default `/`) still works for serving from a sub-path. `nuxt.config.ts` builds the favicon and manifest links from it, and assets imported from `~/assets` are prefixed automatically. Anything in `public/` referenced by a hard-coded absolute path would 404 under a sub-path.
- Pages deploys from GitHub Actions, so Jekyll never runs and `_nuxt/` is served as is. `public/.nojekyll` is only a safeguard in case the source is ever switched to "Deploy from a branch".

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main` on **Node 24 (npm 11)**: `npm ci`, then `npm run generate` (with `NUXT_APP_BASE_URL: /`), then `actions/upload-pages-artifact` (`.output/public`) and `actions/deploy-pages`.

Repository: https://github.com/FEZtool-team/FEZhome (public). Pages source is **GitHub Actions** (already set).

**Lockfile:** CI uses `npm ci`, which needs `package-lock.json` to match the npm major version in CI. Regenerate the lockfile with npm 11 (Node 24) only. An npm 10 runner rejects npm 11 lockfiles for this dependency tree (`Missing: unplugin@3.4.0 from lock file`).

Publishing is a deliberate step. Do not create the remote, push or enable Pages unless the user asks for it.
