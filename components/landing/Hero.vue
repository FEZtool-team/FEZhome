<template>
  <section id="top" class="relative isolate overflow-hidden border-b border-glass pt-16">
    <div class="bg-starfield absolute inset-0 -z-10" aria-hidden="true" />
    <div
      class="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]"
      aria-hidden="true"
    />

    <BaseSection class="items-center gap-y-14 py-20 lg:min-h-[calc(100vh-4rem)] lg:py-24">
      <div class="col-span-12 lg:col-span-6">
        <h1 class="text-gradient text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
          Free &amp; Easy tools for Earth sciences
        </h1>
        <p class="mt-7 max-w-lg text-lg leading-relaxed text-fez-400 sm:text-xl">
          Open-source Python tooling for remote sensing, climate and geohazards.
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <BaseButton href="#fezrs">Explore FEZrs</BaseButton>
          <BaseButton href="https://feztool-team.github.io/FEZdocs/" external variant="ghost">
            Read the docs
          </BaseButton>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-6 lg:pl-6">
        <div class="mx-auto max-w-[30rem]">
          <LandingHeroScene />
        </div>
      </div>
    </BaseSection>
  </section>
</template>
