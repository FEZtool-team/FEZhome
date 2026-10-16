<template>
  <section id="about" class="border-b border-glass py-section">
    <BaseSection class="gap-y-14">
      <div class="col-span-12 lg:col-span-5">
        <BaseHeading>
          Scientific software that is free to use and easy to learn
          <template #lead>
            FEZtool is an open-source initiative building tools for Earth-science researchers, engineers and
            students. Every tool is released openly, documented in plain language, and designed so that a
            standard analysis takes a few lines of code rather than a bespoke toolchain.
          </template>
        </BaseHeading>

        <dl class="mt-10 space-y-6 border-l border-glass pl-6 text-sm">
          <div>
            <dt class="text-fez-100">Why “FEZ”</dt>
            <dd class="mt-1 leading-relaxed text-fez-400">
              <strong class="font-medium text-fez-200">F</strong>ree and
              <strong class="font-medium text-fez-200">EZ</strong> (easy). The name states the two commitments
              every FEZtool project is held to.
            </dd>
          </div>
          <div>
            <dt class="text-fez-100">Licensing</dt>
            <dd class="mt-1 leading-relaxed text-fez-400">
              Software is released under Apache-2.0. Documentation and other content are released under
              CC BY 4.0.
            </dd>
          </div>
        </dl>
      </div>

      <div class="col-span-12 lg:col-span-6 lg:col-start-7">
        <ul class="grid border-l border-t border-glass sm:grid-cols-2">
          <li v-for="area in areas" :key="area.title" class="border-b border-r border-glass p-7">
            <component :is="area.icon" class="text-3xl text-fez-300" aria-hidden="true" />
            <h3 class="mt-6 text-lg text-fez-50">{{ area.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-fez-400">{{ area.text }}</p>
          </li>
        </ul>
      </div>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import SatelliteIcon from "~icons/material-symbols-light/satellite-alt-outline";
import EarthIcon from "~icons/material-symbols-light/globe";
import ClimateIcon from "~icons/material-symbols-light/eco-outline";
import CodeIcon from "~icons/material-symbols-light/code-blocks-outline";

const areas = [
  {
    title: "Geospatial analysis and remote sensing",
    text: "Processing of multispectral satellite and aerial imagery, from spectral indices to classification.",
    icon: SatelliteIcon,
  },
  {
    title: "Earth and environmental research",
    text: "Methods for geology, land cover and environmental assessment that hold up in peer review.",
    icon: EarthIcon,
  },
  {
    title: "Sustainable development and climate",
    text: "Analytics that support climate-change studies and the management of natural resources.",
    icon: ClimateIcon,
  },
  {
    title: "Open-source scientific computing",
    text: "Reproducible, tested Python packages built on the established scientific stack.",
    icon: CodeIcon,
  },
];
</script>
