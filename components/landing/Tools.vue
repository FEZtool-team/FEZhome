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
        <h3 id="tool-rs" class="mt-8 text-3xl font-light text-fez-50">FEZrs</h3>
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

      <!-- Planned tools -->
      <div class="col-span-12 grid gap-6 lg:col-span-5">
        <article
          v-for="tool in planned"
          :key="tool.id"
          class="rounded-lg border border-dashed p-7 sm:p-8"
          :class="tool.border"
          :aria-labelledby="`tool-${tool.id}`"
        >
          <div class="flex items-start justify-between gap-4">
            <ToolsToolBadge :tool="tool.id" />
            <span class="rounded-full px-3 py-1 text-xs" :class="tool.pill">In planning</span>
          </div>
          <h3 :id="`tool-${tool.id}`" class="mt-6 text-2xl font-light text-fez-50">{{ tool.name }}</h3>
          <p class="mt-1 text-sm" :class="tool.accent">{{ tool.domain }}</p>
          <p class="mt-4 text-sm leading-relaxed text-fez-400">{{ tool.vision }}</p>
        </article>
      </div>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import GithubIcon from "~icons/mdi/github";

const planned = [
  {
    id: "cc" as const,
    name: "FEZcc",
    domain: "Climate change",
    vision: "Climate-change analytics: trend detection and indicator calculation for climate and land-surface time series.",
    border: "border-cc-500/35",
    pill: "bg-cc-500/10 text-cc-300",
    accent: "text-cc-300",
  },
  {
    id: "fm" as const,
    name: "FEZfm",
    domain: "Fault monitoring",
    vision: "Fault and geohazard monitoring: mapping active structures and tracking surface change for hazard assessment.",
    border: "border-fm-500/35",
    pill: "bg-fm-500/10 text-fm-300",
    accent: "text-fm-300",
  },
];
</script>
