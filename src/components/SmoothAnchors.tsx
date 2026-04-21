"use client";

import { useEffect } from "react";

const DURATION = 600;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;
  const startTime = performance.now();
  const step = (now: number) => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / DURATION);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function SmoothAnchors() {
  useEffect(() => {
    const getOffset = () => {
      const v = getComputedStyle(document.documentElement).scrollPaddingTop;
      const n = parseFloat(v);
      return Number.isFinite(n) ? n : 80;
    };
    const handler = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - getOffset();
      animateScrollTo(top);
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
