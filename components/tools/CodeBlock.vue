<template>
  <div class="overflow-hidden rounded-md border border-glass bg-fez-950">
    <div v-if="label" class="flex items-center justify-between border-b border-glass px-4 py-2 text-xs text-fez-500">
      <span>{{ label }}</span>
      <button type="button" class="rounded px-2 py-1 text-fez-400 transition-colors hover:text-fez-50" @click="copy">
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
    <div class="relative">
      <!-- eslint-disable-next-line vue/no-v-html -- highlight() escapes all source text -->
      <pre class="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-fez-200"><code><span v-if="prompt" class="tok-prompt">$ </span><span v-html="html" /></code></pre>
      <button
        v-if="!label"
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-fez-950 px-2 py-1 text-xs text-fez-400 transition-colors hover:text-fez-50"
        @click="copy"
      >
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CodeLang } from "~/utils/highlight";

const props = withDefaults(
  defineProps<{ code: string; label?: string; lang?: CodeLang; prompt?: boolean }>(),
  { label: "", lang: "python", prompt: false }
);
const html = computed(() => highlight(props.code, props.lang));
const copied = ref(false);

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1600);
  } catch {
    // Clipboard can be unavailable (insecure context); the code stays selectable.
  }
};
</script>
