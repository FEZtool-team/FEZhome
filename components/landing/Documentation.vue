<template>
  <section id="docs" class="border-b border-glass py-section">
    <BaseSection>
      <div
        class="bg-grid col-span-12 flex flex-col gap-8 rounded-lg border border-glass p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="max-w-xl">
          <h2 class="text-3xl font-bold text-fez-50 sm:text-4xl">Documentation</h2>
          <p class="mt-4 leading-relaxed text-fez-400">
            FEZdocs covers installation, the full API reference for every FEZrs calculator, and worked examples.
            It is released under CC BY 4.0 and maintained alongside the code.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <BaseButton href="https://feztool-team.github.io/FEZdocs/" external>Open FEZdocs</BaseButton>
          <BaseButton href="https://feztool-team.github.io/FEZdocs/libraries/fezrs/" external variant="ghost">
            FEZrs reference
          </BaseButton>
        </div>
      </div>
    </BaseSection>
  </section>
</template>
