<template>
  <div
    class="relative mx-auto grid w-full max-w-6xl grid-cols-12 gap-x-6 px-gutter"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup></script>
