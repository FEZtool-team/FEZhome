// Served from a sub-path on GitHub Pages (/FEZhome/), from / everywhere else.
const baseURL = process.env.NUXT_APP_BASE_URL || "/";

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
        { name: "description", content: siteDescription },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "FEZtool" },
        { property: "og:title", content: siteTitle },
        { property: "og:description", content: siteDescription },
        { property: "og:image", content: `${baseURL}icon-512.png` },
        { name: "twitter:card", content: "summary" },
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
