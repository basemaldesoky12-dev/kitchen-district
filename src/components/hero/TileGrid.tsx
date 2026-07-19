"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "cloud kitchen grid" animation for the hero.
 *
 * Concept: a grid of ceramic kitchen tiles where cells periodically light up
 * and fade — like kitchens (or nodes on the platform) coming online across the
 * network. Reads as both "kitchen tiles" and "SaaS / cloud dashboard",
 * replacing the previous ember effect.
 *
 * DPR-aware, pauses when hidden, respects reduced motion, cleans up on unmount.
 */

const TILE = 56; // must match the CSS .tile-surface background-size
const ACCENTS: Array<[number, number, number]> = [
  [17, 17, 17], // near-black (primary)
  [85, 85, 85], // dark gray (secondary)
  [150, 150, 150], // mid gray (tertiary)
];

type Cell = {
  col: number;
  row: number;
  life: number; // 0..1 progress through its glow
  duration: number; // seconds
  color: [number, number, number];
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function TileGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const rand = mulberry32(70707);
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;

    const cells: Cell[] = [];
    const active = new Set<string>();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      cols = Math.ceil(width / TILE) + 1;
      rows = Math.ceil(height / TILE) + 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = () => {
      if (cells.length > 24) return;
      const col = Math.floor(rand() * cols);
      const row = Math.floor(rand() * rows);
      const key = `${col}:${row}`;
      if (active.has(key)) return;
      active.add(key);
      cells.push({
        col,
        row,
        life: 0,
        duration: 2.4 + rand() * 2.6,
        color: ACCENTS[Math.floor(rand() * ACCENTS.length)],
      });
    };

    const drawCell = (cell: Cell) => {
      // ease in/out — brightest mid-life
      const glow = Math.sin(cell.life * Math.PI);
      const [r, g, b] = cell.color;
      const x = cell.col * TILE;
      const y = cell.row * TILE;
      const pad = 3;

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.16 * glow})`;
      ctx.fillRect(x + pad, y + pad, TILE - pad * 2, TILE - pad * 2);

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.5 * glow})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + pad + 0.5, y + pad + 0.5, TILE - pad * 2 - 1, TILE - pad * 2 - 1);
    };

    if (prefersReduced) {
      // scatter a few static lit tiles
      for (let i = 0; i < 6; i++) {
        spawn();
      }
      cells.forEach((c) => {
        c.life = 0.5;
        drawCell(c);
      });
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    let spawnTimer = 0;
    // seed a few so it feels alive immediately
    for (let i = 0; i < 5; i++) spawn();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.clearRect(0, 0, width, height);

      spawnTimer += dt;
      if (spawnTimer > 0.4) {
        spawnTimer = 0;
        spawn();
      }

      for (let i = cells.length - 1; i >= 0; i--) {
        const cell = cells[i];
        cell.life += dt / cell.duration;
        if (cell.life >= 1) {
          active.delete(`${cell.col}:${cell.row}`);
          cells.splice(i, 1);
          continue;
        }
        drawCell(cell);
      }

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
