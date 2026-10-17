---
name: fez-brand
description: FEZtool brand and UI rules for this site. Use when adding or restyling any section, component, color, logo, favicon or copy on the FEZhome landing page.
---

# FEZ brand

## Color

Colors live as RGB-channel CSS variables in `assets/css/main.css` and are mapped to Tailwind in `nuxt.config.ts`, so opacity modifiers work (`bg-rs-500/10`).

- **Brand = monochrome.** FEZtool and FEZteam use only the `fez-*` neutral scale. The anchors come from the Figma palette (file `7tYjBNUajlI43hCzP986uS`, node `349-116`):

  | Token | Hex | Figma name | Typical use |
  |---|---|---|---|
  | `fez-50` | `#F8F9FA` | Secondry-Dark mode | headings, primary button |
  | `fez-100` | `#E9ECEF` | Primary-Dark Mode | body text on dark |
  | `fez-400` | `#ADB5BD` | Light | secondary text |
  | `fez-500` | `#6C757D` | Secondry | muted text, captions |
  | `fez-700` | `#343A40` | Primary | raised surfaces |
  | `fez-900` | `#212529` | Dark | page background |

  The other steps (200, 300, 600, 800, 950) fill the scale between those anchors.
- **Each tool has its own color, used only where that tool is presented** (its panel, badge, glow, CTA, section accent):
  - FEZrs: green `rs-*` (500 `#72B01D`)
  - FEZcc: orange `cc-*` (500 `#F97316`)
  - FEZfm: blue `fm-*` (500 `#3B82F6`)
- Never use a tool color for site chrome (navbar, footer, generic buttons, headings). The one exception is form error text, which uses `cc-300` for contrast.
- Hairlines: `border-glass` and `border-glass-strong` (white at 8%/16% on dark, black at 10%/18% on light).

## Themes

Dark is the default. Light mode lives in `:root[data-theme="light"]` in `main.css` and **redefines the same variables**: the `fez-*` scale is inverted around 500 (light page `fez-900` = `#E9ECEF`, the Figma "Primary-Dark Mode" panel), and the tool scales are flipped 50↔900 so tinted text such as `text-rs-300` stays readable. Components therefore never need `dark:`/`light:` variants; write them once with tokens.

- `html[data-theme]` is set before paint by the inline script in `nuxt.config.ts` (preference from `localStorage["fez-theme"]`, else the OS setting). `composables/useTheme.ts` holds the preference (`system` | `light` | `dark`), and `<BaseThemeToggle>` cycles through it.
- Things that must not flip: photographs and output images (white slider handle), text on tool-colored buttons (`text-on-tool`).
- Light-on-transparent artwork (partner logos) gets `.invert-on-light`.
- Syntax colors are their own tokens (`--syntax-*`), not tool colors.

## Utilities and tokens

- `.glass`: translucent surface with blur and a hairline border (navbar when scrolled, form cards, the FEZrs panel).
- `.bg-grid`: the faint coordinate grid from the Astro Kit moodboard (Figma node `225-124`).
- `.bg-starfield`: CSS-only stars, hero only.
- `.text-gradient`: monochrome metallic fill, reserved for the hero title.
- `.field` / `.field-label`: form inputs.
- Radius `rounded-sm|md|lg` (6/12/20px), section padding `py-section`, horizontal gutter `px-gutter`, glows `shadow-glow-rs|cc|fm`.

## Components

- Sections: `components/landing/*.vue`, each a `<section id>` with `border-b border-glass py-section`, content inside `<BaseSection>` (12-column grid, `max-w-6xl`).
- Headings: `<BaseHeading>` with a `#lead` slot. Font is Poppins. Weights by level: page and section titles (h1, section h2) `font-bold`, subheadings (h3) `font-semibold`, small item titles `font-medium`; body text stays regular. Sentence case.
- Buttons: `<BaseButton>`. Use `variant="primary"` (one per view), `ghost` for secondary actions, and `rs|cc|fm` only inside that tool's panel. Pass `href` to render a link; add `external` for new-tab links.
- Tool identity: `<ToolsToolBadge tool="rs|cc|fm">` (two-letter badge).
- Grids of related items use shared hairline cells (`border-l border-t` on the parent, `border-b border-r` on each cell) rather than separate floating cards.

## Writing tone

Serious and professional, written for researchers and engineers.

- Plain, specific statements. Say what a tool does; do not sell it. No exclamation marks, emoji or hype words ("revolutionary", "powerful", "cutting-edge").
- Sentence case everywhere. No all-caps labels and no eyebrow text above headings.
- Facts about FEZrs come from the paper and FEZdocs (see the `fezrs-reference` skill). Never invent numbers, users or partners.
- Team titles are professional roles, not jokes. Only the four core members appear on the site.
- Buttons name the action: "Request a demo", "Send message", "Read the docs". No arrows appended to button text.

## Logo and favicon

- Source: Figma node `360-116`, exported as `assets/img/logo/feztool-logo-figma.svg` (keep it untouched).
- Lettering: the FEZTOOL wordmark from node `360-838`, raw export `assets/img/logo/feztool-lettering-figma.svg`.
- **Use `<BaseLogo variant="mark|horizontal|stacked">` in the UI.** It draws inline paths from `data/logo.ts` with `currentColor` plus `--logo-accent`, so it follows the theme. The navbar uses `horizontal` (mark + lettering), the footer `stacked` (the Figma base logo).
- Static files for use outside the app (each color merged into a single path so no seams appear between shapes):
  - `logo-light.svg` / `logo-dark.svg`: mark plus FEZTOOL wordmark, for dark and light backgrounds.
  - `mark-light.svg` / `mark-dark.svg`: the FEZ mark only.
- Light versions use `#F8F9FA` with the `#ADB5BD` accent; dark versions use `#212529` with `#6C757D`.
- Never recolor the logo with a tool color, and never stretch it or add effects.
- Favicons in `public/`: `favicon.svg` (light mark on a rounded `#212529` tile), `favicon.ico` (16/32/48), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `site.webmanifest`. When the logo changes, regenerate them all from `favicon.svg`; headless Chrome works as the rasterizer.

## Motion

- One orchestrated moment: the hero pipeline (`components/landing/HeroScene.vue`), a 14 s CSS loop (satellite scan → GeoTIFF bands → FEZrs → outputs). Its default styles are the final frame, and the keyframes apply only under `prefers-reduced-motion: no-preference`.
- Any other motion should answer a user action (theme toggle, tabs, the compare slider returning to centre).

## Code blocks

`<ToolsCodeBlock lang="python|bash" :code>` highlights with `utils/highlight.ts` (no dependency; emits `.tok-*` spans). Install commands use `<ToolsInstallTabs>` (pip / conda / mamba, shared selection). Keep sample lines short enough to fit without horizontal scrolling on desktop.

## Forms

All forms are UI only and make no network calls. Submitting validates locally and shows a thank-you state that offers a prefilled `mailto:` link, so the page never claims to have sent something it has not.
