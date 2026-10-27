<template>
  <section id="research" class="border-b border-glass py-section">
    <BaseSection class="gap-y-14">
      <div class="col-span-12 lg:col-span-4">
        <BaseHeading>
          Used in published research
          <template #lead>
            FEZrs has been applied in peer-reviewed and conference work on land cover, multispectral analysis and
            engineering geology, and in field-based studies.
          </template>
        </BaseHeading>

        <ul class="mt-10 space-y-4">
          <li class="flex gap-4 rounded-md border border-glass p-5">
            <AwardIcon class="mt-0.5 shrink-0 text-2xl text-fez-200" aria-hidden="true" />
            <p class="text-sm leading-relaxed text-fez-300">
              <span class="block text-fez-50">Merit Award, Ideator category</span>
              9th Iran National Young Scientists Festival
            </p>
          </li>
          <li class="flex gap-4 rounded-md border border-glass p-5">
            <PaperIcon class="mt-0.5 shrink-0 text-2xl text-fez-200" aria-hidden="true" />
            <p class="text-sm leading-relaxed text-fez-300">
              <span class="block text-fez-50">Software paper under review</span>
              Submitted to the Journal of Open Source Software, with ten co-authors from the FEZrs project.
              <a
                href="https://github.com/FEZtool-team/FEZrs/blob/main/paper/paper.md"
                target="_blank"
                rel="noopener"
                class="mt-1 inline-block text-fez-100 underline decoration-fez-500 underline-offset-4 hover:decoration-fez-100"
              >
                Read the manuscript
              </a>
            </p>
          </li>
        </ul>
      </div>

      <ol class="col-span-12 border-t border-glass lg:col-span-7 lg:col-start-6">
        <li v-for="work in works" :key="work.title" class="border-b border-glass py-7">
          <p class="text-sm text-fez-500">{{ work.year }}, {{ work.venue }}</p>
          <h3 class="mt-2 text-lg font-medium leading-snug text-fez-50">
            <a
              v-if="work.url"
              :href="work.url"
              target="_blank"
              rel="noopener"
              class="hover:underline hover:decoration-fez-500 hover:underline-offset-4"
            >
              {{ work.title }}
            </a>
            <template v-else>{{ work.title }}</template>
          </h3>
          <p class="mt-2 text-sm text-fez-400">{{ work.authors }}</p>
          <p class="mt-3 text-sm text-rs-300">{{ work.method }}</p>
        </li>
      </ol>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import AwardIcon from "~icons/material-symbols-light/workspace-premium-outline";
import PaperIcon from "~icons/material-symbols-light/article-outline";
import { ids } from "~/data/schema";

const works = [
  {
    year: 2025,
    venue: "Kharazmi Journal of Earth Sciences 11(1)",
    title:
      "A Python-based framework for land cover classification in engineering geology: a comparative assessment of SVM, K-means, and spectral indices",
    authors: "M. Talkhablou, M. Farmahini Farahani, S. Siah Mansouri",
    method: "SVM, K-Means and spectral indices",
    url: "https://doi.org/10.22034/KJES.2025.11.1.103081",
  },
  {
    year: 2024,
    venue: "2nd International Conference for Iranian Geography and Earth Sciences Students",
    title:
      "Comparing the performance of the K-means clustering method and spectral indices in characterizing land use and land cover using remote sensing with Python (Landsat 8)",
    authors: "K. Rezaei, M. Farmahini Farahani",
    method: "K-Means and spectral indices",
    url: "https://www.researchgate.net/publication/378307658",
  },
  {
    year: 2024,
    venue: "8th Symposium of Sedimentological Society of Iran",
    title:
      "Application of PCA algorithm in remote sensing using Python programming language (Landsat 9 multispectral images)",
    authors: "M. Farmahini Farahani, K. Rezaei, S. Karamollahi, F. Jafari Moghadam",
    method: "Principal component analysis",
    url: "https://www.researchgate.net/publication/377838524",
  },
  {
    year: "Field study",
    venue: "Isfahan, Iran",
    title: "Geospatial analysis of the Torud Playa area",
    authors: "FEZrs used for field-based remote sensing and geospatial workflows",
    method: "Multispectral analysis",
    url: "",
  },
];

// Published works (not the field study) as ScholarlyArticle entries about FEZrs.
const { siteUrl } = useRuntimeConfig().public;
useJsonLd(
  works
    .filter((w) => typeof w.year === "number" && w.url)
    .map((w) => ({
      "@type": "ScholarlyArticle",
      headline: w.title,
      datePublished: String(w.year),
      author: w.authors.split(", ").map((name) => ({ "@type": "Person", name })),
      url: w.url,
      ...(w.url.startsWith("https://doi.org/") ? { sameAs: w.url } : {}),
      about: { "@id": ids(siteUrl).fezrs },
    }))
);
</script>
