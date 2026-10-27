import { writeFile } from "node:fs/promises";
import { join } from "node:path";

// Served from the root of feztool.com; set NUXT_APP_BASE_URL to serve from a sub-path.
const baseURL = process.env.NUXT_APP_BASE_URL || "/";
// Absolute origin for canonical URLs, Open Graph images, JSON-LD and the sitemap.
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || "https://feztool.com").replace(/\/$/, "");

const siteTitle = "FEZtool: Free & Easy tools for Earth sciences";
const siteDescription =
  "FEZtool builds free, open-source Python tools for remote sensing, climate and geohazards. FEZrs, our multispectral image-processing library, is available on PyPI and conda.";

// Tailwind color scale backed by the RGB-channel CSS variables in main.css.
const scale = (name: string, steps: number[]) =>
  Object.fromEntries(
    steps.map((s) => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`])
  );
const toolSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// Runs before first paint: resolves the saved preference (or the system
// setting) to html[data-theme], so there is no flash of the wrong theme.
// Keep the storage key in sync with composables/useTheme.ts.
const themeScript = `(function(){try{var p=localStorage.getItem("fez-theme");var t=p==="light"||p==="dark"?p:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL,
    head: {
      title: siteTitle,
      htmlAttrs: { lang: "en" },
      meta: [
        // Pages override these with usePageSeo (canonical, og:url and og:image are absolute).
        { name: "description", content: siteDescription },
        { property: "og:site_name", content: "FEZtool" },
        { property: "og:locale", content: "en_US" },
        { name: "theme-color", content: "#212529", media: "(prefers-color-scheme: dark)" },
        { name: "theme-color", content: "#E9ECEF", media: "(prefers-color-scheme: light)" },
      ],
      script: [{ innerHTML: themeScript, tagPosition: "head" }],
      link: [
        { rel: "icon", type: "image/svg+xml", href: `${baseURL}favicon.svg` },
        { rel: "icon", type: "image/x-icon", href: `${baseURL}favicon.ico`, sizes: "32x32" },
        { rel: "apple-touch-icon", href: `${baseURL}apple-touch-icon.png` },
        { rel: "manifest", href: `${baseURL}site.webmanifest` },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: { siteUrl },
  },

  experimental: {
    // GitHub Pages serves /fezrs/ and redirects /fezrs to it, so link to the slash form.
    defaults: { nuxtLink: { trailingSlash: "append" } },
  },

  hooks: {
    // Write sitemap.xml from the HTML pages the prerenderer actually produced, so a
    // new page or team member is listed without keeping a second route list.
    "nitro:init": (nitro) => {
      const pages = new Set<string>();
      nitro.hooks.hook("prerender:route", (route) => {
        if (!route.error && route.contentType?.startsWith("text/html") && !route.route.endsWith(".html")) {
          pages.add(route.route.endsWith("/") ? route.route : `${route.route}/`);
        }
      });
      nitro.hooks.hook("prerender:done", async () => {
        if (!pages.size) return;
        const urls = [...pages].sort().map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
        await writeFile(join(nitro.options.output.publicDir, "sitemap.xml"), xml);
      });
    },
    // Nuxt adds <link rel="prefetch"> for every image the bundle imports (about 30,
    // several MB). They compete with the first view on phones, and each image is
    // loaded when it is shown anyway.
    "build:manifest": (manifest) => {
      for (const chunk of Object.values(manifest)) {
        chunk.assets = chunk.assets?.filter((a) => !/\.(webp|png|jpe?g|svg)$/.test(a));
      }
    },
  },

  devServer: {
    port: 3035,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "unplugin-icons/nuxt",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700],
    },
    display: "swap",
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Poppins", "sans-serif"],
            mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
          },
          colors: {
            fez: scale("fez", [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
            rs: scale("rs", toolSteps),
            cc: scale("cc", toolSteps),
            fm: scale("fm", toolSteps),
            "on-tool": "rgb(var(--on-tool) / <alpha-value>)",
            glass: "var(--border-glass)",
            "glass-strong": "var(--border-glass-strong)",
          },
          borderRadius: {
            sm: "var(--radius-sm)",
            md: "var(--radius-md)",
            lg: "var(--radius-lg)",
          },
          spacing: {
            section: "var(--space-section)",
            gutter: "var(--space-gutter)",
          },
          boxShadow: {
            panel: "var(--shadow-panel)",
            "glow-rs": "var(--glow-rs)",
            "glow-cc": "var(--glow-cc)",
            "glow-fm": "var(--glow-fm)",
          },
        },
      },
    },
  },

  typescript: {
    shim: false,
  },

  nitro: {
    preset: "github-pages",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-11-01",
});
