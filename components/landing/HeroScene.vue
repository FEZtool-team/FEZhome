<template>
  <!--
    One 14-second loop: a satellite passes over the coast and scans it, the
    capture splits into GeoTIFF bands, FEZrs processes them, and three real
    FEZrs outputs appear. With reduced motion the final frame is shown still.
  -->
  <div class="scene" role="img" :aria-label="description">
    <span v-for="corner in corners" :key="corner" class="bracket" :class="corner" aria-hidden="true" />

    <div class="stage" aria-hidden="true">
      <!-- Orbit and satellite -->
      <svg class="orbit" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M0 16 Q50 -4 100 16" fill="none" stroke="currentColor" stroke-width="0.3" stroke-dasharray="1 1.4" vector-effect="non-scaling-stroke" />
      </svg>
      <div class="satellite">
        <svg viewBox="0 0 64 32" fill="none">
          <rect x="1" y="11" width="20" height="10" rx="1" fill="currentColor" opacity="0.55" />
          <rect x="43" y="11" width="20" height="10" rx="1" fill="currentColor" opacity="0.55" />
          <path d="M7 11v10M13 11v10M49 11v10M55 11v10" stroke="rgb(var(--fez-900))" stroke-width="0.8" />
          <path d="M21 16h4M39 16h4" stroke="currentColor" stroke-width="1.5" />
          <rect x="25" y="8" width="14" height="16" rx="2" fill="currentColor" />
          <circle cx="32" cy="27" r="2.4" fill="currentColor" />
        </svg>
      </div>
      <div class="beam" />

      <!-- Capture, then bands -->
      <div class="stack">
        <div v-for="(band, i) in bands" :key="band.name" class="band" :class="`band-${i}`">
          <img :src="sceneImage" alt="" :style="{ filter: band.filter }" />
          <span v-if="i === 0" class="band-name">B2–B5.tif</span>
        </div>
        <div class="scanline" />
      </div>

      <!-- FEZrs -->
      <div class="link link-in" />
      <div class="node">
        <BaseLogo class="h-3 w-auto" />
        <span>FEZrs</span>
        <span class="dots"><i /><i /><i /></span>
      </div>
      <div class="link link-out" />
      <div class="rail" />

      <!-- Outputs -->
      <figure v-for="(out, i) in outputs" :key="out.name" class="output" :class="`output-${i}`">
        <img :src="out.src" alt="" />
        <figcaption>{{ out.name }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import sceneImage from "~/assets/img/fezrs/hsv.webp";
import kmeans from "~/assets/img/fezrs/kmeans.webp";
import ndvi from "~/assets/img/fezrs/ndvi.webp";
import ndwi from "~/assets/img/fezrs/ndwi.webp";

const description =
  "Illustration: a satellite scans a coastal area, the capture is split into GeoTIFF bands, FEZrs processes them, and three outputs appear: K-Means clustering, NDVI and NDWI.";

// Stylised band layers of the captured scene (front to back).
const bands = [
  { name: "B2.tif", filter: "grayscale(1) contrast(1.15) brightness(0.9)" },
  { name: "B3.tif", filter: "grayscale(1) contrast(1.3) brightness(0.75)" },
  { name: "B4.tif", filter: "grayscale(1) contrast(1.5) brightness(0.65)" },
  { name: "B5.tif", filter: "grayscale(1) invert(0.85) contrast(1.2)" },
];

const outputs = [
  { name: "K-Means", src: kmeans },
  { name: "NDVI", src: ndvi },
  { name: "NDWI", src: ndwi },
];

const corners = ["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-b border-l", "right-0 bottom-0 border-b border-r"];
</script>

<style scoped>
.scene {
  --cycle: 14s;
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  color: rgb(var(--fez-100));
}
.bracket {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-color: rgb(var(--fez-400));
}
.stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* ---------- final frame (also the reduced-motion state) ---------- */
.orbit {
  position: absolute;
  left: 4%;
  right: 4%;
  top: 3%;
  height: 12%;
  width: 92%;
  color: rgb(var(--fez-500));
}
.satellite {
  position: absolute;
  top: 3.5%;
  left: 50%;
  width: 12%;
  transform: translateX(-50%) rotate(0deg);
  color: rgb(var(--fez-200));
}
.beam {
  position: absolute;
  top: 9%;
  left: 26%;
  width: 40%;
  height: 11%;
  clip-path: polygon(46% 0, 54% 0, 100% 100%, 0 100%);
  background: linear-gradient(to bottom, rgb(var(--rs-400) / 0.5), rgb(var(--rs-400) / 0.05));
  opacity: 0;
}
.stack {
  position: absolute;
  left: 26%;
  top: 20%;
  width: 40%;
  height: 33%;
}
.band {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid var(--border-glass-strong);
  background: rgb(var(--fez-950));
  box-shadow: 0 6px 16px -8px rgb(0 0 0 / 0.6);
}
.band img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.band-0 { z-index: 4; transform: translate(0, 0); }
.band-1 { z-index: 3; transform: translate(6%, 7%); }
.band-2 { z-index: 2; transform: translate(12%, 14%); }
.band-3 { z-index: 1; transform: translate(18%, 21%); }
.band-name {
  position: absolute;
  left: 4px;
  bottom: 3px;
  font: 500 clamp(8px, 1.6vw, 10px) / 1 ui-monospace, SFMono-Regular, Menlo, monospace;
  color: #fff;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.8);
}
.scanline {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 5;
  height: 1px;
  background: rgb(var(--rs-300));
  box-shadow: 0 0 10px 2px rgb(var(--rs-400) / 0.6);
  opacity: 0;
}
.link {
  position: absolute;
  left: 50%;
  width: 1px;
  background: rgb(var(--fez-500));
  transform-origin: top;
}
.link-in { top: 61%; height: 4.5%; }
.link-out { top: 71%; height: 4%; }
.rail {
  position: absolute;
  top: 75%;
  left: 18%;
  right: 18%;
  height: 1px;
  background: rgb(var(--fez-500));
}
.node {
  position: absolute;
  top: 65.5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgb(var(--rs-500) / 0.6);
  background: rgb(var(--fez-900));
  box-shadow: var(--glow-rs);
  font-size: clamp(10px, 2.4vw, 12px);
  color: rgb(var(--fez-50));
  white-space: nowrap;
}
.dots {
  display: inline-flex;
  gap: 2px;
}
.dots i {
  width: 3px;
  height: 3px;
  border-radius: 9999px;
  background: rgb(var(--rs-400));
  opacity: 0.4;
}
.output {
  position: absolute;
  top: 78%;
  width: 26%;
  margin: 0;
}
.output-0 { left: 5%; }
.output-1 { left: 37%; }
.output-2 { left: 69%; }
.output img {
  display: block;
  width: 100%;
  aspect-ratio: 1.45;
  object-fit: cover;
  border-radius: 3px;
  border: 1px solid rgb(var(--rs-500) / 0.45);
}
.output figcaption {
  margin-top: 0.3rem;
  text-align: center;
  font-size: clamp(9px, 2vw, 11px);
  color: rgb(var(--fez-400));
}

/* ---------- the loop ---------- */
@media (prefers-reduced-motion: no-preference) {
  .stage { animation: stage var(--cycle) linear infinite; }
  .satellite { animation: satellite var(--cycle) cubic-bezier(0.45, 0, 0.55, 1) infinite; }
  .beam { animation: beam var(--cycle) linear infinite; }
  .band-0 { animation: capture var(--cycle) linear infinite; }
  .band-1 { animation: band-1 var(--cycle) cubic-bezier(0.22, 1, 0.36, 1) infinite; }
  .band-2 { animation: band-2 var(--cycle) cubic-bezier(0.22, 1, 0.36, 1) infinite; }
  .band-3 { animation: band-3 var(--cycle) cubic-bezier(0.22, 1, 0.36, 1) infinite; }
  .band-name { animation: band-name var(--cycle) linear infinite; }
  .scanline { animation: scan var(--cycle) linear infinite; }
  .link-in { animation: link-in var(--cycle) linear infinite; }
  .node { animation: node var(--cycle) linear infinite; }
  .dots i { animation: dot 0.9s ease-in-out infinite; }
  .dots i:nth-child(2) { animation-delay: 0.15s; }
  .dots i:nth-child(3) { animation-delay: 0.3s; }
  .link-out { animation: link-out var(--cycle) linear infinite; }
  .rail { animation: rail var(--cycle) linear infinite; }
  .output-0 { animation: output-0 var(--cycle) ease-out infinite; }
  .output-1 { animation: output-1 var(--cycle) ease-out infinite; }
  .output-2 { animation: output-2 var(--cycle) ease-out infinite; }
}

@keyframes stage {
  0%, 90% { opacity: 1; }
  97%, 100% { opacity: 0; }
}
/* enter (0-12%), hover while scanning (12-36%), leave (36-46%) */
@keyframes satellite {
  0% { left: -10%; transform: translateX(-50%) translateY(40%) rotate(-12deg); }
  12%, 36% { left: 50%; transform: translateX(-50%) translateY(0) rotate(0deg); }
  46%, 100% { left: 112%; transform: translateX(-50%) translateY(40%) rotate(12deg); }
}
@keyframes beam {
  0%, 12% { opacity: 0; }
  15%, 33% { opacity: 1; }
  36%, 100% { opacity: 0; }
}
@keyframes capture {
  0%, 14% { clip-path: inset(0 0 100% 0); }
  33%, 100% { clip-path: inset(0 0 0 0); }
}
@keyframes scan {
  0%, 13% { top: 0; opacity: 0; }
  14% { top: 0; opacity: 1; }
  33% { top: 100%; opacity: 1; }
  34%, 100% { top: 100%; opacity: 0; }
}
@keyframes band-1 {
  0%, 38% { transform: translate(0, 0); opacity: 0; }
  39% { opacity: 1; }
  46%, 100% { transform: translate(6%, 7%); opacity: 1; }
}
@keyframes band-2 {
  0%, 40% { transform: translate(0, 0); opacity: 0; }
  41% { opacity: 1; }
  48%, 100% { transform: translate(12%, 14%); opacity: 1; }
}
@keyframes band-3 {
  0%, 42% { transform: translate(0, 0); opacity: 0; }
  43% { opacity: 1; }
  50%, 100% { transform: translate(18%, 21%); opacity: 1; }
}
@keyframes band-name {
  0%, 44% { opacity: 0; }
  50%, 100% { opacity: 1; }
}
@keyframes link-in {
  0%, 50% { transform: scaleY(0); }
  55%, 100% { transform: scaleY(1); }
}
@keyframes node {
  0%, 53% { opacity: 0; transform: translateX(-50%) scale(0.9); }
  57%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
}
@keyframes dot {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
}
@keyframes link-out {
  0%, 60% { transform: scaleY(0); }
  63%, 100% { transform: scaleY(1); }
}
@keyframes rail {
  0%, 62% { transform: scaleX(0); }
  66%, 100% { transform: scaleX(1); }
}
@keyframes output-0 {
  0%, 66% { opacity: 0; transform: translateY(12%); }
  70%, 100% { opacity: 1; transform: translateY(0); }
}
@keyframes output-1 {
  0%, 71% { opacity: 0; transform: translateY(12%); }
  75%, 100% { opacity: 1; transform: translateY(0); }
}
@keyframes output-2 {
  0%, 76% { opacity: 0; transform: translateY(12%); }
  80%, 100% { opacity: 1; transform: translateY(0); }
}
</style>
