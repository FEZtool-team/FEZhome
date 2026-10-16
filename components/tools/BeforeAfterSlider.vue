<template>
  <div
    class="compare"
    :class="{ 'is-returning': returning }"
    :style="{ '--pos': `${compareWidth}%`, '--return-ms': `${RETURN_MS}ms` }"
  >
    <!-- Both images share one box, so they always cover the same area. -->
    <img class="compare__img" :src="beforeImage" :alt="beforeLabel" draggable="false" />
    <img class="compare__img compare__img--after" :src="afterImage" :alt="afterLabel" draggable="false" />

    <span class="compare__label compare__label--after">{{ afterLabel }}</span>
    <span class="compare__label compare__label--before">{{ beforeLabel }}</span>

    <div class="compare__handle" aria-hidden="true">
      <span class="compare__line" />
      <span class="compare__knob">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 7 4 12 9 17" />
          <polyline points="15 7 20 12 15 17" />
        </svg>
      </span>
    </div>

    <input
      class="compare__range"
      type="range"
      min="0"
      max="100"
      :step="step"
      :value="compareWidth"
      :aria-label="`Compare ${afterLabel} and ${beforeLabel}`"
      @pointerdown="cancelReturn"
      @input="handleInput"
      @pointerup="scheduleReturn"
      @pointerleave="scheduleReturn"
      @keyup="scheduleReturn"
      @blur="scheduleReturn"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: number;
  beforeImage: string;
  afterImage: string;
  step?: number;
  beforeLabel?: string;
  afterLabel?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 50,
  beforeImage: "",
  afterImage: "",
  step: 0.1,
  beforeLabel: "RGB image",
  afterLabel: "NDVI image",
});

// Readjust timing: wait RETURN_DELAY_MS after release, then glide back over
// RETURN_MS. The handle and the clipped image share the --return-ms
// transition, applied only while returning, so they cannot drift apart and
// dragging stays instant.
const RETURN_DELAY_MS = 900;
const RETURN_MS = 450;

const compareWidth = ref(props.modelValue);
const returning = ref(false);
let returnTimer: ReturnType<typeof setTimeout> | undefined;
let settleTimer: ReturnType<typeof setTimeout> | undefined;

const cancelReturn = () => {
  clearTimeout(returnTimer);
  clearTimeout(settleTimer);
  returning.value = false;
};

const handleInput = (e: Event) => {
  cancelReturn();
  compareWidth.value = Number((e.target as HTMLInputElement).value);
};

const scheduleReturn = () => {
  clearTimeout(returnTimer);
  if (compareWidth.value === props.modelValue) return;
  returnTimer = setTimeout(() => {
    returning.value = true;
    compareWidth.value = props.modelValue;
    settleTimer = setTimeout(() => (returning.value = false), RETURN_MS);
  }, RETURN_DELAY_MS);
};

onUnmounted(cancelReturn);
</script>

<style scoped>
.compare {
  position: relative;
  overflow: hidden;
  user-select: none;
  background: rgb(var(--fez-950));
}
.compare__img {
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
}
.compare__img--after {
  position: absolute;
  inset: 0;
  height: 100%;
  object-fit: cover;
  clip-path: inset(0 calc(100% - var(--pos)) 0 0);
}
.compare__handle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--pos);
  width: 0;
  pointer-events: none;
}
.is-returning .compare__img--after {
  transition: clip-path var(--return-ms) cubic-bezier(0.22, 1, 0.36, 1);
}
.is-returning .compare__handle {
  transition: left var(--return-ms) cubic-bezier(0.22, 1, 0.36, 1);
}
/* The images are photographs, so the handle stays white in both themes. */
.compare__line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -0.5px;
  width: 1px;
  background: rgb(255 255 255 / 0.85);
  box-shadow: 0 0 0 0.5px rgb(0 0 0 / 0.35);
}
.compare__knob {
  position: absolute;
  top: 50%;
  left: 0;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  color: #fff;
  background: rgb(26 29 32 / 0.55);
  border: 1px solid rgb(255 255 255 / 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform 150ms ease;
}
.compare:hover .compare__knob {
  transform: translate(-50%, -50%) scale(1.08);
}
.compare__label {
  position: absolute;
  top: 12px;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  background: rgb(26 29 32 / 0.6);
  border: 1px solid rgb(255 255 255 / 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  pointer-events: none;
}
.compare__label--after {
  left: 12px;
}
.compare__label--before {
  right: 12px;
}
.compare__range {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: ew-resize;
  opacity: 0;
  touch-action: pan-y;
}
.compare:has(.compare__range:focus-visible) {
  outline: 2px solid rgb(var(--fez-50));
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .is-returning .compare__img--after,
  .is-returning .compare__handle {
    transition: none;
  }
}
</style>
