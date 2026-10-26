<template>
  <!--
    A globe drawn from real land outlines. It spins fast, eases to a stop over
    a place where satellites recorded a disaster, scans that patch on the
    sphere, and shows the satellite image with its date, satellite and credit.
    Then it spins on to the next event. With reduced motion the first event is
    shown still.
  -->
  <div ref="root" class="scene" role="img" :aria-label="description">
    <div class="stage" aria-hidden="true">
      <svg class="layer" viewBox="0 0 100 100">
        <circle v-for="(star, i) in stars" :key="i" :cx="star.x" :cy="star.y" :r="star.r" :opacity="star.o" class="star" />
      </svg>

      <div class="earth" :class="{ ready }" :style="earthStyle"><canvas ref="canvas" /></div>

      <svg class="layer" viewBox="0 0 100 100">
        <path ref="leader" class="leader" :class="{ on: showCard }" d="" />
      </svg>

      <figure ref="card" class="card glass" :class="{ on: showCard }">
        <img :src="ready ? event.src : undefined" alt="" width="800" height="500" />
        <figcaption>
          <span class="card-title">{{ event.title }}</span>
          <span class="card-line">{{ event.place }} · {{ event.eventDate }}</span>
          <span class="card-line">{{ event.satellite }} ({{ event.sensor }}) · {{ event.imageDate }}</span>
          <span class="card-credit">{{ event.credit }}</span>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { land } from "~/data/land";
import { events as eventData } from "~/data/events";

const description =
  "Illustration: a globe turns to places where satellites recorded natural disasters and climate events, and shows the satellite image of each with its date and the satellite that took it.";

const images = import.meta.glob<string>("/assets/img/events/*.webp", { eager: true, import: "default" });
const events = eventData.map((e) => ({ ...e, src: images[`/assets/img/events/${e.slug}.webp`] ?? "" }));

// ---------- layout (scene units, 0-100) ----------
const C = { x: 46, y: 44 };
const R = 36; // Earth
const SPIN_S = 2.8; // fast spin to the next place
const HOLD_S = 6.6; // stopped on the place
const SCAN = { start: 0.4, sweep: 2.0 }; // seconds into the hold
const CARD = { in: 1.3, out: 6.0 };
const DRIFT = 0.6; // degrees per second while stopped
const rad = Math.PI / 180;
const TAU = Math.PI * 2;

const earthStyle = { left: `${C.x - R}%`, top: `${C.y - R}%`, width: `${R * 2}%` };

// The view centre for an event: a little east and south of the place, so the
// place sits up and to the left of the card.
const viewFor = (e: { lon: number; lat: number }) => ({ lon: e.lon + 12, lat: Math.max(-70, Math.min(70, e.lat - 10)) });

const current = ref(0);
const showCard = ref(false);
const ready = ref(false); // event images are requested only once the globe starts
const event = computed(() => events[current.value]);

// ---------- stars ----------
let seed = 11;
const rand = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};
const stars = Array.from({ length: 80 }, () => ({
  x: +(rand() * 100).toFixed(1),
  y: +(rand() * 100).toFixed(1),
  r: +(0.1 + rand() * (rand() < 0.1 ? 0.45 : 0.22)).toFixed(2),
  o: +(0.25 + rand() * 0.55).toFixed(2),
}));

// ---------- globe ----------
const root = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const leader = ref<SVGPathElement | null>(null);
const card = ref<HTMLElement | null>(null);

let stopLoop: (() => void) | undefined;

