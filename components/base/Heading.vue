<template>
  <header class="max-w-2xl">
    <h2 class="text-3xl font-bold leading-tight tracking-tight text-fez-50 sm:text-4xl lg:text-[2.75rem]">
      <slot />
    </h2>
    <p v-if="$slots.lead" class="mt-5 text-lg leading-relaxed text-fez-400">
      <slot name="lead" />
    </p>
  </header>
</template>
<script lang="ts" setup></script>
