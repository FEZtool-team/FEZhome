<template>
  <span
    class="inline-grid shrink-0 place-items-center rounded-md border font-medium tracking-wide"
    :class="[colors[tool], size === 'lg' ? 'h-14 w-14 text-xl' : 'h-10 w-10 text-sm']"
    :aria-label="`${names[tool]} badge`"
  >
    {{ tool.toUpperCase() }}
  </span>
</template>

<script setup lang="ts">
type Tool = "rs" | "cc" | "fm";
withDefaults(defineProps<{ tool: Tool; size?: "md" | "lg" }>(), { size: "md" });

const colors: Record<Tool, string> = {
  rs: "border-rs-500/50 bg-rs-500/10 text-rs-300",
  cc: "border-cc-500/50 bg-cc-500/10 text-cc-300",
  fm: "border-fm-500/50 bg-fm-500/10 text-fm-300",
};
const names: Record<Tool, string> = { rs: "FEZrs", cc: "FEZcc", fm: "FEZfm" };
</script>
