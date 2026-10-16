<template>
  <section id="collaborations" class="py-section">
    <BaseSection class="gap-y-12">
      <div class="col-span-12">
        <BaseHeading>
          Collaborations
          <template #lead>Universities that FEZtool works with on research and teaching.</template>
        </BaseHeading>
      </div>
      <ul class="col-span-12 grid border-l border-t border-glass sm:grid-cols-3">
        <li
          v-for="partner in partners"
          :key="partner.name"
          class="flex flex-col items-center justify-center gap-5 border-b border-r border-glass px-6 py-10 text-center"
        >
          <img :src="partner.logo" :alt="`${partner.name} logo`" class="invert-on-light h-20 w-auto opacity-80" loading="lazy" />
          <span class="text-sm text-fez-300">{{ partner.name }}</span>
        </li>
      </ul>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import AzadSVG from "~/assets/img/collabs/Azad.svg";
import ShamsipourSVG from "~/assets/img/collabs/Shamsipour.svg";
import KharazmiSVG from "~/assets/img/collabs/Kharazmi.svg";

const partners = [
  { name: "Islamic Azad University", logo: AzadSVG },
  { name: "Shamsipour Technical College", logo: ShamsipourSVG },
  { name: "Kharazmi University", logo: KharazmiSVG },
];
</script>
