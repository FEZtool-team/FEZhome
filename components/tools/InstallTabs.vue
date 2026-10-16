<template>
  <div>
    <div role="tablist" aria-label="Package manager" class="flex gap-1" @keydown="onKey">
      <button
        v-for="option in options"
        :id="`${uid}-tab-${option.id}`"
        :key="option.id"
        :ref="(el) => (tabs[option.id] = el as HTMLButtonElement)"
        type="button"
        role="tab"
        :aria-selected="manager === option.id"
        :aria-controls="`${uid}-panel`"
        :tabindex="manager === option.id ? 0 : -1"
        class="rounded-t-md border border-b-0 px-3.5 py-1.5 text-xs transition-colors"
        :class="
          manager === option.id
            ? 'border-glass bg-fez-950 text-fez-50'
            : 'border-transparent text-fez-500 hover:text-fez-200'
        "
        @click="manager = option.id"
      >
        {{ option.id }}
      </button>
    </div>
    <div :id="`${uid}-panel`" role="tabpanel" :aria-labelledby="`${uid}-tab-${manager}`">
      <ToolsCodeBlock :code="current.command" lang="bash" prompt class="rounded-tl-none" />
      <p v-if="current.note" class="mt-2 text-xs text-fez-500">{{ current.note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Commands as documented in FEZdocs (libraries/fezrs/installation).
const options = [
  { id: "pip", command: "pip install fezrs", note: "" },
  { id: "conda", command: "conda install -c FEZtool fezrs", note: "" },
  { id: "mamba", command: "mamba install FEZtool::fezrs", note: "Requires Mamba; otherwise use conda." },
] as const;
type Manager = (typeof options)[number]["id"];

// Shared, so every install box on the page shows the same manager.
const manager = useState<Manager>("install-manager", () => "pip");
const current = computed(() => options.find((o) => o.id === manager.value)!);

const uid = `install-${useId()}`;
const tabs: Record<string, HTMLButtonElement | null> = {};

const onKey = (e: KeyboardEvent) => {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  const i = options.findIndex((o) => o.id === manager.value);
  const next = options[(i + (e.key === "ArrowRight" ? 1 : options.length - 1)) % options.length].id;
  manager.value = next;
  nextTick(() => tabs[next]?.focus());
};
</script>
