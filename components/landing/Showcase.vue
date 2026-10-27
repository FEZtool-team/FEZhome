<template>
  <section id="showcase" class="border-b border-glass py-section">
    <BaseSection class="gap-y-16">
      <div class="col-span-12">
        <BaseHeading>
          Real outputs, unedited
          <template #lead>
            Every image below was produced by FEZrs from multispectral scenes in the project's example
            folder. Select an operation to view its output.
          </template>
        </BaseHeading>
      </div>

      <!-- Output viewer -->
      <div class="col-span-12 grid gap-6 lg:grid-cols-12">
        <div
          class="-mx-gutter flex gap-2 overflow-x-auto px-gutter pb-2 lg:col-span-3 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          role="tablist"
          aria-label="FEZrs operations"
        >
          <button
            v-for="(output, i) in outputs"
            :id="`output-tab-${i}`"
            :key="output.name"
            type="button"
            role="tab"
            :aria-selected="active === i"
            aria-controls="output-panel"
            class="shrink-0 rounded-md border px-4 py-2.5 text-left text-sm transition-colors"
            :class="
              active === i
                ? 'border-rs-500/60 bg-rs-500/10 text-fez-50'
                : 'border-glass text-fez-400 hover:border-glass-strong hover:text-fez-100'
            "
            @click="active = i"
          >
            {{ output.name }}
            <span class="hidden text-xs text-fez-500 lg:block">{{ output.group }}</span>
          </button>
        </div>
        <figure
          id="output-panel"
          role="tabpanel"
          :aria-labelledby="`output-tab-${active}`"
          class="lg:col-span-9"
        >
          <div class="overflow-hidden rounded-md border border-glass bg-fez-950">
            <img
              :key="current.src"
              :src="current.src"
              :alt="`${current.name} output computed with FEZrs`"
              class="mx-auto aspect-square max-h-[36rem] w-full object-contain"
              width="1200"
              height="1200"
              loading="lazy"
            />
          </div>
          <figcaption class="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <code class="font-mono text-sm text-rs-300">{{ current.calculator }}</code>
            <span class="text-sm leading-relaxed text-fez-400">{{ current.caption }}</span>
          </figcaption>
        </figure>
      </div>

      <!-- Before / after comparisons -->
      <div class="col-span-12">
        <h3 class="text-2xl font-semibold text-fez-50">Compare two outputs of the same scene</h3>
        <p class="paragraph mt-3 max-w-2xl">Drag the handle to move between the two results.</p>
        <div class="mt-8 grid gap-8 md:grid-cols-2">
          <figure v-for="pair in pairs" :key="pair.title">
            <ToolsBeforeAfterSlider
              class="rounded-md border border-glass"
              :model-value="50"
              :step="0.1"
              :before-image="pair.before"
              :after-image="pair.after"
              :before-label="pair.beforeLabel"
              :after-label="pair.afterLabel"
            />
            <figcaption class="mt-3 text-sm text-fez-400">{{ pair.title }}</figcaption>
          </figure>
        </div>
      </div>

    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import gaussian from "~/assets/img/fezrs/gaussian.webp";
import laplacian from "~/assets/img/fezrs/laplacian.webp";
import sobel from "~/assets/img/fezrs/sobel.webp";
import median from "~/assets/img/fezrs/median.webp";
import mean from "~/assets/img/fezrs/mean.webp";
import kmeans from "~/assets/img/fezrs/kmeans.webp";
import hsv from "~/assets/img/fezrs/hsv.webp";

const outputs = [
  {
    name: "Gaussian", group: "Filters", calculator: "GaussianCalculator", src: gaussian,
    caption: "Gaussian smoothing suppresses high-frequency noise while keeping broad spatial structure.",
  },
  {
    name: "Laplacian", group: "Filters", calculator: "LaplacianCalculator", src: laplacian,
    caption: "A second-derivative operator that responds to rapid intensity change, used for edge detection.",
  },
  {
    name: "Sobel", group: "Filters", calculator: "SobelCalculator", src: sobel,
    caption: "A first-derivative gradient operator; bright lines trace field boundaries, roads and other edges.",
  },
  {
    name: "Median", group: "Filters", calculator: "MedianCalculator", src: median,
    caption: "Each pixel becomes the median of its neighbourhood, removing speckle noise while preserving edges.",
  },
  {
    name: "Mean", group: "Filters", calculator: "MeanCalculator", src: mean,
    caption: "A neighbourhood average: the simplest low-pass smoothing filter.",
  },
  {
    name: "K-Means", group: "Clustering", calculator: "KMeansCalculator", src: kmeans,
    caption: "Unsupervised clustering groups pixels into spectral classes for land-use and land-cover mapping.",
  },
  {
    name: "HSV", group: "Colour space", calculator: "HSVCalculator", src: hsv,
    caption: "RGB bands converted to hue, saturation and value, separating colour information from brightness.",
  },
];
const active = ref(0);
const current = computed(() => outputs[active.value]);

const pairs = [
  {
    title: "Gaussian smoothing and Sobel edge detection on the same agricultural scene.",
    before: gaussian, after: sobel, beforeLabel: "Gaussian", afterLabel: "Sobel",
  },
  {
    title: "HSV transform and K-Means clustering on the same coastal scene.",
    before: hsv, after: kmeans, beforeLabel: "HSV", afterLabel: "K-Means",
  },
];

</script>