onMounted(() => {
  const el = canvas.value;
  const ctx = el?.getContext("2d");
  const scene = root.value;
  if (!el || !ctx || !scene || !events.length) return;

  const cs = getComputedStyle(el);
  const ocean = `rgb(${cs.getPropertyValue("--earth-ocean").trim()})`;
  const ground = `rgb(${cs.getPropertyValue("--earth-land").trim()})`;
  const rs300 = cs.getPropertyValue("--rs-300").trim();
  const rs400 = cs.getPropertyValue("--rs-400").trim();
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Land outlines packed once: per point sin/cos of longitude and latitude, so
  // a frame needs only multiplications. Each ring also gets a bounding cap, so
  // rings on the far side are skipped without touching their points.
  type Land = { start: number; n: number; cx: number; cy: number; cz: number; rho: number };
  let sinL: Float64Array, cosL: Float64Array, sinP: Float64Array, cosP: Float64Array;
  let xs: Float64Array, ys: Float64Array, zs: Float64Array;
  let caps: Land[] = [];
  const pack = () => {
    const total = land.reduce((sum, ring) => sum + ring.length / 2, 0);
    sinL = new Float64Array(total);
    cosL = new Float64Array(total);
    sinP = new Float64Array(total);
    cosP = new Float64Array(total);
    caps = [];
    let at = 0;
    for (const ring of land) {
      const n = ring.length / 2;
      let cx = 0;
      let cy = 0;
      let cz = 0;
      for (let i = 0; i < n; i++) {
        const lam = ring[2 * i] * rad;
        const phi = ring[2 * i + 1] * rad;
        sinL[at + i] = Math.sin(lam);
        cosL[at + i] = Math.cos(lam);
        sinP[at + i] = Math.sin(phi);
        cosP[at + i] = Math.cos(phi);
        cx += cosP[at + i] * cosL[at + i];
        cy += cosP[at + i] * sinL[at + i];
        cz += sinP[at + i];
      }
      const l = Math.hypot(cx, cy, cz) || 1;
      cx /= l;
      cy /= l;
      cz /= l;
      let rho = 0;
      for (let i = 0; i < n; i++) {
        const dot = cx * cosP[at + i] * cosL[at + i] + cy * cosP[at + i] * sinL[at + i] + cz * sinP[at + i];
        rho = Math.max(rho, Math.acos(Math.min(1, dot)));
      }
      caps.push({ start: at, n, cx, cy, cz, rho });
      at += n;
    }
    xs = new Float64Array(Math.max(...caps.map((c) => c.n)));
    ys = new Float64Array(xs.length);
    zs = new Float64Array(xs.length);
  };
  let size = 0;
  let dpr = 1;
  let visible = true;
  let raf = 0;

  // the view: centre longitude and latitude, and their sin/cos
  const view = { lon: 0, lat: 0, sin: 0, cos: 1, s0: 0, c0: 1 };
  const setView = (lon: number, lat: number) => {
    view.lon = lon;
    view.lat = lat;
    view.sin = Math.sin(lat * rad);
    view.cos = Math.cos(lat * rad);
    view.s0 = Math.sin(lon * rad);
    view.c0 = Math.cos(lon * rad);
  };
  // orthographic projection; y points down the screen, z > 0 faces the viewer
  const project = (lon: number, lat: number) => {
    const lam = (lon - view.lon) * rad;
    const phi = lat * rad;
    const cosPhi = Math.cos(phi);
    return {
      x: cosPhi * Math.sin(lam),
      y: -(view.cos * Math.sin(phi) - view.sin * cosPhi * Math.cos(lam)),
      z: view.sin * Math.sin(phi) + view.cos * cosPhi * Math.cos(lam),
    };
  };

  // One land outline, clipped at the horizon. The visible stretches are joined
  // along the limb, each exit to the next entry clockwise (the land rings are
  // all wound the same way), so a ring that dips behind the globe never cuts
  // across the disk.
  type Stretch = { pts: number[]; from: number; to: number };
  const traceRing = (cap: Land, r: number) => {
    const n = cap.n;
    // the ring's cap against the visible hemisphere
    const facing = view.c0 * view.cos * cap.cx + view.s0 * view.cos * cap.cy + view.sin * cap.cz;
    if (facing < -Math.sin(cap.rho)) return; // entirely on the far side
    const { c0, s0, cos: vc, sin: vs } = view;
    let shown = 0;
    for (let i = 0; i < n; i++) {
      const k = cap.start + i;
      const sinLam = sinL[k] * c0 - cosL[k] * s0;
      const cosLam = cosL[k] * c0 + sinL[k] * s0;
      xs[i] = cosP[k] * sinLam;
      ys[i] = -(vc * sinP[k] - vs * cosP[k] * cosLam);
      zs[i] = vs * sinP[k] + vc * cosP[k] * cosLam;
      if (zs[i] > 0) shown++;
    }
    if (!shown) return;
    if (shown === n) {
      ctx.moveTo(r + xs[0] * r, r + ys[0] * r);
      for (let i = 1; i < n; i++) ctx.lineTo(r + xs[i] * r, r + ys[i] * r);
      ctx.closePath();
      return;
    }

    // split into visible stretches, each starting and ending on the limb
    let start = 0;
    while (!(zs[start] <= 0 && zs[(start + 1) % n] > 0)) start++;
    const limb = (p: number, i: number) => {
      const t = zs[p] / (zs[p] - zs[i]);
      const x = xs[p] + (xs[i] - xs[p]) * t;
      const y = ys[p] + (ys[i] - ys[p]) * t;
      const l = Math.hypot(x, y) || 1;
      return [x / l, y / l];
    };
    const stretches: Stretch[] = [];
    let cur: Stretch | undefined;
    for (let j = 1; j <= n; j++) {
      const i = (start + j) % n;
      const p = (start + j - 1) % n;
      if (zs[i] > 0) {
        if (zs[p] <= 0) {
          const [x, y] = limb(p, i);
          cur = { pts: [x, y], from: Math.atan2(y, x), to: 0 };
        }
        cur!.pts.push(xs[i], ys[i]);
      } else if (zs[p] > 0 && cur) {
        const [x, y] = limb(p, i);
        cur.pts.push(x, y);
        cur.to = Math.atan2(y, x);
        stretches.push(cur);
        cur = undefined;
      }
    }

    const used = new Set<number>();
    for (let first = 0; first < stretches.length; first++) {
      if (used.has(first)) continue;
      let s = first;
      ctx.moveTo(r + stretches[s].pts[0] * r, r + stretches[s].pts[1] * r);
      while (!used.has(s)) {
        used.add(s);
        const pts = stretches[s].pts;
        for (let i = 0; i < pts.length; i += 2) ctx.lineTo(r + pts[i] * r, r + pts[i + 1] * r);
        const end = stretches[s].to;
        let next = s;
        let gap = Infinity;
        stretches.forEach((q, k) => {
          const d = (((q.from - end) % TAU) + TAU) % TAU;
          if (d < gap) {
            gap = d;
            next = k;
          }
        });
        ctx.arc(r, r, r, end, end + gap);
        s = next;
      }
      ctx.closePath();
    }
  };

  // ---------- marks drawn on the sphere ----------
  // the point at angular distance d (degrees) and bearing b (radians) from a place
  const dest = (lon: number, lat: number, d: number, b: number) => {
    const phi = lat * rad;
    const dr = d * rad;
    const lat2 = Math.asin(Math.sin(phi) * Math.cos(dr) + Math.cos(phi) * Math.sin(dr) * Math.cos(b));
    const lon2 = lon * rad + Math.atan2(Math.sin(b) * Math.sin(dr) * Math.cos(phi), Math.cos(dr) - Math.sin(phi) * Math.sin(lat2));
    return project(lon2 / rad, lat2 / rad);
  };
  const pen = (q: { x: number; y: number }, r: number, move: boolean) =>
    move ? ctx.moveTo(r + q.x * r, r + q.y * r) : ctx.lineTo(r + q.x * r, r + q.y * r);
  // a circle of the given angular radius around a place, lying on the surface
  const ring = (lon: number, lat: number, radius: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i <= 48; i++) pen(dest(lon, lat, radius, (i / 48) * TAU), r, i === 0);
  };
  // a pie slice of that circle, from bearing 0 (north) clockwise to `upTo`
  const sector = (lon: number, lat: number, radius: number, upTo: number, r: number) => {
    ctx.beginPath();
    pen(project(lon, lat), r, true);
    const steps = Math.max(2, Math.ceil((upTo / TAU) * 48));
    for (let i = 0; i <= steps; i++) pen(dest(lon, lat, radius, (i / steps) * upTo), r, false);
    ctx.closePath();
  };

  const drawMarks = (e: (typeof events)[number], hold: number, r: number) => {
    const fade = Math.min(hold / 0.4, 1, (HOLD_S - hold) / 0.5);
    if (fade <= 0) return;
    ctx.save();
    ctx.lineJoin = "round";

    // the scan: a circle on the surface, swept once around like a radar
    const radius = 6; // degrees
    const progress = Math.min(Math.max((hold - SCAN.start) / SCAN.sweep, 0), 1);
    const angle = progress * TAU;
    ring(e.lon, e.lat, radius, r);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = `rgb(${rs300} / ${0.7 * fade})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
    if (progress > 0) {
      sector(e.lon, e.lat, radius, angle, r);
      ctx.fillStyle = `rgb(${rs400} / ${0.14 * fade})`;
      ctx.fill();
      // inner rings, draped over the surface
      for (const k of [1 / 3, 2 / 3]) {
        ring(e.lon, e.lat, radius * k, r);
        ctx.strokeStyle = `rgb(${rs300} / ${0.25 * fade})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
    if (progress > 0 && progress < 1) {
      // the sweep arm
      ctx.beginPath();
      pen(project(e.lon, e.lat), r, true);
      for (let i = 1; i <= 8; i++) pen(dest(e.lon, e.lat, (radius * i) / 8, angle), r, false);
      ctx.shadowColor = `rgb(${rs400})`;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = `rgb(${rs300} / ${fade})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // the place: a dot and a ripple spreading over the surface
    const ripple = (hold * 0.6) % 1;
    ring(e.lon, e.lat, 0.6 + ripple * 5, r);
    ctx.strokeStyle = `rgb(${rs300} / ${(1 - ripple) * fade})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    const p = project(e.lon, e.lat);
    ctx.beginPath();
    ctx.arc(r + p.x * r, r + p.y * r, 2.2, 0, TAU);
    ctx.fillStyle = `rgb(${rs300} / ${fade})`;
    ctx.fill();
    ctx.restore();
  };

  const drawEarth = (marks?: { e: (typeof events)[number]; hold: number }) => {
    if (!caps.length) pack();
    const r = size / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(r, r, r, 0, TAU);
    ctx.clip();
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = ground;
    ctx.beginPath();
    for (const cap of caps) traceRing(cap, r);
    ctx.fill();
    // soft light from the upper left, a little darker toward the limb
    const light = ctx.createRadialGradient(r * 0.7, r * 0.6, r * 0.1, r, r, r);
    light.addColorStop(0, "rgba(255,255,255,0.1)");
    light.addColorStop(0.7, "rgba(0,0,0,0)");
    light.addColorStop(1, "rgba(0,0,0,0.3)");
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, size, size);
    if (marks) drawMarks(marks.e, marks.hold, r);
    ctx.restore();
  };

  // leader from the place to the card's top-left corner (scene units); the
  // card sits on the bottom edge, so its top depends on the caption height
  let cardTop = 54;
  const placeLeader = (e: (typeof events)[number]) => {
    const p = project(e.lon, e.lat);
    const x = C.x + p.x * R;
    const y = C.y + p.y * R;
    leader.value?.setAttribute("d", `M${x.toFixed(2)} ${y.toFixed(2)}L${(x + 3).toFixed(2)} ${(y + 3).toFixed(2)}L53 ${cardTop.toFixed(2)}`);
  };

  // ---------- timeline: spin, then hold on the event ----------
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let index = 0;
  let phaseStart = 0;
  let spinning = true;
  let from = { lon: 0, lat: 15 };
  let to = viewFor(events[0]);
  let spinBy = 0;
  const preload = (i: number) => {
    const img = new Image();
    img.src = events[i].src;
  };
  const startSpin = (now: number, next: number) => {
    from = { lon: view.lon, lat: view.lat };
    to = viewFor(events[next]);
    // turn eastward (centre longitude decreasing) at least one full turn
    spinBy = -(((((from.lon - to.lon) % 360) + 360) % 360) + 360);
    index = next;
    phaseStart = now;
    spinning = true;
    preload(next);
  };

  let lastNow = 0;
  let lastDraw = 0;
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    // off screen the timeline waits, so the first spin is seen, not skipped
    if (!visible || !size) phaseStart += now - (lastNow || now);
    lastNow = now;
    if (!visible || !size) return;
    const t = (now - phaseStart) / 1000;
    if (spinning) {
      const k = ease(Math.min(t / SPIN_S, 1));
      setView(from.lon + spinBy * k, from.lat + (to.lat - from.lat) * k);
      drawEarth();
      if (t >= SPIN_S) {
        spinning = false;
        phaseStart = now;
        current.value = index;
      }
      return;
    }
    // once the scan is done only a slow drift and a ripple remain: 20 fps is plenty
    if (t > SCAN.start + SCAN.sweep + 0.2 && now - lastDraw < 50) return;
    lastDraw = now;
    setView(to.lon - DRIFT * t, to.lat);
    const e = events[index];
    drawEarth({ e, hold: t });
    placeLeader(e);
    const card = t > CARD.in && t < CARD.out;
    if (card !== showCard.value) showCard.value = card;
    if (t >= HOLD_S) startSpin(now, (index + 1) % events.length);
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5); // a phone at 3x would paint 4x the pixels
    size = el.clientWidth;
    el.width = Math.round(size * dpr);
    el.height = Math.round(size * dpr);
    if (card.value) cardTop = (card.value.offsetTop / scene.clientHeight) * 100;
    if (still) {
      const v = viewFor(events[0]);
      setView(v.lon, v.lat);
      drawEarth({ e: events[0], hold: SCAN.start + SCAN.sweep });
      placeLeader(events[0]);
    }
  };

  setView(from.lon, from.lat);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(scene);
  // Start after the page has loaded and the browser is idle, so the globe never
  // competes with the first paint or with the page's own scripts.
  let idle = 0;
  let stopped = false;
  const begin = () => {
    if (stopped) return;
    drawEarth(); // a first frame, then the globe fades in and the spin starts
    ready.value = true;
    raf = requestAnimationFrame((now) => {
      startSpin(now, 0); // the first spin also turns the globe, from wherever it starts
      tick(now);
    });
  };
  const whenIdle = () => {
    idle = "requestIdleCallback" in window ? window.requestIdleCallback(begin, { timeout: 2500 }) : window.setTimeout(begin, 800);
  };
  if (still) {
    ready.value = true;
    showCard.value = true;
  } else if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
  stopLoop = () => {
    stopped = true;
    window.removeEventListener("load", whenIdle);
    if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
  };
});

