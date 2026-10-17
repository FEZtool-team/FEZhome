<template>
  <section id="fezrs" class="relative border-b border-glass py-section">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rs-500/60 to-transparent"
      aria-hidden="true"
    />
    <BaseSection class="gap-y-16">
      <div class="col-span-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <BaseHeading>
          FEZrs: one calculator API for multispectral analysis
          <template #lead>
            FEZrs is an open-source Python package for geospatial multispectral image processing and remote
            sensing. It brings indices, filters, enhancement, texture, PCA, clustering, change detection and SVM
            classification into a single, consistent framework for research and teaching.
          </template>
        </BaseHeading>
        <ToolsToolBadge tool="rs" size="lg" class="hidden lg:inline-grid" />
      </div>

      <!-- Key figures -->
      <dl class="col-span-12 grid grid-cols-2 border-l border-t border-glass lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label" class="border-b border-r border-glass p-6 sm:p-8">
          <dt class="text-sm text-fez-400">{{ stat.label }}</dt>
          <dd class="mt-2 whitespace-nowrap text-2xl font-light text-fez-50 sm:text-3xl">{{ stat.value }}</dd>
        </div>
      </dl>

      <!-- The three-line pattern -->
      <div class="col-span-12 lg:col-span-4">
        <h3 class="text-2xl font-semibold text-fez-50">The same three lines for every operation</h3>
        <p class="paragraph mt-4">
          Every calculator inherits one base class, so an NDVI, a Sobel filter and a K-Means classification are
          called the same way. No plotting or raster I/O code is needed.
        </p>
        <ol class="mt-8 space-y-6">
          <li v-for="(step, i) in steps" :key="step.title" class="flex gap-4">
            <span
              class="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-rs-500/50 text-xs text-rs-300"
            >
              {{ i + 1 }}
            </span>
            <div>
              <p class="text-fez-100">{{ step.title }}</p>
              <p class="mt-1 text-sm leading-relaxed text-fez-400">{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>
      <div class="col-span-12 space-y-4 lg:col-span-7 lg:col-start-6">
        <ToolsCodeBlock label="ndvi.py" lang="python" :code="ndviExample" />
        <ToolsInstallTabs />
      </div>

      <!-- Module table -->
      <div class="col-span-12">
        <h3 class="text-2xl font-semibold text-fez-50">Modules</h3>
        <p class="paragraph mt-3 max-w-2xl">
          Thirty-seven calculators in five groups, as listed in the FEZrs paper. Each name maps to a class,
          so NDVI is <code class="font-mono text-[0.9em] text-fez-200">NDVICalculator</code>.
        </p>
        <div class="mt-8 grid grid-cols-2 border-l border-t border-glass sm:grid-cols-3 lg:grid-cols-5">
          <div v-for="group in modules" :key="group.name" class="border-b border-r border-glass p-5">
            <h4 class="text-sm font-medium text-rs-300">{{ group.name }}</h4>
            <ul class="mt-3 space-y-1.5 text-sm text-fez-300">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-sm text-fez-500">
          Satellite-specific helpers (Landsat 8 and GeoEye) are also included.
        </p>
      </div>

      <!-- Built on -->
      <div class="col-span-12 flex flex-col gap-4 border-t border-glass pt-10 sm:flex-row sm:items-center sm:gap-10">
        <p class="shrink-0 text-sm text-fez-400">Built on</p>
        <ul class="flex flex-wrap gap-x-8 gap-y-3 text-lg font-light text-fez-200">
          <li v-for="lib in builtOn" :key="lib">{{ lib }}</li>
        </ul>
      </div>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { label: "PyPI downloads since 2025", value: "100k+" },
  { label: "Operations", value: "37" },
  { label: "Distributed on", value: "PyPI + conda" },
  { label: "License", value: "Apache-2.0" },
];

const steps = [
  { title: "Import a calculator", text: "Pick the operation you need from the fezrs package." },
  { title: "Point it at your bands", text: "Pass the GeoTIFF band paths the method requires, such as NIR and red." },
  {
    title: "Export the result",
    text: "execute() writes a publication-ready figure; to_raster() then writes a georeferenced GeoTIFF with the source CRS and transform.",
  },
];

const ndviExample = `from fezrs import NDVICalculator

ndvi = NDVICalculator(nir_path="B5.tif", red_path="B4.tif")
ndvi.execute(output_path="./outputs")

# Optional: full-precision GeoTIFF for GIS
ndvi.to_raster(output_path="./outputs/ndvi.tif")`;

const modules = [
  { name: "Change detection", items: ["Burn", "Indices", "MagDir", "SubDiv", "Time"] },
  { name: "Filters", items: ["Gaussian", "Laplacian", "Mean", "Median", "Sobel"] },
  {
    name: "Image enhancement",
    items: [
      "Original", "Float", "Equalize", "Adaptive", "Gamma", "LogAdjust", "SigmoidAdjust",
      "OriginalRGB", "EqualizeRGB", "AdaptiveRGB", "GammaRGB",
    ],
  },
  { name: "Spectral indices", items: ["AFRI", "BI", "NDVI", "NDWI", "SAVI", "UI"] },
  {
    name: "Additional tools",
    items: ["KMeans", "GLCM", "HSV", "IRHSV", "Mosaic", "PCA", "SpectralProfile", "SVM"],
  },
];

const builtOn = ["NumPy", "Rasterio", "GDAL", "OpenCV", "scikit-image", "scikit-learn"];
</script>
