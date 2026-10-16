# FEZhome

Landing page for [FEZtool](https://github.com/FEZtool-team), "Free & Easy" open-source tools for Earth sciences. It presents the FEZ ecosystem (FEZrs, plus the planned FEZcc and FEZfm), FEZrs results and research, the team, and contact channels.

Built with Nuxt 3, Tailwind CSS and Outfit. The site is generated statically for GitHub Pages at `https://feztool-team.github.io/FEZhome/`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3035
npm run build
```

## Generate for GitHub Pages

```bash
NUXT_APP_BASE_URL=/FEZhome/ npm run generate   # output: .output/public
```

`.github/workflows/deploy.yml` does this on every push to `main` and publishes with GitHub Pages (Settings → Pages → Source: GitHub Actions).

## Project notes

- Design tokens, brand rules and writing tone: `.claude/skills/fez-brand/SKILL.md`
- FEZrs facts and remote-sensing vocabulary: `.claude/skills/fezrs-reference/SKILL.md`
- Build and deploy details: `.claude/skills/fezhome-deploy/SKILL.md`

## License

Code under Apache-2.0 (see `LICENSE`). FEZrs images in `assets/img/fezrs/` come from the [FEZrs repository](https://github.com/FEZtool-team/FEZrs) (Apache-2.0).
