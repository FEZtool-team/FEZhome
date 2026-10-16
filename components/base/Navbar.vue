<template>
  <nav
    class="fixed inset-x-0 top-0 z-40 transition-colors duration-300"
    :class="scrolled || open ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'"
    aria-label="Main"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-gutter">
      <NuxtLink to="/" class="shrink-0" aria-label="FEZtool home">
        <BaseLogo variant="horizontal" class="h-7 w-auto" />
      </NuxtLink>

      <ul class="hidden items-center gap-7 text-sm text-fez-400 lg:flex">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to" class="transition-colors hover:text-fez-50">{{ link.label }}</NuxtLink>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <BaseThemeToggle />
        <BaseButton to="/#request-demo" class="hidden sm:inline-flex">Request a demo</BaseButton>
        <button
          type="button"
          class="-mr-2 rounded-md p-2 text-fez-100 lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = !open"
        >
          <span class="sr-only">{{ open ? "Close menu" : "Open menu" }}</span>
          <CloseIcon v-if="open" class="text-2xl" />
          <MenuIcon v-else class="text-2xl" />
        </button>
      </div>
    </div>

    <div v-show="open" id="mobile-menu" class="border-t border-glass px-gutter pb-6 pt-2 lg:hidden">
      <ul class="flex flex-col text-base text-fez-200">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to" class="block py-2.5" @click="open = false">{{ link.label }}</NuxtLink>
        </li>
      </ul>
      <BaseButton to="/#request-demo" class="mt-4 w-full sm:hidden" @click="open = false">
        Request a demo
      </BaseButton>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import MenuIcon from "~icons/material-symbols-light/menu-rounded";
import CloseIcon from "~icons/material-symbols-light/close-rounded";

const links = [
  { label: "About", to: "/#about" },
  { label: "Tools", to: "/#tools" },
  { label: "FEZrs", to: "/#fezrs" },
  { label: "Research", to: "/#research" },
  { label: "Docs", to: "/#docs" },
  { label: "Team", to: "/#team" },
  { label: "Contact", to: "/#contact" },
];

const open = ref(false);
const scrolled = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 24);

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>
