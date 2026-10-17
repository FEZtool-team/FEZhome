<template>
  <section id="tools" class="border-b border-glass py-section">
    <BaseSection class="gap-y-12">
      <div class="col-span-12">
        <BaseHeading>
          The FEZ ecosystem
          <template #lead>
            Each tool covers one Earth-science domain and shares the same principles: open code, a small and
            consistent API, and documentation written for practitioners.
          </template>
        </BaseHeading>
      </div>

      <!-- FEZrs: available -->
      <article
        class="glass col-span-12 rounded-lg p-7 shadow-glow-rs sm:p-10 lg:col-span-7"
        style="border-color: rgb(var(--rs-500) / 0.35)"
        aria-labelledby="tool-rs"
      >
        <div class="flex items-start justify-between gap-4">
          <ToolsToolBadge tool="rs" size="lg" />
          <span class="rounded-full bg-rs-500/15 px-3 py-1 text-xs font-medium text-rs-300">Available</span>
        </div>
        <h3 id="tool-rs" class="mt-8 text-3xl font-semibold text-fez-50">FEZrs</h3>
        <p class="mt-1 text-sm text-rs-300">Remote sensing</p>
        <p class="mt-5 max-w-xl leading-relaxed text-fez-300">
          An open-source Python package for geospatial multispectral image processing and remote sensing:
          spectral indices, filters, image enhancement, change detection, clustering and classification behind
          one calculator API.
        </p>
        <div class="mt-7 max-w-md">
          <ToolsInstallTabs />
        </div>
        <div class="mt-7 flex flex-wrap gap-2">
          <ToolsChip>JOSS paper under review</ToolsChip>
          <ToolsChip>Apache-2.0</ToolsChip>
        </div>
        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton href="#fezrs" variant="rs">See what it does</BaseButton>
          <BaseButton href="https://github.com/FEZtool-team/FEZrs" external variant="ghost">
            <GithubIcon aria-hidden="true" /> GitHub
          </BaseButton>
          <BaseButton href="https://feztool-team.github.io/FEZdocs/libraries/fezrs/" external variant="ghost">
            Documentation
          </BaseButton>
        </div>
      </article>

      <!-- FEZfm: live -->
      <article
        class="glass col-span-12 flex flex-col rounded-lg p-7 shadow-glow-fm sm:p-10 lg:col-span-5"
        style="border-color: rgb(var(--fm-500) / 0.35)"
        aria-labelledby="tool-fm"
      >
        <div class="flex items-start justify-between gap-4">
          <ToolsToolBadge tool="fm" size="lg" />
          <span class="rounded-full bg-fm-500/15 px-3 py-1 text-xs font-medium text-fm-300">Live</span>
        </div>
        <h3 id="tool-fm" class="mt-8 text-3xl font-semibold text-fez-50">FEZfm</h3>
        <p class="mt-1 text-sm text-fm-300">Fault and geohazard monitoring</p>
        <p class="mt-5 leading-relaxed text-fez-300">
          Version 1 is an earthquake monitor. Every 30 minutes it collects reports from IRSC, USGS and EMSC,
          merges reports of the same quake, tags fault zones, significant events and active sequences, and
          publishes a feed, a map and downloadable data.
        </p>
        <dl class="mt-7 grid border-l border-t border-glass text-sm">
          <div v-for="fact in fmFacts" :key="fact.term" class="border-b border-r border-glass px-4 py-3">
            <dt class="text-xs text-fez-500">{{ fact.term }}</dt>
            <dd class="mt-0.5 text-fez-200">{{ fact.detail }}</dd>
          </div>
        </dl>
        <p class="mt-5 text-xs leading-relaxed text-fez-500">
          A research tool, not an official earthquake warning service.
        </p>
        <div class="mt-auto flex flex-wrap gap-3 pt-8">
          <BaseButton href="https://feztool-team.github.io/FEZfm/" external variant="fm">Open the monitor</BaseButton>
          <BaseButton href="https://github.com/FEZtool-team/FEZfm" external variant="ghost">
            <GithubIcon aria-hidden="true" /> GitHub
          </BaseButton>
        </div>
      </article>

      <!-- FEZcc: planned -->
      <article
        class="col-span-12 rounded-lg border border-dashed border-cc-500/35 p-7 sm:p-8"
        aria-labelledby="tool-cc"
      >
        <div class="flex flex-col gap-5 sm:flex-row sm:items-start">
          <ToolsToolBadge tool="cc" />
          <div class="flex-1">
            <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 id="tool-cc" class="text-2xl font-semibold text-fez-50">FEZcc</h3>
              <p class="text-sm text-cc-300">Climate change</p>
            </div>
            <p class="mt-3 max-w-2xl text-sm leading-relaxed text-fez-400">
              Climate-change analytics: trend detection and indicator calculation for climate and land-surface
              time series.
            </p>
          </div>
          <span class="self-start rounded-full bg-cc-500/10 px-3 py-1 text-xs text-cc-300">In planning</span>
        </div>
      </article>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import GithubIcon from "~icons/mdi/github";

const fmFacts = [
  { term: "Sources", detail: "IRSC (Iran and adjacent areas), USGS and EMSC (worldwide)" },
  { term: "Updates", detail: "Every 30 minutes, published to GitHub Pages" },
  { term: "Data", detail: "An event feed, plus CSV, GeoJSON and Parquet downloads" },
];
</script>
