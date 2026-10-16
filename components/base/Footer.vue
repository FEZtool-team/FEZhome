<template>
  <footer class="border-t border-glass bg-fez-950">
    <div class="mx-auto grid max-w-6xl gap-12 px-gutter py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div class="sm:col-span-2 lg:col-span-1">
        <BaseLogo variant="stacked" class="h-16 w-auto" />
        <p class="mt-5 max-w-xs text-sm leading-relaxed text-fez-500">
          Free &amp; Easy tools for Earth sciences. Software under Apache-2.0, documentation under CC BY 4.0.
        </p>
      </div>

      <div v-for="group in groups" :key="group.title">
        <h3 class="text-sm font-medium text-fez-100">{{ group.title }}</h3>
        <ul class="mt-4 space-y-3 text-sm text-fez-400">
          <li v-for="link in group.links" :key="link.href">
            <a
              v-if="link.href.startsWith('http')"
              :href="link.href"
              target="_blank"
              rel="noopener"
              class="transition-colors hover:text-fez-50"
            >
              {{ link.label }}
            </a>
            <NuxtLink v-else :to="link.href" class="transition-colors hover:text-fez-50">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-glass">
      <p class="mx-auto max-w-6xl px-gutter py-6 text-xs text-fez-500">
        &copy; {{ year }} FEZtool. Made by FEZteam.
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();

const groups = [
  {
    title: "Tools",
    links: [
      { label: "FEZrs on GitHub", href: "https://github.com/FEZtool-team/FEZrs" },
      { label: "FEZrs on PyPI", href: "https://pypi.org/project/fezrs/" },
      { label: "FEZrs on Anaconda", href: "https://anaconda.org/FEZtool/fezrs" },
      { label: "Documentation", href: "https://feztool-team.github.io/FEZdocs/" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "About", href: "/#about" },
      { label: "Research", href: "/#research" },
      { label: "Team", href: "/#team" },
      { label: "Request a demo", href: "/#request-demo" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/FEZtool-team" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/feztool" },
      { label: "Instagram", href: "https://www.instagram.com/fez.tool" },
      { label: "Reddit r/FEZtool", href: "https://www.reddit.com/r/FEZtool/" },
      { label: "Telegram", href: "https://t.me/FEZtool" },
    ],
  },
];
</script>
