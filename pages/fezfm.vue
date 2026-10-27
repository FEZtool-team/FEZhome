<template>
  <div>
    <article class="relative border-b border-glass pt-16">
      <div class="bg-grid absolute inset-x-0 top-0 -z-10 h-[28rem] [mask-image:linear-gradient(black,transparent)]" aria-hidden="true" />

      <BaseSection class="gap-y-10 py-14 sm:py-20">
        <nav class="col-span-12 text-sm" aria-label="Breadcrumb">
          <NuxtLink to="/#tools" class="inline-flex items-center gap-1.5 text-fez-400 transition-colors hover:text-fez-50">
            <BackIcon aria-hidden="true" /> FEZ ecosystem
          </NuxtLink>
        </nav>

        <header class="col-span-12 lg:col-span-8">
          <ToolsToolBadge tool="fm" size="lg" />
          <h1 class="mt-8 text-4xl font-bold leading-tight tracking-tight text-fez-50 sm:text-5xl">
            FEZfm: an earthquake and fault-zone monitor for Iran and the world
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-fez-400">
            FEZfm is the fault and geohazard monitoring tool of FEZtool. Version 1 is an earthquake monitor: every
            30 minutes it collects reports from USGS and EMSC, merges reports of the same quake, tags fault zones,
            significant events and active sequences, and publishes a feed, a map and downloadable data.
          </p>
          <div class="mt-10 flex flex-wrap gap-3">
            <BaseButton :href="monitor" external variant="fm">Open the monitor</BaseButton>
            <BaseButton href="https://github.com/FEZtool-team/FEZfm" external variant="ghost">
              <GithubIcon aria-hidden="true" /> GitHub
            </BaseButton>
          </div>
          <p class="mt-6 text-sm text-fez-500">A research tool, not an official earthquake warning service.</p>
        </header>
      </BaseSection>
    </article>

    <section id="what" class="border-b border-glass py-section">
      <BaseSection class="gap-y-12">
        <div class="col-span-12">
          <BaseHeading>
            What it publishes
            <template #lead>
              Every page and file is rebuilt each time the collector runs. Times are UTC.
            </template>
          </BaseHeading>
        </div>
        <ul class="col-span-12 grid border-l border-t border-glass sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="item in outputs" :key="item.name" class="border-b border-r border-glass">
            <a :href="`${monitor}${item.path}`" target="_blank" rel="noopener" class="block h-full p-6 transition-colors hover:bg-fez-800">
              <h3 class="font-medium text-fez-50">{{ item.name }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-fez-400">{{ item.text }}</p>
            </a>
          </li>
        </ul>
      </BaseSection>
    </section>

    <section id="method" class="border-b border-glass py-section">
      <BaseSection class="gap-y-12">
        <div class="col-span-12 lg:col-span-4">
          <BaseHeading>
            Sources and method
            <template #lead>
              FEZfm builds on Faultiuo, a monitor for 21 active fault zones in Iran by Fariba Khosravani and Mahdi
              Farmahini Farahani.
            </template>
          </BaseHeading>
        </div>
        <dl class="col-span-12 border-t border-glass lg:col-span-7 lg:col-start-6">
          <div v-for="fact in method" :key="fact.term" class="border-b border-glass py-6">
            <dt class="font-medium text-fez-50">{{ fact.term }}</dt>
            <dd class="mt-2 leading-relaxed text-fez-300">{{ fact.detail }}</dd>
          </div>
        </dl>
      </BaseSection>
    </section>

    <section id="faq" class="border-b border-glass py-section">
      <BaseSection class="gap-y-12">
        <div class="col-span-12 lg:col-span-4">
          <BaseHeading>Questions about FEZfm</BaseHeading>
        </div>
        <div class="col-span-12 border-t border-glass lg:col-span-7 lg:col-start-6">
          <div v-for="item in faq" :key="item.q" class="border-b border-glass py-7">
            <h3 class="text-lg font-medium text-fez-50">{{ item.q }}</h3>
            <p class="mt-3 leading-relaxed text-fez-300">{{ item.a }}</p>
          </div>
        </div>
      </BaseSection>
    </section>
  </div>
</template>

<script setup lang="ts">
import BackIcon from "~icons/material-symbols-light/arrow-back-rounded";
import GithubIcon from "~icons/mdi/github";
import { breadcrumbs, fezfmApp } from "~/data/schema";

// Facts follow the "Sources and method" and "Data" pages of the monitor itself.
const monitor = "https://fezfm.feztool.com/";

const outputs = [
  { name: "Feed", path: "", text: "Recent earthquakes in the Iran region and M2.5+ worldwide, with filters." },
  { name: "Map", path: "map/", text: "Events with active faults, plate boundaries and the monitored fault zones." },
  { name: "Archive", path: "archive/", text: "Every stored event, one file per calendar month." },
  { name: "Data", path: "downloads/", text: "CSV, GeoJSON and Parquet for the last 2 hours to 30 days, an Atom feed and the full DuckDB database." },
];

const method = [
  {
    term: "Sources",
    detail:
      "USGS (worldwide) and EMSC, which also redistributes reports from Iranian agencies and is the main source for Iran. IRSC is not collected at the moment; IRSC events collected earlier are kept.",
  },
  {
    term: "Merging",
    detail:
      "Reports from different sources become one event when they are within 45 seconds, 80 km and one magnitude unit of each other.",
  },
  {
    term: "Flags",
    detail:
      "Significant: M5 or larger anywhere, or M4 or larger in Iran and adjacent areas. Active sequence: at least 5 events within 25 km in 6 hours. Fault zone: the epicentre lies inside the buffer of one of the 21 monitored zones.",
  },
  {
    term: "Coverage and delay",
    detail:
      "All magnitudes in Iran and adjacent areas (latitude 24–41, longitude 42–64), M2.5 and above elsewhere. Data are 30 to 45 minutes behind real time.",
  },
];

const faq = [
  {
    q: "Is FEZfm an earthquake warning service?",
    a: "No. FEZfm is a research tool and its data are 30 to 45 minutes behind real time. Use the official agencies for warnings.",
  },
  {
    q: "How often is FEZfm updated?",
    a: "Every 30 minutes a GitHub Actions job requests the last two days from each source, so late reports and revised magnitudes are picked up, and the site, the feed and the downloads are rebuilt.",
  },
  {
    q: "Can I download the earthquake data?",
    a: "Yes. The Data page offers CSV, GeoJSON and Parquet files for the last 2 hours, 24 hours, 7 days and 30 days, a monthly archive, an Atom feed and the complete DuckDB database. Credit the original agencies and FEZfm.",
  },
];

const { siteUrl } = useRuntimeConfig().public;

usePageSeo({
  path: "/fezfm/",
  title: "FEZfm: earthquake monitor for Iran and the world | FEZtool",
  description:
    "FEZfm merges USGS and EMSC earthquake reports every 30 minutes, tags 21 fault zones in Iran, and publishes a feed, a map and CSV, GeoJSON and Parquet downloads.",
  image: "/og/fezfm.png",
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: "FEZfm: an earthquake and fault-zone monitor",
});
useJsonLd([
  fezfmApp(siteUrl),
  breadcrumbs(siteUrl, [
    { name: "FEZtool", path: "/" },
    { name: "FEZfm", path: "/fezfm/" },
  ]),
]);
</script>
