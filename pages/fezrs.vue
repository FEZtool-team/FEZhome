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
          <ToolsToolBadge tool="rs" size="lg" />
          <h1 class="mt-8 text-4xl font-bold leading-tight tracking-tight text-fez-50 sm:text-5xl">
            FEZrs: a Python package for multispectral remote sensing
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-fez-400">
            FEZrs is an open-source Python package for geospatial multispectral image processing and remote sensing.
            It computes spectral indices, filters, image enhancement, texture, PCA, clustering, change detection and
            SVM classification from GeoTIFF bands, and writes figures and georeferenced GeoTIFFs.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <ToolsChip>Python 3.11+</ToolsChip>
            <ToolsChip>PyPI and conda</ToolsChip>
            <ToolsChip>Apache-2.0</ToolsChip>
            <ToolsChip>JOSS paper under review</ToolsChip>
          </div>
          <div class="mt-10 flex flex-wrap gap-3">
            <BaseButton :href="docsBase" external variant="rs">Read the docs</BaseButton>
            <BaseButton href="https://github.com/FEZtool-team/FEZrs" external variant="ghost">
              <GithubIcon aria-hidden="true" /> GitHub
            </BaseButton>
            <BaseButton href="https://pypi.org/project/fezrs/" external variant="ghost">PyPI</BaseButton>
          </div>
        </header>
      </BaseSection>
    </article>

    <LandingFezrs />
    <LandingShowcase />

    <!-- Module reference: one link per FEZdocs page -->
    <section id="reference" class="border-b border-glass py-section">
      <BaseSection class="gap-y-12">
        <div class="col-span-12">
          <BaseHeading>
            Module reference
            <template #lead>
              Each module has a page in FEZdocs with its parameters, band requirements and examples.
            </template>
          </BaseHeading>
        </div>
        <ul class="col-span-12 grid border-l border-t border-glass sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="page in reference" :key="page.slug" class="border-b border-r border-glass">
            <a
              :href="`${docsBase}${page.slug}.html`"
              target="_blank"
              rel="noopener"
              class="block h-full p-6 transition-colors hover:bg-fez-800"
            >
              <h3 class="font-medium text-fez-50">{{ page.name }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-fez-400">{{ page.text }}</p>
            </a>
          </li>
        </ul>
      </BaseSection>
    </section>

    <!-- Questions -->
    <section id="faq" class="border-b border-glass py-section">
      <BaseSection class="gap-y-12">
        <div class="col-span-12 lg:col-span-4">
          <BaseHeading>Questions about FEZrs</BaseHeading>
        </div>
        <div class="col-span-12 border-t border-glass lg:col-span-7 lg:col-start-6">
          <div v-for="item in faq" :key="item.q" class="border-b border-glass py-7">
            <h3 class="text-lg font-medium text-fez-50">{{ item.q }}</h3>
            <p class="mt-3 leading-relaxed text-fez-300">{{ item.a }}</p>
          </div>
          <div class="border-b border-glass py-7">
            <h3 class="text-lg font-medium text-fez-50">How do I cite FEZrs?</h3>
            <p class="mt-3 leading-relaxed text-fez-300">
              Cite the archived release on Zenodo,
              <a
                href="https://doi.org/10.5281/zenodo.14938038"
                target="_blank"
                rel="noopener"
                class="text-fez-100 underline decoration-fez-500 underline-offset-4 hover:decoration-fez-100"
              >doi:10.5281/zenodo.14938038</a>.
              The software paper is under review at the Journal of Open Source Software;
              <a
                href="https://github.com/FEZtool-team/FEZrs/blob/main/paper/paper.md"
                target="_blank"
                rel="noopener"
                class="text-fez-100 underline decoration-fez-500 underline-offset-4 hover:decoration-fez-100"
              >read the manuscript</a>.
            </p>
          </div>
        </div>
      </BaseSection>
    </section>
  </div>
</template>

<script setup lang="ts">
import BackIcon from "~icons/material-symbols-light/arrow-back-rounded";
import GithubIcon from "~icons/mdi/github";
import { breadcrumbs, fezrsSoftware } from "~/data/schema";

const docsBase = "https://feztool-team.github.io/FEZdocs/libraries/fezrs/";

const reference = [
  { slug: "spectral-indices", name: "Spectral indices", text: "NDVI, NDWI, SAVI, AFRI, BI and UI computed from reflectance bands." },
  { slug: "filters", name: "Filters", text: "Gaussian, mean and median smoothing, and Laplacian and Sobel edge detection." },
  { slug: "image-enhancement", name: "Image enhancement", text: "Histogram and adaptive equalization, and gamma, log and sigmoid adjustment." },
  { slug: "change-detection", name: "Change detection", text: "Compare images of the same area at two dates to map burns and other change." },
  { slug: "clustering", name: "Clustering", text: "K-Means: unsupervised clustering of pixels into k spectral classes." },
  { slug: "svm", name: "SVM", text: "Support vector machine classification trained on labelled samples." },
  { slug: "pca", name: "PCA", text: "Principal component analysis: uncorrelated components ordered by variance." },
  { slug: "glcm", name: "GLCM", text: "Texture statistics from the gray-level co-occurrence matrix." },
  { slug: "hsv", name: "HSV", text: "Hue–saturation–value transforms that separate color from brightness." },
  { slug: "spectral-profile", name: "Spectral profile", text: "Reflectance plotted against wavelength for a pixel or region." },
  { slug: "mosaic", name: "Mosaic", text: "Merge adjacent rasters into one continuous georeferenced image." },
  { slug: "import-tools", name: "Import tools", text: "Read single-band products such as Landsat 8 and multi-band products such as GeoEye." },
];

const faq = [
  {
    q: "What is FEZrs?",
    a: "FEZrs is an open-source Python package for geospatial multispectral image processing and remote sensing. Its 37 operations share one calling pattern: create a calculator with the band paths, call execute() for a figure, and to_raster() for a GeoTIFF.",
  },
  {
    q: "How do I install FEZrs?",
    a: "Run pip install fezrs, or install it from the FEZtool channel on Anaconda with conda install -c FEZtool fezrs or mamba install FEZtool::fezrs. FEZrs needs Python 3.11 or later.",
  },
  {
    q: "Which spectral indices does FEZrs compute?",
    a: "NDVI, NDWI, SAVI, AFRI, BI (bare-soil index) and UI (urban index). Each is a calculator class, so NDVI is NDVICalculator.",
  },
  {
    q: "Can FEZrs write georeferenced GeoTIFFs?",
    a: "Yes. execute() saves a figure of the result; to_raster() then writes the full-precision array as a GeoTIFF with the source CRS and affine transform, ready for GIS software.",
  },
  {
    q: "Is FEZrs free to use?",
    a: "Yes. FEZrs is released under the Apache-2.0 license, and its documentation under CC BY 4.0.",
  },
];

const { siteUrl } = useRuntimeConfig().public;

usePageSeo({
  path: "/fezrs/",
  title: "FEZrs: Python package for multispectral remote sensing | FEZtool",
  description:
    "Open-source Python package for multispectral image processing: spectral indices (NDVI, NDWI, SAVI), filters, PCA, GLCM, K-Means, SVM and change detection. pip install fezrs.",
  image: "/og/fezrs.png",
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: "FEZrs: a Python package for multispectral remote sensing",
});
useJsonLd([
  fezrsSoftware(siteUrl),
  breadcrumbs(siteUrl, [
    { name: "FEZtool", path: "/" },
    { name: "FEZrs", path: "/fezrs/" },
  ]),
]);
</script>
