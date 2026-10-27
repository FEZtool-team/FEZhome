<template>
  <article v-if="member" class="relative pt-16">
    <div class="bg-grid absolute inset-x-0 top-0 -z-10 h-[28rem] [mask-image:linear-gradient(black,transparent)]" aria-hidden="true" />

    <BaseSection class="gap-y-12 py-14 sm:py-20">
      <nav class="col-span-12 text-sm" aria-label="Breadcrumb">
        <NuxtLink to="/#team" class="inline-flex items-center gap-1.5 text-fez-400 transition-colors hover:text-fez-50">
          <BackIcon aria-hidden="true" /> FEZteam
        </NuxtLink>
      </nav>

      <div class="col-span-12 sm:col-span-5 lg:col-span-4">
        <img
          :src="member.image"
          :alt="`Portrait of ${member.name}`"
          class="aspect-square w-full max-w-sm rounded-md border border-glass object-cover"
          width="400"
          height="400"
        />
      </div>

      <header class="col-span-12 sm:col-span-7 lg:col-span-7 lg:col-start-6">
        <h1 class="text-4xl font-bold leading-tight tracking-tight text-fez-50 sm:text-5xl">{{ member.name }}</h1>
        <p v-if="member.alias" class="mt-2 text-fez-500">Known as {{ member.alias }}</p>
        <p class="mt-5 text-xl text-fez-200">{{ member.role }}</p>
        <p class="mt-2 text-sm leading-relaxed text-fez-400">{{ member.affiliation }}</p>

        <div class="mt-8 space-y-4 leading-relaxed text-fez-300">
          <p v-for="(para, i) in member.bio" :key="i">{{ para }}</p>
        </div>

        <dl class="mt-10 grid gap-6 border-t border-glass pt-8 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-fez-500">Focus</dt>
            <dd class="mt-2 flex flex-wrap gap-2">
              <ToolsChip v-for="item in member.focus" :key="item">{{ item }}</ToolsChip>
            </dd>
          </div>
          <div>
            <dt class="text-sm text-fez-500">Projects</dt>
            <dd class="mt-2 flex flex-wrap gap-2">
              <ToolsChip v-for="item in member.projects" :key="item">{{ item }}</ToolsChip>
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm text-fez-500">Publications</dt>
            <dd class="mt-2 text-sm text-fez-300">
              {{ member.paperNote }}
              <a
                href="https://github.com/FEZtool-team/FEZrs/blob/main/paper/paper.md"
                target="_blank"
                rel="noopener"
                class="text-fez-100 underline decoration-fez-500 underline-offset-4 hover:decoration-fez-100"
              >
                Read the manuscript
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <section class="col-span-12 border-t border-glass pt-10" aria-labelledby="links-heading">
        <h2 id="links-heading" class="text-2xl font-semibold text-fez-50">Links</h2>
        <ul class="mt-6 grid border-l border-t border-glass sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="link in member.links" :key="link.href" class="border-b border-r border-glass">
            <a
              :href="link.href"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-3 px-5 py-4 text-fez-300 transition-colors hover:bg-fez-800 hover:text-fez-50"
            >
              <ToolsLinkIcon :kind="link.kind" class="shrink-0 text-lg" />
              <span class="text-fez-100">{{ link.label }}</span>
              <span class="ml-auto truncate text-xs text-fez-500">{{ host(link.href) }}</span>
            </a>
          </li>
        </ul>
      </section>

      <nav class="col-span-12 flex flex-wrap gap-3 border-t border-glass pt-8 text-sm" aria-label="Other team members">
        <span class="w-full text-fez-500 sm:w-auto sm:pr-3">Also on the team</span>
        <NuxtLink
          v-for="other in others"
          :key="other.slug"
          :to="`/team/${other.slug}`"
          class="rounded-full border border-glass px-3 py-1 text-fez-300 transition-colors hover:border-glass-strong hover:text-fez-50"
        >
          {{ other.name }}
        </NuxtLink>
      </nav>
    </BaseSection>
  </article>
</template>

<script setup lang="ts">
import BackIcon from "~icons/material-symbols-light/arrow-back-rounded";
import { team } from "~/data/team";
import { person } from "~/data/schema";

const route = useRoute();
const member = computed(() => team.find((m) => m.slug === route.params.slug));
if (!member.value) {
  throw createError({ statusCode: 404, statusMessage: "Team member not found", fatal: true });
}
const others = computed(() => team.filter((m) => m.slug !== member.value?.slug));
const host = (href: string) => new URL(href).hostname.replace(/^www\./, "");

const { siteUrl } = useRuntimeConfig().public;
const absolute = useAbsoluteUrl();

usePageSeo(() => ({
  path: `/team/${member.value!.slug}/`,
  title: `${member.value!.name}, ${member.value!.role} | FEZtool`,
  description: member.value!.summary,
  image: member.value!.image,
  imageWidth: 400,
  imageHeight: 400,
  imageAlt: `Portrait of ${member.value!.name}`,
  type: "profile",
}));
useJsonLd(() => [person(siteUrl, member.value!, absolute(member.value!.image))]);
</script>
