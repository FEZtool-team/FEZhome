# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

FEZhome is the single-page landing site for **FEZtool** ("Free & Easy"), which makes open-source tools for Earth sciences. Built with **Nuxt 3** (Vue 3, TypeScript), **Tailwind CSS**, `unplugin-icons` and Google Fonts (Poppins). It is generated statically for GitHub Pages under `/FEZhome/`. It has no backend, no API calls and no test suite.

## Commands

```bash
npm install
npm run dev                                   # http://localhost:3035
npm run build                                 # github-pages preset → .output/public
NUXT_APP_BASE_URL=/FEZhome/ npm run generate  # what CI deploys
```

Verify changes with `npm run build` and a check in the dev server, including a 375px mobile width with no horizontal scroll. Use Node 24 / npm 11 (same as CI) so `package-lock.json` stays valid for `npm ci`. `README.md` is the public face of the org's home page: keep it about FEZtool, not about building the site. Only one Nuxt process can run per checkout: stop `nuxt dev` before running `build`/`generate`, or the lock check fails. npm only (`package-lock.json`).

## Project skills

Read these before working in their areas:
- `.claude/skills/fez-brand`: tokens, components, tone, logo and favicon rules.
- `.claude/skills/fezrs-reference`: FEZrs facts and vocabulary. Never invent claims.
- `.claude/skills/fezhome-deploy`: build, sub-path baseURL caveats, Pages deploy.

## Layout

```
app.vue                  # NuxtLayout + NuxtPage
layouts/default.vue      # skip link, Navbar, <slot>, Footer
pages/index.vue          # stacks the Landing* sections in order
pages/team/[slug].vue    # member pages, prerendered (linked from the Team cards)
data/                    # team.ts (members, links, ORCIDs), logo.ts (generated logo paths)
composables/useTheme.ts  # system/light/dark preference
utils/highlight.ts       # tiny Python/bash highlighter for code blocks
components/
  base/                  # Navbar, Footer, Section (12-col grid), Heading, Button, Logo, ThemeToggle
  landing/               # Hero (+ HeroScene animation), About, Tools, Fezrs, Showcase, Research,
                         #   Documentation, RequestDemo, Team, Contact, Collaborations
  tools/                 # BeforeAfterSlider, Chip, ToolBadge, CodeBlock, InstallTabs, LinkIcon
assets/css/main.css      # design tokens (CSS vars) + .glass/.bg-grid/.bg-starfield/.field
assets/img/              # logo/ (Figma export + derived), fezrs/ (outputs), team/, collabs/
public/                  # favicons, site.webmanifest, .nojekyll, robots.txt
nuxt.config.ts           # baseURL, head/meta, Tailwind token mapping, github-pages preset
```

## Conventions

- Components are auto-imported by folder + file name: `components/landing/Hero.vue` → `<LandingHero />`, `components/tools/ToolBadge.vue` → `<ToolsToolBadge />`. Don't import them manually.
- Links to home-page sections use routes (`<NuxtLink to="/#team">`, `<BaseButton to="/#request-demo">`) so they also work from `/team/*`. Plain `href="#x"` is fine only inside the home page.
- Both themes come from the same tokens; see the fez-brand skill before adding colors.
- New sections go in `components/landing/` as `<section id="..." class="border-b border-glass py-section">` wrapping `<BaseSection>`, and get added to `pages/index.vue`. Add a navbar link if the section should be reachable from it.
- Colors: monochrome `fez-*` for brand and chrome. Tool colors (`rs-*` green, `cc-*` orange, `fm-*` blue) appear only where that tool is presented. No raw hex values in components.
- Forms are UI only: validate locally, show a thank-you state with a `mailto:` fallback, and never call `fetch` or `useFetch`.
- `<script setup lang="ts">`; Tailwind utilities first, `<style scoped>` only when Tailwind can't express it.
- Icons: `~icons/<collection>/<name>` (e.g. `material-symbols-light`, `mdi`). Check the name exists in `@iconify/json`.
- Images: put them in `assets/img/` and import them so Vite fingerprints them and applies the baseURL. Anything in `public/` must be referenced with the baseURL.

## Gotchas

- `BeforeAfterSlider.vue`: the "after" image is clipped with `clip-path`, and the handle and clip share one `--return-ms` transition that is applied only while returning (`RETURN_DELAY_MS` 900, `RETURN_MS` 450). Change both together. Both images must have the same framing (see the fezrs-reference skill on cropping).
- Classes that only appear in `.ts` strings (e.g. `.tok-*`) must be defined outside `@layer` in `main.css`, or Tailwind purges them.
- `vue` and `vue-router` are pinned to `latest`; be careful when regenerating the lockfile.

## Commits

Short prefixed messages: `FEAT ...`, `FIX ...`.
