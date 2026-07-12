"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "kitchen heat" canvas for the hero.
 *
 * Concept: warm embers and spice motes rising off a gently breathing burner
 * glow — the heat of a working kitchen. On-brand (saffron → terracotta),
 * subtle enough to sit behind headline text.
 *
 * DPR-aware, pauses when the tab is hidden, respects reduced motion, and
 * cleans up its RAF loop + observer on unmount.
 */

type Ember = {
  x: number; // 0..1 normalized
  y: number; // 0..1 normalized (1 = bottom)
  size: number;
  speed: number;
  drift: number;
  phase: number;
  hue: number; // 0 = terracotta, 1 = saffron
  alpha: number;
};

// Warm palette (r,g,b)
const TERRACOTTA: [number, number, number] = [159, 60, 32];
const SAFFRON: [number, number, number] = [233, 161, 57];

function mix(a: [number, number, number], b: [number, number, number], t: number) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ] as [number, number, number];
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function KitchenHeat({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const rand = mulberry32(20240712);
    const COUNT = 70;

    const makeEmber = (fresh: boolean): Ember => ({
      x: rand(),
      // fresh embers start near the bottom; on init spread across the height
      y: fresh ? 1 + rand() * 0.1 : rand(),
      size: 1 + rand() * 3,
      speed: 0.02 + rand() * 0.05,
      drift: (rand() - 0.5) * 0.12,
      phase: rand() * Math.PI * 2,
      hue: rand(),
      alpha: 0.4 + rand() * 0.5,
    });

    const embers: Ember[] = Array.from({ length: COUNT }, () => makeEmber(false));

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Soft heat glow anchored at the bottom centre.
    const drawGlow = (intensity: number) => {
      const cx = width * 0.5;
      const cy = height * 1.02;
      const radius = Math.max(width, height) * 0.75;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      glow.addColorStop(0, `rgba(233, 161, 57, ${0.22 * intensity})`);
      glow.addColorStop(0.35, `rgba(191, 83, 54, ${0.12 * intensity})`);
      glow.addColorStop(1, "rgba(159, 60, 32, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const drawEmber = (e: Ember, time: number) => {
      const sway = Math.sin(time * 1.2 + e.phase) * 0.02;
      const px = (e.x + sway) * width;
      const py = e.y * height;
      // fade near the top, brightest lower down
      const heightFade = Math.min(1, e.y * 1.3);
      const a = e.alpha * heightFade;
      const [r, g, b] = mix(TERRACOTTA, SAFFRON, e.hue);

      const halo = ctx.createRadialGradient(px, py, 0, px, py, e.size * 4);
      halo.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
      halo.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(px, py, e.size * 4, 0, Math.PI * 2);
      ctx.fill();
    };

    if (prefersReduced) {
      drawGlow(1);
      embers.forEach((e) => drawEmber(e, 0));
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const time = now / 1000;

      ctx.clearRect(0, 0, width, height);

      // Burner "breathing" — glow intensity gently pulses.
      const breathe = 0.8 + Math.sin(time * 0.7) * 0.2;
      drawGlow(breathe);

      ctx.globalCompositeOperation = "lighter";
      for (const e of embers) {
        e.y -= e.speed * dt;
        e.x += e.drift * dt;
        if (e.y < -0.05) Object.assign(e, makeEmber(true));
        drawEmber(e, time);
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => cancelAnimationFrame(raf);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