onBeforeUnmount(() => stopLoop?.());
</script>

<style scoped>
.scene {
  position: relative;
  aspect-ratio: 1;
  width: 100%;
}
.stage,
.layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.star { fill: rgb(var(--fez-300)); }
.earth {
  position: absolute;
  aspect-ratio: 1;
  border-radius: 9999px;
  box-shadow: 0 0 40px -6px rgb(var(--fez-400) / 0.45);
  opacity: 0;
  transition: opacity 0.9s ease;
}
.earth.ready { opacity: 1; }
.earth canvas {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
.leader {
  fill: none;
  stroke: rgb(var(--rs-300) / 0.8);
  stroke-width: 0.25;
  stroke-dasharray: 0.6 0.6;
  opacity: 0;
  transition: opacity 0.4s;
}
.leader.on { opacity: 1; }

.card {
  position: absolute;
  left: 53%;
  bottom: 0;
  width: 46%;
  margin: 0;
  overflow: hidden;
  border-radius: 12px;
  opacity: 0;
  transform: translateY(6px) scale(0.97);
  transform-origin: top left;
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.card.on {
  opacity: 1;
  transform: none;
}
.card img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
.card figcaption {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.45rem 0.6rem 0.5rem;
  line-height: 1.3;
}
.card-title {
  font-size: clamp(11px, 2.6vw, 13px);
  font-weight: 500;
  color: rgb(var(--fez-50));
}
.card-line {
  font-size: clamp(9px, 2.1vw, 11px);
  color: rgb(var(--fez-300));
}
.card-credit {
  font-size: clamp(8px, 1.8vw, 9.5px);
  color: rgb(var(--fez-500));
}
</style>
