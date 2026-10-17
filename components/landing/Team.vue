<template>
  <section id="team" class="border-b border-glass py-section">
    <BaseSection class="gap-y-12">
      <div class="col-span-12">
        <BaseHeading>
          FEZteam
          <template #lead>
            The core team behind FEZtool. FEZrs itself is the work of ten paper co-authors and a wider group of
            contributors across Earth science and software engineering.
          </template>
        </BaseHeading>
      </div>

      <ul class="col-span-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="member in team"
          :key="member.slug"
          class="group relative flex h-full flex-col rounded-md border border-glass p-4 transition-colors hover:border-glass-strong"
        >
          <div class="overflow-hidden rounded-sm">
            <img
              :src="member.image"
              :alt="`Portrait of ${member.name}`"
              class="aspect-square w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
              width="400"
              height="400"
              loading="lazy"
            />
          </div>
          <h3 class="mt-5 text-lg font-medium leading-snug text-fez-50">
            <!-- The name link covers the whole card; the icon links sit above it. -->
            <NuxtLink :to="`/team/${member.slug}`" class="after:absolute after:inset-0 after:rounded-md">
              {{ member.name }}
            </NuxtLink>
          </h3>
          <p class="mt-0.5 text-sm text-fez-300">{{ member.role }}</p>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-fez-400">{{ member.summary }}</p>
          <ul class="relative z-10 mt-5 flex flex-wrap gap-0.5 border-t border-glass pt-3 text-fez-400">
            <li v-for="link in member.links" :key="link.href">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="grid h-8 w-8 place-items-center rounded transition-colors hover:text-fez-50"
                :aria-label="`${member.name}: ${link.label}`"
                :title="link.label"
              >
                <ToolsLinkIcon :kind="link.kind" class="text-[1.05rem]" />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import { team } from "~/data/team";
</script>
